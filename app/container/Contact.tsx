import { profile } from "@/data/cv";
import { Mail, Phone } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

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
          {/* ⚡ Bolt: Replaced external Image with inline SVG to eliminate network requests and layout shift */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>{" "}
          LinkedIn
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-ink-mute transition-colors"
        >
          {/* ⚡ Bolt: Replaced external Image with inline SVG to eliminate network requests and layout shift */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
          </svg>{" "}
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