"use client";

import { useRef, useState } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import { tracksData } from "@/lib/data";
import TagChip from "@/components/ui/TagChip";
import SplitText from "@/components/ui/SplitText";
import DiagnosticLabel from "@/components/ui/DiagnosticLabel";
import TextHoverScramble from "@/components/ui/TextHoverScramble";

export default function Tracks() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useScrollTrigger(() => {
    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  });

  return (
    <section ref={sectionRef} id="tracks" className="min-h-[100svh] py-16 md:py-32 px-4 md:px-8 lg:px-24">
      <div className="max-w-[1400px] mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 lg:mb-32">
          <div>
            <DiagnosticLabel text="// OPERATIONAL VILLAGES" />
            <h2 className="font-brand text-[clamp(40px,6vw,80px)] text-white uppercase leading-[0.9] tracking-tight mt-6">
              <SplitText>Engagement</SplitText>
              <br />
              <SplitText delay={0.1}>Zones.</SplitText>
            </h2>
          </div>
          <div className="font-mono text-[11px] text-white/40 tracking-widest max-w-[280px] mt-8 md:mt-0 leading-relaxed border-l border-terminal-green/30 pl-4">
            EACH TRACK REPRESENTS A SPECIALIZED VERTICAL IN OFFENSIVE OR DEFENSIVE CYBER OPERATIONS. CHOOSE YOUR DOMAIN.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {tracksData.map((track, i) => (
            <div
              key={track.id}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
              className="bg-black p-6 md:p-8 lg:p-10 min-h-[280px] md:min-h-[350px] flex flex-col group relative overflow-hidden transition-colors"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Diffuse glow on hover */}
              <div
                className={`absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.08)_0%,transparent_70%)] transition-opacity duration-700 ${
                  hoveredIndex === i ? "opacity-100" : "opacity-0"
                } pointer-events-none`}
              ></div>

              <div className="flex justify-between items-start mb-16 relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <TagChip>{track.tag}</TagChip>
                <div className="font-mono text-[10px] text-white/30">{track.id}</div>
              </div>

              <div className="flex-1 relative z-10">
                <h3 className="font-brand text-2xl tracking-wide text-white mb-4 group-hover:text-terminal-green transition-colors duration-300">
                  {track.title}
                </h3>
                <p className="font-body text-[13px] text-white/50 leading-[1.8] group-hover:text-white/80 transition-colors duration-300">
                  <TextHoverScramble text={track.desc} />
                </p>
              </div>

              <div className="mt-12 flex justify-between items-end border-t border-white/10 pt-6 relative z-10 font-mono text-[10px] tracking-widest">
                <div className="text-white/30 uppercase">THREAT LEVEL</div>
                <div className="flex gap-1 opacity-80">
                  {[1, 2, 3, 4, 5].map((lvl) => (
                    <div
                      key={lvl}
                      className={`w-4 h-[3px] skew-x-[-15deg] transition-all duration-300 ${
                        lvl <= track.difficulty
                          ? hoveredIndex === i
                            ? "bg-terminal-green shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                            : "bg-white/90"
                          : "bg-white/10"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="section-index">03</div>
    </section>
  );
}
