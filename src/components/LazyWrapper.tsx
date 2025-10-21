'use client';

import React, { Suspense, lazy, ComponentType } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Clock, Zap } from 'lucide-react';

interface LazyWrapperProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  delay?: number;
  className?: string;
}

// Loading Spinner Component
const LoadingSpinner = ({
  size = 'md',
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={`${sizeClasses[size]} text-blue-500`}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
    </div>
  );
};

// Skeleton Loader Component
const SkeletonLoader = ({ className = '' }: { className?: string }) => (
  <div className={`animate-pulse ${className}`}>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-4 mb-2"></div>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-4 mb-2 w-3/4"></div>
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-4 w-1/2"></div>
  </div>
);

// Enhanced Loading Fallback
const EnhancedLoadingFallback = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay / 1000, duration: 0.3 }}
    className="flex flex-col items-center justify-center p-8 space-y-4"
  >
    <motion.div
      animate={{
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
    >
      <Zap className="w-8 h-8 text-white" />
    </motion.div>

    <div className="text-center">
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (delay + 200) / 1000 }}
        className="text-lg font-semibold text-gray-900 dark:text-white mb-2"
      >
        جاري التحميل...
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: (delay + 400) / 1000 }}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        يرجى الانتظار قليلاً
      </motion.p>
    </div>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{
        delay: (delay + 600) / 1000,
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full max-w-xs"
    />
  </motion.div>
);

// Lazy Wrapper Component
const LazyWrapper: React.FC<LazyWrapperProps> = ({
  children,
  fallback,
  delay = 0,
  className = '',
}) => {
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showContent) {
    return fallback || <EnhancedLoadingFallback delay={delay} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Higher-Order Component for Lazy Loading
export const withLazyLoading = (
  Component: ComponentType<any>,
  fallback?: React.ReactNode,
  delay?: number
) => {
  const LazyComponent = React.forwardRef<any, any>((props, ref) => (
    <LazyWrapper fallback={fallback} delay={delay}>
      <Component {...props} ref={ref} />
    </LazyWrapper>
  ));

  LazyComponent.displayName = `withLazyLoading(${Component.displayName || Component.name})`;

  return LazyComponent;
};

// Lazy Component Factory
export const createLazyComponent = <P extends object>(
  importFunc: () => Promise<{ default: ComponentType<P> }>,
  fallback?: React.ReactNode,
  delay?: number
) => {
  const LazyComponent = lazy(importFunc);

  return React.forwardRef<any, P>((props, ref) => (
    <Suspense fallback={fallback || <EnhancedLoadingFallback delay={delay} />}>
      <LazyComponent {...props} ref={ref} />
    </Suspense>
  ));
};

// Performance Monitoring Hook
export const usePerformanceMonitor = (componentName: string) => {
  const renderStartTime = React.useRef<number>(0);
  const mountStartTime = React.useRef<number>(0);

  React.useEffect(() => {
    mountStartTime.current = performance.now();

    return () => {
      const mountTime = performance.now() - mountStartTime.current;
      console.log(`${componentName} mount time: ${mountTime.toFixed(2)}ms`);
    };
  }, [componentName]);

  React.useLayoutEffect(() => {
    renderStartTime.current = performance.now();
  });

  React.useEffect(() => {
    const renderTime = performance.now() - renderStartTime.current;
    if (renderTime > 16) {
      // More than one frame (60fps)
      console.warn(`${componentName} slow render: ${renderTime.toFixed(2)}ms`);
    }
  });
};

// Intersection Observer Hook for Lazy Loading
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [ref, options]);

  return isIntersecting;
};

// Virtual Scrolling Hook
export const useVirtualScrolling = (
  itemCount: number,
  itemHeight: number,
  containerHeight: number
) => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    itemCount
  );

  const visibleItems = Array.from(
    { length: endIndex - startIndex },
    (_, i) => startIndex + i
  );

  const totalHeight = itemCount * itemHeight;
  const offsetY = startIndex * itemHeight;

  return {
    visibleItems,
    totalHeight,
    offsetY,
    setScrollTop,
  };
};

export default LazyWrapper;
export { LoadingSpinner, SkeletonLoader, EnhancedLoadingFallback };
