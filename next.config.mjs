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
  // Optimize for Node.js 22
  webpack: (config, { dev, isServer }) => {
    // Optimize for development with Node v22
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }

    // Enable tree shaking
    config.optimization = {
      ...config.optimization,
      usedExports: false, // Set to false to avoid global effect issues
      sideEffects: false,
    }

    return config
  },
  // Enable SWC minification (faster with Node v22)
  swcMinify: true,
  
  // Optimize bundle
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Enable experimental features for Node v22
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    serverExternalPackages: ['some-package'], // Updated key name
    optimizeCss: true,
    gzipSize: true,
  },
}

export default nextConfig
