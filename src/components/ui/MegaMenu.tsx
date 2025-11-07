import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Icon from './icons/IconSystem';
import { NavigationItem, getNavigationForUser } from '@/lib/navigation';
import { CourseCardProps } from '@/types/course'; // Assuming this exists
import { useSubscription } from '@/hooks/useSubscription';
import { safeFormatNumber } from '@/lib/numberUtils';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: string;
  isAuthenticated?: boolean;
}

interface MegaMenuColumnProps {
  title: string;
  items: NavigationItem[];
  onItemClick?: (item: NavigationItem) => void;
}

interface MegaMenuFeaturedProps {
  featuredCourses: CourseCardProps['course'][]; // Assuming course type from CourseCard
}

interface MegaMenuQuickLinksProps {
  quickLinks: NavigationItem[];
}

const MegaMenuContainer: React.FC<{ children: React.ReactNode; isOpen: boolean; onClose: () => void }> = ({
  children,
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Mega Menu */}
          <motion.div
            className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="container mx-auto px-6 py-8">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const MegaMenuColumn: React.FC<MegaMenuColumnProps> = ({ title, items, onItemClick }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Icon name="book" size="sm" className="text-blue-600" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <motion.li
            key={item.id}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={item.href || '#'}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
              onClick={() => onItemClick?.(item)}
            >
              {item.icon && <Icon name={item.icon} size="sm" className="text-blue-600" />}
              <div className="flex-1">
                <span className="font-medium text-gray-900 group-hover:text-blue-600">
                  {item.label}
                </span>
                {item.description && (
                  <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                )}
              </div>
              <Icon name="chevron-right" size="sm" className="text-gray-400 group-hover:text-blue-600" />
            </Link>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const MegaMenuFeatured: React.FC<MegaMenuFeaturedProps> = ({ featuredCourses }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
        <Icon name="zap" size="sm" className="text-yellow-600" />
        دورات مميزة
      </h3>
      <div className="grid grid-cols-1 gap-4">
        {featuredCourses.slice(0, 3).map((course) => (
          <motion.div
            key={course.id}
            className="flex gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl hover:shadow-lg transition-shadow duration-200"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900 line-clamp-1">{course.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1">
                  <Icon name="star" size="xs" className="text-yellow-400" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="users" size="sm" className="text-gray-400" />
                  <span className="text-sm text-gray-600">{safeFormatNumber(course.students)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Icon name="clock" size="sm" className="text-gray-400" />
                  <span className="text-sm text-gray-600">{course.duration}</span>
                </div>
              </div>
            </div>
            <motion.button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon name="play" size="sm" className="inline mr-1" />
              ابدأ الآن
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MegaMenuQuickLinks: React.FC<MegaMenuQuickLinksProps> = ({ quickLinks }) => {
  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
        <Icon name="help-circle" size="sm" className="text-green-600" />
        روابط سريعة
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <motion.div
            key={link.id}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={link.href || '#'}
              className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200 group"
            >
              <Icon name={link.icon || 'help'} size="sm" className="text-blue-600" />
              <span className="font-medium text-gray-900 group-hover:text-blue-600 text-center">
                {link.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, userRole, isAuthenticated }) => {
  const { hasSubscription } = useSubscription();
  const navigationSections = getNavigationForUser(userRole, isAuthenticated, hasSubscription);
  const learningSection = navigationSections.find(section => section.id === 'learning');
  const servicesSection = navigationSections.find(section => section.id === 'services');

  // Mock featured courses - in real app, fetch from API
  const featuredCourses: CourseCardProps['course'][] = [
    // Add mock data or fetch from props/context
  ];

  // Mock quick links
  const quickLinks: NavigationItem[] = [
    { id: 'support', label: 'الدعم', href: '/support', icon: 'help' },
    { id: 'blog', label: 'المدونة', href: '/blog', icon: 'book' },
    { id: 'consulting', label: 'الاستشارات', href: '/consulting', icon: 'users' },
    { id: 'resources', label: 'المكتبة', href: '/resources', icon: 'library' },
  ];

  return (
    <MegaMenuContainer isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Categories Columns */}
        {learningSection?.items.slice(0, 3).map((item, index) => (
          <MegaMenuColumn
            key={item.id}
            title={item.label}
            items={item.children || []}
            onItemClick={(clickedItem) => {
              // Handle navigation
              onClose();
            }}
          />
        ))}
        {/* Featured Courses */}
        <MegaMenuFeatured featuredCourses={featuredCourses} />
      </div>
      {/* Quick Links */}
      <MegaMenuQuickLinks quickLinks={quickLinks} />
    </MegaMenuContainer>
  );
};

export default MegaMenu;
