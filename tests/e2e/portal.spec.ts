import { expect, test } from '@playwright/test';

type RouteContext = {
    createdProfiles: unknown[];
    updatedProfiles: unknown[];
    eventRegistrations: string[];
    createdTeams: unknown[];
    joinedTeams: unknown[];
    updatedTeams: unknown[];
    deletedTeams: string[];
    adminAssignments: unknown[];
    scanRequests: unknown[];
};

async function stubPortalApi(page: import('@playwright/test').Page, options?: {
    participantProfile?: Record<string, unknown> | null;
    dashboard?: Record<string, unknown>;
    zones?: Array<Record<string, unknown>>;
    registrations?: string[];
    passes?: Array<Record<string, unknown>>;
    teams?: Array<Record<string, unknown>>;
    myTeam?: Record<string, unknown> | null;
    participants?: Array<Record<string, unknown>>;
    huntProgress?: Record<string, unknown>;
    isAdmin?: boolean;
}) {
    const ctx: RouteContext = {
        createdProfiles: [],
        updatedProfiles: [],
        eventRegistrations: [],
        createdTeams: [],
        joinedTeams: [],
        updatedTeams: [],
        deletedTeams: [],
        adminAssignments: [],
        scanRequests: [],
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
            created_by_participant_id: 'participant-1',
            created_at: '2026-04-19T08:00:00Z',
            members: [{ participant_id: 'participant-1', display_name: 'Ciphercat', joined_at: '2026-04-19T08:00:00Z' }],
        },
    ];
    const participants = options?.participants ?? [
        { id: 'participant-1', display_name: 'Ciphercat', institution: 'VIT-AP' },
        { id: 'participant-2', display_name: 'Shellfox', institution: 'VIT-AP' },
    ];
    let currentRegistrations = [...registrations];
    let currentPasses = [...passes];
    let currentTeams = teams.map((team) => ({ ...team, members: [...(team.members ?? [])] }));
    let currentMyTeam = options?.myTeam === undefined
        ? (currentTeams[0] ?? null)
        : (options.myTeam ? { ...options.myTeam, members: [...((options.myTeam.members as Array<Record<string, unknown>> | undefined) ?? [])] } : null);
    let currentPointsBalance = Number(dashboard.pointsBalance ?? 120);
    const currentParticipantId = String(participantProfile?.id ?? 'participant-1');
    const currentParticipantName = String(participantProfile?.display_name ?? 'Ciphercat');
    const currentHuntProgress = options?.huntProgress ?? {
        team_id: String(currentMyTeam?.id ?? 'team-1'),
        team_name: String(currentMyTeam?.name ?? 'Zero Cool'),
        solved_count: 0,
        total_problems: 10,
        remaining_count: 10,
        leaderboard_rank: 4,
        last_solved_at: null,
        completed_at: null,
        finish_rank: null,
        problems: [],
    };
    const registrationLookup = new Map<string, { registrationId: string; eventId: string; zoneId: string }>();

    const findZone = (identifier: string) =>
        zones.find((zone) => zone.id === identifier || String(zone.shortName).toLowerCase() === identifier.toLowerCase()) ?? null;

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

        if (path.includes('/zones/') && method === 'GET') {
            const identifier = decodeURIComponent(path.split('/zones/')[1] ?? '');
            const zone = findZone(identifier);
            return route.fulfill({
                status: zone ? 200 : 404,
                contentType: 'application/json',
                body: JSON.stringify(zone ?? { detail: 'Zone not found' }),
            });
        }

        if (path.endsWith('/me/registrations')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ zoneIds: currentRegistrations }),
            });
        }

        if (path.endsWith('/me/passes')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ passes: currentPasses }),
            });
        }

        if (path.includes('/events/') && path.endsWith('/registrations')) {
            const eventId = path.split('/events/')[1].split('/registrations')[0];
            const zone = findZone(eventId);
            const zoneId = String(zone?.id ?? eventId);
            const registrationId = `registration-${eventId}`;
            ctx.eventRegistrations.push(eventId);
            if (!currentRegistrations.includes(zoneId)) {
                currentRegistrations = [...currentRegistrations, zoneId];
            }
            currentPasses = currentPasses.filter((pass) => String(pass.zoneId) !== zoneId);
            currentPasses.push({
                zoneId,
                code: `PASS-${eventId.toUpperCase()}`,
                isActive: true,
                checkedInAt: null,
            });
            registrationLookup.set(registrationId, { registrationId, eventId, zoneId });
            return route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify({
                    registrationId,
                    eventId,
                    qrToken: `signed-token-${eventId}`,
                    qrExpiresAt: '2026-04-20T08:00:00Z',
                    pointsAwarded: 0,
                    newPointsBalance: currentPointsBalance,
                }),
            });
        }

        if (path.includes('/registrations/') && path.endsWith('/qr')) {
            const registrationId = path.split('/registrations/')[1].split('/qr')[0];
            const registration = registrationLookup.get(registrationId);
            return route.fulfill({
                status: registration ? 200 : 404,
                contentType: 'application/json',
                body: JSON.stringify(
                    registration
                        ? {
                            registrationId,
                            eventId: registration.eventId,
                            qrToken: `signed-token-${registration.eventId}`,
                            qrExpiresAt: '2026-04-20T08:00:00Z',
                            pointsAwarded: 0,
                            newPointsBalance: currentPointsBalance,
                        }
                        : { detail: 'Registration not found' },
                ),
            });
        }

        if (path.endsWith('/points/me')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    participant_id: currentParticipantId,
                    balance: currentPointsBalance,
                }),
            });
        }

        if (path.endsWith('/admin/scans/check-in') && method === 'POST') {
            const payload = request.postDataJSON() as Record<string, unknown>;
            ctx.scanRequests.push(payload);
            const token = String(payload.qrToken ?? '');
            const eventId = token.replace('signed-token-', '');
            const zone = findZone(eventId);
            const awarded = Number(zone?.checkInPoints ?? 0);
            currentPointsBalance += awarded;
            currentPasses = currentPasses.map((pass) => (
                String(pass.zoneId) === String(zone?.id)
                    ? { ...pass, isActive: false, checkedInAt: '2026-04-19T11:00:00Z' }
                    : pass
            ));
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    status: 'checked_in',
                    checkInId: `checkin-${eventId}`,
                    participantId: currentParticipantId,
                    participantName: currentParticipantName,
                    eventId,
                    eventName: zone?.name ?? eventId,
                    pointsAwarded: awarded,
                    newPointsBalance: currentPointsBalance,
                    checkedInAt: '2026-04-19T11:00:00Z',
                }),
            });
        }

        if (path.endsWith('/teams/me') && method === 'GET') {
            if (!currentMyTeam) {
                return route.fulfill({
                    status: 404,
                    contentType: 'application/json',
                    body: JSON.stringify({ detail: 'Participant is not part of a team' }),
                });
            }
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(currentMyTeam),
            });
        }

        if (path.endsWith('/teams/join') && method === 'POST') {
            const payload = request.postDataJSON() as Record<string, unknown>;
            ctx.joinedTeams.push(payload);
            const inviteCode = String(payload.invite_code ?? '').trim().toUpperCase();
            const matched = currentTeams.find((team) => String(team.invite_code).toUpperCase() === inviteCode);
            if (!matched) {
                return route.fulfill({
                    status: 404,
                    contentType: 'application/json',
                    body: JSON.stringify({ detail: 'Team not found' }),
                });
            }
            const nextMember = {
                participant_id: currentParticipantId,
                display_name: currentParticipantName,
                joined_at: '2026-04-19T09:00:00Z',
            };
            const dedupedMembers = [
                ...matched.members.filter((member: Record<string, unknown>) => String(member.participant_id) !== currentParticipantId),
                nextMember,
            ];
            currentMyTeam = { ...matched, members: dedupedMembers };
            currentTeams = currentTeams.map((team) => team.id === matched.id ? currentMyTeam as Record<string, unknown> : team);
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(currentMyTeam),
            });
        }

        if (path.endsWith('/teams/') && method === 'POST') {
            const payload = request.postDataJSON() as Record<string, unknown>;
            ctx.createdTeams.push(payload);
            const created = {
                id: `team-${currentTeams.length + 1}`,
                name: String(payload.name ?? 'New Team'),
                invite_code: 'ZX90QP',
                created_by_participant_id: currentParticipantId,
                created_at: '2026-04-19T08:30:00Z',
                members: [
                    {
                        participant_id: currentParticipantId,
                        display_name: currentParticipantName,
                        joined_at: '2026-04-19T08:30:00Z',
                    },
                ],
            };
            currentTeams = [...currentTeams, created];
            currentMyTeam = created;
            return route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify(created),
            });
        }

        if (path.endsWith('/teams/admin') && method === 'GET') {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({ teams: currentTeams }),
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
            const payload = request.postDataJSON() as Record<string, unknown>;
            ctx.createdTeams.push(payload);
            const created = {
                id: `team-${currentTeams.length + 1}`,
                name: String(payload.name ?? 'Admin Team'),
                invite_code: 'MN45PQ',
                created_by_participant_id: payload.created_by_participant_id ?? null,
                created_at: '2026-04-19T08:45:00Z',
                members: [],
            };
            currentTeams = [...currentTeams, created];
            return route.fulfill({
                status: 201,
                contentType: 'application/json',
                body: JSON.stringify(created),
            });
        }

        if (path.includes('/teams/admin/participants/') && path.endsWith('/team')) {
            const payload = request.postDataJSON() as Record<string, unknown>;
            const participantId = path.split('/teams/admin/participants/')[1].split('/team')[0];
            ctx.adminAssignments.push({ participantId, ...payload });
            const targetTeamId = String(payload.target_team_id ?? '');
            currentTeams = currentTeams.map((team) => ({
                ...team,
                members: team.members.filter((member: Record<string, unknown>) => String(member.participant_id) !== participantId),
            }));
            if (targetTeamId) {
                currentTeams = currentTeams.map((team) => (
                    team.id === targetTeamId
                        ? {
                            ...team,
                            members: [
                                ...team.members,
                                {
                                    participant_id: participantId,
                                    display_name: participants.find((participant) => participant.id === participantId)?.display_name ?? 'Participant',
                                    joined_at: '2026-04-19T09:05:00Z',
                                },
                            ],
                        }
                        : team
                ));
            }
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    participant_id: participantId,
                    team_id: targetTeamId || null,
                    team_name: currentTeams.find((team) => team.id === targetTeamId)?.name ?? null,
                }),
            });
        }

        if (path.includes('/teams/admin/') && method === 'PATCH') {
            const payload = request.postDataJSON() as Record<string, unknown>;
            const teamId = path.split('/teams/admin/')[1];
            ctx.updatedTeams.push({ teamId, ...payload });
            currentTeams = currentTeams.map((team) => (
                team.id === teamId
                    ? {
                        ...team,
                        name: String(payload.name ?? team.name),
                        invite_code: Boolean(payload.regenerate_invite_code) ? 'RG56ST' : String(payload.invite_code ?? team.invite_code),
                    }
                    : team
            ));
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify(currentTeams.find((team) => team.id === teamId)),
            });
        }

        if (path.includes('/teams/admin/') && method === 'DELETE') {
            const teamId = path.split('/teams/admin/')[1];
            ctx.deletedTeams.push(teamId);
            currentTeams = currentTeams.filter((team) => team.id !== teamId);
            return route.fulfill({
                status: 204,
                body: '',
            });
        }

        if (path.endsWith('/treasure-hunt/me/progress')) {
            return route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    ...currentHuntProgress,
                    team_id: String(currentMyTeam?.id ?? currentHuntProgress.team_id),
                    team_name: String(currentMyTeam?.name ?? currentHuntProgress.team_name),
                }),
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
            body: JSON.stringify({}),
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
    await expect(page.getByRole('button', { name: 'VIEW PASS ->' })).toHaveCount(1);
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
    await page.locator('select').selectOption('team-1');
    await page.getByRole('button', { name: 'APPLY ASSIGNMENT' }).click();

    await expect.poll(() => ctx.adminAssignments.length).toBe(1);
    expect(ctx.adminAssignments[0]).toMatchObject({ participantId: 'participant-2', target_team_id: 'team-1' });

    await page.getByRole('button', { name: /Zero Cool/ }).click();
    await page.locator('input[placeholder="team name"]').last().fill('Zero Cool Elite');
    await page.getByRole('button', { name: 'SAVE TEAM' }).click();

    await expect.poll(() => ctx.updatedTeams.length).toBe(1);
    expect(ctx.updatedTeams[0]).toMatchObject({ teamId: 'team-1', name: 'Zero Cool Elite' });

    page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('Delete this team?');
        await dialog.accept();
    });
    await page.getByRole('button', { name: 'DELETE TEAM' }).click();
    await expect.poll(() => ctx.deletedTeams).toContain('team-1');
});

