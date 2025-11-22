'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Card component with academic design system from agent.md
 * Background: #FFFFFF
 * Border: 1px solid #E5E7EB
 * Border-radius: 14px (radius-lg)
 * Padding: space-6 (24px)
 * Box-shadow: elevation-2 (default), elevation-3 (hover)
 */
const cardVariants = cva(
  'bg-white border rounded-[16px] transition-all duration-300 ease-out dark:bg-neutral-800 dark:border-neutral-700 will-change-transform',
  {
    variants: {
      variant: {
        default: 'border-neutral-100 bg-white shadow-sm hover:shadow-md dark:bg-neutral-800 dark:border-neutral-700',
        elevated: 'border-transparent bg-white shadow-md hover:shadow-lg dark:bg-neutral-800 dark:border-neutral-700',
        outline: 'border-neutral-200 bg-transparent hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800',
        glass: 'bg-white/70 backdrop-blur-md border-white/20 shadow-sm hover:shadow-md dark:bg-neutral-900/60 dark:border-white/10',
      },
      size: {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
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
      elevation: 1,
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
    const glowColors = {
      true: 'hover:shadow-[0_4px_16px_rgba(91,54,232,0.15)]',
      primary: 'hover:shadow-[0_4px_16px_rgba(91,54,232,0.15)]',
      accent: 'hover:shadow-[0_4px_16px_rgba(109,74,255,0.15)]',
      success: 'hover:shadow-[0_4px_16px_rgba(16,185,129,0.15)]',
      warning: 'hover:shadow-[0_4px_16px_rgba(245,158,11,0.15)]',
      error: 'hover:shadow-[0_4px_16px_rgba(239,68,68,0.15)]',
      false: '',
    };

    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({ variant, size, elevation }),
          hover && 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] cursor-pointer hover:-translate-y-1 hover:scale-[1.02] active:scale-[0.97] active:translate-y-0',
          shimmer &&
          'relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:animate-[shimmer_1.5s_linear_infinite]',
          glow && glowColors[glow as keyof typeof glowColors],
          'relative overflow-hidden will-change-transform transition-transform duration-300 ease-out',
          className
        )}
        {...props}
      >
        <div className="relative z-10">{children}</div>
      </div>
    );
  }
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-white', className)}
    dir="rtl"
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed', className)}
    dir="rtl"
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
