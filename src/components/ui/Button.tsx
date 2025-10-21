import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * Class variance authority configuration for button variants. Defines visual styles for different button types, sizes, and states.
 *
 * @variant primary - Modern design system button style (uses btn-primary CSS class)
 * @variant legacy - Legacy gradient button with hover lift effect
 * @variant secondary - Subtle gray button for secondary actions
 * @variant success - Green button for positive actions
 * @variant warning - Yellow/orange button for warning actions
 * @variant danger - Red button for destructive actions
 * @variant outline - Transparent button with border
 * @variant ghost - Minimal button with no border
 * @variant link - Text-only button styled as a link
 *
 * @size xs - 32px height
 * @size sm - 36px height
 * @size md - 40px height (default)
 * @size lg - 48px height
 * @size xl - 56px height
 * @size icon - 40x40px square
 *
 * @fullWidth - Expands button to full container width
 */
// تعريف المتغيرات باستخدام نظام التصميم
const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg',
  {
    variants: {
      variant: {
        primary: 'btn-primary', // النمط الجديد
        // Note: primary-* colors require custom Tailwind theme configuration
        legacy: `bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:shadow-primary-500/30 focus:ring-primary-500 hover:-translate-y-0.5`, // القديم
        secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-400',
        success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-500',
        warning: 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-500',
        danger: 'bg-error-500 text-white hover:bg-error-600 focus:ring-error-500',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-400',
        ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-400',
        link: 'bg-transparent text-primary-600 hover:underline focus:ring-primary-500',
      },
      size: {
        xs: 'h-8 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        md: 'h-10 px-5 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
        icon: 'h-10 w-10 p-0',
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
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        ref={ref}
        {...props}
      >
        {loading ? (
          // Show spinner during loading, hide icons and children
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
