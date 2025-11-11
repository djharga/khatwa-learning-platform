/**
 * useCourses Hook
 * Hook لاستخدام React Query لجلب الدورات
 */

import { useQuery } from '@tanstack/react-query';
import { fetchCourses, fetchCourseById, fetchCourseBySlug } from '../lib/apiClient';
import { Course } from '../lib/apiTypes';

/**
 * Hook لجلب جميع الدورات
 */
export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await fetchCourses();
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data || [];
    },
    staleTime: 300000, // 5 دقائق
    retry: 1,
  });
}

/**
 * Hook لجلب دورة واحدة بالـ ID
 */
export function useCourse(id: string | undefined) {
  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      if (!id) throw new Error('Course ID is required');
      const response = await fetchCourseById(id);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    enabled: !!id,
    staleTime: 300000,
    retry: 1,
  });
}

/**
 * Hook لجلب دورة واحدة بالـ slug
 */
export function useCourseBySlug(slug: string | undefined) {
  return useQuery({
    queryKey: ['course', 'slug', slug],
    queryFn: async () => {
      if (!slug) throw new Error('Course slug is required');
      const response = await fetchCourseBySlug(slug);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    enabled: !!slug,
    staleTime: 300000,
    retry: 1,
  });
}

