import { profile, skills } from "@/data/cv";
import { ArrowDownRight } from "lucide-react";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import PixelButton from "@/components/PixelButton";
import HeroArt from "@/components/HeroArt";
import Marquee from "@/components/Marquee";

export default function Hero() {
  return (
    <section
      id="intro"
      className="grid min-h-[calc(100svh-4rem)] grid-rows-[auto_1fr] border-b border-guide lg:min-h-[calc(100dvh-3rem)]"
    >
      <div className="flex min-h-[max(16rem,30svh)] flex-col justify-center gap-6 px-5 py-10 sm:px-8 lg:px-16 xl:px-24">
        <Reveal intro className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider text-fg-muted">
          <span className="size-1.5 bg-current" aria-hidden="true" />
          <span>{profile.name}</span>
          <span aria-hidden="true">·</span>
          <span>{profile.location}</span>
        </Reveal>
        <SplitHeading
          as="h1"
          intro
          delay={0.1}
          className="max-w-5xl font-display text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-6xl lg:text-7xl xl:text-8xl"
        >
          Interfaces that load fast and feel right.
        </SplitHeading>
      </div>

      <div className="invert-block grid grid-rows-[1fr_auto]">
        <div className="grid gap-12 px-5 py-12 sm:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-end lg:gap-20 lg:px-16 lg:py-16 xl:px-24">
          <Reveal intro delay={0.35} stagger={0.08} className="flex max-w-xl flex-col gap-8">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">{profile.role}</p>
            <p className="text-base leading-relaxed lg:text-lg">{profile.summary}</p>
            <div className="flex flex-wrap gap-3">
              <PixelButton href="#contact">Get in touch</PixelButton>
              <PixelButton href="#projects" variant="secondary">
                View projects <ArrowDownRight size={16} />
              </PixelButton>
            </div>
          </Reveal>
          <HeroArt />
        </div>
        <Marquee
          items={skills.stack}
          className="border-t border-guide py-4 font-mono text-xs uppercase tracking-wider"
        />
      </div>
    </section>
  );
}
