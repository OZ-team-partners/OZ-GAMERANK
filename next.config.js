/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.nintendo.com",
        port: "",
        pathname: "/kr/switch/ranking/**",
      },
      {
        protocol: "https",
        hostname: "cdn.akamai.steamstatic.com",
        port: "",
        pathname: "/steam/apps/**",
      },
    ],
  },
};

module.exports = nextConfig;
