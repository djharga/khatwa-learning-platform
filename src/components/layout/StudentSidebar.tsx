'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import { 
  LayoutDashboard, 
  BookOpen, 
  TrendingUp, 
  Award,
  Edit,
  Folder,
  MessageCircle,
  Headphones,
  Calculator,
  Image,
  Bell,
  PieChart,
  User,
  Settings,
  ChevronDown,
  ChevronUp,
  X,
  Menu,
  Shield,
  Crown,
  RefreshCw,
  Package,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { linkVariants, buttonVariants } from '@/lib/variants';
import { cn } from '@/lib/utils';

interface SidebarLink {
  href: string;
  label: string;
  icon: any;
  badge?: number;
}

interface SidebarGroup {
  title: string;
  links: SidebarLink[];
}

export default function StudentSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['الرئيسية', 'التعليم']);
  const { hasSubscription } = useSubscription();

  const sidebarGroups: SidebarGroup[] = [
    {
      title: 'الرئيسية',
      links: [
        { href: '/student', label: 'لوحة التحكم', icon: LayoutDashboard },
        { href: '/student/courses', label: 'دوراتي', icon: BookOpen },
        { href: '/student/progress', label: 'تقدمي', icon: TrendingUp },
      ],
    },
    {
      title: 'التعليم',
      links: [
        { href: '/courses', label: 'الكورسات', icon: BookOpen },
        { href: '/cia', label: 'زمالة CIA', icon: Crown },
        { href: '/review', label: 'المراجعة', icon: RefreshCw },
        { href: '/student/exam', label: 'الامتحانات', icon: Edit },
        { href: '/student/certificates', label: 'شهاداتي', icon: Award },
        { href: '/student/file-manager', label: 'ملفاتي', icon: Folder },
        { href: '/student/course-files', label: 'ملفات الدورات', icon: Folder },
        { href: '/student/accounting-simulation', label: 'محاكاة المحاسبة', icon: Calculator },
      ],
    },
    {
      title: 'الخدمات',
      links: [
        { href: '/packages-and-consulting', label: 'الباقات', icon: Package },
        ...(hasSubscription ? [{ href: '/student/consulting', label: 'الاستشارات', icon: MessageCircle }] : []),
        { href: '/student/support', label: 'الدعم الفني', icon: Headphones },
      ],
    },
    {
      title: 'الأدوات',
      links: [
        { href: '/student/storage-calculator', label: 'حاسبة التخزين', icon: Calculator },
        { href: '/student/gallery', label: 'معرض الصور', icon: Image },
      ],
    },
    {
      title: 'الحساب',
      links: [
        { href: '/notifications', label: 'الإشعارات', icon: Bell, badge: 3 },
        { href: '/student/reports', label: 'التقارير', icon: PieChart },
        { href: '/student/profile', label: 'الملف الشخصي', icon: User },
        { href: '/student/settings', label: 'الإعدادات', icon: Settings },
        { href: '/student/inbox', label: 'صندوق الوارد', icon: MessageCircle },
      ],
    },
  ];

/**
 * Toggle the expansion of a sidebar group by its title.
 * If the group is already expanded, it will be collapsed.
 * If the group is collapsed, it will be expanded.
 * @param {string} title - The title of the group to toggle.
 */
  const toggleGroup = (title: string) => {
    setExpandedGroups(prev =>
      prev.includes(title)
        ? prev.filter(g => g !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* زر القائمة للموبايل */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 right-4 z-40 lg:hidden p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="فتح القائمة"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay للموبايل */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '100%',
        }}
        className={`
          fixed top-16 right-0 h-[calc(100vh-4rem)] w-72 bg-white dark:bg-gray-900 
          border-l border-gray-200 dark:border-gray-800 shadow-xl z-50
          lg:translate-x-0 lg:h-screen overflow-y-auto
          transition-transform duration-300 ease-in-out
        `}
      >
        {/* Header للموبايل */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">القائمة</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            aria-label="إغلاق القائمة"
            role="button"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Groups */}
        <nav className="p-4 space-y-2">
          {sidebarGroups.map((group) => (
            <div key={group.title} className="mb-4">
              {/* Group Header */}
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                aria-label={`${expandedGroups.includes(group.title) ? 'إغلاق' : 'فتح'} مجموعة ${group.title}`}
                aria-expanded={expandedGroups.includes(group.title)}
                aria-controls={`group-${group.title}`}
                role="button"
              >
                <span>{group.title}</span>
                {expandedGroups.includes(group.title) ? (
                  <ChevronUp className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              {/* Group Links */}
              <AnimatePresence>
                {expandedGroups.includes(group.title) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                    id={`group-${group.title}`}
                    role="region"
                    aria-label={`روابط ${group.title}`}
                  >
                    <div className="space-y-1 mt-1">
                      {group.links.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.href);

                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`
                              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                              ${active
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                              }
                            `}
                            aria-label={`انتقل إلى ${link.label}`}
                            aria-current={active ? 'page' : undefined}
                            role="menuitem"
                          >
                            <Icon className={`w-5 h-5 ${active ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                            <span className="flex-1">{link.label}</span>
                            {link.badge && (
                              <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                                {link.badge}
                              </span>
                            )}
                            {active && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="w-1 h-6 bg-blue-600 rounded-full"
                              />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* زر الإدارة - بارز وواضح */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <Link
            href="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={cn(
              linkVariants({ variant: "admin", size: "lg", interactive: true }),
              "group relative block w-full p-3 shadow-md hover:shadow-lg overflow-hidden",
              pathname?.startsWith('/admin') && 'ring-2 ring-purple-400 ring-offset-2'
            )}
            aria-label="انتقل إلى لوحة الإدارة - التحكم الكامل في النظام"
            role="link"
          >
            {/* خلفية متحركة */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />
            
            {/* محتوى الزر */}
            <div className="relative flex items-center gap-2.5">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.5 }}
                className="p-1.5 bg-white/20 backdrop-blur-sm rounded-lg"
              >
                <Shield className="w-5 h-5" />
              </motion.div>
              <div className="flex-1 text-right">
                <p className="text-sm font-bold mb-0.5">لوحة الإدارة</p>
                <p className="text-xs text-white/80">التحكم الكامل في النظام</p>
              </div>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="opacity-80"
              >
                <LayoutDashboard className="w-4 h-4" />
              </motion.div>
            </div>
            
            {/* تأثير لامع */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              animate={{
                x: ['-100%', '200%'],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: 'linear',
              }}
            />
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              تحتاج مساعدة؟
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              تواصل مع فريق الدعم
            </p>
            <Link
              href="/student/support"
              onClick={() => setIsOpen(false)}
              className={cn(
                buttonVariants({ variant: "primary", size: "sm", interactive: true }),
                "block w-full text-center"
              )}
              aria-label="تواصل مع فريق الدعم الفني"
              role="link"
            >
              الدعم الفني
            </Link>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
