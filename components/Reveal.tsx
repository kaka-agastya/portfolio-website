"use client";
import { useEffect, useRef, useState } from "react";

// ⚡ Bolt: Use a single shared IntersectionObserver for all Reveal instances
// instead of creating a new observer for every component. This reduces
// memory footprint and CPU overhead when rendering many items.
let sharedObserver: IntersectionObserver | null = null;
const observerCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver() {
  if (typeof window === "undefined") return null;
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = observerCallbacks.get(entry.target);
            if (callback) {
              callback();
              sharedObserver?.unobserve(entry.target);
              observerCallbacks.delete(entry.target);
            }
          }
        });
      },
      { rootMargin: "-80px" }
    );
  }
  return sharedObserver;
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = getSharedObserver();
    if (observer) {
      observerCallbacks.set(currentRef, () => setIsVisible(true));
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observer) {
        observer.unobserve(currentRef);
        observerCallbacks.delete(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)`,
        transitionDelay: `${delay}s`,
      }}
      className={className}
    >
      {children}
    </div>
  );
}