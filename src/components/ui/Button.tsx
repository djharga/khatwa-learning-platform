import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

/**
 * BRUTALIST ELEGANCE BUTTON COMPONENT
 * Master architect Kain's design philosophy: Brutal, honest structure with impeccable execution
 * 
 * A solid block of power that commands respect through sheer presence.
 * No compromises. Raw. Strong. Unbreakable structure.
 *
 * @variant brutalist - The primary brutalist button: solid blue block with hard shadow
 * @variant brutalist-secondary - Concrete block with steel text
 * @variant brutalist-outline - Steel frame with void interior
 * @variant brutalist-ghost - Minimal steel text on concrete
 * @variant brutalist-danger - Warning red block for destructive actions
 * 
 * Legacy variants maintained for backward compatibility
 */

// BRUTALIST BUTTON VARIANTS: Monolithic blocks of digital concrete
const buttonVariants = cva(
  // Base: Uncompromising foundation
  'inline-flex items-center justify-center gap-brutalist-2 font-brutalist-body font-bold uppercase tracking-wide border-brutalist border-brutalist-steel transition-brutalist focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none',
  {
    variants: {
      variant: {
        // THE BRUTALIST CORE: Solid blocks of power
        brutalist: [
          'bg-brutalist-power text-brutalist-pure',
          'shadow-brutalist border-brutalist-void',
          'hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-pressed',
          'active:translate-x-1 active:translate-y-1 active:shadow-brutalist-pressed',
          'focus:ring-2 focus:ring-brutalist-void focus:ring-offset-2'
        ].join(' '),
        
        'brutalist-secondary': [
          'bg-brutalist-concrete text-brutalist-steel',
          'shadow-brutalist border-brutalist-steel',
          'hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-pressed',
          'active:translate-x-1 active:translate-y-1 active:shadow-brutalist-pressed',
          'focus:ring-2 focus:ring-brutalist-steel focus:ring-offset-2'
        ].join(' '),
        
        'brutalist-outline': [
          'bg-brutalist-concrete text-brutalist-steel border-brutalist-steel',
          'shadow-brutalist',
          'hover:bg-brutalist-steel hover:text-brutalist-pure',
          'hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-pressed',
          'active:translate-x-1 active:translate-y-1 active:shadow-brutalist-pressed',
          'focus:ring-2 focus:ring-brutalist-steel focus:ring-offset-2'
        ].join(' '),
        
        'brutalist-ghost': [
          'bg-transparent text-brutalist-steel border-transparent',
          'hover:bg-brutalist-concrete hover:border-brutalist-steel hover:shadow-brutalist-sm',
          'focus:ring-2 focus:ring-brutalist-steel focus:ring-offset-2'
        ].join(' '),
        
        'brutalist-danger': [
          'bg-red-600 text-brutalist-pure border-brutalist-void',
          'shadow-brutalist',
          'hover:translate-x-1 hover:translate-y-1 hover:shadow-brutalist-pressed',
          'active:translate-x-1 active:translate-y-1 active:shadow-brutalist-pressed',
          'focus:ring-2 focus:ring-red-600 focus:ring-offset-2'
        ].join(' '),

        // LEGACY VARIANTS: Maintained for backward compatibility
        primary: 'bg-primary-600 text-white border-primary-700 shadow-lg hover:bg-primary-700 focus:ring-primary-500',
        secondary: 'bg-gray-100 text-gray-800 border-gray-300 hover:bg-gray-200 focus:ring-gray-400',
        success: 'bg-green-600 text-white border-green-700 hover:bg-green-700 focus:ring-green-500',
        warning: 'bg-yellow-500 text-white border-yellow-600 hover:bg-yellow-600 focus:ring-yellow-400',
        danger: 'bg-red-600 text-white border-red-700 hover:bg-red-700 focus:ring-red-500',
        outline: 'border-gray-300 bg-transparent hover:bg-gray-50 focus:ring-gray-400',
        ghost: 'bg-transparent hover:bg-gray-100 focus:ring-gray-400 border-transparent',
        link: 'bg-transparent text-primary-600 hover:underline focus:ring-primary-500 border-transparent',
      },
      size: {
        // BRUTALIST SIZES: Based on 4px grid system
        xs: 'h-brutalist-8 px-brutalist-3 text-xs',
        sm: 'h-brutalist-12 px-brutalist-4 text-sm',
        md: 'h-brutalist-16 px-brutalist-6 text-base',
        lg: 'h-20 px-brutalist-8 text-lg',
        xl: 'h-24 px-brutalist-12 text-xl',
        icon: 'h-brutalist-16 w-brutalist-16 p-0',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'brutalist',
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
