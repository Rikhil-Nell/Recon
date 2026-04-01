"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import { schedData } from "@/lib/data";
import DiagnosticLabel from "@/components/ui/DiagnosticLabel";
import TextHoverScramble from "@/components/ui/TextHoverScramble";
import SplitText from "@/components/ui/SplitText";

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);

  useScrollTrigger(() => {
    if (rowsRef.current.length > 0) {
      gsap.fromTo(
        rowsRef.current,
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }
  });

  return (
    <section ref={sectionRef} id="schedule" className="py-16 md:py-32 px-4 md:px-8 lg:px-24 border-t border-white/5 relative">
      <div className="max-w-[1200px] mx-auto">
        <DiagnosticLabel text="// OPERATIONAL TIMELINE" />
        <h2 className="font-brand text-[clamp(40px,6vw,80px)] text-white uppercase leading-[0.9] tracking-tight mt-6 mb-24">
          <SplitText>Execution</SplitText>
          <br />
          <SplitText delay={0.1}>Schedule.</SplitText>
        </h2>

        <div className="space-y-24">
          {schedData.map((dayData, dayIndex) => (
            <div key={dayData.day} className="relative">
              <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 mb-12 border-b border-terminal-green/30 pb-6">
                <div className="font-brand text-6xl text-terminal-green/40 leading-none">
                  {dayData.day}
                </div>
                <div className="font-mono text-[14px] text-white tracking-[0.2em] relative">
                  [DAY_{dayData.day}] {dayData.title}
                </div>
              </div>

              <div className="relative border-l border-white/10 ml-8 md:ml-[110px]">
                {dayData.items.map((item, itemIndex) => {
                  const globalIndex = dayIndex * 10 + itemIndex;
                  const isArmed = item.phase === "armed";
                  const isActive = item.phase === "active";
                  const isPending = item.phase === "pending";

                  return (
                    <div
                      key={globalIndex}
                      ref={(el) => {
                        if (el) rowsRef.current[globalIndex] = el;
                      }}
                      className="group flex flex-col sm:flex-row sm:items-center py-6 pl-12 sm:pl-16 relative"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[-5px] top-[32px] sm:top-1/2 sm:-translate-y-1/2 w-[9px] h-[9px] bg-black border border-white/30 rounded-full transition-colors duration-300 group-hover:border-terminal-green group-hover:bg-terminal-green/30">
                        {isActive && <div className="absolute inset-m-[1px] bg-terminal-green rounded-full animate-ping opacity-50"></div>}
                        {isActive && <div className="absolute inset-[2px] bg-terminal-green rounded-full"></div>}
                        {isArmed && <div className="absolute inset-[2px] bg-[var(--accent2)] rounded-full text-blue-500"></div>}
                      </div>

                      {/* Time Code */}
                      <div className="w-32 font-mono text-[13px] text-white/50 tracking-widest sm:shrink-0 transition-colors group-hover:text-white/80">
                        {item.time} HRS
                      </div>

                      {/* Event Row */}
                      <div className="flex-1 mt-2 sm:mt-0">
                        <div className={`font-brand text-lg md:text-xl tracking-wide transition-colors ${
                          isActive ? "text-terminal-green" :
                          isArmed ? "text-[var(--accent2)]" :
                          "text-white group-hover:text-terminal-green"
                        }`}>
                          <TextHoverScramble text={item.text} />
                        </div>
                      </div>

                      {/* Status Tag */}
                      <div className="hidden sm:block font-mono text-[10px] tracking-widest uppercase sm:shrink-0 text-right w-24">
                        {isActive ? (
                          <span className="text-terminal-green">ACTIVE</span>
                        ) : isArmed ? (
                          <span className="text-[var(--accent2)] border border-[var(--accent2)]/20 px-2 py-1">ARMED</span>
                        ) : isPending ? (
                          <span className="text-white/30">PENDING</span>
                        ) : (
                          <span className="text-white/20">STANDBY</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-index">04</div>
    </section>
  );
}
