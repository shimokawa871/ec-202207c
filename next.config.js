/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  rewrites: async () => {
    return [
      {
        source: '/api/items',
        destination: 'http://localhost:8000/',
      },
      {
        source: '/api/items/:id',
        destination: 'http://localhost:8000/items/:id',
      },
      {
        source: '/api/users',
        destination: 'http://localhost:8000/users',
      },
      {
        source: '/api/options',
        destination: 'http://localhost:8000/options',
      },
    ];
  },
};

module.exports = nextConfig;
