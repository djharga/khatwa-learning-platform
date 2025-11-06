import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for the CourseImage component
 */
export interface CourseImageProps {
  /** Image URL */
  src: string;
  /** Image alt text */
  alt: string;
  /** Display variant: 'compact' or 'default' (default: 'compact') */
  variant?: 'compact' | 'default';
  /** Optional progress percentage for overlay (default variant only) */
  progress?: number;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Course image component with progressive loading, skeleton placeholder, and hover effects. Supports compact and default variants with optional progress overlay.
 * @param src - Image URL
 * @param alt - Image alt text
 * @param variant - Display variant: 'compact' (default) or 'default'
 * @param progress - Optional progress percentage for overlay (default variant only)
 * @param className - Optional additional CSS classes
 * @example
 * <CourseImage src="/path/to/image.jpg" alt="Course Image" variant="compact" />
 */
const CourseImage: React.FC<CourseImageProps> = ({ src, alt, variant = 'compact', progress, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const containerClass = variant === 'compact'
    ? `relative h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${className || ''}`
    : `relative w-48 h-48 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 ${className || ''}`;

  return (
    <div className={containerClass}>
      {!imageLoaded && (
        <>
          <div className="absolute inset-0 skeleton animate-pulse rounded-t-2xl"></div>
          {variant === 'compact' && (
            <motion.img
              src={src}
              alt={alt}
              className="w-full h-full object-cover filter blur-sm scale-110 opacity-30"
              loading="lazy"
            />
          )}
        </>
      )}
      <motion.img
        src={src}
        alt={alt}
        className={variant === 'compact'
          ? `w-full h-full object-cover transition-all duration-150 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`
          : `w-full h-full object-cover rounded-l-xl transition-all duration-150 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`
        }
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
      {variant === 'compact' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
      {variant === 'default' && progress && progress > 0 && (
        <AnimatePresence>
          <motion.div
            className="absolute inset-0 bg-white/90 rounded-l-xl flex items-center justify-center border border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-gray-900 text-xs font-bold drop-shadow-lg">
              {Math.round(progress)}%
            </span>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CourseImage;