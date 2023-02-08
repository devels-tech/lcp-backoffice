/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['res.cloudinary.com']
  },
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_URL}/api/:path*`
      },
      {
        source: '/',
        destination: '/dashboard'
      },
      {
        source: '/tienda/:path*',
        destination: '/proximamente'
      },
      {
        source: '/multimedia',
        destination: '/proximamente'
      },
      {
        source: '/usuarios',
        destination: '/proximamente'
      },
      {
        source: '/eventos',
        destination: '/proximamente'
      },
      {
        source: '/devocionales',
        destination: '/proximamente'
      },
      {
        source: '/articulos',
        destination: '/proximamente'
      }
    ]
  }
}
