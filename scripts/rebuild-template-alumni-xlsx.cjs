/**
 * Bangun ulang public/template-alumni.xlsx dengan ExcelJS (border, alignment, format teks).
 * Jalankan: node scripts/rebuild-template-alumni-xlsx.cjs
 * atau: npm run rebuild:template-alumni
 */
const ExcelJS = require("exceljs");
const path = require("path");

const file = path.join(__dirname, "..", "public", "template-alumni.xlsx");

const SECTION_TITLES = [
  "KEJURUAN OPERATOR KOMPUTER",
  "KEJURUAN SECURITY",
  "KEJURUAN MEKANIK ALAT BERAT BATCH I",
  "KEJURUAN MEKANIK ALAT BERAT BATCH II",
  "PENGOLAHAN RUMPUT LAUT BATCH I",
  "PENGOLAHAN RUMPUT LAUT BATCH II",
  "KEJURUAN TEKNISI HP",
  "KEJURUAN TEKNISI KOMPUTER",
  "KEJURUAN MEKANIK PERIKANAN",
  "KEJURUAN BARBERSHOP",
  "KEJURUAN CLEANING SERVICE",
  "KEJURUAN CALON INSTRUKTUR",
];

const HEADER = [
  "No.",
  "NAMA",
  "NIK",
  "JENIS KELAMIN",
  "EMAIL",
  "TEMPAT LAHIR",
  "TANGGAL LAHIR\n(contoh: 12 mei 2025)",
  "ALAMAT",
  "NO HP\n(tulis sebagai teks; contoh: 081234567890)",
  "PENDIDIKAN TERAKHIR",
];

const COLS = HEADER.length;
const DATA_ROWS_PER_SECTION = 10;

const edge = { style: "thin", color: { argb: "FFBEBEBE" } };

function setBorder(cell) {
  cell.border = { top: edge, left: edge, bottom: edge, right: edge };
}

async function main() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Sheet1", {
    properties: { defaultRowHeight: 18 },
    views: [{ showGridLines: true }],
  });

  ws.addRow(new Array(COLS).fill(""));
  ws.addRow(new Array(COLS).fill(""));

  for (const title of SECTION_TITLES) {
    const titleRow = ws.addRow([title, ...Array(COLS - 1).fill("")]);
    ws.mergeCells(titleRow.number, 1, titleRow.number, COLS);
    const titleCell = titleRow.getCell(1);
    titleCell.font = { bold: true, size: 11 };
    titleCell.alignment = { vertical: "middle", horizontal: "left", indent: 1 };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFF3F4F6" },
    };
    setBorder(titleCell);
    titleRow.height = 24;

    const headerRow = ws.addRow([...HEADER]);
    headerRow.height = 52;
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true, size: 10 };
      cell.alignment = {
        vertical: "middle",
        horizontal: "center",
        wrapText: true,
      };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFE8EEF7" },
      };
      setBorder(cell);
    });

    for (let n = 1; n <= DATA_ROWS_PER_SECTION; n++) {
      const dataRow = ws.addRow([n, "", "", "", "", "", "", "", "", ""]);
      dataRow.eachCell((cell, colNumber) => {
        setBorder(cell);
        if (colNumber === 1) {
          cell.alignment = { vertical: "middle", horizontal: "center" };
        } else {
          cell.alignment = {
            vertical: "top",
            horizontal: "left",
            wrapText: true,
          };
        }
        if (colNumber === 3 || colNumber === 7 || colNumber === 9) {
          cell.numFmt = "@";
        }
      });
    }
  }

  ws.columns = [
    { width: 5 },
    { width: 22 },
    { width: 18 },
    { width: 14 },
    { width: 28 },
    { width: 14 },
    { width: 24 },
    { width: 34 },
    { width: 24 },
    { width: 22 },
  ];

  await wb.xlsx.writeFile(file);
  console.log("OK:", file);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
