import { InitialData, GenericRow, IPK3_7Row, IPK3_8Row } from "./types";

export const initialData: InitialData = {
  pencariKerja: [
    {
      label: "1. Pencari kerja yang belum ditempatkan pada bulan yang lalu",
      data: [944, 3866, 1869, 421, 27, 30, 6, 0, 0, 7043, 2846, 9889, 0],
      bold: false,
    },
    {
      label: "2. Pencari kerja yang terdaftar pada bulan ini",
      data: [5, 39, 10, 8, 2, 0, 0, 0, 0, 56, 17, 73, 0],
      bold: false,
    },
    {
      label: "A. JUMLAH (1+2)",
      data: [949, 3905, 1879, 429, 29, 30, 6, 0, 0, 7099, 2863, 9962, 0],
      bold: true,
    },
    {
      label: "3. Pencari kerja yang ditempatkan pada bulan ini",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      bold: false,
    },
    {
      label: "4. Pencari kerja yang dihapuskan pada bulan ini",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      bold: false,
    },
    {
      label: "B. JUMLAH (3+4)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      bold: true,
    },
    {
      label:
        "5. Pencari kerja yang belum ditempatkan pada akhir bulan ini (A-B)",
      data: [949, 3905, 1879, 429, 29, 30, 6, 0, 0, 7099, 2863, 9962, 0],
      bold: false,
    },
  ],
  lowongan: [
    {
      label: "1. Lowongan yang belum dipenuhi pada akhir bulan lalu",
      l: 485,
      w: 17,
      lw: 502,
      bold: false,
    },
    {
      label: "2. Lowongan yang terdaftar bulan ini",
      l: 0,
      w: 0,
      lw: 0,
      bold: false,
    },
    {
      label: "C. JUMLAH (1+2)",
      l: 485,
      w: 17,
      lw: 502,
      bold: true,
    },
    {
      label: "3. Lowongan yang dipenuhi bulan ini",
      l: 0,
      w: 0,
      lw: 0,
      bold: false,
    },
    {
      label: "4. Lowongan yang dihapuskan bulan ini",
      l: 0,
      w: 0,
      lw: 0,
      bold: false,
    },
    {
      label: "D. JUMLAH (3+4)",
      l: 0,
      w: 0,
      lw: 0,
      bold: true,
    },
    {
      label: "5. Lowongan yang belum dipenuhi akhir bulan ini (C-D)",
      l: 485,
      w: 17,
      lw: 502,
      bold: false,
    },
  ],
};

