import React from 'react';
import { motion } from 'framer-motion';

/**
 * Comprehensive loading state components library providing multiple loader types: skeleton, spinner, progress, pulse, and custom loaders. All components support size variants, color themes, and animations using Framer Motion.
 */

/**
 * Base props shared by all loader components.
 */
interface LoaderProps {
  /**
   * Loader size variant (sm, md, lg, xl)
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Color theme (primary, accent, secondary)
   */
  color?: 'primary' | 'accent' | 'secondary';
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for SkeletonLoader component with variant-specific options.
 */
interface SkeletonProps extends LoaderProps {
  /**
   * Skeleton type (card, text, image, button)
   */
  variant?: 'card' | 'text' | 'image' | 'button';
  /**
   * Number of text lines to render (for text variant)
   */
  lines?: number;
  /**
   * Custom width (CSS value)
   */
  width?: string;
  /**
   * Custom height (CSS value)
   */
  height?: string;
}

/**
 * Props for SpinnerLoader component with text and gradient options.
 */
interface SpinnerProps extends LoaderProps {
  /**
   * Display loading text below spinner
   */
  showText?: boolean;
  /**
   * Custom loading text (default: 'جاري التحميل...')
   */
  text?: string;
  /**
   * Use gradient spinner instead of solid color
   */
  gradient?: boolean;
}

/**
 * Props for ProgressLoader component supporting linear and circular variants.
 */
interface ProgressProps extends LoaderProps {
  /**
   * Current progress value
   */
  value?: number;
  /**
   * Maximum progress value (default: 100)
   */
  max?: number;
  /**
   * Progress type (linear, circular)
   */
  variant?: 'linear' | 'circular';
  /**
   * Display percentage text
   */
  showPercentage?: boolean;
}

/**
 * Props for PulseLoader component with glow effects.
 */
interface PulseProps extends LoaderProps {
  /**
   * Pulse type (button, card, dot)
   */
  variant?: 'button' | 'card' | 'dot';
  /**
   * Enable glow animation effect
   */
  glow?: boolean;
}

/**
 * Props for CustomLoader component with logo and message.
 */
interface CustomLoaderProps extends LoaderProps {
  /**
   * Display animated logo
   */
  showLogo?: boolean;
  /**
   * Custom loading message
   */
  message?: string;
}

/**
 * Skeleton loader component for content placeholders. Supports multiple variants: card (full card structure), text (multiple lines), image (with shimmer effect), button (button-shaped).
 * @example
 * <SkeletonLoader variant="card" />
 * <SkeletonLoader variant="text" lines={3} />
 * <SkeletonLoader variant="image" width="200px" height="150px" />
 */
export const SkeletonLoader: React.FC<SkeletonProps> = ({
  variant = 'text',
  size = 'md',
  lines = 1,
  width = '100%',
  height = '1rem',
  className = '',
}) => {
  // Size classes for skeleton height
  const sizeClasses = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-5',
    xl: 'h-6',
  };

  const renderSkeleton = (key: number) => (
    <div
      key={key}
      className={`skeleton rounded-md ${sizeClasses[size]} ${className}`}
      style={{ width, height }}
    />
  );

  // Card variant with full structure
  if (variant === 'card') {
    return (
      <div className="glass-card p-6 space-y-4 animate-pulse">
        <div className="skeleton rounded-lg h-48 w-full" />
        <div className="space-y-2">
          <div className="skeleton rounded h-4 w-3/4" />
          <div className="skeleton rounded h-4 w-1/2" />
        </div>
        <div className="flex space-x-2">
          <div className="skeleton rounded-full h-8 w-8" />
          <div className="skeleton rounded-full h-8 w-8" />
        </div>
      </div>
    );
  }

  // Image variant with shimmer animation
  if (variant === 'image') {
    return (
      <div
        className="skeleton rounded-lg overflow-hidden"
        style={{ width, height }}
      >
        <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      </div>
    );
  }

  // Button-shaped skeleton
  if (variant === 'button') {
    return <div className="skeleton rounded-xl h-12 w-full max-w-xs" />;
  }

  // Default text variant
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }, (_, i) => renderSkeleton(i))}
    </div>
  );
};

/**
 * Spinning loader component with optional text and gradient effects. Uses smooth rotation animation.
 * @example
 * <SpinnerLoader size="md" color="primary" />
 * <SpinnerLoader showText text="Loading data..." />
 * <SpinnerLoader gradient size="lg" />
 */
