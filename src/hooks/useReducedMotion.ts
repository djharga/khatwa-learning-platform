'use client';

import { useState, useEffect } from 'react';

/**
 * Hook للتحقق من تفضيلات المستخدم للحركة المخفضة
 * يتحقق من prefers-reduced-motion media query
 * 
 * @returns {boolean} true إذا كان المستخدم يفضل حركة مخفضة
 * 
 * @example
 * const prefersReducedMotion = useReducedMotion();
 * 
 * <motion.div
 *   animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
 *   transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
 * >
 *   Content
 * </motion.div>
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // التحقق من تفضيلات المستخدم
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // تعيين القيمة الأولية
    setPrefersReducedMotion(mediaQuery.matches);

    // استماع للتغييرات
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    // دعم addEventListener (المتصفحات الحديثة)
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // دعم addListener (المتصفحات القديمة)
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook للحصول على إعدادات الحركة المناسبة بناءً على تفضيلات المستخدم
 * 
 * @returns {object} إعدادات الحركة المناسبة
 * 
 * @example
 * const motionSettings = useMotionSettings();
 * 
 * <motion.div
 *   animate={motionSettings.animate}
 *   transition={motionSettings.transition}
 * >
 *   Content
 * </motion.div>
 */
export function useMotionSettings() {
  const prefersReducedMotion = useReducedMotion();

  return {
    prefersReducedMotion,
    // إعدادات الحركة الافتراضية
    animate: prefersReducedMotion ? {} : undefined,
    transition: prefersReducedMotion 
      ? { duration: 0 } 
      : { duration: 0.3, ease: 'easeOut' },
    // إعدادات framer-motion
    framerMotion: {
      initial: prefersReducedMotion ? {} : { opacity: 0 },
      animate: prefersReducedMotion ? {} : { opacity: 1 },
      exit: prefersReducedMotion ? {} : { opacity: 0 },
      transition: prefersReducedMotion 
        ? { duration: 0 } 
        : { duration: 0.3, ease: 'easeOut' },
    },
  };
}

