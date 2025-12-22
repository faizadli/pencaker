const fs = require("fs");
const path = require("path");

const realDataPath = path.join(
  __dirname,
  "components",
  "laporan",
  "real-data.ts",
);
const mockDataPath = path.join(
  __dirname,
  "components",
  "laporan",
  "mock-data.ts",
);

const realDataContent = fs.readFileSync(realDataPath, "utf8");

const aliases = `
// Aliases for backward compatibility
export const genericDataMock = ipk32Data;
export const ipk37DataMock = ipk37Data;
export const ipk38DataMock = ipk38Data;
`;

fs.writeFileSync(mockDataPath, realDataContent + aliases);
console.log("Updated mock-data.ts with real data and aliases.");
