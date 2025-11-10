'use client';

import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Skeleton Component — Modern loading placeholder system
 * Unified, animated, and accessible across all design variants.
 */

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
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
    'relative bg-neutral-200 dark:bg-neutral-700/80 overflow-hidden rounded isolate';
  const variantClasses = {
    default: 'rounded-lg',
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };
  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'skeleton-wave',
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
        <Skeleton variant="rectangular" height="4rem" width="4rem" className="rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton height="1.5rem" width="80%" />
          <Skeleton height="1rem" width="60%" />
          <Skeleton height="1rem" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height="0.75rem" width="100%" className="mb-2 rounded-full" />
      <Skeleton variant="rectangular" height="2.5rem" width="100%" className="rounded-xl" />
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
/*                              Extra Styling (CSS)                           */
/* -------------------------------------------------------------------------- */
/**
 * Add this CSS once in your global stylesheet (e.g. globals.css)
 * to enable the wave animation.
 * 
 * @example
 * .skeleton-wave::after {
 *   content: "";
 *   position: absolute;
 *   inset: 0;
 *   background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
 *   transform: translateX(-100%);
 *   animation: skeleton-wave 1.6s infinite ease-in-out;
 * }
 * @keyframes skeleton-wave {
 *   100% { transform: translateX(100%); }
 * }
 */
