'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchBar from '../SearchBar';
import ThemeCustomizer from '../ThemeCustomizer';
import NotificationCenter from '../NotificationCenter';
import Icon from '../ui/icons/IconSystem';
import {
  getPublicNavbarItems,
  NavigationItem,
  NavigationDropdownItem
} from '@/lib/navigation';

// Type Guards
const hasChildren = (item: NavigationItem | NavigationDropdownItem): item is NavigationItem & { children: NavigationItem[] } => {
  return 'children' in item && Array.isArray(item.children);
};

const hasHref = (item: NavigationItem): item is NavigationItem & { href: string } => {
  return 'href' in item && typeof item.href === 'string';
};

/**
 * Logo area with animated scaling based on scroll state. Displays platform name and tagline with gradient icon.
 */
interface LogoAreaProps {
  isScrolled: boolean;
}

const LogoArea: React.FC<LogoAreaProps> = ({ isScrolled }) => (
  <motion.div
    className="flex items-center gap-3 group"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
    animate={{
      scale: isScrolled ? 0.95 : 1, // Slight scale reduction when scrolled
    }}
  >
    <Link href="/" className="flex items-center gap-3">
      <motion.div
        className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg group-hover:shadow-xl transition-all duration-300 rounded-xl"
        whileHover={{ scale: 1.05, rotate: 2 }}
        animate={{
          scale: isScrolled ? 0.9 : 1, // Smaller logo when scrolled
        }}
      >
        <span className="text-xl sm:text-2xl">🎓</span>
      </motion.div>
      <motion.div
        className="hidden sm:block"
        animate={{
          opacity: isScrolled ? 0.8 : 1,
        }}
      >
        <span className="block text-lg sm:text-xl font-bold text-gray-900 dark:text-white leading-tight">
          خطى التعليمية
        </span>
        <span className="block text-xs text-gray-600 dark:text-gray-300 -mt-1">
          منصة التعلم المهني
        </span>
      </motion.div>
    </Link>
  </motion.div>
);

/**
 * Reusable dropdown component for navigation items with children. Supports both desktop and mobile variants with different styling and animations.
 */
interface NavDropdownProps {
  item: NavigationItem & { children: NavigationItem[] };
  activeDropdown: string | null;
  onToggleDropdown: (id: string | null) => void;
  onCloseDropdown: () => void;
  dropdownRef: (el: HTMLDivElement | null, id: string) => void;
  variant: 'desktop' | 'mobile';
}

