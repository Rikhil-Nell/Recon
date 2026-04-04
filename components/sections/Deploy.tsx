"use client";

import Link from "next/link";
import TopoBg from "@/components/ui/TopoBg";
import { useInView } from "@/hooks/useInView";
import { miniFaqData, sponsorPlaceholders, navLinks, socialLinks } from "@/lib/data";

export default function Deploy() {
  const ref = useInView();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id="deploy"
      className="reveal relative"
    >
      {/* CTA Block */}
      <div className="relative flex min-h-[50svh] flex-col items-center justify-center px-4 py-20 text-center sm:px-8">
        <TopoBg />

        <div className="relative z-10">
          <h2
            className="text-shimmer font-headline font-bold"
            style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
          >
            Secure Your Spot
          </h2>
          <p className="mt-3 font-body text-sm text-dim">
            600 seats. 3 days. One mission.
          </p>
          <a
            href="#register"
            id="register"
            className="btn-primary mt-6 inline-block rounded px-12 py-4 text-base"
          >
            Register Now
          </a>
        </div>
      </div>

      {/* Mini FAQ */}
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          {miniFaqData.map((faq) => (
            <div key={faq.question} className="border-t-2 border-accent pt-4">
              <h3 className="font-headline text-sm font-bold text-fg">
                {faq.question}
              </h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-dim">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsor Strip */}
      <div className="border-t border-border-dim px-4 py-12 sm:px-8">
        <p className="mb-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-dim">
          sponsors & partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {sponsorPlaceholders.map((name) => (
            <div
              key={name}
              className="flex h-10 items-center font-mono text-xs tracking-wider text-dim opacity-50 transition-opacity hover:opacity-100"
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border-dim px-4 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-brand text-lg tracking-[0.2em] text-fg">RECON</p>
            <p className="mt-2 font-body text-xs text-dim">
              OSC + Null Chapter
            </p>
            <p className="font-body text-xs text-dim">VIT-AP University</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="font-body text-sm text-dim transition-colors hover:text-fg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact + socials */}
          <div>
            <p className="font-headline text-sm font-semibold text-fg">
              Contact
            </p>
            <p className="mt-2 font-body text-sm text-dim">
              recon@vitap.ac.in
            </p>
            <div className="mt-4 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  className="font-mono text-xs text-dim transition-colors hover:text-accent-alt"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-6xl border-t border-border-dim pt-4">
          <p className="font-mono text-[10px] text-dim">
            &copy; 2026 RECON. All rights reserved.
          </p>
        </div>
      </footer>
    </section>
  );
}
