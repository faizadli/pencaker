import React from "react";
import { ipk38DataPart2 } from "./real-data";
import { IPK3_8Row } from "./types";
import { getSheetTitle } from "./helpers";

interface IPK38TableProps {
  headerDateString: string;
  data?: IPK3_8Row[];
}

export default function IPK38Table({
  headerDateString,
  data: propData,
}: IPK38TableProps) {
  const dataPart1 = propData || [];
  const renderRow = (row: IPK3_8Row, idx: number) => {
    const totalL = row.akl.l + row.akad.l + row.akan.l;
    const totalP = row.akl.p + row.akad.p + row.akan.p;
    const totalJml = totalL + totalP;

    return (
      <tr key={`row-${row.code}-${idx}`}>
        <td className="border border-black p-1 text-center">{row.code}</td>
        <td className="border border-black p-1 text-left">{row.education}</td>
        {/* AKL */}
        <td className="border border-black p-1 text-center">{row.akl.l}</td>
        <td className="border border-black p-1 text-center">{row.akl.p}</td>
        <td className="border border-black p-1 text-center">
          {row.akl.l + row.akl.p}
        </td>
        {/* AKAD */}
        <td className="border border-black p-1 text-center">{row.akad.l}</td>
        <td className="border border-black p-1 text-center">{row.akad.p}</td>
        <td className="border border-black p-1 text-center">
          {row.akad.l + row.akad.p}
        </td>
        {/* AKAN */}
        <td className="border border-black p-1 text-center">{row.akan.l}</td>
        <td className="border border-black p-1 text-center">{row.akan.p}</td>
        <td className="border border-black p-1 text-center">
          {row.akan.l + row.akan.p}
        </td>
        {/* Total */}
        <td className="border border-black p-1 text-center">{totalL}</td>
        <td className="border border-black p-1 text-center">{totalP}</td>
        <td className="border border-black p-1 text-center">{totalJml}</td>
      </tr>
    );
  };

  const calculateFooter = (data: IPK3_8Row[]) => {
    const sum = {
      akl: { l: 0, p: 0, jml: 0 },
      akad: { l: 0, p: 0, jml: 0 },
      akan: { l: 0, p: 0, jml: 0 },
      total: { l: 0, p: 0, jml: 0 },
    };

    data.forEach((row) => {
      sum.akl.l += row.akl.l;
      sum.akl.p += row.akl.p;
      sum.akl.jml += row.akl.l + row.akl.p;

      sum.akad.l += row.akad.l;
      sum.akad.p += row.akad.p;
      sum.akad.jml += row.akad.l + row.akad.p;

      sum.akan.l += row.akan.l;
      sum.akan.p += row.akan.p;
      sum.akan.jml += row.akan.l + row.akan.p;

      const rowTotalL = row.akl.l + row.akad.l + row.akan.l;
      const rowTotalP = row.akl.p + row.akad.p + row.akan.p;
      const rowTotalJml = rowTotalL + rowTotalP;

      sum.total.l += rowTotalL;
      sum.total.p += rowTotalP;
      sum.total.jml += rowTotalJml;
    });

    return (
      <tr className="font-bold bg-gray-100">
        <td className="border border-black p-1 text-center" colSpan={2}>
          JUMLAH
        </td>
        {/* AKL */}
        <td className="border border-black p-1 text-center">{sum.akl.l}</td>
        <td className="border border-black p-1 text-center">{sum.akl.p}</td>
        <td className="border border-black p-1 text-center">{sum.akl.jml}</td>
        {/* AKAD */}
        <td className="border border-black p-1 text-center">{sum.akad.l}</td>
        <td className="border border-black p-1 text-center">{sum.akad.p}</td>
        <td className="border border-black p-1 text-center">{sum.akad.jml}</td>
        {/* AKAN */}
        <td className="border border-black p-1 text-center">{sum.akan.l}</td>
        <td className="border border-black p-1 text-center">{sum.akan.p}</td>
        <td className="border border-black p-1 text-center">{sum.akan.jml}</td>
        {/* Total */}
        <td className="border border-black p-1 text-center">{sum.total.l}</td>
        <td className="border border-black p-1 text-center">{sum.total.p}</td>
        <td className="border border-black p-1 text-center">{sum.total.jml}</td>
      </tr>
    );
  };

  return (
    <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
      <colgroup>
        <col className="w-10" />
        <col className="w-[250px]" />
        {Array(12)
          .fill(null)
          .map((_, i) => (
            <col key={`g-${i}`} className="w-12" />
          ))}
      </colgroup>
      <thead>
        {/* Main Title */}
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
            PENERIMA TENAGA KERJA DAN JENIS KELAMIN
          </th>
        </tr>
        <tr>
          <th colSpan={14} className="p-1 text-center font-bold border-none">
            DI KABUPATEN PASER
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

        {/* --- TABLE 1 HEADER --- */}
        <tr className="bg-gray-200">
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            Kode
          </th>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            I . Tingkat Pendidikan Pencari Kerja yg ditempatkan
          </th>
          <th className="border border-black p-1 align-middle" colSpan={9}>
            Jenis Antar Kerja
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            Jumlah
          </th>
        </tr>
        <tr className="bg-gray-200">
          <th className="border border-black p-1 align-middle" colSpan={3}>
            AKL
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            AKAD
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            AKAN
          </th>
        </tr>
        <tr className="bg-gray-200">
          {/* AKL L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
          {/* AKAD L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
          {/* AKAN L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
          {/* TOTAL L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
        </tr>
        {/* Numbering Row Table 1 */}
        <tr className="bg-gray-200">
          <th className="border border-black p-1 text-center font-normal">1</th>
          <th className="border border-black p-1 text-center font-normal">2</th>
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <th
                key={`num1-${i}`}
                className="border border-black p-1 text-center font-normal"
              >
                {i + 3}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {dataPart1.map((row, idx) => renderRow(row, idx))}
        {calculateFooter(dataPart1)}

        {/* --- SPACER --- */}
        <tr>
          <td colSpan={14} className="h-6 border-none"></td>
        </tr>

        {/* --- TABLE 2 HEADER --- */}
        <tr className="bg-gray-200">
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            No
          </th>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            II. Penerima Pencari Kerja
          </th>
          <th className="border border-black p-1 align-middle" colSpan={9}>
            Jenis Antar Kerja
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            Jumlah
          </th>
        </tr>
        <tr className="bg-gray-200">
          <th className="border border-black p-1 align-middle" colSpan={3}>
            AKL
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            AKAD
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            AKAN
          </th>
        </tr>
        <tr className="bg-gray-200">
          {/* AKL L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
          {/* AKAD L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
          {/* AKAN L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
          {/* TOTAL L/P/JML */}
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">JML</th>
        </tr>
        {/* Numbering Row Table 2 - Assuming it follows same pattern or omitted? 
            Based on inspection, it might be omitted, but for consistency let's add it or leave it.
            User asked to "match exactly". If inspection didn't show it, I shouldn't add it.
            However, usually these forms have numbering.
            The inspection showed Row 30 as Data. Row 29 as Header 3.
            So NO numbering row for Table 2.
        */}

        {ipk38DataPart2.map((row, idx) => renderRow(row, idx))}
        {calculateFooter(ipk38DataPart2)}
      </tbody>
    </table>
  );
}
