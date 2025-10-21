import { useMemo } from 'react';
import { Course } from '@/types/course';
import { isNewCourse, isPopularCourse } from '@/utils/courseUtils';

/**
 * Derived state for course card display including computed flags and metrics
 */
export interface CourseCardState {
  progressPercentage: number;
  isNew: boolean;
  isPopular: boolean;
  hasCertificate: boolean;
  isBestseller: boolean;
  isLimitedTime: boolean;
}

/**
 * Custom hook for computing derived course card state including badge visibility, progress metrics, and status flags. Memoized to prevent unnecessary recalculations.
 * @param course - Course data object
 * @returns Computed course card state with all derived properties
 * @example
 * const { progressPercentage, isNew, isPopular, hasCertificate, isBestseller, isLimitedTime } = useCourseCardState(course);
 */
export function useCourseCardState(course: Course): CourseCardState {
  return useMemo(() => ({
    progressPercentage: course.progress || 0,
    isNew: isNewCourse(course),
    isPopular: isPopularCourse(course),
    hasCertificate: course.certificate?.earned || false,
    isBestseller: course.rating >= 4.8 && course.students >= 1000,
    isLimitedTime: course.price < 100 && course.students < 50,
  }), [course]);
}