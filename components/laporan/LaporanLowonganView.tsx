import { useState, useEffect } from "react";
import { listCompanies } from "../../services/company";
import { getLowonganReport, getPenempatanReport } from "../../services/jobs";
import Card from "../ui/Card";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";

interface LaporanLowonganViewProps {
  onBack: () => void;
}

interface Company {
  id: string;
  company_name: string;
  nib?: string;
  address?: string;
}

interface LowonganReportItem {
  bulan: number;
  tahun: number;
  lapangan_usaha: string;
  kode_jabatan: string;
  nama_jabatan: string;
  jumlah_dibutuhkan: number;
  jenis_kelamin: string;
  pendidikan: string;
  jurusan: string;
  keterampilan: string;
}

interface PenempatanReportItem {
  bulan: number;
  tahun: number;
  nama_tenaga_kerja: string;
  nik: string;
  alamat_tenaga_kerja: string;
  provinsi: string;
  kab_kota: string;
  email: string;
  nomor_hp: string;
  jenis_kelamin: string;
  pendidikan: string;
  jurusan: string;
  kab_kota_penempatan: string;
  nama_jabatan: string;
  lapangan_usaha: string;
  tanggal_mulai: string;
  upah_gaji: number;
}

export default function LaporanLowonganView({
  onBack,
}: LaporanLowonganViewProps) {
  const [activeTab, setActiveTab] = useState<"lowongan" | "penempatan">(
    "lowongan",
  );
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    return `${y}-${m}-01`;
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = now.getMonth() + 1;
    const lastDay = new Date(y, m, 0).getDate();
    const mStr = String(m).padStart(2, "0");
    return `${y}-${mStr}-${lastDay}`;
  });
  const [lowonganData, setLowonganData] = useState<LowonganReportItem[]>([]);
  const [penempatanData, setPenempatanData] = useState<PenempatanReportItem[]>(
    [],
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await listCompanies({
          status: "APPROVED",
          limit: 1000,
        });
        if (response && response.data) {
          setCompanies(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch companies", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedCompanyId) {
        setLowonganData([]);
        setPenempatanData([]);
        return;
      }

      setLoading(true);
      try {
        if (activeTab === "lowongan") {
          const response = await getLowonganReport({
            company_id: selectedCompanyId,
            start_date: startDate,
            end_date: endDate,
          });
          if (response && response.data) {
            setLowonganData(response.data);
          } else {
            setLowonganData([]);
          }
        } else if (activeTab === "penempatan") {
          const response = await getPenempatanReport({
            company_id: selectedCompanyId,
            start_date: startDate,
            end_date: endDate,
          });
          if (response && response.data) {
            setPenempatanData(response.data);
          } else {
            setPenempatanData([]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch report data", error);
        if (activeTab === "lowongan") setLowonganData([]);
        else setPenempatanData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, selectedCompanyId, startDate, endDate]);

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const MONTH_NAMES = [
    "",
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const handleExport = async (mode: "current" | "all") => {
    const workbook = new ExcelJS.Workbook();

    // Create Sheets
    const sheetLowongan = workbook.addWorksheet("Lowongan");
    const sheetPenempatan = workbook.addWorksheet("Penempatan");

    const companyName = selectedCompany?.company_name || "-";
    const companyNIB = selectedCompany?.nib || "-";
    const companyAddress = selectedCompany?.address || "-";

    // Set Column Widths
    sheetLowongan.columns = [
      { width: 2 }, // A (Margin)
      { width: 5 }, // B (No)
      { width: 15 }, // C (Bulan)
      { width: 10 }, // D (Tahun)
      { width: 25 }, // E (Lap Usaha)
      { width: 15 }, // F (Kode Jabatan)
      { width: 25 }, // G (Nama Jabatan)
      { width: 15 }, // H (Jml)
      { width: 15 }, // I (JK)
      { width: 20 }, // J (Pend)
      { width: 25 }, // K (Jurusan)
      { width: 25 }, // L (Kompetensi)
    ];

    sheetPenempatan.columns = [
      { width: 2 }, // A (Margin)
      { width: 5 }, // B (No)
      { width: 15 }, // C (Bulan)
      { width: 10 }, // D (Tahun)
      { width: 25 }, // E (Nama TK)
      { width: 25 }, // F (NIK) - Increased from 20
      { width: 30 }, // G (Alamat)
      { width: 20 }, // H (Prov)
      { width: 20 }, // I (Kab/Kota)
      { width: 25 }, // J (Email)
      { width: 15 }, // K (HP)
      { width: 15 }, // L (JK)
      { width: 20 }, // M (Pend)
      { width: 25 }, // N (Jurusan)
      { width: 20 }, // O (Kab/Kota Pen)
      { width: 25 }, // P (Jabatan)
      { width: 25 }, // Q (Lap Usaha)
      { width: 15 }, // R (Tgl Mulai)
      { width: 15 }, // S (Upah)
    ];

    // Setup Helper for Header
    const setupHeader = (
      sheet: ExcelJS.Worksheet,
      title: string,
      isPenempatan: boolean,
    ) => {
      const lastColLetter = isPenempatan ? "S" : "L";

      sheet.mergeCells(`B1:${lastColLetter}1`);
      sheet.getCell("B1").value = title;
      sheet.getCell("B1").alignment = {
        horizontal: "center",
        vertical: "middle",
      };
      sheet.getCell("B1").font = { bold: true, size: 14 };

      sheet.getCell("B3").value = "Nama Perusahaan";
      sheet.getCell("C3").value = ":";
      sheet.getCell("D3").value = companyName;
      sheet.mergeCells(`D3:${lastColLetter}3`);
      sheet.getCell("D3").alignment = { vertical: "middle", wrapText: false };

      sheet.getCell("B4").value = "NIB Perusahaan";
      sheet.getCell("C4").value = ":";
      sheet.getCell("D4").value = companyNIB;
      sheet.mergeCells(`D4:${lastColLetter}4`);
      sheet.getCell("D4").alignment = { vertical: "middle", wrapText: false };

      sheet.getCell("B5").value = "Alamat Perusahaan";
      sheet.getCell("C5").value = ":";
      sheet.getCell("D5").value = companyAddress;
      sheet.mergeCells(`D5:${lastColLetter}5`);
      sheet.getCell("D5").alignment = { vertical: "middle", wrapText: false };

      // Force rows to have wrapText false to prevent auto-wrapping
      [3, 4, 5].forEach((rowIdx) => {
        sheet.getRow(rowIdx).alignment = {
          vertical: "middle",
          wrapText: false,
        };
      });
    };

    // --- Sheet Lowongan ---
    setupHeader(sheetLowongan, "DAFTAR LOWONGAN KERJA TERDAFTAR", false);

    // Table Header Lowongan (Row 8)
    const headersLowongan = [
      "No",
      "Bulan",
      "Tahun",
      "Lapangan Usaha",
      "Kode Jabatan",
      "Nama Jabatan",
      "Jumlah Dibutuhkan",
      "Jenis Kelamin",
      "Pendidikan",
      "Jurusan",
      "Keterampilan/Kompetensi",
    ];

    sheetLowongan.getRow(8).values = [null, ...headersLowongan];
    sheetLowongan.getRow(8).font = { bold: true };
    sheetLowongan.getRow(8).alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    // Borders and Color for header
    sheetLowongan.getRow(8).eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF92D050" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    });

    // --- Sheet Penempatan ---
    setupHeader(sheetPenempatan, "DAFTAR PENEMPATAN TENAGA KERJA", true);

    // Table Header Penempatan (Row 8)
    const headersPenempatan = [
      "No",
      "Bulan",
      "Tahun",
      "Nama Tenaga Kerja",
      "NIK",
      "Alamat Tenaga Kerja",
      "Provinsi",
      "Kab/Kota",
      "Email",
      "Nomor HP",
      "Jenis Kelamin",
      "Pendidikan",
      "Jurusan",
      "Kab/Kota Penempatan",
      "Nama Jabatan",
      "Lapangan Usaha",
      "Tanggal Mulai",
      "Upah/Gaji",
    ];

    sheetPenempatan.getRow(8).values = [null, ...headersPenempatan];
    sheetPenempatan.getRow(8).font = { bold: true };
    sheetPenempatan.getRow(8).alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    // Borders and Color for header
    sheetPenempatan.getRow(8).eachCell((cell, colNumber) => {
      if (colNumber > 1) {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FF92D050" },
        };
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    });

    // Fetch and populate data
    try {
      let lowonganDataForExport: LowonganReportItem[] = [];
      let penempatanDataForExport: PenempatanReportItem[] = [];

      if (mode === "all") {
        const [lowonganResp, penempatanResp] = await Promise.all([
          getLowonganReport({
            company_id: selectedCompanyId,
            start_date: startDate,
            end_date: endDate,
          }),
          getPenempatanReport({
            company_id: selectedCompanyId,
            start_date: startDate,
            end_date: endDate,
          }),
        ]);
        lowonganDataForExport = lowonganResp?.data || [];
        penempatanDataForExport = penempatanResp?.data || [];
      } else {
        if (activeTab === "lowongan") {
          const lowonganResp = await getLowonganReport({
            company_id: selectedCompanyId,
            start_date: startDate,
            end_date: endDate,
          });
          lowonganDataForExport = lowonganResp?.data || [];
        } else {
          const penempatanResp = await getPenempatanReport({
            company_id: selectedCompanyId,
            start_date: startDate,
            end_date: endDate,
          });
          penempatanDataForExport = penempatanResp?.data || [];
        }
      }

      // Populate Lowongan Sheet
      if (
        (mode === "all" || activeTab === "lowongan") &&
        lowonganDataForExport.length > 0
      ) {
        lowonganDataForExport.forEach((item, index) => {
          const row = sheetLowongan.addRow([
            null, // Margin
            index + 1,
            MONTH_NAMES[item.bulan] || item.bulan,
            item.tahun,
            item.lapangan_usaha,
            item.kode_jabatan,
            item.nama_jabatan,
            item.jumlah_dibutuhkan,
            item.jenis_kelamin === "L"
              ? "Laki-laki"
              : item.jenis_kelamin === "P"
                ? "Perempuan"
                : "L/P",
            item.pendidikan,
            item.jurusan,
            item.keterampilan,
          ]);

          // Apply borders to data rows
          row.eachCell((cell, colNumber) => {
            if (colNumber > 1) {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = { vertical: "middle", wrapText: true };
            }
          });
        });
      }

      // Populate Penempatan Sheet
      if (
        (mode === "all" || activeTab === "penempatan") &&
        penempatanDataForExport.length > 0
      ) {
        penempatanDataForExport.forEach((item, index) => {
          const row = sheetPenempatan.addRow([
            null, // Margin
            index + 1,
            MONTH_NAMES[item.bulan] || item.bulan,
            item.tahun,
            item.nama_tenaga_kerja,
            item.nik,
            item.alamat_tenaga_kerja,
            "Kalimantan Timur",
            "Paser",
            item.email,
            item.nomor_hp,
            item.jenis_kelamin === "L"
              ? "Laki-laki"
              : item.jenis_kelamin === "P"
                ? "Perempuan"
                : "L/P",
            item.pendidikan,
            item.jurusan,
            item.kab_kota_penempatan,
            item.nama_jabatan,
            item.lapangan_usaha,
            item.tanggal_mulai
              ? new Date(item.tanggal_mulai).toLocaleDateString("id-ID")
              : "-",
            item.upah_gaji,
          ]);

          // Apply borders to data rows
          row.eachCell((cell, colNumber) => {
            if (colNumber > 1) {
              cell.border = {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
              };
              cell.alignment = { vertical: "middle", wrapText: true };
            }
          });
        });
      }

      // Remove empty sheets if exporting single sheet
      if (mode === "current") {
        if (activeTab === "lowongan") {
          workbook.removeWorksheet(sheetPenempatan.id);
        } else {
          workbook.removeWorksheet(sheetLowongan.id);
        }
      }
    } catch (error) {
      console.error("Error fetching data for export:", error);
    }

    // Write Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `Laporan_Lowongan_Penempatan_${companyName.replace(/\s+/g, "_")}.xlsx`,
    );
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
              <i className="ri-arrow-left-line text-xl leading-none" />
            </button>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                Laporan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Laporan lowongan & penempatan
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                Lihat lowongan terdaftar dan data penempatan tenaga kerja per
                perusahaan dalam satu tampilan.
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <i className="ri-building-4-line" />
            {selectedCompany?.company_name || "Pilih perusahaan"}
          </span>
        </div>
      </header>

      <Card className="!rounded-2xl !border-slate-200/90 bg-white/90 !shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm [&>div]:!p-0">
        <div className="flex flex-col gap-6 p-5 sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Filters */}
          <div className="flex w-full flex-col gap-4 sm:flex-row lg:w-auto">
            {/* Date Filters */}
            <div className="flex flex-col gap-4 sm:flex-row">
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
            </div>

            {/* Company Dropdown */}
            <div className="min-w-[250px]">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Perusahaan
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <i className="ri-building-line text-slate-400"></i>
                </div>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="block w-full appearance-none rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-10 text-sm text-slate-700 outline-none transition-shadow focus:border-primary focus:ring-primary"
                >
                  <option value="">Pilih Perusahaan</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <i className="ri-arrow-down-s-line text-slate-400"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <button
              type="button"
              onClick={() => handleExport("current")}
              disabled={!selectedCompanyId}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-emerald-700 hover:shadow disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
              title="Export sheet yang sedang aktif"
            >
              <i className="ri-file-excel-2-line"></i>
              Export Current
            </button>
            <button
              type="button"
              onClick={() => handleExport("all")}
              disabled={!selectedCompanyId}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:bg-[var(--color-primary-dark)] hover:shadow disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
              title="Export semua sheet (Lowongan & Penempatan)"
            >
              <i className="ri-file-excel-2-fill"></i>
              Export All
            </button>
          </div>
        </div>
      </Card>

      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-sm ring-1 ring-slate-950/[0.02]">
        <nav className="flex min-w-max gap-2" aria-label="Tabs">
          <button
            type="button"
            onClick={() => setActiveTab("lowongan")}
            className={`
                  whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200
                  ${
                    activeTab === "lowongan"
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }
               `}
          >
            Lowongan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("penempatan")}
            className={`
                  whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200
                  ${
                    activeTab === "penempatan"
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }
               `}
          >
            Penempatan
          </button>
        </nav>
      </div>

      <Card className="overflow-hidden !rounded-2xl !border-slate-200/90 bg-white !shadow-sm ring-1 ring-slate-950/[0.02] [&>div]:!p-0">
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Preview laporan {activeTab}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Data ditampilkan sesuai perusahaan dan rentang tanggal yang
                dipilih.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
              <i className="ri-calendar-line text-primary" />
              {startDate} s/d {endDate}
            </span>
          </div>
        </div>
        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
            {/* Fixed column widths for better preview */}
            <colgroup>
              <col className="w-10" />
              <col className="w-24" />
              <col className="w-16" />
              {(activeTab === "lowongan"
                ? [
                    "w-40", // Lapangan Usaha
                    "w-24", // Kode Jabatan
                    "w-40", // Nama Jabatan
                    "w-20", // Jumlah
                    "w-16", // JK
                    "w-32", // Pend
                    "w-32", // Jurusan
                    "w-40", // Keterampilan
                  ]
                : [
                    "w-40", // Nama TK
                    "w-32", // NIK
                    "w-48", // Alamat
                    "w-24", // Prov
                    "w-24", // Kab/Kota
                    "w-48", // Email
                    "w-28", // HP
                    "w-16", // JK
                    "w-32", // Pend
                    "w-32", // Jurusan
                    "w-32", // Kab/Kota Pen
                    "w-32", // Jabatan
                    "w-32", // Lap Usaha
                    "w-24", // Tgl
                    "w-24", // Upah
                  ]
              ).map((width, idx) => (
                <col key={idx} className={width} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th
                  colSpan={activeTab === "lowongan" ? 11 : 18}
                  className="p-2 text-center text-lg font-bold border-none"
                >
                  {activeTab === "lowongan"
                    ? "DAFTAR LOWONGAN KERJA TERDAFTAR"
                    : "DAFTAR PENEMPATAN TENAGA KERJA"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan={activeTab === "lowongan" ? 11 : 18}
                  className="h-4 border-none"
                ></th>
              </tr>

              {/* Company Info Rows simulating Excel layout */}
              <tr className="text-left">
                <th className="border-none p-1 w-10"></th>
                <th className="border-none p-1 font-bold whitespace-nowrap">
                  Nama Perusahaan
                </th>
                <th className="border-none p-1">:</th>
                <th
                  colSpan={activeTab === "lowongan" ? 8 : 15}
                  className="border-none p-1 font-normal"
                >
                  {selectedCompany?.company_name || "-"}
                </th>
              </tr>
              <tr className="text-left">
                <th className="border-none p-1"></th>
                <th className="border-none p-1 font-bold whitespace-nowrap">
                  NIB Perusahaan
                </th>
                <th className="border-none p-1">:</th>
                <th
                  colSpan={activeTab === "lowongan" ? 8 : 15}
                  className="border-none p-1 font-normal"
                >
                  {selectedCompany?.nib || "-"}
                </th>
              </tr>
              <tr className="text-left">
                <th className="border-none p-1"></th>
                <th className="border-none p-1 font-bold whitespace-nowrap">
                  Alamat Perusahaan
                </th>
                <th className="border-none p-1">:</th>
                <th
                  colSpan={activeTab === "lowongan" ? 8 : 15}
                  className="border-none p-1 font-normal"
                >
                  {selectedCompany?.address || "-"}
                </th>
              </tr>
              <tr>
                <th
                  colSpan={activeTab === "lowongan" ? 11 : 18}
                  className="h-4 border-none"
                ></th>
              </tr>

              {/* Main Table Headers */}
              <tr className="bg-[#92D050]">
                {activeTab === "lowongan" ? (
                  <>
                    <th className="border border-black p-2">No</th>
                    <th className="border border-black p-2">Bulan</th>
                    <th className="border border-black p-2">Tahun</th>
                    <th className="border border-black p-2">Lapangan Usaha</th>
                    <th className="border border-black p-2">Kode Jabatan</th>
                    <th className="border border-black p-2">Nama Jabatan</th>
                    <th className="border border-black p-2">
                      Jumlah Dibutuhkan
                    </th>
                    <th className="border border-black p-2">Jenis Kelamin</th>
                    <th className="border border-black p-2">Pendidikan</th>
                    <th className="border border-black p-2">Jurusan</th>
                    <th className="border border-black p-2">
                      Keterampilan/Kompetensi
                    </th>
                  </>
                ) : (
                  <>
                    <th className="border border-black p-2">No</th>
                    <th className="border border-black p-2">Bulan</th>
                    <th className="border border-black p-2">Tahun</th>
                    <th className="border border-black p-2">
                      Nama Tenaga Kerja
                    </th>
                    <th className="border border-black p-2">NIK</th>
                    <th className="border border-black p-2">
                      Alamat Tenaga Kerja
                    </th>
                    <th className="border border-black p-2">Provinsi</th>
                    <th className="border border-black p-2">Kab/Kota</th>
                    <th className="border border-black p-2">Email</th>
                    <th className="border border-black p-2">Nomor HP</th>
                    <th className="border border-black p-2">Jenis Kelamin</th>
                    <th className="border border-black p-2">Pendidikan</th>
                    <th className="border border-black p-2">Jurusan</th>
                    <th className="border border-black p-2">
                      Kab/Kota Penempatan
                    </th>
                    <th className="border border-black p-2">Nama Jabatan</th>
                    <th className="border border-black p-2">Lapangan Usaha</th>
                    <th className="border border-black p-2">Tanggal Mulai</th>
                    <th className="border border-black p-2">Upah/Gaji</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={activeTab === "lowongan" ? 11 : 18}
                    className="border border-black p-2 text-center text-gray-400 italic"
                  >
                    Loading...
                  </td>
                </tr>
              ) : activeTab === "lowongan" && lowonganData.length > 0 ? (
                lowonganData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {MONTH_NAMES[item.bulan] || item.bulan}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.tahun}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.lapangan_usaha}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.kode_jabatan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.nama_jabatan}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.jumlah_dibutuhkan}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.jenis_kelamin === "L"
                        ? "Laki-laki"
                        : item.jenis_kelamin === "P"
                          ? "Perempuan"
                          : "L/P"}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.pendidikan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.jurusan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.keterampilan}
                    </td>
                  </tr>
                ))
              ) : activeTab === "penempatan" && penempatanData.length > 0 ? (
                penempatanData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {index + 1}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {MONTH_NAMES[item.bulan] || item.bulan}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.tahun}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.nama_tenaga_kerja}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.nik}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.alamat_tenaga_kerja}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      Kalimantan Timur
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      Paser
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.email}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.nomor_hp}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.jenis_kelamin === "L"
                        ? "Laki-laki"
                        : item.jenis_kelamin === "P"
                          ? "Perempuan"
                          : "L/P"}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.pendidikan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.jurusan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.kab_kota_penempatan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.nama_jabatan}
                    </td>
                    <td className="border border-black p-2 break-words whitespace-normal">
                      {item.lapangan_usaha}
                    </td>
                    <td className="border border-black p-2 text-center break-words whitespace-normal">
                      {item.tanggal_mulai
                        ? new Date(item.tanggal_mulai).toLocaleDateString(
                            "id-ID",
                          )
                        : "-"}
                    </td>
                    <td className="border border-black p-2 text-right break-words whitespace-normal">
                      {item.upah_gaji}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={activeTab === "lowongan" ? 11 : 18}
                    className="border border-black p-2 text-center text-gray-400 italic"
                  >
                    {activeTab === "lowongan"
                      ? "Tidak ada data lowongan ditemukan"
                      : "Tidak ada data penempatan ditemukan"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
