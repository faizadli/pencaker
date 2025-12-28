import { z } from "zod";

// Helper constants
const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB
const MAX_PDF_SIZE = 5 * 1024 * 1024; // 5MB
const MIN_FILE_SIZE = 10 * 1024; // 10KB

const IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const PDF_TYPES = ["application/pdf"];

// Helper for file validation
const fileSchema = (
  types: string[],
  maxSize: number,
  minSize: number = MIN_FILE_SIZE,
  typeName: string = "File",
) =>
  z
    .custom<File>((val) => val instanceof File, "Wajib diunggah")
    .refine(
      (file) => types.includes(file.type),
      `${typeName} hanya boleh berformat ${types
        .map((t) => t.split("/")[1])
        .join(", ")}`,
    )
    .refine(
      (file) => file.size >= minSize,
      `${typeName} minimal berukuran ${(minSize / 1024).toFixed(0)}KB`,
    )
    .refine(
      (file) => file.size <= maxSize,
      `${typeName} maksimal berukuran ${(maxSize / (1024 * 1024)).toFixed(0)}MB`,
    );

const optionalFileSchema = (
  types: string[],
  maxSize: number,
  minSize: number = MIN_FILE_SIZE,
  typeName: string = "File",
) =>
  z
    .custom<File | null | undefined>()
    .refine(
      (val) => {
        if (!val) return true;
        return val instanceof File;
      },
      { message: "File tidak valid" },
    )
    .refine(
      (file) => {
        if (!file) return true;
        return types.includes(file.type);
      },
      `${typeName} hanya boleh berformat ${types
        .map((t) => t.split("/")[1])
        .join(", ")}`,
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size >= minSize;
      },
      `${typeName} minimal berukuran ${(minSize / 1024).toFixed(0)}KB`,
    )
    .refine(
      (file) => {
        if (!file) return true;
        return file.size <= maxSize;
      },
      `${typeName} maksimal berukuran ${(maxSize / (1024 * 1024)).toFixed(0)}MB`,
    );

// Common fields
const nikSchema = z
  .string()
  .min(1, "NIK wajib diisi")
  .length(16, "NIK harus 16 digit")
  .regex(/^\d+$/, "NIK hanya boleh angka");

const phoneSchema = z
  .string()
  .min(1, "Nomor Handphone wajib diisi")
  .regex(/^\d+$/, "Nomor Handphone hanya boleh angka")
  .min(10, "Nomor Handphone minimal 10 digit") // Reasonable min length
  .max(15, "Nomor Handphone maksimal 15 digit");

// const registrationNumberSchema = z
//   .string()
//   .min(1, "Nomor Pendaftaran wajib diisi")
//   .length(18, "Nomor Pendaftaran harus 18 digit")
//   .regex(/^\d+$/, "Nomor Pendaftaran hanya boleh angka");

// Candidate Schemas
export const candidateAccountSchema = z
  .object({
    email: z
      .string()
      .email("Format email tidak valid")
      .optional()
      .or(z.literal("")),
    no_handphone: phoneSchema,
    password: z
      .string()
      .min(1, "Password wajib diisi")
      .min(8, "Password minimal 8 karakter"),
    confirm: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Konfirmasi password tidak sama",
    path: ["confirm"],
  });

export const candidateProfileSchema = z.object({
  full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
  birthdate: z.string().min(1, "Tanggal Lahir wajib diisi"),
  place_of_birth: z.string().min(1, "Tempat Lahir wajib diisi"),
  nik: nikSchema,
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  kelurahan: z.string().min(1, "Kelurahan wajib dipilih"),
  address: z.string().min(1, "Alamat Domisili wajib diisi"),
  postal_code: z
    .string()
    .min(1, "Kode Pos wajib diisi")
    .regex(/^\d+$/, "Kode Pos hanya boleh angka"),
  gender: z.string().min(1, "Jenis Kelamin wajib dipilih"),
  last_education: z.string().min(1, "Pendidikan Terakhir wajib dipilih"),
  graduation_year: z
    .string()
    .min(1, "Tahun Lulus wajib diisi")
    .regex(/^\d{4}$/, "Tahun harus 4 digit"),
  status_perkawinan: z.string().min(1, "Status Perkawinan wajib dipilih"),
  // Files
  photo: fileSchema(IMAGE_TYPES, MAX_IMAGE_SIZE, MIN_FILE_SIZE, "Foto Profil"),
  cv: fileSchema(PDF_TYPES, MAX_PDF_SIZE, MIN_FILE_SIZE, "CV"),
});

export const candidateAk1FilesSchema = z.object({
  ktp: optionalFileSchema(IMAGE_TYPES, MAX_IMAGE_SIZE, MIN_FILE_SIZE, "KTP"),
  ijazah: optionalFileSchema(PDF_TYPES, MAX_PDF_SIZE, MIN_FILE_SIZE, "Ijazah"),
  pas_photo: optionalFileSchema(
    IMAGE_TYPES,
    MAX_IMAGE_SIZE,
    MIN_FILE_SIZE,
    "Pas Foto",
  ),
  certificate: optionalFileSchema(
    PDF_TYPES,
    MAX_PDF_SIZE,
    MIN_FILE_SIZE,
    "Sertifikat",
  ),
  // Kartu AK1 handled separately if needed
});

