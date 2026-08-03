"use client";

import { useEffect, useRef } from "react";

// ⚡ Bolt: Extracted this interactive piece to a client component to avoid making the entire Hero section a client component
// ⚡ Bolt: Optimized to use direct DOM manipulation via useRef to avoid React re-renders during the animation
export function TypewriterText({ text, speed = 40 }: { text: string, speed?: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!spanRef.current) return;
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
