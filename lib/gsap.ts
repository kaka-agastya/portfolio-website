"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, useGSAP);

export const EASE = "expo.out";

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The loader dispatches this once it has slid away, so the hero can play its intro.
const INTRO_EVENT = "kaka:intro-done";

export function markIntroDone() {
  (window as unknown as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event(INTRO_EVENT));
}

export function onIntroDone(cb: () => void) {
  if ((window as unknown as { __introDone?: boolean }).__introDone) {
    cb();
    return () => {};
  }
  window.addEventListener(INTRO_EVENT, cb, { once: true });
  return () => window.removeEventListener(INTRO_EVENT, cb);
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
