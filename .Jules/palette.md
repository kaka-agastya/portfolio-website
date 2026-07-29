## 2025-02-18 - Keyboard Accessibility for Auto-hiding Navigation
**Learning:** Hidden elements (opacity: 0) remain in the tab order, causing keyboard users to focus on invisible links. This violates WCAG 2.4.7 (Focus Visible).
**Action:** Use `focus-within:opacity-100 focus-within:pointer-events-auto` on auto-hiding containers to ensure they reveal themselves when receiving keyboard focus. Also, remember to add `aria-label` to landmark elements like `<nav>` and `aria-current="true"` to explicitly announce active states to screen readers.

## 2026-07-14 - Redundant Alt Text on Icon Links
**Learning:** Decorative icons that are accompanied by visible text descriptions (e.g. "LinkedIn" text next to a LinkedIn logo icon) should not have descriptive alt text. Providing alt text like `alt="linkedin"` causes screen readers to redundantly announce the same link twice ("linkedin image, LinkedIn link").
**Action:** Always set `alt=""` and add `aria-hidden="true"` to images or icons when the exact same content is provided by adjacent visible text within the same link or button element.

## 2025-02-23 - Accessible External Links
**Learning:** When adding `target="_blank"` to external links, it's crucial to inform screen readers about this behavior to avoid unexpectedly taking visually impaired users out of context. The `aria-label` attribute and visually hidden elements (`<span className="sr-only">`) are highly effective tools for adding this context natively without cluttering the visible UI.
**Action:** Always append `(opens in a new tab)` context to the `aria-label` or via a screen-reader only visually hidden `span` for all newly added or encountered external `target="_blank"` links in future UX updates.

## 2025-02-23 - Respecting User Preference with Copy Micro-Interactions
**Learning:** Forcing actions like opening unconfigured mail applications (via `mailto:`) can frustrate users and break their workflow. Users often prefer copying the contact details to use in their preferred platform.
**Action:** Provide "Copy to clipboard" buttons alongside contact links using the `opacity-0 group-hover:opacity-100 focus-visible:opacity-100` pattern. This keeps the UI uncluttered on desktop, accessible via keyboard, and explicitly clear for touch users.

## 2026-07-17 - Accessible Typewriter Effects
**Learning:** Typewriter animations that update the DOM character by character cause screen readers to announce fragmented, repetitive text, creating a confusing experience.
**Action:** Always add `aria-hidden="true"` to visually animated text elements and provide a visually hidden (`sr-only`) element containing the full, completed string adjacent to it so screen readers can announce the context smoothly.

## 2025-02-23 - Keyboard Accessibility for Scrollable Regions
**Learning:** Elements styled with CSS `overflow: auto` or `overflow: scroll` that do not contain any naturally focusable elements inside them (like links or buttons) cannot be scrolled by keyboard-only users.
**Action:** Always add `tabIndex={0}`, `role="region"`, and an appropriate `aria-label` to overflow scroll containers so they receive focus and announce their purpose to screen readers.

## 2024-07-22 - Multi-modal Interactive Feedback & Motion Safety
**Learning:** Copy-to-clipboard actions often lack sufficient feedback, especially for screen reader users and those relying on tactile/visual cues. Relying only on an icon change is insufficient. Also, global `scroll-smooth` can cause discomfort for users with vestibular motion disorders.
**Action:** When creating interactive elements like copy buttons, always provide multi-modal feedback: visual tactile (e.g. `active:scale-95`), dynamic a11y labels (`aria-label`, `title`), and explicit screen reader announcements (`aria-live="polite"`). Also, always prefer `motion-safe:scroll-smooth` over just `scroll-smooth` to respect OS-level `prefers-reduced-motion` settings.

## 2025-02-23 - Color Contrast for Muted Text
**Learning:** Using overly light grays (like `#9A9A9A` on `#FFFFFF`, contrast 2.8:1) for secondary text (dates, locations, footers) causes accessibility failures and makes content hard to read for users with low vision.
**Action:** Always ensure that even "muted" or "soft" text colors meet the WCAG AA minimum contrast ratio of 4.5:1 against their background. For white backgrounds, grays should generally be `#737373` or darker.

## 2026-07-18 - Block Link / Expanded Click Area Pattern
**Learning:** Expanding the click area of a link within a card improves the user experience by providing a larger target for pointing devices and touch interactions. However, just wrapping the entire card in an anchor tag can sometimes be semantically problematic (e.g., if there's other interactive content, or for nested semantics). Using an absolutely positioned empty `<span>` inside the `<a>` tag and scoping it with `relative` on the container expands the click hit area seamlessly.
**Action:** Use the `<span className="absolute inset-0 z-10" aria-hidden="true"></span>` pattern inside links to expand their hit area to their nearest `relative` positioned container. Always handle keyboard focus by removing it from the hidden anchor (`focus:outline-none`) and moving the outline to the container itself (using Tailwind's `has-[:focus-visible]:outline` variants) to maintain WCAG 2.4.7 visible focus.

## 2025-02-23 - Skip to main content Links & Document Semantics
**Learning:** For a "Skip to main content" link to work correctly and meet accessibility guidelines, the `<nav>` elements should reside outside the `<main>` element, otherwise the skipped region includes navigation. Additionally, when linking to the main content wrapper (e.g., `<main id="main-content">`), the target element must have `tabIndex={-1}` so it can receive programmatic focus and an outline style reset (like `outline-none`) to prevent visual focus rings.
**Action:** Always place `<nav>` components outside the target of skip links (typically `<main>`), and ensure the skip link's target element has `tabIndex={-1}` and outline reset classes to correctly and seamlessly manage focus shifts.
