"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

  useEffect(() => {
    const MIN_MS = 400;
    const startTime = Date.now();

    const dismiss = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_MS - elapsed);
      setTimeout(() => setIsLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      dismiss();
    } else {
      window.addEventListener("load", dismiss, { once: true });
      // Safety fallback
      const fallback = setTimeout(dismiss, 3000);
      return () => {
        window.removeEventListener("load", dismiss);
        clearTimeout(fallback);
      };
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Wait for the exit animation to complete before removing from DOM
      const timeout = setTimeout(() => setIsRendered(false), 650);
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-paper)] transition-opacity duration-[600ms] ease-in-out ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="w-10 h-10 border-4 border-line border-t-ink rounded-full mb-4 animate-[spin_1s_linear_infinite]" />
      <p className="font-mono text-sm text-ink-soft animate-pulse">Loading...</p>
    </div>
  );
}
