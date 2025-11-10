import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

/**
 * Class variance authority configuration for select dropdown variants. Defines styles for different select types, sizes, and error states.
 * Uses appearance-none to remove default browser select styling and adds custom chevron icon.
 * @variant default - Standard select with gray border and blue focus ring
 * @variant modern - Modern design system select style (uses input-modern CSS class)
 * @size sm - Small size with py-2 px-3 text-sm
 * @size md - Medium size with py-3 px-4 text-base (default)
 * @size lg - Large size with py-4 px-5 text-lg
 * @error true - Applies red border and focus ring when validation fails
 */
const selectVariants = cva(
  'input-modern border transition-colors duration-200 focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed appearance-none bg-white pr-10',
  {
    variants: {
      variant: {
        default: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
        modern: 'input-modern',
      },
      size: {
        sm: 'py-2 px-3 text-sm',
        md: 'py-3 px-4 text-base',
        lg: 'py-4 px-5 text-lg',
      },
      error: {
        true: 'border-red-500 focus:ring-red-500 focus:border-red-500',
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
 * Interface for select dropdown options. Each option requires a unique value and display label.
 * @property value - Unique identifier for the option (submitted with form)
 * @property label - Display text shown to the user
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Props for the Select component extending native select HTML attributes with variant styling and options array.
 * The 'size' prop from HTMLSelectElement is omitted to avoid conflicts with the variant size prop.
 * @property options - Array of SelectOption objects to populate the dropdown
 * @property placeholder - Placeholder text shown when no option is selected (default: 'اختر خياراً')
 * @property error - Shows error styling with red border and focus ring (default: false)
 * @property variant - Visual style variant (default: 'modern')
 * @property size - Select size affecting padding and text size (default: 'md')
 */
export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
  error?: boolean;
}

/**
 * Flexible select dropdown component with custom styling and chevron icon. Removes default browser select appearance for consistent cross-browser styling. Uses class-variance-authority for variant management.
 * @example
 * ```typescript
 * <Select
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 *   placeholder="Select an option"
 * />
 * ```
 * @example
 * ```typescript
 * <Select
 *   error={true}
 *   options={categories}
 *   value={selectedCategory}
 *   onChange={handleChange}
 * />
 * ```
 * @example
 * ```typescript
 * <Select
 *   name="category"
 *   options={categories}
 *   required
 *   size="lg"
 * />
 * ```
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      error,
      options,
      placeholder = 'اختر خياراً',
      ...props
    },
    ref
  ) => {
    return (
      // Wrapper div for positioning the chevron icon absolutely
      <div className="relative">
        <select
          className={cn(selectVariants({ variant, size, error }), className)}
          ref={ref}
          {...props}
        >
          {placeholder && (
            // Disabled placeholder option shown when no selection is made
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          // Render all options from the options array
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        // Chevron down icon positioned absolutely on the right (non-interactive)
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <ChevronDown className="h-5 w-5 text-neutral-500 dark:text-neutral-500" aria-hidden="true" />
        </div>
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
