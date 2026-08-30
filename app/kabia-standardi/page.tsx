import type { Metadata } from "next"
import { PageShell } from "@/components/layout/page-shell"
import { kabiaStandard } from "@/content/pages"

export const metadata: Metadata = {
  title: "Kabia Standardı",
  description: "Kabia'da bir ürün seçilmeden önce üreticisi tanınır, üretim yeri bilinir, üretim yöntemi öğrenilir.",
  alternates: { canonical: "/kabia-standardi" },
}

export default function KabiaStandardPage() {
  return (
    <PageShell>
      <section aria-labelledby="standard-heading">
        <div className="wrap page-top pb-16 md:pb-24">
          <p className="label text-olive">{kabiaStandard.eyebrow}</p>
          <h1 id="standard-heading" className="mt-6 max-w-2xl text-3xl leading-[1.15] tracking-tight md:text-5xl">
            {kabiaStandard.title}
          </h1>
        </div>

        <div className="wrap">
          <ol className="mx-auto max-w-3xl">
            {kabiaStandard.criteria.map((item, index) => (
              <li
                key={item}
                className="grid gap-4 border-t border-ink/10 py-8 md:grid-cols-12 md:items-baseline md:py-10"
              >
                <span aria-hidden="true" className="font-serif text-xl text-shell md:col-span-1">
                  0{index + 1}
                </span>
                <p className="text-lg leading-snug tracking-tight md:col-span-10 md:text-xl">{item}</p>
              </li>
            ))}
          </ol>

          <figure className="mx-auto mt-24 max-w-3xl border-t border-ink/10 pt-16 text-center md:mt-32 md:pt-24">
            <blockquote className="font-theme-display text-2xl italic leading-snug md:text-4xl">
              {kabiaStandard.closing.statementA} {kabiaStandard.closing.statementB}
            </blockquote>
          </figure>

          <p className="mx-auto mt-16 max-w-xl pb-24 text-sm leading-relaxed text-ink/55 md:pb-32">
            {kabiaStandard.note}
          </p>
        </div>
      </section>
    </PageShell>
  )
}
