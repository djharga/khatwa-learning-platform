'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // إغلاق القائمة عند النقر خارجها
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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

  return (
    <div className="relative" ref={menuRef}>
      {/* زر فتح القائمة */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
          أ
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm font-medium text-white">أحمد محمد</p>
          <p className="text-xs text-gray-400">طالب</p>
        </div>
      </button>

      {/* القائمة المنسدلة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  أ
                </div>
                <div>
                  <p className="font-semibold text-white">أحمد محمد</p>
                  <p className="text-sm text-blue-100">ahmad@example.com</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600" />
                    <span className="flex-1 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {/* Logout */}
            <div className="p-2">
              <button
                onClick={() => {
                  // معالجة تسجيل الخروج
                  console.log('تسجيل الخروج');
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors group"
              >
                <LogOut className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-red-600" />
                <span className="text-gray-700 dark:text-gray-300 group-hover:text-red-600">
                  تسجيل الخروج
                </span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