export const ak1CardSchema = z.object({
  file: optionalFileSchema(PDF_TYPES, MAX_PDF_SIZE, MIN_FILE_SIZE, "Kartu AK1"),
  created_at: z.string().optional().or(z.literal("")),
  registration_number: z
    .string()
    .optional()
    .or(z.literal(""))
    .refine((val) => {
      if (!val) return true;
      return /^\d{18}$/.test(val);
    }, "Nomor Pendaftaran harus 18 digit angka"),
});

// Company Schemas
export const companyAccountSchema = candidateAccountSchema; // Same structure for account

export const companyProfileSchema = z.object({
  company_name: z.string().min(1, "Nama Perusahaan wajib diisi"),
  company_type: z.string().min(1, "Jenis Perusahaan wajib dipilih"),
  nib: z
    .string()
    .min(1, "NIB wajib diisi")
    .regex(/^\d+$/, "NIB hanya boleh angka"),
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  kelurahan: z.string().min(1, "Kelurahan wajib dipilih"),
  address: z.string().min(1, "Alamat Perusahaan wajib diisi"),
  website: z.string().optional().or(z.literal("")), // Opsional
  about_company: z.string().min(1, "Tentang Perusahaan wajib diisi"),
  // Logo
  company_logo: fileSchema(
    IMAGE_TYPES,
    MAX_IMAGE_SIZE,
    MIN_FILE_SIZE,
    "Logo Perusahaan",
  ),
});

// Dashboard Profile Update Schemas
export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Password lama wajib diisi"),
    newPassword: z.string().min(8, "Password baru minimal 8 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password wajib diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const companyProfileUpdateSchema = z.object({
  company_name: z.string().min(1, "Nama Perusahaan wajib diisi"),
  company_type: z.string().min(1, "Jenis Perusahaan wajib dipilih"),
  nib: z
    .string()
    .min(1, "NIB wajib diisi")
    .regex(/^\d+$/, "NIB hanya boleh angka"),
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  kelurahan: z.string().min(1, "Kelurahan wajib dipilih"),
  address: z.string().min(1, "Alamat Perusahaan wajib diisi"),
  website: z.string().optional().or(z.literal("")),
  about_company: z.string().min(1, "Tentang Perusahaan wajib diisi"),
  company_logo: z.string().optional().or(z.literal("")),
  no_handphone: phoneSchema,
});

export const candidateProfileUpdateSchema = z.object({
  full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
  birthdate: z.string().min(1, "Tanggal Lahir wajib diisi"),
  place_of_birth: z.string().min(1, "Tempat Lahir wajib diisi"),
  nik: nikSchema,
  kecamatan: z.string().min(1, "Kecamatan wajib dipilih"),
  kelurahan: z.string().min(1, "Kelurahan wajib dipilih"),
  address: z.string().min(1, "Alamat Domisili wajib diisi"),
  postal_code: z
    .string()
    .min(1, "Kode Pos wajib diisi")
    .regex(/^\d+$/, "Kode Pos hanya boleh angka"),
  gender: z.string().min(1, "Jenis Kelamin wajib dipilih"),
  last_education: z.string().min(1, "Pendidikan Terakhir wajib dipilih"),
  graduation_year: z
    .string()
    .min(1, "Tahun Lulus wajib diisi")
    .regex(/^\d{4}$/, "Tahun harus 4 digit"),
  status_perkawinan: z.string().min(1, "Status Perkawinan wajib dipilih"),
  no_handphone: phoneSchema,
  photo_profile: z.string().optional().or(z.literal("")),
  cv_file: z.string().optional().or(z.literal("")),
});

