import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/design-system.css';
import NavbarComponent from '../components/layout/NavbarComponent';
import FooterComponent from '../components/layout/FooterComponent';
import BottomNavigation from '../components/layout/BottomNavigation';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import QuickAccess from '../components/layout/QuickAccess';
import ScrollToTop from '../components/ScrollToTop';
import SkipLink from '../components/SkipLink';
import WhatsappFloatButton from '../components/WhatsappFloatButton';
import { Toaster } from 'react-hot-toast';
import NotificationProvider from '../components/NotificationProvider';
import AppSidebar from '../components/layout/AppSidebar';
import { SkipLink as AccessibleSkipLink } from '@/components/ui/accessibility';
import Script from 'next/script';
import ServiceWorkerProvider from '../components/ServiceWorkerProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'], // دعم إضافي للعربية
});

export const metadata: Metadata = {
  title: 'خطى للتدريب والاستشارات - بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
  description:
    'خطى للتدريب والاستشارات هي بيئة تعليمية متكاملة مخصصة للمراجعة الداخلية والمحاسبة، تهدف لتقديم تجربة تعليمية متطورة وشاملة للمدققين والمحاسبين',
  keywords: ['خطى', 'تدريب', 'استشارات', 'محاسبة', 'مراجعة داخلية', 'دورات', 'شهادات'],
  authors: [{ name: 'خطى للتدريب والاستشارات' }],
  openGraph: {
    title: 'خطى للتدريب والاستشارات',
    description: 'بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
    type: 'website',
    locale: 'ar_EG',
    siteName: 'خطى للتدريب والاستشارات',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'خطى للتدريب والاستشارات',
    description: 'بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
    creator: '@khata_platform',
  },
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'EducationalOrganization',
      name: 'خطى للتدريب والاستشارات',
      description: 'بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
      url: 'https://khata-platform.com',
      logo: 'https://khata-platform.com/globe.svg',
      sameAs: [
        'https://twitter.com/khata_platform',
        'https://linkedin.com/company/khata-platform',
      ],
    }),
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
        <link rel="preconnect" href="https://fonts.googleapis.com&display=optional" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Tajawal:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />

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
        className={`${inter.variable} antialiased min-h-screen grid grid-rows-[auto_1fr_auto] relative`}
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
          <NavbarComponent />
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
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
          <FooterComponent />
          <ScrollToTop />
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
          <QuickAccess userRole="student" isAuthenticated />
          <WhatsappFloatButton />
          <footer className="text-center p-4 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} خطى للتدريب والاستشارات. جميع الحقوق محفوظة.<br />
            تصميم: ICODE - تطوير بواسطة WINDSURFER AI
          </footer>
        </NotificationProvider>
      </body>
    </html>
  );
}
