'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RTLCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onClick?: () => void;
}

/**
 * RTLCard Component
 * بطاقة متوافقة مع RTL تستخدم logical properties
 * 
 * @example
 * ```tsx
 * <RTLCard title="عنوان البطاقة" description="وصف البطاقة">
 *   محتوى البطاقة
 * </RTLCard>
 * ```
 */
export function RTLCard({
  children,
  className,
  title,
  description,
  variant = 'default',
  onClick,
}: RTLCardProps) {
  const variantClasses = {
    default: 'bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800',
    elevated: 'bg-white dark:bg-slate-900 shadow-lg border border-gray-200 dark:border-slate-800',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-slate-700',
  };

  return (
    <motion.div
      data-framer-component
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'rounded-xl p-6',
        'motion-isolate', // عزل الحركة
        variantClasses[variant],
        onClick && 'cursor-pointer hover:shadow-md transition-shadow',
        className
      )}
      onClick={onClick}
      style={{
        // استخدام logical properties
        paddingInlineStart: '1.5rem',
        paddingInlineEnd: '1.5rem',
        textAlign: 'right',
      }}
    >
      {title && (
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {description}
        </p>
      )}
      <div className="text-gray-700 dark:text-gray-300">{children}</div>
    </motion.div>
  );
}

