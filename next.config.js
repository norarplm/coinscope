/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["assets.coingecko.com", "coin-images.coingecko.com"],
    unoptimized: true,
  },
}

module.exports = nextConfig
