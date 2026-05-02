/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    allowedDevOrigins: ['10.144.67.187', 'localhost:3000']
  },
  turbopack: {
    root: __dirname
  }
};

module.exports = nextConfig;