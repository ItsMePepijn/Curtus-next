
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
