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
      return "IPK III/7 : PENEMPATAN PENCARI KERJA MENURUT GOLONGAN POKOK LAPANGAN USAHA DAN JENIS KELAMIN";
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
