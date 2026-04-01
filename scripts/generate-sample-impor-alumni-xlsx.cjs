/**
 * Sampel impor: 100 baris data, 50 valid + 50 tidak valid (untuk uji UI).
 * Output: public/sample-impor-alumni-100-50-error.xlsx
 *
 * Jalankan: node scripts/generate-sample-impor-alumni-xlsx.cjs
 */
const ExcelJS = require("exceljs");
const path = require("path");

const outFile = path.join(
  __dirname,
  "..",
  "public",
  "sample-impor-alumni-100-50-error.xlsx",
);

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
const TOTAL = 100;
const VALID_COUNT = 50;

const edge = { style: "thin", color: { argb: "FFBEBEBE" } };

function setBorder(cell) {
  cell.border = { top: edge, left: edge, bottom: edge, right: edge };
}

/** NIK 16 digit unik */
function validNik(i) {
  const tail = String(i).padStart(12, "0");
  return `3601${tail}`;
}

function validRow(i) {
  const n = i + 1;
  return [
    n,
    `Peserta Valid ${n}`,
    validNik(n),
    n % 2 === 0 ? "L" : "P",
    `valid${n}@contoh.test`,
    "Jakarta",
    "15 mei 1995",
    `Jl. Contoh No. ${n}`,
    `0812345${String(100000 + n).slice(-6)}`,
    "SMA",
  ];
}

/** 50 baris error: bermacam jenis kesalahan */
function invalidRow(i) {
  const n = i + 1;
  const group = i - VALID_COUNT; // 0..49

  if (group < 10) {
    return [
      n,
      `Peserta Error ${n}`,
      validNik(n),
      "L",
      "bukan-email", // email invalid
      "Bandung",
      "10 juni 1996",
      "Jl. Error",
      "081234567890",
      "SMA",
    ];
  }
  if (group < 20) {
    return [
      n,
      `Peserta Error ${n}`,
      validNik(n),
      "X", // jenis kelamin invalid
      `err${n}@contoh.test`,
      "Bandung",
      "10 juni 1996",
      "Jl. Error",
      "081234567890",
      "SMA",
    ];
  }
  if (group < 30) {
    return [
      n,
      `Peserta Error ${n}`,
      "12345678901234", // NIK 14 digit
      "P",
      `err${n}@contoh.test`,
      "Bandung",
      "10 juni 1996",
      "Jl. Error",
      "081234567890",
      "SMA",
    ];
  }
  if (group < 40) {
    return [
      n,
      `Peserta Error ${n}`,
      validNik(n),
      "L",
      `err${n}@contoh.test`,
      "Bandung",
      "10 juni 1996",
      "Jl. Error",
      "12345", // HP terlalu pendek
      "SMA",
    ];
  }
  return [
    n,
    `Peserta Error ${n}`,
    validNik(n),
    "P",
    `err${n}@contoh.test`,
    "Bandung",
    "bukan-tanggal", // tanggal tidak valid
    "Jl. Error",
    "081234567890",
    "SMA",
  ];
}

async function main() {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Sheet1", {
    properties: { defaultRowHeight: 18 },
    views: [{ showGridLines: true }],
  });

  const hintRow = ws.addRow([
    "[SAMPLE] 50 baris valid lalu 50 baris error — untuk uji impor. Data pelatihan diisi di form website.",
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

  for (let i = 0; i < TOTAL; i++) {
    const cells = i < VALID_COUNT ? validRow(i) : invalidRow(i);
    const dataRow = ws.addRow(cells);
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

  await wb.xlsx.writeFile(outFile);
  console.log("OK:", outFile);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
