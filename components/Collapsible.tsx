"use client";
import { useId, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block size-3 shrink-0" aria-hidden="true">
      <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
      <span
        className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-300 ${open ? "scale-y-0" : "scale-y-100"}`}
      />
    </span>
  );
}

// Disclosure whose panel height is tweened with GSAP.
export default function Collapsible({
  summary,
  children,
  defaultOpen = false,
  className = "",
  buttonClassName = "",
}: {
  summary: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  const { contextSafe } = useGSAP({ scope: root });

  const toggle = contextSafe(() => {
    const el = panel.current;
    if (!el) return;
    const next = !open;
    setOpen(next);
    gsap.killTweensOf(el);
    gsap.to(el, {
      height: next ? "auto" : 0,
      autoAlpha: next ? 1 : 0,
      duration: prefersReducedMotion() ? 0 : 0.6,
      ease: "expo.inOut",
    });
  });

  return (
    <div ref={root} className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={toggle}
        className={`flex w-full items-center justify-between gap-6 text-left ${buttonClassName}`}
      >
        {summary}
        <PlusIcon open={open} />
      </button>
      <div
        ref={panel}
        id={id}
        role="region"
        className="overflow-hidden"
        style={defaultOpen ? undefined : { height: 0, visibility: "hidden", opacity: 0 }}
      >
        {children}
      </div>
    </div>
  );
}
