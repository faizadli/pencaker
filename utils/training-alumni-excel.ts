import * as XLSX from "xlsx";
import { z } from "zod";
import {
  matchTemplateKejuruanTitle,
  type TrainingAlumniKejuruan,
} from "../constants/training-alumni-kejuruan";
import type { CreateTrainingAlumniRequest } from "../services/training-alumni";
import { nikSchema } from "./zod-schemas";

/** File statis di `public/` — sama dengan tombol unduh */
export const TRAINING_ALUMNI_TEMPLATE_PUBLIC_PATH = "/template-alumni.xlsx";
export const TRAINING_ALUMNI_TEMPLATE_DOWNLOAD_NAME = "template-alumni.xlsx";
export const TRAINING_ALUMNI_IMPORT_MAX_ROWS = 200;

/** Kolom isian per baris di lembar Excel (nama & tahun pelatihan dari modal admin; kejuruan dari judul blok di kolom A) */
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

/** Hanya baris pertama sel (judul bisa punya catatan di baris berikutnya di Excel) */
function normalizeHeader(h: string): string {
  const firstLine = (h.split(/\r?\n/)[0] ?? h).trim();
  return firstLine.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ");
}

const ID_MONTH_TO_MM: Record<string, string> = {
  januari: "01",
  februari: "02",
  maret: "03",
  april: "04",
  mei: "05",
  juni: "06",
  juli: "07",
  agustus: "08",
  september: "09",
  oktober: "10",
  november: "11",
  desember: "12",
};

function phoneFromExcelCell(raw: unknown): string {
  if (raw == null || raw === "") return "";
  if (typeof raw === "string") {
    return raw.trim().replace(/\s/g, "");
  }
  if (typeof raw === "number" && Number.isFinite(raw)) {
    const n = Math.round(raw);
    if (Math.abs(raw - n) < 1e-6 && n >= 0 && n <= Number.MAX_SAFE_INTEGER) {
      return String(n);
    }
    return String(raw).replace(/\s/g, "");
  }
  return String(raw).trim().replace(/\s/g, "");
}

function cellToString(v: unknown): string {
  if (v == null || v === "") return "";
  if (typeof v === "number" && Number.isFinite(v)) {
    if (Number.isInteger(v)) return String(v);
    return String(v).trim();
  }
  return String(v).trim();
}

/**
 * Excel sering menyimpan NIK sebagai angka → tampilan 3,27E+15 dan presisi hilang.
 * Kolom NIK sebaiknya format Teks di Excel. Fungsi ini memperbaiki string notasi ilmiah / angka jika masih bisa.
 */
function nikFromExcelCell(raw: unknown): string {
  if (raw == null || raw === "") return "";
  if (typeof raw === "string") {
    const t = raw.trim();
    const eIdx = t.toUpperCase().indexOf("E");
    if (eIdx >= 0) {
      let mantissa = t.slice(0, eIdx).replace(/\s/g, "");
      if (!mantissa.includes(".") && mantissa.includes(",")) {
        mantissa = mantissa.replace(",", ".");
      }
      const expStr = t.slice(eIdx + 1).trim();
      const n = Number(`${mantissa}e${expStr}`);
      if (Number.isFinite(n) && n >= 0 && n <= Number.MAX_SAFE_INTEGER) {
        return String(Math.round(n)).replace(/\D/g, "").slice(0, 16);
      }
    }
    return t.replace(/\D/g, "").slice(0, 16);
  }
  if (typeof raw === "number" && Number.isFinite(raw)) {
    const n = Math.round(raw);
    if (Math.abs(raw - n) < 1e-6 && n >= 0 && n <= Number.MAX_SAFE_INTEGER) {
      return String(n).replace(/\D/g, "").slice(0, 16);
    }
    return String(raw).replace(/\D/g, "").slice(0, 16);
  }
  return String(raw).replace(/\D/g, "").slice(0, 16);
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
  const collapsed = s.replace(/\s+/g, " ");
  const indo = collapsed.match(/^(\d{1,2})\s+([a-z]+)\s+(\d{4})$/i);
  if (indo) {
    const mm = ID_MONTH_TO_MM[indo[2].toLowerCase()];
    if (mm) {
      const dd = indo[1].padStart(2, "0");
      return `${indo[3]}-${mm}-${dd}`;
    }
  }
  const dmY = collapsed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
  if (dmY) {
    const dd = dmY[1].padStart(2, "0");
    const mm = dmY[2].padStart(2, "0");
    return `${dmY[3]}-${mm}-${dd}`;
  }
  if (/^\d{4}-\d{2}-\d{2}/.test(collapsed)) return collapsed.slice(0, 10);
  return collapsed;
}

