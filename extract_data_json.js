const ExcelJS = require("exceljs");
const fs = require("fs");

async function extractData() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/Laporan IPK.xlsx");

  const result = {};

  const sheetNames = [
    "ipk3.1",
    "ipk3.2",
    "ipk3.3",
    "ipk3.4",
    "ipk3.5",
    "ipk.3.6",
    "ipk.3.7",
    "ipk.3.8",
  ];

  sheetNames.forEach((name) => {
    const worksheet = workbook.getWorksheet(name);
    if (!worksheet) {
      console.log(`Sheet ${name} not found`);
      return;
    }

    const rows = [];
    let startRow = 7;
    if (name === "ipk3.8") startRow = 11; // Based on previous output

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber >= startRow && rowNumber <= 200) {
        // Limit to 200 rows
        const code = row.getCell(1).value;
        const label = row.getCell(2).value;

        // Basic validation to ensure it's a data row
        if (label && (typeof code === "string" || typeof code === "number")) {
          // For IPK 3.8, we have two sections.
          // But for now, let's just grab everything that looks like a row
          rows.push({
            code: code ? code.toString() : "",
            label: label.toString(),
          });
        }
      }
    });

    result[name] = rows;
  });

  fs.writeFileSync("extracted_data.json", JSON.stringify(result, null, 2));
  console.log("Data extracted to extracted_data.json");
}

extractData();
