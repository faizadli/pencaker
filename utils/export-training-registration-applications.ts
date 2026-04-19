import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import type { TrainingRegistrationApplication } from "../services/training-registration";

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

function statusLabel(status: TrainingRegistrationApplication["status"]): string {
  if (status === "accepted") return "Diterima";
  if (status === "rejected") return "Ditolak";
  return "Menunggu";
}

function safeFileNamePart(s: string): string {
  return s.replace(/[<>:"/\\|?*]/g, "_").trim().slice(0, 80) || "pendaftar";
}

/**
 * Ekspor daftar pengajuan pendaftaran pelatihan ke .xlsx (client-side).
 */
export async function exportTrainingRegistrationApplicationsXlsx(
  apps: TrainingRegistrationApplication[],
  options: { campaignName: string; idSuffix?: string },
): Promise<void> {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "Pencaker";
  const sheet = workbook.addWorksheet("Pendaftar", {
    views: [{ state: "frozen", ySplit: 1 }],
  });

  const headers = [
    "No",
    "Nama",
    "NIK",
    "Jenis kelamin",
    "Email",
    "Tempat lahir",
    "Tanggal lahir",
    "No. HP",
    "Pendidikan terakhir",
    "Alamat",
    "Status",
    "Tanggal daftar",
  ];

  const headerRow = sheet.addRow(headers);
  headerRow.font = { bold: true };
  headerRow.alignment = { vertical: "middle", wrapText: true };

  const colWidths = [6, 28, 18, 14, 28, 18, 14, 16, 22, 40, 12, 18];
  colWidths.forEach((w, i) => {
    sheet.getColumn(i + 1).width = w;
  });

  apps.forEach((a, idx) => {
    const row = sheet.addRow([
      idx + 1,
      a.full_name ?? "",
      a.nik ?? "",
      a.gender === "P" ? "Perempuan" : "Laki-laki",
      a.email ?? "",
      a.birth_place ?? "",
      formatIdDateExcel(a.birth_date),
      a.phone ?? "",
      a.last_education ?? "",
      a.address ?? "",
      statusLabel(a.status),
      formatIdDateExcel(a.created_at),
    ]);
    row.getCell(3).numFmt = "@";
    row.getCell(8).numFmt = "@";
    row.alignment = { vertical: "top", wrapText: true };
  });

  const base = safeFileNamePart(options.campaignName);
  const suffix = options.idSuffix ? `_${options.idSuffix}` : "";
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `Pendaftar_${base}${suffix}.xlsx`);
}
