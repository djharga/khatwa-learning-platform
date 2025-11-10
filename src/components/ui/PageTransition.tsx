'use client';

import { motion } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface PageTransitionProps {
  children: ReactNode;
  loading?: boolean;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

const pageTransition = {
  type: 'tween' as const,
  ease: 'easeOut' as const,
  duration: 0.2,
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

export function PageTransition({ children, loading = false }: PageTransitionProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

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

  const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;
  const transition = prefersReducedMotion ? reducedMotionTransition : pageTransition;

  return (
    <>
      {isLoading && (
        <div 
          className="fixed top-0 left-0 right-0 h-1 bg-primary-200 z-50"
          role="progressbar"
          aria-label="جاري التحميل"
        >
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: '100%' }}
          />
        </div>
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

