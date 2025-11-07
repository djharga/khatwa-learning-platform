import type { Metadata, Viewport } from 'next';
import { Inter, Nunito_Sans, IBM_Plex_Sans_Arabic, Almarai } from 'next/font/google';
import '../styles/core.css';
import '../styles/utilities.css';
import EnhancedNavbar from '../components/layout/EnhancedNavbar';
import FooterComponent from '../components/layout/FooterComponent';
import BottomNavigation from '../components/layout/BottomNavigation';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import WhatsappFloatButton from '../components/WhatsappFloatButton';
import ChatAssistantWidget from '../components/ChatAssistantWidget';
import { Toaster } from 'react-hot-toast';
import NotificationProvider from '../components/NotificationProvider';
import AppSidebar from '../components/layout/AppSidebar';
import { SkipLink } from '@/components/ui/accessibility';
import Script from 'next/script';
import ServiceWorkerProvider from '../components/ServiceWorkerProvider';
import LayoutWrapper from './LayoutWrapper';
import ConditionalFooter, { ConditionalBottomNav, ConditionalWidgets } from './ConditionalFooter';

// خط Inter - للعناوين (أنيق وعصري)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

// خط Nunito Sans - للنصوص الأساسية (واضح وسهل القراءة)
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  adjustFontFallback: false,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

// خط IBM Plex Sans Arabic - للنصوص التقنية والأكاديمية (احترافي)
const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ['arabic', 'latin'],
  variable: '--font-ibm-plex',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

// خط Almarai - للنصوص القصيرة والأزرار (عصري وجريء)
const almarai = Almarai({
  subsets: ['arabic'],
  variable: '--font-almarai',
  weight: ['400', '700', '800'],
  display: 'swap',
  preload: false,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
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
    <html lang="ar" dir="rtl" className="rtl">
      <head>
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
        className={`${inter.variable} ${nunitoSans.variable} ${ibmPlex.variable} ${almarai.variable} antialiased min-h-screen grid grid-rows-[auto_1fr_auto] relative overflow-x-hidden`}
        style={{ 
          fontFeatureSettings: '"rlig" 1, "calt" 1, "liga" 1, "kern" 1',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
          direction: 'rtl',
          // textAlign removed to allow text-center to work
        }}
        dir="rtl"
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
          <SkipLink href="#main-content">
            تخطي إلى المحتوى الرئيسي
          </SkipLink>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
          <ConditionalFooter />
          <Toaster
            position="top-left"
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
          {/* <ConditionalBottomNav /> */}
          <ConditionalWidgets />
        </NotificationProvider>
      </body>
    </html>
  );
}
