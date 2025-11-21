'use client';

import React, { memo, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { BackgroundVariant } from './PageBackground';

export interface BackgroundPatternsProps {
  variant?: BackgroundVariant;
  intensity?: 'light' | 'medium' | 'strong';
  className?: string;
}

const BackgroundPatterns: React.FC<BackgroundPatternsProps> = memo(({
  variant = 'default',
  intensity = 'light',
  className,
}) => {
  const opacity = useMemo(() => ({
    light: 'opacity-[0.03] dark:opacity-[0.015]', // Reduced from 5% to 3% for better performance
    medium: 'opacity-[0.06] dark:opacity-[0.03]', // Reduced from 10% to 6%
    strong: 'opacity-[0.12] dark:opacity-[0.06]', // Reduced from 20% to 12%
  }), []);

  // Grid Pattern Component
  const GridPattern = useMemo(() => (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        opacity[intensity],
        className
      )}
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 0, 0, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px', // Slightly larger to reduce rendering
        transform: 'translateZ(0)', // GPU acceleration
      }}
    />
  ), [intensity, className, opacity]);

  // Dot Pattern Component
  const DotPattern = useMemo(() => (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        opacity[intensity],
        className
      )}
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(0, 0, 0, 0.08) 1px, transparent 1px)',
        backgroundSize: '35px 35px', // Slightly larger to reduce rendering
        transform: 'translateZ(0)', // GPU acceleration
      }}
    />
  ), [intensity, className, opacity]);

  // Diagonal Lines Pattern Component
  const DiagonalPattern = useMemo(() => (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        opacity[intensity],
        className
      )}
      style={{
        backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.05) 10px, rgba(0, 0, 0, 0.05) 20px)',
        transform: 'translateZ(0)', // GPU acceleration
      }}
    />
  ), [intensity, className, opacity]);

  // Circular Pattern Component
  const CircularPattern = useMemo(() => (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        opacity[intensity],
        className
      )}
      style={{
        backgroundImage: `
          radial-gradient(circle at 2px 2px, rgba(0, 0, 0, 0.08) 1px, transparent 0)
        `,
        backgroundSize: '45px 45px', // Slightly larger to reduce rendering
        transform: 'translateZ(0)', // GPU acceleration
      }}
    />
  ), [intensity, className, opacity]);

  // Return pattern based on variant - Memoized
  const patternComponent = useMemo(() => {
    switch (variant) {
      case 'home':
        return GridPattern;
      case 'courses':
        return DotPattern;
      case 'cia':
        return CircularPattern;
      case 'resources':
        return GridPattern;
      case 'auth':
        return DotPattern;
      case 'dashboard':
      case 'admin':
        return GridPattern;
      default:
        return null;
    }
  }, [variant, GridPattern, DotPattern, CircularPattern, DiagonalPattern]);

  return patternComponent;
});

BackgroundPatterns.displayName = 'BackgroundPatterns';

export default BackgroundPatterns;
