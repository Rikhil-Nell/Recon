import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { schedule } from '../data';
import { Section, Label } from './ui';
import ScrambleText from './ScrambleText';

const DAYS = Object.keys(schedule);

export default function Schedule() {
    const [active, setActive] = useState(DAYS[0]);

    return (
        <Section id="schedule" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <Label>Schedule</Label>
                <h2 className="font-display text-2xl md:text-3xl text-paper tracking-tight mb-8">
                    <ScrambleText text="3-Day " tag="span" speed={15} /><span className="text-paper/80">Operations Timeline</span>
                </h2>

                {/* Day tabs */}
                <div className="inline-flex gap-1 mb-8 border border-edge">
                    {DAYS.map((day) => (
                        <button
                            key={day}
                            onClick={() => setActive(day)}
                            className={`font-mono text-[11px] tracking-[0.2em] uppercase px-5 py-2 transition-colors duration-200 ${active === day
                                ? 'bg-paper text-void'
                                : 'text-muted hover:text-paper'
                                }`}
                        >
                            {day}
                        </button>
                    ))}
                </div>

                {/* Timeline */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-0"
                    >
                        {schedule[active].map((item, i) => (
                            <div
                                key={i}
                                className={`flex gap-4 md:gap-6 py-4 border-b border-edge/50 group hover:bg-panel/20 transition-colors px-2 ${item.accent ? 'border-l-2 border-l-paper/50' : ''
                                    }`}
                            >
                                <div className="font-mono text-xs tabular-nums text-faint w-12 shrink-0 pt-0.5">
                                    {item.time}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className={`font-display text-sm tracking-tight ${item.accent ? 'text-paper' : 'text-cream/80'}`}>
                                        {item.title}
                                    </div>
                                    <div className="font-body text-xs text-muted mt-0.5">{item.description}</div>
                                </div>
                                {item.accent && (
                                    <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-void bg-paper/80 px-2 py-0.5 self-start">
                                        LIVE
                                    </span>
                                )}
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </Section>
    );
}
