'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, BookOpen, Settings, Users, MessageSquare, Menu, X, LogIn, UserPlus } from 'lucide-react';
import UserMenu from './UserMenu';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

/**
 * Unified Navigation Bar Component - يستخدم Design Tokens
 * نظام موحد للتنقل مع دعم كامل للوضع المظلم، animations، و accessibility
 */

const NavbarComponent = () => {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // تحديث من الـ Auth

  const navLinks = [
    { href: '/', label: 'الرئيسية', icon: Home },
    { href: '/courses', label: 'الدورات', icon: BookOpen },
    { href: '/learning-paths', label: 'المسارات', icon: Settings },
    { href: '/resources', label: 'المكتبة', icon: BookOpen },
    { href: '/community', label: 'المجتمع', icon: Users },
    { href: '/consulting', label: 'الاستشارات', icon: MessageSquare },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenu(false);
    };
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* شريط التنقل - محسّن مع Design Tokens */}
      <motion.nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50",
          "bg-white/95 dark:bg-neutral-900/95",
          "backdrop-blur-lg",
          "border-b border-neutral-200 dark:border-neutral-800",
          isScrolled ? "shadow-elevation-3" : "shadow-elevation-1",
          "transition-all duration-200 ease-out"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* الشعار */}
            <Link 
              href="/" 
              className={cn(
                "text-2xl font-bold",
                "text-neutral-900 dark:text-white",
                "hover:text-primary-600 dark:hover:text-primary-400",
                "transition-colors duration-200",
                "flex items-center gap-2",
                "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded-lg"
              )}
              aria-label="الصفحة الرئيسية - خطى"
            >
              <span className="text-primary-600 dark:text-primary-400">خطى</span>
            </Link>

            {/* روابط سطح المكتب */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: IconComponent }) => {
                const isActive = isActiveLink(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "px-4 py-2",
                      "text-xs font-semibold",
                      "transition-all duration-300 ease-in-out",
                      "flex items-center gap-1.5",
                      "rounded-full",
                      "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                      "hover:scale-105 active:scale-95",
                      isActive
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-md"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon icon={IconComponent} size="sm" className="text-current w-4 h-4" />
                    <span>{label}</span>
                  </Link>
                );
              })}
              
              {/* أزرار التسجيل */}
              <div className="flex items-center gap-2 mr-4 pr-4 border-r border-neutral-200 dark:border-neutral-800">
                {isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn(
                        "btn-ghost px-4 py-2 rounded-full",
                        "flex items-center gap-1.5",
                        "text-xs font-semibold",
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95"
                      )}
                    >
                      <Icon icon={LogIn} size="sm" className="text-current w-4 h-4" />
                      <span>تسجيل الدخول</span>
                    </Link>
                    <Link
                      href="/register"
                      className={cn(
                        "btn-primary px-4 py-2 rounded-full",
                        "flex items-center gap-1.5",
                        "text-xs font-semibold",
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95",
                        "shadow-lg hover:shadow-xl"
                      )}
                    >
                      <Icon icon={UserPlus} size="sm" className="text-white w-4 h-4" />
                      <span>التسجيل</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* زر القائمة للجوال */}
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className={cn(
                "md:hidden p-2.5",
                "text-neutral-700 dark:text-neutral-300",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "rounded-full transition-all duration-300 ease-in-out",
                "hover:scale-110 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2"
              )}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <Icon icon={X} size="lg" className="text-current" />
              ) : (
                <Icon icon={Menu} size="lg" className="text-current" />
              )}
            </button>
          </div>
        </div>

        {/* القائمة المنسدلة للجوال - محسّنة مع animations */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className={cn(
                "px-4 py-4 space-y-2",
                "bg-neutral-50 dark:bg-neutral-900",
                "border-t border-neutral-200 dark:border-neutral-800"
              )}>
                {navLinks.map(({ href, label, icon: IconComponent }, index) => {
                  const isActive = isActiveLink(href);
                  return (
                    <motion.div
                      key={href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMobileMenu(false)}
                        className={cn(
                          "flex items-center gap-3 px-5 py-3.5",
                          "text-neutral-700 dark:text-neutral-300",
                          "rounded-2xl transition-all duration-300 ease-in-out",
                          "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          isActive
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-md"
                            : "hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm"
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon icon={IconComponent} size="md" className="text-current" />
                        <span className="font-semibold">{label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="border-t border-neutral-200 dark:border-neutral-800 my-2" />
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileMenu(false)}
                    className={cn(
                      "btn-ghost w-full justify-start rounded-2xl py-3",
                      "flex items-center gap-2.5",
                      "text-sm font-semibold",
                      "transition-all duration-300 ease-in-out",
                      "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                  >
                    <Icon icon={LogIn} size="sm" className="text-current" />
                    <span>تسجيل الدخول</span>
                  </Link>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (navLinks.length + 1) * 0.05, duration: 0.2 }}
                >
                  <Link
                    href="/register"
                    onClick={() => setMobileMenu(false)}
                    className={cn(
                      "btn-primary w-full rounded-2xl py-3.5",
                      "flex items-center gap-3",
                      "text-base font-semibold",
                      "transition-all duration-300 ease-in-out",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "shadow-lg hover:shadow-xl"
                    )}
                  >
                    <Icon icon={UserPlus} size="md" className="text-white" />
                    <span>التسجيل</span>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* مساحة فارغة لتعويض ارتفاع شريط التنقل الثابت */}
      <div className="h-16" />
    </>
  );
};

export default NavbarComponent;
