'use client';

import * as React from "react";
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from "@/lib/utils";

/**
 * Card component system providing a consistent container with header, content, and footer sections. 
 * Built with composition pattern for maximum flexibility.
 * 
 * Unified version with support for:
 * - Multiple variants (default, elevated, outlined, ghost, glass, gradient, bordered, interactive, compact, spacious)
 * - Size variants (xs, sm, md, lg, xl)
 * - Elevation levels (0-6)
 * - Optional framer-motion animations (hover, shimmer, glow effects)
 * - Dark mode support
 * - Accessibility improvements
 */

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // Default - بطاقة عادية مع حدود خفيفة (backward compatible with shadcn/ui style)
        default: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200",
        
        // Elevated - بطاقة مرتفعة بدون حدود
        elevated: "bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl hover:scale-105 border-0 hover:-translate-y-2 transition-all duration-200",
        
        // Outlined - بطاقة بحدود واضحة
        outlined: "bg-transparent dark:bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-none hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200",
        
        // Ghost - بطاقة شفافة خفيفة
        ghost: "bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 border-0 shadow-none hover:shadow-lg hover:scale-105 transition-all duration-200",
        
        // Glass - بطاقة زجاجية (Glass Morphism)
        glass: "bg-white/70 dark:bg-neutral-800/70 backdrop-blur-lg border border-white/20 dark:border-neutral-700/30 shadow-lg hover:bg-white/80 dark:hover:bg-neutral-800/80 hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-200",
        
        // Gradient - بطاقة بتدرج لوني
        gradient: "bg-gradient-to-br from-indigo-500 to-purple-500 text-white border-0 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-200",
        
        // Bordered - بطاقة بحدود ملونة
        bordered: "bg-white dark:bg-neutral-800 border-2 border-indigo-300 dark:border-indigo-600 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg hover:scale-105 hover:-translate-y-1 transition-all duration-200",
        
        // Interactive - بطاقة تفاعلية محسّنة
        interactive: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:scale-105 hover:-translate-y-1.5 cursor-pointer active:scale-[0.98] transition-all duration-200",
        
        // Compact - بطاقة مضغوطة للمساحات الصغيرة
        compact: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-lg hover:scale-105 hover:-translate-y-0.5 transition-all duration-200",
        
        // Spacious - بطاقة واسعة للمحتوى الكبير
        spacious: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-2 transition-all duration-200",
        
        // Legacy shadcn/ui style (backward compatibility)
        card: "rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200",
      },
      size: {
        xs: "p-3 rounded-lg", // 12px padding, rounded-lg
        sm: "p-4 rounded-xl", // 16px padding, rounded-xl
        md: "p-6 rounded-xl", // 24px padding, rounded-xl (default)
        lg: "p-8 rounded-2xl", // 32px padding, rounded-2xl
        xl: "p-10 rounded-2xl", // 40px padding, rounded-2xl
      },
      elevation: {
        0: "shadow-none",
        1: "shadow-sm",
        2: "shadow-md",
        3: "shadow-lg",
        4: "shadow-xl",
        5: "shadow-2xl",
        6: "shadow-2xl",
      },
      interactive: {
        true: "cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-indigo-500 focus-visible:outline-offset-2",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      elevation: 2,
      interactive: false
    }
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  /**
   * Enable framer-motion hover animations
   * @default false
   */
  hover?: boolean;
  
  /**
   * Enable shimmer effect on hover
   * @default false
   */
  shimmer?: boolean;
  
  /**
   * Enable glow effect with color variant
   * @default false
   */
  glow?: boolean | 'primary' | 'accent' | 'success' | 'warning' | 'error';
  
  /**
   * Override default elevation
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

/**
 * Main card container component with rounded corners, border, and shadow. 
 * Serves as the wrapper for all card content.
 * 
 * Supports multiple variants, sizes, and optional animations.
 * 
 * @example
 * ```tsx
 * <Card variant="default" size="md">
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     Main content goes here
 *   </CardContent>
 *   <CardFooter>
 *     Footer actions
 *   </CardFooter>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" hover={true} shimmer={true}>
 *   Animated card content
 * </Card>
 * ```
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    elevation,
    hover = false,
    shimmer = false,
    glow = false,
    children,
    ...props 
  }, ref) => {
    // Use motion.div when hover is enabled, regular div otherwise
    const MotionDiv = hover ? motion.div : 'div';
    
    // Motion props for hover variant - minimized motion
    const motionProps = hover ? {
      whileHover: { y: -2 }, // Reduced from -6 - minimal movement
      whileTap: { scale: 0.99 }, // Reduced from 0.98 - minimal movement
      initial: { opacity: 0 }, // Removed y movement
      animate: { opacity: 1 }, // Removed y movement
      transition: { 
        duration: 0.15, // Faster, less noticeable
        ease: 'easeOut'
      }
    } : {};

    // Glow shadow classes based on glow prop
    const glowClasses = {
      true: "hover:shadow-indigo-500/50",
      primary: "hover:shadow-indigo-500/50",
      accent: "hover:shadow-purple-500/50",
      success: "hover:shadow-emerald-500/50",
      warning: "hover:shadow-amber-500/50",
      error: "hover:shadow-red-500/50",
      false: "",
    };

    // Determine variant: use "default" if variant is undefined
    // For backward compatibility: if className contains shadcn/ui classes, don't apply variants
    const hasShadcnClasses = className?.includes('bg-card') || className?.includes('text-card-foreground');
    const finalVariant = hasShadcnClasses ? undefined : (variant || "default");

    return (
      <MotionDiv
        className={cn(
          // Only apply cardVariants if not using shadcn/ui style
          !hasShadcnClasses && cardVariants({ variant: finalVariant as any, size, elevation, interactive }),
          hasShadcnClasses && "rounded-lg border bg-card text-card-foreground shadow-sm",
          shimmer && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent before:-translate-x-full hover:before:animate-[shimmer_2s_ease-in-out]",
          glow && glowClasses[glow as keyof typeof glowClasses],
          'motion-safe:transition-all motion-reduce:transition-none',
          className
        )}
        ref={ref}
        {...(hover ? (motionProps as any) : {})}
        {...props}
      >
        {/* Gradient overlay for depth - محسّن للوضع المظلم */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Shimmer effect - محسّن للوضع المظلم */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent -translate-x-full"
            animate={{ x: ['100%', '-100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: 'loop',
              ease: 'linear'
            }}
          />
        )}
        
        <div className="relative z-10">
          {children}
        </div>
      </MotionDiv>
    );
  }
);
Card.displayName = "Card";

/**
 * Card header section with vertical spacing for title and description. 
 * Typically contains CardTitle and CardDescription components.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * Card title heading component. Renders as an h3 element with large, semibold text.
 */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * Card description text component. Provides secondary information below the title.
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * Main content area of the card. Contains the primary card content.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * Card footer section for actions or additional information. Uses flexbox for horizontal layout.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants
}
// CardProps is already exported above as interface
