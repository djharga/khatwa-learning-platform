import { useState, useCallback } from 'react';
import { CourseSortOptions, UseCourseSortReturn } from '@/types/course';

const DEFAULT_SORT: CourseSortOptions = {
  field: 'rating',
  direction: 'desc',
};

export const useCourseSort = (
  initialSort?: Partial<CourseSortOptions>
): UseCourseSortReturn => {
  const [sort, setSort] = useState<CourseSortOptions>({
    ...DEFAULT_SORT,
    ...initialSort,
  });

  const updateSort = useCallback(
    (
      field: CourseSortOptions['field'],
      direction?: CourseSortOptions['direction']
    ) => {
      setSort({
        field,
        direction:
          direction ||
          (sort.field === field && sort.direction === 'asc' ? 'desc' : 'asc'),
      });
    },
    [sort.field, sort.direction]
  );

  const toggleSort = useCallback((field: CourseSortOptions['field']) => {
    setSort((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const resetSort = useCallback(() => {
    setSort(DEFAULT_SORT);
  }, []);

  return {
    sort,
    updateSort,
    toggleSort,
    resetSort,
  };
};
