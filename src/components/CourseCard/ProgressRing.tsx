import { motion } from 'framer-motion';

/**
 * Props for the ProgressRing component
 */
export interface ProgressRingProps {
  /** Progress percentage (0-100) */
  progress: number;
  /** Ring diameter in pixels (default: 48) */
  size?: number;
  /** Ring stroke width (default: 3) */
  strokeWidth?: number;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Animated circular progress ring with color-coded progress indicator.
 * Displays percentage in center with smooth animation.
 * Colors change based on progress: red (<25%), orange (<50%), yellow (<75%), green (≥75%).
 *
 * @example
 * ```tsx
 * <ProgressRing progress={75} size={48} strokeWidth={3} />
 * ```
 */
const ProgressRing = ({
  progress,
  size = 48,
  strokeWidth = 3,
  className = '',
}: ProgressRingProps) => {
  /**
   * Returns color classes based on progress percentage for visual feedback
   */
  const getProgressColor = (progress: number) => {
    if (progress < 25) return 'text-red-500 stroke-red-500';
    if (progress < 50) return 'text-orange-500 stroke-orange-500';
    if (progress < 75) return 'text-yellow-500 stroke-yellow-500';
    return 'text-green-500 stroke-green-500';
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <motion.div
      className={`absolute top-4 right-4 z-20 ${className}`}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <svg
          className="transform -rotate-90 drop-shadow-lg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            className="text-gray-200/50"
            strokeWidth={strokeWidth}
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <motion.circle
            className={`${getProgressColor(progress)} transition-all duration-1000 ease-out drop-shadow-sm`}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className={`text-xs font-bold ${getProgressColor(progress).split(' ')[0]} drop-shadow-sm`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProgressRing;