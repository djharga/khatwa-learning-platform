/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable bundle analyzer when ANALYZE=true
  ...(process.env.ANALYZE && {
    bundleAnalyzer: await import('@next/bundle-analyzer').then((m) => m.default({
      enabled: true,
    })),
  }),
  images: {
    domains: ['www.theiia.org'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@tsparticles/react',
    ],
    optimizeCss: true,
  },
  webpack: (config, { dev }) => {
    config.optimization.splitChunks = {
      chunks: 'all',
      cacheGroups: {
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name: 'lib',
          priority: 30,
          chunks: 'all',
        },
        comodule: {
          test: /[\\/]node_modules[\\/]/,
          name: 'comodule',
          priority: 20,
          chunks: 'all',
        },
        components: {
          test: /[\\/]components[\\/]/,
          name: 'components',
          priority: 10,
          chunks: 'all',
        },
      },
    };
    if (!dev) {
      config.optimization.minimizer = [...config.optimization.minimizer];
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=300, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
