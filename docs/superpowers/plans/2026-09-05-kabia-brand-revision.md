# Kabia brand revision implementation plan

> For agentic workers: use superpowers:executing-plans or superpowers:subagent-driven-development only after implementation is authorized. This is documentation only. PLAN.md and the user approvals are authoritative; the user has now authorized implementation.

**Goal:** Make Kabia lead with land and producers, retain normal store commerce, and permit local preview products to reach only a persisted guest cart.

**Architecture:** Preserve this target's PageShell, Tailwind markup, component vocabulary, route conventions, and catalog query contracts. Use source-authorized local editorial content and one explicit server-only preview switch. Share the existing ledger presentation between store listings; enforce preview identity at every transaction and persistence boundary independently of the switch.

**Tech stack:** Existing Next.js App Router, React, TypeScript, Tailwind, Framer Motion, Supabase application clients, node:test and Playwright. No dependencies added.

**Spec:** `/Users/mustafa/kabia-2.0-revision/PLAN.md`, supplemented and overridden by the user's mapping-approval message in this task. The decisions below preserve those overrides; the original specification is unchanged.

## Execution boundary and approved overrides

- All file paths below resolve within `/Users/mustafa/kabia-2.0-revision` unless expressly labeled read-only source. Branch: `feat/kabia-2.0-revision`; starting SHA: `a811e0fd936d8609f2c3240eb489d848e00c22c9`.
- Before each file-operation command, verify `pwd` and `git branch --show-current`; stop on a mismatch.
- Do not write to, or run Git commands in, `/Users/mustafa/kabia-2.0` or `/Users/mustafa/kabia-brand`. Do not operate in `kabia-latest` or `kabia-perf-opt`.
- Leave `supabase/` untouched, including its two untracked files. No SQL, migrations, Supabase MCP/CLI operations, seeding, or real database writes.
- Do not change existing query signatures or return types. Do not add a catalog/filter query API.
- No changes to `app/globals.css`, fonts, `components/ui/*`, `next.config.ts`, `package.json`, lockfile or Tailwind configuration. No new CSS, tokens, dependencies, icons, fonts, inline JSX styles or previously unused arbitrary Tailwind values.
- Rework ProductCollection in place. Preserve every other homepage section, position and outer spacing; only add the approved Seçki ArrowLink to BrandManifesto.
- Create `/secki` for exactly four Seçki producer records. Keep `/ureticiler` and `/ureticiler/[slug]` presentation and real-data behavior; only replace their temporary fixture plumbing.
- Permanent store grouping/sort/mobile layout applies with the flag both on and off. Data isolation, existing empty/error behavior and existing 404 semantics remain mandatory.
- Keep `/toprak` unchanged and link to it from the farm approach summary. Neither `/emanet` nor `/ciftlikten` exists here. No redirects and no sixth redirect commit.
- Keep `/gunluk` and its real empty state; retire invented entries.
- Header: ordinary Çiftlik and Seçki links. Üreticiler and Günlük remain footer-only. Blog exits in the public-blog commit.
- Preserve historical blog audit actions/entity labels and shared admin/media/theme infrastructure.
- No push, merge, rebase, reset, amend, squash, PR, branch deletion, worktree removal or deployment.

## Verified prerequisites and blockers

### Catalog, checked on 2026-09-05 at 08:25 UTC

Used the target's configured public/anon application credentials, without printing credentials or creating a session. Only read operations were issued. A minimal public product-identity read returned exactly ten active rows, including:

| Intro slot | Actual active product name | Actual slug | Intended detail URL |
|---|---|---|---|
| Çiftlik / almond | Kabuklu Badem | `kabuklu-badem` | `/shop/kabuklu-badem` |
| Seçki / nut | Kabuklu Fındık | `findik-ici` | `/shop/findik-ici` |
| Mutfak / kitchen | Tarhana | `tarhana` | `/shop/tarhana` |

Kabuklu Ceviz also exists as `ceviz-ici`. Other active rows are `cicek-bali`, `domates-salcasi`, `elma-sirkesi`, `eriste`, `ihlamur`, `alic-sirkesi`. Do not normalize the existing slug/name mismatches.

**The three products exist, but their normal detail paths are blocked.** The existing `fetchPublicProducts` returns `status: "error"`; the existing `fetchProductBySlug` returns null for all three chosen slugs. The route currently turns that null into a 404. This is application-query evidence, not a browser HTTP test.

