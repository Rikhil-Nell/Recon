"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { name: "TRACKS", href: "#tracks" },
  { name: "SCHEDULE", href: "#schedule" },
  { name: "STAFF", href: "#staff" },
  { name: "FAQ", href: "#faq" },
];

export default function MobileMenu({ isOpen, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.6,
        ease: "power4.inOut",
        display: "flex",
      });

      gsap.fromTo(
        linksRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, delay: 0.3, duration: 0.5, ease: "power3.out" }
      );
    } else {
      gsap.to(overlayRef.current, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.5,
        ease: "power4.inOut",
        onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[500] flex-col items-center justify-center hidden"
      style={{ clipPath: "inset(0 0 100% 0)" }}
    >
      <button onClick={onClose} className="absolute top-8 right-8 text-terminal-green hover:text-white transition-colors">
        <X size={32} />
      </button>

      <div className="flex flex-col gap-12 text-center w-full px-8">
        {links.map((link, i) => (
          <Link
            key={i}
            href={link.href}
            onClick={onClose}
            ref={(el) => {
              if (el) linksRef.current[i] = el;
            }}
            className="group relative flex flex-col items-center justify-center font-brand text-5xl md:text-6xl uppercase tracking-widest text-white hover:text-terminal-green transition-all duration-300"
          >
            <span className="font-mono text-[10px] absolute left-4 top-1 text-white/30 group-hover:text-terminal-green/50">
              0{i + 1}/04
            </span>
            <span className="group-hover:translate-x-2 transition-transform duration-300">{link.name}</span>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex justify-center px-8">
        <a
          href="https://luma.com/v933kdr1"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onClose}
          className="btn-fill px-10 py-5 font-mono text-sm tracking-widest uppercase font-bold text-center rounded-lg text-zinc-100 inline-block"
        >
          REGISTER NOW →
        </a>
      </div>

      <div className="absolute bottom-8 w-full border-t border-white/10 pt-6 px-8 flex justify-center text-center">
        <span className="font-mono text-[10px] text-white/40 tracking-widest">RECON 2026 // VIT-AP // APR 19-21</span>
      </div>
    </div>
  );
}
