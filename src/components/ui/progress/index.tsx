'use client';

import { cn } from '@/lib/utils';
import { memo } from 'react';

export type ProgressProps = {
  value: number;
  className?: string;
};

export const Progress = memo(({ value, className }: ProgressProps) => {
  return (
    <div className={cn('h-2.5 bg-gray-200 rounded-full overflow-hidden', className)}>
      <div 
        className="h-full bg-blue-500 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
});

export const CircularProgress = memo(({ 
  value, 
  size = 80,
  strokeWidth = 8
}: {
  value: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg height={size} width={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <span className="absolute text-sm font-medium text-gray-900">
        {value}%
      </span>
    </div>
  );
});
