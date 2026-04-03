"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import MobileMenu from "@/components/nav/MobileMenu";
import { navLinks } from "@/lib/data";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-[100] flex h-16 w-full items-center justify-between px-4 transition-all duration-300 sm:px-8 lg:px-12 ${
          scrolled
            ? "border-b border-border-dim bg-background/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        {/* Wordmark */}
        <Link href="/" className="font-brand text-lg tracking-[0.2em] text-fg">
          RECON
        </Link>

        {/* Desktop nav links */}
        <div className="hidden gap-6 font-headline text-sm uppercase tracking-wider lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-dim transition-colors hover:text-accent-alt"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <a
            href="#register"
            className="btn-primary hidden rounded px-5 py-2 text-sm lg:inline-flex"
          >
            Register
          </a>

          {/* Tablet: show register + hamburger */}
          <a
            href="#register"
            className="btn-primary hidden rounded px-4 py-2 text-sm md:inline-flex lg:hidden"
          >
            Register
          </a>

          <button
            onClick={() => setMenuOpen(true)}
            className="text-fg transition-colors hover:text-accent-alt lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
