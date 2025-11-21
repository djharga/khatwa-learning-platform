'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * AcademicBadge - شارة أكاديمية أنيقة
 * 
 * Features:
 * - Multiple color variants
 * - Optional icon
 * - Different sizes
 * - Gradient backgrounds
 * - Glow effects
 */

const academicBadgeVariants = cva(
  'inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-200',
  {
    variants: {
      variant: {
        primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800 hover:shadow-[0_0_15px_rgba(79,70,229,0.2)]',
        accent: 'bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 border border-accent-200 dark:border-accent-800 hover:shadow-[0_0_15px_rgba(147,51,234,0.2)]',
        gold: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
        mint: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
        success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]',
        warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
        error: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]',
        neutral: 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]',
      },
      size: {
        sm: 'px-3 py-1 text-xs',
        md: 'px-4 py-1.5 text-sm',
        lg: 'px-5 py-2 text-base',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      glow: false,
    },
  }
);

export interface AcademicBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof academicBadgeVariants> {
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
}

const AcademicBadge = React.forwardRef<HTMLSpanElement, AcademicBadgeProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      icon: Icon,
      iconPosition = 'left',
      children,
      ...props
    },
    ref
  ) => {
    const iconSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

    return (
      <span
        ref={ref}
        className={cn(academicBadgeVariants({ variant, size, glow }), className)}
        {...props}
      >
        {Icon && iconPosition === 'left' && <Icon size={iconSize} />}
        {children}
        {Icon && iconPosition === 'right' && <Icon size={iconSize} />}
      </span>
    );
  }
);

AcademicBadge.displayName = 'AcademicBadge';

export { AcademicBadge, academicBadgeVariants };