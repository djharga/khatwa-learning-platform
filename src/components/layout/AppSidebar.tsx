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
  X,
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

  /** Individual navigation link item with icon, label, and active state indicator. Features hover effects, scale animations, and gradient background for active state. */
  const NavigationItem = ({ item, isActive, itemIndex }: { item: any; isActive: boolean; itemIndex: number }) => {
    const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Home;
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: itemIndex * 0.01, // Reduced delay - minimal motion
          duration: 0.1,
        }}
      >
        {item.href && (
          <Link
            href={item.href}
            className={`group flex items-center gap-3 p-3 text-sm rounded-xl transition-all duration-150 min-h-12 hover:shadow-lg hover:shadow-blue-500/25 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-blue-400/25'
            }`}
          >
            <div
              className={`p-1.5 rounded-lg transition-all duration-150 ${
                isActive
                  ? 'bg-white/20'
                  : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50'
              }`}
            >
              <IconComponent
                className={`w-4 h-4 transition-colors duration-300 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                }`}
              />
            </div>
            <span className="font-medium">{item.name}</span>
            {isActive && (
              <motion.div
                className="ml-auto w-2 h-2 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.1 }}
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: sectionIndex * 0.02, duration: 0.1 }}
      className="space-y-2"
    >
      {/* Category Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-sm font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:shadow-lg hover:shadow-blue-500/25 rounded-2xl transition-all duration-150 group min-h-14 dark:hover:shadow-blue-400/25"
      >
        <span className="flex items-center gap-3">
          <div
            className="transition-transform duration-100"
            style={{ transform: `rotate(${isOpen ? 0 : -90}deg)` }}
          >
            <ChevronRight className="w-4 h-4 text-blue-500" />
          </div>
          {section.title}
        </span>
        <div
          className="transition-transform duration-100"
          style={{ transform: `rotate(${isOpen ? 180 : 0}deg)` }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-150" />
        </div>
      </button>

      {/* Category Items */}
      {isOpen && (
        <div className="space-y-1 pr-4">
          {section.items.map((item: any, itemIndex: number) => (
            <NavigationItem
              key={item.href || item.id}
              item={item}
              isActive={isActive(item.href)}
              itemIndex={itemIndex}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  const ToggleButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => {
    if (isOpen) return null;
    return (
      <motion.button
        onClick={onClick}
        className="fixed left-6 top-24 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-150"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
        aria-label="فتح القائمة الجانبية"
      >
        <Menu className="w-5 h-5" />
      </motion.button>
    );
  };

  const SidebarHeader = ({ onClose }: { onClose: () => void }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
      <h2 className="text-lg font-bold text-gray-900 dark:text-white">القائمة</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors duration-150"
        aria-label="إغلاق القائمة"
      >
        <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      </button>
    </div>
  );

  const SidebarFooter = () => (
    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        © 2024 خطى للتدريب والاستشارات
      </p>
    </div>
  );

  return (
    <>
      <ToggleButton isOpen={isOpen} onClick={() => setIsOpen(true)} />

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -320 }}
        transition={{
          duration: 0.15, // Reduced motion - faster
          ease: 'easeOut',
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
