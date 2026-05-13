"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import {
  getCompanyById,
  getPublicCompanyById,
  approveCompany,
  rejectCompany,
} from "../../../../services/company";
import { listRoles, getRolePermissions } from "../../../../services/rbac";
import { getDisnakerProfile } from "../../../../services/profile";
import { useToast } from "../../../../components/ui/Toast";
import StatCard from "../../../../components/ui/StatCard";

type CompanyStatus = "APPROVED" | "PENDING" | "REJECTED";

type Company = {
  id: string;
  user_id: string;
  company_name: string;
  nib?: string;
  company_logo?: string;
  no_handphone: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  website?: string;
  about_company: string;
  status: CompanyStatus;
  disnaker_id?: string;
  createdAt: string;
  updatedAt: string;
};

export default function DetailPerusahaanPage() {
  const params = useParams();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const id = params?.id as string;
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Permissions state
  const [role] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem("role") || "" : "",
  );
  const [userId] = useState<string>(() =>
    typeof window !== "undefined"
      ? localStorage.getItem("id") || localStorage.getItem("user_id") || ""
      : "",
  );
  const [permissions, setPermissions] = useState<string[]>([]);
  const [disnakerId, setDisnakerId] = useState<string>("");
  const [permsLoaded, setPermsLoaded] = useState(false);

  const canVerify = permissions.includes("perusahaan.verify");

  const apiToUIStatus = useMemo(
    () =>
      ({
        APPROVED: "Terverifikasi",
        PENDING: "Menunggu Verifikasi",
        REJECTED: "Ditolak",
      }) as Record<CompanyStatus, string>,
    [],
  );

  const getApiStatus = (p: Company): CompanyStatus => {
    const raw = String(p.status || "").toLowerCase();
    if (p.disnaker_id) return "APPROVED";
    if (["approved", "terverifikasi", "disetujui"].includes(raw))
      return "APPROVED";
    if (
      [
        "pending",
        "menunggu",
        "menunggu verifikasi",
        "menunggu_verifikasi",
        "waiting",
      ].includes(raw)
    )
      return "PENDING";
    if (["rejected", "ditolak"].includes(raw)) return "REJECTED";
    return "PENDING";
  };

  useEffect(() => {
    async function boot() {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const target = roleItems.find(
          (x) => String(x.name).toLowerCase() === role.toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          setPermissions(rows.map((r) => r.code));
        }
        if ((role === "super_admin" || role === "disnaker") && userId) {
          const dz = await getDisnakerProfile(userId);
          setDisnakerId(String((dz.data || dz).id));
        }
      } catch {}
      setPermsLoaded(true);
    }
    if (role) boot();
    else setPermsLoaded(true);
  }, [role, userId]);

  const fetchCompanyData = async (companyId: string) => {
    console.log("Fetching company with ID:", companyId);
    let finalData = null;

    // Try standard endpoint
    const resp = await getCompanyById(companyId);
    console.log("Fetch company response:", resp);

    if (resp && resp.data) {
      finalData = resp.data;
    } else if (resp && !resp.data && Object.keys(resp).length > 1) {
      // If resp is the data itself (no data wrapper)
      finalData = resp;
    }

    // If standard endpoint failed to return data, try public endpoint
    if (
      !finalData ||
      (typeof finalData === "object" && !finalData.company_name)
    ) {
      console.log("Data is null/empty, trying public endpoint...");
      try {
        const publicResp = await getPublicCompanyById(companyId);
        console.log("Public fetch response:", publicResp);
        if (publicResp && publicResp.data) {
          finalData = publicResp.data;
        } else if (publicResp) {
          finalData = publicResp;
        }
      } catch (e) {
        console.error("Public fetch failed", e);
      }
    }

    if (!finalData) throw new Error("Data tidak diterima dari server (null)");

    // Validation check
    if (!finalData.company_name && !finalData.id) {
      console.error("Invalid data structure:", finalData);
      throw new Error("Struktur data perusahaan tidak valid");
    }

    return finalData;
  };

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchCompanyData(id);
        setCompany(data);
      } catch (e) {
        console.error("Fetch company error:", e);
        setError(
          e instanceof Error ? e.message : "Gagal mengambil data perusahaan",
        );
        setCompany(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleVerify = async () => {
    if (!company || !disnakerId) {
      showError("Profil disnaker tidak ditemukan");
      return;
    }
    try {
      await approveCompany(company.id, disnakerId);
      const data = await fetchCompanyData(company.id);
      setCompany(data);
      showSuccess("Perusahaan diverifikasi");
    } catch {
      showError("Gagal verifikasi perusahaan");
    }
  };

  const handleReject = async () => {
    if (!company || !disnakerId) return;
    if (!confirm("Yakin ingin menolak verifikasi perusahaan ini?")) return;
    try {
      await rejectCompany(company.id, disnakerId);
      const data = await fetchCompanyData(company.id);
      setCompany(data);
      showSuccess("Verifikasi perusahaan ditolak");
    } catch {
      showError("Gagal menolak verifikasi perusahaan");
    }
  };

  if (loading || !permsLoaded)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  if (!company)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <i className="ri-building-line text-3xl" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Data perusahaan tidak ditemukan
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
              Kami tidak dapat menemukan data perusahaan dengan ID tersebut.
            </p>
            <div className="mt-3 inline-flex rounded-lg bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600">
              ID: {id}
            </div>
            {error && (
              <p className="mt-3 text-xs text-rose-600">Error: {error}</p>
            )}
            <div className="mt-6">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar
              </button>
            </div>
          </div>
        </div>
      </main>
    );

  const status = getApiStatus(company);
  const uiStatus = apiToUIStatus[status];
  const cardSurfaceClass =
    "rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]";
  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600";
  const dangerButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700";
  const getStatusBadgeClass = (value: CompanyStatus) => {
    switch (value) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80";
      case "REJECTED":
        return "bg-rose-100 text-rose-900 ring-1 ring-rose-200/80";
      default:
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
    }
  };
  const websiteLabel = company.website || "-";

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full space-y-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
          <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-8">
            <div className="min-w-0">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar perusahaan
              </button>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Detail perusahaan
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {company.company_name}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Review profil mitra, legalitas usaha, alamat, dan status
                verifikasi dari satu halaman.
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${getStatusBadgeClass(
                status,
              )}`}
            >
              <i className="ri-shield-check-line" aria-hidden />
              {uiStatus}
            </span>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ringkasan perusahaan
            </h2>
            <p className="text-sm text-slate-500">
              Sorotan cepat untuk status verifikasi, legalitas, dan kanal kontak
              perusahaan.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Status"
              value={uiStatus}
              change="Hasil verifikasi saat ini"
              color="var(--color-secondary)"
              icon="ri-shield-check-line"
            />
            <StatCard
              title="NIB"
              value={company.nib || "-"}
              change="Nomor legalitas usaha"
              color="var(--color-primary)"
              icon="ri-file-list-3-line"
            />
            <StatCard
              title="Kontak"
              value={company.no_handphone || "-"}
              change="Nomor telepon perusahaan"
              color="var(--color-foreground)"
              icon="ri-phone-line"
            />
            <StatCard
              title="Website"
              value={websiteLabel}
              change="Kanal profil eksternal"
              color="var(--color-danger)"
              icon="ri-global-line"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.38fr_0.62fr]">
          <div className="space-y-6">
            <section className={`${cardSurfaceClass} p-6 text-center`}>
              <div className="relative mx-auto mb-4 h-32 w-32">
                <div className="relative mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-50 shadow-md">
                  {company.company_logo ? (
                    <Image
                      src={company.company_logo}
                      alt={company.company_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <i className="ri-building-line text-4xl text-slate-300" />
                  )}
                </div>
                {status === "APPROVED" && (
                  <div
                    className="absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-emerald-500"
                    title="Terverifikasi"
                  >
                    <i className="ri-check-line text-xs text-white"></i>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {company.company_name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">{websiteLabel}</p>

              <div className="mt-4 flex justify-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusBadgeClass(
                    status,
                  )}`}
                >
                  {uiStatus}
                </span>
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-left">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-phone-line text-slate-400"></i>
                  <span>{company.no_handphone || "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-map-pin-line text-slate-400"></i>
                  <span className="truncate">
                    {company.kelurahan || "-"}, {company.kecamatan || "-"}
                  </span>
                </div>
              </div>

              {status === "PENDING" && canVerify && (
                <div className="mt-6 grid grid-cols-1 gap-3 border-t border-slate-100 pt-5 sm:grid-cols-2">
                  <button onClick={handleReject} className={dangerButtonClass}>
                    <i className="ri-close-circle-line" aria-hidden />
                    Tolak
                  </button>
                  <button onClick={handleVerify} className={primaryButtonClass}>
                    <i className="ri-check-line" aria-hidden />
                    Setujui
                  </button>
                </div>
              )}
            </section>
          </div>

          <div className="space-y-6">
            <section className={cardSurfaceClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Informasi perusahaan
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    NIB
                  </label>
                  <p className="font-medium text-slate-900">
                    {company.nib || "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Website
                  </label>
                  <p className="font-medium text-slate-900">
                    {company.website ? (
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {company.website}
                      </a>
                    ) : (
                      "-"
                    )}
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tentang Perusahaan
                  </label>
                  <p className="whitespace-pre-wrap leading-relaxed text-slate-700">
                    {company.about_company || "-"}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardSurfaceClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Alamat lengkap
                </h2>
              </div>
              <div className="p-6">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="mb-2 font-medium text-slate-900">
                    {company.address}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="rounded-lg border border-slate-200 bg-white px-2 py-1">
                      Kec. {company.kecamatan}
                    </span>
                    <span className="rounded-lg border border-slate-200 bg-white px-2 py-1">
                      Kel. {company.kelurahan}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
