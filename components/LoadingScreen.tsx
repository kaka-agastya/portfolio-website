"use client";
import { useState, useEffect } from "react";

// ⚡ Bolt: Removed framer-motion in favor of native CSS transitions for smaller bundle size
export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === "complete") {
      const timeout = setTimeout(() => setIsLoading(false), 0);
      return () => clearTimeout(timeout);
    } else {
      window.addEventListener("load", handleLoad);
      const timeout = setTimeout(() => setIsLoading(false), 2500);
      return () => {
        window.removeEventListener("load", handleLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      // Wait for the opacity transition to finish before unmounting (0.6s)
      const timeout = setTimeout(() => setIsMounted(false), 600);
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!isMounted) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-600 ease-in-out ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="w-10 h-10 border-4 border-line border-t-ink rounded-full mb-4 animate-[spin_1s_linear_infinite]" />
      <p className="font-mono text-sm text-ink-soft animate-pulse">Loading...</p>
    </div>
  );
}
