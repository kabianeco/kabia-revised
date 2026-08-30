import type { Metadata } from "next"
import Link from "next/link"
import { PageShell } from "@/components/layout/page-shell"
import { journalEntries } from "@/content/journal"
import { routes } from "@/lib/site"

export const metadata: Metadata = {
  title: "Günlük",
  description: "Kabia'nın bahçe günlüğü: tarih sırasıyla saha notları — konum, hava, bahçenin durumu, uygulama ve gözlem.",
  alternates: { canonical: "/gunluk" },
}

function formatEntryDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
}

export default function JournalIndexPage() {
  const entries = [...journalEntries].sort((a, b) => (a.date < b.date ? 1 : -1))

  return (
    <PageShell>
      <section aria-labelledby="journal-heading">
        <div className="wrap page-top pb-16 md:pb-24">
          <p className="label text-olive">Kabia</p>
          <h1 id="journal-heading" className="mt-6 max-w-3xl text-4xl leading-[1.08] tracking-tight md:text-6xl">
            <em className="font-theme-display italic text-brand">Günlük</em>.
          </h1>
          <p className="mt-7 max-w-md text-base leading-relaxed text-ink/65">
            Bahçeden tarih sırasıyla saha notları: konum, hava, bahçenin durumu, uygulama ve gözlem.
          </p>
        </div>

        <div className="wrap">
          {entries.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-theme-display text-2xl italic text-ink/70">Günlük şu an boş.</p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/55">
                Yeni saha notları eklendiğinde burada, tarih sırasıyla listelenir.
              </p>
            </div>
          ) : (
            <ul className="pb-24 md:pb-32">
              {entries.map((entry) => (
                <li key={entry.slug} className="border-t border-ink/10 py-8 md:py-10">
                  <Link href={routes.journalEntry(entry.slug)} prefetch={false} className="group block">
                    <p className="label text-olive">
                      <time dateTime={entry.date}>{formatEntryDate(entry.date)}</time>
                      <span className="mx-2" aria-hidden="true">
                        ·
                      </span>
                      {entry.location}
                    </p>
                    <p className="mt-3 text-xl leading-snug tracking-tight transition-colors duration-300 group-hover:text-brand md:text-2xl">
                      {entry.observation}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </PageShell>
  )
}
