"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const firstLoad = useRef(true);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return; // Skip animation on initial load — page renders immediately
    }

    // Only animate on route changes (not first load)
    if (overlayRef.current) {
      const overlay = overlayRef.current;
      gsap.to(overlay, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.45,
        ease: "power4.in",
        onComplete: () => {
          gsap.to(overlay, {
            scaleY: 0,
            transformOrigin: "top",
            duration: 0.5,
            ease: "power4.out",
            delay: 0.1,
          });
        },
      });
    }
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black z-[9000] pointer-events-none origin-top"
      style={{ transform: "scaleY(0)" }}
    ></div>
  );
}
