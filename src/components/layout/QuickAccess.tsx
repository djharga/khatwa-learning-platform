'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  X,
  Star,
  Clock,
  TrendingUp,
  BookOpen,
  Award,
  Video,
  Settings,
  Plus,
} from 'lucide-react';
import { getQuickAccessLinks, NavigationItem } from '@/lib/navigation';

/**
 * Props for the QuickAccess floating menu component
 */
interface QuickAccessProps {
  /**
   * User role for filtering relevant quick links (default: 'student')
   */
  userRole?: string;
  /**
   * Whether the user is authenticated (default: false)
   */
  isAuthenticated?: boolean;
  /**
   * Additional CSS classes to apply to the container (optional)
   */
  className?: string;
}

/**
 * Individual quick access link item with icon, label, description, and hover effects. Features animated entrance and gradient hover state.
 */
interface QuickLinkItemProps {
  link: NavigationItem;
  index: number;
  onClose: () => void;
}

/**
 * Recently used links section displaying settings and certificates shortcuts. Separated from main quick links with border divider.
 */
interface RecentlyUsedSectionProps {
  onClose: () => void;
}

/**
 * Expanded quick access menu panel with header, link list, and recently used section. Features glass morphism styling and smooth animations.
 */
interface ExpandedMenuProps {
  quickLinks: NavigationItem[];
  onClose: () => void;
}

/**
 * Individual quick access link item with icon, label, description, and hover effects. Features animated entrance and gradient hover state.
 */
const QuickLinkItem: React.FC<QuickLinkItemProps> = ({ link, index, onClose }) => (
  <motion.div
    key={link.id}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.1 }}
  >
    {link.href && (
      <Link
        href={link.href}
        className="flex items-center gap-3 p-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-all duration-200 group"
        onClick={onClose}
      >
        <div className={"p-2 rounded-lg bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors"}>
          <div className="w-4 h-4 text-gray-600 dark:text-gray-400">
            {/* TODO: Implement icon mapping based on link.icon property - similar to iconMap in AppSidebar */}
          </div>
        </div>

        <div className="flex-1">
          <div className="font-medium text-gray-900 dark:text-white">
            {link.label}
          </div>
          {link.description && (
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {link.description}
            </div>
          )}
        </div>

        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <TrendingUp className="w-4 h-4 text-blue-500" />
        </div>
      </Link>
    )}
  </motion.div>
);

/**
 * Recently used links section displaying settings and certificates shortcuts. Separated from main quick links with border divider.
 */
const RecentlyUsedSection: React.FC<RecentlyUsedSectionProps> = ({ onClose }) => (
  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 flex items-center gap-2">
      <Clock className="w-3 h-3" />
      مستخدمة مؤخراً
    </div>

    <div className="space-y-2">
      <Link
        href="/student/settings"
        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-sm text-gray-600 dark:text-gray-400"
        onClick={onClose}
      >
        <Settings className="w-4 h-4" />
        الإعدادات
      </Link>

      <Link
        href="/certificates"
        className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-sm text-gray-600 dark:text-gray-400"
        onClick={onClose}
      >
        <Award className="w-4 h-4" />
        الشهادات
      </Link>
    </div>
  </div>
);

/**
 * Expanded quick access menu panel with header, link list, and recently used section. Features glass morphism styling and smooth animations.
 */
const ExpandedMenu: React.FC<ExpandedMenuProps> = ({ quickLinks, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: 20 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
    className="fixed bottom-40 right-6 z-50 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-64"
  >
    {/* رأس القائمة */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-500" />
        وصول سريع
      </h3>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>

    {/* الروابط السريعة */}
    <div className="space-y-2">
      {quickLinks.map((link, index) => (
        <QuickLinkItem key={link.id} link={link} index={index} onClose={onClose} />
      ))}
    </div>

    <RecentlyUsedSection onClose={onClose} />
  </motion.div>
);

/**
 * Floating quick access menu button with expandable link panel. Provides shortcuts to frequently used features and recently accessed pages. Features animated expand/collapse, backdrop overlay, and role-based link filtering. Fixed to bottom-right corner above bottom navigation on mobile.
 */
const QuickAccess = ({
  userRole = 'student',
  isAuthenticated = false,
  className = ''
}: QuickAccessProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fetch quick access links filtered by user role and authentication status
  const quickLinks = getQuickAccessLinks(userRole, isAuthenticated);

  // Hide component if no quick links are available for the user
  if (quickLinks.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`}>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="الوصول السريع"
      >
        <motion.div
          animate={{ rotate: isExpanded ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <Zap className="w-6 h-6" />
        </motion.div>

        {/* تلميحة عند التمرير */}
        <motion.div
          className="absolute right-full mr-3 px-3 py-2 bg-gray-900/90 backdrop-blur-sm text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap"
          initial={{ x: 10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
        >
          وصول سريع
        </motion.div>
      </motion.button>

      {/* Expandable Menu Panel */}
      <AnimatePresence>
        {isExpanded && (
          <ExpandedMenu quickLinks={quickLinks} onClose={() => setIsExpanded(false)} />
        )}
      </AnimatePresence>

      {/* Click-Outside Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30"
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickAccess;
