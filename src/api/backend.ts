import { apiFetch } from './client';

type AnyObj = Record<string, unknown>;

// auth
export const authApi = {
    googleLoginUrl: '/api/v1/auth/google/login',
    googleCallbackUrl: '/api/v1/auth/google/callback',
    me: () => apiFetch<AnyObj>('/api/v1/auth/me'),
    refresh: () => apiFetch<AnyObj>('/api/v1/auth/refresh', { method: 'POST' }),
    logout: () => apiFetch<AnyObj>('/api/v1/auth/logout', { method: 'POST' }),
};

// users
export const usersApi = {
    create: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/users/', { method: 'POST', json: payload }),
    list: () => apiFetch<AnyObj[]>('/api/v1/users/'),
    get: (userId: string) => apiFetch<AnyObj>(`/api/v1/users/${encodeURIComponent(userId)}`),
    update: (userId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/users/${encodeURIComponent(userId)}`, { method: 'PATCH', json: payload }),
    remove: (userId: string) =>
        apiFetch<void>(`/api/v1/users/${encodeURIComponent(userId)}`, { method: 'DELETE' }),
};

// incidents
export const incidentsApi = {
    create: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/incidents/', { method: 'POST', json: payload }),
    list: () => apiFetch<AnyObj[]>('/api/v1/incidents/'),
    get: (incidentId: string) => apiFetch<AnyObj>(`/api/v1/incidents/${encodeURIComponent(incidentId)}`),
    update: (incidentId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/incidents/${encodeURIComponent(incidentId)}`, { method: 'PATCH', json: payload }),
};

// participants
export const participantsApi = {
    me: () => apiFetch<AnyObj>('/api/v1/participants/me'),
    myDashboard: () => apiFetch<AnyObj>('/api/v1/participants/me/dashboard'),
    createMe: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/participants/me', { method: 'POST', json: payload }),
    updateMe: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/participants/me', { method: 'PATCH', json: payload }),
    updateTalentVisibility: (payload: AnyObj) =>
        apiFetch<AnyObj>('/api/v1/participants/me/talent-visibility', { method: 'PATCH', json: payload }),
    get: (participantId: string) =>
        apiFetch<AnyObj>(`/api/v1/participants/${encodeURIComponent(participantId)}`),
    list: () => apiFetch<AnyObj[]>('/api/v1/participants/'),
    checkIn: (participantId: string) =>
        apiFetch<AnyObj>(`/api/v1/participants/${encodeURIComponent(participantId)}/checkin`, { method: 'POST' }),
};

// points
export const pointsApi = {
    award: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/points/award', { method: 'POST', json: payload }),
    me: (recentLimit = 20) => apiFetch<AnyObj>(`/api/v1/points/me?recent_limit=${recentLimit}`),
    leaderboard: (skip = 0, limit = 50) =>
        apiFetch<AnyObj>(`/api/v1/points/leaderboard?skip=${skip}&limit=${limit}`),
    leaderboardMe: () => apiFetch<AnyObj>('/api/v1/points/leaderboard/me'),
    transactions: (params: URLSearchParams) => apiFetch<AnyObj>(`/api/v1/points/transactions?${params.toString()}`),
};

// zones
export const zonesApi = {
    list: () => apiFetch<AnyObj[]>('/api/v1/zones'),
    get: (zoneId: string) => apiFetch<AnyObj>(`/api/v1/zones/${encodeURIComponent(zoneId)}`),
    register: (zoneId: string) =>
        apiFetch<AnyObj>(`/api/v1/zones/${encodeURIComponent(zoneId)}/register`, { method: 'POST' }),
    unregister: (zoneId: string) =>
        apiFetch<AnyObj>(`/api/v1/zones/${encodeURIComponent(zoneId)}/register`, { method: 'DELETE' }),
    myRegistrations: () => apiFetch<AnyObj>('/api/v1/me/registrations'),
    myPasses: () => apiFetch<AnyObj>('/api/v1/me/passes'),
};

// storage (query params match FastAPI `s3_router`: filename, content_type, optional scope)
export const storageApi = {
    uploadUrl: (filename: string, contentType: string, scope?: string) => {
        const q = new URLSearchParams({
            filename,
            content_type: contentType,
        });
        if (scope) q.set('scope', scope);
        return apiFetch<AnyObj>(`/api/v1/r2/upload-url?${q.toString()}`);
    },
    readUrl: (fileKey: string) =>
        apiFetch<AnyObj>(`/api/v1/r2/read-url?file_key=${encodeURIComponent(fileKey)}`),
};

