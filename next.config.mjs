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
    styledComponents: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'framer-motion',
      '@tsparticles/react',
      'date-fns',
      'lodash',
    ],
    optimizeCss: true,
    // Improve build performance
    webVitalsAttribution: ['CLS', 'LCP'],
  },
  // Performance optimizations
  swcMinify: true,
  // Improve initial load
  output: 'standalone', // For better performance in production
  webpack: (config, { dev, isServer }) => {
    // Fix for recharts and other client-only libraries
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

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
    // الحصول على API URL من environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    return [
      {
        source: '/(.*)',
        headers: [
          // XSS Protection
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          
          // Referrer Policy
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          
          // Content Security Policy
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              `connect-src 'self' ${apiUrl} https://*.stripe.com`,
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'", // unsafe-inline للـ Next.js
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https: blob:",
              "media-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join('; '),
          },
          
          // Strict Transport Security (HSTS) - فقط في production
          ...(process.env.NODE_ENV === 'production' ? [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains; preload',
            },
          ] : []),
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
  async redirects() {
    return [
      // Packages and Consulting unification - redirect to new unified page
      { source: '/services', destination: '/packages-and-consulting', permanent: true },
      { source: '/services/packages', destination: '/packages-and-consulting?tab=packages', permanent: true },
      { source: '/services/:path*', destination: '/packages-and-consulting', permanent: true },
      { source: '/packages', destination: '/packages-and-consulting?tab=packages', permanent: true },
      { source: '/subscription', destination: '/packages-and-consulting?tab=packages', permanent: true },
      { source: '/consulting', destination: '/packages-and-consulting?tab=consulting', permanent: true },
      // CIA hub unification
      { source: '/auditors-fellowship', destination: '/cia?tab=overview', permanent: true },
      { source: '/courses/cia-preparation', destination: '/cia?tab=resources', permanent: true },
      { source: '/question-bank', has: [{ type: 'query', key: 'track', value: 'cia' }], destination: '/cia?tab=questions', permanent: true },
      { source: '/student/exam', has: [{ type: 'query', key: 'track', value: 'cia' }], destination: '/cia?tab=exams', permanent: true },
      { source: '/review', destination: '/question-bank', permanent: true },
      { source: '/advanced-features', destination: '/ai-tools', permanent: true },
      // Courses consolidation - redirect individual course pages to main courses page
      // These will be maintained for SEO but users will see the unified courses page
      { source: '/courses/ai-audit', destination: '/courses?category=المحاسبة المالية&highlight=ai-audit', permanent: false },
      { source: '/courses/basics', destination: '/courses?category=المحاسبة المالية&highlight=basics', permanent: false },
      { source: '/courses/digital-audit', destination: '/courses?category=المحاسبة المالية&highlight=digital-audit', permanent: false },
      { source: '/courses/risk-analysis', destination: '/courses?category=المحاسبة المالية&highlight=risk-analysis', permanent: false },
      { source: '/courses/financial-projects', destination: '/courses?category=المحاسبة المالية&highlight=financial-projects', permanent: false },
      { source: '/courses/compliance', destination: '/courses?category=المحاسبة المالية&highlight=compliance', permanent: false },
      // Note: Individual course pages under /courses/[slug] are handled dynamically
      // Old standalone course pages redirects removed - now using /courses/[slug] pattern
      
      // Fix broken dashboard links - redirect to correct paths
      { source: '/student-dashboard', destination: '/student', permanent: true },
      { source: '/my-courses', destination: '/student/courses', permanent: true },
      { source: '/instructor-dashboard', destination: '/instructor', permanent: true },
      { source: '/my-students', destination: '/instructor/students', permanent: true },
      { source: '/admin-dashboard', destination: '/admin/dashboard', permanent: true },
      { source: '/admin-courses', destination: '/admin/courses', permanent: true },
      { source: '/admin-users', destination: '/admin/users', permanent: true },
      
      // Fix navigation links mismatch
      { source: '/internal-auditors', destination: '/internal-audit', permanent: true },
    ];
  },
};

export default nextConfig;
