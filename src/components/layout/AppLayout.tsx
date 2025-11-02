'use client';

import { ReactNode } from 'react';
import EnhancedNavbar from './EnhancedNavbar';
import Breadcrumbs from './Breadcrumbs';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

/**
 * App Layout Component
 * يضمن إضافة شريط التنقل و Breadcrumbs في جميع الصفحات
 */
interface AppLayoutProps {
  children: ReactNode;
  showBreadcrumbs?: boolean;
  breadcrumbClassName?: string;
}

const AppLayout = ({ 
  children, 
  showBreadcrumbs = true,
  breadcrumbClassName 
}: AppLayoutProps) => {
  const pathname = usePathname();
  
  // صفحات لا تحتاج Breadcrumbs
  const hideBreadcrumbsPages = ['/', '/login', '/register'];
  const shouldShowBreadcrumbs = showBreadcrumbs && !hideBreadcrumbsPages.includes(pathname);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Enhanced Navigation Bar */}
      <EnhancedNavbar />

      {/* Breadcrumbs */}
      {shouldShowBreadcrumbs && (
        <div className={cn(
          "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4",
          breadcrumbClassName
        )}>
          <Breadcrumbs />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;

