import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import PortalPage from '../components/PortalPage';
import PortalModal from '../components/PortalModal';
import QrPassModal from '../components/QrPassModal';
import ZonePattern from '../components/ZonePattern';
import { GhostButton, PortalCard, PrimaryButton, SectionLabel, StatusPill, ZoneTag } from '../components/primitives';
import { ZONES } from '../lib/data';
import { useToastStore } from '../stores/toastStore';
import { useZoneStore } from '../stores/zoneStore';

type RegisterStage = 'confirm' | 'loading' | 'success';

export default function ZoneDetailPage() {
    const params = useParams();
    const navigate = useNavigate();
    const addToast = useToastStore((state) => state.addToast);
    const registeredZones = useZoneStore((state) => state.registeredZones);
    const qrCodes = useZoneStore((state) => state.qrCodes);
    const registerZone = useZoneStore((state) => state.registerZone);
    const zone = ZONES.find((item) => item.id === params.id);
    const [registerStage, setRegisterStage] = useState<RegisterStage>('confirm');
    const [modalOpen, setModalOpen] = useState(false);
    const [qrFullOpen, setQrFullOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width: 480px)');
    const qrSize = isSmallScreen ? 170 : 200;

    const qr = zone ? qrCodes.find((item) => item.zoneId === zone.id) : null;
    const related = useMemo(() => {
        if (!zone) return [];
        return ZONES.filter((item) => item.id !== zone.id && item.category === zone.category).slice(0, 3);
    }, [zone]);

    if (!zone) {
        return (
            <div className="pt-24 px-6 text-center font-portal-mono text-[12px] text-[var(--fg)]">
                Zone not found.
            </div>
        );
    }

    const isRegistered = registeredZones.includes(zone.id);
    const isChecked = qr?.checkedIn || qr?.isActive === false;

    return (
        <PortalPage className="pt-20 pb-24 px-4 sm:px-5 lg:px-8 max-w-3xl mx-auto">
            <Link
                to="/zones"
                className="inline-block mb-8 font-portal-mono text-[10px] tracking-[0.12em] uppercase text-[var(--amber)] hover:underline"
                data-portal-header
            >
                {'<- BACK TO ZONES'}
            </Link>

            <PortalCard className="p-0 overflow-hidden mb-6" attr>
                <div className="relative h-44 sm:h-48 bg-[var(--surface-2)] overflow-hidden">
                    <ZonePattern zoneId={zone.id} />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--surface)]" />
                </div>
                <div className="px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {zone.tags.map((tag) => (
                                <ZoneTag key={tag}>{tag}</ZoneTag>
                            ))}
                        </div>
                        <div className="font-portal-display text-[32px] sm:text-[40px] leading-[0.9] text-[var(--fg)] uppercase tracking-[0.03em]">
                            {zone.name}
                        </div>
                        <div className="font-portal-body text-[14px] leading-[1.8] text-[color-mix(in_srgb,var(--dim)_74%,white_8%)] mt-3">
                            {zone.description}
                        </div>
                    </div>

                    <PortalCard className="bg-[var(--bg)] p-4 w-full lg:min-w-[190px]">
                        {[
                            ['FORMAT', zone.format ?? 'MIXED'],
                            ['DURATION', zone.duration ?? 'FLEX'],
                            ['TEAM SIZE', zone.teamSize],
                            ['PRIZES', zone.prizes ?? 'ZONE SWAG'],
                            ['POINTS', `${zone.points} PTS ON CHECK-IN`],
                        ].map(([label, value], idx) => (
                            <div
                                key={label}
                                className={`py-3 ${idx < 4 ? 'border-b border-[var(--border-dim)]' : ''}`}
                            >
                                <div className="font-portal-mono text-[9px] tracking-[0.14em] text-[color-mix(in_srgb,var(--amber)_55%,black_15%)] uppercase">
                                    {label}
                                </div>
                                <div className="font-portal-mono text-[12px] tracking-[0.08em] text-[color-mix(in_srgb,var(--fg)_78%,black_8%)] uppercase mt-1">
                                    {value}
                                </div>
                            </div>
                        ))}
                    </PortalCard>
                </div>
                <div className="px-4 sm:px-6 pb-6 font-portal-mono text-[9px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_66%,white_6%)] uppercase">
                    ● {zone.registeredCount} OPERATORS REGISTERED
                </div>
            </PortalCard>

            <PortalCard className="p-5 sm:p-6 mb-6 text-center" attr>
                <SectionLabel className="mb-3">-- ENTRY PASS --</SectionLabel>

                {!isRegistered && (
                    <div className="max-w-sm mx-auto">
                        <div className="font-portal-body text-[13px] text-[color-mix(in_srgb,var(--dim)_74%,white_8%)] leading-relaxed mb-4">
                            You are not registered for this zone yet. Register now to generate your single-use
                            entry pass.
                        </div>
                        <PrimaryButton onClick={() => setModalOpen(true)}>REGISTER and GENERATE PASS</PrimaryButton>
                    </div>
                )}

                {isRegistered && !isChecked && qr && (
                    <>
                        <div className="inline-block border border-[var(--border)] p-4 bg-white mb-4">
                            <QRCodeSVG value={`${zone.name}:${qr.code}`} size={qrSize} bgColor="#ffffff" fgColor="#111111" />
                        </div>
                        <div className="font-portal-mono text-[11px] tracking-[0.1em] text-[var(--fg)] uppercase">
                            {zone.name}
                        </div>
                        <div className="font-portal-mono text-[9px] tracking-[0.12em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-1">
                            PASS ID: {qr.code}
                        </div>
                        <div className="mt-1 flex justify-center">
                            <StatusPill tone="green" label="VALID" />
                        </div>
                        <div className="font-portal-body text-[12px] text-[color-mix(in_srgb,var(--dim)_72%,white_8%)] leading-relaxed mt-4 max-w-xs mx-auto">
                            Show this QR code at the zone entrance. This pass will be deactivated upon scanning.
                        </div>
                        <button
                            type="button"
                            onClick={() => setQrFullOpen(true)}
                            className="mt-3 font-portal-mono text-[9px] tracking-[0.12em] text-[var(--amber)] hover:underline uppercase"
                        >
                            VIEW FULLSCREEN PASS
                        </button>
                    </>
                )}

                {isRegistered && isChecked && (
                    <>
                        <CheckCircle2 className="size-12 text-[var(--portal-green)] mx-auto" />
                        <div className="font-portal-mono text-[13px] tracking-[0.13em] text-[var(--portal-green)] uppercase mt-3">
                            CHECKED IN
                        </div>
                        <div className="font-portal-mono text-[9px] tracking-[0.11em] text-[color-mix(in_srgb,var(--dim)_65%,white_6%)] uppercase mt-1">
                            {qr?.checkedInAt ?? 'Checked in'}
                        </div>
                    </>
                )}
            </PortalCard>

            <div data-portal-card>
                <SectionLabel className="mb-3">{'MORE ZONES ->'}</SectionLabel>
                <div className="font-portal-mono text-[9px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_62%,white_7%)] uppercase mb-3">
                    YOU MIGHT ALSO LIKE
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    {related.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            className="portal-card p-4 text-left"
                            onClick={() => navigate(`/zones/${item.id}`)}
                        >
                            <div className="font-portal-display text-[20px] leading-none text-[var(--fg)] uppercase">
                                {item.shortName}
                            </div>
                            <div className="font-portal-mono text-[10px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_70%,white_7%)] mt-2 uppercase">
                                {item.name}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <PortalModal open={modalOpen} title="CONFIRM REGISTRATION" onClose={() => setModalOpen(false)}>
                {registerStage !== 'success' && (
                    <>
                        <div className="font-portal-display text-[24px] leading-none text-[var(--fg)] uppercase">
                            {zone.name}
                        </div>
                        <div className="font-portal-body text-[13px] text-[color-mix(in_srgb,var(--dim)_74%,white_8%)] leading-relaxed mt-2">
                            A QR code entry pass will be generated for this zone. Present it at the zone entrance
                            for check-in.
                        </div>
                        <div className="grid gap-2 mt-5">
                            <PrimaryButton
                                disabled={registerStage === 'loading'}
                                onClick={async () => {
                                    setRegisterStage('loading');
                                    await new Promise((resolve) => setTimeout(resolve, 1500));
                                    registerZone(zone.id, zone.shortName);
                                    addToast({
                                        type: 'success',
                                        title: 'ENTRY PASS CREATED',
                                        body: `Entry pass created for ${zone.name}.`,
                                    });
                                    setRegisterStage('success');
                                }}
                            >
                                {registerStage === 'loading' ? 'GENERATING PASS...' : 'CONFIRM REGISTRATION'}
                            </PrimaryButton>
                            <GhostButton onClick={() => setModalOpen(false)}>CANCEL</GhostButton>
                        </div>
                    </>
                )}

                {registerStage === 'success' && (
                    <div className="text-center py-2">
                        <CheckCircle2 className="size-8 text-[var(--portal-green)] mx-auto" />
                        <div className="font-portal-mono text-[12px] tracking-[0.12em] uppercase text-[var(--portal-green)] mt-3">
                            REGISTRATION CONFIRMED
                        </div>
                        <button
                            type="button"
                            className="mt-4 min-h-11 px-4 border border-[var(--amber)] text-[var(--amber)] font-portal-mono text-[10px] tracking-[0.13em] uppercase hover:bg-[color-mix(in_srgb,var(--amber)_10%,transparent)]"
                            onClick={() => {
                                setModalOpen(false);
                                setQrFullOpen(true);
                            }}
                        >
                            {'VIEW QR PASS ->'}
                        </button>
                    </div>
                )}
            </PortalModal>

            {qr && (
                <QrPassModal
                    open={qrFullOpen}
                    zoneName={zone.name}
                    code={qr.code}
                    active={Boolean(qr.isActive)}
                    onClose={() => setQrFullOpen(false)}
                />
            )}
        </PortalPage>
    );
}
