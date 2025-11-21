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
  iconColor = 'text-[#5B36E8]',
  iconBgColor = 'bg-[#F7F8FC]',
  href,
  className,
  onClick,
}: MetricCardProps) {
  const content = (
    <motion.div
      className={cn(
        'bg-white border border-[#E5E7EB] rounded-[14px] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200',
        'hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer',
        className
      )}
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      dir="rtl"
    >
      {/* Icon */}
      <div className={cn('w-12 h-12 rounded-[10px] flex items-center justify-center mb-4', iconBgColor)}>
        <div className={cn('text-[#5B36E8]', iconColor)}>
          {icon}
        </div>
      </div>

      {/* Label */}
      <p className="text-sm text-[#6B7280] dark:text-neutral-400 font-normal mb-2">
        {label}
      </p>

      {/* Large Number */}
      <p className="text-[36px] font-bold text-[#111827] dark:text-white mb-1 leading-[44px]">
        {value}
      </p>

      {/* Secondary Info */}
      {secondary && (
        <p className="text-xs text-[#9CA3AF] dark:text-neutral-500 font-normal">
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

