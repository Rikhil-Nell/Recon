import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MOCK_PARTICIPANT } from '../lib/data';
import type { Participant } from '../lib/types';

interface AuthState {
    email: string;
    isVerified: boolean;
    participant: Participant | null;
    pointsPulseTick: number;
    lastPointsDelta: number;
    setEmail: (email: string) => void;
    completeVerification: () => void;
    signOut: () => void;
    redeemPoints: (points: number) => void;
    addPoints: (points: number) => void;
    addCheckedInZone: (zoneId: string) => void;
    clearPointsDelta: () => void;
}

const baseState = {
    email: '',
    isVerified: false,
    participant: MOCK_PARTICIPANT,
    pointsPulseTick: 0,
    lastPointsDelta: 0,
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            ...baseState,
            setEmail: (email) => set({ email }),
            completeVerification: () => {
                const { email, participant } = get();
                set({
                    isVerified: true,
                    participant: participant
                        ? { ...participant, email: email || participant.email }
                        : { ...MOCK_PARTICIPANT, email: email || MOCK_PARTICIPANT.email },
                });
            },
            signOut: () => {
                set({
                    ...baseState,
                    participant: { ...MOCK_PARTICIPANT },
                });
            },
            redeemPoints: (points) => {
                const participant = get().participant;
                if (!participant) return;
                set({
                    participant: {
                        ...participant,
                        points: Math.max(0, participant.points - points),
                    },
                    pointsPulseTick: get().pointsPulseTick + 1,
                    lastPointsDelta: -Math.abs(points),
                });
            },
            addPoints: (points) => {
                const participant = get().participant;
                if (!participant) return;
                set({
                    participant: {
                        ...participant,
                        points: participant.points + points,
                    },
                    pointsPulseTick: get().pointsPulseTick + 1,
                    lastPointsDelta: Math.abs(points),
                });
            },
            addCheckedInZone: (zoneId) => {
                const participant = get().participant;
                if (!participant || participant.checkedInZones.includes(zoneId)) return;
                set({
                    participant: {
                        ...participant,
                        checkedInZones: [...participant.checkedInZones, zoneId],
                    },
                });
            },
            clearPointsDelta: () => set({ lastPointsDelta: 0 }),
        }),
        {
            name: 'recon-portal-auth',
            partialize: (state) => ({
                email: state.email,
                isVerified: state.isVerified,
                participant: state.participant,
            }),
        },
    ),
);
