/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // unoptimized: true,
    domains: ['toot.olk1.com', 'org.olk1.com'],
  },
}

module.exports = nextConfig
