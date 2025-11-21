'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Menu, X, ChevronDown, Home, BookOpen, Award, MoreHorizontal, LogIn, UserPlus, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSubscription } from '@/hooks/useSubscription';
import { ROUTES } from '@/lib/routes';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion as motionTokens } from '@/tokens';
import { buttonVariants } from '@/components/ui/Button';

// --- Constants & Types ---
const NAVIGATION_CONFIG = {
  scrollThreshold: 10,
  mobileBreakpoint: 1024,
};

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
    label: 'CIA',
    href: ROUTES.CIA,
    icon: Award,
  },
  {
    label: 'المزيد',
    href: '#',
    icon: MoreHorizontal,
    children: [
      { label: 'المكتبة', href: '/library' },
      { label: 'الموارد', href: '/resources' },
      { label: 'المجتمع', href: '/community' },
      { label: 'الأدوات', href: '/ai-tools' },
      { label: 'عرض التأثيرات', href: '/demo' },
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

  const navRef = useRef<HTMLDivElement>(null);

  const navItems = useMemo(() => getNavigationItems(hasSubscription), [hasSubscription]);

  // Motion props for links
  const linkMotionProps = prefersReducedMotion
    ? {}
    : {
      whileHover: { scale: 1.05 },
      whileTap: motionTokens.press.soft,
      transition: motionTokens.linkTransitions.hover.transition,
    };

  // --- Effects ---

  // Handle Scroll
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > NAVIGATION_CONFIG.scrollThreshold;
      if (scrolled !== isScrolled) setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolled]);

  // Handle Click Outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    if (openDropdown || mobileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown, mobileOpen]);

  // Reset on Route Change
  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [pathname]);

  // --- Helpers ---

  const toggleDropdown = (label: string) => {
    setOpenDropdown(prev => (prev === label ? null : label));
  };

  const isLinkActive = (href: string) => {
    if (href === ROUTES.HOME) return pathname === ROUTES.HOME;
    return pathname.startsWith(href) && href !== '#';
  };

  // --- Render ---

  return (
    <div ref={navRef} className="relative z-50 print:hidden" dir="rtl">
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 transition-colors duration-200',
          'border-b h-16 lg:h-20', // Taller height for desktop elegance
          isScrolled
            ? 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md border-neutral-200/50 dark:border-neutral-800/50 shadow-sm supports-[backdrop-filter]:bg-white/60'
            : 'bg-transparent border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-lg px-1"
            aria-label="خطى - الصفحة الرئيسية"
          >
            <div className="text-2xl font-black tracking-tighter text-primary-600 dark:text-primary-400 select-none">
              خطى
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = isLinkActive(item.href);
              const hasChildren = !!item.children?.length;
              const isOpen = openDropdown === item.label;

              if (hasChildren) {
                return (
                  <div key={item.label} className="relative group/dropdown">
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={cn(
                        'flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors',
                        'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                        isOpen && 'text-primary-600 bg-primary-50 dark:text-primary-300 dark:bg-primary-900/20'
                      )}
                      aria-expanded={isOpen}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        className={cn("w-4 h-4 transition-transform duration-200", isOpen && "rotate-180")}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOpen && (
                      <div className="absolute top-full mt-2 right-0 w-56 bg-white dark:bg-neutral-800 border border-neutral-100 dark:border-neutral-700 rounded-xl shadow-lg py-2 animate-in fade-in zoom-in-95 duration-100">
                        {item.children!.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              'block px-4 py-2.5 text-sm text-neutral-600 dark:text-neutral-300',
                              'hover:bg-neutral-50 hover:text-primary-600 dark:hover:bg-neutral-700/50 dark:hover:text-primary-400',
                              pathname === child.href && 'bg-primary-50 text-primary-700 font-medium'
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <motion.div key={item.label} {...linkMotionProps}>
                  <Link
                    href={item.href}
                    className={cn(
                      'relative px-4 py-2 rounded-full text-sm font-medium transition-colors block',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                      isActive
                        ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                        : 'text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href={ROUTES.LOGIN}
              className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), "text-primary-600 hover:text-primary-700 hover:bg-primary-50")}
            >
              تسجيل دخول
            </Link>
            <Link
              href={ROUTES.REGISTER}
              className={cn(buttonVariants({ variant: 'default', size: 'default' }), "relative z-10 shadow-primary-sm hover:shadow-primary-md")}
            >
              ابدأ مجاناً
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-neutral-600 hover:bg-neutral-100 rounded-lg transition-colors"
            aria-label="القائمة الرئيسية"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-white dark:bg-neutral-900 border-b border-neutral-100 dark:border-neutral-800 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <div className="space-y-2">
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="flex items-center justify-between w-full py-2 text-base font-semibold text-neutral-800 dark:text-neutral-200"
                      >
                        <span className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-neutral-500" />
                          {item.label}
                        </span>
                        <ChevronDown className={cn("w-5 h-5 transition-transform", openDropdown === item.label && "rotate-180")} />
                      </button>
                      {openDropdown === item.label && (
                        <div className="mr-8 space-y-2 border-r-2 border-neutral-100 pr-4">
                          {item.children.map(child => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <motion.div {...linkMotionProps}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 py-2 text-base font-semibold",
                          isLinkActive(item.href)
                            ? "text-primary-600 bg-primary-50 px-3 -mx-3 rounded-lg"
                            : "text-neutral-800 dark:text-neutral-200"
                        )}
                      >
                        <item.icon className={cn("w-5 h-5", isLinkActive(item.href) ? "text-primary-600" : "text-neutral-500")} />
                        {item.label}
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}

              <div className="pt-6 mt-6 border-t border-neutral-100 dark:border-neutral-800 grid grid-cols-2 gap-4">
                <motion.div {...linkMotionProps}>
                  <Link
                    href={ROUTES.LOGIN}
                    className="flex items-center justify-center py-3 text-sm font-semibold text-primary-600 bg-primary-50 rounded-xl"
                  >
                    تسجيل دخول
                  </Link>
                </motion.div>
                <motion.div {...linkMotionProps}>
                  <Link
                    href={ROUTES.REGISTER}
                    className="flex items-center justify-center py-3 text-sm font-semibold text-white bg-primary-600 rounded-xl"
                  >
                    إنشاء حساب
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </div>
  );
}
