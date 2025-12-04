export type WilayahItem = { id: string; name: string };
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const FALLBACK_DISTRICTS: WilayahItem[] = [
  { id: "6401010", name: "BATU SOPANG" },
  { id: "6401011", name: "MUARA SAMU" },
  { id: "6401021", name: "BATU ENGAU" },
  { id: "6401022", name: "TANJUNG HARAPAN" },
  { id: "6401030", name: "PASIR BELENGKONG" },
  { id: "6401040", name: "TANAH GROGOT" },
  { id: "6401050", name: "KUARO" },
  { id: "6401060", name: "LONG IKIS" },
  { id: "6401070", name: "MUARA KOMAM" },
  { id: "6401080", name: "LONG KALI" },
];

export async function listDistricts(): Promise<WilayahItem[]> {
  try {
    const resp = await fetch(`${BASE}/api/public/wilayah/districts`, { cache: "no-store" });
    if (!resp.ok) throw new Error("bad status");
    const rows = (await resp.json()) as Array<{ id: string | number; regency_id?: string | number; name: string }>;
    return rows.map((r) => ({ id: String(r.id), name: String(r.name) }));
  } catch {
    return FALLBACK_DISTRICTS;
  }
}

export async function listVillages(districtId: string): Promise<WilayahItem[]> {
  if (!districtId) return [];
  try {
    const resp = await fetch(`${BASE}/api/public/wilayah/villages/${encodeURIComponent(districtId)}`, { cache: "no-store" });
    if (!resp.ok) throw new Error("bad status");
    const rows = (await resp.json()) as Array<{ id: string | number; district_id?: string | number; name: string }>;
    return rows.map((r) => ({ id: String(r.id), name: String(r.name) }));
  } catch {
    return [];
  }
}
