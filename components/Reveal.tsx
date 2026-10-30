"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Fades children up as they scroll into view. With `stagger`, each direct child animates in turn.
export default function Reveal({
  children,
  delay = 0,
  stagger,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      gsap.from(stagger ? el.children : el, {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        delay,
        stagger,
        scrollTrigger: { trigger: el, start: "top 88%", once: true },
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
