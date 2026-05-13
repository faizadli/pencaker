"use client";

import Image from "next/image";
import { useState } from "react";
import { LOGO_WHITE_PNG } from "../../lib/brand-assets";

type LogoWhiteProps = {
  alt: string;
  /** Kelas untuk pembungkus `position: relative` + ukuran (mis. `h-24 w-[min(100%,280px)]`) */
  wrapperClassName: string;
  sizes?: string;
  priority?: boolean;
  /** Ikon Remix fallback jika berkas tidak ada / gagal muat */
  fallbackIconClass: string;
};

/**
 * Logo putih dari `public/logo-white.png` untuk latar gelap/hijau.
 */
export function LogoWhite({
  alt,
  wrapperClassName,
  sizes = "240px",
  priority,
  fallbackIconClass,
}: LogoWhiteProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center text-secondary ${wrapperClassName}`}
        aria-hidden
      >
        <i className={fallbackIconClass} />
      </div>
    );
  }

  return (
    <div className={`relative ${wrapperClassName}`}>
      <Image
        src={LOGO_WHITE_PNG}
        alt={alt}
        fill
        className="object-contain object-left"
        sizes={sizes}
        unoptimized
        priority={priority}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

type LogoWhiteFooterProps = {
  alt: string;
  fallbackIconClass?: string;
};

export function LogoWhiteFooter({
  alt,
  fallbackIconClass = "ri-building-line text-white text-lg",
}: LogoWhiteFooterProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
        <i className={fallbackIconClass} aria-hidden />
      </div>
    );
  }

  return (
    <Image
      src={LOGO_WHITE_PNG}
      alt={alt}
      width={220}
      height={56}
      className="h-11 w-auto max-w-[200px] object-contain object-left shrink-0"
      unoptimized
      onError={() => setFailed(true)}
    />
  );
}
