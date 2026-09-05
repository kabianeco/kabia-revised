import { CATEGORIES, SOURCES, type Product } from "@/lib/products";

export const SORT_OPTIONS = [
  { id: "onerilen", label: "Varsayılan" },
  { id: "fiyat-artan", label: "Fiyat: artan" },
  { id: "fiyat-azalan", label: "Fiyat: azalan" },
] as const;

export function selectProducts(
  products: readonly Product[],
  category: string,
  source: string,
  sort: string,
): Product[] {
  const filtered = products.filter(
    (p) =>
      (category === "tumu" || category === p.category) &&
      (source === "tumu" || source === p.source),
  );
  if (sort === "fiyat-artan") filtered.sort((a, b) => a.price - b.price);
  if (sort === "fiyat-azalan") filtered.sort((a, b) => b.price - a.price);
  return filtered;
}

/** The three sources, narrowed to those the current catalogue actually has. */
export function presentSources(products: readonly Product[]) {
  return SOURCES.filter(
    (source) =>
      source.id === "tumu" || products.some((p) => p.source === source.id),
  );
}

/**
 * Categories narrowed to what is present, and — once a source is chosen —
 * to what is present *within that source*, so the bar never offers a
 * combination that resolves to an empty grid.
 */
export function presentCategories(products: readonly Product[], source: string) {
  const scope =
    source === "tumu" ? products : products.filter((p) => p.source === source);
  return CATEGORIES.filter(
    (category) =>
      category.id === "tumu" || scope.some((p) => p.category === category.id),
  );
}

export function listingHref(
  base: string,
  category: string,
  source: string,
  sort: string,
): string {
  const params = new URLSearchParams();
  if (category !== "tumu") params.set("kategori", category);
  if (source !== "tumu") params.set("kaynak", source);
  if (sort !== "onerilen") params.set("sirala", sort);
  return params.size ? `${base}?${params}` : base;
}
