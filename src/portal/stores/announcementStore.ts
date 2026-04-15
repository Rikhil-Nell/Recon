import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SEED_ANNOUNCEMENTS } from '../lib/data';
import type { Announcement } from '../lib/types';

interface AnnouncementState {
    announcements: Announcement[];
    unreadCount: number;
    highlightedAnnouncementId: string | null;
    addAnnouncement: (announcement: Announcement) => void;
    markAllRead: () => void;
    markRead: (id: string) => void;
    setHighlightedAnnouncement: (id: string | null) => void;
    resetAnnouncements: () => void;
}

const initialAnnouncements = SEED_ANNOUNCEMENTS;
const initialUnreadCount = initialAnnouncements.filter((a) => a.unread).length;

export const useAnnouncementStore = create<AnnouncementState>()(
    persist(
        (set, get) => ({
            announcements: initialAnnouncements,
            unreadCount: initialUnreadCount,
            highlightedAnnouncementId: null,
            addAnnouncement: (announcement) => {
                const exists = get().announcements.some((a) => a.id === announcement.id);
                if (exists) return;
                const next = [{ ...announcement, unread: true }, ...get().announcements];
                set({
                    announcements: next,
                    unreadCount: next.filter((a) => a.unread).length,
                });
            },
            markAllRead: () => {
                const updated = get().announcements.map((a) => ({ ...a, unread: false }));
                set({ announcements: updated, unreadCount: 0 });
            },
            markRead: (id) => {
                const updated = get().announcements.map((a) =>
                    a.id === id ? { ...a, unread: false } : a,
                );
                set({
                    announcements: updated,
                    unreadCount: updated.filter((a) => a.unread).length,
                });
            },
            setHighlightedAnnouncement: (id) => set({ highlightedAnnouncementId: id }),
            resetAnnouncements: () =>
                set({
                    announcements: initialAnnouncements,
                    unreadCount: initialUnreadCount,
                    highlightedAnnouncementId: null,
                }),
        }),
        {
            name: 'recon-portal-announcements',
        },
    ),
);
