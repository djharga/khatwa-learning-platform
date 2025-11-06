'use client';

import { motion } from 'framer-motion';
import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // Default - بطاقة عادية مع حدود خفيفة
        default: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-elevation-2 hover:shadow-elevation-4 hover:-translate-y-1",
        
        // Elevated - بطاقة مرتفعة بدون حدود
        elevated: "bg-white dark:bg-neutral-800 shadow-elevation-4 hover:shadow-elevation-6 border-0 hover:-translate-y-2",
        
        // Outlined - بطاقة بحدود واضحة
        outlined: "bg-transparent dark:bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500 shadow-none hover:shadow-elevation-3 hover:-translate-y-1",
        
        // Ghost - بطاقة شفافة خفيفة
        ghost: "bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 border-0 shadow-none hover:shadow-elevation-1",
        
        // Glass - بطاقة زجاجية (Glass Morphism)
        glass: "bg-white/70 dark:bg-neutral-800/70 backdrop-blur-lg border border-white/20 dark:border-neutral-700/30 shadow-elevation-4 hover:bg-white/80 dark:hover:bg-neutral-800/80 hover:shadow-elevation-5 hover:-translate-y-1",
        
        // Gradient - بطاقة بتدرج لوني
        gradient: "bg-gradient-to-br from-primary-500 to-accent-500 text-white border-0 shadow-primary-md hover:shadow-primary-lg hover:-translate-y-2 hover:scale-[1.02]",
        
        // Bordered - بطاقة بحدود ملونة
        bordered: "bg-white dark:bg-neutral-800 border-2 border-primary-300 dark:border-primary-600 shadow-elevation-2 hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-colored-primary hover:-translate-y-1",
        
        // Interactive - بطاقة تفاعلية محسّنة
        interactive: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-elevation-3 hover:shadow-elevation-5 hover:-translate-y-1.5 cursor-pointer active:scale-[0.98]",
        
        // Compact - بطاقة مضغوطة للمساحات الصغيرة
        compact: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-elevation-1 hover:shadow-elevation-3 hover:-translate-y-0.5",
        
        // Spacious - بطاقة واسعة للمحتوى الكبير
        spacious: "bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-elevation-3 hover:shadow-elevation-5 hover:-translate-y-2",
      },
      size: {
        xs: "p-3 rounded-lg", // 12px padding, rounded-lg
        sm: "p-4 rounded-xl", // 16px padding, rounded-xl
        md: "p-6 rounded-xl", // 24px padding, rounded-xl (default)
        lg: "p-8 rounded-2xl", // 32px padding, rounded-2xl
        xl: "p-10 rounded-2xl", // 40px padding, rounded-2xl
      },
      elevation: {
        0: "shadow-elevation-0",
        1: "shadow-elevation-1",
        2: "shadow-elevation-2",
        3: "shadow-elevation-3",
        4: "shadow-elevation-4",
        5: "shadow-elevation-5",
        6: "shadow-elevation-6",
      },
      interactive: {
        true: "cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2",
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
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean; // Enable framer-motion hover animations
  shimmer?: boolean; // Enable shimmer effect
  glow?: boolean | 'primary' | 'accent' | 'success' | 'warning' | 'error'; // Enable glow effect with color variant
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // Override default elevation
}

const Card = forwardRef<HTMLDivElement, CardProps>(
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
    const MotionDiv = hover ? motion.div : 'div';
    const motionProps = hover ? {
      whileHover: { y: -2 }, // Reduced from -6
      whileTap: { scale: 0.99 }, // Reduced from 0.98
      initial: { opacity: 0 }, // Removed y movement
      animate: { opacity: 1 }, // Removed y movement
      transition: { 
        duration: 0.15, // Faster
        ease: 'easeOut'
      }
    } : {};

    // Glow shadow classes based on glow prop
    const glowClasses = {
      true: "hover:shadow-glow-primary",
      primary: "hover:shadow-glow-primary",
      accent: "hover:shadow-glow-accent",
      success: "hover:shadow-glow-success",
      warning: "hover:shadow-glow-warning",
      error: "hover:shadow-glow-error",
      false: "",
    };

    return (
      <MotionDiv
        className={cn(
          cardVariants({ variant, size, elevation, interactive }),
          shimmer && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 dark:before:via-white/10 before:to-transparent before:-translate-x-full hover:before:animate-[shimmer_2s_ease-in-out]",
          glow && glowClasses[glow as keyof typeof glowClasses],
          className
        )}
        ref={ref}
        {...motionProps}
        {...(props as any)}
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

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-2 pb-4 border-b border-neutral-200 dark:border-neutral-700", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-bold leading-tight tracking-tight text-text-primary dark:text-text-primary",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "text-sm text-text-secondary dark:text-text-secondary leading-relaxed",
        className
      )}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center pt-4 gap-2", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants 
};