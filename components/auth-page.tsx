"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Code2, Globe, Mail, Shield, Sparkles } from "lucide-react";

const socialProviders = [
  { label: "Google", icon: Globe },
  { label: "GitHub", icon: Code2 },
  { label: "Microsoft", icon: Mail },
];

type AuthPageProps = {
  mode: "login" | "signup";
  title: string;
  subtitle: string;
  quote: string;
  buttonLabel: string;
};

export function AuthPage({
  mode,
  title,
  subtitle,
  quote,
  buttonLabel,
}: AuthPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--black)] px-4 py-6 md:px-6 lg:px-10">
      <div className="noise-overlay" />
      <div className="scanlines" />
      <div className="mx-auto grid min-h-[calc(100svh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(140deg,rgba(12,12,15,0.96),rgba(9,9,11,0.88))] md:grid-cols-[1.05fr_0.95fr]">
        <section className="auth-brand-panel relative flex flex-col justify-between overflow-hidden p-8 md:p-10">
          <div className="auth-mesh" />
          <div className="auth-dots" />
          <div className="relative z-10">
            <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[var(--gray-400)] transition hover:border-[var(--purple)] hover:text-white">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-12 max-w-xl"
            >
              <span className="eyebrow">Recon Identity Layer</span>
              <h1 className="mt-6 text-[clamp(2.5rem,6vw,5.2rem)] font-black uppercase leading-[0.9] tracking-[-0.05em]">
                {quote}
              </h1>
              <p className="mt-6 max-w-lg text-base leading-8 text-[var(--gray-400)]">
                Operator accounts unlock registration, schedules, competition
                onboarding, team coordination, and event-time broadcasts.
              </p>
            </motion.div>
          </div>

          <div className="relative z-10 mt-10 grid gap-4 md:grid-cols-2">
            {[
              "Encrypted registration state",
              "Queue-ready competition routing",
              "Terminal-grade activity feed",
              "Cross-zone event access",
            ].map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-white/10 bg-black/40 px-4 py-4">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--purple-light)]">
                  <Shield className="h-4 w-4" />
                  Secure
                </div>
                <p className="mt-3 text-sm leading-7 text-[var(--gray-400)]">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="flex items-center justify-center p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(24,24,27,0.96),rgba(12,12,15,0.92))] p-6 shadow-[0_25px_80px_rgba(0,0,0,0.42)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--purple-light)]">
                  {mode === "login" ? "Login" : "Signup"}
                </p>
                <h2 className="mt-3 text-3xl font-black uppercase tracking-[-0.04em]">
                  {title}
                </h2>
              </div>
              <div className="rounded-2xl border border-[var(--purple)]/30 bg-[var(--purple)]/10 p-3">
                <Sparkles className="h-5 w-5 text-[var(--purple-light)]" />
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[var(--gray-400)]">
              {subtitle}
            </p>

            <form className="mt-8 space-y-4">
              {mode === "signup" && (
                <>
                  <Field label="Full Name" type="text" placeholder="Operator Name" />
                  <Field label="College / Organization" type="text" placeholder="Institution" />
                </>
              )}
              <Field label="Email" type="email" placeholder="name@domain.com" />
              <Field label="Password" type="password" placeholder="Enter password" />
              {mode === "signup" && (
                <>
                  <Field label="Confirm Password" type="password" placeholder="Confirm password" />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Mode" type="text" placeholder="Team / Solo" />
                    <Field label="Unit" type="text" placeholder="Team name (optional)" />
                  </div>
                </>
              )}
              {mode === "login" && (
                <div className="flex items-center justify-between gap-4 text-sm text-[var(--gray-400)]">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 rounded border-white/15 bg-transparent accent-[var(--purple)]" />
                    Remember me
                  </label>
                  <Link href="#" className="text-[var(--purple-light)] transition hover:text-white">
                    Forgot password
                  </Link>
                </div>
              )}
              <button type="submit" className="cta-primary w-full justify-center">
                {buttonLabel}
              </button>
            </form>

            <div className="mt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--gray-400)]">
                Social Auth
              </p>
              <div className="mt-3 grid gap-3">
                {socialProviders.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <button
                      key={provider.label}
                      type="button"
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white transition hover:border-[var(--purple)]/50 hover:bg-[var(--purple)]/8"
                    >
                      <span>{provider.label}</span>
                      <Icon className="h-4 w-4 text-[var(--purple-light)]" />
                    </button>
                  );
                })}
              </div>
            </div>

            <p className="mt-6 text-sm text-[var(--gray-400)]">
              {mode === "login" ? "No operator ID yet? " : "Already onboarded? "}
              <Link
                href={mode === "login" ? "/signup" : "/login"}
                className="text-[var(--purple-light)] transition hover:text-white"
              >
                {mode === "login" ? "Create account" : "Login"}
              </Link>
            </p>
          </motion.div>
        </section>
      </div>
    </main>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-[0.28em] text-[var(--gray-400)]">
        {label}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/10 bg-black/35 px-4 py-3 text-sm text-white outline-none transition placeholder:text-[var(--gray-400)]/70 focus:border-[var(--purple)]/60 focus:bg-black/55"
      />
    </label>
  );
}
