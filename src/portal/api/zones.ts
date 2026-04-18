import { apiFetch } from './client';

export interface BackendZoneCatalogItem {
    id: string;
    name: string;
    shortName: string;
    category: string;
    type: string;
    tags: string[];
    status: string;
    location: string;
    points: number;
    registeredCount: number;
    color: string;
}

export async function fetchZonesCatalog() {
    return apiFetch<BackendZoneCatalogItem[]>('/api/v1/zones');
}

export async function fetchZoneById(zoneId: string) {
    return apiFetch<BackendZoneCatalogItem>(`/api/v1/zones/${encodeURIComponent(zoneId)}`);
}

