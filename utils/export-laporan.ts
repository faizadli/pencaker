import * as ExcelJS from "exceljs";
import { getSheetTitle, getLabelHeader } from "../components/laporan/helpers";
import { ipk37Data } from "../components/laporan/real-data";
import {
  GenericRow,
  IPK3_8Row,
  InitialData,
} from "../components/laporan/types";

// Helper styles
const thinBorder: Partial<ExcelJS.Borders> = {
  top: { style: "thin" },
  left: { style: "thin" },
  bottom: { style: "thin" },
  right: { style: "thin" },
};

// Helper to apply borders to a range
const applyBorderToRange = (
  ws: ExcelJS.Worksheet,
  startRow: number,
  startCol: number,
  endRow: number,
  endCol: number,
  border: Partial<ExcelJS.Borders>,
) => {
  for (let r = startRow; r <= endRow; r++) {
    for (let c = startCol; c <= endCol; c++) {
      ws.getCell(r, c).border = border;
    }
  }
};

export const exportIPK3_1 = (
  worksheet: ExcelJS.Worksheet,
  _defaultBorder: Partial<ExcelJS.Borders>,
  center: Partial<ExcelJS.Alignment>,
  left: Partial<ExcelJS.Alignment>,
  headerDateString: string,
  data?: InitialData,
) => {
  // 1. Title Row (Row 1)
  worksheet.mergeCells("A1:N1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = getSheetTitle("ipk3.1");
  titleCell.alignment = center;
  titleCell.font = { bold: true, size: 14, name: "Calibri" };

  // 2. Date Row (Row 2)
  worksheet.mergeCells("A2:N2");
  const dateCell = worksheet.getCell("A2");
  dateCell.value = headerDateString;
  dateCell.alignment = center;
  dateCell.font = { bold: true, size: 11, name: "Calibri" };

  // 4. Headers (Rows 4-6) - I. PENCARI KERJA

  worksheet.mergeCells("A4:A6");
  const cellA4 = worksheet.getCell("A4");
  cellA4.value = "I. PENCARI KERJA";
  cellA4.alignment = center;
  cellA4.font = { bold: true, name: "Calibri", size: 11 };

  worksheet.mergeCells("B4:K4");
  const cellB4 = worksheet.getCell("B4");
  cellB4.value = "KELOMPOK UMUR";
  cellB4.alignment = center;
  cellB4.font = { bold: true, name: "Calibri", size: 11 };

  worksheet.mergeCells("L4:N5");
  const cellL4 = worksheet.getCell("L4");
  cellL4.value = "JUMLAH";
  cellL4.alignment = center;
  cellL4.font = { bold: true, name: "Calibri", size: 11 };

  // Sub-headers
  worksheet.mergeCells("B5:C5");
  worksheet.getCell("B5").value = "15-19";
  worksheet.mergeCells("D5:E5");
  worksheet.getCell("D5").value = "20-29";
  worksheet.mergeCells("F5:G5");
  worksheet.getCell("F5").value = "30-44";
  worksheet.mergeCells("H5:I5");
  worksheet.getCell("H5").value = "45-54";
  worksheet.mergeCells("J5:K5");
  worksheet.getCell("J5").value = "55+";

  ["B5", "D5", "F5", "H5", "J5"].forEach((ref) => {
    const cell = worksheet.getCell(ref);
    cell.alignment = center;
    cell.font = { bold: true, name: "Calibri", size: 11 };
  });

  const row6Values = [
    "",
    "L",
    "P",
    "L",
    "P",
    "L",
    "P",
    "L",
    "P",
    "L",
    "P",
    "L",
    "P",
    "L+P",
  ];
  const row6 = worksheet.getRow(6);
  row6Values.forEach((val, idx) => {
    if (idx === 0) return;
    const cell = row6.getCell(idx + 1);
    cell.value = val;
    cell.alignment = center;
    cell.font = { bold: true, name: "Calibri", size: 11 };
  });

  // Apply thin borders to header region (Row 4-6, Col A-N)
  applyBorderToRange(worksheet, 4, 1, 6, 14, thinBorder);

  // 5. Data - PENCARI KERJA
  let currentRowIdx = 7;
  const pencakerRows = data?.pencariKerja || [];
  pencakerRows.forEach((row) => {
    const rowData = [row.label, ...row.data];
    const wsRow = worksheet.getRow(currentRowIdx);

    rowData.forEach((val, colIdx) => {
      const cell = wsRow.getCell(colIdx + 1);
      cell.value = val;
      cell.border = thinBorder;
      cell.font = { name: "Calibri", size: 11 };
      if (colIdx === 0) {
        cell.alignment = left;
      } else {
        cell.alignment = center;
      }
      if (row.bold) {
        cell.font = { bold: true, name: "Calibri", size: 11 };
      }
    });
    currentRowIdx++;
  });

  // 6. Section II Header - II. LOWONGAN
  // NOTE: Based on user feedback, no grid lines for empty cells (F-N)
  const section2HeaderRow = worksheet.getRow(currentRowIdx);

  const cellII = section2HeaderRow.getCell(1);
  cellII.value = "II. LOWONGAN";
  cellII.alignment = center;
  cellII.font = { bold: true, name: "Calibri", size: 11 };
  cellII.border = thinBorder;

  const cellL = section2HeaderRow.getCell(2);
  cellL.value = "L";
  cellL.alignment = center;
  cellL.font = { bold: true, name: "Calibri", size: 11 };
  cellL.border = thinBorder;

  const cellW = section2HeaderRow.getCell(3);
  cellW.value = "P";
  cellW.alignment = center;
  cellW.font = { bold: true, name: "Calibri", size: 11 };
  cellW.border = thinBorder;

  // MERGE D:E for L+W
  worksheet.mergeCells(currentRowIdx, 4, currentRowIdx, 5);
  const cellLW = section2HeaderRow.getCell(4);
  cellLW.value = "L+P";
  cellLW.alignment = center;
  cellLW.font = { bold: true, name: "Calibri", size: 11 };
  cellLW.border = thinBorder;

  // Clear F-N borders explicitly
  for (let c = 6; c <= 14; c++) {
    const cell = section2HeaderRow.getCell(c);
    cell.value = null;
    cell.border = {};
  }
  currentRowIdx++;

  // 7. Section II Numbering
  const numberingRow = worksheet.getRow(currentRowIdx);

  // Col 1
  numberingRow.getCell(1).value = 1;
  numberingRow.getCell(1).alignment = center;
  numberingRow.getCell(1).border = thinBorder;
  numberingRow.getCell(1).font = { name: "Calibri", size: 8 };

  // Col 2
  numberingRow.getCell(2).value = 2;
  numberingRow.getCell(2).alignment = center;
  numberingRow.getCell(2).border = thinBorder;
  numberingRow.getCell(2).font = { name: "Calibri", size: 8 };

  // Col 3
  numberingRow.getCell(3).value = 3;
  numberingRow.getCell(3).alignment = center;
  numberingRow.getCell(3).border = thinBorder;
  numberingRow.getCell(3).font = { name: "Calibri", size: 8 };

  // Col 4-5 (Merged)
  worksheet.mergeCells(currentRowIdx, 4, currentRowIdx, 5);
  numberingRow.getCell(4).value = 4;
  numberingRow.getCell(4).alignment = center;
  numberingRow.getCell(4).border = thinBorder;
  numberingRow.getCell(4).font = { name: "Calibri", size: 8 };

  // Clear F-N borders
  for (let c = 6; c <= 14; c++) {
    const cell = numberingRow.getCell(c);
    cell.value = null;
    cell.border = {};
  }
  currentRowIdx++;

  // 8. Section II Data
  const lowonganRows = data?.lowongan || [];
  lowonganRows.forEach((row) => {
    const wsRow = worksheet.getRow(currentRowIdx);
    const cellLabel = wsRow.getCell(1);
    cellLabel.value = row.label;
    cellLabel.alignment = left;
    cellLabel.border = thinBorder;
    cellLabel.font = { name: "Calibri", size: 11 };
    if (row.bold) cellLabel.font = { bold: true, name: "Calibri", size: 11 };

    const cellL = wsRow.getCell(2);
    cellL.value = row.l;
    cellL.alignment = center;
    cellL.border = thinBorder;
    cellL.font = { name: "Calibri", size: 11 };
    if (row.bold) cellL.font = { bold: true, name: "Calibri", size: 11 };

    const cellW = wsRow.getCell(3);
    cellW.value = row.w;
    cellW.alignment = center;
    cellW.border = thinBorder;
    cellW.font = { name: "Calibri", size: 11 };
    if (row.bold) cellW.font = { bold: true, name: "Calibri", size: 11 };

    // MERGE D:E for Data
    worksheet.mergeCells(currentRowIdx, 4, currentRowIdx, 5);
    const cellLW = wsRow.getCell(4);
    cellLW.value = row.lw;
    cellLW.alignment = center;
    cellLW.border = thinBorder;
    cellLW.font = { name: "Calibri", size: 11 };
    if (row.bold) cellLW.font = { bold: true, name: "Calibri", size: 11 };

    // Clear F-N borders
    for (let c = 6; c <= 14; c++) {
      const cell = wsRow.getCell(c);
      cell.value = null;
      cell.border = {};
    }
    currentRowIdx++;
  });

  worksheet.getColumn(1).width = 40;
  for (let i = 2; i <= 14; i++) {
    worksheet.getColumn(i).width = 5;
  }
};

export const exportGeneric12Col = (
  worksheet: ExcelJS.Worksheet,
  _defaultBorder: Partial<ExcelJS.Borders>,
  center: Partial<ExcelJS.Alignment>,
  left: Partial<ExcelJS.Alignment>,
  tabId: string,
  headerDateString: string,
  providedData?: GenericRow[],
) => {
  // Use thinBorder as default, ignoring passed defaultBorder for precision
  const defaultBorder = thinBorder;

  let data: GenericRow[] = providedData || [];
  if (data.length === 0) {
    data = [];
  }

  worksheet.mergeCells("A1:M1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = getSheetTitle(tabId);
  titleCell.alignment = center;
  titleCell.font = { bold: true, size: 14, name: "Calibri" };

  worksheet.mergeCells("A2:M2");
  const dateCell = worksheet.getCell("A2");
  dateCell.value = headerDateString;
  dateCell.alignment = center;
  dateCell.font = { bold: true, size: 11, name: "Calibri" };

  const setBorder = (r: number, c: number) => {
    worksheet.getCell(r, c).border = defaultBorder;
  };

  worksheet.mergeCells("A4:A6");
  worksheet.getCell("A4").value = "KODE";
  worksheet.mergeCells("B4:B6");
  worksheet.getCell("B4").value = getLabelHeader(tabId);

  const pairs = [
    { label: "SISA AKHIR BULAN LALU", colStart: 3 },
    { label: "PENDAFTARAN BULAN INI", colStart: 5 },
    { label: "PENEMPATAN BULAN INI", colStart: 7 },
    { label: "PENGHAPUSAN BULAN INI", colStart: 9 },
    { label: "SISA AKHIR BULAN INI", colStart: 11 },
  ];

  pairs.forEach((p) => {
    worksheet.mergeCells(4, p.colStart, 5, p.colStart + 1);
    const cell = worksheet.getCell(4, p.colStart);
    cell.value = p.label;
    worksheet.getCell(6, p.colStart).value = "L";
    worksheet.getCell(6, p.colStart + 1).value = "P";
  });

  for (let r = 4; r <= 6; r++) {
    for (let c = 1; c <= 12; c++) {
      setBorder(r, c);
      const cell = worksheet.getCell(r, c);
      cell.alignment = center;
      cell.font = { bold: true, size: 11, name: "Calibri" };
    }
  }

  let currentRow = 7;
  data.forEach((row) => {
    const isHeader =
      row.isHeader || row.code.length === 1 || row.code.endsWith("000");
    const isJumlah = row.code === "JUMLAH";

    worksheet.getCell(currentRow, 1).value = row.code;
    worksheet.getCell(currentRow, 2).value = row.label;

    if (isHeader) {
      // Bold Code and Label
      worksheet.getCell(currentRow, 1).font = {
        bold: true,
        size: 11,
        name: "Calibri",
      };
      worksheet.getCell(currentRow, 2).font = {
        bold: true,
        size: 11,
        name: "Calibri",
      };

      // Merge data columns (3-12)
      worksheet.mergeCells(currentRow, 3, currentRow, 12);
      const mergedCell = worksheet.getCell(currentRow, 3);
      mergedCell.value = "";
      mergedCell.border = defaultBorder;

      // Apply borders to A and B
      worksheet.getCell(currentRow, 1).border = defaultBorder;
      worksheet.getCell(currentRow, 2).border = defaultBorder;

      // Alignment
      worksheet.getCell(currentRow, 1).alignment = center;
      worksheet.getCell(currentRow, 2).alignment = left;

      // Apply borders to the rest of the merged area to ensure it looks right
      // (ExcelJS mergeCells usually handles this but explicit borders on the range helps)
      applyBorderToRange(
        worksheet,
        currentRow,
        1,
        currentRow,
        12,
        defaultBorder,
      );
    } else {
      // Normal Row
      worksheet.getCell(currentRow, 3).value = row.lastMonth.l;
      worksheet.getCell(currentRow, 4).value = row.lastMonth.w;
      worksheet.getCell(currentRow, 5).value = row.registered.l;
      worksheet.getCell(currentRow, 6).value = row.registered.w;
      worksheet.getCell(currentRow, 7).value = row.placed.l;
      worksheet.getCell(currentRow, 8).value = row.placed.w;
      worksheet.getCell(currentRow, 9).value = row.removed.l;
      worksheet.getCell(currentRow, 10).value = row.removed.w;
      worksheet.getCell(currentRow, 11).value = row.thisMonth.l;
      worksheet.getCell(currentRow, 12).value = row.thisMonth.w;

      if (isJumlah) {
        worksheet.mergeCells(currentRow, 1, currentRow, 2);
        worksheet.getCell(currentRow, 1).value = "JUMLAH";
      }

      for (let c = 1; c <= 12; c++) {
        setBorder(currentRow, c);
        const cell = worksheet.getCell(currentRow, c);
        cell.font = { size: 11, name: "Calibri" };
        if (c === 2 && !isJumlah) cell.alignment = left;
        else cell.alignment = center;

        // Bold if isJumlah
        if (isJumlah) {
          cell.font = { bold: true, size: 11, name: "Calibri" };
        }
      }
    }
    currentRow++;
  });

  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 40;
  for (let i = 3; i <= 12; i++) worksheet.getColumn(i).width = 8;
};

export const exportIPK3_7 = (
  worksheet: ExcelJS.Worksheet,
  _defaultBorder: Partial<ExcelJS.Borders>,
  center: Partial<ExcelJS.Alignment>,
  left: Partial<ExcelJS.Alignment>,
  headerDateString: string,
) => {
  const defaultBorder = thinBorder;

  worksheet.mergeCells("A1:Q1");
  const titleCell = worksheet.getCell("A1");
  titleCell.value = getSheetTitle("ipk3.7");
  titleCell.alignment = center;
  titleCell.font = { bold: true, size: 14, name: "Calibri" };

  worksheet.mergeCells("A2:Q2");
  const dateCell = worksheet.getCell("A2");
  dateCell.value = headerDateString;
  dateCell.alignment = center;
  dateCell.font = { bold: true, size: 11, name: "Calibri" };

  const setBorder = (r: number, c: number) => {
    worksheet.getCell(r, c).border = defaultBorder;
  };

  worksheet.mergeCells("A4:A6");
  worksheet.getCell("A4").value = "KODE";
  worksheet.mergeCells("B4:B6");
  worksheet.getCell("B4").value = "GOLONGAN POKOK LAPANGAN USAHA";

  const groups = [
    { label: "SISA AKHIR BULAN LALU", colStart: 3 },
    { label: "PENDAFTARAN BULAN INI", colStart: 6 },
    { label: "PENEMPATAN BULAN INI", colStart: 9 },
    { label: "PENGHAPUSAN BULAN INI", colStart: 12 },
    { label: "SISA AKHIR BULAN INI", colStart: 15 },
  ];

  groups.forEach((g) => {
    worksheet.mergeCells(4, g.colStart, 5, g.colStart + 2);
    const cell = worksheet.getCell(4, g.colStart);
    cell.value = g.label;
    worksheet.getCell(6, g.colStart).value = "(0-2)";
    worksheet.getCell(6, g.colStart + 1).value = "(3-5)";
    worksheet.getCell(6, g.colStart + 2).value = "(6+)";
  });

  for (let r = 4; r <= 6; r++) {
    for (let c = 1; c <= 17; c++) {
      setBorder(r, c);
      const cell = worksheet.getCell(r, c);
      cell.alignment = center;
      cell.font = { bold: true, size: 11, name: "Calibri" };
    }
  }

  let currentRow = 7;
  ipk37Data.forEach((row) => {
    worksheet.getCell(currentRow, 1).value = row.code;
    worksheet.getCell(currentRow, 2).value = row.label;

    const fillGroup = (
      startCol: number,
      data: { d1: number; d2: number; d3: number },
    ) => {
      worksheet.getCell(currentRow, startCol).value = data.d1;
      worksheet.getCell(currentRow, startCol + 1).value = data.d2;
      worksheet.getCell(currentRow, startCol + 2).value = data.d3;
    };

    fillGroup(3, row.sisaLalu);
    fillGroup(6, row.pendaftaran);
    fillGroup(9, row.penempatan);
    fillGroup(12, row.penghapusan);
    fillGroup(15, row.sisaIni);

    for (let c = 1; c <= 17; c++) {
      setBorder(currentRow, c);
      const cell = worksheet.getCell(currentRow, c);
      cell.font = { size: 11, name: "Calibri" };
      if (c === 2) cell.alignment = left;
      else cell.alignment = center;

      // Bold totals (SISA AKHIR BULAN INI)
      if (c >= 15) {
        cell.font = { bold: true, size: 11, name: "Calibri" };
      }
    }
    currentRow++;
  });

  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 40;
  for (let i = 3; i <= 17; i++) worksheet.getColumn(i).width = 8;
};

export const exportIPK3_8 = (
  worksheet: ExcelJS.Worksheet,
  _defaultBorder: Partial<ExcelJS.Borders>,
  center: Partial<ExcelJS.Alignment>,
  left: Partial<ExcelJS.Alignment>,
  headerDateString: string,
  data?: IPK3_8Row[],
) => {
  const defaultBorder = thinBorder;
  const tableData = data || [];

  worksheet.mergeCells("A1:N1");
  worksheet.getCell("A1").value = getSheetTitle("ipk3.8");
  worksheet.getCell("A1").alignment = center;
  worksheet.getCell("A1").font = { bold: true, size: 14, name: "Calibri" };

  worksheet.mergeCells("A2:N2");
  worksheet.getCell("A2").value = headerDateString;
  worksheet.getCell("A2").alignment = center;
  worksheet.getCell("A2").font = { bold: true, size: 11, name: "Calibri" };

  const setBorder = (r: number, c: number) => {
    worksheet.getCell(r, c).border = defaultBorder;
  };

  worksheet.mergeCells("A4:A6");
  worksheet.getCell("A4").value = "KODE";
  worksheet.mergeCells("B4:B6");
  worksheet.getCell("B4").value = "TINGKAT PENDIDIKAN";

  const groups = [
    { label: "ANTAR KERJA LOKAL (AKL)", colStart: 3 },
    { label: "ANTAR KERJA ANTAR DAERAH (AKAD)", colStart: 6 },
    { label: "ANTAR KERJA ANTAR NEGARA (AKAN)", colStart: 9 },
    { label: "JUMLAH", colStart: 12 },
  ];

  groups.forEach((g) => {
    worksheet.mergeCells(4, g.colStart, 5, g.colStart + 2);
    worksheet.getCell(4, g.colStart).value = g.label;
    worksheet.getCell(6, g.colStart).value = "L";
    worksheet.getCell(6, g.colStart + 1).value = "P";
    worksheet.getCell(6, g.colStart + 2).value = "JML";
  });

  for (let r = 4; r <= 6; r++) {
    for (let c = 1; c <= 14; c++) {
      setBorder(r, c);
      const cell = worksheet.getCell(r, c);
      cell.alignment = center;
      cell.font = { bold: true, size: 11, name: "Calibri" };
    }
  }

  let currentRow = 7;
  tableData.forEach((row) => {
    worksheet.getCell(currentRow, 1).value = row.code;
    worksheet.getCell(currentRow, 2).value = row.education;
    // AKL
    worksheet.getCell(currentRow, 3).value = row.akl.l;
    worksheet.getCell(currentRow, 4).value = row.akl.p;
    worksheet.getCell(currentRow, 5).value = row.akl.l + row.akl.p;
    // AKAD
    worksheet.getCell(currentRow, 6).value = row.akad.l;
    worksheet.getCell(currentRow, 7).value = row.akad.p;
    worksheet.getCell(currentRow, 8).value = row.akad.l + row.akad.p;
    // AKAN
    worksheet.getCell(currentRow, 9).value = row.akan.l;
    worksheet.getCell(currentRow, 10).value = row.akan.p;
    worksheet.getCell(currentRow, 11).value = row.akan.l + row.akan.p;
    // Total
    const totalL = row.akl.l + row.akad.l + row.akan.l;
    const totalP = row.akl.p + row.akad.p + row.akan.p;
    worksheet.getCell(currentRow, 12).value = totalL;
    worksheet.getCell(currentRow, 13).value = totalP;
    worksheet.getCell(currentRow, 14).value = totalL + totalP;

    for (let c = 1; c <= 14; c++) {
      setBorder(currentRow, c);
      const cell = worksheet.getCell(currentRow, c);
      cell.font = { size: 11, name: "Calibri" };
      if (c === 2) cell.alignment = left;
      else cell.alignment = center;

      // Bold totals (JUMLAH)
      if (c >= 12) {
        cell.font = { bold: true, size: 11, name: "Calibri" };
      }
    }
    currentRow++;
  });

  worksheet.getColumn(1).width = 10;
  worksheet.getColumn(2).width = 40;
  for (let i = 3; i <= 14; i++) worksheet.getColumn(i).width = 8;
};
