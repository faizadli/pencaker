"use client";
import Link from "next/link";

const laporanItems = [
  {
    href: "/dashboard/laporan/lowongan",
    title: "Laporan Lowongan & Penempatan",
    description:
      "Laporan detail mengenai lowongan kerja yang tersedia dan status penempatan pencari kerja.",
    icon: "ri-briefcase-line",
    accent:
      "from-emerald-50 to-white text-emerald-700 ring-emerald-200/80 group-hover:from-emerald-600 group-hover:to-emerald-600 group-hover:text-white",
    badge: "Operasional",
  },
  {
    href: "/dashboard/laporan/ipk",
    title: "Laporan IPK",
    description:
      "Laporan Ikhtisar Statistik Pasar Kerja (IPK) meliputi data pencari kerja, lowongan, dan penempatan.",
    icon: "ri-file-chart-line",
    accent:
      "from-secondary/20 to-white text-amber-700 ring-amber-200/80 group-hover:from-amber-500 group-hover:to-amber-500 group-hover:text-white",
    badge: "Statistik",
  },
  {
    href: "/dashboard/laporan/rekap-pencaker",
    title: "Rekap Data Pencaker",
    description:
      "Laporan rekapitulasi data pencari kerja per bulan dengan format Excel yang detail.",
    icon: "ri-file-user-line",
    accent:
      "from-sky-50 to-white text-sky-700 ring-sky-200/80 group-hover:from-sky-600 group-hover:to-sky-600 group-hover:text-white",
    badge: "Ekspor",
  },
] as const;

export default function LaporanPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-50 to-slate-100/90 pt-20 pb-12 transition-[margin] duration-300 motion-reduce:transition-none lg:ml-64">
      <div className="w-full space-y-8">
        <header className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.03]">
          <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
          <div className="p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Laporan
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Menu laporan
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Pilih jenis laporan yang ingin ditampilkan untuk analisis,
              monitoring operasional, atau ekspor data.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200/90 bg-white/90 p-6 shadow-sm ring-1 ring-slate-950/[0.02] backdrop-blur-sm sm:p-8">
          <div className="mb-6 flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Katalog laporan
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Tersedia {laporanItems.length} jenis laporan untuk kebutuhan
                pelaporan dan rekap data.
              </p>
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              <i className="ri-folder-chart-line" />
              Pilih salah satu laporan
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {laporanItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02] transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-md motion-reduce:transform-none"
              >
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-br from-slate-50/95 to-white p-5">
                  <div className="min-w-0">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200/80">
                      {item.badge}
                    </span>
                    <h3 className="mt-3 text-lg font-bold leading-tight text-slate-900 transition-colors group-hover:text-primary">
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} ring-1 transition-all duration-200`}
                  >
                    <i
                      className={`${item.icon} text-2xl leading-none transition-colors duration-200 group-hover:text-white`}
                    />
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 text-sm font-medium text-primary">
                  <span>Buka laporan</span>
                  <i className="ri-arrow-right-line text-base transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
