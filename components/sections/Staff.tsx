"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import TextHoverScramble from "@/components/ui/TextHoverScramble";
import { staffData } from "@/lib/data";
import DiagnosticLabel from "@/components/ui/DiagnosticLabel";
import SplitText from "@/components/ui/SplitText";

export default function Staff() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useScrollTrigger(() => {
    if (rowsRef.current.length > 0) {
      gsap.fromTo(
        rowsRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          stagger: 0.08,
          duration: 0.6,
          ease: "power3.out",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  });

  return (
    <section ref={sectionRef} id="staff" className="py-16 md:py-32 px-4 md:px-8 lg:px-24">
      <div className="max-w-[1200px] mx-auto">
        <DiagnosticLabel text="// COMMAND CORE" />
        <h2 className="font-brand text-[clamp(40px,6vw,80px)] text-white uppercase leading-[0.9] tracking-tight mt-6 mb-24">
          <SplitText>Operation</SplitText>
          <br />
          <SplitText delay={0.1}>Architects.</SplitText>
        </h2>

        <div className="w-full border-t border-white/20">
          {staffData.map((staff, i) => (
            <div
              key={staff.id}
              ref={(el) => {
                if (el) rowsRef.current[i] = el;
              }}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-8 border-b border-white/10 hover:border-terminal-green/50 hover:bg-white/[0.02] transition-colors duration-300 relative overflow-hidden px-4 -mx-4 md:px-6 md:-mx-6"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-terminal-green transform scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-300"></div>

              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 w-full md:w-auto mb-4 md:mb-0">
                <div className="font-mono text-[10px] text-terminal-green/50 tracking-widest w-16 group-hover:text-terminal-green transition-colors">
                  {staff.id}
                </div>
                <div>
                  <div className="font-brand text-xl md:text-2xl text-white tracking-wide group-hover:translate-x-2 transition-transform duration-300">
                    {staff.name}
                  </div>
                  <div className="font-mono text-[11px] text-white/40 tracking-widest mt-2 uppercase group-hover:translate-x-2 transition-transform duration-300 delay-50">
                    {staff.sub}
                  </div>
                </div>
              </div>

              <div className="font-mono text-[12px] text-white/30 tracking-widest uppercase border border-white/10 px-3 py-1 group-hover:border-terminal-green/30 group-hover:text-terminal-green transition-colors">
                {staff.role}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-index">05</div>
    </section>
  );
}
