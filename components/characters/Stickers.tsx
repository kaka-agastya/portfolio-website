// Hand-drawn sticker characters: flat fills, thick black outlines, little faces.
type Props = { className?: string };

const stroke = {
  stroke: "#16161d",
  strokeWidth: 4,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

function Face({ x, y, gap = 14, size = 3.2, smile = 7 }: { x: number; y: number; gap?: number; size?: number; smile?: number }) {
  return (
    <g>
      <circle cx={x - gap / 2} cy={y} r={size} className="fill-line" />
      <circle cx={x + gap / 2} cy={y} r={size} className="fill-line" />
      <path d={`M${x - smile / 2} ${y + 7} q${smile / 2} ${smile * 0.6} ${smile} 0`} fill="none" {...stroke} strokeWidth={3} />
    </g>
  );
}

function Blush({ x, y, gap = 26 }: { x: number; y: number; gap?: number }) {
  return (
    <g className="fill-rose" opacity={0.9}>
      <ellipse cx={x - gap / 2} cy={y} rx={4.5} ry={2.6} />
      <ellipse cx={x + gap / 2} cy={y} rx={4.5} ry={2.6} />
    </g>
  );
}

export function StarBuddy({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 8 L60.6 37.4 L91.9 38.4 L67.1 57.6 L75.9 87.6 L50 70 L24.1 87.6 L32.9 57.6 L8.1 38.4 L39.4 37.4 Z"
        className="fill-sun"
        {...stroke}
      />
      <Face x={50} y={50} />
      <Blush x={50} y={60} gap={30} />
    </svg>
  );
}

export function CursorBuddy({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M26 10 L26 82 L44 66 L56 92 L70 85 L58 60 L82 58 Z" className="fill-rose" {...stroke} />
      <Face x={42} y={46} gap={12} size={2.8} smile={6} />
    </svg>
  );
}

export function BoltBuddy({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M60 6 L22 56 L46 56 L38 94 L78 40 L54 40 Z" className="fill-sun" {...stroke} />
      <Face x={50} y={48} gap={10} size={2.6} smile={5} />
    </svg>
  );
}

export function CoffeeBuddy({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path d="M38 26 q-5 -7 0 -14 M52 26 q-5 -7 0 -14" fill="none" {...stroke} strokeWidth={3.5} />
      <path d="M70 46 h5 a11 11 0 0 1 0 22 h-5" fill="none" {...stroke} />
      <path d="M22 36 h48 v38 a14 14 0 0 1 -14 14 h-20 a14 14 0 0 1 -14 -14 z" className="fill-mint" {...stroke} />
      <Face x={46} y={58} />
      <Blush x={46} y={68} gap={28} />
    </svg>
  );
}

// Pixel heart: drawn on a 7×6 grid so it echoes the KAKA loader.
const HEART = [".XX.XX.", "XXXXXXX", "XXXXXXX", ".XXXXX.", "..XXX..", "...X..."];

export function PixelHeart({ className = "" }: Props) {
  return (
    <svg viewBox="-0.3 -0.3 7.6 6.6" className={className} aria-hidden="true">
      {HEART.flatMap((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} className="fill-rose stroke-line" strokeWidth={0.12} />
          ) : null
        )
      )}
    </svg>
  );
}

export function Squiggle({ className = "" }: Props) {
  return (
    <svg viewBox="0 0 120 30" className={className} aria-hidden="true">
      <path d="M4 18 q10 -14 20 0 t20 0 t20 0 t20 0 t20 0 t12 -4" fill="none" {...stroke} />
    </svg>
  );
}
