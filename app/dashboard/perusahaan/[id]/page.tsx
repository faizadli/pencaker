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

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        console.log("Fetching company with ID:", id);
        let finalData = null;

        // Try standard endpoint
        const resp = await getCompanyById(id);
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
            const publicResp = await getPublicCompanyById(id);
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

        if (!finalData)
          throw new Error("Data tidak diterima dari server (null)");

        // Validation check
        if (!finalData.company_name && !finalData.id) {
          console.error("Invalid data structure:", finalData);
          throw new Error("Struktur data perusahaan tidak valid");
        }

        setCompany(finalData);
      } catch (e) {
        console.error("Fetch company error:", e);
        setError(
          e instanceof Error ? e.message : "Gagal mengambil data perusahaan",
        );
        setCompany(null); // Ensure company is null so error state renders
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
      const resp = await getCompanyById(company.id);
      setCompany(resp.data || resp);
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
      const resp = await getCompanyById(company.id);
      setCompany(resp.data || resp);
      showSuccess("Verifikasi perusahaan ditolak");
    } catch {
      showError("Gagal menolak verifikasi perusahaan");
    }
  };

  if (loading || !permsLoaded) return <FullPageLoading />;
  if (!company)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i className="ri-building-line text-3xl text-gray-400"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Data Perusahaan Tidak Ditemukan
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Kami tidak dapat menemukan data perusahaan dengan ID tersebut.
          <br />
          <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded mt-2 inline-block">
            ID: {id}
          </span>
          {error && (
            <span className="block text-xs text-red-500 mt-2">
              Error: {error}
            </span>
          )}
        </p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition shadow-sm"
        >
          Kembali ke Daftar
        </button>
      </div>
    );

  const status = getApiStatus(company);
  const uiStatus = apiToUIStatus[status];

  return (
    <main className="min-h-screen bg-gray-50 pb-20 p-6 lg:ml-64">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium"
          >
            <i className="ri-arrow-left-line mr-2"></i>
            Kembali
          </button>
          <div className="text-sm text-gray-500">Detail Perusahaan</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 text-center">
              <div className="relative mx-auto w-32 h-32 mb-4">
                <div className="relative w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-md bg-gray-50 mx-auto flex items-center justify-center">
                  {company.company_logo ? (
                    <Image
                      src={company.company_logo}
                      alt={company.company_name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <i className="ri-building-line text-4xl text-gray-300"></i>
                  )}
                </div>
                {status === "APPROVED" && (
                  <div
                    className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center"
                    title="Terverifikasi"
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                )}
              </div>

              <h1 className="text-xl font-bold text-primary mb-1">
                {company.company_name}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                {company.website || "-"}
              </p>

              <div className="flex justify-center mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    status === "APPROVED"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : status === "REJECTED"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : "bg-yellow-50 text-yellow-700 border-yellow-100"
                  }`}
                >
                  {uiStatus}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-phone-line text-gray-400"></i>
                  <span>{company.no_handphone || "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span className="truncate">
                    {company.kelurahan || "-"}, {company.kecamatan || "-"}
                  </span>
                </div>
              </div>

              {/* Action Buttons for Verifier */}
              {status === "PENDING" && canVerify && (
                <div className="mt-6 pt-6 border-t border-gray-100 grid grid-cols-2 gap-3">
                  <button
                    onClick={handleReject}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={handleVerify}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
                  >
                    Setujui
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Informasi Perusahaan
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    NIB
                  </label>
                  <p className="text-gray-900 font-medium">
                    {company.nib || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Website
                  </label>
                  <p className="text-gray-900 font-medium">
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
                  <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold block mb-1">
                    Tentang Perusahaan
                  </label>
                  <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                    {company.about_company || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Alamat Lengkap
                </h2>
              </div>
              <div className="p-6">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="text-gray-900 font-medium mb-2">
                    {company.address}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="bg-white px-2 py-1 rounded border border-gray-200">
                      Kec. {company.kecamatan}
                    </span>
                    <span className="bg-white px-2 py-1 rounded border border-gray-200">
                      Kel. {company.kelurahan}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
