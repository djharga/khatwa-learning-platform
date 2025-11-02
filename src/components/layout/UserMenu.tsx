'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Settings,
  Award,
  BookOpen,
  LayoutDashboard,
  LogOut,
  Bell,
  HelpCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * UserMenu Component - محسّن للـ Accessibility
 * يدعم keyboard navigation و ARIA labels و focus management
 */

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuItemsRef = useRef<(HTMLAnchorElement | HTMLButtonElement)[]>([]);
  const pathname = usePathname();

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Keyboard navigation - دعم التنقل بالكيبورد
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const items = menuItemsRef.current.filter(el => el !== null);
        const currentIndex = focusedIndex;
        
        if (e.key === 'ArrowDown') {
          const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
          setFocusedIndex(nextIndex);
          items[nextIndex]?.focus();
        } else {
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
          setFocusedIndex(prevIndex);
          items[prevIndex]?.focus();
        }
      }

      if (e.key === 'Home') {
        e.preventDefault();
        setFocusedIndex(0);
        menuItemsRef.current[0]?.focus();
      }

      if (e.key === 'End') {
        e.preventDefault();
        const lastIndex = menuItemsRef.current.length - 1;
        setFocusedIndex(lastIndex);
        menuItemsRef.current[lastIndex]?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, focusedIndex]);

  // Reset focus index when menu opens/closes
  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  // Focus trap - منع focus من الخروج من القائمة
  useEffect(() => {
    if (!isOpen) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const items = menuItemsRef.current.filter(el => el !== null);
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem?.focus();
        setFocusedIndex(items.length - 1);
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem?.focus();
        setFocusedIndex(0);
      }
    };

    document.addEventListener('keydown', handleFocusTrap);
    return () => document.removeEventListener('keydown', handleFocusTrap);
  }, [isOpen]);

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const menuItems = [
    { href: '/student/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { href: '/student/courses', label: 'دوراتي', icon: BookOpen },
    { href: '/student/certificates', label: 'شهاداتي', icon: Award },
    { href: '/notifications', label: 'الإشعارات', icon: Bell, badge: 3 },
    { href: '/student/profile', label: 'الملف الشخصي', icon: User },
    { href: '/student/settings', label: 'الإعدادات', icon: Settings },
    { href: '/student/support', label: 'المساعدة', icon: HelpCircle },
  ];

  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(href);

  return (
    <div className="relative" ref={menuRef}>
      {/* زر فتح القائمة - محسّن للـ Accessibility */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
          }
          if (e.key === 'ArrowDown' && !isOpen) {
            e.preventDefault();
            setIsOpen(true);
            setTimeout(() => {
              menuItemsRef.current[0]?.focus();
              setFocusedIndex(0);
            }, 100);
          }
        }}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg",
          "hover:bg-neutral-800 dark:hover:bg-neutral-700",
          "transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
          isOpen && "bg-neutral-800 dark:bg-neutral-700"
        )}
        aria-label="قائمة المستخدم"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="user-menu"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold">
          أ
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-white dark:text-neutral-100">أحمد محمد</p>
          <p className="text-xs text-neutral-400 dark:text-neutral-400">طالب</p>
        </div>
      </button>

      {/* القائمة المنسدلة - محسّنة للـ Accessibility */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="user-menu"
            role="menu"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute left-0 mt-2 w-72",
              "bg-white dark:bg-neutral-800",
              "rounded-xl shadow-elevation-5",
              "border border-neutral-200 dark:border-neutral-700",
              "overflow-hidden z-50"
            )}
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary-500 to-accent-500">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary-600 font-bold text-lg">
                  أ
                </div>
                <div>
                  <p className="font-semibold text-white">أحمد محمد</p>
                  <p className="text-sm text-primary-100">ahmad@example.com</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2" role="none">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = isActiveLink(item.href);
                return (
                  <Link
                    key={item.href}
                    ref={(el) => {
                      if (el) menuItemsRef.current[index] = el;
                    }}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    onFocus={() => setFocusedIndex(index)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                      "transition-all duration-200",
                      "focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
                      isActive
                        ? "bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                        : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                    )}
                    role="menuitem"
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={item.label}
                  >
                    <Icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive
                        ? "text-primary-600 dark:text-primary-400"
                        : "text-neutral-600 dark:text-neutral-400"
                    )} />
                    <span className="flex-1 font-medium">{item.label}</span>
                    {item.badge && (
                      <span 
                        className="px-2 py-0.5 text-xs font-bold bg-danger-500 text-white rounded-full"
                        aria-label={`${item.badge} إشعارات جديدة`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-neutral-200 dark:border-neutral-700 my-2" role="separator" />

            {/* Logout */}
            <div className="p-2" role="none">
              <button
                ref={(el) => {
                  if (el) menuItemsRef.current[menuItems.length] = el;
                }}
                onClick={() => {
                  console.log('تسجيل الخروج');
                  setIsOpen(false);
                }}
                onFocus={() => setFocusedIndex(menuItems.length)}
                className={cn(
                  "flex items-center gap-3 w-full px-3 py-2.5 rounded-lg",
                  "transition-all duration-200",
                  "focus-visible:outline-2 focus-visible:outline-danger-500 focus-visible:outline-offset-2",
                  "text-neutral-700 dark:text-neutral-300",
                  "hover:bg-danger-50 dark:hover:bg-danger-900/20",
                  "hover:text-danger-600 dark:hover:text-danger-400"
                )}
                role="menuitem"
                aria-label="تسجيل الخروج"
              >
                <LogOut className="w-5 h-5 text-current" />
                <span className="font-medium">تسجيل الخروج</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
