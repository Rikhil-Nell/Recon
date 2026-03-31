"use client";

import { useTextScramble } from "@/hooks/useTextScramble";

export default function DiagnosticLabel({ text }: { text: string }) {
  const { display, ref } = useTextScramble(text);
  
  return (
    <div ref={ref} className="font-mono text-[10px] text-terminal-green tracking-widest uppercase opacity-70">
      {display}
    </div>
  );
}
