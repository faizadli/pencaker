"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
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
        const enabled =
          res.data.registration_enabled === false ? false : true;
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <FullPageLoading isSection />
      </div>
    );
  }

  if (notFound || !meta) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Form tidak ditemukan
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Link pendaftaran tidak valid atau sudah tidak aktif.
        </p>
        <Link href="/" className="text-primary font-medium hover:underline">
          Kembali ke beranda
        </Link>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <i
            className="ri-checkbox-circle-line text-5xl text-emerald-600 mb-4"
            aria-hidden
          />
          <h1 className="text-xl font-bold text-primary mb-2">Terima kasih</h1>
          <p className="text-gray-600 text-sm">
            Pendaftaran Anda untuk <strong>{meta.training_name}</strong> telah
            diterima. Tim kami akan meninjau pengajuan Anda.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-primary font-medium hover:underline"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  const guestRegistrationAvailable =
    meta.registration_open === true &&
    meta.registration_period_status === "open" &&
    meta.registration_enabled !== false;

  if (!guestRegistrationAvailable) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-100 flex items-center justify-center">
            <i
              className="ri-door-closed-line text-3xl text-amber-800"
              aria-hidden
            />
          </div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">
            Pendaftaran tidak tersedia
          </h1>
          <p className="text-lg font-semibold text-primary mb-3">
            {meta.training_name}
          </p>
          {meta.institution_name?.trim() ? (
            <p className="text-sm text-gray-600 mb-4">{meta.institution_name}</p>
          ) : null}
          <div
            className="text-left rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 mb-6"
            role="status"
          >
            {!meta.registration_enabled ? (
              <p>
                Pendaftaran untuk pelatihan ini sedang{" "}
                <strong>ditutup sementara</strong> oleh penyelenggara. Silakan
                hubungi penyelenggara jika Anda memerlukan informasi lebih lanjut.
              </p>
            ) : meta.registration_period_status === "upcoming" ? (
              <p>
                Pendaftaran belum dibuka. Form dapat diisi mulai tanggal{" "}
                <strong>{formatIdDate(meta.start_date)}</strong> (WIB).
              </p>
            ) : (
              <p>
                Pendaftaran sudah ditutup. Batas akhir pengisian form adalah{" "}
                <strong>{formatIdDate(meta.end_date)}</strong> (WIB).
              </p>
            )}
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full py-3 rounded-xl bg-primary text-white font-medium hover:brightness-95 transition"
          >
            Kembali ke beranda
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary">
            Pendaftaran pelatihan
          </h1>
          <p className="text-lg font-semibold text-gray-800 mt-2">
            {meta.training_name}
          </p>
          {meta.institution_name?.trim() ? (
            <p className="text-sm text-gray-600">{meta.institution_name}</p>
          ) : null}
          <p className="text-sm text-gray-500 mt-1">
            {meta.start_date || meta.end_date ? (
              <>
                Periode pendaftaran (WIB): {formatIdDate(meta.start_date)} –{" "}
                {formatIdDate(meta.end_date)}
              </>
            ) : (
              <>Tanpa batas periode tanggal (WIB)</>
            )}
          </p>
        </div>

        <form
          onSubmit={(e) => void handleSubmit(e)}
          className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
        >
          <fieldset className="min-w-0 space-y-4 border-0 p-0 m-0">
            <p className="text-xs text-gray-500">
              Isi data berikut tanpa perlu login. Pastikan NIK sesuai KTP. NIK
              yang pernah tercatat sebagai alumni pelatihan tidak dapat
              mendaftar kembali.
            </p>
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
            <SearchableSelect
              label="Jenis kelamin"
              options={GENDER_OPTIONS}
              value={form.gender}
              onChange={(v) =>
                setForm((f) => ({ ...f, gender: v === "P" ? "P" : "L" }))
              }
              error={errors.gender}
              placeholder="Pilih"
              className="w-full"
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
            <Textarea
              label="Alamat"
              rows={3}
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
              label="Pendidikan terakhir"
              value={form.last_education}
              onChange={(e) => {
                setForm((f) => ({ ...f, last_education: e.target.value }));
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
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-xl bg-primary text-white font-medium hover:brightness-95 disabled:opacity-50 transition"
            >
              {submitting ? "Mengirim…" : "Kirim pendaftaran"}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
