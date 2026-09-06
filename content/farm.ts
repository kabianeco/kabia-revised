/** Authoritative copy: kabia-2.0/app/emanet/page.tsx (opening/principles);
 * kabia-2.0/app/ciftlikten/page.tsx (timeline only). No emanet year notes. */
export const farmOpening = {
  "eyebrow": "Emanet",
  "title": "Toprağı emanet gibi görüyoruz.",
  "body": "Bu toprak bize ait değil. Bizden sonrakilere bırakacağımız bir emanet. Hızlı değil, doğru ve kalıcı üretmek — her hasat bir sonraki yılın toprağına bırakılan nottur."
} as const;
export const farmPrinciples = [
  "Önce toprak, sonra ağaç.",
  "Toprağı sürmüyoruz.",
  "Otları biçmiyoruz.",
  "Dışarıdan girdi yok — organik sertifikalı bile olsa gübre almıyoruz.",
  "Tüm girdiler doğadan ve kendi bahçemizden: kompost, kompost gübresi, kompost çayı.",
  "Doğayı kontrol etmiyoruz, taklit ediyoruz.",
  "Her paket hasat tarihli — ne zaman, nereden, kimden."
] as const;
export interface FarmState { id: string; year: string; substep?: string; eyebrow: string; heading: string; paragraphs: readonly string[]; image: string; imageAlt: string }
export const farmTimeline: readonly FarmState[] = [
  {
    "id": "2019",
    "year": "2019",
    "eyebrow": "2019 KASIM — OLMAZ DENİLENİ YAPMAK",
    "heading": "Burada badem olmaz dediler. Biz toprağa kulak verdik.",
    "paragraphs": [
      "2019 Kasım, Sabırlar. Hasat sonrası anızda tek bir meşe, uzakta kavaklar. Boş sanılan bu yamaç için “burada badem tutmaz” deniyordu. Bizim niyetimiz yapılmayanı denemekti — verim cetveline değil, toprağın kendi hafızasına güvenmek. O gün anızın üzerine düşen gölgemizle ilk kez sürmeye değil, dinlemeye geldik.",
      "O kışı analize, rüzgara ve don çukurlarını öğrenmeye ayırdık. Bir yıl boyunca tek bir fidan dikmeden yalnızca gözlemledik. Çünkü Kabia’da hikaye fidanla değil, toprakla başlar. Bu sessiz tarla iki yıl sonra 946 Marinada ile tanışacaktı — cesaret o gün, bu anızda filizlendi."
    ],
    "image": "/images/resim22.jpg",
    "imageAlt": "2019 Kasım — Bahçe kurulmadan önce, Sabırlar"
  },
  {
    "id": "2021",
    "year": "2021",
    "eyebrow": "2021 TEMMUZ — 946 FİDAN TOPRAKLA BULUŞTU",
    "heading": "946 çukur, 946 söz.",
    "paragraphs": [
      "2019’da dinlediğimiz o boş yamaç, iki yaz sonra Temmuz sıcağında tek tek can buldu. Her çukur elle açıldı, her Marinada kökleri incitmeden yerleştirildi, can suyu aynı gün verildi. “Olmaz” denilen yamaç, o gün ilk kez bahçe oldu.",
      "O yaz suyu değil, sabrı konuştuk. Tutmayan fidanı gece suladık, tutanı sessizce izledik. 946 fidan aynı anda büyümedi — kimi erken uyandı, kimi bir mevsim bekledi. Ama hepsi aynı toprağı paylaştı, aynı rüzgarı duydu. Bu dikim bir hasat değil, bir emanetin toprağa bırakılışıydı."
    ],
    "image": "/images/marina-ilk-dikim.jpeg",
    "imageAlt": "2021 Temmuz — 946 Marinada fidan dikimi"
  },
  {
    "id": "2022",
    "year": "2022",
    "eyebrow": "2022 MAYIS — BAHÇE UYANDI",
    "heading": "Bir kış sonra, yamaç yeşile durdu.",
    "paragraphs": [
      "Temmuz’un çelimsiz fidanları bir kışı atlatıp Mayıs’ta taze sürgün verdi. Önde tek bir Marinada, arkasında sıra sıra genç ağaçlar — hepsi kazıklarında, rüzgarla birlikte salınıyor. Altlarında biçmediğimiz otlar ve ilk kır çiçekleri: örtüyü korumanın, toprağa emaneti hatırlatmanın sessiz ödülü.",
      "O bahar hiçbir fidanın yerini değiştirmedik. Sadece izledik. Hangisinin erken uyandığını, hangisinin rüzgarda yattığını not ettik. Bahçe bize acele etmemeyi öğretiyordu — bir yıl sonra artık boş bir tarla değil, nefes alan bir yamaç vardı Kılıçkaya’da."
    ],
    "image": "/images/marinada-2022.jpeg",
    "imageAlt": "2022 Mayıs — Bahçenin genel görünümü, Kılıçkaya"
  },
  {
    "id": "2023",
    "year": "2023",
    "eyebrow": "2023 TEMMUZ — AĞAÇ KENDİNİ GÖSTERDİ",
    "heading": "İki yaz sonra, dal sürgün verdi.",
    "paragraphs": [
      "Temmuz 2023, ikinci yaz. Önde tek bir Marinada artık çelimsiz değil — boy verdi, yan dallar açtı, yaprakları rüzgarla birlikte gölge yapıyor. Altında yine biçmediğimiz otlar, bu kez mavi ve sarı kır çiçekleriyle karışık. Arkada sıra sıra diğer ağaçlar da aynı ritimde, biri erken, biri geç ama hepsi ayakta.",
      "O yaz ilk kez budamayı değil, dallanmayı konuştuk. Hangi dalın güneşi gördüğünü, hangisinin gölgede kaldığını izledik. Toprak artık daha koyu, daha nemli, daha canlı — orman kompostu ve kompost çayının izi. Bahçe bize şunu hatırlattı: ağaç acele etmez, kök zaman ister."
    ],
    "image": "/images/marinada-2023.jpeg",
    "imageAlt": "2023 Temmuz — 2. yılda Marinada gelişimi"
  },
  {
    "id": "2024",
    "year": "2024",
    "eyebrow": "2024 OCAK — BAHÇE UYKUDA",
    "heading": "Kar altında, sabır çalışır.",
    "paragraphs": [
      "Ocak 2024, Kılıçkaya bembeyaz. 946 Marinada karın altında usul usul bekliyor — dalları çıplak ama kökleri sıcak. Toprak donmuyor, çünkü yıllardır sürmediğimiz, biçmediğimiz o örtü karı koynunda tutuyor. Tepede sis, yamaçta sadece bizim ayak izlerimiz ve sessizlik.",
      "Dışarıdan bakan “kışın ne işin var bahçede” der. Var. Eğilen kazığı düzeltmek, karın yükünü hafifletmek, sessizce kontrol etmek. Eller üşür ama içimiz sıcaktır. Çünkü biliriz — ağaç uyurken bile kök çalışır. Bahçe en çok kışın öğretir: hiçbir şey yokmuş gibi görünen o bembeyazlıkta, aslında bir sonraki bahar usul usul hazırlanır. Biz de toprak gibi bekleriz, acele etmeden."
    ],
    "image": "/images/marinada-2024.jpeg",
    "imageAlt": "2024 Ocak — Kış günü, bahçe uykuda"
  },
  {
    "id": "2025-early-spring",
    "year": "2025",
    "substep": "Erken bahar",
    "eyebrow": "2025 MART — DOĞA ERKEN UYANDI",
    "heading": "Hava sıcaktı, bahçe sabredemedi.",
    "paragraphs": [
      "Mart 2025, hava normalden sıcaktı. Kılıçkaya’da kış erken çekildi, bahçe erken uyandı. Önde tek bir Marinada bembeyaz çiçeklerle kaplı — arkasında sıra sıra diğerleri, hepsi aynı heyecanla. Yamaç bir anda gelin gibi açtı.",
      "O çiçekleri görünce hem sevindik hem içimiz burkuldu. Çünkü biliyorduk — erken uyanan bahçe, ayaza daha açıktır. Yine de o anı sevdik. Bademin çiçeği narindir, bir rüzgar ister, bir arı bekler. Biz de bekledik, sessizce. Doğa acele ettirmişti, biz ona eşlik ettik — endişeyle, umutla, içten içe."
    ],
    "image": "/images/marinada-2025-ilkcicek.jpeg",
    "imageAlt": "2025 Mart — Erken uyanan bahçe, ilk çiçekler"
  },
  {
    "id": "2025-frost",
    "year": "2025",
    "substep": "Don",
    "eyebrow": "18 MART 2025 — ÇİÇEKTEN DONA",
    "heading": "Dört gün, dört gece — tam çiçekte yakalandık.",
    "paragraphs": [
      "18 Mart’ta hava döndü. Dört gün süren soğuk ve kar, tam da ağaçlar çiçekteyken geldi. Bir hafta önce bembeyaz açan dallar, bir sabah kahverengiye döndü — çiçekler kavrulmuş, arılar gelmeden donmuştu. Yerde kar, dalda buz, içimizde sessizlik.",
      "O 4 gün boyunca sobayı değil, bahçeyi düşündük. Yapacak bir şey yoktu — doğa kararını vermişti. Erken uyanmanın bedeli, tam çiçekte yakalanmaktı. O yıl hasat beklemedik, toprağı dinlendirdik. Kayıp gibi görünen o don, bize en içten dersi verdi: emanet bazen beklemeyi, hatta vazgeçmeyi de bilmektir."
    ],
    "image": "/images/marinada-2025-don.jpeg",
    "imageAlt": "2025 18 Mart — 4 gün süren don, çiçekte yakalandı"
  }
];

