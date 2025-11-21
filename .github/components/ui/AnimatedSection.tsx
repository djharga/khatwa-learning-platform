'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

/**
 * AnimatedSection - قسم متحرك مع تأثيرات scroll
 * 
 * Features:
 * - Fade in on scroll
 * - Stagger children animations
 * - Respects reduced motion preferences
 */

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  staggerDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const AnimatedSection = React.forwardRef<HTMLDivElement, AnimatedSectionProps>(
  (
    {
      children,
      className,
      delay = 0,
      stagger = false,
      staggerDelay = 0.1,
      direction = 'up',
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const sectionRef = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

    // إذا كان المستخدم يفضل تقليل الحركة، لا نستخدم الحركات
    if (prefersReducedMotion) {
      return (
        <div ref={ref} className={className}>
          {children}
        </div>
      );
    }

    const directionVariants = {
      up: { y: 40, opacity: 0 },
      down: { y: -40, opacity: 0 },
      left: { x: 40, opacity: 0 },
      right: { x: -40, opacity: 0 },
      none: { opacity: 0 },
    };

    const containerVariants = stagger
      ? {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }
      : undefined;

    const itemVariants = {
      hidden: directionVariants[direction],
      visible: {
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration: 0.6,
          ease: [0.4, 0, 0.2, 1],
          delay: stagger ? 0 : delay,
        },
      },
    };

    return (
      <motion.div
        ref={sectionRef}
        className={cn(className)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger ? containerVariants : itemVariants}
      >
        {stagger
          ? React.Children.map(children, (child, index) => (
              <motion.div key={index} variants={itemVariants}>
                {child}
              </motion.div>
            ))
          : children}
      </motion.div>
    );
  }
);

AnimatedSection.displayName = 'AnimatedSection';