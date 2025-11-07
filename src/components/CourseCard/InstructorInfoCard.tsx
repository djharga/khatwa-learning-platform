import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';
import { CourseInstructor } from '@/types/course';
import { safeFormatNumber } from '@/lib/numberUtils';

/**
 * Props for the InstructorInfoCard component
 */
export interface InstructorInfoCardProps {
  /** Instructor data object containing name, title, avatar, etc. */
  instructor: CourseInstructor;
  /** Course rating (0-5) */
  rating: number;
  /** Number of reviews (optional) */
  reviewCount?: number;
  /** Whether to show detailed hover card (default: true) */
  showHoverCard?: boolean;
  /** External hover state for hover card visibility */
  isHovered?: boolean;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Instructor information section with avatar, name, title, and rating.
 * Optionally displays detailed hover card with bio, stats, and full rating information.
 *
 * @param instructor - Instructor data object
 * @param rating - Course rating
 * @param reviewCount - Number of reviews
 * @param showHoverCard - Whether to show hover card
 * @param isHovered - Hover state for card visibility
 * @param className - Additional CSS classes
 * @returns Memoized instructor info card component
 *
 * @example
 * ```tsx
 * <InstructorInfoCard
 *   instructor={course.instructor}
 *   rating={course.rating}
 *   reviewCount={course.reviewCount}
 *   isHovered={isHovered}
 * />
 * ```
 */
const InstructorInfoCard = ({
  instructor,
  rating,
  reviewCount,
  showHoverCard = true,
  isHovered,
  className = '',
}: InstructorInfoCardProps) => {
  /**
   * Renders star rating display with optional review count
   */
  const renderStars = (rating: number, reviewCount?: number) => {
    return (
      <div className="flex items-center gap-1">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-all duration-300 ${
                i < Math.floor(rating)
                  ? 'text-yellow-400 fill-current drop-shadow-sm'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-gray-700 ml-1">
          {rating}
        </span>
        {reviewCount && (
          <span className="text-xs text-gray-500">
            ({reviewCount})
          </span>
        )}
      </div>
    );
  };

  return (
    <motion.div
      className={`relative flex items-center gap-3 py-3 border-t border-gray-100/50 group/instructor ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4 }}
    >
      <motion.img
        src={instructor.avatar}
        alt={instructor.name}
        className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-300 cursor-pointer"
        whileHover={{ scale: 1.1 }}
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900 group-hover/instructor:text-blue-600 transition-colors duration-300 cursor-pointer">
          {instructor.name}
        </p>
        <p className="text-xs text-gray-600">
          {instructor.title}
        </p>
      </div>
      {renderStars(rating, reviewCount)}
      {showHoverCard && isHovered && (
        <AnimatePresence>
          <motion.div
            className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={instructor.avatar}
                alt={instructor.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-200"
              />
              <div>
                <p className="font-semibold text-gray-900">{instructor.name}</p>
                <p className="text-sm text-gray-600">{instructor.title}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-3 line-clamp-3">{instructor.bio}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {safeFormatNumber(instructor.students)} طالب
              </span>
              <span className="text-gray-600">
                {instructor.courses} دورة
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2">
              {renderStars(instructor.rating)}
              <span className="text-sm font-medium text-gray-700">
                {instructor.rating}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default InstructorInfoCard;