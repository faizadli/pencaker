"use client";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import Card from "../ui/Card";
import { useToast } from "../ui/Toast";
import { TABS, GenericRow, IPK3_7Row, IPK3_8Row, InitialData } from "./types";
import { getSheetTitle, formatDateIndo } from "./helpers";
import IPK31Table from "./IPK31Table";
import GenericIPKTable from "./GenericIPKTable";
import IPK37Table from "./IPK37Table";
import IPK38Table from "./IPK38Table";
import {
  exportIPK3_1,
  exportGeneric12Col,
  exportIPK3_7,
  exportIPK3_8,
} from "../../utils/export-laporan";
import {
  getReportIPK31,
  getReportIPK32,
  getReportIPK33,
  getReportIPK34,
  getReportIPK35,
  getReportIPK36,
  getReportIPK37,
  getReportIPK38,
} from "../../services/report";

interface LaporanIPKViewProps {
  onBack: () => void;
}

export default function LaporanIPKView({ onBack }: LaporanIPKViewProps) {
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState("ipk3.1");
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-01-31");
  const [educationData, setEducationData] = useState<GenericRow[]>([]);
  const [ipk37Data, setIPK37Data] = useState<IPK3_7Row[]>([]);
  const [ipk38Data, setIPK38Data] = useState<IPK3_8Row[]>([]);
  const [ipk38Data2, setIPK38Data2] = useState<IPK3_8Row[]>([]);
  const [ipk31Data, setIpk31Data] = useState<InitialData | undefined>(
    undefined,
  );
  const [isExporting, setIsExporting] = useState(false);

  const headerDateString = `PADA TANGGAL : ${formatDateIndo(startDate)} s/d ${formatDateIndo(endDate)}`;

  useEffect(() => {
    if (activeTab === "ipk3.1") {
      getReportIPK31(startDate, endDate)
        .then((res: { data: InitialData }) => {
          setIpk31Data(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.1 data", err);
          showError("Gagal mengambil data IPK 3.1");
        });
    } else if (activeTab === "ipk3.2") {
      getReportIPK32(startDate, endDate)
        .then((res: { data: GenericRow[] }) => {
          setEducationData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.2 data", err);
          showError("Gagal mengambil data IPK 3.2");
        });
    } else if (activeTab === "ipk3.4") {
      getReportIPK34(startDate, endDate)
        .then((res: { data: GenericRow[] }) => {
          setEducationData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.4 data", err);
          showError("Gagal mengambil data IPK 3.4");
        });
    } else if (activeTab === "ipk3.3") {
      getReportIPK33(startDate, endDate)
        .then((res: { data: GenericRow[] }) => {
          setEducationData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.3 data", err);
          showError("Gagal mengambil data IPK 3.3");
        });
    } else if (activeTab === "ipk3.5") {
      getReportIPK35(startDate, endDate)
        .then((res: { data: GenericRow[] }) => {
          setEducationData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.5 data", err);
          showError("Gagal mengambil data IPK 3.5");
        });
    } else if (activeTab === "ipk3.6") {
      getReportIPK36(startDate, endDate)
        .then((res: { data: GenericRow[] }) => {
          setEducationData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.6 data", err);
          showError("Gagal mengambil data IPK 3.6");
        });
    } else if (activeTab === "ipk3.7") {
      getReportIPK37(startDate, endDate)
        .then((res: { data: IPK3_7Row[] }) => {
          setIPK37Data(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch IPK 3.7 data", err);
          showError("Gagal mengambil data IPK 3.7");
        });
    } else if (activeTab === "ipk3.8") {
      getReportIPK38(startDate, endDate)
        .then(
          (res: {
            data: { educationRows: IPK3_8Row[]; companyTypeRows: IPK3_8Row[] };
          }) => {
            setIPK38Data(res.data.educationRows);
            setIPK38Data2(res.data.companyTypeRows);
          },
        )
        .catch((err) => {
          console.error("Failed to fetch IPK 3.8 data", err);
          showError("Gagal mengambil data IPK 3.8");
        });
    }
  }, [activeTab, showError, startDate, endDate]);

  const handleExportExcel = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      const workbook = new ExcelJS.Workbook();
      const sheetName = activeTab;
      const worksheet = workbook.addWorksheet(sheetName);

      const defaultBorder: Partial<ExcelJS.Borders> = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      const centerAlignment: Partial<ExcelJS.Alignment> = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      const leftAlignment: Partial<ExcelJS.Alignment> = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

      if (activeTab === "ipk3.1") {
        let data = ipk31Data;
        if (!data) {
          const res: { data: InitialData } = await getReportIPK31(
            startDate,
            endDate,
          );
          data = res.data;
          setIpk31Data(data);
        }
        exportIPK3_1(
          worksheet,
          defaultBorder,
          centerAlignment,
          leftAlignment,
          headerDateString,
          data,
        );
      } else if (
        ["ipk3.2", "ipk3.3", "ipk3.4", "ipk3.5", "ipk3.6"].includes(activeTab)
      ) {
        if (activeTab === "ipk3.2" && educationData.length === 0) {
          const res: { data: GenericRow[] } = await getReportIPK32(
            startDate,
            endDate,
          );
          setEducationData(res.data);
        } else if (activeTab === "ipk3.3" && educationData.length === 0) {
          const res: { data: GenericRow[] } = await getReportIPK33(
            startDate,
            endDate,
          );
          setEducationData(res.data);
        } else if (activeTab === "ipk3.4" && educationData.length === 0) {
          const res: { data: GenericRow[] } = await getReportIPK34(
            startDate,
            endDate,
          );
          setEducationData(res.data);
        } else if (activeTab === "ipk3.5" && educationData.length === 0) {
          const res: { data: GenericRow[] } = await getReportIPK35(
            startDate,
            endDate,
          );
          setEducationData(res.data);
        } else if (activeTab === "ipk3.6" && educationData.length === 0) {
          const res: { data: GenericRow[] } = await getReportIPK36(
            startDate,
            endDate,
          );
          setEducationData(res.data);
        }
        exportGeneric12Col(
          worksheet,
          defaultBorder,
          centerAlignment,
          leftAlignment,
          activeTab,
          headerDateString,
          educationData.length > 0 ? educationData : undefined,
        );
      } else if (activeTab === "ipk3.7") {
        exportIPK3_7(
          worksheet,
          defaultBorder,
          centerAlignment,
          leftAlignment,
          headerDateString,
          ipk37Data.length > 0 ? ipk37Data : undefined,
        );
      } else if (activeTab === "ipk3.8") {
        if (ipk38Data.length === 0 || ipk38Data2.length === 0) {
          const res: {
            data: { educationRows: IPK3_8Row[]; companyTypeRows: IPK3_8Row[] };
          } = await getReportIPK38(startDate, endDate);
          setIPK38Data(res.data.educationRows);
          setIPK38Data2(res.data.companyTypeRows);
        }
        exportIPK3_8(
          worksheet,
          defaultBorder,
          centerAlignment,
          leftAlignment,
          headerDateString,
          ipk38Data.length > 0 ? ipk38Data : undefined,
          ipk38Data2.length > 0 ? ipk38Data2 : undefined,
        );
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(
        blob,
        `Laporan_${activeTab.toUpperCase()}_${startDate}_${endDate}.xlsx`,
      );
      showSuccess("Berhasil mengunduh laporan");
    } catch (error) {
      console.error(error);
      showError("Gagal mengunduh laporan");
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllExcel = async () => {
    if (isExporting) return;
    setIsExporting(true);
    try {
      showSuccess("Sedang memproses semua laporan...");

      const workbook = new ExcelJS.Workbook();

      const defaultBorder: Partial<ExcelJS.Borders> = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      const centerAlignment: Partial<ExcelJS.Alignment> = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      const leftAlignment: Partial<ExcelJS.Alignment> = {
        vertical: "middle",
        horizontal: "left",
        wrapText: true,
      };

      // Fetch all required report data in parallel
      const [
        ipk31Res,
        ipk32Res,
        ipk33Res,
        ipk34Res,
        ipk35Res,
        ipk36Res,
        ipk37Res,
        ipk38Res,
      ] = await Promise.all([
        getReportIPK31(startDate, endDate),
        getReportIPK32(startDate, endDate),
        getReportIPK33(startDate, endDate),
        getReportIPK34(startDate, endDate),
        getReportIPK35(startDate, endDate),
        getReportIPK36(startDate, endDate),
        getReportIPK37(startDate, endDate),
        getReportIPK38(startDate, endDate),
      ]);

      const ipk31 = (ipk31Res as { data: InitialData }).data;
      const ipk32Rows = (ipk32Res as { data: GenericRow[] }).data;
      const ipk33Rows = (ipk33Res as { data: GenericRow[] }).data;
      const ipk34Rows = (ipk34Res as { data: GenericRow[] }).data;
      const ipk35Rows = (ipk35Res as { data: GenericRow[] }).data;
      const ipk36Rows = (ipk36Res as { data: GenericRow[] }).data;
      const ipk37Rows = (ipk37Res as { data: IPK3_7Row[] }).data;
      const ipk38Rows1 = (
        ipk38Res as {
          data: { educationRows: IPK3_8Row[]; companyTypeRows: IPK3_8Row[] };
        }
      ).data.educationRows;
      const ipk38Rows2 = (
        ipk38Res as {
          data: { educationRows: IPK3_8Row[]; companyTypeRows: IPK3_8Row[] };
        }
      ).data.companyTypeRows;

      for (const tab of TABS) {
        const worksheet = workbook.addWorksheet(tab.id);

        if (tab.id === "ipk3.1") {
          exportIPK3_1(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            headerDateString,
            ipk31,
          );
        } else if (tab.id === "ipk3.2") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            ipk32Rows,
          );
        } else if (tab.id === "ipk3.3") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            ipk33Rows,
          );
        } else if (tab.id === "ipk3.4") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            ipk34Rows,
          );
        } else if (tab.id === "ipk3.5") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            ipk35Rows,
          );
        } else if (tab.id === "ipk3.6") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            ipk36Rows,
          );
        } else if (tab.id === "ipk3.7") {
          exportIPK3_7(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            headerDateString,
            ipk37Rows,
          );
        } else if (tab.id === "ipk3.8") {
          exportIPK3_8(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            headerDateString,
            ipk38Rows1,
            ipk38Rows2,
          );
        }
      }

      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, `Laporan_Lengkap_${startDate}_${endDate}.xlsx`);
      showSuccess("Berhasil mengunduh semua laporan");
    } catch (error) {
      console.error(error);
      showError("Gagal mengunduh laporan lengkap");
    } finally {
      setIsExporting(false);
    }
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
              Laporan {activeTab.toUpperCase()}
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-3xl">
              {getSheetTitle(activeTab)}
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Filters */}
      <Card className="p-5 bg-white shadow-sm border border-gray-200/60 rounded-xl">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-end lg:items-center">
          {/* Date Filters */}
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
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

          {/* Actions */}
          <div className="flex gap-3 w-full lg:w-auto">
            <button
              onClick={handleExportExcel}
              disabled={isExporting}
              className={`flex-1 lg:flex-none justify-center px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2 ${
                isExporting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isExporting ? (
                <i className="ri-loader-4-line animate-spin"></i>
              ) : (
                <i className="ri-file-excel-line"></i>
              )}
              Export Sheet
            </button>
            <button
              onClick={handleExportAllExcel}
              disabled={isExporting}
              className={`flex-1 lg:flex-none justify-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 text-sm font-medium transition-all shadow-sm hover:shadow flex items-center gap-2 ${
                isExporting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isExporting ? (
                <i className="ri-loader-4-line animate-spin"></i>
              ) : (
                <i className="ri-file-excel-2-line"></i>
              )}
              Export Semua
            </button>
          </div>
        </div>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex space-x-1 min-w-max pb-1" aria-label="Tabs">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEducationData([]);
                }}
                className={`
                  whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm transition-colors duration-200
                  ${
                    isActive
                      ? "border-primary text-primary"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Table Content */}
      <Card className="overflow-hidden shadow-sm border border-gray-200/60 rounded-xl bg-white">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px] p-6">
            {activeTab === "ipk3.1" && (
              <IPK31Table
                headerDateString={headerDateString}
                data={ipk31Data}
              />
            )}

            {["ipk3.2", "ipk3.3", "ipk3.4", "ipk3.5", "ipk3.6"].includes(
              activeTab,
            ) && (
              <GenericIPKTable
                activeTab={activeTab}
                headerDateString={headerDateString}
                data={educationData.length > 0 ? educationData : undefined}
              />
            )}

            {activeTab === "ipk3.7" && (
              <IPK37Table
                headerDateString={headerDateString}
                data={ipk37Data}
              />
            )}

            {activeTab === "ipk3.8" && (
              <IPK38Table
                headerDateString={headerDateString}
                data={ipk38Data}
                secondData={ipk38Data2}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