Read errors observed:

- `PGRST200`: relationship between `products` and `producers` absent from schema cache.
- `PGRST205`: `public.producers` absent from schema cache.
- `42703`: `products.source` does not exist.

Therefore their source association is supported by the authorized content and product identity, not a verified database `source` field. Normal producer-story lookups are also unavailable. The three real rows must not be confused with three working product pages.

**User override — B may proceed:** use the confirmed real slugs kabuklu-badem, findik-ici and tarhana. The pre-existing taxonomy/schema failure is a reporting limitation, not a B implementation blocker. Do not add a fallback, substitute preview products with the flag off, repair the schema or touch supabase/. The user identifies the unapplied taxonomy migration as the separate required repair outside this branch.

**Related E gate:** preview story links can resolve through the reconciled local branch. Normal story links must retain today's real-data behavior; currently it is an error state. Report normal-link verification as blocked until the real producer data path works. Do not publish local fixture content through a flag-off fallback to make the links appear healthy.

### Soil overlap assessment

Read `/Users/mustafa/kabia-2.0-revision/content/pages.ts` and the seven authoritative principles in `/Users/mustafa/kabia-2.0/app/emanet/page.tsx`.

| Verbatim emanet principle | Existing `/toprak` overlap |
|---|---|
| Önce toprak, sonra ağaç. | Living-soil introduction; same theme, different wording. |
| Toprağı sürmüyoruz. | General commitment not to disturb soil unnecessarily; no explicit no-tillage statement. |
| Otları biçmiyoruz. | Maintaining vegetation cover; no explicit no-mowing statement. |
| Dışarıdan girdi yok — organik sertifikalı bile olsa gübre almıyoruz. | No equivalent outside-input commitment. |
| Tüm girdiler doğadan ve kendi bahçemizden: kompost, kompost gübresi, kompost çayı. | General organic-matter support; no matching list of inputs. |
| Doğayı kontrol etmiyoruz, taklit ediyoruz. | Strongest conceptual overlap: control is rejected in the existing don't-do paragraph and closing. |
| Her paket hasat tarihli — ne zaman, nereden, kimden. | No equivalent traceability statement. |

No rewritten wording is authorized. The source-content test must compare all seven exact strings.

Assessment: moderate conceptual overlap, no complete principle repeated verbatim. It is suitable to keep `/ciftlik` as seven concise commitments followed by `Toprak yaklaşımımız` linking to `/toprak`. `/toprak` is currently brief explanatory context, not a substantially deeper technical account; do not expand it or copy its paragraphs into `/ciftlik`. Keep the emanet opening on `/ciftlik` focused on stewardship rather than reproducing all of its later discussion of soil organisms. No source year notes or invented explanatory copy.

## File inventory, work items and sequence

Paths in the inventories are target-root-relative for readability. New files are proposals; they do not exist yet. Existing locked files and the two read-only source trees are never implementation outputs.

### Commit 1 — C: farm content, narrative and timeline

**Create**

- `content/farm.ts`: source-cited stewardship opening, exact seven principles and seven timeline states. Timeline records contain stable state ID, year, optional substep, year eyebrow, heading, two paragraphs, image and source alt text. No emanet year notes.
- `components/farm/farm-timeline.tsx`: the only new farm interaction component.
- `public/images/resim22.jpg`, `marina-ilk-dikim.jpeg`, `marinada-2022.jpeg`, `marinada-2023.jpeg`, `marinada-2024.jpeg`, `marinada-2025-ilkcicek.jpeg`, `marinada-2025-don.jpeg`: copy these seven image assets from the read-only source, preserving bytes.
- `tests/farm-content.test.ts`: exact years, substeps, seven principles, two paragraphs per state, source-heading/photo correspondence and excluded year-note content.
- `tests/brand-revision.spec.ts`: timeline browser cases, later extended by commits 2/3/5.
- `playwright.brand-revision.config.ts` and `tests/support/brand-revision-server.mjs`: isolated local test servers and request spies, cloned from existing Playwright production-server setup. Synthetic endpoint and dummy credentials only; no application test route and no second product-preview mechanism.

**Modify**

