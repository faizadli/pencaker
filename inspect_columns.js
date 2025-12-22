const ExcelJS = require("exceljs");
const path = require("path");

async function inspectColumns() {
  const workbook = new ExcelJS.Workbook();
  const filePath = path.join(__dirname, "public", "Laporan IPK.xlsx");
  await workbook.xlsx.readFile(filePath);

  const sheetNames = ["ipk3.1", "ipk.3.7", "ipk.3.8"];

  for (const name of sheetNames) {
    const sheet = workbook.getWorksheet(name);
    if (!sheet) {
      console.log(`Sheet ${name} not found`);
      continue;
    }
    console.log(`--- Sheet: ${name} ---`);
    if (name === "ipk3.1") {
      // Check Lowongan section (approx row 30)
      const row = sheet.getRow(32); // Adjust as needed
      const values = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        let val = cell.value;
        if (typeof val === "object" && val !== null) {
          if (val.result !== undefined) val = val.result;
          else if (val.richText) val = val.richText.map((r) => r.text).join("");
        }
        values.push(`[${colNumber}] ${val}`);
      });
      console.log("Row 32 (Lowongan?):", values.join(", "));
    } else {
      // Print row 12
      const row = sheet.getRow(12);
      const values = [];
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        let val = cell.value;
        if (typeof val === "object" && val !== null) {
          if (val.result !== undefined)
            val = val.result; // Formula result
          else if (val.richText) val = val.richText.map((r) => r.text).join("");
        }
        values.push(`[${colNumber}] ${val}`);
      });
      console.log(values.join(", "));
    }
  }
}

inspectColumns();
