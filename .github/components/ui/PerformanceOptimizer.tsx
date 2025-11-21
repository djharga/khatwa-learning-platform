'use client';

import { useEffect, useState, ReactNode, Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

/**
 * Performance Optimizer - محسّن الأداء
 * 
 * Provides performance optimizations:
 * - Lazy loading for heavy components
 * - Image optimization helpers
 * - Code splitting utilities
 * - Loading states
 */

// Lazy loading wrapper with loading state
export function LazyLoadComponent({
  children,
  fallback,
  delay = 200,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  delay?: number;
}) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!shouldLoad) {
    return (
      <div className="animate-pulse">
        {fallback || (
          <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-2xl" />
        )}
      </div>
    );
  }

  return <>{children}</>;
}

// Intersection Observer based lazy loading
export function useIntersectionLazyLoad(
  threshold: number = 0.1,
  rootMargin: string = '100px'
) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, threshold, rootMargin]);

  return [setRef, isIntersecting] as const;
}

// Image optimization helper
export function OptimizedImage({
  src,
  alt,
  className,
  width,
  height,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center ${className}`}
      >
        <span className="text-neutral-400 text-sm">خطأ في تحميل الصورة</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(false);
        }}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  );
}

// Skeleton loader component
export function SkeletonLoader({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  className?: string;
}) {
  const variantClasses = {
    default: 'rounded-2xl',
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-none',
  };

  return (
    <div
      className={`bg-neutral-200 dark:bg-neutral-800 animate-pulse ${variantClasses[variant]} ${className}`}
      aria-label="جارٍ التحميل..."
    />
  );
}

// Loading state component
export function LoadingState({
  message = 'جارٍ التحميل...',
  variant = 'default',
}: {
  message?: string;
  variant?: 'default' | 'spinner' | 'dots';
}) {
  if (variant === 'spinner') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 rounded-full animate-spin" />
        <p className="text-neutral-600 dark:text-neutral-400">{message}</p>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-8">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-3 h-3 bg-primary-600 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        <p className="text-neutral-600 dark:text-neutral-400">{message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-12 h-12 border-4 border-primary-200 dark:border-primary-800 border-t-primary-600 rounded-full animate-spin" />
      <p className="text-neutral-600 dark:text-neutral-400">{message}</p>
    </div>
  );
}

// Error boundary helper
export function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 min-h-[400px]">
      <div className="text-6xl">⚠️</div>
      <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
        حدث خطأ ما
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 text-center max-w-md">
        {error.message || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.'}
      </p>
      <button
        onClick={resetErrorBoundary}
        className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}

