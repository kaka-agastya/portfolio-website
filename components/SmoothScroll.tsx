"use client";
import { useEffect } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Height of the sticky nav, so anchored sections don't hide beneath it.
const NAV_OFFSET = 48;

// GSAP smooth scroll — CSS scroll-behavior is unreliable on iOS Safari.
// We intercept every in-page anchor click and tween the window instead.
export default function SmoothScroll() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href?.startsWith("#")) return;

      const id = href.slice(1);
      const el = id ? document.getElementById(id) : document.body;
      if (!el) return;

      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: el, offsetY: id ? NAV_OFFSET : 0, autoKill: true },
        duration: prefersReducedMotion() ? 0 : 1.1,
        ease: "expo.inOut",
      });

      // Update URL hash without jumping
      history.pushState(null, "", href);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return null;
}
