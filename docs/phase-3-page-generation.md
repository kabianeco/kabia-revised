# Phase 3 — page generation: audit & accepted deviations

Audit of `bf2a8f1` (producer profiles, Kabia Standardı, journal, farm and soil
pages) against the Phase 3 brief's §3.0 build constraints (zero new
components, zero new CSS, zero new dependencies, zero new design decisions)
and §3E self-audit checklist.

## Result

Clean except for one accepted deviation. `package.json` diff empty, no file
under `components/ui/`, `tailwind.config.*`, `globals.css`, or the font config
touched, every arbitrary Tailwind value in the diff (`leading-[1.08]`,
`max-w-[42rem]`, `aspect-[16/9]`, `scale-[1.04]`, `min-h-[50vh]`) is a
byte-for-byte match to a value already in use before this commit (mostly
`app/blog/*`), build passes clean, header nav grew by exactly 2 items.

## Accepted deviation: `components/producers/producer-card.tsx`

**What:** one new component file, in the letter contradicting §3.0's "zero
new components."

**Why accepted:** mechanically diffed against `components/blog/post-card.tsx`
— every differing line is a data-field reference (`producer.name` vs.
`post.title`, etc.) or a contextual copy string; every Tailwind class,
spacing value, and prop shape is identical. It introduces zero new design
decisions, and it follows the codebase's own pre-existing convention of one
card component per content-type grid (`BlogPostCard`, `ProductEntry` are
likewise separate files with the same duplicated-markup shape).

**Scope of this exception — read narrowly:** *a new component that is a
byte-level clone of an existing card pattern, differing only in the data
fields it renders, is permitted.* This is not precedent for any other new
component. A component that introduces a new layout, new class, new prop
shape, or new interaction still requires simplifying the page to fit the
existing inventory, per §3.0.

**Confirmed scope:** `producer-card.tsx` is the only new file under
`components/` in Phase 3 (`cb80691→bf2a8f1`) and remains the only one through
Phase 4 (`cb80691→5c3d713`).

## Open item: header nav vs. empty content

`/ureticiler` (producers table empty) and `/gunluk` (`journalEntries = []`)
were both added to the 2-item header nav cap while rendering empty states.
See recommendation in conversation — pending decision.
