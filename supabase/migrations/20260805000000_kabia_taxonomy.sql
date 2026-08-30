-- ---------------------------------------------------------------------------
-- KABIA 2.0 — product source taxonomy + producers.
--
-- Kabia sells three kinds of thing: what it grows itself (ciftlik), what it
-- selects from small producers it trusts (secki), and traditional small-batch
-- goods it curates (mutfak). This migration adds that distinction to
-- `products` and introduces `producers` so a Selection or Kitchen product can
-- point at who actually made it.
--
-- Column reuse, deliberate: `products` already has `origin`, `production_method`,
-- `storage_conditions` and `certifications` (free text) from the original
-- schema. This migration does NOT duplicate them as `region` / `storage` — the
-- brief's proposed columns were UI labels for data that already has a home.
-- Only genuinely new fields are added: `source`, `certification` (a
-- constrained enum, kept separate from the existing free-text
-- `certifications` — see below), `producer_id`, `harvest_year`, `lot_code`,
-- `variety`, `rootstock`, `processing`, `allergens`, `net_weight`.
--
-- `certification` vs `certifications`: the existing `certifications` column is
-- free text an admin can type anything into. `certification` is a constrained
-- enum that carries legal weight — 'organik_sertifikali' asserts a real
-- organic certificate exists. The two are kept separate on purpose so a loose
-- free-text note can never be read as a certification claim.
--
-- Certification backfill: every existing product is set to 'kabia_secki' (the
-- non-organic default), never 'organik_sertifikali'. This migration has no
-- reliable way to confirm which existing products hold a genuine organic
-- certificate from free-text data alone, and the brief is explicit that an
-- uncertain product must not be labeled organic. An administrator reviews and
-- upgrades individual products to 'organik_sertifikali' by hand once actual
-- certificates are confirmed.
--
-- RLS on `producers` mirrors `blog_posts`/`blog_categories` exactly: public
-- read where is_published = true, admin read/write via has_admin_role(). No
-- new authorization scheme.
--
-- Rollback: drop the two new policies and RLS on producers, drop the
-- producers table, drop the ten new products columns, drop the two enums.
-- ---------------------------------------------------------------------------

do $$
begin
  if not exists (
    select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'product_source' and n.nspname = 'public'
  ) then
    create type public.product_source as enum ('ciftlik', 'secki', 'mutfak');
  end if;
end $$;

do $$
begin
  if not exists (
    select 1 from pg_type t join pg_namespace n on n.oid = t.typnamespace
    where t.typname = 'product_certification' and n.nspname = 'public'
  ) then
    create type public.product_certification as enum (
      'organik_sertifikali', 'kabia_secki', 'kabia_mutfak'
    );
  end if;
end $$;

-- ---- producers ---------------------------------------------------------------

create table if not exists public.producers (
  id                 uuid primary key default gen_random_uuid(),
  slug               text not null,
  name               text not null check (char_length(name) between 2 and 120),
  product_type       text,
  region             text,
  photo_url          text,
  story              text,
  production_place   text,
  method             text,
  inputs             text,
  certificates       text,
  why_selected       text,
  is_published       boolean not null default false,
  created_at         timestamptz not null default now()
);

comment on table public.producers is
  'Small producers Kabia sources Seçki/Mutfak products from. is_published gates public visibility, same pattern as blog_posts.';

create unique index if not exists producers_slug_uniq on public.producers (lower(slug));
create index if not exists idx_producers_published on public.producers (created_at desc) where is_published;

-- ---- products: new columns ----------------------------------------------------

alter table public.products
  add column if not exists source            public.product_source not null default 'ciftlik',
  add column if not exists certification     public.product_certification,
  add column if not exists producer_id       uuid references public.producers(id) on delete set null,
  add column if not exists harvest_year      integer,
  add column if not exists lot_code          text,
  add column if not exists variety           text,
  add column if not exists rootstock         text,
  add column if not exists processing        text,
  add column if not exists allergens         text,
  add column if not exists net_weight        text;

comment on column public.products.source is
  'Which of Kabia''s three product lines this belongs to: ciftlik (own farm), secki (trusted producers), mutfak (traditional small-batch).';
comment on column public.products.certification is
  'Legal-weight label. organik_sertifikali may only be set once a genuine organic certificate is confirmed — see migration header. kabia_secki / kabia_mutfak express Kabia''s own selection approach, not official certification.';

-- Backfill: see migration header for why every existing row gets the
-- non-organic default rather than any heuristic upgrade.
update public.products set certification = 'kabia_secki' where certification is null;

alter table public.products alter column certification set not null;

create index if not exists idx_products_source on public.products (source);
create index if not exists idx_products_producer_id on public.products (producer_id) where producer_id is not null;

-- ---- RLS: producers -------------------------------------------------------------

alter table public.producers enable row level security;

drop policy if exists producers_public_select on public.producers;
drop policy if exists producers_admin_select   on public.producers;
drop policy if exists producers_admin_write    on public.producers;

create policy producers_public_select on public.producers
  for select to anon, authenticated
  using (is_published = true);

create policy producers_admin_select on public.producers
  for select to authenticated
  using (public.has_admin_role());

create policy producers_admin_write on public.producers
  for all to authenticated
  using (public.has_admin_role())
  with check (public.has_admin_role());

-- products already has a single public-read policy (is_active = true) that
-- covers every column, including these new ones — no RLS change needed there.
