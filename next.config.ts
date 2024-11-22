import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    minimumCacheTTL: 86400,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn-1.lorcanary.com",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "lorcana-cards.pages.dev",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "six-inks.pages.dev",
        pathname: "/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "lorcanito.com",
        pathname: "/assets/images/**",
      },
    ],
  },
  i18n: {
    locales: ["en", "fr", "de", "it"],
    defaultLocale: "en",
  },
};

export default nextConfig;
