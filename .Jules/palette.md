## 2025-02-12 - Accessible External Links
**Learning:** Icon-only links using Lucide React icons (like `<ExternalLink />`) were missing ARIA labels, creating empty link announcements for screen readers. Unescaped quotes in JSX text content can cause lint/build failures in Next.js apps.
**Action:** Always verify icon-only interactive elements have `aria-label` and `title`. Ensure all JSX text is properly escaped (`&quot;`, `&apos;`). Avoid checking in package manager lock files or scratch scripts created during analysis.
