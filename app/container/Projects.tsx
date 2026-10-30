import Image from "next/image";
import Section, { CellGrid } from "../../components/Section";
import Collapsible from "@/components/Collapsible";
import Reveal from "@/components/Reveal";
import PixelButton from "@/components/PixelButton";
import { GithubIcon } from "@/components/Nav";
import { profile, projects } from "@/data/cv";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  return (
    <Section
      id="projects"
      index="02"
      label="Projects"
      title="Selected work, built end to end."
      intro="Learning platforms, automation, dashboards and company sites. Each one shipped to production and measured after launch."
    >
      <CellGrid className="md:grid-cols-2">
        {projects.map((p, i) => {
          const [lead, ...rest] = p.points;
          return (
            <Reveal key={i} delay={(i % 2) * 0.08} className="bg-bg">
              <article className="group flex h-full flex-col">
                <div className="relative aspect-[16/9] overflow-hidden border-b border-guide bg-bg-soft">
                  <Image
                    src={p.image || "/projects/algoritme.svg"}
                    alt={`${p.name} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-4 left-4 bg-bg px-2 py-1 font-mono text-[11px] uppercase tracking-wider">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col gap-5 p-5 sm:p-8 xl:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-display text-2xl font-medium tracking-tight lg:text-3xl">{p.name}</h3>
                      <p className="mt-2 text-sm text-fg-muted">{p.role}</p>
                    </div>
                    <p className="shrink-0 font-mono text-xs text-fg-muted">{p.period}</p>
                  </div>

                  <p className="text-sm leading-relaxed text-fg-muted">{lead}</p>

                  {rest.length > 0 && (
                    <Collapsible
                      buttonClassName="border-t border-guide py-3 font-mono text-xs uppercase tracking-wider"
                      summary={<span>More details</span>}
                    >
                      <ul className="space-y-3 pt-2 pb-1">
                        {rest.map((pt, j) => (
                          <li key={j} className="relative pl-5 text-sm leading-relaxed text-fg-muted">
                            <span className="absolute top-[0.55em] left-0 size-1.5 bg-current opacity-60" aria-hidden="true" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </Collapsible>
                  )}

                  <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span key={t} className="border border-guide px-2 py-1 font-mono text-[11px] text-fg-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.link ? (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-1 text-sm"
                      >
                        <span className="link-line group-hover/link:after:scale-x-100">View project</span>
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                        <span className="sr-only">{p.name} (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="font-mono text-xs text-fg-muted">Private project</span>
                    )}
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
        <div className={`flex flex-col justify-between gap-10 bg-bg p-5 sm:p-8 xl:p-10 ${projects.length % 2 === 0 ? "md:col-span-2" : ""}`}>
          <p className="font-mono text-xs uppercase tracking-wider text-fg-muted">More work</p>
          <div className="flex flex-col gap-6">
            <p className="max-w-sm font-display text-3xl font-medium leading-tight tracking-tight">
              Experiments and side projects live on GitHub.
            </p>
            <PixelButton href={profile.github} variant="secondary" external className="self-start">
              <GithubIcon size={16} /> {profile.github.replace(/^https?:\/\//, "")}
            </PixelButton>
          </div>
        </div>
      </CellGrid>
    </Section>
  );
}
