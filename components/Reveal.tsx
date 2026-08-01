"use client";
import { useEffect, useRef, useState } from "react";

// ⚡ Bolt: Shared IntersectionObserver instance and WeakMap registry
// to prevent creating a new observer for every Reveal component, saving memory and init time.
let observer: IntersectionObserver | null = null;
const callbacks = new WeakMap<Element, (entry: IntersectionObserverEntry) => void>();

function getObserver() {
  if (typeof window === "undefined") return null;
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const callback = callbacks.get(entry.target);
          if (callback) {
            callback(entry);
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

    const obs = getObserver();
    if (!obs) return;

    callbacks.set(currentRef, (entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        obs.unobserve(currentRef);
        callbacks.delete(currentRef);
      }
    });

    obs.observe(currentRef);

    return () => {
      if (currentRef) {
        obs.unobserve(currentRef);
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
