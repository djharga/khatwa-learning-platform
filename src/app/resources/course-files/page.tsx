'use client';

import CourseTreeView from '@/components/CourseTreeView';
import { motion } from 'framer-motion';

export default function CourseFilesPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ملفات الكورسات التعليمية</h1>
          <p className="text-gray-600">جميع الملفات والموارد المتاحة للكورسات المسجلة</p>
        </motion.div>

        {/* محتوى الملفات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CourseTreeView 
            mode="files"
            showDownloadButtons={true}
            showCourseFilter={true}
          />
        </motion.div>
      </div>
    </div>
  );
}
