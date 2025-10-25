import { useState, useCallback, useMemo } from 'react';
import { CoursePagination, UseCoursePaginationReturn } from '@/types/course';

const DEFAULT_PAGINATION: CoursePagination = {
  page: 1,
  limit: 12,
  total: 0,
  totalPages: 0,
};

export const useCoursePagination = (
  totalItems: number,
  initialLimit = 12
): UseCoursePaginationReturn => {
  const [pagination, setPagination] = useState<CoursePagination>({
    ...DEFAULT_PAGINATION,
    limit: initialLimit,
  });

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pagination.limit);
  }, [totalItems, pagination.limit]);

  const updatePagination = useCallback((updates: Partial<CoursePagination>) => {
    setPagination((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        updatePagination({ page });
      }
    },
    [totalPages, updatePagination]
  );

  const nextPage = useCallback(() => {
    if (pagination.page < totalPages) {
      updatePagination({ page: pagination.page + 1 });
    }
  }, [pagination.page, totalPages, updatePagination]);

  const prevPage = useCallback(() => {
    if (pagination.page > 1) {
      updatePagination({ page: pagination.page - 1 });
    }
  }, [pagination.page, updatePagination]);

  const setLimit = useCallback(
    (limit: number) => {
      updatePagination({
        limit,
        page: 1, // Reset to first page when changing limit
        totalPages: Math.ceil(totalItems / limit),
      });
    },
    [totalItems, updatePagination]
  );

  const resetPagination = useCallback(() => {
    setPagination({
      ...DEFAULT_PAGINATION,
      limit: initialLimit,
    });
  }, [initialLimit]);

  const canGoNext = useMemo(() => {
    return pagination.page < totalPages;
  }, [pagination.page, totalPages]);

  const canGoPrev = useMemo(() => {
    return pagination.page > 1;
  }, [pagination.page]);

  const startIndex = useMemo(() => {
    return (pagination.page - 1) * pagination.limit;
  }, [pagination.page, pagination.limit]);

  const endIndex = useMemo(() => {
    return Math.min(startIndex + pagination.limit, totalItems);
  }, [startIndex, pagination.limit, totalItems]);

  return {
    pagination: {
      ...pagination,
      total: totalItems,
      totalPages,
    },
    goToPage,
    nextPage,
    prevPage,
    setLimit,
    resetPagination,
  };
};
