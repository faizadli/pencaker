"use client";
import dynamic from "next/dynamic";
import FullPageLoading from "../../components/ui/FullPageLoading";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { listRoles, getRolePermissions } from "../../services/rbac";
import { listCandidates } from "../../services/profile";
import { listJobs, listApplications } from "../../services/jobs";
import { listCompanies } from "../../services/company";

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
  const [role] = useState<string | null>(initialRole);
  const [permissions, setPermissions] = useState<string[]>([]);

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

  const getCssVar = (name: string) =>
    typeof window !== "undefined"
      ? getComputedStyle(document.documentElement).getPropertyValue(name).trim()
      : "";
  const primaryColor = getCssVar("--color-primary");
  const secondaryColor = getCssVar("--color-secondary");
  const primaryDark = getCssVar("--color-primary-dark");
  const foregroundColor = getCssVar("--color-foreground");

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
  const [loading, setLoading] = useState(true);
  const ensureArray = (v: unknown): unknown[] => {
    const d = (v as { data?: unknown }).data;
    if (Array.isArray(d)) return d as unknown[];
    return Array.isArray(v) ? (v as unknown[]) : [];
  };

  useEffect(() => {
    const loadStats = async () => {
      setLoading(true);
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
    if (canSeeOverview) {
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
                Lihat profil, status AK1, dan rekomendasi lowongan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <StatCard
                  title="Status AK1"
                  value="Aktif"
                  change="Valid 6 bulan"
                  color={secondaryColor}
                  icon="ri-id-card-line"
                />
                <StatCard
                  title="Lamaran Terkirim"
                  value={5}
                  change="Minggu ini"
                  color={primaryColor}
                  icon="ri-send-plane-2-line"
                />
                <StatCard
                  title="Wawancara Terjadwal"
                  value={2}
                  change="Jadwal terbaru"
                  color={foregroundColor}
                  icon="ri-calendar-check-line"
                />
              </div>
              <Card
                className="mt-8"
                header={
                  <h2 className="text-lg font-semibold text-primary">
                    Rekomendasi Lowongan
                  </h2>
                }
              >
                <ul className="space-y-3 text-sm text-primary">
                  <li className="flex justify-between">
                    <span>Frontend Developer - PT Solusi Digital</span>
                    <Link href="/jobs" className="text-primary">
                      Lihat
                    </Link>
                  </li>
                  <li className="flex justify-between">
                    <span>Teknisi Jaringan - CV Makmur Abadi</span>
                    <Link href="/jobs" className="text-primary">
                      Lihat
                    </Link>
                  </li>
                </ul>
              </Card>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <StatCard
                  title="Lowongan Aktif"
                  value={8}
                  change="+2 minggu ini"
                  color={secondaryColor}
                  icon="ri-briefcase-line"
                />
                <StatCard
                  title="Total Pelamar"
                  value={134}
                  change="+27"
                  color={primaryColor}
                  icon="ri-user-line"
                />
                <StatCard
                  title="Menunggu Verifikasi"
                  value={3}
                  change="Perlu tindakan"
                  color={foregroundColor}
                  icon="ri-time-line"
                />
              </div>
              <Card
                className="mt-8"
                header={
                  <h2 className="text-lg font-semibold text-primary">
                    Aktivitas Terbaru
                  </h2>
                }
              >
                <ul className="space-y-3 text-sm text-primary">
                  <li className="flex justify-between">
                    <span>
                      Lamaran baru untuk &quot;Frontend Developer&quot;
                    </span>
                    <a href="/dashboard/lowongan" className="text-primary">
                      Kelola
                    </a>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      Lowongan &quot;Operator&quot; menunggu verifikasi
                    </span>
                    <a href="/dashboard/lowongan" className="text-primary">
                      Tinjau
                    </a>
                  </li>
                </ul>
              </Card>
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

          {canSeeOverview && !isDashboardAdmin && (
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
