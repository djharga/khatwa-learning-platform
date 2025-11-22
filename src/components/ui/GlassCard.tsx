'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * GlassCard - بطاقة زجاجية عصرية مع تأثير Glassmorphism
 * 
 * Features:
 * - Glassmorphism effect with backdrop blur
 * - Gradient borders
 * - Smooth hover animations
 * - Multiple variants (default, elevated, outline)
 * - Glow effects on hover
 */

const glassCardVariants = cva(
  'relative rounded-2xl transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/30',
        elevated: 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-neutral-200/50 dark:border-neutral-700/40 shadow-[0_4px_16px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)]',
        outline: 'bg-transparent backdrop-blur-md border-2 border-primary-300/50 dark:border-primary-700/50',
        gradient: 'bg-gradient-to-br from-white/90 to-white/70 dark:from-neutral-900/90 dark:to-neutral-900/70 backdrop-blur-xl border border-neutral-200/50 dark:border-neutral-700/40',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      glow: {
        none: '',
        primary: 'hover:shadow-[0_0_30px_rgba(79,70,229,0.20)]',
        accent: 'hover:shadow-[0_0_30px_rgba(147,51,234,0.20)]',
        gold: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.20)]',
        mint: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.20)]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      glow: 'none',
    },
  }
);

export interface GlassCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragStart' | 'onDragEnd'>,
    VariantProps<typeof glassCardVariants> {
  hover?: boolean;
  shimmer?: boolean;
}

const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      className,
      variant,
      size,
      glow,
      hover = false,
      shimmer = false,
      children,
      ...props
    },
    ref
  ) => {
    const baseClassName = cn(
      glassCardVariants({ variant, size, glow }),
      hover && 'cursor-pointer hover:shadow-elevation-4 hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.98] active:-translate-y-0.5 card-interactive',
      shimmer &&
        'overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:animate-[shimmer_1.5s_ease-in-out]',
      className
    );

    const gradientOverlay = variant === 'gradient' && (
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 via-primary-400/10 to-accent-500/10 -z-10" />
    );

    return (
      <div
        ref={ref}
        className={baseClassName}
        {...props}
      >
        {gradientOverlay}
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard, glassCardVariants };