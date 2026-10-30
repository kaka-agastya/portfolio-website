import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import Floaty from "@/components/characters/Floaty";
import { BoltBuddy, PixelHeart } from "@/components/characters/Stickers";
import { highlights } from "@/data/cv";

const CARDS = ["bg-sun rotate-[-1.5deg]", "bg-rose rotate-[1deg]", "bg-mint rotate-[-1deg]", "bg-paper rotate-[1.5deg]"];

export default function Highlights() {
  return (
    <section aria-label="Highlights" className="invert-block relative overflow-hidden border-y-2 border-line py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-15"
        style={{ backgroundImage: "radial-gradient(var(--paper) 1.5px, transparent 1.5px)", backgroundSize: "26px 26px" }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <SplitHeading className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl xl:text-6xl">
            Results worth measuring.
          </SplitHeading>
          <Reveal>
            <p className="max-w-xl text-base leading-relaxed text-fg-muted lg:text-lg">
              Fast pages, fewer manual hours and steady grades. A few numbers from recent work and study.
            </p>
          </Reveal>
        </div>

        <Reveal stagger={0.08} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h, i) => (
            <div
              key={h.label}
              className={`lift flex min-h-56 flex-col justify-between gap-8 rounded-2xl border-2 border-line p-6 text-line shadow-brutal ${CARDS[i % CARDS.length]}`}
            >
              <p className="font-mono text-xs font-medium uppercase tracking-wider">{h.label}</p>
              <div>
                <p className="font-display text-6xl font-semibold tracking-tight tabular-nums">
                  <CountUp value={h.value} decimals={h.decimals} prefix={h.prefix} suffix={h.suffix} />
                </p>
                <p className="mt-3 text-sm opacity-75">{h.note}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>

      <Floaty className="absolute top-10 right-6 hidden w-20 sm:block lg:right-16 lg:w-24" rotate={12}>
        <BoltBuddy />
      </Floaty>
      <Floaty className="absolute bottom-6 left-4 w-14 lg:left-10 lg:w-16" rotate={-10} speed={0.8}>
        <PixelHeart />
      </Floaty>
    </section>
  );
}
