"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    tl.fromTo(
      textRef.current,
      { y: 150, scale: 0.95, opacity: 0 },
      { y: 0, scale: 1, opacity: 1, ease: "power2.out", duration: 1 }
    ).fromTo(
      topRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
      0.5
    );
  }, []);

  return (
    <footer ref={containerRef} className="relative w-full h-[60vh] md:h-[70vh] bg-black overflow-hidden flex flex-col items-center justify-between border-t border-white/10 pt-16 pb-8">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,65,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,65,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)] pointer-events-none"></div>

      {/* Top Details */}
      <div ref={topRef} className="w-full flex justify-between px-8 z-10 font-mono text-[10px] tracking-[0.2em] text-white/40 uppercase">
        <div className="flex flex-col gap-1">
          <span className="text-white/60">SYS.STATUS // TERMINAL_END</span>
          <span>EOF // 2026</span>
        </div>
        <div className="flex flex-col gap-1 items-end">
          <span className="text-white/60">[CONNECTION CLOSED]</span>
          <span>SECURE LINE</span>
        </div>
      </div>

      {/* Scanning Laser Typography */}
      <div ref={textRef} className="relative z-[15] w-full flex-grow flex items-center justify-center pointer-events-none">
        
        {/* Hollow Outline Backdrop */}
        <h1 
          className="absolute font-mono text-[18vw] leading-none tracking-[0.05em] text-transparent select-none pb-4" 
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
        >
          RECON
        </h1>

        {/* Animated Laser Fill */}
        <h1 
          className="relative font-mono font-bold text-[18vw] leading-none tracking-[0.05em] select-none pb-4 laser-pan" 
        >
          RECON
        </h1>
      </div>

      {/* Bottom Details */}
      <div className="z-10 w-full flex flex-col md:flex-row justify-between items-center px-8 text-center md:text-left font-mono text-[10px] text-white/30 tracking-[0.3em] gap-4">
        <span>© 2026 VIT-AP UNIVERSITY</span>
        <span className="text-terminal-green/50">ALL RIGHTS RESERVED</span>
        <span>DESIGNED FOR DOMINATION</span>
      </div>

      {/* Cyber Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-[5] pointer-events-none"></div>
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9IiNmZmYiLz48L3N2Zz4=')]"></div>
      
      {/* Inline styles for the infinite laser pan effect */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes cyber-pan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .laser-pan {
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,255,65,0.8) 50%, rgba(255,255,255,0) 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: cyber-pan 6s linear infinite;
        }
      `}} />
    </footer>
  );
}
