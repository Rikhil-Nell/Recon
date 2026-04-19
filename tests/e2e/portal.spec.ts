import { expect, test } from '@playwright/test';

type RouteContext = {
    createdProfiles: unknown[];
    updatedProfiles: unknown[];
    eventRegistrations: string[];
    createdTeams: unknown[];
};

async function stubPortalApi(page: import('@playwright/test').Page, options?: {
    participantProfile?: Record<string, unknown> | null;
    dashboard?: Record<string, unknown>;
    zones?: Array<Record<string, unknown>>;
    registrations?: string[];
    passes?: Array<Record<string, unknown>>;
    teams?: Array<Record<string, unknown>>;
    participants?: Array<Record<string, unknown>>;
    teamDetail?: Record<string, unknown> | null;
    isAdmin?: boolean;
}) {
    const ctx: RouteContext = {
        createdProfiles: [],
        updatedProfiles: [],
        eventRegistrations: [],
        createdTeams: [],
    };

    const participantProfile = options?.participantProfile ?? null;
    const dashboard = options?.dashboard ?? {
        displayName: participantProfile?.display_name ?? 'Ciphercat',
        registrationId: participantProfile?.id ?? 'participant-1',
        pointsBalance: 120,
        zonesCheckedInCount: 2,
        checkedInZoneIds: ['zone-ctf', 'zone-web'],
        eventsRegisteredCount: 3,
        leaderboardRank: 4,
    };
    const zones = options?.zones ?? [
        {
            id: 'zone-ctf',
            name: 'CTF',
            shortName: 'CTF',
            category: 'FLAGSHIP',
            type: 'flagship',
            tags: ['binary', 'web'],
            status: 'green',
            location: 'Block A',
            points: 25,
            registrationRequired: true,
            registrationPoints: 25,
            checkInPoints: 50,
            registeredCount: 12,
            color: '#ffaa00',
        },
        {
            id: 'zone-forensics',
            name: 'Forensics Sprint',
            shortName: 'FOREN',
            category: 'FORENSICS',
            type: 'side',
            tags: ['forensics'],
            status: 'green',
            location: 'Block B',
            points: 10,
            registrationRequired: true,
            registrationPoints: 10,
            checkInPoints: 20,
            registeredCount: 6,
            color: '#00ffaa',
        },
    ];
    const registrations = options?.registrations ?? ['zone-ctf'];
    const passes = options?.passes ?? [
        {
            zoneId: 'zone-ctf',
            code: 'PASS-CTF-001',
            isActive: true,
            checkedInAt: null,
        },
    ];
    const teams = options?.teams ?? [
        {
            id: 'team-1',
            name: 'Zero Cool',
            invite_code: 'AB12CD',
            members: [{ participant_id: 'participant-1', display_name: 'Ciphercat', joined_at: '2026-04-19T08:00:00Z' }],
        },
    ];
    const participants = options?.participants ?? [
        { id: 'participant-1', display_name: 'Ciphercat', institution: 'VIT-AP' },
        { id: 'participant-2', display_name: 'Shellfox', institution: 'VIT-AP' },
    ];

    await page.route('**/api/v1/**', async (route) => {
        const request = route.request();
        const url = new URL(request.url());
        const path = url.pathname;
        const method = request.method();

        if (path.endsWith('/auth/me')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: options?.isAdmin ? 'user-admin' : 'user-1',
                    email: 'ciphercat@example.com',
                    username: 'ciphercat',
                    is_active: true,
                    created_at: '2026-04-19T08:00:00Z',
                    role: { id: options?.isAdmin ? 'role-admin' : 'role-participant', name: options?.isAdmin ? 'admin' : 'participant' },
                }),
            });
        }

        if (path.endsWith('/participants/me') && method === 'GET') {
            if (!participantProfile) {
                return route.fulfill({
                    status: 404,
                    contentType: 'application/json',
                    body: JSON.stringify({ detail: 'Participant profile not found' }),
                });
            }
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(participantProfile),
            });
        }

        if (path.endsWith('/participants/me') && method === 'POST') {
            ctx.createdProfiles.push(request.postDataJSON());
            return route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    id: 'participant-1',
                    user_id: 'user-1',
                    display_name: 'Ciphercat',
                    institution: 'VIT-AP',
                    year: 5,
                    talent_visible: false,
                    talent_contact_shareable: false,
                    created_at: '2026-04-19T08:00:00Z',
                    can_edit: true,
                    is_self: true,
                }),
            });
        }

        if (path.endsWith('/participants/me') && method === 'PATCH') {
            ctx.updatedProfiles.push(request.postDataJSON());
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    ...(participantProfile ?? {}),
                    ...(request.postDataJSON() as Record<string, unknown>),
                }),
            });
        }

        if (path.endsWith('/participants/me/dashboard') || path.endsWith('/me/dashboard')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(dashboard),
            });
        }

        if (path.endsWith('/announcements')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify([]),
            });
        }

        if (path.endsWith('/zones') && method === 'GET') {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(zones),
            });
        }

        if (path.endsWith('/me/registrations')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ zoneIds: registrations }),
            });
        }

        if (path.endsWith('/me/passes')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ passes }),
            });
        }

        if (path.includes('/events/') && path.endsWith('/registrations')) {
            const eventId = path.split('/events/')[1].split('/registrations')[0];
            ctx.eventRegistrations.push(eventId);
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    registrationId: `registration-${eventId}`,
                    eventId,
                    qrToken: `signed-token-${eventId}`,
                    qrExpiresAt: '2026-04-20T08:00:00Z',
                    pointsAwarded: 0,
                    newPointsBalance: 120,
                }),
            });
        }

        if (path.endsWith('/teams/admin') && method === 'GET') {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ teams }),
            });
        }

        if (path.endsWith('/participants/') && method === 'GET') {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(participants),
            });
        }

        if (path.endsWith('/teams/admin') && method === 'POST') {
            ctx.createdTeams.push(request.postDataJSON());
            return route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify(teams[0]),
            });
        }

        if (path.includes('/teams/admin/participants/') && path.endsWith('/team')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    participant_id: 'participant-2',
                    team_id: 'team-1',
                    team_name: 'Zero Cool',
                }),
            });
        }

        if (path.includes('/teams/admin/') && method === 'PATCH') {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(teams[0]),
            });
        }

        if (path.includes('/auth/logout') || path.includes('/auth/refresh') || path.endsWith('/participants/me/talent-visibility')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ status: 'ok' }),
            });
        }

        return route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify(options?.teamDetail ?? {}),
        });
    });

    return ctx;
}

