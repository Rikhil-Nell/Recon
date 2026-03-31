import { useState, useEffect, useRef } from "react";

export function useTextScramble(finalText: string) {
  const [display, setDisplay] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const chars = "!<>-_\\\\/[]{}—=+*^?#░▒▓";

  useEffect(() => {
    let animationFrameId: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const length = finalText.length;
          const queue: { from: string; to: string; start: number; end: number; char?: string }[] = [];

          for (let i = 0; i < length; i++) {
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            queue.push({ from: "", to: finalText[i] || "", start, end });
          }

          let frame = 0;
          const update = () => {
            let output = "";
            let complete = 0;

            for (let i = 0; i < length; i++) {
              let { from, to, start, end, char } = queue[i];
              if (frame >= end) {
                complete++;
                output += to;
              } else if (frame >= start) {
                if (!char || Math.random() < 0.28) {
                  char = chars[Math.floor(Math.random() * chars.length)];
                  queue[i].char = char;
                }
                output += char; // we could wrap it in a span, but for raw text React state handles it better
              } else {
                output += from;
              }
            }
            setDisplay(output);
            if (complete !== length) {
              animationFrameId = requestAnimationFrame(update);
              frame++;
            }
          };

          update();
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [finalText]);

  return { display, ref };
}
