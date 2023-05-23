const postcssPresetEnv = require('postcss-preset-env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/forum',
        destination: '/forum/index',
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: [
                postcssPresetEnv,
                // Agrega otros plugins de PostCSS que necesites
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

module.exports = nextConfig;


