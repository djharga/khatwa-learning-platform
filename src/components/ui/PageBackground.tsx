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
  | 'community'
  | 'support'
  | 'reports'
  | 'files'
  | 'paths'
  | 'default';

export interface PageBackgroundProps {
  variant?: BackgroundVariant;
  className?: string;
  children?: React.ReactNode;
  pattern?: boolean;
  animated?: boolean;
  overlay?: boolean;
}

// Simplified background styles - Enhanced gradients for better visual appeal
const backgroundStyles: Record<BackgroundVariant, string> = {
  home: 'bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900',
  courses: 'bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-neutral-900 dark:via-primary-950/20 dark:to-neutral-900',
  cia: 'bg-gradient-to-br from-white via-accent-50/30 to-white dark:from-neutral-900 dark:via-accent-950/20 dark:to-neutral-900',
  resources: 'bg-gradient-to-br from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900',
  auth: 'bg-gradient-to-br from-primary-50 via-white to-primary-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  dashboard: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  admin: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  community: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
  support: 'bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  reports: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  files: 'bg-gradient-to-br from-neutral-50 via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950',
  paths: 'bg-gradient-to-br from-white via-primary-50/30 to-white dark:from-neutral-900 dark:via-primary-950/20 dark:to-neutral-900',
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

