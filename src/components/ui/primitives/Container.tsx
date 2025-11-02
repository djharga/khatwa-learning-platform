import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Container Component - نظام موحد للحاويات
 * يستخدم Design Tokens للـ spacing والـ max-width
 */

const containerVariants = cva(
  "mx-auto w-full",
  {
    variants: {
      size: {
        xs: "max-w-screen-xs px-4 sm:px-6", // ~480px
        sm: "max-w-screen-sm px-4 sm:px-6", // ~640px
        md: "max-w-screen-md px-4 sm:px-6 lg:px-8", // ~768px
        lg: "max-w-screen-lg px-4 sm:px-6 lg:px-8", // ~1024px
        xl: "max-w-screen-xl px-4 sm:px-6 lg:px-8", // ~1280px
        "2xl": "max-w-screen-2xl px-4 sm:px-6 lg:px-8 xl:px-12", // ~1536px
        full: "max-w-full px-4 sm:px-6 lg:px-8", // No max-width
        prose: "max-w-prose px-4 sm:px-6", // ~65ch - للمحتوى النصي
      },
      padding: {
        none: "px-0",
        tight: "px-4",
        normal: "px-4 sm:px-6",
        relaxed: "px-4 sm:px-6 lg:px-8",
        spacious: "px-4 sm:px-6 lg:px-8 xl:px-12",
      },
    },
    defaultVariants: {
      size: "xl",
      padding: "normal",
    },
  }
);

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  /**
   * Container size variant
   * @default "xl"
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'prose';
  
  /**
   * Padding variant (overrides size padding)
   */
  padding?: 'none' | 'tight' | 'normal' | 'relaxed' | 'spacious';
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(containerVariants({ size, padding }), className)}
        {...props}
      />
    );
  }
);

Container.displayName = "Container";

export { Container, containerVariants };

