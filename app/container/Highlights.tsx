import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import SplitHeading from "@/components/SplitHeading";
import { highlights } from "@/data/cv";

export default function Highlights() {
  return (
    <section aria-label="Highlights" className="invert-block border-b border-guide">
      <div className="grid gap-8 px-5 pt-20 pb-12 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-16 lg:pt-28 lg:pb-16 xl:px-24">
        <SplitHeading className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl xl:text-6xl">
          Results worth measuring.
        </SplitHeading>
        <Reveal className="self-end">
          <p className="max-w-xl text-base leading-relaxed text-fg-muted lg:text-lg">
            Fast pages, fewer manual hours and steady grades. A few numbers from recent work and study.
          </p>
        </Reveal>
      </div>

      <Reveal stagger={0.08} className="grid gap-px border-t border-guide bg-guide sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.label} className="flex min-h-56 flex-col justify-between gap-8 bg-bg p-5 sm:p-8 xl:p-10">
            <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">{h.label}</p>
            <div>
              <p className="font-display text-6xl font-medium tracking-tight tabular-nums xl:text-7xl">
                <CountUp value={h.value} decimals={h.decimals} prefix={h.prefix} suffix={h.suffix} />
              </p>
              <p className="mt-3 text-sm text-fg-muted">{h.note}</p>
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
