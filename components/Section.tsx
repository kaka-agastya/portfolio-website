export default function Section({
  id,
  index,
  title,
  children,
}: {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="px-6 lg:px-32 xl:px-40 max-w-content mx-auto py-24 border-t border-line">
      <div className="flex items-baseline gap-4 mb-12">
        <span className="font-mono text-xs text-ink-mute">{index}</span>
        <h2 className="font-display text-2xl lg:text-3xl font-medium tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );
}