'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  BookOpen,
  FileText,
  Award,
  Users,
  Settings,
  Brain,
  FolderOpen,
  BarChart3,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  Video,
  CreditCard,
  Shield,
  Star,
  LibraryBig,
  Calculator,
  ShieldCheck,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { getSidebarItems, isActiveLink } from '@/lib/navigation';

/** Maps icon identifier strings to their corresponding lucide-react icon components. Used to dynamically render icons based on navigation item configuration. Supports 40+ icon types for various navigation categories. */
const iconMap = {
  home: Home,
  dashboard: Home,
  courses: BookOpen,
  exam: FileText,
  exams: FileText,
  award: Award,
  certificates: Award,
  users: Users,
  settings: Settings,
  brain: Brain,
  folder: FolderOpen,
  'file-manager': FolderOpen,
  video: Video,
  'meeting-room': Video,
  'credit-card': CreditCard,
  admin: Shield,
  help: HelpCircle,
  contact: MessageCircle,
  support: MessageCircle,
  reports: BarChart3,
  user: Users,
  paths: Users,
  audit: Award,
  fellowship: Star,
  blog: BookOpen,
  learning: BookOpen,
  instructor: Users,
  'course-tree': FolderOpen, // أيقونة مميزة لشجرة الملفات
  services: Settings, // إضافة أيقونة services
  community: Users,
  resources: LibraryBig,
  'resource-course-files': FolderOpen,
  'course-files': FolderOpen,
  subscription: CreditCard,
  'financial-management': Calculator,
  'internal-auditor': ShieldCheck,
  shieldCheck: ShieldCheck,
  calculator: Calculator,
  'student-exam': FileText,
};
// Icon identifiers match the 'icon' property from navigation items in lib/navigation.ts

/** Props for the AppSidebar component */
interface AppSidebarProps {
  /** Whether to disable keyboard shortcuts and interactions (default: false) */
  disabled?: boolean;
}

