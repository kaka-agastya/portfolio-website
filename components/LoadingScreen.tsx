"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRendered, setIsRendered] = useState(true);

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
      // Wait for the exit transition (600ms) before unmounting
      const timeout = setTimeout(() => setIsRendered(false), 600);
      return () => clearTimeout(timeout);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  if (!isRendered) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-600 ease-in-out ${
        isLoading ? "opacity-100" : "opacity-0"
      }`}
      style={{ transitionDuration: '600ms' }}
    >
      <div
        className="w-10 h-10 border-4 border-line border-t-ink rounded-full mb-4 animate-spin"
      />
      <p className="font-mono text-sm text-ink-soft animate-pulse">Loading...</p>
    </div>
  );
}
