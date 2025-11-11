import type { Metadata, Viewport } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Toaster } from 'react-hot-toast';
import { Inter, Nunito_Sans, IBM_Plex_Sans_Arabic, Almarai, Cairo, Lemonada } from 'next/font/google';

import '../styles/core.css';
import '../styles/utilities.css';
import '../styles/backgrounds.css';
import '../styles/blending-layer.css';

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

const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'], 
  variable: '--font-nunito-sans', 
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

const ibmPlex = IBM_Plex_Sans_Arabic({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-ibm-plex', 
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  preload: false,
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
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

const cairo = Cairo({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-cairo', 
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  preload: false,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
});

const lemonada = Lemonada({ 
  subsets: ['arabic', 'latin'], 
  variable: '--font-lemonada', 
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Arial', 'sans-serif'],
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
        {/* Performance Hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lemonada:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="preload" as="image" href="/banar-cours.webp" />
        <link rel="preload" as="image" href="/globe.svg" />

        {/* Manifest & Icons */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/globe.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#1e1b4b" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="خطى" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* Theme initialization */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function() {
              try {
                const theme = localStorage.getItem('theme') || 'system';
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const resolved = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;
                if (resolved === 'dark') document.documentElement.classList.add('dark');
              } catch (e) {}
            })();
          `}
        </Script>
      </head>

      <body
        dir="rtl"
        className={[
          inter.variable,
          nunitoSans.variable,
          ibmPlex.variable,
          almarai.variable,
          cairo.variable,
          lemonada.variable,
          'antialiased min-h-screen grid grid-rows-[auto_1fr_auto] relative overflow-x-hidden',
        ].join(' ')}
        style={{
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
                        background: 'var(--color-background)',
                        color: 'var(--color-text-primary)',
                        border: '1px solid var(--color-accent)',
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
