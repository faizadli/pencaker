"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoWhite } from "../brand/LogoWhite";
import { useSiteSettings } from "../../context/SiteContext";

export type LoginVariant = "candidate" | "company" | "admin";

const VARIANT: Record<LoginVariant, { icon: string; panelLine: string }> = {
  candidate: {
    icon: "ri-user-smile-line",
    panelLine: "Akses lamaran, pelatihan, dan profil ketenagakerjaan Anda.",
  },
  company: {
    icon: "ri-building-4-line",
    panelLine: "Kelola lowongan dan koneksi dengan pencari kerja terdaftar.",
  },
  admin: {
    icon: "ri-shield-user-line",
    panelLine: "Masuk aman untuk pengelolaan data dan layanan disnaker.",
  },
};

export default function LoginPageShell({
  variant,
  heroTitle,
  heroSubtitle,
  cardTitle,
  cardDescription,
  children,
  belowForm,
}: {
  variant: LoginVariant;
  heroTitle: string;
  heroSubtitle: string;
  cardTitle: string;
  cardDescription?: string;
  children: React.ReactNode;
  belowForm?: React.ReactNode;
}) {
  const { settings } = useSiteSettings();
  const v = VARIANT[variant];
  const [cardEntered, setCardEntered] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const id = window.requestAnimationFrame(() => {
      if (!cancelled) setCardEntered(true);
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(id);
    };
  }, []);

  return (
    <div className="relative w-full min-h-dvh flex flex-col lg:flex-row lg:items-stretch overflow-x-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 via-white to-emerald-50/35"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/12 blur-3xl -z-10 sm:right-10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-secondary/25 blur-3xl -z-10 lg:left-[20%]"
        aria-hidden
      />

      <section className="relative flex flex-col justify-between px-6 pt-10 pb-8 lg:pb-12 lg:px-11 lg:pt-14 lg:w-[min(44%,520px)] lg:min-h-dvh text-white bg-gradient-to-br from-[#1a3f18] via-primary to-[#3d9a28] overflow-hidden shrink-0">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-16 top-1/4 h-56 w-56 rounded-full bg-white/10 blur-2xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-8 bottom-20 h-40 w-40 rounded-full border border-white/15 rotate-12 opacity-40"
          aria-hidden
        />

        <div className="relative z-[1] max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/85 hover:text-white transition-colors mb-8 group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            <i className="ri-arrow-left-line text-lg group-hover:-translate-x-0.5 transition-transform" />
            Kembali ke beranda
          </Link>

          <div className="mb-8">
            <LogoWhite
              alt={settings.instansi_nama}
              wrapperClassName="h-24 w-[min(100%,280px)] sm:h-28 sm:w-[min(100%,320px)]"
              sizes="(max-width: 1024px) 280px, 320px"
              priority
              fallbackIconClass={`${v.icon} text-5xl sm:text-6xl`}
            />
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
            {heroTitle}
          </h1>
          <p className="mt-3 text-base text-white/85 leading-relaxed max-w-sm">
            {heroSubtitle}
          </p>
          <p className="mt-6 text-sm text-white/75 leading-relaxed border-l-2 border-secondary/90 pl-4 max-w-sm">
            {v.panelLine}
          </p>
        </div>

        <div className="relative z-[1] mt-10 lg:mt-0 hidden sm:flex flex-wrap gap-3 text-xs text-white/65">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <i className="ri-lock-2-line text-secondary" />
            Koneksi terenkripsi
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur-sm">
            <i className="ri-government-line text-secondary" />
            Layanan Disnaker
          </span>
        </div>
      </section>

      <section
        className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:px-8 lg:py-14 min-w-0"
        aria-labelledby="login-card-title"
      >
        <div className="w-full max-w-[440px]">
          <div
            className={`rounded-2xl border border-gray-200/80 bg-white/95 backdrop-blur-md shadow-[0_20px_70px_-15px_rgba(46,116,43,0.18)] ring-1 ring-black/[0.03] p-8 sm:p-10 transition-shadow duration-300 hover:shadow-[0_28px_90px_-18px_rgba(46,116,43,0.22)] motion-safe:transition-[opacity,transform,box-shadow] motion-safe:duration-500 motion-safe:ease-out opacity-0 translate-y-2 motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
              cardEntered ? "opacity-100 translate-y-0" : ""
            }`}
          >
            <h2
              id="login-card-title"
              className="text-2xl font-bold text-gray-900 tracking-tight"
            >
              {cardTitle}
            </h2>
            {cardDescription ? (
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                {cardDescription}
              </p>
            ) : null}
            <div className="mt-8">{children}</div>
            {belowForm ? (
              <div className="mt-8 pt-6 border-t border-gray-100/90 text-center text-sm text-gray-600 leading-relaxed">
                {belowForm}
              </div>
            ) : null}
          </div>
          <p className="mt-8 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Dinas Tenaga Kerja. Hak cipta
            dilindungi.
          </p>
        </div>
      </section>
    </div>
  );
}