function isHeaderRow(row: unknown[]): boolean {
  const norms = row.map((c) => normalizeHeader(cellToString(c)));
  return norms.includes("nama") && norms.includes("nik");
}

function rowHasAnyContent(row: unknown[]): boolean {
  for (const c of row) {
    if (c == null || c === "") continue;
    if (typeof c === "number" && Number.isFinite(c) && c !== 0) return true;
    if (typeof c === "string" && c.trim()) return true;
  }
  return false;
}

/** Baris tampak seperti judul blok tapi tidak ada di master (typo / format salah). */
function looksLikeUnknownKejuruanTitleRow(row: unknown[]): boolean {
  if (isHeaderRow(row)) return false;
  const a0 = cellToString(row[0]);
  if (a0.length < 8) return false;
  const upper = a0.toUpperCase();
  if (!upper.includes("KEJURUAN") && !upper.includes("PENGOLAHAN")) {
    return false;
  }
  const otherFilled = row.slice(1).filter((c) => cellToString(c)).length;
  return otherFilled <= 2;
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
    if (key === "nik") {
      if (nikFromExcelCell(raw)) any = true;
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
    if (key === "phone") {
      out[key] = phoneFromExcelCell(raw);
      return;
    }
    const s = key === "nik" ? nikFromExcelCell(raw) : cellToString(raw);
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
    birth_date: z
      .string()
      .min(1, "Tanggal lahir wajib diisi")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Tanggal lahir tidak valid (contoh: 12 mei 2025)",
      ),
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
  kejuruan: TrainingAlumniKejuruan;
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

  const schema = excelRowSchema();
  const valid: TrainingAlumniParsedValid[] = [];
  const invalid: TrainingAlumniParsedInvalid[] = [];
  let dataRowCount = 0;

  let activeKejuruan: TrainingAlumniKejuruan | null = null;
  let colMap: Map<number, ExcelFieldKey> | null = null;

  for (let i = 0; i < matrix.length; i++) {
    const row = matrix[i] ?? [];
    const a0 = cellToString(row[0]);

    const titleMatch = matchTemplateKejuruanTitle(a0);
    if (titleMatch) {
      activeKejuruan = titleMatch;
      continue;
    }

    if (looksLikeUnknownKejuruanTitleRow(row)) {
      return {
        ok: false,
        message: `Baris ${i + 1}: judul kejuruan tidak dikenali (“${a0}”). Gunakan teks judul blok persis seperti di template-alumni.xlsx.`,
      };
    }

    if (isHeaderRow(row)) {
      const built = buildColumnMap(row);
      if ("error" in built) {
        return { ok: false, message: built.error };
      }
      colMap = built.map;
      continue;
    }

    if (activeKejuruan && !colMap && rowHasAnyContent(row)) {
      return {
        ok: false,
        message: `Baris ${i + 1}: setelah judul kejuruan (kolom A) harus ada baris header kolom (NAMA, NIK, …).`,
      };
    }

    if (!activeKejuruan || !colMap) continue;

    if (rowIsEmpty(row, colMap)) continue;

    dataRowCount++;
    const rowNumber = i + 1;

    if (dataRowCount > TRAINING_ALUMNI_IMPORT_MAX_ROWS) {
      return {
        ok: false,
        message: `Maksimal ${TRAINING_ALUMNI_IMPORT_MAX_ROWS} baris data per file (semua blok).`,
      };
    }

    const payload = rowToPayload(row, colMap);
    const parsed = schema.safeParse(payload);
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      invalid.push({
        rowNumber,
        message: first?.message ?? "Data tidak valid",
      });
      continue;
    }

    valid.push({
      rowNumber,
      kejuruan: activeKejuruan,
      data: parsed.data,
    });
  }

  if (dataRowCount === 0) {
    const anyHeader = matrix.some((r) => isHeaderRow(r ?? []));
    const anyTitle = matrix.some((r) =>
      matchTemplateKejuruanTitle(cellToString((r ?? [])[0])),
    );
    if (anyHeader && !anyTitle) {
      return {
        ok: false,
        message:
          "Judul blok kejuruan di kolom A tidak ditemukan. Gunakan template-alumni.xlsx terbaru (satu baris judul per blok, lalu baris NAMA/NIK).",
      };
    }
    return {
      ok: false,
      message:
        "Tidak ada baris data yang diisi. Isi baris pada blok kejuruan yang dipakai; blok lain boleh dikosongkan.",
    };
  }

  return { ok: true, valid, invalid };
}
