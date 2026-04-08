import { partners, communityPartners, type Partner } from '../data';
import { Section, Label } from './ui';
import GlyphGrid from './GlyphGrid';

const TIER_ORDER = ['title', 'co-title', 'gold', 'silver', 'community'] as const;
const TIER_LABELS: Record<string, string> = {
    title: 'Title Sponsor',
    'co-title': 'Co-Title Sponsor',
    gold: 'Gold Sponsors',
    silver: 'Silver Sponsors',
    community: 'Community Partners',
};

const SIZE_CLASS: Record<NonNullable<Partner['size']>, string> = {
    sm: 'max-h-8',
    md: 'max-h-10',
    lg: 'max-h-12',
};

function logoImgClass(partner: Partner) {
    const size = SIZE_CLASS[partner.size ?? 'md'];
    // Base filter: grayscale → sepia gives a warm cream tone for light/coloured logos
    // On hover: remove sepia for a crisp reveal; bump opacity
    const base = `object-contain transition-all duration-200 opacity-70 group-hover:opacity-100 filter grayscale sepia group-hover:sepia-0 ${size}`;
    // 'brighten' = logo is faint; boost brightness/contrast so it reads on dark bg
    if (partner.fix === 'brighten') return `${base} brightness-125 contrast-110`;
    // 'invert' = logo is already supplied as a white/-light variant; no extra CSS needed
    return base;
}

export default function Sponsors() {
    const grouped = TIER_ORDER.map((tier) => ({
        tier,
        label: TIER_LABELS[tier],
        items: partners.filter((p) => p.tier === tier),
    })).filter((g) => g.items.length > 0);

    return (
        <Section className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-start justify-between">
                    <Label>Sponsors &amp; Partners</Label>
                    <GlyphGrid type="hex" cols={4} rows={2} className="hidden md:block opacity-30" />
                </div>

                <h2 className="font-display text-3xl md:text-4xl text-paper tracking-tight leading-tight mt-2">
                    Powered by the security community
                </h2>
                <p className="mt-4 font-body text-sm text-muted leading-relaxed max-w-2xl">
                    RECON 2026 is made possible by organizations that believe in building the next generation of security talent.
                </p>

                <div className="mt-16 space-y-16">
                    {grouped.map((group) => (
                        <div key={group.tier}>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/60">
                                    {group.label}
                                </span>
                                <span className="flex-1 h-px bg-edge" />
                            </div>

                            <div className={`grid gap-6 ${group.tier === 'title' || group.tier === 'co-title'
                                ? 'grid-cols-1 md:grid-cols-2'
                                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                                }`}>
                                {group.items.map((partner) => (
                                    <a
                                        key={partner.name}
                                        href={partner.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group border border-edge bg-panel/30 p-6 hover:border-paper/30 transition-colors duration-200"
                                    >
                                        <div className="h-12 flex items-center mb-4">
                                            <img
                                                src={partner.logo}
                                                alt={partner.name}
                                                className={logoImgClass(partner)}
                                            />
                                        </div>
                                        <h3 className="font-display text-lg text-paper">{partner.name}</h3>
                                        <p className="mt-1 font-body text-xs text-muted leading-relaxed">
                                            {partner.description.replace(/^.*?—\s*/, '')}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </Section>
    );
}
