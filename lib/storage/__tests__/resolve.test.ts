import { beforeEach, describe, expect, it, vi } from "vitest";
import { resolveStorageUrl } from "../resolve";

vi.mock("../../../services/ak1", () => ({
  presignDownload: vi.fn(),
}));

import { presignDownload } from "../../../services/ak1";

const mockedPresign = vi.mocked(presignDownload);

beforeEach(() => {
  vi.clearAllMocks();
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:4000";
});

describe("resolveStorageUrl", () => {
  it("returns empty for blank ref", async () => {
    expect(await resolveStorageUrl("")).toBe("");
  });

  it("uses presign for storage keys", async () => {
    mockedPresign.mockResolvedValue({
      url: "https://signed.example/ak1/x.jpg?X-Amz-Signature=abc",
      key: "ak1/x/ktp.jpg",
    });
    const url = await resolveStorageUrl("ak1/x/ktp.jpg");
    expect(mockedPresign).toHaveBeenCalledWith("ak1/x/ktp.jpg");
    expect(url).toContain("X-Amz-Signature");
  });

  it("falls back to public /uploads URL when presign fails", async () => {
    mockedPresign.mockRejectedValue(new Error("offline"));
    const url = await resolveStorageUrl("site-contents/news/a.jpg");
    expect(url).toBe("http://localhost:4000/uploads/site-contents/news/a.jpg");
  });
});
