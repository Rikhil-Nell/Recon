"use client";

import { useState } from "react";
import Image from "next/image";

/* ── speaker data ─────────────────────────────────────────── */

const speakers = [
  {
    name: "Vaibhav Lakhani",
    photo: "/speakers/vaibhav-lakhani.avif",
    talk: "Drawing Parallels Between iOS and macOS Pentesting with DVMA",
    bio: "Senior Consultant in Offensive Security at Kroll, specializing in penetration testing. Recognized among the top 15 Hackers by NCIIPC with acknowledgments from diverse organizations through Bug Bounty programs. Udemy instructor and speaker at colleges across India.",
    certs: ["OSCP", "CRTO", "CRT", "CPSA", "CEH", "eJPT"],
    org: "Kroll",
    github: "https://github.com/vlakhani28/DVMA",
  },
  {
    name: "Ansh Bhawnani",
    photo: "/speakers/ansh-bhawnani.avif",
    talk: "Execution Hijacking: Breaking Windows Trust Boundaries",
    bio: "Security Analyst at HackerOne. OSCE3-certified application security specialist focused on real-world exploitation, known for breaking down advanced offensive security concepts on YouTube and backed by hands-on vulnerability research.",
    certs: ["OSCE3"],
    org: "HackerOne",
  },
  {
    name: "Nithin Chenthur Prabhu",
    photo: "/speakers/nithin-chenthur.jpg",
    talk: "Beyond Detection: DFIR, EDR & the Investigator Mindset",
    bio: "Associate MDR Analyst at Unit42, Palo Alto Networks. Ex-Captain of Team bi0s. Author of DFIR Labs. Winner of Digital Forensics Challenge International 2023 & 2024.",
    certs: [],
    org: "Palo Alto Networks — Unit42",
  },
  {
    name: "Abhiram Kumar Patiballa",
    photo: "/speakers/abhiram-kumar.jpg",
    talk: "Understanding & Investigating Web Shell Attacks",
    bio: "Independent security researcher in DFIR. Author of MemLabs — educational, CTF-styled labs for Memory Forensics. Former captain of CTF team bi0s and organizer of InCTF and bi0s CTF.",
    certs: [],
    org: "Independent Researcher",
    github: "https://github.com/stuxnet999",
    linkedin: "https://www.linkedin.com/in/abhiramkumarp/",
  },
];

/* ── organizer data ───────────────────────────────────────── */

const coreCommand = [
  { role: "Event Director", names: "Rikhil Nellimarla" },
  { role: "Chief Technical Officer", names: "Abhiram Venkat Sai Adabala" },
  { role: "Operations Chief", names: "Mohammed Faariz, Cheppali Chanu" },
  { role: "Technical Infrastructure Lead", names: "Izhaan Raza, Surya Theja Dhommalapati" },
  { role: "CTF/KOTH Competition Director", names: "Vikhyat Shajee Nambiar, Swarnim Bandekar" },
  { role: "Program & Speakers Lead", names: "Aditya J Shettigar" },
  { role: "Sponsorship & Partnerships Lead", names: "Ayushi" },
  { role: "Design, Media & Broadcast Lead", names: "Jahnvi Kotangale" },
  { role: "Volunteer & Logistics Lead", names: "Reet Mishra, A. Dharineesh" },
];

const pods = [
  { name: "Infra + Security Ops", count: 10 },
  { name: "Competition Ops", count: 8 },
  { name: "Side Event Ops", count: 12 },
  { name: "Registration + Crowd + Helpdesk", count: 6 },
  { name: "Stage + AV + Speaker Ops", count: 6 },
  { name: "Design/Screens", count: 4 },
  { name: "Media Team", count: 10 },
  { name: "Floaters & Incident Response", count: 4 },
];

/* ── tabs ─────────────────────────────────────────────────── */

const tabs = ["Speakers", "Mentors", "Organizers"] as const;
type Tab = (typeof tabs)[number];

export default function TeamTabs() {
  const [active, setActive] = useState<Tab>("Speakers");

  return (
    <>
      {/* ── tab bar ─────────────────────────────────────── */}
      <nav className="mb-10 flex gap-1 rounded-lg border border-border-dim bg-surface/60 p-1 sm:inline-flex">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActive(tab)}
            className={`relative rounded-md px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200 sm:text-sm ${
              active === tab
                ? "bg-accent/15 text-accent shadow-[0_0_20px_rgba(139,92,246,0.1)]"
                : "text-dim hover:text-fg hover:bg-white/[0.03]"
            }`}
          >
            {tab}
            {active === tab && (
              <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-accent" />
            )}
          </button>
        ))}
      </nav>

      {/* ── tab content ─────────────────────────────────── */}
      <div className="min-h-[60vh]">
        {active === "Speakers" && <SpeakersPanel />}
        {active === "Mentors" && <MentorsPanel />}
        {active === "Organizers" && <OrganizersPanel />}
      </div>
    </>
  );
}

