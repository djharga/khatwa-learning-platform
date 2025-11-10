'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TabItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  count?: number;
  badge?: string;
  disabled?: boolean;
}

interface ModernTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  variant?: 'default' | 'pills' | 'underline' | 'cards';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  sticky?: boolean;
  fullWidth?: boolean;
}

export function ModernTabs({
  tabs,
  activeTab,
  onChange,
  variant = 'default',
  size = 'md',
  className,
  sticky = false,
  fullWidth = false,
}: ModernTabsProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // التأكد من أن activeTab موجود في tabs
  const validActiveTab = React.useMemo(() => {
    const tabExists = tabs.some(tab => tab.id === activeTab);
    return tabExists ? activeTab : tabs[0]?.id || '';
  }, [activeTab, tabs]);

  // التأكد من استدعاء onChange عند تغيير activeTab من الخارج
  React.useEffect(() => {
    if (validActiveTab !== activeTab && validActiveTab) {
      // لا نستدعي onChange تلقائياً لأن هذا قد يسبب loops
      // بدلاً من ذلك، نستخدم validActiveTab في العرض
    }
  }, [activeTab, validActiveTab]);

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-6 text-lg',
  }[size];

  const iconSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }[size];

  const containerClass = cn(
    variant === 'default' && 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-2xl p-1.5 border border-neutral-200/50 dark:border-neutral-700/50 shadow-md',
    variant === 'pills' && 'bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-1.5',
    variant === 'underline' && 'border-b border-neutral-200 dark:border-neutral-700',
    sticky && 'sticky top-16 z-40',
    className
  );

  const activeLayoutId = `active-${variant}`;
  
  // إعدادات الحركة بناءً على تفضيلات المستخدم
  const motionProps = prefersReducedMotion
    ? {
        initial: {},
        animate: {},
        transition: { duration: 0 },
        whileHover: {},
        whileTap: {},
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0 },
        whileHover: { scale: 1.02 },
        whileTap: { scale: 0.98 },
      };
  
  const layoutTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 400, damping: 30 };

  return (
    <div className={containerClass}>
      <div
        className={cn(
          variant === 'cards' ? 'grid gap-4' :
          'flex gap-1.5',
          fullWidth && variant !== 'cards' && 'w-full'
        )}
      >
        {tabs.map((tab, i) => {
          const isActive = validActiveTab === tab.id;
          const Icon = tab.icon;

          const common = cn(
            'relative flex items-center justify-center gap-2 font-semibold transition-all duration-300 whitespace-nowrap',
            sizeClasses,
            fullWidth && 'flex-1',
            tab.disabled && 'opacity-50 cursor-not-allowed'
          );

          // CARD VARIANT
          if (variant === 'cards') {
            return (
              <motion.button
                key={tab.id}
                disabled={tab.disabled}
                onClick={() => {
                  if (!tab.disabled && tab.id !== validActiveTab) {
                    onChange(tab.id);
                  }
                }}
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { delay: i * 0.05 }}
                className={cn(
                  'relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center',
                  size === 'sm' && 'p-4',
                  size === 'lg' && 'p-8',
                  isActive
                    ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-transparent shadow-xl'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md',
                  tab.disabled && 'opacity-50 cursor-not-allowed'
                )}
                whileHover={prefersReducedMotion || tab.disabled || isActive ? {} : { scale: 1.02, y: -3 }}
                whileTap={prefersReducedMotion || tab.disabled ? {} : { scale: 0.98 }}
              >
                {Icon && <Icon className={cn(iconSize, size === 'lg' && 'w-8 h-8')} />}
                <span className="font-bold">{tab.label}</span>
                {tab.count && (
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId={prefersReducedMotion ? undefined : activeLayoutId}
                    className="absolute bottom-0 w-12 h-1 bg-white rounded-full"
                    transition={layoutTransition}
                  />
                )}
              </motion.button>
            );
          }

          // NON-CARD VARIANTS
          return (
            <motion.button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => {
                if (!tab.disabled && tab.id !== validActiveTab) {
                  onChange(tab.id);
                }
              }}
              className={cn(
                common,
                isActive
                  ? variant === 'pills'
                    ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-md rounded-full'
                    : 'text-white'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200',
                variant === 'default' && 'rounded-xl',
                variant === 'underline' && 'px-6 pb-4 font-semibold'
              )}
              whileHover={prefersReducedMotion || tab.disabled ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion || tab.disabled ? {} : { scale: 0.98 }}
            >
              {isActive && variant === 'default' && (
                <motion.div
                  layoutId={prefersReducedMotion ? undefined : activeLayoutId}
                  className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-innovate-600 rounded-xl"
                  transition={layoutTransition}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {Icon && <Icon className={iconSize} />}
                {tab.label}
                {tab.count && (
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-xs font-bold',
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
              </span>
              {isActive && variant === 'underline' && (
                <motion.div
                  layoutId={prefersReducedMotion ? undefined : activeLayoutId}
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-full"
                  transition={layoutTransition}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

interface TabContentProps {
  children: React.ReactNode;
  value: string;
  activeValue: string;
  className?: string;
}

export function ModernTabContent({
  children,
  value,
  activeValue,
  className,
}: TabContentProps) {
  const prefersReducedMotion = useReducedMotion();
  
  if (value !== activeValue) {
    return null;
  }

  const motionProps = prefersReducedMotion
    ? {
        initial: { opacity: 1, y: 0 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 1, y: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, y: 15 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -15 },
        transition: { duration: 0.25 },
      };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={value}
        {...motionProps}
        className={cn('mt-4', className)}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
