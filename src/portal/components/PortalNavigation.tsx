import { useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Home, Map, ShoppingBag, User2, Zap } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useAuthStore } from '../stores/authStore';
import { useAnnouncementStore } from '../stores/announcementStore';
import { useZoneStore } from '../stores/zoneStore';
import { EVENT_DATE_RANGE_LABEL } from '../lib/data';

const NAV_ITEMS = [
    { to: '/dashboard', label: 'DASHBOARD' },
    { to: '/zones', label: 'ZONES' },
    { to: '/map', label: 'MAP' },
    { to: '/merch', label: 'MERCH' },
    { to: '/announcements', label: 'UPDATES' },
] as const;

const MOBILE_ITEMS = [
    { to: '/dashboard', label: 'HOME', icon: Home },
    { to: '/zones', label: 'ZONES', icon: Zap },
    { to: '/map', label: 'MAP', icon: Map },
    { to: '/merch', label: 'MERCH', icon: ShoppingBag },
    { to: '/announcements', label: 'UPDATES', icon: Bell },
] as const;

export default function PortalNavigation() {
    const navigate = useNavigate();
    const participant = useAuthStore((state) => state.participant);
    const signOut = useAuthStore((state) => state.signOut);
    const pointsPulseTick = useAuthStore((state) => state.pointsPulseTick);
    const unreadCount = useAnnouncementStore((state) => state.unreadCount);
    const announcements = useAnnouncementStore((state) => state.announcements);
    const resetZones = useZoneStore((state) => state.resetZones);
    const resetAnnouncements = useAnnouncementStore((state) => state.resetAnnouncements);
    const [menuOpen, setMenuOpen] = useState(false);
    const pointsRef = useRef<HTMLDivElement>(null);

    const hasUrgentUnread = useMemo(
        () => announcements.some((item) => item.priority === 'URGENT' && item.unread),
        [announcements],
    );

    useEffect(() => {
        if (!pointsRef.current) return;
        gsap.fromTo(
            pointsRef.current,
            { scale: 1 },
            {
                scale: 1.08,
                duration: 0.2,
                yoyo: true,
                repeat: 1,
                ease: 'power2.out',
            },
        );
    }, [pointsPulseTick]);

    const initial = participant?.name?.[0]?.toUpperCase() ?? 'A';

    return (
        <>
            <header className="fixed top-0 inset-x-0 z-50 h-14 border-b border-[var(--border-dim)] bg-[rgba(8,8,7,0.95)] backdrop-blur-md px-4 lg:px-8">
                <div className="h-full max-w-6xl mx-auto flex items-center justify-between gap-3">
                    <button type="button" className="text-left" onClick={() => navigate('/dashboard')}>
                        <div className="font-portal-display text-[20px] leading-none tracking-[0.04em] text-[var(--fg)]">
                            RECON <span className="text-[var(--amber)]">2026</span>
                        </div>
                        <div className="font-portal-mono text-[8px] tracking-[0.22em] uppercase text-[color-mix(in_srgb,var(--dim)_70%,white_8%)]">
                            PARTICIPANT PORTAL // {EVENT_DATE_RANGE_LABEL}
                        </div>
                    </button>

                    <nav className="hidden lg:flex items-center gap-5">
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `font-portal-mono text-[10px] tracking-[0.15em] pb-1 border-b transition-colors ${
                                        isActive
                                            ? 'text-[var(--amber)] border-[var(--amber)]'
                                            : 'text-[color-mix(in_srgb,var(--dim)_72%,white_6%)] border-transparent hover:text-[var(--fg)]'
                                    }`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="flex items-center gap-2">
                        <div ref={pointsRef} className="flex items-center gap-2 min-h-11 px-2.5">
                            <span className="size-1.5 rounded-full bg-[var(--amber)]" />
                            <div className="leading-none">
                                <div className="font-portal-display text-[18px] text-[var(--amber)]">
                                    {participant?.points ?? 0}
                                </div>
                                <div className="font-portal-mono text-[9px] tracking-[0.2em] text-[color-mix(in_srgb,var(--dim)_75%,white_7%)]">
                                    PTS
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate('/announcements')}
                            className="relative min-h-11 min-w-11 inline-flex items-center justify-center text-[color-mix(in_srgb,var(--dim)_70%,white_8%)] hover:text-[var(--fg)]"
                            aria-label="View announcements"
                        >
                            <Bell className={`size-4 ${hasUrgentUnread ? 'animate-pulse' : ''}`} />
                            {unreadCount > 0 && (
                                <span className="absolute top-1.5 right-1.5 min-w-4 h-4 px-1 rounded-none border border-[var(--portal-red)] text-[9px] leading-3 font-portal-mono text-[var(--portal-red)] bg-[var(--bg)]">
                                    {unreadCount > 9 ? '9+' : unreadCount}
                                </span>
                            )}
                        </button>

                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setMenuOpen((value) => !value)}
                                className="size-8 border border-[var(--border)] bg-[var(--surface)] text-[var(--amber)] font-portal-mono text-[11px] uppercase inline-flex items-center justify-center"
                                aria-label="Open participant menu"
                            >
                                {initial}
                            </button>

                            {menuOpen && (
                                <div className="absolute right-0 mt-2 w-52 portal-card p-3 bg-[var(--surface-2)] z-[120]">
                                    <div className="font-portal-mono text-[10px] text-[var(--amber)] tracking-[0.18em] uppercase">
                                        {participant?.name ?? 'Participant'}
                                    </div>
                                    <div className="font-portal-mono text-[9px] text-[color-mix(in_srgb,var(--dim)_78%,white_6%)] mt-1">
                                        {participant?.registrationId}
                                    </div>
                                    <button
                                        type="button"
                                        className="mt-3 w-full min-h-11 border border-[var(--border-dim)] hover:border-[var(--amber)] font-portal-mono text-[10px] tracking-[0.12em] uppercase text-[var(--fg)] inline-flex items-center justify-center gap-2"
                                        onClick={() => {
                                            setMenuOpen(false);
                                            signOut();
                                            resetZones();
                                            resetAnnouncements();
                                            navigate('/login');
                                        }}
                                    >
                                        <User2 className="size-3.5" />
                                        SIGN OUT
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <nav
                className="fixed lg:hidden bottom-0 inset-x-0 z-50 border-t border-[var(--border-dim)] bg-[var(--bg)] grid grid-cols-5"
                style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
            >
                {MOBILE_ITEMS.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `min-h-[60px] flex flex-col items-center justify-center gap-0.5 ${
                                    isActive
                                        ? 'text-[var(--amber)]'
                                        : 'text-[color-mix(in_srgb,var(--dim)_64%,white_6%)]'
                                }`
                            }
                        >
                            <div className="relative">
                                <Icon className="size-4" />
                                {item.to === '/announcements' && unreadCount > 0 && (
                                    <span className="absolute -top-2.5 -right-2 min-w-4 h-4 px-1 border border-[var(--portal-red)] text-[9px] leading-3 bg-[var(--bg)] text-[var(--portal-red)] font-portal-mono">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </div>
                            <span className="font-portal-mono text-[8px] tracking-[0.16em]">{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </>
    );
}
