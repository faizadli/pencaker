"use client";
import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import {
  getDashboardJobById,
  approveJob,
  rejectJob,
} from "../../../../services/jobs";
import { listRoles, getRolePermissions } from "../../../../services/rbac";
import { getDisnakerProfile } from "../../../../services/profile";
import { useToast } from "../../../../components/ui/Toast";
import { formatDate } from "../../../../utils/format";

type JobStatus = "pending" | "approved" | "rejected" | "closed";

type Job = {
  id: string;
  company_id: string;
  company_name?: string;
  job_title: string;
  job_type: "full-time" | "part-time" | "internship" | "contract" | "freelance";
  job_description: string;
  category: string;
  placement?: string;
  min_salary: number;
  max_salary: number;
  experience_required: string;
  education_required: string;
  skills_required: string;
  work_setup: string;
  application_deadline: string;
  status: JobStatus;
  createdAt?: string;
  created_at?: string;
};

export default function DetailLowonganPage() {
  const params = useParams();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const id = params?.id as string;
  const [job, setJob] = useState<Job | null>(null);
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

  // Assuming permission is similar to company verification, or if user is disnaker/admin
  const canVerify =
    permissions.includes("lowongan.verify") ||
    role === "super_admin" ||
    role === "disnaker";

  const apiToUIStatus = useMemo(
    () =>
      ({
        approved: "Aktif",
        pending: "Menunggu Verifikasi",
        rejected: "Ditolak",
        closed: "Kadaluarsa",
      }) as Record<JobStatus, string>,
    [],
  );

  const apiToUITipe = useMemo(
    () =>
      ({
        "full-time": "Full-time",
        "part-time": "Part-time",
        internship: "Internship",
        contract: "Kontrak",
        freelance: "Freelance",
      }) as Record<string, string>,
    [],
  );

  useEffect(() => {
    async function boot() {
      if (!role) {
        setPermsLoaded(true);
        return;
      }
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
    boot();
  }, [role, userId]);

  useEffect(() => {
    if (!id) return;
    let isMounted = true;

    const fetchJob = async (attempt = 1) => {
      try {
        const resp = await getDashboardJobById(id);
        const data = resp.data || resp;
        if (data && !data.id) {
          data.id = data.jobs_id || id;
        }
        if (isMounted) {
          setJob(data);
          setLoading(false);
        }
      } catch (e) {
        console.error(`Fetch job error (attempt ${attempt}):`, e);
        if (attempt <= 3 && isMounted) {
          // Retry logic: wait 1s, then 2s, then 3s
          setTimeout(() => fetchJob(attempt + 1), 1000 * attempt);
        } else if (isMounted) {
          setError(
            e instanceof Error ? e.message : "Gagal mengambil data lowongan",
          );
          setLoading(false);
        }
      }
    };

    fetchJob();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleVerify = async () => {
    if (!job || !disnakerId) {
      showError("Profil disnaker tidak ditemukan");
      return;
    }
    try {
      await approveJob(job.id, disnakerId);
      const resp = await getDashboardJobById(job.id);
      const data = resp.data || resp;
      if (data && !data.id) data.id = job.id;
      setJob(data);
      showSuccess("Lowongan disetujui");
    } catch {
      showError("Gagal menyetujui lowongan");
    }
  };

  const handleReject = async () => {
    if (!job || !disnakerId) return;
    if (!confirm("Yakin ingin menolak lowongan ini?")) return;
    try {
      await rejectJob(job.id, disnakerId);
      const resp = await getDashboardJobById(job.id);
      const data = resp.data || resp;
      if (data && !data.id) data.id = job.id;
      setJob(data);
      showSuccess("Lowongan ditolak");
    } catch {
      showError("Gagal menolak lowongan");
    }
  };

  if (loading || !permsLoaded) return <FullPageLoading />;
  if (!job)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <i className="ri-briefcase-line text-3xl text-gray-400"></i>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Lowongan Tidak Ditemukan
        </h3>
        <p className="text-gray-500 mb-6 max-w-md mx-auto">
          Kami tidak dapat menemukan data lowongan dengan ID tersebut.
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

  const status = job.status;
  const uiStatus = apiToUIStatus[status] || status;

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
          <div className="text-sm text-gray-500">Detail Lowongan</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Job Summary Card */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden p-6 text-center">
              <div className="w-20 h-20 mx-auto bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                <i className="ri-briefcase-line text-4xl"></i>
              </div>

              <h1 className="text-xl font-bold text-gray-900 mb-1">
                {job.job_title}
              </h1>
              <p className="text-sm text-gray-500 mb-4">
                {job.company_name || "-"}
              </p>

              <div className="flex justify-center flex-wrap gap-2 mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    status === "approved"
                      ? "bg-green-50 text-green-700 border-green-100"
                      : status === "rejected"
                        ? "bg-red-50 text-red-700 border-red-100"
                        : status === "closed"
                          ? "bg-gray-50 text-gray-700 border-gray-100"
                          : "bg-yellow-50 text-yellow-700 border-yellow-100"
                  }`}
                >
                  {uiStatus}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium border bg-blue-50 text-blue-700 border-blue-100">
                  {apiToUITipe[job.job_type] || job.job_type}
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-map-pin-line text-gray-400"></i>
                  <span>
                    {job.work_setup} - {job.placement || "Tidak disebutkan"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-money-dollar-circle-line text-gray-400"></i>
                  <span>
                    {job.min_salary && job.max_salary
                      ? `Rp ${job.min_salary.toLocaleString()} - Rp ${job.max_salary.toLocaleString()}`
                      : "Gaji tidak ditampilkan"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <i className="ri-calendar-line text-gray-400"></i>
                  <span>Deadline: {formatDate(job.application_deadline)}</span>
                </div>
              </div>

              {/* Action Buttons for Verifier */}
              {status === "pending" && canVerify && (
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

          {/* Right Column: Job Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-bold text-gray-900">
                  Deskripsi Pekerjaan
                </h2>
              </div>
              <div className="p-6">
                <div
                  className="prose max-w-none text-gray-700"
                  dangerouslySetInnerHTML={{ __html: job.job_description }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">
                    Persyaratan
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Pendidikan
                    </h4>
                    <p className="text-sm text-gray-600">
                      {job.education_required}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Pengalaman
                    </h4>
                    <p className="text-sm text-gray-600">
                      {job.experience_required}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Keahlian
                    </h4>
                    <p className="text-sm text-gray-600">
                      {job.skills_required}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-lg font-bold text-gray-900">
                    Informasi Tambahan
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Kategori
                    </h4>
                    <p className="text-sm text-gray-600">{job.category}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Tanggal Posting
                    </h4>
                    <p className="text-sm text-gray-600">
                      {formatDate(job.createdAt || job.created_at || "")}
                    </p>
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