export const SpinnerLoader: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  showText = false,
  text = 'جاري التحميل...',
  gradient = false,
  className = '',
}) => {
  // Size classes for spinner dimensions
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // Color classes for spinner border
  const colorClasses = {
    primary: 'border-primary',
    accent: 'border-accent',
    secondary: 'border-secondary-expert',
  };

  // Gradient or solid color spinner
  const spinnerClass = gradient
    ? 'loading-spinner-gradient'
    : `loading-spinner-smooth ${colorClasses[color]}`;

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-2 ${className}`}
    >
      <div className={`${spinnerClass} ${sizeClasses[size]}`} />
      {showText && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-text-secondary animate-pulse"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

/**
 * Progress loader component supporting linear bar and circular ring variants. Shows completion percentage with smooth animations.
 * @example
 * <ProgressLoader value={60} max={100} variant="linear" />
 * <ProgressLoader value={75} variant="circular" showPercentage />
 */
export const ProgressLoader: React.FC<ProgressProps> = ({
  value = 0,
  max = 100,
  variant = 'linear',
  size = 'md',
  color = 'primary',
  showPercentage = false,
  className = '',
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4',
  };

  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    secondary: 'bg-secondary-expert',
  };

  // Circular progress with SVG
  if (variant === 'circular') {
    const radius =
      size === 'sm' ? 16 : size === 'md' ? 24 : size === 'lg' ? 32 : 48;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div
        className={`relative inline-flex items-center justify-center ${className}`}
      >
        <svg
          className={`transform -rotate-90 ${sizeClasses[size]}`}
          width={radius * 2 + 8}
          height={radius * 2 + 8}
        >
          <circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-background-subtle"
          />
          <motion.circle
            cx={radius + 4}
            cy={radius + 4}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className={colorClasses[color]}
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: strokeDasharray }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            strokeLinecap="round"
          />
        </svg>
        {showPercentage && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    );
  }

  // Linear progress bar
  return (
    <div
      className={`w-full bg-background-subtle rounded-full overflow-hidden ${className}`}
    >
      <motion.div
        className={`h-full ${colorClasses[color]} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      />
      {showPercentage && (
        <div className="flex justify-center mt-2">
          <span className="text-sm text-text-secondary">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  );
};

/**
 * Pulsing loader component with scale and opacity animations. Supports dot, button, and card variants with optional glow effects.
 * @example
 * <PulseLoader variant="dot" size="md" />
 * <PulseLoader variant="button" glow />
 * <PulseLoader variant="card" />
 */
export const PulseLoader: React.FC<PulseProps> = ({
  variant = 'dot',
  size = 'md',
  color = 'primary',
  glow = false,
  className = '',
}) => {
  // Size classes for pulse dots
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
    xl: 'w-6 h-6',
  };

  // Color classes for pulse background
  const colorClasses = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    secondary: 'bg-secondary-expert',
  };

  // Optional glow effect
  const glowClasses = glow ? 'shadow-glow-primary animate-pulse-glow-soft' : '';

  if (variant === 'button') {
    return (
      <div className={`inline-flex items-center space-x-2 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${glowClasses}`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span className="text-sm text-text-secondary">جاري المعالجة...</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <motion.div
        className={`glass-card p-6 ${glowClasses} ${className}`}
        animate={{
          scale: [1, 1.02, 1],
          opacity: [1, 0.8, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="space-y-3">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
          <div className="flex space-x-2">
            <div className="skeleton h-8 w-16 rounded-full" />
            <div className="skeleton h-8 w-16 rounded-full" />
          </div>
        </div>
      </motion.div>
    );
  }

  // Default dot variant
  return (
    <motion.div
      className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full ${glowClasses} ${className}`}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [1, 0.3, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
};

/**
 * Custom branded loader with animated logo and message. Features rotating inner circle, pulsing rings, and smooth entrance animations. Ideal for full-page loading states.
 * @example
 * <CustomLoader size="lg" message="Loading platform..." />
 * <CustomLoader showLogo={false} message="Please wait" />
 */
export const CustomLoader: React.FC<CustomLoaderProps> = ({
  size = 'lg',
  showLogo = true,
  message = 'جاري تحميل المنصة...',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-6 p-8 ${className}`}
    >
      {showLogo && (
        <motion.div
          className={`relative ${sizeClasses[size]}`}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Animated logo with rotating inner circle */}
          <div className="w-full h-full bg-gradient-primary-smooth rounded-full flex items-center justify-center shadow-glow-primary">
            <motion.div
              className="w-1/2 h-1/2 bg-white rounded-full drop-shadow-lg"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>
          {/* Pulsing rings around logo */}
          <motion.div
            className="absolute inset-0 border-2 border-accent rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute inset-2 border border-primary rounded-full"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
          />
        </motion.div>
      )}

      <motion.div
        className="text-center space-y-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gradient-primary">
          {message}
        </h3>
        <div className="flex justify-center space-x-1">
          <PulseLoader variant="dot" size="sm" />
          <PulseLoader variant="dot" size="sm" />
          <PulseLoader variant="dot" size="sm" />
        </div>
      </motion.div>
    </div>
  );
};

/**
 * Main export object containing all loader components. Import individual loaders or use the default export.
 * Import: import LoadingStates from '@/components/ui/LoadingStates' or import { SkeletonLoader } from '@/components/ui/LoadingStates'
 */
const LoadingStates = {
  SkeletonLoader,
  SpinnerLoader,
  ProgressLoader,
  PulseLoader,
  CustomLoader,
};

export default LoadingStates;