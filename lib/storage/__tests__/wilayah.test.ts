import { describe, expect, it } from "vitest";
import {
  findDistrictByName,
  normalizeWilayahName,
} from "../../../services/wilayah";

const districts = [
  { id: "6401040", name: "TANAH GROGOT" },
  { id: "6401050", name: "KUARO" },
];

describe("findDistrictByName", () => {
  it("matches case-insensitively", () => {
    expect(findDistrictByName(districts, "tanah grogot")?.id).toBe("6401040");
    expect(findDistrictByName(districts, "Kuaro")?.id).toBe("6401050");
  });

  it("returns undefined for unknown kecamatan", () => {
    expect(findDistrictByName(districts, "Jakarta")).toBeUndefined();
  });
});

describe("normalizeWilayahName", () => {
  it("trims and uppercases", () => {
    expect(normalizeWilayahName("  tanah  grogot ")).toBe("TANAH GROGOT");
  });
});
