"use client";
import { useEffect, useRef, useState } from "react";

// ⚡ Bolt: Use a shared IntersectionObserver instead of creating a new instance for every <Reveal> component
// This significantly reduces memory overhead and CPU usage when rendering lists of elements.
const getObserver = (() => {
  let observer: IntersectionObserver | null = null;
  const callbacks = new Map<Element, () => void>();

  return () => {
    if (typeof window === "undefined") return { observer: null, callbacks };
    if (!observer) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const cb = callbacks.get(entry.target);
              if (cb) {
                cb();
                observer?.unobserve(entry.target);
                callbacks.delete(entry.target);
              }
            }
          });
        },
        { rootMargin: "-80px" }
      );
    }
    return { observer, callbacks };
  };
})();

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

    const { observer, callbacks } = getObserver();

    if (observer) {
      callbacks.set(currentRef, () => setIsVisible(true));
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef && observer) {
        observer.unobserve(currentRef);
        callbacks.delete(currentRef);
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
