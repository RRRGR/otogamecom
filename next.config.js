/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
    ],
  },
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
  },
};

module.exports = nextConfig;
