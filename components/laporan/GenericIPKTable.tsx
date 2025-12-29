import React from "react";
import { getSheetTitle, getLabelHeader } from "./helpers";
import { GenericRow } from "./types";

interface GenericIPKTableProps {
  activeTab: string;
  headerDateString: string;
  data?: GenericRow[];
}

export default function GenericIPKTable({
  activeTab,
  headerDateString,
  data: propData,
}: GenericIPKTableProps) {
  let data: GenericRow[] = propData || [];

  if (data.length === 0) {
    data = [];
  }

  return (
    <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
      <colgroup>
        <col className="w-12" />
        <col className="w-[250px]" />
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <col key={`g-${i}`} className="w-10" />
          ))}
      </colgroup>
      <thead>
        <tr>
          <th
            colSpan={12}
            className="p-2 text-center text-lg font-bold border-none"
          >
            {getSheetTitle(activeTab)}
          </th>
        </tr>
        <tr>
          <th colSpan={12} className="p-1 text-center font-bold border-none">
            {headerDateString}
          </th>
        </tr>
        <tr>
          <th colSpan={12} className="h-4 border-none"></th>
        </tr>

        <tr>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            KODE
          </th>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            {getLabelHeader(activeTab)}
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={2}
            rowSpan={2}
          >
            SISA AKHIR BULAN LALU
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={2}
            rowSpan={2}
          >
            PENDAFTARAN BULAN INI
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={2}
            rowSpan={2}
          >
            PENEMPATAN BULAN INI
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={2}
            rowSpan={2}
          >
            PENGHAPUSAN BULAN INI
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={2}
            rowSpan={2}
          >
            SISA AKHIR BULAN INI
          </th>
        </tr>
        <tr></tr>
        <tr>
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <React.Fragment key={`h-${i}`}>
                <th className="border border-black p-1 text-center">L</th>
                <th className="border border-black p-1 text-center">P</th>
              </React.Fragment>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          const isHeader =
            row.isHeader || row.code.length === 1 || row.code.endsWith("000");
          const isJumlah = row.code === "JUMLAH";

          return (
            <tr key={`row-${row.code}-${idx}`}>
              {isJumlah ? (
                <td
                  colSpan={2}
                  className="border border-black p-1 text-center font-bold"
                >
                  JUMLAH
                </td>
              ) : (
                <>
                  <td
                    className={`border border-black p-1 text-center ${isHeader ? "font-bold" : ""}`}
                  >
                    {row.code}
                  </td>
                  <td
                    className={`border border-black p-1 text-left ${isHeader ? "font-bold" : ""}`}
                  >
                    {row.label}
                  </td>
                </>
              )}

              {isHeader ? (
                <td colSpan={10} className="border border-black p-1"></td>
              ) : (
                <>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.lastMonth.l}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.lastMonth.w}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.registered.l}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.registered.w}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.placed.l}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.placed.w}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.removed.l}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.removed.w}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.thisMonth.l}
                  </td>
                  <td
                    className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                  >
                    {row.thisMonth.w}
                  </td>
                </>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
