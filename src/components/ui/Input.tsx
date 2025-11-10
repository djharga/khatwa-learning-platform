'use client';

import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon, Loader2 } from 'lucide-react';

const inputVariants = cva(
  'w-full border bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-neutral-500 dark:placeholder:text-neutral-500',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500 focus:ring-primary-500/20',
        modern: 'border-neutral-300 dark:border-neutral-700 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-600 focus:border-primary-500 focus:ring-primary-500/30',
        subtle: 'border-transparent bg-neutral-50 dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:ring-primary-500/20',
      },
      size: {
        sm: 'py-2 px-3 text-sm rounded-md',
        md: 'py-2.5 px-4 text-base rounded-lg',
        lg: 'py-3 px-5 text-lg rounded-xl',
      },
      error: {
        true: 'border-danger-500 dark:border-danger-400 focus:ring-danger-500/20 focus:border-danger-500 dark:focus:border-danger-400',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'modern',
      size: 'md',
      error: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  loading?: boolean;
  error?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      type = 'text',
      dir = 'auto',
      ...props
    },
    ref
  ) => {
    const hasLeft = !!LeftIcon;
    const hasRight = !!RightIcon || loading;

    return (
      <div className="relative" dir={dir}>
        {hasLeft && (
          <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
            <LeftIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-500" aria-hidden="true" />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            inputVariants({ variant, size, error }),
            hasLeft && 'ps-10',
            hasRight && 'pe-10',
            className
          )}
          {...props}
        />

        {loading ? (
          <div className="absolute inset-y-0 end-0 pe-3 flex items-center">
            <Loader2 className="h-5 w-5 text-primary-500 animate-spin" />
          </div>
        ) : (
          RightIcon && (
            <div className="absolute inset-y-0 end-0 pe-3 flex items-center pointer-events-none">
              <RightIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-500" aria-hidden="true" />
            </div>
          )
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
