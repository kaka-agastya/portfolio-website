import Image from "next/image";
import Section from "../../components/Section";
import Collapsible from "@/components/Collapsible";
import Reveal from "@/components/Reveal";
import Button from "@/components/Button";
import Floaty from "@/components/characters/Floaty";
import { CursorBuddy, StarBuddy } from "@/components/characters/Stickers";
import { GithubIcon } from "@/components/Nav";
import { profile, projects } from "@/data/cv";
import { ArrowUpRight } from "lucide-react";

// Each card gets its own accent so the grid feels like a sticker sheet.
const ACCENTS = ["bg-sun", "bg-rose", "bg-mint", "bg-cobalt", "bg-sun"];

export default function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      label="Projects"
      color="rose"
      title="Selected work, built end to end."
      intro="Learning platforms, automation, dashboards and company sites. Each one shipped to production and measured after launch."
      deco={
        <Floaty className="w-24 lg:w-28" rotate={-10}>
          <StarBuddy />
        </Floaty>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        {projects.map((p, i) => {
          const [lead, ...rest] = p.points;
          return (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <article className="lift group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-line bg-paper shadow-brutal">
                <div className={`relative border-b-2 border-line p-4 sm:p-5 ${ACCENTS[i % ACCENTS.length]}`}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-xl border-2 border-line bg-bg-soft">
                    <Image
                      src={p.image || "/projects/algoritme.svg"}
                      alt={`${p.name} preview`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      loading={i < 2 ? "eager" : "lazy"}
                      className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.05]"
                    />
                  </div>
                  <span className="absolute top-2 left-2 -rotate-6 rounded-full border-2 border-line bg-paper px-2.5 py-0.5 font-mono text-xs font-medium shadow-brutal-sm">
                    #{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-tight lg:text-3xl">{p.name}</h3>
                      <p className="mt-2 text-sm text-fg-muted">{p.role}</p>
                    </div>
                    <p className="shrink-0 rounded-lg border-2 border-line bg-bg-soft px-2 py-1 font-mono text-[11px]">{p.period}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-fg-muted">{lead}</p>

                  {rest.length > 0 && (
                    <Collapsible
                      buttonClassName="border-t-2 border-dashed border-line/30 pt-4 text-sm font-medium"
                      summary={<span>More details</span>}
                    >
                      <ul className="space-y-3 pt-3 pb-1">
                        {rest.map((pt, j) => (
                          <li key={j} className="relative pl-6 text-sm leading-relaxed text-fg-muted">
                            <span className="absolute top-[0.2em] left-0 text-cobalt" aria-hidden="true">✦</span>
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </Collapsible>
                  )}

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="rounded-lg border-2 border-line bg-bg-soft px-2.5 py-1 font-mono text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border-2 border-line bg-sun px-3.5 py-1.5 text-sm font-medium transition-colors hover:bg-rose"
                      >
                        View project <ArrowUpRight size={16} />
                        <span className="sr-only">{p.name} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="rounded-full border-2 border-dashed border-line/50 px-3.5 py-1.5 text-sm text-fg-muted">
                        Private project
                      </span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}

        <Reveal className={projects.length % 2 === 0 ? "md:col-span-2" : ""}>
          <div className="relative flex h-full min-h-72 flex-col justify-between gap-10 overflow-hidden rounded-2xl border-2 border-line bg-mint p-6 shadow-brutal sm:p-8">
            <p className="font-mono text-xs font-medium uppercase tracking-wider">More work</p>
            <div className="relative z-10 flex flex-col gap-6">
              <p className="max-w-xs font-display text-3xl font-semibold leading-tight tracking-tight">
                Experiments and side projects live on GitHub.
              </p>
              <Button href={profile.github} variant="outline" external className="self-start">
                <GithubIcon size={16} /> {profile.github.replace(/^https?:\/\//, "")}
              </Button>
            </div>
            <Floaty className="absolute top-6 right-6 w-24 sm:w-28" rotate={-14} amp={8}>
              <CursorBuddy />
            </Floaty>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
