import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Class variance authority configuration for badge variants. Defines styles for different badge types with consistent sizing and focus states.
 *
 * Variant options:
 * - `default`: Primary badge with primary color background and text
 * - `secondary`: Secondary badge with secondary color background and text
 * - `destructive`: Destructive/error badge with red background and text
 * - `outline`: Outlined badge with transparent background and border
 *
 * Default styling: Rounded-full shape, small padding, extra small text, semibold font, focus ring
 * Hover behavior: All variants have hover state that reduces opacity to 80%
 */
// Focus ring appears when badge is focusable (e.g., with onClick or tabIndex)
// Pill-shaped design with fully rounded corners
// Most variants use transparent border, outline variant overrides this
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * Props for the Badge component extending native div HTML attributes with variant styling options.
 *
 * @property {string} variant - Visual style variant (default: 'default')
 * @property {string} className - Additional CSS classes to merge with variant styles
 * @property {React.ReactNode} children - Badge content (typically short text or numbers)
 *
 * Note: Extends all standard div attributes (onClick, onMouseEnter, etc.)
 */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

// Common uses: notification counts, status labels, tags, category indicators
// For clickable badges, add onClick handler and cursor-pointer class
// For interactive badges, consider adding role="button" and keyboard handlers
// Badge size is determined by text size (xs) and padding (2.5 horizontal, 0.5 vertical)
// TODO: Consider adding size variants (sm, md, lg) for different use cases
/**
 * Flexible badge component for labels, status indicators, and counts. Uses pill-shaped design with multiple color variants. Supports focus states for interactive badges.
 *
 * @example
 * <Badge>New</Badge>
 *
 * @example
 * <Badge variant="default">Primary</Badge>
 * <Badge variant="secondary">Secondary</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Outlined</Badge>
 *
 * @example
 * <Badge
 *   variant="secondary"
 *   onClick={handleClick}
 *   className="cursor-pointer"
 * >
 *   Clickable
 * </Badge>
 *
 * @example
 * <Badge variant="destructive">{unreadCount}</Badge>
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
