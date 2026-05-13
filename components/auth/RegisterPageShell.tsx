"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LogoWhite } from "../brand/LogoWhite";
import { useSiteSettings } from "../../context/SiteContext";

export type RegisterVariant = "candidate" | "company";

export type RegisterWizardStep = {
  n: number;
  label: string;
  icon: string;
};

const VARIANT: Record<RegisterVariant, { icon: string; panelLine: string }> = {
  candidate: {
    icon: "ri-user-smile-line",
    panelLine:
      "Lengkapi tiap langkah — data Anda dilindungi dan hanya dipakai untuk layanan ketenagakerjaan.",
  },
  company: {
    icon: "ri-building-4-line",
    panelLine:
      "Beberapa langkah lagi, perusahaan Anda siap mengelola lowongan dari satu dasbor.",
  },
};

function WizardRail({
  steps,
  currentStep,
}: {
  steps: RegisterWizardStep[];
  currentStep: number;
}) {
  const currentIdx = useMemo(
    () =>
      Math.max(
        0,
        steps.findIndex((s) => s.n === currentStep),
      ),
    [steps, currentStep],
  );

  return (
    <nav className="mt-8 flex flex-col" aria-label="Langkah pendaftaran">
      {steps.map((s, idx) => {
        const stepIdx = steps.findIndex((x) => x.n === s.n);
        const done = currentIdx > stepIdx;
        const active = currentIdx === stepIdx;

        return (
          <div key={s.n} className="relative flex gap-3 pb-1 last:pb-0">
            {idx < steps.length - 1 ? (
              <div
                className={`absolute left-[18px] top-10 bottom-0 w-0.5 ${done ? "bg-secondary/80" : "bg-white/15"}`}
                aria-hidden
              />
            ) : null}
            <div
              className={`relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm transition-colors ${
                active
                  ? "border-secondary bg-white/15 text-secondary shadow-[0_0_0_4px_rgba(255,255,255,0.12)]"
                  : done
                    ? "border-white/40 bg-white/10 text-white"
                    : "border-white/20 bg-white/5 text-white/45"
              }`}
            >
              {done ? (
                <i className="ri-check-line text-base font-bold" aria-hidden />
              ) : (
                <i className={s.icon} aria-hidden />
              )}
            </div>
            <div className="min-w-0 pb-6 pt-0.5">
              <p
                className={`text-sm font-semibold leading-tight ${active ? "text-white" : done ? "text-white/85" : "text-white/45"}`}
              >
                {s.label}
              </p>
              {active ? (
                <p className="text-xs text-white/65 mt-1">Sedang diisi</p>
              ) : done ? (
                <p className="text-xs text-emerald-100/80 mt-1">Selesai</p>
              ) : (
                <p className="text-xs text-white/35 mt-1">Belum</p>
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default function RegisterPageShell({
  variant,
  heroTitle,
  heroSubtitle,
  wizard,
  children,
  belowCard,
}: {
  variant: RegisterVariant;
  heroTitle: string;
  heroSubtitle: string;
  wizard: { currentStep: number; steps: RegisterWizardStep[] };
  children: React.ReactNode;
  belowCard?: React.ReactNode;
}) {
  const { settings } = useSiteSettings();
  const v = VARIANT[variant];
  const [contentEntered, setContentEntered] = useState(false);

  const currentIdx = useMemo(
    () =>
      Math.max(
        0,
        wizard.steps.findIndex((s) => s.n === wizard.currentStep),
      ),
    [wizard.currentStep, wizard.steps],
  );
  const progressPct = useMemo(() => {
    if (wizard.steps.length === 0) return 0;
    return Math.round(((currentIdx + 1) / wizard.steps.length) * 100);
  }, [currentIdx, wizard.steps.length]);
  const currentLabel =
    wizard.steps[currentIdx]?.label ?? `Langkah ${currentIdx + 1}`;

  useEffect(() => {
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      if (!cancelled) setContentEntered(true);
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="relative w-full min-h-dvh flex flex-col overflow-x-hidden bg-slate-100/90">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-slate-100 via-white to-emerald-50/50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-72 w-72 rounded-full bg-primary/8 blur-3xl -z-10"
        aria-hidden
      />

      <div className="flex flex-1 min-h-0 min-w-0 flex-col lg:flex-row">
        {/* Desktop: wizard rail */}
        <aside className="relative hidden lg:flex lg:w-[min(22rem,32vw)] xl:w-80 shrink-0 flex-col border-r border-white/10 bg-gradient-to-b from-[#1a3f18] via-primary to-[#2d7a26] text-white px-7 py-10 xl:px-9">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
            aria-hidden
          />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors mb-6 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <i className="ri-arrow-left-line text-lg group-hover:-translate-x-0.5 transition-transform" />
            Beranda
          </Link>

          <div className="mb-5">
            <LogoWhite
              alt={settings.instansi_nama}
              wrapperClassName="h-14 w-[min(100%,200px)]"
              sizes="200px"
              fallbackIconClass={`${v.icon} text-3xl`}
            />
          </div>

          <h1 className="text-xl xl:text-2xl font-bold tracking-tight leading-snug">
            {heroTitle}
          </h1>
          <p className="mt-2 text-sm text-white/80 leading-relaxed">
            {heroSubtitle}
          </p>
          <p className="mt-4 text-xs text-white/65 leading-relaxed border-l-2 border-secondary/80 pl-3">
            {v.panelLine}
          </p>

          <WizardRail steps={wizard.steps} currentStep={wizard.currentStep} />

          <div className="mt-auto pt-8 flex flex-wrap gap-2 text-[11px] text-white/60">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <i className="ri-lock-2-line text-secondary" />
              Aman
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1">
              <i className="ri-time-line text-secondary" />
              Simpan progres di tiap langkah
            </span>
          </div>
        </aside>

        {/* Main: mobile top strip + scroll */}
        <section
          className="flex flex-1 min-h-0 min-w-0 flex-col"
          aria-label="Formulir pendaftaran"
        >
          {/* Mobile / tablet: progress + judul */}
          <div className="shrink-0 border-b border-emerald-900/10 bg-gradient-to-r from-[#1a3f18] to-primary px-4 py-4 text-white lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-xs text-white/90 hover:text-white rounded-md focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:outline-none"
              >
                <i className="ri-arrow-left-line" />
                Beranda
              </Link>
              <span className="text-xs font-medium text-white/90 whitespace-nowrap">
                {currentIdx + 1}/{wizard.steps.length}
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-white truncate">
              {currentLabel}
            </p>
            <div
              className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/20"
              role="progressbar"
              aria-valuenow={progressPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Progres pendaftaran"
            >
              <div
                className="h-full rounded-full bg-secondary transition-[width] duration-300 ease-out"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
            <div className="flex min-h-full flex-col py-2">
              <div
                className={`mx-auto my-auto w-full max-w-4xl lg:max-w-[52rem] space-y-5 motion-safe:transition-[opacity,transform] motion-safe:duration-500 motion-safe:ease-out opacity-0 translate-y-2 motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
                  contentEntered ? "opacity-100 translate-y-0" : ""
                }`}
              >
                {children}
                {belowCard ? (
                  <div className="text-center text-sm text-gray-600 pt-1">
                    {belowCard}
                  </div>
                ) : null}
                <p className="text-center text-xs text-gray-400 pt-3 pb-1">
                  © {new Date().getFullYear()} Dinas Tenaga Kerja. Hak cipta
                  dilindungi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
