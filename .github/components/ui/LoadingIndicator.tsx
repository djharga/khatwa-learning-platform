'use client';

import React from 'react';

interface LoadingIndicatorProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'purple' | 'gray';
  text?: string;
  fullScreen?: boolean;
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size = 'md',
  color = 'blue',
  text,
  fullScreen = false,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    blue: 'border-primary-600 dark:border-primary-400',
    green: 'border-success-600 dark:border-success-400',
    purple: 'border-secondary-innovate-600 dark:border-secondary-innovate-400',
    gray: 'border-neutral-500 dark:border-neutral-400',
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} border-2 ${colorClasses[color]} border-t-transparent rounded-full animate-spin transition-all duration-200 ease-out`}
        aria-hidden="true"
      />
      {text && (
        <p className="text-sm text-neutral-600 dark:text-neutral-400 font-medium animate-pulse transition-all duration-200 ease-out">
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className={`fixed inset-0 z-50 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ease-out ${className}`}>
        {spinner}
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      {spinner}
    </div>
  );
};

export default LoadingIndicator;
