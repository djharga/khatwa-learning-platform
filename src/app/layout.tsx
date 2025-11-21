import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { Inter, Rubik, Almarai, Tajawal, Cairo, Lemonada, Noto_Kufi_Arabic } from 'next/font/google';

// Import globals.css first - contains all CSS Variables from tokens.ts
import '../styles/globals.css';
// Import other style files that use the CSS Variables
import '../styles/core.css';
import '../styles/utilities.css';
import '../styles/backgrounds.css';
import '../styles/blending-layer.css';
import '../styles/academic-theme.css';

import LayoutWrapper from './LayoutWrapper';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { AuthProvider } from '../contexts/AuthContext';
import NotificationProvider from '../components/NotificationProvider';
import ServiceWorkerProvider from '../components/ServiceWorkerProvider';
import { QueryProvider } from '../components/providers/QueryProvider';
import { MSWProvider } from '../components/providers/MSWProvider';
import { SkipLink } from '@/components/ui/accessibility';
import ConditionalFooter, { ConditionalWidgets } from './ConditionalFooter';

import { generateSEOMetadata, generateStructuredData } from '@/lib/seo';

/* =======================
   Fonts Configuration
   حل نهائي لمشكلة تحميل الخطوط - استخدام fallback قوي وتعطيل preload للخطوط غير الأساسية
======================= */
const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

const rubik = Rubik({ 
  subsets: ['latin', 'arabic'], 
  variable: '--font-rubik', 
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  preload: false, // تعطيل preload لتجنب محاولات التحميل الفاشلة
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

const almarai = Almarai({ 
  subsets: ['arabic'], 
  variable: '--font-almarai', 
  weight: ['400', '700', '800'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['Tajawal', 'Cairo', 'Arial', 'Tahoma', 'Verdana', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

const tajawal = Tajawal({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-tajawal', 
  weight: ['300', '400', '500', '700', '800', '900'],
  display: 'swap',
  preload: false, // تعطيل preload لتجنب محاولات التحميل الفاشلة
  adjustFontFallback: true,
  fallback: ['Cairo', 'Arial', 'Tahoma', 'Verdana', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-cairo', 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['Tajawal', 'Arial', 'Tahoma', 'Verdana', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
});

// IBM Plex Sans Arabic - using Tajawal as fallback due to loading issues
// Using Tajawal variable as it supports Arabic and is more modern
const ibmPlex: {
  variable: string;
  className: string;
  style?: React.CSSProperties;
} = {
  variable: tajawal.variable,
  className: tajawal.className,
  style: tajawal.style,
};

const lemonada = Lemonada({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-lemonada', 
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: false, // تعطيل preload لتجنب محاولات التحميل الفاشلة
  adjustFontFallback: true,
  fallback: ['Tajawal', 'Cairo', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

// Noto Kufi Arabic - للعناوين الأكاديمية الأنيقة
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  variable: '--font-noto-kufi-arabic',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: false, // تعطيل preload لتجنب محاولات التحميل الفاشلة
  adjustFontFallback: true,
  fallback: ['Cairo', 'Tajawal', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

/* =======================
   SEO Configuration
======================= */
const seoConfig = {
  title: 'خطى للتدريب والاستشارات - بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
  description:
    'خطى للتدريب والاستشارات هي بيئة تعليمية متكاملة مخصصة للمراجعة الداخلية والمحاسبة، تقدم دورات احترافية وشهادات معتمدة في المحاسبة والمراجعة الداخلية',
  keywords: [
    'خطى', 'تدريب', 'استشارات', 'محاسبة', 'مراجعة داخلية', 'دورات محاسبة', 'شهادات معتمدة',
    'CIA', 'CMA', 'تدريب محاسبين', 'محاسبة مالية', 'تدريب احترافي',
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
  metadataBase: new URL('https://khata-platform.com'),
  formatDetection: { email: false, address: false, telephone: false },
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
        address: { '@type': 'PostalAddress', addressCountry: 'EG', addressLocality: 'Cairo' },
        areaServed: { '@type': 'Country', name: 'Egypt' },
      })
    ),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#1e1b4b',
};

/* =======================
   Lazy-loaded Components
======================= */
const FooterComponent = dynamic(() => import('../components/layout/FooterComponent'), { ssr: false });
const BottomNavigation = dynamic(() => import('../components/layout/BottomNavigation'), { ssr: false });
const WhatsappFloatButton = dynamic(() => import('../components/WhatsappFloatButton'), { ssr: false });
const ChatAssistantWidget = dynamic(() => import('../components/ChatAssistantWidget'), { ssr: false });

/* =======================
   Root Layout
======================= */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="rtl">
      <head>
        {/* Performance Hints - تحسين تحميل الخطوط */}
        {/* Next.js Font Loader يدير تحميل الخطوط تلقائياً - تم إزالة preconnect لتجنب محاولات الاتصال الفاشلة */}

        {/* Manifest & Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/globe.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1e1b4b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="خطى" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Theme initialization */}
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
                if (resolved === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            })();
          `
        }} />
      </head>

      <body
        dir="rtl"
        className={[
          inter.variable,
          rubik.variable,
          ibmPlex.variable,
          almarai.variable,
          tajawal.variable,
          cairo.variable,
          lemonada.variable,
          notoKufiArabic.variable,
          'antialiased min-h-screen grid grid-rows-[auto_1fr_auto] relative overflow-x-hidden',
        ].join(' ')}
        style={{
          fontFamily: 'var(--font-tajawal), var(--font-cairo), system-ui, sans-serif',
          fontFeatureSettings: '"rlig" 1, "calt" 1, "liga" 1, "kern" 1',
          textRendering: 'optimizeLegibility',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        }}
      >
        <ThemeProvider>
          <MSWProvider>
            <QueryProvider>
              <AuthProvider>
                <NotificationProvider>
                  <ServiceWorkerProvider />
                  <SkipLink href="#main-content">تخطي إلى المحتوى الرئيسي</SkipLink>
                  <LayoutWrapper>{children}</LayoutWrapper>
                  <ConditionalFooter />
                  <Toaster
                    position="top-left"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: 'var(--color-neutral-50)',
                        color: 'var(--color-neutral-900)',
                        border: '1px solid var(--color-neutral-200)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--spacing-4) var(--spacing-5)',
                        boxShadow: 'var(--shadow-elevation-2)',
                        transition: 'all 200ms ease-out',
                        zIndex: 9999,
                      },
                    }}
                  />
                  <ConditionalWidgets />
                </NotificationProvider>
              </AuthProvider>
            </QueryProvider>
          </MSWProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
