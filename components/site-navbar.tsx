"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, UserRoundPlus } from "lucide-react";
import { navItems } from "@/lib/site-data";

export function SiteNavbar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex max-w-6xl items-center gap-2 overflow-x-auto rounded-full border border-white/12 bg-black/45 px-3 py-2 shadow-[0_0_40px_rgba(139,92,246,0.12)] backdrop-blur-xl">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-white transition hover:border-[var(--purple)] hover:text-[var(--purple-light)]"
        >
          <Shield className="h-4 w-4" />
          Recon
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[var(--gray-400)] transition hover:bg-white/[0.06] hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href="/login"
          className="ml-auto flex items-center gap-2 rounded-full border border-[var(--purple)]/40 bg-[var(--purple)]/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[var(--white)] transition hover:border-[var(--purple)] hover:bg-[var(--purple)]/20"
        >
          <UserRoundPlus className="h-4 w-4" />
          Login
        </Link>
      </nav>
    </motion.div>
  );
}