- `app/ciftlik/page.tsx`: PageShell; focused source opening; timeline; seven principles immediately after timeline; ArrowLink to `/toprak`. Replace its current stats/process-page composition as part of the approved restructuring. Homepage ProcessStory remains untouched.

**Delete:** none. Leave `app/toprak/page.tsx`, `content/pages.ts`, homepage OriginStory and Principles unchanged.

**Patterns and implementation**

- Opening: existing PageShell/page-heading typography with BrandQuote's centered, constrained text composition. No new visual vocabulary.
- Timeline: OriginStory's text-left/image-right 12-column grid, existing image aspect utility and native Button variants. All seven state panels remain in the same grid row/column; hidden panels retain layout participation but are invisible, inert and excluded from the accessibility tree. Tallest panel establishes the stage height. The image and 2025 substep area remain allocated in all states.
- Initial state is 2019. Year buttons select the first state for that year; 2025 selects Erken bahar, then offers Don. Native keyboard-activatable buttons expose selected state and controlled region. Hidden controls cannot receive focus.
- Use the existing product-gallery short opacity transition vocabulary and reduced-motion handling; do not copy its unmounting AnimatePresence approach or add translation/height animation. No JS height measurement. Standard Tailwind grid-position/visibility utilities suffice without new arbitrary values or CSS.
- Principles: reuse the numbered/hairline structure from `components/home/principles.tsx`, placing only the seven exact source strings, with no invented descriptions.

**Verification steps**

- [ ] Add source-content assertions and reproduce their initial failure.
- [ ] Implement content/page/timeline and pass content assertions.
- [ ] At desktop and mobile widths, record stage height, image bounds, substep bounds and following-section Y coordinate for all seven states; assert no change after image/font readiness.
- [ ] Verify keyboard activation, focus exclusion, initial 2019 selection, 2025 substep order, reduced motion and absence of 2026.
- [ ] Verify `/toprak` still responds and farm link targets it directly. Commit the C files and C-specific test support only.

### Commit 2 — F, G and §6: unified preview, stores and order boundary

**Create**

- `content/producers.ts`: source-authorized records with exact source slugs, source copy, intact PLACEHOLDER markers, local image and explicit `source` association. Export separate farm, Seçki and kitchen collections; Seçki is its explicit four-record collection, not a complement/exclusion filter. No invented IDs presented as business identity, dates or credentials.
- `content/preview-products.ts`: preview-only header; one generic product per source-authorized producer record (ten total), explicit producer reference, reserved product/variant/slug prefixes, local images, weight, price and stock. Include an out-of-stock entry. The local preview type extends Product without changing Product or a query return type. Empty factual/review fields; no manufactured ratings, certificates or analyses.
- `lib/brand-preview.ts`: `import "server-only"` and the single `process.env.KABIA_BRAND_PREVIEW === "1"` check.
- `lib/preview-identity.ts`: environment-independent recognizer for `onizleme-` slugs and `kabia-preview:` IDs across slug/id/productId/variantId; shared Turkish explanatory message. This module must survive placeholder teardown while persisted preview items can exist.
- `lib/checkout-order.ts`: extracted order-submission boundary actually invoked by CheckoutFlow. Accept the current cart and a lazy client factory; reject preview/mixed carts before invoking that factory or create_order. Preserve the existing normal order payload/result contract.
- `components/shop/product-ledger.tsx`: shared listing and row markup extracted from the current ProductCollection ledger before B simplifies it.
- `components/shop/product-purchase.tsx`: extract existing variant, quantity and add-to-cart interaction from ProductDetail; preserve its normal detail rendering and reuse controls in the ledger. No new commerce rules or independent purchase implementation.
- `components/shop/store-listing.tsx`: shared permanent layout, category groups, three sort choices, count, ledger, and honest error/empty states. Accept already-read products/result and route base; never query itself.
- `lib/store-listing.ts`: pure filter/sort/group and URL helpers extracted from ShopPage. Group only existing CATEGORIES represented by products per source. Preview non-almond packaged examples use the existing `paketli-urunler` category; do not add categories or mislabel them as almonds.
- `app/magaza/[producer-slug]/page.tsx`: validate source slug; flag on uses direct local producer/product reads and shared StoreListing; flag off returns 404, preserving the currently absent route. Metadata is preview-only/noindex and does not query before the gate. Unknown slug always 404.
- Producer images under `public/images/`: `kabia-badem.jpeg`, `findik1.jpeg`, `kabuklu-ceviz.jpeg`, `bal.png`, `ihlamur.jpeg`, `domates1.jpeg`, `elma-sirkesi1.jpeg`, `alic1.jpeg`, `eriste1.jpeg`, `tarhana1.jpeg`. Copy only the required source assets.
- `tests/brand-preview.test.ts`, `tests/preview-identity.test.ts`, `tests/store-listing.test.ts`, `tests/preview-order-boundary.test.ts` and `tests/support/run-database-free.mjs`.

