'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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
        default: 'bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl border border-white/20 dark:border-neutral-700/30',
        elevated: 'bg-white/90 dark:bg-neutral-900/90 backdrop-blur-2xl border border-white/30 dark:border-neutral-700/40 shadow-elevation-3',
        outline: 'bg-transparent backdrop-blur-md border-2 border-primary-200/50 dark:border-primary-800/50',
        gradient: 'bg-gradient-to-br from-white/90 to-white/70 dark:from-neutral-900/90 dark:to-neutral-900/70 backdrop-blur-xl border border-white/30 dark:border-neutral-700/40',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      glow: {
        none: '',
        primary: 'hover:shadow-[0_0_30px_rgba(91,54,232,0.15)]',
        accent: 'hover:shadow-[0_0_30px_rgba(30,64,175,0.15)]',
        gold: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
        mint: 'hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
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
  extends React.HTMLAttributes<HTMLDivElement>,
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
    const prefersReducedMotion = useReducedMotion();
    const MotionDiv = hover && !prefersReducedMotion ? motion.div : 'div';

    const motionProps = hover && !prefersReducedMotion
      ? {
          whileHover: { 
            y: -4, 
            scale: 1.02,
            transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
          },
          whileTap: { 
            scale: 0.98,
            transition: { duration: 0.1 }
          },
        }
      : {};

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          glassCardVariants({ variant, size, glow }),
          hover && 'cursor-pointer hover:shadow-elevation-4',
          shimmer &&
            'overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:-translate-x-full hover:before:animate-[shimmer_1.5s_ease-in-out]',
          className
        )}
        {...motionProps}
        {...props}
      >
        {/* Gradient Border Effect */}
        {variant === 'gradient' && (
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/10 via-academic-accent-500/10 to-accent-500/10 -z-10" />
        )}
        
        {children}
      </MotionDiv>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard, glassCardVariants };