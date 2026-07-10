import Section from "../../components/Section";
import { experience } from "@/data/cv";

export default function Experience() {
  return (
    <Section id="experience" index="01" title="Experience">
      <div className="space-y-14">
        {experience.map((job, i) => (
          <div key={i} className="grid lg:grid-cols-[200px_1fr] gap-4 lg:gap-10">
            <div>
              <p className="font-mono text-xs text-ink-mute">{job.period}</p>
              <p className="font-mono text-[11px] uppercase tracking-wide text-ink-mute mt-1">
                {job.category}
              </p>
            </div>
            <div>
              <h3 className="font-display text-xl font-medium">{job.role}</h3>
              <p className="text-ink-soft text-sm mt-1">{job.org}</p>
              <ul className="mt-4 space-y-2">
                {job.points.map((p, j) => (
                  <li key={j} className="text-sm text-ink-soft leading-relaxed pl-4 relative">
                    <span className="absolute left-0 top-[0.6em] w-1.5 h-px bg-ink-mute" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2 mt-5">
                {job.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[11px] border border-line rounded px-2 py-1 text-ink-soft"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}