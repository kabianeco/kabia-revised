/**
 * The İletişim form's vocabulary, named once.
 *
 * The ids are what reach the database, so they are also what the migration's
 * `contact_messages_subject_allowed` constraint lists — changing one means
 * changing both, plus a migration for the rows already written under the old
 * name. The labels are only ever read by a person and can be reworded freely.
 */
export const CONTACT_SUBJECTS = [
  { id: "siparis", label: "Siparişim hakkında" },
  { id: "urun", label: "Ürünler ve stok" },
  { id: "uretici", label: "Üretici olarak çalışmak" },
  { id: "diger", label: "Başka bir konu" },
] as const

export type ContactSubject = (typeof CONTACT_SUBJECTS)[number]["id"]

const SUBJECT_LABELS: Record<string, string> = Object.fromEntries(
  CONTACT_SUBJECTS.map((subject) => [subject.id, subject.label]),
)

/** Falls back to the stored id so an old subject still renders as something. */
export function contactSubjectLabel(id: string): string {
  return SUBJECT_LABELS[id] ?? id
}

export const CONTACT_STATUSES = [
  { id: "new", label: "Yeni" },
  { id: "read", label: "Okundu" },
  { id: "archived", label: "Arşivlendi" },
] as const

export type ContactStatus = (typeof CONTACT_STATUSES)[number]["id"]

const STATUS_LABELS: Record<string, string> = Object.fromEntries(
  CONTACT_STATUSES.map((status) => [status.id, status.label]),
)

export function contactStatusLabel(id: string): string {
  return STATUS_LABELS[id] ?? id
}

export interface ContactMessageRow {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  status: string
  created_at: string
  read_at: string | null
}
