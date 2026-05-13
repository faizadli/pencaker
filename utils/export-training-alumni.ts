import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { TrainingAlumniRow } from "../services/training-alumni";

function formatIdDateExcel(s?: string | null): string {
  const raw = String(s ?? "")
    .trim()
    .slice(0, 10);
  if (!raw) return "";
  const d = new Date(`${raw}T12:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function sourceLabel(source: TrainingAlumniRow["source"]): string {
  if (source === "admin_manual") return "Admin (impor/form)";
  if (source === "candidate_registration") return "Pendaftaran pencaker";
  if (source === "guest_registration") return "Pendaftaran tamu";
  return String(source ?? "");
}

function safeFileNamePart(s: string): string {
  return (
    s
      .replace(/[<>:"/\\|?*]/g, "_")
      .trim()
      .slice(0, 80) || "pelatihan"
  );
}

/**
 * Ekspor rekap peserta latihan ke .xlsx (client-side).
 * Filter mengikuti API list (nama dan/atau tahun).
 */
export async function exportTrainingAlumniRowsXlsx(
  rows: TrainingAlumniRow[],
  options: { trainingYear: number; trainingName?: string },
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Pencaker";
  const sheet = workbook.addWorksheet("Peserta latihan", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  const headers = [
    "No",
    "Nama pelatihan",
    "Tahun",
    "Nama lembaga",
    "Tanggal mulai",
    "Tanggal selesai",
    "Nama peserta",
    "NIK",
    "Nomor KK",
    "Jenis kelamin",
    "Tempat lahir",
    "Tanggal lahir",
    "Email",
    "No. HP",
    "Alamat",
    "Pendidikan terakhir",
    "Sumber data",
  ];

  const headerRow = sheet.addRow(headers);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", wrapText: true };

  const colWidths = [
    6, 28, 8, 24, 14, 14, 28, 18, 18, 14, 18, 14, 28, 16, 40, 22,
  ];
  colWidths.forEach((w, i) => {
    sheet.getColumn(i + 1).width = w;
  });

  rows.forEach((r, idx) => {
    const row = sheet.addRow([
      idx + 1,
      r.training_name ?? "",
      r.training_year ?? "",
      r.institution_name ?? "",
      formatIdDateExcel(r.start_date),
      formatIdDateExcel(r.end_date),
      r.full_name ?? "",
      r.nik ?? r.profile_nik ?? "",
      r.no_kk ?? "",
      r.gender === "P" ? "Perempuan" : r.gender === "L" ? "Laki-laki" : "",
      r.birth_place ?? "",
      formatIdDateExcel(r.birth_date),
      r.email ?? "",
      r.phone ?? "",
      r.address ?? "",
      r.last_education ?? "",
      sourceLabel(r.source),
    ]);
    row.getCell(8).numFmt = "@";
    row.getCell(9).numFmt = "@";
    row.getCell(14).numFmt = "@";
    row.alignment = { vertical: "top", wrapText: true };
  });

  const y = options.trainingYear;
  const namePart = options.trainingName?.trim()
    ? `_${safeFileNamePart(options.trainingName.trim())}`
    : "";
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `Rekap_Pelatihan_${y}${namePart}.xlsx`);
}
