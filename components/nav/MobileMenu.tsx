"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { navLinks } from "@/lib/data";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: Props) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-[500] flex flex-col bg-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-4 sm:px-8">
        <span className="font-brand text-lg tracking-[0.2em] text-fg">RECON</span>
        <button
          onClick={onClose}
          className="text-fg transition-colors hover:text-accent-alt"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8">
        {navLinks.map((link, i) => (
          <Link
            key={link.label}
            href={link.href}
            onClick={onClose}
            className="font-headline text-3xl uppercase tracking-wider text-fg transition-colors hover:text-accent-alt sm:text-4xl"
            style={{ transitionDelay: isOpen ? `${i * 50}ms` : "0ms" }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="border-t border-border-dim p-6 text-center">
        <a
          href="#register"
          onClick={onClose}
          className="btn-primary inline-block rounded px-8 py-3 text-base"
        >
          Register Now
        </a>
        <p className="mt-4 font-mono text-[10px] tracking-widest text-dim">
          RECON 2026 // VIT-AP // APR 19-21
        </p>
      </div>
    </div>
  );
}
