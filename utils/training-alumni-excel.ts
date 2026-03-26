import * as XLSX from "xlsx";
import { z } from "zod";
import type { CreateTrainingAlumniRequest } from "../services/training-alumni";
import { nikSchema } from "./zod-schemas";

/** File statis di `public/` — sama dengan tombol unduh */
export const TRAINING_ALUMNI_TEMPLATE_PUBLIC_PATH = "/template-alumni.xlsx";
export const TRAINING_ALUMNI_TEMPLATE_DOWNLOAD_NAME = "template-alumni.xlsx";
export const TRAINING_ALUMNI_IMPORT_MAX_ROWS = 200;

/** Kolom isian di lembar Excel (nama pelatihan, tahun, kejuruan dari modal admin) */
export type TrainingAlumniExcelRowData = Pick<
  CreateTrainingAlumniRequest,
  | "full_name"
  | "nik"
  | "gender"
  | "birth_place"
  | "birth_date"
  | "email"
  | "phone"
  | "address"
  | "last_education"
>;

type ExcelFieldKey = keyof TrainingAlumniExcelRowData;

const FIELD_KEYS: ExcelFieldKey[] = [
  "full_name",
  "nik",
  "gender",
  "birth_place",
  "birth_date",
  "email",
  "phone",
  "address",
  "last_education",
];

/** Judul kolom template (baris header) → field API */
const HEADER_ALIASES: Record<string, ExcelFieldKey | null> = {
  no: null,
  "no urut": null,
  nama: "full_name",
  nik: "nik",
  "jenis kelamin": "gender",
  "j kelamin": "gender",
  jk: "gender",
  email: "email",
  "tempat lahir": "birth_place",
  "tanggal lahir": "birth_date",
  alamat: "address",
  "alamat lengkap": "address",
  "no hp": "phone",
  "no telp": "phone",
  "no telpon": "phone",
  "nomor hp": "phone",
  telepon: "phone",
  hp: "phone",
  "pendidikan terakhir": "last_education",
};

function normalizeHeader(h: string): string {
  return h.trim().toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
}

function cellToString(v: unknown): string {
  if (v == null || v === "") return "";
  if (typeof v === "number" && Number.isFinite(v)) {
    if (Number.isInteger(v)) return String(v);
    return String(v).trim();
  }
  return String(v).trim();
}

/** Serial tanggal Excel atau teks → YYYY-MM-DD */
export function parseExcelDateValue(v: unknown): string {
  if (v == null || v === "") return "";
  if (typeof v === "number" && Number.isFinite(v)) {
    const whole = Math.floor(v);
    const epoch = Date.UTC(1899, 11, 30);
    const d = new Date(epoch + whole * 86400000);
    if (!Number.isNaN(d.getTime())) return d.toISOString().slice(0, 10);
  }
  const s = String(v).trim();
  const dmY = s.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmY) {
    const dd = dmY[1].padStart(2, "0");
    const mm = dmY[2].padStart(2, "0");
    return `${dmY[3]}-${mm}-${dd}`;
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  return s;
}

function findHeaderRowIndex(matrix: unknown[][]): number {
  for (let i = 0; i < Math.min(matrix.length, 25); i++) {
    const row = matrix[i] || [];
    const norms = row.map((c) => normalizeHeader(cellToString(c)));
    const hasNama = norms.some((n) => n === "nama");
    const hasNik = norms.some((n) => n === "nik");
    if (hasNama && hasNik) return i;
  }
  return -1;
}

function buildColumnMap(
  headerRow: unknown[],
): { map: Map<number, ExcelFieldKey> } | { error: string } {
  const map = new Map<number, ExcelFieldKey>();
  const seen = new Set<ExcelFieldKey>();

  headerRow.forEach((cell, colIdx) => {
    const norm = normalizeHeader(cellToString(cell));
    if (!norm) return;
    const key = HEADER_ALIASES[norm];
    if (key === undefined) return;
    if (key === null) return;
    map.set(colIdx, key);
    seen.add(key);
  });

  const missing = FIELD_KEYS.filter((k) => !seen.has(k));
  if (missing.length > 0) {
    return {
      error:
        "Judul kolom tidak dikenali. Gunakan file template-alumni.xlsx (baris berisi NAMA, NIK, JENIS KELAMIN, EMAIL, dll.).",
    };
  }

  return { map };
}

function rowIsEmpty(
  row: unknown[],
  colMap: Map<number, ExcelFieldKey>,
): boolean {
  let any = false;
  colMap.forEach((key, idx) => {
    const raw = row[idx];
    if (key === "birth_date") {
      if (parseExcelDateValue(raw)) any = true;
      return;
    }
    if (cellToString(raw)) any = true;
  });
  return !any;
}

