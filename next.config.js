/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  images: {
    unoptimized:true
  },
}

module.exports = nextConfig
