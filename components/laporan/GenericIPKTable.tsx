import React from "react";
import {
  ipk32Data,
  ipk33Data,
  ipk34Data,
  ipk35Data,
  ipk36Data,
} from "./real-data";
import { getSheetTitle, getLabelHeader } from "./helpers";
import { GenericRow } from "./types";

interface GenericIPKTableProps {
  activeTab: string;
  headerDateString: string;
}

export default function GenericIPKTable({
  activeTab,
  headerDateString,
}: GenericIPKTableProps) {
  let data: GenericRow[] = [];

  switch (activeTab) {
    case "ipk3.2":
      data = ipk32Data;
      break;
    case "ipk3.3":
      data = ipk33Data;
      break;
    case "ipk3.4":
      data = ipk34Data;
      break;
    case "ipk3.5":
      data = ipk35Data;
      break;
    case "ipk3.6":
      data = ipk36Data;
      break;
    default:
      data = ipk32Data;
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
                <th className="border border-black p-1 text-center">W</th>
              </React.Fragment>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          const isHeader = row.code.endsWith("000");
          return (
            <tr key={`row-${row.code}-${idx}`}>
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
              {isHeader ? (
                <td colSpan={10} className="border border-black p-1"></td>
              ) : (
                <>
                  <td className="border border-black p-1 text-center">
                    {row.lastMonth.l}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.lastMonth.w}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.registered.l}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.registered.w}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.placed.l}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.placed.w}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.removed.l}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.removed.w}
                  </td>
                  <td className="border border-black p-1 text-center">
                    {row.thisMonth.l}
                  </td>
                  <td className="border border-black p-1 text-center">
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
