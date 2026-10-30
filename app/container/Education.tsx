import Section from "../../components/Section";
import Reveal from "@/components/Reveal";
import Floaty from "@/components/characters/Floaty";
import { StarBuddy } from "@/components/characters/Stickers";
import { education, awards } from "@/data/cv";

const MEDALS = ["bg-sun", "bg-rose", "bg-mint"];

export default function Education() {
  return (
    <Section
      id="education"
      index="03"
      label="Education"
      color="mint"
      title="Learning, then teaching back."
      intro="Information Systems at ITS, alongside scholarships and competitions that pushed the work beyond the classroom."
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <Reveal stagger={0.08} className="flex flex-col gap-6">
          {education.map((e, i) => (
            <div key={i} className="lift flex flex-col gap-4 rounded-2xl border-2 border-line bg-paper p-6 shadow-brutal sm:p-8">
              <p className="self-start rounded-full border-2 border-line bg-mint px-3 py-0.5 font-mono text-xs font-medium">{e.period}</p>
              <h3 className="font-display text-2xl font-semibold tracking-tight lg:text-3xl">{e.school}</h3>
              <p className="text-sm text-fg-muted">{e.program}</p>
              <div className="flex flex-wrap gap-2">
                {e.notes.map((n, j) => (
                  <span key={j} className="rounded-lg border-2 border-line bg-sun px-2.5 py-1 font-mono text-[11px] font-medium">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>

        <Reveal className="relative">
          <div className="h-full rounded-2xl border-2 border-line bg-paper p-6 shadow-brutal sm:p-8">
            <p className="mb-6 font-mono text-xs font-medium uppercase tracking-wider text-fg-muted">Awards & Honors</p>
            <div className="flex flex-col gap-4">
              {awards.map((a, i) => (
                <div key={i} className="flex items-start gap-4 rounded-xl border-2 border-line bg-bg-soft p-4">
                  <span
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-line font-display text-sm font-semibold ${MEDALS[i % MEDALS.length]}`}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{a.title}</p>
                    <p className="mt-1 text-sm text-fg-muted">{a.org}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Floaty className="absolute -top-8 right-2 w-20 sm:-right-3 sm:w-24" rotate={14}>
            <StarBuddy />
          </Floaty>
        </Reveal>
      </div>
    </Section>
  );
}
