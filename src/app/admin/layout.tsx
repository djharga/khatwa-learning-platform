'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  Bell,
  Search,
  User,
  LogOut,
  ChevronDown,
  GraduationCap,
  Calendar,
  TrendingUp,
  Shield,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import FlyonMenu from '@/components/ui/FlyonMenu';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const navigationItems = [
  {
    name: 'لوحة التحكم',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'نظرة عامة على النظام',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    name: 'إدارة البرامج',
    href: '/admin/programs',
    icon: GraduationCap,
    description: 'البرامج التدريبية والمشاركين',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    name: 'إدارة المستخدمين',
    href: '/admin/users',
    icon: Users,
    description: 'المستخدمين والحسابات',
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    name: 'إدارة الدورات',
    href: '/admin/courses',
    icon: BookOpen,
    description: 'الدورات والمحتوى',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  },
  {
    name: 'إدارة المحتوى',
    href: '/admin/content',
    icon: FileText,
    description: 'الملفات والفيديوهات',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100'
  },
  {
    name: 'التقارير',
    href: '/admin/reports',
    icon: BarChart3,
    description: 'الإحصائيات والتقارير',
    color: 'text-red-600',
    bgColor: 'bg-red-100'
  },
  {
    name: 'التحكم العام',
    href: '/admin/controls',
    icon: Settings,
    description: 'الإعدادات والتحكم',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100'
  }
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const notifications = [
    {
      id: 1,
      title: 'مستخدم جديد مسجل',
      message: 'أحمد محمد انضم للمنصة',
      time: 'منذ 5 دقائق',
      unread: true
    },
    {
      id: 2,
      title: 'دورة مكتملة',
      message: 'انتهى برنامج زمالة المراجعين بنجاح',
      time: 'منذ 1 ساعة',
      unread: true
    },
    {
      id: 3,
      title: 'تحديث نظام',
      message: 'تم تحديث النظام بنجاح',
      time: 'منذ 2 ساعات',
      unread: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">خطى</h1>
                <p className="text-xs text-gray-500">لوحة الإدارة</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2 text-gray-400 hover:text-gray-600 relative"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => n.unread).length}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                  >
                    <div className="p-4 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900">الإشعارات</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                          <div className="flex items-start gap-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? 'bg-blue-500' : 'bg-gray-300'}`}></div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                              <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User menu */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                أ
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-700">مدير النظام</span>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Navigation Bar - FlyonUI Menu */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex justify-center">
            <FlyonMenu
              items={navigationItems.map((item) => ({
                href: item.href,
                label: item.name,
                icon: item.icon,
                status: pathname === item.href ? 'active' : undefined,
              }))}
              orientation="horizontal"
              className="bg-base-200 rounded-2xl p-2"
              autoActive={true}
            />
          </nav>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 p-6">
        <div className="max-w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
