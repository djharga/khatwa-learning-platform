'use client';

import { useState, useEffect } from 'react';
import ConsultingDashboard from '@/components/ConsultingSystem/ConsultingDashboard';

export default function ConsultingPage() {
  const [hasSubscription, setHasSubscription] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/enrollment-status');
        const status = await response.json();
        setHasSubscription(status.hasSubscription || false);
      } catch (error) {
        console.error('Error checking subscription:', error);
        setHasSubscription(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, []);

  if (loading) {
  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
          </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <ConsultingDashboard hasSubscription={hasSubscription || false} />
    </div>
  );
}
