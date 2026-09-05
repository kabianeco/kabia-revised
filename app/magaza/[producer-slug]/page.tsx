import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { StoreListing, type StoreSearch } from "@/components/shop/store-listing";
import { isBrandPreview } from "@/lib/brand-preview";
import { sourceProducers } from "@/content/producers";
import { previewProducts } from "@/content/preview-products";

type Params = Promise<{ "producer-slug": string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  if (!isBrandPreview()) return { title: "Mağaza bulunamadı" };
  const slug = (await params)["producer-slug"];
  const producer = sourceProducers.find((producer) => producer.slug === slug);
  return {
    title: producer ? `${producer.name} — Mağaza` : "Mağaza bulunamadı",
    robots: { index: false, follow: false },
  };
}

export default async function ProducerStore({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Promise<StoreSearch>;
}) {
  if (!isBrandPreview()) notFound();
  const slug = (await params)["producer-slug"];
  const producer = sourceProducers.find((producer) => producer.slug === slug);
  if (!producer) notFound();
  const products = previewProducts.filter(
    (product) => product.producerSlug === producer.slug,
  );

  return (
    <PageShell>
      <section className="wrap page-top">
        <p className="label text-olive">Mağaza</p>
        <h1 className="mt-6 max-w-3xl text-4xl leading-[1.08] tracking-tight md:text-6xl">
          {producer.name}
        </h1>
        <p className="mt-7 max-w-md text-base leading-relaxed text-ink/65">
          {producer.desc}
        </p>

        <div className="mt-14 md:mt-20">
          <StoreListing
            products={products}
            base={`/magaza/${producer.slug}`}
            search={await searchParams}
          />
        </div>
      </section>
    </PageShell>
  );
}
