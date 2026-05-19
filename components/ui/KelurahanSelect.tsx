"use client";

import { SearchableSelect, type SearchableSelectOption } from "./field";

export const KELURAHAN_KECAMATAN_HINT =
  "Pilih kecamatan terlebih dahulu untuk memilih kelurahan.";

type KelurahanSelectProps = {
  kecamatan: string;
  villageOptions: SearchableSelectOption[];
  value: string;
  onChange: (value: string) => void;
  emptyOptionLabel?: string;
  label?: string;
  className?: string;
  error?: string;
  required?: boolean;
  submitted?: boolean;
};

/** Kelurahan dropdown — disabled with hint until kecamatan is selected. */
export function KelurahanSelect({
  kecamatan,
  villageOptions,
  emptyOptionLabel = "Pilih...",
  label = "Kelurahan",
  ...rest
}: KelurahanSelectProps) {
  const needsKecamatan = !String(kecamatan || "").trim();

  return (
    <SearchableSelect
      label={label}
      options={[{ value: "", label: emptyOptionLabel }, ...villageOptions]}
      disabled={needsKecamatan}
      hint={needsKecamatan ? KELURAHAN_KECAMATAN_HINT : undefined}
      placeholder={needsKecamatan ? "Pilih kecamatan dulu" : undefined}
      {...rest}
    />
  );
}
