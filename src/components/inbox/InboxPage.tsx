import React from 'react';
import { motion } from 'framer-motion';
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="space-y-4 sm:space-y-6">
        {/* Main inbox layout with header and two-column grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              الرسائل الداخلية
            </h1>
            <ComposeMessage />
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
    </div>
  );
}
