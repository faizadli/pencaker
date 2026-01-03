import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) {
    return new NextResponse("Missing url", { status: 400 });
  }

  try {
    const res = await fetch(url, {
      cache: "no-store",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.error(
        `Proxy fetch failed: ${res.status} ${res.statusText} for url: ${url}`,
      );
      return new NextResponse(`Fetch failed: ${res.status}`, {
        status: res.status,
      });
    }

    const contentType = res.headers.get("content-type") || "image/jpeg";
    const blob = await res.blob();
    const buffer = await blob.arrayBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=3600",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    console.error("Proxy fetch error:", e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
