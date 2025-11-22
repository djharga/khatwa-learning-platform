'use client';

import React, { forwardRef, useState } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const inputVariants = cva(
  'w-full border bg-white text-[#111827] rounded-[10px] transition-all duration-300 ease-out placeholder:text-[#9CA3AF] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] dark:bg-neutral-800 dark:text-white dark:placeholder:text-neutral-500 direction-rtl unicode-bidi-plaintext will-change-transform',
  {
    variants: {
      variant: {
        default: 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#5B36E8] focus:ring-[3px] focus:ring-[rgba(91,54,232,0.1)]',
        error: 'border-[#EF4444] bg-[#FEF2F2] focus:border-[#EF4444] focus:ring-[3px] focus:ring-[rgba(239,68,68,0.1)] dark:bg-red-900/10',
        success: 'border-[#10B981] bg-[#F0FDF4] focus:border-[#10B981] focus:ring-[3px] focus:ring-[rgba(16,185,129,0.1)] dark:bg-green-900/10',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-[48px] px-4 py-2 text-base min-h-[48px]',
        lg: 'h-12 px-5 py-3 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
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
  success?: boolean;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  label?: string;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      success,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      helperText,
      errorMessage,
      successMessage,
      label,
      required,
      type = 'text',
      dir = 'rtl',
      id,
      ...props
    },
    ref
  ) => {
    const hasLeft = !!LeftIcon;
    const hasRight = !!RightIcon || loading;
    const [isFocused, setIsFocused] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    // Determine variant based on error/success states
    let inputVariant: 'default' | 'error' | 'success' = variant || 'default';
    if (error) inputVariant = 'error';
    if (success) inputVariant = 'success';

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full" dir={dir}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[#111827] dark:text-white mb-2"
          >
            {label}
            {required && <span className="text-[#EF4444] mr-1">*</span>}
          </label>
        )}

        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {hasLeft && (
            <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
              <LeftIcon className="h-5 w-5 text-[#6B7280] dark:text-neutral-400" aria-hidden="true" />
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              inputVariants({ variant: inputVariant, size }),
              hasLeft && 'ps-10',
              hasRight && 'pe-10',
              !prefersReducedMotion && 'focus:scale-[1.01] transition-transform duration-200',
              className
            )}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={
              error && errorMessage
                ? `${inputId}-error`
                : success && successMessage
                  ? `${inputId}-success`
                  : helperText
                    ? `${inputId}-helper`
                    : undefined
            }
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {/* Right Icon / Loading / Status */}
          {hasRight && (
            <div className="absolute inset-y-0 end-0 pe-3 flex items-center pointer-events-none">
              {loading ? (
                <Loader2 className="h-5 w-5 text-[#5B36E8] animate-spin" aria-label="جاري التحميل" />
              ) : error ? (
                <AlertCircle className="h-5 w-5 text-[#EF4444]" aria-hidden="true" />
              ) : success ? (
                <CheckCircle2 className="h-5 w-5 text-[#10B981]" aria-hidden="true" />
              ) : RightIcon ? (
                <RightIcon className="h-5 w-5 text-[#6B7280] dark:text-neutral-400" aria-hidden="true" />
              ) : null}
            </div>
          )}
        </div>

        {/* Helper Text / Error Message / Success Message */}
        <AnimatePresence>
          {(helperText || errorMessage || successMessage) && (
            <motion.div
              id={
                error && errorMessage
                  ? `${inputId}-error`
                  : success && successMessage
                    ? `${inputId}-success`
                    : helperText
                      ? `${inputId}-helper`
                      : undefined
              }
              initial={!prefersReducedMotion ? { opacity: 0, y: -5 } : {}}
              animate={!prefersReducedMotion ? { opacity: 1, y: 0 } : {}}
              exit={!prefersReducedMotion ? { opacity: 0, y: -5 } : {}}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'mt-1 flex items-center gap-1.5 text-xs',
                error && errorMessage
                  ? 'text-[#EF4444]'
                  : success && successMessage
                    ? 'text-[#10B981]'
                    : 'text-[#6B7280] dark:text-neutral-400'
              )}
            >
              {error && errorMessage && (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
                  </motion.div>
                  <span>{errorMessage}</span>
                </>
              )}
              {success && successMessage && (
                <>
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0" />
                  </motion.div>
                  <span>{successMessage}</span>
                </>
              )}
              {!error && !success && helperText && <span>{helperText}</span>}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
