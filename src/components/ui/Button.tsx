import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * MODERN BUTTON COMPONENT
 * تصميم عصري مع أحدث معايير التصميم (2024-2025)
 * 
 * Features:
 * - تصميم عصري وأنيق مع انتقالات بسيطة
 * - دعم كامل للوضع المظلم
 * - تحسينات الوصول (Accessibility)
 * - انتقالات CSS سلسة بدون حركة مفرطة
 * - ظلال متدرجة وحدود محسّنة
 * - دعم التدرجات اللونية الحديثة
 *
 * @variant primary - زر أساسي بتدرج لوني حديث
 * @variant secondary - زر ثانوي بأسلوب عصري
 * @variant outline - زر بحدود مع انتقالات سلسة
 * @variant ghost - زر شفاف مع تأثيرات خفيفة
 * @variant success - زر نجاح بتصميم عصري
 * @variant warning - زر تحذير
 * @variant danger - زر خطر
 * @variant link - زر رابط نصي
 */

const buttonVariants = cva(
  // Base styles: Modern foundation with smooth transitions
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl border-2 transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed select-none relative overflow-hidden',
  {
    variants: {
      variant: {
        // Primary: Modern gradient with subtle effects
        primary: [
          'bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600',
          'dark:from-indigo-500 dark:via-indigo-400 dark:to-indigo-500',
          'text-white border-indigo-700 dark:border-indigo-400',
          'shadow-lg shadow-indigo-500/25',
          'hover:shadow-xl hover:shadow-indigo-500/40',
          'hover:from-indigo-700 hover:via-indigo-600 hover:to-indigo-700',
          'dark:hover:from-indigo-400 dark:hover:via-indigo-300 dark:hover:to-indigo-400',
          'active:scale-[0.98]',
          'focus:ring-indigo-500/50 focus:ring-offset-2',
        ].join(' '),
        
        // Secondary: Modern solid button with depth
        secondary: [
          'bg-neutral-100 dark:bg-neutral-800',
          'text-neutral-900 dark:text-neutral-100',
          'border-neutral-300 dark:border-neutral-700',
          'shadow-sm hover:shadow-md',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700',
          'active:scale-[0.98]',
          'focus:ring-gray-500/50 focus:ring-offset-2',
        ].join(' '),
        
        // Outline: Clean border style with smooth fill
        outline: [
          'bg-transparent',
          'border-indigo-600 dark:border-indigo-400',
          'text-indigo-600 dark:text-indigo-400',
          'hover:bg-indigo-50 dark:hover:bg-indigo-900/20',
          'hover:border-indigo-700 dark:hover:border-indigo-300',
          'hover:text-indigo-700 dark:hover:text-indigo-300',
          'shadow-sm hover:shadow-md',
          'active:scale-[0.98]',
          'focus:ring-indigo-500/50 focus:ring-offset-2',
        ].join(' '),
        
        // Ghost: Minimal style with subtle background
        ghost: [
          'bg-transparent border-transparent',
          'text-neutral-700 dark:text-neutral-300',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'hover:text-indigo-600 dark:hover:text-indigo-400',
          'active:scale-[0.98]',
          'focus:ring-gray-500/20 focus:ring-offset-2',
        ].join(' '),
        
        // Success: Modern green variant
        success: [
          'bg-gradient-to-r from-emerald-600 to-emerald-500',
          'dark:from-emerald-500 dark:to-emerald-400',
          'text-white border-emerald-700 dark:border-emerald-400',
          'shadow-lg shadow-emerald-500/25',
          'hover:shadow-xl hover:shadow-emerald-500/40',
          'hover:from-emerald-700 hover:to-emerald-600',
          'dark:hover:from-emerald-400 dark:hover:to-emerald-300',
          'active:scale-[0.98]',
          'focus:ring-emerald-500/50 focus:ring-offset-2',
        ].join(' '),
        
        // Warning: Modern amber variant
        warning: [
          'bg-gradient-to-r from-amber-500 to-amber-400',
          'dark:from-amber-400 dark:to-amber-300',
          'text-white border-amber-600 dark:border-amber-400',
          'shadow-lg shadow-amber-500/25',
          'hover:shadow-xl hover:shadow-amber-500/40',
          'hover:from-amber-600 hover:to-amber-500',
          'dark:hover:from-amber-400 dark:hover:to-amber-300',
          'active:scale-[0.98]',
          'focus:ring-amber-500/50 focus:ring-offset-2',
        ].join(' '),
        
        // Danger: Modern red variant
        danger: [
          'bg-gradient-to-r from-red-600 to-red-500',
          'dark:from-red-500 dark:to-red-400',
          'text-white border-red-700 dark:border-red-400',
          'shadow-lg shadow-red-500/25',
          'hover:shadow-xl hover:shadow-red-500/40',
          'hover:from-red-700 hover:to-red-600',
          'dark:hover:from-red-400 dark:hover:to-red-300',
          'active:scale-[0.98]',
          'focus:ring-red-500/50 focus:ring-offset-2',
        ].join(' '),
        
        // Link: Text button style
        link: [
          'bg-transparent border-transparent',
          'text-indigo-600 dark:text-indigo-400',
          'hover:text-indigo-700 dark:hover:text-indigo-300',
          'hover:underline underline-offset-4',
          'shadow-none',
          'focus:ring-indigo-500/50 focus:ring-offset-2',
          'p-0',
        ].join(' '),

        // Legacy brutalist variants (backward compatibility)
        brutalist: [
          'bg-indigo-600 text-white border-indigo-700 shadow-lg',
          'hover:bg-indigo-700 hover:shadow-xl',
          'active:scale-[0.98]',
          'focus:ring-indigo-500/50',
        ].join(' '),
        'brutalist-secondary': [
          'bg-neutral-100 text-neutral-900 border-neutral-300 dark:border-neutral-700 shadow-md',
          'hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:shadow-lg',
          'active:scale-[0.98]',
          'focus:ring-gray-500/50',
        ].join(' '),
        'brutalist-outline': [
          'bg-transparent text-indigo-600 border-indigo-600',
          'hover:bg-indigo-50 hover:border-indigo-700',
          'active:scale-[0.98]',
          'focus:ring-indigo-500/50',
        ].join(' '),
        'brutalist-ghost': [
          'bg-transparent text-neutral-700 dark:text-neutral-300 border-transparent',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'focus:ring-gray-500/20',
        ].join(' '),
        'brutalist-danger': [
          'bg-red-600 text-white border-red-700 shadow-lg',
          'hover:bg-red-700 hover:shadow-xl',
          'active:scale-[0.98]',
          'focus:ring-red-500/50',
        ].join(' '),
      },
      size: {
        xs: 'h-8 px-3 text-xs rounded-lg',
        sm: 'h-10 px-4 text-sm rounded-lg',
        md: 'h-12 px-6 text-base rounded-xl',
        lg: 'h-14 px-8 text-lg rounded-xl',
        xl: 'h-16 px-10 text-xl rounded-2xl',
        icon: 'h-12 w-12 p-0 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
);

/**
 * Props for the Button component extending native button HTML attributes with variant styling options.
 *
 * @prop leftIcon - Optional icon element to display before button text
 * @prop rightIcon - Optional icon element to display after button text
 * @prop loading - Shows loading spinner and disables button when true
 * @prop variant - Visual style variant (default: 'primary')
 * @prop size - Button size (default: 'md')
 * @prop fullWidth - Expands button to full width (default: false)
 * @prop children - Button content (text, icons, or other elements)
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  loading?: boolean;
  children?: React.ReactNode;
}

/**
 * Flexible button component with multiple variants, sizes, and states. Supports loading state with spinner, left/right icons, and full-width layout. Uses class-variance-authority for consistent variant management.
 *
 * @example
 * ```typescript
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 *
 * @example
 * ```typescript
 * <Button loading={true} disabled={true}>
 *   Saving...
 * </Button>
 * ```
 *
 * @example
 * ```typescript
 * <Button leftIcon={<Save />} variant="success">
 *   Save Changes
 * </Button>
 * ```
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      leftIcon,
      rightIcon,
      loading = false,
      disabled,
      fullWidth,
      children,
      ...props
    },
    ref
  ) => {
    // Disable button when explicitly disabled or in loading state
    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, fullWidth }),
          'motion-safe:transition-all motion-reduce:transition-none',
          className
        )}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading ? (
          // Show spinner during loading, hide icons and children
          <Loader2 className="h-5 w-5 animate-spin" aria-label="جاري التحميل" />
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex items-center shrink-0" aria-hidden="true">
                {leftIcon}
              </span>
            )}
            {children && <span className="whitespace-nowrap">{children}</span>}
            {rightIcon && (
              <span className="inline-flex items-center shrink-0" aria-hidden="true">
                {rightIcon}
              </span>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
