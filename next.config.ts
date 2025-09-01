import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["images.unsplash.com", "cdn.gamemeca.com", "api.dicebear.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // 타입스크립트 설정
  typescript: {
    ignoreBuildErrors: false,
  },
  // ESLint 설정
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
