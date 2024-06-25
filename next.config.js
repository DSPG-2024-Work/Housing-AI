require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: '/rnode/nova21-gpu-3-eth/14340/proxy/3000',
  output: 'standalone',
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')]
  },
  reactStrictMode: false,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/chat',
        permanent: true
      }
    ]
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

module.exports = nextConfig
