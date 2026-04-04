export default function TeamPage() {
  const coreCommand = [
    { role: "Event Director", names: "Rikhil Nellimarla" },
    { role: "Chief Technical Officer", names: "Abhiram Venkat Sai Adabala" },
    { role: "Operations Chief", names: "Mohammed Faariz, Cheppali Chanu" },
    {
      role: "Technical Infrastructure Lead",
      names: "Izhaan Raza, Surya Theja Dhommalapati",
    },
    {
      role: "CTF/KOTH Competition Director",
      names: "Vikhyat Shajee Nambiar, Swarnim Bandekar",
    },
    {
      role: "Program & Speakers Lead",
      names: "Aditya J Shettigar, Akshat Abhishek Singh",
    },
    { role: "Sponsorship & Partnerships Lead", names: "Ayushi" },
    { role: "Design, Media & Broadcast Lead", names: "Jahnvi Kotangale" },
    {
      role: "Volunteer & Logistics Lead",
      names: "Reet Mishra, A. Dharineesh",
    },
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

  return (
    <main className="min-h-svh bg-background pt-24 pb-16">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 gradient-radial opacity-60" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        {/* ── header ──────────────────────────────────────────── */}
        <header className="mb-12">
          <span className="section-label">{"// TEAM"}</span>
          <h1 className="mt-3 font-headline text-3xl font-bold text-fg sm:text-5xl">
            The Operators
          </h1>
          <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-dim sm:text-base">
            80-person workforce across 9 functional pods, organized by OSC +
            Null Chapter at VIT-AP
          </p>
          <div className="glow-divider mt-8" />
        </header>

        {/* ── organizing clubs ────────────────────────────────── */}
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

        {/* ── core command ────────────────────────────────────── */}
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

        {/* ── faculty advisor ─────────────────────────────────── */}
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

        {/* ── functional pods ─────────────────────────────────── */}
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
      </div>
    </main>
  );
}
