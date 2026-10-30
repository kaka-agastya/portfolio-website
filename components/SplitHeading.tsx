"use client";
import { useRef } from "react";
import { gsap, useGSAP, SplitText, onIntroDone, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  as?: "h1" | "h2" | "h3";
  children: React.ReactNode;
  className?: string;
  // Hero headings wait for the loader instead of a scroll trigger.
  intro?: boolean;
  delay?: number;
};

// Heading whose lines slide up from behind a mask.
export default function SplitHeading({ as: Tag = "h2", children, className = "", intro, delay = 0 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) {
        gsap.set(el, { visibility: "visible" });
        return;
      }
      let cleanup = () => {};

      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit(self) {
          const tween = gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.08,
            delay,
            paused: intro,
            scrollTrigger: intro ? undefined : { trigger: el, start: "top 88%", once: true },
          });
          if (intro) {
            cleanup();
            cleanup = onIntroDone(() => tween.play());
          }
          return tween;
        },
      });
      gsap.set(el, { visibility: "visible" });
      return () => cleanup();
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={`${className} ${intro ? "invisible" : ""}`}>
      {children}
    </Tag>
  );
}
