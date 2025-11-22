/**
 * Motion System Exports
 * Centralized animation components and utilities
 */

export { MotionWrapper, type MotionWrapperProps, type AnimationType } from './MotionWrapper';
export {
  fadeIn,
  slideUp,
  scaleIn,
  staggerContainer,
  staggerItem,
  springTransition,
  smoothTransition,
  fastTransition,
  slowTransition,
  reducedMotionVariants,
  createVariantWithDelay,
  createVariantWithDuration,
  getAccessibleVariants,
} from '@/lib/motion-variants';

