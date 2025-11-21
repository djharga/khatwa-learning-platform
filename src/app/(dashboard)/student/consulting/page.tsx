'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
      <div className="min-h-screen bg-[#F7F8FC] dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center bg-white dark:bg-neutral-800 rounded-[14px] shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-[3px] border-[#E5E7EB] border-t-[#5B36E8] mx-auto mb-4"></div>
          <p className="text-base text-[#6B7280] dark:text-neutral-400" dir="rtl">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC] dark:bg-neutral-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      >
        <ConsultingDashboard hasSubscription={hasSubscription || false} />
      </motion.div>
    </div>
  );
}
