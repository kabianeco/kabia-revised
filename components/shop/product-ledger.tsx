"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { ArrowLink } from "@/components/ui/button";
import { ProductPurchase } from "@/components/shop/product-purchase";
import { categoryLabel, formatTL, type Product } from "@/lib/products";
import { routes } from "@/lib/site";

/** Line-drawn almond used when a product has no photography yet. */
function ProductPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 border border-ink/10 bg-ivory">
      <svg
        viewBox="0 0 100 120"
        className="h-16 w-auto text-olive"
        aria-hidden="true"
      >
        <path
          d="M50 8 C72 30 80 58 70 84 C63 102 37 102 30 84 C20 58 28 30 50 8 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path
          d="M48 24 C60 40 64 62 58 82"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
      <p className="label text-olive">{name} — fotoğraf hazırlanıyor</p>
    </div>
  );
}

/** Numbered linked-image ledger extracted from homepage ProductCollection. */
export function ProductLedger({ products }: { products: Product[] }) {
  return <ul>{products.map((product, index) => <ProductRow key={product.id} product={product} index={index} />)}</ul>;
}

function ProductRow({ product: item, index }: { product: Product; index: number }) {
  const [weight, setWeight] = useState(item.defaultWeight);
  const variant = item.variants.find((variant) => variant.weight === weight) ?? item.variants[0];
  return (
    <Reveal as="li" className="grid gap-6 border-t border-ink/10 py-10 md:grid-cols-12 md:items-center md:gap-8 md:py-12">
      <div className="flex items-baseline justify-between md:col-span-1 md:block">
        <span className="font-serif text-xl text-shell">{String(index + 1).padStart(2, "0")}</span>
        <span className="label block text-olive md:mt-2">{categoryLabel(item.category)}</span>
      </div>
      <div className="md:col-span-4">
        <Link href={routes.product(item.slug)} tabIndex={-1} aria-hidden="true" className="group relative block aspect-[4/3] overflow-hidden rounded-media">
          {item.mainImageUrl ? <Image src={item.mainImageUrl} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" /> : <ProductPlaceholder name={item.name} />}
        </Link>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        <h2 className="text-2xl tracking-tight">{item.name}</h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/60">{item.shortDescription}</p>
        <p className="figure mt-4 text-lg text-ink">{formatTL(variant?.price ?? item.price)}</p>
        <div className="mt-4"><ArrowLink href={routes.product(item.slug)}>İncele<span className="sr-only"> — {item.name}</span></ArrowLink></div>
        <ProductPurchase product={item} selectedWeight={weight} onWeightChange={setWeight} />
      </div>
    </Reveal>
  );
}
