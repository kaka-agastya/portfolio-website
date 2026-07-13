## 2025-02-18 - Keyboard Accessibility for Auto-hiding Navigation
**Learning:** Hidden elements (opacity: 0) remain in the tab order, causing keyboard users to focus on invisible links. This violates WCAG 2.4.7 (Focus Visible).
**Action:** Use `focus-within:opacity-100 focus-within:pointer-events-auto` on auto-hiding containers to ensure they reveal themselves when receiving keyboard focus. Also, remember to add `aria-label` to landmark elements like `<nav>` and `aria-current="true"` to explicitly announce active states to screen readers.