// partners
export const partnersApi = {
    apply: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/partners/apply', { method: 'POST', json: payload }),
    me: () => apiFetch<AnyObj>('/api/v1/partners/me'),
    addIncentive: (payload: AnyObj) =>
        apiFetch<AnyObj>('/api/v1/partners/me/incentives', { method: 'POST', json: payload }),
    editIncentive: (incentiveId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/partners/me/incentives/${encodeURIComponent(incentiveId)}`, { method: 'PATCH', json: payload }),
    removeIncentive: (incentiveId: string) =>
        apiFetch<void>(`/api/v1/partners/me/incentives/${encodeURIComponent(incentiveId)}`, { method: 'DELETE' }),
    addAsset: (payload: AnyObj) =>
        apiFetch<AnyObj>('/api/v1/partners/me/assets', { method: 'POST', json: payload }),
    removeAsset: (assetId: string) =>
        apiFetch<void>(`/api/v1/partners/me/assets/${encodeURIComponent(assetId)}`, { method: 'DELETE' }),
    list: () => apiFetch<AnyObj[]>('/api/v1/partners/'),
    get: (partnerId: string) => apiFetch<AnyObj>(`/api/v1/partners/${encodeURIComponent(partnerId)}`),
    review: (partnerId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/partners/${encodeURIComponent(partnerId)}/review`, { method: 'POST', json: payload }),
};

// schedule + speakers
export const scheduleApi = {
    listSessions: () => apiFetch<AnyObj[]>('/api/v1/schedule'),
    createSession: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/schedule', { method: 'POST', json: payload }),
    getSession: (sessionId: string) => apiFetch<AnyObj>(`/api/v1/schedule/${encodeURIComponent(sessionId)}`),
    updateSession: (sessionId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/schedule/${encodeURIComponent(sessionId)}`, { method: 'PATCH', json: payload }),
    deleteSession: (sessionId: string) =>
        apiFetch<void>(`/api/v1/schedule/${encodeURIComponent(sessionId)}`, { method: 'DELETE' }),
    attachSpeaker: (sessionId: string, speakerId: string, displayOrder = 0) =>
        apiFetch<void>(
            `/api/v1/schedule/${encodeURIComponent(sessionId)}/speakers?speaker_id=${encodeURIComponent(speakerId)}&display_order=${displayOrder}`,
            { method: 'POST' },
        ),
    detachSpeaker: (sessionId: string, speakerId: string) =>
        apiFetch<void>(`/api/v1/schedule/${encodeURIComponent(sessionId)}/speakers/${encodeURIComponent(speakerId)}`, {
            method: 'DELETE',
        }),
    listSpeakers: () => apiFetch<AnyObj[]>('/api/v1/schedule/speakers/all'),
    createSpeaker: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/schedule/speakers', { method: 'POST', json: payload }),
    updateSpeaker: (speakerId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/schedule/speakers/${encodeURIComponent(speakerId)}`, { method: 'PATCH', json: payload }),
    deleteSpeaker: (speakerId: string) =>
        apiFetch<void>(`/api/v1/schedule/speakers/${encodeURIComponent(speakerId)}`, { method: 'DELETE' }),
};

// announcements
export const announcementsApi = {
    list: () => apiFetch<AnyObj[]>('/api/v1/announcements'),
    get: (announcementId: string) => apiFetch<AnyObj>(`/api/v1/announcements/${encodeURIComponent(announcementId)}`),
    create: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/announcements', { method: 'POST', json: payload }),
    update: (announcementId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/announcements/${encodeURIComponent(announcementId)}`, { method: 'PATCH', json: payload }),
    remove: (announcementId: string) =>
        apiFetch<void>(`/api/v1/announcements/${encodeURIComponent(announcementId)}`, { method: 'DELETE' }),
};

// shop
export const shopApi = {
    list: () => apiFetch<AnyObj[]>('/api/v1/shop'),
    get: (itemId: string) => apiFetch<AnyObj>(`/api/v1/shop/${encodeURIComponent(itemId)}`),
    redeem: (itemId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/shop/${encodeURIComponent(itemId)}/redeem`, { method: 'POST', json: payload }),
    myRedemptions: () => apiFetch<AnyObj[]>('/api/v1/shop/me/redemptions'),
    redemptions: (fulfilled?: boolean) => {
        const q = fulfilled == null ? '' : `?fulfilled=${fulfilled}`;
        return apiFetch<AnyObj[]>(`/api/v1/shop/redemptions${q}`);
    },
    fulfill: (redemptionId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/shop/redemptions/${encodeURIComponent(redemptionId)}/fulfill`, {
            method: 'PATCH',
            json: payload,
        }),
    create: (payload: AnyObj) => apiFetch<AnyObj>('/api/v1/shop', { method: 'POST', json: payload }),
    update: (itemId: string, payload: AnyObj) =>
        apiFetch<AnyObj>(`/api/v1/shop/${encodeURIComponent(itemId)}`, { method: 'PATCH', json: payload }),
};

