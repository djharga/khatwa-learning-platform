'use client';

import { motion } from 'framer-motion';
import PageVisibilityControl from '@/components/admin/PageVisibilityControl';
import { Settings, Eye } from 'lucide-react';

export default function VisibilitySettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              التحكم في رؤية الصفحات
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            فتح/قفل صفحات وشاشات محددة حسب الصلاحيات
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <PageVisibilityControl />
        </motion.div>
      </div>
    </div>
  );
}

