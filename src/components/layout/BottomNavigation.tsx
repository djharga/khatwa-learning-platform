'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getBottomNavigationItems, isActiveLink } from '@/lib/navigation';
import Icon from '@/components/ui/icons/IconSystem';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const BottomNavigation = () => {
  const pathname = usePathname();
  const navItems = getBottomNavigationItems('student', true);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border-t border-neutral-200/60 dark:border-neutral-700/60 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50 pb-safe-area-inset-bottom"
      initial={prefersReducedMotion ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }}
      role="navigation"
      aria-label="شريط التنقل السفلي"
    >
      {/* تأثير شفاف علوي للفصل */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-neutral-200/80 to-transparent dark:via-neutral-700/60" />

      <div className="relative flex items-center justify-around h-20 px-2">
        {navItems.map((item, index) => {
          const isActive = item.href ? isActiveLink(item.href, pathname) : false;

          return (
            <motion.div
              key={item.href || item.id}
              className="relative flex-1"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
              animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.05, duration: 0.25 }}
            >
              {item.href && (
                <Link
                  href={item.href}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl transition-all duration-200 ease-out w-full h-16 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400 bg-gradient-to-b from-primary-50/90 to-white/40 dark:from-primary-900/20 dark:to-neutral-900/60 shadow-md shadow-primary-500/10'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/40 dark:hover:bg-primary-900/10 hover:shadow-sm'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {/* أيقونة مع تأثير نبض ناعم */}
                  <motion.div
                    className="relative flex items-center justify-center"
                    animate={
                      prefersReducedMotion
                        ? { scale: 1, y: 0 }
                        : isActive
                        ? { scale: [1, 1.06, 1], y: [0, -1, 0] }
                        : { scale: 1, y: 0 }
                    }
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : {
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }
                    }
                  >
                    <Icon
                      name={(item.icon as string) || 'home'}
                      size="md"
                      className={`transition-transform duration-200 ease-out ${
                        isActive ? 'scale-110 drop-shadow-[0_0_6px_rgba(59,130,246,0.4)]' : ''
                      }`}
                    />
                  </motion.div>

                  <span
                    className={`text-xs font-medium mt-1 transition-colors ${
                      isActive ? 'font-semibold text-primary-600 dark:text-primary-400' : ''
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* مؤشر علوي متحرك */}
                  {isActive && (
                    <motion.div
                      layoutId={prefersReducedMotion ? undefined : "activeIndicator"}
                      className="absolute -top-[2px] left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-[0_0_6px_rgba(59,130,246,0.5)]"
                      transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default BottomNavigation;
