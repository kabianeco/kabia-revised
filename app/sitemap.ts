import type { MetadataRoute } from "next"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { fetchPublicProducts } from "@/lib/catalog"
import { site, routes } from "@/lib/site"

/**
 * Only the routes safe to advertise to crawlers: static pages and active
 * products. Preview products and preview producer stores are never
 * included — they exist solely behind the design-review switch.
 */
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createSupabaseServerClient()

  const productsResult = await fetchPublicProducts(supabase)

  const staticEntries: MetadataRoute.Sitemap = [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}${routes.store}`, changeFrequency: "daily", priority: 0.9 },
    { url: `${site.url}${routes.secki}`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}${routes.distanceSalesAgreement}`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}${routes.preliminaryInfo}`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}${routes.privacyPolicy}`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}${routes.kvkkDisclosure}`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}${routes.explicitConsent}`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}${routes.cookiePolicy}`, changeFrequency: "monthly", priority: 0.4 },
    { url: `${site.url}${routes.deliveryAndReturn}`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${site.url}${routes.termsOfUse}`, changeFrequency: "monthly", priority: 0.5 },
  ]

  const productEntries: MetadataRoute.Sitemap =
    productsResult.status === "ok"
      ? productsResult.products.map((p) => ({
          url: `${site.url}${routes.product(p.slug)}`,
          changeFrequency: "weekly",
          priority: 0.7,
        }))
      : []

  return [...staticEntries, ...productEntries]
}
