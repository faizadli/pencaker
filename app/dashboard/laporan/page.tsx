"use client";
import * as ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { useState, useEffect } from "react";
import Card from "../../../components/ui/Card";
import { useToast } from "../../../components/ui/Toast";
import { TABS, GenericRow } from "../../../components/laporan/types";
import {
  getSheetTitle,
  formatDateIndo,
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

interface EduGroup {
  id: string;
  code: string;
  name: string;
  items: { id: string; code: string; name: string }[];
}

interface PositionGroup {
  id: string;
  code: string;
  name: string;
  items: { id: string; code: string; name: string }[];
}

interface JobCategoryGroup {
  id: string;
  code: string;
  name: string;
  items: { id: string; code: string; name: string }[];
}

export default function LaporanPage() {
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState("ipk3.1");
  const [startDate, setStartDate] = useState("2025-08-01");
  const [endDate, setEndDate] = useState("2025-08-31");
  const [educationData, setEducationData] = useState<GenericRow[]>([]);

  const headerDateString = `PADA TANGGAL : ${formatDateIndo(startDate)} s/d ${formatDateIndo(endDate)}`;

  useEffect(() => {
    if (activeTab === "ipk3.2" || activeTab === "ipk3.4") {
      getEducationGroups()
        .then((res: unknown) => {
          const response = res as { data: EduGroup[] };
          const data = response.data;

          // Sort groups by code
          data.sort((a, b) =>
            a.code.localeCompare(b.code, undefined, { numeric: true }),
          );

          const rows: GenericRow[] = [];
          data.forEach((group) => {
            // Sort items within group by code
            group.items.sort((a, b) =>
              a.code.localeCompare(b.code, undefined, { numeric: true }),
            );

            // Add Header Row (Group)
            // Ensure code is single char for header detection
            rows.push({
              code: group.code,
              label: group.name,
              lastMonth: { l: 0, w: 0 },
              registered: { l: 0, w: 0 },
              placed: { l: 0, w: 0 },
              removed: { l: 0, w: 0 },
              thisMonth: { l: 0, w: 0 },
              isHeader: true,
            });

            // Add Item Rows (Levels)
            group.items.forEach((item) => {
              rows.push({
                code: item.code,
                label: item.name,
                lastMonth: { l: 0, w: 0 },
                registered: { l: 0, w: 0 },
                placed: { l: 0, w: 0 },
                removed: { l: 0, w: 0 },
                thisMonth: { l: 0, w: 0 },
                isHeader: false,
              });
            });
          });

          // Add JUMLAH row
          rows.push({
            code: "JUMLAH",
            label: "JUMLAH",
            lastMonth: { l: 0, w: 0 },
            registered: { l: 0, w: 0 },
            placed: { l: 0, w: 0 },
            removed: { l: 0, w: 0 },
            thisMonth: { l: 0, w: 0 },
          });

          setEducationData(rows);
        })
        .catch((err) => {
          console.error("Failed to fetch education groups", err);
          showError("Gagal mengambil data pendidikan");
        });
    } else if (activeTab === "ipk3.3" || activeTab === "ipk3.5") {
      getPositionGroups()
        .then((res: unknown) => {
          const response = res as { data: PositionGroup[] };
          const data = response.data;

          // Sort groups by code
          data.sort((a, b) =>
            a.code.localeCompare(b.code, undefined, { numeric: true }),
          );

          const rows: GenericRow[] = [];
          data.forEach((group) => {
            // Sort items within group by code
            group.items.sort((a, b) =>
              a.code.localeCompare(b.code, undefined, { numeric: true }),
            );

            // Add Header Row (Group)
            rows.push({
              code: group.code,
              label: group.name,
              lastMonth: { l: 0, w: 0 },
              registered: { l: 0, w: 0 },
              placed: { l: 0, w: 0 },
              removed: { l: 0, w: 0 },
              thisMonth: { l: 0, w: 0 },
              isHeader: true,
            });

            // Add Item Rows (Titles)
            group.items.forEach((item) => {
              rows.push({
                code: item.code,
                label: item.name,
                lastMonth: { l: 0, w: 0 },
                registered: { l: 0, w: 0 },
                placed: { l: 0, w: 0 },
                removed: { l: 0, w: 0 },
                thisMonth: { l: 0, w: 0 },
                isHeader: false,
              });
            });
          });

          // Add JUMLAH row
          rows.push({
            code: "JUMLAH",
            label: "JUMLAH",
            lastMonth: { l: 0, w: 0 },
            registered: { l: 0, w: 0 },
            placed: { l: 0, w: 0 },
            removed: { l: 0, w: 0 },
            thisMonth: { l: 0, w: 0 },
          });

          setEducationData(rows);
        })
        .catch((err) => {
          console.error("Failed to fetch position groups", err);
          showError("Gagal mengambil data jabatan");
        });
    } else if (activeTab === "ipk3.6") {
      getJobCategoryGroups()
        .then((res: unknown) => {
          const response = res as { data: JobCategoryGroup[] };
          const data = response.data;

          // Sort groups by code
          data.sort((a, b) =>
            a.code.localeCompare(b.code, undefined, { numeric: true }),
          );

          const rows: GenericRow[] = [];
          data.forEach((group) => {
            // Sort items within group by code
            group.items.sort((a, b) =>
              a.code.localeCompare(b.code, undefined, { numeric: true }),
            );

            // Add Header Row (Group)
            rows.push({
              code: group.code,
              label: group.name,
              lastMonth: { l: 0, w: 0 },
              registered: { l: 0, w: 0 },
              placed: { l: 0, w: 0 },
              removed: { l: 0, w: 0 },
              thisMonth: { l: 0, w: 0 },
              isHeader: true,
            });

            // Add Item Rows (Categories)
            group.items.forEach((item) => {
              rows.push({
                code: item.code,
                label: item.name,
                lastMonth: { l: 0, w: 0 },
                registered: { l: 0, w: 0 },
                placed: { l: 0, w: 0 },
                removed: { l: 0, w: 0 },
                thisMonth: { l: 0, w: 0 },
                isHeader: false,
              });
            });
          });

          // Add JUMLAH row
          rows.push({
            code: "JUMLAH",
            label: "JUMLAH",
            lastMonth: { l: 0, w: 0 },
            registered: { l: 0, w: 0 },
            placed: { l: 0, w: 0 },
            removed: { l: 0, w: 0 },
            thisMonth: { l: 0, w: 0 },
          });

          setEducationData(rows);
        })
        .catch((err) => {
          console.error("Failed to fetch job category groups", err);
          showError("Gagal mengambil data golongan pokok lapangan usaha");
        });
    }
  }, [activeTab, showError]);

  const handleExportExcel = async () => {
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
    }
  };

  return (
    <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
      <div className="px-4 sm:px-6">
        <div className="mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              Laporan {activeTab.toUpperCase()}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              {getSheetTitle(activeTab)}
            </p>
          </div>
          <div className="flex gap-4 items-end">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">
                Dari Tanggal
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold text-gray-600">
                Sampai Tanggal
              </label>
              <input
                type="date"
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button
              onClick={handleExportExcel}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition flex items-center gap-2 h-[34px]"
            >
              <i className="ri-file-excel-line"></i>
              Export Excel
            </button>
          </div>
        </div>

        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEducationData([]);
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <Card className="overflow-x-auto">
          <div className="min-w-[1200px] p-4 bg-white">
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
        </Card>
      </div>
    </main>
  );
}
