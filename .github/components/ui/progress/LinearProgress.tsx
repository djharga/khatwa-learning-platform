'use client';

import { cn } from '@/lib/utils';

export type LinearProgressProps = {
  value: number;
  className?: string;
};

export const LinearProgress = ({ value, className }: LinearProgressProps) => {
  return (
    <div className={cn('h-2.5 bg-gray-200 rounded-full overflow-hidden', className)}>
      <div 
        className="h-full bg-indigo-600 transition-all duration-500"
        style={{ width: `${value}%` }}
      />
    </div>
  );
};
