import "server-only";
/** The sole fixture switch. Never infer preview from a catalog query result. */
export function isBrandPreview(): boolean {
  return process.env.KABIA_BRAND_PREVIEW === "1";
}
