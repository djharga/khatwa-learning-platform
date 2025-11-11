/**
 * useStudent Hook
 * Hook لاستخدام React Query لجلب بيانات الطالب
 */

import { useQuery } from '@tanstack/react-query';
import { fetchStudent } from '@/lib/apiClient';
import { User } from '@/lib/apiTypes';

/**
 * Hook لجلب بيانات طالب واحد بالـ ID
 */
export function useStudent(studentId: string | undefined) {
  return useQuery({
    queryKey: ['student', studentId],
    queryFn: async () => {
      if (!studentId) throw new Error('Student ID is required');
      const response = await fetchStudent(studentId);
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response.data;
    },
    enabled: !!studentId,
    staleTime: 600000, // 10 دقائق
    retry: 1,
  });
}

