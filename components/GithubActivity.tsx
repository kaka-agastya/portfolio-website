"use client";
import { useEffect, useState } from "react";

export default function GithubActivity({ username }: { username: string }) {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/github-stats")
      .then((res) => res.json())
      .then((data) => setTotal(data.total))
      .catch(() => setTotal(null));
  }, []);

  return (
    <div className="border border-line rounded-md p-6 lg:p-8">
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
        <img
          src={`https://ghchart.rshah.org/0A0A0A/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          className="min-w-[600px]"
        />
      </div>
    </div>
  );
}