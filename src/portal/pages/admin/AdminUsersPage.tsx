import { useCallback, useEffect, useState } from 'react';
import { usersApi } from '../../../api/backend';
import { AdminPageShell } from '../../components/admin/AdminPageShell';
import { GhostButton, PortalCard, PrimaryButton } from '../../components/primitives';
import { getApiErrorMessage } from '../../lib/apiErrorMessage';
import { useToastStore } from '../../stores/toastStore';

type UserRow = Record<string, unknown>;

export default function AdminUsersPage() {
    const addToast = useToastStore((s) => s.addToast);
    const [rows, setRows] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState('');

    const [createEmail, setCreateEmail] = useState('');
    const [createUsername, setCreateUsername] = useState('');
    const [createPassword, setCreatePassword] = useState('');

    const [patchEmail, setPatchEmail] = useState('');
    const [patchUsername, setPatchUsername] = useState('');
    const [patchPassword, setPatchPassword] = useState('');
    const [patchActive, setPatchActive] = useState(true);
    const [patchRole, setPatchRole] = useState('participant');

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const list = await usersApi.list();
            setRows(Array.isArray(list) ? list : []);
        } catch (err) {
            addToast({ type: 'error', title: 'LIST FAILED', body: getApiErrorMessage(err, 'Could not load users.') });
        } finally {
            setLoading(false);
        }
    }, [addToast]);

    useEffect(() => {
        void load();
    }, [load]);

    const onCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await usersApi.create({
                email: createEmail.trim(),
                username: createUsername.trim(),
                password: createPassword,
            });
            addToast({ type: 'success', title: 'USER CREATED', body: createEmail.trim() });
            setCreateEmail('');
            setCreateUsername('');
            setCreatePassword('');
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'CREATE FAILED', body: getApiErrorMessage(err, 'Create failed.') });
        }
    };

    const onLoadOne = async () => {
        const id = selectedId.trim();
        if (!id) return;
        try {
            const u = await usersApi.get(id);
            setPatchEmail(String((u as UserRow).email ?? ''));
            setPatchUsername(String((u as UserRow).username ?? ''));
            setPatchPassword('');
            setPatchActive(Boolean((u as UserRow).is_active ?? true));
            const role = (u as { role?: { name?: string } }).role?.name;
            setPatchRole(role ?? 'participant');
            addToast({ type: 'success', title: 'LOADED', body: `User ${id}` });
        } catch (err) {
            addToast({ type: 'error', title: 'GET FAILED', body: getApiErrorMessage(err, 'Could not load user.') });
        }
    };

    const onUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = selectedId.trim();
        if (!id) return;
        try {
            const payload: Record<string, unknown> = {
                email: patchEmail.trim(),
                username: patchUsername.trim(),
                is_active: patchActive,
                role_name: patchRole,
            };
            if (patchPassword.trim()) payload.password = patchPassword;
            await usersApi.update(id, payload);
            addToast({ type: 'success', title: 'UPDATED', body: id });
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'UPDATE FAILED', body: getApiErrorMessage(err, 'Update failed.') });
        }
    };

    const onDelete = async () => {
        const id = selectedId.trim();
        if (!id) return;
        if (!window.confirm(`Delete user ${id}?`)) return;
        try {
            await usersApi.remove(id);
            addToast({ type: 'success', title: 'DELETED', body: id });
            setSelectedId('');
            await load();
        } catch (err) {
            addToast({ type: 'error', title: 'DELETE FAILED', body: getApiErrorMessage(err, 'Delete failed.') });
        }
    };

    return (
        <AdminPageShell
            title="USERS"
            subtitle="Maps to /api/v1/users — create, list, patch, and delete."
        >
            <PortalCard className="p-5 mb-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <span className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)]">
                        DIRECTORY ({loading ? '…' : rows.length})
                    </span>
                    <GhostButton type="button" className="!w-auto min-h-9 px-4" onClick={() => void load()}>
                        REFRESH
                    </GhostButton>
                </div>
                <div className="font-portal-mono text-[10px] tracking-[0.12em] uppercase text-[color-mix(in_srgb,var(--dim)_70%,white_8%)] mb-2">
                    ID · EMAIL · USERNAME · ROLE
                </div>
                <div className="max-h-64 overflow-auto border border-[var(--border-dim)] divide-y divide-[var(--border-dim)]">
                    {rows.map((u) => (
                        <button
                            key={String(u.id)}
                            type="button"
                            className={`w-full text-left px-3 py-2 font-portal-mono text-[11px] hover:bg-[var(--surface)] ${
                                String(u.id) === selectedId ? 'bg-[var(--surface-2)] text-[var(--amber)]' : 'text-[var(--fg)]'
                            }`}
                            onClick={() => setSelectedId(String(u.id))}
                        >
                            <span className="opacity-70">{String(u.id).slice(0, 8)}…</span> · {String(u.email)} ·{' '}
                            {String(u.username)} ·{' '}
                            {String((u as { role?: { name?: string } }).role?.name ?? '—')}
                        </button>
                    ))}
                    {!loading && rows.length === 0 && (
                        <div className="px-3 py-6 text-center font-portal-mono text-[11px] text-[var(--dim)]">No users</div>
                    )}
                </div>
            </PortalCard>

            <PortalCard className="p-5 mb-5">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)] mb-4">CREATE</div>
                <form onSubmit={onCreate} className="grid sm:grid-cols-3 gap-3">
                    <input
                        type="email"
                        required
                        placeholder="email"
                        value={createEmail}
                        onChange={(e) => setCreateEmail(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    />
                    <input
                        required
                        placeholder="username"
                        value={createUsername}
                        onChange={(e) => setCreateUsername(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    />
                    <input
                        required
                        type="password"
                        placeholder="password"
                        value={createPassword}
                        onChange={(e) => setCreatePassword(e.target.value)}
                        className="min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    />
                    <div className="sm:col-span-3">
                        <PrimaryButton type="submit" className="!w-auto min-h-10 px-6">
                            CREATE USER
                        </PrimaryButton>
                    </div>
                </form>
            </PortalCard>

            <PortalCard className="p-5">
                <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[var(--amber)] mb-4">SELECT & EDIT</div>
                <div className="flex flex-wrap gap-2 mb-4">
                    <input
                        placeholder="user uuid"
                        value={selectedId}
                        onChange={(e) => setSelectedId(e.target.value)}
                        className="flex-1 min-w-[200px] min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                    />
                    <GhostButton type="button" className="!w-auto min-h-11 px-4" onClick={() => void onLoadOne()}>
                        LOAD
                    </GhostButton>
                </div>
                <form onSubmit={onUpdate} className="grid gap-3">
                    <label className="block font-portal-mono text-[9px] uppercase text-[var(--dim)]">
                        email
                        <input
                            value={patchEmail}
                            onChange={(e) => setPatchEmail(e.target.value)}
                            className="mt-1 w-full min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        />
                    </label>
                    <label className="block font-portal-mono text-[9px] uppercase text-[var(--dim)]">
                        username
                        <input
                            value={patchUsername}
                            onChange={(e) => setPatchUsername(e.target.value)}
                            className="mt-1 w-full min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        />
                    </label>
                    <label className="block font-portal-mono text-[9px] uppercase text-[var(--dim)]">
                        new password (optional)
                        <input
                            type="password"
                            value={patchPassword}
                            onChange={(e) => setPatchPassword(e.target.value)}
                            className="mt-1 w-full min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        />
                    </label>
                    <label className="flex items-center gap-2 font-portal-mono text-[11px] text-[var(--fg)]">
                        <input type="checkbox" checked={patchActive} onChange={(e) => setPatchActive(e.target.checked)} />
                        active
                    </label>
                    <label className="block font-portal-mono text-[9px] uppercase text-[var(--dim)]">
                        role_name
                        <select
                            value={patchRole}
                            onChange={(e) => setPatchRole(e.target.value)}
                            className="mt-1 w-full min-h-11 bg-[var(--bg)] border border-[var(--border-dim)] px-3 font-portal-mono text-[12px] text-[var(--fg)]"
                        >
                            <option value="admin">admin</option>
                            <option value="participant">participant</option>
                            <option value="partner">partner</option>
                        </select>
                    </label>
                    <div className="flex flex-wrap gap-2">
                        <PrimaryButton type="submit" className="!w-auto min-h-10 px-6">
                            SAVE CHANGES
                        </PrimaryButton>
                        <GhostButton type="button" className="!w-auto min-h-10 px-6 border-[var(--portal-red)] text-[var(--portal-red)]" onClick={() => void onDelete()}>
                            DELETE
                        </GhostButton>
                    </div>
                </form>
            </PortalCard>
        </AdminPageShell>
    );
}
