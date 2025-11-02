import { useState, useCallback, useMemo } from 'react';
import { CourseFilters, UseCourseFiltersReturn } from '@/types/course';

const DEFAULT_FILTERS: CourseFilters = {
  search: '',
  category: 'الكل',
  level: 'الكل',
  priceRange: undefined,
  rating: undefined,
  duration: undefined,
  instructor: undefined,
  tags: [],
};

export const useCourseFilters = (
  initialFilters?: Partial<CourseFilters>
): UseCourseFiltersReturn => {
  const [filters, setFilters] = useState<CourseFilters>({
    ...DEFAULT_FILTERS,
    ...initialFilters,
  });

  const updateFilters = useCallback((newFilters: Partial<CourseFilters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      category: 'الكل',
      level: 'الكل',
      priceRange: undefined,
      rating: undefined,
      duration: undefined,
      instructor: undefined,
      tags: [],
    });
  }, []);

  const hasActiveFilters = useMemo(() => {
    return (
      filters.search !== '' ||
      filters.category !== 'الكل' ||
      filters.level !== 'الكل' ||
      filters.priceRange !== undefined ||
      filters.rating !== undefined ||
      filters.duration !== undefined ||
      filters.instructor !== undefined ||
      (filters.tags && filters.tags.length > 0)
    );
  }, [filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    clearFilters,
    hasActiveFilters: Boolean(hasActiveFilters),
  };
};
