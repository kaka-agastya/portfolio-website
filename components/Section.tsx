import SplitHeading from "./SplitHeading";
import Reveal from "./Reveal";

export default function Section({
  id,
  index,
  label,
  title,
  intro,
  children,
}: {
  id: string;
  index: string;
  label?: string;
  title: React.ReactNode;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-12 border-b border-guide">
      <div className="grid gap-8 px-5 pt-20 pb-12 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:px-16 lg:pt-28 lg:pb-16 xl:px-24">
        <div>
          <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
            <span className="size-1.5 bg-current" aria-hidden="true" />
            {index}{label && ` / ${label}`}
          </p>
          <SplitHeading className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-balance sm:text-5xl xl:text-6xl">
            {title}
          </SplitHeading>
        </div>
        {intro && (
          <Reveal className="self-end lg:pb-2">
            <p className="max-w-xl text-base leading-relaxed text-fg-muted lg:text-lg">{intro}</p>
          </Reveal>
        )}
      </div>
      {children}
    </section>
  );
}

// Grid whose 1px gaps draw the guide lines between cells.
export function CellGrid({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`grid gap-px border-t border-guide bg-guide ${className}`}>{children}</div>;
}
