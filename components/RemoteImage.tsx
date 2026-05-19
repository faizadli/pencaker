"use client";

import Image, { type ImageProps } from "next/image";
import {
  sanitizeImageSrc,
  shouldUnoptimizeImageSrc,
} from "../lib/storage/image";
import { resolveImageSrc } from "../services/storage";

const DEFAULT_PLACEHOLDER = "https://placehold.co/600x400?text=No+Image";

export { shouldUnoptimizeImageSrc } from "../lib/storage/image";

type RemoteImageProps = Omit<ImageProps, "src"> & {
  src?: string | null;
  fallback?: string;
};

/** next/image wrapper: resolves storage keys and bypasses optimizer for local API URLs. */
export default function RemoteImage({
  src,
  fallback = DEFAULT_PLACEHOLDER,
  alt = "",
  unoptimized,
  ...props
}: RemoteImageProps) {
  const resolved = sanitizeImageSrc(resolveImageSrc(src, fallback), fallback);
  const bypass =
    unoptimized === true
      ? true
      : unoptimized === false
        ? false
        : shouldUnoptimizeImageSrc(resolved);

  return <Image src={resolved} alt={alt} unoptimized={bypass} {...props} />;
}
