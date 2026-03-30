"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  MapPinned,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CountUp, Reveal } from "@/components/motion";
import { SiteNavbar } from "@/components/site-navbar";
import {
  commandStaff,
  diagonalStats,
  faqItems,
  heroStats,
  partnerLogoPaths,
  participateCards,
  scheduleBlocks,
  socialLinks,
  trackCards,
} from "@/lib/site-data";

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--black)]">
      <SiteNavbar />
      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.24),transparent_22%),radial-gradient(circle_at_80%_12%,rgba(167,139,250,0.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />
      <div className="grid-overlay" />
      <div className="scanlines" />
      <HeroSection />
      <StatsBanner />
      <WhySection />
      <TracksSection />
      <ScheduleSection />
      <PartnersSection />
      <CommandSection />
      <FaqSection />
      <Footer />
    </main>
  );
}

function HeroSection() {
  return (
    <section id="home" className="relative px-4 pb-20 pt-28 md:px-6 lg:px-10">
      <div className="mx-auto grid min-h-[calc(100svh-3rem)] max-w-7xl gap-8 rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(12,12,15,0.92),rgba(9,9,11,0.72))] px-6 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.5)] md:grid-cols-[1.05fr_1.3fr_0.95fr] md:px-8 md:py-10">
        <Reveal className="flex flex-col justify-between gap-8">
          <div className="space-y-6">
            <span className="eyebrow">National Workshop on System Security</span>
            <div className="space-y-4">
              <p className="max-w-sm text-sm uppercase tracking-[0.35em] text-[var(--gray-400)]">
                From vulnerabilities to trustworthy systems
              </p>
              <h2 className="max-w-md text-[clamp(2.2rem,4vw,4rem)] font-black uppercase leading-[0.94] tracking-[-0.05em]">
                DEFCON pace. University discipline. National signal.
              </h2>
              <p className="max-w-md text-base leading-7 text-[var(--gray-400)]">
                A 3-day cyber operations environment for offensive security,
                system design, and technical credibility under real constraints.
              </p>
            </div>
          </div>
          <div className="grid gap-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="tactical-panel px-4 py-3">
                <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gray-400)]">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.18em] text-white">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="relative flex items-center justify-center">
          <div className="hero-core">
            <div className="absolute inset-0 rounded-[1.8rem] border border-[var(--purple)]/20 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.18),transparent_58%)]" />
            <div className="hero-wireframe" />
            <div className="spark spark-1" />
            <div className="spark spark-2" />
            <div className="spark spark-3" />
            <div className="absolute inset-0 overflow-hidden rounded-[1.8rem]">
              {Array.from({ length: 18 }).map((_, index) => (
                <span
                  key={index}
                  className="particle"
                  style={
                    {
                      left: `${(index * 13) % 100}%`,
                      top: `${(index * 19) % 100}%`,
                      animationDelay: `${index * 0.6}s`,
                      animationDuration: `${10 + (index % 5) * 2}s`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 flex min-h-[26rem] w-full flex-col items-center justify-center overflow-hidden rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] px-6 text-center"
            >
              <div className="mb-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.35em] text-[var(--gray-400)]">
                <ShieldCheck className="h-4 w-4 text-[var(--purple-light)]" />
                COMMAND CENTER // 2026
              </div>
              <div className="hero-title-wrap">
                <span className="hero-shadow-text">RECON</span>
                <h1 className="hero-title glitch-text" data-text="RECON 2026">
                  RECON
                  <span>2026</span>
                </h1>
              </div>
              <p className="mt-5 max-w-xl text-sm uppercase tracking-[0.34em] text-[var(--purple-light)] md:text-base">
                National cyber event for red-teamers, systems engineers, reverse
                analysts, and builders who can operate under pressure.
              </p>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.3} className="flex flex-col justify-between gap-6">
          <div className="tactical-panel flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--gray-400)]">
              <CalendarDays className="h-4 w-4 text-[var(--purple-light)]" />
              Mission Meta
            </div>
            <p className="text-2xl font-black uppercase leading-none tracking-[-0.04em]">
              600+ participants. 2 overnight competitions. One national signal.
            </p>
            <div className="space-y-3 text-sm leading-7 text-[var(--gray-400)]">
              <p>
                Recon runs like a tactical dashboard, not a generic fest. Every
                zone is owned, every challenge is scoped, every escalation path
                is documented.
              </p>
              <p className="flex items-start gap-3">
                <MapPinned className="mt-1 h-4 w-4 shrink-0 text-[var(--purple-light)]" />
                SAC + distributed campus zones, with flagship operations staged
                for high throughput and low chaos.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-1">
            <Link href="/signup" className="cta-primary">
              Register Now
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/partners" className="cta-secondary">
              Become Partner
              <Sparkles className="h-4 w-4" />
            </Link>
          </div>
          <div className="tactical-panel px-5 py-4">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--gray-400)]">
              Social Relay
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white transition hover:border-[var(--purple)] hover:bg-white/[0.05]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="relative z-10 px-4 py-8 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl -rotate-[2deg] rounded-[1.75rem] border border-[var(--purple)]/30 bg-[linear-gradient(90deg,rgba(139,92,246,0.22),rgba(12,12,15,0.95),rgba(139,92,246,0.18))] px-6 py-5 shadow-[0_24px_60px_rgba(139,92,246,0.16)]">
        <div className="grid gap-5 md:grid-cols-4">
          {diagonalStats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06}>
              <div className="rounded-[1.25rem] border border-white/10 bg-black/45 px-4 py-4 backdrop-blur-sm">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                  {stat.label}
                </p>
                <p className="mt-3 text-3xl font-black uppercase tracking-[-0.05em] text-white">
                  <CountUp
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.label === "Event Scale" ? 2 : 0}
                  />
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--gray-400)]">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section id="about" className="px-4 py-20 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="eyebrow">Why Participate</span>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title max-w-3xl">
              Tactical mission cards for operators who want more than stage
              selfies and empty sponsor booths.
            </h2>
            <p className="max-w-xl text-base leading-7 text-[var(--gray-400)]">
              Recon is built to feel like a live systems-security exercise:
              controlled infra, sharp briefings, real competition cadence, and
              meaningful sponsor access.
            </p>
          </div>
        </Reveal>
        <div id="events" className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {participateCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.05}>
                <motion.article
                  whileHover={{ y: -8, rotateX: -3, rotateY: 4 }}
                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  className="mission-card h-full"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--purple-light)]">
                        {card.eyebrow}
                      </p>
                      <h3 className="mt-4 text-2xl font-black uppercase tracking-[-0.04em]">
                        {card.title}
                      </h3>
                    </div>
                    <Icon className="h-6 w-6 text-[var(--purple-light)]" />
                  </div>
                  <p className="mt-5 text-sm leading-7 text-[var(--gray-400)]">
                    {card.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TracksSection() {
  return (
    <section id="tracks" className="px-4 py-20 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-8 md:px-8">
        <Reveal>
          <span className="eyebrow">Event Tracks</span>
          <div className="mt-5 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <h2 className="section-title">
              Every zone reads like a mission board, not a brochure.
            </h2>
            <p className="text-base leading-7 text-[var(--gray-400)]">
              HackByte’s stacked pacing is reinterpreted here as a cyber-ops
              grid: denser telemetry, harder cards, sharper glows, and a more
              militant visual rhythm.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {trackCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.06}>
                <motion.article whileHover={{ scale: 1.02 }} className="track-card">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase tracking-[-0.03em]">
                      {card.title}
                    </h3>
                    <Icon className="h-5 w-5 text-[var(--purple-light)]" />
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                    {card.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ScheduleSection() {
  return (
    <section id="schedule" className="px-4 py-20 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="eyebrow">Schedule Preview</span>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title max-w-3xl">
              Mission briefing timeline. Clean handoffs. Zero dead air.
            </h2>
            <p className="max-w-xl text-base leading-7 text-[var(--gray-400)]">
              Day-level pacing is shaped for flow control: talks up front,
              villages distributed, overnight flagships isolated, and final
              debriefs after validation.
            </p>
          </div>
        </Reveal>
        <div className="relative mt-12 grid gap-6 lg:grid-cols-3">
          {scheduleBlocks.map((block, index) => (
            <Reveal key={block.day} delay={index * 0.08}>
              <article className="timeline-card">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-[var(--purple)]/30 bg-[var(--purple)]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                    {block.day}
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[var(--purple)]/40 to-transparent" />
                </div>
                <h3 className="mt-5 text-2xl font-black uppercase tracking-[-0.04em]">
                  {block.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                  {block.summary}
                </p>
                <div className="mt-6 space-y-3">
                  {block.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/8 bg-black/35 px-4 py-3 font-mono text-[12px] uppercase tracking-[0.14em] text-[var(--gray-400)]"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="px-4 py-20 md:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(139,92,246,0.08),rgba(12,12,15,0.9))] px-6 py-8 md:grid-cols-[0.95fr_1.05fr] md:px-8">
        <Reveal>
          <span className="eyebrow">Sponsors + Partners</span>
          <h2 className="section-title mt-5 max-w-2xl">
            Partner visibility integrated into the tactical system, not bolted on.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[var(--gray-400)]">
            Sponsor activations are challenge-backed and recruiting-oriented. The
            full sponsorship copy and structure lives on the dedicated partners
            route with unchanged content.
          </p>
          <Link href="/partners" className="cta-primary mt-8 inline-flex">
            Open Partners Page
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {partnerLogoPaths.map((path, index) => (
              <div
                key={path}
                className="flex min-h-28 items-center justify-center rounded-[1.4rem] border border-white/10 bg-black/40 px-4 py-5 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)]"
              >
                <img
                  src={path}
                  alt={`Partner ${index + 1}`}
                  className="max-h-14 w-auto object-contain opacity-85"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CommandSection() {
  return (
    <section id="speakers" className="px-4 py-20 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <span className="eyebrow">Speakers / Organizers</span>
          <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="section-title max-w-3xl">
              Command staff layout sourced from Event HQ.
            </h2>
            <p className="max-w-xl text-base leading-7 text-[var(--gray-400)]">
              The event is structured like an operations team, with role ownership
              and backup coverage rather than vague committee blur.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {commandStaff.map((member, index) => (
            <Reveal key={member.role} delay={index * 0.05}>
              <article className="command-card">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                  {member.role}
                </p>
                <h3 className="mt-4 text-xl font-black uppercase tracking-[-0.04em]">
                  {member.people}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                  {member.detail}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="px-4 py-20 md:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-8 md:px-8">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title mt-5 max-w-3xl">
            Questions answered before they turn into friction.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4">
          {faqItems.map((item, index) => (
            <Reveal key={item.question} delay={index * 0.04}>
              <details className="faq-item group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="text-left text-lg font-black uppercase tracking-[-0.03em]">
                    {item.question}
                  </span>
                  <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--purple-light)] transition group-open:bg-[var(--purple)]/14">
                    Open
                  </span>
                </summary>
                <p className="mt-4 max-w-4xl text-sm leading-7 text-[var(--gray-400)]">
                  {item.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="px-4 pb-10 pt-8 md:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--gray-400)]">
            Recon 2026
          </p>
          <p className="mt-2 text-sm text-[var(--gray-400)]">
            Organized by Open Source Community + Null Chapter at VIT-AP University.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/login" className="footer-chip">
            Login
          </Link>
          <Link href="/signup" className="footer-chip">
            Signup
          </Link>
          <Link href="/partners" className="footer-chip">
            Partners
          </Link>
        </div>
      </div>
    </footer>
  );
}
