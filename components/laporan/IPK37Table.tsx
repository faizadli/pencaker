import React from "react";
import { getSheetTitle } from "./helpers";
import { IPK3_7Row } from "./types";

interface IPK37TableProps {
  headerDateString: string;
  data?: IPK3_7Row[];
}

export default function IPK37Table({
  headerDateString,
  data: propData,
}: IPK37TableProps) {
  const data = propData || [];

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
            DI KABUPATEN PASER MENURUT LAMA LULUSAN DAN TINGKAT PENDIDIKAN
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

        {/* Header Row 1 */}
        <tr>
          <th className="border border-black p-1 align-middle" rowSpan={2}>
            Kode
          </th>
          <th className="border border-black p-1 align-middle" rowSpan={2}>
            Tingkat Pendidikan
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            Sisa akhir bulan lalu
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            Pendaftaran bulan ini
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            Penempatan bulan ini
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            Penghapuskan bulan ini
          </th>
          <th className="border border-black p-1 align-middle" colSpan={3}>
            Sisa akhir bulan ini
          </th>
        </tr>

        {/* Header Row 2: Subheaders */}
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

        {/* Header Row 3: Column Numbering */}
        <tr>
          <th className="border border-black p-1 text-center font-normal">1</th>
          <th className="border border-black p-1 text-center font-normal">2</th>
          {Array(15)
            .fill(null)
            .map((_, i) => (
              <th
                key={`num-${i}`}
                className="border border-black p-1 text-center font-normal"
              >
                {i + 3}
              </th>
            ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          const isHeader = row.isHeader;
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

              {isHeader && !isJumlah ? (
                <td colSpan={15} className="border border-black p-1"></td>
              ) : (
                [
                  row.sisaLalu,
                  row.pendaftaran,
                  row.penempatan,
                  row.penghapusan,
                  row.sisaIni,
                ].map((g, gi) => (
                  <React.Fragment key={`g-${gi}`}>
                    <td
                      className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                    >
                      {g.d1}
                    </td>
                    <td
                      className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                    >
                      {g.d2}
                    </td>
                    <td
                      className={`border border-black p-1 text-center ${isJumlah ? "font-bold" : ""}`}
                    >
                      {g.d3}
                    </td>
                  </React.Fragment>
                ))
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