export const ipk32Data: GenericRow[] = [
  {
    code: "1000",
    label: "SEKOLAH DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1101",
    label: "TIDAK TAMAT SD",
    lastMonth: {
      l: 87,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 87,
      w: 7,
    },
  },
  {
    code: "1102",
    label: "TAMAT SD",
    lastMonth: {
      l: 89,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 89,
      w: 0,
    },
  },
  {
    code: "1103",
    label: "SETINGKAT SD",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1199",
    label: "SD - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2000",
    label: "PENDIDIKAN MENENGAH PERTAMA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2101",
    label: "SEKOLAH MENENGAH PERTAMA",
    lastMonth: {
      l: 194,
      w: 52,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 195,
      w: 52,
    },
  },
  {
    code: "2102",
    label: "MADRASAH DINIYAH SANAWIYAH",
    lastMonth: {
      l: 58,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 58,
      w: 8,
    },
  },
  {
    code: "2103",
    label: "SLTP LAINNYA",
    lastMonth: {
      l: 66,
      w: 12,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 66,
      w: 12,
    },
  },
  {
    code: "2104",
    label: "SLTP KEJURUAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2199",
    label: "SLTP - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3000",
    label: "PENDIDIKAN MENENGAH ATAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3101",
    label: "TEKNIK BANGUNAN",
    lastMonth: {
      l: 194,
      w: 18,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 194,
      w: 18,
    },
  },
  {
    code: "3102",
    label: "TEKNIK PLUMBING DAN SANITASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3103",
    label: "TEKNIK SURVEI DAN PEMETAAN",
    lastMonth: {
      l: 4,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 0,
    },
  },
  {
    code: "3104",
    label: "TEKNIK KETENAGALISTRIKAN",
    lastMonth: {
      l: 310,
      w: 6,
    },
    registered: {
      l: 3,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 313,
      w: 6,
    },
  },
  {
    code: "3105",
    label: "TEKNIK PENDINGINAN DAN TATA UDARA",
    lastMonth: {
      l: 27,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 27,
      w: 4,
    },
  },
  {
    code: "3106",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 173,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 173,
      w: 3,
    },
  },
  {
    code: "3107",
    label: "TEKNIK OTOMOTIF",
    lastMonth: {
      l: 744,
      w: 14,
    },
    registered: {
      l: 10,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 754,
      w: 14,
    },
  },
  {
    code: "3108",
    label: "TEKNOLOGI PESAWAT UDARA",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "3109",
    label: "TEKNIK PERKAPALAN",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "3110",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3111",
    label: "TEKNIK GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3112",
    label: "GEOLOGI PERTAMBANGAN",
    lastMonth: {
      l: 27,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 27,
      w: 3,
    },
  },
  {
    code: "3113",
    label: "INSTRUMENTASI INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3114",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 21,
      w: 44,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 21,
      w: 44,
    },
  },
  {
    code: "3115",
    label: "PELAYARAN",
    lastMonth: {
      l: 7,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 0,
    },
  },
  {
    code: "3116",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 11,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 2,
    },
  },
  {
    code: "3117",
    label: "TEKNIK PERMINYAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3118",
    label: "TEKNIK ELEKTRONIKA",
    lastMonth: {
      l: 15,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 15,
      w: 0,
    },
  },
  {
    code: "3201",
    label: "TEKNIK TELEKOMUNIKASI",
    lastMonth: {
      l: 12,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 12,
      w: 4,
    },
  },
  {
    code: "3202",
    label: "TEKNIK KOMPUTER DAN INFORMATIKA",
    lastMonth: {
      l: 399,
      w: 103,
    },
    registered: {
      l: 3,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 402,
      w: 103,
    },
  },
  {
    code: "3203",
    label: "TEKNIK BROADCASTING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3301",
    label: "KESEHATAN",
    lastMonth: {
      l: 13,
      w: 19,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 13,
      w: 19,
    },
  },
  {
    code: "3302",
    label: "PERAWATAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 1,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3401",
    label: "SENI RUPA",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "3402",
    label: "DESAIN DAN PRODUKSI KRIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3403",
    label: "SENI PERTUNJUKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3404",
    label: "PARIWISATA",
    lastMonth: {
      l: 36,
      w: 24,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 36,
      w: 24,
    },
  },
  {
    code: "3405",
    label: "TATA BOGA",
    lastMonth: {
      l: 21,
      w: 16,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 22,
      w: 16,
    },
  },
  {
    code: "3406",
    label: "TATA KECANTIKAN",
    lastMonth: {
      l: 0,
      w: 32,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 32,
    },
  },
  {
    code: "3407",
    label: "TATA BUSANA",
    lastMonth: {
      l: 14,
      w: 29,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 14,
      w: 29,
    },
  },
  {
    code: "3501",
    label: "AGRIBISNIS PRODUKSI TANAMAN",
    lastMonth: {
      l: 279,
      w: 43,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 279,
      w: 43,
    },
  },
  {
    code: "3502",
    label: "AGRIBISNIS PRODUKSI TERNAK",
    lastMonth: {
      l: 68,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 68,
      w: 0,
    },
  },
  {
    code: "3503",
    label: "AGRIBISNIS PRODUKSI SUMBERDAYA PERAIRAN",
    lastMonth: {
      l: 86,
      w: 16,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 86,
      w: 16,
    },
  },
  {
    code: "3504",
    label: "MEKANISASI PERTANIAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3505",
    label: "AGRIBISNIS HASIL PERTANIAN",
    lastMonth: {
      l: 12,
      w: 50,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 12,
      w: 50,
    },
  },
  {
    code: "3506",
    label: "PENYULUHAN PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3507",
    label: "KEHUTANAN",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "3601",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 77,
      w: 147,
    },
    registered: {
      l: 2,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 79,
      w: 147,
    },
  },
  {
    code: "3602",
    label: "KEUANGAN",
    lastMonth: {
      l: 263,
      w: 193,
    },
    registered: {
      l: 1,
      w: 1,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 264,
      w: 194,
    },
  },
  {
    code: "3603",
    label: "TATA NIAGA",
    lastMonth: {
      l: 262,
      w: 84,
    },
    registered: {
      l: 2,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 264,
      w: 84,
    },
  },
  {
    code: "3701",
    label: "SLTA LAINNYA",
    lastMonth: {
      l: 501,
      w: 75,
    },
    registered: {
      l: 5,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 506,
      w: 75,
    },
  },
  {
    code: "3702",
    label: "SLTA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3801",
    label: "SMU",
    lastMonth: {
      l: 1601,
      w: 445,
    },
    registered: {
      l: 14,
      w: 5,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1615,
      w: 450,
    },
  },
  {
    code: "3802",
    label: "MADRASAH DINIYAH ALIYAH",
    lastMonth: {
      l: 520,
      w: 249,
    },
    registered: {
      l: 4,
      w: 2,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 524,
      w: 251,
    },
  },
  {
    code: "4000",
    label: "DIPLOMA I / AKTA I",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4101",
    label: "PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4102",
    label: "PENDIDIKAN LUAR SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4103",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4104",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4105",
    label: "ILMU PENGETAHUAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4106",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4107",
    label: "ADMINISTRASI KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4108",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4109",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4110",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4111",
    label: "KESEKRETARIATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4112",
    label: "OLAH RAGA KESEHATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4113",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4114",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4115",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4116",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4117",
    label: "KETRAMPILAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4118",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4119",
    label: "ILMU PENGETAHUAN ALAM/FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4120",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4121",
    label: "PROGRAM KOMPUTER",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "4122",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4123",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4124",
    label: "KERJA KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4125",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4126",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4127",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4128",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4129",
    label: "DIPLOMA I/AKTA I LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4199",
    label: "DIPLOMA I - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "4000",
    label: "DIPLOMA II/AKTA II",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4201",
    label: "PENDIDIKAN",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "4202",
    label: "PENDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4203",
    label: "PENDIDIKAN LUAR SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4204",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4205",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4206",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4207",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4208",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4209",
    label: "PENDIDIKAN KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4210",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4211",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4212",
    label: "KESEKRETARIATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4213",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "4214",
    label: "MARKETING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4215",
    label: "AKUTANSI",
    lastMonth: {
      l: 0,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 5,
    },
  },
  {
    code: "4216",
    label: "OLAH RAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4217",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4218",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "4219",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4220",
    label: "ILMU PENGETAHUAN ALAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4221",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4222",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4223",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4224",
    label: "KETRAMPILAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4225",
    label: "KERJA KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4226",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "4227",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 43,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 43,
      w: 8,
    },
  },
  {
    code: "4228",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4229",
    label: "KIMIA",
    lastMonth: {
      l: 9,
      w: 15,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 15,
    },
  },
  {
    code: "4230",
    label: "DIPLOMA II/AKTA II LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4299",
    label: "DIPLOMA II - TAK TERDEFINISI",
    lastMonth: {
      l: 6,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 6,
      w: 1,
    },
  },
  {
    code: "5000",
    label: "DIPLOMA III/AKTA III/AKADEMI/S.MUDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5101",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5102",
    label: "ASTRONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5103",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5104",
    label: "GEOLOGI DAN PERTAMBANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5105",
    label: "METEOROLOGI DAN GEOFISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5106",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5107",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5108",
    label: "ILMU STATISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5109",
    label: "ILMU KOMPUTER",
    lastMonth: {
      l: 13,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 13,
      w: 1,
    },
  },
  {
    code: "5110",
    label: "KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5111",
    label: "ILMU PASTI/ALAM LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5199",
    label: "ILMU PASTI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5201",
    label: "TEKNIK GEODESI/GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5202",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 1,
      w: 10,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 10,
    },
  },
  {
    code: "5203",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 3,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 5,
    },
  },
  {
    code: "5204",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5205",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 10,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 10,
      w: 0,
    },
  },
  {
    code: "5206",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 58,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 58,
      w: 5,
    },
  },
  {
    code: "5207",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5208",
    label: "TEKNIK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    lastMonth: {
      l: 9,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 4,
    },
  },
  {
    code: "5210",
    label: "FISIKA TEKNIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5211",
    label: "TEKNIK NUKLIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5212",
    label: "PENGOLAH GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5213",
    label: "TEKNOLOGI KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5214",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5215",
    label: "TEKNOLOGI GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5217",
    label: "TEKNOLOGI LAINNYA",
    lastMonth: {
      l: 5,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 3,
    },
  },
  {
    code: "5299",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5301",
    label: "PERTANIAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5302",
    label: "HORTIKULTURA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5303",
    label: "HASIL PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5304",
    label: "EKONOMI PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5306",
    label: "ILMU TANAH DAN AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5307",
    label: "KEDOKTERAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5308",
    label: "PETERNAKAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5309",
    label: "PERIKANAN",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "5310",
    label: "KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5311",
    label: "PERTANIAN LAINNYA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5399",
    label: "PERTANIAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5401",
    label: "KEDOKTERAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5402",
    label: "KEDOKTERAN GIGI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5403",
    label: "FARMASI",
    lastMonth: {
      l: 1,
      w: 12,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 12,
    },
  },
  {
    code: "5404",
    label: "PENILIK KESEHATAN/HYGINE/GIZI",
    lastMonth: {
      l: 4,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 1,
    },
  },
  {
    code: "5405",
    label: "ANASTESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5406",
    label: "FISIOTERAPI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5407",
    label: "PERAWAT",
    lastMonth: {
      l: 34,
      w: 63,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 34,
      w: 63,
    },
  },
  {
    code: "5408",
    label: "PENATA RONTGEN",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "5409",
    label: "KESEHATAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 152,
    },
    registered: {
      l: 0,
      w: 1,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 153,
    },
  },
  {
    code: "5499",
    label: "KESEHATAN - TAK TERDEFINISI",
    lastMonth: {
      l: 8,
      w: 18,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 18,
    },
  },
  {
    code: "5501",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "5502",
    label: "AKUNTANSI",
    lastMonth: {
      l: 1,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 3,
    },
  },
  {
    code: "5503",
    label: "KEUANGAN DAN PAJAK",
    lastMonth: {
      l: 3,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 3,
    },
  },
  {
    code: "5504",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5505",
    label: "ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5506",
    label: "SOSIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5507",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5508",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5509",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5510",
    label: "SEKRETARIS",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "5511",
    label: "MANAJEMENT",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "5512",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5513",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5514",
    label: "ARKEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5515",
    label: "FILSAFAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5516",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5517",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5518",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5519",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5520",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5521",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5522",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5523",
    label: "BAHASA RUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5524",
    label: "BAHASA CINA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5525",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5526",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5527",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5528",
    label: "SENI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5529",
    label: "PUBLISTIK/PENERANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5530",
    label: "ILMU KOMUNIKASI MASSA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5531",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5532",
    label: "ANAK BUAH KAPAL DAN TEKNISI PELAYARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5533",
    label: "POS DAN TELEKOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5534",
    label: "HOTEL, RESTORAN DAN PARAWISATA",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "5535",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "5599",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5601",
    label: "PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5602",
    label: "BIMBINGAN DAN PENYULUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5603",
    label: "KURIKULUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5604",
    label: "PENDIDIKAN LUAR SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5605",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5606",
    label: "PENDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5607",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5608",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5609",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5610",
    label: "ADMINISTRASI PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5611",
    label: "ADMINISTRASI KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5612",
    label: "KESEKRETARIATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5613",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5614",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5615",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5616",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5617",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5618",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5619",
    label: "BAHSA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5620",
    label: "BAHSA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5621",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5622",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5623",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5624",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5625",
    label: "AKUNTANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5626",
    label: "MANAJEMENT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5627",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5628",
    label: "TATA BOGA/TATA BUSANA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5629",
    label: "OLAH RAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5630",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5631",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5632",
    label: "GEOGRAPI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5633",
    label: "BIOLOGI/ILMU HAYAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5634",
    label: "MATEMATIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5635",
    label: "KETRAMPILAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5636",
    label: "KEJURUAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5637",
    label: "SISTEM ANALIS KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5638",
    label: "TEKNIK LABORATORIUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5639",
    label: "TEKNIK GEODESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5640",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5641",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5642",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5643",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5644",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5645",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5699",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6000",
    label: "SARJANA (S1)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6101",
    label: "FISIKA",
    lastMonth: {
      l: 3,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 2,
    },
  },
  {
    code: "6102",
    label: "ILMU GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6103",
    label: "KIMIA",
    lastMonth: {
      l: 4,
      w: 6,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 6,
    },
  },
  {
    code: "6104",
    label: "BIOLOGI",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "6105",
    label: "METEROLOGI DAN GEOPISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6106",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 4,
    },
  },
  {
    code: "6107",
    label: "STATISTIK",
    lastMonth: {
      l: 0,
      w: 10,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 10,
    },
  },
  {
    code: "6108",
    label: "KOMPUTER",
    lastMonth: {
      l: 78,
      w: 24,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 79,
      w: 24,
    },
  },
  {
    code: "6109",
    label: "ILMU PASTI/ILMU ALAM LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6199",
    label: "ILMU PASTI/ILMU ALAM - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6201",
    label: "TEKNIK GEODESI/GEOLOGI",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "6202",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 3,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 7,
    },
  },
  {
    code: "6203",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 9,
      w: 14,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 10,
      w: 14,
    },
  },
  {
    code: "6204",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "6205",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 3,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 1,
    },
  },
  {
    code: "6206",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 24,
      w: 1,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 25,
      w: 1,
    },
  },
  {
    code: "6207",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 6,
      w: 3,
    },
    registered: {
      l: 0,
      w: 1,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 6,
      w: 4,
    },
  },
  {
    code: "6208",
    label: "TEKNIK LOGAM",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "6209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    lastMonth: {
      l: 9,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 9,
    },
  },
  {
    code: "6210",
    label: "FISIKA TEKNIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6211",
    label: "TEKNIK NUKLIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6212",
    label: "PENGOLAH GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6213",
    label: "TEKNOLOGI KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6214",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6215",
    label: "TEKNIK GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "6217",
    label: "TEKNOLOGI LAINNYA",
    lastMonth: {
      l: 2,
      w: 4,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 4,
    },
  },
  {
    code: "6299",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    lastMonth: {
      l: 7,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 0,
    },
  },
  {
    code: "6301",
    label: "PERTANIAN UMUM",
    lastMonth: {
      l: 26,
      w: 22,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 26,
      w: 22,
    },
  },
  {
    code: "6302",
    label: "HORTIKULTURA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6303",
    label: "HASIL PERTANIAN",
    lastMonth: {
      l: 5,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 2,
    },
  },
  {
    code: "6304",
    label: "EKONOMI PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6306",
    label: "ILMU TANAH DAN AIR",
    lastMonth: {
      l: 4,
      w: 1,
    },
    registered: {
      l: 1,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 1,
    },
  },
  {
    code: "6307",
    label: "KEDOKTERAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6308",
    label: "PERTERNAKAN",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "6309",
    label: "PERIKANAN",
    lastMonth: {
      l: 13,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 13,
      w: 9,
    },
  },
  {
    code: "6310",
    label: "KEHUTANAN",
    lastMonth: {
      l: 5,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 5,
    },
  },
  {
    code: "6311",
    label: "PERTANIAN LAINNYA",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "6312",
    label: "PERTANIAN - TAK TERDIFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6401",
    label: "KEDOKTERAN UMUM",
    lastMonth: {
      l: 11,
      w: 11,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 11,
    },
  },
  {
    code: "6402",
    label: "KEDOKTERAN GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6403",
    label: "FARMASI",
    lastMonth: {
      l: 0,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 9,
    },
  },
  {
    code: "6404",
    label: "KESEHATAN LAINNYA",
    lastMonth: {
      l: 10,
      w: 50,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 10,
      w: 50,
    },
  },
  {
    code: "6499",
    label: "KESEHATAN - TAK TERDEFINISI",
    lastMonth: {
      l: 15,
      w: 50,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 15,
      w: 50,
    },
  },
  {
    code: "6501",
    label: "EKONOMI",
    lastMonth: {
      l: 11,
      w: 13,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 13,
    },
  },
  {
    code: "6502",
    label: "AKUNTANSI",
    lastMonth: {
      l: 8,
      w: 40,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 40,
    },
  },
  {
    code: "6503",
    label: "HUKUM",
    lastMonth: {
      l: 23,
      w: 36,
    },
    registered: {
      l: 1,
      w: 1,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 24,
      w: 37,
    },
  },
  {
    code: "6504",
    label: "ILMU POLITIK",
    lastMonth: {
      l: 31,
      w: 34,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 31,
      w: 34,
    },
  },
  {
    code: "6505",
    label: "SOSIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6506",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6507",
    label: "GEOGRAFI",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "6508",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 35,
      w: 42,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 35,
      w: 42,
    },
  },
  {
    code: "6509",
    label: "MANAJEMENT",
    lastMonth: {
      l: 68,
      w: 77,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 68,
      w: 77,
    },
  },
  {
    code: "6510",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "6511",
    label: "SEJARAH",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "6512",
    label: "ARKEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6513",
    label: "FILSAFAT",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "6514",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 2,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 3,
    },
  },
  {
    code: "6515",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6516",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 3,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 5,
    },
  },
  {
    code: "6517",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6518",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6519",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6520",
    label: "BAHSA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6521",
    label: "BAHASA RUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6522",
    label: "BAHASA CINA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6523",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6524",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6525",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6526",
    label: "PUBLISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6527",
    label: "KOMUNIKASI MASSA",
    lastMonth: {
      l: 4,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 9,
    },
  },
  {
    code: "6528",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6529",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    lastMonth: {
      l: 21,
      w: 13,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 21,
      w: 13,
    },
  },
  {
    code: "6599",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6601",
    label: "PENDIDIKAN UMUM",
    lastMonth: {
      l: 7,
      w: 21,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 21,
    },
  },
  {
    code: "6602",
    label: "ADMINISTRASI PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6603",
    label: "PEMBINAAN DAN PENYULUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6604",
    label: "KURIKULUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6605",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 11,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 7,
    },
  },
  {
    code: "6606",
    label: "PENDIDIKAN SOSIAL",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "6607",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 4,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 8,
    },
  },
  {
    code: "6608",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6609",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6610",
    label: "ADMINISTRASI NEGARA",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 1,
      w: 1,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 3,
    },
  },
  {
    code: "6611",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 2,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 2,
    },
  },
  {
    code: "6612",
    label: "GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6613",
    label: "SEJARAH",
    lastMonth: {
      l: 3,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 7,
    },
  },
  {
    code: "6614",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 6,
      w: 20,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 6,
      w: 20,
    },
  },
  {
    code: "6615",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6616",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 5,
      w: 22,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 22,
    },
  },
  {
    code: "6617",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6618",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6619",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6620",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6621",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "6622",
    label: "OLAH RAGA",
    lastMonth: {
      l: 12,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 12,
      w: 5,
    },
  },
  {
    code: "6623",
    label: "TATA BOGA",
    lastMonth: {
      l: 5,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 2,
    },
  },
  {
    code: "6624",
    label: "TATA GRAHA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6625",
    label: "KESENIAN",
    lastMonth: {
      l: 4,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 7,
    },
  },
  {
    code: "6626",
    label: "EKONOMI",
    lastMonth: {
      l: 4,
      w: 22,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 22,
    },
  },
  {
    code: "6627",
    label: "HUKUM",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "6628",
    label: "MANAJEMEN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 1,
      w: 4,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 4,
    },
  },
  {
    code: "6629",
    label: "GEOGRAFI",
    lastMonth: {
      l: 5,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 4,
    },
  },
  {
    code: "6630",
    label: "FISIKA",
    lastMonth: {
      l: 4,
      w: 12,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 12,
    },
  },
  {
    code: "6631",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 3,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 9,
    },
  },
  {
    code: "6632",
    label: "BIOLOGI",
    lastMonth: {
      l: 5,
      w: 25,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 25,
    },
  },
  {
    code: "6633",
    label: "MATEMATIKA",
    lastMonth: {
      l: 8,
      w: 16,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 16,
    },
  },
  {
    code: "6634",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 7,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 0,
    },
  },
  {
    code: "6635",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6636",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6637",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6638",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "6639",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    lastMonth: {
      l: 24,
      w: 42,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 24,
      w: 42,
    },
  },
  {
    code: "6699",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    lastMonth: {
      l: 15,
      w: 51,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 15,
      w: 51,
    },
  },
  {
    code: "7000",
    label: "SARJANA (S2)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7101",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7102",
    label: "ILMU GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7103",
    label: "KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7104",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7105",
    label: "METEROLOGI DAN GEOPISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7106",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7107",
    label: "STATISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7108",
    label: "KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7109",
    label: "ILMU PASTI/ILMU ALAM LAINNYA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7199",
    label: "ILMU PASTI/ILMU ALAM - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7201",
    label: "TEKNIK GEODESI/GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7202",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7203",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7204",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7205",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7206",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7207",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7208",
    label: "TEKNIK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7210",
    label: "FISIKA TEKNIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7211",
    label: "TEKNIK NUKLIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7212",
    label: "PENGOLAH GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7213",
    label: "TEKNOLOGI KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7214",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7215",
    label: "TEKNIK GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7217",
    label: "TEKNOLOGI LAINNYA",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "7299",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7301",
    label: "PERTANIAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7302",
    label: "HORTIKULTURA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7303",
    label: "HASIL PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7304",
    label: "EKONOMI PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7306",
    label: "ILMU TANAH DAN AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7307",
    label: "KEDOKTERAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7308",
    label: "PERTERNAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7309",
    label: "PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7310",
    label: "KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7311",
    label: "PERTANIAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7399",
    label: "PERTANIAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7401",
    label: "KEDOKTERAN UMUM",
    lastMonth: {
      l: 0,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 4,
    },
  },
  {
    code: "7402",
    label: "KEDOKTERAN GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7403",
    label: "FARMASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7404",
    label: "KESEHATAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "7499",
    label: "KESEHATAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7501",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7502",
    label: "AKUNTANSI",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7503",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7504",
    label: "ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7505",
    label: "SOSIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7506",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7507",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7508",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7509",
    label: "MANAJEMEN",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "7510",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7511",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7512",
    label: "ARKEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7513",
    label: "FILSAFAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7514",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7515",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7516",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7517",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7518",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7519",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7520",
    label: "BAHSA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7521",
    label: "BAHASA RUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7522",
    label: "BAHSA CINA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7523",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7524",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7525",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7526",
    label: "PUBLISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7527",
    label: "KOMUNIKASI MASSA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7528",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7529",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7599",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7601",
    label: "PENDIDIKAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7602",
    label: "ADMINISTRASI PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7603",
    label: "PEMBINAAN DAN PENYULUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7604",
    label: "KURIKULUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7605",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7606",
    label: "PINDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7607",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7608",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7609",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7610",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7611",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7612",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7613",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7614",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7615",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7616",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7617",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7618",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7619",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7620",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7621",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7622",
    label: "OLAH RAGA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7623",
    label: "TATA BOGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7624",
    label: "TATA GRAHA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7625",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7626",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7627",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7628",
    label: "MANAJEMANT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7629",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7630",
    label: "FISIKA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7631",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7632",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7633",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7634",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7635",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7636",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7637",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7638",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7639",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "7699",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "JUMLAH",
    label: "JUMLAH",
    lastMonth: {
      l: 7043,
      w: 2846,
    },
    registered: {
      l: 56,
      w: 17,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7099,
      w: 2863,
    },
  },
];
export const ipk33Data: GenericRow[] = [
  {
    code: "",
    label: "ANGGOTA ANGKATAN BERSENJATA (KECUALI KEPOLISIAN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "110",
    label: "ANGGOTA ANGKATAN BERSENJATA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1",
    label: "ANGGOTA BADAN LEGISLATIF, PEJABAT TINGGI PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1110",
    label: "ANGGOTA BADAN LEGISLATIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1120",
    label: "PEJABAT TINGGI PEMERINTAH",
    lastMonth: {
      l: 4,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 2,
    },
  },
  {
    code: "1130",
    label: "KEPALA DESA DAN LURAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1141",
    label: "PEMIMPIN ORGANISASI PARTAI POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1142",
    label:
      "PIMPINAN ORGANISASI PENGUSAHA, PEKERJA DAN ORGANISASI YANG BERKAITAN DENGAN KEPENTINGAN DARI ORGANISASI EKONOMI",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "1143",
    label: "PIMPINAN ORGANISASI KEMANUSIAAN DAN ORGANISASI KHUSUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1210",
    label: "DIREKTUR DAN KEPALA EKSEKUTIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1221",
    label:
      "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG PERTANIAN PERBURUAN DAN PERIKANAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "1223",
    label: "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG KONSTRUKSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1224",
    label:
      "MANAJER PRODUKSI DAN OPERASI DOKUMEN DALAM BIDANG PERDAGANGAN BESAR DAN ECERAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1225",
    label: "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG HOTEL DAN RESTORAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1226",
    label:
      "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG ANGKUTAN (LAYANAN TELEKOMUNIKASI) PERGUDANGAN & KOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1227",
    label: "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG PERUSAHAAN JASA",
    lastMonth: {
      l: 9,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 0,
    },
  },
  {
    code: "1228",
    label:
      "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG KESEJAHTERAAN DAN KEBERSIHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1229",
    label:
      "MANAJER PRODUKSI DAN OPERASI TIDAK DAPAT DIKLASIFIKASIKAN PADA 1221-1228",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1231",
    label: "MANAJER KEUANGAN DAN ADMINISTRASI",
    lastMonth: {
      l: 22,
      w: 24,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 22,
      w: 24,
    },
  },
  {
    code: "1232",
    label: "MANAJER PEMASARAN DAN HUBUNGAN INDUSTRI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "1233",
    label: "MANAJER PENJUALAN DAN PEMASARAN",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "1234",
    label: "MANAJER HUBUNGAN MASYARAKAT DAN PERIKLANAN",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "1235",
    label: "MANAJER PENYEDIAAN DAN DISTRIBUSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1236",
    label: "MANAJER JASA PERHITUNGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1237",
    label: "MANAJER PENELITIAN DAN PEMASARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1311",
    label: "MANAJER UMUM PERTANIAN, PERBURUAN KEHUTANAN DAN PERIKANAN",
    lastMonth: {
      l: 15,
      w: 17,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 15,
      w: 17,
    },
  },
  {
    code: "1314",
    label: "MANAJER UMUM PERDAGANGAN BESAR DAN ECERAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1315",
    label: "MANAJER UMUM HOTEL DAN RESTORAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1316",
    label: "MANAJER UMUM ANGKUTAN, PERGUDANGAN DAN KOMUNIKASI",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "1317",
    label: "MANAJER UMUM PERUSAHAAN JASA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1318",
    label: "MANAJER UMUM PERAWATAN PRIBADI KEBERSIHAN DAN JASA YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1319",
    label:
      "MANAJER UMUM YANG TIDAK DAPAT DIKLASIFIKASIKAN PADA SUB GOL 1311 SAMPAI DENGAN 1318",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "2",
    label: "TENAGA PROFESIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2111",
    label: "PAKAR FISIKA DAN ASTRONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2112",
    label: "PAKAR METEOROLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2113",
    label: "PAKAR KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2114",
    label: "PAKAR GEOLOGI DAN GEOFISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2121",
    label: "PAKAR MATEMATIKA DAN PROFESI YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2122",
    label: "PAKAR STATISTIK",
    lastMonth: {
      l: 0,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 4,
    },
  },
  {
    code: "2131",
    label: "PERANCANG DAN ANALIS SISTEM KOMPUTER",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "2132",
    label: "PROGRAMER KOMPUTER",
    lastMonth: {
      l: 165,
      w: 67,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 165,
      w: 67,
    },
  },
  {
    code: "2139",
    label: "PAKAR KOMPUTER YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2141",
    label: "ARSITEK PERENCANA TATA KOTA & LALU LINTAS",
    lastMonth: {
      l: 2,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 2,
    },
  },
  {
    code: "2142",
    label: "PEREKAYASA SIPIL",
    lastMonth: {
      l: 1,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 6,
    },
  },
  {
    code: "2143",
    label: "PEREKAYASA ELEKTRO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2144",
    label: "PERAKAYASA ELEKTRONIKA & TELEKOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2145",
    label: "PEREKAYASA MESIN",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "2146",
    label: "PEREKAYASA KIMIA",
    lastMonth: {
      l: 3,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 5,
    },
  },
  {
    code: "2147",
    label: "PEREKAYASA PERTAMBANGAN METALURGI DAN PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2148",
    label: "KARTOGRAFER DAN SURVEYOR",
    lastMonth: {
      l: 2,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 6,
    },
  },
  {
    code: "2149",
    label:
      "ARSITEK PEREKAYASA DAN PROFESI SEJENIS YANG TIDAK DIKLASIFIKASIKAN PADA 2141, 2142 S/D 2148",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2211",
    label: "BIOLOGI BOTANI, ZOOLOGI DAN PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2212",
    label: "PARMAKOLOG, PHATOLOG DAN PROFESI YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2213",
    label: "ARGONOMI DAN PROFESI SEJENIS",
    lastMonth: {
      l: 21,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 21,
      w: 7,
    },
  },
  {
    code: "2221",
    label: "DOKTER UMUM",
    lastMonth: {
      l: 5,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 9,
    },
  },
  {
    code: "2222",
    label: "DOKTER GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2230",
    label: "PERAWAT DAN BIDAN",
    lastMonth: {
      l: 40,
      w: 254,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 40,
      w: 254,
    },
  },
  {
    code: "2310",
    label:
      "PENGAJAR PROFESIONAL AKADEMI, UNIVERSITAS DAN PENDIDIKAN TINGGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "2320",
    label: "PENGAJAR PROFESIONAL PENDIDIKAN MENENGAH ATAS",
    lastMonth: {
      l: 77,
      w: 203,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 77,
      w: 203,
    },
  },
  {
    code: "2330",
    label: "UNIVERSITAS DAN PENDIDIKAN TINGGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2331",
    label: "PENGAJAR SEKOLAH DASAR",
    lastMonth: {
      l: 11,
      w: 45,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 45,
    },
  },
  {
    code: "2332",
    label: "PROFESIONALIS GURU PENDIDIKAN PRA SEKOLAH DASAR",
    lastMonth: {
      l: 1,
      w: 47,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 47,
    },
  },
  {
    code: "2340",
    label: "GURU SEKOLAH LUAR BIASA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2351",
    label: "SPESIALIS METODA PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2352",
    label: "PENILIK SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2411",
    label: "AKUNTAN",
    lastMonth: {
      l: 40,
      w: 46,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 40,
      w: 46,
    },
  },
  {
    code: "2412",
    label: "TENAGA PROFESIONAL TENAGA KEPEGAWAIAN",
    lastMonth: {
      l: 8,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 0,
    },
  },
  {
    code: "2419",
    label:
      "TENAGA PROFESIONAL BIDANG BISNIS YANG TIDAK DAPAT DIKLASIFIKASIKAN PADA SUB GOLONGAN 2411 DAN 2412",
    lastMonth: {
      l: 65,
      w: 66,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 65,
      w: 66,
    },
  },
  {
    code: "2421",
    label: "PENGACARA",
    lastMonth: {
      l: 14,
      w: 25,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 14,
      w: 25,
    },
  },
  {
    code: "2422",
    label: "HAKIM",
    lastMonth: {
      l: 1,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 5,
    },
  },
  {
    code: "2429",
    label: "PAKAR HUKUM YTD PADA SUB GOL 2421 & 2422",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2431",
    label: "ARSIPARIS DAN KURATOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2432",
    label: "PUSTAKAWAN DAN PEMBERI INFORMASI YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2441",
    label: "PAKAR EKONOMI",
    lastMonth: {
      l: 10,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 10,
      w: 6,
    },
  },
  {
    code: "2442",
    label: "PAKAR SOSIOLOGI, ANTROPOLOGI DAN YANG SEJENIS",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "2443",
    label: "PAKAR FILSAFAT, SEJARAH DAN ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2444",
    label: "PAKAR BAHASA, PENTERJEMAH DAN JURU BAHASA",
    lastMonth: {
      l: 0,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 6,
    },
  },
  {
    code: "2445",
    label: "PSIKOLOG",
    lastMonth: {
      l: 12,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 12,
      w: 8,
    },
  },
  {
    code: "2446",
    label: "PEKERJA SOSIAL PROFESIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2451",
    label: "PENGARANG, WARTAWAN DAN PENULIS LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2452",
    label: "PEMAHAT, PELUKIS DAN SENIMAN YANG SEJENIS",
    lastMonth: {
      l: 13,
      w: 42,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 13,
      w: 42,
    },
  },
  {
    code: "2453",
    label: "PENGUBAH LAGU, PEMUSIK DAN PENYANYI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2454",
    label: "PENCIPTA TARI DAN PENARI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2455",
    label: "PEMAIN FILM, SUTRADARA FILM, DIREKTUR PANGGUNG DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2460",
    label: "PAKAR KEAGAMAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3",
    label: "TEKNISI DAN KELOMPOK JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3111",
    label: "TEKNISI ILMU KIMIA DAN FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3112",
    label: "TEKNISI PEREKAYASAAN SIPIL",
    lastMonth: {
      l: 9,
      w: 17,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 17,
    },
  },
  {
    code: "3113",
    label: "TEKNISI PEREKAYASAAN LISTRIK",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "3114",
    label: "TEKNISI PEREKAYASAAN ELEKTRONIKA & TELEKOMUNIKASI",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "3115",
    label: "TEKNISI PEREKAYASAAN MEKANIK",
    lastMonth: {
      l: 179,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 179,
      w: 0,
    },
  },
  {
    code: "3116",
    label: "TEKNISI PEREKAYASAAN KIMIA",
    lastMonth: {
      l: 34,
      w: 53,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 34,
      w: 53,
    },
  },
  {
    code: "3117",
    label: "TEKNISI PERTAMBANGAN DAN METALURGI",
    lastMonth: {
      l: 55,
      w: 11,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 55,
      w: 11,
    },
  },
  {
    code: "3118",
    label: "PERANCANG GAMBAR",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "3119",
    label:
      "TEKNISI ILMU FISIKA DAN PEREKAYASAAN YANG TIDAK DAPAT DIKLASIFKASIKAN DI 3111 S/D 3118",
    lastMonth: {
      l: 1,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 6,
    },
  },
  {
    code: "3121",
    label: "ASISTEN KOMPUTER",
    lastMonth: {
      l: 25,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 25,
      w: 6,
    },
  },
  {
    code: "3122",
    label: "OPERATOR PERLENGKAPAN KOMPUTER",
    lastMonth: {
      l: 11,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 8,
    },
  },
  {
    code: "3123",
    label: "PENGONTROL ROBOT INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3131",
    label: "PHOTOGRAFER OPERATOR PERALATAN REKAMAN GAMBAR DAN SUARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3132",
    label: "OPERATOR PERLENGKAPAN RADIO DAN TELEKOMUNIKASI",
    lastMonth: {
      l: 1,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 4,
    },
  },
  {
    code: "3133",
    label: "OPERATOR PERALATAN MEDIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3141",
    label: "PEREKAYASA KAPAL LAUT",
    lastMonth: {
      l: 4,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 0,
    },
  },
  {
    code: "3142",
    label: "PERWIRA DEK KAPAL LAUT DAN PILOT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3143",
    label: "PILOT PESAWAT UDARA & PROFESIONALIS SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3145",
    label: "PENGONTROL LALULINTAS UDARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3151",
    label: "PENGAWAS BANGUNAN DAN KEBAKARAN",
    lastMonth: {
      l: 4,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 0,
    },
  },
  {
    code: "3152",
    label: "PENGAWAS KESELAMATAN KESEHATAN DAN KUALITAS",
    lastMonth: {
      l: 8,
      w: 14,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 14,
    },
  },
  {
    code: "3211",
    label: "TEKNISI ILMU HAYAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3212",
    label: "TEKNISI AGRONOMI DAN KEHUTANAN",
    lastMonth: {
      l: 192,
      w: 98,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 192,
      w: 98,
    },
  },
  {
    code: "3213",
    label: "PENASEHAT PERTANIAN DAN KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "3221",
    label: "ASISTEN MEDIKAL",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "3222",
    label: "SANITARIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3223",
    label: "NUTRISIS DAN DIESTRISIAN",
    lastMonth: {
      l: 4,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 9,
    },
  },
  {
    code: "3224",
    label: "OPTOMETRIS DAN OPTOSIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3225",
    label: "ASISTEN DOKTER GIGI",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "3226",
    label: "PHISIOTERAPIS DAN PROFESIONALIS SEJENIS",
    lastMonth: {
      l: 2,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 9,
    },
  },
  {
    code: "3227",
    label: "ASISTEN DOKTER HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3228",
    label: "ASISTEN PHARMASI",
    lastMonth: {
      l: 7,
      w: 22,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 22,
    },
  },
  {
    code: "3229",
    label: "PROFESIONALIS KESEHATAN MODERN (KECUALI PERAWAT)YTDL",
    lastMonth: {
      l: 26,
      w: 75,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 26,
      w: 75,
    },
  },
  {
    code: "3231",
    label: "PROFESIONALIS PERAWAT",
    lastMonth: {
      l: 21,
      w: 24,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 21,
      w: 24,
    },
  },
  {
    code: "3232",
    label: "BIDAN PROFESIONALIS",
    lastMonth: {
      l: 0,
      w: 24,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 24,
    },
  },
  {
    code: "3241",
    label: "PRAKTISI PENGOBATAN TRADISIONAL",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3242",
    label: "PENYEMBUH KEBATINAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3310",
    label: "PROFESIONALIS GURU PENDIDIKAN DASAR",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3320",
    label: "ASOSIASI PROFESI GURU PENDIDIKAN PRA SEKOLAH DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3330",
    label: "ASOSIASI PROFESI GURU PENDIDIKAN KHUSUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3340",
    label: "PROFESIONALIS KELOMPOK GURU LAINNYA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3411",
    label: "PEDAGANG DAN MAKELAR SURAT BERHARGA DAN KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3412",
    label: "PENCARI PELANGGAN ASURANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3413",
    label: "AGEN PROPERTI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3414",
    label: "KONSULTAN DAN PENYUSUN PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3415",
    label: "WAKIL PENJUAL TEKNIS DAN KOMERSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3416",
    label: "PEMBELI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3417",
    label: "PENAKSIR, PENILAI DAN PELELANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3421",
    label: "MAKELAR PERDAGANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3422",
    label: "AGEN KLIRING DAN PENGIRIMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3423",
    label: "AGEN KETENAGAKERJAAN DAN PENGERAH TENAGA KERJA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3429",
    label: "AGEN USAHA JASA DAN MAKELAR PERDAGANGAN YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3431",
    label: "SEKRETARIS ADMINISTRASI DAN ASOSIASI PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 11,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 11,
    },
  },
  {
    code: "3432",
    label: "ASOSIASI PROFESI, PERDAGANGAN DAN HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3433",
    label: "PEMEGANG BUKU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3434",
    label: "KELOMPOK PROFESIONALIS STATISTIK, MATEMATIKA DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3439",
    label:
      "ASOSIASI PROFESI ADMINISTRASI YANG TIDAK DAPAT DIKLASIFIKASIKAN PADA SUB GOLONGAN 3431 S/D 3434",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3441",
    label: "INSPEKTUR BEA CUKAI DAN PABEAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3442",
    label: "PETUGAS PAJAK DAN BEA CUKAI PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3443",
    label: "PETUGAS PENGHITUNG KEUNTUNGAN SOSIAL PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3444",
    label: "PETUGAS PERIJINAN PEMERINTAH",
    lastMonth: {
      l: 2,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 3,
    },
  },
  {
    code: "3449",
    label: "ASOSIASI PROFESI BEA CUKAI, PAJAK DAN PEJABAT PEMERINTAH YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3450",
    label: "INSPEKTUR POLISI DAN DETEKTIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3460",
    label: "ASOSIASI PROFESI PEKERJA SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3471",
    label: "DEKORATOR DAN PERANCANG KOMERSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3472",
    label: "PENYIAR RADIO, TV DAN PENYIAR LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3473",
    label: "MUSIKUS, PENARI DAN PENARI JALANAN KLUB MALAM DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3474",
    label: "BADUT, PESULAP, PEMAIN AKROBAT DAN ASOSIASI PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3475",
    label: "PEMAIN ATLETIK DAN OLAHRAGAWAN DAN KELOMPOK PROFESIONAL SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3480",
    label: "ASOSIASI PROFESI KEAGAMAAN",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "4",
    label: "PENATA USAHA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4111",
    label: "STENOGRAF DAN PENGETIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4112",
    label: "OPERATOR PENGOLAH DATA DAN SEJENIS",
    lastMonth: {
      l: 202,
      w: 116,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 202,
      w: 116,
    },
  },
  {
    code: "4113",
    label: "OPERATOR DATA ENTRI",
    lastMonth: {
      l: 37,
      w: 20,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 37,
      w: 20,
    },
  },
  {
    code: "4114",
    label: "OPERATOR MESIN PENGHITUNG",
    lastMonth: {
      l: 19,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 19,
      w: 0,
    },
  },
  {
    code: "4115",
    label: "SEKRETARIS",
    lastMonth: {
      l: 1,
      w: 19,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 19,
    },
  },
  {
    code: "4121",
    label: "PENATA USAHA AKUNTAN PEMBUKUAN",
    lastMonth: {
      l: 159,
      w: 226,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 159,
      w: 226,
    },
  },
  {
    code: "4122",
    label: "PENATA USAHA STATISTIK DAN KEUANGAN",
    lastMonth: {
      l: 5,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 2,
    },
  },
  {
    code: "4131",
    label: "PENATA USAHA PERSEDIAAN",
    lastMonth: {
      l: 52,
      w: 108,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 52,
      w: 108,
    },
  },
  {
    code: "4132",
    label: "PENATA USAHA PRODUKSI",
    lastMonth: {
      l: 81,
      w: 66,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 81,
      w: 66,
    },
  },
  {
    code: "4133",
    label: "PENATA USAHA ANGKUTAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4141",
    label: "PENATA USAHA PERPUSTAKAAN DAN ARSIP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4142",
    label: "PENATA USAHA PENGIRIMAN DAN PENYORTITAN SURAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4143",
    label: "PENATA USAHA PENGKODEAN, CETAK BACAAN DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4144",
    label: "PENULIS DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 8,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 8,
    },
  },
  {
    code: "4190",
    label: "PENATA USAHA KANTOR LAINNYA",
    lastMonth: {
      l: 1231,
      w: 683,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1231,
      w: 683,
    },
  },
  {
    code: "4211",
    label: "KASIR DAN PENATA USAHA TIKET",
    lastMonth: {
      l: 45,
      w: 9,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 45,
      w: 9,
    },
  },
  {
    code: "4212",
    label: "TELER DAN PENATA USAHA TEMPAT PEMBAYARAN LAINNYA",
    lastMonth: {
      l: 30,
      w: 28,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 30,
      w: 28,
    },
  },
  {
    code: "4213",
    label: "BANDAR DAN PRAMU JUDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4214",
    label: "PEMILIK RUMAH GADAI DAN PEMBERI PINJAMAN UANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4215",
    label: "PENAGIH HUTANG DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 17,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 17,
      w: 5,
    },
  },
  {
    code: "4222",
    label: "RESEPSIONIS DAN PENATA USAHA INFORMASI",
    lastMonth: {
      l: 45,
      w: 51,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 45,
      w: 51,
    },
  },
  {
    code: "4223",
    label: "OPERATOR PAPAN PENYAMBUNGAN TELEPON",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5",
    label: "TENAGA USAHA JASA DAN PENJUAL DAGANGAN DI TOKO DAN PASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5111",
    label: "PRAMUGARA DAN PRAMUGARI PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5112",
    label: "KONDEKTUR PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5113",
    label: "PEMANDU PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5121",
    label: "PELAYAN, PRAMU RUMAH TANGGA DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5122",
    label: "JURU MASAK",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "5123",
    label: "PRAMU RESTORAN DAN BAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5131",
    label: "PENGASUH ANAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5132",
    label: "PENGASUH PADA LEMBAGA PERORANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5139",
    label: "PERAWAT PERORANGAN DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5141",
    label:
      "PEMANGKAS RAMBUT, PENATA RAMBUT PERAWAT KECANTIKAN DAN YANG SEJENIS",
    lastMonth: {
      l: 1,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 6,
    },
  },
  {
    code: "5142",
    label: "PRAMURIA DAN PELAYAN PRIA",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "5143",
    label: "PENGURUS PEMAKAMAN DAN PEMBALSEMAN JENASAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5149",
    label:
      "PEKERJA JASA PERORANGAN YANG TIDAK DAPAT DIKLASIFIKASIKAN DI TEMPAT LAIN",
    lastMonth: {
      l: 352,
      w: 115,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 352,
      w: 115,
    },
  },
  {
    code: "5151",
    label: "PERAMAL BINTANG DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5152",
    label: "AHLI NUJUM, PERAMAL GARIS TANGAN DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5161",
    label: "PEMADAM KEBAKARAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5162",
    label: "POLISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5163",
    label: "SIPIR PENJARA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5169",
    label:
      "TENAGA JASA PERLINDUNGAN YANG TIDAK DAPAT DIKLASIFIKASIKAN DI TEMPAT",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "5210",
    label: "PRAGAWAN DAN PRAGAWATI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5220",
    label: "PRAMUNIAGA DAN PEMERAGA BARANG DI TOKO",
    lastMonth: {
      l: 31,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 31,
      w: 4,
    },
  },
  {
    code: "5230",
    label: "TENAGA PENJUALAN DI PASAR DAN PEDAGANG PINGGIR JALAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6",
    label: "PEKERJA-PEKERJA KETERAMPILAN BIDANG PERTANIAN DAN PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6111",
    label: "PENANAM LADANG DAN SAYURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6112",
    label: "PENANAM POHON DAN PERKEBUNAN",
    lastMonth: {
      l: 78,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 78,
      w: 1,
    },
  },
  {
    code: "6113",
    label: "PEKERJA KEBUN HOLTIKULTURA DAN PERAWAT TUMBUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6114",
    label: "PENANAM TANAMAN CAMPURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6121",
    label: "PRODUSEN SUSU DAN PETERNAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6122",
    label: "PRODUSEN TERNAK UNGGAS",
    lastMonth: {
      l: 7,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 0,
    },
  },
  {
    code: "6123",
    label: "PETERNAK LEBAH DAN ULAT SUTERA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6129",
    label:
      "PRODUSEN2 DAN JABATAN2 YANG BERHUBUNGAN DENGAN PEMASARAN HEWAN HASIL HEWAN TERNAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6130",
    label: "TENAGA PEMASARAN HASIL TANAMAN DAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6141",
    label: "PEKERJA KEHUTANAN DAN PENEBANG KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6142",
    label: "PEKERJA PEMBAKARAN ARANG DAN PEKERJAAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6151",
    label: "PETANI IKAN DARAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6152",
    label: "PEKERJA PERIKANAN TAMBAK DAN LAUT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6153",
    label: "NELAYAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6154",
    label: "PEMBURU DAN PEMASANGAN PERANGKAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6210",
    label: "PEKERJA BERMATA PENCAHARIAN PERTANIAN",
    lastMonth: {
      l: 4,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 2,
    },
  },
  {
    code: "7",
    label: "PEKERJA KASAR TERAMPIL DAN SEJENISNYA YBDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7111",
    label: "PENAMBANG BATU, JURU TEMBAK DAN LEDAK ( TAMBANG )",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "7112",
    label: "TEKNISI PELEDAKAN DAN PELEDAK",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "7113",
    label: "PEMECAH BATU, PEMOTONG DAN PEMAHAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7121",
    label: "TUKANG BANGUNAN DARI BAHAN TRADISIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7122",
    label: "PEMASANG KERAMIK DAN TUKANG BATU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7123",
    label: "PEMASANG BETON CETAKAN, TUKANG POLES DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7124",
    label: "TUKANG KAYU DAN PEMBUAT PERABOT RUMAH TANGGA DARI KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7129",
    label: "TUKANG KAYU DAN PEMBUAT PERABOT RUMAH TANGGA DARI KAYU",
    lastMonth: {
      l: 78,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 78,
      w: 7,
    },
  },
  {
    code: "7131",
    label: "TUKANG PASANG ATAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7132",
    label: "TUKANG PASANG UBIN DAN GENTENG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7133",
    label: "TUKANG PLESTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7134",
    label: "TUKANG PASANG SEKAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7135",
    label: "TUKANG KACA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7136",
    label: "TUKANG LEDENG DAN TUKANG PASANG PIPA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7137",
    label: "TEKNISI LISTRIK GEDUNG DAN SEJENIS",
    lastMonth: {
      l: 5,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 0,
    },
  },
  {
    code: "7141",
    label: "TUKANG CAT DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7142",
    label: "TUKANG PERNIS/PELITUR DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7143",
    label: "PEMBERSIH GEDUNG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7211",
    label: "TUKANG CETAK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7212",
    label: "TUKANG LAS",
    lastMonth: {
      l: 16,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 16,
      w: 0,
    },
  },
  {
    code: "7213",
    label: "PEMBUAT BARANG LOGAM LEMBARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7214",
    label: "PEMBUAT BAHAN BANGUNAN DARI LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7215",
    label: "PEMASANG DAN PENYAMBUNG TALI KABEL MESIN DEREK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7216",
    label: "PEKERJA BAWAH AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7221",
    label: "PANDE BESI, TUKANG TEMPA DAN PELAYAN MESIN PRES BARANG LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7222",
    label: "PEMBUAT PERKAKAS DAN SEJENISNYA",
    lastMonth: {
      l: 9,
      w: 5,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 5,
    },
  },
  {
    code: "7223",
    label: "TUKANG POTONG MESIN PERKAKAS DAN OPERATOR PASANG MESIN PERKAKAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7224",
    label: "TUKANG GURINDA (BERODA), TUKANG POLES DAN ASAH PERKAKAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7231",
    label: "MONTIR KENDARAAN BERMOTOR DAN PEMASANG MESIN KENDARAAN BERMOTOR",
    lastMonth: {
      l: 422,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 422,
      w: 6,
    },
  },
  {
    code: "7232",
    label: "MEKANIK PESAWAT TERBANG DAN PENYETEL MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7233",
    label:
      "TEKNISI MESIN PERTANIAN ATAU TEKNISI MESIN INDUSTRI DAN PEMASANG MESIN PERTANIAN/MESIN INDUSTRI",
    lastMonth: {
      l: 275,
      w: 8,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 275,
      w: 8,
    },
  },
  {
    code: "7241",
    label: "TEKNISI LISTRIK DAN PEMASANG LISTRIK",
    lastMonth: {
      l: 125,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 125,
      w: 4,
    },
  },
  {
    code: "7242",
    label: "PENYETEL PERALATAN ELEKTRONIK",
    lastMonth: {
      l: 17,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 17,
      w: 0,
    },
  },
  {
    code: "7243",
    label: "MEKANIK DAN PENSERVIS BARANG ELEKTRONIK",
    lastMonth: {
      l: 15,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 15,
      w: 0,
    },
  },
  {
    code: "7244",
    label: "INSTALATOR DAN TEKNISI PESAWAT TELEPON DAN TELEGRAF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7245",
    label: "INSTALATOR JARINGAN KABEL DAN TEKNISI JARINGAN KABEL",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "7311",
    label: "PEMBUAT DAN PEREPARASI INSTRUMEN PRESISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7312",
    label: "PEMBUAT DAN PENYETEM INSTRUMEN MUSIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7313",
    label: "TUKANG INTAN PERMATA DAN PEKERJA LOGAM BERHARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7321",
    label:
      "PEMBUAT ALAT PENGGOSOK BERODA, PEMBUAT BARANG-BARANG TEMBIKAR DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7322",
    label: "PEMBUAT GELAS DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7323",
    label: "PENGGAMBAR DAN PENGUKIR GELAS DAN KACA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7324",
    label:
      "PELUKIS DEKORASI BARANG DARI GELAS KERAMIK SERTA SERTA HIASAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7331",
    label: "PENGRAJIN KAYU DAN BAHAN LAIN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7332",
    label: "PENGRAJIN TEKSTIL KULIT DAN BAHAN LAIN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "7341",
    label: "TUKANG PASANG HURUF, TUKANG SUSUN HURUF DAN JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7342",
    label: "PEMBUAT KLISE STEREOTYPE DAN ELECTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7343",
    label: "OPERATOR MESIN PEMBUAT KLISE, CETAK DAN PENYEKETSA KLISE",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7344",
    label: "FOTOGRAFER DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7345",
    label: "PENJILID BUKU DAN JABATAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7346",
    label: "TUKANG CETAK KASA SUTRA BALOK DAN TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7411",
    label:
      "TUKANG POTONG HEWAN, PENJUAL DAGING DAN PENGOLAH MAKANAN DAN JABATAN SEJENIS",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "7412",
    label: "PEMBUAT ROTI, KUE DAN KEMBANG GULA",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "7413",
    label: "PENGOLAH DAN PENGHASIL SUSU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7414",
    label: "PENGAWET BUAH DAN SAYURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7415",
    label: "PENCICIP DAN PEMERIKSA MAKANAN DAN MINUMAN",
    lastMonth: {
      l: 4,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 2,
    },
  },
  {
    code: "7416",
    label: "PENYIAP DAN PENGOLAH PRODUK TEMBAKAU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7421",
    label: "PENGAWET KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7422",
    label: "PEMBUAT LEMARI DAN JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7423",
    label: "PEMASANG DAN OPERATOR MESIN PENGOLAH KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7424",
    label: "PENGANYAM KERANJANG DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7431",
    label: "PENGOLAH SERAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7432",
    label: "PENENUN, PERAJUT DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7433",
    label: "PENJAHIT, PEMBUAT PAKAIAN WANITA DAN PEMBUAT TOPI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7434",
    label: "PEDAGANG/PEMBUAT PAKAIAN BULU DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7435",
    label: "PEMOTONG POLA PAKAIAN, KULIT DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7436",
    label: "PENJAHIT, PENYULAM DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "7437",
    label: "TUKANG MELAPISI PERABOT RUMAH DAN JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7441",
    label: "JURU RIAS KULIT, BULU, PENYAMAK KULIT DAN PEDAGANG KULIT BINATANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7442",
    label: "PEMBUAT SEPATU DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8",
    label: "OPERATOR DAN PERAKIT MESIN DAN MESIN PABRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8111",
    label: "OPERATOR PABRIK PERTAMBANGAN",
    lastMonth: {
      l: 368,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 368,
      w: 0,
    },
  },
  {
    code: "8112",
    label: "OPERATOR MESIN UNTUK PENGOLAHAN BAHAN GALIAN BIJI BESI DAN BATU",
    lastMonth: {
      l: 8,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 0,
    },
  },
  {
    code: "8113",
    label: "PEMBOR DAN PENGGALI SUMUR DAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8121",
    label: "OPERATOR TUNGKU PELEBURAN LOGAM DAN BIJI BESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8122",
    label: "OPERATOR PELEBURAN LOGAM, PENGGILINGAN DAN PENGAIL LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8124",
    label: "PEMBENTUK DAN PENGERAS LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8131",
    label: "OPERATOR MESIN KACA, SERTA ALAT PEMBAKAR KERAMIK DAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8139",
    label: "OPERATOR PABRIK KACA, KERAMIK SERTA YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8141",
    label: "OPERATOR MESIN PABRIK PENGOLAHAN KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8142",
    label: "OPERATOR MESIN PABRIK BUBUR KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8143",
    label: "OPERATOR MESIN PABRIK PEMBUAT KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8151",
    label: "OPERATOR MESIN PENUMBUK, PENGGILING DAN PENCAMPUR BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8152",
    label: "OPERATOR MESIN PABRIK PEMANASAN BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8153",
    label: "OPERATOR PERALATAN PENYARING DAN PEMISAH BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8154",
    label:
      "OPERATOR REAKTOR DAN PENYULINGAN DAN BAHAN KIMIA (KECUALI MINYAK TANAH DAN GAS BUMI)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8155",
    label: "OPERATOR MESIN PABRIK PENYARING MINYAK DAN GAS",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "8159",
    label: "OPERATOR PABRIK PENGOLAH BAHAN KIMIA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8161",
    label: "OPERATOR MESIN PABRIK TENAGA PRODUKSI",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "8162",
    label: "OPERATOR MESIN UAP DAN KETEL UAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8163",
    label:
      "OPERATOR MESIN LISTRIK PEMBAKARAN, PENGOLAHAN AIR DAN PEMBAKARAN SAMPAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8171",
    label: "OPERATOR PERAKITAN AUTOMATIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8172",
    label: "OPERATOR ROBOT INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8211",
    label: "OPERATOR PERALATAN MESIN",
    lastMonth: {
      l: 6,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 6,
      w: 0,
    },
  },
  {
    code: "8212",
    label: "OPERATOR MESIN PRODUKSI SEMEN DAN MINERAL LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8221",
    label: "OPERATOR MESIN PRODUKSI BARANG FARMASI DAN KOSMETIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8222",
    label: "OPERATOR MESIN PRODUKSI BAHAN PELEDAK DAN AMUNISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8223",
    label: "OPERATOR MESIN PELAPIS, PENYEPUH DAN PENYEMPURNA LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8224",
    label: "OPERATOR MESIN PRODUKSI BARANG FOTOGRAFIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8229",
    label: "OPERATOR MESIN BARANG BAHAN KIMIA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8231",
    label: "OPERATOR MESIN BARANG DARI KARET",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8232",
    label: "OPERATOR MESIN PRODUKSI BARANG DARI PLASTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8240",
    label: "OPERATOR MESIN PRODUKSI KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8251",
    label: "OPERATOR MESIN CETAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8252",
    label: "OPERATOR MESIN PENJILID BUKU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8253",
    label: "OPERATOR MESIN PRODUKSI BARANG DARI KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8261",
    label: "OPERATOR MESIN PENYEDIAAN SERAT PEMINTALAN DAN PENGGULUNGAN BENANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8262",
    label: "OPERATOR MESIN RAJUT DAN TENUN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8263",
    label: "OPERATOR MESIN JAHIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8264",
    label: "OPERATOR MESIN PEMBERSIH, PEMUTIH DAN PEWARNA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8265",
    label: "OPERATOR MESIN PENGOLAH BUKU BINATANG DAN KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8266",
    label: "OPERATOR MESIN PEMBUAT SEPATU DAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8269",
    label: "OPERATOR MESIN PRODUKSI TEKSTIL, KULIT BINATANG & YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8271",
    label: "OPERATOR MESIN PENGOLAH DAGING DAN IKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8272",
    label: "OPERATOR MESIN PENGOLAH PRODUKSI SUSU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8273",
    label: "OPERATOR MESIN PENGGILING PADI-PADIAN DAN REMPAH/BUMBU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8274",
    label: "OPERATOR MESIN PENGHASIL COKLAT, BIJI-BIJIAN DAN ROTI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8275",
    label:
      "OPERATOR MESIN PENGOLAH KACANG-KACANGAN, SAYUR-SAYURAN DAN BUAH-BUAHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8276",
    label: "OPERATOR MESIN PRODUKSI GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8277",
    label: "OPERATOR MESIN PENGOLAH TEH, KOPI DAN COKLAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8278",
    label:
      "OPERATOR MESIN PEMBUAT MINUMAN KERAS, MINUMAN RINGAN DAN MINUMAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8279",
    label: "OPERATOR MESIN PENGOLAH TEMBAKAU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8281",
    label: "PERAKIT MESIN MEKANIK",
    lastMonth: {
      l: 353,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 353,
      w: 0,
    },
  },
  {
    code: "8282",
    label: "PERAKIT PERALATAN LISTRIK",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "8283",
    label: "PERAKIT PERALATAN ELEKTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8284",
    label: "PERAKIT BARANG LOGAM, KARET DAN PLASTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8285",
    label: "PERAKIT KAYU DAN BARANG-BARANG YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8286",
    label: "PERAKIT KARTON (PAPER BOARD) TEKSTIL DAN BARANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8290",
    label: "PERAKIT DAN OPERATOR MESIN LAINNYA",
    lastMonth: {
      l: 95,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 95,
      w: 0,
    },
  },
  {
    code: "8311",
    label: "MASINIS MESIN LOKOMOTIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8312",
    label: "PELAYAN REM KERETA API, PESINYAL DAN PELANGSIR KERETA API",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8321",
    label: "PENGEMUDI KENDARAAN BERMOTOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8322",
    label: "PENGEMUDI MOBIL, TAXI DAN MOBIL ANGKUTAN",
    lastMonth: {
      l: 69,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 69,
      w: 0,
    },
  },
  {
    code: "8323",
    label: "PENGEMUDI BUS DAN KENDARAAN LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8324",
    label: "PENGEMUDI TRUK DAN KENDARAAN ANGKUTAN BARANG",
    lastMonth: {
      l: 57,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 57,
      w: 0,
    },
  },
  {
    code: "8331",
    label: "OPERATOR MESIN KENDARAAN PERTANIAN DAN KEHUTANAN",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "8332",
    label: "OPERATOR MESIN PENGANGKUT YANAH DAN YBDI",
    lastMonth: {
      l: 434,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 434,
      w: 0,
    },
  },
  {
    code: "8333",
    label: "OPERATOR MESIN DEREK SERTA ALAT PENGANGKAT & YBDI",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "8334",
    label: "OPERATOR TRUK PENGANGKUT",
    lastMonth: {
      l: 567,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 567,
      w: 0,
    },
  },
  {
    code: "8340",
    label: "KELASI KAPAL DAN PEKERJA YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9",
    label: "PEKERJA KASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9111",
    label: "PEDAGANG KAKI LIMA DI JALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9112",
    label: "PEDAGANG KAKI LIMA JALANAN PRODUK BUKAN MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9113",
    label: "PEDAGANG DARI RUMAH KE RUMAH ATAU MELALUI TELEPON",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9120",
    label: "PENYEMIR SEPATU DAN PEKERJA JASA JALANAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9131",
    label: "PEMBERSIH DAN PRAMU WISMA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9132",
    label: "PEMBERSIH DAN PEMBANTU DI KANTOR, HOTEL DAN PERUSAHAAN LAINNYA",
    lastMonth: {
      l: 10,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 10,
      w: 6,
    },
  },
  {
    code: "9133",
    label: "PENATU DAN PENGEPRES DENGAN TANGAN",
    lastMonth: {
      l: 7,
      w: 6,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 6,
    },
  },
  {
    code: "9141",
    label: "PENGURUS GEDUNG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9142",
    label: "PEMBERSIH KENDARAAN, JENDELA DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9151",
    label: "PESURUH PEMBAWA DAN PENGIRIM PAKET DAN BARANG BAWAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9152",
    label: "PENJAGA PINTU, PENJAGA KEAMANAN DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 160,
      w: 10,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 160,
      w: 10,
    },
  },
  {
    code: "9153",
    label: "PENGUMPUL UANG MESIN PENJAJA PEMBACA METERAN DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9162",
    label: "PENYAPU DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "9211",
    label: "PETANI TRADISIONAL DAN PEKERJA PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9212",
    label: "PEKERJA KEHUTANAN",
    lastMonth: {
      l: 7,
      w: 4,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7,
      w: 4,
    },
  },
  {
    code: "9213",
    label: "NELAYAN, PEMBURU DAN PEKERJA PEMASANG PERANGKAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9311",
    label: "PEKERJA PERTAMBANGAN DAN PENGGALIAN",
    lastMonth: {
      l: 350,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 350,
      w: 0,
    },
  },
  {
    code: "9312",
    label:
      "PEKERJA KONSTRUKSI DAN PERAWAT JALAN, BENDUNGAN DAN KONSTRUKSI SEJENIS",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "9313",
    label: "PEKERJA KONSTRUKSI GEDUNG",
    lastMonth: {
      l: 4,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 0,
    },
  },
  {
    code: "9321",
    label: "PEKERJA PERAKITAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9322",
    label: "PEKERJA PENGEMAS DENGAN TANGAN DAN PEKERJA PABRIK LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9331",
    label: "PENGEMUDI KENDARAAN KAYUH ATAU KENDARAAN DORONG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9332",
    label: "PENGEMUDI MESIN DAN KENDARAAN YANG DITARIK HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9333",
    label: "PEMBONGKAR MUAT",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "JUMLAH",
    label: "JUMLAH",
    lastMonth: {
      l: 7043,
      w: 2846,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 7043,
      w: 2846,
    },
  },
];
export const ipk34Data: GenericRow[] = [
  {
    code: "1000",
    label: "SEKOLAH DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1101",
    label: "TIDAK TAMAT SD",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1102",
    label: "TAMAT SD",
    lastMonth: {
      l: 122,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 122,
      w: 0,
    },
  },
  {
    code: "1103",
    label: "SETINGKAT SD",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1199",
    label: "SD - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2000",
    label: "PENDIDIKAN MENENGAH PERTAMA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2101",
    label: "SEKOLAH MENENGAH PERTAMA",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "2102",
    label: "MADRASAH DINIYAH SANAWIYAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2103",
    label: "LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2104",
    label: "SLTP KEJURUAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2199",
    label: "SLTP - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3000",
    label: "PENDIDIKAN MENENGAH ATAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3101",
    label: "TEKNIK BANGUNAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3102",
    label: "TEKNIK PLUMBING DAN SANITASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3103",
    label: "TEKNIK SURVEI DAN PEMETAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3104",
    label: "TEKNIK KETENAGALISTRIKAN",
    lastMonth: {
      l: 19,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 19,
      w: 0,
    },
  },
  {
    code: "3105",
    label: "TEKNIK PENDINGINAN DAN TATA UDARA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3106",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 41,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 41,
      w: 0,
    },
  },
  {
    code: "3107",
    label: "TEKNIK OTOMOTIF",
    lastMonth: {
      l: 57,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 57,
      w: 0,
    },
  },
  {
    code: "3108",
    label: "TEKNOLOGI PESAWAT UDARA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3109",
    label: "TEKNIK PERKAPALAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3110",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3111",
    label: "TEKNIK GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3112",
    label: "GEOLOGI PERTAMBANGAN",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "3113",
    label: "INSTRUMENTASI INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3114",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 2,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 1,
    },
  },
  {
    code: "3115",
    label: "PELAYARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3116",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3117",
    label: "TEKNIK PERMINYAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3118",
    label: "TEKNIK ELEKTRONIKA",
    lastMonth: {
      l: 16,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 16,
      w: 0,
    },
  },
  {
    code: "3201",
    label: "TEKNIK TELEKOMUNIKASI",
    lastMonth: {
      l: 12,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 12,
      w: 0,
    },
  },
  {
    code: "3202",
    label: "TEKNIK KOMPUTER DAN INFORMATIKA",
    lastMonth: {
      l: 9,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 9,
      w: 0,
    },
  },
  {
    code: "3203",
    label: "TEKNIK BROADCASTING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3301",
    label: "KESEHATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3302",
    label: "PERAWATAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3401",
    label: "SENI RUPA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3402",
    label: "DESAIN DAN PRODUKSI KRIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3403",
    label: "SENI PERTUNJUKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3404",
    label: "PARIWISATA",
    lastMonth: {
      l: 4,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 0,
    },
  },
  {
    code: "3405",
    label: "TATA BOGA",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "3406",
    label: "TATA KECANTIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3407",
    label: "TATA BUSANA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3501",
    label: "AGRIBISNIS PRODUKSI TANAMAN",
    lastMonth: {
      l: 13,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 13,
      w: 0,
    },
  },
  {
    code: "3502",
    label: "AGRIBISNIS PRODUKSI TERNAK",
    lastMonth: {
      l: 11,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 0,
    },
  },
  {
    code: "3503",
    label: "AGRIBISNIS PRODUKSI SUMBERDAYA PERAIRAN",
    lastMonth: {
      l: 16,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 16,
      w: 0,
    },
  },
  {
    code: "3504",
    label: "MEKANISASI PERTANIAN",
    lastMonth: {
      l: 5,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 0,
    },
  },
  {
    code: "3505",
    label: "AGRIBISNIS HASIL PERTANIAN",
    lastMonth: {
      l: 5,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 0,
    },
  },
  {
    code: "3506",
    label: "PENYULUHAN PERTANIAN",
    lastMonth: {
      l: 5,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 5,
      w: 0,
    },
  },
  {
    code: "3507",
    label: "KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3601",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 6,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 6,
      w: 0,
    },
  },
  {
    code: "3602",
    label: "KEUANGAN",
    lastMonth: {
      l: 41,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 41,
      w: 0,
    },
  },
  {
    code: "3603",
    label: "TATA NIAGA",
    lastMonth: {
      l: 31,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 31,
      w: 0,
    },
  },
  {
    code: "3701",
    label: "SLTA LAINNYA",
    lastMonth: {
      l: 22,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 22,
      w: 0,
    },
  },
  {
    code: "3702",
    label: "SLTA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3801",
    label: "SMU",
    lastMonth: {
      l: 11,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 11,
      w: 2,
    },
  },
  {
    code: "3802",
    label: "MADRASAH DINIYAH ALIYAH",
    lastMonth: {
      l: 25,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 25,
      w: 1,
    },
  },
  {
    code: "4000",
    label: "DIPLOMA I / AKTA I",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4101",
    label: "PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4102",
    label: "PENDIDIKAN LUAR SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4103",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4104",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4105",
    label: "ILMU PENGETAHUAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4106",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4107",
    label: "ADMINISTRASI KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4108",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4109",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4110",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4111",
    label: "KESEKRETARIATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4112",
    label: "OLAH RAGA KESEHATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4113",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4114",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4115",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4116",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4117",
    label: "KETRAMPILAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4118",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4119",
    label: "ILMU PENGETAHUAN ALAM/FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4120",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4121",
    label: "PROGRAM KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4122",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4123",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4124",
    label: "KERJA KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4125",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4126",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4127",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4128",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4129",
    label: "DIPLOMA I/AKTA I LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4199",
    label: "DIPLOMA I - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4200",
    label: "DIPLOMA II / AKTA II",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4201",
    label: "PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4202",
    label: "PENDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4203",
    label: "PENDIDIKAN LUAR SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4204",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4205",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4206",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4207",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4208",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4209",
    label: "PENDIDIKAN KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4210",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4211",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4212",
    label: "KESEKRETARIATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4213",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4214",
    label: "MARKETING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4215",
    label: "AKUTANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4216",
    label: "OLAH RAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4217",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4218",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4219",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4220",
    label: "ILMU PENGETAHUAN ALAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4221",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4222",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4223",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4224",
    label: "KETRAMPILAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4225",
    label: "KERJA KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4226",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4227",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4228",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4229",
    label: "KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4230",
    label: "DIPLOMA II/AKTA II LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4299",
    label: "DIPLOMA II - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5000",
    label: "DIPLOMA III/AKTA III/AKADEMI/S.MUDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5101",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5102",
    label: "ASTRONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5103",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5104",
    label: "GEOLOGI DAN PERTAMBANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5105",
    label: "METEOROLOGI DAN GEOFISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5106",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5107",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5108",
    label: "ILMU STATISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5109",
    label: "ILMU KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5110",
    label: "KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5111",
    label: "ILMU PASTI/ALAM LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5199",
    label: "ILMU PASTI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5201",
    label: "TEKNIK GEODESI/GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5202",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5203",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5204",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5205",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5206",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5207",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5208",
    label: "TEKNIK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5210",
    label: "FISIKA TEKNIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5211",
    label: "TEKNIK NUKLIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5212",
    label: "PENGOLAH GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5213",
    label: "TEKNOLOGI KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5214",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5215",
    label: "TEKNOLOGI GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5217",
    label: "TEKNOLOGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5299",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5301",
    label: "PERTANIAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5302",
    label: "HORTIKULTURA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5303",
    label: "HASIL PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5304",
    label: "EKONOMI PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5306",
    label: "ILMU TANAH DAN AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5307",
    label: "KEDOKTERAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5308",
    label: "PETERNAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5309",
    label: "PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5310",
    label: "KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5311",
    label: "PERTANIAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5399",
    label: "PERTANIAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5401",
    label: "KEDOKTERAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5402",
    label: "KEDOKTERAN GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5403",
    label: "FARMASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5404",
    label: "PENILIK KESEHATAN/HYGINE/GIZI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5405",
    label: "ANASTESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5406",
    label: "FISIOTERAPI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5407",
    label: "PERAWAT",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "5408",
    label: "PENATA RONTGEN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5409",
    label: "KESEHATAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 2,
    },
  },
  {
    code: "5499",
    label: "KESEHATAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5501",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5502",
    label: "AKUNTANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5503",
    label: "KEUANGAN DAN PAJAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5504",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5505",
    label: "ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5506",
    label: "SOSIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5507",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5508",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5509",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "5510",
    label: "SEKRETARIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5511",
    label: "MANAJEMENT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5512",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5513",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5514",
    label: "ARKEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5515",
    label: "FILSAFAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5516",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5517",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5518",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5519",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5520",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5521",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5522",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5523",
    label: "BAHASA RUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5524",
    label: "BAHASA CINA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5525",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5526",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5527",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5528",
    label: "SENI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5529",
    label: "PUBLISTIK/PENERANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5530",
    label: "ILMU KOMUNIKASI MASSA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5531",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5532",
    label: "ANAK BUAH KAPAL DAN TEKNISI PELAYARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5533",
    label: "POS DAN TELEKOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5534",
    label: "HOTEL, RESTORAN DAN PARAWISATA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5535",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5599",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5601",
    label: "PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5602",
    label: "BIMBINGAN DAN PENYULUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5603",
    label: "KURIKULUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5604",
    label: "PENDIDIKAN LUAR SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5605",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5606",
    label: "PENDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5607",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5608",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5609",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5610",
    label: "ADMINISTRASI PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5611",
    label: "ADMINISTRASI KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5612",
    label: "KESEKRETARIATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5613",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5614",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5615",
    label: "BAHSA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5616",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5617",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5618",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5619",
    label: "BAHSA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5620",
    label: "BAHSA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5621",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5622",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5623",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5624",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5625",
    label: "AKUNTANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5626",
    label: "MANAJEMEN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5627",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5628",
    label: "TATA BOGA/TATA BUSANA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5629",
    label: "OLAH RAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5630",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5631",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5632",
    label: "GEOGRAPI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5633",
    label: "BIOLOGI/ILMU HAYAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5634",
    label: "MATEMATIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5635",
    label: "KETRAMPILAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5636",
    label: "KEJURUAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5637",
    label: "SISTEM ANALIS KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5638",
    label: "TEKNIK LABORATORIUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5639",
    label: "TEKNIK GEODESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5640",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5641",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5642",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5643",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5644",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5645",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5699",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6000",
    label: "SARJANA (S1)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6101",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6102",
    label: "ILMU GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6103",
    label: "KIMIA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6104",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6105",
    label: "METEROLOGI DAN GEOFISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6106",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6107",
    label: "STATISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6108",
    label: "KOMPUTER",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "6109",
    label: "ILMU PASTI/ILMU ALAM LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6199",
    label: "ILMU PASTI/ILMU ALAM - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6201",
    label: "TEKNIK GEODESI/GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6202",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6203",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6204",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6205",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6206",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6207",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6208",
    label: "TEKNIK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6210",
    label: "FISIKA TEKNIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6211",
    label: "TEKNIK NUKLIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6212",
    label: "PENGOLAH GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6213",
    label: "TEKNOLOGI KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6214",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6215",
    label: "TEKNIK GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6217",
    label: "TEKNOLOGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6299",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6301",
    label: "PERTANIAN UMUM",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6302",
    label: "HORTIKULTURA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6303",
    label: "HASIL PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6304",
    label: "EKONOMI PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6306",
    label: "ILMU TANAH DAN AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6307",
    label: "KEDOKTERAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6308",
    label: "PERTERNAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6309",
    label: "PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6310",
    label: "KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6311",
    label: "PERTANIAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6312",
    label: "PERTANIAN - TAK TERDIFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6401",
    label: "KEDOKTERAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6402",
    label: "KEDOKTERAN GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6403",
    label: "FARMASI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6404",
    label: "KESEHATAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6499",
    label: "KESEHATAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6501",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6502",
    label: "AKUNTANSI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6503",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6504",
    label: "ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6505",
    label: "SOSIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6506",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6507",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6508",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6509",
    label: "MANAJEMENT",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6510",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6511",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6512",
    label: "ARKEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6513",
    label: "FILSAFAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6514",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6515",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6516",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6517",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6518",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6519",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6520",
    label: "BAHSA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6521",
    label: "BAHASA RUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6522",
    label: "BAHSA CINA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6523",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6524",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6525",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6526",
    label: "PUBLISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6527",
    label: "KOMUNIKASI MASSA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6528",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6529",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6599",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6601",
    label: "PENDIDIKAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6602",
    label: "ADMINISTRASI PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6603",
    label: "PEMBINAAN DAN PENYULUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6604",
    label: "KURIKULUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6605",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6606",
    label: "PINDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6607",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6608",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6609",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6610",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6611",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6612",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6613",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6614",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6615",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6616",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6617",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6618",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6619",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6620",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6621",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6622",
    label: "OLAH RAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6623",
    label: "TATA BOGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6624",
    label: "TATA GRAHA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6625",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6626",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6627",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6628",
    label: "MANAJEMANT",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "6629",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6630",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6631",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6632",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6633",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6634",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6635",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6636",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6637",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6638",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6639",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6699",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7000",
    label: "SARJANA (S2)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7101",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7102",
    label: "ILMU GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7103",
    label: "KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7104",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7105",
    label: "METEROLOGI DAN GEOPISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7106",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7107",
    label: "STATISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7108",
    label: "KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7109",
    label: "ILMU PASTI/ILMU ALAM LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7199",
    label: "ILMU PASTI/ILMU ALAM - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7201",
    label: "EKNIK GEODESI/GEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7202",
    label: "TEKNIK KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7203",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7204",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7205",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7206",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7207",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7208",
    label: "TEKNIK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7210",
    label: "FISIKA TEKNIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7211",
    label: "TEKNIK NUKLIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7212",
    label: "PENGOLAH GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7213",
    label: "TEKNOLOGI KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7214",
    label: "TEKNOLOGI TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7215",
    label: "TEKNIK GRAFIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7217",
    label: "TEKNOLOGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7299",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7301",
    label: "PERTANIAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7302",
    label: "HORTIKULTURA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7303",
    label: "HASIL PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7304",
    label: "EKONOMI PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7306",
    label: "ILMU TANAH DAN AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7307",
    label: "KEDOKTERAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7308",
    label: "PERTERNAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7309",
    label: "PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7310",
    label: "KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7311",
    label: "PERTANIAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7399",
    label: "PERTANIAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7401",
    label: "KEDOKTERAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7402",
    label: "KEDOKTERAN GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7403",
    label: "FARMASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7404",
    label: "KESEHATAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7499",
    label: "KESEHATAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7501",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7502",
    label: "AKUNTANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7503",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7504",
    label: "ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7505",
    label: "SOSIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7506",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7507",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7508",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7509",
    label: "MANAJEMENT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7510",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7511",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7512",
    label: "ARKEOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7513",
    label: "FILSAFAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7514",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7515",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7516",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7517",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7518",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7519",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7520",
    label: "BAHSA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7521",
    label: "BAHASA RUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7522",
    label: "BAHSA CINA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7523",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7524",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7525",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7526",
    label: "PUBLISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7527",
    label: "KOMUNIKASI MASSA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7528",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7529",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7599",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7601",
    label: "PENDIDIKAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7602",
    label: "ADMINISTRASI PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7603",
    label: "PEMBINAAN DAN PENYULUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7604",
    label: "KURIKULUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7605",
    label: "PSIKOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7606",
    label: "PINDIDIKAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7607",
    label: "PENDIDIKAN MORAL PANCASILA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7608",
    label: "PERPUSTAKAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7609",
    label: "KESEJAHTERAAN KELUARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7610",
    label: "ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7611",
    label: "ANTROPOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7612",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7613",
    label: "SEJARAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7614",
    label: "BAHASA INDONESIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7615",
    label: "BAHASA DAERAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7616",
    label: "BAHASA INGGRIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7617",
    label: "BAHASA JERMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7618",
    label: "BAHASA PERANCIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7619",
    label: "BAHASA BELANDA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7620",
    label: "BAHASA JEPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7621",
    label: "BAHASA ARAB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7622",
    label: "OLAH RAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7623",
    label: "TATA BOGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7624",
    label: "TATA GRAHA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7625",
    label: "KESENIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7626",
    label: "EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7627",
    label: "HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7628",
    label: "MANAJEMEN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7629",
    label: "GEOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7630",
    label: "FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7631",
    label: "ILMU KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7632",
    label: "BIOLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7633",
    label: "MATEMATIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7634",
    label: "TEKNIK MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7635",
    label: "TEKNIK SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7636",
    label: "ARSITEKTUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7637",
    label: "TEKNIK INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7638",
    label: "TEKNIK LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7639",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7699",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "JUMLAH",
    label: "JUMLAH",
    lastMonth: {
      l: 485,
      w: 17,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 485,
      w: 17,
    },
  },
];
export const ipk35Data: GenericRow[] = [
  {
    code: "",
    label: "ANGGOTA ANGKATAN BERSENJATA (KECUALI KEPOLISIAN)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "110",
    label: "ANGGOTA ANGKATAN BERSENJATA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1",
    label: "ANGGOTA BADAN LEGISLATIF, PEJABAT TINGGI PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1110",
    label: "ANGGOTA BADAN LEGISLATIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1120",
    label: "PEJABAT TINGGI PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1130",
    label: "KEPALA DESA DAN LURAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1141",
    label: "PEMIMPIN ORGANISASI PARTAI POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1142",
    label:
      "PIMPINAN ORGANISASI PENGUSAHA, PEKERJA DAN ORGANISASI YANG BERKAITAN DENGAN KEPENTINGAN DARI ORGANISASI EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1143",
    label: "PIMPINAN ORGANISASI KEMANUSIAAN DAN ORGANISASI KHUSUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1210",
    label: "DIREKTUR DAN KEPALA EKSEKUTIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1221",
    label:
      "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG PERTANIAN PERBURUAN DAN PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1223",
    label: "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG KONSTRUKSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1224",
    label:
      "MANAJER PRODUKSI DAN OPERASI DOKUMEN DALAM BIDANG PERDAGANGA BESAR DAN ECERAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1225",
    label: "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG HOTEL DAN RESTORAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1226",
    label:
      "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG ANGKUTAN (LAYANAN TELEKOMUNIKASI) PERGUDANGAN & KOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1227",
    label: "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG PERUSAHAAN JASA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1228",
    label:
      "MANAJER PRODUKSI DAN OPERASI DALAM BIDANG KESEJAHTERAAN DAN KEBERSIHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1229",
    label:
      "MANAJER PRODUKSI DAN OPERASI TIDAK DAPAT DIKLASIFIKASIKAN PADA 1221-1228",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1231",
    label: "MANAJER KEUANGAN DAN ADMINISTRASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1232",
    label: "MANAJER PEMASARAN DAN HUBUNGAN INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1233",
    label: "MANAJER PENJUALAN DAN PEMASARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1234",
    label: "MANAJER HUBUNGAN MASYARAKAT DAN PERIKLANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1235",
    label: "MANAJER PENYEDIAAN DAN DISTRIBUSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1236",
    label: "MANAJER JASA PERHITUNGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1237",
    label: "MANAJER PENELITIAN DAN PEMASARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1311",
    label: "MANAJER UMUM PERTANIAN, PERBURUAN KEHUTANAN DAN PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1314",
    label: "MANAJER UMUM PERDAGANGAN BESAR DAN ECERAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1315",
    label: "MANAJER UMUM HOTEL DAN RESTORAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1316",
    label: "MANAJER UMUM ANGKUTAN, PERGUDANGAN DAN KOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1317",
    label: "MANAJER UMUM PERUSAHAAN JASA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1318",
    label: "MANAJER UMUM PERAWATAN PRIBADI KEBERSIHAN DAN JASA YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "1319",
    label:
      "MANAJER UMUM YANG TIDAK DAPAT DIKLASIFIKASIKAN PADA SUB GOL 1311 SAMPAI DENGAN 1318",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2",
    label: "TENAGA PROFESIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2111",
    label: "PAKAR FISIKA DAN ASTRONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2112",
    label: "PAKAR METEOROLOGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2113",
    label: "PAKAR KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2114",
    label: "PAKAR GEOLOGI DAN GEOFISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2121",
    label: "PAKAR MATEMATIKA DAN PROFESI YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2122",
    label: "PAKAR STATISTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2131",
    label: "PERANCANG DAN ANALIS SISTEM KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2132",
    label: "PROGRAMER KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2139",
    label: "PAKAR KOMPUTER YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2141",
    label: "ARSITEK PERENCANA TATA KOTA & LALU LINTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2142",
    label: "PEREKAYASA SIPIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2143",
    label: "PEREKAYASA ELEKTRO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2144",
    label: "PERAKAYASA ELEKTRONIKA & TELEKOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2145",
    label: "PEREKAYASA MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2146",
    label: "PEREKAYASA KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2147",
    label: "PEREKAYASA PERTAMBANGAN METALURGI DAN PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2148",
    label: "KARTOGRAFER DAN SURVEYOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2149",
    label:
      "ARSITEK PEREKAYASA DAN PROFESI SEJENIS YANG TIDAK DIKLASIFIKASIKAN PADA 2141, 2142 S/D 2148",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2211",
    label: "BIOLOGI BOTANI, ZOOLOGI DAN PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2212",
    label: "PARMAKOLOG, PHATOLOG DAN PROFESI YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2213",
    label: "ARGONOMI DAN PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2221",
    label: "DOKTER UMUM",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "2222",
    label: "DOKTER GIGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2230",
    label: "PERAWAT DAN BIDAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2310",
    label:
      "PENGAJAR PROFESIONAL AKADEMI, UNIVERSITAS DAN PENDIDIKAN TINGGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2320",
    label: "PENGAJAR PROFESIONAL PENDIDIKAN MENENGAH ATAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2330",
    label: "UNIVERSITAS DAN PENDIDIKAN TINGGI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2331",
    label: "PENGAJAR SEKOLAH DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2332",
    label: "PROFESIONALIS GURU PENDIDIKAN PRA SEKOLAH DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2340",
    label: "GURU SEKOLAH LUAR BIASA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2351",
    label: "SPESIALIS METODA PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2352",
    label: "PENILIK SEKOLAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2411",
    label: "AKUNTAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2412",
    label: "TENAGA PROFESIONAL TENAGA KEPEGAWAIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2419",
    label:
      "TENAGA PROFESIONAL BIDANG BISNIS YANG TIDAK DAPATDIKLASIFIKASIKAN PADA SUB GOLONGAN 2411 DAN 2412",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "2421",
    label: "PENGACARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2422",
    label: "HAKIM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2429",
    label: "PAKAR HUKUM YTD PADA SUB GOL 2421 & 2422",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2431",
    label: "ARSIPARIS DAN KURATOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2432",
    label: "PUSTAKAWAN DAN PEMBERI INFORMASI YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2441",
    label: "PAKAR EKONOMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2442",
    label: "PAKAR SOSIOLOGI, ANTROPOLOGI DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2443",
    label: "PAKAR FILSAFAT, SEJARAH DAN ILMU POLITIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2444",
    label: "PAKAR BAHASA, PENTERJEMAH DAN JURU BAHASA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "2445",
    label: "PSIKOLOG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2446",
    label: "PEKERJA SOSIAL PROFESIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2451",
    label: "PENGARANG, WARTAWAN DAN PENULIS LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2452",
    label: "PEMAHAT, PELUKIS DAN SENIMAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2453",
    label: "PENGUBAH LAGU, PEMUSIK DAN PENYANYI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2454",
    label: "PENCIPTA TARI DAN PENARI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2455",
    label: "PEMAIN FILM, SUTRADARA FILM, DIREKTUR PANGGUNG DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "2460",
    label: "PAKAR KEAGAMAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3",
    label: "TEKNISI DAN KELOMPOK JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3111",
    label: "TEKNISI ILMU KIMIA DAN FISIKA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3112",
    label: "TEKNISI PEREKAYASAAN SIPIL",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "3113",
    label: "TEKNISI PEREKAYASAAN LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3114",
    label: "TEKNISI PEREKAYASAAN ELEKTRONIKA & TELEKOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3115",
    label: "TEKNISI PEREKAYASAAN MEKANIK",
    lastMonth: {
      l: 37,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 37,
      w: 0,
    },
  },
  {
    code: "3116",
    label: "TEKNISI PEREKAYASAAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3117",
    label: "TEKNISI PERTAMBANGAN DAN METALURGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3118",
    label: "PERANCANG GAMBAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3119",
    label:
      "TEKNISI ILMU FISIKA DAN PEREKAYASAAN YANG TIDAK DAPAT DIKLASIFKASIKAN DI 3111 S/D 3118",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3121",
    label: "ASISTEN KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3122",
    label: "OPERATOR PERLENGKAPAN KOMPUTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3123",
    label: "PENGONTROL ROBOT INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3131",
    label: "PHOTOGRAFER OPERATOR PERALATAN REKAMAN GAMBAR DAN SUARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3132",
    label: "OPERATOR PERLENGKAPAN RADIO DAN TELEKOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3133",
    label: "OPERATOR PERALATAN MEDIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3141",
    label: "PEREKAYASA KAPAL LAUT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3142",
    label: "PERWIRA DEK KAPAL LAUT DAN PILOT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3143",
    label: "PILOT PESAWAT UDARA & PROFESIONALIS SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3145",
    label: "PENGONTROL LALULINTAS UDARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3151",
    label: "PENGAWAS BANGUNAN DAN KEBAKARAN",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3152",
    label: "PENGAWAS KESELAMATAN KESEHATAN DAN KUALITAS",
    lastMonth: {
      l: 31,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 31,
      w: 1,
    },
  },
  {
    code: "3211",
    label: "TEKNISI ILMU HAYAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3212",
    label: "TEKNISI AGRONOMI DAN KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3213",
    label: "PENASEHAT PERTANIAN DAN KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3221",
    label: "ASISTEN MEDIKAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3222",
    label: "SANITARIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3223",
    label: "NUTRISIS DAN DIESTRISIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3224",
    label: "OPTOMETRIS DAN OPTOSIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3225",
    label: "ASISTEN DOKTER GIGI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3226",
    label: "PHISIOTERAPIS DAN PROFESIONALIS SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3227",
    label: "ASISTEN DOKTER HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3228",
    label: "ASISTEN PHARMASI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3229",
    label: "PROFESIONALIS KESEHATAN MODERN (KECUALI PERAWAT)YTDL",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "3231",
    label: "PROFESIONALIS PERAWAT",
    lastMonth: {
      l: 1,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 1,
    },
  },
  {
    code: "3232",
    label: "BIDAN PROFESIONALIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3241",
    label: "PRAKTISI PENGOBATAN TRADISIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3242",
    label: "PENYEMBUH KEBATINAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3310",
    label: "PROFESIONALIS GURU PENDIDIKAN DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3320",
    label: "ASOSIASI PROFESI GURU PENDIDIKAN PRA SEKOLAH DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3330",
    label: "ASOSIASI PROFESI GURU PENDIDIKAN KHUSUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3340",
    label: "PROFESIONALIS KELOMPOK GURU LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3411",
    label: "PEDAGANG DAN MAKELAR SURAT BERHARGA DAN KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3412",
    label: "PENCARI PELANGGAN ASURANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3413",
    label: "AGEN PROPERTI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3414",
    label: "KONSULTAN DAN PENYUSUN PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3415",
    label: "WAKIL PENJUAL TEKNIS DAN KOMERSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3416",
    label: "PEMBELI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3417",
    label: "PENAKSIR, PENILAI DAN PELELANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3421",
    label: "MAKELAR PERDAGANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3422",
    label: "AGEN KLIRING DAN PENGIRIMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3423",
    label: "AGEN KETENAGAKERJAAN DAN PENGERAH TENAGA KERJA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3429",
    label: "AGEN USAHA JASA DAN MAKELAR PERDAGANGAN YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3431",
    label: "SEKRETARIS ADMINISTRASI DAN ASOSIASI PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3432",
    label: "ASOSIASI PROFESI, PERDAGANGAN DAN HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3433",
    label: "PEMEGANG BUKU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3434",
    label: "KELOMPOK PROFESIONALIS STATISTIK, MATEMATI DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3439",
    label:
      "ASOSIASI PROFESI ADMINISTRASI YANG TIDAK DAPAT DIKLASIFIKASIKAN PADA SUB GOLONGAN 3431 S/D 3434",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3441",
    label: "INSPEKTUR BEA CUKAI DAN PABEAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3442",
    label: "PETUGAS PAJAK DAN BEA CUKAI PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3443",
    label: "PETUGAS PENGHITUNG KEUNTUNGAN SOSIAL PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3444",
    label: "PETUGAS PERIJINAN PEMERINTAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3449",
    label: "ASOSIASI PROFESI BEA CUKAI, PAJAK DAN PEJABAT PEMERINTAH YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3450",
    label: "INSPEKTUR POLISI DAN DETEKTIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3460",
    label: "ASOSIASI PROFESI EKERJA SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3471",
    label: "DEKORATOR DAN PERANCANG KOMERSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3472",
    label: "PENYIAR RADIO, TV DAN PENYIAR LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3473",
    label: "MUSIKUS, PENARI DAN PENARI JALANAN KLUB MALAM DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3474",
    label: "BADUT, PESULAP, PEMAIN AKROBAT DAN ASOSIASI PROFESI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3475",
    label: "PEMAIN ATLETIK DAN OLAHRAGAWAN DAN KELOMPOK PROFESIONAL SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "3480",
    label: "ASOSIASI PROFESI KEAGAMAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4",
    label: "PENATA USAHA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4111",
    label: "STENOGRAF DAN PENGETIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4112",
    label: "OPERATOR PENGOLAH DATA DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "4113",
    label: "OPERATOR DATA ENTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4114",
    label: "OPERATOR MESIN PENGHITUNG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4115",
    label: "SEKRETARIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4121",
    label: "PENATA USAHA AKUNTAN PEMBUKUAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "4122",
    label: "PENATA USAHA STATISTIK DAN KEUANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4131",
    label: "PENATA USAHA PERSEDIAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4132",
    label: "PENATA USAHA PRODUKSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4133",
    label: "PENATA USAHA ANGKUTAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4141",
    label: "PENATA USAHA PERPUSTAKAAN DAN ARSIP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4142",
    label: "PENATA USAHA PENGIRIMAN DAN PENYORTITAN SURAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4143",
    label: "PENATA USAHA PENGKODEAN, CETAK BACAAN DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4144",
    label: "PENULIS DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4190",
    label: "PENATA USAHA KANTOR LAINNYA",
    lastMonth: {
      l: 1,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 2,
    },
  },
  {
    code: "4211",
    label: "KASIR DAN PENATA USAHA TIKET",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4212",
    label: "TELER DAN PENATA USAHA TEMPAT PEMBAYARAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "4213",
    label: "BANDAR DAN PRAMU JUDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4214",
    label: "PEMILIK RUMAH GADAI DAN PEMBERI PINJAMAN UANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "4215",
    label: "PENAGIH HUTANG DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "4222",
    label: "RESEPSIONIS DAN PENATA USAHA INFORMASI",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "4223",
    label: "OPERATOR PAPAN PENYAMBUNGAN TELEPON",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5",
    label: "TENAGA USAHA JASA DAN PENJUAL DAGANGAN DI TOKO DAN PASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5111",
    label: "PRAMUGARA DAN PRAMUGARI PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5112",
    label: "KONDEKTUR PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5113",
    label: "PEMANDU PERJALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5121",
    label: "PELAYAN, PRAMU RUMAH TANGGA DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5122",
    label: "JURU MASAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5123",
    label: "PRAMU RESTORAN DAN BAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5131",
    label: "PENGASUH ANAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5132",
    label: "PENGASUH PADA LEMBAGA PERORANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5139",
    label: "PERAWAT PERORANGAN DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5141",
    label: "PEMANGKAS RAMBUT, PENATA RAMBUT PERAWATKECANTIKAN DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5142",
    label: "PRAMURIA DAN PELAYAN PRIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5143",
    label: "PENGURUS PEMAKAMAN DAN PEMBALSEMAN JENASAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5149",
    label:
      "PEKERJA JASA PERORANGAN YANG TIDAK DAPAT DIKLASIFIKASIKAN DI TEMPAT LAIN",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "5151",
    label: "PERAMAL BINTANG DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5152",
    label: "AHLI NUJUM, PERAMAL GARIS TANGAN DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5161",
    label: "PEMADAM KEBAKARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5162",
    label: "POLISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5163",
    label: "SIPIR PENJARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5169",
    label:
      "TENAGA JASA PERLINDUNGAN YANG TIDAK DAPAT DIKLASIFIKASIKAN DI TEMPAT",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "5210",
    label: "PRAGAWAN DAN PRAGAWATI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "5220",
    label: "PRAMUNIAGA DAN PEMERAGA BARANG DI TOKO",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "5230",
    label: "TENAGA PENJUALAN DI PASAR DAN PEDAGANG PINGGIR JALAN",
    lastMonth: {
      l: 3,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 1,
    },
  },
  {
    code: "6",
    label: "PEKERJA-PEKERJA KETERAMPILAN BIDANG PERTANIAN DAN PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6111",
    label: "PENANAM LADANG DAN SAYURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6112",
    label: "PENANAM POHON DAN PERKEBUNAN",
    lastMonth: {
      l: 117,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 117,
      w: 0,
    },
  },
  {
    code: "6113",
    label: "PEKERJA KEBUN HOLTIKULTURA DAN PERAWAT TUMBUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6114",
    label: "PENANAM TANAMAN CAMPURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6121",
    label: "PRODUSEN SUSU DAN PETERNAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6122",
    label: "PRODUSEN TERNAK UNGGAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6123",
    label: "PETERNAK LEBAH DAN ULAT SUTERA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6129",
    label:
      "PRODUSEN2 DAN JABATAN2 YANG BERHUBUNGAN DENGAN PEMASARAN HEWAN HASIL HEWAN TERNAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6130",
    label: "TENAGA PEMASARAN HASIL TANAMAN DAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6141",
    label: "PEKERJA KEHUTANAN DAN PENEBANG KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6142",
    label: "PEKERJA PEMBAKARAN ARANG DAN PEKERJAAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6151",
    label: "PETANI IKAN DARAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6152",
    label: "PEKERJA PERIKANAN TAMBAK DAN LAUT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6153",
    label: "NELAYAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6154",
    label: "PEMBURU DAN PEMASANGAN PERANGKAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "6210",
    label: "PEKERJA BERMATA PENCAHARIAN PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7",
    label: "PEKERJA KASAR TERAMPIL DAN SEJENISNYA YBDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7111",
    label: "PENAMBANG BATU, JURU TEMBAK DAN LEDAK ( TAMBANG )",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7112",
    label: "TEKNISI PELEDAKAN DAN PELEDAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7113",
    label: "PEMECAH BATU, PEMOTONG DAN PEMAHAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7121",
    label: "TUKANG BANGUNAN DARI BAHAN TRADISIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7122",
    label: "PEMASANG KERAMIK DAN TUKANG BATU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7123",
    label: "PEMASANG BETON CETAKAN, TUKANG POLES DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7124",
    label: "TUKANG KAYU DAN PEMBUAT PERABOT RUMAH TANGGA DARI KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7129",
    label:
      "PEMBUAT KERANGKA BANGUNAN JABATAN SEJENIS YANG TIDAK DAPAT DIKLASIFIKASIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7131",
    label: "TUKANG PASANG ATAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7132",
    label: "TUKANG PASANG UBIN DAN GENTENG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7133",
    label: "TUKANG PLESTER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7134",
    label: "TUKANG PASANG SEKAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7135",
    label: "TUKANG KACA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7136",
    label: "TUKANG LEDENG DAN TUKANG PASANG PIPA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7137",
    label: "TEKNISI LISTRIK GEDUNG DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7141",
    label: "TUKANG CAT DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7142",
    label: "TUKANG PERNIS/PELITUR DAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7143",
    label: "PEMBERSIH GEDUNG",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7211",
    label: "TUKANG CETAK LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7212",
    label: "TUKANG LAS",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "7213",
    label: "PEMBUAT BARANG LOGAM LEMBARAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7214",
    label: "PEMBUAT BAHAN BANGUNAN DARI LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7215",
    label: "PEMASANG DAN PENYAMBUNG TALI KABEL MESIN DEREK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7216",
    label: "PEKERJA BAWAH AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7221",
    label: "PANDE BESI, TUKANG TEMPA DAN PELAYAN MESIN PRES BARANG LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7222",
    label: "PEMBUAT PERKAKAS DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7223",
    label: "TUKANG POTONG MESIN PERKAKAS DAN OPERATOR PASANG MESIN PERKAKAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7224",
    label: "TUKANG GURINDA (BERODA), TUKANG POLES DAN ASAH PERKAKAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7231",
    label: "MONTIR KENDARAAN BERMOTOR DAN PEMASANG MESIN KENDARAAN BERMOTOR",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7232",
    label: "MEKANIK PESAWAT TERBANG DAN PENYETEL MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7233",
    label:
      "TEKNISI MESIN PERTANIAN ATAU TEKNISI MESIN INDUSTRI DAN PEMASANG MESIN PERTANIAN/MESIN INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7241",
    label: "TEKNISI LISTRIK DAN PEMASANG LISTRIK",
    lastMonth: {
      l: 2,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 2,
      w: 0,
    },
  },
  {
    code: "7242",
    label: "PENYETEL PERALATAN ELEKTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7243",
    label: "MEKANIK DAN PENSERVIS BARANG ELEKTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7244",
    label: "INSTALATOR DAN TEKNISI PESAWAT TELEPON DAN TELEGRAF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7245",
    label: "INSTALATOR JARINGAN KABEL DAN TEKNISI JARINGAN KABEL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7311",
    label: "PEMBUAT DAN PEREPARASI INSTRUMEN PRESISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7312",
    label: "PEMBUAT DAN PENYETEM INSTRUMEN MUSIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7313",
    label: "TUKANG INTAN PERMATA DAN PEKERJA LOGAM BERHARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7321",
    label:
      "PEMBUAT ALAT PENGGOSOK BERODA, PEMBUAT BARANG-BARANG TEMBIKAR DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7322",
    label: "PEMBUAT GELAS DAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7323",
    label: "PENGGAMBAR DAN PENGUKIR GELAS DAN KACA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7324",
    label:
      "PELUKIS DEKORASI BARANG DARI GELAS KERAMIK SERTA SERTA HIASAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7331",
    label: "PENGRAJIN KAYU DAN BAHAN LAIN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7332",
    label: "PENGRAJIN TEKSTIL KULIT DAN BAHAN LAIN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7341",
    label: "TUKANG PASANG HURUF, TUKANG SUSUN HURUF DAN JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7342",
    label: "PEMBUAT KLISE STEREOTYPE DAN ELECTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7343",
    label: "OPERATOR MESIN PEMBUAT KLISE, CETAK DAN PENYEKETSA KLISE",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7344",
    label: "FOTOGRAFER DAN JABATAN SEJENIS",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "7345",
    label: "PENJILID BUKU DAN JABATAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7346",
    label: "TUKANG CETAK KASA SUTRA BALOK DAN TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7411",
    label:
      "TUKANG POTONG HEWAN, PENJUAL DAGING DAN PENGOLAH MAKANAN DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7412",
    label: "PEMBUAT ROTI, KUE DAN KEMBANG GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7413",
    label: "PENGOLAH DAN PENGHASIL SUSU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7414",
    label: "PENGAWET BUAH DAN SAYURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7415",
    label: "PENCICIP DAN PEMERIKSA MAKANAN DAN MINUMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7416",
    label: "PENYIAP DAN PENGOLAH PRODUK TEMBAKAU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7421",
    label: "PENGAWET KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7422",
    label: "PEMBUAT LEMARI DAN JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7423",
    label: "PEMASANG DAN OPERATOR MESIN PENGOLAH KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7424",
    label: "PENGANYAM KERANJANG DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7431",
    label: "PENGOLAH SERAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7432",
    label: "PENENUN, PERAJUT DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7433",
    label: "PENJAHIT, PEMBUAT PAKAIAN WANITA DAN PEMBUAT TOPI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7434",
    label: "PEDAGANG/PEMBUAT PAKAIAN BULU DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7435",
    label: "PEMOTONG POLA PAKAIAN, KULIT DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7436",
    label: "PENJAHIT, PENYULAM DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7437",
    label: "TUKANG MELAPISI PERABOT RUMAH DAN JABATAN YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7441",
    label: "JURU RIAS KULIT, BULU, PENYAMAK KULIT DAN PEDAGANG KULIT BINATANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "7442",
    label: "PEMBUAT SEPATU DAN JABATAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8",
    label: "OPERATOR DAN PERAKIT MESIN DAN MESIN PABRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8111",
    label: "OPERATOR PABRIK PERTAMBANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8112",
    label: "OPERATOR MESIN UNTUK PENGOLAHAN BAHAN GALIAN BIJI BESI DAN BATU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8113",
    label: "PEMBOR DAN PENGGALI SUMUR DAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8121",
    label: "OPERATOR TUNGKU PELEBURAN LOGAM DAN BIJI BESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8122",
    label: "OPERATOR PELEBURAN LOGAM, PENGGILINGAN DAN PENGAIL LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8124",
    label: "PEMBENTUK DAN PENGERAS LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8131",
    label: "OPERATOR MESIN KACA, SERTA ALAT PEMBAKAR KERAMIK DAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8139",
    label: "OPERATOR PABRIK KACA, KERAMIK SERTA YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8141",
    label: "OPERATOR MESIN PABRIK PENGOLAHAN KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8142",
    label: "OPERATOR MESIN PABRIK BUBUR KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8143",
    label: "OPERATOR MESIN PABRIK PEMBUAT KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8151",
    label: "OPERATOR MESIN PENUMBUK, PENGGILING DAN PENCAMPUR BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8152",
    label: "OPERATOR MESIN PABRIK PEMANASAN BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8153",
    label: "OPERATOR PERALATAN PENYARING DAN PEMISAH BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8154",
    label:
      "OPERATOR REAKTOR DAN PENYULINGAN DAN BAHAN KIMIA (KECUALI MINYAK TANAH DAN GAS BUMI)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8155",
    label: "OPERATOR MESIN PABRIK PENYARING MINYAK DAN GAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8159",
    label: "OPERATOR PABRIK PENGOLAH BAHAN KIMIA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8161",
    label: "OPERATOR MESIN PABRIK TENAGA PRODUKSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8162",
    label: "OPERATOR MESIN UAP DAN KETEL UAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8163",
    label:
      "OPERATOR MESIN LISTRIK PEMBAKARAN, PENGOLAHAN AIR DAN PEMBAKARAN SAMPAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8171",
    label: "OPERATOR PERAKITAN AUTOMATIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8172",
    label: "OPERATOR ROBOT INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8211",
    label: "OPERATOR PERALATAN MESIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8212",
    label: "OPERATOR MESIN PRODUKSI SEMEN DAN MINERAL LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8221",
    label: "OPERATOR MESIN PRODUKSI BARANG FARMASI DAN KOSMETIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8222",
    label: "OPERATOR MESIN PRODUKSI BAHAN PELEDAK DAN AMUNISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8223",
    label: "OPERATOR MESIN PELAPIS, PENYEPUH DAN PENYEMPURNA LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8224",
    label: "OPERATOR MESIN PRODUKSI BARANG FOTOGRAFIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8229",
    label: "OPERATOR MESIN BARANG BAHAN KIMIA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8231",
    label: "OPERATOR MESIN BARANG DARI KARET",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8232",
    label: "OPERATOR MESIN PRODUKSI BARANG DARI PLASTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8240",
    label: "OPERATOR MESIN PRODUKSI KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8251",
    label: "OPERATOR MESIN CETAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8252",
    label: "OPERATOR MESIN PENJILID BUKU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8253",
    label: "OPERATOR MESIN PRODUKSI BARANG DARI KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8261",
    label: "OPERATOR MESIN PENYEDIAAN SERAT PEMINTALAN DAN PENGGULUNGAN BENANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8262",
    label: "OPERATOR MESIN RAJUT DAN TENUN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8263",
    label: "OPERATOR MESIN JAHIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8264",
    label: "OPERATOR MESIN PEMBERSIH, PEMUTIH DAN PEWARNA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8265",
    label: "OPERATOR MESIN PENGOLAH BUKU BINATANG DAN KULIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8266",
    label: "OPERATOR MESIN PEMBUAT SEPATU DAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8269",
    label: "OPERATOR MESIN PRODUKSI TEKSTIL, KULIT BINATANG & YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8271",
    label: "OPERATOR MESIN PENGOLAH DAGING DAN IKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8272",
    label: "OPERATOR MESIN PENGOLAH PRODUKSI SUSU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8273",
    label: "OPERATOR MESIN PENGGILING PADI-PADIAN DAN REMPAH/BUMBU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8274",
    label: "OPERATOR MESIN PENGHASIL COKLAT, BIJI-BIJIAN DAN ROTI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8275",
    label:
      "OPERATOR MESIN PENGOLAH KACANG-KACANGAN, SAYUR-SAYURAN DAN BUAH-BUAHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8276",
    label: "OPERATOR MESIN PRODUKSI GULA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8277",
    label: "OPERATOR MESIN PENGOLAH TEH, KOPI DAN COKLAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8278",
    label:
      "OPERATOR MESIN PEMBUAT MINUMAN KERAS, MINUMAN RINGAN DAN MINUMAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8279",
    label: "OPERATOR MESIN PENGOLAH TEMBAKAU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8281",
    label: "PERAKIT MESIN MEKANIK",
    lastMonth: {
      l: 93,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 93,
      w: 0,
    },
  },
  {
    code: "8282",
    label: "PERAKIT PERALATAN LISTRIK",
    lastMonth: {
      l: 4,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 0,
    },
  },
  {
    code: "8283",
    label: "PERAKIT PERALATAN ELEKTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8284",
    label: "PERAKIT BARANG LOGAM, KARET DAN PLASTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8285",
    label: "PERAKIT KAYU DAN BARANG-BARANG YANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8286",
    label: "PERAKIT KARTON (PAPER BOARD) TEKSTIL DAN BARANG SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8290",
    label: "PERAKIT DAN OPERATOR MESIN LAINNYA",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "8311",
    label: "MASINIS MESIN LOKOMOTIF",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8312",
    label: "PELAYAN REM KERETA API, PESINYAL DAN PELANGSIR KERETA API",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8321",
    label: "PENGEMUDI KENDARAAN BERMOTOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8322",
    label: "PENGEMUDI MOBIL, TAXI DAN MOBIL ANGKUTAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8323",
    label: "PENGEMUDI BUS DAN KENDARAAN LISTRIK",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "8324",
    label: "PENGEMUDI TRUK DAN KENDARAAN ANGKUTAN BARANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8331",
    label: "OPERATOR MESIN KENDARAAN PERTANIAN DAN KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "8332",
    label: "OPERATOR MESIN PENGANGKUT YANAH DAN YBDI",
    lastMonth: {
      l: 34,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 34,
      w: 0,
    },
  },
  {
    code: "8333",
    label: "OPERATOR MESIN DEREK SERTA ALAT PENGANGKAT & YBDI",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "8334",
    label: "OPERATOR TRUK PENGANGKUT",
    lastMonth: {
      l: 135,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 135,
      w: 0,
    },
  },
  {
    code: "8340",
    label: "KELASI KAPAL DAN PEKERJA YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9",
    label: "PEKERJA KASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9111",
    label: "PEDAGANG KAKI LIMA DI JALANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9112",
    label: "PEDAGANG KAKI LIMA JALANAN PRODUK BUKAN MAKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9113",
    label: "PEDAGANG DARI RUMAH KE RUMAH ATAU MELALUI TELEPON",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9120",
    label: "PENYEMIR SEPATU DAN PEKERJA JASA JALANAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9131",
    label: "PEMBERSIH DAN PRAMU WISMA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9132",
    label: "PEMBERSIH DAN PEMBANTU DI KANTOR, HOTEL DAN PERUSAHAAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9133",
    label: "PENATU DAN PENGEPRES DENGAN TANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9141",
    label: "PENGURUS GEDUNG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9142",
    label: "PEMBERSIH KENDARAAN, JENDELA DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9151",
    label: "PESURUH PEMBAWA DAN PENGIRIM PAKET DAN BARANG BAWAAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9152",
    label: "PENJAGA PINTU, PENJAGA KEAMANAN DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 6,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 6,
      w: 0,
    },
  },
  {
    code: "9153",
    label: "PENGUMPUL UANG MESIN PENJAJA PEMBACA METERAN DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9162",
    label: "PENYAPU DAN PEKERJA SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9211",
    label: "PETANI TRADISIONAL DAN PEKERJA PERTANIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9212",
    label: "PEKERJA KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9213",
    label: "NELAYAN, PEMBURU DAN PEKERJA PEMASANG PERANGKAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9311",
    label: "PEKERJA PERTAMBANGAN DAN PENGGALIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9312",
    label:
      "PEKERJA KONSTRUKSI DAN PERAWAT JALAN, BENDUNGAN DAN KONSTRUKSI SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9313",
    label: "PEKERJA KONSTRUKSI GEDUNG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9321",
    label: "PEKERJA PERAKITAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9322",
    label: "PEKERJA PENGEMAS DENGAN TANGAN DAN PEKERJA PABRIK LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9331",
    label: "PENGEMUDI KENDARAAN KAYUH ATAU KENDARAAN DORONG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9332",
    label: "PENGEMUDI MESIN DAN KENDARAAN YANG DITARIK HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "9333",
    label: "PEMBONGKAR MUAT",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "JUMLAH",
    label: "JUMLAH",
    lastMonth: {
      l: 485,
      w: 17,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 485,
      w: 17,
    },
  },
];
export const ipk36Data: GenericRow[] = [
  {
    code: "A",
    label: "PERTANIAN, KEHUTANAN DAN PERIKANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "11",
    label: "PERTANIAN TANAMAN SEMUSIM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "12",
    label: "PERTANIAN TANAMAN TAHUNAN",
    lastMonth: {
      l: 147,
      w: 7,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 147,
      w: 7,
    },
  },
  {
    code: "13",
    label: "PERTANIAN TANAMAN HIAS DAN PENGEMBANGBIAKAN TANAMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "14",
    label: "PETERNAKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "16",
    label: "JASA PENUNJANG PERTANIAN DAN PASCA PANEN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "17",
    label: "PERBURUAN, PENANGKAPAN DAN PENANGKARAN SATWA LIAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "21",
    label: "PENGUSAHAAN HUTAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "22",
    label: "PENEBANGAN DAN PEMUNGUTAN KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "23",
    label: "PEMUNGUTAN HASIL HUTAN BUKAN KAYU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "24",
    label: "JASA PENUNJANG KEHUTANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "31",
    label: "PERIKANAN TANGKAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "32",
    label: "PERIKANAN BUDIDAYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "B",
    label: "PERTAMBANGAN DAN PENGGALIAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "51",
    label: "PERTAMBANGAN BATU BARA",
    lastMonth: {
      l: 305,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 305,
      w: 0,
    },
  },
  {
    code: "52",
    label: "PERTAMBANGAN LIGNIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "61",
    label: "PERTAMBANGAN MINYAK BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "62",
    label: "PERTAMBANGAN GAS ALAM DAN PANAS BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "71",
    label: "PERTAMBANGAN PASIR BESI DAN BIJIH BESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "72",
    label:
      "PERTAMBANGAN BIJIH LOGAM YANG TIDAK MENGANDUNG BESI,TIDAK TERMASUK BIJIH LOGAM MULIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "73",
    label: "PERTAMBANGAN BIJIH LOGAM MULIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "81",
    label: "PENGGALIAN BATU, PASIR DAN TANAH LIAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "89",
    label: "PERTAMBANGAN DAN PENGGALIAN LAINNYA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "91",
    label: "JASA PERTAMBANGAN MINYAK BUMI DAN GAS ALAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "99",
    label: "JASA PERTAMBANGAN DAN PENGGALIAN LAINNYA",
    lastMonth: {
      l: 4,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 4,
      w: 1,
    },
  },
  {
    code: "C",
    label: "INDUSTRI PENGOLAHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "101",
    label: "INDUSTRI PENGOLAHAN DAN PENGAWETAN DAGING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "102",
    label: "INDUSTRI PENGOLAHAN DAN PENGAWETAN IKAN DAN BIOTA AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "103",
    label: "INDUSTRI PENGOLAHAN DAN PENGAWETAN BUAH-BUAHAN DAN SAYURAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "104",
    label: "INDUSTRI MINYAK MAKAN DAN LEMAK NABATI DAN HEWANI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "105",
    label: "INDUSTRI PENGOLAHAN SUSU, PRODUK DARI SUSU DAN ES KRIM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "106",
    label: "INDUSTRI PENGGILINGAN PADI-PADIAN, TEPUNG DAN PATI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "107",
    label: "INDUSTRI MAKANAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "108",
    label: "INDUSTRI MAKANAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "110",
    label: "INDUSTRI MINUMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "120",
    label: "INDUSTRI PENGOLAHAN TEMBAKAU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "131",
    label: "INDUSTRI PEMINTALAN, PENENUNAN DAN PENYELESAIAN AKHIR TEKSTIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "139",
    label: "INDUSTRI TEKSTIL LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "141",
    label:
      "INDUSTRI PAKAIAN JADI DAN PERLENGKAPANNYA, BUKAN PAKAIAN JADI DARI KULIT BERBULU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "142",
    label: "INDUSTRI PAKAIAN JADI DAN BARANG DARI KULIT BERBULU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "143",
    label: "INDUSTRI PAKAIAN JADI RAJUTAN DAN SULAMAN/BORDIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "151",
    label: "INDUSTRI KULIT DAN BARANG DARI KULIT, TERMASUK KULIT BUATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "152",
    label: "INDUSTRI ALAS KAKI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "161",
    label:
      "INDUSTRI PENGGERGAJIAN DAN PENGAWETAN KAYU, ROTAN, BAMBU DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "162",
    label:
      "INDUSTRI BARANG DARI KAYU; INDUSTRI BARANG DARI GABUS DAN BARANG ANYAMAN DARI JERAMI, ROTAN, BAMBU DAN SEJENIS LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "170",
    label: "INDUSTRI KERTAS DAN BARANG DARI KERTAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "181",
    label: "INDUSTRI PENCETAKAN DAN KEGIATAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "182",
    label: "REPRODUKSI MEDIA REKAMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "191",
    label: "INDUSTRI PRODUK DARI BATU BARA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "192",
    label: "INDUSTRI PRODUK PENGILANGAN MINYAK BUMI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "201",
    label: "INDUSTRI BAHAN KIMIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "202",
    label: "INDUSTRI BARANG KIMIA LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "203",
    label: "INDUSTRI SERAT BUATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "210",
    label: "INDUSTRI FARMASI, PRODUK OBAT KIMIA DAN OBAT TRADISIONAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "221",
    label: "INDUSTRI KARET DAN BARANG DARI KARET",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "222",
    label: "INDUSTRI BARANG DARI PLASTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "231",
    label: "INDUSTRI KACA DAN BARANG DARI KACA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "239",
    label: "INDUSTRI BARANG GALIAN BUKAN LOGAM LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "241",
    label: "INDUSTRI LOGAM DASAR BESI DAN BAJA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "242",
    label: "INDUSTRI LOGAM DASAR MULIA DAN LOGAM DASAR BUKAN BESI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "243",
    label: "INDUSTRI PENGECORAN LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "251",
    label:
      "INDUSTRI BARANG LOGAM SIAP PASANG UNTUK BANGUNAN, TANGKI, TANDON AIR DAN GENERATOR UAP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "252",
    label: "INDUSTRI SENJATA DAN AMUNISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "259",
    label: "INDUSTRI BARANG LOGAM LAINNYA DAN JASA PEMBUATAN BARANG LOGAM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "261",
    label: "INDUSTRI KOMPONEN DAN PAPAN ELEKTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "262",
    label: "INDUSTRI KOMPUTER DAN PERLENGKAPANNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "263",
    label: "INDUSTRI PERALATAN KOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "264",
    label: "INDUSTRI PERALATAN AUDIO DAN VIDEO ELEKTRONIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "265",
    label:
      "INDUSTRI ALAT UKUR, ALAT UJI, PERALATAN NAVIGASI DAN KONTROL DAN ALAT UKUR WAKTU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "266",
    label: "INDUSTRI PERALATAN IRADIASI, ELEKTROMEDIKAL DAN ELEKTROTERAPI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "267",
    label: "INDUSTRI PERALATAN FOTOGRAFI DAN INSTRUMEN OPTIK BUKAN KACA MATA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "268",
    label: "INDUSTRI MEDIA MAGNETIK DAN MEDIA OPTIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "271",
    label:
      "INDUSTRI MOTOR LISTRIK, GENERATOR, TRANSFORMATOR DAN PERALATAN PENGONTROL DAN PENDISTRIBUSIAN LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "272",
    label: "INDUSTRI BATU BATERAI DAN AKUMULATOR LISTRIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "273",
    label: "INDUSTRI KABEL DAN PERLENGKAPANNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "274",
    label:
      "INDUSTRI PERALATAN PENERANGAN LISTRIK (TERMASUK PERALATAN PENERANGAN BUKAN LISTRIK)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "275",
    label: "INDUSTRI PERALATAN RUMAH TANGGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "279",
    label: "INDUSTRI PERALATAN LISTRIK LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "281",
    label: "INDUSTRI MESIN UNTUK KEPERLUAN UMUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "282",
    label: "INDUSTRI MESIN UNTUK KEPERLUAN KHUSUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "291",
    label: "INDUSTRI KENDARAAN BERMOTOR RODA EMPAT ATAU LEBIH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "292",
    label:
      "INDUSTRI KAROSERI KENDARAAN BERMOTOR RODA EMPAT ATAU LEBIH DAN INDUSTRI TRAILER DAN SEMI TRAILER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "293",
    label:
      "INDUSTRI SUKU CADANG DAN AKSESORI KENDARAAN BERMOTOR RODA EMPAT ATAU LEBIH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "301",
    label: "INDUSTRI PEMBUATAN KAPAL DAN PERAHU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "302",
    label: "INDUSTRI LOKOMOTIF DAN GERBONG KERETA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "303",
    label: "INDUSTRI PESAWAT TERBANG DAN PERLENGKAPANNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "304",
    label: "INDUSTRI KENDARAAN PERANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "309",
    label: "INDUSTRI ALAT ANGKUTAN LAINNYA YTDL",
    lastMonth: {
      l: 0,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 1,
    },
  },
  {
    code: "310",
    label: "INDUSTRI FURNITUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "321",
    label: "INDUSTRI BARANG PERHIASAN DAN BARANG BERHARGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "322",
    label: "INDUSTRI ALAT MUSIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "323",
    label: "INDUSTRI ALAT OLAHRAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "324",
    label: "INDUSTRI ALAT PERMAINAN DAN MAINAN ANAK-ANAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "325",
    label:
      "INDUSTRI PERALATAN KEDOKTERAN DAN KEDOKTERAN GIGI SERTA PERLENGKAPANNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "329",
    label: "INDUSTRI PENGOLAHAN LAINNYA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "331",
    label: "JASA REPARASI PRODUK LOGAM PABRIKASI, MESIN DAN PERALATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "332",
    label: "JASA PEMASANGAN MESIN DAN PERALATAN INDUSTRI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "D",
    label: "PENGADAAN LISTRIK, GAS, UAP/AIR PANAS DAN UDARA DINGIN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "351",
    label: "KETENAGALISTRIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "352",
    label: "GAS ALAM DAN BUATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "353",
    label: "PENGADAAN UAP/AIR PANAS, UDARA DINGIN DAN PRODUKSI ES",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "E",
    label:
      "PENGADAAN AIR, PENGOLAHAN SAMPAHDAN DAUR ULANG, PEMBUANGAN DAN PEMBERSIHAN LIMBAH DAN SAMPAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "360",
    label: "PENGADAAN AIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "370",
    label: "PENGELOLAAN LIMBAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "381",
    label: "PENGUMPULAN SAMPAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "382",
    label: "PENGELOLAAN DAN PEMBUANGAN SAMPAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "383",
    label: "DAUR ULANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "390",
    label: "JASA PEMBERSIHAN DAN PENGELOLAAN SAMPAH LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "F",
    label: "KONSTRUKSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "410",
    label: "KONSTRUKSI GEDUNG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "421",
    label: "KONSTRUKSI JALAN DAN REL KERETA API",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "422",
    label: "KONSTRUKSI JARINGAN SALURAN UNTUK IRIGASI, KOMUNIKASI DAN LIMBAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "429",
    label: "KONSTRUKSI BANGUNAN SIPIL LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "431",
    label: "PEMBONGKARAN DAN PENYIAPAN LAHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "432",
    label:
      "INSTALASI SISTEM KELISTRIKAN, AIR (PIPA) DAN INSTALASI KONSTRUKSI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "433",
    label: "PENYELESAIAN KONSTRUKSI BANGUNAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "439",
    label: "KONSTRUKSI KHUSUS LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "G",
    label:
      "PERDAGANGAN BESAR DAN ECERAN; REPARASI DAN PERAWATAN MOBIL DAN SEPEDA MOTOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "451",
    label: "PERDAGANGAN MOBIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "452",
    label: "REPARASI DAN PERAWATAN MOBIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "453",
    label: "PERDAGANGAN SUKU CADANG DAN AKSESORI MOBIL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "454",
    label:
      "PERDAGANGAN, REPARASI DAN PERAWATAN SEPEDA MOTOR DAN PERDAGANGAN SUKU CADANG DAN AKSESORINYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "461",
    label: "PERDAGANGAN BESAR ATAS DASAR BALAS JASA (FEE) ATAU KONTRAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "462",
    label: "PERDAGANGAN BESAR HASIL PERTANIAN DAN HEWAN HIDUP",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "463",
    label: "PERDAGANGAN BESAR MAKANAN, MINUMAN DAN TEMBAKAU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "464",
    label: "PERDAGANGAN BESAR BARANG KEPERLUAN RUMAH TANGGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "465",
    label: "PERDAGANGAN BESAR MESIN, PERALATAN DAN PERLENGKAPANNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "466",
    label: "PERDAGANGAN BESAR KHUSUS LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "469",
    label: "PERDAGANGAN BESAR BERBAGAI MACAM BARANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "471",
    label: "PERDAGANGAN ECERAN BERBAGAI MACAM BARANG DI TOKO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "472",
    label: "PERDAGANGAN ECERAN KHUSUS MAKANAN, MINUMAN DAN TEMBAKAU DI TOKO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "473",
    label: "PERDAGANGAN ECERAN KHUSUS BAHAN BAKAR KENDARAAN BERMOTOR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "474",
    label:
      "PERDAGANGAN ECERAN KHUSUS PERALATAN INFORMASI DAN KOMUNIKASI DI TOKO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "475",
    label: "PERDAGANGAN ECERAN KHUSUS PERLENGKAPAN RUMAH TANGGA LAINYA DI TOKO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "476",
    label: "PERDAGANGAN ECERAN KHUSUS BARANG BUDAYA DAN REKREASI DI TOKO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "477",
    label: "PERDAGANGAN ECERAN KHUSUS BARANG LAINNYA DI TOKO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "478",
    label: "PERDAGANGAN ECERAN KAKI LIMA DAN LOS PASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "479",
    label: "PERDAGANGAN ECERAN BUKAN DI TOKO, KAKI LIMA DAN LOS PASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "H",
    label: "TRANSPORTASI DAN PERGUDANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "491",
    label: "ANGKUTAN JALAN REL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "492",
    label: "ANGKUTAN BUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "493",
    label: "ANGKUTAN MELALUI SALURAN PIPA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "494",
    label: "ANGKUTAN DARAT BUKAN BUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "501",
    label: "ANGKUTAN LAUT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "502",
    label: "ANGKUTAN SUNGAI, DANAU DAN PENYEBERANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "511",
    label: "ANGKUTAN UDARA UNTUK PENUMPANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "512",
    label: "ANGKUTAN UDARA UNTUK BARANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "521",
    label: "PERGUDANGAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "522",
    label: "JASA PENUNJANG ANGKUTAN",
    lastMonth: {
      l: 1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 0,
    },
  },
  {
    code: "531",
    label: "POS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "532",
    label: "KURIR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "I",
    label: "PENYEDIAAN AKOMODASI DAN PENYEDIAAN MAKAN MINUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "551",
    label: "PENYEDIAAN AKOMODASI JANGKA PENDEK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "559",
    label: "PENYEDIAAN AKOMODASI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "561",
    label: "RESTORAN DAN PENYEDIAAN MAKANAN KELILING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "562",
    label:
      "JASA BOGA UNTUK SUATU EVENT TERTENTU (EVENT CATERING) DAN PENYEDIAAN MAKANAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "563",
    label: "PENYEDIAAN MINUMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "J",
    label: "INFORMASI DAN KOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "581",
    label: "PENERBITAN BUKU, MAJALAH DAN TERBITAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "582",
    label: "PENERBITAN PIRANTI LUNAK (SOFTWARE)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "591",
    label: "PRODUKSI GAMBAR BERGERAK, VIDEO DAN PROGRAM TELEVISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "592",
    label: "PEREKAMAN SUARA DAN PENERBITAN MUSIK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "601",
    label: "PENYIARAN RADIO",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "602",
    label: "PENYIARAN DAN PEMROGRAMAN TELEVISI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "611",
    label: "TELEKOMUNIKASI DENGAN KABEL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "612",
    label: "TELEKOMUNIKASI TANPA KABEL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "613",
    label: "TELEKOMUNIKASI SATELIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "619",
    label: "TELEKOMUNIKASI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "620",
    label: "KEGIATAN PEMROGRAMAN, KONSULTASI KOMPUTER DAN KEGIATAN YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "631",
    label:
      "KEGIATAN PENGOLAHAN DATA, PENYIMPANAN DATA DI SERVER (HOSTING) DAN KEGIATAN YBDI; PORTAL WEB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "639",
    label: "KEGIATAN JASA INFORMASI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "K",
    label: "JASA KEUANGAN DAN ASURANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "641",
    label: "PERANTARA MONETER",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "642",
    label: "KEGIATAN PERUSAHAAN HOLDING",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "643",
    label: "TRUST, PEMBIAYAAN DAN ENTITAS KEUANGAN SEJENIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "649",
    label: "JASA KEUANGAN LAINNYA, BUKAN ASURANSI DAN DANA PENSIUN",
    lastMonth: {
      l: 3,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 1,
    },
  },
  {
    code: "651",
    label: "ASURANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "652",
    label: "REASURANSI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "653",
    label: "DANA PENSIUN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "661",
    label: "JASA PENUNJANG JASA KEUANGAN, BUKAN ASURANSI DAN DANA PENSIUN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "662",
    label: "JASA PENUNJANG ASURANSI DAN DANA PENSIUN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "663",
    label: "JASA MANAJEMEN DANA",
    lastMonth: {
      l: 14,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 14,
      w: 1,
    },
  },
  {
    code: "L",
    label: "REAL ESTATE",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "681",
    label:
      "REAL ESTATE YANG DIMILIKI SENDIRI ATAU DISEWA DAN KAWASAN PARIWISATA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "682",
    label: "REAL ESTATE ATAS DASAR BALAS JASA (FEE) ATAU KONTRAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "M",
    label: "JASA PROFESIONAL, ILMIAH DAN TEKNIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "691",
    label: "JASA HUKUM",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "692",
    label: "JASA AKUNTANSI, PEMBUKUAN DAN PEMERIKSA; KONSULTASI PAJAK",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "701",
    label: "KEGIATAN KANTOR PUSAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "702",
    label: "KEGIATAN KONSULTASI MANAJEMEN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "711",
    label: "JASA ARSITEKTUR DAN TEKNIK SIPIL SERTA KONSULTASI TEKNIS YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "712",
    label: "ANALISIS DAN UJI TEKNIS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "721",
    label:
      "PENELITIAN DAN PENGEMBANGAN ILMU PENGETAHUAN ALAM DAN ILMU TEKNOLOGI DAN REKAYASA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "722",
    label: "PENELITIAN DAN PENGEMBANGAN ILMU PENGETAHUAN SOSIAL DAN HUMANIORA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "731",
    label: "PERIKLANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "732",
    label: "PENELITIAN PASAR DAN JAJAK PENDAPAT MASYARAKAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "741",
    label: "JASA PERANCANGAN KHUSUS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "742",
    label: "JASA FOTOGRAFI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "749",
    label: "JASA PROFESIONAL, ILMIAH DAN TEKNIS LAINNYA YTDL",
    lastMonth: {
      l: -1,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: -1,
      w: 0,
    },
  },
  {
    code: "750",
    label: "JASA KESEHATAN HEWAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "N",
    label:
      "JASA PERSEWAAN, KETENAGAKERJAAN, AGEN PERJALANAN DAN PENUNJANG USAHA LAINYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "771",
    label:
      "JASA PERSEWAAN DAN SEWA GUNA USAHA TANPA HAK OPSI MOBIL, BUS, TRUK DAN SEJENISNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "772",
    label:
      "JASA PERSEWAAN DAN SEWA GUNA USAHA TANPA HAK OPSI BARANG PRIBADI DAN RUMAH TANGGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "773",
    label:
      "JASA PERSEWAAN DAN SEWA GUNA USAHA TANPA HAK OPSI MESIN, PERALATAN DAN BARANG BERWUJUD LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "774",
    label:
      "SEWA GUNA USAHA TANPA HAK OPSI ASET NON FINANSIAL, BUKAN KARYA HAK CIPTA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "781",
    label: "JASA PENEMPATAN TENAGA KERJA",
    lastMonth: {
      l: 8,
      w: 1,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 8,
      w: 1,
    },
  },
  {
    code: "782",
    label: "JASA PENYEDIAAN TENAGA KERJA WAKTU TERTENTU",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "783",
    label:
      "JASA PENYEDIAAN SUMBER DAYA MANUSIA DAN MANAJEMEN FUNGSI SUMBER DAYA MANUSIA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "791",
    label: "JASA AGEN PERJALANAN DAN PENYELENGGARA TUR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "799",
    label: "JASA RESERVASI LAINNYA YBDI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "801",
    label: "JASA KEAMANAN SWASTA (PRIBADI)",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "802",
    label: "JASA SISTEM KEAMANAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "803",
    label: "JASA PENYELIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "811",
    label: "PENYEDIA GABUNGAN JASA PENUNJANG FASILITAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "812",
    label: "JASA KEBERSIHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "813",
    label: "JASA PERAWATAN DAN PEMELIHARAAN TAMAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "821",
    label: "JASA ADMINISTRASI KANTOR DAN PENUNJANG KANTOR",
    lastMonth: {
      l: 0,
      w: 3,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 3,
    },
  },
  {
    code: "822",
    label: "JASA CALL CENTRE",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "823",
    label: "JASA PENYELENGGARA KONVENSI DAN PAMERAN DAGANG",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "829",
    label: "JASA PENUNJANG USAHA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "O",
    label: "ADMINISTRASI PEMERINTAHAN, PERTAHANAN DAN JAMINAN SOSIAL WAJIB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "841",
    label: "ADMINISTRASI PEMERINTAHAN DAN KEBIJAKAN EKONOMI DAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "842",
    label:
      "PENYEDIAAN LAYANAN UNTUK MASYARAKAT DALAM BIDANG HUBUNGAN LUAR NEGERI, PERTAHANAN, KEAMANAN DAN KETERTIBAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "843",
    label: "JAMINAN SOSIAL WAJIB",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "P",
    label: "JASA PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "851",
    label: "JASA PENDIDIKAN DASAR",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "852",
    label: "JASA PENDIDIKAN MENENGAH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "853",
    label: "JASA PENDIDIKAN TINGGI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "854",
    label: "JASA PENDIDIKAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "855",
    label: "JASA PENUNJANG PENDIDIKAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "856",
    label: "JASA PENDIDIKAN ANAK USIA DINI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "Q",
    label: "JASA KESEHATAN DAN KEGIATAN SOSIAL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "861",
    label: "JASA RUMAH SAKIT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "862",
    label: "JASA PRAKTIK DOKTER DAN DOKTER GIGI",
    lastMonth: {
      l: 1,
      w: 2,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 1,
      w: 2,
    },
  },
  {
    code: "871",
    label:
      "JASA KEGIATAN SOSIAL DI DALAM PANTI UNTUK PERAWATAN DAN PEMULIHAN KESEHATAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "872",
    label:
      "JASA KEGIATAN SOSIAL DI DALAM PANTI UNTUK KETERBELAKANGAN MENTAL, GANGGUAN MENTAL DAN TERLARANGPENYALAHGUNAAN OBAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "879",
    label: "JASA KEGIATAN SOSIAL DI DALAM PANTI LAINNYA YTDL",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "881",
    label: "JASA KEGIATAN SOSIAL DI LUAR PANTI UNTUK JOMPO DAN CACAT",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "889",
    label: "JASA KEGIATAN SOSIAL DI LUAR PANTI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "R",
    label: "KEBUDAYAAN, HIBURAN DAN REKREASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "900",
    label: "KEGIATAN HIBURAN, KESENIAN DAN KREATIVITAS",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "910",
    label: "PERPUSTAKAAN, ARSIP, MUSEUM DAN KEGIATAN KEBUDAYAAN LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "920",
    label: "KEGIATAN PERJUDIAN DAN PERTARUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "931",
    label: "KEGIATAN OLAHRAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "932",
    label: "KEGIATAN REKREASI LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "S",
    label: "KEGIATAN JASA LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "941",
    label: "KEGIATAN ORGANISASI BISNIS, PENGUSAHA DAN PROFESI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "942",
    label: "KEGIATAN ORGANISASI BURUH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "951",
    label: "JASA REPARASI KOMPUTER DAN ALAT KOMUNIKASI",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "952",
    label:
      "JASA REPARASI BARANG KEPERLUAN PRIBADI DAN PERLENGKAPAN RUMAH TANGGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "961",
    label: "JASA PERORANGAN UNTUK KEBUGARAN, BUKAN OLAHRAGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "969",
    label: "JASA PERORANGAN LAINNYA YTDL",
    lastMonth: {
      l: 3,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 3,
      w: 0,
    },
  },
  {
    code: "T",
    label:
      "JASA PERORANGAN YANG MELAYANI RUMAH TANGGA; KEGIATAN YANG MENGHASILKAN BARANG DAN JASA OLEH RUMAH TANGGA YANG DIGUNAKAN SENDIRI UNTUK MEMENUHI KEBUTUH",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "970",
    label: "JASA PERORANGAN YANG MELAYANI RUMAH TANGGA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "981",
    label:
      "KEGIATAN YANG MENGHASILKAN BARANG OLEH RUMAH TANGGA YANG DIGUNAKAN SENDIRI UNTUK MEMENUHI KEBUTUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "982",
    label:
      "KEGIATAN YANG MENGHASILKAN JASA OLEH RUMAH TANGGA YANG DIGUNAKAN SENDIRI UNTUK MEMENUHI KEBUTUHAN",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "U",
    label:
      "KEGIATAN BADAN INTERNASIONAL DAN BADAN EKSTRA INTERNASIONAL LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "990",
    label:
      "KEGIATAN BADAN INTERNASIONAL DAN BADAN EKSTRA INTERNASIONAL LAINNYA",
    lastMonth: {
      l: 0,
      w: 0,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 0,
      w: 0,
    },
  },
  {
    code: "JUMLAH",
    label: "JUMLAH",
    lastMonth: {
      l: 485,
      w: 17,
    },
    registered: {
      l: 0,
      w: 0,
    },
    placed: {
      l: 0,
      w: 0,
    },
    removed: {
      l: 0,
      w: 0,
    },
    thisMonth: {
      l: 485,
      w: 17,
    },
  },
];

