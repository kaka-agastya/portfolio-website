"use client";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

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
  const { theme, toggle } = useTheme();

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
    <>
      {/* Section navigation — left side */}
      <nav
        aria-label="Section navigation"
        className={`hidden xl:flex flex-col gap-3 fixed left-10 top-1/2 -translate-y-1/2 z-40 transition-opacity duration-500 focus-within:opacity-100 focus-within:pointer-events-auto ${visible ? "opacity-100" : "opacity-0 pointer-events-none"
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
              className={`h-px transition-all duration-500 ${active === s.id ? "w-8 bg-ink" : "w-4 bg-ink-mute group-hover:w-6 group-hover:bg-ink-soft"
                }`}
            />
            <span
              className={`font-mono text-[11px] tracking-wide uppercase transition-colors duration-500 ${active === s.id ? "text-ink" : "text-ink-mute group-hover:text-ink-soft"
                }`}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>

      {/* Dark mode toggle — bottom right */}
      <button
        id="theme-toggle"
        onClick={toggle}
        aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center
         bg-[var(--color-paper)] text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]
         hover:shadow-md transition-all duration-500 ease-in-out
         ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <span
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform: theme === "dark" ? "rotate(0deg) scale(1)" : "rotate(90deg) scale(0.5)",
          }}
        >
          <Sun size={18} strokeWidth={1.5} />
        </span>
        <span
          className="absolute transition-all duration-500 ease-in-out"
          style={{
            opacity: theme === "light" ? 1 : 0,
            transform: theme === "light" ? "rotate(0deg) scale(1)" : "-rotate(90deg) scale(0.5)",
          }}
        >
          <Moon size={18} strokeWidth={1.5} />
        </span>
      </button>
    </>
  );
}
