/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isProd ? '/ecommerce-store' : '',
  assetPrefix: isProd ? '/ecommerce-store' : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'illustrations.popertee.com',
      },
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      }
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
