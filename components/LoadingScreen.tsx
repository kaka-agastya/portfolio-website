"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // If the page is already fully loaded (e.g. return visits, fast/cached),
    // skip the loading screen entirely — showing it would just cause a flash.
    if (document.readyState === "complete") return;

    setVisible(true);
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      setFading(true);
      document.body.style.overflow = "";
      setTimeout(() => setVisible(false), 650);
    };

    window.addEventListener("load", dismiss, { once: true });
    const fallback = setTimeout(dismiss, 3000);

    return () => {
      window.removeEventListener("load", dismiss);
      clearTimeout(fallback);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--color-paper)] transition-opacity duration-[600ms] ease-in-out ${fading ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
    >
      <div
        className="w-10 h-10 border-4 border-line border-t-ink rounded-full mb-4 animate-[spin_1s_linear_infinite]"
        style={{ willChange: "transform" }}
      />
      <p className="font-mono text-sm text-ink-soft animate-pulse">Loading...</p>
    </div>
  );
}
