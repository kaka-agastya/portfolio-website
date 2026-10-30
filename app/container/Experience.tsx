import Reveal from "@/components/Reveal";
import Collapsible from "@/components/Collapsible";
import Section from "../../components/Section";
import Floaty from "@/components/characters/Floaty";
import { CoffeeBuddy } from "@/components/characters/Stickers";
import { experience } from "@/data/cv";

const CATEGORY: Record<string, string> = {
  Experience: "bg-sun",
  Organizational: "bg-mint",
  Committee: "bg-rose",
  Volunteering: "bg-cobalt text-paper",
};

export default function Experience() {
  return (
    <Section
      id="experience"
      index="01"
      label="Experience"
      color="sun"
      title="Shipping with teams of every size."
      intro="From a funded health platform to campus committees, I build and lead frontends that real people rely on. Open a role to see what I delivered."
      deco={
        <Floaty className="w-24 lg:w-28" rotate={8}>
          <CoffeeBuddy />
        </Floaty>
      }
    >
      <Reveal stagger={0.06} className="flex flex-col gap-4">
        {experience.map((job, i) => (
          <Collapsible
            key={i}
            defaultOpen={i === 0}
            className="lift rounded-2xl border-2 border-line bg-paper shadow-brutal"
            buttonClassName="px-5 py-5 sm:px-7 lg:py-6"
            summary={
              <span className="grid flex-1 gap-2 lg:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-6">
                <span className="font-mono text-sm text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-xl font-semibold tracking-tight lg:text-2xl">{job.role}</span>
                <span className="text-sm text-fg-muted">{job.org}</span>
                <span className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <span className={`rounded-full border-2 border-line px-2.5 py-0.5 text-xs font-medium ${CATEGORY[job.category] ?? "bg-paper"}`}>
                    {job.category}
                  </span>
                  <span className="font-mono text-xs text-fg-muted">{job.period}</span>
                </span>
              </span>
            }
          >
            <div className="grid gap-6 border-t-2 border-dashed border-line/30 px-5 pt-5 pb-7 sm:px-7 lg:grid-cols-[3rem_minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-6">
              <span className="hidden lg:block" />
              <ul className="space-y-3">
                {job.points.map((p, j) => (
                  <li key={j} className="relative pl-6 text-sm leading-relaxed text-fg-muted">
                    <span className="absolute top-[0.2em] left-0 text-cobalt" aria-hidden="true">✦</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap content-start gap-2">
                {job.tags.map((t) => (
                  <span key={t} className="rounded-lg border-2 border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px]">
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
