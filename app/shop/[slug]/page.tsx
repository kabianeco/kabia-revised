import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { ProductDetail } from "@/components/shop/product-detail";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isBrandPreview } from "@/lib/brand-preview";
import { isPreviewItem } from "@/lib/preview-identity";
import { previewProducts } from "@/content/preview-products";
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/catalog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const preview = isBrandPreview();
  const product = preview
    ? previewProducts.find((product) => product.slug === slug)
    : isPreviewItem({ slug }) ? null : await fetchProductBySlug(await createSupabaseServerClient(), slug);
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    robots: preview ? { index: false, follow: false } : undefined,
    title: product.name,
    description: product.shortDescription,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: product.mainImageUrl
      ? {
          title: product.name,
          description: product.shortDescription,
          images: [{ url: product.mainImageUrl, alt: product.name }],
        }
      : undefined,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isBrandPreview()) {
    const product = previewProducts.find((product) => product.slug === slug);
    if (!product) notFound();
    const related = previewProducts.filter((other) => other.id !== product.id && other.source === product.source).slice(0, 4);
    return <PageShell><ProductDetail product={product} related={related} /></PageShell>;
  }
  if (isPreviewItem({ slug })) notFound();
  const supabase = await createSupabaseServerClient();
  const product = await fetchProductBySlug(supabase, slug);
  if (!product) notFound();
  const related = await fetchRelatedProducts(supabase, product, 4);

  return (
    <PageShell>
      <ProductDetail product={product} related={related} />
    </PageShell>
  );
}
