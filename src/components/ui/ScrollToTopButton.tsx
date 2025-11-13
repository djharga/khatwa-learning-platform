'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ScrollToTopButtonProps {
  /** الحد الأدنى للتمرير قبل إظهار الزر (بالبكسل) */
  threshold?: number;
  /** موضع الزر الأفقي */
  position?: 'left' | 'right';
  /** المسافة من الحافة */
  offset?: string;
  /** حجم الزر */
  size?: 'sm' | 'md' | 'lg';
  /** تخصيص className */
  className?: string;
}

/**
 * زر الرجوع للأعلى مع تصميم محسّن ودعم prefers-reduced-motion
 */
export default function ScrollToTopButton({
  threshold = 300,
  position = 'left',
  offset = 'bottom-20 left-6',
  size = 'md',
  className = '',
}: ScrollToTopButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setShow(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // فحص الحالة الأولية

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [prefersReducedMotion]);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12 md:w-14 md:h-14',
    lg: 'w-14 h-14 md:w-16 md:h-16',
  };

  const iconSizes = {
    sm: 'w-[18px] h-[18px]',
    md: 'w-[26px] h-[26px] md:w-[28px] md:h-[28px]',
    lg: 'w-[28px] h-[28px] md:w-[32px] md:h-[32px]',
  };

  // استخدام offset إذا تم توفيره، وإلا استخدام position
  const positionClass = offset || (position === 'left' ? 'bottom-20 left-6' : 'bottom-20 right-6');

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          onClick={scrollToTop}
          className={`
            fixed ${positionClass}
            z-50 ${sizeClasses[size]} rounded-full
            bg-gradient-to-br from-purple-600 via-purple-500 to-indigo-600
            text-white
            shadow-lg
            active:scale-95
            transition-all duration-200 ease-out
            flex items-center justify-center
            focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2
            ${className}
          `}
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          aria-label="العودة إلى الأعلى"
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, y: 20 }}
          animate={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8, y: 20 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
          whileHover={prefersReducedMotion ? {} : { 
            scale: 1.05,
            backgroundColor: 'rgba(168, 85, 247, 0.9)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.15)'
          }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        >
          <ChevronUp className={iconSizes[size]} aria-hidden="true" strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

