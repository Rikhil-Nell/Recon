"use client";

import { useRef, ReactNode } from "react";
import { useScrollTrigger } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";

interface Props {
  children: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

export default function SplitText({ children, className = "", stagger = 0.05, delay = 0 }: Props) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useScrollTrigger(() => {
    if (!containerRef.current) return;
    const chars = containerRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: stagger, delay: delay, duration: 0.8, ease: "power4.out" }
    );
  });

  const words = children.split(" ").map((word, wordIndex) => (
    <span key={wordIndex} className="inline-block whitespace-nowrap overflow-hidden pr-[0.3em]">
      {word.split("").map((char, charIndex) => (
        <span key={charIndex} className="char inline-block">
          {char}
        </span>
      ))}
    </span>
  ));

  return (
    <span ref={containerRef} className={`inline-block ${className}`}>
      {words}
    </span>
  );
}
