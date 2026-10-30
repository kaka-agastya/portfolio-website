import { Suspense } from "react";
import GithubActivity from "@/components/GithubActivity";
import Section from "../../components/Section";
import Reveal from "@/components/Reveal";
import Floaty from "@/components/characters/Floaty";
import { BoltBuddy } from "@/components/characters/Stickers";
import { skills } from "@/data/cv";

const groups: { label: string; items: string[]; color: string; hover: string }[] = [
  { label: "Tech Stack", items: skills.stack, color: "bg-sun", hover: "hover:bg-sun" },
  { label: "Hard Skills", items: skills.hard, color: "bg-rose", hover: "hover:bg-rose" },
  { label: "Tools", items: skills.tools, color: "bg-mint", hover: "hover:bg-mint" },
  { label: "Soft Skills", items: skills.soft, color: "bg-sun", hover: "hover:bg-sun" },
  { label: "Languages", items: skills.languages, color: "bg-rose", hover: "hover:bg-rose" },
];

export default function Skills() {
  return (
    <Section
      id="skills"
      index="04"
      label="Skills"
      color="sun"
      title="The toolkit behind the work."
      intro="A React and Next.js core, the tooling to ship it reliably, and the people skills to keep a team moving."
      deco={
        <Floaty className="w-20 lg:w-24" rotate={-8}>
          <BoltBuddy />
        </Floaty>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {groups.map((g, i) => (
          <Reveal key={g.label} delay={(i % 3) * 0.06}>
            <div className="lift h-full overflow-hidden rounded-2xl border-2 border-line bg-paper shadow-brutal">
              <p className={`flex items-center justify-between border-b-2 border-line px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider ${g.color}`}>
                <span>{g.label}</span>
                <span>{String(g.items.length).padStart(2, "0")}</span>
              </p>
              <ul className="flex flex-wrap gap-2 p-6">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className={`rounded-full border-2 border-line bg-bg-soft px-3 py-1 text-sm transition-[background-color,rotate] duration-200 hover:-rotate-3 ${g.hover}`}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <Reveal className="min-w-0">
          <div className="h-full min-w-0 rounded-2xl border-2 border-line bg-paper shadow-brutal">
            <Suspense fallback={<div className="min-h-55 animate-pulse rounded-2xl bg-bg-soft" />}>
              <GithubActivity username="kaka-agastya" />
            </Suspense>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
