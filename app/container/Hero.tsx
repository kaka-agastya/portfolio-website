import { profile, skills } from "@/data/cv";
import { ArrowDownRight, MapPin } from "lucide-react";
import SplitHeading from "@/components/SplitHeading";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Marquee from "@/components/Marquee";
import Mascot from "@/components/characters/Mascot";
import Floaty from "@/components/characters/Floaty";
import { BoltBuddy, CoffeeBuddy, CursorBuddy, StarBuddy } from "@/components/characters/Stickers";

export default function Hero() {
  return (
    <section id="intro" className="overflow-x-clip pt-10 lg:pt-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16 lg:px-10">
        <div className="flex flex-col gap-8">
          <Reveal intro>
            <p className="inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-line bg-mint px-4 py-1.5 text-sm font-medium shadow-brutal-sm">
              <span aria-hidden="true">👋</span> Hi, I&apos;m {profile.name.split(" ")[0]} - {profile.role}
            </p>
          </Reveal>
          <SplitHeading
            as="h1"
            intro
            delay={0.1}
            className="font-display text-5xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-6xl xl:text-7xl"
          >
            Interfaces that load fast and feel right.
          </SplitHeading>
          <Reveal intro delay={0.3} stagger={0.08} className="flex flex-col gap-8">
            <p className="max-w-xl text-base leading-relaxed text-fg-muted lg:text-lg">{profile.summary}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#contact">Get in touch</Button>
              <Button href="#projects" variant="outline">
                View projects <ArrowDownRight size={16} />
              </Button>
              <span className="ml-1 inline-flex items-center gap-1.5 text-sm text-fg-muted">
                <MapPin size={15} /> {profile.location}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal intro delay={0.2} className="relative">
          <div className="relative overflow-hidden rounded-3xl border-2 border-line bg-cobalt shadow-brutal-lg">
            {/* Dotted backdrop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-25"
              style={{ backgroundImage: "radial-gradient(var(--paper) 1.5px, transparent 1.5px)", backgroundSize: "22px 22px" }}
            />
            <div className="relative flex aspect-[5/4] items-end justify-center pt-10">
              <Mascot intro className="w-[58%] max-w-80 translate-y-[3%]" />
            </div>
            <Floaty className="absolute top-6 left-6 w-16 sm:w-20" rotate={-12}>
              <StarBuddy />
            </Floaty>
            <Floaty className="absolute right-6 bottom-8 w-14 sm:w-16" rotate={10} speed={1.3}>
              <CoffeeBuddy />
            </Floaty>
            <Floaty className="absolute bottom-10 left-8 w-12 sm:w-14" rotate={-6} speed={0.8}>
              <BoltBuddy />
            </Floaty>
          </div>

          {/* Speech bubble */}
          <Floaty className="absolute -top-5 right-4 sm:right-10" rotate={4} amp={6}>
            <span className="relative block rounded-2xl border-2 border-line bg-paper px-4 py-2 font-mono text-sm font-medium shadow-brutal-sm">
              hello, world!
              <span className="absolute -bottom-[9px] left-8 size-4 rotate-45 border-r-2 border-b-2 border-line bg-paper" />
            </span>
          </Floaty>
          <Floaty className="absolute -bottom-8 -left-6 w-16 sm:w-20" rotate={-18} amp={8} speed={1.2}>
            <CursorBuddy />
          </Floaty>
        </Reveal>
      </div>

      {/* Tilted ticker */}
      <div className="mt-20 -mx-[5vw] -rotate-2 border-y-2 border-line bg-line py-4 text-paper lg:mt-28">
        <Marquee items={skills.stack} className="font-display text-xl font-semibold tracking-tight sm:text-2xl" />
      </div>
    </section>
  );
}
