require('path')


/** @type {import('next').NextConfig} */

// HPC configuration
const url = process.env.VSCODE_PROXY_URI;
const pattern = /\/rnode\/(.*)\/proxy\//;
const match = url.match(pattern);

const nextConfig = {
  assetPrefix: '/rnode/'+match[1]+'/proxy/3000',
  output: 'standalone',
  sassOptions: {
    // includePaths: [path.join(__dirname, 'styles')]
  },
  publicRuntimeConfig: {
    VS_PROXY_PATH: match[1],
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
