"use server"

import { revalidatePath } from "next/cache"
import { z } from "zod"
import { adminContext } from "@/lib/admin/auth"
import { toActionState, type ActionState } from "@/lib/admin/errors"
import { fieldErrorsFrom, uuid } from "@/lib/admin/schemas"

/**
 * Triage for the İletişim inbox.
 *
 * The only column an administrator moves is `status`. `read_at` is derived from
 * it here rather than being sent by the form, because the table's
 * `contact_messages_read_at_matches_status` constraint refuses any pairing of
 * the two that a reader would find confusing — deriving it is what keeps this
 * action from being able to violate that by accident.
 *
 * The message body is never updated: what somebody sent is what stays on file.
 */

const triageSchema = z.object({
  messageId: uuid,
  status: z.enum(["new", "read", "archived"], {
    message: "Geçersiz mesaj durumu.",
  }),
})

export async function setContactMessageStatus(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  try {
    const { supabase } = await adminContext("viewMessages")

    const parsed = triageSchema.safeParse({
      messageId: formData.get("messageId"),
      status: formData.get("status"),
    })
    if (!parsed.success) {
      return {
        ok: false,
        message: "Mesaj durumu güncellenemedi.",
        fieldErrors: fieldErrorsFrom(parsed.error),
      }
    }

    const { messageId, status } = parsed.data

    // read_at means *first* read, so archiving something already read must not
    // overwrite it. PostgREST cannot express `coalesce(read_at, now())` in an
    // update, so the current value is read back first — one extra round trip on
    // a button an administrator presses by hand.
    let readAt: string | null = null
    if (status !== "new") {
      const { data: existing, error: readError } = await supabase
        .from("contact_messages")
        .select("read_at")
        .eq("id", messageId)
        .maybeSingle()
      if (readError) return toActionState(readError, "contactMessages:read")
      if (!existing) return { ok: false, message: "Mesaj bulunamadı." }
      readAt = existing.read_at ?? new Date().toISOString()
    }

    const { error } = await supabase
      .from("contact_messages")
      .update({ status, read_at: readAt })
      .eq("id", messageId)

    if (error) return toActionState(error, "contactMessages:triage")

    revalidatePath("/admin/messages")
    return { ok: true }
  } catch (error) {
    return toActionState(error, "contactMessages:triage")
  }
}
