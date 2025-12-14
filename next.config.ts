import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "source.unsplash.com" },
      { protocol: "https", hostname: "pencaker.s3.ap-southeast-2.amazonaws.com", pathname: "/**" },
      { protocol: "https", hostname: "disnaser.web.id", pathname: "/**" },
    ],
  },
};

export default nextConfig;
