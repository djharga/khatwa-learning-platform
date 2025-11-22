'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold select-none rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 disabled:pointer-events-none disabled:cursor-not-allowed no-underline direction-rtl transition-all duration-300 ease-out isolate z-0 will-change-transform',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-primary-sm hover:shadow-primary-md hover:scale-[1.02] active:scale-[0.98] border border-transparent',
        secondary:
          'bg-white text-primary-700 border border-neutral-200 shadow-sm hover:bg-primary-50 hover:border-primary-200 hover:text-primary-800 active:scale-[0.98] dark:bg-neutral-800 dark:text-primary-300 dark:border-neutral-700',
        ghost:
          'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 active:scale-[0.98] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
        destructive:
          'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        success:
          'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        warning:
          'bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        info:
          'bg-gradient-to-r from-sky-500 to-sky-400 text-white shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98]',
        icon:
          'bg-transparent text-neutral-500 w-10 h-10 p-0 min-w-[40px] min-h-[40px] rounded-full hover:bg-neutral-100 hover:text-primary-600 active:scale-90 transition-transform',
      },
      size: {
        sm: 'h-[36px] px-4 py-2 text-sm min-h-[36px]',
        default: 'h-[48px] px-6 py-3 text-base min-h-[48px]',
        lg: 'h-[56px] px-8 py-4 text-lg min-h-[56px]',
        icon: 'h-10 w-10 p-0 min-h-[40px] min-w-[40px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'ref' | 'children'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          !isDisabled && 'hover:scale-105 hover:shadow-[0px_5px_10px_rgba(0,0,0,0.1)] active:scale-95'
        )}
        data-component="button"
        disabled={isDisabled}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">
          {loading && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Loader2
                className="h-4 w-4 animate-spin text-current opacity-90"
                aria-hidden="true"
                aria-label="جاري التحميل"
              />
            </motion.span>
          )}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