export const ipk37Data: IPK3_7Row[] = [
  {
    code: "1",
    label: "2",
    sisaLalu: {
      d1: 3,
      d2: 4,
      d3: 5,
    },
    pendaftaran: {
      d1: 6,
      d2: 7,
      d3: 8,
    },
    penempatan: {
      d1: 9,
      d2: 10,
      d3: 11,
    },
    penghapusan: {
      d1: 12,
      d2: 13,
      d3: 14,
    },
    sisaIni: {
      d1: 15,
      d2: 16,
      d3: 17,
    },
  },
  {
    code: "1101",
    label: "TIDAK TAMAT SD",
    sisaLalu: {
      d1: 5,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 5,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "1102",
    label: "TAMAT SD",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 11,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 11,
    },
  },
  {
    code: "1103",
    label: "SETINGKAT SD",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "2101",
    label: "SEKOLAH MENENGAH PERTAMA",
    sisaLalu: {
      d1: 4,
      d2: 27,
      d3: 24,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 27,
      d3: 24,
    },
  },
  {
    code: "2104",
    label: "SLTP KEJURUAN",
    sisaLalu: {
      d1: 2,
      d2: 3,
      d3: 6,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 3,
      d3: 6,
    },
  },
  {
    code: "2103",
    label: "SLTP - LAINNYA",
    sisaLalu: {
      d1: 4,
      d2: 3,
      d3: 3,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 3,
      d3: 3,
    },
  },
  {
    code: "3801",
    label: "SMU",
    sisaLalu: {
      d1: 354,
      d2: 100,
      d3: 135,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 354,
      d2: 100,
      d3: 135,
    },
  },
  {
    code: "3802",
    label: "MADRASAH DINIYAH ALIYAH",
    sisaLalu: {
      d1: 57,
      d2: 35,
      d3: 20,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 57,
      d2: 35,
      d3: 20,
    },
  },
  {
    code: "3101",
    label: "TEKNIK BANGUNAN",
    sisaLalu: {
      d1: 24,
      d2: 5,
      d3: 3,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 24,
      d2: 5,
      d3: 3,
    },
  },
  {
    code: "3102",
    label: "TEKNIK PLUMBING DAN SANITASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3103",
    label: "TEKNIK SURVEI DAN PEMETAAN",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3104",
    label: "TEKNIK KETENAGALISTRIKAN",
    sisaLalu: {
      d1: 58,
      d2: 20,
      d3: 13,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 58,
      d2: 20,
      d3: 13,
    },
  },
  {
    code: "3105",
    label: "TEKNIK PENDINGINAN DAN TATA UDARA",
    sisaLalu: {
      d1: 3,
      d2: 3,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 3,
      d3: 1,
    },
  },
  {
    code: "3106",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 26,
      d2: 7,
      d3: 29,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 26,
      d2: 7,
      d3: 29,
    },
  },
  {
    code: "3107",
    label: "TEKNIK OTOMOTIF",
    sisaLalu: {
      d1: 160,
      d2: 61,
      d3: 39,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 160,
      d2: 61,
      d3: 39,
    },
  },
  {
    code: "3108",
    label: "TEKNOLOGI PESAWAT UDARA",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "3109",
    label: "TEKNIK PERKAPALAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "3110",
    label: "TEKNOLOGI TEKSTIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3111",
    label: "TEKNIK GRAFIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3112",
    label: "GEOLOGI PERTAMBANGAN",
    sisaLalu: {
      d1: 2,
      d2: 5,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 5,
      d3: 0,
    },
  },
  {
    code: "3113",
    label: "INSTRUMENTASI INDUSTRI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3114",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 7,
      d2: 4,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 7,
      d2: 4,
      d3: 1,
    },
  },
  {
    code: "3115",
    label: "PELAYARAN",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 2,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 2,
    },
  },
  {
    code: "3116",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3117",
    label: "TEKNIK PERMINYAKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3118",
    label: "TEKNIK ELEKTRONIKA",
    sisaLalu: {
      d1: 3,
      d2: 2,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 2,
      d3: 0,
    },
  },
  {
    code: "3119",
    label: "TEKNIK LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3201",
    label: "TEKNIK TELEKOMUNIKASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 2,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 2,
    },
  },
  {
    code: "3202",
    label: "TEKNIK KOMPUTER DAN INFORMATIKA",
    sisaLalu: {
      d1: 88,
      d2: 24,
      d3: 18,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 88,
      d2: 24,
      d3: 18,
    },
  },
  {
    code: "3203",
    label: "TEKNIK BROADCASTING",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3301",
    label: "KESEHATAN",
    sisaLalu: {
      d1: 8,
      d2: 4,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 8,
      d2: 4,
      d3: 1,
    },
  },
  {
    code: "3302",
    label: "PERAWATAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3401",
    label: "SENI RUPA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3402",
    label: "DESAIN DAN PRODUKSI KRIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3403",
    label: "SENI PERTUNJUKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3404",
    label: "PARIWISATA",
    sisaLalu: {
      d1: 9,
      d2: 5,
      d3: 7,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 9,
      d2: 5,
      d3: 7,
    },
  },
  {
    code: "3405",
    label: "TATA BOGA",
    sisaLalu: {
      d1: 2,
      d2: 2,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 2,
      d3: 0,
    },
  },
  {
    code: "3406",
    label: "TATA KECANTIKAN",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3407",
    label: "TATA BUSANA",
    sisaLalu: {
      d1: 5,
      d2: 3,
      d3: 2,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 5,
      d2: 3,
      d3: 2,
    },
  },
  {
    code: "3501",
    label: "AGRIBISNIS PRODUKSI TANAMAN",
    sisaLalu: {
      d1: 29,
      d2: 10,
      d3: 13,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 29,
      d2: 10,
      d3: 13,
    },
  },
  {
    code: "3502",
    label: "AGRIBISNIS PRODUKSI TERNAK",
    sisaLalu: {
      d1: 11,
      d2: 2,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 11,
      d2: 2,
      d3: 0,
    },
  },
  {
    code: "3503",
    label: "AGRIBISNIS PRODUKSI SUMBERDAYA PERAIRAN",
    sisaLalu: {
      d1: 11,
      d2: 9,
      d3: 4,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 11,
      d2: 9,
      d3: 4,
    },
  },
  {
    code: "3504",
    label: "MEKANISASI PERTANIAN",
    sisaLalu: {
      d1: 4,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3505",
    label: "AGRIBISNIS HASIL PERTANIAN",
    sisaLalu: {
      d1: 1,
      d2: 3,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 3,
      d3: 1,
    },
  },
  {
    code: "3506",
    label: "PENYULUHAN PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3507",
    label: "KEHUTANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "3601",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 14,
      d2: 2,
      d3: 11,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 14,
      d2: 2,
      d3: 11,
    },
  },
  {
    code: "3602",
    label: "KEUANGAN",
    sisaLalu: {
      d1: 52,
      d2: 12,
      d3: 16,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 52,
      d2: 12,
      d3: 16,
    },
  },
  {
    code: "3603",
    label: "TATA NIAGA",
    sisaLalu: {
      d1: 15,
      d2: 12,
      d3: 11,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 15,
      d2: 12,
      d3: 11,
    },
  },
  {
    code: "3701",
    label: "SLTA LAINNYA",
    sisaLalu: {
      d1: 25,
      d2: 11,
      d3: 38,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 25,
      d2: 11,
      d3: 38,
    },
  },
  {
    code: "3702",
    label: "SLTA - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4101",
    label: "PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4102",
    label: "PENDIDIKAN LUAR SEKOLAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4103",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4104",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4105",
    label: "ILMU PENGETAHUAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4106",
    label: "PENDIDIKAN MORAL PANCASILA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4107",
    label: "ADMINISTRASI KEUANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4108",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4109",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4110",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4111",
    label: "KESEKRETARIATAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4112",
    label: "OLAH RAGA KESEHATAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4113",
    label: "KESENIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4114",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4115",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4116",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4117",
    label: "KETRAMPILAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4118",
    label: "EKONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4119",
    label: "ILMU PENGETAHUAN ALAM/FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4120",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4121",
    label: "PROGRAM KOMPUTER",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "4122",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4123",
    label: "ILMU KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4124",
    label: "KERJA KAYU",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4125",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4126",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4127",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4128",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4129",
    label: "DIPLOMA I/AKTA I LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4130",
    label: "DIPLOMA I - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4201",
    label: "PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4202",
    label: "PENDIDIKAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4203",
    label: "PENDIDIKAN LUAR SEKOLAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4204",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4205",
    label: "PENDIDIKAN MORAL PANCASILA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4206",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4207",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4208",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4209",
    label: "PENDIDIKAN KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4210",
    label: "EKONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4211",
    label: "KESENIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4212",
    label: "KESEKRETARIATAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4213",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "4214",
    label: "MARKETING",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4215",
    label: "AKUTANSI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4216",
    label: "OLAH RAGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4217",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4218",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4219",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4220",
    label: "ILMU PENGETAHUAN ALAM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4221",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4222",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4223",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4224",
    label: "KETRAMPILAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4225",
    label: "KERJA KAYU",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4226",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "4227",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 1,
      d2: 5,
      d3: 2,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 5,
      d3: 2,
    },
  },
  {
    code: "4228",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4229",
    label: "KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "4230",
    label: "DIPLOMA II/AKTA II LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "4231",
    label: "DIPLOMA II - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5101",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5102",
    label: "ASTRONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5103",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5104",
    label: "GEOLOGI DAN PERTAMBANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5105",
    label: "METEOROLOGI DAN GEOFISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5106",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5107",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5108",
    label: "ILMU STATISTIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5109",
    label: "ILMU KOMPUTER",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5110",
    label: "KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5111",
    label: "ILMU PASTI/ALAM LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5112",
    label: "ILMU PASTI - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5201",
    label: "TEKNIK GEODESI/GEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5202",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 4,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5203",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5204",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5205",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5206",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 31,
      d2: 2,
      d3: 3,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 31,
      d2: 2,
      d3: 3,
    },
  },
  {
    code: "5207",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5208",
    label: "TEKNIK LOGAM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5210",
    label: "FISIKA TEKNIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5211",
    label: "TEKNIK NUKLIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5212",
    label: "PENGOLAH GULA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5213",
    label: "TEKNOLOGI KULIT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5214",
    label: "TEKNOLOGI TEKSTIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5215",
    label: "TEKNOLOGI GRAFIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5217",
    label: "TEKNOLOGI LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5218",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5219",
    label: "D3 KEJURUAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5220",
    label: "TEKNIK INFORMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5221",
    label: "TEKNIK ELEKTRO",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "5222",
    label: "MANAJEMEN INFORMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5301",
    label: "PERTANIAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5302",
    label: "HORTIKULTURA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5303",
    label: "HASIL PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5304",
    label: "EKONOMI PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5306",
    label: "ILMU TANAH DAN AIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5307",
    label: "KEDOKTERAN HEWAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5308",
    label: "PETERNAKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5309",
    label: "PERIKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5310",
    label: "KEHUTANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5311",
    label: "PERTANIAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5312",
    label: "PERTANIAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5401",
    label: "KEDOKTERAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5402",
    label: "KEDOKTERAN GIGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5403",
    label: "FARMASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5404",
    label: "PENILIK KESEHATAN/HYGINE/GIZI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5405",
    label: "ANASTESI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5406",
    label: "FISIOTERAPI",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "5407",
    label: "PERAWAT",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "5408",
    label: "PENATA RONTGEN",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5409",
    label: "KESEHATAN LAINNYA",
    sisaLalu: {
      d1: 3,
      d2: 2,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 2,
      d3: 1,
    },
  },
  {
    code: "5410",
    label: "KESEHATAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5411",
    label: "MANAJEMEN INDUSTRI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5501",
    label: "EKONOMI",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5502",
    label: "AKUNTANSI",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5503",
    label: "KEUANGAN DAN PAJAK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5504",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5505",
    label: "ILMU POLITIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5506",
    label: "SOSIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5507",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5508",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5509",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5510",
    label: "SEKRETARIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5511",
    label: "MANAJEMENT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5512",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5513",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5514",
    label: "ARKEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5515",
    label: "FILSAFAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5516",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5517",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5518",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5519",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5520",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5521",
    label: "BAHASA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5522",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5523",
    label: "BAHASA RUSIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5524",
    label: "BAHASA CINA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5525",
    label: "BAHASA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5526",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5527",
    label: "KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5528",
    label: "SENI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5529",
    label: "PUBLISTIK/PENERANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5530",
    label: "ILMU KOMUNIKASI MASSA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5531",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5532",
    label: "ANAK BUAH KAPAL DAN TEKNISI PELAYARAN",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "5533",
    label: "POS DAN TELEKOMUNIKASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5534",
    label: "HOTEL, RESTORAN DAN PARAWISATA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5535",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5536",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5601",
    label: "PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5602",
    label: "BIMBINGAN DAN PENYULUHAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5603",
    label: "KURIKULUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5604",
    label: "PENDIDIKAN LUAR SEKOLAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5605",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5606",
    label: "PENDIDIKAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5607",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5608",
    label: "PENDIDIKAN MORAL PANCASILA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5609",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5610",
    label: "ADMINISTRASI PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5611",
    label: "ADMINISTRASI KEUANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5612",
    label: "KESEKRETARIATAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5613",
    label: "KESENIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5614",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5615",
    label: "BAHSA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5616",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5617",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5618",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5619",
    label: "BAHSA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5620",
    label: "BAHSA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5621",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5622",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5623",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5624",
    label: "EKONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5625",
    label: "AKUNTANSI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5626",
    label: "MANAJEMENT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5627",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5628",
    label: "TATA BOGA/TATA BUSANA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5629",
    label: "OLAH RAGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5630",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5631",
    label: "ILMU KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5632",
    label: "GEOGRAPI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5633",
    label: "BIOLOGI/ILMU HAYAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5634",
    label: "MATEMATIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5635",
    label: "KETRAMPILAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5636",
    label: "KEJURUAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5637",
    label: "SISTEM ANALIS KOMPUTER",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5638",
    label: "TEKNIK LABORATORIUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5639",
    label: "TEKNIK GEODESI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5640",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5641",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5642",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5643",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5644",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5645",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "5646",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6101",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6102",
    label: "ILMU GEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6103",
    label: "KIMIA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6104",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6105",
    label: "METEROLOGI DAN GEOPISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6106",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6107",
    label: "STATISTIK",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6108",
    label: "KOMPUTER",
    sisaLalu: {
      d1: 17,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 17,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6109",
    label: "ILMU PASTI/ILMU ALAM LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6110",
    label: "ILMU PASTI/ILMU ALAM - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6201",
    label: "TEKNIK GEODESI/GEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6202",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6203",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6204",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6205",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6206",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 6,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 6,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "6207",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6208",
    label: "TEKNIK LOGAM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6210",
    label: "FISIKA TEKNIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6211",
    label: "TEKNIK NUKLIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6212",
    label: "PENGOLAH GULA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6213",
    label: "TEKNOLOGI KULIT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6214",
    label: "TEKNOLOGI TEKSTIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6215",
    label: "TEKNIK GRAFIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6217",
    label: "TEKNOLOGI LAINNYA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6218",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "6219",
    label: "TEKNIK KELAUTAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6220",
    label: "TEKNIK INFORMATIKA",
    sisaLalu: {
      d1: 4,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6221",
    label: "TEKNIK ELEKTRO",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6222",
    label: "SISTEM INFORMASI",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6223",
    label: "MANAJEMEN INFORMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6301",
    label: "PERTANIAN UMUM",
    sisaLalu: {
      d1: 9,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 9,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "6302",
    label: "HORTIKULTURA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6303",
    label: "HASIL PERTANIAN",
    sisaLalu: {
      d1: 5,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 5,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6304",
    label: "EKONOMI PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6306",
    label: "ILMU TANAH DAN AIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6307",
    label: "KEDOKTERAN HEWAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6308",
    label: "PERTERNAKAN",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6309",
    label: "PERIKANAN",
    sisaLalu: {
      d1: 4,
      d2: 3,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 3,
      d3: 1,
    },
  },
  {
    code: "6310",
    label: "KEHUTANAN",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "6311",
    label: "PERTANIAN LAINNYA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6312",
    label: "PERTANIAN - TAK TERDIFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6401",
    label: "KEDOKTERAN UMUM",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6402",
    label: "KEDOKTERAN GIGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6403",
    label: "FARMASI",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "6404",
    label: "KESEHATAN LAINNYA",
    sisaLalu: {
      d1: 6,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 6,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "6405",
    label: "KESEHATAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 5,
      d2: 2,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 5,
      d2: 2,
      d3: 0,
    },
  },
  {
    code: "6501",
    label: "EKONOMI",
    sisaLalu: {
      d1: 5,
      d2: 0,
      d3: 2,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 5,
      d2: 0,
      d3: 2,
    },
  },
  {
    code: "6502",
    label: "AKUNTANSI",
    sisaLalu: {
      d1: 9,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 9,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6503",
    label: "HUKUM",
    sisaLalu: {
      d1: 13,
      d2: 2,
      d3: 3,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 13,
      d2: 2,
      d3: 3,
    },
  },
  {
    code: "6504",
    label: "ILMU POLITIK",
    sisaLalu: {
      d1: 8,
      d2: 4,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 8,
      d2: 4,
      d3: 1,
    },
  },
  {
    code: "6505",
    label: "SOSIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6506",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6507",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6508",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 16,
      d2: 4,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 16,
      d2: 4,
      d3: 0,
    },
  },
  {
    code: "6509",
    label: "MANAJEMENT",
    sisaLalu: {
      d1: 60,
      d2: 10,
      d3: 7,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 60,
      d2: 10,
      d3: 7,
    },
  },
  {
    code: "6510",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6511",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6512",
    label: "ARKEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6513",
    label: "FILSAFAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6514",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6515",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6516",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 4,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 4,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6517",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6518",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6519",
    label: "BAHASA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6520",
    label: "BAHSA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6521",
    label: "BAHASA RUSIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6522",
    label: "BAHSA CINA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6523",
    label: "BAHASA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6524",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6525",
    label: "KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6526",
    label: "PUBLISTIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6527",
    label: "KOMUNIKASI MASSA",
    sisaLalu: {
      d1: 2,
      d2: 3,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 3,
      d3: 0,
    },
  },
  {
    code: "6528",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6529",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    sisaLalu: {
      d1: 3,
      d2: 4,
      d3: 2,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 3,
      d2: 4,
      d3: 2,
    },
  },
  {
    code: "6530",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6601",
    label: "PENDIDIKAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6602",
    label: "ADMINISTRASI PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6603",
    label: "PEMBINAAN DAN PENYULUHAN",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6604",
    label: "KURIKULUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6605",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6606",
    label: "PINDIDIKAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6607",
    label: "PENDIDIKAN MORAL PANCASILA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6608",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6609",
    label: "KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6610",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6611",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6612",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6613",
    label: "SEJARAH",
    sisaLalu: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6614",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6615",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6616",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 2,
      d2: 2,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 2,
      d3: 0,
    },
  },
  {
    code: "6617",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6618",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6619",
    label: "BAHASA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6620",
    label: "BAHASA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6621",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6622",
    label: "OLAH RAGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6623",
    label: "TATA BOGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6624",
    label: "TATA GRAHA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6625",
    label: "KESENIAN",
    sisaLalu: {
      d1: 2,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "6626",
    label: "EKONOMI",
    sisaLalu: {
      d1: 2,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6627",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6628",
    label: "MANAJEMANT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6629",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 2,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "6630",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6631",
    label: "ILMU KIMIA",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "6632",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 1,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6633",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 2,
      d2: 2,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 2,
      d2: 2,
      d3: 0,
    },
  },
  {
    code: "6634",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6635",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6636",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6637",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "6638",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 1,
    },
  },
  {
    code: "6639",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    sisaLalu: {
      d1: 7,
      d2: 1,
      d3: 1,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 7,
      d2: 1,
      d3: 1,
    },
  },
  {
    code: "6640",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7101",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7102",
    label: "ILMU GEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7103",
    label: "KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7104",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7105",
    label: "METEROLOGI DAN GEOPISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7106",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7107",
    label: "STATISTIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7108",
    label: "KOMPUTER",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7109",
    label: "ILMU PASTI/ILMU ALAM LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7110",
    label: "ILMU PASTI/ILMU ALAM - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7201",
    label: "EKNIK GEODESI/GEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7202",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7203",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7204",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7205",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7206",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7207",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7208",
    label: "TEKNIK LOGAM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7210",
    label: "FISIKA TEKNIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7211",
    label: "TEKNIK NUKLIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7212",
    label: "PENGOLAH GULA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7213",
    label: "TEKNOLOGI KULIT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7214",
    label: "TEKNOLOGI TEKSTIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7215",
    label: "TEKNIK GRAFIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7217",
    label: "TEKNOLOGI LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7218",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7219",
    label: "TEKNIK ELEKTRO",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7220",
    label: "TEKNIK INFORMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7221",
    label: "TEKNIK ELEKTRO",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7222",
    label: "SISTEM INFORMASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7223",
    label: "MANAJEMEN INFORMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7301",
    label: "PERTANIAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7302",
    label: "HORTIKULTURA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7303",
    label: "HASIL PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7304",
    label: "EKONOMI PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7306",
    label: "ILMU TANAH DAN AIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7307",
    label: "KEDOKTERAN HEWAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7308",
    label: "PERTERNAKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7309",
    label: "PERIKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7310",
    label: "KEHUTANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7311",
    label: "PERTANIAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7312",
    label: "PERTANIAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7401",
    label: "KEDOKTERAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7402",
    label: "KEDOKTERAN GIGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7403",
    label: "FARMASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7404",
    label: "KESEHATAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7405",
    label: "KESEHATAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7501",
    label: "EKONOMI",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7502",
    label: "AKUNTANSI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7503",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7504",
    label: "ILMU POLITIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7505",
    label: "SOSIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7506",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7507",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7508",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7509",
    label: "MANAJEMENT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7510",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7511",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7512",
    label: "ARKEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7513",
    label: "FILSAFAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7514",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7515",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7516",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7517",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7518",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7519",
    label: "BAHASA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7520",
    label: "BAHSA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7521",
    label: "BAHASA RUSIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7522",
    label: "BAHSA CINA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7523",
    label: "BAHASA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7524",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7525",
    label: "KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7526",
    label: "PUBLISTIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7527",
    label: "KOMUNIKASI MASSA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7528",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7529",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7530",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7601",
    label: "PENDIDIKAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7602",
    label: "ADMINISTRASI PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7603",
    label: "PEMBINAAN DAN PENYULUHAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7604",
    label: "KURIKULUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7605",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7606",
    label: "PINDIDIKAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7607",
    label: "PENDIDIKAN MORAL PANCASILA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7608",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7609",
    label: "KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7610",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7611",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7612",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7613",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7614",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7615",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7616",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7617",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7618",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7619",
    label: "BAHASA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7620",
    label: "BAHASA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7621",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7622",
    label: "OLAH RAGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7623",
    label: "TATA BOGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7624",
    label: "TATA GRAHA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7625",
    label: "KESENIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7626",
    label: "EKONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7627",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7628",
    label: "MANAJEMANT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7629",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7630",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7631",
    label: "ILMU KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7632",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7633",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7634",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7635",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7636",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7637",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7638",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7639",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "7640",
    label: "ILMU PENDIDIKAN DAN KEGURUAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8101",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8102",
    label: "ASTRONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8103",
    label: "BIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8104",
    label: "GEOLOGI DAN PERTAMBANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8105",
    label: "METEOROLOGI DAN GEOFISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8106",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8107",
    label: "MATEMATIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8108",
    label: "ILMU STATISTIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8109",
    label: "ILMU KOMPUTER",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8110",
    label: "KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8111",
    label: "ILMU PASTI/ALAM LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8112",
    label: "ILMU PASTI - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8201",
    label: "TEKNIK GEODESI/GEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8202",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8203",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8204",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8205",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8206",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8207",
    label: "TEKNIK INDUSTRI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8208",
    label: "TEKNIK LOGAM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8209",
    label: "TEKNIK PERTAMBANGAN DAN MINYAK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8210",
    label: "FISIKA TEKNIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8211",
    label: "TEKNIK NUKLIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8212",
    label: "PENGOLAH GULA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8213",
    label: "TEKNOLOGI KULIT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8214",
    label: "TEKNOLOGI TEKSTIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8215",
    label: "TEKNOLOGI GRAFIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8216",
    label: "TEKNOLOGI GAS DAN MINYAK BUMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8217",
    label: "TEKNOLOGI LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8218",
    label: "TEKNOLOGI - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8219",
    label: "D4 KEJURUAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8301",
    label: "PERTANIAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8302",
    label: "HORTIKULTURA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8303",
    label: "HASIL PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8304",
    label: "EKONOMI PERTANIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8305",
    label: "TEKNOLOGI DAN ILMU MAKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8306",
    label: "ILMU TANAH DAN AIR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8307",
    label: "KEDOKTERAN HEWAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8308",
    label: "PETERNAKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8309",
    label: "PERIKANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8310",
    label: "KEHUTANAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8311",
    label: "PERTANIAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8312",
    label: "PERTANIAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8401",
    label: "KEDOKTERAN UMUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8402",
    label: "KEDOKTERAN GIGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8403",
    label: "FARMASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8404",
    label: "PENILIK KESEHATAN/HYGINE/GIZI",
    sisaLalu: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8405",
    label: "ANASTESI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8406",
    label: "FISIOTERAPI",
    sisaLalu: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 1,
      d3: 0,
    },
  },
  {
    code: "8407",
    label: "PERAWAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8408",
    label: "PENATA RONTGEN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8409",
    label: "KESEHATAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8410",
    label: "KESEHATAN - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8501",
    label: "EKONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8502",
    label: "AKUNTANSI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8503",
    label: "KEUANGAN DAN PAJAK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8504",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8505",
    label: "ILMU POLITIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8506",
    label: "SOSIOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8507",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8508",
    label: "GEOGRAFI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8509",
    label: "ADMINISTRASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8510",
    label: "SEKRETARIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8511",
    label: "MANAJEMENT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8512",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8513",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8514",
    label: "ARKEOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8515",
    label: "FILSAFAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8516",
    label: "BAHASA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8517",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8518",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8519",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8520",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8521",
    label: "BAHASA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8522",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8523",
    label: "BAHASA RUSIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8524",
    label: "BAHASA CINA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8525",
    label: "BAHASA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8526",
    label: "KEAGAMAAN DAN ILMU KETUHANAN (IAIN)",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8527",
    label: "KESEJAHTERAAN KELUARGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8528",
    label: "SENI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8529",
    label: "PUBLISTIK/PENERANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8530",
    label: "ILMU KOMUNIKASI MASSA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8531",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8532",
    label: "ANAK BUAH KAPAL DAN TEKNISI PELAYARAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8533",
    label: "POS DAN TELEKOMUNIKASI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8534",
    label: "HOTEL, RESTORAN DAN PARAWISATA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8535",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8536",
    label: "ILMU PENGETAHUAN SOSIAL/BUDAYA - TAK TERDEFINISI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8601",
    label: "PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8602",
    label: "BIMBINGAN DAN PENYULUHAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8603",
    label: "KURIKULUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8604",
    label: "PENDIDIKAN LUAR SEKOLAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8605",
    label: "PSIKOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8606",
    label: "PENDIDIKAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8607",
    label: "PENDIDIKAN KESEJAHTERAAN SOSIAL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8608",
    label: "PENDIDIKAN MORAL PANCASILA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8609",
    label: "PERPUSTAKAAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8610",
    label: "ADMINISTRASI PENDIDIKAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8611",
    label: "ADMINISTRASI KEUANGAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8612",
    label: "KESEKRETARIATAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8613",
    label: "KESENIAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8614",
    label: "BAHASA DAERAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8615",
    label: "BAHSA INDONESIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8616",
    label: "BAHASA INGGRIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8617",
    label: "BAHASA JERMAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8618",
    label: "BAHASA PERANCIS",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8619",
    label: "BAHSA BELANDA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8620",
    label: "BAHSA JEPANG",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8621",
    label: "BAHASA ARAB",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8622",
    label: "ANTROPOLOGI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8623",
    label: "SEJARAH",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8624",
    label: "EKONOMI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8625",
    label: "AKUNTANSI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8626",
    label: "MANAJEMENT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8627",
    label: "HUKUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8628",
    label: "TATA BOGA/TATA BUSANA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8629",
    label: "OLAH RAGA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8630",
    label: "FISIKA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8631",
    label: "ILMU KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8632",
    label: "GEOGRAPI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8633",
    label: "BIOLOGI/ILMU HAYAT",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8634",
    label: "MATEMATIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8635",
    label: "KETRAMPILAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8636",
    label: "KEJURUAN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8637",
    label: "SISTEM ANALIS KOMPUTER",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8638",
    label: "TEKNIK LABORATORIUM",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8639",
    label: "TEKNIK GEODESI",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8640",
    label: "TEKNIK KIMIA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8641",
    label: "TEKNIK SIPIL",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8642",
    label: "ARSITEKTUR",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8643",
    label: "TEKNIK LISTRIK",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8644",
    label: "TEKNIK MESIN",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "8645",
    label: "ILMU PENDIDIKAN DAN KEGURUAN LAINNYA",
    sisaLalu: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
  },
  {
    code: "JUMLAH",
    label: "JUMLAH",
    sisaLalu: {
      d1: 1279,
      d2: 440,
      d3: 449,
    },
    pendaftaran: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penempatan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    penghapusan: {
      d1: 0,
      d2: 0,
      d3: 0,
    },
    sisaIni: {
      d1: 1279,
      d2: 440,
      d3: 449,
    },
  },
];

