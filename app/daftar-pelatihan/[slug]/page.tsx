"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { z } from "zod";
import {
  Input,
  SearchableSelect,
  Textarea,
  type SearchableSelectOption,
} from "../../../components/ui/field";
import FullPageLoading from "../../../components/ui/FullPageLoading";
import { useToast } from "../../../components/ui/Toast";
import {
  getPublicTrainingRegistrationCampaign,
  submitPublicTrainingRegistration,
} from "../../../services/training-registration";

function formatIdDate(s?: string | null): string {
  const raw = String(s ?? "")
    .trim()
    .slice(0, 10);
  if (!raw) return "—";
  const d = new Date(`${raw}T12:00:00`);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const GENDER_OPTIONS: SearchableSelectOption[] = [
  { value: "L", label: "Laki-laki" },
  { value: "P", label: "Perempuan" },
];

const guestFormSchema = z
  .object({
    full_name: z.string().min(1, "Nama wajib diisi"),
    nik: z
      .string()
      .length(16, "NIK harus 16 digit")
      .regex(/^\d+$/, "NIK hanya angka"),
    no_kk: z
      .string()
      .length(16, "Nomor KK harus 16 digit")
      .regex(/^\d+$/, "Nomor KK hanya angka"),
    gender: z.enum(["L", "P"]),
    email: z.string().optional(),
    birth_place: z.string().min(1, "Tempat lahir wajib diisi"),
    birth_date: z.string().min(1, "Tanggal lahir wajib diisi"),
    address: z.string().min(1, "Alamat wajib diisi"),
    phone: z
      .string()
      .min(10, "No. HP minimal 10 digit")
      .max(20)
      .regex(/^\d+$/, "No. HP hanya angka"),
    last_education: z.string().min(1, "Pendidikan terakhir wajib diisi"),
  })
  .superRefine((data, ctx) => {
    const ymd = /^\d{4}-\d{2}-\d{2}$/;
    if (!ymd.test(data.birth_date.slice(0, 10))) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Format tanggal lahir tidak valid",
        path: ["birth_date"],
      });
    }
    const em = (data.email ?? "").trim();
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Email tidak valid",
        path: ["email"],
      });
    }
  });

