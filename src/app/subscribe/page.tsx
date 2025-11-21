'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SubscriptionComponent from '@/components/SubscriptionComponent';

/**
 * Subscription page - allows users to subscribe to access all courses
 */
export default function SubscribePage() {
  const router = useRouter();
  const [showSubscription, setShowSubscription] = useState(true);

  const handleClose = () => {
    setShowSubscription(false);
    router.push('/');
  };

  const handleSuccess = () => {
    router.push('/courses');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {showSubscription && (
        <SubscriptionComponent 
          onClose={handleClose}
        />
      )}
    </div>
  );
}
