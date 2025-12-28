"use client";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import Card from "../../../components/ui/Card";
import { useToast } from "../../../components/ui/Toast";
import { TABS, GenericRow, BaseGroup } from "../../../components/laporan/types";
import {
  getSheetTitle,
  formatDateIndo,
  processDataToRows,
} from "../../../components/laporan/helpers";
import IPK31Table from "../../../components/laporan/IPK31Table";
import GenericIPKTable from "../../../components/laporan/GenericIPKTable";
import IPK37Table from "../../../components/laporan/IPK37Table";
import IPK38Table from "../../../components/laporan/IPK38Table";
import {
  exportIPK3_1,
  exportGeneric12Col,
  exportIPK3_7,
  exportIPK3_8,
} from "../../../utils/export-laporan";
import {
  getEducationGroups,
  getPositionGroups,
  getJobCategoryGroups,
} from "../../../services/site";

export default function LaporanPage() {
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState("ipk3.1");
  const [startDate, setStartDate] = useState("2025-08-01");
  const [endDate, setEndDate] = useState("2025-08-31");
  const [educationData, setEducationData] = useState<GenericRow[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const headerDateString = `PADA TANGGAL : ${formatDateIndo(startDate)} s/d ${formatDateIndo(endDate)}`;

  useEffect(() => {
    if (activeTab === "ipk3.2" || activeTab === "ipk3.4") {
      getEducationGroups()
        .then((res: unknown) => {
          const response = res as { data: BaseGroup[] };
          const data = response.data;
          setEducationData(processDataToRows(data));
        })
        .catch((err) => {
          console.error("Failed to fetch education groups", err);
          showError("Gagal mengambil data pendidikan");
        });
    } else if (activeTab === "ipk3.3" || activeTab === "ipk3.5") {
      getPositionGroups()
        .then((res: unknown) => {
          const response = res as { data: BaseGroup[] };
          const data = response.data;
          setEducationData(processDataToRows(data));
        })
        .catch((err) => {
          console.error("Failed to fetch position groups", err);
          showError("Gagal mengambil data jabatan");
        });
    } else if (activeTab === "ipk3.6") {
      getJobCategoryGroups()
        .then((res: unknown) => {
          const response = res as { data: BaseGroup[] };
          const data = response.data;
          setEducationData(processDataToRows(data));
        })
        .catch((err) => {
          console.error("Failed to fetch job category groups", err);
          showError("Gagal mengambil data golongan pokok lapangan usaha");
        });
    }
  }, [activeTab, showError]);

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
        exportIPK3_1(
          worksheet,
          defaultBorder,
          centerAlignment,
          leftAlignment,
          headerDateString,
        );
      } else if (
        ["ipk3.2", "ipk3.3", "ipk3.4", "ipk3.5", "ipk3.6"].includes(activeTab)
      ) {
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
        );
      } else if (activeTab === "ipk3.8") {
        exportIPK3_8(
          worksheet,
          defaultBorder,
          centerAlignment,
          leftAlignment,
          headerDateString,
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

      // Fetch all required data in parallel
      const [eduRes, posRes, jobRes] = await Promise.all([
        getEducationGroups(),
        getPositionGroups(),
        getJobCategoryGroups(),
      ]);

      const eduData = (eduRes as { data: BaseGroup[] }).data;
      const posData = (posRes as { data: BaseGroup[] }).data;
      const jobData = (jobRes as { data: BaseGroup[] }).data;

      const eduRows = processDataToRows(eduData);
      const posRows = processDataToRows(posData);
      const jobRows = processDataToRows(jobData);

      for (const tab of TABS) {
        const worksheet = workbook.addWorksheet(tab.id);

        if (tab.id === "ipk3.1") {
          exportIPK3_1(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            headerDateString,
          );
        } else if (tab.id === "ipk3.2" || tab.id === "ipk3.4") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            eduRows,
          );
        } else if (tab.id === "ipk3.3" || tab.id === "ipk3.5") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            posRows,
          );
        } else if (tab.id === "ipk3.6") {
          exportGeneric12Col(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            tab.id,
            headerDateString,
            jobRows,
          );
        } else if (tab.id === "ipk3.7") {
          exportIPK3_7(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            headerDateString,
          );
        } else if (tab.id === "ipk3.8") {
          exportIPK3_8(
            worksheet,
            defaultBorder,
            centerAlignment,
            leftAlignment,
            headerDateString,
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
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-6 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6 space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Laporan {activeTab.toUpperCase()}
            </h1>
            <p className="text-sm text-gray-500 mt-1 max-w-3xl">
              {getSheetTitle(activeTab)}
            </p>
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
                <IPK31Table headerDateString={headerDateString} />
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
                <IPK37Table headerDateString={headerDateString} />
              )}

              {activeTab === "ipk3.8" && (
                <IPK38Table headerDateString={headerDateString} />
              )}
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
