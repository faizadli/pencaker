"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../../components/ui/FullPageLoading";
import {
  getPublicTrainingAlumniParticipant,
  type PublicTrainingAlumniParticipantDetail,
} from "../../../../services/training-alumni";

const cardSurfaceClass =
  "rounded-2xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm";
const primaryButtonClass =
  "landing-focus inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/20 transition hover:brightness-110";

export default function DetailPesertaPage() {
  const params = useParams();
  const id = String(params?.id || "");
  const [participant, setParticipant] =
    useState<PublicTrainingAlumniParticipantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const resp = await getPublicTrainingAlumniParticipant(id);
        setParticipant(resp.data);
      } catch (e) {
        setParticipant(null);
        setError(e instanceof Error ? e.message : "Gagal memuat data peserta");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const toDate = (s?: string | null) => {
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

  if (loading) return <FullPageLoading />;

  if (error || !participant)
    return (
      <main className="min-h-screen bg-white font-sans antialiased text-slate-800">
        <section className="py-16 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className={`${cardSurfaceClass} p-8`}>
              <p className="text-slate-600">
                {error || "Data peserta tidak ditemukan"}
              </p>
              <Link href="/pelatihan" className={`${primaryButtonClass} mt-6`}>
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke pelatihan
              </Link>
            </div>
          </div>
        </section>
      </main>
    );

  const programHref = `/pelatihan/${encodeURIComponent(participant.training_name)}`;
  const period =
    participant.start_date && participant.end_date
      ? `${toDate(participant.start_date)} – ${toDate(participant.end_date)}`
      : participant.start_date
        ? `Mulai ${toDate(participant.start_date)}`
        : "-";

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
      <section className="public-hero relative py-10 sm:py-12 ring-1 ring-black/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link
            href={programHref}
            className="landing-focus inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" aria-hidden />
            Kembali ke program pelatihan
          </Link>
          <div className="mt-8 flex flex-col items-center gap-4 text-center sm:flex-row sm:items-end sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-white/15 text-3xl font-bold text-white ring-2 ring-white/25">
              {participant.full_name.charAt(0).toUpperCase() || "?"}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-bold drop-shadow-sm sm:text-3xl">
                {participant.full_name}
              </h1>
              <p className="mt-2 text-sm text-white/90 sm:text-base">
                Peserta program — {participant.training_name}
              </p>
              {participant.training_year > 0 && (
                <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                  <i className="ri-calendar-line" aria-hidden />
                  Tahun {participant.training_year}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <div className={`${cardSurfaceClass} p-6 sm:p-8`}>
                <h2 className="text-lg font-bold text-slate-900">
                  Informasi peserta
                </h2>
                <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Jenis kelamin
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900">
                      {participant.gender === "L"
                        ? "Laki-laki"
                        : participant.gender === "P"
                          ? "Perempuan"
                          : "-"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Pendidikan terakhir
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900">
                      {participant.last_education || "-"}
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                      Tempat, tanggal lahir
                    </dt>
                    <dd className="mt-1 font-medium text-slate-900">
                      {[participant.birth_place, toDate(participant.birth_date)]
                        .filter((v) => v && v !== "-")
                        .join(", ") || "-"}
                    </dd>
                  </div>
                  {participant.address && (
                    <div className="sm:col-span-2">
                      <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                        Alamat
                      </dt>
                      <dd className="mt-1 font-medium text-slate-900 leading-relaxed">
                        {participant.address}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>

            <aside>
              <div className={`${cardSurfaceClass} overflow-hidden`}>
                <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
                <div className="p-5 sm:p-6 space-y-4">
                  <h3 className="font-bold text-slate-900">
                    Program pelatihan
                  </h3>
                  <p className="text-sm font-semibold text-primary leading-snug">
                    {participant.training_name}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <i className="ri-building-line shrink-0" aria-hidden />
                    {participant.institution_name || "UPT BLK"}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <i className="ri-time-line shrink-0" aria-hidden />
                    {period}
                  </p>
                  <Link
                    href={programHref}
                    className={`${primaryButtonClass} w-full`}
                  >
                    <i className="ri-briefcase-line" aria-hidden />
                    Lihat program
                  </Link>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-500">
                Data peserta dicatat dalam rekap pelatihan Disnaker. Informasi
                sensitif tidak ditampilkan di halaman publik.
              </p>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
