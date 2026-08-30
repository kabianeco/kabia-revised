/**
 * Kabia's field journal ("Günlük"): dated notes from the orchard — location,
 * weather, orchard state, what was applied, what was observed, what came of
 * it. This is not a database table: entries are written by hand and added
 * here directly, the same way content/homepage.ts holds hand-written site
 * copy rather than reading from Supabase.
 *
 * Empty for now — no real entries exist yet. Per the KABIA 2.0 brief, no
 * placeholder or invented entries are added; /gunluk renders its empty state
 * until the first real one lands here.
 *
 * To add an entry: append an object matching JournalEntry below. `slug`
 * becomes the /gunluk/[slug] URL and must be unique.
 */

export interface JournalEntry {
  slug: string
  /** ISO date, e.g. "2026-03-14". */
  date: string
  location: string
  weather: string
  orchardState: string
  application: string
  observation: string
  outcome: string
}

export const journalEntries: JournalEntry[] = []
