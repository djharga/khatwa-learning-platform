import { useQuery } from '@tanstack/react-query';
import { ApiResponse } from '@/lib/apiTypes';

interface SubscriptionStatus {
  hasSubscription: boolean;
  subscriptionPlan: string | null;
  hasEnrollment: boolean | null;
  hasAccess: boolean;
}

/**
 * Hook للتحقق من حالة الاشتراك باستخدام React Query
 */
export function useSubscription(courseId?: string) {
  return useQuery({
    queryKey: ['subscription', courseId],
    queryFn: async (): Promise<SubscriptionStatus> => {
      const url = courseId
        ? `/api/enrollment-status?courseId=${courseId}`
        : '/api/enrollment-status';
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch subscription status');
      }
      const data = await response.json();
      return {
        hasSubscription: data.hasSubscription || false,
        subscriptionPlan: data.subscriptionPlan || null,
        hasEnrollment: data.hasEnrollment ?? null,
        hasAccess: data.hasAccess || false,
      };
    },
    staleTime: 300000, // 5 دقائق
    retry: 1,
  });
}

