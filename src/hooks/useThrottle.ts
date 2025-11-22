'use client';

import { useRef, useCallback, useEffect } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const callbackRef = useRef(callback);

  // Update callback ref when it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const throttledCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (Date.now() - lastRun.current >= delay) {
          callbackRef.current(...args);
          lastRun.current = Date.now();
        }
      }, delay - (Date.now() - lastRun.current));
    },
    [delay]
  );

  return throttledCallback as T;
}

