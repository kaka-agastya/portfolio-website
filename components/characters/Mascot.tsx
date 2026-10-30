"use client";
import { useRef } from "react";
import { gsap, useGSAP, onIntroDone, prefersReducedMotion } from "@/lib/gsap";

type Fill = "sun" | "rose" | "mint" | "cobalt" | "paper";

export type MascotProps = {
  pose?: "wave" | "mail";
  expression?: "happy" | "wink";
  accessory?: "headphones" | "cap" | "none";
  head?: Fill;
  body?: Fill;
  // Pop in after the loader instead of on scroll.
  intro?: boolean;
  className?: string;
};

const FILL: Record<Fill, string> = {
  sun: "fill-sun",
  rose: "fill-rose",
  mint: "fill-mint",
  cobalt: "fill-cobalt",
  paper: "fill-paper",
};

const STROKE: Record<Fill, string> = {
  sun: "stroke-sun",
  rose: "stroke-rose",
  mint: "stroke-mint",
  cobalt: "stroke-cobalt",
  paper: "stroke-paper",
};

const line = { stroke: "#16161d", strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// Outlined limb: a thick black stroke with a thinner coloured stroke on top.
function Limb({ d, fill }: { d: string; fill: Fill }) {
  return (
    <g fill="none">
      <path d={d} {...line} strokeWidth={15} />
      <path d={d} className={STROKE[fill]} strokeWidth={8} strokeLinecap="round" />
    </g>
  );
}

// "Monitor buddy": a frontend dev with a screen for a face.
export default function Mascot({
  pose = "wave",
  expression = "happy",
  accessory = "headphones",
  head = "sun",
  body = "cobalt",
  intro,
  className = "",
}: MascotProps) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);

      const enter = gsap.from(el, {
        y: 60,
        scale: 0.6,
        rotate: -8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.8)",
        transformOrigin: "50% 100%",
        paused: true,
        scrollTrigger: intro ? undefined : { trigger: el, start: "top 90%", once: true },
      });
      const stop = intro ? onIntroDone(() => enter.play()) : () => {};
      if (!intro) enter.play();

      // Idle: gentle bob, waving arm, periodic blink.
      gsap.to(q("[data-bob]"), { y: -6, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
      if (pose === "wave") {
        gsap.fromTo(
          q("[data-arm]"),
          { rotate: -12 },
          { rotate: 18, duration: 0.45, ease: "sine.inOut", yoyo: true, repeat: -1, repeatDelay: 0.1, svgOrigin: "150 168" }
        );
      } else {
        gsap.to(q("[data-arm]"), { rotate: -6, duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: -1, svgOrigin: "150 168" });
      }
      const blink = gsap.timeline({ repeat: -1, repeatDelay: 2.6 });
      blink.to(q("[data-eye]"), { scaleY: 0.1, duration: 0.08, transformOrigin: "50% 50%", yoyo: true, repeat: 1 });

      // Eyes and head follow the pointer.
      const eyeX = gsap.quickTo(q("[data-eyes]"), "x", { duration: 0.4, ease: "power3.out" });
      const eyeY = gsap.quickTo(q("[data-eyes]"), "y", { duration: 0.4, ease: "power3.out" });
      // quickTo needs GSAP's internal name ("rotation"), not the "rotate" alias.
      gsap.set(q("[data-head]"), { svgOrigin: "110 140" });
      const tilt = gsap.quickTo(q("[data-head]"), "rotation", { duration: 0.8, ease: "power3.out" });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const dx = gsap.utils.clamp(-1, 1, (e.clientX - (r.left + r.width / 2)) / (window.innerWidth / 2));
        const dy = gsap.utils.clamp(-1, 1, (e.clientY - (r.top + r.height * 0.3)) / (window.innerHeight / 2));
        eyeX(dx * 9);
        eyeY(dy * 6);
        tilt(dx * 5);
      };
      window.addEventListener("pointermove", move);

      return () => {
        stop();
        window.removeEventListener("pointermove", move);
      };
    },
    { scope: ref, dependencies: [pose] }
  );

  const rightArm =
    pose === "wave" ? "M150 168 q26 -8 30 -44" : "M150 168 q18 10 15 32";

  return (
    <svg ref={ref} viewBox="0 0 220 262" className={className} aria-hidden="true">
      {/* Shadow */}
      <ellipse cx={110} cy={252} rx={58} ry={7} className="fill-line" opacity={0.15} />

      <g data-bob>
        {/* Legs + shoes */}
        <Limb d="M94 212 v26" fill="paper" />
        <Limb d="M126 212 v26" fill="paper" />
        <rect x={78} y={234} width={30} height={14} rx={7} className="fill-line" />
        <rect x={112} y={234} width={30} height={14} rx={7} className="fill-line" />

        {/* Left arm */}
        <Limb d="M70 168 q-22 12 -24 38" fill={body} />
        <circle cx={46} cy={208} r={9} className="fill-paper" {...line} strokeWidth={4} />

        {/* Body with a </> on the chest */}
        <rect x={68} y={148} width={84} height={72} rx={22} className={FILL[body]} {...line} strokeWidth={4} />
        <path d="M98 174 l-9 9 l9 9 M122 174 l9 9 l-9 9 M114 170 l-8 26" fill="none" className="stroke-paper" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />

        {/* Right arm (animated) */}
        <g data-arm>
          <Limb d={rightArm} fill={body} />
          {pose === "wave" ? (
            <circle cx={180} cy={122} r={10} className="fill-paper" {...line} strokeWidth={4} />
          ) : (
            <g>
              {/* Envelope held by its left edge */}
              <g transform="rotate(8 184 206)">
                <rect x={162} y={190} width={46} height={32} rx={4} className="fill-paper" {...line} strokeWidth={4} />
                <path d="M164 193 l21 15 l21 -15" fill="none" {...line} strokeWidth={3.5} />
              </g>
              <circle cx={165} cy={200} r={9} className="fill-paper" {...line} strokeWidth={4} />
            </g>
          )}
        </g>

        {/* Neck */}
        <rect x={100} y={130} width={20} height={22} rx={4} className="fill-paper" {...line} strokeWidth={4} />

        {/* Head: a monitor */}
        <g data-head>
          {accessory === "headphones" && (
            <path d="M38 78 q0 -66 72 -66 q72 0 72 66" fill="none" {...line} strokeWidth={9} />
          )}
          <rect x={40} y={30} width={140} height={104} rx={20} className={FILL[head]} {...line} strokeWidth={4} />
          <rect x={54} y={44} width={112} height={76} rx={12} className="fill-line" />
          {/* Screen glare */}
          <path d="M62 56 h18 M62 64 h8" className="stroke-paper" strokeWidth={3} strokeLinecap="round" opacity={0.35} />

          <g data-eyes>
            <rect data-eye x={80} y={66} width={13} height={18} rx={2} className="fill-mint" />
            {expression === "wink" ? (
              <path d="M126 76 h14" className="stroke-mint" strokeWidth={5} strokeLinecap="round" />
            ) : (
              <rect data-eye x={127} y={66} width={13} height={18} rx={2} className="fill-mint" />
            )}
            <path d="M96 98 q14 11 28 0" fill="none" className="stroke-mint" strokeWidth={4.5} strokeLinecap="round" />
            <rect x={70} y={92} width={10} height={5} rx={2.5} className="fill-rose" opacity={0.85} />
            <rect x={140} y={92} width={10} height={5} rx={2.5} className="fill-rose" opacity={0.85} />
          </g>

          {accessory === "headphones" && (
            <>
              <rect x={24} y={64} width={22} height={40} rx={9} className="fill-rose" {...line} strokeWidth={4} />
              <rect x={174} y={64} width={22} height={40} rx={9} className="fill-rose" {...line} strokeWidth={4} />
            </>
          )}
          {accessory === "cap" && (
            <g>
              {/* Brim pokes out to the side; the crown covers its base */}
              <path d="M150 32 Q194 24 210 40 Q192 50 150 44 Z" className="fill-rose" {...line} strokeWidth={4} />
              <path d="M38 44 Q38 10 110 10 Q182 10 182 44 Z" className="fill-rose" {...line} strokeWidth={4} />
              <path d="M110 12 V42 M76 18 Q70 30 72 42 M144 18 Q150 30 148 42" fill="none" {...line} strokeWidth={2.5} opacity={0.45} />
              <circle cx={110} cy={10} r={5.5} className="fill-line" />
            </g>
          )}
        </g>
      </g>
    </svg>
  );
}
