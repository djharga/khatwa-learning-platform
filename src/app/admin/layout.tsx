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
import PageBackground from '@/components/ui/PageBackground';

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
      message: 'انتهى برنامج المراجعين الداخليين بنجاح',
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
    <PageBackground variant="admin" pattern>
      <div className="min-h-screen flex flex-col">
        {/* Top bar */}
        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 dark:border-neutral-700/50 sticky top-0 z-30">
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

      {/* Horizontal Navigation Bar - Beautiful Tabs */}
      <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-neutral-700/50 sticky top-16 z-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8">
          <nav className="flex items-center justify-center overflow-x-auto py-3 scrollbar-hide">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 bg-gray-100/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-1.5 sm:p-2 shadow-sm border border-gray-200/60 dark:border-neutral-700/60 min-w-max">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl
                      font-medium text-[13px] sm:text-sm whitespace-nowrap
                      transition-all duration-200 ease-out
                      ${isActive
                        ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm scale-[1.02]'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-neutral-700/50'
                      }
                    `}
                  >
                    {/* Active background with gradient */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-indigo-50/50 dark:from-blue-950/30 dark:via-purple-950/20 dark:to-indigo-950/30 rounded-xl"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                        style={{ borderRadius: '0.75rem' }}
                      />
                    )}
                    
                    {/* Icon with smooth color transition */}
                    <Icon 
                      className={`
                        w-4 h-4 sm:w-[18px] sm:h-[18px] transition-all duration-200 relative z-10 flex-shrink-0
                        ${isActive 
                          ? 'text-blue-600 dark:text-blue-400 scale-110' 
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-blue-500 dark:group-hover:text-blue-400'
                        }
                      `} 
                    />
                    
                    {/* Label */}
                    <span className="relative z-10 transition-colors duration-200">{item.name}</span>
                    
                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '60%' }}
                        transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Page content */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
      </div>
    </PageBackground>
  );
}
