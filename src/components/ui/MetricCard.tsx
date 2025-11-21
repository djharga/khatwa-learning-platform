'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Metric Card Component - Academic Design from agent.md
 * Displays key performance indicators with:
 * - Icon + Label + Large Number + Secondary Info
 * - Background: #FFFFFF
 * - Border: 1px solid #E5E7EB
 * - Border-radius: 14px (radius-lg)
 * - Padding: space-6 (24px)
 * - Box-shadow: elevation-2
 */
export interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  secondary?: string;
  iconColor?: string;
  iconBgColor?: string;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export default function MetricCard({
  icon,
  label,
  value,
  secondary,
  iconColor = 'text-primary-600 dark:text-primary-400',
  iconBgColor = 'bg-primary-50 dark:bg-primary-900/30',
  href,
  className,
  onClick,
}: MetricCardProps) {
  const content = (
    <motion.div
      className={cn(
        'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-300',
        'hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer',
        className
      )}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      dir="rtl"
    >
      {/* Icon */}
      <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 shadow-sm', iconBgColor || 'bg-primary-50 dark:bg-primary-900/30')}>
        <div className={cn('text-primary-600 dark:text-primary-400', iconColor)}>
          {icon}
        </div>
      </div>

      {/* Label */}
      <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium mb-2">
        {label}
      </p>

      {/* Large Number */}
      <p className="text-3xl lg:text-4xl font-extrabold text-neutral-900 dark:text-white mb-1 leading-tight">
        {value}
      </p>

      {/* Secondary Info */}
      {secondary && (
        <p className="text-xs text-neutral-500 dark:text-neutral-500 font-normal mt-1">
          {secondary}
        </p>
      )}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block no-underline">
        {content}
      </a>
    );
  }

  return content;
}

