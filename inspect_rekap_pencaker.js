const XLSX = require("xlsx");
const path = require("path");

function cellVal(ws, r, c) {
  const ref = XLSX.utils.encode_cell({ r: r - 1, c: c - 1 });
  const cell = ws[ref];
  return cell ? cell.v : null;
}

function printRow(ws, r, maxC) {
  const vals = [];
  for (let c = 1; c <= maxC; c++) {
    const v = cellVal(ws, r, c);
    if (v !== null && v !== undefined && v !== "") {
      vals.push(`[${c}] ${v}`);
    }
  }
  if (vals.length > 0) {
    console.log(`Row ${r}: ${vals.join(", ")}`);
  }
}

function inspectRekap() {
  const file = path.resolve(
    "c:\\coding\\adikara\\pencaker\\public\\Rekap data Pencaker Bulan Januari.xls",
  );
  console.log("Reading:", file);
  const wb = XLSX.readFile(file);
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  console.log("Sheet Name:", sheetName);
  console.log("Dimension (!ref):", ws["!ref"]);

  // Column widths if present
  if (ws["!cols"]) {
    const cols = ws["!cols"].map((c, idx) => {
      const w = c.wpx || c.wch || null;
      return `Col ${idx + 1}: ${w !== null ? w : "n/a"}`;
    });
    console.log("Column widths (!cols):", cols.join(" | "));
  } else {
    console.log("No !cols metadata for column widths.");
  }

  // Merged cells
  if (ws["!merges"] && ws["!merges"].length > 0) {
    console.log("Merges (!merges):");
    ws["!merges"].forEach((m, idx) => {
      const start = XLSX.utils.encode_cell(m.s);
      const end = XLSX.utils.encode_cell(m.e);
      console.log(`  #${idx + 1}: ${start} -> ${end}`);
    });
  } else {
    console.log("No merges found.");
  }

  // Scan first 60 rows, first 20 cols
  console.log("\nSampling rows (1..60), cols (1..20):");
  for (let r = 1; r <= 60; r++) {
    printRow(ws, r, 20);
  }

  // Try to find header row by matching known headers
  const expectedHeaders = [
    "NO",
    "NOMOR PENDATARAN",
    "NAMA LENGKAP",
    "TEMPAT LAHIR",
    "TANGGAL LAHIR",
    "JENIS KELAMIN",
    "ALAMAT",
    "PENDIDIKAN",
    "JURUSAN",
    "TAHUN LULUS",
    "AGAMA",
    "NO. HP",
    "NIK",
    "STATUS",
  ];
  console.log("\nSearching for header row...");
  for (let r = 1; r <= 100; r++) {
    const rowVals = [];
    for (let c = 1; c <= 20; c++) {
      let v = cellVal(ws, r, c);
      if (typeof v === "string") v = v.trim();
      rowVals.push(v || "");
    }
    const containsAll = expectedHeaders.every((h) => rowVals.includes(h));
    if (containsAll) {
      console.log("Header row likely at:", r);
      console.log(
        "Row values:",
        rowVals.map((v, i) => `[${i + 1}] ${v}`).join(", "),
      );
      break;
    }
  }
}

inspectRekap();
