'use client';

import * as React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 shadow-sm hover:shadow-md',
        destructive:
          'bg-danger-600 text-white hover:bg-danger-700 dark:bg-danger-500 dark:hover:bg-danger-600 shadow-sm hover:shadow-md',
        outline:
          'border border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 dark:border-primary-500 dark:text-primary-400',
        secondary:
          'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-600',
        ghost:
          'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-neutral-100',
        link: 'text-primary-600 underline-offset-4 hover:underline dark:text-primary-400',
        success:
          'bg-success-600 text-white hover:bg-success-700 dark:bg-success-500 dark:hover:bg-success-600 shadow-sm hover:shadow-md',
        warning:
          'bg-warning-600 text-white hover:bg-warning-700 dark:bg-warning-500 dark:hover:bg-warning-600 shadow-sm hover:shadow-md',
        info:
          'bg-info-600 text-white hover:bg-info-700 dark:bg-info-500 dark:hover:bg-info-600 shadow-sm hover:shadow-md',
        gradient:
          'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-sm hover:shadow-md hover:from-primary-700 hover:to-accent-700',
      },
      size: {
        default: 'h-10 px-4 py-2 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  asChild?: boolean;
  animate?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading,
      disabled,
      children,
      animate = true,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    if (animate) {
      return (
        <motion.button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          disabled={isDisabled}
          whileHover={!isDisabled ? { scale: 1.02 } : {}}
          whileTap={!isDisabled ? { scale: 0.98 } : {}}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          {...(props as MotionProps)}
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {children}
        </motion.button>
      );
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };

