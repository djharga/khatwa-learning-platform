'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import Script from 'next/script';

import EnhancedNavbar from '../components/layout/EnhancedNavbar';
import AppSidebar from '../components/layout/AppSidebar';
import { PageTransition } from '../components/ui/PageTransition';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  // استخدام نفس القيمة الافتراضية مثل AppSidebar لتجنب layout shift
  // على الشاشات الكبيرة، الافتراضي يكون مفتوح
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    // تجنب hydration mismatch - استخدام قيمة آمنة للـ SSR
    if (typeof window === 'undefined') return false;
    // نستخدم نفس المنطق مثل AppSidebar
    try {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved !== null) return saved === 'true';
      // على الشاشات الكبيرة، الافتراضي يكون مفتوح
      return window.innerWidth >= 1024;
    } catch {
      return false;
    }
  });
  const [isMounted, setIsMounted] = useState(false);

  // تحديث حالة الشريط الجانبي بعد mount
  useEffect(() => {
    setIsMounted(true);
    // نستخدم نفس المنطق مثل AppSidebar بالضبط
    try {
      const saved = localStorage.getItem('sidebarOpen');
      if (saved !== null) {
        setSidebarOpen(saved === 'true');
      } else {
        // على الشاشات الكبيرة، الافتراضي يكون مفتوح
        setSidebarOpen(window.innerWidth >= 1024);
      }
    } catch {
      // في حالة الخطأ، نستخدم القيمة الافتراضية
      setSidebarOpen(window.innerWidth >= 1024);
    }
  }, []);

  // تحديث حالة الشريط الجانبي من الأحداث المخصصة من AppSidebar
  useEffect(() => {
    if (!isMounted) return;

    // استماع لحدث مخصص (من AppSidebar) - هذا هو المصدر الموثوق
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      if (customEvent.detail?.isOpen !== undefined) {
        setSidebarOpen(customEvent.detail.isOpen);
      }
    };
    window.addEventListener('sidebarStateChange', handleCustomEvent);

    // أيضاً نستمع لتغييرات localStorage (من نوافذ أخرى)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'sidebarOpen' && e.newValue !== null) {
        setSidebarOpen(e.newValue === 'true');
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('sidebarStateChange', handleCustomEvent);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [isMounted]);

  // كشف صفحات الدروس لتفعيل وضع الشاشة الكاملة
  const isLessonPage = pathname?.startsWith('/lesson/');

  if (isLessonPage) {
    return (
      <>
        <Script src="/theme-init.js" strategy="beforeInteractive" />
        <div className="fixed inset-0 z-50">{children}</div>
      </>
    );
  }

  // استخدام CSS classes ديناميكية لتجنب layout shift
  // الحل: دائماً نحجز مساحة للـ sidebar على الشاشات الكبيرة، ونستخدم transition سلس
  // قبل mount، نستخدم القيمة الافتراضية (مفتوح على الشاشات الكبيرة) لتجنب layout shift
  const mainPaddingClass = !isMounted 
    ? 'lg:ps-[320px]' // قبل mount - استخدام القيمة الافتراضية
    : sidebarOpen 
      ? 'lg:ps-[320px]' // sidebar مفتوح - padding 320px (عرض الـ sidebar = 20rem = 320px)
      : 'lg:ps-6'; // sidebar مغلق - padding صغير

  return (
    <>
      <EnhancedNavbar />
      <AppSidebar />
      <Script src="/theme-init.js" strategy="beforeInteractive" />

      <PageTransition>
        <main
          id="main-content"
          role="main"
          tabIndex={-1}
          className={`px-4 py-6 sm:py-8 ${mainPaddingClass} lg:pe-6 xl:pe-8 lg:py-10 xl:py-12 pt-16 lg:pt-20 pb-20 md:pb-8 min-h-[calc(100vh-5rem)] transition-[padding-inline-start] duration-[200ms] ease-out`}
          style={{ 
            position: 'relative', 
            zIndex: 1
          }}
        >
          {/* زر الرجوع */}
          {pathname !== '/' && (
            <div className="mb-4 sm:mb-6 max-w-7xl mx-auto">
              <Link
                href={pathname?.includes('/courses/') ? '/courses' : '/'}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-800 rounded-lg shadow-elevation-1 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-[200ms] ease-out font-medium text-sm min-h-[44px] focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
              >
                <ArrowRight className="w-4 h-4" />
                <span>رجوع</span>
              </Link>
            </div>
          )}

          {/* المحتوى الرئيسي */}
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </main>
      </PageTransition>
    </>
  );
}
