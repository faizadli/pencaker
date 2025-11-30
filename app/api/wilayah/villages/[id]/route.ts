import { NextRequest, NextResponse } from "next/server";

type Item = { id: string | number; district_id?: string | number; name: string };

export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!id) return NextResponse.json([], { status: 200 });
  try {
    const resp = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/villages/${encodeURIComponent(id)}.json`, { cache: "no-store" });
    if (!resp.ok) throw new Error("bad status");
    const data = (await resp.json()) as Item[];
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}