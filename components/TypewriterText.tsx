"use client";

import { useEffect, useRef } from "react";

// ⚡ Bolt: Extracted this interactive piece to a client component to avoid making the entire Hero section a client component
export function TypewriterText({ text, speed = 40 }: { text: string, speed?: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let i = 0;

    // Initial clear
    if (spanRef.current) {
      spanRef.current.textContent = '""';
    }

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
