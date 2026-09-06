import type { Metadata } from "next";
import Image from "next/image";
import { PageShell } from "@/components/layout/page-shell";
import { FarmTimeline } from "@/components/farm/farm-timeline";
import { farmCertificate, farmOpening, farmPrinciples } from "@/content/farm";
import { soil } from "@/content/pages";

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
      {/* The nav's "Yaklaşım" lands here, so the id has to clear the fixed
          header the same way the homepage sections do. */}
      <section
        id="yaklasim"
        data-farm-approach
        aria-labelledby="farm-approach-heading"
        className="scroll-mt-20"
      >
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
        </div>
      </section>

      {/* Toprak kriterleri: toprağa dair her şey artık burada okunur —
          çiftlik toprağın üstüyse, bu bölüm altıdır. Kopya
          content/pages.ts'teki toprak metninin aynısıdır; ikinci bir kaynak
          yaratılmaz. */}
      <section
        aria-labelledby="farm-soil-heading"
        className="border-t border-ink/10"
      >
        <div className="wrap py-24 md:py-32">
          <p className="label text-olive">{soil.eyebrow}</p>
          <h2
            id="farm-soil-heading"
            className="mt-6 max-w-2xl text-3xl leading-[1.1] tracking-tight md:text-4xl"
          >
            {soil.title}
          </h2>
          <p className="mt-7 max-w-md text-base leading-relaxed text-ink/65">
            {soil.body}
          </p>

          <ul className="mt-10 flex flex-wrap items-baseline gap-x-2 gap-y-2">
            {soil.tags.map((tag, i) => (
              <li key={tag} className="flex items-baseline gap-2">
                {i > 0 && (
                  <span aria-hidden="true" className="text-ink/30">
                    ·
                  </span>
                )}
                <span className="label text-ink/65">{tag}</span>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-12 border-t border-ink/10 pt-12 md:grid-cols-2 md:gap-16 md:pt-16">
            <div>
              <h3 className="text-2xl tracking-tight md:text-3xl">
                {soil.practice.doTitle}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {soil.practice.doText}
              </p>
            </div>
            <div>
              <h3 className="text-2xl tracking-tight md:text-3xl">
                {soil.practice.dontTitle}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-ink/65 md:text-base">
                {soil.practice.dontText}
              </p>
            </div>
          </div>

          <p className="mt-16 max-w-2xl font-theme-display text-2xl italic leading-snug md:mt-20 md:text-4xl">
            {soil.closing}
          </p>
        </div>
      </section>

      {/* The certificate closes the approach rather than opening the page: the
          principles above are the claim, and this is the part of it somebody
          outside the bahçe signed. The document is the object here, so it is
          shown at a size worth looking at and opens full-size for anyone who
          wants to read the small print. */}
      <section
        aria-labelledby="farm-certificate-heading"
        className="border-t border-ink/10"
      >
        <div className="wrap py-24 md:py-32">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <a
                href={farmCertificate.image}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Image
                  src={farmCertificate.image}
                  alt={farmCertificate.imageAlt}
                  width={farmCertificate.imageWidth}
                  height={farmCertificate.imageHeight}
                  sizes="(max-width: 767px) 100vw, 40vw"
                  className="h-auto w-full rounded-theme-image border border-ink/10 bg-paper shadow-theme-image"
                />
                <span className="label mt-5 inline-block text-olive transition-colors duration-300 group-hover:text-ink">
                  {farmCertificate.viewLabel}
                  <span
                    aria-hidden="true"
                    className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </a>
            </div>

            <div className="md:col-span-6 md:col-start-7">
              <p className="label text-olive">{farmCertificate.eyebrow}</p>
              <h2
                id="farm-certificate-heading"
                className="mt-6 text-3xl leading-[1.1] tracking-tight md:text-4xl"
              >
                {farmCertificate.title}
              </h2>
              {farmCertificate.body.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-6 text-base leading-relaxed text-ink/65"
                >
                  {paragraph}
                </p>
              ))}
              <dl className="mt-10 border-t border-ink/10">
                {farmCertificate.facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="grid gap-1 border-b border-ink/10 py-4 md:grid-cols-3 md:gap-6"
                  >
                    <dt className="label text-olive">{fact.label}</dt>
                    <dd className="text-sm leading-relaxed md:col-span-2">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
