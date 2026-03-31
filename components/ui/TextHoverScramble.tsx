"use client";

import { useState, useRef, useEffect } from "react";

const chars = "!<>-_\\\\/[]{}—=+*^?#░▒▓";

export default function TextHoverScramble({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const isAnimating = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    let iterations = 0;
    const speed = Math.max(text.length / 15, 2); // Faster for long texts, min speed 2
    
    intervalRef.current = setInterval(() => {
      setDisplay(text.split("").map((char, index) => {
        if (char === " " || char === "\n") return char;
        if (index < iterations) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(""));
      
      if (iterations >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isAnimating.current = false;
        setDisplay(text);
      }
      
      iterations += speed; 
    }, 25);
  };

  return (
    <span 
      onMouseEnter={scramble} 
      className={`inline-block transition-colors duration-300 ${className}`}
    >
      {display}
    </span>
  );
}
