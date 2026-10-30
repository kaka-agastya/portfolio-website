import { profile } from "@/data/cv";
import { ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import PixelButton from "@/components/PixelButton";

export default function Contact() {
  const whatsapp = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
    { label: "WhatsApp", value: profile.phone, href: whatsapp, copy: profile.phone, external: true },
    { label: "LinkedIn", value: "in/kaka-agastya-herlambang-wahyudi", href: profile.linkedin, external: true },
    { label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github, external: true },
  ];

  return (
    <section id="contact" className="scroll-mt-12 invert-block">
      <div className="flex flex-col gap-10 px-5 pt-24 pb-16 sm:px-8 lg:px-16 lg:pt-36 lg:pb-24 xl:px-24">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
          <span className="size-1.5 bg-current" aria-hidden="true" />
          05 / Contact
        </p>
        <SplitHeading className="max-w-5xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl">
          Tell me what you want to build.
        </SplitHeading>
        <Reveal className="flex flex-wrap gap-3">
          <PixelButton href={`mailto:${profile.email}`}>Get in touch</PixelButton>
          <PixelButton href={whatsapp} variant="secondary" external>
            Chat on WhatsApp
          </PixelButton>
        </Reveal>
      </div>

      <Reveal stagger={0.06} className="grid gap-px border-t border-guide bg-guide sm:grid-cols-2 lg:grid-cols-4">
        {channels.map((c) => (
          <div key={c.label} className="group flex flex-col gap-6 bg-bg p-5 sm:p-8">
            <p className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-fg-muted">
              <span>{c.label}</span>
              {c.copy && <CopyButton text={c.copy} label={`Copy ${c.label.toLowerCase()}`} />}
            </p>
            <a
              href={c.href}
              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-between gap-3 text-sm break-all"
            >
              <span className="link-line">{c.value}</span>
              <ArrowUpRight size={16} className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {c.external && <span className="sr-only">(opens in a new tab)</span>}
            </a>
          </div>
        ))}
      </Reveal>

      <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-guide px-5 py-6 font-mono text-xs text-fg-muted sm:px-8 lg:px-16 xl:px-24">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js & GSAP</p>
        <a href="#" className="link-line">Back to top ↑</a>
      </footer>
    </section>
  );
}
