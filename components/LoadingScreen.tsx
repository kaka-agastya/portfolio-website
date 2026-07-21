"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);

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
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLoading]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-10 h-10 border-4 border-line border-t-ink rounded-full mb-4"
          />
          <p className="font-mono text-sm text-ink-soft animate-pulse">Loading...</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
