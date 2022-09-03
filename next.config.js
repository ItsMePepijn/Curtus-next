
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api',
        destination: '/apiInfo',
      },
    ]
  },
}

module.exports = nextConfig
