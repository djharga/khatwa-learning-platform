'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Skeleton Component — Modern loading placeholder system
 * Unified, animated, and accessible across all design variants.
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'shimmer' | 'none';
  height?: string;
  width?: string;
  lines?: number;
}

export function Skeleton({
  className,
  variant = 'default',
  animation = 'pulse',
  height,
  width,
  lines,
  ...props
}: SkeletonProps) {
  const baseClasses =
    'relative bg-neutral-200 dark:bg-neutral-700/80 overflow-hidden rounded isolate transition-all duration-200 ease-out';
  const variantClasses = {
    default: 'rounded-lg',
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
    shimmer: 'skeleton-shimmer',
    none: '',
  };

  if (variant === 'text' && lines && lines > 1) {
    return (
      <div className={cn('space-y-2', className)} {...props} aria-label="جارٍ التحميل">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              baseClasses,
              variantClasses[variant],
              animationClasses[animation],
              i === lines - 1 && 'w-3/4'
            )}
            style={{
              height: height || '1rem',
              width: i === lines - 1 ? '75%' : width || '100%',
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], animationClasses[animation], className)}
      style={{
        height: height || (variant === 'text' ? '1rem' : '1.5rem'),
        width: width || '100%',
      }}
      aria-label="جارٍ التحميل"
      {...props}
    />
  );
}

/**
 * Group wrapper to synchronize skeleton animations
 */
Skeleton.Group = function SkeletonGroup({ children }: { children: React.ReactNode }) {
  return <div className="skeleton-group">{children}</div>;
};

/* -------------------------------------------------------------------------- */
/*                                Card Skeletons                              */
/* -------------------------------------------------------------------------- */

export function CardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-neutral-800/80 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-700',
        'hover:shadow-md transition-shadow',
        className
      )}
      {...props}
    >
      <Skeleton variant="rectangular" height="1.8rem" width="65%" className="mb-4" />
      <Skeleton variant="text" lines={3} className="mb-4" />
      <Skeleton variant="rectangular" height="2.5rem" width="40%" />
    </div>
  );
}

export function StatCardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-neutral-800/80 rounded-2xl p-4 sm:p-6 shadow-sm border border-neutral-200 dark:border-neutral-700',
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between mb-4">
        <Skeleton variant="circular" height="3rem" width="3rem" />
        <Skeleton variant="rectangular" height="1.5rem" width="3rem" />
      </div>
      <Skeleton variant="rectangular" height="1.25rem" width="60%" className="mb-2" />
      <Skeleton variant="rectangular" height="2rem" width="45%" />
    </div>
  );
}

export function CourseCardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'bg-white dark:bg-neutral-800/80 rounded-2xl p-5 sm:p-6 shadow-sm border border-neutral-200 dark:border-neutral-700 transition-colors',
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-4 mb-4">
        <Skeleton variant="rectangular" height="4rem" width="4rem" className="rounded-xl" animation="shimmer" />
        <div className="flex-1 space-y-2">
          <Skeleton height="1.5rem" width="80%" animation="shimmer" />
          <Skeleton height="1rem" width="60%" animation="shimmer" />
          <Skeleton height="1rem" width="40%" animation="shimmer" />
        </div>
      </div>
      <Skeleton variant="rectangular" height="0.75rem" width="100%" className="mb-2 rounded-full" animation="shimmer" />
      <Skeleton variant="rectangular" height="2.5rem" width="100%" className="rounded-xl" animation="shimmer" />
    </div>
  );
}

export function TableSkeleton({
  rows = 5,
  columns = 4,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { rows?: number; columns?: number }) {
  return (
    <div className={cn('space-y-4', className)} {...props}>
      {/* Table Header */}
      <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} height="1.4rem" variant="rectangular" />
        ))}
      </div>
      {/* Table Rows */}
      {Array.from({ length: rows }).map((_, r) => (
        <div
          key={r}
          className="grid gap-4"
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton key={c} height="1.1rem" variant="rectangular" />
          ))}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Demo Component                                 */
/* -------------------------------------------------------------------------- */

/**
 * Demo component to showcase different skeleton loading effects
 */
