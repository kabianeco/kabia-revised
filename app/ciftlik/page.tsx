import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ArrowLink } from "@/components/ui/button";
import { FarmTimeline } from "@/components/farm/farm-timeline";
import { farmOpening, farmPrinciples } from "@/content/farm";
import { routes } from "@/lib/site";

export const metadata: Metadata = {
  title: "Çiftlik",
  description: farmOpening.body,
  alternates: { canonical: "/ciftlik" },
};

export default function FarmPage() {
  return (
    <PageShell>
      <section aria-labelledby="farm-heading">
        <div className="wrap page-top pb-16 md:pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="label text-olive">{farmOpening.eyebrow}</p>
            <h1 id="farm-heading" className="mt-6 text-4xl leading-[1.08] tracking-tight md:text-6xl">{farmOpening.title}</h1>
            <p className="mt-7 text-base leading-relaxed text-ink/65">{farmOpening.body}</p>
          </div>
        </div>
      </section>
      <FarmTimeline />
      <section data-farm-approach aria-labelledby="farm-approach-heading">
        <div className="wrap py-24 md:py-32">
          <h2 id="farm-approach-heading" className="label text-olive">Yaklaşım</h2>
          <ol className="mt-10">
            {farmPrinciples.map((principle, index) => (
              <li key={principle} className="grid gap-4 border-t border-ink/10 py-10 md:grid-cols-12 md:items-baseline md:py-14">
                <span aria-hidden="true" className="font-serif text-xl text-shell md:col-span-1">0{index + 1}</span>
                <p className="font-theme-display text-3xl italic tracking-tight md:col-span-10 md:text-4xl">{principle}</p>
              </li>
            ))}
          </ol>
          <ArrowLink href={routes.soil}>Toprak yaklaşımımız</ArrowLink>
        </div>
      </section>
    </PageShell>
  );
}