export const ipk38Data: IPK3_8Row[] = [
  {
    code: "1",
    education: "2",
    akl: {
      l: 3,
      p: 4,
    },
    akad: {
      l: 6,
      p: 7,
    },
    akan: {
      l: 9,
      p: 10,
    },
  },
  {
    code: "1",
    education: "NON",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "2",
    education: "SD",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "3",
    education: "SLTP",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "4",
    education: "SLTA",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "5",
    education: "DIPLOMA 1",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "6",
    education: "DIPLOMA 2",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "7",
    education: "D3/SARJANA MUDA",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "8",
    education: "D4/SARJANA SAINS TERAPAN",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "9",
    education: "AKTA 2",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "10",
    education: "AKTA 3",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "11",
    education: "SARJANA",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "12",
    education: "MAGISTER",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "13",
    education: "DOKTORAL",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "1",
    education: "INSTANSI PEMERINTAH",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "2",
    education: "BUMN/BUMD",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "3",
    education: "KOPERASI",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "5",
    education: "BADAN USAHA LAINNYA",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
  {
    code: "6",
    education: "PERORANGAN",
    akl: {
      l: 0,
      p: 0,
    },
    akad: {
      l: 0,
      p: 0,
    },
    akan: {
      l: 0,
      p: 0,
    },
  },
];

// Aliases for backward compatibility
export const genericDataMock = ipk32Data;
export const ipk37DataMock = ipk37Data;
export const ipk38DataMock = ipk38Data;