**Modify**

- `app/shop/page.tsx`: keep the existing catalog read API and separate result states; select preview before catalog-client creation when on; render the redesigned StoreListing in both states. Preserve the settings-driven banner and route convention. Filters continue using `kategori`, `kaynak`, `sirala` and preserve default catalog order; retain the existing default sort URL value internally if useful while displaying Varsayılan.
- `app/shop/[slug]/page.tsx`: gate before client/query in metadata, product lookup and related-products path. Flag off excludes reserved preview identities and follows existing real lookup/error-to-404 behavior. Flag on uses local products directly. No failed-query fallback.
- `components/shop/product-detail.tsx`: use extracted purchase controls; preview mode suppresses unsupported factual guarantees, certification presentation, reviews and favorite controls, and guards review submission before client creation. Preserve normal-product behavior.
- `lib/cart-context.tsx`: reject preview additions for authenticated or not-yet-resolved auth; only accept once guest status is established. Recognize restored items after refresh or flag changes. Filter guest migration before any item-driven database work; never query/insert/update/delete a preview identity. Keep guest quantity/removal/local persistence. Treat login transitions and stale handlers explicitly, not only visible buttons.
- `lib/favorites-context.tsx`: reject preview toggles and filter preview slugs before migration/product lookup; never persist preview favorites into a logged-in account.
- `lib/recently-viewed.ts`: exclude preview slugs from recording and reading, keeping preview products out of the normal account product-history path.
- `components/cart/cart-page.tsx`: explain preview/mixed-cart restriction; disable checkout and guard the click handler.
- `components/checkout/checkout-flow.tsx`: direct entry returns to cart and blocks before PaymentStep renders; handleConfirmOrder applies the same check before database-client creation/RPC and invokes the extracted guarded submission boundary in `lib/checkout-order.ts`. The extracted function is the actual handler dependency, not a parallel test implementation.
- `app/ureticiler/page.tsx` and `app/ureticiler/[slug]/page.tsx`: replace old fallback checks with early local preview selection, including metadata; preserve existing real query contracts, off-state empty/error/404 handling and markup. Use a minimal view shape for local records rather than inventing Producer.createdAt fields. Do not restructure these pages.
- `content/journal.ts`: remove invented entries/old flag and restore the real empty array.
- `components/layout/site-header.tsx`: remove old fixture constant and fixture-only Üreticiler/Günlük blocks. Ordinary Çiftlik/Seçki links arrive in commit 3.
- Extend `tests/brand-revision.spec.ts` and its local-only test server support.

**Delete**

- `content/producer-fixtures.ts` after its two consumers use source-authorized records.

**Patterns and deviations**

- Ledger extraction uses the existing homepage row composition, image link and hairlines. Current store ProductEntry remains for related-product usage; no new card system.
- Purchase extraction uses the existing controls and callbacks. New shared components are justified by the explicit requirement for shared store/producer-store rendering and one purchase implementation.
- Desktop grid follows existing 12-column layouts: groups left, products center, sort links vertical right. Mobile uses the existing native details/summary idiom from `components/admin/charts/time-series.tsx`, with storefront link typography. Sidebars do not render as stacked desktop columns on mobile.
- The server gate controls fixture data selection, not the permanent store layout. Existing shell/settings/theme reads are independent of product fixture selection; no product/producer catalog read precedes the gate. Do not disable shared theme/settings infrastructure to claim zero catalog access.
- Preview identifiers are recognized even when the flag is off. The old NEXT_PUBLIC flag is removed entirely, including stale comments. No env file is created.

**Verification steps**

