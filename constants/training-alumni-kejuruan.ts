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

export const TRAINING_ALUMNI_KEJURUAN_OPTIONS: SearchableSelectOption[] =
  TRAINING_ALUMNI_KEJURUAN_LIST.map((label) => ({
    value: label,
    label,
  }));
