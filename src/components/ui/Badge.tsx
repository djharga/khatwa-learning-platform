import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Badge Component - Clean & Static Design System
 * Optimized for Arabic content and clear status indication.
 */

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border font-medium whitespace-nowrap select-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-600 text-white shadow hover:bg-primary-700",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-red-500 text-white shadow hover:bg-red-600",
        success:
          "border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-600",
        warning:
          "border-transparent bg-amber-500 text-white shadow hover:bg-amber-600",
        info:
          "border-transparent bg-sky-500 text-white shadow hover:bg-sky-600",
        outline:
          "text-foreground border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800",
        ghost:
          "border-transparent bg-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800",
      },
      size: {
        sm: "h-5 px-2 text-[10px]",      // Ultra compact
        default: "h-6 px-2.5 text-xs",   // Standard
        lg: "h-7 px-3 text-sm",          // Prominent
      },
      rounded: {
        default: "rounded-full",         // Pill shape (Standard)
        md: "rounded-md",                // Rounded rectangle (Tag style)
        sm: "rounded-sm",                // Slightly rounded (Chip style)
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, rounded, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size, rounded }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
