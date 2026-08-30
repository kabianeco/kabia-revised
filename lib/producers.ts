import type { SupabaseClient } from "@supabase/supabase-js"
import type { ProducerRow } from "@/lib/supabase/rows"

const PRODUCER_SELECT =
  "id, slug, name, product_type, region, photo_url, story, production_place, method, inputs, certificates, why_selected, is_published, created_at"

export interface Producer {
  id: string
  slug: string
  name: string
  productType: string | null
  region: string | null
  photoUrl: string | null
  story: string | null
  productionPlace: string | null
  method: string | null
  inputs: string | null
  certificates: string | null
  whySelected: string | null
  createdAt: string
}

function mapProducer(row: ProducerRow): Producer {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    productType: row.product_type,
    region: row.region,
    photoUrl: row.photo_url,
    story: row.story,
    productionPlace: row.production_place,
    method: row.method,
    inputs: row.inputs,
    certificates: row.certificates,
    whySelected: row.why_selected,
    createdAt: row.created_at,
  }
}

/** Every published producer, newest first — the same is_published gate the RLS policy enforces. */
export async function fetchPublicProducers(client: SupabaseClient): Promise<Producer[]> {
  const { data, error } = await client
    .from("producers")
    .select(PRODUCER_SELECT)
    .eq("is_published", true)
    .order("created_at", { ascending: false })

  if (error || !data) return []
  return (data as unknown as ProducerRow[]).map(mapProducer)
}

export type ProducerBySlugResult =
  | { status: "ok"; producer: Producer }
  | { status: "not_found" }
  | { status: "error" }

/** Distinguishes "no such producer" from "the database could not be read", same as the blog's slug lookup. */
export async function fetchPublishedProducerBySlug(
  client: SupabaseClient,
  slug: string,
): Promise<ProducerBySlugResult> {
  const { data, error } = await client
    .from("producers")
    .select(PRODUCER_SELECT)
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle()

  if (error) return { status: "error" }
  if (!data) return { status: "not_found" }
  return { status: "ok", producer: mapProducer(data as unknown as ProducerRow) }
}
