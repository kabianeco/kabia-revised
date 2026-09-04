/**
 * Kabia's field journal ("Günlük"): dated notes from the orchard — location,
 * weather, orchard state, what was applied, what was observed, what came of
 * it. This is not a database table: entries are written by hand and added
 * here directly, the same way content/homepage.ts holds hand-written site
 * copy rather than reading from Supabase.
 *
 * Empty for now — no real entries exist yet. Per the KABIA 2.0 brief, no
 * placeholder or invented entries are added; /gunluk renders its empty state
 * until the first real one lands here. (The fixture block below is a design
 * preview only — see its own header comment — and does not count as real
 * content.)
 *
 * To add a real entry: append an object matching JournalEntry below. `slug`
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

const PREVIEW_FIXTURES_ENABLED = process.env.NEXT_PUBLIC_KABIA_PREVIEW_FIXTURES === "1"

/**
 * PREVIEW FIXTURE — placeholder journal entries for the Phase 3 design
 * review only. Rendered only when NEXT_PUBLIC_KABIA_PREVIEW_FIXTURES is set
 * (default off — set only in .env.local, never committed). Every field below
 * is invented for layout/density review and says so in-line; none of it is a
 * real field note. Delete this const and the `PREVIEW_FIXTURES_ENABLED`
 * check above it, and restore `export const journalEntries: JournalEntry[] =
 * []`, in the fixture-removal commit named in the preview PR.
 */
const journalFixtures: JournalEntry[] = [
  {
    slug: "ornek-kayit-subat",
    date: "2026-02-11",
    location: "Sabırlar Köyü, Geyve (örnek kayıt)",
    weather: "Ilık, hafif rüzgarlı.",
    orchardState: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    application: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    observation: "Bahçede erken çiçeklenme gözlemlendi (örnek kayıt).",
    outcome: "Bu bir gerçek saha notu değildir; yalnızca tasarım önizlemesidir.",
  },
  {
    slug: "ornek-kayit-mart",
    date: "2026-03-22",
    location: "Sabırlar Köyü, Geyve (örnek kayıt)",
    weather: "Yağmurlu, serin.",
    orchardState: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    application: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    observation: "Toprakta nem seviyesi kontrol edildi (örnek kayıt).",
    outcome: "Bu bir gerçek saha notu değildir; yalnızca tasarım önizlemesidir.",
  },
  {
    slug: "ornek-kayit-mayis",
    date: "2026-05-04",
    location: "Sabırlar Köyü, Geyve (örnek kayıt)",
    weather: "Açık, ılıman.",
    orchardState: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    application: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    observation: "Genç sürgünlerde gelişim gözlemlendi (örnek kayıt).",
    outcome: "Bu bir gerçek saha notu değildir; yalnızca tasarım önizlemesidir.",
  },
  {
    slug: "ornek-kayit-temmuz",
    date: "2026-07-18",
    location: "Sabırlar Köyü, Geyve (örnek kayıt)",
    weather: "Sıcak, kurak.",
    orchardState: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    application: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    observation: "Sulama düzeni gözden geçirildi (örnek kayıt).",
    outcome: "Bu bir gerçek saha notu değildir; yalnızca tasarım önizlemesidir.",
  },
  {
    slug: "ornek-kayit-eylul",
    date: "2026-09-09",
    location: "Sabırlar Köyü, Geyve (örnek kayıt)",
    weather: "Ilık, durgun.",
    orchardState: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    application: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    observation: "Hasat öncesi bahçe durumu değerlendirildi (örnek kayıt).",
    outcome: "Bu bir gerçek saha notu değildir; yalnızca tasarım önizlemesidir.",
  },
  {
    slug: "ornek-kayit-kasim",
    date: "2026-11-02",
    location: "Sabırlar Köyü, Geyve (örnek kayıt)",
    weather: "Serin, rüzgarlı.",
    orchardState: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    application: "Örnek içerik — tasarım önizlemesi için yer tutucu metin.",
    observation: "Kış hazırlığı notları alındı (örnek kayıt).",
    outcome: "Bu bir gerçek saha notu değildir; yalnızca tasarım önizlemesidir.",
  },
]

export const journalEntries: JournalEntry[] = PREVIEW_FIXTURES_ENABLED ? journalFixtures : []
