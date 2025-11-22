'use client';

import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

export interface MotionWrapperProps {
  children: ReactNode;
  /** نوع الانتقال - يمكن تخصيصه حسب المسار */
  transitionType?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'fadeScale' | 'morph';
  /** مدة الانتقال بالثواني */
  duration?: number;
  /** تأخير بدء الانتقال */
  delay?: number;
  /** className إضافي */
  className?: string;
  /** تفعيل وضع التحميل */
  loading?: boolean;
}

// تحديد نوع الانتقال تلقائياً حسب المسار
const getTransitionType = (pathname: string): MotionWrapperProps['transitionType'] => {
  // صفحات Dashboard - slide up سلس
  if (pathname.includes('/student') || pathname.includes('/admin')) {
    return 'slideUp';
  }
  // صفحات الدورات - fadeScale ناعم
  if (pathname.includes('/courses') || pathname.includes('/course')) {
    return 'fadeScale';
  }
  // صفحات المصادقة - fade بسيط
  if (pathname.includes('/login') || pathname.includes('/register') || pathname.includes('/auth')) {
    return 'fade';
  }
  // الصفحة الرئيسية - morph سلس
  if (pathname === '/') {
    return 'morph';
  }
  // الافتراضي - fadeScale متوازن
  return 'fadeScale';
};

type TransitionType = NonNullable<MotionWrapperProps['transitionType']>;

// متغيرات الحركة المحسّنة - حركات فيزيائية ناعمة
const pageVariants: Record<TransitionType, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        duration: 0.25,
        ease: 'easeOut', // Simple ease-out as per requirements
      },
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: 'easeOut',
      },
    },
  },
  slideUp: {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      y: -10,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  slideDown: {
    initial: { opacity: 0, y: -20, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      y: 10,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  slideLeft: {
    initial: { opacity: 0, x: 20, scale: 0.98 },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      x: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  slideRight: {
    initial: { opacity: 0, x: -20, scale: 0.98 },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      x: 20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  fadeScale: {
    initial: { opacity: 0, scale: 0.98, y: 10 },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.98,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
  morph: {
    initial: { opacity: 0, scale: 0.96, y: 15, filter: 'blur(4px)' },
    animate: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.96,
      y: -15,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  },
};

// متغيرات الحركة المخفّضة للوصولية
const reducedMotionVariants: Variants = {
  initial: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
};

/**
 * MotionWrapper - مكون للانتقالات السلسة بين الصفحات
 * 
 * يستخدم AnimatePresence لضمان انتقالات سلسة مع تأثيرات exit
 * يدعم أنواع انتقالات متعددة مع حركات فيزيائية ناعمة
 * 
 * @example
 * <MotionWrapper transitionType="morph">
 *   {children}
 * </MotionWrapper>
 */
export function MotionWrapper({ 
  children, 
  transitionType,
  duration,
  delay = 0,
  className,
  loading = false,
}: MotionWrapperProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // تحديد نوع الانتقال - افتراضي fade بسيط حسب المتطلبات
  const selectedTransitionType: TransitionType = 
    (transitionType || 'fade') as TransitionType;
  
  const variants = prefersReducedMotion 
    ? reducedMotionVariants 
    : pageVariants[selectedTransitionType];

  // التأكد من mount قبل عرض الحركات
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // معالجة حالة التحميل
  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      const timer = setTimeout(() => setIsLoading(false), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // استعادة موضع التمرير عند تغيير الصفحة
  useEffect(() => {
    if (!isMounted) return;

    const scrollPositions = sessionStorage.getItem('scrollPositions') 
      ? JSON.parse(sessionStorage.getItem('scrollPositions') || '{}')
      : {};

    const savedPosition = scrollPositions[pathname];
    if (savedPosition && typeof window !== 'undefined') {
      window.scrollTo({
        top: savedPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    } else {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }

    // حفظ موضع التمرير
    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
      sessionStorage.setItem('scrollPositions', JSON.stringify(scrollPositions));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, prefersReducedMotion, isMounted]);

  // تطبيق مدة وتأخير مخصصين على المتغيرات
  const customVariants = prefersReducedMotion ? reducedMotionVariants : {
    ...variants,
    animate: {
      ...variants.animate,
      transition: {
        ...(variants.animate as any)?.transition,
        duration: duration || (variants.animate as any)?.transition?.duration || 0.5,
        delay: delay || (variants.animate as any)?.transition?.delay || 0,
      },
    },
  };

  if (!isMounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <>
      {/* شريط التحميل */}
      {isLoading && (
        <motion.div 
          className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-transparent"
          role="progressbar"
          aria-label="جاري التحميل"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-primary-600 via-accent-500 to-primary-600 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 0.4, 
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        </motion.div>
      )}

      {/* AnimatePresence للانتقالات السلسة */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={customVariants}
          className={cn('relative', className)}
          style={{
            willChange: prefersReducedMotion ? 'auto' : 'transform, opacity, filter',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MotionWrapper;

