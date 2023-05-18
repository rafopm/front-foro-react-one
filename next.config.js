/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Otras configuraciones...
  async rewrites() {
    return [
      {
        source: '/forum',
        destination: '/forum/index',
      },
    ];
  },
  
};

module.exports = nextConfig;