- [ ] Test gate off with successful, empty and failed synthetic catalogs; no preview record in UI, metadata, related links, sitemap or direct slug entry. Keep existing error/empty/404 behavior.
- [ ] Test gate on with throwing catalog-client factory spies: local product list/detail/producer-store/producer metadata paths must not invoke the catalog factory.
- [ ] Verify slug allowlist and explicit producer/source/product associations for all ten records; preserve source placeholders; preview detail unknown slugs return 404.
- [ ] Test guest add, quantity, removal, refresh, mixed cart, direct checkout, login migration and flag-off restoration using actual provider/browser flows against a local endpoint. Capture attempted mutations, not merely rendered controls. Preview-only migration must not create a database cart because of those preview items. Normal account operations are separately distinguished from preview-item writes.
- [ ] Directly exercise the actual guarded order submission dependency with a preview/mixed cart and throwing client factory; assert zero client creation and zero create_order calls. Also guard UI render and prevent stale confirmation handlers bypassing the check.
- [ ] Test review/favorite handlers, favorite migration and history for preview identities; no preview write/RPC attempt or inappropriate product-history entry.
- [ ] Test permanent sorting/grouping in both states, only present category/source pairs, default order, price ties, empty filters, out-of-stock and mobile collapse.
- [ ] Run focused database-free tests and typecheck. Commit these changes as chunk 2. No real checkout, login migration, review submission or favorite mutation is performed against the configured database.

### Commit 3 — A+B, E and navigation

**User-approved prerequisite status:** the three active rows and exact slugs are confirmed. Implement B despite the pre-existing detail-query failures; report normal detail verification as BLOCKED, never PASS.

**Modify A+B**

- `components/home/product-collection.tsx`: keep export, section slot, ID and outer spacing; replace priced ledger with exactly three linked-image entries and the three approved statement lines. Reuse this file's own linked-image structure/classes. One link per entry, wrapping image/source name/short name; no extra action link, price, stock, badge, product description or purchase control.
- `content/homepage.ts`: replace only ProductCollection copy/data with three explicitly curated real-slug entries and local source images. Keep all other section copy intact. Use the approved real slugs `kabuklu-badem`, `findik-ici`, `tarhana`. Flag-on entries may select the matching source-local preview products through the one server gate; flag-off always uses verified real slugs.
- `components/home/brand-manifesto.tsx`: add existing ArrowLink to `/secki` below its producer narrative, without changing the outer section.
- `tests/routes.test.js`: replace the homepage-price expectation with three product links and absence of commercial metadata in that section. Preserve unrelated real-route tests.
- Extend browser/content tests for homepage and source selection.

**Create E**

- `app/secki/page.tsx`: PageShell, the existing producer-grid page composition, explicit four Seçki records, 1/sm:2/lg:3 grid, source copy and local images. No farm or kitchen records. Story links remain `/ureticiler/[slug]`; store links `/magaza/[producer-slug]`.

**Modify E/navigation**

- `components/producers/producer-card.tsx`: add a Seçki-only variant using its existing markup/classes; default producer-page variant stays unchanged. New order is image, source desc, product type, Hikâyeyi Gör and Mağazada Gör ButtonLinks. The variant must avoid nested links. No badges/tags and no new card component.
- `lib/site.ts`: add Seçki and producer-store route helpers without repointing `routes.producers` or breaking product-detail producer links. Keep `/toprak` and journal helpers. Blog helpers remain until commit 5.
- `components/layout/site-header.tsx`: Çiftlik links to `/ciftlik`; Seçki links to `/secki`. No Üreticiler/Günlük header links. Keep existing mobile menu behavior and account/cart/theme controls.
- `components/layout/site-footer.tsx`: include Seçki while retaining Üreticiler, Günlük and Toprak. Leave Blog until commit 5.
- `app/sitemap.ts`: add real Seçki page; never include preview products or preview producer-store URLs. Remove blog only in commit 5.

**Delete:** none. ProductCollection is reworked, not deleted; `app/page.tsx` need not change at all. All other homepage components remain in their original order.

**Verification steps**

- [ ] Use the previously verified and explicitly approved real slugs; record pre-existing real-detail verification as BLOCKED without substituting fixtures. Stop on any new blocked verification gate.
- [ ] Assert exactly three product links, three source names and required statement lines, with no commercial fields in the intro section in either flag state.
- [ ] Verify other homepage sections/order/outer spacing remain unchanged.
- [ ] Verify four Seçki records and correct image/copy/type/story/store association; all three grid breakpoints; accessible distinct button names.
- [ ] Check default ProducerCard and existing producer pages remain visually unchanged apart from replacing approved preview content. Flag-off producer route verification remains honestly blocked if its current query still fails.
- [ ] Verify ordinary header links and footer-only Üreticiler/Günlük at desktop/mobile widths. Assess potential `/secki`–`/ureticiler` redundancy for final report only; do not consolidate routes.
- [ ] Commit chunk 3 with only these changes and related tests.

