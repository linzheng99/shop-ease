/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'api'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'api',
        port: '4000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/**',
        port: '4000',
      },
    ],
  },
};

export default nextConfig;
