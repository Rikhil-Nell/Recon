import { Gift, Trophy, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';
import PortalPage from '../components/PortalPage';
import PortalModal from '../components/PortalModal';
import { GhostButton, PortalCard, PrimaryButton, SectionLabel, ZoneTag } from '../components/primitives';
import { MERCH_ITEMS } from '../lib/data';
import { generateRedeemCode } from '../lib/utils';
import { useAuthStore } from '../stores/authStore';
import { useToastStore } from '../stores/toastStore';

type RedeemStage = 'confirm' | 'loading' | 'success';

function merchPattern(itemId: string) {
    if (itemId.includes('operator')) {
        return 'linear-gradient(135deg, color-mix(in srgb, var(--amber) 14%, transparent), transparent 72%)';
    }
    if (itemId.includes('stealth')) {
        return 'linear-gradient(180deg, color-mix(in srgb, var(--fg) 10%, transparent), transparent 70%)';
    }
    if (itemId.includes('cap')) {
        return 'radial-gradient(circle at center, color-mix(in srgb, var(--amber) 16%, transparent), transparent 72%)';
    }
    return 'repeating-linear-gradient(90deg, color-mix(in srgb, var(--amber) 10%, transparent) 0 8px, transparent 8px 16px)';
}

export default function MerchPage() {
    const participant = useAuthStore((state) => state.participant);
    const redeemPoints = useAuthStore((state) => state.redeemPoints);
    const addToast = useToastStore((state) => state.addToast);

    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [redeemStage, setRedeemStage] = useState<RedeemStage>('confirm');
    const [redeemCode, setRedeemCode] = useState('');

    const selected = selectedId ? MERCH_ITEMS.find((item) => item.id === selectedId) ?? null : null;
    const points = participant?.points ?? 0;

    const canAfford = (cost: number) => points >= cost;

    const balancePreview = useMemo(() => {
        if (!selected) return points;
        return Math.max(0, points - selected.pointsCost);
    }, [points, selected]);

    const onConfirmRedeem = async () => {
        if (!selected) return;
        setRedeemStage('loading');
        await new Promise((resolve) => setTimeout(resolve, 1500));
        redeemPoints(selected.pointsCost);
        const code = generateRedeemCode();
        setRedeemCode(code);
        setRedeemStage('success');

        addToast({
            type: 'success',
            title: 'REDEMPTION CONFIRMED',
            body: `Redemption confirmed - ${selected.name}.`,
        });
    };

    return (
        <PortalPage className="pt-20 pb-24 lg:pb-8 px-4 sm:px-5 lg:px-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8" data-portal-header>
                <div>
                    <SectionLabel className="mb-2">-- RECON MERCHANDISE --</SectionLabel>
                    <div className="font-portal-display text-[clamp(32px,5vw,60px)] leading-[0.88] text-[var(--fg)]">
                        MERCH
                        <br />
                        <span className="text-[var(--amber)]">STORE</span>
                    </div>
                </div>
                <PortalCard className="hidden md:block px-4 py-3 text-center" attr>
                    <div className="font-portal-mono text-[9px] tracking-[0.16em] uppercase text-[color-mix(in_srgb,var(--amber)_55%,black_20%)]">
                        AVAILABLE
                    </div>
                    <div className="font-portal-display text-[32px] leading-none text-[var(--amber)]">{points}</div>
                    <div className="font-portal-mono text-[9px] tracking-[0.14em] uppercase text-[color-mix(in_srgb,var(--dim)_66%,white_7%)]">
                        POINTS
                    </div>
                </PortalCard>
            </div>

            <PortalCard className="md:hidden px-4 py-3 mb-5 flex justify-between items-center" attr>
                <div className="font-portal-mono text-[10px] tracking-[0.12em] uppercase text-[color-mix(in_srgb,var(--dim)_68%,white_7%)]">
                    AVAILABLE POINTS
                </div>
                <div className="font-portal-display text-[28px] leading-none text-[var(--amber)]">{points} PTS</div>
            </PortalCard>

            <PortalCard className="px-4 py-4 mb-8 bg-[var(--surface)]" attr>
                <SectionLabel className="mb-3">-- HOW TO EARN POINTS --</SectionLabel>
                <div className="flex gap-3 sm:gap-6 overflow-x-auto pb-1">
                    {[
                        { icon: Zap, text: 'Check in to zones -> 50 pts each' },
                        { icon: Trophy, text: 'Compete in CTF or KOTH -> 200 pts' },
                        { icon: Gift, text: 'Zone activities -> variable points' },
                    ].map(({ icon: Icon, text }) => (
                        <div key={text} className="min-w-[170px] sm:min-w-max text-center">
                            <Icon className="size-4 mx-auto text-[var(--amber)]" />
                            <div className="font-portal-mono text-[9px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] uppercase mt-2">
                                {text}
                            </div>
                        </div>
                    ))}
                </div>
            </PortalCard>

            <div className="grid md:grid-cols-2 gap-4" data-portal-card>
                {MERCH_ITEMS.map((item) => {
                    const affordable = canAfford(item.pointsCost);
                    const outOfStock = item.stock <= 0;
                    const missing = Math.max(0, item.pointsCost - points);
                    const progress = Math.min(100, Math.round((points / item.pointsCost) * 100));

                    return (
                        <PortalCard key={item.id} className="p-0 overflow-hidden">
                            <div className="h-44 sm:h-52 bg-[var(--surface-2)] relative" style={{ backgroundImage: merchPattern(item.id) }}>
                                <ZoneTag className="absolute top-3 right-3">
                                    {outOfStock
                                        ? 'SOLD OUT'
                                        : affordable
                                          ? 'AVAILABLE'
                                          : 'NEED MORE PTS'}
                                </ZoneTag>
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="absolute inset-0 w-full h-full object-contain p-3 sm:p-4"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                ) : (
                                    <div className="absolute bottom-3 left-3 font-portal-mono text-[8px] tracking-[0.12em] uppercase text-[color-mix(in_srgb,var(--fg)_56%,black_10%)] bg-[rgba(8,8,7,0.8)] px-2 py-1">
                                        IMAGE COMING SOON
                                    </div>
                                )}
                            </div>

                            <div className="px-4 py-4">
                                <div className="font-portal-mono text-[9px] tracking-[0.14em] uppercase text-[color-mix(in_srgb,var(--amber)_58%,black_20%)]">
                                    {item.type}
                                </div>
                                <div className="font-portal-mono text-[14px] tracking-[0.08em] uppercase text-[var(--fg)] mt-1">
                                    {item.name}
                                </div>
                                <div className="mt-2 flex items-end gap-2">
                                    <div className="font-portal-display text-[28px] leading-none text-[var(--amber)]">
                                        {item.pointsCost}
                                    </div>
                                    <div className="font-portal-mono text-[9px] tracking-[0.12em] uppercase text-[color-mix(in_srgb,var(--dim)_66%,white_7%)] pb-1">
                                        POINTS
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 pb-4">
                                {affordable && !outOfStock ? (
                                    <button
                                        type="button"
                                        className="w-full min-h-11 border border-[var(--amber)] text-[var(--amber)] font-portal-mono text-[11px] tracking-[0.12em] uppercase py-3 hover:bg-[color-mix(in_srgb,var(--amber)_10%,transparent)]"
                                        onClick={() => {
                                            setSelectedId(item.id);
                                            setRedeemStage('confirm');
                                        }}
                                    >
                                        {'REDEEM ->'}
                                    </button>
                                ) : (
                                    <>
                                        <div className="font-portal-mono text-[10px] tracking-[0.1em] uppercase text-[color-mix(in_srgb,var(--dim)_64%,white_7%)]">
                                            {outOfStock ? 'CURRENTLY SOLD OUT' : `NEED ${missing} MORE POINTS`}
                                        </div>
                                        <div className="h-[2px] bg-[var(--border)] mt-2 overflow-hidden">
                                            <div className="h-[2px] bg-[var(--amber)]" style={{ width: `${progress}%` }} />
                                        </div>
                                    </>
                                )}
                            </div>
                        </PortalCard>
                    );
                })}
            </div>

            <PortalModal
                open={Boolean(selected)}
                title="CONFIRM REDEMPTION"
                onClose={() => setSelectedId(null)}
            >
                {selected && (
                    <>
                        {redeemStage !== 'success' && (
                            <>
                                <div className="font-portal-mono text-[13px] tracking-[0.08em] uppercase text-[var(--fg)] leading-relaxed">
                                    {selected.name}
                                </div>
                                <div className="font-portal-mono text-[11px] tracking-[0.12em] uppercase text-[var(--amber)] mt-2">
                                    COST: {selected.pointsCost} POINTS
                                </div>
                                <div className="font-portal-mono text-[10px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_72%,white_8%)] mt-4 leading-relaxed uppercase">
                                    {`${points} -> ${balancePreview} PTS`}
                                </div>
                                <div className="font-portal-mono text-[10px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_70%,white_7%)] mt-3 leading-relaxed">
                                    Visit the merch booth to collect your item. Show your redemption code to the volunteer.
                                </div>
                                <div className="grid gap-2 mt-5">
                                    <PrimaryButton
                                        disabled={redeemStage === 'loading'}
                                        onClick={onConfirmRedeem}
                                    >
                                        {redeemStage === 'loading' ? 'PROCESSING...' : 'CONFIRM REDEMPTION'}
                                    </PrimaryButton>
                                    <GhostButton onClick={() => setSelectedId(null)}>CANCEL</GhostButton>
                                </div>
                            </>
                        )}

                        {redeemStage === 'success' && (
                            <div className="text-center">
                                <div className="font-portal-mono text-[12px] tracking-[0.12em] uppercase text-[var(--portal-green)]">
                                    REDEMPTION CONFIRMED
                                </div>
                                <div className="font-portal-display text-[36px] text-[var(--amber)] leading-none mt-3 tracking-[0.08em]">
                                    {redeemCode}
                                </div>
                                <div className="font-portal-mono text-[9px] tracking-[0.1em] text-[color-mix(in_srgb,var(--dim)_68%,white_7%)] mt-3 uppercase">
                                    Show this code at the RECON merch booth.
                                </div>
                                <button
                                    type="button"
                                    className="mt-4 min-h-11 px-4 border border-[var(--border)] font-portal-mono text-[10px] tracking-[0.12em] uppercase text-[var(--amber)]"
                                    onClick={async () => {
                                        await navigator.clipboard.writeText(redeemCode);
                                        addToast({
                                            type: 'info',
                                            title: 'CODE COPIED',
                                            body: `Redemption code ${redeemCode} copied to clipboard.`,
                                        });
                                    }}
                                >
                                    COPY CODE
                                </button>
                            </div>
                        )}
                    </>
                )}
            </PortalModal>
        </PortalPage>
    );
}
