import React from "react";
import { ipk38Data } from "./real-data";
import { getSheetTitle } from "./helpers";

interface IPK38TableProps {
  headerDateString: string;
}

export default function IPK38Table({ headerDateString }: IPK38TableProps) {
  return (
    <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
      <colgroup>
        <col className="w-12" />
        <col className="w-[250px]" />
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <col key={`g-${i}`} className="w-10" />
          ))}
      </colgroup>
      <thead>
        <tr>
          <th
            colSpan={14}
            className="p-2 text-center text-lg font-bold border-none"
          >
            {getSheetTitle("ipk3.8")}
          </th>
        </tr>
        <tr>
          <th colSpan={14} className="p-1 text-center font-bold border-none">
            {headerDateString}
          </th>
        </tr>
        <tr>
          <th colSpan={14} className="h-4 border-none"></th>
        </tr>

        <tr>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            KODE
          </th>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            TINGKAT PENDIDIKAN
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            ANTAR KERJA LOKAL (AKL)
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            ANTAR KERJA ANTAR DAERAH (AKAD)
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            ANTAR KERJA ANTAR NEGARA (AKAN)
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            JUMLAH
          </th>
        </tr>
        <tr></tr>
        <tr>
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <React.Fragment key={`h-${i}`}>
                <th className="border border-black p-1 text-center">L</th>
                <th className="border border-black p-1 text-center">P</th>
                <th className="border border-black p-1 text-center">JML</th>
              </React.Fragment>
            ))}
        </tr>
      </thead>
      <tbody>
        {ipk38Data.map((row, idx) => {
          const totalL = row.akl.l + row.akad.l + row.akan.l;
          const totalP = row.akl.p + row.akad.p + row.akan.p;
          return (
            <tr key={`row-${row.code}-${idx}`}>
              <td className="border border-black p-1 text-center">
                {row.code}
              </td>
              <td className="border border-black p-1 text-left">
                {row.education}
              </td>
              {/* AKL */}
              <td className="border border-black p-1 text-center">
                {row.akl.l}
              </td>
              <td className="border border-black p-1 text-center">
                {row.akl.p}
              </td>
              <td className="border border-black p-1 text-center">
                {row.akl.l + row.akl.p}
              </td>
              {/* AKAD */}
              <td className="border border-black p-1 text-center">
                {row.akad.l}
              </td>
              <td className="border border-black p-1 text-center">
                {row.akad.p}
              </td>
              <td className="border border-black p-1 text-center">
                {row.akad.l + row.akad.p}
              </td>
              {/* AKAN */}
              <td className="border border-black p-1 text-center">
                {row.akan.l}
              </td>
              <td className="border border-black p-1 text-center">
                {row.akan.p}
              </td>
              <td className="border border-black p-1 text-center">
                {row.akan.l + row.akan.p}
              </td>
              {/* Total */}
              <td className="border border-black p-1 text-center">{totalL}</td>
              <td className="border border-black p-1 text-center">{totalP}</td>
              <td className="border border-black p-1 text-center">
                {totalL + totalP}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
