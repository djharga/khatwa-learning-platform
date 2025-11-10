'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageBackground from '@/components/ui/PageBackground';

export default function ReviewHubPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to question-bank page as configured in next.config.mjs
    router.replace('/question-bank');
  }, [router]);

  return (
    <PageBackground variant="courses">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <p className="text-lg text-gray-600">جاري التوجيه...</p>
        </div>
      </div>
    </PageBackground>
  );
}
