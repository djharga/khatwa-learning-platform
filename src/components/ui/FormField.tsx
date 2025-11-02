import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

/**
 * Props for the FormField wrapper component that provides consistent form field layout with label, description, error message, and required indicator.
 * @property {string} [label] - Optional label text displayed above the form control
 * @property {boolean} [required=false] - Shows red asterisk next to label when true (default: false)
 * @property {string} [error] - Error message text displayed below the form control with error icon
 * @property {string} [description] - Optional helper text displayed below the label
 * @property {React.ReactNode} children - Form control element (Input, Select, Textarea, etc.)
 * @property {string} [htmlFor] - ID of the form control for label association
 * @property {string} [className] - Additional CSS classes for the wrapper container
 */
export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

/**
 * Wrapper component that provides consistent layout and styling for form fields. Handles label, description, error messages, and required indicators. Works with any form control component (Input, Select, Textarea, Checkbox, etc.).
 * @example
 * ```typescript
 * <FormField
 *   label="Email Address"
 *   required
 *   htmlFor="email"
 * >
 *   <Input id="email" type="email" />
 * </FormField>
 * ```
 * @example
 * ```typescript
 * <FormField
 *   label="Password"
 *   description="Must be at least 8 characters"
 *   htmlFor="password"
 * >
 *   <Input id="password" type="password" />
 * </FormField>
 * ```
 * @example
 * ```typescript
 * <FormField
 *   label="Username"
 *   error="Username is already taken"
 *   htmlFor="username"
 * >
 *   <Input id="username" error={true} />
 * </FormField>
 * ```
 * @example
 * ```typescript
 * <FormField
 *   label="Full Name"
 *   required
 *   description="Enter your first and last name"
 *   error={errors.name?.message}
 *   htmlFor="name"
 * >
 *   <Input id="name" {...register('name')} />
 * </FormField>
 * ```
 */
const FormField: React.FC<FormFieldProps> = ({
  label,
  required = false,
  error,
  description,
  children,
  htmlFor,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      {/* Vertical spacing between label, description, input, and error */}
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
          {required && <span className="text-red-500 mr-1">*</span>}
          {/* Red asterisk indicates required field (RTL-aware with mr-1) */}
        </label>
      )}
      {description && <p className="text-sm text-gray-500">{description}</p>}
      {/* Helper text in muted color, shown between label and input */}
      {children}
      {error && (
        <div className="flex items-center gap-1 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
      {/* Error message with AlertCircle icon, shown below input */}
    </div>
  );
};

export default FormField;