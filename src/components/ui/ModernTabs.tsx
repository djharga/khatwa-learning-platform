'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

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
  const activeTabIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const sizeClasses = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-12 px-4 text-base',
    lg: 'h-14 px-6 text-lg',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  // Default variant - Modern gradient tabs with animated indicator
  if (variant === 'default') {
    return (
      <div
        className={cn(
          'relative bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-2xl p-1.5 shadow-lg border border-neutral-200/50 dark:border-neutral-700/50 w-full',
          sticky && 'sticky top-16 z-40',
          className
        )}
      >
        <div className={cn(
          'flex gap-1.5 relative',
          fullWidth ? 'w-full' : 'flex-wrap'
        )}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => !tab.disabled && onChange(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  'relative flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 whitespace-nowrap',
                  sizeClasses[size],
                  fullWidth && 'flex-1 min-w-0',
                  !fullWidth && 'flex-shrink-0',
                  isActive
                    ? 'text-white shadow-lg'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  tab.disabled && 'opacity-50 cursor-not-allowed'
                )}
                whileHover={!tab.disabled ? { scale: 1.02 } : {}}
                whileTap={!tab.disabled ? { scale: 0.98 } : {}}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-innovate-600 rounded-xl"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2 truncate">
                  {Icon && <Icon className={iconSizes[size]} />}
                  <span className="truncate">{tab.label}</span>
                  {tab.count !== undefined && tab.count > 0 && (
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
                  {tab.badge && (
                    <span
                      className={cn(
                        'px-1.5 py-0.5 rounded-full text-xs font-bold',
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-danger-500 text-white'
                      )}
                    >
                      {tab.badge}
                    </span>
                  )}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // Pills variant - Rounded pills style
  if (variant === 'pills') {
    return (
      <div
        className={cn(
          'flex gap-2 flex-wrap bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-1.5',
          sticky && 'sticky top-16 z-40',
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => !tab.disabled && onChange(tab.id)}
              disabled={tab.disabled}
              className={cn(
                'relative flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-300',
                sizeClasses[size],
                fullWidth && 'flex-1',
                isActive
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-md'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200',
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
              whileHover={!tab.disabled ? { scale: 1.05 } : {}}
              whileTap={!tab.disabled ? { scale: 0.95 } : {}}
            >
              {Icon && <Icon className={iconSizes[size]} />}
              <span>{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-bold',
                    isActive
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                  )}
                >
                  {tab.count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  // Underline variant - Clean underline style
  if (variant === 'underline') {
    return (
      <div
        className={cn(
          'relative border-b border-neutral-200 dark:border-neutral-700',
          sticky && 'sticky top-16 z-40 bg-white dark:bg-neutral-900',
          className
        )}
      >
        <div className="flex gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;

            return (
              <motion.button
                key={tab.id}
                onClick={() => !tab.disabled && onChange(tab.id)}
                disabled={tab.disabled}
                className={cn(
                  'relative flex items-center justify-center gap-2 font-semibold px-6 pb-4 transition-colors duration-300',
                  sizeClasses[size],
                  isActive
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200',
                  tab.disabled && 'opacity-50 cursor-not-allowed'
                )}
                whileHover={!tab.disabled ? { y: -2 } : {}}
                whileTap={!tab.disabled ? { y: 0 } : {}}
              >
                {Icon && <Icon className={iconSizes[size]} />}
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span
                    className={cn(
                      'mr-2 px-2 py-0.5 rounded-full text-xs font-bold',
                      isActive
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    )}
                  >
                    {tab.count}
                  </span>
                )}
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-full"
                    transition={{
                      type: 'spring',
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // Cards variant - Card-like tabs
  if (variant === 'cards') {
    const gridCols = tabs.length <= 2 ? 'grid-cols-1 md:grid-cols-2' :
                     tabs.length <= 3 ? 'grid-cols-1 md:grid-cols-3' :
                     tabs.length <= 4 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
                     'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
    
    return (
      <div
        className={cn(
          'grid gap-4',
          gridCols,
          fullWidth && 'w-full',
          sticky && 'sticky top-16 z-40',
          className
        )}
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <motion.button
              key={tab.id}
              onClick={() => !tab.disabled && onChange(tab.id)}
              disabled={tab.disabled}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                'relative flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300',
                size === 'sm' && 'p-4',
                size === 'lg' && 'p-8',
                isActive
                  ? 'bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white border-transparent shadow-xl scale-105'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg',
                tab.disabled && 'opacity-50 cursor-not-allowed'
              )}
              whileHover={!tab.disabled && !isActive ? { scale: 1.02, y: -4 } : {}}
              whileTap={!tab.disabled ? { scale: 0.98 } : {}}
            >
              {Icon && (
                <motion.div
                  animate={isActive ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className={cn(iconSizes[size], size === 'lg' && 'w-8 h-8')} />
                </motion.div>
              )}
              <span className="font-bold">{tab.label}</span>
              {tab.count !== undefined && tab.count > 0 && (
                <span
                  className={cn(
                    'absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-bold',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  )}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <motion.div
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-white rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    );
  }

  return null;
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
  return (
    <AnimatePresence mode="wait">
      {value === activeValue && (
        <motion.div
          key={value}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

