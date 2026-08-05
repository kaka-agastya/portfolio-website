"use client";

import { useEffect, useRef } from "react";

// ⚡ Bolt: Extracted this interactive piece to a client component to avoid making the entire Hero section a client component
export function TypewriterText({ text, speed = 40 }: { text: string; speed?: number }) {
  // ⚡ Bolt: Using useRef for direct DOM mutation to prevent excessive component tree re-renders
  // on every tick of the 40ms interval used for the typing animation.
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (spanRef.current) {
        spanRef.current.textContent = `"${text.slice(0, i + 1)}"`;
      }
      i++;
      if (i === text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <span ref={spanRef} className="text-ink-soft">&quot;&quot;</span>;
}
