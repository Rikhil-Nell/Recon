"use client";

import { useState } from "react";

/* ── schedule data ────────────────────────────────────────────── */

interface ScheduleEvent {
  time: string;
  title: string;
  description: string;
  tag?: "OVERNIGHT" | "FLAGSHIP" | "BREAK" | "RECOVERY" | "OPEN FLOOR" | "CEREMONY";
  overnight?: boolean;
}

interface DaySchedule {
  day: number;
  date: string;
  codename: string;
  events: ScheduleEvent[];
}

const SCHEDULE: DaySchedule[] = [
  {
    day: 1,
    date: "APR 19",
    codename: "THREAT MODEL ALIGNMENT",
    events: [
      {
        time: "09:30",
        title: "Gates Open — Registration Scan",
        description:
          "Badge collection, identity verification, wristband issuance. Arrive early to avoid queues.",
      },
      {
        time: "10:00 – 11:00",
        title: "Inauguration",
        description:
          "Dignitary welcome, organizer address, safety & scope briefing, sponsor acknowledgment.",
        tag: "CEREMONY",
      },
      {
        time: "11:00 – 12:30",
        title: "Talk 1",
        description:
          "Speaker introduction, 58-minute keynote session followed by 27-minute audience Q&A.",
        tag: "FLAGSHIP",
      },
      {
        time: "12:30 – 13:30",
        title: "Lunch Break",
        description:
          "Catered meal at the venue. Vegetarian and non-vegetarian options available.",
        tag: "BREAK",
      },
      {
        time: "13:30 – 15:00",
        title: "Talk 2",
        description:
          "Speaker introduction, 58-minute deep-dive session followed by 27-minute Q&A.",
        tag: "FLAGSHIP",
      },
      {
        time: "15:00 – 17:00",
        title: "All Side Event Stalls Open",
        description:
          "Workshops Batch 1 & 2, Sponsor Demo Street, Sponsor Challenges — explore freely.",
        tag: "OPEN FLOOR",
      },
      {
        time: "17:00 – 18:00",
        title: "CTF Briefing",
        description:
          "Rules walkthrough, scope definition, anti-cheat policy, platform login verification, meal break before night ops.",
        tag: "FLAGSHIP",
      },
      {
        time: "18:00 – 06:00",
        title: "Overnight CTF",
        description:
          "12-hour Jeopardy-style CTF. Categories: web, pwn, crypto, forensics, OSINT, misc. Hint windows at 20:00 and 02:00.",
        tag: "OVERNIGHT",
        overnight: true,
      },
    ],
  },
  {
    day: 2,
    date: "APR 20",
    codename: "ESCALATION WINDOW",
    events: [
      {
        time: "06:00 – 12:30",
        title: "CTF Close + Recovery",
        description:
          "Breakfast served, provisional leaderboard displayed, mandatory rest advisory issued.",
        tag: "RECOVERY",
      },
      {
        time: "10:00 – 12:30",
        title: "Career Clinic / Sponsor Quiet Mode",
        description:
          "Resume teardowns, mock interviews, recruiter 1-on-1 sessions. Sponsors available for quiet demos.",
        tag: "OPEN FLOOR",
      },
      {
        time: "13:30 – 14:30",
        title: "Talk 3",
        description:
          "43-minute focused session followed by a 12-minute rapid-fire Q&A.",
        tag: "FLAGSHIP",
      },
      {
        time: "14:30 – 15:30",
        title: "Talk 4",
        description:
          "43-minute industry talk followed by 12-minute Q&A. Final speaker session of the event.",
        tag: "FLAGSHIP",
      },
      {
        time: "15:30 – 21:30",
        title: "All Side Event Stalls Open",
        description:
          "Workshops, Sponsor Demo Street, Sponsor Challenges — extended 6-hour window.",
        tag: "OPEN FLOOR",
      },
      {
        time: "21:30 – 22:00",
        title: "Dinner + KOTH Briefing",
        description:
          "Final meal before night ops. KOTH rules, target handling procedures, eligibility checks.",
        tag: "BREAK",
      },
      {
        time: "22:00 – 06:00",
        title: "Overnight KOTH",
        description:
          "8-hour Attack/Defend format. Target resets every 30–60 min. Health checks monitored by infra team.",
        tag: "OVERNIGHT",
        overnight: true,
      },
    ],
  },
  {
    day: 3,
    date: "APR 21",
    codename: "CLOSEOUT + DEBRIEF",
    events: [
      {
        time: "06:00 – 12:30",
        title: "KOTH Close + Recovery",
        description:
          "Breakfast served, top-team score verification, rest advisory. Results under review.",
        tag: "RECOVERY",
      },
      {
        time: "14:00 – 16:00",
        title: "Finals Highlights & Lightning Talks",
        description:
          "Recap reel of best moments, top-team debriefs, sponsor innovation block, jury summary.",
        tag: "FLAGSHIP",
      },
      {
        time: "16:00 – 17:00",
        title: "Awards & Closing Ceremony",
        description:
          "Side-event passport awards, CTF awards, KOTH awards, sponsor & faculty acknowledgments, next-edition teaser.",
        tag: "CEREMONY",
      },
    ],
  },
];

/* ── tag styles ───────────────────────────────────────────────── */

