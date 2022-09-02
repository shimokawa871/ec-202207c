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
      {
        source: '/api/login',
        destination: 'http://localhost:8000/login',
      },
      {
        source: '/api/orderItems',
        destination: 'http://localhost:8000/orderItems',
      },
    ];
  },
};

module.exports = nextConfig;
