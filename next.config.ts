import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    cacheComponents: true,
    devIndicators: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
        ],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "6mb",
        },
    },
}

export default nextConfig