/**
 * The organic certificate the bahçe's production is audited under.
 *
 * Every value below is read straight off the document in
 * public/images/organik-sertifika.jpg. When the certificate is renewed the
 * numbers and dates change together — re-read the new document rather than
 * editing a field from memory.
 *
 * The scope is deliberately worded as the *method* being certified rather than
 * the products: the certificate is a müteşebbis (enterprise) certificate and
 * says on its own face that it is not a product certificate.
 */
export const farmCertificate = {
  eyebrow: "Belge",
  title: "Usulümüz dışarıdan denetleniyor.",
  body: [
    "Bahçedeki üretim, 5262 sayılı Organik Tarım Kanunu kapsamında ANADOLU Kontrol ve Sertifikasyon tarafından denetleniyor. Elimizdeki müteşebbis sertifikası badem, ceviz ve nadas üretimini kapsıyor — ürünün kendisini değil, onu yetiştirdiğimiz usulü belgeliyor.",
    "Belge asgari olanı söylüyor; biz bir adım öteye gidiyoruz. Organik sertifikalı bile olsa dışarıdan gübre almıyoruz — girdilerin tamamı kendi bahçemizden çıkıyor.",
  ],
  facts: [
    { label: "Sertifika no", value: "TR-OT-012-MS-510/02" },
    { label: "Veren kurum", value: "ANADOLU Kontrol ve Sertifikasyon — TÜRKAK akrediteli (TS EN ISO/IEC 17065)" },
    { label: "Kapsam", value: "Badem, ceviz, nadas" },
    { label: "Geçerlilik", value: "24 Ekim 2025 — 3 Ekim 2026" },
    { label: "Sertifika sahibi", value: "Epilantis Kozmetik Estetik Medikal San. Dış Tic. Ltd. Şti." },
  ],
  image: "/images/organik-sertifika.jpg",
  imageWidth: 1056,
  imageHeight: 1489,
  imageAlt:
    "ANADOLU Kontrol ve Sertifikasyon tarafından düzenlenen TR-OT-012-MS-510/02 numaralı organik tarım müteşebbis sertifikası",
  viewLabel: "Belgeyi tam boyutta aç",
} as const;
