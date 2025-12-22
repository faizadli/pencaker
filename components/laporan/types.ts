export interface DataRow {
  label: string;
  data: number[];
  bold?: boolean;
}

export interface LowonganRow {
  label: string;
  l: number;
  w: number;
  lw: number;
  bold?: boolean;
}

export interface InitialData {
  pencariKerja: DataRow[];
  lowongan: LowonganRow[];
}

export interface GenericRow {
  code: string;
  label: string;
  lastMonth: { l: number; w: number };
  registered: { l: number; w: number };
  placed: { l: number; w: number };
  removed: { l: number; w: number };
  thisMonth: { l: number; w: number };
}

export interface IPK3_7Row {
  code: string;
  label: string;
  sisaLalu: { d1: number; d2: number; d3: number };
  pendaftaran: { d1: number; d2: number; d3: number };
  penempatan: { d1: number; d2: number; d3: number };
  penghapusan: { d1: number; d2: number; d3: number };
  sisaIni: { d1: number; d2: number; d3: number };
}

export interface IPK3_8Row {
  code: string;
  education: string;
  akl: { l: number; p: number };
  akad: { l: number; p: number };
  akan: { l: number; p: number };
}

export const TABS = [
  { id: "ipk3.1", label: "IPK 3.1" },
  { id: "ipk3.2", label: "IPK 3.2" },
  { id: "ipk3.3", label: "IPK 3.3" },
  { id: "ipk3.4", label: "IPK 3.4" },
  { id: "ipk3.5", label: "IPK 3.5" },
  { id: "ipk3.6", label: "IPK 3.6" },
  { id: "ipk3.7", label: "IPK 3.7" },
  { id: "ipk3.8", label: "IPK 3.8" },
];
