"use client";
import { useEffect, useState } from "react";
import RemoteImage from "../../../../../../components/RemoteImage";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../../../components/ui/FullPageLoading";
import { getCandidateProfileById } from "../../../../../../services/profile";
import {
  listApplications,
  updateApplication,
} from "../../../../../../services/jobs";
import { useToast } from "../../../../../../components/ui/Toast";
import { Input, SearchableSelect } from "../../../../../../components/ui/field";
import StatCard from "../../../../../../components/ui/StatCard";

type CandidateDetail = {
  id: string;
  user_id: string;
  full_name: string;
  birthdate: string;
  place_of_birth: string;
  nik: string;
  kecamatan: string;
  kelurahan: string;
  address: string;
  postal_code: string;
  gender: string;
  no_handphone: string;
  photo_profile?: string;
  last_education: string;
  graduation_year: number;
  status_perkawinan: string;
  dis_kondisi?: string;
  agama?: string;
  email?: string | null;
  created_at?: string;
  ak1_status?: "APPROVED" | "REJECTED" | "PENDING" | "PLACED";
  cv_file?: string;
  resume_text?: string;
};

type AppStatus = "pending" | "process" | "accepted" | "rejected";

export default function ApplicantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string; // job_id
  const candidateId = params?.candidateId as string;

  const { showSuccess, showError } = useToast();

  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [application, setApplication] = useState<{
    id: string;
    status: AppStatus;
    note?: string | null;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  const [editStatus, setEditStatus] = useState<AppStatus>("pending");
  const [editNote, setEditNote] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (!id || !candidateId) return;

    const fetchData = async () => {
      try {
        // Fetch Candidate Profile
        const profileResp = await getCandidateProfileById(candidateId);
        setCandidate(profileResp.data as CandidateDetail);

        // Fetch Application Details
        const appResp = await listApplications({
          job_id: id,
          candidate_id: candidateId,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const apps = ((appResp as any).data || appResp) as any[];

        if (apps && apps.length > 0) {
          const app = apps[0];
          // Resolve ID correctly (similar to list page logic)
          const objA = app as Record<string, unknown>;
          const appId =
            typeof objA["application_id"] === "string"
              ? (objA["application_id"] as string)
              : typeof app.id === "string"
                ? app.id
                : typeof objA["jobs_applications_id"] === "string"
                  ? (objA["jobs_applications_id"] as string)
                  : "";

          if (appId) {
            setApplication({
              id: appId,
              status: app.status,
              note: app.note,
            });
            setEditStatus(app.status || "pending");
            setEditNote(app.note || "");
          }
        }
      } catch (e) {
        console.error(e);
        showError("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, candidateId]);

  const handleUpdateStatus = async () => {
    if (!application) return;
    setIsUpdating(true);
    try {
      await updateApplication(application.id, {
        status: editStatus,
        note: editNote,
      });
      setApplication((prev) =>
        prev ? { ...prev, status: editStatus, note: editNote } : null,
      );
      showSuccess("Status lamaran diperbarui");
    } catch {
      showError("Gagal memperbarui status");
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <FullPageLoading isSection />
        </div>
      </main>
    );
  if (!candidate)
    return (
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
        <div className="w-full">
          <div className="rounded-2xl border border-slate-200/90 bg-white p-8 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <i className="ri-user-search-line text-3xl" aria-hidden />
            </div>
            <h3 className="text-xl font-semibold text-slate-900">
              Data pencaker tidak ditemukan
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Kandidat yang Anda cari tidak tersedia atau sudah tidak dapat
              diakses.
            </p>
          </div>
        </div>
      </main>
    );

  const toDate = (s?: string) => {
    if (!s) return "-";
    try {
      return new Date(s).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return s;
    }
  };
  const cardSurfaceClass =
    "rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]";
  const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:brightness-95 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600";
  const getApplicationStatusLabel = (status?: AppStatus) => {
    switch (status) {
      case "accepted":
        return "Diterima";
      case "process":
        return "Diproses";
      case "rejected":
        return "Ditolak";
      default:
        return "Pending";
    }
  };
  const getApplicationStatusClass = (status?: AppStatus) => {
    switch (status) {
      case "accepted":
        return "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80";
      case "process":
        return "bg-sky-100 text-sky-900 ring-1 ring-sky-200/80";
      case "rejected":
        return "bg-rose-100 text-rose-900 ring-1 ring-rose-200/80";
      default:
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
    }
  };
  const getAk1StatusLabel = (status?: CandidateDetail["ak1_status"]) => {
    switch (status) {
      case "APPROVED":
        return "Aktif";
      case "REJECTED":
        return "Ditolak";
      case "PENDING":
        return "Sedang Melakukan Pengajuan";
      case "PLACED":
        return "Sudah Ditempatkan";
      default:
        return "Belum Melakukan Pengajuan";
    }
  };
  const getAk1StatusClass = (status?: CandidateDetail["ak1_status"]) => {
    switch (status) {
      case "APPROVED":
        return "bg-emerald-100 text-emerald-900 ring-1 ring-emerald-200/80";
      case "REJECTED":
        return "bg-rose-100 text-rose-900 ring-1 ring-rose-200/80";
      case "PENDING":
        return "bg-amber-100 text-amber-900 ring-1 ring-amber-200/80";
      case "PLACED":
        return "bg-sky-100 text-sky-900 ring-1 ring-sky-200/80";
      default:
        return "bg-slate-100 text-slate-700 ring-1 ring-slate-200/80";
    }
  };

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
                Kembali ke daftar pelamar
              </button>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Detail pelamar
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {candidate.full_name}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Review profil kandidat, dokumen, status AK1, dan progres lamaran
                dalam satu halaman.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${getApplicationStatusClass(
                  editStatus,
                )}`}
              >
                <i className="ri-briefcase-line" aria-hidden />
                {getApplicationStatusLabel(editStatus)}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${getAk1StatusClass(
                  candidate.ak1_status,
                )}`}
              >
                <i className="ri-file-list-3-line" aria-hidden />
                AK1 {getAk1StatusLabel(candidate.ak1_status)}
              </span>
            </div>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ringkasan kandidat
            </h2>
            <p className="text-sm text-slate-500">
              Sorotan cepat untuk identitas, pendidikan, dan status kandidat.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="NIK"
              value={candidate.nik || "-"}
              change="Identitas kandidat"
              color="var(--color-secondary)"
              icon="ri-user-line"
            />
            <StatCard
              title="Pendidikan"
              value={candidate.last_education || "-"}
              change={`Lulus ${candidate.graduation_year || "-"}`}
              color="var(--color-primary)"
              icon="ri-book-open-line"
            />
            <StatCard
              title="Status Lamaran"
              value={getApplicationStatusLabel(editStatus)}
              change="Status terkini"
              color="var(--color-foreground)"
              icon="ri-briefcase-line"
            />
            <StatCard
              title="Status AK1"
              value={getAk1StatusLabel(candidate.ak1_status)}
              change="Kesiapan administrasi"
              color="var(--color-danger)"
              icon="ri-file-list-3-line"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.38fr_0.62fr]">
          <div className="space-y-6">
            <div className={`${cardSurfaceClass} p-6`}>
              <h3 className="mb-4 text-lg font-semibold text-slate-900">
                Status lamaran
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Status
                  </label>
                  <SearchableSelect
                    value={editStatus}
                    onChange={(v) => setEditStatus(v as AppStatus)}
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "process", label: "Diproses" },
                      { value: "accepted", label: "Diterima" },
                      { value: "rejected", label: "Ditolak" },
                    ]}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Catatan
                  </label>
                  <Input
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    placeholder="Catatan..."
                  />
                </div>
                <button
                  onClick={handleUpdateStatus}
                  disabled={isUpdating}
                  className={`${primaryButtonClass} w-full`}
                >
                  <i className="ri-save-line" aria-hidden />
                  {isUpdating ? "Menyimpan..." : "Update Status"}
                </button>
              </div>
            </div>

            <div className={`${cardSurfaceClass} p-6 text-center`}>
              <div className="relative mx-auto w-32 h-32 mb-4">
                {candidate.photo_profile ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md bg-gray-100 mx-auto">
                    <RemoteImage
                      src={candidate.photo_profile}
                      alt={candidate.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl border-4 border-white shadow-md mx-auto">
                    {candidate.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                {(candidate.ak1_status === "APPROVED" ||
                  candidate.ak1_status === "PLACED") && (
                  <div
                    className={`absolute bottom-1 right-1 w-6 h-6 ${candidate.ak1_status === "PLACED" ? "bg-blue-500" : "bg-green-500"} border-2 border-white rounded-full flex items-center justify-center`}
                    title={
                      candidate.ak1_status === "PLACED"
                        ? "Sudah Ditempatkan"
                        : "AK1 Terverifikasi"
                    }
                  >
                    <i className="ri-check-line text-white text-xs"></i>
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900 mb-1">
                {candidate.full_name}
              </h2>
              <p className="text-sm text-slate-500 mb-4">
                {candidate.email || "-"}
              </p>

              <div className="flex justify-center mb-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getAk1StatusClass(
                    candidate.ak1_status,
                  )}`}
                >
                  AK1: {getAk1StatusLabel(candidate.ak1_status)}
                </span>
              </div>

              <div className="border-t border-slate-100 pt-4 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-phone-line text-slate-400"></i>
                  <span>{candidate.no_handphone || "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-map-pin-line text-slate-400"></i>
                  <span className="truncate">
                    {candidate.kecamatan || "-"}, {candidate.kelurahan || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-calendar-line text-slate-400"></i>
                  <span>Bergabung {toDate(candidate.created_at)}</span>
                </div>
              </div>
            </div>

            <div className={`${cardSurfaceClass} p-6`}>
              <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i className="ri-file-text-line text-primary"></i>
                Dokumen
              </h3>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-slate-900 text-sm">
                      Curriculum Vitae (CV) / Resume
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Dokumen CV atau Text Resume Kandidat
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                    <i className="ri-file-text-line text-blue-500 text-xl"></i>
                  </div>
                </div>

                {candidate.cv_file ? (
                  <a
                    href={candidate.cv_file}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-primary"
                  >
                    <i className="ri-download-line" aria-hidden />
                    Download CV
                  </a>
                ) : candidate.resume_text ? (
                  <div className="mt-3 w-full rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
                    <p className="max-h-60 overflow-y-auto whitespace-pre-wrap text-sm text-slate-700">
                      {candidate.resume_text}
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-center text-sm font-medium text-slate-400">
                    Tidak ada CV / Resume
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className={cardSurfaceClass}>
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  Informasi Pribadi
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    NIK
                  </label>
                  <p className="text-slate-900 font-medium">
                    {candidate.nik || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    Jenis Kelamin
                  </label>
                  <p className="text-slate-900 font-medium flex items-center gap-2">
                    {candidate.gender === "L"
                      ? "Laki-laki"
                      : candidate.gender === "P"
                        ? "Perempuan"
                        : "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    Tempat Lahir
                  </label>
                  <p className="text-slate-900 font-medium">
                    {candidate.place_of_birth || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    Tanggal Lahir
                  </label>
                  <p className="text-slate-900 font-medium">
                    {toDate(candidate.birthdate)}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    Status Perkawinan
                  </label>
                  <p className="text-slate-900 font-medium capitalize">
                    {candidate.status_perkawinan || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardSurfaceClass}>
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">Pendidikan</h2>
              </div>
              <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    Pendidikan Terakhir
                  </label>
                  <p className="text-slate-900 font-medium">
                    {candidate.last_education || "-"}
                  </p>
                </div>
                <div>
                  <label className="text-xs text-slate-500 uppercase tracking-wide font-semibold block mb-1">
                    Tahun Lulus
                  </label>
                  <p className="text-slate-900 font-medium">
                    {candidate.graduation_year || "-"}
                  </p>
                </div>
              </div>
            </div>

            <div className={cardSurfaceClass}>
              <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900">
                  Alamat Domisili
                </h2>
              </div>
              <div className="p-6">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="text-slate-900 font-medium mb-2">
                    {candidate.address}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                    <span className="rounded-lg border border-slate-200 bg-white px-2 py-1">
                      Kec. {candidate.kecamatan}
                    </span>
                    <span className="rounded-lg border border-slate-200 bg-white px-2 py-1">
                      Kel. {candidate.kelurahan}
                    </span>
                    <span className="rounded-lg border border-slate-200 bg-white px-2 py-1">
                      Kode Pos: {candidate.postal_code}
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
