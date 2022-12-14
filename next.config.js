/** @type {import('next').NextConfig} */
const basePath = '/dashboard'
const nextConfig = {
  basePath,
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
}

module.exports = nextConfig
