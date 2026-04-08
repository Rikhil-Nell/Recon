import DitherCanvas from './components/DitherCanvas';
import Crosshair from './components/Crosshair';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Schedule from './components/Schedule';
import Team from './components/Team';
import Prizes from './components/Prizes';
import Footer from './components/Footer';
import Marquee from './components/Marquee';
import GlyphGrid from './components/GlyphGrid';
import HUD from './components/HUD';

export default function App() {
    return (
        <div className="relative min-h-screen bg-void text-paper font-body scanline-overlay noise-overlay scanline-bar">
            {/* Background effects */}
            <DitherCanvas />
            <Crosshair />

            {/* Fixed corner glyph decorations — top only */}
            <div className="fixed top-4 left-4 z-40 pointer-events-none opacity-50 hidden lg:block" aria-hidden="true">
                <GlyphGrid type="braille" cols={6} rows={4} />
            </div>
            <div className="fixed top-4 right-4 z-40 pointer-events-none opacity-40 hidden lg:block" aria-hidden="true">
                <GlyphGrid type="hex" cols={5} rows={3} />
            </div>

            {/* Persistent HUD — bottom corners with embedded glyphs */}
            <HUD />

            {/* Top kinetic marquee — OVER the navbar */}
            <div className="fixed top-0 inset-x-0 z-[60] bg-paper/90 py-1.5 border-b border-cream/20">
                <Marquee className="text-void" />
            </div>

            {/* Navigation — pushed below the marquee */}
            <Navbar />

            {/* Page-wise snap sections */}
            <div className="snap-start min-h-screen">
                <Hero />
            </div>
            <div className="relative z-10 border-y border-edge/30">
                <Marquee items={['CTF', 'KOTH', 'NFC HUNT', 'IoT VILLAGE', 'APPSEC', 'FORENSICS', 'ESCAPE ROOM', 'BUG BOUNTY']} speed="fast" separator="◇" />
            </div>
            <div className="snap-start min-h-screen flex flex-col justify-center">
                <About />
            </div>
            <div className="snap-start min-h-screen flex flex-col justify-center">
                <Events />
            </div>
            <div className="snap-start min-h-screen flex flex-col justify-center">
                <Schedule />
            </div>
            <div className="snap-start min-h-screen flex flex-col justify-center">
                <Team />
            </div>
            <div className="snap-start min-h-screen flex flex-col justify-center">
                <Prizes />
            </div>
            <div className="snap-start">
                <Footer />
            </div>
        </div>
    );
}