### Commit 4 — D1: admin blog only

**Delete**

- `app/admin/(protected)/blog/page.tsx`
- `app/admin/(protected)/blog/new/page.tsx`
- `app/admin/(protected)/blog/[postId]/page.tsx`
- `app/admin/(protected)/blog/[postId]/schedule-form.tsx`
- `app/admin/(protected)/blog/[postId]/preview/page.tsx`
- `app/admin/(protected)/blog/categories/page.tsx`
- `app/admin/(protected)/blog/categories/taxonomy-forms.tsx`
- `app/admin/(protected)/blog/actions.ts`
- `app/admin/(protected)/blog/post-form.tsx`
- `components/admin/blog/rich-text-editor.tsx`

**Modify**

- `lib/admin/nav.ts`: blog item and icon variant only.
- `lib/admin/roles.ts`: manageBlog key only.
- `components/admin/admin-shell.tsx`: unused blog icon import/map entry only.
- `components/admin/ui/status.tsx`: blog type import and BlogStatusTag only.
- `tests/admin-routes.test.js`: admin-blog route expectations only; public blog expectations survive until commit 5.
- `tests/role-revocation.test.js`: remove admin-blog entry from shared denial matrix; this does not authorize running this mutating suite.
- `tests/brand-revision.spec.ts`: removed admin-blog surface and surviving admin-route comparisons.

**Create:** none. **Pattern:** surgical subtraction from existing shared components; no replacement editor or admin shell.

**Preserve:** public blog, all lib/blog modules, public blog components (including render-content used by public pages), shared media, appearance/theme preview, generic admin UI, all historical blog audit action/entity labels. Do not remove orphaned package dependencies from locked manifests.

**Verification steps**

- [ ] Capture surviving admin route responses under the same local test-double auth states before removal.
- [ ] Remove admin-only files/references; update only admin expectations.
- [ ] Run build, typecheck, explicit database-free suite and local admin route comparisons.
- [ ] Commit admin-only chunk, then repeat mandatory build/typecheck/database-free/admin checks at that commit SHA. Report public/unauthenticated/mocked-admin versus live authenticated verification separately.
- [ ] If a surviving admin route breaks and the fix is not obvious, stop and report. Never seed administrators or change roles to obtain a pass.

### Commit 5 — D2: public blog removal and final verification

**Delete**

