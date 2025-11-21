'use client';

import * as React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold select-none rounded-[10px] transition-all duration-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[#5B36E8] focus-visible:ring-opacity-30 disabled:pointer-events-none disabled:cursor-not-allowed motion-reduce:transition-none will-change-transform no-underline hover:no-underline direction-rtl unicode-bidi-plaintext',
  {
    variants: {
      variant: {
        default:
          'bg-[#5B36E8] text-white hover:bg-[#6D4AFF] active:bg-[#4C2EC7] hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] active:shadow-[0_1px_4px_rgba(0,0,0,0.06)] disabled:bg-[#D1D5DB] disabled:text-[#9CA3AF]',
        secondary:
          'bg-transparent text-[#5B36E8] border-[1.5px] border-[#5B36E8] hover:bg-[#F7F8FC] hover:border-[#6D4AFF] active:bg-[#EDE9FE] focus-visible:ring-[#5B36E8] focus-visible:ring-opacity-20 dark:text-[#6D4AFF] dark:border-[#6D4AFF] dark:hover:bg-neutral-800',
        ghost:
          'bg-transparent text-[#6B7280] hover:bg-[#F7F8FC] hover:text-[#111827] active:bg-[#E5E7EB] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
        destructive:
          'bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C] hover:shadow-[0_2px_8px_rgba(239,68,68,0.3)] active:shadow-[0_1px_4px_rgba(239,68,68,0.2)]',
        success:
          'bg-[#10B981] text-white hover:bg-[#059669] active:bg-[#047857] hover:shadow-[0_2px_8px_rgba(16,185,129,0.3)] active:shadow-[0_1px_4px_rgba(16,185,129,0.2)]',
        warning:
          'bg-[#F59E0B] text-white hover:bg-[#D97706] active:bg-[#B45309] hover:shadow-[0_2px_8px_rgba(245,158,11,0.3)] active:shadow-[0_1px_4px_rgba(245,158,11,0.2)]',
        info:
          'bg-[#3B82F6] text-white hover:bg-[#2563EB] active:bg-[#1D4ED8] hover:shadow-[0_2px_8px_rgba(59,130,246,0.3)] active:shadow-[0_1px_4px_rgba(59,130,246,0.2)]',
        icon:
          'bg-transparent text-[#6B7280] hover:bg-[#F7F8FC] hover:text-[#111827] w-10 h-10 p-0 min-w-[40px] min-h-[40px] dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white',
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
        whileHover={!isDisabled ? { y: -1 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
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
