import { useEffect, useMemo, useState } from 'react';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import gsap from 'gsap';
import PortalPage from '../components/PortalPage';
import QrPassModal from '../components/QrPassModal';
import { PortalCard, SectionLabel, StatusPill, ZoneTag } from '../components/primitives';
import { EVENT_END_ISO, ZONES } from '../lib/data';
import { formatCountdown } from '../lib/utils';
import { useAnnouncementStore } from '../stores/announcementStore';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';
import { useZoneStore } from '../stores/zoneStore';

const MAX_POINTS = 1000;

export default function DashboardPage() {
    const navigate = useNavigate();
    const participant = useAuthStore((state) => state.participant);
    const addPoints = useAuthStore((state) => state.addPoints);
    const addCheckedInZone = useAuthStore((state) => state.addCheckedInZone);
    const lastPointsDelta = useAuthStore((state) => state.lastPointsDelta);
    const clearPointsDelta = useAuthStore((state) => state.clearPointsDelta);
    const registeredZones = useZoneStore((state) => state.registeredZones);
    const qrCodes = useZoneStore((state) => state.qrCodes);
    const markCheckedIn = useZoneStore((state) => state.markCheckedIn);
    const announcements = useAnnouncementStore((state) => state.announcements);
    const unreadCount = useAnnouncementStore((state) => state.unreadCount);
    const addToast = useToastStore((state) => state.addToast);

    const [timer, setTimer] = useState('00:00:00');
    const [displayPoints, setDisplayPoints] = useState(0);
    const [openPassZoneId, setOpenPassZoneId] = useState<string | null>(null);
    const [showDelta, setShowDelta] = useState<number | null>(null);

    useEffect(() => {
        const tick = () => {
            const left = new Date(EVENT_END_ISO).getTime() - Date.now();
            setTimer(formatCountdown(left));
        };
        tick();
        const id = window.setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        const target = participant?.points ?? 0;
        const obj = { value: displayPoints };
        gsap.to(obj, {
            value: target,
            duration: 0.6,
            ease: 'power2.out',
            onUpdate: () => setDisplayPoints(Math.round(obj.value)),
        });
    }, [participant?.points]);

    useEffect(() => {
        if (!lastPointsDelta) return;
        setShowDelta(lastPointsDelta);
        const id = window.setTimeout(() => {
            setShowDelta(null);
            clearPointsDelta();
        }, 1000);
        return () => clearTimeout(id);
    }, [clearPointsDelta, lastPointsDelta]);

    const activePasses = useMemo(
        () => qrCodes.filter((code) => registeredZones.includes(code.zoneId)),
        [qrCodes, registeredZones],
    );

    const openPass = activePasses.find((item) => item.zoneId === openPassZoneId);
    const openZone = ZONES.find((zone) => zone.id === openPassZoneId);

    const zonesVisited = participant?.checkedInZones.length ?? 0;
    const registrations = registeredZones.length;
    const rank = 42;

    const onSimulateZoneUpdate = () => {
        const next = qrCodes.find((code) => code.isActive);
        if (!next) {
            addToast({
                type: 'info',
                title: 'NO PENDING CHECK-INS',
                body: 'All active entry passes are already marked as checked in.',
            });
            return;
        }
        const zone = ZONES.find((item) => item.id === next.zoneId);
        if (!zone) return;

        markCheckedIn(zone.id);
        addCheckedInZone(zone.id);
        addPoints(zone.points);
        addToast({
            type: 'success',
            title: 'CHECK-IN CONFIRMED',
            body: `${zone.name} updated. +${zone.points} PTS added to your account.`,
        });
    };

    return (
        <PortalPage className="pt-20 pb-24 lg:pb-8 px-4 sm:px-5 lg:px-8 max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-6 sm:mb-8" data-portal-header>
                <div>
                    <div className="font-portal-mono text-[10px] tracking-[0.2em] uppercase text-[color-mix(in_srgb,var(--amber)_60%,black_18%)] mb-1">
                        WELCOME BACK, OPERATOR
                    </div>
                    <div className="font-portal-display text-[clamp(28px,8vw,52px)] leading-none text-[var(--fg)] tracking-[0.03em]">
                        {participant?.name}
                    </div>
                    <div className="font-portal-mono text-[10px] tracking-[0.12em] text-[color-mix(in_srgb,var(--dim)_70%,white_8%)] mt-1">
                        ID: {participant?.registrationId} // STATUS: ACTIVE
                    </div>
                </div>

                <PortalCard className="hidden lg:block px-4 py-3" attr>
                    <div className="font-portal-mono text-[9px] tracking-[0.18em] text-[color-mix(in_srgb,var(--amber)_55%,black_18%)] uppercase mb-1">
                        EVENT ENDS IN
                    </div>
                    <div className="font-portal-display text-[28px] leading-none text-[var(--fg)]">{timer}</div>
                    <div className="font-portal-mono text-[8px] tracking-[0.16em] text-[color-mix(in_srgb,var(--dim)_60%,white_8%)] mt-1 uppercase">
                        HH:MM:SS
                    </div>
                </PortalCard>
            </div>

            <PortalCard className="lg:hidden px-4 py-3 mb-6" attr>
                <div className="font-portal-mono text-[9px] tracking-[0.18em] text-[color-mix(in_srgb,var(--amber)_55%,black_18%)] uppercase mb-1">
                    EVENT ENDS IN
                </div>
                <div className="font-portal-display text-[26px] leading-none text-[var(--fg)]">{timer}</div>
                <div className="font-portal-mono text-[8px] tracking-[0.16em] text-[color-mix(in_srgb,var(--dim)_60%,white_8%)] mt-1 uppercase">
                    HH:MM:SS
                </div>
            </PortalCard>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                <PortalCard className="px-4 py-5 relative overflow-hidden" attr>
                    <div className="font-portal-display text-[32px] sm:text-[40px] leading-none text-[var(--amber)]">{displayPoints}</div>
                    {showDelta !== null && (
                        <div className="absolute right-4 top-3 text-[var(--amber)] font-portal-mono text-[10px] tracking-[0.14em] animate-points-up">
                            {showDelta > 0 ? `+${showDelta}` : showDelta} PTS
                        </div>
                    )}
                    <div className="font-portal-mono text-[9px] tracking-[0.15em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-2">
                        TOTAL POINTS
                    </div>
                    <div className="h-[2px] bg-[var(--border)] mt-3 overflow-hidden">
                        <div
                            className="h-[2px] bg-[var(--amber)] transition-all duration-500"
                            style={{ width: `${Math.min(100, (displayPoints / MAX_POINTS) * 100)}%` }}
                        />
                    </div>
                </PortalCard>

                <PortalCard className="px-4 py-5" attr>
                    <div className="font-portal-display text-[32px] sm:text-[40px] leading-none text-[var(--fg)]">
                        {zonesVisited} / 11
                    </div>
                    <div className="font-portal-mono text-[9px] tracking-[0.15em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-2">
                        ZONES CHECKED IN
                    </div>
                </PortalCard>

                <PortalCard className="px-4 py-5" attr>
                    <div className="font-portal-display text-[32px] sm:text-[40px] leading-none text-[var(--fg)]">{registrations}</div>
                    <div className="font-portal-mono text-[9px] tracking-[0.15em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-2">
                        EVENTS REGISTERED
                    </div>
                </PortalCard>

                <PortalCard className="px-4 py-5" attr>
                    <div className="font-portal-display text-[32px] sm:text-[40px] leading-none text-[var(--amber)]">#{rank}</div>
                    <div className="font-portal-mono text-[9px] tracking-[0.15em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-2">
                        LEADERBOARD RANK
                    </div>
                </PortalCard>
            </div>

            <div className="mb-8" data-portal-card>
                <SectionLabel>-- ACTIVE ENTRY PASSES --</SectionLabel>
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                    {activePasses.map((pass) => {
                        const zone = ZONES.find((item) => item.id === pass.zoneId);
                        if (!zone) return null;
                        return (
                            <button
                                key={pass.zoneId}
                                type="button"
                                className="portal-card min-w-[170px] sm:min-w-[180px] p-4 text-left"
                                onClick={() => setOpenPassZoneId(zone.id)}
                            >
                                <ZoneTag>{zone.shortName}</ZoneTag>
                                <div className="font-portal-mono text-[11px] mt-2 text-[var(--fg)] tracking-[0.08em] uppercase">
                                    {zone.name}
                                </div>
                                <div className="mt-3 inline-block border border-[var(--border)] bg-white p-2">
                                    <QRCodeSVG value={`${zone.name}:${pass.code}`} size={100} bgColor="#ffffff" fgColor="#111111" />
                                </div>
                                <div className="mt-3">
                                    <StatusPill tone={pass.isActive ? 'green' : 'red'} label={pass.isActive ? 'VALID' : 'USED'} />
                                </div>
                                <div className="mt-2 font-portal-mono text-[8px] tracking-[0.12em] text-[color-mix(in_srgb,var(--dim)_65%,white_6%)] uppercase">
                                    Tap to expand
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="mb-8" data-portal-card>
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <SectionLabel>-- LATEST ANNOUNCEMENTS --</SectionLabel>
                    <Link
                        to="/announcements"
                        className="font-portal-mono text-[10px] tracking-[0.15em] text-[var(--amber)] uppercase hover:underline"
                    >
                        {'VIEW ALL ->'}
                    </Link>
                </div>
                <div className="mt-3 space-y-3">
                    {announcements.slice(0, 2).map((item) => (
                        <PortalCard key={item.id} className="px-4 py-4">
                            <div className="font-portal-mono text-[8px] tracking-[0.12em] text-[color-mix(in_srgb,var(--dim)_62%,white_7%)] uppercase">
                                {item.timeLabel}
                            </div>
                            <div className="font-portal-mono text-[12px] text-[var(--fg)] mt-1 tracking-[0.07em] uppercase">
                                {item.title}
                            </div>
                            <div className="font-portal-body text-[13px] leading-relaxed text-[color-mix(in_srgb,var(--dim)_75%,white_8%)] mt-2">
                                {item.body}
                            </div>
                            <div className="mt-3">
                                <ZoneTag>{item.category}</ZoneTag>
                            </div>
                        </PortalCard>
                    ))}
                </div>
            </div>

            <div data-portal-card>
                <SectionLabel>-- QUICK ACTIONS --</SectionLabel>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                    {[
                        {
                            label: 'ZONES',
                            title: 'BROWSE ZONES',
                            desc: 'Register for events and generate entry passes.',
                            onClick: () => navigate('/zones'),
                        },
                        {
                            label: 'MAP',
                            title: 'VIEW CAMPUS MAP',
                            desc: 'Find your zone location across Central Block.',
                            onClick: () => navigate('/map'),
                        },
                        {
                            label: 'MERCH',
                            title: 'REDEEM MERCH',
                            desc: `${participant?.points ?? 0} points currently available for redemption.`,
                            onClick: () => navigate('/merch'),
                        },
                        {
                            label: 'UPDATES',
                            title: 'VIEW UPDATES',
                            desc: `${unreadCount} unread command announcements waiting.`,
                            onClick: () => navigate('/announcements'),
                        },
                    ].map((item) => (
                        <button
                            key={item.title}
                            type="button"
                            className="portal-card p-5 text-left hover:border-[var(--amber)]"
                            onClick={item.onClick}
                        >
                            <div className="font-portal-mono text-[10px] tracking-[0.16em] uppercase text-[var(--amber)]">
                                {item.label}
                            </div>
                            <div className="font-portal-mono text-[12px] text-[var(--fg)] tracking-[0.08em] uppercase mt-1">
                                {item.title}
                            </div>
                            <div className="font-portal-body text-[13px] text-[color-mix(in_srgb,var(--dim)_72%,white_7%)] mt-2 leading-relaxed">
                                {item.desc}
                            </div>
                            <div className="mt-3 text-right text-[var(--amber)] inline-flex w-full justify-end">
                                <ChevronRight className="size-4" />
                            </div>
                        </button>
                    ))}
                </div>

                <button
                    type="button"
                    className="mt-4 w-full min-h-11 border border-[color-mix(in_srgb,var(--amber)_45%,var(--border))] text-[var(--amber)] font-portal-mono text-[9px] sm:text-[10px] tracking-[0.14em] uppercase px-2 hover:bg-[color-mix(in_srgb,var(--amber)_8%,transparent)]"
                    onClick={onSimulateZoneUpdate}
                >
                    SIMULATE ZONE CHECK-IN UPDATE (+POINTS)
                </button>
            </div>

            {openPass && openZone && (
                <QrPassModal
                    open={Boolean(openPassZoneId)}
                    zoneName={openZone.name}
                    code={openPass.code}
                    active={openPass.isActive}
                    onClose={() => setOpenPassZoneId(null)}
                />
            )}
        </PortalPage>
    );
}
