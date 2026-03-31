import { useEffect, useLayoutEffect } from "react";
import { gsap } from "@/lib/gsap";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function useScrollTrigger(callback: () => void, dependencies: any[] = []) {
  useIsomorphicLayoutEffect(() => {
    let ctx = gsap.context(() => {
      callback();
    });
    return () => ctx.revert();
  }, dependencies);
}
