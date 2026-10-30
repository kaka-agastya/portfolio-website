import Section, { CellGrid } from "../../components/Section";
import Reveal from "@/components/Reveal";
import { education, awards } from "@/data/cv";

export default function Education() {
  return (
    <Section
      id="education"
      index="03"
      label="Education"
      title="Learning, then teaching back."
      intro="Information Systems at ITS, alongside scholarships and competitions that pushed the work beyond the classroom."
    >
      <CellGrid className="lg:grid-cols-2">
        <Reveal stagger={0.08} className="grid gap-px bg-guide">
          {education.map((e, i) => (
            <div key={i} className="flex flex-col gap-4 bg-bg p-5 sm:p-8 xl:p-10">
              <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">{e.period}</p>
              <h3 className="font-display text-2xl font-medium tracking-tight lg:text-3xl">{e.school}</h3>
              <p className="text-sm text-fg-muted">{e.program}</p>
              <div className="flex flex-wrap gap-2">
                {e.notes.map((n, j) => (
                  <span key={j} className="border border-current px-2 py-1 font-mono text-[11px]">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <div className="bg-bg p-5 sm:p-8 xl:p-10">
          <p className="mb-6 font-mono text-xs uppercase tracking-wider text-fg-muted">Awards & Honors</p>
          <Reveal stagger={0.08} className="flex flex-col">
            {awards.map((a, i) => (
              <div key={i} className="grid grid-cols-[2.5rem_1fr] gap-2 border-t border-guide py-5 first:border-t-0 first:pt-0">
                <span className="font-mono text-xs text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-medium">{a.title}</p>
                  <p className="mt-1 text-sm text-fg-muted">{a.org}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </CellGrid>
    </Section>
  );
}
