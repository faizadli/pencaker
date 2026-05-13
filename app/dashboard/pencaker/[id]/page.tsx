"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import { getCandidateProfileById } from "../../../../services/profile";
import StatCard from "../../../../components/ui/StatCard";

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
  ak1_placed_at?: string;
  cv_file?: string;
  resume_text?: string;
};

export default function DetailPencakerPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const [candidate, setCandidate] = useState<CandidateDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const resp = await getCandidateProfileById(id);
        setCandidate(resp.data as CandidateDetail);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

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
  const ak1MetaText =
    candidate.ak1_status === "PLACED" && candidate.ak1_placed_at
      ? `Sejak ${toDate(candidate.ak1_placed_at)}`
      : "Status administrasi pencaker";

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
                Kembali ke daftar pencaker
              </button>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-primary">
                Detail pencari kerja
              </p>
              <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                {candidate.full_name}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
                Review profil pencari kerja, status AK1, dokumen, dan informasi
                pendidikan dari satu halaman.
              </p>
            </div>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${getAk1StatusClass(
                candidate.ak1_status,
              )}`}
            >
              <i className="ri-file-list-3-line" aria-hidden />
              AK1 {getAk1StatusLabel(candidate.ak1_status)}
            </span>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5">
            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Ringkasan kandidat
            </h2>
            <p className="text-sm text-slate-500">
              Sorotan cepat untuk identitas, pendidikan, dan kesiapan
              administrasi AK1.
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
              title="Status AK1"
              value={getAk1StatusLabel(candidate.ak1_status)}
              change={ak1MetaText}
              color="var(--color-foreground)"
              icon="ri-file-list-3-line"
            />
            <StatCard
              title="Bergabung"
              value={toDate(candidate.created_at)}
              change="Tanggal registrasi"
              color="var(--color-danger)"
              icon="ri-calendar-line"
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.38fr_0.62fr]">
          <div className="space-y-6">
            <section className={`${cardSurfaceClass} p-6 text-center`}>
              <div className="relative mx-auto mb-4 h-32 w-32">
                {candidate.photo_profile ? (
                  <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-gray-100 shadow-md">
                    <Image
                      src={candidate.photo_profile}
                      alt={candidate.full_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-primary/10 text-4xl font-bold text-primary shadow-md">
                    {candidate.full_name.charAt(0).toUpperCase()}
                  </div>
                )}
                {(candidate.ak1_status === "APPROVED" ||
                  candidate.ak1_status === "PLACED") && (
                  <div
                    className={`absolute bottom-1 right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white ${
                      candidate.ak1_status === "PLACED"
                        ? "bg-sky-500"
                        : "bg-emerald-500"
                    }`}
                    title={
                      candidate.ak1_status === "PLACED"
                        ? "Sudah Ditempatkan"
                        : "AK1 Terverifikasi"
                    }
                  >
                    <i className="ri-check-line text-xs text-white" />
                  </div>
                )}
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                {candidate.full_name}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {candidate.email || "-"}
              </p>

              <div className="mt-4 flex justify-center">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getAk1StatusClass(
                    candidate.ak1_status,
                  )}`}
                >
                  AK1: {getAk1StatusLabel(candidate.ak1_status)}
                </span>
              </div>

              <div className="mt-6 space-y-3 border-t border-slate-100 pt-4 text-left">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-phone-line text-slate-400" />
                  <span>{candidate.no_handphone || "-"}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-map-pin-line text-slate-400" />
                  <span className="truncate">
                    {candidate.kecamatan || "-"}, {candidate.kelurahan || "-"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <i className="ri-calendar-line text-slate-400" />
                  <span>Bergabung {toDate(candidate.created_at)}</span>
                </div>
              </div>
            </section>

            <section className={`${cardSurfaceClass} p-6`}>
              <h3 className="mb-4 flex items-center gap-2 font-bold text-slate-900">
                <i className="ri-file-text-line text-primary" />
                Dokumen
              </h3>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900">
                      Curriculum Vitae (CV) / Resume
                    </h4>
                    <p className="mt-1 text-xs text-slate-500">
                      Dokumen CV atau text resume kandidat.
                    </p>
                  </div>
                  <div className="rounded-lg bg-white p-2 shadow-sm">
                    <i className="ri-file-text-line text-xl text-blue-500"></i>
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
            </section>
          </div>

          <div className="space-y-6">
            <section className={cardSurfaceClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Informasi pribadi
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    NIK
                  </label>
                  <p className="font-medium text-slate-900">
                    {candidate.nik || "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Jenis Kelamin
                  </label>
                  <p className="font-medium text-slate-900">
                    {candidate.gender === "L"
                      ? "Laki-laki"
                      : candidate.gender === "P"
                        ? "Perempuan"
                        : "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tempat Lahir
                  </label>
                  <p className="font-medium text-slate-900">
                    {candidate.place_of_birth || "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tanggal Lahir
                  </label>
                  <p className="font-medium text-slate-900">
                    {toDate(candidate.birthdate)}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status Perkawinan
                  </label>
                  <p className="font-medium capitalize text-slate-900">
                    {candidate.status_perkawinan || "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Kondisi
                  </label>
                  <p className="font-medium capitalize text-slate-900">
                    {candidate.dis_kondisi || "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Agama
                  </label>
                  <p className="font-medium capitalize text-slate-900">
                    {candidate.agama || "-"}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardSurfaceClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">Pendidikan</h2>
              </div>
              <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Pendidikan Terakhir
                  </label>
                  <p className="font-medium text-slate-900">
                    {candidate.last_education || "-"}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Tahun Lulus
                  </label>
                  <p className="font-medium text-slate-900">
                    {candidate.graduation_year || "-"}
                  </p>
                </div>
              </div>
            </section>

            <section className={cardSurfaceClass}>
              <div className="border-b border-slate-100 p-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Alamat domisili
                </h2>
              </div>
              <div className="p-6">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4">
                  <p className="mb-2 font-medium text-slate-900">
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
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
