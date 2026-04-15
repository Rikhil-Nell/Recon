import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_QR_CODES, MOCK_REGISTERED_ZONES } from '../lib/data';
import { generatePassCode } from '../lib/utils';
import type { ZoneQrCode } from '../lib/types';

interface ZoneState {
    registeredZones: string[];
    qrCodes: ZoneQrCode[];
    registerZone: (zoneId: string, shortName: string) => ZoneQrCode;
    markCheckedIn: (zoneId: string) => void;
    resetZones: () => void;
}

const baseState = {
    registeredZones: MOCK_REGISTERED_ZONES,
    qrCodes: MOCK_QR_CODES,
};

export const useZoneStore = create<ZoneState>()(
    persist(
        (set, get) => ({
            ...baseState,
            registerZone: (zoneId, shortName) => {
                const current = get();
                const existing = current.qrCodes.find((q) => q.zoneId === zoneId);
                if (existing) return existing;

                const created: ZoneQrCode = {
                    zoneId,
                    code: generatePassCode(shortName),
                    isActive: true,
                };

                set({
                    registeredZones: current.registeredZones.includes(zoneId)
                        ? current.registeredZones
                        : [...current.registeredZones, zoneId],
                    qrCodes: [...current.qrCodes, created],
                });

                return created;
            },
            markCheckedIn: (zoneId) => {
                const now = new Intl.DateTimeFormat('en-IN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Kolkata',
                }).format(new Date());

                set({
                    qrCodes: get().qrCodes.map((code) =>
                        code.zoneId === zoneId
                            ? {
                                  ...code,
                                  isActive: false,
                                  checkedIn: true,
                                  checkedInAt: `${now} IST`,
                              }
                            : code,
                    ),
                });
            },
            resetZones: () => set({ ...baseState }),
        }),
        {
            name: 'recon-portal-zones',
        },
    ),
);
