"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import TextHoverScramble from "@/components/ui/TextHoverScramble";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useScrollTrigger(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 60%",
        scrub: 0.8,
      },
    });

    const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

    lines.forEach((line, index) => {
      if (line) {
        tl.to(line, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1 }, index === 0 ? 0 : "-=0.3");
      }
    });

    if (bodyRef.current) {
      tl.to(bodyRef.current, { opacity: 0.5, duration: 1 }, "-=0.2");
    }
  });

  return (
    <section ref={sectionRef} id="manifesto" className="min-h-screen relative flex flex-col justify-center px-8 lg:px-24 py-32">
      {/* Accent Line */}
      <div className="absolute left-6 lg:left-[48px] top-0 w-[2px] h-full opacity-15" style={{ background: "linear-gradient(to bottom, transparent, #8b5cf6 30%, #8b5cf6 70%, transparent)" }} />

      <div className="max-w-5xl w-full mx-auto relative z-10">
        <div className="flex flex-col gap-2 mb-16 lg:mb-24">
          <div ref={line1Ref} className="font-brand text-[clamp(24px,5vw,72px)] text-zinc-300 uppercase leading-[1.1]" style={{ opacity: 0.08, filter: "blur(4px)", transform: "translateY(20px)" }}>
            The system is flawed.
          </div>
          <div ref={line2Ref} className="font-brand text-[clamp(24px,5vw,72px)] text-zinc-300 uppercase leading-[1.1]" style={{ opacity: 0.08, filter: "blur(4px)", transform: "translateY(20px)" }}>
            The perimeter is <span className="text-terminal-green">dead</span>.
          </div>
          <div ref={line3Ref} className="font-brand text-[clamp(24px,5vw,72px)] text-zinc-300 uppercase leading-[1.1]" style={{ opacity: 0.08, filter: "blur(4px)", transform: "translateY(20px)" }}>
            Welcome to the inside.
          </div>
        </div>

        <p ref={bodyRef} className="font-body text-[14px] leading-[1.9] max-w-xl ml-auto border-l-2 pl-6 border-terminal-green/30 cursor-crosshair hover:text-white transition-colors" style={{ opacity: 0 }}>
          <TextHoverScramble text="RECON isn't just a conference; it's a 72-hour adversarial simulation engineered to test your breaking point. Forget theoretical vulnerabilities and sandbox exercises. We spin up production-grade environments mirroring critical infrastructure—then hand you the keys to tear them apart. If you aren't leaving with a shell, you aren't looking hard enough." />
        </p>

        <div className="flex justify-between border-t border-white/10 pt-8 mt-16 font-mono text-[10px] opacity-30">
          <div>REF: R-2026-X // BUILD: 1.0.4_STABLE</div>
          <div className="hidden sm:block">OSC + NULL CHAPTER // VIT-AP UNIVERSITY</div>
        </div>
      </div>

      <div className="section-index">02</div>
    </section>
  );
}
