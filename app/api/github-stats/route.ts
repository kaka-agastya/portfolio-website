import { NextResponse } from "next/server";

export async function GET() {
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
    return NextResponse.json({ total: null }, { status: 500 });
  }

  const data = await res.json();
  const total =
    data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;

  return NextResponse.json({ total });
}