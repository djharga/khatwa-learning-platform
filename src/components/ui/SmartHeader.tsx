'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ChevronDown, Home, BookOpen, Award, 
  MoreHorizontal, LogIn, UserPlus, 
  FileText, Search, User 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ROUTES } from '@/lib/routes';

const navigationItems = [
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
      { label: 'المكتبة', href: '/resources' },
      { label: 'الموارد', href: '/resources' },
      { label: 'المجتمع', href: '/community' },
      { label: 'الأدوات', href: '/ai-tools' },
    ],
  },
];

export default function SmartHeader() {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll behavior
  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Update scroll state
          setIsScrolled(currentScrollY > 20);
          
          // Update scroll direction
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsScrollingDown(true);
          } else {
            setIsScrollingDown(false);
          }
          
          // Update scroll progress
          const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
          const progress = (currentScrollY / windowHeight) * 100;
          setScrollProgress(Math.min(progress, 100));
          
          setLastScrollY(currentScrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-primary-500 via-academic-accent-500 to-accent-500 transition-transform duration-200 ease-out origin-right shadow-[0_0_10px_rgba(91,54,232,0.5)]"
          style={{ 
            transform: `scaleX(${scrollProgress / 100})`,
            willChange: 'transform'
          }}
        />
      </div>

      {/* Smart Header */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          'border-b',
          isScrollingDown && isScrolled ? '-translate-y-full' : 'translate-y-0',
          isScrolled
            ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg shadow-elevation-3 border-neutral-200/50 dark:border-neutral-800/50'
            : 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-transparent'
        )}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href={ROUTES.HOME}
              className="flex items-center gap-3 group no-underline hover:no-underline"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-academic-accent-500 rounded-xl blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative p-2 bg-gradient-to-br from-primary-500 to-academic-accent-500 rounded-xl">
                  <span className="text-2xl">🎓</span>
                </div>
              </div>
              <span
                className="text-2xl font-black bg-gradient-to-r from-primary-600 to-academic-accent-600 bg-clip-text text-transparent"
                style={{
                  fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
                }}
              >
                خطى
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '#' && pathname.startsWith(item.href));
                const hasChildren = item.children && item.children.length > 0;

                return (
                  <div key={item.label} className="relative">
                    {hasChildren ? (
                      <button
                        onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                          'hover:bg-primary-50 dark:hover:bg-neutral-800',
                          isActive
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-neutral-800'
                            : 'text-neutral-700 dark:text-neutral-300'
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            openDropdown === item.label && 'rotate-180'
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200',
                          'hover:bg-primary-50 dark:hover:bg-neutral-800',
                          isActive
                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-neutral-800'
                            : 'text-neutral-700 dark:text-neutral-300'
                        )}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )}

                    {/* Enhanced Dropdown Menu with Animations */}
                    {hasChildren && openDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-xl shadow-elevation-5 border border-neutral-200/50 dark:border-neutral-700/50 overflow-hidden z-50"
                        style={{ boxShadow: '0 10px 40px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(91, 54, 232, 0.1)' }}
                      >
                        {item.children?.map((child, index) => (
                          <motion.div
                            key={child.href}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                          >
                            <Link
                              href={child.href}
                              className="block px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-gradient-to-r hover:from-primary-50 hover:to-academic-accent-50 dark:hover:from-neutral-700 dark:hover:to-neutral-700 hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200 border-b border-neutral-100/50 dark:border-neutral-700/50 last:border-0"
                              onClick={() => setOpenDropdown(null)}
                            >
                              {child.label}
                            </Link>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button */}
              <button
                className="p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="بحث"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  <span>دخول</span>
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-academic-accent-600 hover:from-primary-700 hover:to-academic-accent-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>تسجيل</span>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="القائمة"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="lg:hidden py-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </div>
                          <ChevronDown
                            className={cn(
                              'w-4 h-4 transition-transform duration-200',
                              openDropdown === item.label && 'rotate-180'
                            )}
                          />
                        </button>
                        {openDropdown === item.label && (
                          <div className="mr-8 mt-2 space-y-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                <Link
                  href={ROUTES.LOGIN}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span>دخول</span>
                </Link>
                <Link
                  href={ROUTES.REGISTER}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-primary-600 to-academic-accent-600 rounded-lg shadow-lg transition-all duration-200"
                  onClick={() => setMobileOpen(false)}
                >
                  <UserPlus className="w-4 h-4" />
                  <span>تسجيل جديد</span>
                </Link>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Spacer to prevent content jump */}
      <div className="h-16" />
    </>
  );
}