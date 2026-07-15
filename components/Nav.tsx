"use client";
import { useEffect, useRef, useState } from "react";

const sections = [
  { id: "intro", label: "Intro" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState("intro");
  const [visible, setVisible] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastMoveTimeRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const showNav = () => {
      const now = Date.now();
      // Throttle event processing to every 100ms to reduce timer thrashing
      if (now - lastMoveTimeRef.current < 100) return;
      lastMoveTimeRef.current = now;

      setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 1500);
    };

    // Initial show
    showNav();

    window.addEventListener("scroll", showNav, { passive: true });
    window.addEventListener("mousemove", showNav);

    return () => {
      window.removeEventListener("scroll", showNav);
      window.removeEventListener("mousemove", showNav);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className={`hidden xl:flex flex-col gap-3 fixed left-10 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500 focus-within:opacity-100 focus-within:pointer-events-auto ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {sections.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          className="group flex items-center gap-3"
          aria-label={s.label}
          aria-current={active === s.id ? "true" : undefined}
        >
          <span
            className={`h-px transition-all duration-300 ${
              active === s.id ? "w-8 bg-ink" : "w-4 bg-ink-mute group-hover:w-6 group-hover:bg-ink-soft"
            }`}
          />
          <span
            className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-300 ${
              active === s.id ? "text-ink" : "text-ink-mute group-hover:text-ink-soft"
            }`}
          >
            {s.label}
          </span>
        </a>
      ))}
    </nav>
  );
}