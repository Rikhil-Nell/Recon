import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

export function usePortalReveal() {
    const rootRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!rootRef.current) return;
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.matchMedia('(max-width: 1023px)').matches;
        if (prefersReduced) return;

        const ctx = gsap.context(() => {
            if (!isMobile) {
                gsap.fromTo(
                    rootRef.current,
                    { opacity: 0, y: 8 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.25,
                        ease: 'power2.out',
                    },
                );
            }

            gsap.fromTo(
                '[data-portal-header]',
                { y: 16, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                },
            );

            gsap.fromTo(
                '[data-portal-card]',
                { y: 20, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power3.out',
                    stagger: 0.06,
                    delay: 0.08,
                },
            );
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return rootRef;
}
