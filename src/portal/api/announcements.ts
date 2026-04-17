import { apiFetch } from './client';

export type BackendAnnouncementPriority = 'urgent' | 'update' | 'info' | 'general';

export interface BackendAnnouncement {
    id: string;
    title: string;
    body: string;
    priority: BackendAnnouncementPriority;
    published_at: string;
    expires_at?: string | null;
    is_pinned: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
}

export async function fetchAnnouncements() {
    return apiFetch<BackendAnnouncement[]>('/api/v1/announcements');
}

