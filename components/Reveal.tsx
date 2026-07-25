"use client";
import { useEffect, useRef, useState } from "react";

// ⚡ Bolt: Removed framer-motion in favor of IntersectionObserver and native CSS for smaller bundle size
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { rootMargin: "-80px" }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: "500ms",
        transitionDelay: `${delay}s`,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`transition-all ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}
