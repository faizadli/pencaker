"use client";

/**
 * Mengkompensasi padding-top pada <main> (untuk navbar fixed) karena navbar
 * disembunyikan di rute /login, supaya halaman login full-viewport.
 */
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="-mt-[var(--navbar-height,4rem)] min-h-dvh w-full flex flex-col">
      {children}
    </div>
  );
}
