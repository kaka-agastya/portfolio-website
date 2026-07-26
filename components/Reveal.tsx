"use client";
import { useEffect, useRef, useState } from "react";

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
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve once it becomes visible (viewport once: true)
          if (currentRef) observer.unobserve(currentRef);
        }
      },
      {
        rootMargin: "-80px 0px",
        threshold: 0,
      }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}s`,
        // approximate bezier cubic-bezier(0.22, 1, 0.36, 1) to ease-out, 500ms
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}
