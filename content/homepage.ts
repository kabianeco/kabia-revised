import { anchors, routes, site } from "@/lib/site";

/**
 * All visible homepage copy lives here, in Turkish.
 * Facts are limited to what the existing Kabia project states:
 * ecological cultivation without chemical fertilizer or pesticide,
 * additive-free products, local production in Geyve/Sakarya, the
 * product names listed on the current site, and the farm-plus-trusted-
 * producers positioning from the KABIA 2.0 brief (Appendix A).
 */

/**
 * The 4-act scroll intro. Act 1: headline + CTAs beside the almond.
 * Acts 2/3: two distinct editorial beats — the almond crosses the stage
 * in front of the text and carries the old message into the new one.
 * Act 4: the shell opens and a hidden paper note unfolds from inside it.
 */
export const intro = {
  act1: {
    eyebrow: `Kabia Ekolojik — ${site.region}`,
    /* Serif italic is applied to the second line in the component. */
    headlineA: "Toprağa saygıyla",
    headlineB: "üretilenler.",
    supporting: "Kendi çiftliğimizden ve güvendiğimiz üreticilerden.",
    primaryCta: { label: "Çiftliği keşfet", href: anchors.farm },
    secondaryCta: { label: "Seçkimizi gör", href: anchors.products },
  },
  /* First editorial beat, set in the secondary (serif italic) voice. */
  act2: {
    kicker: "İzini süreriz",
    text: "Kendi bahçemizde badem yetiştiririz. Bazı ürünleri, güvendiğimiz üreticilerden seçeriz. İkisinde de aynı soruyu sorarız: nasıl üretildi?",
  },
  /* Second editorial beat — more reflective, about time and patience. */
  act3: {
    kicker: "Önce üretici",
    text: "Her ürünü biz üretmiyoruz. Ama üreticisini tanırız, üretim yerini görürüz, nasıl yapıldığını sorarız. Sonra seçeriz.",
  },
  final: {
    /* Broken into two lines for the controlled full-screen setting.
       Character counts are matched closely to the lines they replace —
       this pair is revealed letter-by-letter on a fixed scroll-progress
       timeline (see intro-sequence.tsx), so length changes shift timing. */
    statementA: "Önce üretici.",
    statementB: "Sonra ürün.",
    ctaLabel: "Keşfet",
  },
  /** Read by screen readers in place of the decorative 3D scene. */
  sceneDescription:
    "Dekoratif üç boyutlu badem: sayfa kaydırıldıkça sahnede yer değiştirir, sonunda kabuğu ortadan ikiye açılır ve içine saklanmış kırışık bir kâğıt not açılarak mesajı ortaya çıkarır.",
  /** Brand word shown during the transition to the store. */
  transitionWord: "kabia",
  transitionAnnouncement: "kabia — mağazaya yönlendiriliyorsunuz",
} as const;

export const manifesto = {
  statementA: "Her ürünü biz üretmiyoruz.",
  statementB: "Neden seçtiğimizi biliyoruz.",
  body: "Kendi çiftliğimizde badem yetiştiririz. Güvendiğimiz üreticilerden seçtiğimiz ürünleri bir araya getiririz. Az ama doğru üretmeyi tercih ediyoruz.",
} as const;

/**
 * The homepage introduces the three sources with one product each — it is not a
 * storefront row. Price, stock, badges and purchase controls belong to the shop
 * and the product page, never here.
 *
 * The slugs are curated rather than queried, so the section keeps the same three
 * products regardless of what the catalogue is doing. They are the verified
 * active rows: `kabuklu-badem`, `findik-ici` and `tarhana`. The name recorded
 * here is the short display name; `findik-ici` ships under the name
 * "Kabuklu Fındık", and that existing slug/name mismatch is left alone.
 */
export const products = {
  title: "Ürünler",
  statement: [
    "Bizim toprağımızdan.",
    "Tanıdığımız üreticilerden.",
    "Üreticilerin mutfağından.",
  ],
  intro:
    "Kendi çiftliğimizden ve güvendiğimiz üreticilerden. Üç kaynak, üç ürün; tamamı mağazada.",
  entries: [
    {
      source: "ciftlik",
      sourceName: "Kabia Çiftliği",
      name: "Kabuklu Badem",
      slug: "kabuklu-badem",
      image: "/images/kabia-badem.jpeg",
      alt: "Kabia Çiftliği'nin kendi bahçesinden kabuklu badem",
    },
    {
      source: "secki",
      sourceName: "Kabia Seçki",
      name: "Kabuklu Fındık",
      slug: "findik-ici",
      image: "/images/findik1.jpeg",
      alt: "Güvendiğimiz üreticiden gelen kabuklu fındık",
    },
    {
      source: "mutfak",
      sourceName: "Kabia Mutfak",
      name: "Tarhana",
      slug: "tarhana",
      image: "/images/tarhana1.jpeg",
      alt: "Üreticinin mutfağında geleneksel yöntemle hazırlanan tarhana",
    },
  ],
} as const;

