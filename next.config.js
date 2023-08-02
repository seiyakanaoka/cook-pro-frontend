/** @type {import('next').NextConfig} */
const nextConfig = {
  // svgrの設定
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
};

module.exports = nextConfig;
