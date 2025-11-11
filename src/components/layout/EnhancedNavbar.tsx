'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, Home, BookOpen, Award, ShoppingBag, MoreHorizontal, LogIn, UserPlus, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/hooks/useSubscription';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ROUTES } from '@/lib/routes';

const getNavigationItems = (hasSubscription: boolean) => [
  {
    label: 'الرئيسية',
    href: ROUTES.HOME,
    icon: Home,
  },
  {
    label: 'الكورسات',
    href: ROUTES.COURSES,
    icon: BookOpen,
  },
  {
    label: 'المراجعة الداخلية',
    href: ROUTES.INTERNAL_AUDIT,
    icon: FileText,
  },
  {
    label: 'زمالة CIA',
    href: ROUTES.CIA,
    icon: Award,
  },
  {
    label: 'الاستشارات',
    href: '/packages-and-consulting',
    icon: ShoppingBag,
  },
  {
    label: 'المزيد',
    href: '#',
    icon: MoreHorizontal,
    children: [
      { label: 'المكتبة', href: '/resources' },
      { label: 'الموارد', href: '/resources' },
      { label: 'المجتمع', href: '/community' },
      { label: 'الأدوات', href: '/ai-tools' },
    ],
  },
];

export default function EnhancedNavbar() {
  const pathname = usePathname();
  const subscriptionQuery = useSubscription();
  const hasSubscription = subscriptionQuery.data?.hasSubscription ?? false;
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<Record<string, NodeJS.Timeout>>({});

  const navItems = useMemo(() => getNavigationItems(hasSubscription), [hasSubscription]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
    // إغلاق جميع الـ timers السابقة
    Object.values(closeTimerRef.current).forEach(timer => clearTimeout(timer));
    closeTimerRef.current = {};
  };

  // إغلاق dropdown عند النقر خارجها
  useEffect(() => {
    if (!openDropdown) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownElement = document.querySelector(`[data-dropdown="${openDropdown}"]`);
      const buttonElement = document.querySelector(`[data-dropdown-button="${openDropdown}"]`);

      if (
        dropdownElement &&
        !dropdownElement.contains(target) &&
        buttonElement &&
        !buttonElement.contains(target)
      ) {
        setOpenDropdown(null);
        Object.values(closeTimerRef.current).forEach(timer => clearTimeout(timer));
        closeTimerRef.current = {};
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  // إغلاق dropdown عند تغيير الصفحة
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
    Object.values(closeTimerRef.current).forEach(timer => clearTimeout(timer));
    closeTimerRef.current = {};
  }, [pathname]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          'backdrop-blur-xl border-b border-transparent',
          isScrolled
            ? 'bg-white/90 dark:bg-neutral-900/80 shadow-md shadow-primary-500/10 border-neutral-200/50 dark:border-neutral-800/50'
            : 'bg-gradient-to-b from-white/70 to-transparent dark:from-neutral-900/70'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent tracking-tight">
            خطى
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href));
              const hasChildren = item.children && item.children.length > 0;
              
              return (
                <div key={item.label} className="relative">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      data-dropdown-button={item.label}
                      className={cn(
                        'flex items-center gap-2 text-sm font-semibold transition-colors duration-200',
                        'hover:text-primary-600 dark:hover:text-primary-400',
                        'focus:outline-none focus-visible:outline-none active:outline-none',
                        isActive && 'text-primary-600 dark:text-primary-400'
                      )}
                      aria-expanded={openDropdown === item.label}
                      aria-haspopup="true"
                    >
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                      {item.label}
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform duration-200',
                          openDropdown === item.label && 'rotate-180'
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-2 text-sm font-semibold transition-colors duration-200',
                        'hover:text-primary-600 dark:hover:text-primary-400',
                        'focus:outline-none focus-visible:outline-none active:outline-none',
                        isActive && 'text-primary-600 dark:text-primary-400'
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon className="w-4 h-4" aria-hidden="true" />
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {hasChildren && openDropdown === item.label && (
                    <div
                      data-dropdown={item.label}
                      className="absolute top-full mt-2 start-0 w-56 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-700/50 rounded-xl shadow-lg overflow-hidden z-50"
                      role="menu"
                      aria-label={`قائمة ${item.label}`}
                    >
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href || pathname.startsWith(child.href);
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setOpenDropdown(null)}
                            className={cn(
                              'block px-4 py-2.5 text-sm transition-colors',
                              'text-neutral-700 dark:text-neutral-300',
                              'hover:bg-primary-50 dark:hover:bg-primary-900/30',
                              'hover:text-primary-600 dark:hover:text-primary-400',
                              'focus:outline-none focus-visible:outline-none active:outline-none',
                              isChildActive && 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-medium'
                            )}
                            role="menuitem"
                            aria-current={isChildActive ? 'page' : undefined}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={ROUTES.LOGIN}
              className="group relative px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 bg-white dark:bg-neutral-900 hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-300 shadow-sm hover:shadow-md flex items-center gap-2 focus:outline-none focus-visible:outline-none active:outline-none"
              aria-label="تسجيل الدخول"
            >
              <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              <span>دخول</span>
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className="group relative px-6 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center gap-2 overflow-hidden focus:outline-none focus-visible:outline-none active:outline-none"
              aria-label="إنشاء حساب جديد"
            >
              {/* Shine effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <UserPlus className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              <span className="relative z-10">ابدأ الآن</span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
            aria-label="فتح/إغلاق القائمة"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md">
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                    <button
                      onClick={() =>
                        item.children ? toggleDropdown(item.label) : setMobileOpen(false)
                      }
                      className={cn(
                        'w-full flex justify-between items-center text-sm font-semibold py-2 px-3 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800',
                        'focus:outline-none focus-visible:outline-none active:outline-none',
                        pathname.startsWith(item.href) && 'text-primary-600'
                      )}
                    >
                    <span className="flex items-center gap-2">
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </span>
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          'w-4 h-4 transition-transform',
                          openDropdown === item.label && 'rotate-180'
                        )}
                      />
                    )}
                  </button>
                  {item.children && openDropdown === item.label && (
                    <div className="pl-6 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm text-neutral-700 dark:text-neutral-300 hover:text-primary-600 focus:outline-none focus-visible:outline-none active:outline-none"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 flex flex-col gap-3 border-t border-neutral-200 dark:border-neutral-800">
                <Link
                  href={ROUTES.LOGIN}
                  onClick={() => setMobileOpen(false)}
                  className="group w-full py-3 px-4 text-center rounded-xl border-2 border-primary-200 dark:border-primary-800 text-primary-700 dark:text-primary-300 bg-white dark:bg-neutral-900 hover:border-primary-400 dark:hover:border-primary-600 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-300 shadow-sm hover:shadow-md flex items-center justify-center gap-2 font-semibold focus:outline-none focus-visible:outline-none active:outline-none"
                >
                  <LogIn className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span>دخول</span>
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  onClick={() => setMobileOpen(false)}
                  className="group relative w-full py-3 px-4 text-center rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden focus:outline-none focus-visible:outline-none active:outline-none"
                >
                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <UserPlus className="w-4 h-4 relative z-10 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <span className="relative z-10">ابدأ الآن</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      <div className="h-16" />
    </>
  );
}
