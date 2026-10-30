"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Endless horizontal ticker; slows down while hovered.
export default function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tween = gsap.to("[data-track]", { xPercent: -50, duration: items.length * 2.4, ease: "none", repeat: -1 });
      const el = ref.current!;
      const slow = () => gsap.to(tween, { timeScale: 0.25, duration: 0.6 });
      const fast = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
      el.addEventListener("mouseenter", slow);
      el.addEventListener("mouseleave", fast);
      return () => {
        el.removeEventListener("mouseenter", slow);
        el.removeEventListener("mouseleave", fast);
      };
    },
    { scope: ref }
  );

  const row = (hidden: boolean) =>
    items.map((item, i) => (
      <span key={`${hidden}-${i}`} aria-hidden={hidden || undefined} className="flex items-center gap-8 pr-8">
        <span>{item}</span>
        <span className="text-sun" aria-hidden="true">✦</span>
      </span>
    ));

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div data-track className="flex w-max whitespace-nowrap">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
