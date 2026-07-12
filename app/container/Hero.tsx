'use client'
import { profile } from "@/data/cv";
import { ArrowDownRight } from "lucide-react";
import { useEffect, useState } from "react";

function useTypewriter(text: string, speed = 40) {
  const [display, setDisplay] = useState("");
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);
  return display;
}

export default function Hero() {
  const typed = useTypewriter(profile.role);
  return (
    <section id="intro" className="min-h-screen flex flex-col justify-center px-6 lg:px-32 xl:px-40 max-w-content mx-auto">

      <div className="fade-up border border-line rounded-b-md rounded-tr-md p-8 lg:p-14 bg-white">
        <p className="font-mono text-xs text-ink-mute mb-6">
          <span className="text-ink">const</span> role <span className="text-ink">=</span>{" "}
          <span className="text-ink-soft">&quot;{typed}&quot;</span>
          <span className="caret">▍</span>
        </p>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-balance leading-[1.05]">
          {profile.name}
        </h1>

        <p className="mt-8 max-w-2xl text-ink-soft text-base lg:text-lg leading-relaxed">
          {profile.summary}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 font-mono text-sm border border-ink px-5 py-3 rounded-md hover:bg-ink hover:text-white transition-colors"
          >
            View experience <ArrowDownRight size={16} />
          </a>
          <span className="font-mono text-xs text-ink-mute">{profile.location}</span>
        </div>
      </div>
    </section>
  );
}