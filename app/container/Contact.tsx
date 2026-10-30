import { profile } from "@/data/cv";
import { ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Mascot from "@/components/characters/Mascot";
import Floaty from "@/components/characters/Floaty";
import { PixelHeart, Squiggle } from "@/components/characters/Stickers";

const CHANNEL_COLORS = ["bg-rose", "bg-mint", "bg-sun", "bg-paper"];

export default function Contact() {
  const whatsapp = `https://wa.me/${profile.phone.replace(/\D/g, "")}`;
  const channels = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, copy: profile.email },
    { label: "WhatsApp", value: profile.phone, href: whatsapp, copy: profile.phone, external: true },
    { label: "LinkedIn", value: "in/kaka-agastya-herlambang-wahyudi", href: profile.linkedin, external: true },
    { label: "GitHub", value: profile.github.replace(/^https?:\/\//, ""), href: profile.github, external: true },
  ];

  return (
    <section id="contact" className="scroll-mt-24 pt-10 pb-8 lg:pt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border-2 border-line bg-sun shadow-brutal-lg">
          <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-8 p-6 pt-10 sm:p-10 lg:p-14">
              <p className="inline-flex -rotate-2 self-start rounded-full border-2 border-line bg-paper px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wider shadow-brutal-sm">
                05 · Contact
              </p>
              <SplitHeading className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl xl:text-7xl">
                Tell me what you want to build.
              </SplitHeading>
              <Squiggle className="w-32" />
              <Reveal className="flex flex-wrap gap-3">
                <Button href={`mailto:${profile.email}`}>Get in touch</Button>
                <Button href={whatsapp} variant="outline" external>
                  Chat on WhatsApp
                </Button>
              </Reveal>
            </div>
            <div className="relative flex justify-center px-6 lg:justify-end lg:pr-14">
              <Mascot pose="mail" expression="wink" accessory="cap" head="mint" body="rose" className="w-56 sm:w-64 lg:w-72" />
            </div>
          </div>
          <Floaty className="absolute top-8 right-8 w-14 sm:w-16" rotate={12}>
            <PixelHeart />
          </Floaty>
        </div>

        <Reveal stagger={0.06} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map((c, i) => (
            <div key={c.label} className={`lift group flex flex-col gap-6 rounded-2xl border-2 border-line p-5 shadow-brutal ${CHANNEL_COLORS[i]}`}>
              <p className="flex items-center justify-between font-mono text-xs font-medium uppercase tracking-wider">
                <span>{c.label}</span>
                {c.copy && <CopyButton text={c.copy} label={`Copy ${c.label.toLowerCase()}`} />}
              </p>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="flex items-center justify-between gap-3 text-sm font-medium break-all"
              >
                <span className="link-line">{c.value}</span>
                <ArrowUpRight size={18} className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                {c.external && <span className="sr-only">(opens in a new tab)</span>}
              </a>
            </div>
          ))}
        </Reveal>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t-2 border-line pt-6 font-mono text-xs text-fg-muted">
          <p>© {new Date().getFullYear()} {profile.name}</p>
          <p>Built with Next.js & GSAP</p>
          <a href="#" className="link-line text-fg">Back to top ↑</a>
        </footer>
      </div>
    </section>
  );
}
