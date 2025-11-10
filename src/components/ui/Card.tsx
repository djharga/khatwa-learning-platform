'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const cardVariants = cva(
  'relative overflow-hidden transition-all duration-200 ease-out will-change-transform backface-hidden rounded-xl isolate',
  {
    variants: {
      variant: {
        default:
          'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.08)]',
        elevated:
          'bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_6px_26px_rgba(0,0,0,0.2)]',
        outlined:
          'bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-500/70',
        ghost:
          'bg-neutral-50/70 dark:bg-neutral-800/50 hover:bg-neutral-100/60 dark:hover:bg-neutral-700/50 shadow-none',
        glass:
          'bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-white/20 dark:border-neutral-700/30 shadow-[0_8px_32px_rgba(0,0,0,0.15)] hover:backdrop-blur-lg',
        gradient:
          'bg-gradient-to-br from-primary-600 via-primary-500 to-indigo-600 text-white shadow-[0_4px_20px_rgba(79,70,229,0.3)] hover:shadow-[0_6px_30px_rgba(79,70,229,0.45)]',
        bordered:
          'bg-white dark:bg-neutral-900 border-2 border-primary-400/60 dark:border-primary-600/60 hover:border-primary-400 shadow-md hover:shadow-lg',
        interactive:
          'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 hover:shadow-lg cursor-pointer active:scale-[0.98] transition-transform duration-150',
        compact:
          'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md rounded-lg',
        spacious:
          'bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-xl rounded-2xl',
      },
      size: {
        xs: 'p-3 rounded-lg',
        sm: 'p-4 rounded-xl',
        md: 'p-6 rounded-xl',
        lg: 'p-8 rounded-2xl',
        xl: 'p-10 rounded-3xl',
      },
      elevation: {
        0: 'shadow-none',
        1: 'shadow-sm',
        2: 'shadow-md',
        3: 'shadow-lg',
        4: 'shadow-xl',
        5: 'shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      elevation: 2,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  shimmer?: boolean;
  glow?: boolean | 'primary' | 'accent' | 'success' | 'warning' | 'error';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      elevation,
      hover = false,
      shimmer = false,
      glow = false,
      children,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const MotionDiv = hover && !prefersReducedMotion ? motion.div : 'div';

    const motionProps = hover && !prefersReducedMotion
      ? {
          whileHover: { scale: 1.02, y: -3 },
          whileTap: { scale: 0.98 },
          transition: { duration: 0.2, ease: 'easeOut' },
        }
      : {};

    const glowColors = {
      true: 'hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]',
      primary: 'hover:shadow-[0_0_25px_rgba(79,70,229,0.4)]',
      accent: 'hover:shadow-[0_0_25px_rgba(147,51,234,0.4)]',
      success: 'hover:shadow-[0_0_25px_rgba(22,163,74,0.4)]',
      warning: 'hover:shadow-[0_0_25px_rgba(250,204,21,0.5)]',
      error: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.5)]',
      false: '',
    };

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          cardVariants({ variant, size, elevation }),
          shimmer &&
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent before:translate-x-[-100%] hover:before:animate-[shimmer_2s_linear_infinite]',
          glow && glowColors[glow as keyof typeof glowColors],
          'relative overflow-hidden will-change-transform',
          className
        )}
        {...(hover ? (motionProps as any) : {})}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </MotionDiv>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-2xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white', className)}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-neutral-600 dark:text-neutral-500', className)}
      {...props}
    />
  )
);
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center justify-between p-6 pt-0', className)} {...props} />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
