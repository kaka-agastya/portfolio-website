// ⚡ Bolt: Fetch GitHub stats directly on the server to avoid client-side waterfalls and reduce JS bundle size.
async function getGithubContributions() {
  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { login: process.env.GITHUB_USERNAME },
      }),
      next: { revalidate: 21600 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
  } catch {
    return null;
  }
}

export default async function GithubActivity({ username }: { username: string }) {
  const total = await getGithubContributions();

  return (
    <div className="flex h-full flex-col justify-between gap-6 p-5 sm:p-8 xl:p-10">
      <p className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-fg-muted">
        <span>GitHub Activity</span>
        <span>This year</span>
      </p>

      <p className="font-display text-5xl font-medium tracking-tight tabular-nums">
        {total !== null ? total.toLocaleString("id-ID") : "—"}
        <span className="mt-2 block font-body text-sm font-normal tracking-normal text-fg-muted">contributions</span>
      </p>

      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="GitHub contribution chart"
      >
        {/* ⚡ Bolt: Deferred loading of off-screen chart image to improve initial LCP & bandwidth */}
        <img
          src={`https://ghchart.rshah.org/2448c9/${username}`}
          alt={`${username}'s GitHub contribution chart`}
          className="min-w-[600px]"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}
