'use client';

import * as React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold tracking-tight select-none rounded-xl min-h-[44px] min-w-[44px] transition-all duration-[200ms] ease-out focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none will-change-transform active:brightness-110 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 text-white shadow-elevation-2 hover:shadow-elevation-4 hover:brightness-[1.08] dark:from-primary-500 dark:to-primary-600',
        destructive:
          'bg-gradient-to-br from-red-600 to-red-700 text-white shadow-[0_4px_12px_rgba(239,68,68,0.3)] hover:shadow-[0_6px_18px_rgba(239,68,68,0.4)] hover:brightness-[1.08]',
        outline:
          'border-2 border-primary-500 text-primary-600 dark:text-primary-300 bg-transparent hover:bg-primary-50/70 dark:hover:bg-primary-900/30 hover:shadow-elevation-1',
        secondary:
          'bg-neutral-200 text-neutral-900 hover:bg-neutral-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-100 shadow-elevation-1 hover:shadow-elevation-2',
        ghost:
          'bg-transparent text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70',
        link:
          'text-primary-600 underline underline-offset-4 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 p-0 min-h-0 min-w-0',
        success:
          'bg-gradient-to-br from-green-600 to-green-700 text-white shadow-[0_4px_12px_rgba(22,163,74,0.3)] hover:shadow-[0_6px_18px_rgba(22,163,74,0.4)]',
        warning:
          'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-[0_4px_12px_rgba(250,204,21,0.25)] hover:shadow-[0_6px_18px_rgba(250,204,21,0.35)]',
        info:
          'bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-[0_4px_12px_rgba(14,165,233,0.3)] hover:shadow-[0_6px_18px_rgba(14,165,233,0.4)]',
        gradient:
          'bg-[linear-gradient(135deg,var(--tw-gradient-stops))] from-primary-600 via-indigo-500 to-accent-600 text-white shadow-[0_4px_14px_rgba(99,102,241,0.25)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.35)] hover:brightness-[1.1]',
      },
      size: {
        default: 'h-10 px-5 py-2 text-sm',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
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
  animate?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, animate = true, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    const isDisabled = disabled || loading;
    const shouldAnimate = animate && !prefersReducedMotion;

    const content = (
      <>
        {loading && (
          <Loader2
            className="h-4 w-4 animate-spin text-current opacity-90"
            aria-hidden="true"
            aria-label="جاري التحميل"
          />
        )}
        {children}
      </>
    );

    return shouldAnimate ? (
      <motion.button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.04, y: -1.5 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        {...(props as MotionProps)}
      >
        {content}
      </motion.button>
    ) : (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
