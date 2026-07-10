import Section from "../../components/Section";
import { education, awards } from "@/data/cv";

export default function Education() {
  return (
    <Section id="education" index="03" title="Education & Awards">
      <div className="grid lg:grid-cols-2 gap-14">
        <div className="space-y-8">
          {education.map((e, i) => (
            <div key={i}>
              <p className="font-mono text-xs text-ink-mute">{e.period}</p>
              <h3 className="font-display text-lg font-medium mt-1">{e.school}</h3>
              <p className="text-sm text-ink-soft mt-1">{e.program}</p>
              <ul className="mt-3 space-y-1">
                {e.notes.map((n, j) => (
                  <li key={j} className="text-sm text-ink-mute">— {n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-wide text-ink-mute mb-4">Awards & Honors</p>
          <div className="space-y-4">
            {awards.map((a, i) => (
              <div key={i} className="border-l-2 border-line pl-4">
                <p className="text-sm font-medium">{a.title}</p>
                <p className="text-xs text-ink-mute mt-0.5">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}