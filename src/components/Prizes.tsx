import { motion } from 'framer-motion';
import { partners, communityPartners } from '../data';
import { Section, Label, Tag, Stagger, staggerChild } from './ui';
import CornerFrame from './CornerFrame';

const tierOrder = { title: 0, 'co-title': 1, gold: 2, silver: 3, community: 4 } as const;
const tierLabel: Record<string, string> = {
    title: 'TITLE',
    'co-title': 'CO-TITLE',
    gold: 'GOLD',
    silver: 'SILVER',
    community: 'COMMUNITY',
};

export default function Prizes() {
    const sorted = [...partners].sort((a, b) => tierOrder[a.tier] - tierOrder[b.tier]);

    return (
        <Section id="prizes" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <Label>Prize Pool & Partners</Label>
                <h2 className="font-display text-2xl md:text-3xl text-paper tracking-tight mb-3">
                    ₹20,00,000+ in <span className="text-paper/80">Prizes & Perks</span>
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
                {communityPartners.length > 0 && (
                    <div className="mt-12">
                        <Label>Community</Label>
                        <div className="flex flex-wrap gap-3">
                            {communityPartners.map((name) => (
                                <span
                                    key={name}
                                    className="font-mono text-xs tracking-[0.15em] text-muted border border-edge px-4 py-2 bg-panel/20"
                                >
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </Section>
    );
}
