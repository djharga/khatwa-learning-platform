/* eslint-env node */
/* eslint-disable no-undef */
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable bundle analyzer when ANALYZE=true
  ...(process.env.ANALYZE && {
    bundleAnalyzer: await import('@next/bundle-analyzer').then((m) => m.default({
      enabled: true,
    })),
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.theiia.org',
        port: '',
        pathname: '/**',
      },
    ],
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

    // حل نهائي لمشكلة تحميل الخطوط - إضافة timeout و fallbacks للطلبات الخارجية
    if (!isServer) {
      config.module.rules.push({
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name][ext]',
        },
      });
    }

    // Font loading timeout and cache configuration
    config.resolve.alias = {
      ...config.resolve.alias,
      // Add font fallbacks to prevent network timeout issues
    };

    config.optimization.splitChunks = {
      chunks: 'all',
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
          reuseExistingChunk: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            // Extract package name from module path
            const context = module.context || '';
            const match = context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            const packageName = match ? match[1] : '';
            
            if (packageName) {
              if (packageName.includes('framer-motion')) return 'framer-motion';
              if (packageName.includes('lucide-react')) return 'icons';
              if (packageName.includes('recharts')) return 'charts';
              if (packageName.includes('quill')) return 'editor';
            }
            return 'lib';
          },
          priority: 30,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        components: {
          test: /[\\/]src[\\/]components[\\/]/,
          name: 'components',
          priority: 10,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        pages: {
          test: /[\\/]src[\\/]app[\\/]/,
          name(module) {
            // Extract page name from module resource path
            const resource = module.resource || '';
            const match = resource.match(/[\\/]app[\\/](.*?)([\\/]page|layout)/);
            const pageName = match ? match[1] : '';
            return pageName ? `page-${pageName.replace(/[\\/]/g, '-')}` : 'pages';
          },
          priority: 5,
          chunks: 'async',
          reuseExistingChunk: true,
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
              `connect-src 'self' ${apiUrl} https://*.stripe.com https://fonts.googleapis.com https://fonts.gstatic.com`,
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
      // Note: Removed redirects with Arabic characters in query strings to avoid ERR_INVALID_CHAR errors
      // Individual course pages under /courses/[slug] are handled dynamically
      // Old standalone course pages are now accessible directly without redirects
      
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
      
      // Redirect financial-management to dynamic course page
      { source: '/financial-management', destination: '/courses/financial-management', permanent: true },
    ];
  },
};

export default nextConfig;
