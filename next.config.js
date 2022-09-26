
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    ADMIN_KEY: process.env.ADMIN_KEY,
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
}

module.exports = nextConfig