/** Collapsible sidebar navigation component with keyboard shortcut support (Ctrl+B). Features categorized navigation items with expand/collapse functionality, active link highlighting, and smooth animations. Hidden on mobile devices, accessible via toggle button on desktop. Includes hover-to-close behavior and staggered item animations. */
const AppSidebar = ({ disabled = false }: AppSidebarProps) => {
  const pathname = usePathname();
  const [openCategories, setOpenCategories] = useState<string[]>([
    'learning',
    'account',
  ]);
  const [isOpen, setIsOpen] = useState(false);

  // Keyboard shortcut handler for Ctrl+B to toggle sidebar. Prevents conflicts with input fields.
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Prevent conflicts with input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [disabled]);

  /** Toggles the expanded/collapsed state of a navigation category. Allows multiple categories to be open simultaneously.
   * @param category - The category identifier to toggle
   */
  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Fetch navigation items based on user role - currently hardcoded to 'student'
  const navigationItems = getSidebarItems('student'); // يمكن تغييره حسب دور المستخدم

  const isActive = (href: string) => isActiveLink(href, pathname);

  /** Floating toggle button for opening the sidebar. Displays keyboard shortcut hint on hover. Hidden when sidebar is open. */
  const ToggleButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
    <motion.button
      onClick={onClick}
      title="فتح القائمة الجانبية (Ctrl+B)"
      className={`hidden lg:flex fixed left-0 top-1/2 transform -translate-y-1/2 z-50 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-3 rounded-r-2xl shadow-2xl transition-all duration-500 hover:shadow-blue-500/25 group min-w-12 min-h-12 ${
        isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="فتح قائمة التنقل"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Menu className="w-5 h-5" />
      <motion.span
        className="absolute left-full ml-3 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-xs rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-700/50"
        initial={{ x: -10 }}
        whileHover={{ x: 0 }}
      >
        Ctrl+B للفتح
      </motion.span>
    </motion.button>
  );

  /** Sidebar header with title, description, and close button. Features gradient background and animated icon. */
  const SidebarHeader = ({ onClose }: { onClose: () => void }) => (
    <motion.div
      className="p-6 border-b border-gray-200/60 dark:border-gray-700/60 bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-gray-800/50 dark:to-gray-700/50"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.4 }} // تسريع ظهور الرأس
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg"
            whileHover={{ scale: 1.03, rotate: 3 }} // تقليل شدة الحركة
            transition={{ duration: 0.2 }}
          >
            <Home className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
              قائمة التنقل
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              استكشف المنصة
            </p>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
          aria-label="إغلاق قائمة التنقل"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ×
        </motion.button>
      </div>
    </motion.div>
  );

  /** Individual navigation link item with icon, label, and active state indicator. Features hover effects, scale animations, and gradient background for active state. */
  const NavigationItem = ({ item, isActive, itemIndex }: { item: any; isActive: boolean; itemIndex: number }) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: itemIndex * 0.03, // تسريع ظهور العناصر
          duration: 0.25,
        }}
      >
        {item.href && (
          <Link
            href={item.href}
            className={`group flex items-center gap-3 p-3 text-sm rounded-xl transition-all duration-300 min-h-12 hover:translate-x-2 hover:shadow-lg hover:shadow-blue-500/25 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-blue-400/25'
            }`}
          >
            <motion.div
              className={`p-1.5 rounded-lg transition-all duration-300 ${
                isActive
                  ? 'bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <IconComponent
                className={`w-4 h-4 transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`}
              />
            </motion.div>
            <span className="font-medium">{item.name}</span>
            {isActive && (
              <motion.div
                className="ml-auto w-2 h-2 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
              />
            )}
          </Link>
        )}
      </motion.div>
    );
  };

  /** Collapsible navigation category section with animated expand/collapse. Displays category title and nested navigation items. Supports active link highlighting and smooth transitions. */
  const CategorySection = ({ section, isOpen, onToggle, pathname, sectionIndex }: { section: any; isOpen: boolean; onToggle: () => void; pathname: string; sectionIndex: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: sectionIndex * 0.1, duration: 0.5 }}
      className="space-y-2"
    >
      {/* Category Header */}
      <motion.button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-500/25 rounded-2xl transition-all duration-300 group min-h-14 dark:hover:shadow-blue-400/25"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-3">
          <motion.div
            animate={{
              rotate: isOpen ? 0 : -90,
            }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-4 h-4 text-blue-500" />
          </motion.div>
          {section.title}
        </span>
        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
        </motion.div>
      </motion.button>

      {/* Category Items */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            duration: 0.3, // تسريع فتح/إغلاق الفئات
            ease: 'easeInOut',
          }}
          className="ml-6 space-y-1 overflow-hidden"
        >
          {section.items.map((item: any, itemIndex: number) => (
            <NavigationItem key={item.href || item.name} item={item} isActive={item.href ? isActiveLink(item.href, pathname) : false} itemIndex={itemIndex} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );

  /** Sidebar footer with copyright notice and branding. Displays platform name and creation year. */
  const SidebarFooter = () => (
    <motion.div
      className="p-4 border-t border-gray-200/60 dark:border-gray-700/60 bg-gray-50/50 dark:bg-gray-800/50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }} // تسريع ظهور التذييل
    >
      <div className="text-center space-y-3">
        <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
          © 2025 منصة خطى التعليمية
          <br />
          جميع الحقوق محفوظة
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <span>🎓</span>
          <span>صنع بـ ❤️ للمجتمع التعليمي</span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(true)} />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{
          duration: 0.3, // تسريع فتح/إغلاق الشريط الجانبي
          ease: 'easeInOut',
          type: 'spring',
          stiffness: 400, // زيادة الصلابة للاستجابة السريعة
          damping: 35,
        }}
        className="hidden lg:flex flex-col fixed left-0 top-20 h-[calc(100vh-5rem)] w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-r border-gray-200/60 dark:border-gray-700/60 shadow-2xl z-40 overflow-hidden"
        onMouseLeave={() => setIsOpen(false)}
      >
        <SidebarHeader onClose={() => setIsOpen(false)} />

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent dark:scrollbar-thumb-gray-700">
          {navigationItems.map((section, sectionIndex) => (
            <CategorySection key={section.category} section={section} isOpen={openCategories.includes(section.category)} onToggle={() => toggleCategory(section.category)} pathname={pathname} sectionIndex={sectionIndex} />
          ))}
        </div>

        <SidebarFooter />
      </motion.aside>
    </>
  );
};

export default AppSidebar;
