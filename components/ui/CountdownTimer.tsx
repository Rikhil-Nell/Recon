"use client";

import { useEffect, useState } from "react";

const TARGET_DATE = new Date("2026-04-19T10:00:00+05:30").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = Date.now();
  const diff = Math.max(0, TARGET_DATE - now);

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) {
    return (
      <div className="flex gap-3 sm:gap-4">
        {["DAYS", "HRS", "MIN", "SEC"].map((label) => (
          <div key={label} className="flex flex-col items-center">
            <div className="flex h-14 w-14 items-center justify-center border border-border countdown-box font-mono text-xl text-fg sm:h-16 sm:w-16 sm:text-2xl">
              --
            </div>
            <span className="mt-1.5 font-mono text-[10px] tracking-widest text-dim">{label}</span>
          </div>
        ))}
      </div>
    );
  }

  const segments = [
    { value: time.days, label: "DAYS" },
    { value: time.hours, label: "HRS" },
    { value: time.minutes, label: "MIN" },
    { value: time.seconds, label: "SEC" },
  ];

  return (
    <div className="flex gap-3 sm:gap-4">
      {segments.map(({ value, label }) => (
        <div key={label} className="flex flex-col items-center">
          <div className="flex h-14 w-14 items-center justify-center border border-border countdown-box font-mono text-xl text-fg sm:h-16 sm:w-16 sm:text-2xl">
            {pad(value)}
          </div>
          <span className="mt-1.5 font-mono text-[10px] tracking-widest text-dim">{label}</span>
        </div>
      ))}
    </div>
  );
}
