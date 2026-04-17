import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Participant } from '../lib/types';
import type { BackendParticipant } from '../api/participants';
import type { BackendUserProfile } from '../api/auth';
import { fetchMyParticipantProfile } from '../api/participants';
import { fetchMe, logout as apiLogout } from '../api/auth';
import { ApiError } from '../api/client';
import { pointsApi, zonesApi } from '../../api/backend';

interface AuthState {
    sessionStatus: 'unknown' | 'authenticated' | 'unauthenticated';
    profileStatus: 'unknown' | 'present' | 'missing';
    user: BackendUserProfile | null;
    participantProfile: BackendParticipant | null;
    participant: Participant | null;
    bootstrapSession: () => Promise<void>;
    clearSession: () => void;
    signOut: () => Promise<void>;
}

const baseState = {
    sessionStatus: 'unknown' as const,
    profileStatus: 'unknown' as const,
    user: null,
    participantProfile: null,
    participant: null as Participant | null,
};

const BOOTSTRAP_TIMEOUT_MS = 25_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
    return new Promise((resolve, reject) => {
        const t = window.setTimeout(() => reject(new Error('Auth bootstrap timed out')), ms);
        promise.then(
            (v) => {
                clearTimeout(t);
                resolve(v);
            },
            (e) => {
                clearTimeout(t);
                reject(e);
            },
        );
    });
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...baseState,
            bootstrapSession: async () => {
                let user: BackendUserProfile;
                try {
                    user = await withTimeout(fetchMe(), BOOTSTRAP_TIMEOUT_MS);
                } catch {
                    set({
                        sessionStatus: 'unauthenticated',
                        profileStatus: 'unknown',
                        user: null,
                        participantProfile: null,
                        participant: null,
                    });
                    return;
                }

                let profile: BackendParticipant | null = null;
                let profileStatus: AuthState['profileStatus'] = 'missing';
                try {
                    profile = await fetchMyParticipantProfile();
                    profileStatus = 'present';
                } catch (err) {
                    if (err instanceof ApiError && err.status === 404) {
                        profileStatus = 'missing';
                    } else {
                        // Session from /me is valid; do not treat participant/network errors as "no session".
                        profileStatus = 'missing';
                    }
                }

                const pointsResp =
                    profileStatus === 'present'
                        ? await pointsApi.me().catch(() => null)
                        : null;
                const regsResp =
                    profileStatus === 'present'
                        ? await zonesApi.myRegistrations().catch(() => null)
                        : null;

                const zoneIdsRaw = (regsResp as { zoneIds?: string[] } | null)?.zoneIds ?? [];
                const checkedInZones = Array.isArray(zoneIdsRaw)
                    ? zoneIdsRaw.map((id) => String(id))
                    : [];
                const points = Number((pointsResp as { balance?: number } | null)?.balance ?? 0);

                set({
                    sessionStatus: 'authenticated',
                    profileStatus,
                    user,
                    participantProfile: profile,
                    participant: profile
                        ? {
                              id: profile.id,
                              email: user.email,
                              displayName: profile.display_name,
                              registrationId: profile.id,
                              points: Number.isFinite(points) ? points : 0,
                              checkedInZones,
                          }
                        : null,
                });
            },
            clearSession: () => set({ ...baseState, sessionStatus: 'unauthenticated' }),
            signOut: async () => {
                try {
                    await apiLogout();
                } finally {
                    set({
                        ...baseState,
                        sessionStatus: 'unauthenticated',
                    });
                }
            },
        }),
        {
            name: 'recon-portal-auth',
            partialize: (state) => ({
                user: state.user,
                participantProfile: state.participantProfile,
                participant: state.participant,
            }),
            onRehydrateStorage: () => (state, error) => {
                if (error || !state?.user) return;
                useAuthStore.setState({
                    sessionStatus: 'unknown',
                    profileStatus: state.participantProfile ? 'present' : 'missing',
                });
            },
        },
    ),
);
