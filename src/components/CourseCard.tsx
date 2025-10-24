import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Clock,
  User,
  Star,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { CourseCardProps } from '../types/course';
import { formatCoursePrice, getDifficultyEmoji } from '@/utils/courseUtils';
import { useCourseCardState } from '@/hooks/useCourseCardState';
import {CourseCardActionsProps, useCourseCardActions } from '@/hooks/useCourseCardActions';
import { useRippleEffect } from '@/hooks/useRippleEffect';
import { BadgeList, ProgressRing, PriceBadge, CourseImage, QuickActionButtons, InstructorInfoCard, CourseMeta, ActionButtons } from './CourseCard/';

/**
 * Course card component with two display variants (compact and default). Features animated progress indicators, interactive badges, instructor information with hover card, course statistics, file type breakdown, and action buttons. Supports bookmark, wishlist, compare, and enrollment actions with loading states and ripple effects.
 * @param course - Course data object containing all course information
 * @param variant - Display variant: 'compact' (full-featured card) or 'default' (simplified horizontal layout)
 * @param onBookmark - Optional callback when bookmark button is clicked
 * @param onShare - Optional callback when share button is clicked
 * @param onEnroll - Optional callback when enroll button is clicked
 * @param isLoading - Whether the card is in a loading state
 * @returns Memoized course card component
 */
const CourseCard = memo(({ course, variant = 'default', onBookmark, onShare, onEnroll, isLoading = false }: CourseCardProps) => {
  // Custom hooks for state management and actions
  const cardState = useCourseCardState(course);
  const { progressPercentage, isNew, isPopular, hasCertificate, isBestseller, isLimitedTime } = cardState;
  const { showRipple, triggerRipple } = useRippleEffect();
  const actions = useCourseCardActions({ courseId: course.id, isLoading, onBookmark, onShare, onEnroll, onRipple: triggerRipple });
  const { isBookmarked, isWishlisted, isCompared, isLoadingAction, handleBookmark, handleShare, handleWishlist, handleCompare, handlePreview, handleEnroll } = actions;

  // Default variant: Simplified horizontal layout with side image
  return (
    <motion.div 
      className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-blue-200 transition-all duration-300 overflow-hidden"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* تأثير الإضاءة عند التمرير */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent -translate-x-full group-hover:translate-x-full"
        transition={{ duration: 0.8 }}
      />
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10">
        <div className="w-full sm:w-auto sm:flex-shrink-0">
          <CourseImage src={course.image} alt={course.title} variant="default" progress={progressPercentage} />
        </div>

        <div className="flex-1 p-3 sm:p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-all duration-300 cursor-pointer">
                {course.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {course.description}
              </p>
            </div>
            <div className="text-right sm:ml-4 mt-2 sm:mt-0">
              <span className="text-lg font-bold text-blue-600 drop-shadow-sm">
                {formatCoursePrice(course.price)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
            <span className="flex items-center gap-1">
              <User className="w-4 h-4" />
              {course.instructor.name}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              {course.rating}
            </span>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border hover-scale-subtle ${
                course.level === 'مبتدئ'
                  ? 'bg-green-100 text-green-800 border-green-200/50'
                  : course.level === 'متوسط'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200/50'
                    : 'bg-red-100 text-red-800 border-red-200/50'
              }`}
            >
              {course.level}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <span>آخر نشاط: {course.lastActivity || 'منذ يوم'}</span>
              {hasCertificate && (
                <span className="flex items-center gap-1 text-green-600">
                  <Award className="w-3 h-3" />
                  شهادة متوفرة
                </span>
              )}
            </div>
            <span>تم الإنشاء: {course.createdAt ? new Date(course.createdAt).toLocaleDateString('ar-SA') : 'غير محدد'}</span>
          </div>

          <ActionButtons variant="default" isBookmarked={isBookmarked} isWishlisted={false} isLoading={isLoading} isLoadingAction={isLoadingAction} showRipple={showRipple} onEnroll={(e) => handleEnroll(e as any)} onBookmark={(e) => handleBookmark(e as any)} onWishlist={() => {}} onShare={() => {}} />
        </div>
      </div>
    </motion.div>
  );
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
