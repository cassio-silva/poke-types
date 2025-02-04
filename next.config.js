/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging:{
    fetches: {
      fullUrl: true
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/PokeAPI/sprites/master/sprites/**',
      },
      {
        protocol: 'https',
        hostname: 'img.pokemondb.net',
        port: '',
        pathname: '/sprites/**',
      },
    ],
  },
}

module.exports = nextConfig
