"use client";

import { useRouter } from "next/navigation";
import { SelectField } from "@/components/ui/field";

/**
 * Category as a single control beside sorting, rather than a second row of
 * links.
 *
 * The URL stays the source of truth — every choice navigates to the same
 * shareable `?kategori=` address the link version produced — so a filtered
 * view still survives a refresh, the back button and being pasted to someone
 * else. Options carry their target href, so the server decides the addresses
 * and this only has to follow one.
 */
export function CategorySelect({
  value,
  options,
}: {
  value: string;
  options: { id: string; label: string; href: string }[];
}) {
  const router = useRouter();

  return (
    <SelectField
      label="Kategori"
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
