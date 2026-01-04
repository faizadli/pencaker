const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

function authHeader(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token") || "";
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getReportIPK31(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk31?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.1");
  return resp.json();
}

export async function getReportIPK32(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk32?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.2");
  return resp.json();
}

export async function getReportIPK35(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk35?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.5");
  return resp.json();
}

export async function getReportIPK33(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk33?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.3");
  return resp.json();
}

export async function getReportIPK34(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk34?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.4");
  return resp.json();
}

export async function getReportIPK36(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk36?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.6");
  return resp.json();
}

export async function getReportIPK37(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk37?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.7");
  return resp.json();
}

export async function getReportIPK38(startDate: string, endDate: string) {
  const resp = await fetch(
    `${BASE}/api/reports/ipk38?start_date=${encodeURIComponent(
      startDate,
    )}&end_date=${encodeURIComponent(endDate)}`,
    {
      headers: { ...authHeader() },
    },
  );
  if (!resp.ok) throw new Error("Gagal mengambil laporan IPK 3.8");
  return resp.json();
}
