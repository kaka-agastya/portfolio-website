type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "accent" | "outline";
  external?: boolean;
  className?: string;
};

const VARIANTS = {
  primary: "bg-line text-paper hover:bg-sun hover:text-line",
  accent: "bg-sun text-line hover:bg-rose",
  outline: "bg-paper text-line hover:bg-mint",
};

// Chunky outlined button that lifts toward its shadow on hover and presses flat on click.
export default function Button({ href, children, variant = "primary", external, className = "" }: Props) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border-2 border-line px-5 text-sm font-medium whitespace-nowrap transition-[transform,box-shadow,background-color,color] duration-200 ease-out hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-brutal active:translate-x-0 active:translate-y-0 active:shadow-none ${VARIANTS[variant]} ${className}`}
    >
      {children}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}
