import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Grid Component - نظام موحد للشبكات
 * يستخدم Design Tokens للـ spacing والـ gaps
 */

const gridVariants = cva(
  "grid w-full",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 sm:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        6: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
        auto: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-auto-fill",
      },
      gap: {
        none: "gap-0",
        xs: "gap-2", // 8px
        sm: "gap-4", // 16px
        md: "gap-6", // 24px
        lg: "gap-8", // 32px
        xl: "gap-12", // 48px
      },
      alignItems: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justifyContent: {
        start: "justify-items-start",
        center: "justify-items-center",
        end: "justify-items-end",
        stretch: "justify-items-stretch",
      },
    },
    defaultVariants: {
      cols: 3,
      gap: 'md',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    },
  }
);

export interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof gridVariants> {
  /**
   * Number of columns (responsive)
   * @default 3
   */
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto';
  
  /**
   * Gap between grid items
   * @default "md"
   */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, alignItems, justifyContent, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(gridVariants({ cols, gap, alignItems, justifyContent }), className)}
        {...props}
      />
    );
  }
);

Grid.displayName = "Grid";

export { Grid, gridVariants };

