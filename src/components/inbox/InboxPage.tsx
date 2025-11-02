import React from 'react';
import InboxList from './InboxList';
import MessageThread from './MessageThread';
import ComposeMessage from './ComposeMessage';
import { PathProgressTracker } from '@/components/ui/learning-paths';

/**
 * Inbox page layout component composing inbox list, message thread, and compose message components.
 * Features responsive grid layout with progress tracker integration.
 */
export default function InboxPage() {
  return (
    <div className="space-y-6">
      {/* Main inbox layout with header and two-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">الرسائل الداخلية</h1>
          <ComposeMessage />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <InboxList />
          </div>
          <div className="lg:col-span-2">
            <MessageThread />
          </div>
        </div>
      </div>
      {/* Learning path progress tracker integration (demo data) */}
      <PathProgressTracker
        progress={65}
        completedSteps={5}
        totalSteps={8}
        estimatedTime="~3 ساعات متبقية"
        nextStep="المراجعة المالية"
      />
    </div>
  );
}
