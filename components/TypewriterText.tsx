"use client";

import { useEffect, useRef } from "react";

// ⚡ Bolt: Extracted this interactive piece to a client component to avoid making the entire Hero section a client component
// ⚡ Bolt: Using direct DOM mutation with useRef to avoid excessive re-renders during the high-frequency typing animation.
export function TypewriterText({ text }: { text: string }) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let i = 0;
    const speed = 40;
    const id = setInterval(() => {
      if (spanRef.current) {
        spanRef.current.textContent = '"' + text.slice(0, i + 1) + '"';
      }
      i++;
      if (i === text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text]);

  return <span ref={spanRef} className="text-ink-soft">&quot;&quot;</span>;
}