function rowToPayload(
  row: unknown[],
  colMap: Map<number, ExcelFieldKey>,
): Partial<Record<ExcelFieldKey, string>> {
  const out: Partial<Record<ExcelFieldKey, string>> = {};
  colMap.forEach((key, colIdx) => {
    const raw = row[colIdx];
    if (key === "birth_date") {
      out[key] = parseExcelDateValue(raw);
      return;
    }
    let s = cellToString(raw);
    if (key === "phone" || key === "nik") s = s.replace(/\D/g, "");
    out[key] = s;
  });
  return out;
}

const genderFromExcelSchema = z.preprocess(
  (v) => {
    const s = String(v ?? "")
      .trim()
      .toUpperCase();
    if (!s) return v;
    if (s === "L" || s.startsWith("LAKI")) return "L";
    if (s === "P" || s.startsWith("PEREMPUAN")) return "P";
    return v;
  },
  z.enum(["L", "P"], {
    message: "Jenis kelamin: L, P, Laki-laki, atau Perempuan",
  }),
);

function excelRowSchema() {
  return z.object({
    full_name: z.string().min(1, "Nama wajib diisi"),
    nik: nikSchema,
    gender: genderFromExcelSchema,
    birth_place: z.string().min(1, "Tempat lahir wajib diisi"),
    birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
    email: z.string().email("Email tidak valid"),
    phone: z
      .string()
      .min(10, "No. HP minimal 10 digit")
      .max(20)
      .regex(/^\d+$/, "No. HP hanya angka"),
    address: z.string().min(1, "Alamat wajib diisi"),
    last_education: z.string().min(1, "Pendidikan terakhir wajib diisi"),
  });
}

export function downloadTrainingAlumniTemplate(): void {
  const a = document.createElement("a");
  a.href = TRAINING_ALUMNI_TEMPLATE_PUBLIC_PATH;
  a.download = TRAINING_ALUMNI_TEMPLATE_DOWNLOAD_NAME;
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export type TrainingAlumniParsedValid = {
  rowNumber: number;
  data: TrainingAlumniExcelRowData;
};

export type TrainingAlumniParsedInvalid = {
  rowNumber: number;
  message: string;
};

export type ParseTrainingAlumniExcelResult =
  | {
      ok: true;
      valid: TrainingAlumniParsedValid[];
      invalid: TrainingAlumniParsedInvalid[];
    }
  | { ok: false; message: string };

export async function parseTrainingAlumniExcel(
  file: File,
): Promise<ParseTrainingAlumniExcelResult> {
  const lower = file.name.toLowerCase();
  if (!lower.endsWith(".xlsx") && !lower.endsWith(".xls")) {
    return { ok: false, message: "Gunakan file .xlsx atau .xls" };
  }

  let wb: XLSX.WorkBook;
  try {
    const buf = await file.arrayBuffer();
    wb = XLSX.read(buf, { type: "array" });
  } catch {
    return { ok: false, message: "File tidak dapat dibaca sebagai Excel" };
  }

  const sheetName = wb.SheetNames[0];
  if (!sheetName) {
    return { ok: false, message: "Berkas tidak memiliki lembar kerja" };
  }

  const sheet = wb.Sheets[sheetName];
  const matrix = XLSX.utils.sheet_to_json<
    (string | number | null | undefined)[]
  >(sheet, {
    header: 1,
    defval: "",
    raw: true,
  });

  if (!matrix.length) {
    return { ok: false, message: "Lembar kerja kosong" };
  }

  const headerIdx = findHeaderRowIndex(matrix);
  if (headerIdx < 0) {
    return {
      ok: false,
      message:
        "Baris judul tidak ditemukan. Pastikan memakai template-alumni.xlsx (kolom NAMA, NIK, …).",
    };
  }

  const headerRow = matrix[headerIdx] ?? [];
  const col = buildColumnMap(headerRow);
  if ("error" in col) {
    return { ok: false, message: col.error };
  }

  const schema = excelRowSchema();
  const valid: TrainingAlumniParsedValid[] = [];
  const invalid: TrainingAlumniParsedInvalid[] = [];
  let dataRowCount = 0;

  for (let i = headerIdx + 1; i < matrix.length; i++) {
    const row = matrix[i] ?? [];
    if (rowIsEmpty(row, col.map)) continue;

    dataRowCount++;
    const rowNumber = i + 1;

    if (dataRowCount > TRAINING_ALUMNI_IMPORT_MAX_ROWS) {
      return {
        ok: false,
        message: `Maksimal ${TRAINING_ALUMNI_IMPORT_MAX_ROWS} baris data per file (tanpa baris judul).`,
      };
    }

    const payload = rowToPayload(row, col.map);
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      invalid.push({
        rowNumber,
        message: first?.message ?? "Data tidak valid",
      });
      continue;
    }

    valid.push({ rowNumber, data: parsed.data });
  }

  if (dataRowCount === 0) {
    return { ok: false, message: "Tidak ada baris data di bawah baris judul" };
  }

  return { ok: true, valid, invalid };
}
