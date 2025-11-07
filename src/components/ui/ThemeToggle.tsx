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
  size = 'md'
}: ThemeToggleProps) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  if (variant === 'icon') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'relative rounded-lg p-2 transition-all duration-200 ease-out',
          'bg-neutral-100 dark:bg-neutral-800',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'text-neutral-700 dark:text-neutral-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          sizeClasses[size],
          className
        )}
        aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Sun className={iconSizes[size]} />
          ) : (
            <Moon className={iconSizes[size]} />
          )}
        </motion.div>
      </button>
    );
  }

  if (variant === 'button') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'flex items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 ease-out',
          'bg-neutral-100 dark:bg-neutral-800',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'text-neutral-700 dark:text-neutral-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          'font-medium text-sm',
          className
        )}
        aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isDark ? (
            <Sun className={iconSizes[size]} />
          ) : (
            <Moon className={iconSizes[size]} />
          )}
        </motion.div>
        <span>{isDark ? 'فاتح' : 'مظلم'}</span>
      </button>
    );
  }

  // Default variant - toggle switch
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center rounded-full p-1 transition-colors duration-200 ease-out',
        'bg-neutral-200 dark:bg-neutral-700',
        'hover:bg-neutral-300 dark:hover:bg-neutral-600',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        size === 'sm' ? 'h-7 w-12' : size === 'lg' ? 'h-8 w-14' : 'h-7 w-12',
        className
      )}
      aria-label={isDark ? 'تفعيل الوضع الفاتح' : 'تفعيل الوضع المظلم'}
      role="switch"
      aria-checked={isDark}
    >
      <motion.div
        initial={false}
        animate={{
          x: isDark ? (size === 'lg' ? 20 : 18) : 2,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
        className={cn(
          'flex items-center justify-center rounded-full bg-white dark:bg-neutral-900 shadow-md',
          size === 'sm' ? 'h-5 w-5' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
        )}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isDark ? 180 : 0, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isDark ? (
            <Moon className={size === 'lg' ? 'h-3 w-3' : 'h-3 w-3'} />
          ) : (
            <Sun className={size === 'lg' ? 'h-3 w-3' : 'h-3 w-3'} />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}

