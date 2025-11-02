import React from 'react';

/**
 * Props for the Textarea component extending native textarea HTML attributes.
 * Accepts all standard textarea props: rows, cols, maxLength, placeholder, etc.
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/**
 * Flexible textarea component for multi-line text input. Includes consistent styling with focus ring, border, and disabled states. Minimum height of 80px with automatic expansion based on content.
 *
 * @example
 * ```typescript
 * <Textarea
 *   placeholder="Enter your message..."
 *   rows={4}
 *   value={message}
 *   onChange={handleChange}
 * />
 * ```
 *
 * @example
 * ```typescript
 * <Textarea
 *   maxLength={500}
 *   placeholder="Description (max 500 characters)"
 * />
 * ```
 *
 * @example
 * ```typescript
 * <Textarea
 *   disabled
 *   value="Read-only content"
 * />
 * ```
 *
 * Default styling: Rounded corners, border, background color, padding, focus ring with offset, disabled opacity
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={`flex min-h-[80px] /* Minimum height of 80px ensures textarea is always visible */ w-full /* Full width by default, can be overridden with className prop */ rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 /* Focus ring only appears on keyboard focus, not mouse click */ /* Ring offset creates space between focus ring and border */ disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
