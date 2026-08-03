## 2024-05-18 - Component Render Optimization
**Learning:** High-frequency state updates (like typing animations using setInterval) placed at the top level of large components cause the entire component tree to re-render repeatedly. In `Hero.tsx`, this meant re-rendering the whole section every 40ms.
**Action:** Isolate high-frequency state updates into their own small components (e.g., `TypewriterText`). This limits the re-render scope strictly to the node that changes, improving performance and reducing unnecessary layout recalculations.

## 2024-05-24 - Eliminating Client-Side Data Fetching Waterfalls with React Server Components (RSC)
**Learning:** Using `useEffect` to fetch data from an internal Next.js API route introduces a client-side waterfall, delays rendering until JS loads/executes, and needlessly increases the JS bundle size.
**Action:** Always fetch data directly in a React Server Component (RSC) when the data fetching does not depend on client-side state, thereby moving the processing to the server, improving LCP, and eliminating the internal API route layer.

## 2024-07-21 - Pushing Client Boundaries to the Leaves
**Learning:** Adding `"use client"` to large layout or section components (like `Hero.tsx` or `Contact.tsx`) forces all their children and the components themselves to be shipped as client-side JavaScript, increasing the JS bundle size unnecessarily when most of the content is static.
**Action:** Extract small interactive pieces (like `useTypewriter` logic or `CopyButton`) into their own tiny Client Components. Keep the larger parent layouts as Server Components. This minimizes the client boundary and significantly reduces the client-side JavaScript bundle size.

## 2023-10-27 - Inline SVGs over External Images for Basic Icons
**Learning:** Using `next/image` to fetch small, basic icons (like GitHub/LinkedIn logos) from external providers (e.g., `img.icons8.com`) introduces unnecessary network latency (DNS lookup, TCP handshake, TLS negotiation for a new origin) and potential layout shift if the image loads slowly. The `next/image` component also has overhead that is disproportionate for simple monochromatic shapes.
**Action:** Always use inline SVGs (or an icon library like `lucide-react` which generates inline SVGs) for basic UI icons. Only use `next/image` and external image providers for actual content images (photos, complex illustrations) where optimization, resizing, and lazy loading provide real value.

## 2024-07-24 - Unblocking Server Streaming with Suspense Boundaries
**Learning:** Fetching external data (like the GitHub GraphQL API in `<GithubActivity />`) inside a React Server Component (RSC) blocks the server from streaming the rest of the UI until the fetch completes. This delays the Time to First Byte (TTFB) and overall First Contentful Paint (FCP) of the entire page if the component is used near the bottom of a long page.
**Action:** Always wrap data-fetching Server Components (especially those calling external APIs) in a `<Suspense>` boundary with a fallback skeleton. This unblocks the server, allowing the rest of the static application shell to stream down to the client immediately while the data finishes loading.

## 2024-11-20 - Replacing Third-Party Animation Libraries with Native CSS and IntersectionObserver
**Learning:** Heavy animation libraries like `framer-motion` significantly increase the client-side JavaScript bundle size. For simple animations like fade-ins, loading spinners, and scroll reveals, this overhead is unjustified and slows down page load times.
**Action:** Replace `framer-motion` with native CSS transitions, Tailwind classes, and native `IntersectionObserver`. This achieves the same visual effects while significantly reducing the JS bundle size and removing third-party dependencies, as demonstrated in `components/Reveal.tsx` and `components/LoadingScreen.tsx`.
## 2026-08-03 - Prevent React re-renders on Typewriter effect
**Learning:** Continuous micro-animations like typewriter effects trigger excessive re-renders if managed via React state.
**Action:** Use `useRef` and direct DOM mutation (`ref.current.textContent`) inside intervals/requestAnimationFrame to update the UI without triggering React's render cycle.
