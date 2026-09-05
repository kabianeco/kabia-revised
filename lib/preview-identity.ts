/** Kept after preview teardown: old guest storage must never become an order. */
export interface PreviewIdentity { id?: string; slug?: string; productId?: string; variantId?: string }
export const PREVIEW_MESSAGE = "Sepetinizde önizleme ürünü var. Ödemeye geçmek için örnek ürünleri kaldırın.";
export const PREVIEW_GUEST_MESSAGE = "Önizleme ürünleri yalnızca misafir sepetinde denenebilir.";
export function isPreviewItem(item: PreviewIdentity): boolean {
  return [item.id, item.slug, item.productId, item.variantId].some(value =>
    typeof value === "string" && (value.startsWith("onizleme-") || value.startsWith("kabia-preview:")));
}
export function hasPreviewItems(items: readonly PreviewIdentity[]): boolean {
  return items.some(isPreviewItem);
}
