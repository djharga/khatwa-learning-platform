'use client';

import React, { useState, forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Select/Dropdown component with academic design system from agent.md
 * Trigger Button: Same as input field design
 * Dropdown Menu: elevation-4, border-radius 14px
 * Animation: Scale and fade in, 200ms
 */
const selectVariants = cva(
  'w-full border bg-white text-[#111827] rounded-[10px] transition-all duration-200 placeholder:text-[#9CA3AF] focus:outline-none focus:ring-[3px] focus:ring-[rgba(91,54,232,0.1)] disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] appearance-none cursor-pointer',
  {
    variants: {
      variant: {
        default: 'border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#5B36E8]',
        error: 'border-[#EF4444] bg-[#FEF2F2] focus:border-[#EF4444] focus:ring-[rgba(239,68,68,0.1)]',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm pe-8',
        md: 'h-[48px] px-4 py-2 text-base min-h-[48px] pe-10',
        lg: 'h-12 px-5 py-3 text-lg pe-12',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {
  options: SelectOption[];
  placeholder?: string;
  searchable?: boolean;
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  label?: string;
  required?: boolean;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      variant,
      size,
      error,
      options,
      placeholder = 'اختر خياراً',
      searchable = false,
      helperText,
      errorMessage,
      label,
      required,
      value,
      onChange,
      id,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

    // Filter options if searchable
    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

    const selectedOption = options.find((opt) => opt.value === value);

    // Simple native select for now (can be enhanced with custom dropdown)
    return (
      <div className="w-full" dir="rtl">
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-[#111827] dark:text-white mb-2"
          >
            {label}
            {required && <span className="text-[#EF4444] mr-1">*</span>}
          </label>
        )}

        {/* Select Container */}
        <div className="relative">
          <select
            id={selectId}
            className={cn(
              selectVariants({
                variant: error ? 'error' : variant,
                size,
              }),
              className
            )}
            value={value}
            onChange={onChange}
            ref={ref}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron Icon - Rotates when open */}
          <div
            className={cn(
              'absolute inset-y-0 end-0 pe-3 flex items-center pointer-events-none',
              size === 'sm' ? 'pe-2' : size === 'lg' ? 'pe-4' : 'pe-3'
            )}
          >
            <ChevronDown
              className={cn(
                'text-[#6B7280] dark:text-neutral-400 transition-transform duration-200',
                size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5',
                isOpen && 'rotate-180'
              )}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Helper Text / Error Message */}
        {(helperText || errorMessage) && (
          <div
            className={cn(
              'mt-1 text-xs',
              error && errorMessage
                ? 'text-[#EF4444]'
                : 'text-[#6B7280] dark:text-neutral-400'
            )}
          >
            {error && errorMessage ? errorMessage : helperText}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