export const origin = {
  title: "Çiftlik",
  eyebrow: "Sabırlar Köyü — Geyve, Sakarya",
  body: [
    "Her şey bir badem bahçesinde başladı.",
    "Geyve'nin Sabırlar köyünde 19 dönümlük bir bahçede, toprağı yalnızca ürün yetiştirilen bir alan olarak değil, yaşayan bir ekosistem olarak görerek üretmeye çalışıyoruz.",
    "19 DÖNÜM · 946 BADEM AĞACI · 1 ÇİFTLİK · 4 MEVSİM",
  ],
  images: [
    {
      src: "/images/orchard-hillside.jpg",
      width: 2047,
      height: 2048,
      alt: "Geyve sırtlarında genç badem bahçesi, arkada vadi ve dağlar",
      caption: "Genç bahçe, Geyve sırtları. Ağaçlar vadiye bakar.",
    },
    {
      src: "/images/field-tractor.jpg",
      width: 1200,
      height: 1600,
      alt: "Badem bahçesinde traktör, arkada sisli dağlar",
      caption: "Bahçe bakımı bize ait; işi yerinde, kendi makinemizle yaparız.",
    },
    {
      src: "/images/orchard-winter.jpg",
      width: 2048,
      height: 2048,
      alt: "Kar altındaki genç badem ağaçları ve bulutlu vadi",
      caption: "Kış. Bahçe uykuda, ağaçlar dinlenir.",
    },
  ],
} as const;

export const process = {
  title: "Bahçeden sofraya",
  intro:
    "Bir Kabia bademi sofraya altı adımda gelir. Her adım aynı elden geçer.",
  steps: [
    {
      name: "Bahçe",
      description:
        "Ağaçlar Geyve'nin yamaçlarında, kimyasal gübre ve ilaç kullanılmadan büyür.",
    },
    {
      name: "Hasat",
      description: "Yeşil kabuk çatlayınca badem toplanmaya hazırdır.",
    },
    {
      name: "Ayıklama",
      description: "Yeşil dış kabuk ayrılır; bademler tek tek gözden geçer.",
    },
    {
      name: "Kurutma",
      description: "Bademler sert kabuğunda, kendi halinde kurumaya bırakılır.",
    },
    {
      name: "Hazırlık",
      description:
        "Çiğ, kavrulmuş ya da ezme — hangi ürün olacaksa katkısız hazırlanır.",
    },
    {
      name: "Sofra",
      description: "Badem, bahçeden çıktığı haliyle size ulaşır.",
    },
  ],
} as const;

export const principles = {
  title: "Yaklaşım",
  items: [
    {
      name: "Kimyasalsız bahçe",
      description:
        "Kendi bahçemizde kimyasal gübre ve ilaç kullanmıyoruz. Ekolojik tarım bizim için bir etiket değil, çalışma biçimi.",
    },
    {
      name: "Katkısız ürün",
      description:
        "Ürünlerimize katkı maddesi eklemeyiz — kendi ürettiklerimizde de, seçtiğimiz üreticilerin ürünlerinde de.",
    },
    {
      name: "Üreticiyi tanırız",
      description:
        "Sattığımız her ürünün nereden, nasıl ve kim tarafından üretildiğini biliriz.",
    },
  ],
} as const;

export const editorialImage = {
  src: "/images/almonds-drying.jpg",
  width: 2200,
  height: 1466,
  alt: "Hasat edilmiş kabuklu bademler, sepetin yanında yığın halinde kuruyor",
  caption: "Hasat sonrası. Bademler kabuğunda, kendi halinde kurur.",
} as const;

/**
 * Verbatim brand statement carried over from the existing Kabia site's
 * about section — not a fabricated testimonial.
 */
export const quote = {
  text: "Doğanın bize sunduğu en değerli hediyelerden biri olan bademi, en saf ve doğal haliyle sizlere ulaştırıyoruz.",
  attribution: "Kabia Ekolojik",
  context: "Kuruluş metninden",
} as const;

export const finalCta = {
  titleA: "Toprakla başlayan",
  titleB: "bir hikâye.",
  body: "Kendi çiftliğimizden ve güvendiğimiz üreticilerden.",
  cta: { label: "Mağazaya Git", href: routes.store },
  image: {
    src: "/images/almonds-net.jpg",
    alt: "File içinde kabuklu Kabia bademleri",
  },
} as const;
