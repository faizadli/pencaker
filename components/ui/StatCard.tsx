"use client";

export default function StatCard({
  title,
  value,
  change,
  color,
  icon,
}: {
  title: string;
  value: number | string;
  change: string;
  color: string;
  icon: string;
}) {
  const displayValue =
    typeof value === "number"
      ? new Intl.NumberFormat("id-ID").format(value)
      : value;
  const isLightAccent =
    color.includes("secondary") ||
    color.toLowerCase() === "#f4d348" ||
    color.toLowerCase() === "rgb(244, 211, 72)";
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm ring-1 ring-slate-950/[0.02] transition-[box-shadow,transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-slate-300/90 hover:shadow-md motion-reduce:transform-none">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 opacity-90"
        style={{ backgroundColor: color }}
        aria-hidden
      />
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {title}
          </p>
          <p className="mt-1.5 font-bold tracking-tight text-slate-900 text-2xl tabular-nums sm:text-3xl">
            {displayValue}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">
            {change}
          </p>
        </div>
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-inner ring-1 ${
            isLightAccent
              ? "text-slate-900 ring-slate-900/10"
              : "text-white ring-white/25"
          }`}
          style={{ backgroundColor: color }}
        >
          <i className={`${icon} text-xl leading-none`} />
        </div>
      </div>
    </div>
  );
}
