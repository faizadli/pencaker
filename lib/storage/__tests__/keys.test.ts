import { describe, expect, it } from "vitest";
import { normalizeStorageKey, storageKeyFromPresign } from "../keys";

describe("normalizeStorageKey", () => {
  it("keeps bare storage keys", () => {
    expect(normalizeStorageKey("site-contents/news/a.jpg")).toBe(
      "site-contents/news/a.jpg",
    );
  });

  it("strips /uploads/ prefix", () => {
    expect(normalizeStorageKey("/uploads/ak1/x/ktp.jpg")).toBe("ak1/x/ktp.jpg");
  });

  it("parses S3 URL", () => {
    expect(
      normalizeStorageKey(
        "https://pencaker.s3.ap-southeast-2.amazonaws.com/candidate/a.png",
      ),
    ).toBe("candidate/a.png");
  });

  it("parses API local URL", () => {
    expect(
      normalizeStorageKey("http://localhost:4000/uploads/site-contents/x.jpg"),
    ).toBe("site-contents/x.jpg");
  });
});

describe("storageKeyFromPresign", () => {
  it("prefers key field", () => {
    expect(
      storageKeyFromPresign({
        key: "ak1/u/photo.jpg",
        public_url: "https://ignored",
      }),
    ).toBe("ak1/u/photo.jpg");
  });

  it("falls back to public_url", () => {
    expect(
      storageKeyFromPresign({
        public_url:
          "https://pencaker.s3.ap-southeast-2.amazonaws.com/ak1/u/photo.jpg",
      }),
    ).toBe("ak1/u/photo.jpg");
  });
});
