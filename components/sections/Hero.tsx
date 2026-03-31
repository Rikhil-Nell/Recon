"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import DiagnosticLabel from "@/components/ui/DiagnosticLabel";
import SplitText from "@/components/ui/SplitText";

const GridDistortion = dynamic(() => import("@/components/canvas/GridDistortion"), { ssr: false });
const ParticleField = dynamic(() => import("@/components/canvas/ParticleField"), { ssr: false });
const MatrixRain = dynamic(() => import("@/components/canvas/MatrixRain"), { ssr: false });

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLDivElement>(null);
  const title2Ref = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const tickerRef = useRef<HTMLDivElement>(null);
  const scrollIndRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate X/Y relative to the Hero section container
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useScrollTrigger(() => {
    const tl = gsap.timeline();

    tl.fromTo(title1Ref.current, { y: 140 }, { y: 0, duration: 1.4, ease: "power4.out" }, 0.3)
      .fromTo(title2Ref.current, { y: 140 }, { y: 0, duration: 1.4, ease: "power4.out" }, 0.45)
      .fromTo(descRef.current?.children || [], { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.6)
      .fromTo(dateRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.8)
      .fromTo(hudRef.current?.children || [], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" }, 1.0)
      .fromTo(tickerRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, 1.2)
      .fromTo(scrollIndRef.current, { opacity: 0 }, { opacity: 1, duration: 1, ease: "power2.out" }, 1.5);
  }, []);

  return (
    <section ref={containerRef} id="home" className="h-screen relative overflow-hidden flex flex-col justify-end bg-black">
      {/* z-0 and z-2 layers */}
      <ParticleField />
      <MatrixRain />
      <GridDistortion />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)] z-[5] pointer-events-none"></div>
      <div className="absolute inset-0 z-[6] pointer-events-none opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
      <div className="scanline z-[7]"></div>

      {/* Interactive Cursor Glow */}
      <div 
        ref={glowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.4)_0%,rgba(234,255,0,0.15)_40%,transparent_70%)] rounded-full blur-[50px] pointer-events-none mix-blend-screen z-[4]"
        style={{ willChange: "transform" }}
      ></div>

      {/* Precision Graphic SVG Radar */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center opacity-[0.15] mix-blend-screen overflow-hidden">
        <svg className="w-[120vw] h-[120vw] animate-[spin_90s_linear_infinite]" viewBox="0 0 1000 1000" fill="none">
          <circle cx="500" cy="500" r="450" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="4 20" />
          <circle cx="500" cy="500" r="350" stroke="#8b5cf6" strokeWidth="1" />
          <circle cx="500" cy="500" r="250" stroke="#eaff00" strokeWidth="2" strokeDasharray="1 6" className="animate-[spin_40s_linear_infinite_reverse] origin-center" />
          <circle cx="500" cy="500" r="150" stroke="#8b5cf6" strokeWidth="1" />
          <path d="M500 50 L500 950 M50 500 L950 500" stroke="#8b5cf6" strokeWidth="0.5" />
          <path d="M181 181 L819 819 M181 819 L819 181" stroke="#eaff00" strokeWidth="0.5" strokeDasharray="2 10" />
        </svg>
      </div>

      {/* HUD Corners */}
      <div ref={hudRef} className="absolute inset-0 z-[8] pointer-events-none">
        <div className="hud-corners w-full h-full absolute inset-0"></div>
        <div className="hud-corners-bottom w-full h-full absolute inset-0"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-8 lg:px-16 pb-16 w-full flex flex-col">
        {/* Diagnostic Label */}
        <div className="mb-4">
          <DiagnosticLabel text="// NATIONAL WORKSHOP ON SYSTEM SECURITY" />
        </div>

        {/* Titles */}
        <div className="flex flex-col select-none relative z-[10] group cursor-none">
          <div className="overflow-visible mix-blend-screen">
            <div ref={title1Ref} className="font-brand text-[clamp(80px,16vw,250px)] leading-[0.8] tracking-tighter text-white relative transition-all duration-500 ease-out group-hover:skew-x-[-15deg] group-hover:text-accent-alt group-hover:drop-shadow-[0_0_30px_rgba(234,255,0,0.8)]">
              RECON
            </div>
          </div>
          <div className="overflow-visible mix-blend-screen flex justify-end md:justify-start">
            <div ref={title2Ref} className="font-brand text-[clamp(80px,16vw,250px)] leading-[0.8] tracking-tighter text-white transition-all duration-500 ease-out group-hover:skew-x-[15deg] group-hover:text-transparent group-hover:[-webkit-text-stroke:2px_#8b5cf6] md:ml-[10vw]">
              <span className="opacity-0 group-hover:opacity-100 absolute -translate-x-full pr-4 text-[clamp(40px,8vw,120px)] text-accent-alt blur-[2px] mt-8">// </span>
              2026
            </div>
          </div>
        </div>

        {/* Ticker */}
        <div ref={tickerRef} className="w-full overflow-hidden border-t border-b border-white/5 py-3 mt-8 mb-8 relative">
          <div className="flex w-[200%] animate-ticker">
            {[1, 2].map((i) => (
              <div key={i} className="flex whitespace-nowrap font-mono text-[10px] text-white/25 tracking-[0.15em] w-full justify-around">
                <span>RECON2026</span><span>◆</span>
                <span>STATUS: ARMED</span><span>◆</span>
                <span>LOC: VIT-AP AMARAVATI</span><span>◆</span>
                <span>APR 19-21 2026</span><span>◆</span>
                <span>600+ OPERATORS</span><span>◆</span>
                <span>72H OPS WINDOW</span><span>◆</span>
                <span>CTF // KOTH // AI-RED-TEAM</span><span>◆</span>
                <span>REGISTRATION: OPEN</span><span>◆</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex justify-between items-end w-full">
          <div ref={descRef} className="font-body text-[13px] opacity-60 leading-relaxed max-w-sm hidden md:block">
            <p>Phase 01: Infiltration & Persistence.</p>
            <p>Phase 02: Privilege Escalation.</p>
            <p>Phase 03: System DOMINATION.</p>
          </div>
          <div ref={dateRef} className="text-right">
            <div className="font-brand text-[3vw] font-bold text-white tracking-wider">19–21 APR</div>
            <div className="font-mono text-[11px] text-terminal-green tracking-widest mt-1">VIT-AP UNIVERSITY</div>
            <div className="font-mono text-[9px] text-white/30 tracking-widest mt-0.5">AMARAVATI, ANDHRA PRADESH</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div ref={scrollIndRef} className="absolute right-8 bottom-16 flex flex-col items-center gap-4">
          <span className="font-mono text-[9px] text-terminal-green tracking-[0.3em] rotate-90 origin-center mb-8">SCROLL</span>
          <div className="w-[1px] h-[60px] bg-white/10 relative overflow-hidden">
            <div className="absolute w-full scroll-indicator-line bg-terminal-green"></div>
          </div>
        </div>

        {/* Ghost Number */}
        <div className="section-index">01</div>
      </div>
    </section>
  );
}
