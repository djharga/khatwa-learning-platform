/**
 * Centralized Motion Variants System
 * 
 * Production-Grade 2025 Motion System
 * - Subtle, professional animations
 * - Type-safe framer-motion variants
 * - Standardized transitions
 * - Accessibility-first (respects prefersReducedMotion)
 */

import type { Variants, Transition } from 'framer-motion';

export type { Variants, Transition };

// ============================================
// Standard Transitions
// ============================================

/**
 * Spring transition - Natural, physics-based motion
 */
export const springTransition: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

/**
 * Smooth transition - Subtle ease-out for professional feel
 */
export const smoothTransition: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1], // Custom easeOut - حركة ناعمة
};

/**
 * Fast transition - Quick, snappy animations
 */
export const fastTransition: Transition = {
  duration: 0.2,
  ease: [0.4, 0, 0.2, 1], // Material Design standard
};

/**
 * Slow transition - Deliberate, elegant animations
 */
export const slowTransition: Transition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1],
};

// ============================================
// Standard Variants
// ============================================

/**
 * Fade In - Simple opacity animation
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: smoothTransition,
  },
  exit: { 
    opacity: 0,
    transition: fastTransition,
  },
};

/**
 * Slide Up - Subtle upward motion with fade
 */
export const slideUp: Variants = {
  initial: { 
    opacity: 0, 
    y: 20,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition,
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: fastTransition,
  },
};

/**
 * Slide Down - Subtle downward motion with fade
 */
export const slideDown: Variants = {
  initial: { 
    opacity: 0, 
    y: -20,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition,
  },
  exit: { 
    opacity: 0, 
    y: 10,
    transition: fastTransition,
  },
};

/**
 * Slide In - For sidebars sliding in from the side
 */
export const slideIn: Variants = {
  initial: { 
    opacity: 0, 
    x: -20,
  },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: smoothTransition,
  },
  exit: { 
    opacity: 0, 
    x: -20,
    transition: fastTransition,
  },
};

/**
 * Scale In - Subtle scale with fade
 */
export const scaleIn: Variants = {
  initial: { 
    opacity: 0, 
    scale: 0.96,
  },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: smoothTransition,
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    transition: fastTransition,
  },
};

/**
 * Stagger Container - For animating lists with staggered children
 */
export const staggerContainer: Variants = {
  initial: { 
    opacity: 0,
  },
  animate: { 
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
      ...smoothTransition,
    },
  },
  exit: {
    opacity: 0,
    transition: fastTransition,
  },
};

/**
 * Stagger Item - Child variant for staggerContainer
 */
export const staggerItem: Variants = {
  initial: { 
    opacity: 0, 
    y: 15,
  },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: smoothTransition,
  },
  exit: { 
    opacity: 0, 
    y: -10,
    transition: fastTransition,
  },
};

// ============================================
// Reduced Motion Variants (Accessibility)
// ============================================

/**
 * Reduced motion variants - Instant, no animation
 */
export const reducedMotionVariants: Variants = {
  initial: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  exit: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
};

// ============================================
// Helper Functions
// ============================================

/**
 * Create a variant with custom delay
 */
export function createVariantWithDelay(
  baseVariant: Variants,
  delay: number
): Variants {
  return {
    ...baseVariant,
    animate: {
      ...baseVariant.animate,
      transition: {
        ...(baseVariant.animate as any)?.transition,
        delay,
      },
    },
  };
}

/**
 * Create a variant with custom duration
 */
export function createVariantWithDuration(
  baseVariant: Variants,
  duration: number
): Variants {
  return {
    ...baseVariant,
    animate: {
      ...baseVariant.animate,
      transition: {
        ...(baseVariant.animate as any)?.transition,
        duration,
      },
    },
  };
}

/**
 * Get appropriate variants based on reduced motion preference
 */
export function getAccessibleVariants(
  variants: Variants,
  prefersReducedMotion: boolean
): Variants {
  return prefersReducedMotion ? reducedMotionVariants : variants;
}

