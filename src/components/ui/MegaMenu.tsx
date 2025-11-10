'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from './icons/IconSystem';
import { NavigationItem, getNavigationForUser } from '@/lib/navigation';
import { CourseCardProps } from '@/types/course';
import { useSubscription } from '@/hooks/useSubscription';
import { safeFormatNumber } from '@/lib/numberUtils';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  isAuthenticated?: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: -20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 20,
      staggerChildren: 0.05,
    },
  },
  exit: { opacity: 0, y: -15, scale: 0.98 },
};

const MegaMenuContainer: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}> = ({ children, isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        <motion.div
          className="absolute top-full left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-gray-200/70 dark:border-slate-800 shadow-2xl"
          variants={containerVariants as any}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="container mx-auto px-6 py-8">{children}</div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const MegaMenuColumn: React.FC<{
  title: string;
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
}> = ({ title, items, onItemClick }) => (
  <motion.div
    className="space-y-4"
    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
  >
    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
      <Icon name="book" size="sm" className="text-blue-600" />
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item) => (
        <motion.li key={item.id} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>
          <Link
            href={item.href || '#'}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors group"
            onClick={() => onItemClick?.(item)}
          >
            {item.icon && <Icon name={item.icon} size="sm" className="text-blue-600" />}
            <div className="flex-1">
              <span className="font-medium text-gray-800 dark:text-gray-100 group-hover:text-blue-600">
                {item.label}
              </span>
              {item.description && (
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            <Icon name="chevron-right" size="sm" className="text-gray-400 group-hover:text-blue-600" />
          </Link>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const MegaMenuFeatured: React.FC<{
  featuredCourses: CourseCardProps['course'][];
}> = ({ featuredCourses }) => (
  <motion.div
    className="space-y-4"
    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
  >
    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
      <Icon name="zap" size="sm" className="text-yellow-500" />
      دورات مميزة
    </h3>
    {featuredCourses.length === 0 ? (
      <div className="text-sm text-gray-500 dark:text-gray-400">لا توجد دورات مميزة حالياً</div>
    ) : (
      <div className="space-y-3">
        {featuredCourses.slice(0, 3).map((course) => (
          <motion.div
            key={course.id}
            className="flex gap-3 p-3 bg-gradient-to-r from-blue-50/80 to-purple-50/70 dark:from-slate-800/50 dark:to-slate-900/60 rounded-lg hover:shadow-md transition-transform duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-14 h-14 rounded-md object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">
                {course.title}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {course.description}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Icon name="star" size="xs" className="text-yellow-400" />
                  {course.rating}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="users" size="xs" />
                  {safeFormatNumber(course.students)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
);

const MegaMenuQuickLinks: React.FC<{ quickLinks: NavigationItem[] }> = ({
  quickLinks,
}) => (
  <motion.div
    className="border-t border-gray-200 dark:border-slate-800 pt-6 mt-6"
    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
  >
    <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
      <Icon name="link" size="sm" className="text-green-600" />
      روابط سريعة
    </h3>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {quickLinks.map((link) => (
        <motion.div key={link.id} whileHover={{ y: -2 }}>
          <Link
            href={link.href || '#'}
            className="flex flex-col items-center gap-2 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition"
          >
            <Icon name={link.icon || 'help'} size="sm" className="text-blue-600" />
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200 text-center">
              {link.label}
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  onClose,
  userRole,
  isAuthenticated,
}) => {
  const { hasSubscription } = useSubscription();
  const sections = getNavigationForUser(userRole, isAuthenticated, hasSubscription);
  const learning = sections.find((s) => s.id === 'learning');

  const featuredCourses: CourseCardProps['course'][] = []; // replace with real API later
  const quickLinks: NavigationItem[] = [
    { id: 'support', label: 'الدعم', href: '/support', icon: 'help' },
    { id: 'blog', label: 'المدونة', href: '/blog', icon: 'book' },
    { id: 'consulting', label: 'الاستشارات', href: '/consulting', icon: 'users' },
    { id: 'resources', label: 'المكتبة', href: '/resources', icon: 'library' },
  ];

  return (
    <MegaMenuContainer isOpen={isOpen} onClose={onClose}>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-4 gap-8"
        variants={containerVariants as any} // Type assertion to satisfy Variants type requirements
        initial="hidden"
        animate="visible"
      >
        {learning?.items.slice(0, 3).map((item) => (
          <MegaMenuColumn
            key={item.id}
            title={item.label}
            items={item.children || []}
            onItemClick={() => onClose()}
          />
        ))}
        <MegaMenuFeatured featuredCourses={featuredCourses} />
      </motion.div>
      <MegaMenuQuickLinks quickLinks={quickLinks} />
    </MegaMenuContainer>
  );
};

export default MegaMenu;
