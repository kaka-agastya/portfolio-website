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

## 2026-07-21 - Native Tooltips vs Custom Tooltips for Icon Buttons
**Learning:** Icon-only interactive buttons require both visual and non-visual feedback for success states. Relying on the native browser `title` attribute provides a suboptimal visual experience (it's slow to appear and unstyled), and does not guarantee screen reader feedback upon action completion.
**Action:** Replace native `title` tooltips with custom CSS-based tooltips that appear instantly on hover/focus. Additionally, ensure actions like 'Copy to clipboard' utilize an `aria-live="polite"` region to explicitly announce success to screen readers.
