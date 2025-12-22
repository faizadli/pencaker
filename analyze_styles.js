const ExcelJS = require("exceljs");

async function analyzeStyles() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/Laporan IPK.xlsx");

  const sheetName = "ipk3.1"; // Check this sheet first
  const worksheet = workbook.getWorksheet(sheetName);

  if (!worksheet) {
    console.log(`Sheet ${sheetName} not found!`);
    return;
  }

  console.log(`Analyzing sheet: ${sheetName}`);

  // Analyze Header Rows (e.g., rows 1-10)
  for (let r = 1; r <= 15; r++) {
    const row = worksheet.getRow(r);
    console.log(`\n--- Row ${r} ---`);
    row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      // Only print first few columns and any distinct ones to avoid spam
      if (colNumber > 15) return;

      const style = {
        font: cell.font,
        alignment: cell.alignment,
        border: cell.border,
        fill: cell.fill,
        value: cell.value,
        address: cell.address,
        isMerged: cell.isMerged,
        master: cell.master ? cell.master.address : null,
      };

      // Simplify output
      const fontStr = style.font
        ? `Bold:${style.font.bold}, Size:${style.font.size}, Name:${style.font.name}`
        : "No Font";
      const alignStr = style.alignment
        ? `H:${style.alignment.horizontal}, V:${style.alignment.vertical}, Wrap:${style.alignment.wrapText}`
        : "No Align";

      let borderStr = "No Border";
      if (style.border) {
        borderStr = Object.keys(style.border)
          .map((k) => `${k}:${style.border[k]?.style}`)
          .join(", ");
      }

      console.log(
        `Cell ${cell.address} (${JSON.stringify(cell.value)}): ${fontStr} | ${alignStr} | ${borderStr} | Merged:${style.isMerged}`,
      );
    });
  }
}

analyzeStyles();
