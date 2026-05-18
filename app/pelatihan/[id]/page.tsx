"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import Pagination from "../../../components/ui/Pagination";
import StatCard from "../../../components/ui/StatCard";
import {
  getPublicTrainingAlumniProgram,
  getPublicTrainingAlumniProgramParticipants,
  type PublicTrainingProgram,
  type PublicTrainingAlumniParticipant,
} from "../../../services/training-alumni";

const cardSurfaceClass =
  "rounded-2xl border border-slate-200/90 bg-white/95 shadow-md ring-1 ring-black/[0.02] backdrop-blur-sm";
const primaryButtonClass =
  "landing-focus inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark px-4 py-2.5 text-sm font-medium text-white shadow-md shadow-primary/20 transition hover:brightness-110";

export default function DetailPelatihanPage() {
  const params = useParams();
  const rawId = String(params?.id || "");
  const [program, setProgram] = useState<PublicTrainingProgram | null>(null);
  const [participants, setParticipants] = useState<
    PublicTrainingAlumniParticipant[]
  >([]);
  const [participantsTotal, setParticipantsTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [programLoading, setProgramLoading] = useState(true);
  const [participantsLoading, setParticipantsLoading] = useState(false);
  const [error, setError] = useState("");

  const trainingName = useMemo(() => {
    if (!rawId) return "";
    try {
      return decodeURIComponent(rawId);
    } catch {
      return rawId;
    }
  }, [rawId]);

  useEffect(() => {
    setPage(1);
  }, [rawId]);

  useEffect(() => {
    if (!trainingName) return;
    let cancelled = false;
    (async () => {
      setProgramLoading(true);
      setError("");
      try {
        const prog = await getPublicTrainingAlumniProgram(trainingName);
        if (!cancelled) setProgram(prog.data);
      } catch (e) {
        if (!cancelled) {
          setProgram(null);
          setError(
            e instanceof Error ? e.message : "Gagal memuat detail pelatihan",
          );
        }
      } finally {
        if (!cancelled) setProgramLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [trainingName]);

  useEffect(() => {
    if (!trainingName || programLoading || !program) return;
    let cancelled = false;
    (async () => {
      setParticipantsLoading(true);
      try {
        const part = await getPublicTrainingAlumniProgramParticipants(
          trainingName,
          { page, limit: pageSize },
        );
        if (!cancelled) {
          setParticipants(part.data || []);
          setParticipantsTotal(part.pagination?.total ?? 0);
        }
      } catch {
        if (!cancelled) {
          setParticipants([]);
          setParticipantsTotal(0);
        }
      } finally {
        if (!cancelled) setParticipantsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [trainingName, program, programLoading, page, pageSize]);

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

  if (programLoading) return <FullPageLoading />;

  if (error || !program)
    return (
      <main className="min-h-screen bg-white font-sans antialiased text-slate-800">
        <section className="py-16 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className={`${cardSurfaceClass} p-8`}>
              <p className="text-slate-600">
                {error || "Program pelatihan tidak ditemukan"}
              </p>
              <Link href="/pelatihan" className={`${primaryButtonClass} mt-6`}>
                <i className="ri-arrow-left-line" aria-hidden />
                Kembali ke daftar pelatihan
              </Link>
            </div>
          </div>
        </section>
      </main>
    );

  const period =
    program.start_date && program.end_date
      ? `${toDate(program.start_date)} – ${toDate(program.end_date)}`
      : program.start_date
        ? `Mulai ${toDate(program.start_date)}`
        : "-";

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
      <section className="public-hero relative py-10 sm:py-12 ring-1 ring-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/pelatihan"
            className="landing-focus inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" aria-hidden />
            Kembali ke daftar pelatihan
          </Link>
          <div className="mt-6">
            <h1 className="text-2xl font-bold text-balance drop-shadow-sm sm:text-3xl md:text-4xl">
              {program.training_name}
            </h1>
            <p className="mt-2 flex items-center gap-2 text-sm text-white/90 sm:text-base">
              <i className="ri-building-line" aria-hidden />
              {program.institution_name || "UPT BLK"}
            </p>
            {program.training_year > 0 && (
              <span className="mt-4 inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20">
                <i className="ri-calendar-line" aria-hidden />
                Tahun {program.training_year}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <StatCard
              title="Peserta tercatat"
              value={program.participant_count}
              change="Alumni / peserta program ini"
              color="var(--color-primary)"
              icon="ri-user-line"
            />
            <StatCard
              title="Periode"
              value={period}
              change="Jadwal pelaksanaan"
              color="var(--color-secondary)"
              icon="ri-time-line"
            />
            <StatCard
              title="Lembaga"
              value={program.institution_name || "-"}
              change="Penyelenggara pelatihan"
              color="#0ea5e9"
              icon="ri-building-line"
            />
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="min-w-0 lg:col-span-2">
              <div className={`${cardSurfaceClass} p-6 sm:p-8`}>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  Peserta program ({program.participant_count})
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Daftar peserta yang tercatat dalam sistem Disnaker
                </p>
                {participantsLoading ? (
                  <div className="mt-8 flex justify-center py-10">
                    <i
                      className="ri-loader-4-line animate-spin text-2xl text-primary"
                      aria-hidden
                    />
                    <span className="sr-only">Memuat peserta...</span>
                  </div>
                ) : participantsTotal > 0 ? (
                  <>
                    <ul className="mt-6 divide-y divide-slate-100">
                      {participants.map((p) => (
                        <li key={p.id} className="first:pt-0">
                          <Link
                            href={`/pelatihan/peserta/${encodeURIComponent(p.id)}`}
                            className="landing-focus flex items-start gap-3 py-4 -mx-2 px-2 rounded-xl transition hover:bg-slate-50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-sm font-bold text-primary ring-1 ring-emerald-100">
                              {p.full_name.charAt(0).toUpperCase() || "?"}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-slate-900">
                                {p.full_name}
                              </p>
                              <div className="mt-1 flex flex-wrap gap-2">
                                {p.last_education && (
                                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
                                    {p.last_education}
                                  </span>
                                )}
                                {p.gender && (
                                  <span className="inline-flex rounded-full bg-sky-50 px-2 py-0.5 text-xs text-sky-800">
                                    {p.gender === "L"
                                      ? "Laki-laki"
                                      : "Perempuan"}
                                  </span>
                                )}
                                {p.training_year > 0 && (
                                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-xs text-primary">
                                    {p.training_year}
                                  </span>
                                )}
                              </div>
                            </div>
                            <i
                              className="ri-arrow-right-s-line mt-2 shrink-0 text-slate-400"
                              aria-hidden
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 min-w-0 border-t border-slate-100 pt-2">
                      <Pagination
                        page={page}
                        pageSize={pageSize}
                        total={participantsTotal}
                        onPageChange={setPage}
                        onPageSizeChange={(size) => {
                          setPageSize(size);
                          setPage(1);
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <p className="mt-6 text-sm text-slate-500">
                    Belum ada peserta tercatat untuk program ini.
                  </p>
                )}
              </div>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className={`${cardSurfaceClass} overflow-hidden`}>
                <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
                <div className="p-5 sm:p-6 space-y-4">
                  <h3 className="font-bold text-slate-900">
                    Informasi program
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                      <dt className="text-slate-500">Lembaga</dt>
                      <dd className="font-medium text-slate-800 text-right">
                        {program.institution_name || "-"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-slate-100 pb-3">
                      <dt className="text-slate-500">Tahun</dt>
                      <dd className="font-medium text-slate-800 text-right">
                        {program.training_year || "-"}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-3">
                      <dt className="text-slate-500">Periode</dt>
                      <dd className="font-medium text-slate-800 text-right">
                        {period}
                      </dd>
                    </div>
                  </dl>
                  {program.registration_slug && (
                    <Link
                      href={`/daftar-pelatihan/${encodeURIComponent(program.registration_slug)}`}
                      className={`${primaryButtonClass} w-full`}
                    >
                      <i className="ri-edit-line" aria-hidden />
                      Daftar pelatihan
                    </Link>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
