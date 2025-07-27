/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    config.optimization = {
      ...config.optimization,
      usedExports: false,
      sideEffects: false,
    };

    return config;
  },
  swcMinify: true, // Pastikan ini valid untuk versi Next.js Anda
  experimental: {
    optimizeCss: true, // Hapus opsi yang tidak dikenali
    gzipSize: true,
  },
};

export default nextConfig;
