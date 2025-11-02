/**
 * Performance Utilities - أدوات قياس الأداء
 * Utilities for monitoring and optimizing performance
 */

/**
 * Measure performance of a function
 */
export function measurePerformance<T>(
  name: string,
  fn: () => T
): T {
  if (typeof window === 'undefined' || !window.performance) {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Performance] ${name}: ${duration.toFixed(2)}ms`);
  }

  // Report to analytics if needed
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'timing_complete', {
      name,
      value: Math.round(duration),
    });
  }

  return result;
}

/**
 * Lazy load a component with Intersection Observer
 */
export function createLazyLoadObserver(
  callback: () => void,
  options: IntersectionObserverInit = {}
) {
  if (typeof window === 'undefined' || !window.IntersectionObserver) {
    // Fallback: load immediately
    callback();
    return null;
  }

  const defaultOptions: IntersectionObserverInit = {
    rootMargin: '50px',
    threshold: 0.01,
    ...options,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.disconnect();
      }
    });
  }, defaultOptions);

  return observer;
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

/**
 * Check if device is low-end for performance optimizations
 */
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined' || !navigator.hardwareConcurrency) {
    return false;
  }

  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency;
  // Check memory if available
  const memory = (navigator as any).deviceMemory;

  return cores <= 2 || (memory && memory <= 4);
}

/**
 * Reduce motion for users who prefer it
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Report Core Web Vitals
 */
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('[Web Vitals]', metric);
  }

  // Send to analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    const { name, value, id, delta } = metric;
    (window as any).gtag('event', name, {
      event_category: 'Web Vitals',
      value: Math.round(name === 'CLS' ? delta * 1000 : delta),
      event_label: id,
      non_interaction: true,
    });
  }
}

