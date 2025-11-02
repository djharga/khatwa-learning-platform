"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Label component built on Radix UI Label primitive. Provides accessible form labels with proper association to form controls.
 * @requires 'use client' directive for client-side interactivity
 */

/**
 * Class variance authority configuration for label styling. Defines consistent text styling and disabled state handling.
 * - Default styling: Small text size, medium font weight, tight line height
 * - Peer-disabled behavior: Automatically reduces opacity and changes cursor when associated input is disabled
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

/**
 * Accessible label component that wraps Radix UI Label primitive. Automatically handles disabled state styling when associated form control is disabled (using peer-disabled classes).
 * Inherits all Radix UI Label features including proper click handling and accessibility.
 *
 * @example
 * ```typescript
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 * ```
 *
 * @example
 * ```typescript
 * <Label htmlFor="disabled-input">Disabled Field</Label>
 * <Input id="disabled-input" disabled className="peer" />
 * ```
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  // Wraps Radix UI Label primitive for enhanced accessibility and click handling
  // peer-disabled classes work when the associated input has 'peer' class and is disabled
  // Use htmlFor prop to associate label with form control by ID
  // Clicking the label focuses the associated form control (handled by Radix UI)
  // Properly announces label text to screen readers when associated control is focused
  // For peer-disabled styling to work, add 'peer' class to the associated input
  // Typically used with Input, Select, Checkbox, or other form components
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
