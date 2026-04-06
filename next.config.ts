import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      { source: "/project", destination: "/projects", permanent: true },
      { source: "/blog", destination: "/blogs", permanent: true },
    ];
  },
  images: {
    unoptimized: true,
    qualities: [75, 85, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
    ],
  },
};

export default nextConfig;
