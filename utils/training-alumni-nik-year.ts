import type { TrainingAlumniRow } from "../services/training-alumni";

export function normalizeTrainingAlumniNik(nik: string): string {
  return nik.replace(/\D/g, "").slice(0, 16);
}

/** Kunci unik: satu orang (NIK) tidak boleh dua pelatihan dalam tahun yang sama */
export function trainingAlumniNikYearKey(
  nikNormalized: string,
  trainingYear: number,
): string {
  return `${nikNormalized}|${trainingYear}`;
}

export function buildNikYearSetFromRows(
  rows: TrainingAlumniRow[],
): Set<string> {
  const set = new Set<string>();
  for (const r of rows) {
    const n = normalizeTrainingAlumniNik(r.nik ?? r.profile_nik ?? "");
    if (n.length !== 16) continue;
    set.add(trainingAlumniNikYearKey(n, r.training_year));
  }
  return set;
}

export function rowMatchesNikAndYear(
  row: TrainingAlumniRow,
  nikNormalized: string,
  trainingYear: number,
): boolean {
  if (nikNormalized.length !== 16) return false;
  const n = normalizeTrainingAlumniNik(row.nik ?? row.profile_nik ?? "");
  return n === nikNormalized && row.training_year === trainingYear;
}
