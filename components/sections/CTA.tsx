"use client";

import { useRef } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import MarqueeTrack from "@/components/ui/MarqueeTrack";
import TextHoverScramble from "@/components/ui/TextHoverScramble";
import SplitText from "@/components/ui/SplitText";

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useScrollTrigger(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      bgRef.current,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 0.15,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ctaRef.current?.children || [],
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      }
    );
  });

  return (
    <section ref={sectionRef} id="cta" className="relative pt-32 overflow-hidden flex flex-col justify-end bg-[#050505]">
      {/* Background Graphic */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80')] bg-cover bg-center mix-blend-screen opacity-10"
        style={{ filter: "grayscale(100%) contrast(150%) brightness(50%)" }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-[50vh] px-4 md:px-8 text-center pb-24">
        <div ref={ctaRef} className="flex flex-col items-center max-w-3xl">
          <div className="font-mono text-[12px] text-terminal-green tracking-[0.3em] uppercase mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-terminal-green"></span>
            Breach The Perimeter
            <span className="w-8 h-[1px] bg-terminal-green"></span>
          </div>

          <h2 className="font-brand text-[clamp(44px,8vw,110px)] text-white uppercase leading-[0.85] tracking-tighter mb-8">
            <SplitText>Secure Your</SplitText>
            <br />
            <SplitText delay={0.1}>Access.</SplitText>
          </h2>

          <p className="font-body text-[15px] text-white/50 max-w-md mx-auto leading-relaxed mb-12 cursor-text transition-colors hover:text-white/80">
            <TextHoverScramble text="The perimeter has fallen. The only way out is through. Register your clearance before the protocol initiates lockout." />
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <MagneticButton className="btn-fill px-10 py-5 font-mono text-sm tracking-widest uppercase font-bold text-center rounded-lg text-zinc-100">
              REGISTER NOW →
            </MagneticButton>
            <MagneticButton href="#faq" className="border border-white/20 bg-transparent text-white px-10 py-5 font-mono text-sm tracking-widest uppercase hover:border-white transition-colors text-center">
              VIEW DOSSIER
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Footer / Marquee Area */}
      <div className="relative z-10 w-full bg-black pt-16 border-t border-white/10">
        <div className="opacity-40 pointer-events-none">
          <MarqueeTrack items={["NO QUARTER", "NO MERCY", "EXPECT RESISTANCE", "PERSISTENCE IS KEY"]} direction="right" speedClass="animate-marquee-r" dimmer />
        </div>
        
        <div className="px-4 md:px-8 lg:px-16 py-8 flex flex-col md:flex-row justify-between items-center gap-4 mt-8 opacity-50 font-mono text-[10px] tracking-widest uppercase border-t border-white/5">
          <div>RECON 2026 // VIT-AP UNIVERSITY</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-terminal-green transition-colors">TWITTER (X)</a>
            <a href="#" className="hover:text-terminal-green transition-colors">DISCORD</a>
            <a href="#" className="hover:text-terminal-green transition-colors">INSTAGRAM</a>
          </div>
          <div>© {new Date().getFullYear()} ALL RIGHTS RESERVED.</div>
        </div>
      </div>
    </section>
  );
}
