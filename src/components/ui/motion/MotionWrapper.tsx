'use client';

import * as React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import {
  fadeIn,
  slideUp,
  slideDown,
  slideIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  getAccessibleVariants,
} from '@/lib/motion-variants';
import type { Variants } from 'framer-motion';

/**
 * MotionWrapper - Centralized Animation Component
 * 
 * Production-Grade 2025 Motion System
 * - Simple, declarative API
 * - Hides framer-motion complexity
 * - Respects accessibility preferences
 * - Type-safe animation props
 * 
 * @example
 * ```tsx
 * <MotionWrapper animation="fade" delay={0.1}>
 *   <div>Content</div>
 * </MotionWrapper>
 * ```
 */

export type AnimationType = 'fade' | 'slide' | 'slideDown' | 'slideIn' | 'scale';

export interface MotionWrapperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Animation type */
  animation?: AnimationType;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Custom duration (seconds) - overrides default */
  duration?: number;
  /** Enable stagger animation for children */
  stagger?: boolean;
  /** Stagger delay between children (seconds) */
  staggerDelay?: number;
  /** Enable FLIP layout animations (for filtering, sorting, etc.) */
  layout?: boolean;
  /** Children to animate */
  children: React.ReactNode;
  /** Additional className */
  className?: string;
}

const animationVariants: Record<AnimationType, Variants> = {
  fade: fadeIn,
  slide: slideUp,
  slideDown: slideDown,
  slideIn: slideIn,
  scale: scaleIn,
};

export const MotionWrapper = React.forwardRef<HTMLDivElement, MotionWrapperProps>(
  (
    {
      animation = 'fade',
      delay = 0,
      duration,
      stagger = false,
      staggerDelay = 0.1,
      layout = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    // Select base variant
    const baseVariant = animationVariants[animation];

    // Apply custom duration if provided
    const variant: Variants = duration
      ? {
          ...baseVariant,
          animate: {
            ...baseVariant.animate,
            transition: {
              ...(baseVariant.animate as any)?.transition,
              duration,
            },
          },
        }
      : baseVariant;

    // Apply delay
    const variantWithDelay: Variants = delay > 0
      ? {
          ...variant,
          animate: {
            ...variant.animate,
            transition: {
              ...(variant.animate as any)?.transition,
              delay,
            },
          },
        }
      : variant;

    // Use stagger container if enabled
    const finalVariants = stagger
      ? {
          ...staggerContainer,
          animate: {
            ...staggerContainer.animate,
            transition: {
              ...(staggerContainer.animate as any)?.transition,
              staggerChildren: staggerDelay,
            },
          },
        }
      : variantWithDelay;

    // Get accessible variants
    const accessibleVariants = getAccessibleVariants(finalVariants, prefersReducedMotion);

    // If reduced motion, render without animation
    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      );
    }

    // Filter out motion-specific props for HTML attributes
    const htmlProps: Partial<HTMLMotionProps<'div'>> = {
      ...Object.fromEntries(
        Object.entries(props).filter(([key]) => 
          !['animation', 'delay', 'duration', 'stagger', 'staggerDelay', 'layout'].includes(key)
        )
      ),
    } as Partial<HTMLMotionProps<'div'>>;

    return (
      <motion.div
        ref={ref}
        initial="initial"
        animate="animate"
        exit="exit"
        layout={layout}
        variants={accessibleVariants}
        className={cn('will-change-transform', className)}
        {...htmlProps}
      >
        {stagger && React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={staggerItem}
            className="will-change-transform"
          >
            {child}
          </motion.div>
        )) || children}
      </motion.div>
    );
  }
);

MotionWrapper.displayName = 'MotionWrapper';

export default MotionWrapper;

