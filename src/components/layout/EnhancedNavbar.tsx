'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  GraduationCap, 
  ShoppingBag, 
  Library, 
  LogIn, 
  UserPlus,
  Menu, 
  X, 
  ChevronDown,
  FileText,
  Award,
  Users,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Sparkles,
  MoreHorizontal,
  Info,
  HelpCircle,
  Shield,
} from 'lucide-react';
import UserMenu from './UserMenu';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

/**
 * Enhanced Navigation Bar with Modern Dropdown Menus
 * شريط تنقل محسّن مع قوائم منسدلة عصرية وأنيميشن سلس
 * 
 * Features:
 * - تصميم عصري مع ألوان موحدة من tokens.ts
 * - دروب داون مينيو محسّن مع أنيميشن سلس
 * - بحث محسّن مع اقتراحات
 * - دعم كامل للوضع المظلم
 * - Accessibility محسّن
 * - Responsive design كامل
 */

// تعريف القوائم الفرعية لكل قسم - محسّن مع أيقونات وألوان
const navigationMenuItems = {
  courses: {
    label: 'الكورسات',
    icon: BookOpen,
    href: '/courses',
    color: 'primary',
    description: 'استكشف دوراتنا الاحترافية',
    children: [
      { 
        label: 'جميع الكورسات', 
        href: '/courses', 
        icon: BookOpen,
        description: 'تصفح جميع الدورات المتاحة',
        badge: 'جديد' as const
      },
      { 
        label: 'المراجعة الداخلية', 
        href: '/internal-audit', 
        icon: FileText,
        description: 'دورات متخصصة في المراجعة الداخلية',
        featured: true as const
      },
    ] as Array<{
      label: string;
      href: string;
      icon: any;
      description: string;
      badge?: string;
      featured?: boolean;
    }>,
  },
  cia: {
    label: 'زمالة CIA',
    icon: Award,
    href: '/cia',
    color: 'secondary-innovate',
    description: 'شهادات معتمدة عالمياً',
    children: [
      { 
        label: 'نظرة عامة', 
        href: '/cia', 
        icon: Award,
        description: 'تعرف على برنامج CIA'
      },
      { 
        label: 'بنك الأسئلة', 
        href: '/question-bank', 
        icon: FileText,
        description: 'أسئلة تدريبية شاملة',
        badge: 'مميز'
      },
    ],
  },
  packages: {
    label: 'الباقات والاستشارات',
    icon: ShoppingBag,
    href: '/packages-and-consulting',
    color: 'accent',
    description: 'حلول مخصصة لاحتياجاتك',
    children: [
      { 
        label: 'الباقات', 
        href: '/packages-and-consulting?tab=packages', 
        icon: ShoppingBag,
        description: 'باقات تعليمية متنوعة'
      },
      { 
        label: 'الاستشارات', 
        href: '/packages-and-consulting?tab=consulting', 
        icon: MessageSquare,
        description: 'استشارات احترافية'
      },
    ],
  },
  more: {
    label: 'المزيد',
    icon: MoreHorizontal,
    href: '#',
    color: 'neutral',
    description: 'مزيد من الخيارات والروابط',
    children: [
      { 
        label: 'المكتبة', 
        href: '/resources', 
        icon: Library,
        description: 'موارد تعليمية شاملة',
        featured: true
      },
      { 
        label: 'المجتمع', 
        href: '/community', 
        icon: Users,
        description: 'تواصل مع الزملاء'
      },
      { 
        label: 'من نحن', 
        href: '/about', 
        icon: Info,
        description: 'تعرف على منصة خطى'
      },
      { 
        label: 'الأسئلة الشائعة', 
        href: '/faq', 
        icon: HelpCircle,
        description: 'إجابات على أسئلتك'
      },
    ],
  },
};

const mainNavItems = [
  { href: '/', label: 'الرئيسية', icon: Home },
];

