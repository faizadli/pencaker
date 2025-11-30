import { NextResponse } from "next/server";

type Item = { id: string; regency_id?: string; name: string };

const FALLBACK: Item[] = [
  { id: "6401010", regency_id: "6401", name: "BATU SOPANG" },
  { id: "6401011", regency_id: "6401", name: "MUARA SAMU" },
  { id: "6401021", regency_id: "6401", name: "BATU ENGAU" },
  { id: "6401022", regency_id: "6401", name: "TANJUNG HARAPAN" },
  { id: "6401030", regency_id: "6401", name: "PASIR BELENGKONG" },
  { id: "6401040", regency_id: "6401", name: "TANAH GROGOT" },
  { id: "6401050", regency_id: "6401", name: "KUARO" },
  { id: "6401060", regency_id: "6401", name: "LONG IKIS" },
  { id: "6401070", regency_id: "6401", name: "MUARA KOMAM" },
  { id: "6401080", regency_id: "6401", name: "LONG KALI" },
];

export async function GET() {
  try {
    const resp = await fetch("https://emsifa.github.io/api-wilayah-indonesia/api/districts/6401.json", { cache: "no-store" });
    if (!resp.ok) throw new Error("bad status");
    const data = (await resp.json()) as Item[];
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json(FALLBACK, { status: 200 });
  }
}