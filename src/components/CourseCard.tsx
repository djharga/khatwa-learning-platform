'use client';

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
import { safeFormatNumber } from '@/lib/numberUtils';
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
const CourseCardComponent = ({ course, variant = 'default', onBookmark, onShare, onEnroll, isLoading = false }: CourseCardProps) => {
  // Custom hooks for state management and actions
  const cardState = useCourseCardState(course);
  const { progressPercentage, isNew, isPopular, hasCertificate, isBestseller, isLimitedTime } = cardState;
  const { showRipple, triggerRipple } = useRippleEffect();
  const actions = useCourseCardActions({ courseId: course.id, isLoading, onBookmark, onShare, onEnroll, onRipple: triggerRipple });
  const { isBookmarked, isWishlisted, isCompared, isLoadingAction, handleBookmark, handleShare, handleWishlist, handleCompare, handlePreview, handleEnroll } = actions;

  // Modern, soft, and attractive card design inspired by global platforms
  return (
    <motion.div 
      className="group relative bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-2 hover:shadow-elevation-4 border border-neutral-200 dark:border-neutral-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out overflow-hidden card-tech hover-glow-primary-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-neutral-700 dark:to-neutral-800">
        <CourseImage src={course.image} alt={course.title} variant="compact" progress={progressPercentage} />
        
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              جديد
            </span>
          )}
          {isPopular && (
            <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              الأكثر شعبية
            </span>
          )}
          {isBestseller && (
            <span className="px-3 py-1 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
              الأفضل مبيعاً
            </span>
          )}
        </div>

        {/* Progress Overlay */}
        {progressPercentage > 0 && progressPercentage < 100 && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-white text-sm">
              <Play className="w-4 h-4" />
              <span className="font-medium">معاينة الدورة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 sm:p-6">
        {/* Title and Price */}
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white leading-tight mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ease-out line-clamp-2 heading-tech text-shadow-sm">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3">
            {course.description}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{course.rating}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{safeFormatNumber(course.students)}+ طالب</span>
            </div>
            <div className="text-left">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                {formatCoursePrice(course.price)}
              </span>
            </div>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30 flex items-center justify-center transition-colors duration-200 ease-out">
              <User className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            </div>
            <span className="text-sm text-neutral-700 dark:text-neutral-300 font-medium">{course.instructor.name}</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{course.duration}</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              course.level === 'مبتدئ'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                : course.level === 'متوسط'
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400'
                  : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            }`}
          >
            {course.level}
          </span>
        </div>

        {/* Progress Section (if enrolled) */}
        {course.progress !== undefined && (
          <div className="mb-4 pb-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors duration-200 ease-out ${
                  course.progress === 100
                    ? 'bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400'
                    : course.progress > 0
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                }`}>
                  {course.progress === 100 ? '✓ مكتملة' : course.progress > 0 ? '⏳ قيد التنفيذ' : '○ لم تبدأ'}
                </span>
                {hasCertificate && (
                  <span className="flex items-center gap-1 text-success-600 dark:text-success-400">
                    <Award className="w-4 h-4" />
                    <span className="text-xs font-medium">شهادة</span>
                  </span>
                )}
              </div>
              {course.progress > 0 && (
                <span className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                  {course.progress}%
                </span>
              )}
            </div>
            {course.progress > 0 && (
              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  className={`h-2 rounded-full ${
                    course.progress === 100
                      ? 'bg-gradient-to-r from-success-500 to-success-600'
                      : 'bg-gradient-to-r from-primary-500 to-primary-600'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${course.progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                />
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {course.progress !== undefined && course.progress > 0 && course.progress < 100 ? (
            <Link
              href={`/student/courses/${course.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 active:from-primary-500 active:to-primary-600 active:brightness-110 text-white rounded-xl font-semibold text-sm transition-all duration-200 ease-out hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="استكمل التعلم"
            >
              <Play className="w-4 h-4" />
              <span>استكمل التعلم</span>
            </Link>
          ) : course.progress === 100 ? (
            <Link
              href={`/certificates`}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 active:from-success-500 active:to-success-600 active:brightness-110 text-white rounded-xl font-semibold text-sm transition-all duration-200 ease-out hover:shadow-lg hover:shadow-success-500/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
              aria-label="عرض الشهادة"
            >
              <Award className="w-4 h-4" />
              <span>عرض الشهادة</span>
            </Link>
          ) : (
            <Link
              href={`/courses/${course.slug || course.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 active:from-primary-500 active:to-primary-600 active:brightness-110 text-white rounded-xl font-semibold text-sm transition-all duration-200 ease-out hover:shadow-lg hover:shadow-primary-500/25 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="عرض الدورة"
            >
              <Play className="w-4 h-4" />
              <span>عرض الدورة</span>
            </Link>
          )}
          <div className="flex-shrink-0">
            <ActionButtons 
              variant="default" 
              isBookmarked={isBookmarked} 
              isWishlisted={false} 
              isLoading={isLoading} 
              isLoadingAction={isLoadingAction} 
              showRipple={showRipple} 
              onEnroll={(e) => handleEnroll(e as any)} 
              onBookmark={(e) => handleBookmark(e as any)} 
              onWishlist={() => {}} 
              onShare={() => {}} 
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

CourseCardComponent.displayName = 'CourseCard';

const CourseCard = memo(CourseCardComponent);

export default CourseCard;
