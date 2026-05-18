import Link from "next/link";
import type { PublicTrainingProgram } from "../../services/training-alumni";

export type ProgramCardData = {
  id: string;
  title: string;
  instructor?: string;
  status?: string;
  quota?: number;
  startDate?: string;
  endDate?: string;
  registrationSlug?: string | null;
};

export function mapPublicProgram(p: PublicTrainingProgram): ProgramCardData {
  return {
    id: encodeURIComponent(p.training_name),
    title: p.training_name,
    instructor: p.institution_name || "UPT BLK",
    status: p.training_year ? `Tahun ${p.training_year}` : undefined,
    quota: p.participant_count,
    startDate: p.start_date || undefined,
    endDate: p.end_date || undefined,
    registrationSlug: p.registration_slug,
  };
}

function formatDateId(s?: string) {
  if (!s) return "";
  try {
    return new Date(s).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return s;
  }
}

export function TrainingProgramCard({ pel }: { pel: ProgramCardData }) {
  const period =
    pel.startDate && pel.endDate
      ? `${formatDateId(pel.startDate)} – ${formatDateId(pel.endDate)}`
      : pel.startDate
        ? `Mulai ${formatDateId(pel.startDate)}`
        : null;

  return (
    <Link
      href={`/pelatihan/${pel.id}`}
      className="landing-focus block bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-xl hover:border-primary/25 border border-slate-200/90 ring-1 ring-black/[0.02] transition-all group h-full"
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-primary ring-1 ring-emerald-100">
          <i className="ri-graduation-cap-line text-xl" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-primary text-lg line-clamp-2">
            {pel.title}
          </h3>
          <p className="text-gray-600 truncate mt-0.5">
            {pel.instructor || "UPT BLK"}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
        {pel.status && (
          <div className="flex items-center gap-2 text-gray-600">
            <i className="ri-calendar-line" aria-hidden />
            <span>{pel.status}</span>
          </div>
        )}
        {period && (
          <div className="flex items-center gap-2 text-gray-600 sm:col-span-2">
            <i className="ri-time-line" aria-hidden />
            <span>{period}</span>
          </div>
        )}
        {typeof pel.quota === "number" && pel.quota > 0 && (
          <div className="flex items-center gap-2 text-gray-600">
            <i className="ri-user-line" aria-hidden />
            <span>{pel.quota} peserta tercatat</span>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-4 border-t border-slate-200">
        <span className="text-xs text-gray-500">
          {pel.registrationSlug
            ? "Pendaftaran online tersedia"
            : "Lihat detail program"}
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
          Lihat detail
          <i className="ri-arrow-right-line" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
