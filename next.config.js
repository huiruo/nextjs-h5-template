/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  output: 'export',
  trailingSlash: true,
  // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  images: {
    unoptimized: true
  },
  basePath: '/repos',
  assetPrefix: '/repos',
}

module.exports = nextConfig