test('profile setup enforces year bounds and submits valid year', async ({ page }) => {
    const ctx = await stubPortalApi(page, { participantProfile: null });

    await page.goto('/profile/setup');
    await page.getByPlaceholder('Alex Operator').fill('Ciphercat');
    await page.getByPlaceholder('VIT-AP University').fill('VIT-AP');

    await page.locator('input[type="number"]').first().fill('0');
    await expect(page.getByText('Year must be at least 1.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'CREATE PROFILE ->' })).toBeDisabled();

    await page.locator('input[type="number"]').first().fill('6');
    await expect(page.getByText('Year must not exceed 5.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'CREATE PROFILE ->' })).toBeDisabled();

    await page.locator('input[type="number"]').first().fill('5');
    await expect(page.getByRole('button', { name: 'CREATE PROFILE ->' })).toBeEnabled();
    await page.getByRole('button', { name: 'CREATE PROFILE ->' }).click();

    await expect.poll(() => ctx.createdProfiles.length).toBe(1);
    expect(ctx.createdProfiles[0]).toMatchObject({ year: 5, display_name: 'Ciphercat', institution: 'VIT-AP' });
});

test('settings blocks invalid year and patches valid update', async ({ page }) => {
    const profile = {
        id: 'participant-1',
        user_id: 'user-1',
        display_name: 'Ciphercat',
        institution: 'VIT-AP',
        year: 2,
        talent_visible: false,
        talent_contact_shareable: false,
        created_at: '2026-04-19T08:00:00Z',
        can_edit: true,
        is_self: true,
    };
    const ctx = await stubPortalApi(page, { participantProfile: profile });

    await page.goto('/settings');
    await expect(page.locator('input').first()).toHaveValue('Ciphercat');

    await page.locator('input[type="number"]').first().fill('6');
    await expect(page.getByText('Year must not exceed 5.')).toBeVisible();
    await expect(page.getByRole('button', { name: 'SAVE PROFILE' })).toBeDisabled();

    await page.locator('input[type="number"]').first().fill('5');
    await page.getByRole('button', { name: 'SAVE PROFILE' }).click();

    await expect.poll(() => ctx.updatedProfiles.length).toBe(1);
    expect(ctx.updatedProfiles[0]).toMatchObject({ year: 5 });
});

test('dashboard shows backend rank and zone registration uses canonical event endpoint', async ({ page }) => {
    const profile = {
        id: 'participant-1',
        user_id: 'user-1',
        display_name: 'Ciphercat',
        institution: 'VIT-AP',
        year: 2,
        talent_visible: false,
        talent_contact_shareable: false,
        created_at: '2026-04-19T08:00:00Z',
        can_edit: true,
        is_self: true,
    };
    const ctx = await stubPortalApi(page, {
        participantProfile: profile,
        dashboard: {
            displayName: 'Ciphercat',
            registrationId: 'participant-1',
            pointsBalance: 320,
            zonesCheckedInCount: 2,
            checkedInZoneIds: ['zone-ctf', 'zone-web'],
            eventsRegisteredCount: 4,
            leaderboardRank: 3,
        },
    });

    await page.goto('/dashboard');
    const stats = page.locator('.grid.grid-cols-2.lg\\:grid-cols-4 > div');
    await expect(stats.nth(2)).toContainText('4');
    await expect(stats.nth(3)).toContainText('#3');

    await page.goto('/zones');
    await page.getByRole('button', { name: 'REGISTER FOR THIS ZONE ->' }).first().click();
    await page.getByRole('button', { name: 'ACKNOWLEDGE ->' }).click();

    await expect.poll(() => ctx.eventRegistrations.includes('FOREN')).toBeTruthy();
});

test('admin teams page creates and reassigns teams', async ({ page }) => {
    const ctx = await stubPortalApi(page, { participantProfile: null, isAdmin: true });

    await page.goto('/admin/teams');
    await page.getByPlaceholder('team name').first().fill('Blue Team');
    await page.getByRole('button', { name: 'CREATE TEAM' }).click();

    await expect.poll(() => ctx.createdTeams.length).toBe(1);
    expect(ctx.createdTeams[0]).toMatchObject({ name: 'Blue Team' });

    await page.getByRole('button', { name: /Zero Cool/ }).click();
    await page.getByPlaceholder('participant uuid').fill('participant-2');
    await page.getByRole('button', { name: 'APPLY ASSIGNMENT' }).click();
});
