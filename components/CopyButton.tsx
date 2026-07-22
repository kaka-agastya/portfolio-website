"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

// ⚡ Bolt: Isolated copy-to-clipboard functionality to keep parent Contact section as a Server Component
export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 text-ink-mute hover:text-ink transition-all active:scale-95 lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 focus-within:opacity-100 rounded-md"
      aria-label={copied ? "Copied!" : label}
      title={copied ? "Copied!" : label}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
      <span aria-live="polite" className="sr-only">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
