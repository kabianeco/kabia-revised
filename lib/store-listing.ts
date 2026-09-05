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

export function categoryGroups(products: readonly Product[]) {
  return SOURCES.filter((s) => s.id !== "tumu")
    .map((source) => ({
      source: source.id,
      label: source.badgeLabel,
      categories: CATEGORIES.filter(
        (c) =>
          c.id !== "tumu" &&
          products.some((p) => p.source === source.id && p.category === c.id),
      ),
    }))
    .filter((group) => group.categories.length > 0);
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
