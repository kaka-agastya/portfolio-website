"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// Height of the sticky nav, so anchored sections don't hide beneath it.
const NAV_OFFSET = 48;

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "light", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // On mount: read saved preference or system preference
  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = saved ?? (prefersDark ? "dark" : "light");
    setTheme(initial);
    document.documentElement.classList.toggle("dark", initial === "dark");
  }, []);

  // GSAP smooth scroll — CSS scroll-behavior is unreliable on iOS Safari.
  // We intercept every in-page anchor click and tween the window instead.
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

  const toggle = () => {
    setTheme((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
