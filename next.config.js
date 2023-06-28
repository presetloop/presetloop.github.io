/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['presetloop.com', 'presetloops.com'],
  },
}

module.exports = nextConfig
