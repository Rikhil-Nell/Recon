"use client";

import { useRef, ReactNode } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useCursorStore } from "@/store/cursorStore";

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number;
  external?: boolean;
}

export default function MagneticButton({ children, href, onClick, className = "", strength = 0.3, external }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { setVariant } = useCursorStore();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    gsap.to(ref.current, { x, y, duration: 0.4, ease: "power3.out" });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    // Elastic release exactly as Lusion
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
    setVariant("default");
  };

  const handleMouseEnter = () => {
    setVariant("hover");
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={onClick}
      className={`inline-block w-fit ${className}`}
    >
      {children}
    </div>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link href={href} scroll={false}>{content}</Link>;
  }

  return <button type="button">{content}</button>;
}
