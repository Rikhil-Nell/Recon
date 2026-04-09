import { motion } from 'framer-motion';
import { flagshipEvents, sideEvents } from '../data';
import { Section, Label, Tag, Stagger, staggerChild } from './ui';
import CornerFrame from './CornerFrame';
import ScrambleText from './ScrambleText';
import type { SiteEvent } from '../data';
import Seo from './Seo';

function EventCard({ event }: { event: SiteEvent }) {
    return (
        <motion.div variants={staggerChild}>
            <CornerFrame accent={event.flagship}>
                <div className="flex flex-wrap gap-2 mb-3">
                    {event.tags.map((t) => (
                        <Tag key={t} accent={event.flagship}>{t}</Tag>
                    ))}
                </div>
                <h3 className="font-display text-lg text-paper tracking-tight">{event.title}</h3>
                <p className="mt-2 font-body text-xs text-muted leading-relaxed">{event.description}</p>
                {event.meta.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-3">
                        {event.meta.map((m) => (
                            <span key={m} className="font-mono text-[10px] text-faint tracking-wider">{m}</span>
                        ))}
                    </div>
                )}
            </CornerFrame>
        </motion.div>
    );
}

export default function Events() {
    return (
        <>
            <Seo
                title="Events"
                description="CTF, King of the Hill, and 10+ side events across hardware, AppSec, and forensics at RECON 2026."
                path="/events"
            />
            <Section id="events" className="py-24 px-6">
                <div className="max-w-5xl mx-auto">
                    <Label>Events</Label>

                    <h1 className="font-display text-3xl md:text-4xl text-paper tracking-tight mb-4">
                        Events at <span className="text-paper/80">RECON 2026</span>
                    </h1>

                    {/* Flagship */}
                    <h2 className="font-display text-2xl md:text-3xl text-paper tracking-tight mb-8">
                        <ScrambleText text="Flagship " tag="span" speed={15} /> <span className="text-paper/80">Competitions</span>
                    </h2>
                    <Stagger className="grid md:grid-cols-2 gap-4 mb-16">
                        {flagshipEvents.map((e) => (
                            <EventCard key={e.title} event={e} />
                        ))}
                    </Stagger>

                    {/* Side events */}
                    <Label>Side Events</Label>
                    <h2 className="font-display text-xl md:text-2xl text-paper tracking-tight mb-8">
                        10 Zones of <span className="text-paper/80">Chaos</span>
                    </h2>
                    <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" delay={0.06}>
                        {sideEvents.map((e) => (
                            <EventCard key={e.title} event={e} />
                        ))}
                    </Stagger>
                </div>
            </Section>
        </>
    );
}
