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
        primary: 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 border border-primary-200 hover:shadow-[0_0_15px_rgba(91,54,232,0.2)]',
        accent: 'bg-gradient-to-r from-accent-50 to-accent-100 text-accent-700 border border-accent-200 hover:shadow-[0_0_15px_rgba(30,64,175,0.2)]',
        gold: 'bg-gradient-to-r from-gold-50 to-gold-100 text-gold-700 border border-gold-200 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
        mint: 'bg-gradient-to-r from-mint-50 to-mint-100 text-mint-700 border border-mint-200 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]',
        success: 'bg-gradient-to-r from-success-50 to-success-100 text-success-700 border border-success-200 hover:shadow-[0_0_15px_rgba(34,197,94,0.2)]',
        warning: 'bg-gradient-to-r from-warning-50 to-warning-100 text-warning-700 border border-warning-200 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]',
        error: 'bg-gradient-to-r from-danger-50 to-danger-100 text-danger-700 border border-danger-200 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]',
        neutral: 'bg-gradient-to-r from-neutral-50 to-neutral-100 text-neutral-700 border border-neutral-200 hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]',
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