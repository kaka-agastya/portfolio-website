"use client";

import { profile } from "@/data/cv";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { useState } from "react";

function CopyButton({ text, label }: { text: string; label: string }) {
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
      className="ml-2 p-1.5 text-ink-mute hover:text-ink transition-colors lg:opacity-0 lg:group-hover:opacity-100 focus-visible:opacity-100 focus-within:opacity-100 rounded-md"
      aria-label={label}
      title={label}
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 lg:px-32 xl:px-40 max-w-content mx-auto py-24 border-t border-line"
    >
      <div className="flex items-baseline gap-4 mb-8">
        <span className="font-mono text-xs text-ink-mute">05</span>
        <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">
          Contact
        </h2>
      </div>

      <h3 className="font-display text-3xl lg:text-5xl font-medium max-w-2xl text-balance leading-tight">
        Let&apos;s build something reliable together.
      </h3>

      <div className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-sm">
        <div className="group flex items-center">
          <a
            href={`mailto:${profile.email}`}
            className="flex items-center gap-2 hover:text-ink-mute transition-colors"
          >
            <Mail size={16} /> {profile.email}
          </a>
          <CopyButton text={profile.email} label="Copy email address" />
        </div>
        <div className="group flex items-center">
          <a
            href={`https://wa.me/${profile.phone.replace(/\s/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-ink-mute transition-colors"
          >
            <Phone size={16} /> {profile.phone}
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <CopyButton text={profile.phone} label="Copy phone number" />
        </div>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-ink-mute transition-colors"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios/50/linkedin.png"
            alt=""
            aria-hidden="true"
          />{" "}
          LinkedIn
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-ink-mute transition-colors"
        >
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/ios-glyphs/30/github.png"
            alt=""
            aria-hidden="true"
          />{" "}
          GitHub
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>

      <p className="mt-16 font-mono text-xs text-ink-mute">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js.
      </p>
    </section>
  );
}
