import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['sc-maas.oss-cn-shanghai.aliyuncs.com'],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sc-maas.oss-cn-shanghai.aliyuncs.com',
        port: '',
        pathname: '/outputs/**',
      },
    ],
  },
};

export default nextConfig;
