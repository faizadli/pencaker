import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  getApiBaseUrl,
  resolveImageSrc,
  rewriteContentHtml,
  storagePublicUrl,
} from "../urls";

const ORIGINAL = process.env.NEXT_PUBLIC_API_BASE_URL;

beforeEach(() => {
  process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:4000";
});

afterEach(() => {
  if (ORIGINAL === undefined) {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  } else {
    process.env.NEXT_PUBLIC_API_BASE_URL = ORIGINAL;
  }
});

describe("storagePublicUrl", () => {
  it("builds /uploads URL from key", () => {
    expect(storagePublicUrl("site-contents/news/a.jpg")).toBe(
      "http://localhost:4000/uploads/site-contents/news/a.jpg",
    );
  });

  it("passes through absolute URLs", () => {
    const url = "https://cdn.example.com/x.png";
    expect(storagePublicUrl(url)).toBe(url);
  });
});

describe("resolveImageSrc", () => {
  it("returns fallback for empty ref", () => {
    expect(resolveImageSrc(null, "/placeholder.png")).toBe("/placeholder.png");
  });

  it("does not prefix absolute paths with /informasi", () => {
    const resolved = resolveImageSrc("site-contents/news/a.jpg", "");
    expect(resolved).toBe(
      "http://localhost:4000/uploads/site-contents/news/a.jpg",
    );
    expect(resolved).not.toContain("/informasi/");
  });
});

describe("rewriteContentHtml", () => {
  it("rewrites img src in article body", () => {
    const html = '<img src="site-contents/news/a.jpg" alt="">';
    const out = rewriteContentHtml(html);
    expect(out).toContain(
      "http://localhost:4000/uploads/site-contents/news/a.jpg",
    );
  });
});

describe("getApiBaseUrl", () => {
  it("strips trailing slash", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "http://localhost:4000/";
    expect(getApiBaseUrl()).toBe("http://localhost:4000");
  });
});
