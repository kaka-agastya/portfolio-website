"use client";
import { useEffect, useRef, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import PixelButton from "./PixelButton";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/data/cv";

const sections = [
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
];

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const menu = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    ["intro", ...sections.map((s) => s.id), "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Mobile menu: panel drops down, links rise in, burger lines cross.
  useGSAP(() => {
    tl.current = gsap
      .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .set(menu.current, { display: "flex" })
      .fromTo(menu.current, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.7 })
      .from("[data-menu-link]", { yPercent: 110, duration: 0.6, ease: "expo.out", stagger: 0.05 }, "-=0.3")
      .to("[data-burger-top]", { y: 5.5, rotate: 45, duration: 0.4 }, 0)
      .to("[data-burger-bottom]", { y: -5.5, rotate: -45, duration: 0.4 }, 0);
  });

  useEffect(() => {
    const t = tl.current;
    if (!t) return;
    if (prefersReducedMotion()) t.progress(open ? 1 : 0).pause();
    else if (open) t.timeScale(1).play();
    else t.timeScale(1.6).reverse();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-guide bg-bg text-fg">
      <div className="flex h-16 items-stretch justify-between lg:h-12">
        <a href="#" className="flex items-center gap-2 px-5 sm:px-6 lg:border-r lg:border-guide lg:px-4" aria-label="Back to top">
          <span className="grid grid-cols-2 gap-[2px]" aria-hidden="true">
            {[1, 0, 1, 1].map((on, i) => (
              <span key={i} className={`size-[5px] ${on ? "bg-current" : ""}`} />
            ))}
          </span>
          <span className="font-display text-xl font-medium tracking-tight lg:text-lg">kaka.</span>
        </a>

        <nav aria-label="Section navigation" className="hidden flex-1 items-stretch text-[13px] lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className="group flex items-center gap-2 border-r border-guide px-4"
            >
              <span className={`size-1.5 bg-current transition-opacity duration-300 ${active === s.id ? "opacity-100" : "opacity-0"}`} aria-hidden="true" />
              <span className="link-line py-1">{s.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-stretch">
          <button
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="flex w-12 items-center justify-center border-l border-guide transition-colors hover:bg-bg-soft"
          >
            {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden w-12 items-center justify-center border-l border-guide transition-colors hover:bg-bg-soft sm:flex"
          >
            <GithubIcon />
            <span className="sr-only">GitHub (opens in a new tab)</span>
          </a>
          <PixelButton href="#contact" className="!hidden !h-full border-y-0 border-r-0 lg:!inline-flex">
            Get in touch
          </PixelButton>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex w-16 items-center justify-center border-l border-guide lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span data-burger-top className="absolute inset-x-0 top-0 h-px bg-current" />
              <span data-burger-bottom className="absolute inset-x-0 bottom-0 h-px bg-current" />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={menu}
        id="mobile-menu"
        className="fixed inset-x-0 top-16 bottom-0 hidden flex-col justify-between border-t border-guide bg-bg lg:hidden"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col">
          {[...sections, { id: "contact", label: "Contact" }].map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 overflow-hidden border-b border-guide px-5 py-5 sm:px-6"
            >
              <span data-menu-link className="flex items-baseline gap-4">
                <span className="font-mono text-xs opacity-70">0{i + 1}</span>
                <span className="font-display text-3xl font-medium tracking-tight">{s.label}</span>
              </span>
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 p-5 sm:p-6">
          <PixelButton href={`mailto:${profile.email}`}>Get in touch</PixelButton>
          <PixelButton href={profile.github} variant="secondary" external>
            <GithubIcon size={16} /> GitHub
          </PixelButton>
        </div>
      </div>
    </header>
  );
}

export { GithubIcon };
