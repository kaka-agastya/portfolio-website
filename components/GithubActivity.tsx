"use client";
import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

export default function GithubActivity({ username }: { username: string }) {
  const [total, setTotal] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // ⚡ Bolt Optimization: Defer fetching the GitHub stats API
  // and rendering the image until the component is about to enter the viewport (200px margin).
  // This prioritizes critical network requests and rendering during the initial page load.
  const isInView = useInView(ref, { once: true, margin: "200px" });

  useEffect(() => {
    if (!isInView) return;

    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, [isInView]);

  return (
    <div ref={ref} className="border border-line rounded-md p-6 lg:p-8">
      <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
        <p className="font-mono text-[11px] uppercase tracking-wide text-ink-mute">
          GitHub Activity
        </p>
        <p className="font-mono text-sm text-ink">
          {total !== null ? (
            <>
              <span className="font-medium">{total.toLocaleString("id-ID")}</span> contributions this year
            </>
          ) : (
            <span className="text-ink-mute">Loading...</span>
          )}
        </p>
      </div>

      <div className="overflow-x-auto">
        {isInView ? (
          <img
            src={`https://ghchart.rshah.org/0A0A0A/${username}`}
            alt={`${username}'s GitHub contribution chart`}
            className="min-w-[600px]"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="min-w-[600px] h-[100px]" />
        )}
      </div>
    </div>
  );
}