function tagColor(tag: string): string {
  switch (tag) {
    case "OVERNIGHT":
      return "bg-accent-alt/15 text-accent-alt border border-accent-alt/30";
    case "FLAGSHIP":
      return "bg-accent/10 text-accent border border-accent/25";
    case "BREAK":
      return "bg-dim/10 text-dim border border-dim/20";
    case "RECOVERY":
      return "bg-accent-2/10 text-accent-2 border border-accent-2/20";
    case "OPEN FLOOR":
      return "bg-accent/8 text-accent-2 border border-accent-2/20";
    case "CEREMONY":
      return "bg-accent-alt/10 text-accent-alt border border-accent-alt/25";
    default:
      return "bg-dim/10 text-dim border border-dim/20";
  }
}

/* ── component ────────────────────────────────────────────────── */

export default function SchedulePage() {
  const [activeDay, setActiveDay] = useState(0);
  const current = SCHEDULE[activeDay];

  return (
    <main className="min-h-svh bg-background pt-24 pb-16">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 gradient-radial opacity-60" />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* ── header ──────────────────────────────────────────── */}
        <header className="mb-12">
          <span className="section-label">{"// SCHEDULE"}</span>
          <h1 className="mt-3 font-headline text-3xl font-bold text-fg sm:text-5xl">
            3-Day Operations Timeline
          </h1>
          <p className="mt-3 max-w-xl font-body text-sm leading-relaxed text-dim sm:text-base">
            April 19 – 21, 2026 &middot; VIT-AP University Campus &middot; 72
            hours of continuous cyber operations.
          </p>
          <div className="glow-divider mt-8" />
        </header>

        {/* ── day tabs ────────────────────────────────────────── */}
        <div className="mb-10 flex flex-wrap gap-3">
          {SCHEDULE.map((d, i) => (
            <button
              key={d.day}
              onClick={() => setActiveDay(i)}
              className={`rounded-md border px-4 py-2.5 font-mono text-xs tracking-wider transition-all sm:px-5 sm:text-sm ${
                activeDay === i
                  ? "border-accent bg-accent/15 text-accent shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                  : "btn-ghost"
              }`}
            >
              <span className="font-bold">DAY {d.day}</span>
              <span className="mx-2 text-dim">|</span>
              <span className="text-dim">{d.date}</span>
            </button>
          ))}
        </div>

        {/* ── day codename ────────────────────────────────────── */}
        <div className="mb-8 flex items-center gap-3">
          <span className="font-mono text-xs tracking-widest text-accent">
            {`[ DAY ${current.day} ]`}
          </span>
          <span className="font-headline text-lg font-semibold text-fg sm:text-xl">
            {current.codename}
          </span>
        </div>

        {/* ── timeline ────────────────────────────────────────── */}
        <div className="relative ml-3 border-l border-border-dim pl-8 sm:ml-4 sm:pl-10">
          {/* vertical accent line glow dot at top */}
          <div className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(139,92,246,0.6)]" />

          {current.events.map((evt, idx) => (
            <div
              key={idx}
              className={`group relative mb-6 last:mb-0 rounded-lg border bg-surface p-4 transition-all sm:p-5 card-glow ${
                evt.overnight
                  ? "border-l-2 border-l-accent-alt border-t-border-dim border-r-border-dim border-b-border-dim"
                  : "border-border-dim"
              }`}
            >
              {/* timeline dot */}
              <div
                className={`absolute -left-[calc(2rem+5px)] top-5 h-2.5 w-2.5 rounded-full border-2 sm:-left-[calc(2.5rem+5px)] ${
                  evt.overnight
                    ? "border-accent-alt bg-accent-alt/40"
                    : "border-accent bg-accent/30"
                }`}
              />

              {/* top row: time + tag */}
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-semibold text-accent sm:text-base">
                  {evt.time}
                </span>

                {evt.tag && (
                  <span
                    className={`rounded px-2 py-0.5 font-mono text-[10px] tracking-wider ${tagColor(
                      evt.tag
                    )}`}
                  >
                    {evt.tag}
                  </span>
                )}

                {evt.overnight && (
                  <span className="rounded bg-accent-alt/10 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-alt border border-accent-alt/25">
                    {evt.time.includes("12") ? "12 HR" : "8 HR"}
                  </span>
                )}
              </div>

              {/* title */}
              <h3 className="font-headline text-base font-semibold text-fg sm:text-lg">
                {evt.title}
              </h3>

              {/* description */}
              <p className="mt-1 font-body text-xs leading-relaxed text-dim sm:text-sm">
                {evt.description}
              </p>
            </div>
          ))}

          {/* bottom dot */}
          <div className="absolute -left-[3px] bottom-0 h-1.5 w-1.5 rounded-full bg-border" />
        </div>

        {/* ── info bar ────────────────────────────────────────── */}
        <div className="glow-divider mt-12 mb-6" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: "🍽", label: "Meals provided during all breaks" },
            { icon: "🛏", label: "Rest zones available 24/7" },
            { icon: "🕐", label: "All times in IST (UTC +5:30)" },
          ].map((info) => (
            <div
              key={info.label}
              className="flex items-center gap-3 rounded-md border border-border-dim bg-surface px-4 py-3 card-glow"
            >
              <span className="text-lg">{info.icon}</span>
              <span className="font-body text-xs text-dim sm:text-sm">
                {info.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
