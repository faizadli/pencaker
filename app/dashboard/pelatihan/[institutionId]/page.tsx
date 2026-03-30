import { redirect } from "next/navigation";

/** Rute lama lembaga pelatihan — dialihkan ke halaman peserta latihan. */
export default function LegacyInstitutionRedirect() {
  redirect("/dashboard/pelatihan");
}
