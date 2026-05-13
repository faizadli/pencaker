"use client";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useState, useEffect, useCallback } from "react";
import Card from "../ui/Card";
import { useToast } from "../ui/Toast";
import { listCandidates } from "../../services/profile";
import { getPublicEducationGroups } from "../../services/site";

interface CandidateApi {
  id: string;
  user_id: string;
  full_name: string;
  nik: string;
  place_of_birth: string;
  birthdate: string;
  gender: "L" | "P";
  address: string;
  kecamatan?: string;
  kelurahan?: string;
  provinsi?: string;
  kabupaten?: string;
  province?: string;
  city?: string;
  last_education?: string;
  education_name?: string;
  graduation_year?: string;
  no_handphone?: string;
  agama?: string;
  dis_kondisi?: string;
  ak1_status?: string;
  created_at?: string;
  no_pendaftaran?: string;
  marital_status?: string;
  status_perkawinan?: string;
}

interface LaporanRekapPencakerViewProps {
  onBack: () => void;
}

export default function LaporanRekapPencakerView({
  onBack,
}: LaporanRekapPencakerViewProps) {
  const { showSuccess, showError } = useToast();
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setMonth(0); // January
    d.setDate(1);
    return d.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [isExporting, setIsExporting] = useState(false);
  const [previewData, setPreviewData] = useState<CandidateApi[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [educationGroups, setEducationGroups] = useState<
    Array<{ name?: string; items?: Array<{ id?: string; name?: string }> }>
  >([]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await listCandidates({ limit: 10000 });
      console.log("Raw response from listCandidates:", resp);

      // Handle various response structures
      let candidates: CandidateApi[] = [];
      if (Array.isArray(resp)) {
        candidates = resp as CandidateApi[];
      } else if (resp && typeof resp === "object") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (Array.isArray((resp as any).data)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          candidates = (resp as any).data as CandidateApi[];
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } else if (Array.isArray((resp as any).items)) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          candidates = (resp as any).items as CandidateApi[];
        }
      }

      console.log("Parsed candidates:", candidates.length, candidates[0]);

      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      const filtered = candidates.filter((c) => {
        if (!c.created_at) {
          console.log("Candidate missing created_at:", c.id);
          return true;
        }
        const date = new Date(c.created_at);
        const isInRange = date >= start && date <= end;
        if (!isInRange) {
          // console.log("Filtered out candidate:", c.id, c.created_at, start, end);
        }
        return isInRange;
      });

      console.log(
        `Fetched ${candidates.length} candidates, showing ${filtered.length}`,
      );
      setPreviewData(filtered);
    } catch (error) {
      console.error(error);
      showError("Gagal mengambil data preview");
    } finally {
      setIsLoading(false);
    }
  }, [startDate, endDate, showError]);

  // Reactive fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(() => {
    (async () => {
      try {
        const resp = await getPublicEducationGroups();
        const base =
          (resp as unknown as { data?: unknown }).data ?? (resp as unknown);
        const arr =
          (base as unknown as Array<{
            name?: string;
            items?: Array<{ id?: string; name?: string }>;
          }>) || [];
        setEducationGroups(Array.isArray(arr) ? arr : []);
      } catch {}
    })();
  }, []);

  const thinBorder: Partial<ExcelJS.Borders> = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      let dataToExport = previewData;
      if (dataToExport.length === 0) {
        await fetchData();
        const resp = await listCandidates({ limit: 10000 });
        let candidates: CandidateApi[] = [];
        if (Array.isArray(resp)) {
          candidates = resp as CandidateApi[];
        } else if (resp && typeof resp === "object") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          if (Array.isArray((resp as any).data)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            candidates = (resp as any).data as CandidateApi[];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } else if (Array.isArray((resp as any).items)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            candidates = (resp as any).items as CandidateApi[];
          }
        }

        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        dataToExport = candidates.filter((c) => {
          if (!c.created_at) return true;
          const date = new Date(c.created_at);
          return date >= start && date <= end;
        });
      }

      if (dataToExport.length === 0) {
        showError("Tidak ada data pada rentang tanggal tersebut");
        setIsExporting(false);
        return;
      }

      const workbook = new ExcelJS.Workbook();
      const sheet = workbook.addWorksheet("AK 47");

      const headers = [
        "NOMOR PENDATARAN",
        "nama",
        "tgl_pendaftaran",
        "no_ktp",
        "alamat_pencaker",
        "provinsi_pencaker",
        "kabupaten_pencaker",
        "jenis_kelamin_pencaker",
        "tingkat_pendidikan",
        "dis_kondisi",
        "umur",
        "jurusan_pendidikan_pencaker\n(Ketik Jurusan contoh Akuntansi)",
        "tahun lulus",
        "status_perkawinan_pencaker",
        "NO TELP/HP PENCAKER",
        "tempat lahir",
        "tanggal_lahir_pencaker",
        "Agama",
      ];
      const headerRow = sheet.getRow(1);
      headers.forEach((header, idx) => {
        const cell = headerRow.getCell(idx + 1);
        cell.value = header;
        cell.alignment = {
          vertical: "middle",
          horizontal: "center",
          wrapText: true,
        };
        cell.font = { bold: true, size: 11, name: "Calibri" };
        cell.border = thinBorder;
      });
      headerRow.height = 24;

      const indexRow = sheet.getRow(2);
      for (let i = 0; i < headers.length; i++) {
        const cell = indexRow.getCell(i + 1);
        cell.value = i + 1;
        cell.alignment = { vertical: "middle", horizontal: "center" };
        cell.font = {
          name: "Calibri",
          size: 10,
          bold: true,
          color: { argb: "FF000000" },
        };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFBDD7EE" },
        };
        cell.border = thinBorder;
      }
      indexRow.height = 18;

      sheet.autoFilter = {
        from: { row: 1, column: 1 },
        to: { row: 1, column: headers.length },
      };

      sheet.columns = [
        { key: "no_pendaftaran", width: 18 },
        { key: "nama", width: 28 },
        { key: "tgl_pendaftaran", width: 16 },
        { key: "no_ktp", width: 22 },
        { key: "alamat_pencaker", width: 40 },
        { key: "provinsi_pencaker", width: 20 },
        { key: "kabupaten_pencaker", width: 20 },
        { key: "jenis_kelamin_pencaker", width: 18 },
        { key: "tingkat_pendidikan", width: 20 },
        { key: "dis_kondisi", width: 18 },
        { key: "umur", width: 10 },
        { key: "jurusan_pendidikan_pencaker", width: 28 },
        { key: "tahun_lulus", width: 14 },
        { key: "status_perkawinan_pencaker", width: 22 },
        { key: "no_telp_hp_pencaker", width: 20 },
        { key: "tempat_lahir", width: 20 },
        { key: "tanggal_lahir_pencaker", width: 18 },
        { key: "agama", width: 16 },
      ];

      let currentRowIdx = 3;
      dataToExport.forEach((c, idx) => {
        const addressFull = [c.address, c.kelurahan, c.kecamatan]
          .filter(Boolean)
          .join(", ");

        const row = sheet.getRow(currentRowIdx);

        const birth = c.birthdate ? new Date(c.birthdate) : null;
        const age = birth
          ? Math.max(
              0,
              new Date().getFullYear() -
                birth.getFullYear() -
                (new Date().getMonth() < birth.getMonth() ||
                (new Date().getMonth() === birth.getMonth() &&
                  new Date().getDate() < birth.getDate())
                  ? 1
                  : 0),
            )
          : undefined;
        const lvlRaw = String(
          c.education_name || c.last_education || "",
        ).trim();
        let groupName: string | undefined;
        let levelName: string | undefined;
        if (lvlRaw) {
          for (const g of educationGroups) {
            const items = Array.isArray(g.items) ? g.items : [];
            const found = items.find(
              (it) =>
                String(it.name || "").toLowerCase() === lvlRaw.toLowerCase() ||
                String(it.id || "") === lvlRaw,
            );
            if (found) {
              groupName = String(g.name || "");
              levelName = String(found.name || "");
              break;
            }
          }
        }

        const values = [
          idx + 1,
          c.full_name?.toUpperCase(),
          c.created_at ? new Date(c.created_at) : "-",
          c.nik,
          addressFull?.toUpperCase(),
          "KALIMANTAN TIMUR",
          "PASER",
          c.gender === "L"
            ? "LAKI-LAKI"
            : c.gender === "P"
              ? "PEREMPUAN"
              : c.gender,
          groupName?.toUpperCase() || "-",
          c.dis_kondisi || "Non Disabilitas",
          age !== undefined ? age : "-",
          levelName?.toUpperCase() || "-",
          c.graduation_year || "-",
          c.status_perkawinan || c.marital_status || "-",
          c.no_handphone || "-",
          c.place_of_birth?.toUpperCase() || "-",
          c.birthdate ? new Date(c.birthdate) : "-",
          c.agama?.toUpperCase() || "-",
        ];

        values.forEach((val, colIdx) => {
          const cell = row.getCell(colIdx + 1);
          cell.value = val;
          cell.border = thinBorder;
          cell.font = { name: "Calibri", size: 11 };
          cell.alignment = {
            vertical: "middle",
            horizontal: "left",
            wrapText: true,
          };
          if (colIdx === 2 || colIdx === 16) {
            const cellNumFmt = cell as unknown as { numFmt?: string };
            cellNumFmt.numFmt = "dd/mm/yyyy";
            // keep left alignment for data values
          }
        });

        currentRowIdx++;
      });

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Rekap_Pencaker_${startDate}_${endDate}.xlsx`);
      showSuccess(`Berhasil mengekspor ${dataToExport.length} data`);
    } catch (error) {
      console.error(error);
      showError("Gagal mengekspor data");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
        <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
        <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
          <div className="flex min-w-0 items-start gap-4">
            <button
              type="button"
              onClick={onBack}
              className="landing-focus mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-primary"
              title="Kembali ke menu laporan"
            >
              <i className="ri-arrow-left-line text-xl leading-none"></i>
            </button>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Laporan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Rekap data pencaker
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Laporan rekapitulasi data pencari kerja berdasarkan periode
                pendaftaran dengan preview sebelum ekspor Excel.
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <i className="ri-user-search-line" />
            {previewData.length} data preview
          </span>
        </div>
      </header>

      <Card className="!rounded-2xl !border-slate-200/90 bg-white/90 !shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm [&>div]:!p-0">
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Date Filters */}
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
            <div className="flex-1 sm:flex-none">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Dari Tanggal
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="ri-calendar-line text-slate-400"></i>
                </div>
                <input
                  type="date"
                  className="block w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 transition-shadow focus:border-primary focus:ring-primary"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 sm:flex-none">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Sampai Tanggal
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="ri-calendar-line text-slate-400"></i>
                </div>
                <input
                  type="date"
                  className="block w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-700 transition-shadow focus:border-primary focus:ring-primary"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* Loading Indicator (replaces button) */}
            <div className="flex-none self-end pb-2">
              {isLoading && (
                <span className="flex items-center gap-2 text-sm text-slate-500">
                  <i className="ri-loader-4-line animate-spin"></i>
                  Memuat...
                </span>
              )}
            </div>
          </div>

          {/* Action */}
          <div className="w-full lg:w-auto">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className={`flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-all shadow-sm hover:bg-emerald-700 hover:shadow lg:w-auto ${
                isExporting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isExporting ? (
                <i className="ri-loader-4-line animate-spin"></i>
              ) : (
                <i className="ri-file-excel-line"></i>
              )}
              Export Excel
            </button>
          </div>
        </div>
      </Card>

      {/* Preview Section */}
      <Card className="overflow-hidden !rounded-2xl !border-slate-200/90 bg-white !shadow-sm ring-1 ring-slate-950/[0.02] [&>div]:!p-0">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-5 py-4">
          <h3 className="flex items-center gap-2 font-semibold text-slate-800">
            <i className="ri-table-line text-primary"></i>
            Preview Data
          </h3>
          <span className="rounded-lg border border-slate-200/80 bg-white px-2 py-1 text-xs font-medium text-slate-500">
            {previewData.length} Data Ditemukan
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border border-gray-300 border-collapse">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100/80 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  NOMOR PENDATARAN
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  nama
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  tgl_pendaftaran
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  no_ktp
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 min-w-[220px] text-center">
                  alamat_pencaker
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  provinsi_pencaker
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  kabupaten_pencaker
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  jenis_kelamin_pencaker
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  tingkat_pendidikan
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  dis_kondisi
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 text-center">
                  umur
                </th>
                <th className="px-4 py-3 font-semibold border-r border-gray-200 whitespace-nowrap text-center">
                  jurusan_pendidikan_pencaker (Ketik Jurusan contoh Akuntansi)
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  tahun lulus
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  status_perkawinan_pencaker
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  NO TELP/HP PENCAKER
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  tempat lahir
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  tanggal_lahir_pencaker
                </th>
                <th className="px-4 py-3 font-semibold border border-gray-300 whitespace-nowrap text-center">
                  Agama
                </th>
              </tr>
              <tr className="bg-[#BDD7EE] text-black">
                {Array.from({ length: 18 }).map((_, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-1 font-bold border border-gray-300 text-center text-[11px]"
                  >
                    {idx + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan={18}
                    className="border border-gray-300 px-4 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <i className="ri-loader-4-line text-2xl animate-spin text-primary"></i>
                      <span>Memuat data...</span>
                    </div>
                  </td>
                </tr>
              ) : previewData.length === 0 ? (
                <tr>
                  <td
                    colSpan={18}
                    className="border border-gray-300 bg-gray-50/30 px-4 py-8 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <i className="ri-file-search-line text-2xl text-gray-400"></i>
                      <span>Tidak ada data untuk periode ini</span>
                    </div>
                  </td>
                </tr>
              ) : (
                previewData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/80 transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 border border-gray-300 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-gray-700 border border-gray-300 uppercase whitespace-nowrap">
                      {item.full_name}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 whitespace-nowrap">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 whitespace-nowrap">
                      {item.nik}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {[item.address, item.kelurahan, item.kecamatan]
                        .filter(Boolean)
                        .join(", ")}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 uppercase">
                      KALIMANTAN TIMUR
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      PASER
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {item.gender === "L"
                        ? "Laki-laki"
                        : item.gender === "P"
                          ? "Perempuan"
                          : item.gender}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {(() => {
                        const lvlRaw = String(
                          item.education_name || item.last_education || "",
                        ).trim();
                        let groupName: string | undefined;
                        if (lvlRaw) {
                          for (const g of educationGroups) {
                            const items = Array.isArray(g.items) ? g.items : [];
                            const found = items.find(
                              (it) =>
                                String(it.name || "").toLowerCase() ===
                                  lvlRaw.toLowerCase() ||
                                String(it.id || "") === lvlRaw,
                            );
                            if (found) {
                              groupName = String(g.name || "");
                              break;
                            }
                          }
                        }
                        return groupName || "-";
                      })()}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {item.dis_kondisi || "Non Disabilitas"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {item.birthdate
                        ? Math.max(
                            0,
                            new Date().getFullYear() -
                              new Date(item.birthdate).getFullYear() -
                              (new Date().getMonth() <
                                new Date(item.birthdate).getMonth() ||
                              (new Date().getMonth() ===
                                new Date(item.birthdate).getMonth() &&
                                new Date().getDate() <
                                  new Date(item.birthdate).getDate())
                                ? 1
                                : 0),
                          )
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 uppercase whitespace-nowrap">
                      {(() => {
                        const lvlRaw = String(
                          item.education_name || item.last_education || "",
                        ).trim();
                        let levelName: string | undefined;
                        if (lvlRaw) {
                          for (const g of educationGroups) {
                            const items = Array.isArray(g.items) ? g.items : [];
                            const found = items.find(
                              (it) =>
                                String(it.name || "").toLowerCase() ===
                                  lvlRaw.toLowerCase() ||
                                String(it.id || "") === lvlRaw,
                            );
                            if (found) {
                              levelName = String(found.name || "");
                              break;
                            }
                          }
                        }
                        return levelName || "-";
                      })()}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {item.graduation_year}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300">
                      {item.status_perkawinan || item.marital_status || "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 whitespace-nowrap">
                      {item.no_handphone}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 whitespace-nowrap">
                      {item.place_of_birth}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 whitespace-nowrap">
                      {item.birthdate
                        ? new Date(item.birthdate).toLocaleDateString("id-ID")
                        : "-"}
                    </td>
                    <td className="px-4 py-3 text-gray-600 border border-gray-300 uppercase">
                      {item.agama}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