const NavDropdown: React.FC<NavDropdownProps> = ({
  item,
  activeDropdown,
  onToggleDropdown,
  onCloseDropdown,
  dropdownRef,
  variant,
}) => {
  if (variant === 'desktop') {
    return (
      <>
        <motion.button
          onClick={() => onToggleDropdown(activeDropdown === item.id ? null : item.id)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-sm transition-all duration-300 min-h-12 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
          aria-expanded={activeDropdown === item.id}
          aria-controls={`dropdown-${item.id}`}
          aria-haspopup="menu"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon name={item.icon as any} size="sm" />
          {item.label}
          <motion.div
            animate={{
              rotate: activeDropdown === item.id ? 180 : 0,
              color: activeDropdown === item.id ? '#2563eb' : '#6b7280',
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon name="chevronDown" size="sm" />
          </motion.div>
        </motion.button>
        <AnimatePresence>
          {activeDropdown === item.id && (
            <motion.div
              className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 overflow-hidden dark:bg-gray-800 dark:border-gray-700"
              id={`dropdown-${item.id}`}
              role="menu"
              ref={(el) => dropdownRef(el, item.id)}
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-3">
                {item.children.map((link: NavigationItem) => (
                  <motion.div
                    key={hasHref(link) ? link.href : link.id}
                    whileHover={{ scale: 1.02, x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {hasHref(link) && (
                      <Link
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 hover:shadow-sm hover:shadow-blue-500/10"
                        onClick={onCloseDropdown}
                        aria-label={`انتقل إلى ${link.label}`}
                        role="menuitem"
                        tabIndex={0}
                      >
                        <Icon name={link.icon as any} size="sm" />
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
        <button
          onClick={() => onToggleDropdown(activeDropdown === item.id ? null : item.id)}
          className="flex items-center justify-between w-full p-4 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:shadow-lg hover:shadow-blue-500/25 font-medium transition-all duration-300 min-h-11"
        >
          <div className="flex items-center gap-3">
            <Icon name={item.icon as any} size="sm" />
            <span>{item.label}</span>
          </div>
          <Icon
            name="chevronDown"
            size="sm"
            className={`transition-all duration-300 ${
              activeDropdown === item.id ? 'rotate-180 text-blue-600' : ''
            }`}
          />
        </button>
        <AnimatePresence>
          {activeDropdown === item.id && (
            <motion.div
              className="bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-800"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {item.children.map((link: NavigationItem) =>
                hasHref(link) ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-6 py-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 min-h-11"
                    onClick={onCloseDropdown}
                    aria-label={`انتقل إلى ${link.label}`}
                    role="menuitem"
                    tabIndex={0}
                  >
                    <Icon name={link.icon as any} size="sm" />
                    {link.label}
                  </Link>
                ) : null
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return null;
};

/**
 * Desktop navigation menu with dropdown support. Renders different number of items based on breakpoint (3 for medium, 4 for large screens).
 */
interface DesktopNavProps {
  navItems: NavigationItem[];
  activeDropdown: string | null;
  onToggleDropdown: (id: string | null) => void;
  onCloseDropdown: () => void;
  dropdownRefs: React.MutableRefObject<Map<string, HTMLDivElement>>;
  breakpoint: 'medium' | 'large';
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  activeDropdown,
  onToggleDropdown,
  onCloseDropdown,
  dropdownRefs,
  breakpoint,
}) => {
  const registerDropdownRef = (el: HTMLDivElement | null, id: string) => {
    if (el) dropdownRefs.current.set(id, el);
    else dropdownRefs.current.delete(id);
  };

  const itemsToShow = navItems.slice(0, breakpoint === 'medium' ? 3 : 4);

  return (
    <div className={`hidden ${breakpoint === 'medium' ? 'lg:flex xl:hidden' : 'xl:flex'} items-center gap-1`}>
      {itemsToShow.map((item) => (
        <div key={item.id} className="relative group">
          {hasChildren(item) ? (
            <NavDropdown
              item={item}
              activeDropdown={activeDropdown}
              onToggleDropdown={onToggleDropdown}
              onCloseDropdown={onCloseDropdown}
              dropdownRef={registerDropdownRef}
              variant="desktop"
            />
          ) : hasHref(item) ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium text-sm transition-all duration-300 min-h-12 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-900/20"
                aria-label={`انتقل إلى صفحة ${item.label}`}
                tabIndex={0}
              >
                <Icon name={item.icon as any} size="sm" />
                {item.label}
              </Link>
            </motion.div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

/**
 * User menu dropdown with profile information, progress indicator, and navigation links. Includes avatar with fallback icon, user stats, and quick access links.
 */
interface UserMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  userMenuRef: React.RefObject<HTMLDivElement | null>;
  userData: {
    name: string;
    email: string;
    avatar: string;
    progress: number;
    level: string;
    completedCourses: number;
    totalCourses: number;
  };
}

const UserMenu: React.FC<UserMenuProps> = ({
  isOpen,
  onToggle,
  onClose,
  userMenuRef,
  userData,
}) => (
  <div ref={userMenuRef} className="relative">
    <motion.button
      onClick={onToggle}
      className="flex items-center gap-2 p-2 sm:p-3 rounded-xl hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:shadow-blue-400/25"
      aria-expanded={isOpen}
      aria-controls="user-menu"
      aria-haspopup="menu"
      aria-label="قائمة المستخدم"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden shadow-lg"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={userData.avatar}
          alt={userData.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
          <Icon name="user" size="sm" color="white" />
        </div>
      </motion.div>
      <motion.div
        animate={{
          rotate: isOpen ? 180 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <Icon name="chevronDown" size="sm" color="gray" />
      </motion.div>
    </motion.button>

    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute left-2 mt-3 w-72 max-w-[calc(100vw-2rem)] bg-white border border-gray-200 rounded-2xl shadow-2xl z-40 overflow-hidden dark:bg-gray-800 dark:border-gray-700"
          id="user-menu"
          role="menu"
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={userData.avatar}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                  <Icon name="user" size="md" color="white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {userData.name}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {userData.email}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full dark:bg-blue-900/20 dark:text-blue-400">
                    {userData.level}
                  </span>
                  <span className="text-xs text-gray-500">
                    {userData.completedCourses}/{userData.totalCourses} دورة
                  </span>
                </div>
              </div>
            </div>
            {/* Progress Indicator */}
            <div className="mt-3">
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>التقدم العام</span>
                <span>{userData.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${userData.progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          </div>
          <div className="p-2">
            <Link
              href="/student/profile"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:shadow-blue-400/25"
              onClick={onClose}
            >
              <Icon name="user" size="sm" />
              الملف الشخصي
            </Link>
            <Link
              href="/student/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:shadow-blue-400/25"
              onClick={onClose}
            >
              <Icon name="dashboard" size="sm" />
              لوحة التحكم
            </Link>
            <Link
              href="/student/settings"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:shadow-blue-400/25"
              onClick={onClose}
            >
              <Icon name="settings" size="sm" />
              الإعدادات
            </Link>
            {/* Quick Notification Links */}
            <div className="border-t border-gray-100 dark:border-gray-700 my-2 pt-2">
              <Link
                href="/notifications"
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:shadow-blue-400/25"
                onClick={onClose}
              >
                <Icon name="notifications" size="sm" />
                الإشعارات
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link
                href="/student/certificates"
                className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:shadow-blue-400/25"
                onClick={onClose}
              >
                <Icon name="award" size="sm" />
                شهاداتي
              </Link>
            </div>
            <hr className="my-2 border-gray-100 dark:border-gray-700" />
            <Link
              href="/login"
              className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-500/25 rounded-lg transition-all duration-300 min-h-12 dark:hover:bg-blue-900/20 dark:hover:text-blue-400 dark:hover:shadow-blue-400/25"
              onClick={onClose}
            >
              <Icon name="logout" size="sm" />
              تسجيل الخروج
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/**
 * Mobile sidebar navigation with slide-in animation. Includes search bar, navigation items with accordion dropdowns, and authentication buttons.
 */
interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavigationItem[];
  activeDropdown: string | null;
  onToggleDropdown: (id: string | null) => void;
  onSearchSubmit: (query: string, filters: any) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  navItems,
  activeDropdown,
  onToggleDropdown,
  onSearchSubmit,
}) => {
  const registerDropdownRef = (el: HTMLDivElement | null, id: string) => {
    // Not used in mobile, but kept for consistency
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-40 lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto dark:bg-gray-900"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            {/* Mobile Header */}
            <div className="p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <span className="text-xl">🎓</span>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      خطى التعليمية
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      منصة التعلم المهني
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl transition-all duration-300 min-w-11 min-h-11"
                >
                  <Icon name="close" size="md" />
                </button>
              </div>
            </div>

            {/* Mobile Search */}
            <div className="p-4 border-b border-gray-100 dark:border-gray-800">
              <SearchBar onSearch={onSearchSubmit} />
            </div>

            {/* Mobile Navigation */}
            <div className="p-4 space-y-2">
              {navItems.map((item) =>
                hasChildren(item) ? (
                  <NavDropdown
                    key={item.id}
                    item={item}
                    activeDropdown={activeDropdown}
                    onToggleDropdown={onToggleDropdown}
                    onCloseDropdown={onClose}
                    dropdownRef={registerDropdownRef}
                    variant="mobile"
                  />
                ) : hasHref(item) ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="flex items-center gap-3 p-4 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-lg hover:shadow-blue-500/25 font-medium transition-all duration-300 min-h-11"
                    onClick={onClose}
                  >
                    <Icon name={item.icon as any} size="sm" />
                    {item.label}
                  </Link>
                ) : null
              )}
            </div>

            {/* Mobile User Actions */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 space-y-3">
              <Link href="/login" onClick={onClose}>
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold transition-all duration-300 min-h-11 shadow-lg hover:shadow-xl">
                  تسجيل الدخول
                </button>
              </Link>
              <Link href="/register" onClick={onClose}>
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 py-3 rounded-xl font-semibold transition-all duration-300 min-h-11">
                  إنشاء حساب جديد
                </button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * Main navigation bar component with responsive design, scroll effects, and multiple interactive elements. Features:
 * - Animated logo with scroll-based scaling
 * - Desktop navigation with dropdowns (responsive: 3 items on lg, 4 on xl)
 * - Mobile sidebar with accordion navigation
 * - User menu with profile info and progress tracking
 * - Search bar integration
 * - Theme customizer and notification center toggles
 * - Scroll progress tracking and dynamic styling
 * - Click-outside detection and keyboard navigation
 * - Body overflow control for modals
 */
const NavbarComponent = () => {
  // Controls mobile sidebar visibility
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  // Tracks which dropdown menu is currently open (by item id)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  // Controls user menu dropdown visibility
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  // Controls theme customizer modal visibility
  const [isThemeCustomizerOpen, setThemeCustomizerOpen] = useState(false);
  // Controls notification center modal visibility
  const [isNotificationCenterOpen, setNotificationCenterOpen] = useState(false);
  // Tracks if page has been scrolled past threshold (20px)
  const [isScrolled, setIsScrolled] = useState(false);
  // Scroll progress value (0-1) for dynamic effects
  const [scrollProgress, setScrollProgress] = useState(0);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Mock user data for enhanced user menu
  const userData = {
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    avatar: '/images/avatars/user.jpg', // Real user image
    progress: 75, // Progress percentage
    level: 'متوسط',
    completedCourses: 12,
    totalCourses: 16,
  };

  // استخدام نظام الروابط الجديد مع معالجة أفضل للأخطاء
  const navItems = getPublicNavbarItems();

  // Tracks scroll position to update navbar styling and calculate scroll progress for dynamic effects
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      // Calculate scroll progress for dynamic effects
      const scrollPercent = Math.min(window.scrollY / 200, 1);
      setScrollProgress(scrollPercent);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handles click-outside detection to close dropdowns and user menu when clicking outside their boundaries
  useEffect(() => {
    const closeOnClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;

      // إغلاق user menu إذا النقر خارجها
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }

      // إغلاق dropdowns إذا النقر خارج أي منها
      let clickedInsideDropdown = false;
      dropdownRefs.current.forEach((ref) => {
        if (ref && ref.contains(target)) {
          clickedInsideDropdown = true;
        }
      });

      if (!clickedInsideDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', closeOnClickOutside);
    return () => document.removeEventListener('mousedown', closeOnClickOutside);
  }, []);

  // Manages keyboard focus for dropdown menus - focuses first link when dropdown opens
  useEffect(() => {
    if (activeDropdown) {
      const menu = dropdownRefs.current.get(activeDropdown);
      if (menu) {
        const firstLink = menu.querySelector('a') as HTMLAnchorElement;
        firstLink?.focus();
      }
    }
  }, [activeDropdown]);

  // Manages keyboard focus for user menu - focuses first link when menu opens
  useEffect(() => {
    if (isUserMenuOpen && userMenuRef.current) {
      const firstLink = userMenuRef.current.querySelector('a') as HTMLAnchorElement;
      firstLink?.focus();
    }
  }, [isUserMenuOpen]);

  // Prevents body scroll when mobile menu is open to avoid background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Registers or unregisters dropdown DOM elements in the ref map for click-outside detection and focus management
  const registerDropdownRef = (el: HTMLDivElement | null, id: string) => {
    if (el) dropdownRefs.current.set(id, el);
    else dropdownRefs.current.delete(id);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200/60 shadow-2xl dark:bg-gray-900/95 dark:border-gray-700/60'
            : 'bg-white/90 backdrop-blur-md border-b border-gray-100/40 dark:bg-gray-900/90 dark:border-gray-800/40'
        }`}
        initial={{ y: -100 }}
        animate={{
          y: 0,
          height: isScrolled ? 56 : 64, // Dynamic height reduction
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          boxShadow: isScrolled
            ? `0 10px 30px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.1})`
            : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-full">
          {/* Logo area with scroll-based animations */}
          <LogoArea isScrolled={isScrolled} />

          {/* Desktop search bar (hidden on mobile) */}
          <div className="hidden lg:block w-72 xl:w-80 flex-shrink-0 mx-8">
            <SearchBar
              onSearch={(query, filters) => {
                // TODO: Implement search handler - integrate with search results page or modal
              }}
            />
          </div>

          {/* Desktop navigation menus (responsive breakpoints) */}
          <DesktopNav
            navItems={navItems}
            activeDropdown={activeDropdown}
            onToggleDropdown={setActiveDropdown}
            onCloseDropdown={() => setActiveDropdown(null)}
            dropdownRefs={dropdownRefs}
            breakpoint="medium"
          />
          <DesktopNav
            navItems={navItems}
            activeDropdown={activeDropdown}
            onToggleDropdown={setActiveDropdown}
            onCloseDropdown={() => setActiveDropdown(null)}
            dropdownRefs={dropdownRefs}
            breakpoint="large"
          />

          {/* User action buttons: search (mobile), notifications, theme, user menu, mobile toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button for Mobile */}
            <motion.button
              className="md:hidden p-2 sm:p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl transition-all duration-300 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:shadow-blue-400/25"
              aria-label="البحث"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="search" size="sm" />
            </motion.button>

            {/* Notifications */}
            <motion.button
              onClick={() =>
                setNotificationCenterOpen(!isNotificationCenterOpen)
              }
              className="relative p-2 sm:p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl transition-all duration-300 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:shadow-blue-400/25"
              aria-label="الإشعارات"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="notifications" size="sm" />
              <motion.span
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-bold"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                3
              </motion.span>
            </motion.button>

            {/* Theme Customizer */}
            <motion.button
              onClick={() => setThemeCustomizerOpen(true)}
              className="p-2 sm:p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl transition-all duration-300 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:shadow-blue-400/25"
              aria-label="تخصيص المظهر"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="theme" size="sm" />
            </motion.button>

            <UserMenu
              isOpen={isUserMenuOpen}
              onToggle={() => setUserMenuOpen(!isUserMenuOpen)}
              onClose={() => setUserMenuOpen(false)}
              userMenuRef={userMenuRef}
              userData={userData}
            />

            {/* Mobile Menu Toggle */}
            <motion.button
              onClick={() => setMobileMenu(!isMobileMenuOpen)}
              className="xl:hidden p-2 sm:p-3 text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg hover:shadow-blue-500/25 rounded-xl transition-all duration-300 dark:text-gray-400 dark:hover:text-blue-400 dark:hover:bg-blue-900/20 dark:hover:shadow-blue-400/25"
              aria-label="القائمة"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{
                  rotate: isMobileMenuOpen ? 180 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <Icon name={isMobileMenuOpen ? 'close' : 'menu'} size="sm" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile sidebar with backdrop and slide-in animation */}
      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenu(false)}
        navItems={navItems}
        activeDropdown={activeDropdown}
        onToggleDropdown={setActiveDropdown}
        onSearchSubmit={(query, filters) => {
          // TODO: Implement mobile search handler - integrate with search results page or modal
        }}
      />

      {/* Theme customizer and notification center modals */}
      <ThemeCustomizer
        isOpen={isThemeCustomizerOpen}
        onClose={() => setThemeCustomizerOpen(false)}
      />
      <NotificationCenter
        isOpen={isNotificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
      />
    </>
  );
};

export default NavbarComponent;
