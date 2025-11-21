import React, { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Radio button component with academic design system from agent.md
 * Size: 20px × 20px
 * Border: 2px solid #D1D5DB (unselected)
 * Border-radius: 9999px (circular)
 * Inner dot: 10px, background #5B36E8 (selected)
 */
const radioVariants = cva(
  'relative appearance-none cursor-pointer border-2 rounded-full transition-all duration-200 focus:outline-none focus:ring-[3px] focus:ring-[rgba(91,54,232,0.2)] disabled:opacity-50 disabled:cursor-not-allowed',
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

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof radioVariants> {
  label?: string | React.ReactNode;
  description?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  (
    { className, size, label, description, disabled, id, checked, ...props },
    ref
  ) => {
    const radioId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

    const innerDotSize = size === 'sm' ? 'w-1.5 h-1.5' : size === 'lg' ? 'w-3 h-3' : 'w-2.5 h-2.5'; // 10px for md

    return (
      <div className="flex items-start gap-2" dir="rtl">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="radio"
            id={radioId}
            className={cn(
              radioVariants({ size }),
              // Unselected state
              'border-[#D1D5DB] bg-white hover:border-[#B5B5B5]',
              // Selected state
              checked && 'border-[#5B36E8]',
              disabled && 'bg-[#F3F4F6] border-[#E5E7EB]',
              className
            )}
            disabled={disabled}
            checked={checked}
            ref={ref}
            {...props}
          />
          {/* Inner dot - 10px, background #5B36E8 when selected */}
          {checked && (
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center pointer-events-none',
                'transition-transform duration-200',
                checked ? 'scale-100' : 'scale-0'
              )}
            >
              <div
                className={cn(
                  'rounded-full bg-[#5B36E8]',
                  innerDotSize
                )}
              />
            </div>
          )}
        </div>
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={radioId}
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

Radio.displayName = 'Radio';

export default Radio;

