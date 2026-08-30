import Image from "next/image"
import Link from "next/link"
import { routes } from "@/lib/site"
import type { Producer } from "@/lib/producers"

/**
 * One entry in the /ureticiler grid — the same editorial language as
 * components/blog/post-card.tsx and components/shop/product-entry.tsx: the
 * image sits directly on the page, a hairline carries the metadata.
 */
export function ProducerCard({ producer, priority = false }: { producer: Producer; priority?: boolean }) {
  return (
    <li className="group">
      <Link href={routes.producer(producer.slug)} prefetch={false} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-media bg-paper">
          {producer.photoUrl ? (
            <Image
              src={producer.photoUrl}
              alt={producer.name}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <span className="label text-olive">Fotoğraf hazırlanıyor</span>
            </div>
          )}
        </div>

        <div className="mt-5 border-t border-ink/10 pt-4">
          {producer.productType && <p className="label text-olive">{producer.productType}</p>}
          <h2 className="mt-2 text-xl leading-snug tracking-tight transition-colors duration-300 group-hover:text-brand">
            {producer.name}
          </h2>
          {producer.region && <p className="mt-2 text-sm leading-relaxed text-ink/60">{producer.region}</p>}
        </div>
      </Link>
    </li>
  )
}
