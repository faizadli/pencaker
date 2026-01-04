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
