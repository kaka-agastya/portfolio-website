## 2024-05-18 - Component Render Optimization
**Learning:** High-frequency state updates (like typing animations using setInterval) placed at the top level of large components cause the entire component tree to re-render repeatedly. In `Hero.tsx`, this meant re-rendering the whole section every 40ms.
**Action:** Isolate high-frequency state updates into their own small components (e.g., `TypewriterText`). This limits the re-render scope strictly to the node that changes, improving performance and reducing unnecessary layout recalculations.
