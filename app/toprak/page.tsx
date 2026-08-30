import type { Metadata } from "next"
import { PageShell } from "@/components/layout/page-shell"
import { soil } from "@/content/pages"

export const metadata: Metadata = {
  title: "Toprak",
  description: "Toprağı yalnızca ağacın üzerinde durduğu yer olarak görmüyoruz — Kabia'nın toprak yaklaşımı.",
  alternates: { canonical: "/toprak" },
}

export default function SoilPage() {
  return (
    <PageShell>
      <section aria-labelledby="soil-heading">
        <div className="wrap page-top pb-10 md:pb-14">
          <p className="label text-olive">{soil.eyebrow}</p>
          <h1 id="soil-heading" className="mt-6 max-w-2xl text-4xl leading-[1.08] tracking-tight md:text-6xl">
            {soil.title}
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-ink/65">{soil.body}</p>
        </div>

        <div className="wrap">
          <ul className="flex flex-wrap gap-x-3 gap-y-2 border-t border-ink/10 pt-8">
            {soil.tags.map((tag) => (
              <li key={tag} className="label rounded-full border border-ink/15 px-4 py-2 text-ink/65">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-20 grid gap-14 border-t border-ink/10 pt-16 md:grid-cols-2 md:pt-24">
            <div>
              <h2 className="text-2xl tracking-tight md:text-3xl">{soil.practice.doTitle}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">{soil.practice.doText}</p>
            </div>
            <div>
              <h2 className="text-2xl tracking-tight md:text-3xl">{soil.practice.dontTitle}</h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {soil.practice.dontText}
              </p>
            </div>
          </div>

          <p className="mx-auto mt-24 max-w-2xl border-t border-ink/10 pb-24 pt-16 text-center font-theme-display text-2xl italic leading-snug md:mb-8 md:mt-32 md:pb-32 md:pt-24 md:text-4xl">
            {soil.closing}
          </p>
        </div>
      </section>
    </PageShell>
  )
}
