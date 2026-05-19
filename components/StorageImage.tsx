"use client";

import { useEffect, useState } from "react";
import RemoteImage from "./RemoteImage";
import { resolveImageSrc, resolveStorageUrl } from "../services/storage";

type StorageImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: string;
};

/** Renders an image from a storage key or legacy full URL. */
export default function StorageImage({
  src,
  alt,
  className,
  fallback,
}: StorageImageProps) {
  const fallbackUrl = fallback || "";
  const syncUrl = src ? resolveImageSrc(src, fallbackUrl) : fallbackUrl;
  const [asyncUrl, setAsyncUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!src) return;
    let active = true;
    resolveStorageUrl(src)
      .then((u) => {
        if (active) setAsyncUrl(u || fallbackUrl);
      })
      .catch(() => {
        if (active) setAsyncUrl(fallbackUrl);
      });
    return () => {
      active = false;
      setAsyncUrl(null);
    };
  }, [src, fallbackUrl]);

  const url = src ? (asyncUrl ?? syncUrl) : fallbackUrl;
  if (!url) return null;

  return (
    <RemoteImage
      src={url}
      alt={alt}
      className={className}
      fallback={fallback}
    />
  );
}