export default function DaftarPelatihanGuestPage() {
  const params = useParams();
  const slug = String(params?.slug || "");
  const { showSuccess, showError } = useToast();
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<{
    training_name: string;
    institution_name: string;
    start_date: string;
    end_date: string;
    registration_open: boolean;
    registration_enabled: boolean;
    registration_period_status: "upcoming" | "open" | "closed";
  } | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    full_name: "",
    nik: "",
    no_kk: "",
    gender: "L" as "L" | "P",
    email: "",
    birth_place: "",
    birth_date: "",
    address: "",
    phone: "",
    last_education: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      setLoading(false);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await getPublicTrainingRegistrationCampaign(slug);
        if (cancelled) return;
        const enabled = res.data.registration_enabled === false ? false : true;
        setMeta({
          training_name: res.data.training_name,
          institution_name: res.data.institution_name ?? "",
          start_date: res.data.start_date ?? "",
          end_date: res.data.end_date ?? "",
          registration_open: Boolean(res.data.registration_open),
          registration_enabled: enabled,
          registration_period_status: res.data.registration_period_status,
        });
      } catch {
        if (!cancelled) setNotFound(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meta?.registration_open) {
      showError(
        meta && !meta.registration_enabled
          ? "Pendaftaran sedang ditutup oleh admin"
          : meta?.registration_period_status === "upcoming"
            ? "Pendaftaran belum dibuka"
            : "Pendaftaran sudah ditutup",
      );
      return;
    }
    const parsed = guestFormSchema.safeParse(form);
    if (!parsed.success) {
      const ne: Record<string, string> = {};
      parsed.error.issues.forEach((err) => {
        const p = err.path[0];
        if (typeof p === "string") ne[p] = err.message;
      });
      setErrors(ne);
      showError("Periksa kembali isian form");
      return;
    }
    setErrors({});
    setSubmitting(true);
    try {
      await submitPublicTrainingRegistration(slug, {
        full_name: parsed.data.full_name.trim(),
        nik: parsed.data.nik.trim(),
        no_kk: parsed.data.no_kk.trim(),
        gender: parsed.data.gender,
        email: (parsed.data.email ?? "").trim() || undefined,
        birth_place: parsed.data.birth_place.trim(),
        birth_date: parsed.data.birth_date.slice(0, 10),
        address: parsed.data.address.trim(),
        phone: parsed.data.phone.replace(/\s/g, "").trim(),
        last_education: parsed.data.last_education.trim(),
      });
      setSubmitted(true);
      showSuccess("Pendaftaran berhasil dikirim");
    } catch (err) {
      showError(err instanceof Error ? err.message : "Gagal mengirim");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50/60 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <div className="w-full rounded-3xl border border-slate-200/90 bg-white p-10 text-center shadow-sm ring-1 ring-slate-950/[0.02]">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary">
              Pendaftaran pelatihan
            </p>
            <div className="mt-4">
              <FullPageLoading isSection />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !meta) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50/60 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-sm ring-1 ring-slate-950/[0.02] sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
              <i className="ri-file-search-line text-3xl" aria-hidden />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              Form tidak ditemukan
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Link pendaftaran tidak valid, sudah berakhir, atau tidak lagi
              tersedia.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50/60 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-center">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200/90 bg-white p-8 text-center shadow-sm ring-1 ring-slate-950/[0.02] sm:p-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <i className="ri-checkbox-circle-line text-4xl" aria-hidden />
            </div>
            <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
              Pengajuan berhasil dikirim
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Pendaftaran Anda untuk <strong>{meta.training_name}</strong> telah
              diterima. Tim penyelenggara akan meninjau pengajuan Anda terlebih
              dahulu.
            </p>
            <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4 text-left text-sm text-slate-600">
              <p className="font-medium text-slate-800">Langkah berikutnya</p>
              <p className="mt-1">
                Simpan nomor telepon dan email yang Anda isi agar penyelenggara
                dapat menghubungi Anda jika diperlukan.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const guestRegistrationAvailable =
    meta.registration_open === true &&
    meta.registration_period_status === "open" &&
    meta.registration_enabled !== false;
  const periodLabel =
    meta.start_date || meta.end_date
      ? `${formatIdDate(meta.start_date)} – ${formatIdDate(meta.end_date)}`
      : "Tanpa batas periode tanggal (WIB)";

  if (!guestRegistrationAvailable) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50/60 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.05fr_1fr]">
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]">
              <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Pendaftaran pelatihan
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {meta.training_name}
                </h1>
                {meta.institution_name?.trim() ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {meta.institution_name}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <i className="ri-global-line" aria-hidden />
                    Form publik
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    <i className="ri-calendar-event-line" aria-hidden />
                    {periodLabel}
                  </span>
                </div>
                <div
                  className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-sm leading-relaxed text-amber-950"
                  role="status"
                >
                  {!meta.registration_enabled ? (
                    <p>
                      Pendaftaran untuk pelatihan ini sedang{" "}
                      <strong>ditutup sementara</strong> oleh penyelenggara.
                      Silakan hubungi penyelenggara jika memerlukan informasi
                      lebih lanjut.
                    </p>
                  ) : meta.registration_period_status === "upcoming" ? (
                    <p>
                      Pendaftaran belum dibuka. Form dapat diisi mulai tanggal{" "}
                      <strong>{formatIdDate(meta.start_date)}</strong> (WIB).
                    </p>
                  ) : (
                    <p>
                      Pendaftaran sudah ditutup. Batas akhir pengisian form
                      adalah <strong>{formatIdDate(meta.end_date)}</strong>{" "}
                      (WIB).
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-950/[0.02] sm:p-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-800">
                <i className="ri-door-closed-line text-3xl" aria-hidden />
              </div>
              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Pendaftaran tidak tersedia
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Link publik ini belum bisa digunakan untuk mengirim pengajuan
                baru saat ini.
              </p>
              <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/80 p-4">
                <p className="text-sm font-medium text-slate-800">
                  Anda bisa mencoba kembali nanti atau menghubungi penyelenggara
                  untuk memastikan jadwal pembukaan form.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50/60 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]">
              <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-secondary" />
              <div className="p-6 sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Form publik
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Pendaftaran pelatihan
                </h1>
                <p className="mt-3 text-xl font-semibold leading-tight text-slate-800">
                  {meta.training_name}
                </p>
                {meta.institution_name?.trim() ? (
                  <p className="mt-2 text-sm text-slate-600">
                    {meta.institution_name}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <i className="ri-user-add-line" aria-hidden />
                    Tanpa login
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                    <i className="ri-shield-check-line" aria-hidden />
                    Data diverifikasi admin
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    <i className="ri-calendar-event-line" aria-hidden />
                    {periodLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-950/[0.02]">
              <h2 className="text-lg font-bold text-slate-900">
                Siapkan data berikut
              </h2>
              <div className="mt-4 space-y-3 text-sm text-slate-600">
                <div className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <i className="ri-profile-line" aria-hidden />
                  </span>
                  <p>
                    Pastikan <strong>NIK</strong> sesuai KTP dan{" "}
                    <strong>nomor KK</strong> sesuai kartu keluarga,
                    masing-masing 16 digit angka.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <i className="ri-phone-line" aria-hidden />
                  </span>
                  <p>
                    Gunakan nomor HP dan email yang aktif agar penyelenggara
                    mudah menghubungi Anda.
                  </p>
                </div>
                <div className="flex gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <i className="ri-error-warning-line" aria-hidden />
                  </span>
                  <p>
                    NIK yang pernah tercatat sebagai alumni pelatihan tidak
                    dapat mendaftar kembali pada program ini.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm ring-1 ring-slate-950/[0.02]">
              <h2 className="text-lg font-bold text-slate-900">
                Setelah form dikirim
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Pengajuan Anda akan masuk ke dashboard admin untuk ditinjau.
                Status akhir diputuskan oleh penyelenggara pelatihan.
              </p>
            </div>
          </div>

          <form
            onSubmit={(e) => void handleSubmit(e)}
            className="overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm ring-1 ring-slate-950/[0.02]"
          >
            <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-5 sm:px-8">
              <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                Isi formulir pendaftaran
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Lengkapi data peserta dengan benar agar proses verifikasi
                berjalan lancar.
              </p>
            </div>

            <fieldset className="min-w-0 space-y-6 border-0 p-6 sm:p-8">
              <section className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    Identitas utama
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <Input
                      label="Nama lengkap"
                      value={form.full_name}
                      onChange={(e) => {
                        setForm((f) => ({ ...f, full_name: e.target.value }));
                        if (errors.full_name) {
                          setErrors((s) => {
                            const n = { ...s };
                            delete n.full_name;
                            return n;
                          });
                        }
                      }}
                      error={errors.full_name}
                      required
                    />
                  </div>
                  <Input
                    label="NIK"
                    inputMode="numeric"
                    maxLength={16}
                    value={form.nik}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setForm((f) => ({ ...f, nik: v }));
                      if (errors.nik) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.nik;
                          return n;
                        });
                      }
                    }}
                    error={errors.nik}
                    required
                  />
                  <Input
                    label="Nomor Kartu Keluarga (KK)"
                    inputMode="numeric"
                    maxLength={16}
                    value={form.no_kk}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                      setForm((f) => ({ ...f, no_kk: v }));
                      if (errors.no_kk) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.no_kk;
                          return n;
                        });
                      }
                    }}
                    error={errors.no_kk}
                    required
                  />
                  <SearchableSelect
                    label="Jenis kelamin"
                    options={GENDER_OPTIONS}
                    value={form.gender}
                    onChange={(v) => {
                      setForm((f) => ({ ...f, gender: v === "P" ? "P" : "L" }));
                      if (errors.gender) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.gender;
                          return n;
                        });
                      }
                    }}
                    error={errors.gender}
                    placeholder="Pilih"
                    className="w-full"
                  />
                  <Input
                    label="Pendidikan terakhir"
                    value={form.last_education}
                    onChange={(e) => {
                      setForm((f) => ({
                        ...f,
                        last_education: e.target.value,
                      }));
                      if (errors.last_education) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.last_education;
                          return n;
                        });
                      }
                    }}
                    error={errors.last_education}
                    required
                  />
                </div>
              </section>

              <section className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    Data kelahiran dan kontak
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Input
                    label="Tempat lahir"
                    value={form.birth_place}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, birth_place: e.target.value }));
                      if (errors.birth_place) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.birth_place;
                          return n;
                        });
                      }
                    }}
                    error={errors.birth_place}
                    required
                  />
                  <Input
                    label="Tanggal lahir"
                    type="date"
                    value={form.birth_date}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, birth_date: e.target.value }));
                      if (errors.birth_date) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.birth_date;
                          return n;
                        });
                      }
                    }}
                    error={errors.birth_date}
                    required
                  />
                  <Input
                    label="No. HP"
                    inputMode="numeric"
                    value={form.phone}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, "");
                      setForm((f) => ({ ...f, phone: v }));
                      if (errors.phone) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.phone;
                          return n;
                        });
                      }
                    }}
                    error={errors.phone}
                    required
                  />
                  <Input
                    label="Email (opsional)"
                    type="email"
                    required={false}
                    value={form.email}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, email: e.target.value }));
                      if (errors.email) {
                        setErrors((s) => {
                          const n = { ...s };
                          delete n.email;
                          return n;
                        });
                      }
                    }}
                    error={errors.email}
                  />
                </div>
              </section>

              <section className="space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                    Domisili
                  </h3>
                </div>
                <Textarea
                  label="Alamat"
                  rows={4}
                  value={form.address}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, address: e.target.value }));
                    if (errors.address) {
                      setErrors((s) => {
                        const n = { ...s };
                        delete n.address;
                        return n;
                      });
                    }
                  }}
                  error={errors.address}
                  className="w-full"
                  required
                />
              </section>

              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 px-4 py-3 text-sm text-slate-600">
                Dengan mengirim form ini, Anda menyatakan data yang diberikan
                benar dan siap diverifikasi oleh penyelenggara.
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white transition hover:brightness-95 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <i className="ri-loader-4-line animate-spin" aria-hidden />
                    Mengirim…
                  </>
                ) : (
                  <>
                    <i className="ri-send-plane-line" aria-hidden />
                    Kirim pendaftaran
                  </>
                )}
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
