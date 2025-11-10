import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Grid Component — شبكة ذكية متجاوبة ومنسقة
 * محسّنة لتدعم RTL + استجابة تلقائية + أداء بصري أفضل
 */

const gridVariants = cva(
  'grid w-full min-h-0 auto-rows-min transition-all duration-200 ease-out',
  {
    variants: {
      cols: {
        1: 'grid-cols-1',
        2: 'grid-cols-1 sm:grid-cols-2',
        3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
        6: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6',
        auto: 'grid-cols-[repeat(auto-fit,minmax(250px,1fr))]',
      },
      gap: {
        none: 'gap-0',
        xs: 'gap-2',
        sm: 'gap-4',
        md: 'gap-6',
        lg: 'gap-8 sm:gap-10',
        xl: 'gap-12 sm:gap-16',
      },
      alignItems: {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
      },
      justifyContent: {
        start: 'justify-items-start',
        center: 'justify-items-center',
        end: 'justify-items-end',
        stretch: 'justify-items-stretch',
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
  cols?: 1 | 2 | 3 | 4 | 5 | 6 | 'auto';
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols, gap, alignItems, justifyContent, ...props }, ref) => (
    <div
      ref={ref}
      dir="auto"
      className={cn(gridVariants({ cols, gap, alignItems, justifyContent }), className)}
      {...props}
    />
  )
);

Grid.displayName = 'Grid';

export { Grid, gridVariants };
