"use client";

import { useRouter } from "next/navigation";
import { SelectField } from "@/components/ui/field";
import { SORT_OPTIONS } from "@/lib/store-listing";

/**
 * Sorting as a single control rather than a row of links.
 *
 * The URL stays the source of truth — every choice navigates to the same
 * shareable `?sirala=` address the link version produced — so a sorted view
 * still survives a refresh, the back button and being pasted to someone else.
 * Options carry their target href, so the server decides the addresses and this
 * only has to follow one.
 */
export function SortSelect({
  value,
  options,
}: {
  value: string;
  options: { id: string; label: string; href: string }[];
}) {
  const router = useRouter();

  return (
    <SelectField
      label="Sırala"
      value={value}
      wrapperClassName="w-full sm:w-56"
      onChange={(event) => {
        const next = options.find((option) => option.id === event.target.value);
        if (next) router.push(next.href, { scroll: false });
      }}
    >
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </SelectField>
  );
}

export { SORT_OPTIONS };
