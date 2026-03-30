import { redirect } from "next/navigation";

/** Rute lama jadwal pelatihan — dialihkan ke halaman peserta latihan. */
export default function LegacyTrainingRedirect() {
  redirect("/dashboard/pelatihan");
}
