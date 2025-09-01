import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.gamemeca.com",
      "shared.akamai.steamstatic.com",
      "cdn.akamai.steamstatic.com",
      "steamcdn-a.akamaihd.net",
      "steamcdn-b.akamaihd.net",
      "steamstatic.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shared.akamai.steamstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.akamai.steamstatic.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steamcdn-a.akamaihd.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steamcdn-b.akamaihd.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steamstatic.com",
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
