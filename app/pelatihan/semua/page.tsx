"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Input } from "../../../components/ui/field";
import Pagination from "../../../components/ui/Pagination";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import {
  TrainingProgramCard,
  mapPublicProgram,
  type ProgramCardData,
} from "../../../components/pelatihan/TrainingProgramCard";
import { getPublicTrainingAlumniPrograms } from "../../../services/training-alumni";

export default function SemuaProgramPelatihanPage() {
  const [programs, setPrograms] = useState<ProgramCardData[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setSearch(searchInput.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await getPublicTrainingAlumniPrograms({
          page,
          limit: pageSize,
          search: search || undefined,
        });
        if (!cancelled) {
          setPrograms((res.data || []).map(mapPublicProgram));
          setTotal(res.pagination?.total ?? 0);
        }
      } catch {
        if (!cancelled) {
          setPrograms([]);
          setTotal(0);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [page, pageSize, search]);

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-slate-800 selection:bg-primary/15 selection:text-emerald-950 [font-feature-settings:'cv02','cv03']">
      <section className="public-hero relative py-10 sm:py-12 ring-1 ring-black/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Link
            href="/pelatihan"
            className="landing-focus inline-flex items-center gap-2 text-sm font-medium text-white/90 transition hover:text-white"
          >
            <i className="ri-arrow-left-line" aria-hidden />
            Kembali ke Bidang Pelatihan
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-balance drop-shadow-sm sm:text-3xl md:text-4xl">
            Semua Program Pelatihan
          </h1>
          <p className="mt-2 text-sm text-white/90 sm:text-base max-w-2xl">
            Daftar lengkap program pelatihan yang tercatat di sistem Disnaker
            Kabupaten Paser.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-gradient-to-b from-slate-50 via-gray-50/95 to-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex-1 max-w-md">
              <Input
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Cari nama program atau lembaga..."
              />
            </div>
            <p className="text-sm text-slate-500 shrink-0">
              {loading ? "Memuat..." : `${total} program ditemukan`}
            </p>
          </div>

          {loading ? (
            <FullPageLoading isSection />
          ) : programs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((pel) => (
                  <TrainingProgramCard key={pel.id} pel={pel} />
                ))}
              </div>
              <div className="mt-8">
                <Pagination
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                  pageSizeOptions={[12, 24, 48]}
                />
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 p-12 text-center shadow-md ring-1 ring-black/[0.02]">
              <i
                className="ri-graduation-cap-line text-4xl text-slate-300"
                aria-hidden
              />
              <p className="mt-4 text-slate-600">
                {search
                  ? "Tidak ada program yang cocok dengan pencarian Anda."
                  : "Belum ada program pelatihan yang tercatat di sistem."}
              </p>
              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearch("");
                  }}
                  className="landing-focus mt-4 text-sm font-medium text-primary hover:underline"
                >
                  Reset pencarian
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
