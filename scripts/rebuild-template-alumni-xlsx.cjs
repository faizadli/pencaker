/**
 * Template hanya berisi tabel peserta (nama pelatihan, lembaga, tahun, periode di form web).
 * Jalankan: node scripts/rebuild-template-alumni-xlsx.cjs
 */
const ExcelJS = require("exceljs");
const path = require("path");

const file = path.join(__dirname, "..", "public", "template-alumni.xlsx");

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
const DATA_ROWS = 20;

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

  const hintRow = ws.addRow([
    "Isi data pelatihan (nama pelatihan, lembaga, tahun, tanggal) di form website, lalu unggah file ini setelah mengisi baris peserta di bawah.",
    ...Array(COLS - 1).fill(""),
  ]);
  hintRow.height = 36;
  const hintCell = hintRow.getCell(1);
  hintCell.font = { italic: true, size: 10, color: { argb: "FF6B7280" } };
  ws.mergeCells(hintRow.number, 1, hintRow.number, COLS);
  hintCell.alignment = {
    vertical: "middle",
    horizontal: "left",
    wrapText: true,
    indent: 1,
  };

  ws.addRow(new Array(COLS).fill(""));

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

  for (let n = 1; n <= DATA_ROWS; n++) {
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
