const ExcelJS = require("exceljs");

async function inspectSheet() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(
    "c:\\Users\\LENOVO\\Documents\\pencaker\\pencaker\\public\\Laporan IPK.xlsx",
  );
  const sheet = workbook.getWorksheet("ipk.3.8");

  console.log("Sheet Name:", sheet.name);

  // Inspect a larger range of rows to find the second table
  sheet.eachRow((row, rowNumber) => {
    // Log rows that might be headers or titles (non-empty first few cells)
    const rowValues = [];
    row.eachCell((cell, colNumber) => {
      if (colNumber <= 5) {
        // Just check first few columns for structure
        rowValues.push(`[${colNumber}] ${cell.value}`);
      }
    });
    if (rowValues.length > 0) {
      console.log(`Row ${rowNumber}:`, rowValues.join(", "));
    }
  });
}

inspectSheet();
