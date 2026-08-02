"use client";
import { useEffect, useRef, useState } from "react";

// ⚡ Bolt: Use a singleton IntersectionObserver and WeakMap to map DOM elements to their callbacks
// This changes the complexity from O(n) to O(1) observer instantiations, reducing memory overhead and jank.
const observerCallbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const callback = observerCallbacks.get(entry.target);
            if (callback) {
              callback();
              observer?.unobserve(entry.target);
              observerCallbacks.delete(entry.target);
            }
          }
        });
      },
      {
        rootMargin: "-80px",
      }
    );
  }
  return observer;
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

    observerCallbacks.set(currentRef, () => setIsVisible(true));
    getObserver()?.observe(currentRef);

    return () => {
      if (currentRef) {
        getObserver()?.unobserve(currentRef);
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