'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'icon' | 'button';
  size?: 'sm' | 'md' | 'lg';
}

export function ThemeToggle({
  className,
  variant = 'default',
  size = 'md',
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const sizeMap = {
    sm: { wrapper: 'h-8 w-8', icon: 'h-4 w-4', knob: 'h-4.5 w-4.5', toggle: 'h-6 w-11' },
    md: { wrapper: 'h-10 w-10', icon: 'h-5 w-5', knob: 'h-5 w-5', toggle: 'h-7 w-12' },
    lg: { wrapper: 'h-12 w-12', icon: 'h-6 w-6', knob: 'h-6 w-6', toggle: 'h-8 w-14' },
  }[size];

  /* ----------------------- ICON VARIANT ----------------------- */
  if (variant === 'icon') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={toggleTheme}
        aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
        className={cn(
          'flex items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800',
          'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'transition-all duration-200 shadow-sm hover:shadow-md focus-visible:outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          sizeMap.wrapper,
          className
        )}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {isDark ? <Sun className={sizeMap.icon} /> : <Moon className={sizeMap.icon} />}
        </motion.div>
      </motion.button>
    );
  }

  /* ----------------------- BUTTON VARIANT ----------------------- */
  if (variant === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={toggleTheme}
        aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-sm',
          'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all duration-200 shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          className
        )}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.25, ease: 'easeInOut' }}
        >
          {isDark ? <Sun className={sizeMap.icon} /> : <Moon className={sizeMap.icon} />}
        </motion.div>
        <span>{isDark ? 'فاتح' : 'مظلم'}</span>
      </motion.button>
    );
  }

  /* ----------------------- TOGGLE VARIANT ----------------------- */
  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.98 }}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
      role="switch"
      aria-checked={isDark}
      className={cn(
        'relative inline-flex items-center rounded-full transition-colors duration-300 ease-out',
        'bg-neutral-300/60 dark:bg-neutral-700/70 hover:bg-neutral-400/70 dark:hover:bg-neutral-600/70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        sizeMap.toggle,
        className
      )}
    >
      <motion.div
        initial={false}
        animate={{
          x: isDark ? (size === 'lg' ? 28 : 22) : 2,
          backgroundColor: isDark ? '#111827' : '#ffffff',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 26 }}
        className={cn(
          'flex items-center justify-center rounded-full shadow-md ring-1 ring-black/5 dark:ring-white/5',
          sizeMap.knob
        )}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className={cn('text-yellow-100', size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3')} />
          ) : (
            <Sun className={cn('text-yellow-500', size === 'lg' ? 'h-3.5 w-3.5' : 'h-3 w-3')} />
          )}
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
