import Reveal from "@/components/Reveal";
import Collapsible from "@/components/Collapsible";
import Section from "../../components/Section";
import { experience } from "@/data/cv";

export default function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      label="Experience"
      title="Shipping with teams of every size."
      intro="From a funded health platform to campus committees, I build and lead frontends that real people rely on. Open a role to see what I delivered."
    >
      <Reveal stagger={0.05} className="border-t border-guide">
        {experience.map((job, i) => (
          <Collapsible
            key={i}
            defaultOpen={i === 0}
            className="border-b border-guide last:border-b-0"
            buttonClassName="group px-5 py-6 sm:px-8 lg:px-16 lg:py-7 xl:px-24 transition-colors hover:bg-bg-soft"
            summary={
              <span className="grid flex-1 gap-2 lg:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_10rem] lg:items-baseline lg:gap-8">
                <span className="font-mono text-xs text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-medium tracking-tight lg:text-2xl">{job.role}</span>
                <span className="text-sm text-fg-muted">{job.org}</span>
                <span className="font-mono text-xs text-fg-muted lg:text-right">{job.period}</span>
              </span>
            }
          >
            <div className="grid gap-6 px-5 pb-8 sm:px-8 lg:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,1fr)_10rem] lg:gap-8 lg:px-16 xl:px-24">
              <span className="hidden lg:block" />
              <ul className="space-y-3">
                {job.points.map((p, j) => (
                  <li key={j} className="relative pl-5 text-sm leading-relaxed text-fg-muted">
                    <span className="absolute top-[0.55em] left-0 size-1.5 bg-current opacity-60" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap content-start gap-2 lg:col-span-2">
                <span className="border border-current px-2 py-1 font-mono text-[11px] uppercase">{job.category}</span>
                {job.tags.map((t) => (
                  <span key={t} className="border border-guide px-2 py-1 font-mono text-[11px] text-fg-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Collapsible>
        ))}
      </Reveal>
    </Section>
  );
}
