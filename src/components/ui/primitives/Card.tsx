'use client';

import { motion } from 'framer-motion';
import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  "relative overflow-hidden transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-xl hover:-translate-y-1",
        elevated: "bg-white shadow-xl hover:shadow-2xl border-0 hover:-translate-y-2",
        outlined: "bg-transparent border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1",
        ghost: "bg-gray-50/50 hover:bg-gray-100/70 border-0 shadow-none hover:shadow-sm",
        glass: "bg-white/70 backdrop-blur-lg border border-white/20 shadow-lg hover:bg-white/80 hover:shadow-xl hover:-translate-y-1",
        gradient: "bg-gradient-to-br from-blue-500 to-purple-600 text-white border-0 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]",
        bordered: "bg-white border-2 border-blue-200 shadow-sm hover:border-blue-400 hover:shadow-[0_10px_30px_-5px_rgba(0,102,255,0.2)] hover:-translate-y-1",
        interactive: "bg-white border border-gray-100 shadow-md hover:shadow-xl hover:-translate-y-1.5 cursor-pointer active:scale-[0.98]"
      },
      size: {
        xs: "p-3 rounded-xl",
        sm: "p-4 rounded-2xl",
        md: "p-6 rounded-2xl",
        lg: "p-8 rounded-3xl",
        xl: "p-10 rounded-3xl"
      },
      interactive: {
        true: "cursor-pointer select-none",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      interactive: false
    }
  }
);

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  shimmer?: boolean;
  glow?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    variant, 
    size, 
    interactive, 
    hover = false,
    shimmer = false,
    glow = false,
    children,
    ...props 
  }, ref) => {
    const MotionDiv = hover ? motion.div : 'div';
    const motionProps = hover ? {
      whileHover: { y: -6, scale: 1.01 },
      whileTap: { scale: 0.98 },
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { 
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    } : {};

    return (
      <MotionDiv
        className={cn(
          cardVariants({ variant, size, interactive }),
          shimmer && "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:-translate-x-full hover:before:animate-[shimmer_2s_ease-in-out]",
          glow && "hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]",
          className
        )}
        ref={ref}
        {...motionProps}
        {...(props as any)}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        
        {/* Shimmer effect */}
        {shimmer && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
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
      className={cn("flex flex-col space-y-2 pb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white",
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
        "text-sm text-gray-600 dark:text-gray-300 leading-relaxed",
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