-- ---------------------------------------------------------------------------
-- What the İletişim form leaves behind.
--
-- The form is public, so the first question is who is allowed to write here.
-- The answer is: nobody, through PostgREST. There is deliberately no anon
-- INSERT policy and the anon role is stripped of its table grants — the form
-- posts to a server action, which validates the fields and inserts with the
-- service role. That keeps a world-writable endpoint off the table entirely
-- and leaves one place (app/iletisim/actions.ts) where the shape of an
-- accepted message is decided.
--
-- The CHECK constraints repeat the zod schema on purpose. The schema is what
-- gives the visitor a readable error; these are what make a bug in the action
-- unable to write a row the admin screen cannot render.
--
-- Reading and triage are administrative, so those go through the ordinary
-- admin policies. There is no DELETE policy: a message somebody took the
-- trouble to send is archived, not erased. Spam is archived too — if that ever
-- needs to become a purge, it should arrive as its own migration with its own
-- reasoning, not as a policy loosened in passing.
--
-- Rollback: drop the policies, then the table.
-- ---------------------------------------------------------------------------

create table if not exists public.contact_messages (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null,
  email      text        not null,
  -- Optional: plenty of people would rather be called back than written to,
  -- and plenty would rather not leave a number at all.
  phone      text,
  subject    text        not null,
  message    text        not null,
  -- Triage state, not a workflow. 'new' until somebody opens it, 'archived'
  -- once it is dealt with; nothing here tracks who replied or when, because
  -- the reply happens in a mail client this table cannot see.
  status     text        not null default 'new',
  created_at timestamptz not null default now(),
  read_at    timestamptz,

  constraint contact_messages_name_length
    check (char_length(btrim(name)) between 2 and 120),
  -- Not an attempt to validate an address — only to refuse what cannot be one.
  -- Deliverability is proven by replying, not by a regex.
  constraint contact_messages_email_shape
    check (char_length(email) between 5 and 254 and email like '%_@_%.__%'),
  constraint contact_messages_phone_length
    check (phone is null or char_length(btrim(phone)) between 7 and 32),
  constraint contact_messages_subject_allowed
    check (subject in ('siparis', 'urun', 'uretici', 'diger')),
  constraint contact_messages_message_length
    check (char_length(btrim(message)) between 10 and 4000),
  constraint contact_messages_status_allowed
    check (status in ('new', 'read', 'archived')),
  -- read_at and status move together: a row cannot claim to be untouched and
  -- carry a read timestamp, or claim to be read without one.
  constraint contact_messages_read_at_matches_status
    check ((status = 'new') = (read_at is null))
);

comment on table public.contact_messages is
  'Messages left through the public İletişim form. Written by the server action with the service role; read and triaged by administrators.';
comment on column public.contact_messages.status is
  'new until an administrator opens it, then read, then archived. Never deleted.';
comment on column public.contact_messages.read_at is
  'Set the first time the message leaves ''new''. Null exactly when status is ''new''.';

-- ---- indexes ---------------------------------------------------------------
-- The inbox is read newest-first, either whole or filtered to one status, so
-- created_at leads the plain index and trails the filtered one.

create index if not exists idx_contact_messages_created_at
  on public.contact_messages (created_at desc);

create index if not exists idx_contact_messages_status_created_at
  on public.contact_messages (status, created_at desc);

-- ---- RLS -------------------------------------------------------------------

alter table public.contact_messages enable row level security;

-- Belt and braces next to the missing anon policy: even if a policy were added
-- by mistake later, the role has no privilege on the table to exercise it.
revoke all on table public.contact_messages from anon;

drop policy if exists contact_messages_admin_select on public.contact_messages;
drop policy if exists contact_messages_admin_update on public.contact_messages;

create policy contact_messages_admin_select on public.contact_messages
  for select to authenticated
  using (public.has_admin_role());

-- Triage only. The policy cannot express "may change status but not message",
-- so the action is the thing that only ever sends status and read_at; what the
-- policy guarantees is that nobody outside the admin roles writes at all.
create policy contact_messages_admin_update on public.contact_messages
  for update to authenticated
  using (public.has_admin_role())
  with check (public.has_admin_role());
