"use client";

import { useInView, useInViewChildren } from "@/hooks/useInView";

const stats = [
  { value: "600+", label: "Participants" },
  { value: "3", label: "Days" },
  { value: "10+", label: "Villages" },
  { value: "80K+", label: "Prize Pool" },
];

const highlights = [
  { name: "Overnight CTF", desc: "12hr jeopardy-style, 20-30 challenges" },
  { name: "Overnight KOTH", desc: "8hr attack/defend, live target boxes" },
  { name: "10+ Villages", desc: "Hardware, OSINT, Forensics, AI, Web Security" },
  { name: "Expert Talks", desc: "Industry speakers, Q&A sessions" },
];

export default function MissionBrief() {
  const sectionRef = useInView();
  const statsRef = useInViewChildren();

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      id="mission"
      className="reveal relative px-4 py-24 sm:px-8 lg:px-12 lg:py-32"
    >
      <div className="gradient-section pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <span className="section-label mb-8 block">{"// 01 MISSION"}</span>

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

            {/* Feature highlights */}
            <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {highlights.map(({ name, desc }) => (
                <div
                  key={name}
                  className="border-l-2 border-accent pl-3"
                >
                  <p className="font-headline text-sm font-bold text-fg">
                    {name}
                  </p>
                  <p className="mt-0.5 font-body text-xs leading-snug text-dim">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
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
