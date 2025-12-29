import { initialData } from "./real-data";
import { getSheetTitle } from "./helpers";

interface IPK31TableProps {
  headerDateString: string;
}

export default function IPK31Table({ headerDateString }: IPK31TableProps) {
  return (
    <table className="w-full border-collapse border border-black text-xs font-sans table-fixed">
      <colgroup>
        <col className="w-[300px]" />
        {Array(10)
          .fill(null)
          .map((_, i) => (
            <col key={`g-${i}`} className="w-10" />
          ))}
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <col key={`t-${i}`} className="w-10" />
          ))}
        <col className="w-12" />
      </colgroup>
      <thead>
        <tr>
          <th
            colSpan={14}
            className="p-2 text-center text-lg font-bold border-none"
          >
            {getSheetTitle("ipk3.1")}
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
            I. PENCARI KERJA
          </th>
          <th className="border border-black p-1 align-middle" colSpan={10}>
            KELOMPOK UMUR
          </th>
          <th
            className="border border-black p-1 align-middle"
            colSpan={3}
            rowSpan={2}
          >
            JUMLAH
          </th>
        </tr>
        <tr>
          <th className="border border-black p-1 align-middle" colSpan={2}>
            15-19
          </th>
          <th className="border border-black p-1 align-middle" colSpan={2}>
            20-29
          </th>
          <th className="border border-black p-1 align-middle" colSpan={2}>
            30-44
          </th>
          <th className="border border-black p-1 align-middle" colSpan={2}>
            45-54
          </th>
          <th className="border border-black p-1 align-middle" colSpan={2}>
            55+
          </th>
        </tr>
        <tr>
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">L</th>
          <th className="border border-black p-1 text-center">P</th>
          <th className="border border-black p-1 text-center">L+P</th>
        </tr>
      </thead>
      <tbody>
        {initialData.pencariKerja.map((row, idx) => (
          <tr
            key={`pk-${idx}`}
            className={row.bold ? "font-bold bg-gray-50" : ""}
          >
            <td className="border border-black p-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">
              {row.label}
            </td>
            {row.data.map((val, i) => (
              <td key={i} className="border border-black p-1 text-center">
                {val}
              </td>
            ))}
          </tr>
        ))}
        <tr className="font-bold">
          <td className="border border-black p-1 text-center">II. LOWONGAN</td>
          <td className="border border-black p-1 text-center">L</td>
          <td className="border border-black p-1 text-center">P</td>
          <td className="border border-black p-1 text-center">L+P</td>
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <td key={`empty-h-${i}`} className="p-1"></td>
            ))}
        </tr>
        <tr>
          <td className="border border-black p-1 text-center">1</td>
          <td className="border border-black p-1 text-center">2</td>
          <td className="border border-black p-1 text-center">3</td>
          <td className="border border-black p-1 text-center">4</td>
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <td key={`empty-n-${i}`} className="p-1"></td>
            ))}
        </tr>
        {initialData.lowongan.map((row, idx) => (
          <tr
            key={`lw-${idx}`}
            className={row.bold ? "font-bold bg-gray-50" : ""}
          >
            <td className="border border-black p-1 text-left whitespace-nowrap overflow-hidden text-ellipsis">
              {row.label}
            </td>
            <td className="border border-black p-1 text-center">{row.l}</td>
            <td className="border border-black p-1 text-center">{row.w}</td>
            <td className="border border-black p-1 text-center">{row.lw}</td>
            {Array(10)
              .fill(null)
              .map((_, i) => (
                <td key={`empty-d-${idx}-${i}`} className="p-1"></td>
              ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
