'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Search,
  Filter,
  Clock,
  Users,
  Star,
  BookOpen,
  FileText,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Course, CourseFilters, CourseSortOptions } from '@/types/course';
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { useCourseSort } from '@/hooks/useCourseSort';
import { useCoursePagination } from '@/hooks/useCoursePagination';
import {
  filterCourses,
  sortCourses,
  paginateCourses,
  getUniqueCategories,
} from '@/utils/courseUtils';
import { mockCourses, COURSES_PER_PAGE } from './courses-list-data';
import { SearchFilters, ActiveFiltersChips, CoursesGrid, EmptyState, PaginationControls } from './CoursesListComponent/';
import CourseCard from './CourseCard';

/**
 * Local UI state for the courses list component including loading, error, view mode, and filter panel visibility.
 */
interface CoursesListState {
  loading: boolean;
  error: string | null;
  viewMode: 'grid' | 'list';
  showFilters: boolean;
  showMobileFilters: boolean;
}

/**
 * Courses list component with search, filtering, sorting, and pagination. Features responsive grid/list view modes, animated transitions, and comprehensive filter controls. Integrates with custom hooks for state management and displays courses using the CourseCard component.
 *
 * Features:
 * - Search by title, description, instructor, category, or tags
 * - Filter by category and difficulty level
 * - Toggle between grid and list view modes
 * - Pagination with configurable items per page
 * - Loading skeletons and empty state handling
 * - Animated transitions and hover effects
 * - Active filter badges with individual removal
 * - Responsive design with mobile optimization
 *
 * @returns Memoized courses list component with full filtering and pagination
 */
const CoursesListComponent = () => {
  const [state, setState] = useState<CoursesListState>({
    loading: false,
    error: null,
    viewMode: 'grid',
    showFilters: false,
    showMobileFilters: false,
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Custom hooks for filters, sorting, and pagination state management
  const { filters, updateFilters, resetFilters } = useCourseFilters();
  const { sort, updateSort } = useCourseSort();
  const courses = useMemo(() => mockCourses, []);
  const { pagination, goToPage, nextPage, prevPage } = useCoursePagination(
    courses.length,
    COURSES_PER_PAGE
  );

  // Derived state for filter status and pagination boundaries
  const hasActiveFilters = Boolean(
    filters.search ||
    (filters.category && filters.category !== 'الكل') ||
    (filters.level && filters.level !== 'الكل')
  );

  const canGoNext = pagination.page < pagination.totalPages;
  const canGoPrev = pagination.page > 1;

  // Memoized filter options
  const categories = useMemo(
    () => ['الكل', ...getUniqueCategories(courses)],
    [courses]
  );

  const levels = useMemo(() => ['الكل', 'مبتدئ', 'متوسط', 'متقدم'], []);

  // Apply filters, sorting, and pagination to courses
  const filteredAndSortedCourses = useMemo(() => {
    const filtered = filterCourses(courses, filters);
    const sorted = sortCourses(filtered, sort);
    return paginateCourses(sorted, pagination.page, pagination.limit);
  }, [courses, filters, sort, pagination.page, pagination.limit]);

  // Event handlers for course actions
  /**
   * Handles course bookmark action. Shows success toast notification.
   */
  const handleBookmark = useCallback(async (courseId: string) => {
    toast.success('تم إضافة الدورة إلى المفضلة');
  }, []);

  /**
   * Handles course share action. Shows success toast notification.
   */
  const handleShare = useCallback(async (courseId: string) => {
    toast.success('تم نسخ رابط الدورة');
  }, []);

  /**
   * Handles course enrollment action. Shows success toast notification.
   */
  const handleEnroll = useCallback(async (courseId: string) => {
    toast.success('تم التسجيل في الدورة بنجاح');
  }, []);

  /**
   * Toggles between grid and list view modes.
   */
  const toggleViewMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      viewMode: prev.viewMode === 'grid' ? 'list' : 'grid',
    }));
  }, []);

  /**
   * Toggles filter panel visibility (desktop).
   */
  const toggleFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showFilters: !prev.showFilters,
    }));
  }, []);

  /**
   * Toggles mobile filter panel visibility.
   */
  const toggleMobileFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showMobileFilters: !prev.showMobileFilters,
    }));
  }, []);

  // Hero section with gradient background

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 transition-all duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 py-24 lg:py-28 transition-all duration-300">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
              الدورات التدريبية
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed tracking-normal">
              اختر من بين مجموعة واسعة من الدورات التعليمية في مختلف المجالات
            </p>
          </motion.div>
        </div>
      </section>

          {/* Main content section with search, filters, and courses */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10 mb-20 transition-all duration-300"
          >
            <SearchFilters
              searchValue={filters.search || ''}
              onSearchChange={(value) => updateFilters({ search: value })}
              hasActiveFilters={hasActiveFilters}
              onToggleFilters={toggleFilters}
              viewMode={state.viewMode}
              onToggleViewMode={toggleViewMode}
              resultsCount={filteredAndSortedCourses.length}
              searchInputRef={searchInputRef}
            />
          </motion.div>

          <ActiveFiltersChips
            filters={filters}
            onUpdateFilters={updateFilters}
            onResetFilters={resetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {filteredAndSortedCourses.length > 0 ? (
            <CoursesGrid
              courses={filteredAndSortedCourses}
              viewMode={state.viewMode}
              isLoading={state.loading}
              onBookmark={handleBookmark}
              onShare={handleShare}
              onEnroll={handleEnroll}
            />
          ) : (
            !state.loading && (
              <EmptyState
                onResetFilters={resetFilters}
                onSuggestCourse={() => updateFilters({ search: 'مقدمة في البرمجة' })}
              />
            )
          )}

          {!state.loading &&
            filteredAndSortedCourses.length > 0 &&
            pagination.totalPages > 1 && (
              <PaginationControls
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={goToPage}
                onPrevious={prevPage}
                onNext={nextPage}
                canGoPrev={canGoPrev}
                canGoNext={canGoNext}
              />
            )}
    </div>
  );
};

CoursesListComponent.displayName = 'CoursesListComponent';

export default CoursesListComponent;
