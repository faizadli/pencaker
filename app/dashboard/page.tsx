"use client";
import dynamic from "next/dynamic";
import FullPageLoading from "../../components/ui/FullPageLoading";
import StatCard from "../../components/ui/StatCard";
import { useEffect, useMemo, useState } from "react";
import { listRoles, getRolePermissions } from "../../services/rbac";
import {
  listCandidates,
  getCompanyProfile,
  getCandidateProfile,
} from "../../services/profile";
import { getAk1Document, listAk1Documents } from "../../services/ak1";
import {
  listJobs,
  listApplications,
  listMyApplications,
} from "../../services/jobs";
import { listCompanies } from "../../services/company";

const ensureArray = (v: unknown): unknown[] => {
  if (!v) return [];
  const d = (v as { data?: unknown }).data;
  if (Array.isArray(d)) return d as unknown[];
  return Array.isArray(v) ? (v as unknown[]) : [];
};

function DashboardPageComponent() {
  const initialRole =
    typeof document !== "undefined"
      ? (() => {
          const c = document.cookie || "";
          for (const part of c.split(";")) {
            const [k, ...rest] = part.trim().split("=");
            if (k === "role") return rest.join("=");
          }
          return null;
        })()
      : null;
  type AppRow = {
    id: string;
    candidate_id: string;
    company_id: string;
    job_id: string;
    application_date?: string;
    status?: string;
    note?: string | null;
    job_title?: string;
    company_name?: string;
    is_admin_created?: boolean | number;
    placement?: string;
    job_type?: string;
  };

  const [role] = useState<string | null>(initialRole);
  const [permissions, setPermissions] = useState<string[]>([]);

  // State yang disalin dari lamaran/page.tsx
  const [rows, setRows] = useState<AppRow[]>([]);

  // ... (kode useEffect loadPerms tetap sama) ...

  useEffect(() => {
    async function loadLamaran() {
      if (role !== "candidate") return;

      try {
        // setLoadingLamaran(true);

        // Ambil candidate_id dari profil
        const uid =
          typeof window !== "undefined"
            ? localStorage.getItem("id") ||
              localStorage.getItem("user_id") ||
              ""
            : "";
        let candidateId = "";

        if (uid) {
          try {
            const cp = await getCandidateProfile(uid);
            const data = cp.data || cp;
            candidateId = String(data?.id || "");
          } catch {}
        }

        // Prioritaskan mengambil milik sendiri (berbasis user_id), lalu fallback ke candidate_id
        let rawResp: unknown = null;
        try {
          rawResp = await listMyApplications();
        } catch {
          if (candidateId) {
            rawResp = await listApplications({ candidate_id: candidateId });
          } else {
            // Jika gagal keduanya dan tidak ada candidateId, lempar error atau biarkan kosong
            // Sesuai logika lamaran/page.tsx, di sini throw error
            throw new Error("Tidak bisa memuat lamaran");
          }
        }

        const envelope = rawResp as { data?: unknown } | unknown;
        const raw = (
          envelope && (envelope as { data?: unknown }).data
            ? (envelope as { data?: unknown }).data
            : envelope
        ) as AppRow[];

        const normalized = raw.map((r) => {
          const obj = r as Record<string, unknown>;
          const id =
            typeof obj["id"] === "string"
              ? (obj["id"] as string)
              : String(
                  obj["application_id"] || obj["jobs_applications_id"] || "",
                );
          const is_admin_created = !!(
            obj["is_admin_created"] || r.is_admin_created
          );
          return id
            ? { ...r, id, is_admin_created }
            : { ...r, is_admin_created };
        });
        setRows(normalized);
      } catch {
        setRows([]);
      } finally {
        // setLoadingLamaran(false);
      }
    }

    if (role === "candidate") {
      loadLamaran();
    }
  }, [role]);

  useEffect(() => {
    const loadPerms = async () => {
      try {
        const rolesResp = await listRoles();
        const roleItems = (rolesResp.data || rolesResp) as {
          id: number;
          name: string;
        }[];
        const target = roleItems.find(
          (x) =>
            String(x.name).toLowerCase() === String(role || "").toLowerCase(),
        );
        if (target) {
          const perms = await getRolePermissions(target.id);
          const rows = (perms.data || perms) as {
            code: string;
            label: string;
          }[];
          setPermissions(rows.map((r) => r.code));
        }
      } catch {}
    };
    if (role) loadPerms();
  }, [role]);

  const primaryColor = "var(--color-primary)";
  const secondaryColor = "var(--color-secondary)";
  const primaryDark = "var(--color-primary-dark)";
  const foregroundColor = "var(--color-foreground)";

  const apiToUIStatusAk1 = useMemo(
    () =>
      ({
        APPROVED: "Aktif",
        PENDING: "Menunggu Verifikasi",
        PROCESS: "Menunggu Verifikasi",
        GENERATE: "Menunggu Pembuatan",
        REJECTED: "Ditolak",
        PLACED: "Sudah Ditempatkan",
      }) as Record<
        string,
        | "Aktif"
        | "Menunggu Verifikasi"
        | "Ditolak"
        | "Menunggu Pembuatan"
        | "Sudah Ditempatkan"
      >,
    [],
  );

  const isCompany = role === "company";
  const isCandidate = role === "candidate";
  const isDashboardAdmin = !isCompany && !isCandidate;
  const canReadPencaker = permissions.includes("pencaker.read");
  const canReadLowongan = permissions.includes("lowongan.read");
  const canReadPerusahaan = permissions.includes("perusahaan.read");
  const canSeeOverview =
    isDashboardAdmin || canReadPencaker || canReadLowongan || canReadPerusahaan;
  const [stats, setStats] = useState({
    jobSeekers: 0,
    activeJobs: 0,
    companies: 0,
    // Global Stats
    global: {
      pencaker: 0,
      company: 0,
      job: 0,
      application: 0,
      placed: 0,
    },
    // Annual Stats
    annual: {
      pencaker: 0,
      company: 0,
      job: 0,
      application: 0,
      placed: 0,
    },
  });
  const [companyStats, setCompanyStats] = useState({
    jobCount: 0,
    applicantCount: 0,
    pendingCount: 0,
    processCount: 0,
    isVerified: true,
  });
  const [candidateStats, setCandidateStats] = useState({
    ak1Status: "Belum Melakukan Pengajuan",
    ak1Color: secondaryColor,
    rawDebug: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);

      const getAk1StatusColor = (status: string) => {
        switch (status) {
          case "Aktif":
            return "#22C55E";
          case "Menunggu Verifikasi":
            return "#EAB308";
          case "Menunggu Pembuatan":
            return "#3B82F6";
          case "Ditolak":
            return "#EF4444";
          case "Sudah Ditempatkan":
            return "#8B5CF6"; // Violet
          default:
            return secondaryColor;
        }
      };

      if (isCandidate) {
        try {
          const uid =
            typeof window !== "undefined"
              ? localStorage.getItem("id") ||
                localStorage.getItem("user_id") ||
                ""
              : "";

          console.log("Fetching dashboard stats. UID:", uid);

          let ak1Doc: { status?: string } | null = null;
          let profile: { ak1_status?: string; doc_status?: string } | null =
            null;

          if (uid) {
            // Sequential fetch to debug potential race conditions
            try {
              const ak1Resp = await getAk1Document(uid);
              console.log("AK1 Resp:", ak1Resp);
              ak1Doc = (ak1Resp?.data || ak1Resp) as { status?: string } | null;
            } catch (e) {
              console.error("AK1 Fetch Error:", e);
            }

            try {
              const profileResp = await getCandidateProfile(uid);
              console.log("Profile Resp:", profileResp);
              profile = (profileResp?.data || profileResp) as {
                ak1_status?: string;
                doc_status?: string;
              } | null;
            } catch (e) {
              console.error("Profile Fetch Error:", e);
            }
          }

          let ak1Status = "Belum Melakukan Pengajuan";
          let ak1Color = secondaryColor;

          let rawStatus =
            profile?.ak1_status || profile?.doc_status || ak1Doc?.status;
          console.log("Raw Status Detected (from profile/doc):", rawStatus);

          // Fallback to listAk1Documents (works with token only) if status is missing
          if (!rawStatus) {
            try {
              const docsResp = await listAk1Documents();
              const docs = (docsResp?.data || docsResp) as Array<{
                status?: string;
              }>;
              if (Array.isArray(docs) && docs.length > 0) {
                // Find approved or take the first one
                const found =
                  docs.find(
                    (d) => String(d.status).toUpperCase() === "APPROVED",
                  ) || docs[0];
                if (found && found.status) {
                  rawStatus = found.status;
                }
              }
            } catch (e) {
              console.error("List AK1 Error:", e);
            }
          }

          if (rawStatus) {
            const mapped =
              apiToUIStatusAk1[String(rawStatus).toUpperCase()] ||
              String(rawStatus);
            ak1Status = mapped;
            ak1Color = getAk1StatusColor(mapped);
          }

          setCandidateStats({
            ak1Status,
            ak1Color,
            rawDebug: String(rawStatus || (uid ? "null" : "no-uid")),
          });
        } catch (e) {
          setCandidateStats((prev) => ({
            ...prev,
            rawDebug: `Error: ${e instanceof Error ? e.message : String(e)}`,
          }));
        }
        setLoading(false);
        return;
      }

      if (isCompany) {
        try {
          const uid =
            typeof window !== "undefined"
              ? localStorage.getItem("id") ||
                localStorage.getItem("user_id") ||
                ""
              : "";
          if (uid) {
            const profile = await getCompanyProfile(uid).catch(() => null);
            if (profile) {
              const profileData = (profile.data || profile) as {
                id?: string;
                status?: string;
              };
              // Check verification status from profile or default to false if pending
              // Assuming status is available or we check disnaker_id presence or specific status field
              // Since getCompanyProfile returns profile, we might need to check the company status.
              // However, listCompanies returns status. Let's assume for now we need to rely on what we have.
              // If profile has status, use it. If not, assume pending if not approved.
              // For now, let's assume 'status' field exists on profile data joined from company table.
              const isVerified =
                String(profileData.status || "").toUpperCase() === "APPROVED";

              const compId = profileData.id;
              if (compId) {
                const [jobs, apps] = await Promise.all([
                  listJobs({ company_id: compId, limit: 1000 }).catch(() => []),
                  listApplications({ company_id: compId, limit: 1000 }).catch(
                    () => [],
                  ),
                ]);

                const jobsList = ensureArray(jobs);
                const appsList = ensureArray(apps) as Array<{
                  status?: string;
                }>;

                setCompanyStats({
                  jobCount: jobsList.length,
                  applicantCount: appsList.length,
                  pendingCount: appsList.filter(
                    (a) => String(a.status || "").toLowerCase() === "pending",
                  ).length,
                  processCount: appsList.filter((a) => {
                    const s = String(a.status || "").toLowerCase();
                    return s === "test" || s === "interview";
                  }).length,
                  isVerified,
                });
              }
            }
          }
        } catch {}
        setLoading(false);
        return;
      }

      const next = {
        jobSeekers: 0,
        activeJobs: 0,
        companies: 0,
        global: { pencaker: 0, company: 0, job: 0, application: 0, placed: 0 },
        annual: { pencaker: 0, company: 0, job: 0, application: 0, placed: 0 },
      };

      const limit = 10000;
      const candP =
        canReadPencaker || isDashboardAdmin
          ? listCandidates({ limit })
          : Promise.resolve(null);
      const jobsP =
        canReadLowongan || isDashboardAdmin
          ? listJobs({ limit })
          : Promise.resolve(null);
      const compsP =
        canReadPerusahaan || isDashboardAdmin
          ? listCompanies({ limit })
          : Promise.resolve(null);
      const appsP = isDashboardAdmin
        ? listApplications({ limit })
        : Promise.resolve(null);

      const [candR, jobsR, compsR, appsR] = await Promise.allSettled([
        candP,
        jobsP,
        compsP,
        appsP,
      ]);
      const thisYear = new Date().getFullYear();

      if (candR.status === "fulfilled" && candR.value) {
        const rows = ensureArray(candR.value) as Array<{
          birthdate?: string;
          gender?: string;
          created_at?: string;
          createdAt?: string;
        }>;
        next.jobSeekers = rows.length;

        if (isDashboardAdmin) {
          next.global.pencaker = rows.length;
          next.annual.pencaker = rows.filter((r) => {
            const d = r.created_at || r.createdAt;
            return d && new Date(d).getFullYear() === thisYear;
          }).length;
        }
      }

      if (jobsR.status === "fulfilled" && jobsR.value) {
        const jobs = ensureArray(jobsR.value) as Array<{
          createdAt?: string;
          created_at?: string;
          updated_at?: string;
          category?: string;
          status?: string;
          application_deadline?: string;
          company_name?: string;
          job_title?: string;
        }>;
        const approved = jobs.filter(
          (j) => String(j.status || "").toLowerCase() === "approved",
        );
        next.activeJobs = approved.length;

        if (isDashboardAdmin) {
          next.global.job = approved.length;
          next.annual.job = approved.filter((r) => {
            const d = r.created_at || r.createdAt;
            return d && new Date(d).getFullYear() === thisYear;
          }).length;
        }
      }

      if (compsR.status === "fulfilled" && compsR.value) {
        const comps = ensureArray(compsR.value) as Array<{
          created_at?: string;
          createdAt?: string;
        }>;
        next.companies = comps.length;

        if (isDashboardAdmin) {
          next.global.company = comps.length;
          next.annual.company = comps.filter((r) => {
            const d = r.created_at || r.createdAt;
            return d && new Date(d).getFullYear() === thisYear;
          }).length;
        }
      }

      if (appsR.status === "fulfilled" && appsR.value) {
        const apps = ensureArray(appsR.value) as Array<{
          status?: string;
          created_at?: string;
          createdAt?: string;
        }>;
        if (isDashboardAdmin) {
          next.global.application = apps.length;
          next.global.placed = apps.filter(
            (a) => String(a.status || "").toLowerCase() === "approve",
          ).length;

          next.annual.application = apps.filter((r) => {
            const d = r.created_at || r.createdAt;
            return d && new Date(d).getFullYear() === thisYear;
          }).length;

          next.annual.placed = apps.filter((r) => {
            const d = r.created_at || r.createdAt;
            return (
              d &&
              new Date(d).getFullYear() === thisYear &&
              String(r.status || "").toLowerCase() === "approve"
            );
          }).length;
        }
      }

      setStats(next);
      setLoading(false);
    };
    if (canSeeOverview || isCandidate || isCompany) {
      loadStats();
    } else {
      const t = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(t);
    }
  }, [
    canReadPencaker,
    canReadLowongan,
    canReadPerusahaan,
    canSeeOverview,
    isDashboardAdmin,
    isCompany,
    isCandidate,
    secondaryColor,
    apiToUIStatusAk1,
  ]);

  if (loading) {
    return (
      <main className="transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64">
        <div className="px-4 sm:px-6">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  }

  return (
    <>
      <main
        className={`transition-all duration-300 min-h-screen bg-gray-50 pt-5 pb-8 lg:ml-64`}
      >
        <div className="px-4 sm:px-6">
          {isCandidate && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                Dashboard Pencaker
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Lihat profil dan status lamaran anda
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <StatCard
                  title="Status AK1"
                  value={candidateStats.ak1Status}
                  change={`Status terkini (${candidateStats.rawDebug})`}
                  color={candidateStats.ak1Color}
                  icon="ri-id-card-line"
                />
                <StatCard
                  title="Lamaran Terkirim"
                  value={rows.length}
                  change="Total lamaran"
                  color={primaryColor}
                  icon="ri-send-plane-2-line"
                />
                <StatCard
                  title="Sedang Diproses"
                  value={
                    rows.filter((r) =>
                      ["process"].includes(
                        String(r.status || "").toLowerCase(),
                      ),
                    ).length
                  }
                  change="Interview / Tes"
                  color={foregroundColor}
                  icon="ri-loader-4-line"
                />
                <StatCard
                  title="Lamaran Ditolak"
                  value={
                    rows.filter(
                      (r) =>
                        String(r.status || "").toLowerCase() === "rejected",
                    ).length
                  }
                  change="Perlu ditingkatkan"
                  color={primaryDark}
                  icon="ri-close-circle-line"
                />
              </div>
            </div>
          )}

          {isCompany && (
            <div className="mb-6">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">
                Dashboard Perusahaan
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Kelola lowongan, pantau pelamar, dan verifikasi
              </p>

              {!companyStats.isVerified && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl flex items-start gap-3">
                  <i className="ri-time-line text-yellow-600 text-xl mt-0.5"></i>
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800">
                      Verifikasi Akun
                    </h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Informasi akun anda sedang dalam verifikasi admin disnaker
                      mohon tunggu dalam waktu 24 jam.
                    </p>
                  </div>
                </div>
              )}

              {companyStats.isVerified && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <StatCard
                    title="Lowongan Dibuat"
                    value={companyStats.jobCount}
                    change="Total lowongan"
                    color={secondaryColor}
                    icon="ri-briefcase-line"
                  />
                  <StatCard
                    title="Total Pelamar"
                    value={companyStats.applicantCount}
                    change="Semua lowongan"
                    color={primaryColor}
                    icon="ri-group-line"
                  />
                  <StatCard
                    title="Pelamar Pending"
                    value={companyStats.pendingCount}
                    change="Perlu tindakan"
                    color={foregroundColor}
                    icon="ri-time-line"
                  />
                  <StatCard
                    title="Pelamar Proses"
                    value={companyStats.processCount}
                    change="Interview / Tes"
                    color={primaryDark}
                    icon="ri-user-settings-line"
                  />
                </div>
              )}
            </div>
          )}

          {isDashboardAdmin && (
            <div className="space-y-8 mb-8">
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-primary">
                  Dashboard Overview
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  Ringkasan statistik dan aktivitas terkini sistem
                </p>
              </div>

              {/* Ringkasan Global */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-4">
                  Ringkasan Global
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    title="Total Pencari Kerja"
                    value={stats.global.pencaker}
                    change="Total terdaftar"
                    color={secondaryColor}
                    icon="ri-user-search-line"
                  />
                  <StatCard
                    title="Total Perusahaan"
                    value={stats.global.company}
                    change="Total terdaftar"
                    color={primaryDark}
                    icon="ri-building-line"
                  />
                  <StatCard
                    title="Total Lowongan"
                    value={stats.global.job}
                    change="Tersedia"
                    color={primaryColor}
                    icon="ri-briefcase-line"
                  />
                  <StatCard
                    title="Total Lamaran"
                    value={stats.global.application}
                    change="Semua waktu"
                    color={foregroundColor}
                    icon="ri-file-list-3-line"
                  />
                  <StatCard
                    title="Ditempatkan"
                    value={stats.global.placed}
                    change="Lamaran diterima"
                    color="#10B981"
                    icon="ri-user-follow-line"
                  />
                </div>
              </div>

              {/* Ringkasan Tahunan */}
              <div>
                <h2 className="text-lg font-semibold text-primary mb-4">
                  Ringkasan Tahunan ({new Date().getFullYear()})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <StatCard
                    title="Total Pencari Kerja"
                    value={stats.annual.pencaker}
                    change="Tahun ini"
                    color={secondaryColor}
                    icon="ri-user-add-line"
                  />
                  <StatCard
                    title="Total Perusahaan"
                    value={stats.annual.company}
                    change="Tahun ini"
                    color={primaryDark}
                    icon="ri-building-2-line"
                  />
                  <StatCard
                    title="Total Lowongan"
                    value={stats.annual.job}
                    change="Tahun ini"
                    color={primaryColor}
                    icon="ri-briefcase-4-line"
                  />
                  <StatCard
                    title="Total Lamaran"
                    value={stats.annual.application}
                    change="Tahun ini"
                    color={foregroundColor}
                    icon="ri-file-text-line"
                  />
                  <StatCard
                    title="Ditempatkan"
                    value={stats.annual.placed}
                    change="Tahun ini"
                    color="#10B981"
                    icon="ri-check-double-line"
                  />
                </div>
              </div>
            </div>
          )}

          {canSeeOverview && !isDashboardAdmin && !isCompany && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {canReadPencaker && (
                <StatCard
                  title="Pencari Kerja"
                  value={stats.jobSeekers}
                  change="Total terdata"
                  color={secondaryColor}
                  icon="ri-user-line"
                />
              )}
              {canReadLowongan && (
                <StatCard
                  title="Lowongan Aktif"
                  value={stats.activeJobs}
                  change="Status approved"
                  color={primaryColor}
                  icon="ri-briefcase-line"
                />
              )}
              {canReadPerusahaan && (
                <StatCard
                  title="Perusahaan"
                  value={stats.companies}
                  change="Total terdata"
                  color={foregroundColor}
                  icon="ri-building-line"
                />
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(DashboardPageComponent), {
  ssr: false,
});
