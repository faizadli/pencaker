import { InitialData, IPK3_7Row, IPK3_8Row } from "./types";

export const initialData: InitialData = {
  pencariKerja: [
    {
      label: "1. Pencari kerja yang belum ditempatkan pada bulan yang lalu",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      bold: false,
    },
    {
      label: "2. Pencari kerja yang terdaftar pada bulan ini",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      bold: false,
    },
    {
      label: "A. JUMLAH (1+2)",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
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
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      bold: false,
    },
  ],
  lowongan: [
    {
      label: "1. Lowongan yang belum dipenuhi pada akhir bulan lalu",
      l: 0,
      w: 0,
      lw: 0,
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
      l: 0,
      w: 0,
      lw: 0,
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
      l: 0,
      w: 0,
      lw: 0,
      bold: false,
    },
  ],
};

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

export const ipk38DataPart2: IPK3_8Row[] = [
  {
    code: "1",
    education: "INSTANSI PEMERINTAH",
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  },
  {
    code: "2",
    education: "BUMN/BUMD",
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  },
  {
    code: "3",
    education: "KOPERASI",
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  },
  {
    code: "4",
    education: "PERUSAHAAN SWASTA",
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  },
  {
    code: "5",
    education: "BADAN USAHA LAINNYA",
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  },
  {
    code: "6",
    education: "PERORANGAN",
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  },
];
