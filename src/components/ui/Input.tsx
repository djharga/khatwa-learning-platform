import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

/**
 * Class variance authority configuration for input field variants. Defines styles for different input types, sizes, and error states.
 * 
 * @variant default - Standard input with gray border and blue focus ring
 * @variant modern - Modern design system input style (uses input-modern CSS class)
 * @size sm - Small size
 * @size md - Medium size (default)
 * @size lg - Large size
 * @error true - Applies red border and focus ring when validation fails
 */
const inputVariants = cva(
  'w-full border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 rounded-lg transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 dark:border-neutral-600 focus:border-primary-500 focus:ring-primary-500/20',
        modern: 'border-neutral-300 dark:border-neutral-600 focus:border-primary-500 focus:ring-primary-500/20 shadow-sm hover:border-neutral-400 dark:hover:border-neutral-500',
      },
      size: {
        sm: 'py-2 px-3 text-sm rounded-md',
        md: 'py-2.5 px-4 text-base rounded-lg',
        lg: 'py-3 px-5 text-lg rounded-lg',
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

/**
 * Props for the Input component extending native input HTML attributes with variant styling and icon support.
 * 
 * @prop leftIcon - Optional Lucide icon component to display on the left side of the input
 * @prop rightIcon - Optional Lucide icon component to display on the right side of the input
 * @prop error - Shows error styling with red border and focus ring (default: false)
 * @prop variant - Visual style variant (default: 'modern')
 * @prop size - Input size affecting padding and text size (default: 'md')
 * 
 * Note: The 'size' prop from HTMLInputElement is omitted to avoid conflicts with the variant size prop
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: LucideIcon;
  rightIcon?: LucideIcon;
  error?: boolean;
}

/**
 * Flexible input component with icon support, error states, and multiple size variants. Icons are automatically positioned with proper spacing. Uses class-variance-authority for consistent variant management.
 * 
 * @example
 * <Input
 *   type="email"
 *   placeholder="Enter your email"
 *   variant="modern"
 * />
 * 
 * @example
 * <Input
 *   leftIcon={Search}
 *   placeholder="Search..."
 *   size="md"
 * />
 * 
 * @example
 * <Input
 *   error={true}
 *   value={email}
 *   onChange={handleChange}
 * />
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      size,
      error,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      type = 'text',
      ...props
    },
    ref
  ) => {
    // Check if any icon is provided to adjust input padding
    const hasIcon = LeftIcon || RightIcon;

    return (
      <div className="relative">
        {LeftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LeftIcon className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, size, error }),
            hasIcon && LeftIcon && 'pl-10',
            hasIcon && RightIcon && 'pr-10',
            className
          )}
          ref={ref}
          {...props}
        />
        {RightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <RightIcon className="h-5 w-5 text-neutral-400 dark:text-neutral-500" />
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
