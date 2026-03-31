"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import { partnersData } from "@/lib/data";
import DiagnosticLabel from "@/components/ui/DiagnosticLabel";

export default function Partners() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useScrollTrigger(() => {
    if (itemsRef.current.length > 0) {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    }
  });

  return (
    <section ref={sectionRef} id="partners" className="py-32 px-8 lg:px-24 bg-white/5 border-t border-b border-white/5 text-center">
      <div className="max-w-[1000px] mx-auto">
        <DiagnosticLabel text="// ALLIED ENTITIES" />
        <h2 className="font-brand text-3xl md:text-5xl text-white uppercase mt-6 mb-16 tracking-widest">
          Strategic <span className="text-terminal-green">Partners</span>
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {partnersData.map((partner, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) itemsRef.current[i] = el;
              }}
              className="px-6 py-4 border border-white/10 hover:border-terminal-green/40 hover:bg-terminal-green/5 transition-all duration-300 font-mono text-[12px] md:text-[14px] uppercase tracking-widest text-white/60 hover:text-white cursor-default bg-black/50 backdrop-blur-sm"
            >
              {partner}
            </div>
          ))}
        </div>
      </div>
      <div className="section-index text-center relative left-auto right-auto mt-24">06</div>
    </section>
  );
}
