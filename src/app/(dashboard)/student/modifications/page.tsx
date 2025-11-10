'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import FileModificationHistory from '@/components/trainee/FileModificationHistory';
import { useAuth } from '@/contexts/AuthContext';
import { History, FileText, Filter } from 'lucide-react';

export default function ModificationsPage() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'course'>('all');
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
              <History className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              شجرة التعديلات
            </h1>
          </div>
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
            تابع جميع التعديلات التي أجريتها على ملفات الدورات
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
          className="mb-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-neutral-600 dark:text-neutral-400" aria-hidden="true" />
              <span className="text-sm sm:text-base font-medium text-neutral-700 dark:text-neutral-300">التصفية:</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 sm:px-4 py-2 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
                aria-label="عرض جميع التعديلات"
                aria-pressed={filter === 'all'}
                type="button"
              >
                جميع التعديلات
              </button>
              <button
                onClick={() => setFilter('course')}
                className={`px-3 sm:px-4 py-2 min-h-[44px] rounded-lg font-medium text-xs sm:text-sm transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  filter === 'course'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
                aria-label="عرض التعديلات حسب الدورة"
                aria-pressed={filter === 'course'}
                type="button"
              >
                حسب الدورة
              </button>
            </div>
          </div>
        </motion.div>

        {/* Modification History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
        >
          <FileModificationHistory
            userId={user?.id}
            courseId={filter === 'course' ? selectedCourseId : undefined}
          />
        </motion.div>
      </div>
    </div>
  );
}