test('hunt team join accepts invite code and redirects into the hunt flow', async ({ page }) => {
    const profile = {
        id: 'participant-2',
        user_id: 'user-2',
        display_name: 'Shellfox',
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
        myTeam: null,
        teams: [
            {
                id: 'team-join',
                name: 'Packet Ninjas',
                invite_code: 'AB12CD',
                created_by_participant_id: 'participant-1',
                created_at: '2026-04-19T08:00:00Z',
                members: [{ participant_id: 'participant-1', display_name: 'lead', joined_at: '2026-04-19T08:00:00Z' }],
            },
        ],
    });

    await page.goto('/hunt/team');
    await page.getByPlaceholder('AB12CD').fill(' ab12cd ');
    await page.getByRole('button', { name: 'JOIN TEAM' }).click();

    await expect.poll(() => ctx.joinedTeams.length).toBe(1);
    expect(ctx.joinedTeams[0]).toMatchObject({ invite_code: 'AB12CD' });
    await expect(page).toHaveURL(/\/hunt$/);
    await expect(page.locator('main').getByText('Packet Ninjas').last()).toBeVisible();
});

test('admin zone scanner awards points when a registered event pass is scanned', async ({ page }) => {
    const ctx = await stubPortalApi(page, { participantProfile: null, isAdmin: true });

    await page.goto('/admin/zone-scanner');
    await expect(page.getByText('ZONE SCANNER').first()).toBeVisible();
    await page.locator('textarea[placeholder="paste the backend-issued qr token or a URL containing it"]').fill('signed-token-FOREN');
    await page.getByRole('button', { name: 'SUBMIT TOKEN' }).click();

    await expect.poll(() => ctx.scanRequests.length).toBe(1);
    await expect(page.getByText('Forensics Sprint')).toBeVisible();
    await expect(page.getByText('Ciphercat earned 20 points.')).toBeVisible();
    await expect(page.getByText('20', { exact: true })).toBeVisible();
    await expect(page.getByText('140', { exact: true })).toBeVisible();
});
