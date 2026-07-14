## 2025-02-18 - Keyboard Accessibility for Auto-hiding Navigation
**Learning:** Hidden elements (opacity: 0) remain in the tab order, causing keyboard users to focus on invisible links. This violates WCAG 2.4.7 (Focus Visible).
**Action:** Use `focus-within:opacity-100 focus-within:pointer-events-auto` on auto-hiding containers to ensure they reveal themselves when receiving keyboard focus. Also, remember to add `aria-label` to landmark elements like `<nav>` and `aria-current="true"` to explicitly announce active states to screen readers.

## 2026-07-14 - Redundant Alt Text on Icon Links
**Learning:** Decorative icons that are accompanied by visible text descriptions (e.g. "LinkedIn" text next to a LinkedIn logo icon) should not have descriptive alt text. Providing alt text like `alt="linkedin"` causes screen readers to redundantly announce the same link twice ("linkedin image, LinkedIn link").
**Action:** Always set `alt=""` and add `aria-hidden="true"` to images or icons when the exact same content is provided by adjacent visible text within the same link or button element.
