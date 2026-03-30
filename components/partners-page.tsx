import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail, Phone, ShieldCheck } from "lucide-react";
import {
  partnerActivations,
  partnerRoi,
  partnerTimeline,
  partnerTiers,
} from "@/lib/site-data";
import { Reveal } from "@/components/motion";

export function PartnersPage() {
  return (
    <main className="relative overflow-hidden bg-[var(--black)] px-4 py-6 md:px-6 lg:px-10">
      <div className="noise-overlay" />
      <div className="grid-overlay" />
      <div className="scanlines" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--gray-400)] transition hover:border-[var(--purple)] hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back Home
          </Link>
          <Link href="/signup" className="cta-primary">
            Register Operator
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(12,12,15,0.94))] px-6 py-10 md:px-10">
          <Reveal>
            <span className="eyebrow">Partnership Opportunities</span>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <h1 className="text-[clamp(3rem,7vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.06em]">
                  Sponsorship tiers
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--gray-400)]">
                  Three tiers, one goal: measurable talent acquisition and brand visibility.
                </p>
              </div>
              <div className="rounded-[1.6rem] border border-[var(--purple)]/25 bg-[var(--purple)]/10 p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                  Command Summary
                </p>
                <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                  No pure sales pitches. Recon sponsor activations must be hands-on
                  technical experiences or direct career opportunities.
                </p>
                <div className="mt-6 flex items-center gap-3 text-sm text-white">
                  <ShieldCheck className="h-5 w-5 text-[var(--purple-light)]" />
                  National-scale security audience with scoped infrastructure and
                  post-event analytics.
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 xl:grid-cols-3">
            {partnerTiers.map((tier, index) => (
              <Reveal key={tier.name} delay={index * 0.06}>
                <article className={`mission-card h-full ${tier.name === "Title" ? "ring-1 ring-[var(--purple)]/40" : ""}`}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--purple-light)]">
                    {tier.name}
                  </p>
                  <h2 className="mt-4 text-4xl font-black uppercase tracking-[-0.05em]">
                    {tier.price}
                  </h2>
                  <p className="mt-2 text-sm text-[var(--gray-400)]">{tier.note}</p>
                  <div className="mt-6 space-y-3">
                    {tier.features.map((feature) => (
                      <div
                        key={feature}
                        className="rounded-2xl border border-white/8 bg-black/30 px-4 py-3 text-sm leading-7 text-[var(--gray-400)]"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="py-20">
          <Reveal>
            <span className="eyebrow">Engagement Formats</span>
            <h2 className="section-title mt-5 max-w-3xl">
              Activations that convert
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--gray-400)]">
              No pure sales pitches. Recon sponsor activations must be hands-on technical experiences or direct career opportunities.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {partnerActivations.map((activation, index) => (
              <Reveal key={activation.title} delay={index * 0.05}>
                <article className="track-card h-full">
                  <h3 className="text-xl font-black uppercase tracking-[-0.04em]">
                    {activation.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                    {activation.description}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-10 md:px-10">
          <Reveal>
            <span className="eyebrow">Measurable Outcomes</span>
            <h2 className="section-title mt-5 max-w-3xl">Quantified ROI</h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--gray-400)]">
              Trackable, predictable metrics to prove your sponsorship delivered real hiring and branding outcomes.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {partnerRoi.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <div className="timeline-card h-full">
                  <p className="text-3xl font-black uppercase tracking-[-0.04em] text-white">
                    {item.value}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <div className="mission-card">
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">
                Talent Discovery
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                Receive resumes (with attendee consent) explicitly linked to challenge completion. Stop guessing skills during technical rounds, hire the student who solved your custom pwn challenge at 3 AM.
              </p>
            </div>
            <div className="mission-card">
              <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">
                Documentation & Brand Engagement
              </h3>
              <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                Preliminary sponsor report delivered within 72 hours. Final detailed report (footfall estimates by slot, challenge solves, stage mentions) delivered within 7 days. All sponsors receive high-resolution photographic documentation of their branding, booths, and winning teams for internal verification and marketing.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20">
          <Reveal>
            <span className="eyebrow">Key Dates</span>
            <h2 className="section-title mt-5 max-w-3xl">
              Partnership timeline
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--gray-400)]">
              Structured milestones to ensure flawless execution and mutual preparedness.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            {partnerTimeline.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.05}>
                <article className="timeline-card">
                  <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                    {item.label}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
                    {item.detail}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] border border-[var(--purple)]/20 bg-[linear-gradient(180deg,rgba(139,92,246,0.12),rgba(12,12,15,0.92))] px-6 py-10 md:px-10">
          <Reveal>
            <span className="eyebrow">Let&apos;s Build This Together</span>
            <h2 className="section-title mt-5 max-w-3xl">
              Secure your hiring funnel now
            </h2>
            <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--gray-400)]">
              Sponsor slots are capped to maintain event quality and ensure high ROI for all partners. Reach out to discuss how Recon 2026 fits your technical recruitment strategy.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <div className="mission-card">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                Event Contact
              </p>
              <div className="mt-5 space-y-4">
                <a href="mailto:recon2k26@gmail.com" className="flex items-center gap-3 text-sm text-white">
                  <Mail className="h-4 w-4 text-[var(--purple-light)]" />
                  recon2k26@gmail.com
                </a>
                <a href="https://x.com/Recon2k26" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white">
                  <ArrowRight className="h-4 w-4 text-[var(--purple-light)]" />
                  @Recon2k26
                </a>
                <a href="https://www.instagram.com/recon_2k26" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white">
                  <ArrowRight className="h-4 w-4 text-[var(--purple-light)]" />
                  @recon_2k26
                </a>
                <a href="https://www.linkedin.com/in/recon-events/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white">
                  <ArrowRight className="h-4 w-4 text-[var(--purple-light)]" />
                  recon-events
                </a>
              </div>
            </div>
            <div className="mission-card">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                Event Director
              </p>
              <div className="mt-5 space-y-4">
                <a href="mailto:nrikhil@gmail.com" className="flex items-center gap-3 text-sm text-white">
                  <Mail className="h-4 w-4 text-[var(--purple-light)]" />
                  nrikhil@gmail.com
                </a>
                <a href="tel:+917386175224" className="flex items-center gap-3 text-sm text-white">
                  <Phone className="h-4 w-4 text-[var(--purple-light)]" />
                  +91 7386175224
                </a>
                <a href="https://linkedin.com/in/rikhil-nellimarla" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white">
                  <ArrowRight className="h-4 w-4 text-[var(--purple-light)]" />
                  rikhil nellimarla
                </a>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-sm text-[var(--gray-400)]">
            Organized by Open Source Community & Null Chapter. VIT-AP University. Advisory: Dr. Sibi Chakkaravarty.
          </div>
        </section>
      </div>
    </main>
  );
}
