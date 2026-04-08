import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlyphGrid from './GlyphGrid';
import ScrambleText from './ScrambleText';

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end start'],
    });
    // Image moves slower (stays), text moves faster (overlays)
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
    const textY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
    const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

    return (
        <section ref={sectionRef} className="relative z-10 min-h-screen flex flex-col justify-end px-4 sm:px-6 pt-28 sm:pt-20 pb-10 sm:pb-16 overflow-hidden">
            {/* Full-bleed hero image — positioned behind text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-0"
            >
                <motion.div
                    style={{ y: imageY, opacity: imageOpacity }}
                    className="absolute inset-0"
                >
                    <img
                        src="/hands-darkmode.png"
                        alt="RECON 2026"
                        className="w-full h-full object-cover object-top sm:object-center select-none"
                        draggable={false}
                    />
                    {/* Bottom fade into void */}
                    <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-void via-void/70 to-transparent" />
                    {/* Top fade */}
                    <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-void/60 to-transparent" />
                </motion.div>
            </motion.div>

            {/* Corner glyphs over image */}
            <div className="absolute top-20 left-6 z-10">
                <GlyphGrid type="braille" cols={4} rows={2} className="opacity-60" />
            </div>
            <div className="absolute top-20 right-6 z-10">
                <GlyphGrid type="hex" cols={3} rows={2} className="opacity-50" />
            </div>

            {/* Text content — moves faster for parallax offset */}
            <motion.div
                style={{ y: textY }}
                className="relative z-10 max-w-5xl mx-auto w-full"
            >
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-paper leading-[1.05]">
                        <ScrambleText text="Hunt. Break." tag="span" speed={18} />
                        <br />
                        <span className="text-paper/80">Defend.</span>
                    </h1>
                    <p className="mt-5 font-body text-sm md:text-base text-cream/70 max-w-lg leading-relaxed">
                        South India's premier campus cybersecurity event. Three days of CTFs, attack-defence, hardware hacking, and more.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8 flex flex-col sm:flex-row gap-3"
                >
                    <a
                        href="https://luma.com/v933kdr1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 bg-paper text-void hover:bg-cream transition-colors duration-200 text-center"
                    >
                        <ScrambleText text="Register Now" tag="span" speed={15} />
                    </a>
                    <a
                        href="#events"
                        className="font-mono text-xs tracking-[0.2em] uppercase px-6 py-3 border border-cream/30 text-cream/70 hover:border-paper/50 hover:text-paper transition-colors duration-200 text-center"
                    >
                        <ScrambleText text="Explore Events" tag="span" speed={15} />
                    </a>
                </motion.div>

                {/* Bottom glyph strip */}
                <div className="mt-10 flex justify-between items-end">
                    <GlyphGrid type="braille" cols={10} rows={3} className="opacity-50" />
                    <GlyphGrid type="circles" cols={6} rows={2} className="opacity-40" />
                    <GlyphGrid type="blocks" cols={8} rows={2} className="opacity-30 hidden sm:block" />
                </div>
            </motion.div>
        </section>
    );
}
