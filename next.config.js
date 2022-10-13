
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ADMIN_KEY: process.env.ADMIN_KEY,
    PRODUCTION_API_VERSION: process.env.PRODUCTION_API_VERSION
  },
  async rewrites() {
    return [
      {
        source: '/api',
        destination: '/apiInfo',
      },
      {
        source: '/api/:path*',
        destination: '/apiInfo/:path*',
      }
    ]
  },
  async redirects() {
    return [
      {
        source: '/docs',
        destination: '/docs/v0',
        permanent: true,
      }
    ]
  }
}

module.exports = nextConfig
