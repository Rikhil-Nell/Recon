import { apiFetch } from './client';

export interface BackendShopItem {
    id: string;
    name: string;
    description: string;
    point_cost: number;
    stock?: number | null;
    remaining_stock?: number | null;
    is_active: boolean;
    photo_key?: string | null;
    created_at: string;
    updated_at: string;
}

export interface BackendRedemption {
    id: string;
    participant_id: string;
    item_id: string;
    item_name: string;
    point_cost: number;
    redeemed_at: string;
    fulfilled_at?: string | null;
    fulfillment_notes?: string | null;
    created_at: string;
}

export async function fetchShopItems() {
    return apiFetch<BackendShopItem[]>('/api/v1/shop');
}

export async function redeemShopItem(itemId: string) {
    return apiFetch<BackendRedemption>(`/api/v1/shop/${encodeURIComponent(itemId)}/redeem`, {
        method: 'POST',
    });
}