export const createPencakerSchema = candidateProfileUpdateSchema.extend({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const disnakerProfileUpdateSchema = z.object({
  full_name: z.string().min(1, "Nama Lengkap wajib diisi"),
  nip: z
    .string()
    .min(1, "NIP wajib diisi")
    .regex(/^\d+$/, "NIP hanya boleh angka"),
  photo_profile: z.string().optional().or(z.literal("")),
});

export const jobSchema = z
  .object({
    position_id: z.string().min(1, "Posisi wajib dipilih"),
    tipe: z.enum(["Full-time", "Part-time", "Shift", "Remote", "Kontrak"], {
      message: "Tipe Pekerjaan wajib dipilih",
    }),
    work_setup: z.enum(["WFO", "WFH", "Hybrid"], {
      message: "Skema Kerja wajib dipilih",
    }),
    min_salary: z.number().min(0, "Gaji Minimum tidak boleh negatif"),
    max_salary: z.number().min(0, "Gaji Maksimum tidak boleh negatif"),
    batasAkhir: z.string().min(1, "Batas Akhir wajib diisi"),
    sektor: z.string().min(1, "Kategori wajib dipilih"),
    experience_required: z.string().min(1, "Pengalaman wajib diisi"),
    education_required: z.string().min(1, "Pendidikan wajib dipilih"),
    placement: z.string().min(1, "Penempatan wajib dipilih"),
    deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
    skills_required: z.string().min(1, "Keahlian wajib diisi"),
  })
  .refine((data) => data.max_salary >= data.min_salary, {
    message: "Gaji Maksimum harus lebih besar atau sama dengan Gaji Minimum",
    path: ["max_salary"],
  });

export const trainingSchema = z
  .object({
    title: z.string().min(1, "Judul Pelatihan wajib diisi"),
    description: z.string().min(1, "Deskripsi wajib diisi"),
    instructor: z.string().min(1, "Instruktur wajib diisi"),
    location: z.string().min(1, "Lokasi wajib diisi"),
    start_date: z.string().min(1, "Tanggal Mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal Selesai wajib diisi"),
    quota: z
      .number({ message: "Kuota wajib diisi angka" })
      .min(1, "Kuota minimal 1"),
    status: z.enum(["open", "closed", "ongoing", "completed"], {
      message: "Status wajib dipilih",
    }),
  })
  .refine((data) => new Date(data.end_date) >= new Date(data.start_date), {
    message: "Tanggal Selesai harus setelah atau sama dengan Tanggal Mulai",
    path: ["end_date"],
  });

export const newsSchema = z.object({
  judul: z.string().min(1, "Judul berita wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
  isi: z
    .string()
    .min(1, "Isi berita wajib diisi")
    .refine(
      (val) => {
        return val.replace(/<[^>]*>/g, "").trim().length > 0;
      },
      { message: "Isi berita wajib diisi" },
    ),
  gambar: z.string().optional().or(z.literal("")),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

// Content Management Schemas
export const faqSchema = z.object({
  pertanyaan: z.string().min(1, "Pertanyaan wajib diisi"),
  jawaban: z.string().min(1, "Jawaban wajib diisi"),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const partnerSchema = z.object({
  name: z.string().min(1, "Nama Partner wajib diisi"),
  logo: z.string().min(1, "Logo wajib diunggah"),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const testimonialSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  pekerjaan: z.string().min(1, "Pekerjaan wajib diisi"),
  perusahaan: z.string().min(1, "Perusahaan wajib diisi"),
  testimoni: z.string().min(1, "Testimoni wajib diisi"),
  foto: z.string().min(1, "Foto wajib diunggah"),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const bkkSchema = z.object({
  nama: z.string().min(1, "Nama BKK wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  website: z
    .string()
    .url("Format URL tidak valid")
    .optional()
    .or(z.literal("")),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const holidayGreetingSchema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  image: z.string().min(1, "Gambar wajib diunggah"),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const teamMemberSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  position: z.string().min(1, "Jabatan wajib diisi"),
  role: z.string().min(1, "Role wajib dipilih"),
  image: z.string().min(1, "Foto wajib diunggah"),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const simpleContentSchema = z.object({
  text: z.string().min(1, "Konten wajib diisi"),
  status: z.enum(["Publikasi", "Draft"], {
    message: "Status wajib dipilih",
  }),
});

export const richTextContentSchema = z.object({
  content: z
    .string()
    .min(1, "Konten wajib diisi")
    .refine(
      (val) => {
        return val.replace(/<[^>]*>/g, "").trim().length > 0;
      },
      { message: "Konten wajib diisi" },
    ),
});

// Pengaduan Schema
export const pengaduanNoteSchema = z.object({
  note: z.string().min(1, "Catatan tindak lanjut wajib diisi"),
});

// Role Schema
export const roleSchema = z.object({
  name: z.string().min(1, "Nama role wajib diisi"),
  description: z.string().optional(),
});

// User Management Schemas
export const createUserSchema = z.object({
  email: z.string().email("Email tidak valid"),
  role: z.string().min(1, "Role wajib dipilih"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const updateUserSchema = z.object({
  email: z.string().email("Email tidak valid"),
  role: z.string().min(1, "Role wajib dipilih"),
  password: z
    .string()
    .min(6, "Password minimal 6 karakter")
    .optional()
    .or(z.literal("")),
});

// Site Settings Schemas
export const instansiSchema = z.object({
  nama: z.string().min(1, "Nama Instansi wajib diisi"),
  alamat: z.string().min(1, "Alamat wajib diisi"),
  telepon: z.string().min(1, "Telepon wajib diisi"),
  email: z.string().email("Email tidak valid"),
  website: z.string().url("URL tidak valid").optional().or(z.literal("")),
  jamLayanan: z.string().min(1, "Jam Layanan wajib diisi"),
});

export const bannerSchema = z.object({
  judul: z.string().min(1, "Judul wajib diisi"),
  ctaText: z.string().min(1, "Teks Tombol wajib diisi"),
  ctaLink: z.string().min(1, "Link Tombol wajib diisi"),
});
