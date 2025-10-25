'use client';

import React, { Suspense, lazy } from 'react';
import ErrorBoundary from './ErrorBoundary';
import LazyWrapper, { EnhancedLoadingFallback } from './LazyWrapper';
import PerformanceMonitor from './PerformanceMonitor';

// Lazy load heavy components
const LazyHeroSection = lazy(() => import('./HeroSection'));
const LazyMeetingRoomComponent = lazy(() => import('./MeetingRoomComponent'));
const LazyModernAdminPanel = lazy(() => import('./ModernAdminPanel'));
const LazyProfileComponent = lazy(() => import('./ProfileComponent'));

// Performance-optimized wrapper components
export const PerformanceOptimizedHeroSection = () => (
  <ErrorBoundary>
    <Suspense fallback={<EnhancedLoadingFallback delay={200} />}>
      <LazyWrapper delay={100}>
        <LazyHeroSection />
      </LazyWrapper>
    </Suspense>
  </ErrorBoundary>
);

export const PerformanceOptimizedMeetingRoom = () => (
  <ErrorBoundary>
    <Suspense fallback={<EnhancedLoadingFallback delay={300} />}>
      <LazyWrapper delay={200}>
        <LazyMeetingRoomComponent />
      </LazyWrapper>
    </Suspense>
  </ErrorBoundary>
);

export const PerformanceOptimizedAdminPanel = () => (
  <ErrorBoundary>
    <Suspense fallback={<EnhancedLoadingFallback delay={400} />}>
      <LazyWrapper delay={300}>
        <LazyModernAdminPanel />
      </LazyWrapper>
    </Suspense>
  </ErrorBoundary>
);

export const PerformanceOptimizedProfile = () => (
  <ErrorBoundary>
    <Suspense fallback={<EnhancedLoadingFallback delay={500} />}>
      <LazyWrapper delay={400}>
        <LazyProfileComponent />
      </LazyWrapper>
    </Suspense>
  </ErrorBoundary>
);

// Performance monitoring wrapper
export const withPerformanceMonitoring = <P extends Record<string, any> = object>(
  Component: React.ComponentType<P & { ref?: React.Ref<any> }>,
  componentName: string
) => {
  return React.forwardRef<any, P>((props, ref) => (
    <ErrorBoundary>
      <PerformanceMonitor
        enabled={process.env.NODE_ENV === 'development'}
        position="top-right"
        compact
      />
      <Component {...(props as P)} ref={ref} />
    </ErrorBoundary>
  ));
};

// Main performance wrapper for the entire app
export const PerformanceWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ErrorBoundary>
    <PerformanceMonitor
      enabled={process.env.NODE_ENV === 'development'}
      showInProduction={false}
      position="top-right"
    />
    {children}
  </ErrorBoundary>
);

export default PerformanceWrapper;
