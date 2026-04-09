import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { team, speakers, mentors, type TeamMember, type Speaker, type Mentor } from '../data';
import { Section, Label } from './ui';
import ScrambleText from './ScrambleText';
import Seo from './Seo';

const TABS = ['Organizers', 'Speakers', 'Mentors'] as const;
type Tab = typeof TABS[number];

/* ── Photo card shared across all three tabs ─────────────────── */
interface PersonCardProps {
    name: string;
    handle?: string;
    role: string;
    bio?: string;
    photo?: string;
    code?: string; // organizer badge code
    url?: string;
}

function PersonCard({ name, handle, role, bio, photo, code, url }: PersonCardProps) {
    const inner = (
        <div className="group border border-edge bg-panel/20 hover:border-paper/25 transition-colors duration-300 overflow-hidden">
            {/* Photo area */}
            <div className="relative w-full aspect-3/4 bg-panel/40 overflow-hidden">
                {photo ? (
                    <img
                        src={photo}
                        alt={name}
                        className="absolute inset-0 w-full h-full object-cover object-top filter grayscale sepia-50 dark:opacity-75 group-hover:opacity-100 group-hover:sepia-0 group-hover:grayscale-0 transition-all duration-300"
                        loading="lazy"
                        decoding="async"
                    />
                ) : (
                    /* Placeholder — monogram grid */
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <div className="font-mono text-2xl text-paper/20 tracking-widest select-none">
                            {code ?? name.slice(0, 2).toUpperCase()}
                        </div>
                        {/* subtle scanline texture */}
                        <div
                            className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.15) 3px, rgba(255,255,255,0.15) 4px)',
                            }}
                        />
                    </div>
                )}
                {/* Bottom gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-void/80 to-transparent" />
            </div>

            {/* Text */}
            <div className="p-4">
                <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-display text-sm text-paper tracking-tight leading-tight">{name}</span>
                    {handle && (
                        <span className="font-mono text-[10px] text-paper/45 tracking-wider">&quot;{handle}&quot;</span>
                    )}
                </div>
                <div className="mt-1 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">{role}</div>
                {bio && (
                    <p className="mt-2 font-body text-[11px] text-cream/50 leading-relaxed line-clamp-3">{bio}</p>
                )}
            </div>
        </div>
    );

    if (url) {
        return (
            <a href={url} target="_blank" rel="noopener noreferrer">
                {inner}
            </a>
        );
    }
    return inner;
}

function OrganizerCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.map((m: TeamMember) => (
                <PersonCard
                    key={m.code}
                    name={m.name}
                    role={m.role}
                    photo={m.photo}
                    code={m.code}
                />
            ))}
        </div>
    );
}

function SpeakerCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {speakers.map((s: Speaker) => (
                <PersonCard
                    key={s.name}
                    name={s.name}
                    handle={s.handle}
                    role={s.role}
                    bio={s.bio}
                    photo={s.photo}
                    url={s.url}
                />
            ))}
        </div>
    );
}

function MentorCards() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mentors.map((m: Mentor) => (
                <PersonCard
                    key={m.name}
                    name={m.name}
                    handle={m.handle}
                    role={m.role}
                    bio={m.bio}
                    photo={m.photo}
                    url={m.url}
                />
            ))}
        </div>
    );
}

export default function Team() {
    const [active, setActive] = useState<Tab>('Organizers');

    return (
        <>
            <Seo
                title="People"
                description="Organizers, speakers, and mentors behind RECON 2026."
                path="/people"
            />
            <Section id="people" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <Label>People</Label>
                    <h1 className="font-display text-2xl md:text-3xl text-paper tracking-tight mb-8">
                        <ScrambleText text="The minds behind " tag="span" speed={15} />
                        <span className="text-paper/80">RECON</span>
                    </h1>

                {/* Tabs */}
                <div className="inline-flex gap-1 mb-10 border border-edge">
                    {TABS.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActive(tab)}
                            className={`font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2 transition-colors duration-200 ${active === tab ? 'bg-paper text-void' : 'text-muted hover:text-paper'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab panels */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.25 }}
                    >
                        {active === 'Organizers' && <OrganizerCards />}
                        {active === 'Speakers' && <SpeakerCards />}
                        {active === 'Mentors' && <MentorCards />}
                    </motion.div>
                </AnimatePresence>
                </div>
            </Section>
        </>
    );
}
