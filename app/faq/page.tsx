"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "Who can participate in RECON 2026?",
    a: "Any student, enthusiast, or professional interested in offensive security and system operations. Undergraduates and beginners have dedicated tracks like the Web Exploit Dojo to get started.",
  },
  {
    q: "What should I bring?",
    a: "Your laptop with necessary VMs/tools installed (Kali, Parrot OS or equivalent), adapters, and a sleeping bag if you plan to rest during overnight rounds. Wired ethernet adapters are highly recommended for specific villages.",
  },
  {
    q: "Is there a prize pool?",
    a: "Yes. Top performing teams across CTF and KOTH tracks receive hardware prizes, cash bounties, and direct interview pipelines with associated partners. Side-event passport top 20 earners also win from a separate pool.",
  },
  {
    q: "Do I need prior experience?",
    a: "No. While RECON is a high-intensity environment, we have entry points for all skill levels. If you understand basic networking, Linux commands, and have a persistence mindset, you belong here.",
  },
  {
    q: "Are meals and accommodation provided?",
    a: "Yes. Full meals, energy drinks, and coffee runs are covered. Safe resting zones are available on campus during the 72-hour operational window. Outstation participants get hostel/budget hotel options.",
  },
  {
    q: "How does the scoring system work?",
    a: "CTF is jeopardy style with dynamic scoring. KOTH features live hill-ownership points calculated per second. The unified RECON dashboard tracks both. Side events use a passport point system.",
  },
  {
    q: "What are the competition formats?",
    a: "CTF runs overnight Day 1 (18:00\u201306:00), 12 hours, teams of 1\u20134. KOTH runs overnight Day 2 (22:00\u201306:00), 8 hours, attack/defend on live target boxes.",
  },
  {
    q: "How do I connect to challenges?",
    a: "All challenge targets are accessed through an OpenVPN tunnel. You\u2019ll receive a personalized .ovpn config file tied to your registration. A mandatory VPN dry run happens pre-event.",
  },
  {
    q: "What side events are available?",
    a: "10+ villages including Hardware Badge + IoT Village, Web Exploit Dojo, OSINT Corner, Forensics Sprint, AI Red-Team Lab, NFC Lock Hunt, Gaming Arena, Sponsor Demo Street, Career Clinic, and Bug Bounty Quest.",
  },
  {
    q: "Is there a code of conduct?",
    a: "Yes. All offensive security activities must be sandboxed and in-scope only. Any out-of-scope activity leads to immediate disqualification. Zero tolerance for harassment, discrimination, or intimidation.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <main className="min-h-svh bg-background px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">{"// FAQ"}</span>
          <h1 className="mt-3 font-headline text-4xl font-bold text-fg sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-dim">
            Everything you need to know before arriving at RECON 2026.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-lg border transition-colors duration-300 ${
                  isOpen
                    ? "border-accent/40 bg-surface"
                    : "border-border-dim hover:border-accent/25"
                }`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="font-headline font-bold text-fg text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-border-dim font-mono text-sm text-dim transition-colors duration-300">
                    {isOpen ? "\u2212" : "+"}
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 font-body text-sm leading-relaxed text-dim">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Back link */}
        <div className="mt-12">
          <Link
            href="/"
            className="font-mono text-sm text-accent transition-colors hover:text-accent-alt"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
