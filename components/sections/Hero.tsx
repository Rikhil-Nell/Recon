"use client";

import CountdownTimer from "@/components/ui/CountdownTimer";
import TopoBg from "@/components/ui/TopoBg";
import { useInView } from "@/hooks/useInView";

export default function Hero() {
  const ref = useInView(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="hero"
      className="reveal relative flex min-h-svh flex-col items-center justify-center px-4 sm:px-8"
    >
      <TopoBg />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Tagline */}
        <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-dim sm:text-sm sm:tracking-[0.4em]">
          National Workshop on System Security
        </p>

        {/* Wordmark */}
        <h1
          className="font-brand leading-none text-fg"
          style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
        >
          RECON
        </h1>
        <p
          className="font-brand leading-none text-fg"
          style={{ fontSize: "clamp(1.5rem, 4vw, 4rem)" }}
        >
          2026
        </p>

        {/* Metadata */}
        <p className="mt-6 font-mono text-xs tracking-wider text-dim sm:text-sm">
          APR 19-21 &middot; VIT-AP, Amaravati
        </p>

        {/* Countdown */}
        <div className="mt-8">
          <CountdownTimer />
        </div>

        {/* CTAs */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <a
            href="#register"
            className="btn-primary rounded px-8 py-3 text-center text-sm sm:text-base"
          >
            Register Now
          </a>
          <a
            href="/schedule"
            className="btn-ghost rounded px-8 py-3 text-center text-sm sm:text-base"
          >
            View Schedule
          </a>
        </div>
      </div>
    </section>
  );
}
