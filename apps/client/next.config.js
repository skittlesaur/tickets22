const withMDX = require('@next/mdx')({
  extension: /\.(md|mdx)$/,
  options: {
    providerImportSource: '@mdx-js/react'
  }
})

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    })

    return config
  },
  redirects: async () => {
    return [
      {
        source: '/tickets',
        destination: '/matches',
        permanent: true
      }
    ]
  }
})