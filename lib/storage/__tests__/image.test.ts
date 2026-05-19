import { describe, expect, it } from "vitest";
import { sanitizeImageSrc, shouldUnoptimizeImageSrc } from "../image";

describe("shouldUnoptimizeImageSrc", () => {
  it("returns true for localhost API uploads", () => {
    expect(
      shouldUnoptimizeImageSrc(
        "http://localhost:4000/uploads/site-contents/a.jpg",
      ),
    ).toBe(true);
  });

  it("returns false for external CDN", () => {
    expect(shouldUnoptimizeImageSrc("https://cdn.example.com/a.jpg")).toBe(
      false,
    );
  });
});

describe("sanitizeImageSrc", () => {
  it("keeps valid https URLs", () => {
    const url = "http://localhost:4000/uploads/x.jpg";
    expect(sanitizeImageSrc(url, "fallback")).toBe(url);
  });

  it("returns fallback for relative paths without protocol", () => {
    expect(sanitizeImageSrc("site-contents/x.jpg", "fb")).toBe("fb");
  });
});
