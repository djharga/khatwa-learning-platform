'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Props for Sidebar component specifying user role for navigation items */
interface SidebarProps {
  role?: 'student' | 'instructor' | 'admin';
}

/** Role-based sidebar navigation component displaying different menu items for students, instructors, and admins. Features active link highlighting and emoji icons. */
const Sidebar: React.FC<SidebarProps> = ({ role = 'student' }) => {
  const pathname = usePathname();

  // Navigation items grouped by user role (student, instructor, admin)
  const navigationItems = {
    student: [
      { name: 'لوحة التحكم', href: '/dashboard/student', icon: '📊' },
      { name: 'الدورات', href: '/dashboard/student/courses', icon: '📚' },
      { name: 'الملف الشخصي', href: '/dashboard/student/profile', icon: '👤' },
      { name: 'الاختبارات', href: '/dashboard/student/exam', icon: '📝' },
    ],
    instructor: [
      { name: 'لوحة التحكم', href: '/dashboard/instructor', icon: '📊' },
      { name: 'دوراتي', href: '/dashboard/instructor/courses', icon: '📚' },
      { name: 'الطلاب', href: '/dashboard/instructor/students', icon: '👥' },
      {
        name: 'الملف الشخصي',
        href: '/dashboard/instructor/profile',
        icon: '👤',
      },
    ],
    admin: [
      { name: 'لوحة التحكم', href: '/admin/dashboard', icon: '📊' },
      { name: 'المستخدمين', href: '/admin/users', icon: '👥' },
      { name: 'الدورات', href: '/admin/courses', icon: '📚' },
      { name: 'التقارير', href: '/admin/reports', icon: '📈' },
    ],
  };

  // Select navigation items based on current user role
  const items = navigationItems[role];

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-5">
          <Link
            href="/"
            className="flex items-center p-2 text-xl font-semibold"
          >
            <span className="ml-3">خطوة</span>
          </Link>
        </div>
        <nav className="space-y-2">
          {items.map((item) => {
            // Highlight active link based on current pathname
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center p-2 rounded-lg ${
                  isActive
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200'
                    : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                }`}
              >
                <span className="ml-3">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
