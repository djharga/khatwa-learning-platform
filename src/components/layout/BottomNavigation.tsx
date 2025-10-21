'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getBottomNavigationItems, isActiveLink } from '@/lib/navigation';
import Icon from '@/components/ui/icons/IconSystem';

/**
 * Mobile-only bottom navigation bar with animated icons and active state indicators.
 * Fixed to the bottom of the screen on mobile devices (hidden on desktop).
 * Features smooth transitions, pulsing animations for active items, and safe area inset support for notched devices.
 * Automatically highlights the current page based on pathname.
 */
const BottomNavigation = () => {
  const pathname = usePathname();

  // Fetch bottom navigation items for student role with authentication check
  const navItems = getBottomNavigationItems('student', true);

  // Mobile Bottom Navigation Bar
  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200/60 shadow-2xl z-50 pb-safe-area-inset-bottom"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Subtle gradient overlay for depth effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/95 to-white/98"></div>

      {/* Navigation Items Container */}
      <div className="relative flex items-center justify-around h-20 px-2">
        {/* Render navigation items with staggered entrance animations */}
        {navItems.map((item, index) => {
          const isActive = item.href ? isActiveLink(item.href, pathname) : false;
          return (
            <motion.div
              key={item.href || item.id}
              className="relative flex-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              {item.href && (
                <Link
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 min-w-0 flex-1 h-16 ${
                    isActive
                      ? 'text-blue-600 bg-blue-50 shadow-lg scale-105'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/50 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* Pulsing animation for active navigation item icon */}
                  <motion.div
                    className="relative"
                    animate={
                      isActive
                        ? {
                            scale: [1, 1.2, 1],
                          }
                        : false
                    }
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  >
                    <Icon
                      name={(item.icon as string) || 'home'}
                      size="md"
                      className={`mb-1 transition-all duration-300 ${
                        isActive ? 'drop-shadow-md' : 'group-hover:scale-110'
                      }`}
                    />
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-blue-400/20 rounded-full blur-md"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 0.2, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </motion.div>

                  <span
                    className={`text-xs font-medium transition-all duration-300 ${
                      isActive ? 'font-bold' : 'group-hover:font-semibold'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Animated top bar indicator for active page with layout animation */}
                  {isActive && (
                    <motion.div
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      layoutId="activeIndicator" // Shared layout ID enables smooth animation between active items
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Subtle top border gradient for visual separation */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </motion.nav>
  );
};

export default BottomNavigation;
