import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ZoneQrCode } from '../lib/types';
import { ApiError } from '../api/client';
import {
    createEventRegistration,
    fetchMyPasses,
    fetchMyRegistrations,
    fetchRegistrationQr,
    fetchZonesCatalog,
    type BackendEventRegistrationQr,
    type BackendMyPasses,
    type BackendMyRegistrations,
    type BackendZoneCatalogItem,
    type BackendZonePass,
} from '../api/zones';
import { zonesApi } from '../../api/backend';

interface ZoneState {
    registeredZones: string[];
    qrCodes: ZoneQrCode[];
    hydrated: boolean;
    hydrateZones: () => Promise<void>;
    registerZone: (zoneId: string) => Promise<ZoneQrCode>;
    refreshZonePass: (zoneId: string) => Promise<ZoneQrCode | null>;
    unregisterZone: (zoneId: string) => Promise<void>;
    resetZones: () => void;
}

const baseState = {
    registeredZones: [] as string[],
    qrCodes: [] as ZoneQrCode[],
    hydrated: false,
};

function normalizePasses(
    registrations: BackendMyRegistrations,
    passes: BackendMyPasses,
    catalog: BackendZoneCatalogItem[],
    qrRegistrations: BackendEventRegistrationQr[],
): ZoneQrCode[] {
    const activeZoneIds = new Set(
        Array.isArray(registrations.zoneIds) ? registrations.zoneIds.map((id) => String(id)) : [],
    );
    const passMap = new Map<string, BackendZonePass>(
        (Array.isArray(passes.passes) ? passes.passes : []).map((pass) => [String(pass.zoneId), pass]),
    );
    const zoneShortNameById = new Map(catalog.map((zone) => [String(zone.id), zone.shortName]));
    const qrByEventId = new Map(qrRegistrations.map((registration) => [registration.eventId, registration]));

    return Array.from(activeZoneIds).flatMap((zoneId) => {
        const pass = passMap.get(zoneId);
        const eventId = zoneShortNameById.get(zoneId);
        if (!pass || !eventId) return [];

        const qr = qrByEventId.get(eventId);
        if (!qr) return [];

        const checkedInAt = pass.checkedInAt ?? undefined;
        return [{
            zoneId,
            registrationId: qr.registrationId,
            code: String(pass.code),
            qrToken: qr.qrToken,
            qrExpiresAt: qr.qrExpiresAt,
            isActive: Boolean(pass.isActive),
            checkedIn: !pass.isActive || Boolean(checkedInAt),
            checkedInAt,
        }];
    });
}

export const useZoneStore = create<ZoneState>()(
    persist(
        (set, get) => ({
            ...baseState,
            hydrateZones: async () => {
                const [registrationsRes, passesRes, catalog] = await Promise.all([
                    fetchMyRegistrations(),
                    fetchMyPasses(),
                    fetchZonesCatalog(),
                ]);
                const registeredZones = Array.isArray(registrationsRes.zoneIds)
                    ? registrationsRes.zoneIds.map((id) => String(id))
                    : [];
                const qrRegistrations = await Promise.all(
                    catalog
                        .filter((zone) => registeredZones.includes(String(zone.id)))
                        .map((zone) => createEventRegistration(zone.shortName)),
                );
                const qrCodes = normalizePasses(registrationsRes, passesRes, catalog, qrRegistrations);
                set({
                    registeredZones,
                    qrCodes,
                    hydrated: true,
                });
            },
            registerZone: async (zoneId) => {
                const catalog = await fetchZonesCatalog();
                const zone = catalog.find((item) => String(item.id) === zoneId);
                if (!zone) {
                    throw new ApiError('Zone not found in catalog.', 404, null);
                }
                await createEventRegistration(zone.shortName);
                await get().hydrateZones();
                const pass = get().qrCodes.find((q) => q.zoneId === zoneId);
                if (!pass) {
                    throw new ApiError('Registration succeeded but no pass returned.', 500, null);
                }
                return pass;
            },
            refreshZonePass: async (zoneId) => {
                const current = get().qrCodes.find((code) => code.zoneId === zoneId);
                if (!current) return null;

                const refreshed = await fetchRegistrationQr(current.registrationId);
                let nextPass: ZoneQrCode | null = null;

                set((state) => ({
                    qrCodes: state.qrCodes.map((code) => {
                        if (code.zoneId !== zoneId) return code;
                        nextPass = {
                            ...code,
                            registrationId: refreshed.registrationId,
                            qrToken: refreshed.qrToken,
                            qrExpiresAt: refreshed.qrExpiresAt,
                        };
                        return nextPass;
                    }),
                }));

                return nextPass;
            },
            unregisterZone: async (zoneId) => {
                await zonesApi.unregister(zoneId);
                await get().hydrateZones();
            },
            resetZones: () => set({ ...baseState }),
        }),
        {
            name: 'recon-portal-zones',
        },
    ),
);
