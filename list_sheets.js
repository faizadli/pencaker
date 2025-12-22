const ExcelJS = require("exceljs");

async function listSheets() {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile("public/Laporan IPK.xlsx");

  workbook.eachSheet((sheet) => {
    console.log(sheet.name);
  });
}

listSheets();
