"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

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

      // Wait for the fade-out animation to finish before removing from DOM
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 600); // matches transition duration
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        opacity: isLoading ? 1 : 0,
        transition: "opacity 0.6s ease-in-out",
      }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
    >
      <div className="w-10 h-10 border-4 border-line border-t-ink rounded-full mb-4 animate-[spin_1s_linear_infinite]" />
      <p className="font-mono text-sm text-ink-soft animate-pulse">Loading...</p>
    </div>
  );
}
