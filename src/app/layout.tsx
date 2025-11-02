import type { Metadata, Viewport } from 'next';
import { Cairo, Tajawal } from 'next/font/google';
import '../styles/core.css';
import '../styles/utilities.css';
import EnhancedNavbar from '../components/layout/EnhancedNavbar';
import FooterComponent from '../components/layout/FooterComponent';
import BottomNavigation from '../components/layout/BottomNavigation';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import SkipLink from '../components/SkipLink';
import WhatsappFloatButton from '../components/WhatsappFloatButton';
import ChatAssistantWidget from '../components/ChatAssistantWidget';
import { Toaster } from 'react-hot-toast';
import NotificationProvider from '../components/NotificationProvider';
import AppSidebar from '../components/layout/AppSidebar';
import { SkipLink as AccessibleSkipLink } from '@/components/ui/accessibility';
import Script from 'next/script';
import ServiceWorkerProvider from '../components/ServiceWorkerProvider';

const cairo = Cairo({
  subsets: ['arabic'],
  variable: '--font-cairo',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['300', '400', '500', '700'],
});

import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';

// Generate SEO metadata using utility function
const seoConfig = {
  title: 'خطى للتدريب والاستشارات - بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
  description:
    'خطى للتدريب والاستشارات هي بيئة تعليمية متكاملة مخصصة للمراجعة الداخلية والمحاسبة، تقدم دورات احترافية وشهادات معتمدة في المحاسبة والمراجعة الداخلية',
  keywords: [
    'خطى',
    'تدريب',
    'استشارات',
    'محاسبة',
    'مراجعة داخلية',
    'دورات محاسبة',
    'شهادات معتمدة',
    'CIA',
    'CMA',
    'تدريب محاسبين',
    'مراجعة داخلية',
    'محاسبة مالية',
    'تدريب احترافي',
  ],
  url: 'https://khata-platform.com',
  type: 'website' as const,
  locale: 'ar_EG',
};

export const metadata: Metadata = {
  ...generateSEOMetadata(seoConfig),
  authors: [{ name: 'خطى للتدريب والاستشارات' }],
  creator: 'خطى للتدريب والاستشارات',
  publisher: 'خطى للتدريب والاستشارات',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://khata-platform.com'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'application/ld+json': JSON.stringify(
      generateStructuredData('organization', {
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'EG',
          addressLocality: 'Cairo',
        },
        areaServed: {
          '@type': 'Country',
          name: 'Egypt',
        },
      })
    ),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1b4b',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        {/* Font Optimization */}

        {/* Preload critical images */}
        <link rel="preload" as="image" href="/banar-cours.webp" />
        <link rel="preload" as="image" href="/globe.svg" />

        {/* Manifest and Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/globe.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1e1b4b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="خطى" />
      </head>
      <body
        className={`${cairo.variable} ${tajawal.variable} antialiased min-h-screen grid grid-rows-[auto_1fr_auto] relative`}
        style={{ fontFeatureSettings: '"rlig" 1, "calt" 1' }}
      >
        {/* Subtle Background Image for all pages */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-15 pointer-events-none z-0"
          style={{
            backgroundImage: "url('/assets/background.jpg')",
          }}
        />
        <NotificationProvider>
          <ServiceWorkerProvider />
          <SkipLink />
          <AccessibleSkipLink href="#main-content">
            تخطي إلى المحتوى الرئيسي
          </AccessibleSkipLink>
          <EnhancedNavbar />
          <AppSidebar />
          <Script src="/theme-init.js" strategy="beforeInteractive" />
          <main
            id="main-content"
            className="px-4 py-8 lg:px-8 lg:py-12 pt-16 lg:pt-20 pb-20 md:pb-8"
            role="main"
            tabIndex={-1}
          >
            {/* مسار التنقل */}
            <div className="mb-6">
              <Breadcrumbs className="max-w-7xl mx-auto" />
            </div>

            {/* المحتوى الرئيسي */}
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
          <FooterComponent />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'var(--color-background)',
                color: 'var(--color-text-primary)',
                border: '1px solid var(--color-accent)',
                zIndex: 9999,
              },
            }}
          />
          <BottomNavigation />
          <WhatsappFloatButton />
          <ChatAssistantWidget />
          <footer className="text-center p-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} خطى للتدريب والاستشارات. جميع
            الحقوق محفوظة.
            <br />
            تصميم: ICODE - تطوير بواسطة WINDSURFER AI
          </footer>
        </NotificationProvider>
      </body>
    </html>
  );
}