- Routes: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx`, `app/blog/rss.xml/route.ts`.
- Components: `components/blog/featured-post.tsx`, `post-card.tsx`, `blog-pagination.tsx`, `share-buttons.tsx`, `render-content.tsx`.
- Modules: `lib/blog/media.ts`, `format.ts`, `preview-cookie.ts`, `types.ts`, `content.ts`, `queries.ts`, `slug.ts`, `schema.ts`, after confirming no remaining runtime consumers.
- Blog-only tests: `tests/blog-content.test.ts`, `tests/blog-slug.test.ts`, `tests/blog-preview-cookie.test.ts`, `tests/blog-public.test.js`.

**Modify**

- `app/sitemap.ts`: remove blog import/query/static route/post URLs; preserve product/static routes and no preview publication.
- `lib/site.ts`: remove blog route helpers only.
- `components/layout/site-header.tsx`, `components/layout/site-footer.tsx`: remove Blog links only.
- `tests/routes.test.js`, `tests/admin-routes.test.js`: remove remaining public-blog positive expectations.
- `tests/admin-url-settings.test.ts`: replace arbitrary `/blog/foo` example with a surviving same-origin route; retain test coverage.
- `tests/brand-revision.spec.ts`: public blog/RSS 404s, absent links and sitemap entries, retained `/gunluk`, `/toprak`, producer pages and preview constraints.

**Create:** none. **Pattern:** remove now-orphaned publishing code after admin removal. Database tables and all historical audit labels survive.

- [ ] Confirm no non-blog consumer of any planned deletion; report any shared survivor instead of deleting it.
- [ ] Remove files/links, update tests, verify retained journal/soil/theme/admin surfaces.
- [ ] Commit public-blog chunk.
- [ ] At final SHA run build, typecheck, explicit database-free suite, both preview flag states and browser acceptance. No sixth redirect commit.

## Test commands and evidence boundaries

The current `npm test` includes mutating integration tests. Do not run it with real credentials. In particular `tests/role-revocation.test.js`, `tests/theme-engine-auth.test.ts`, `tests/admin-direct-entry.test.js`, and `tests/blog-public.test.js` can write real data. Standard route smoke tests also require a build/live data and are not database-free proof.

`tests/support/run-database-free.mjs` will execute an explicit reviewed list of pure or mocked tests with Node's existing `--conditions=react-server --import ./tests/alias-hook.mjs` setup and no real credentials. It must reject unexpected network use; adding a future test file must not silently include it. Test code that exercises server-client factories must use spies/test doubles.

Execution commands after applicable files exist:

```sh
npm run build
npm run typecheck
node tests/support/run-database-free.mjs
KABIA_BRAND_PREVIEW=0 node node_modules/@playwright/test/cli.js test --config playwright.brand-revision.config.ts
KABIA_BRAND_PREVIEW=1 node node_modules/@playwright/test/cli.js test --config playwright.brand-revision.config.ts
```

The Playwright configuration must provide dummy public credentials and a local-only endpoint to child servers before Next loads any target env file; it must not copy or create an env file. All screenshots/reports/cache outputs remain under the target. Test support does not add routes or fixture gates to the application. Existing theme/settings read RPCs must be distinguished from forbidden order calls; report zero preview-item mutations and zero create_order calls, not a misleading claim that the whole site makes no read RPCs.

With the real target configured, read-only smoke checks can document current availability, but no guest-to-account migration, review/favorite write, checkout, admin save, role manipulation or fixture seeding is allowed. Current real catalog/producer failures remain BLOCKED, never PASS. Builds alone do not clear those blockers.

## Latitude decisions

1. Centered opening adapts BrandQuote/PageShell because there is no centered farm-opening component here. Existing classes, hierarchy and spacing only.
2. Seven principles use the target's numbered philosophy rows because the source's philosophy-card styling does not exist here. Only verbatim principle text is added.
3. Shared store ledger extracts the target's currently active homepage ledger. New list/purchase units exist to share rendering and behavior, not to introduce another design system.
4. Seçki uses a variant of the current ProducerCard; its default variant stays unchanged. Explicit source collections prevent kitchen omission bugs.
5. Mobile filters reuse a native details/summary pattern presently used in admin charts because the storefront has no collapsible filter component.
6. New timeline interaction uses overlapping grid panels and inert hidden states; it clones target composition but does not copy reference doc-* markup or height-changing transitions.

All other differences are explicit user overrides, not latitude: permanent store redesign in both states; ProductCollection reworked in place; `/secki` added; `/toprak` retained; journal fixtures retired; header/footer choices; no redirects.

## Final report contract

- Five implementation commits in the prescribed order, starting-SHA name-only/stat diff; planning document identified separately as documentation.
- New components mapped to the target patterns above, and any additional deviation explained before use.
- Exact gate condition, reserved-prefix recognizer and furthest permitted preview journey.
- Exact preview teardown file/line list; retain the identity safeguards needed for old guest storage after disabling/removing preview data.
- Per-SHA tests and counts; live catalog/producer blockers; admin verification scope; preview-on/off local review URLs; browser and reduced-motion results.
- `/toprak` overlap result, preserved page and farm link; `/secki`–`/ureticiler` redundancy assessment without merging them.
- Redirect commit skipped because source routes do not exist and `/toprak` is explicitly retained.
- `app/globals.css` completely unmodified; §2.4 inapplicable here. Confirm all other locked files and Supabase files unchanged, and no source/reference/primary-worktree writes.

## Planning closeout

This document was created during planning and is committed separately as documentation, outside the five implementation commits. No statement here overrides PLAN.md or user approvals. The user authorizes implementation with the existing catalog/producer failures prominently reported. Stop at any new BLOCKED verification gate. Keep new test scaffolding independent: no edits to existing test configuration or npm test, and no existing suite depends on the new harness. If scaffolding exceeds the feature work it verifies, stop and report before expanding it.
