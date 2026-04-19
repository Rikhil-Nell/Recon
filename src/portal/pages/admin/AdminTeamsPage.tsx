import { useCallback, useEffect, useMemo, useState } from 'react';
import { participantsApi, teamsApi } from '../../../api/backend';
import { AdminPageShell } from '../../components/admin/AdminPageShell';
import { GhostButton, PortalCard, PrimaryButton } from '../../components/primitives';
import { getApiErrorMessage } from '../../lib/apiErrorMessage';
import { useToastStore } from '../../stores/toastStore';

type TeamMember = {
    participant_id: string;
    display_name: string;
    joined_at: string;
};

type TeamRow = {
    id: string;
    name: string;
    invite_code: string;
    created_by_participant_id?: string | null;
    members: TeamMember[];
};

type ParticipantRow = {
    id: string;
    display_name?: string;
    institution?: string;
};

export default function AdminTeamsPage() {
    const addToast = useToastStore((s) => s.addToast);
    const [teams, setTeams] = useState<TeamRow[]>([]);
    const [participants, setParticipants] = useState<ParticipantRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTeamId, setSelectedTeamId] = useState('');
    const [teamName, setTeamName] = useState('');
    const [teamInviteCode, setTeamInviteCode] = useState('');
    const [regenerateInviteCode, setRegenerateInviteCode] = useState(false);
    const [createdByParticipantId, setCreatedByParticipantId] = useState('');
    const [newTeamName, setNewTeamName] = useState('');
    const [newMemberIds, setNewMemberIds] = useState('');
    const [assignParticipantId, setAssignParticipantId] = useState('');
    const [assignTargetTeamId, setAssignTargetTeamId] = useState('');

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const [teamList, participantList] = await Promise.all([
                teamsApi.listAdmin(),
                participantsApi.list(),
            ]);
            const rows = Array.isArray((teamList as { teams?: TeamRow[] }).teams)
                ? (teamList as { teams: TeamRow[] }).teams
                : [];
            setTeams(rows);
            setParticipants(Array.isArray(participantList) ? participantList as ParticipantRow[] : []);
        } catch (err) {
            addToast({ type: 'error', title: 'LOAD FAILED', body: getApiErrorMessage(err, 'Could not load teams.') });
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        void load();
    }, [load]);

    const selectedTeam = useMemo(
        () => teams.find((team) => team.id === selectedTeamId) ?? null,
        [selectedTeamId, teams],
    );

    useEffect(() => {
        if (!selectedTeam) {
            setTeamName('');
            setTeamInviteCode('');
            setCreatedByParticipantId('');
            setRegenerateInviteCode(false);
            return;
        }
        setTeamName(selectedTeam.name);
        setTeamInviteCode(selectedTeam.invite_code);
        setCreatedByParticipantId(selectedTeam.created_by_participant_id ?? '');
        setRegenerateInviteCode(false);
    }, [selectedTeam]);

    const parseMemberIds = (value: string) =>
        value
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean);

    const onCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await teamsApi.createAdmin({
                name: newTeamName.trim(),
                member_participant_ids: parseMemberIds(newMemberIds),
                created_by_participant_id: createdByParticipantId.trim() || null,
            });
            addToast({ type: 'success', title: 'TEAM CREATED', body: newTeamName.trim() });
            setNewTeamName('');
            setNewMemberIds('');
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'CREATE FAILED', body: getApiErrorMessage(err, 'Could not create team.') });
        }
    };

    const onUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedTeamId) return;
        try {
            await teamsApi.updateAdmin(selectedTeamId, {
                name: teamName.trim(),
                invite_code: teamInviteCode.trim() || null,
                regenerate_invite_code: regenerateInviteCode,
                created_by_participant_id: createdByParticipantId.trim() || null,
            });
            addToast({ type: 'success', title: 'TEAM UPDATED', body: teamName.trim() });
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'UPDATE FAILED', body: getApiErrorMessage(err, 'Could not update team.') });
        }
    };

    const onDelete = async () => {
        if (!selectedTeamId) return;
        if (!window.confirm('Delete this team?')) return;
        try {
            await teamsApi.deleteAdmin(selectedTeamId);
            addToast({ type: 'success', title: 'TEAM DELETED', body: selectedTeamId });
            setSelectedTeamId('');
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'DELETE FAILED', body: getApiErrorMessage(err, 'Could not delete team.') });
        }
    };

    const onAssign = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!assignParticipantId.trim()) return;
        try {
            await teamsApi.assignParticipant(assignParticipantId.trim(), {
                target_team_id: assignTargetTeamId.trim() || null,
            });
            addToast({
                type: 'success',
                title: assignTargetTeamId.trim() ? 'PARTICIPANT ASSIGNED' : 'PARTICIPANT REMOVED',
                body: assignParticipantId.trim(),
            });
            setAssignParticipantId('');
            setAssignTargetTeamId('');
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'ASSIGNMENT FAILED', body: getApiErrorMessage(err, 'Could not move participant.') });
        }
    };

    return (
        <AdminPageShell
            title="TEAMS"
            subtitle="Admin team creation, invite management, roster review, and participant reassignment."
        >
            <PortalCard className="p-5 mb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)]">
                        TEAMS ({loading ? '…' : teams.length})
                    </span>
                    <GhostButton type="button" className="!w-auto min-h-9 px-4" onClick={() => void load()}>
                        REFRESH
                    </GhostButton>
                </div>
                <div className="max-h-56 overflow-auto border border-[var(--border-dim)] divide-y divide-[var(--border-dim)]">
                    {teams.map((team) => (
                        <button
                            key={team.id}
                            type="button"
                            className={`w-full text-left px-3 py-2 font-portal-mono text-[11px] hover:bg-[var(--surface)] ${
                                team.id === selectedTeamId ? 'bg-[var(--surface-2)] text-[var(--amber)]' : 'text-[var(--fg)]'
                            }`}
                            onClick={() => setSelectedTeamId(team.id)}
                        >
                            {team.name} · {team.members.length} members · {team.invite_code}
                        </button>
                    ))}
                    {!loading && teams.length === 0 && (
                        <div className="px-3 py-6 text-center font-portal-mono text-[11px] text-[var(--dim)]">No teams</div>
                    )}
                </div>
            </PortalCard>

            <PortalCard className="p-5 mb-5">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)] mb-4">CREATE TEAM</div>
                <form onSubmit={onCreate} className="grid gap-3">
                    <input
                        placeholder="team name"
                        value={newTeamName}
                        onChange={(e) => setNewTeamName(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        required
                    />
                    <input
                        placeholder="member participant ids (comma-separated, optional)"
                        value={newMemberIds}
                        onChange={(e) => setNewMemberIds(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    />
                    <PrimaryButton type="submit" className="!w-auto min-h-10 px-6">
                        CREATE TEAM
                    </PrimaryButton>
                </form>
            </PortalCard>

            <PortalCard className="p-5 mb-5">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)] mb-4">EDIT TEAM</div>
                <form onSubmit={onUpdate} className="grid gap-3">
                    <input
                        placeholder="team uuid"
                        value={selectedTeamId}
                        onChange={(e) => setSelectedTeamId(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    />
                    <input
                        placeholder="team name"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        disabled={!selectedTeam}
                    />
                    <input
                        placeholder="invite code"
                        value={teamInviteCode}
                        onChange={(e) => setTeamInviteCode(e.target.value.toUpperCase())}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)] uppercase"
                        disabled={!selectedTeam}
                    />
                    <label className="flex items-center gap-2 font-portal-mono text-[11px] text-[var(--fg)]">
                        <input
                            type="checkbox"
                            checked={regenerateInviteCode}
                            onChange={(e) => setRegenerateInviteCode(e.target.checked)}
                            disabled={!selectedTeam}
                        />
                        regenerate invite code
                    </label>
                    <div className="flex flex-wrap gap-2">
                        <PrimaryButton type="submit" className="!w-auto min-h-10 px-6" disabled={!selectedTeam}>
                            SAVE TEAM
                        </PrimaryButton>
                        <GhostButton
                            type="button"
                            className="!w-auto min-h-10 px-6 border-[var(--portal-red)] text-[var(--portal-red)]"
                            disabled={!selectedTeam}
                            onClick={() => void onDelete()}
                        >
                            DELETE TEAM
                        </GhostButton>
                    </div>
                </form>
                {selectedTeam && (
                    <div className="mt-5 border-t border-[var(--border-dim)] pt-5">
                        <div className="font-portal-mono text-[9px] uppercase text-[var(--dim)] mb-3">Roster</div>
                        <div className="space-y-2">
                            {selectedTeam.members.map((member) => (
                                <div key={member.participant_id} className="font-portal-mono text-[11px] text-[var(--fg)]">
                                    {member.display_name} · {member.participant_id.slice(0, 8)}…
                                </div>
                            ))}
                            {selectedTeam.members.length === 0 && (
                                <div className="font-portal-mono text-[11px] text-[var(--dim)]">No members</div>
                            )}
                        </div>
                    </div>
                )}
            </PortalCard>

            <PortalCard className="p-5">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)] mb-4">ASSIGN PARTICIPANT</div>
                <form onSubmit={onAssign} className="grid gap-3">
                    <input
                        placeholder="participant uuid"
                        value={assignParticipantId}
                        onChange={(e) => setAssignParticipantId(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        required
                    />
                    <select
                        value={assignTargetTeamId}
                        onChange={(e) => setAssignTargetTeamId(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    >
                        <option value="">remove from team</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <PrimaryButton type="submit" className="!w-auto min-h-10 px-6">
                        APPLY ASSIGNMENT
                    </PrimaryButton>
                </form>
                <div className="mt-5 border-t border-[var(--border-dim)] pt-5">
                    <div className="font-portal-mono text-[9px] uppercase text-[var(--dim)] mb-3">Participants</div>
                    <div className="max-h-56 overflow-auto space-y-2">
                        {participants.map((participant) => (
                            <button
                                key={participant.id}
                                type="button"
                                className="w-full text-left font-portal-mono text-[11px] text-[var(--fg)] border border-[var(--border-dim)] px-3 py-2 hover:border-[var(--amber)]"
                                onClick={() => setAssignParticipantId(participant.id)}
                            >
                                {(participant.display_name ?? 'Participant')} · {participant.id.slice(0, 8)}…
                            </button>
                        ))}
                    </div>
                </div>
            </PortalCard>
        </AdminPageShell>
    );
}
