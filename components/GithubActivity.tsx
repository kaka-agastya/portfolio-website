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

      <div
        className="overflow-x-auto"
        tabIndex={0}
        role="region"
        aria-label="GitHub contribution chart"
      >
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
