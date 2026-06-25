import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  experimental: {
    scrollRestoration: false,
  },
};

export default nextConfig;
