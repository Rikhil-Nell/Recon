"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const fontSize = 14;
    let columns = Math.floor(width / fontSize);

    // Initial drops scattered across the screen
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = (Math.random() * height) / fontSize; 
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const newColumns = Math.floor(width / fontSize);
      if (newColumns > columns) {
        for (let x = columns; x < newColumns; x++) {
          drops[x] = Math.random() * -100;
        }
      }
      columns = newColumns;
    };
    
    window.addEventListener('resize', handleResize);

    const draw = () => {
      // Fade out effect creates the tails
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const dx = x - mouseX;
        const dy = y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let renderX = x;
        let renderY = y;
        
        if (dist < 120) {
          // Repel character away from cursor
          const force = (120 - dist) / 120;
          renderX += dx * force * 0.8;
          renderY += dy * force * 0.8;
          ctx.fillStyle = "#00cfff"; // Cyan glitch 
          ctx.shadowBlur = 8;
          ctx.shadowColor = "#00cfff";
        } else {
          // Standard falling char
          const isHead = Math.random() > 0.95;
          ctx.fillStyle = isHead ? "#ffffff" : "#00ff41";
          ctx.shadowBlur = isHead ? 5 : 0;
          ctx.shadowColor = isHead ? "#ffffff" : "#00ff41";
        }

        ctx.fillText(text, renderX, renderY);
        ctx.shadowBlur = 0;

        // Reset drop
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30fps 

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-1 pointer-events-none opacity-40 mix-blend-screen"
      style={{ transform: "translateZ(0)", willChange: "transform" }}
    />
  );
}