const EnhancedNavbar = () => {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenu(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        if (isMobileMenuOpen) setMobileMenu(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  const isDropdownActive = (children: typeof navigationMenuItems.courses.children) => {
    return children.some(child => isActiveLink(child.href));
  };

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 right-0 left-0 z-50",
          "bg-white/95 dark:bg-neutral-900/95",
          "backdrop-blur-xl",
          "border-b",
          isScrolled 
            ? "border-neutral-200 dark:border-neutral-800 shadow-elevation-3" 
            : "border-neutral-100 dark:border-neutral-900 shadow-elevation-1",
          "transition-all duration-300 ease-out"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* الشعار - محسّن */}
            <Link 
              href="/" 
              className={cn(
                "text-2xl lg:text-3xl font-bold",
                "hover:text-primary-600 dark:hover:text-primary-400",
                "transition-all duration-300",
                "flex items-center gap-2",
                "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 rounded-xl",
                "group"
              )}
              aria-label="الصفحة الرئيسية - خطى"
            >
              <span className="bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-innovate-600 bg-clip-text text-transparent font-black tracking-tight">
                خطى
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center mx-8">
              {/* الرئيسية */}
              {mainNavItems.map(({ href, label, icon: IconComponent }) => {
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
                      "relative group",
                      "hover:scale-105 active:scale-95",
                      isActive
                        ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-md"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80"
                    )}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-xl shadow-md"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <Icon icon={IconComponent} size="sm" className="relative z-10 text-current w-[18px] h-[18px]" />
                    <span className="relative z-10">{label}</span>
                  </Link>
                );
              })}

              {/* القوائم الفرعية - محسّنة */}
              {Object.entries(navigationMenuItems).map(([key, menu]) => {
                const isActive = menu.href !== '#' && (isActiveLink(menu.href) || isDropdownActive(menu.children));
                const isOpen = openDropdown === key;
                const IconComponent = menu.icon;

                return (
                  <div 
                    key={key} 
                    className="relative" 
                    ref={key === openDropdown ? dropdownRef : null}
                    onMouseEnter={() => setOpenDropdown(key)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                                        {menu.href === '#' ? (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : key)}
                        className={cn(
                          "h-[44px] px-5 py-2.5",
                          "text-sm font-semibold",
                          "transition-all duration-300 ease-in-out",
                          "flex items-center justify-center gap-2",
                          "rounded-xl",
                          "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                          "relative group",
                          "hover:scale-105 active:scale-95",
                          isActive
                            ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-md"
                            : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80"
                        )}
                      >
                        <Icon icon={IconComponent} size="sm" className="relative z-10 text-current w-[18px] h-[18px]" />
                        <span className="relative z-10">{menu.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-[16px] h-[16px] transition-transform duration-300 relative z-10",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                    ) : (
                      <Link
                        href={menu.href}
                        className={cn(
                          "h-[44px] px-5 py-2.5",
                          "text-sm font-semibold",
                          "transition-all duration-300 ease-in-out",
                          "flex items-center justify-center gap-2",
                          "rounded-xl",
                          "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                          "relative group",
                          "hover:scale-105 active:scale-95",
                          isActive
                            ? "text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 shadow-md"
                            : "text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/80"
                        )}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="activeNavIndicator"
                            className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-xl shadow-md"
                            initial={false}
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                          />
                        )}
                        <Icon icon={IconComponent} size="sm" className="relative z-10 text-current w-[18px] h-[18px]" />
                        <span className="relative z-10">{menu.label}</span>
                        <ChevronDown
                          className={cn(
                            "w-[16px] h-[16px] transition-transform duration-300 relative z-10",
                            isOpen && "rotate-180"
                          )}
                        />
                      </Link>
                    )}

                    {/* Enhanced Dropdown Menu */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className={cn(
                            "absolute top-full mt-2 right-0 w-80",
                            "bg-white dark:bg-neutral-800",
                            "rounded-2xl shadow-elevation-5",
                            "border border-neutral-200 dark:border-neutral-700",
                            "overflow-hidden z-50",
                            "backdrop-blur-xl"
                          )}
                        >
                          {/* Header */}
                          <div className={cn(
                            "p-4 bg-gradient-to-r",
                            menu.color === 'secondary-innovate' 
                              ? "from-secondary-innovate-500 to-secondary-innovate-600"
                              : menu.color === 'accent'
                              ? "from-accent-500 to-accent-600"
                              : menu.color === 'secondary-learn'
                              ? "from-secondary-learn-500 to-secondary-learn-600"
                              : "from-primary-500 to-primary-600"
                          )}>
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center",
                                "bg-white/20 backdrop-blur-sm"
                              )}>
                                <Icon icon={IconComponent} size="sm" className="text-white" />
                              </div>
                              <div>
                                <p className="font-bold text-white">{menu.label}</p>
                                <p className="text-xs text-white/80">{menu.description}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="p-2 max-h-[400px] overflow-y-auto">
                            {/* View All Link */}
                            <Link
                              href={menu.href}
                              onClick={() => setOpenDropdown(null)}
                              className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl mb-2",
                                "bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20",
                                "hover:from-primary-100 hover:to-primary-200 dark:hover:from-primary-800/30 dark:hover:to-primary-700/30",
                                "transition-all duration-200",
                                "font-semibold text-primary-700 dark:text-primary-300",
                                "group"
                              )}
                            >
                              <Icon icon={IconComponent} size="sm" className="text-primary-600 dark:text-primary-400" />
                              <span>جميع {menu.label}</span>
                              <ChevronDown className="w-4 h-4 text-primary-600 dark:text-primary-400 rotate-[-90deg] group-hover:translate-x-[-4px] transition-transform" />
                            </Link>

                            {/* Children Items */}
                            <div className="space-y-1">
                              {menu.children.map((child) => {
                                const ChildIcon = child.icon;
                                const childIsActive = isActiveLink(child.href);
                                return (
                                  <Link
                                    key={child.href}
                                    href={child.href}
                                    onClick={() => setOpenDropdown(null)}
                                    className={cn(
                                      "flex items-start gap-3 px-4 py-3 rounded-xl",
                                      "transition-all duration-200",
                                      "group relative",
                                      childIsActive
                                        ? "bg-primary-50 dark:bg-primary-900/20"
                                        : "hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                                    )}
                                  >
                                    <div className={cn(
                                      "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                                      childIsActive
                                        ? "bg-primary-100 dark:bg-primary-900/40"
                                        : "bg-neutral-100 dark:bg-neutral-700 group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20"
                                    )}>
                                      <Icon 
                                        icon={ChildIcon} 
                                        size="sm" 
                                        className={childIsActive ? "text-primary-600 dark:text-primary-400" : "text-neutral-600 dark:text-neutral-400"} 
                                      />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className={cn(
                                          "font-medium text-sm",
                                          childIsActive
                                            ? "text-primary-700 dark:text-primary-300"
                                            : "text-neutral-700 dark:text-neutral-300"
                                        )}>
                                          {child.label}
                                        </span>
                                        {'badge' in child && child.badge && (
                                          <span className={cn(
                                            "px-2 py-0.5 text-xs font-bold rounded-full",
                                            child.badge === 'جديد' 
                                              ? "bg-secondary-learn-100 text-secondary-learn-700 dark:bg-secondary-learn-900/40 dark:text-secondary-learn-300"
                                              : "bg-secondary-innovate-100 text-secondary-innovate-700 dark:bg-secondary-innovate-900/40 dark:text-secondary-innovate-300"
                                          )}>
                                            {child.badge}
                                          </span>
                                        )}
                                        {'featured' in child && child.featured && (
                                          <Sparkles className="w-4 h-4 text-secondary-innovate-500" />
                                        )}
                                      </div>
                                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-1">
                                        {child.description}
                                      </p>
                                    </div>
                                  </Link>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="flex items-center gap-2.5">
                {isLoggedIn ? (
                  <>
                    {/* زر لوحة الإدارة */}
                    <Link
                      href="/admin/dashboard"
                      className={cn(
                        "h-[42px] px-4 py-2.5 rounded-xl",
                        "text-sm font-semibold whitespace-nowrap",
                        "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-700 dark:via-indigo-700 dark:to-blue-700",
                        "text-white",
                        "hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 dark:hover:from-purple-800 dark:hover:via-indigo-800 dark:hover:to-blue-800",
                        "shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50",
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95",
                        "flex items-center justify-center gap-2",
                        "relative group overflow-hidden",
                        pathname?.startsWith('/admin') && "ring-2 ring-purple-400 ring-offset-2"
                      )}
                    >
                      {/* تأثير لامع */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: 'linear',
                        }}
                      />
                      <Shield className="w-[18px] h-[18px] relative z-10" />
                      <span className="relative z-10">لوحة الإدارة</span>
                    </Link>
                    <UserMenu />
                  </>
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
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95",
                        "flex items-center justify-center gap-2"
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
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-105 active:scale-95",
                        "flex items-center justify-center gap-2"
                      )}
                    >
                      <UserPlus className="w-[18px] h-[18px]" />
                      <span>التسجيل</span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className={cn(
                "lg:hidden h-[44px] w-[44px] p-2.5",
                "text-neutral-700 dark:text-neutral-300",
                "hover:bg-neutral-100 dark:hover:bg-neutral-800",
                "rounded-xl transition-all duration-300 ease-in-out",
                "hover:scale-110 active:scale-95",
                "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                "flex items-center justify-center"
              )}
              aria-label={isMobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-[22px] h-[22px]" />
              ) : (
                <Menu className="w-[22px] h-[22px]" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
            >
              <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-4rem)] overflow-y-auto">
                {/* Main Navigation Items */}
                  {mainNavItems.map(({ href, label, icon: IconComponent }) => {
                  const isActive = isActiveLink(href);
                  return (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileMenu(false)}
                      className={cn(
                        "h-[48px] flex items-center gap-3 px-5 py-3 rounded-xl",
                        "text-sm font-semibold",
                        "text-neutral-700 dark:text-neutral-300",
                        "transition-all duration-300 ease-in-out",
                        "hover:scale-[1.02] active:scale-[0.98]",
                        isActive
                          ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-md"
                          : "hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm"
                      )}
                    >
                      <Icon icon={IconComponent} size="md" className="w-[20px] h-[20px]" />
                      <span>{label}</span>
                    </Link>
                  );
                })}

                {/* Dropdown Items in Mobile */}
                {Object.entries(navigationMenuItems).map(([key, menu]) => {
                  const isActive = isActiveLink(menu.href);
                  const isOpen = openDropdown === key;

                  return (
                    <div key={key}>
                      <button
                        onClick={() => setOpenDropdown(isOpen ? null : key)}
                        className={cn(
                          "h-[48px] w-full flex items-center justify-between gap-3 px-5 py-3 rounded-xl",
                          "text-sm font-semibold",
                          "text-neutral-700 dark:text-neutral-300",
                          "transition-all duration-300 ease-in-out",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          isActive
                            ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 shadow-md"
                            : "hover:bg-white dark:hover:bg-neutral-800 hover:shadow-sm"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <Icon icon={menu.icon} size="md" className="w-[20px] h-[20px]" />
                          <span>{menu.label}</span>
                        </div>
                        <ChevronDown className={cn("w-[18px] h-[18px] transition-transform duration-300", isOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="pr-8 space-y-1">
                              <Link
                                href={menu.href}
                                onClick={() => {
                                  setMobileMenu(false);
                                  setOpenDropdown(null);
                                }}
                                className="block px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg font-medium"
                              >
                                جميع {menu.label}
                              </Link>
                              {menu.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => {
                                    setMobileMenu(false);
                                    setOpenDropdown(null);
                                  }}
                                  className={cn(
                                    "block px-4 py-2 text-sm rounded-lg",
                                    isActiveLink(child.href)
                                      ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 font-medium"
                                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <div className="border-t border-neutral-200 dark:border-neutral-800 my-3 pt-3 space-y-2">
                  {isLoggedIn ? (
                    <>
                      {/* زر لوحة الإدارة للموبايل */}
                      <Link
                        href="/admin/dashboard"
                        onClick={() => setMobileMenu(false)}
                        className={cn(
                          "h-[50px] w-full px-5 py-3 rounded-xl font-semibold",
                          "bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 dark:from-purple-700 dark:via-indigo-700 dark:to-blue-700",
                          "text-white",
                          "hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 dark:hover:from-purple-800 dark:hover:via-indigo-800 dark:hover:to-blue-800",
                          "shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50",
                          "transition-all duration-300 ease-in-out",
                          "hover:scale-[1.02] active:scale-[0.98]",
                          "text-sm flex items-center justify-center gap-2.5",
                          "relative group overflow-hidden",
                          pathname?.startsWith('/admin') && "ring-2 ring-purple-400 ring-offset-2"
                        )}
                      >
                        {/* تأثير لامع */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          animate={{
                            x: ['-100%', '200%'],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 3,
                            ease: 'linear',
                          }}
                        />
                        <Shield className="w-[19px] h-[19px] relative z-10" />
                        <span className="relative z-10">لوحة الإدارة</span>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setMobileMenu(false)}
                        className="h-[50px] w-full px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-500 dark:to-primary-600 text-white rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 dark:hover:from-primary-600 dark:hover:to-primary-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] text-sm flex items-center justify-center gap-2.5"
                      >
                        <LogIn className="w-[19px] h-[19px]" />
                        <span>تسجيل الدخول</span>
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setMobileMenu(false)}
                        className="h-[50px] w-full px-5 py-3 border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 bg-white dark:bg-neutral-800 rounded-xl font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-[0.98] text-sm flex items-center justify-center gap-2.5"
                      >
                        <UserPlus className="w-[19px] h-[19px]" />
                        <span>إنشاء حساب جديد</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer for fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default EnhancedNavbar;
