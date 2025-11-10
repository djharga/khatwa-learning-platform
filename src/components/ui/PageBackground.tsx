'use client';

import React, { memo } from 'react';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

// Lazy load BackgroundPatterns for better performance
const BackgroundPatterns = dynamic(() => import('./BackgroundPatterns'), {
  ssr: false,
  loading: () => null,
});

export type BackgroundVariant = 
  | 'home'
  | 'courses'
  | 'cia'
  | 'resources'
  | 'auth'
  | 'dashboard'
  | 'admin'
  | 'default';

export interface PageBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  children?: React.ReactNode;
  pattern?: boolean;
  animated?: boolean;
  overlay?: boolean;
}

// Simplified background styles - Single color gradients for better performance
const backgroundStyles: Record<BackgroundVariant, string> = {
  home: 'bg-white dark:bg-neutral-900',
  courses: 'bg-white dark:bg-neutral-900',
  cia: 'bg-white dark:bg-neutral-900',
  resources: 'bg-white dark:bg-neutral-900',
  auth: 'bg-white dark:bg-neutral-900',
  dashboard: 'bg-gray-50 dark:bg-neutral-900',
  admin: 'bg-gray-50 dark:bg-neutral-900',
  default: 'bg-white dark:bg-neutral-900',
};

const PageBackground: React.FC<PageBackgroundProps> = memo(({
  variant = 'default',
  className,
  children,
  pattern = false, // Disabled by default for better performance
  animated = false, // Unused but kept for backward compatibility
  overlay = false, // Unused but kept for backward compatibility
}) => {
  // Only render patterns on client side if explicitly requested
  const [isClient, setIsClient] = React.useState(false);
  
  React.useEffect(() => {
    // Only set client if pattern is needed - saves unnecessary render
    if (pattern) {
      setIsClient(true);
    }
  }, [pattern]);

  return (
    <div
      className={cn(
        'relative min-h-screen',
        backgroundStyles[variant],
        className
      )}
    >
      {/* Pattern Overlay - Only load if explicitly requested */}
      {pattern && isClient && <BackgroundPatterns variant={variant} />}

      {/* Content */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
});

PageBackground.displayName = 'PageBackground';

export default PageBackground;

