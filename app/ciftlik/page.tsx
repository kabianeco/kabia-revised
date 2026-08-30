import type { Metadata } from "next"
import { PageShell } from "@/components/layout/page-shell"
import { ProcessStory } from "@/components/home/process-story"
import { farm } from "@/content/pages"

export const metadata: Metadata = {
  title: "Çiftlik",
  description: "Sabırlar köyünde, Geyve — 19 dönümlük bahçemiz, 946 badem ağacımız ve üretim yaklaşımımız.",
  alternates: { canonical: "/ciftlik" },
}

export default function FarmPage() {
  return (
    <PageShell>
      <section aria-labelledby="farm-heading">
        <div className="wrap page-top pb-16 md:pb-24">
          <p className="label text-olive">{farm.eyebrow}</p>
          <h1 id="farm-heading" className="mt-6 max-w-2xl text-4xl leading-[1.08] tracking-tight md:text-6xl">
            {farm.title}
          </h1>
          {farm.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="mt-5 max-w-md text-base leading-relaxed text-ink/65">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="wrap">
          <dl className="grid grid-cols-2 gap-8 border-t border-ink/10 py-10 md:grid-cols-4 md:py-14">
            {farm.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-theme-display text-4xl italic tracking-tight md:text-5xl">{stat.value}</dd>
                <p className="label mt-2 text-olive">{stat.label}</p>
              </div>
            ))}
          </dl>

          <p className="max-w-md border-t border-ink/10 pb-16 pt-10 text-sm leading-relaxed text-ink/65 md:pb-24 md:pt-14 md:text-base">
            {farm.approachIntro}
          </p>
        </div>
      </section>

      <ProcessStory />
    </PageShell>
  )
}
