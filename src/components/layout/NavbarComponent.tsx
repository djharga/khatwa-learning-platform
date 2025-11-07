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
        <div className="container mx-auto max-w-7xl px-8">
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
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map(({ href, label, icon: IconComponent }) => {
                const isActive = isActiveLink(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "h-[44px] px-5 py-2.5",
                      "text-sm font-semibold",
                      "transition-all duration-300 ease-in-out",
                      "flex items-center justify-center gap-2",
                      "rounded-xl",
                      "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                      "hover:scale-105 active:scale-95",
                      isActive
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-md"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon icon={IconComponent} size="sm" className="text-current w-[18px] h-[18px]" />
                    <span>{label}</span>
                  </Link>
                );
              })}

              {/* أزرار التسجيل */}
              <div className="flex items-center gap-2.5 mr-3 pr-3 border-r border-neutral-200 dark:border-neutral-800">
                {isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn(
                        "h-[42px] px-5 py-2.5 rounded-xl",
                        "text-sm font-semibold whitespace-nowrap",
                        "bg-transparent border-2 border-primary-600 dark:border-primary-400",
                        "text-primary-600 dark:text-primary-400",
                        "hover:bg-primary-50 dark:hover:bg-primary-900/20",
                        "flex items-center justify-center gap-2",
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95"
                      )}
                    >
                      <LogIn className="w-[18px] h-[18px]" />
                      <span>تسجيل الدخول</span>
                    </Link>
                    <Link
                      href="/register"
                      className={cn(
                        "h-[42px] px-5 py-2.5 rounded-xl",
                        "text-sm font-semibold whitespace-nowrap",
                        "bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600",
                        "text-white",
                        "hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700",
                        "shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/50",
                        "flex items-center justify-center gap-2",
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95"
                      )}
                    >
                      <UserPlus className="w-[18px] h-[18px]" />
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
                "md:hidden h-[44px] w-[44px] p-2.5",
                "text-neutral-700 dark:text-neutral-300",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "rounded-xl transition-all duration-300 ease-in-out",
                "hover:scale-110 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                "flex items-center justify-center"
              )}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? (
                <Icon icon={X} size="lg" className="text-current w-[22px] h-[22px]" />
              ) : (
                <Icon icon={Menu} size="lg" className="text-current w-[22px] h-[22px]" />
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
                          "h-[48px] flex items-center gap-3 px-5 py-3",
                          "text-sm font-semibold",
                          "text-neutral-700 dark:text-neutral-300",
                          "rounded-xl transition-all duration-300 ease-in-out",
                          "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          isActive
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-md"
                            : "hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm"
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <Icon icon={IconComponent} size="md" className="text-current w-[20px] h-[20px]" />
                        <span>{label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
                
                <div className="border-t border-neutral-200 dark:border-neutral-800 my-3 pt-3 space-y-2" />
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.2 }}
                >
                  <Link
                    href="/login"
                    onClick={() => setMobileMenu(false)}
                    className={cn(
                      "h-[50px] w-full px-5 py-3 rounded-xl",
                      "bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600",
                      "text-white font-semibold",
                      "hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700",
                      "shadow-lg hover:shadow-xl",
                      "flex items-center justify-center gap-2.5",
                      "text-sm",
                      "transition-all duration-300 ease-in-out",
                      "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                  >
                    <LogIn className="w-[19px] h-[19px]" />
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
                      "h-[50px] w-full px-5 py-3 rounded-xl",
                      "border-2 border-primary-600 dark:border-primary-400",
                      "text-primary-600 dark:text-primary-400 font-semibold",
                      "bg-white dark:bg-neutral-800",
                      "hover:bg-primary-50 dark:hover:bg-primary-900/20",
                      "flex items-center justify-center gap-2.5",
                      "text-sm",
                      "transition-all duration-300 ease-in-out",
                      "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                  >
                    <UserPlus className="w-[19px] h-[19px]" />
                    <span>إنشاء حساب جديد</span>
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
