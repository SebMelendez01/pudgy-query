/** @type {import('next').NextConfig} */
const nextConfig = {}


module.exports = {
  async rewrites() {
    return [{ source: "/:path*", destination: "/api/:path*" }];
  },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      config.externals.push({
        'utf-8-validate': 'commonjs utf-8-validate',
        'bufferutil': 'commonjs bufferutil',
      })
      return config
    },
  }

// module.exports = nextConfig
