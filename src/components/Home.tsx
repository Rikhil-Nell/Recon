import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Hero from './Hero';
import Marquee from './Marquee';
import { Label } from './ui';
import { stats, partners, type Partner } from '../data';
import { useCountUp } from '../hooks';
import ScrambleText from './ScrambleText';

const SIZE_CLASS: Record<NonNullable<Partner['size']>, string> = {
    sm: 'max-h-8',
    md: 'max-h-10',
    lg: 'max-h-12',
};

/* ── Sponsor logo strip (Hacktron-style) ──────────────────────── */
const titleSponsors = partners.filter((p) => p.tier === 'title' || p.tier === 'co-title');
const otherSponsors = partners.filter((p) => p.tier !== 'title' && p.tier !== 'co-title' && p.tier !== 'community');

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
function SponsorStrip() {
    return (
        <section className="relative z-10 border-y border-edge px-6 py-14">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-10">
                    <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-cream/50">
                        Sponsored By
                    </span>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20">
                    {titleSponsors.map((s) => (
                        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group">
                            <img
                                src={s.logo}
                                alt={s.name}
                                className={logoImgClass(s)}
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    ))}
                </div>

                <div className="flex items-center gap-4 my-8">
                    <span className="flex-1 h-px bg-edge/50" />
                    <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-cream/40">
                        With Support From
                    </span>
                    <span className="flex-1 h-px bg-edge/50" />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
                    {otherSponsors.map((s) => (
                        <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="group">
                            <img
                                src={s.logo}
                                alt={s.name}
                                className={logoImgClass(s)}
                                loading="lazy"
                                decoding="async"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Stat card with count-up ──────────────────────────────────── */
function StatCard({ label, value, prefix, suffix }: { label: string; value: number; prefix?: string; suffix?: string }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-40px' });
    const { formatted } = useCountUp(value, { trigger: inView, prefix, suffix, duration: 2200 });

    return (
        <div ref={ref} className="border border-edge bg-panel/30 p-5 text-center group hover:border-paper/25 transition-colors duration-300">
            <div className="font-display text-2xl md:text-3xl text-paper tabular-nums">{formatted}</div>
            <div className="mt-2 font-mono text-[10px] tracking-[0.3em] uppercase text-muted">{label}</div>
        </div>
    );
}

/* ── About section (Hacktron layout) ──────────────────────────── */

function AboutSection() {
    return (
        <section className="relative z-10 px-6 py-16">
            <div className="max-w-7xl mx-auto">
                {/* Label row */}
                <Label>About</Label>

                <div className="mt-2">
                    {/* Large box with ASCII art background + text overlay */}
                    <div className="relative border border-edge overflow-hidden min-h-[420px] md:min-h-[520px]">
                        {/* Corner brackets */}
                        <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-paper/40 z-20" />
                        <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-paper/40 z-20" />
                        <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-paper/40 z-20" />
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-paper/40 z-20" />

                        {/* ASCII art background image — desktop only */}
                        <img
                            src="/satellite_disk_ascii.webp"
                            alt=""
                            className="hidden sm:block absolute right-[-50px] top-20 h-full w-auto object-contain scale-125 origin-right opacity-100 select-none pointer-events-none"
                            draggable={false}
                            loading="lazy"
                            decoding="async"
                        />

                        {/* Gradient overlays for readability */}

                        {/* Text content */}
                        <div className="relative z-20 p-8 md:p-12 flex flex-col justify-between h-full">
                            <div>
                                <h2 className="font-display text-3xl md:text-4xl lg:text-[2.75rem] text-paper tracking-tight leading-[1.15]">
                                    <ScrambleText text="Where hackers converge." tag="span" speed={16} />
                                    <br />
                                    <span className="text-paper/80">Hunt. Break. Defend.</span>
                                </h2>

                                <p className="mt-6 font-body text-sm text-cream/70 leading-relaxed max-w-md">
                                    RECON 2026 is a 3-day cybersecurity festival organized by{' '}
                                    <span className="text-paper">ReconHQ</span> at VIT-AP University, Amaravati.
                                    From overnight CTFs and attack-defence warzones to hardware badge soldering
                                    and deepfake forensics — this is the largest campus security event in South India.
                                </p>

                                <p className="mt-3 font-body text-sm text-cream/70 leading-relaxed max-w-md">
                                    Whether you're a seasoned red-teamer or writing your first exploit,
                                    RECON has a track for you. Join 1200+ hackers, compete for ₹1.5M+ in prizes,
                                    and connect with the community.
                                </p>

                                <p className="mt-5 font-mono text-xs text-paper/50 leading-relaxed max-w-md">
                                    Built by students who live and breathe security,<br />
                                    we operate by one principle:<br />
                                    <span className="text-paper/80">PoC || GTFO.</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
                    {stats.map((s) => (
                        <StatCard key={s.label} label={s.label} value={s.value} prefix={s.prefix} suffix={s.suffix} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Home page ────────────────────────────────────────────────── */
export default function Home() {
    return (
        <>
            <Hero />

            <div className="relative z-10 border-y border-edge/30">
                <Marquee
                    items={['CTF', 'KOTH', 'NFC HUNT', 'IoT VILLAGE', 'APPSEC', 'FORENSICS', 'ESCAPE ROOM', 'BUG BOUNTY']}
                    speed="fast"
                    separator="◇"
                />
            </div>

            <SponsorStrip />
            <AboutSection />
        </>
    );
}