'use client';

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <History className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              شجرة التعديلات
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            تابع جميع التعديلات التي أجريتها على ملفات الدورات
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
        >
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                جميع التعديلات
              </button>
              <button
                onClick={() => setFilter('course')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === 'course'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
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
          transition={{ delay: 0.2 }}
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

