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
  async rewrites() {
    return [
      {
        source: process.env.SOURCEPATH,
        destination: process.env.DESTINATIONPATH,
      },
    ];
  },
};

module.exports = nextConfig;
