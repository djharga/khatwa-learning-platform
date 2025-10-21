import { useState, memo } from 'react';
import {
  Play,
  Clock,
  User,
  Star,
  Award,
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [isHovered, setIsHovered] = useState(false);

  // Compact variant: Full-featured card with badges, progress ring, and detailed stats
  if (variant === 'compact') {
    return (
      <motion.div
        className={`group relative rounded-xl overflow-hidden border border-gray-200 shadow-md hover:shadow-lg transition-all duration-300 ${isNew ? 'ring-2 ring-yellow-400/50' : ''} ${isPopular ? 'ring-2 ring-purple-400/50' : ''}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <AnimatePresence>
          {progressPercentage > 0 && <ProgressRing progress={progressPercentage} />}
        </AnimatePresence>

        <CourseImage src={course.image} alt={course.title} variant="compact" />

        <QuickActionButtons isVisible={isHovered} isWishlisted={isWishlisted} isCompared={isCompared} onPreview={handlePreview} onWishlist={handleWishlist} onCompare={handleCompare} />

        <BadgeList isNew={isNew} isPopular={isPopular} hasCertificate={hasCertificate} isBestseller={isBestseller} isLimitedTime={isLimitedTime} />

        <PriceBadge price={course.price} />

        <div className="p-6 space-y-4">
          <motion.div
            className="flex items-center justify-between text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <motion.span
              className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full font-medium border border-blue-200/50"
            >
              {course.category}
            </motion.span>
            <motion.span
              className={`px-3 py-1.5 rounded-full font-medium border ${
                course.level === 'مبتدئ'
                  ? 'bg-green-100 text-green-800 border-green-200/50'
                  : course.level === 'متوسط'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200/50'
                    : 'bg-red-100 text-red-800 border-red-200/50'
              }`}
            >
              {getDifficultyEmoji(course.level)} {course.level}
            </motion.span>
          </motion.div>

          <motion.h3
            className="text-xl font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            {course.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 text-sm leading-relaxed line-clamp-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {course.description}
          </motion.p>

          <InstructorInfoCard instructor={course.instructor} rating={course.rating} reviewCount={course.reviewCount} isHovered={isHovered} />

          <CourseMeta students={course.students} duration={course.duration} filesCount={course.filesCount} />

          {progressPercentage > 0 && (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.4 }}
            >
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 font-medium">تقدم الدراسة</span>
                <span className="text-blue-600 font-bold">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          <motion.div
            className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
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
          </motion.div>

          <ActionButtons variant="compact" isBookmarked={isBookmarked} isWishlisted={isWishlisted} isLoading={isLoading} isLoadingAction={isLoadingAction} showRipple={showRipple} onEnroll={(e) => handleEnroll(e as any)} onBookmark={(e) => handleBookmark(e as any)} onWishlist={(e) => handleWishlist(e as any)} onShare={(e) => handleShare(e as any)} />
        </div>
      </motion.div>
    );
  } else {
    // Default variant: Simplified horizontal layout with side image
    return (
      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <CourseImage src={course.image} alt={course.title} variant="default" progress={progressPercentage} />

        <div className="flex-1 p-4">
          <motion.div
            className="flex items-start justify-between mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex-1">
              <motion.h3
                className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-blue-600 transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02 }}
              >
                {course.title}
              </motion.h3>
              <motion.p
                className="text-sm text-gray-600 line-clamp-2 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                {course.description}
              </motion.p>
            </div>
            <motion.div
              className="text-right ml-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-lg font-bold text-blue-600 drop-shadow-sm">
                {formatCoursePrice(course.price)}
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 text-sm text-gray-600 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
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
            <motion.span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${
                course.level === 'مبتدئ'
                  ? 'bg-green-100 text-green-800 border-green-200/50'
                  : course.level === 'متوسط'
                    ? 'bg-yellow-100 text-yellow-800 border-yellow-200/50'
                    : 'bg-red-100 text-red-800 border-red-200/50'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {course.level}
            </motion.span>
          </motion.div>

          <motion.div
            className="flex items-center justify-between text-xs text-gray-500 mb-4 bg-gray-50 rounded-lg p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
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
          </motion.div>

          <ActionButtons variant="default" isBookmarked={isBookmarked} isWishlisted={false} isLoading={isLoading} isLoadingAction={isLoadingAction} showRipple={showRipple} onEnroll={(e) => handleEnroll(e as any)} onBookmark={(e) => handleBookmark(e as any)} onWishlist={() => {}} onShare={() => {}} />
        </div>
      </motion.div>
    );
  }
});

CourseCard.displayName = 'CourseCard';

export default CourseCard;
