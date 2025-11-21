'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { motion as motionTokens } from '@/tokens';

interface PageTransitionProps {
  children: ReactNode;
  loading?: boolean;
  transitionType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'fadeScale';
}

// Get transition type based on pathname
const getTransitionType = (pathname: string): PageTransitionProps['transitionType'] => {
  // Dashboard pages - slide up
  if (pathname.includes('/student') || pathname.includes('/admin')) {
    return 'slideUp';
  }
  // Course pages - fade with scale
  if (pathname.includes('/courses') || pathname.includes('/course')) {
    return 'fadeScale';
  }
  // Auth pages - fade
  if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/auth')) {
    return 'fade';
  }
  // Default - fade with scale
  return 'fadeScale';
};

const pageVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  duration: 0.3,
};

const reducedMotionVariants = {
  initial: {
    opacity: 1,
    y: 0,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 1,
    y: 0,
  },
};

const reducedMotionTransition = {
  duration: 0,
};

export function PageTransition({ 
  children, 
  loading = false,
  transitionType 
}: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  // تحديد نوع الانتقال
  const selectedTransitionType = transitionType || getTransitionType(pathname);
  const variants = prefersReducedMotion 
    ? reducedMotionVariants 
    : pageVariants[selectedTransitionType] || pageVariants.fadeScale;
  
  const transition = prefersReducedMotion 
    ? reducedMotionTransition 
    : pageTransition;

  // استعادة موضع التمرير عند تغيير الصفحة
  useEffect(() => {
    // حفظ موضع التمرير قبل التنقل
    const scrollPositions = sessionStorage.getItem('scrollPositions') 
      ? JSON.parse(sessionStorage.getItem('scrollPositions') || '{}')
      : {};

    // استعادة موضع التمرير للصفحة الحالية
    const savedPosition = scrollPositions[pathname];
    if (savedPosition && typeof window !== 'undefined') {
      window.scrollTo({
        top: savedPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      // الانتقال إلى الأعلى للصفحات الجديدة
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }

    // حفظ موضع التمرير عند التمرير
    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, prefersReducedMotion]);

  // معالجة حالة التحميل
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      // تأخير بسيط لإخفاء حالة التحميل
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      {isLoading && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-primary-200 z-50"
          role="progressbar"
          aria-label="جاري التحميل"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="h-full bg-primary-600"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </motion.div>
      )}
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.div>
    </>
  );
}

