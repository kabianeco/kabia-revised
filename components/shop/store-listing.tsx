import Link from "next/link";
import { ArrowLink } from "@/components/ui/button";
import { ProductLedger } from "@/components/shop/product-ledger";
import {
  categoryGroups,
  listingHref,
  selectProducts,
  SORT_OPTIONS,
} from "@/lib/store-listing";
import type { Product } from "@/lib/products";

export type StoreSearch = {
  kategori?: string;
  kaynak?: string;
  sirala?: string;
};

/**
 * Existing storefront link selections, composed into the site's 12-column grid.
 * Mobile uses the native details/summary idiom from admin time-series charts.
 */
export function StoreListing({
  products: all,
  error = false,
  base,
  search,
}: {
  products: Product[];
  error?: boolean;
  base: string;
  search: StoreSearch;
}) {
  const category = search.kategori ?? "tumu";
  const source = search.kaynak ?? "tumu";
  const sort = SORT_OPTIONS.some((option) => option.id === search.sirala)
    ? search.sirala!
    : "onerilen";
  const products = selectProducts(all, category, source, sort);
  const groups = categoryGroups(all);

  const href = (c: string, s: string, order = sort) =>
    listingHref(base, c, s, order);

  const linkClass = (active: boolean) =>
    `inline-flex min-h-11 items-center text-sm transition-colors duration-300 ${
      active
        ? "text-ink underline decoration-brand decoration-2 underline-offset-8"
        : "text-ink/55 hover:text-ink"
    }`;

  const categories = (
    <nav aria-label="Kategoriler">
      <Link
        href={href("tumu", "tumu")}
        prefetch={false}
        aria-current={
          category === "tumu" && source === "tumu" ? "true" : undefined
        }
        className={linkClass(category === "tumu" && source === "tumu")}
      >
        Tümü
      </Link>
      {groups.map((group) => (
        <div key={group.source} className="mt-6">
          <p className="label text-olive">{group.label}</p>
          <ul className="mt-3">
            {group.categories.map((cat) => {
              const active = cat.id === category && group.source === source;
              return (
                <li key={cat.id}>
                  <Link
                    href={href(cat.id, group.source)}
                    prefetch={false}
                    aria-current={active ? "true" : undefined}
                    className={linkClass(active)}
                  >
                    {cat.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  const sorting = (
    <nav aria-label="Sıralama">
      <p className="label text-olive">Sıralama</p>
      <ul className="mt-3">
        {SORT_OPTIONS.map((option) => (
          <li key={option.id}>
            <Link
              href={href(category, source, option.id)}
              prefetch={false}
              aria-current={sort === option.id ? "true" : undefined}
              className={linkClass(sort === option.id)}
            >
              {option.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="pb-24 md:pb-32" data-store-listing>
      <details className="border-y border-ink/10 py-5 lg:hidden">
        <summary className="cursor-pointer text-sm text-ink">
          Kategoriler ve sıralama
        </summary>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {categories}
          {sorting}
        </div>
      </details>

      <div className="grid gap-8 pt-10 lg:grid-cols-12">
        <aside className="hidden lg:col-span-2 lg:block">{categories}</aside>

        <div className="lg:col-span-8">
          {error ? (
            <div role="alert" className="py-24 text-center">
              <p className="font-theme-display text-2xl italic text-clay">
                Ürünler şu anda yüklenemiyor.
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/55">
                Mağaza sayfası açık kalacak. Lütfen daha sonra yeniden deneyin.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-theme-display text-2xl italic text-ink/70">
                {all.length === 0
                  ? "Mağaza şu an boş."
                  : "Bu kategoride ürün yok."}
              </p>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-ink/55">
                {all.length === 0
                  ? "Yeni hasat yüklendiğinde ürünler burada listelenir."
                  : "Diğer kategorilere göz atabilirsiniz."}
              </p>
              {all.length > 0 && (
                <div className="mt-8">
                  <ArrowLink href={base} prefetch={false}>
                    Tüm ürünler
                  </ArrowLink>
                </div>
              )}
            </div>
          ) : (
            <>
              <p className="label pb-5 text-olive">{products.length} ürün</p>
              <ProductLedger products={products} />
            </>
          )}
        </div>

        <aside className="hidden lg:col-span-2 lg:block">{sorting}</aside>
      </div>
    </div>
  );
}
