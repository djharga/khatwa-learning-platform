'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

/**
 * ProgressRing - دائرة تقدم أنيقة
 * 
 * Features:
 * - Circular progress indicator
 * - Smooth animations
 * - Multiple sizes
 * - Color variants
 * - Optional label in center
 */

interface ProgressRingProps {
  progress: number; // 0-100
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strokeWidth?: number;
  color?: 'primary' | 'accent' | 'gold' | 'mint' | 'success' | 'warning' | 'error';
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeMap = {
  sm: { diameter: 60, fontSize: 'text-xs' },
  md: { diameter: 80, fontSize: 'text-sm' },
  lg: { diameter: 120, fontSize: 'text-base' },
  xl: { diameter: 160, fontSize: 'text-lg' },
};

const colorMap = {
  primary: {
    stroke: '#5B36E8',
    gradient: 'url(#primaryGradient)',
    bg: '#E0E7FF',
  },
  accent: {
    stroke: '#1E40AF',
    gradient: 'url(#accentGradient)',
    bg: '#DBEAFE',
  },
  gold: {
    stroke: '#F59E0B',
    gradient: 'url(#goldGradient)',
    bg: '#FEF3C7',
  },
  mint: {
    stroke: '#10B981',
    gradient: 'url(#mintGradient)',
    bg: '#D1FAE5',
  },
  success: {
    stroke: '#22C55E',
    gradient: 'url(#successGradient)',
    bg: '#DCFCE7',
  },
  warning: {
    stroke: '#F59E0B',
    gradient: 'url(#warningGradient)',
    bg: '#FEF3C7',
  },
  error: {
    stroke: '#EF4444',
    gradient: 'url(#errorGradient)',
    bg: '#FEE2E2',
  },
};

export const ProgressRing = React.forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      progress,
      size = 'md',
      strokeWidth = 8,
      color = 'primary',
      showLabel = true,
      label,
      className,
    },
    ref
  ) => {
    const { diameter, fontSize } = sizeMap[size];
    const radius = (diameter - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;
    const colors = colorMap[color];

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', className)}
        style={{ width: diameter, height: diameter }}
      >
        <svg
          width={diameter}
          height={diameter}
          className="transform -rotate-90"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5B36E8" />
              <stop offset="100%" stopColor="#6D4AFF" />
            </linearGradient>
            <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#34D399" />
            </linearGradient>
            <linearGradient id="successGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#4ADE80" />
            </linearGradient>
            <linearGradient id="warningGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#FBBF24" />
            </linearGradient>
            <linearGradient id="errorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#F87171" />
            </linearGradient>
          </defs>

          {/* Background Circle */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={colors.bg}
            strokeWidth={strokeWidth}
            fill="none"
          />

          {/* Progress Circle */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={colors.gradient}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-500 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${colors.stroke}40)`,
            }}
          />
        </svg>

        {/* Center Label */}
        {showLabel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span
              className={cn(
                'font-bold',
                fontSize,
                color === 'primary' && 'text-primary-600',
                color === 'accent' && 'text-accent-600',
                color === 'gold' && 'text-gold-600',
                color === 'mint' && 'text-mint-600',
                color === 'success' && 'text-success-600',
                color === 'warning' && 'text-warning-600',
                color === 'error' && 'text-danger-600'
              )}
            >
              {label || `${Math.round(progress)}%`}
            </span>
          </div>
        )}
      </div>
    );
  }
);

ProgressRing.displayName = 'ProgressRing';