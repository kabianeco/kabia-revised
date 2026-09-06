"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ACTION_IDLE } from "@/lib/admin/errors"
import { CONTACT_STATUSES } from "@/lib/contact"
import { setContactMessageStatus } from "./actions"

function StatusButton({ value, label, current }: { value: string; label: string; current: string }) {
  const { pending } = useFormStatus()
  const active = value === current
  return (
    <button
      type="submit"
      name="status"
      value={value}
      // The state a message is already in is shown, not offered: pressing it
      // would be a write that changes nothing except read_at's provenance.
      disabled={active || pending}
      aria-current={active ? "true" : undefined}
      className={
        active
          ? "rounded-[4px] border border-ink/20 bg-ivory px-3 py-1.5 text-xs text-ink"
          : "rounded-[4px] border border-ink/10 px-3 py-1.5 text-xs text-ink/60 transition-colors hover:border-ink/25 hover:text-ink disabled:opacity-50"
      }
    >
      {label}
    </button>
  )
}

/** The three triage buttons under one message. */
export function MessageTriage({ messageId, status }: { messageId: string; status: string }) {
  const [state, formAction] = useActionState(setContactMessageStatus, ACTION_IDLE)

  return (
    <form action={formAction} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="messageId" value={messageId} />
      {CONTACT_STATUSES.map((option) => (
        <StatusButton
          key={option.id}
          value={option.id}
          label={option.label}
          current={status}
        />
      ))}
      {state.message && !state.ok && (
        <span role="alert" className="ml-2 text-xs text-clay">
          {state.message}
        </span>
      )}
    </form>
  )
}
