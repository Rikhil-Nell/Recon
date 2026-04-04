export default function PrizesPage() {
  const ctfPrizes = [
    { rank: "1st", label: "TBA" },
    { rank: "2nd", label: "TBA" },
    { rank: "3rd", label: "TBA" },
  ];

  const kothPrizes = [
    { rank: "1st", label: "TBA" },
    { rank: "2nd", label: "TBA" },
    { rank: "3rd", label: "TBA" },
  ];

  const ctfSpecials = [
    "Best in Web",
    "Best in Crypto",
    "Best in Forensics",
    "Best in Pwn",
    "Best in OSINT",
  ];

  const kothSpecials = ["First Blood", "Longest Hold"];

  return (
    <main className="min-h-svh bg-background pt-24 pb-16">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 gradient-radial opacity-60" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* ── header ──────────────────────────────────────────── */}
        <header className="mb-12">
          <span className="section-label">{"// PRIZES"}</span>
          <h1 className="mt-3 font-headline text-3xl font-bold text-fg sm:text-5xl">
            What You&apos;re Playing For
          </h1>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-dim sm:text-base">
            INR 80,000+ across CTF, KOTH, and side-event tracks
          </p>
          <div className="glow-divider mt-8" />
        </header>

        {/* ── total pool banner ───────────────────────────────── */}
        <div className="mb-12 rounded-lg border border-accent/30 bg-gradient-to-r from-accent/10 via-surface to-accent/10 p-6 text-center shadow-[0_0_60px_rgba(139,92,246,0.1)]">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-dim">
            Total Prize Pool
          </span>
          <p className="mt-2 font-headline text-3xl font-bold text-fg sm:text-4xl">
            INR 80,000<span className="text-accent">+</span>
          </p>
        </div>

        {/* ── CTF & KOTH cards ────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* CTF Card */}
          <div className="rounded-lg border-2 border-accent/40 bg-surface p-6 shadow-[0_0_40px_rgba(139,92,246,0.08)] card-glow sm:p-8">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-headline text-xl font-bold text-fg sm:text-2xl">
                CTF
              </h2>
              <span className="rounded bg-accent/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent border border-accent/25">
                OVERNIGHT #1
              </span>
            </div>
            <p className="mb-6 font-body text-xs text-dim">
              12-hour Jeopardy-style &middot; Team size: 1&ndash;4
            </p>

            {/* prize rows */}
            <div className="space-y-3">
              {ctfPrizes.map((p) => (
                <div
                  key={p.rank}
                  className="flex items-center justify-between rounded-md border border-border-dim bg-background/50 px-4 py-3"
                >
                  <span className="font-mono text-sm font-semibold text-accent-alt">
                    {p.rank} Place
                  </span>
                  <span className="font-headline text-sm font-bold text-fg">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* category specials */}
            <div className="mt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
                Category Specials
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {ctfSpecials.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-accent-alt/20 bg-accent-alt/8 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent-alt"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* KOTH Card */}
          <div className="rounded-lg border-2 border-accent-alt/40 bg-surface p-6 shadow-[0_0_40px_rgba(196,181,253,0.06)] card-glow sm:p-8">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-headline text-xl font-bold text-fg sm:text-2xl">
                KOTH
              </h2>
              <span className="rounded bg-accent-alt/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-accent-alt border border-accent-alt/25">
                OVERNIGHT #2
              </span>
            </div>
            <p className="mb-6 font-body text-xs text-dim">
              8-hour Attack/Defend &middot; Team size: 1&ndash;4
            </p>

            {/* prize rows */}
            <div className="space-y-3">
              {kothPrizes.map((p) => (
                <div
                  key={p.rank}
                  className="flex items-center justify-between rounded-md border border-border-dim bg-background/50 px-4 py-3"
                >
                  <span className="font-mono text-sm font-semibold text-accent-alt">
                    {p.rank} Place
                  </span>
                  <span className="font-headline text-sm font-bold text-fg">
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            {/* special awards */}
            <div className="mt-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
                Special Awards
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {kothSpecials.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-accent/20 bg-accent/8 px-2.5 py-1 font-mono text-[10px] tracking-wide text-accent"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Side-Event Passport ─────────────────────────────── */}
        <section className="mt-8">
          <div className="rounded-lg border border-border-dim bg-surface p-6 card-glow sm:p-8">
            <div className="mb-1 flex items-center justify-between">
              <h2 className="font-headline text-xl font-bold text-fg sm:text-2xl">
                Side-Event Passport
              </h2>
              <span className="rounded bg-dim/15 px-2 py-0.5 font-mono text-[10px] tracking-wider text-dim border border-dim/20">
                ALL TRACKS
              </span>
            </div>
            <p className="mb-4 font-body text-xs text-dim sm:text-sm">
              Top 20 point earners across all side events win from a dedicated
              prize pool
            </p>
            <div className="rounded-md border border-border-dim bg-background/50 px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-dim">
                Points earned from
              </span>
              <p className="mt-1 font-body text-sm text-fg">
                All 10+ villages, sponsor challenges, and workshops
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
