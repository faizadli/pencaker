import React from "react";
import { ipk37Data } from "./real-data";
import { getSheetTitle } from "./helpers";

interface IPK37TableProps {
  headerDateString: string;
}

export default function IPK37Table({ headerDateString }: IPK37TableProps) {
  return (
    <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
      <colgroup>
        <col className="w-12" />
        <col className="w-[250px]" />
        {Array(15)
          .fill(null)
          .map((_, i) => (
            <col key={`g-${i}`} className="w-10" />
          ))}
      </colgroup>
      <thead>
        <tr>
          <th
            colSpan={17}
            className="p-2 text-center text-lg font-bold border-none"
          >
            {getSheetTitle("ipk3.7")}
          </th>
        </tr>
        <tr>
          <th colSpan={17} className="p-1 text-center font-bold border-none">
            {headerDateString}
          </th>
        </tr>
        <tr>
          <th colSpan={17} className="h-4 border-none"></th>
        </tr>

        <tr>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            KODE
          </th>
          <th className="border border-black p-1 align-middle" rowSpan={3}>
            GOLONGAN POKOK LAPANGAN USAHA
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            SISA AKHIR BULAN LALU
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            PENDAFTARAN BULAN INI
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            PENEMPATAN BULAN INI
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            PENGHAPUSAN BULAN INI
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
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
                <th className="border border-black p-1 text-center">(0-2)</th>
                <th className="border border-black p-1 text-center">(3-5)</th>
                <th className="border border-black p-1 text-center">(6+)</th>
              </React.Fragment>
            ))}
        </tr>
      </thead>
      <tbody>
        {ipk37Data.map((row, idx) => (
          <tr key={`row-${row.code}-${idx}`}>
            <td className="border border-black p-1 text-center">{row.code}</td>
            <td className="border border-black p-1 text-left">{row.label}</td>
            {[
              row.sisaLalu,
              row.pendaftaran,
              row.penempatan,
              row.penghapusan,
              row.sisaIni,
            ].map((g, gi) => (
              <React.Fragment key={`g-${gi}`}>
                <td className="border border-black p-1 text-center">{g.d1}</td>
                <td className="border border-black p-1 text-center">{g.d2}</td>
                <td className="border border-black p-1 text-center">{g.d3}</td>
              </React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
