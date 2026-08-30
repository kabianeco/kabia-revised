import type { CSSProperties } from "react";

/**
 * Shared inline style for the out-of-stock badge's outer `<span>`, used by
 * both `components/shop/product-entry.tsx` (shop grid card) and
 * `components/shop/product-detail.tsx` (product detail page) so the two
 * stay in sync automatically.
 *
 * Every property reads a `--theme-stock-badge-*` CSS variable produced by
 * `resolve.ts` (`resolveTheme`), with a literal fallback matching that
 * resolver's own `STOCK_BADGE_DEFAULTS` / `STOCK_BADGE_TONE_VAR` /
 * `STOCK_BADGE_FILL_STYLE` — mirroring the fallback convention already used
 * throughout `app/globals.css` (e.g. `var(--theme-radius-button, 999px)`).
 * The root layout always provides these vars in practice, so the fallback
 * is not currently reachable, but keeping it aligned with the resolver's
 * defaults costs nothing and avoids an unstyled badge if that ever changes.
 *
 * `color` is set here (not just on the inner text span) because the
 * "outline" fill's border is `1px solid currentColor` — without `color` on
 * this same element, `currentColor` would resolve to the page's inherited
 * ink color instead of the badge's chosen tone.
 */
export const STOCK_BADGE_STYLE: CSSProperties = {
  display: "var(--theme-stock-badge-display, inline-block)",
  top: "var(--theme-stock-badge-top, 8px)",
  right: "var(--theme-stock-badge-right, auto)",
  bottom: "var(--theme-stock-badge-bottom, auto)",
  left: "var(--theme-stock-badge-left, 8px)",
  backgroundColor:
    "var(--theme-stock-badge-bg, color-mix(in srgb, var(--color-ivory) 95%, transparent))",
  border: "var(--theme-stock-badge-border, none)",
  borderRadius: "var(--theme-stock-badge-radius, 0px)",
  color: "var(--theme-stock-badge-color, var(--color-clay))",
};

/**
 * Source badge (Kabia Çiftliği / Kabia Seçki / Kabia Mutfak), reusing the
 * out-of-stock badge's exact fill/border/radius/color so the two read as one
 * visual language — no new color token, no new component. Position is
 * pinned to the opposite corner with the same literal fallback values the
 * stock badge uses (top:8px), so the two never sit in the same spot on a
 * product that is both out of stock and carries a source label. This is a
 * static opposite-corner pin, not a themed one: the stock badge's own corner
 * is admin-configurable via the theme engine, so a custom theme that moves it
 * to the right could still collide — an accepted, narrow edge case rather
 * than adding a second themeable position axis for one label.
 */
export const SOURCE_BADGE_STYLE: CSSProperties = {
  ...STOCK_BADGE_STYLE,
  top: "8px",
  right: "8px",
  bottom: "auto",
  left: "auto",
};
