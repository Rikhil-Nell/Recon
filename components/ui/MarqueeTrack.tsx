"use client";

import { useState } from "react";

interface Props {
  items: string[];
  direction?: "left" | "right";
  speedClass?: string;
  dimmer?: boolean;
}

export default function MarqueeTrack({ items, direction = "left", speedClass = "animate-ticker", dimmer = false }: Props) {
  const [isPaused, setIsPaused] = useState(false);

  const content = items.map((p, i) => (
    <span key={i} className="flex items-center">
      <span className={`font-brand text-[32px] md:text-[52px] ${dimmer ? 'text-outline hover:text-white/60' : i % 2 === 0 ? 'text-white/20' : 'text-terminal-green/30'} hover:opacity-100 hover:text-white transition-opacity uppercase cursor-default`}>
        {p}
      </span>
      <span className="text-terminal-green/30 mx-8 md:mx-16">✦</span>
    </span>
  ));

  const animationClass = direction === "left" ? speedClass : "animate-marquee-r";

  return (
    <div
      className="relative flex overflow-hidden w-full whitespace-nowrap border-b border-white/5 py-4 marquee-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`flex w-[200%] justify-around ${animationClass}`} style={{ animationPlayState: isPaused ? "paused" : "running" }}>
        {content}
      </div>
      <div className={`flex w-[200%] justify-around ${animationClass}`} style={{ animationPlayState: isPaused ? "paused" : "running" }}>
        {content}
      </div>
    </div>
  );
}
