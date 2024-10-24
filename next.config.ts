import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        minimumCacheTTL: 86400,
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
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
};

export default nextConfig;
