'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CourseScheduler from '@/components/admin/CourseScheduler';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function CourseSchedulePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            العودة
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              الجدولة التلقائية
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            فتح/إغلاق الدورة تلقائياً حسب التاريخ
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CourseScheduler courseId={courseId} />
        </motion.div>
      </div>
    </div>
  );
}

