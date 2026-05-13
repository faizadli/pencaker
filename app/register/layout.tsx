"use client";

/** Mengkompensasi padding-top <main> saat navbar disembunyikan di /register */
export default function RegisterLayout({
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
