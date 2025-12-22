const ExcelJS = require("exceljs");

async function inspectContent() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/Laporan IPK.xlsx");

  workbook.eachSheet((worksheet, sheetId) => {
    console.log(`\n--- Sheet: ${worksheet.name} ---`);

    // Read rows 7 to 30 (assuming data is there)
    // Adjust based on previous knowledge that data starts around row 7
    const rows = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber >= 7 && rowNumber <= 50) {
        // Capture first few columns to identify labels
        const rowValues = [];
        row.eachCell((cell, colNumber) => {
          if (colNumber <= 3) {
            // Just get first 3 columns for labels
            rowValues.push(`[${colNumber}]: ${cell.value}`);
          }
        });
        if (rowValues.length > 0) {
          console.log(`Row ${rowNumber}: ${rowValues.join(", ")}`);
        }
      }
    });
  });
}

inspectContent();
