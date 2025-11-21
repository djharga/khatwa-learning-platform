'use client';

import { motion, MotionProps } from 'framer-motion';
import { forwardRef, HTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';

const cardVariants = cva('relative overflow-hidden transition-all duration-200 ease-out', {
  variants: {
    variant: {
      default: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:-translate-y-1',
      elevated: 'bg-white dark:bg-neutral-800 shadow-lg hover:shadow-xl hover:-translate-y-1.5 border-0',
      outlined: 'bg-transparent border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-400 dark:hover:border-primary-500 shadow-none hover:shadow-md',
      ghost: 'bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-100/70 dark:hover:bg-neutral-800/70 border-0',
      glass: 'bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md border border-white/20 dark:border-neutral-700/30 shadow-md hover:shadow-lg hover:-translate-y-1',
      gradient: 'bg-gradient-to-br from-primary-500 to-accent-500 text-white border-0 shadow-lg hover:shadow-xl hover:-translate-y-1',
      bordered: 'bg-white dark:bg-neutral-800 border-2 border-primary-300 dark:border-primary-600 shadow-md hover:border-primary-400 dark:hover:border-primary-500 hover:shadow-lg',
      interactive: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-md hover:shadow-lg hover:-translate-y-1 cursor-pointer active:scale-[0.98]',
      compact: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:shadow-md hover:-translate-y-0.5',
      spacious: 'bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg hover:shadow-xl hover:-translate-y-2',
    },
    size: {
      xs: 'p-3 rounded-lg',
      sm: 'p-4 rounded-xl',
      md: 'p-6 rounded-xl',
      lg: 'p-8 rounded-2xl',
      xl: 'p-10 rounded-2xl',
    },
    elevation: {
      0: 'shadow-none',
      1: 'shadow-sm',
      2: 'shadow-md',
      3: 'shadow-lg',
      4: 'shadow-xl',
      5: 'shadow-2xl',
    },
    interactive: {
      true: 'cursor-pointer focus-visible:outline-2 focus-visible:outline-primary-500 focus-visible:outline-offset-2',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    elevation: 2,
    interactive: false,
  },
});

export interface CardProps
  extends Omit<
      HTMLAttributes<HTMLDivElement>,
      | 'onDrag'
      | 'onDragStart'
      | 'onDragEnd'
      | 'onAnimationStart'
      | 'onAnimationEnd'
      | 'onAnimationIteration'
    >,
    VariantProps<typeof cardVariants> {
  hover?: boolean;
  shimmer?: boolean;
  glow?: boolean | 'primary' | 'accent' | 'success' | 'warning' | 'error';
  elevation?: 0 | 1 | 2 | 3 | 4 | 5;
  motionProps?: Partial<MotionProps>;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      elevation,
      hover = false,
      shimmer = false,
      glow = false,
      children,
      motionProps,
      ...props
    },
    ref
  ) => {
    const conditionalMotionProps: Partial<MotionProps> = hover
      ? {
          whileHover: { y: -2 },
          whileTap: { scale: 0.99 },
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.15, ease: 'easeOut' },
          ...motionProps,
        }
      : { ...motionProps };

    const glowMap: Record<string, string> = {
      'true': 'hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]',
      primary: 'hover:shadow-[0_0_15px_rgba(59,130,246,0.25)]',
      accent: 'hover:shadow-[0_0_15px_rgba(168,85,247,0.25)]',
      success: 'hover:shadow-[0_0_15px_rgba(34,197,94,0.25)]',
      warning: 'hover:shadow-[0_0_15px_rgba(234,179,8,0.25)]',
      error: 'hover:shadow-[0_0_15px_rgba(239,68,68,0.25)]',
      'false': '',
    };

    return (
      <motion.div
        ref={ref}
        {...(conditionalMotionProps as MotionProps)}
        className={cn(
          cardVariants({ variant, size, elevation, interactive }),
          shimmer &&
            'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:animate-[shimmer_2s_linear_infinite]',
          glow ? (glowMap[String(glow)] ?? '') : '',
          className
        )}
        {...props}
      >
        {shimmer && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
              animation: 'shimmer 2s linear infinite',
            }}
          />
        )}

        <div className="relative z-10">{children}</div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2 pb-4 border-b border-neutral-200 dark:border-neutral-700', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-lg font-bold tracking-tight', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('pt-2', className)} {...props} />
));
CardContent.displayName = 'CardContent';

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex items-center pt-4 gap-2', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
