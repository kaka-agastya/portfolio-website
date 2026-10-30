"use client";
import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { profile } from "@/data/cv";

const sections = [
  { id: "experience", label: "Experience", color: "bg-sun", hover: "hover:bg-sun" },
  { id: "projects", label: "Projects", color: "bg-rose", hover: "hover:bg-rose" },
  { id: "education", label: "Education", color: "bg-mint", hover: "hover:bg-mint" },
  { id: "skills", label: "Skills", color: "bg-sun", hover: "hover:bg-sun" },
];

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Logo() {
  return (
    <span className="grid size-8 grid-cols-2 gap-[3px] rounded-lg border-2 border-line bg-sun p-[5px]" aria-hidden="true">
      {[1, 0, 1, 1].map((on, i) => (
        <span key={i} className={`rounded-[1px] ${on ? "bg-line" : ""}`} />
      ))}
    </span>
  );
}

export default function Nav() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
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

  // Mobile menu: panel drops in, links bounce up one by one, burger lines cross.
  useGSAP(() => {
    tl.current = gsap
      .timeline({ paused: true, defaults: { ease: "expo.inOut" } })
      .set(menu.current, { display: "flex" })
      .fromTo(menu.current, { clipPath: "inset(0 0 100% 0 round 16px)" }, { clipPath: "inset(0 0 0% 0 round 16px)", duration: 0.6 })
      .from("[data-menu-link]", { y: 40, rotate: -4, opacity: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.06 }, "-=0.25")
      .to("[data-burger-top]", { y: 5, rotate: 45, duration: 0.4 }, 0)
      .to("[data-burger-bottom]", { y: -5, rotate: -45, duration: 0.4 }, 0);
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
    <header className="sticky top-0 z-50 bg-linear-to-b from-bg from-55% to-transparent px-3 pt-3 pb-3 sm:px-5">
      <div className="flex h-16 items-center justify-between gap-4 rounded-2xl border-2 border-line bg-paper px-3 shadow-brutal-sm sm:px-4">
        <a href="#" className="flex items-center gap-2.5" aria-label="Back to top">
          <Logo />
          <span className="font-display text-xl font-semibold tracking-tight">kaka.</span>
        </a>

        <nav aria-label="Section navigation" className="hidden items-center gap-1 lg:flex">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              aria-current={active === s.id ? "true" : undefined}
              className={`rounded-full border-2 px-4 py-1.5 text-sm font-medium transition-colors ${
                active === s.id ? `border-line ${s.color}` : `border-transparent hover:border-line ${s.hover}`
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-xl border-2 border-line bg-paper transition-[transform,box-shadow,background-color] duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-mint hover:shadow-brutal-sm"
          >
            <GithubIcon />
            <span className="sr-only">GitHub (opens in a new tab)</span>
          </a>
          <Button href="#contact" className="hidden! h-11! lg:inline-flex!">
            Get in touch
          </Button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center rounded-xl border-2 border-line bg-sun lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span data-burger-top className="absolute inset-x-0 top-0 h-0.5 rounded bg-line" />
              <span data-burger-bottom className="absolute inset-x-0 bottom-0 h-0.5 rounded bg-line" />
            </span>
          </button>
        </div>
      </div>

      <div
        ref={menu}
        id="mobile-menu"
        className="fixed inset-x-3 top-[5.5rem] bottom-3 hidden flex-col justify-between gap-6 rounded-2xl border-2 border-line bg-paper p-4 shadow-brutal sm:inset-x-5 lg:hidden"
      >
        <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
          {[...sections, { id: "contact", label: "Contact", color: "bg-mint" }].map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              data-menu-link
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl border-2 border-line px-5 py-4 ${s.color}`}
            >
              <span className="font-display text-3xl font-semibold tracking-tight">{s.label}</span>
              <span className="font-mono text-xs">0{i + 1}</span>
            </a>
          ))}
        </nav>
        <Button href={`mailto:${profile.email}`} className="w-full">
          Get in touch
        </Button>
      </div>
    </header>
  );
}

export { GithubIcon };
