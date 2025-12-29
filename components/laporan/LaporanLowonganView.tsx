import { useState, useEffect } from "react";
import { listCompanies } from "../../services/company";
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

export default function LaporanLowonganView({
  onBack,
}: LaporanLowonganViewProps) {
  const [activeTab, setActiveTab] = useState<"lowongan" | "penempatan">(
    "lowongan",
  );
  const [companies, setCompanies] = useState<Company[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>("");
  const [startDate, setStartDate] = useState("2025-08-01");
  const [endDate, setEndDate] = useState("2025-08-31");

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

  const selectedCompany = companies.find((c) => c.id === selectedCompanyId);

  const handleExport = async () => {
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
      { width: 20 }, // F (NIK)
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

    // Write Buffer
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(
      new Blob([buffer]),
      `Laporan_Lowongan_Penempatan_${companyName.replace(/\s+/g, "_")}.xlsx`,
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-600 hover:text-gray-900"
            title="Kembali ke menu laporan"
          >
            <i className="ri-arrow-left-line text-2xl"></i>
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Laporan Lowongan & Penempatan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Laporan detail lowongan dan penempatan per perusahaan
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Filters */}
      <Card className="p-5 bg-white shadow-sm border border-gray-200/60 rounded-xl">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-end lg:items-center">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Date Filters */}
            <div className="flex gap-4">
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                  Dari Tanggal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-calendar-line text-gray-400"></i>
                  </div>
                  <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm transition-shadow"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 sm:flex-none">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                  Sampai Tanggal
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="ri-calendar-line text-gray-400"></i>
                  </div>
                  <input
                    type="date"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm transition-shadow"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Company Dropdown */}
            <div className="min-w-[250px]">
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">
                Perusahaan
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-building-line text-gray-400"></i>
                </div>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-sm transition-shadow outline-none appearance-none bg-white"
                >
                  <option value="">Pilih Perusahaan</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={handleExport}
              disabled={!selectedCompanyId}
              className="flex-1 lg:flex-none justify-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="ri-file-excel-2-line"></i>
              Export Excel
            </button>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex space-x-1 min-w-max pb-1" aria-label="Tabs">
          <button
            onClick={() => setActiveTab("lowongan")}
            className={`
                  whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors duration-200
                  ${
                    activeTab === "lowongan"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
               `}
          >
            Lowongan
          </button>
          <button
            onClick={() => setActiveTab("penempatan")}
            className={`
                  whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors duration-200
                  ${
                    activeTab === "penempatan"
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
               `}
          >
            Penempatan
          </button>
        </nav>
      </div>

      {/* Table Content Preview */}
      <Card className="overflow-hidden shadow-sm border border-gray-200/60 rounded-xl bg-white">
        <div className="overflow-x-auto p-6">
          <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
            {/* Fixed column widths for better preview */}
            <colgroup>
              <col className="w-10" />
              <col className="w-40" />
              <col className="w-16" />
              {activeTab === "lowongan" ? (
                <>
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-20" />
                  <col className="w-20" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-32" />
                </>
              ) : (
                <>
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-40" />
                  <col className="w-24" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-20" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-32" />
                  <col className="w-32" />
                  <col className="w-24" />
                  <col className="w-24" />
                </>
              )}
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
              {/* Empty row as per request (no dummy data) */}
              <tr>
                <td
                  colSpan={activeTab === "lowongan" ? 11 : 18}
                  className="border border-black p-2 text-center text-gray-400 italic"
                >
                  Tidak ada data ditampilkan (Preview Template)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
