import { Suspense } from "react";
import GithubActivity from "@/components/GithubActivity";
import Section, { CellGrid } from "../../components/Section";
import Reveal from "@/components/Reveal";
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
    <Section
      id="skills"
      index="04"
      label="Skills"
      title="The toolkit behind the work."
      intro="A React and Next.js core, the tooling to ship it reliably, and the people skills to keep a team moving."
    >
      <CellGrid className="sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={(i % 3) * 0.06} className="bg-bg p-5 sm:p-8 xl:p-10">
            <p className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-fg-muted">
              <span>{g.label}</span>
              <span>{String(g.items.length).padStart(2, "0")}</span>
            </p>
            <ul className="flex flex-wrap gap-2">
              {g.items.map((item) => (
                <li key={item} className="border border-guide px-3 py-1.5 text-sm transition-colors hover:border-current">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
        <div className="bg-bg">
          <Suspense fallback={<div className="min-h-55 animate-pulse bg-bg-soft" />}>
            <GithubActivity username="kaka-agastya" />
          </Suspense>
        </div>
      </CellGrid>
    </Section>
  );
}
