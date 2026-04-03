"use client";

import { useInView, useInViewChildren } from "@/hooks/useInView";

const stats = [
  { value: "600+", label: "Participants" },
  { value: "3", label: "Days" },
  { value: "10+", label: "Villages" },
  { value: "80K+", label: "Prize Pool" },
];

export default function MissionBrief() {
  const sectionRef = useInView();
  const statsRef = useInViewChildren();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="mission"
      className="reveal relative flex min-h-svh items-center px-4 sm:px-8 lg:px-12"
    >
      <div className="mx-auto w-full max-w-6xl">
        <span className="section-label mb-8 block">// 01 MISSION</span>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {/* Left column — value prop */}
          <div className="lg:w-[60%]">
            <h2
              className="font-headline font-bold text-fg"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              From Vulnerabilities
              <br />
              to Trustworthy Systems
            </h2>
            <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-dim sm:text-[15px]">
              RECON is a national-level, DEFCON-style cybersecurity workshop
              hosted at VIT-AP. Overnight CTF, overnight King of the Hill,
              10+ security villages, expert talks, and hands-on training —
              built by students who take security seriously.
            </p>
          </div>

          {/* Right column — stats */}
          <div
            ref={statsRef as React.RefObject<HTMLDivElement>}
            className="reveal-stagger grid grid-cols-2 gap-4 lg:w-[40%] lg:grid-cols-1 lg:gap-6"
          >
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="reveal border-l-2 border-accent pl-4"
              >
                <p className="font-headline text-3xl font-bold text-fg lg:text-4xl">
                  {value}
                </p>
                <p className="mt-1 font-mono text-xs tracking-wider text-dim">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="section-divider mt-16" />
      </div>
    </section>
  );
}
