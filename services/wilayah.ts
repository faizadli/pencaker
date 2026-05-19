import { PASER_DISTRICTS } from "./paser-wilayah-data";

export type WilayahItem = { id: string; name: string };
const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
export function normalizeWilayahName(name: string): string {
  return String(name || "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

/** Match kecamatan from DB to district list (case/spacing tolerant). */
export function findDistrictByName(
  districts: WilayahItem[],
  kecamatan: string,
): WilayahItem | undefined {
  const target = normalizeWilayahName(kecamatan);
  if (!target) return undefined;
  return districts.find((d) => normalizeWilayahName(d.name) === target);
}

export async function listDistricts(): Promise<WilayahItem[]> {
  try {
    const resp = await fetch(`${BASE}/api/public/wilayah/districts`, {
      cache: "no-store",
    });
    if (!resp.ok) throw new Error("bad status");
    const rows = (await resp.json()) as Array<{
      id: string | number;
      regency_id?: string | number;
      name: string;
    }>;
    return rows.map((r) => ({ id: String(r.id), name: String(r.name) }));
  } catch {
    return PASER_DISTRICTS;
  }
}

export async function listVillages(districtId: string): Promise<WilayahItem[]> {
  if (!districtId) return [];
  try {
    const resp = await fetch(
      `${BASE}/api/public/wilayah/villages/${encodeURIComponent(districtId)}`,
      { cache: "no-store" },
    );
    if (!resp.ok) throw new Error("bad status");
    const rows = (await resp.json()) as Array<{
      id: string | number;
      district_id?: string | number;
      name: string;
    }>;
    return rows.map((r) => ({ id: String(r.id), name: String(r.name) }));
  } catch {
    return [];
  }
}
