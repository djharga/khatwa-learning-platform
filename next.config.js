/** @type {import('next').NextConfig} */
const nextConfig = {
  // إعدادات محسنة للنشر على Netlify
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-dialog'],
  },
  // تحسين الصور للنشر الثابت
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.example.com',
      },
    ],
  },
  // إعدادات لتحسين الأداء
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // تجنب مشاكل الروابط الديناميكية
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

module.exports = nextConfig;
