"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { gsap } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";
import MobileMenu from "@/components/nav/MobileMenu";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const liveIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reveal LIVE indicator
    if (liveIndicatorRef.current) {
      gsap.fromTo(liveIndicatorRef.current, { opacity: 0 }, { opacity: 1, duration: 1, delay: 1, ease: "power2.out" });
    }

    // Scroll state
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);

    // Active tracking
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll("section[id]").forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const navLinks = [
    { name: "TRACKS", href: "#tracks" },
    { name: "SCHEDULE", href: "#schedule" },
    { name: "STAFF", href: "#staff" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: (target as HTMLElement).offsetTop,
        behavior: "smooth", // Lenis hijacks this automatically if configured properly, but window.scrollTo works
      });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-[100] transition-all duration-400 ease-out px-8 flex justify-between items-center ${
          scrolled ? "bg-black/80 backdrop-blur-md border-b border-[rgba(0,255,65,0.15)] py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="flex items-center gap-2 group cursor-pointer hero-glitch relative" data-text="RECON">
          <span className="font-brand font-bold text-xl tracking-wider text-white">RECON</span>
          <span className="font-brand font-bold text-xl text-terminal-green">2026</span>
        </div>

        <div className="hidden md:flex gap-8 font-mono text-[12px] tracking-widest">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className={`transition-colors py-1 pb-2 tracking-widest leading-none border-b ${
                  isActive ? "text-terminal-green border-terminal-green" : "text-white/40 border-transparent hover:text-terminal-green"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        <div className="flex items-center gap-6">
          <div ref={liveIndicatorRef} className="hidden lg:flex items-center gap-2 opacity-0">
            <div className="w-1.5 h-1.5 bg-terminal-green animate-pulse rounded-full"></div>
            <span className="font-mono text-[9px] tracking-widest text-terminal-green uppercase">LIVE</span>
          </div>
          
          <MagneticButton href="#register-cta" className="hidden md:inline-flex btn-fill bg-terminal-green text-black px-6 py-3 font-mono text-xs font-bold tracking-widest uppercase rounded-none">
            REGISTER →
          </MagneticButton>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-terminal-green cursor-pointer">
            <Menu size={28} />
          </button>
        </div>
      </nav>

      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