/* ── Speakers Panel ───────────────────────────────────────── */

function SpeakersPanel() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      {speakers.map((s, i) => (
        <article
          key={s.name}
          className="group rounded-xl border border-border-dim bg-surface overflow-hidden card-glow transition-all duration-300"
        >
          <div className="flex flex-col sm:flex-row">
            {/* photo */}
            <div className="relative aspect-square w-full shrink-0 overflow-hidden sm:w-48 md:w-56">
              <Image
                src={s.photo}
                alt={s.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 224px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:via-transparent sm:to-surface/60" />
            </div>

            {/* info */}
            <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
              <span className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                {s.org}
              </span>
              <h3 className="font-headline text-xl font-bold text-fg sm:text-2xl">
                {s.name}
              </h3>
              <p className="mt-2 font-mono text-sm leading-relaxed text-accent-alt/80">
                {s.talk}
              </p>

              {/* bio — expandable */}
              <p
                className={`mt-3 font-body text-sm leading-relaxed text-dim transition-all duration-300 ${
                  expanded === i ? "" : "line-clamp-2"
                }`}
              >
                {s.bio}
              </p>
              <button
                onClick={() => setExpanded(expanded === i ? null : i)}
                className="mt-1 self-start font-mono text-[11px] text-accent hover:text-accent-alt transition-colors"
              >
                {expanded === i ? "— collapse" : "+ read more"}
              </button>

              {/* certs + links */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {s.certs.map((c) => (
                  <span
                    key={c}
                    className="rounded border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-accent"
                  >
                    {c}
                  </span>
                ))}
                {s.github && (
                  <a
                    href={s.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto rounded border border-border-dim px-3 py-1 font-mono text-[11px] text-dim transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    GitHub ↗
                  </a>
                )}
                {s.linkedin && (
                  <a
                    href={s.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded border border-border-dim px-3 py-1 font-mono text-[11px] text-dim transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    LinkedIn ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ── Mentors Panel ────────────────────────────────────────── */

function MentorsPanel() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-accent/20 bg-accent/5">
        <span className="font-mono text-3xl text-accent/60">?</span>
      </div>
      <h3 className="font-headline text-xl font-semibold text-fg sm:text-2xl">
        Mentors Incoming
      </h3>
      <p className="mt-3 max-w-md font-body text-sm leading-relaxed text-dim">
        Our mentor lineup is being finalized. Industry veterans and domain
        experts who will guide participants through workshops and CTF
        challenges — details dropping soon.
      </p>
      <span className="mt-6 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
        To be announced
      </span>
    </div>
  );
}

/* ── Organizers Panel ─────────────────────────────────────── */

function OrganizersPanel() {
  return (
    <>
      {/* organizing clubs */}
      <section className="mb-12">
        <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-dim">
          Organizing Clubs
        </h2>
        <div className="flex flex-wrap gap-3">
          {["OSC (Open Source Community)", "Null Chapter"].map((club) => (
            <span
              key={club}
              className="rounded-md border border-accent/25 bg-accent/10 px-4 py-2 font-mono text-sm text-accent"
            >
              {club}
            </span>
          ))}
        </div>
      </section>

      {/* core command */}
      <section className="mb-16">
        <h2 className="mb-6 font-headline text-xl font-semibold text-fg sm:text-2xl">
          Core Command
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {coreCommand.map((member) => (
            <div
              key={member.role}
              className="rounded-lg border border-border-dim bg-surface p-5 card-glow"
            >
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                {member.role}
              </span>
              <p className="mt-2 font-headline text-base font-bold text-fg sm:text-lg">
                {member.names}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* faculty advisor */}
      <section className="mb-16">
        <h2 className="mb-6 font-headline text-xl font-semibold text-fg sm:text-2xl">
          Faculty Advisor
        </h2>
        <div className="rounded-lg border border-accent/30 bg-surface p-6 shadow-[0_0_40px_rgba(139,92,246,0.08)] card-glow sm:max-w-md">
          <span className="font-mono text-[11px] uppercase tracking-wider text-accent-alt">
            Advisory Escalation
          </span>
          <p className="mt-2 font-headline text-lg font-bold text-fg sm:text-xl">
            Dr. Sibi Chakkaravarty
          </p>
        </div>
      </section>

      {/* functional pods */}
      <section>
        <h2 className="mb-6 font-headline text-xl font-semibold text-fg sm:text-2xl">
          Functional Pods
        </h2>
        <div className="flex flex-wrap gap-3">
          {pods.map((pod) => (
            <span
              key={pod.name}
              className="inline-flex items-center gap-2 rounded-md border border-border-dim bg-surface px-4 py-2.5 font-mono text-xs tracking-wide text-fg card-glow sm:text-sm"
            >
              {pod.name}
              <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                {pod.count}
              </span>
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
