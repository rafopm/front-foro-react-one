/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Otras configuraciones...
  async rewrites() {
    return [
      {
        source: '/posts',
        destination: '/posts/index',
      },
    ];
  },
  
};

module.exports = nextConfig;

