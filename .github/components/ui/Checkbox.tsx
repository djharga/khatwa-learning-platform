import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

/**
 * Checkbox component with academic design system from agent.md
 * Size: 20px × 20px
 * Border: 2px solid #D1D5DB (unchecked)
 * Border-radius: 6px
 * Background: #5B36E8 (checked)
 * Checkmark: White, animated scale
 */
const checkboxVariants = cva(
  'relative appearance-none cursor-pointer border-2 rounded-[6px] transition-all duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(91,54,232,0.2)] disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-5 w-5', // Default 20px from agent.md
        lg: 'h-6 w-6',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof checkboxVariants> {
  label?: string | React.ReactNode;
  description?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { className, size, label, description, disabled, id, checked, ...props },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex items-start gap-2" dir="rtl">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            className={cn(
              checkboxVariants({ size }),
              // Unchecked state
              'border-[#D1D5DB] bg-white hover:border-[#B5B5B5]',
              // Checked state
              checked && 'border-[#5B36E8] bg-[#5B36E8] hover:border-[#6D4AFF] hover:bg-[#6D4AFF]',
              disabled && 'bg-[#F3F4F6] border-[#E5E7EB]',
              className
            )}
            disabled={disabled}
            checked={checked}
            ref={ref}
            {...props}
          />
          {/* Checkmark Icon - White, animated scale */}
          {checked && (
            <Check
              className={cn(
                'absolute inset-0 flex items-center justify-center text-white pointer-events-none',
                size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5',
                'transition-transform duration-200',
                checked ? 'scale-100' : 'scale-0'
              )}
              strokeWidth={3}
            />
          )}
        </div>
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'block text-base text-[#111827] cursor-pointer leading-6',
                  disabled && 'opacity-50 cursor-not-allowed',
                  'dark:text-white'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-[#6B7280] dark:text-neutral-400 mt-1 leading-5">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