export function SkeletonDemo() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Pulse Animation (Default)</h3>
        <div className="space-y-2">
          <Skeleton animation="pulse" height="20px" width="100%" />
          <Skeleton animation="pulse" height="20px" width="80%" />
          <Skeleton animation="pulse" height="20px" width="60%" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Wave Animation</h3>
        <div className="space-y-2">
          <Skeleton animation="wave" height="20px" width="100%" />
          <Skeleton animation="wave" height="20px" width="80%" />
          <Skeleton animation="wave" height="20px" width="60%" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Shimmer Animation ✨</h3>
        <div className="space-y-2">
          <Skeleton animation="shimmer" height="20px" width="100%" />
          <Skeleton animation="shimmer" height="20px" width="80%" />
          <Skeleton animation="shimmer" height="20px" width="60%" />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Card Skeletons with Shimmer</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Full Skeleton Screen</h3>
        <ShimmerSkeletonScreen variant="cards" count={3} />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                             Shimmer Skeleton Screen                        */
/* -------------------------------------------------------------------------- */

/**
 * Full skeleton screen with shimmer effect for loading states
 */
export function ShimmerSkeletonScreen({
  variant = 'cards',
  count = 6,
  className,
  ...props
}: {
  variant?: 'cards' | 'list' | 'table';
  count?: number;
} & React.HTMLAttributes<HTMLDivElement>) {
  const renderCardSkeleton = (index: number) => (
    <div key={index} className="animate-in fade-in-50 slide-in-from-bottom-4 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
      <CourseCardSkeleton />
    </div>
  );

  const renderListSkeleton = (index: number) => (
    <div key={index} className="animate-in fade-in-50 slide-in-from-left-4 duration-300" style={{ animationDelay: `${index * 50}ms` }}>
      <div className="flex items-center gap-4 p-4 bg-white dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700">
        <Skeleton variant="circular" height="3rem" width="3rem" animation="shimmer" />
        <div className="flex-1 space-y-2">
          <Skeleton height="1.25rem" width="60%" animation="shimmer" />
          <Skeleton height="0.875rem" width="40%" animation="shimmer" />
        </div>
        <Skeleton variant="rectangular" height="2rem" width="4rem" animation="shimmer" />
      </div>
    </div>
  );

  const renderTableSkeleton = () => (
    <TableSkeleton rows={count} columns={4} />
  );

  const renderContent = () => {
    switch (variant) {
      case 'list':
        return (
          <div className="space-y-3">
            {Array.from({ length: count }).map((_, index) => renderListSkeleton(index))}
          </div>
        );
      case 'table':
        return renderTableSkeleton();
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => renderCardSkeleton(index))}
          </div>
        );
    }
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      {renderContent()}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                              Extra Styling (CSS)                           */
/* -------------------------------------------------------------------------- */
/**
 * 🎭 Skeleton Loading Effects Documentation
 *
 * This component provides multiple loading animation types:
 *
 * ✨ Shimmer Effect: Modern Facebook/Twitter style loading animation
 * 🌊 Wave Effect: Traditional skeleton wave animation
 * 💓 Pulse Effect: Subtle opacity pulsing animation
 * 🚫 None: Static placeholder without animation
 *
 * Usage Examples:
 *
 * // Basic shimmer skeleton
 * <Skeleton animation="shimmer" width="200px" height="20px" />
 *
 * // Shimmer card skeleton
 * <CourseCardSkeleton />
 *
 * // Full shimmer skeleton screen
 * <ShimmerSkeletonScreen variant="cards" count={6} />
 *
 * // Different animation types
 * <Skeleton animation="pulse" />      // Default pulse
 * <Skeleton animation="wave" />       // Wave effect
 * <Skeleton animation="shimmer" />    // Shimmer effect ✨
 * <Skeleton animation="none" />       // No animation
 *
 * // Responsive variants
 * <Skeleton variant="text" lines={3} animation="shimmer" />
 * <Skeleton variant="circular" animation="shimmer" />
 * <Skeleton variant="rectangular" animation="shimmer" />
 *
 * Features:
 * - 🎨 Modern shimmer effect with gradient animation
 * - 🌙 Dark mode support
 * - ♿ Accessibility compliant (respects prefers-reduced-motion)
 * - 📱 Responsive design
 * - 🎯 TypeScript support
 *
 * The shimmer CSS is automatically included in globals.css, so no additional setup is needed.
 */
