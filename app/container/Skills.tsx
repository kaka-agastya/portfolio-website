import { Suspense } from "react";
import GithubActivity from "@/components/GithubActivity";
import Section from "../../components/Section";
import { skills } from "@/data/cv";

const groups: { label: string; items: string[] }[] = [
  { label: "Tech Stack", items: skills.stack },
  { label: "Hard Skills", items: skills.hard },
  { label: "Tools", items: skills.tools },
  { label: "Soft Skills", items: skills.soft },
  { label: "Languages", items: skills.languages },
];

export default function Skills() {
  return (
    <Section id="skills" index="04" title="Skills">
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {groups.map((g) => (
          <div key={g.label}>
            <p className="font-mono text-[11px] uppercase tracking-wide text-ink-mute mb-3">
              {g.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <span
                  key={item}
                  className="text-sm border border-line rounded px-3 py-1.5 text-ink-soft"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-14">
        <Suspense fallback={<div className="border border-line rounded-md p-6 lg:p-8 animate-pulse bg-line/20 min-h-[220px]" />}>
          <GithubActivity username="kaka-agastya" />
        </Suspense>
      </div>
    </Section>
  );
}
