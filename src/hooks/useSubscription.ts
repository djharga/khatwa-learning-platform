import { useState, useEffect } from 'react';

interface SubscriptionStatus {
  hasSubscription: boolean;
  subscriptionPlan: string | null;
  hasEnrollment: boolean | null;
  hasAccess: boolean;
  loading: boolean;
}

/**
 * Hook للتحقق من حالة الاشتراك
 */
export function useSubscription(courseId?: string): SubscriptionStatus {
  const [status, setStatus] = useState<SubscriptionStatus>({
    hasSubscription: false,
    subscriptionPlan: null,
    hasEnrollment: null,
    hasAccess: false,
    loading: true,
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const url = courseId
          ? `/api/enrollment-status?courseId=${courseId}`
          : '/api/enrollment-status';
        const response = await fetch(url);
        const data = await response.json();
        setStatus({
          ...data,
          loading: false,
        });
      } catch (error) {
        console.error('Error checking subscription:', error);
        setStatus((prev) => ({ ...prev, loading: false }));
      }
    };

    checkStatus();
  }, [courseId]);

  return status;
}

