import TeamTabs from "./TeamTabs";

export default function TeamPage() {
  return (
    <main className="min-h-svh bg-background pt-24 pb-16">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 gradient-radial opacity-60" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* ── header ──────────────────────────────────────────── */}
        <header className="mb-10">
          <span className="section-label">{"// TEAM"}</span>
          <h1 className="mt-3 font-headline text-3xl font-bold text-fg sm:text-5xl">
            The People Behind RECON
          </h1>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-dim sm:text-base">
            Speakers, mentors, and the 80-person organizing force making it all
            happen — organized by OSC + Null Chapter at VIT-AP
          </p>
          <div className="glow-divider mt-8" />
        </header>

        {/* ── tabbed content ──────────────────────────────────── */}
        <TeamTabs />
      </div>
    </main>
  );
}
