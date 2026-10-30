import SplitHeading from "./SplitHeading";
import Reveal from "./Reveal";

const BADGE = {
  sun: "bg-sun",
  rose: "bg-rose",
  mint: "bg-mint",
};

export default function Section({
  id,
  index,
  label,
  title,
  intro,
  color = "sun",
  deco,
  className = "",
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  intro?: string;
  color?: keyof typeof BADGE;
  // A floating character placed beside the heading.
  deco?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="relative mb-12 grid gap-6 lg:mb-16 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p
              className={`mb-6 inline-flex -rotate-2 items-center gap-2 rounded-full border-2 border-line px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-line shadow-brutal-sm ${BADGE[color]}`}
            >
              {index} · {label}
            </p>
            <SplitHeading className="font-display text-4xl font-semibold leading-[1.02] tracking-tight text-balance sm:text-5xl xl:text-6xl">
              {title}
            </SplitHeading>
          </div>
          {intro && (
            <Reveal>
              <p className="max-w-xl text-base leading-relaxed text-fg-muted lg:text-lg">{intro}</p>
            </Reveal>
          )}
          {deco && <div className="absolute -top-6 right-0 hidden sm:block lg:-top-10">{deco}</div>}
        </div>
        {children}
      </div>
    </section>
  );
}
