import Section from "../../components/Section";
import { projects } from "@/data/cv";
import { ExternalLink } from "lucide-react";

export default function Projects() {
  return (
    <Section id="projects" index="02" title="Projects">
      <div className="grid gap-6">
        {projects.map((p, i) => (
          <div key={i} className="border border-line rounded-md p-8 hover:border-ink transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-xl font-medium">{p.name}</h3>
                <p className="text-ink-soft text-sm mt-1">{p.role} · {p.period}</p>
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ink-mute hover:text-ink transition-all hover:scale-110"
                  aria-label={`View ${p.name} project (opens in a new tab)`}
                  title={`View ${p.name} project`}
                >
                  <ExternalLink size={18} />
                </a>
              )}
            </div>
            <ul className="mt-5 space-y-2">
              {p.points.map((pt, j) => (
                <li key={j} className="text-sm text-ink-soft leading-relaxed pl-4 relative">
                  <span className="absolute left-0 top-[0.6em] w-1.5 h-px bg-ink-mute" />
                  {pt}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-5">
              {p.tags.map((t) => (
                <span key={t} className="font-mono text-[11px] border border-line rounded px-2 py-1 text-ink-soft">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}