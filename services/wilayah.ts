export type WilayahItem = { id: string; name: string };

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
    const resp = await fetch("https://emsifa.github.io/api-wilayah-indonesia/api/districts/6401.json", { cache: "no-store" });
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
    const resp = await fetch(`https://emsifa.github.io/api-wilayah-indonesia/api/villages/${encodeURIComponent(districtId)}.json`, { cache: "no-store" });
    if (!resp.ok) throw new Error("bad status");
    const rows = (await resp.json()) as Array<{ id: string | number; district_id?: string | number; name: string }>;
    return rows.map((r) => ({ id: String(r.id), name: String(r.name) }));
  } catch {
    return [];
  }
}
