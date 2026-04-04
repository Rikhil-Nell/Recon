import Link from "next/link";

const socials = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Twitter / X", href: "#" },
  { label: "Discord", href: "#" },
];

const contacts = [
  {
    title: "General Inquiries",
    detail: "recon@vitap.ac.in",
    href: "mailto:recon@vitap.ac.in",
  },
  {
    title: "Sponsorship",
    detail: "Ayushi \u2014 Sponsorship Lead",
  },
  {
    title: "Registration Issues",
    detail: "Helpdesk (at event)",
  },
  {
    title: "Travel & Logistics",
    detail: "Logistics Desk (at event)",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-svh bg-background px-4 pt-24 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label">{"// CONTACT"}</span>
          <h1 className="mt-3 font-headline text-4xl font-bold text-fg sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-dim">
            Reach out for questions, sponsorship, or anything RECON 2026.
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Contact cards */}
          <div className="space-y-4">
            <h2 className="font-headline text-lg font-bold text-fg">
              Key Contacts
            </h2>
            <div className="space-y-3">
              {contacts.map((c, i) => (
                <div
                  key={i}
                  className="card-glow rounded-lg border border-border-dim bg-surface p-5"
                >
                  <p className="font-mono text-xs uppercase tracking-wider text-dim">
                    {c.title}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-1 block font-headline text-sm font-semibold text-accent transition-colors hover:text-accent-alt"
                    >
                      {c.detail}
                    </a>
                  ) : (
                    <p className="mt-1 font-headline text-sm font-semibold text-fg">
                      {c.detail}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Organizing Info */}
            <div className="card-glow rounded-lg border border-border-dim bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-dim">
                Organizing Clubs
              </p>
              <p className="mt-1 font-headline text-sm font-semibold text-fg">
                OSC (Open Source Community) + Null Chapter
              </p>
            </div>
            <div className="card-glow rounded-lg border border-border-dim bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-dim">
                Advisory
              </p>
              <p className="mt-1 font-headline text-sm font-semibold text-fg">
                Dr. Sibi Chakkaravarty
              </p>
            </div>
          </div>

          {/* Right: Venue & Event Info */}
          <div className="space-y-4">
            <h2 className="font-headline text-lg font-bold text-fg">
              Venue & Event
            </h2>

            <div className="card-glow rounded-lg border border-border-dim bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-dim">
                Venue
              </p>
              <p className="mt-1 font-headline text-sm font-semibold text-fg">
                SAC (Student Activity Center)
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-dim">
                VIT-AP University, Amaravati, Andhra Pradesh
              </p>
            </div>

            <div className="card-glow rounded-lg border border-border-dim bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-dim">
                Event Dates
              </p>
              <p className="mt-1 font-headline text-sm font-semibold text-fg">
                April 19&ndash;21, 2026
              </p>
            </div>

            <div className="card-glow rounded-lg border border-border-dim bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-wider text-dim">
                Email
              </p>
              <a
                href="mailto:recon@vitap.ac.in"
                className="mt-1 block font-headline text-sm font-semibold text-accent transition-colors hover:text-accent-alt"
              >
                recon@vitap.ac.in
              </a>
            </div>

            {/* Map placeholder */}
            <div className="card-glow flex h-48 items-center justify-center rounded-lg border border-border-dim bg-surface">
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-wider text-dim">
                  VIT-AP University
                </p>
                <p className="mt-1 font-body text-xs text-dim">
                  Amaravati, Andhra Pradesh, India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="mt-12 border-t border-border-dim pt-8">
          <p className="mb-4 font-mono text-xs uppercase tracking-wider text-dim">
            Follow RECON
          </p>
          <div className="flex flex-wrap gap-3">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow rounded-lg border border-border-dim bg-surface px-5 py-3 font-headline text-sm font-semibold text-fg transition-colors hover:text-accent"
              >
                {s.label}
              </a>
            ))}
          </div>
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
