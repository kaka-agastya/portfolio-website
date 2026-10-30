"use client";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const PIXEL = 8;

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
};

// A button whose hover state fills in with 8px pixels, in random order.
export default function PixelButton({ href, children, variant = "primary", external, className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  const { contextSafe } = useGSAP({ scope: ref });

  const ensurePixels = () => {
    const el = ref.current;
    const box = fill.current;
    if (!el || !box) return [];
    const cols = Math.ceil(el.offsetWidth / PIXEL);
    const rows = Math.ceil(el.offsetHeight / PIXEL);
    if (box.childElementCount !== cols * rows) {
      box.style.gridTemplateColumns = `repeat(${cols}, ${PIXEL}px)`;
      box.replaceChildren(
        ...Array.from({ length: cols * rows }, () => {
          const s = document.createElement("span");
          s.style.cssText = `width:${PIXEL}px;height:${PIXEL}px;opacity:0;background:currentColor`;
          return s;
        })
      );
    }
    return Array.from(box.children);
  };

  const animate = contextSafe((on: boolean) => {
    const el = ref.current;
    if (!el) return;
    const pixels = ensurePixels();
    gsap.killTweensOf(pixels);
    if (prefersReducedMotion()) {
      gsap.set(pixels, { opacity: on ? 1 : 0 });
      el.toggleAttribute("data-filled", on);
      return;
    }
    gsap.to(pixels, {
      opacity: on ? 1 : 0,
      duration: 0.01,
      stagger: { amount: 0.22, from: "random" },
    });
    gsap.delayedCall(0.11, () => el.toggleAttribute("data-filled", on));
  });

  const base =
    "group relative inline-flex h-12 items-center justify-center overflow-hidden border px-5 text-sm leading-none whitespace-nowrap transition-colors duration-150";
  const styles =
    variant === "primary"
      ? "border-current bg-fg text-bg [&>[data-fill]]:text-bg [&[data-filled]_[data-label]]:text-fg"
      : "border-current bg-transparent text-fg [&>[data-fill]]:text-fg [&[data-filled]_[data-label]]:text-bg";

  return (
    <a
      ref={ref}
      href={href}
      onMouseEnter={() => animate(true)}
      onMouseLeave={() => animate(false)}
      onFocus={() => animate(true)}
      onBlur={() => animate(false)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} ${styles} ${className}`}
    >
      <span data-fill ref={fill} aria-hidden="true" className="pointer-events-none absolute inset-0 grid content-start" />
      <span data-label className="relative z-10 flex items-center gap-2 transition-colors duration-100">
        {children}
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </span>
    </a>
  );
}
