import type { Producer } from "@/lib/producers"

/**
 * PREVIEW FIXTURE — placeholder producer profiles for the Phase 3 design
 * review only. Used only as a fallback in app/ureticiler/page.tsx and
 * app/ureticiler/[slug]/page.tsx, and only when
 * NEXT_PUBLIC_KABIA_PREVIEW_FIXTURES is set (default off — set only in
 * .env.local, never committed) and the real `producers` query returns
 * nothing. lib/producers.ts itself is untouched — the real query path is
 * unaffected when the flag is off.
 *
 * Every producer below is invented for layout/density review and says so
 * in its own `story` field. No certificates or inputs are fabricated
 * (both left null) and no name is presented as a real business or person.
 * Delete this file and its two call sites (grep
 * `producerFixtures`) in the fixture-removal commit named in the preview PR.
 */
export const producerFixtures: Producer[] = [
  {
    id: "fixture-01",
    slug: "ornek-uretici-zeytinyagi",
    name: "Örnek Üretici — Zeytinyağı",
    productType: "Zeytinyağı",
    region: "Örnek bölge, Ege",
    photoUrl: "/images/orchard-hillside.jpg",
    story:
      "Bu profil, Phase 3 sayfa tasarımını incelemek için hazırlanmış örnek içeriktir; gerçek bir üretici veya işletmeyi temsil etmez.",
    productionPlace: "Örnek üretim alanı bilgisi (tasarım önizlemesi).",
    method: "Örnek üretim yöntemi bilgisi (tasarım önizlemesi).",
    inputs: null,
    certificates: null,
    whySelected: "Örnek seçilme gerekçesi metni (tasarım önizlemesi).",
    createdAt: "2026-01-01T00:00:00Z",
  },
  {
    id: "fixture-02",
    slug: "ornek-uretici-bal",
    name: "Örnek Üretici — Bal",
    productType: "Bal",
    region: "Örnek bölge, Karadeniz",
    photoUrl: null,
    story:
      "Bu profil, Phase 3 sayfa tasarımını incelemek için hazırlanmış örnek içeriktir; gerçek bir üretici veya işletmeyi temsil etmez.",
    productionPlace: "Örnek üretim alanı bilgisi (tasarım önizlemesi).",
    method: "Örnek üretim yöntemi bilgisi (tasarım önizlemesi).",
    inputs: null,
    certificates: null,
    whySelected: "Örnek seçilme gerekçesi metni (tasarım önizlemesi).",
    createdAt: "2026-01-02T00:00:00Z",
  },
  {
    id: "fixture-03",
    slug: "ornek-uretici-kuru-meyve",
    name: "Örnek Üretici — Kuru Meyve",
    productType: "Kuru meyve",
    region: "Örnek bölge, Ege",
    photoUrl: null,
    story:
      "Bu profil, Phase 3 sayfa tasarımını incelemek için hazırlanmış örnek içeriktir; gerçek bir üretici veya işletmeyi temsil etmez.",
    productionPlace: "Örnek üretim alanı bilgisi (tasarım önizlemesi).",
    method: "Örnek üretim yöntemi bilgisi (tasarım önizlemesi).",
    inputs: null,
    certificates: null,
    whySelected: "Örnek seçilme gerekçesi metni (tasarım önizlemesi).",
    createdAt: "2026-01-03T00:00:00Z",
  },
  {
    id: "fixture-04",
    slug: "ornek-uretici-peynir",
    name: "Örnek Üretici — Peynir",
    productType: "Peynir",
    region: "Örnek bölge, Trakya",
    photoUrl: "/images/orchard-hillside.jpg",
    story:
      "Bu profil, Phase 3 sayfa tasarımını incelemek için hazırlanmış örnek içeriktir; gerçek bir üretici veya işletmeyi temsil etmez.",
    productionPlace: "Örnek üretim alanı bilgisi (tasarım önizlemesi).",
    method: "Örnek üretim yöntemi bilgisi (tasarım önizlemesi).",
    inputs: null,
    certificates: null,
    whySelected: "Örnek seçilme gerekçesi metni (tasarım önizlemesi).",
    createdAt: "2026-01-04T00:00:00Z",
  },
  {
    id: "fixture-05",
    slug: "ornek-uretici-zeytin",
    name: "Örnek Üretici — Sofralık Zeytin",
    productType: "Sofralık zeytin",
    region: "Örnek bölge, Marmara",
    photoUrl: null,
    story:
      "Bu profil, Phase 3 sayfa tasarımını incelemek için hazırlanmış örnek içeriktir; gerçek bir üretici veya işletmeyi temsil etmez.",
    productionPlace: "Örnek üretim alanı bilgisi (tasarım önizlemesi).",
    method: "Örnek üretim yöntemi bilgisi (tasarım önizlemesi).",
    inputs: null,
    certificates: null,
    whySelected: "Örnek seçilme gerekçesi metni (tasarım önizlemesi).",
    createdAt: "2026-01-05T00:00:00Z",
  },
  {
    id: "fixture-06",
    slug: "ornek-uretici-recel",
    name: "Örnek Üretici — Reçel",
    productType: "Reçel",
    region: "Örnek bölge, Ege",
    photoUrl: null,
    story:
      "Bu profil, Phase 3 sayfa tasarımını incelemek için hazırlanmış örnek içeriktir; gerçek bir üretici veya işletmeyi temsil etmez.",
    productionPlace: "Örnek üretim alanı bilgisi (tasarım önizlemesi).",
    method: "Örnek üretim yöntemi bilgisi (tasarım önizlemesi).",
    inputs: null,
    certificates: null,
    whySelected: "Örnek seçilme gerekçesi metni (tasarım önizlemesi).",
    createdAt: "2026-01-06T00:00:00Z",
  },
]
