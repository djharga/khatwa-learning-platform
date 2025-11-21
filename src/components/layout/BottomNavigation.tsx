'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getBottomNavigationItems, isActiveLink } from '@/lib/navigation';
import Icon from '@/components/ui/icons/IconSystem';
import { cn } from '@/lib/utils';

const BottomNavigation = () => {
  const pathname = usePathname();
  const navItems = getBottomNavigationItems('student', true);

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 z-50 pb-safe-area-inset-bottom"
      role="navigation"
      aria-label="شريط التنقل السفلي"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = item.href ? isActiveLink(item.href, pathname) : false;

          if (!item.href) return null;

          return (
            <div key={item.href || item.id} className="flex-1 relative">
              <Link
                href={item.href}
                className={cn(
                  "group flex flex-col items-center justify-center w-full h-16 transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset",
                  isActive
                    ? "text-primary-600 dark:text-primary-400"
                    : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* مؤشر علوي ثابت للعنصر النشط */}
                {isActive && (
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 rounded-b-lg bg-primary-600 dark:bg-primary-500" />
                )}

                <div className="relative flex items-center justify-center mb-1">
                  <Icon
                    name={(item.icon as string) || 'home'}
                    size="md"
                    className={cn(
                      "w-6 h-6",
                      isActive && "fill-current" // اختياري: تعبئة الأيقونة إذا كانت تدعم ذلك
                    )}
                  />
                </div>

                <span className={cn(
                  "text-[10px] font-medium leading-tight",
                  isActive ? "font-bold" : ""
                )}>
                  {item.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
