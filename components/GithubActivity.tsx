"use client";
import { useEffect, useState, useRef } from "react";

export default function GithubActivity({ username }: { username: string }) {
  const [total, setTotal] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, [isVisible]);

  return (
    <div ref={containerRef} className="border border-line rounded-md p-6 lg:p-8">
      {/* ⚡ Bolt: Deferred API request for GitHub stats until the component is near viewport to save bandwidth and improve initial load time */}
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
        {/* ⚡ Bolt: Deferred loading of off-screen chart image to improve initial LCP & bandwidth */}
        <img
          src={`https://ghchart.rshah.org/0A0A0A/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          className="min-w-[600px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}