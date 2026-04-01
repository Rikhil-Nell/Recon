"use client";

import { useRef, useEffect } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import TextHoverScramble from "@/components/ui/TextHoverScramble";
import TagChip from "@/components/ui/TagChip";

interface CountUpProps {
  end: number;
  duration?: number;
}

function CountUp({ end, duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useScrollTrigger(() => {
    if (!ref.current) return;
    const el = ref.current;
    
    gsap.fromTo(
      el,
      { innerHTML: 0 },
      {
        innerHTML: end,
        duration: duration / 1000,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );
  });

  return <span ref={ref}>0</span>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const stats = [
    { num: 600, suffix: "+", label: "LIVE OPERATORS", sub: "Maximum Capacity. No Observers.", tag: "NATIONAL SIGNAL", fill: "92%" },
    { num: 72, suffix: "H", label: "OPS WINDOW", sub: "Continuous Engagement Protocol.", tag: "ENDURANCE", fill: "78%" },
    { num: 9, suffix: "+", label: "ATTACK VILLAGES", sub: "Hardware, Web, AI, & OSINT.", tag: "THREAT VECTORS", fill: "68%" },
    { num: 2, suffix: "", label: "MILLION RS", sub: "Bounty & Hardware Pool.", tag: "ACQUISITION", fill: "38%" },
  ];

  useScrollTrigger(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        }
      );
    }
  });

  return (
    <section ref={sectionRef} id="stats" className="w-full border-t border-b border-white/5 py-12 lg:py-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-white/5">
        {stats.map((stat, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="stat-border-left bg-black p-6 sm:p-8 lg:p-12 flex flex-col min-h-[300px] relative group overflow-hidden"
            >
            {/* Hover Sweep */}
            <div className="absolute left-0 bottom-0 w-[2px] h-0 bg-terminal-green transition-all duration-500 ease-out group-hover:h-full group-hover:top-0 group-hover:bottom-auto z-10"></div>
            
            <TagChip className="mb-12">{stat.tag}</TagChip>
            
            <div className="flex-1"></div>

            <div className="flex items-baseline mb-4">
              <span className="font-brand text-[clamp(52px,6vw,90px)] leading-[0.85] text-white">
                <CountUp end={stat.num} />
              </span>
              <span className="font-brand text-[clamp(32px,4vw,60px)] text-terminal-green">{stat.suffix}</span>
            </div>

            <div className="w-full h-[1px] bg-white/10 mb-6 relative">
              <div className="absolute top-0 left-0 h-full bg-terminal-green" style={{ width: stat.fill }}></div>
            </div>

            <div className="font-mono text-[11px] text-white/40 tracking-widest mb-1 uppercase">{stat.label}</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 border-t border-white/5 pt-4 cursor-crosshair">
              <TextHoverScramble text={stat.sub} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
