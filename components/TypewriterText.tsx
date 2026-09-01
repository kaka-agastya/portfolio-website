"use client";

import { useEffect, useRef } from "react";

// ⚡ Bolt: Extracted this interactive piece to a client component to avoid making the entire Hero section a client component
// ⚡ Bolt: Replaced useState with useRef and direct DOM mutation to prevent excessive component tree re-renders
export function TypewriterText({ text, speed = 40 }: { text: string, speed?: number }) {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      if (textRef.current) {
        textRef.current.textContent = `"${text.slice(0, i + 1)}"`;
      }
      i++;
      if (i === text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return <span ref={textRef} className="text-ink-soft">&quot;&quot;</span>;
}
