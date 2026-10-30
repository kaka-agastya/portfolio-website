"use client";
import { useRef } from "react";
import { gsap, useGSAP, onIntroDone, prefersReducedMotion } from "@/lib/gsap";
import { GLYPH_COLS, GLYPH_ROWS, glyphCells } from "@/lib/pixels";

const WORD = ["K", "A", "K", "A"];
const GAP = 1; // empty columns between letters
const COLS = WORD.length * GLYPH_COLS + (WORD.length - 1) * GAP;

// Large pixel "KAKA" that assembles after the loader, then reacts to the pointer.
export default function HeroArt() {
  const ref = useRef<HTMLDivElement>(null);

  const cells = WORD.flatMap((letter, li) =>
    glyphCells(letter).map((c) => ({ ...c, x: c.x + li * (GLYPH_COLS + GAP) }))
  );

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const on = gsap.utils.toArray<HTMLElement>("[data-on]", el);
      const off = gsap.utils.toArray<HTMLElement>("[data-off]", el);
      if (prefersReducedMotion()) return;

      gsap.set(on, { scale: 0 });
      const tl = gsap.timeline({ paused: true });
      tl.to(on, { scale: 1, duration: 0.5, ease: "back.out(2)", stagger: { each: 0.012, from: "random" } }, 0.2);

      // Idle shimmer: a few empty cells blink now and then.
      const blink = () => {
        const pick = gsap.utils.shuffle(off.slice()).slice(0, 4);
        gsap.fromTo(pick, { opacity: 0.35 }, { opacity: 0, duration: 1.2, ease: "power2.out", stagger: 0.1 });
      };
      const loop = gsap.delayedCall(1.6, function repeat() {
        blink();
        loop.restart(true);
      }).pause();

      const stop = onIntroDone(() => {
        tl.play();
        loop.restart(true);
      });

      // Pointer: lit cells near the cursor lift slightly.
      const quick = on.map((c) => gsap.quickTo(c, "scale", { duration: 0.4, ease: "power3.out" }));
      const move = (e: PointerEvent) => {
        on.forEach((c, i) => {
          const r = c.getBoundingClientRect();
          const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
          quick[i](d < 90 ? 0.6 + (d / 90) * 0.4 : 1);
        });
      };
      const leave = () => quick.forEach((q) => q(1));
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        stop();
        loop.kill();
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref }
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="grid w-full gap-[3px] sm:gap-1"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${GLYPH_ROWS}, auto)` }}
    >
      {cells.map((c) => (
        <span
          key={`${c.x}-${c.y}`}
          {...(c.on ? { "data-on": "" } : { "data-off": "" })}
          className={`aspect-square ${c.on ? "bg-current" : "bg-current opacity-0"}`}
          style={{ gridColumn: c.x + 1, gridRow: c.y + 1 }}
        />
      ))}
    </div>
  );
}
