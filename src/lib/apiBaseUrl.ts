/**
 * Resolves the FastAPI base URL for browser fetches.
 * - VITE_API_BASE_URL wins when set (preferred in CI / Vercel).
 * - Production on reconhq.tech without env: use api subdomain so credentialed calls hit the API
 *   (relative `/api/...` on Vercel would go to the static host and omit api.reconhq.tech cookies).
 */
export function getApiBaseUrl(): string {
    const envUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.trim();
    if (envUrl) return envUrl;
    if (!import.meta.env.PROD) {
        return 'http://localhost:8000';
    }
    if (typeof window !== 'undefined') {
        const host = window.location.hostname;
        if (host === 'www.reconhq.tech' || host === 'reconhq.tech') {
            return 'https://api.reconhq.tech';
        }
    }
    return '';
}
