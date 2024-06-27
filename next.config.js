require('path')


/** @type {import('next').NextConfig} */

// HPC configuration
hpc_node = ''
const url = process.env.VSCODE_PROXY_URI;
if(url){
  const pattern = /\/rnode\/(.*)\/proxy\//;
  const match = url.match(pattern);
  hpc_node = match[1]
}

const nextConfig = {
  assetPrefix: hpc_node? '/rnode/'+hpc_node+'/proxy/3000': '',
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
