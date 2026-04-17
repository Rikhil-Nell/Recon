import { ApiError } from '../api/client';

export function getApiErrorMessage(err: unknown, fallback: string): string {
    if (err instanceof ApiError) {
        const b = err.body;
        if (typeof b === 'object' && b && 'detail' in b) {
            const d = (b as { detail: unknown }).detail;
            if (typeof d === 'string') return d;
            return JSON.stringify(d);
        }
        return err.message || fallback;
    }
    if (err instanceof Error) return err.message;
    return fallback;
}
