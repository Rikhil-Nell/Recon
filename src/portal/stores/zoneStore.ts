import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ZoneQrCode } from '../lib/types';
import { zonesApi } from '../../api/backend';
import { ApiError } from '../api/client';

interface ZoneState {
    registeredZones: string[];
    qrCodes: ZoneQrCode[];
    hydrated: boolean;
    hydrateZones: () => Promise<void>;
    registerZone: (zoneId: string) => Promise<ZoneQrCode>;
    unregisterZone: (zoneId: string) => Promise<void>;
    resetZones: () => void;
}

const baseState = {
    registeredZones: [] as string[],
    qrCodes: [] as ZoneQrCode[],
    hydrated: false,
};

interface BackendPass {
    zoneId: string;
    code: string;
    isActive: boolean;
    checkedInAt?: string | null;
}

function normalizePasses(raw: unknown): ZoneQrCode[] {
    const passes = (raw as { passes?: BackendPass[] } | null)?.passes ?? [];
    if (!Array.isArray(passes)) return [];
    return passes.map((pass) => {
        const checkedInAt = pass.checkedInAt ?? undefined;
        return {
            zoneId: String(pass.zoneId),
            code: String(pass.code),
            isActive: Boolean(pass.isActive),
            checkedIn: !pass.isActive || Boolean(checkedInAt),
            checkedInAt: checkedInAt ?? undefined,
        };
    });
}

export const useZoneStore = create<ZoneState>()(
    persist(
        (set, get) => ({
            ...baseState,
            hydrateZones: async () => {
                const [registrationsRes, passesRes] = await Promise.all([
                    zonesApi.myRegistrations(),
                    zonesApi.myPasses(),
                ]);
                const idsRaw = (registrationsRes as { zoneIds?: string[] } | null)?.zoneIds ?? [];
                const registeredZones = Array.isArray(idsRaw) ? idsRaw.map((id) => String(id)) : [];
                const qrCodes = normalizePasses(passesRes);
                set({
                    registeredZones,
                    qrCodes,
                    hydrated: true,
                });
            },
            registerZone: async (zoneId) => {
                await zonesApi.register(zoneId);
                await get().hydrateZones();
                const pass = get().qrCodes.find((q) => q.zoneId === zoneId);
                if (!pass) {
                    throw new ApiError('Registration succeeded but no pass returned.', 500, null);
                }
                return pass;
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
