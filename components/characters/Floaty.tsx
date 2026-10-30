"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Wraps a sticker so it pops in on scroll, then bobs and sways forever.
export default function Floaty({
  children,
  className = "",
  rotate = 0,
  amp = 10,
  speed = 1,
}: {
  children: React.ReactNode;
  className?: string;
  rotate?: number;
  amp?: number;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      gsap.set(el, { rotate });
      if (prefersReducedMotion()) return;

      gsap.from(el, {
        scale: 0,
        rotate: rotate - 25,
        duration: 0.9,
        ease: "back.out(2.2)",
        scrollTrigger: { trigger: el, start: "top 95%", once: true },
      });
      gsap.to(el, {
        y: -amp,
        rotate: rotate + amp / 2,
        duration: 2.2 / speed,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: Math.random(),
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none ${className}`}>
      {children}
    </div>
  );
}
