import Link from "next/link";
import { routes } from "@/lib/site";

/**
 * Fiyatların yanındaki kanıt: ince bir şerit, tek satır, belgeye çıkış.
 * Tam belge çiftlik sayfasının sonunda durur; burası rozet görevi görür —
 * fiyatla kanıt aynı ekranda buluşur.
 */
export function CertStrip() {
  return (
    <section aria-label="Sertifika" className="border-t border-ink/10">
      <div className="wrap flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-sm leading-relaxed text-ink/65">
          <span className="label mr-3 text-olive">Belge</span>
          Organik sertifikalı üretim — TR-OT-012-MS-510/02 · ANADOLU Kontrol
          (TÜRKAK akrediteli).
        </p>
        <Link
          href={`${routes.farm}#sertifika`}
          prefetch={false}
          className="group inline-flex shrink-0 items-center gap-2 text-sm text-ink/60 transition-colors duration-300 hover:text-ink"
        >
          Belgeyi gör
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
