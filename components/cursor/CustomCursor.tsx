"use client";

import { useEffect, useRef } from "react";
import { useCursorStore } from "@/store/cursorStore";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const mousePosition = useRef({ x: 0, y: 0 });
  const ringPosition = useRef({ x: 0, y: 0 });

  const { variant } = useCursorStore();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", updateMousePosition);

    let animationFrameId: number;

    const renderLoop = () => {
      const { x: mx, y: my } = mousePosition.current;
      const { x: rx, y: ry } = ringPosition.current;

      ringPosition.current.x += (mx - rx) * 0.12;
      ringPosition.current.y += (my - ry) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ringPosition.current.x}px`;
        ringRef.current.style.top = `${ringPosition.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const getVariantClasses = () => {
    switch (variant) {
      case "hover":
        return "w-[60px] h-[60px] border-[rgba(255,255,255,0.9)]";
      case "click":
        return "w-[28px] h-[28px] border-[rgba(255,255,255,1)]";
      case "text":
        return "w-[80px] h-[3px] border-[rgba(255,255,255,0.5)] rounded-none";
      default:
        return "w-[36px] h-[36px] border-[rgba(255,255,255,0.5)]";
    }
  };

  return (
    <>
      <div
        ref={dotRef}
        className="fixed w-[8px] h-[8px] rounded-full bg-white z-[9999] pointer-events-none"
        style={{ transform: "translate(-50%, -50%)", transition: "width 0.15s, height 0.15s", mixBlendMode: "difference" }}
      ></div>
      <div
        ref={ringRef}
        className={`fixed rounded-full border z-[9998] pointer-events-none transition-[width,height,border-color] duration-300 ease-out ${getVariantClasses()}`}
        style={{ transform: "translate(-50%, -50%) translateZ(0)", willChange: "left, top, width, height" }}
      ></div>
    </>
  );
}
