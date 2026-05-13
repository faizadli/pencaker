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
                Laporan IPK
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Laporan {activeTab.toUpperCase()}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                {getSheetTitle(activeTab)}
              </p>
            </div>
          </div>
          <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
            <i className="ri-bar-chart-box-line" />
            {activeTab.toUpperCase()}
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
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <button
              type="button"
              onClick={handleExportExcel}
              disabled={isExporting}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-all shadow-sm hover:bg-emerald-700 hover:shadow ${
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
              type="button"
              onClick={handleExportAllExcel}
              disabled={isExporting}
              className={`flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-white transition-all shadow-sm hover:bg-[var(--color-primary-dark)] hover:shadow ${
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

      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/90 p-2 shadow-sm ring-1 ring-slate-950/[0.02]">
        <nav className="flex min-w-max gap-2" aria-label="Tabs">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                type="button"
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEducationData([]);
                }}
                className={`
                  whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200
                  ${
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                  }
                `}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>

      <Card className="overflow-hidden !rounded-2xl !border-slate-200/90 bg-white !shadow-sm ring-1 ring-slate-950/[0.02] [&>div]:!p-0">
        <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">
                Preview tabel {activeTab.toUpperCase()}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Data ditampilkan sesuai tab dan rentang tanggal yang dipilih.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-slate-600 ring-1 ring-slate-200/80">
              <i className="ri-calendar-line text-primary" />
              {startDate} s/d {endDate}
            </span>
          </div>
        </div>
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
