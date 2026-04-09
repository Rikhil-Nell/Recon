import { motion } from 'framer-motion';
import { partners, communityPartners } from '../data';
import { Section, Label, Tag, Stagger, staggerChild } from './ui';
import CornerFrame from './CornerFrame';

const tierOrder: Record<string, number> = { title: 0, 'co-title': 1, gold: 2, silver: 3, strategic: 4, technical: 5, community: 6 };
const tierLabel: Record<string, string> = {
    title: 'TITLE',
    'co-title': 'CO-TITLE',
    gold: 'GOLD',
    silver: 'SILVER',
    strategic: 'STRATEGIC',
    technical: 'TECHNICAL',
    community: 'COMMUNITY',
};

export default function Prizes() {
    const sorted = [...partners].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

    return (
        <Section id="prizes" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <Label>Prize Pool & Partners</Label>
                <h2 className="font-display text-2xl md:text-3xl text-paper tracking-tight mb-3">
                    ₹15,00,000+ in <span className="text-paper/80">Prizes & Perks</span>
                </h2>
                <p className="font-body text-sm text-muted mb-10 max-w-2xl">
                    Cash, certifications, training vouchers, tools, and swag from our incredible sponsor lineup.
                </p>

                <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.06}>
                    {sorted.map((p) => (
                        <motion.div key={p.name} variants={staggerChild}>
                            <CornerFrame accent={p.tier === 'title' || p.tier === 'co-title'}>
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <Tag accent={p.tier === 'title' || p.tier === 'co-title'}>{tierLabel[p.tier]}</Tag>
                                    {p.value && (
                                        <span className="font-mono text-[10px] text-paper/60 tabular-nums">{p.value}</span>
                                    )}
                                </div>
                                <h3 className="font-display text-base text-paper tracking-tight">{p.name}</h3>
                                <p className="mt-1.5 font-body text-xs text-muted leading-relaxed">{p.description}</p>
                            </CornerFrame>
                        </motion.div>
                    ))}
                </Stagger>

                {/* Community Partners */}
                {/* Community allies */}
                {communityPartners.length > 0 && (
                    <div>
                        <div className="flex items-center gap-4 mb-6 mt-12">
                            <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-cream/60">
                                Community Allies
                            </span>
                            <span className="flex-1 h-px bg-edge" />
                        </div>
                        <div className="flex flex-wrap gap-6">
                            {communityPartners.map((cp) => (
                                <a
                                    key={cp.name}
                                    href={cp.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 border border-edge bg-panel/20 px-5 py-3 hover:border-paper/30 transition-colors"
                                >
                                    <img
                                        src={cp.logo}
                                        alt={cp.name}
                                        className="h-8 max-w-25 object-contain opacity-60 group-hover:opacity-100 transition-all duration-200 filter grayscale sepia group-hover:sepia-0"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className="font-mono text-[11px] tracking-wider text-muted group-hover:text-paper transition-colors">
                                        {cp.name}
                                    </span>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
}
