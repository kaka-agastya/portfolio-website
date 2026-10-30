"use client";
import { useRef } from "react";
import { gsap, useGSAP, onIntroDone, prefersReducedMotion } from "@/lib/gsap";

// Fades children up as they scroll into view. With `stagger`, each direct child animates in turn.
// With `intro`, it plays once the loader has finished instead of on scroll.
export default function Reveal({
  children,
  delay = 0,
  stagger,
  intro,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  stagger?: number;
  intro?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const tween = gsap.from(stagger ? el.children : el, {
        y: 24,
        autoAlpha: 0,
        duration: 0.9,
        ease: "expo.out",
        delay,
        stagger,
        paused: intro,
        scrollTrigger: intro ? undefined : { trigger: el, start: "top 88%", once: true },
      });
      if (intro) return onIntroDone(() => tween.play());
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
