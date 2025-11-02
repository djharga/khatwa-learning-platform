import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Class variance authority configuration for checkbox variants. Defines styles for different checkbox sizes and error states.
 * - Size options: sm (16px), md (20px - default), lg (24px)
 * - Error state: Applies red border and focus ring when validation fails
 * - Default styling: Rounded corners, 2px border, focus ring with offset, disabled opacity
 */
const checkboxVariants = cva(
  'rounded border-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5',
        lg: 'h-6 w-6',
      },
      error: {
        true: 'border-red-500 focus:ring-red-500',
        false: 'border-gray-300 focus:ring-blue-500',
      },
    },
    defaultVariants: {
      size: 'md',
      error: false,
    },
  }
);

/**
 * Props for the Checkbox component extending native input HTML attributes with label, description, and error state support.
 * - label: Optional label text or React node displayed next to the checkbox
 * - description: Optional description text shown below the label in smaller, muted text
 * - error: Shows error styling with red border and focus ring (default: false)
 * - size: Checkbox size (default: 'md')
 * - id: Optional ID for the checkbox. Auto-generated if not provided for label association
 * Note: The 'size' prop from HTMLInputElement is omitted to avoid conflicts with the variant size prop
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string | React.ReactNode;
  description?: string;
  error?: boolean;
}

/**
 * Flexible checkbox component with optional label and description. Automatically generates unique IDs for label association if not provided. Supports RTL layouts with proper spacing.
 * @example
 * <Checkbox
 *   label="Accept terms and conditions"
 *   checked={accepted}
 *   onChange={handleChange}
 * />
 * @example
 * <Checkbox
 *   label="Enable notifications"
 *   description="Receive email updates about your account"
 *   size="lg"
 * />
 * @example
 * <Checkbox
 *   label="Required field"
 *   error={true}
 *   required
 * />
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, size, error, label, description, disabled, id, ...props },
    ref
  ) => {
    // Generate unique ID for label association if not provided
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start space-x-3 rtl:space-x-reverse">
        <input
          type="checkbox"
          id={checkboxId}
          className={cn(
            checkboxVariants({ size, error }),
            'mt-0.5 bg-white text-primary focus:ring-primary',
            className
          )}
          disabled={disabled}
          ref={ref}
          {...props}
        />
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'text-sm font-medium leading-none cursor-pointer',
                  disabled && 'opacity-50 cursor-not-allowed',
                  'text-gray-900'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
