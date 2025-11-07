'use client';

import { usePathname } from 'next/navigation';
import EnhancedNavbar from '../components/layout/EnhancedNavbar';
import AppSidebar from '../components/layout/AppSidebar';
import Breadcrumbs from '../components/layout/Breadcrumbs';
import Script from 'next/script';
import { PageTransition } from '../components/ui/PageTransition';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if this is a lesson page that should have full-screen layout
  const isLessonPage = pathname?.includes('/lesson/');
  
  if (isLessonPage) {
    // For lesson pages, render without padding/container - PlayerShell handles its own layout
    // Hide navbar and sidebar for full-screen lesson experience
    return (
      <>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <div className="fixed inset-0 z-50">{children}</div>
      </>
    );
  }
  
  // For other pages, use the standard layout with padding and container
  return (
    <>
      <EnhancedNavbar />
      <AppSidebar />
      <Script src="/theme-init.js" strategy="beforeInteractive" />
      <PageTransition>
        <main
          id="main-content"
          className="px-4 py-8 lg:px-8 lg:py-12 pt-16 lg:pt-20 pb-20 md:pb-8"
          role="main"
          tabIndex={-1}
          style={{ position: 'relative', zIndex: 0 }}
        >
          {/* مسار التنقل */}
          <div className="mb-6">
            <Breadcrumbs className="max-w-6xl mx-auto" />
          </div>

          {/* المحتوى الرئيسي */}
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </PageTransition>
    </>
  );
}

