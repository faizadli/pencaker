const ExcelJS = require("exceljs");
const path = require("path");
const fs = require("fs");

async function generateRealData() {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, "public", "Laporan IPK.xlsx");

  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return;
  }

  await workbook.xlsx.readFile(filePath);

  const data = {
    ipk31: { pencariKerja: [], lowongan: [] },
    ipk32: [],
    ipk33: [],
    ipk34: [],
    ipk35: [],
    ipk36: [],
    ipk37: [],
    ipk38: [],
  };

  // Helper to get cell value safely
  const getVal = (row, col) => {
    let val = row.getCell(col).value;
    if (typeof val === "object" && val !== null) {
      if (val.result !== undefined) val = val.result;
      else if (val.richText) val = val.richText.map((r) => r.text).join("");
    }
    return val;
  };

  // Helper to get number safely
  const getNum = (row, col) => {
    const val = getVal(row, col);
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  };

  // Process IPK 3.1
  const sheet31 = workbook.getWorksheet("ipk3.1");
  if (sheet31) {
    let isLowongan = false;
    sheet31.eachRow((row, rowNumber) => {
      const col1 = getVal(row, 1);
      const col1Str = String(col1 || "").trim();

      // Skip header rows
      if (
        col1Str.startsWith("IPK") ||
        col1Str.startsWith("PADA TANGGAL") ||
        col1Str === "I.PENCARI KERJA"
      ) {
        return;
      }

      if (col1Str.includes("II. LOWONGAN")) {
        isLowongan = true;
        return;
      }

      if (!col1) return;

      // Skip column index rows (e.g. "1", "2" in col 1/2)
      // Heuristic: if col1 is small number and data matches column indices
      if (/^\d+$/.test(col1Str) && parseInt(col1Str) < 10) {
        // Check if it's a data row or just column numbers
        // If it's "1" and next col is "2", likely column numbers
        const col2 = getVal(row, 2);
        if (String(col2).trim() === "2") return;
        if (isLowongan && col1Str === "1") return;
      }

      if (!isLowongan) {
        // Pencari Kerja
        // Check if it's a data row (check if col 3 has value)
        const col3 = getVal(row, 3);
        if (col3 !== null && col3 !== undefined && col3 !== "") {
          // Extract 13 columns (3 to 15)
          const rowData = [];
          for (let i = 3; i <= 15; i++) {
            rowData.push(getNum(row, i));
          }
          // Check if label contains "JUMLAH" to set bold
          const isBold = col1Str.includes("JUMLAH");

          data.ipk31.pencariKerja.push({
            label: col1Str,
            data: rowData,
            bold: isBold,
          });
        }
      } else {
        // Lowongan
        // Check if it's a data row (check if col 2 has value)
        const col2 = getVal(row, 2);
        if (col2 !== null && col2 !== undefined && col2 !== "") {
          // Extract l (2), w (3), lw (4)
          const l = getNum(row, 2);
          const w = getNum(row, 3);
          const lw = getNum(row, 4);
          const isBold = col1Str.includes("JUMLAH");

          data.ipk31.lowongan.push({
            label: col1Str,
            l,
            w,
            lw,
            bold: isBold,
          });
        }
      }
    });
  }

  // Process Generic Sheets (3.2 - 3.6)
  const genericSheets = [
    { name: "ipk3.2", key: "ipk32" },
    { name: "ipk3.3", key: "ipk33" },
    { name: "ipk3.4", key: "ipk34" },
    { name: "ipk3.5", key: "ipk35" },
    { name: "ipk.3.6", key: "ipk36" },
  ];

  for (const { name, key } of genericSheets) {
    const sheet = workbook.getWorksheet(name);
    if (sheet) {
      sheet.eachRow((row, rowNumber) => {
        const col1 = String(getVal(row, 1) || "").trim();
        const col2 = String(getVal(row, 2) || "").trim();

        // Skip empty rows
        if (!col1 && !col2) return;

        // Skip Titles and Headers
        if (
          col1.startsWith("IPK") ||
          col1.startsWith("KABUPATEN") ||
          col1.startsWith("Laporan")
        )
          return;
        if (col1.startsWith("PADA TANGGAL")) return;
        if (col1.includes("PENCARI KERJA")) return;

        // Skip Header "Kode"
        if (col1.toLowerCase() === "kode" || col1.toLowerCase() === "code")
          return;

        // Skip Column Index Row (1, 1/2, 2/3...)
        const col3Raw = getVal(row, 3);
        const col3Str = String(col3Raw || "").trim();

        // Heuristic: col1 is "1", col3 is "2" or "L" or "Sisa..."
        // In IPK 3.2, Row 7: col1="1", col2="1", col3="2"
        if (col1 === "1" && (col2 === "1" || col2 === "2")) return;
        if (col1 === "1" && col3Str === "2") return;

        // Accept row (even if data columns are empty)
        data[key].push({
          code: col1,
          label: col2,
          lastMonth: { l: getNum(row, 3), w: getNum(row, 4) },
          registered: { l: getNum(row, 5), w: getNum(row, 6) },
          placed: { l: getNum(row, 7), w: getNum(row, 8) },
          removed: { l: getNum(row, 9), w: getNum(row, 10) },
          thisMonth: { l: getNum(row, 11), w: getNum(row, 12) },
        });
      });
    }
  }

  // Process IPK 3.7
  const sheet37 = workbook.getWorksheet("ipk.3.7");
  if (sheet37) {
    sheet37.eachRow((row, rowNumber) => {
      const col3 = getVal(row, 3);
      if (typeof col3 === "number") {
        const code = String(getVal(row, 1) || "");
        const label = String(getVal(row, 2) || "");

        data.ipk37.push({
          code,
          label,
          sisaLalu: {
            d1: getNum(row, 3),
            d2: getNum(row, 4),
            d3: getNum(row, 5),
          },
          pendaftaran: {
            d1: getNum(row, 6),
            d2: getNum(row, 7),
            d3: getNum(row, 8),
          },
          penempatan: {
            d1: getNum(row, 9),
            d2: getNum(row, 10),
            d3: getNum(row, 11),
          },
          penghapusan: {
            d1: getNum(row, 12),
            d2: getNum(row, 13),
            d3: getNum(row, 14),
          },
          sisaIni: {
            d1: getNum(row, 15),
            d2: getNum(row, 16),
            d3: getNum(row, 17),
          },
        });
      }
    });
  }

  // Process IPK 3.8
  const sheet38 = workbook.getWorksheet("ipk.3.8");
  if (sheet38) {
    sheet38.eachRow((row, rowNumber) => {
      const col3 = getVal(row, 3);
      if (typeof col3 === "number") {
        const code = String(getVal(row, 1) || "");
        const education = String(getVal(row, 2) || "");

        data.ipk38.push({
          code,
          education,
          akl: { l: getNum(row, 3), p: getNum(row, 4) },
          akad: { l: getNum(row, 6), p: getNum(row, 7) },
          akan: { l: getNum(row, 9), p: getNum(row, 10) },
        });
      }
    });
  }

  // Generate TS content
  const tsContent = `import { InitialData, GenericRow, IPK3_7Row, IPK3_8Row } from "./types";

export const initialData: InitialData = ${JSON.stringify(data.ipk31, null, 2)};

export const ipk32Data: GenericRow[] = ${JSON.stringify(data.ipk32, null, 2)};
export const ipk33Data: GenericRow[] = ${JSON.stringify(data.ipk33, null, 2)};
export const ipk34Data: GenericRow[] = ${JSON.stringify(data.ipk34, null, 2)};
export const ipk35Data: GenericRow[] = ${JSON.stringify(data.ipk35, null, 2)};
export const ipk36Data: GenericRow[] = ${JSON.stringify(data.ipk36, null, 2)};

export const ipk37Data: IPK3_7Row[] = ${JSON.stringify(data.ipk37, null, 2)};

export const ipk38Data: IPK3_8Row[] = ${JSON.stringify(data.ipk38, null, 2)};
`;

  fs.writeFileSync(
    path.join(__dirname, "components", "laporan", "real-data.ts"),
    tsContent,
  );
  console.log("Successfully generated real-data.ts");
}

generateRealData();
