## 2024-05-18 - Component Render Optimization
**Learning:** High-frequency state updates (like typing animations using setInterval) placed at the top level of large components cause the entire component tree to re-render repeatedly. In `Hero.tsx`, this meant re-rendering the whole section every 40ms.
**Action:** Isolate high-frequency state updates into their own small components (e.g., `TypewriterText`). This limits the re-render scope strictly to the node that changes, improving performance and reducing unnecessary layout recalculations.

## 2024-05-24 - Eliminating Client-Side Data Fetching Waterfalls with React Server Components (RSC)
**Learning:** Using `useEffect` to fetch data from an internal Next.js API route introduces a client-side waterfall, delays rendering until JS loads/executes, and needlessly increases the JS bundle size.
**Action:** Always fetch data directly in a React Server Component (RSC) when the data fetching does not depend on client-side state, thereby moving the processing to the server, improving LCP, and eliminating the internal API route layer.
## 2026-07-20 - Unnecessary heavy animation library for simple scroll reveals
**Learning:** Using heavy animation libraries like `framer-motion` purely for basic scroll-reveal (fade-in, slide-up) animations is overkill. The library alone can add >100KB to the JavaScript bundle size, which delays hydration and time to interactive.
**Action:** Replace simple `framer-motion` components with native `IntersectionObserver` implementations combined with CSS transitions whenever complex spring physics or gestural animations aren't explicitly required.
