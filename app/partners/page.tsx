export default function PartnersPage() {
  const institutionalPartners = [
    {
      name: "VIT-AP University",
      description: "Host institution providing venue, infrastructure, and academic backing for RECON 2026.",
    },
    {
      name: "IIT Madras",
      description: "Research collaboration and funding linkage powering RECON's technical depth.",
    },
    {
      name: "ISEA",
      description: "Information Security Education & Awareness — national cybersecurity capacity-building initiative.",
    },
  ];

  const communityPartners = [
    {
      name: "Open Source Community (OSC)",
      role: "Co-organizer",
    },
    {
      name: "Null Chapter",
      role: "Co-organizer",
    },
    {
      name: "HackTheBox",
      role: "Community platform partner",
    },
    {
      name: "OffSec",
      role: "Training/certification partner",
    },
  ];

  const sponsorTiers = [
    {
      tier: "Title Sponsor",
      slots: "1 slot",
      accent: true,
      deliverables: [
        "Naming rights across all event collateral",
        "Main stage prominence & branding",
        "Prime stall placement",
        "Keynote or demo slot",
        "Flagship challenge slot",
        "App banner & digital presence",
      ],
    },
    {
      tier: "Gold Sponsor",
      slots: "Up to 4 slots",
      accent: false,
      deliverables: [
        "Secondary stage placement & branding",
        "Standard stall allocation",
        "Demo block during sessions",
        "Optional challenge slot",
      ],
    },
    {
      tier: "Community Sponsor",
      slots: "Multiple slots",
      accent: false,
      deliverables: [
        "Sponsor wall logo placement",
        "Shared stall or kiosk space",
        "Swag & reward partner mention",
      ],
    },
  ];

  return (
    <main className="min-h-svh pt-24 pb-20">
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6">
        <p className="section-label">{"// PARTNERS"}</p>
        <h1 className="mt-4 font-headline text-4xl font-bold text-fg sm:text-5xl">
          Partners & Sponsors
        </h1>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-dim sm:text-base">
          RECON 2026 is made possible by our institutional partners, community
          allies, and industry sponsors.
        </p>
        <div className="glow-divider mt-10" />
      </section>

      {/* Institutional Partners */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <h2 className="font-headline text-2xl font-semibold text-fg">
          Institutional Partners
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {institutionalPartners.map((partner) => (
            <div
              key={partner.name}
              className="card-glow rounded-lg border border-border-dim bg-surface p-6"
            >
              <span className="inline-block rounded border border-accent/20 bg-accent/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                In-Kind Partner
              </span>
              <h3 className="mt-4 font-headline text-lg font-semibold text-fg">
                {partner.name}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-dim">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Community Partners */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="font-headline text-2xl font-semibold text-fg">
          Community Partners
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {communityPartners.map((partner) => (
            <div
              key={partner.name}
              className="card-glow rounded-lg border border-border-dim bg-surface p-6"
            >
              <span className="inline-block rounded border border-accent-alt/20 bg-accent-alt/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent-alt">
                Community
              </span>
              <h3 className="mt-4 font-headline text-base font-semibold text-fg">
                {partner.name}
              </h3>
              <p className="mt-1 font-body text-sm text-dim">{partner.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsor Tiers */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="glow-divider mb-16" />
        <h2 className="font-headline text-2xl font-semibold text-fg">
          Sponsor Tiers
        </h2>
        <p className="mt-2 font-body text-sm text-dim">
          Structure for RECON 2026 — actual sponsors to be announced.
        </p>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {sponsorTiers.map((tier) => (
            <div
              key={tier.tier}
              className={`card-glow flex flex-col rounded-lg border bg-surface p-6 ${
                tier.accent
                  ? "border-accent/40 shadow-[0_0_30px_rgba(139,92,246,0.06)]"
                  : "border-border-dim"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3
                  className={`font-headline text-lg font-bold ${
                    tier.accent ? "text-accent" : "text-fg"
                  }`}
                >
                  {tier.tier}
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-dim">
                  {tier.slots}
                </span>
              </div>
              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {tier.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-body text-sm leading-relaxed text-dim"
                  >
                    <span className="mt-1.5 block h-1 w-1 flex-shrink-0 rounded-full bg-accent/60" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Become a Sponsor CTA */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="glow-divider mb-16" />
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-headline text-2xl font-semibold text-fg sm:text-3xl">
            Interested in sponsoring RECON 2026?
          </h2>
          <p className="mt-4 font-body text-sm leading-relaxed text-dim sm:text-base">
            High-intent security audience, hiring-ready participants, technical
            credibility. Partner with us to reach the next generation of
            cybersecurity professionals.
          </p>
          <p className="mt-6 font-mono text-sm text-fg">
            Contact:{" "}
            <span className="text-accent">
              Ayushi — Sponsorship & Partnerships Lead
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}
