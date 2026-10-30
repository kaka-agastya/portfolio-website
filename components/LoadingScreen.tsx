"use client";
import { useRef, useState } from "react";
import { gsap, useGSAP, markIntroDone, prefersReducedMotion } from "@/lib/gsap";
import { GLYPH_COLS, GLYPH_ROWS, glyphCells } from "@/lib/pixels";

const WORD = ["K", "A", "K", "A"];
const CELL = 1; // svg units; each glyph is a 4×5 viewBox

function Glyph({ letter }: { letter: string }) {
  const cells = glyphCells(letter).filter((c) => c.on);
  return (
    <span className="relative block h-[60px] w-[48px] sm:h-[80px] sm:w-[64px]">
      {/* Outline slots */}
      <svg viewBox={`0 0 ${GLYPH_COLS} ${GLYPH_ROWS}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        {cells.map((c) => (
          <rect
            key={`o${c.x}${c.y}`}
            x={c.x * CELL + 0.06}
            y={c.y * CELL + 0.06}
            width={0.88}
            height={0.88}
            fill="none"
            stroke="currentColor"
            strokeWidth={0.045}
            opacity={0.5}
          />
        ))}
      </svg>
      {/* Pieces that drop into the slots */}
      <svg viewBox={`0 0 ${GLYPH_COLS} ${GLYPH_ROWS}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        {cells.map((c) => (
          <rect
            key={`p${c.x}${c.y}`}
            data-piece
            x={c.x * CELL + 0.06}
            y={c.y * CELL + 0.06}
            width={0.88}
            height={0.88}
            className="fill-sun"
            stroke="#16161d"
            strokeWidth={0.06}
          />
        ))}
      </svg>
    </span>
  );
}

export default function LoadingScreen() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      document.documentElement.style.overflow = "hidden";

      const finish = () => {
        document.documentElement.style.overflow = "";
        setDone(true);
        markIntroDone();
      };

      if (prefersReducedMotion()) {
        gsap.to(el, { autoAlpha: 0, duration: 0.3, delay: 0.2, onComplete: finish });
        return;
      }

      const pieces = gsap.utils.toArray<SVGRectElement>("[data-piece]", el);
      const tl = gsap.timeline({ onComplete: finish });

      tl.from(pieces, {
        y: -6,
        opacity: 0,
        duration: 0.55,
        ease: "power3.in",
        stagger: { amount: 0.8, from: "random" },
      })
        .to(pieces, { y: 0.12, duration: 0.08, ease: "power1.out", yoyo: true, repeat: 1 }, ">-0.05")
        .from("[data-loader-name]", { yPercent: 110, duration: 0.7, ease: "expo.out" }, "-=0.35")
        .from("[data-loader-meta]", { yPercent: 110, duration: 0.7, ease: "expo.out" }, "<0.08")
        .to("[data-loader-word]", { scale: 0.92, opacity: 0, duration: 0.5, ease: "power3.in" }, "+=0.35")
        .to(el, { yPercent: -100, duration: 0.9, ease: "expo.inOut" }, "-=0.2");
    },
    { scope: root }
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="loader-failsafe invert-block fixed inset-0 z-[1000] grid place-content-center will-change-transform"
    >
      <div data-loader-word className="flex items-end gap-4 sm:gap-6">
        {WORD.map((l, i) => (
          <Glyph key={i} letter={l} />
        ))}
      </div>

      <div className="absolute inset-x-5 bottom-6 flex items-end justify-between gap-6 sm:inset-x-10 sm:bottom-8 lg:inset-x-16">
        <span className="block overflow-hidden">
          <span data-loader-meta className="block font-mono text-xs uppercase tracking-wider opacity-70">
            Portfolio — {new Date().getFullYear()}
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-loader-name className="block font-display text-3xl font-medium tracking-tight sm:text-5xl">
            kaka.
          </span>
        </span>
      </div>
    </div>
  );
}
