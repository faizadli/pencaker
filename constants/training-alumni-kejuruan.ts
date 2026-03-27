import type { SearchableSelectOption } from "../components/ui/field";

/** Daftar program kejuruan untuk alumni pelatihan (input admin). */
export const TRAINING_ALUMNI_KEJURUAN_LIST = [
  "Kejuruan Operator Komputer",
  "Kejuruan Security",
  "Kejuruan Mekanik Alat Berat Batch I",
  "Kejuruan Mekanik Alat Berat Batch II",
  "Pengolahan Rumput Laut Batch I",
  "Pengolahan Rumput Laut Batch II",
  "Kejuruan Teknisi HP",
  "Kejuruan Teknisi Komputer",
  "Kejuruan Mekanik Perikanan",
  "Kejuruan Barbershop",
  "Kejuruan Cleaning Service",
  "Kejuruan Calon Instruktur",
] as const;

export type TrainingAlumniKejuruan =
  (typeof TRAINING_ALUMNI_KEJURUAN_LIST)[number];

/** Normalisasi judul blok di Excel (kolom A) agar bisa dicocokkan ke daftar kanonik. */
function normalizeKejuruanTitleKey(s: string): string {
  return s.trim().toUpperCase().replace(/\./g, "").replace(/\s+/g, " ");
}

/**
 * Cocokkan teks judul blok dari template Excel ke nilai kanonik di `TRAINING_ALUMNI_KEJURUAN_LIST`.
 * Template memakai huruf besar (mis. `KEJURUAN OPERATOR KOMPUTER`); daftar UI memakai bentuk judul.
 */
export function matchTemplateKejuruanTitle(
  raw: string,
): TrainingAlumniKejuruan | null {
  const key = normalizeKejuruanTitleKey(raw);
  if (!key) return null;
  for (const canonical of TRAINING_ALUMNI_KEJURUAN_LIST) {
    if (normalizeKejuruanTitleKey(canonical) === key) return canonical;
  }
  return null;
}

export const TRAINING_ALUMNI_KEJURUAN_OPTIONS: SearchableSelectOption[] =
  TRAINING_ALUMNI_KEJURUAN_LIST.map((label) => ({
    value: label,
    label,
  }));
