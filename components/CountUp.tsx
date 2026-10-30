"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

// Counts from 0 to `value` once it scrolls into view.
export default function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const state = { n: 0 };
      el.textContent = format(0);
      gsap.to(state, {
        n: value,
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = format(state.n);
        },
      });
    },
    { scope: ref }
  );

  return <span ref={ref}>{format(value)}</span>;
}
