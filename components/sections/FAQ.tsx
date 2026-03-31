"use client";

import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";
import { faqData } from "@/lib/data";
import DiagnosticLabel from "@/components/ui/DiagnosticLabel";
import SplitText from "@/components/ui/SplitText";
import TextHoverScramble from "@/components/ui/TextHoverScramble";

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First open by default

  useScrollTrigger(() => {
    if (rowsRef.current.length > 0) {
      gsap.fromTo(
        rowsRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        }
      );
    }
  });

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section ref={sectionRef} id="faq" className="py-32 px-8 lg:px-24">
      <div className="max-w-[800px] mx-auto">
        <div className="text-center mb-24">
          <DiagnosticLabel text="// BRIEFING MATERIALS" />
          <h2 className="font-brand text-[clamp(40px,5vw,70px)] text-white uppercase leading-[0.9] tracking-tight mt-6">
            <SplitText delay={0.1}>Intel /</SplitText> <SplitText delay={0.2} className="text-terminal-green">FAQ</SplitText>
          </h2>
        </div>

        <div className="border-t border-white/20">
          {faqData.map(([question, answer], i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) rowsRef.current[i] = el;
                }}
                className={`border-b transition-colors duration-300 ${
                  isOpen ? "border-terminal-green" : "border-white/10 hover:border-white/30"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center py-6 md:py-8 text-left group"
                >
                  <span className={`font-brand text-lg md:text-2xl pr-8 transition-colors ${
                    isOpen ? "text-terminal-green" : "text-white group-hover:text-terminal-green/80"
                  }`}>
                    {question}
                  </span>
                  <span className={`transition-transform duration-500 flex-shrink-0 ${
                    isOpen ? "text-terminal-green rotate-180" : "text-white/30 group-hover:text-white"
                  }`}>
                    {isOpen ? <Minus size={24} /> : <Plus size={24} />}
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 pb-8" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="font-body text-[14px] leading-[1.8] text-white/50 pr-8 md:pr-12 cursor-text">
                    <TextHoverScramble text={answer} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="section-index text-center relative mt-24">07</div>
    </section>
  );
}
