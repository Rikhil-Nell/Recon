import { ZONES } from './data';
import type { Zone, ZoneStatus, ZoneType } from './types';
import type { BackendZoneCatalogItem } from '../api/zones';

function toPortalStatus(raw: string): ZoneStatus {
    if (raw === 'closed' || raw === 'red') return 'closed';
    if (raw === 'amber') return 'soon';
    return 'open';
}

function toPortalType(raw: string): ZoneType {
    return raw === 'flagship' ? 'flagship' : 'side';
}

export function mapBackendZoneToPortalZone(item: BackendZoneCatalogItem): Zone {
    const template =
        ZONES.find((zone) => zone.shortName === item.shortName)
        ?? ZONES.find((zone) => zone.name.toLowerCase() === item.name.toLowerCase());

    return {
        id: item.id,
        type: toPortalType(item.type),
        name: item.name,
        shortName: item.shortName,
        tags: item.tags ?? template?.tags ?? [],
        category: (item.category as Zone['category']) ?? template?.category ?? 'FLAGSHIP',
        description: template?.description ?? `${item.name} zone`,
        teamSize: template?.teamSize ?? 'SOLO',
        prizes: template?.prizes,
        duration: template?.duration,
        format: template?.format,
        points: item.points,
        location: item.location,
        registeredCount: item.registeredCount,
        status: toPortalStatus(item.status),
        color: item.color || template?.color || '#8fb0ff',
    };
}

