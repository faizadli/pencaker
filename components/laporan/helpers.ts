import { BaseGroup, GenericRow, IPK3_7Row, IPK3_8Row } from "./types";

export const getSheetTitle = (tabId: string) => {
  switch (tabId) {
    case "ipk3.1":
      return "IPK III/1 : IKHTISAR STATISTIK TENAGA KERJA KABUPATEN PASER";
    case "ipk3.2":
      return "IPK III/2 : PENCARI KERJA YANG TERDAFTAR MENURUT JENIS PENDIDIKAN DAN JENIS KELAMIN";
    case "ipk3.3":
      return "IPK III/3 : PENCARI KERJA YANG TERDAFTAR MENURUT JENIS GOLONGAN POKOK JABATAN DAN JENIS KELAMIN";
    case "ipk3.4":
      return "IPK III/4 : LOWONGAN KERJA YANG TERDAFTAR MENURUT JENIS PENDIDIKAN DAN JENIS KELAMIN";
    case "ipk3.5":
      return "IPK III/5 : LOWONGAN KERJA YANG TERDAFTAR MENURUT JENIS GOLONGAN POKOK JABATAN DAN JENIS KELAMIN";
    case "ipk3.6":
      return "IPK III/6 : LOWONGAN KERJA YANG TERDAFTAR MENURUT GOLONGAN POKOK LAPANGAN USAHA DAN JENIS KELAMIN";
    case "ipk3.7":
      return "IPK III/7 : PENCARI KERJA YANG TERDAFTAR, DITEMPATKAN DAN DIHAPUSKAN";
    case "ipk3.8":
      return "IPK III/8 : PENEMPATAN PENCARI KERJA MENURUT JENIS ANTAR KERJA TINGKAT PENDIDIKAN PENCARI KERJA";
    default:
      return "";
  }
};

export const getLabelHeader = (tabId: string) => {
  switch (tabId) {
    case "ipk3.2":
      return "JENIS PENDIDIKAN";
    case "ipk3.3":
      return "JENIS GOLONGAN POKOK JABATAN";
    case "ipk3.4":
      return "JENIS PENDIDIKAN";
    case "ipk3.5":
      return "JENIS GOLONGAN POKOK JABATAN";
    case "ipk3.6":
      return "GOLONGAN POKOK LAPANGAN USAHA";
    case "ipk3.7":
      return "GOLONGAN POKOK LAPANGAN USAHA";
    default:
      return "KATEGORI";
  }
};

export const formatDateIndo = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
    .format(date)
    .toUpperCase();
};

export const processDataToRows = (data: BaseGroup[]): GenericRow[] => {
  // Sort groups by code
  data.sort((a, b) =>
    a.code.localeCompare(b.code, undefined, { numeric: true }),
  );

  const rows: GenericRow[] = [];
  data.forEach((group) => {
    // Sort items within group by code
    group.items.sort((a, b) =>
      a.code.localeCompare(b.code, undefined, { numeric: true }),
    );

    // Add Header Row (Group)
    rows.push({
      code: group.code,
      label: group.name,
      lastMonth: { l: 0, w: 0 },
      registered: { l: 0, w: 0 },
      placed: { l: 0, w: 0 },
      removed: { l: 0, w: 0 },
      thisMonth: { l: 0, w: 0 },
      isHeader: true,
    });

    // Add Item Rows
    group.items.forEach((item) => {
      rows.push({
        code: item.code,
        label: item.name,
        lastMonth: { l: 0, w: 0 },
        registered: { l: 0, w: 0 },
        placed: { l: 0, w: 0 },
        removed: { l: 0, w: 0 },
        thisMonth: { l: 0, w: 0 },
        isHeader: false,
      });
    });
  });

  // Add JUMLAH row
  rows.push({
    code: "JUMLAH",
    label: "JUMLAH",
    lastMonth: { l: 0, w: 0 },
    registered: { l: 0, w: 0 },
    placed: { l: 0, w: 0 },
    removed: { l: 0, w: 0 },
    thisMonth: { l: 0, w: 0 },
  });

  return rows;
};

export const processDataToIPK37Rows = (data: BaseGroup[]): IPK3_7Row[] => {
  // Sort groups by code
  data.sort((a, b) =>
    a.code.localeCompare(b.code, undefined, { numeric: true }),
  );

  const rows: IPK3_7Row[] = [];
  data.forEach((group) => {
    // Sort items within group by code
    group.items.sort((a, b) =>
      a.code.localeCompare(b.code, undefined, { numeric: true }),
    );

    // Add Header Row (Group)
    rows.push({
      code: group.code,
      label: group.name,
      sisaLalu: { d1: 0, d2: 0, d3: 0 },
      pendaftaran: { d1: 0, d2: 0, d3: 0 },
      penempatan: { d1: 0, d2: 0, d3: 0 },
      penghapusan: { d1: 0, d2: 0, d3: 0 },
      sisaIni: { d1: 0, d2: 0, d3: 0 },
      isHeader: true,
    });

    // Add Item Rows
    group.items.forEach((item) => {
      rows.push({
        code: item.code,
        label: item.name,
        sisaLalu: { d1: 0, d2: 0, d3: 0 },
        pendaftaran: { d1: 0, d2: 0, d3: 0 },
        penempatan: { d1: 0, d2: 0, d3: 0 },
        penghapusan: { d1: 0, d2: 0, d3: 0 },
        sisaIni: { d1: 0, d2: 0, d3: 0 },
        isHeader: false,
      });
    });
  });

  // Add JUMLAH row
  rows.push({
    code: "JUMLAH",
    label: "JUMLAH",
    sisaLalu: { d1: 0, d2: 0, d3: 0 },
    pendaftaran: { d1: 0, d2: 0, d3: 0 },
    penempatan: { d1: 0, d2: 0, d3: 0 },
    penghapusan: { d1: 0, d2: 0, d3: 0 },
    sisaIni: { d1: 0, d2: 0, d3: 0 },
    isHeader: true,
  });

  return rows;
};

export const processDataToIPK38Rows = (data: BaseGroup[]): IPK3_8Row[] => {
  // Sort groups by code
  data.sort((a, b) =>
    a.code.localeCompare(b.code, undefined, { numeric: true }),
  );

  return data.map((group) => ({
    code: group.code,
    education: group.name,
    akl: { l: 0, p: 0 },
    akad: { l: 0, p: 0 },
    akan: { l: 0, p: 0 },
  }));
};
