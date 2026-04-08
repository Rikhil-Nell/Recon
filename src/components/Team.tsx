import { motion } from 'framer-motion';
import { team } from '../data';
import { Section, Label, Stagger, staggerChild } from './ui';
import ScrambleText from './ScrambleText';

export default function Team() {
    return (
        <Section id="team" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <Label>The Team</Label>
                <h2 className="font-display text-2xl md:text-3xl text-paper tracking-tight mb-8">
                    <ScrambleText text="Operators Behind " tag="span" speed={15} /><span className="text-paper/80">RECON</span>
                </h2>

                <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3" delay={0.06}>
                    {team.map((m) => (
                        <motion.div
                            key={m.code}
                            variants={staggerChild}
                            className="border border-edge bg-panel/30 p-5 group hover:border-paper/25 transition-colors duration-300"
                        >
                            <div className="flex items-baseline gap-3">
                                <span className="font-mono text-[10px] tracking-[0.3em] text-paper/50 bg-paper/5 px-2 py-0.5 border border-paper/10">
                                    {m.code}
                                </span>
                                <span className="font-display text-sm text-paper tracking-tight">{m.name}</span>
                            </div>
                            <div className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
                                {m.role}
                            </div>
                        </motion.div>
                    ))}
                </Stagger>
            </div>
        </Section>
    );
}
