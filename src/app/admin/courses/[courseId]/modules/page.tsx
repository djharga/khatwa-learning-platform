'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CourseModuleManager from '@/components/admin/CourseModuleManager';
import type { Module } from '@/types/course-management';
import { ArrowLeft, Loader2 } from 'lucide-react';

export default function CourseModulesPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadModules();
  }, [courseId]);

  const loadModules = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}/modules`);
      if (response.ok) {
        const data = await response.json();
        setModules(data.modules || []);
      }
    } catch (error) {
      console.error('Error loading modules:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            إدارة المحاور
          </h1>
        </motion.div>

        <CourseModuleManager
          courseId={courseId}
          modules={modules}
          onModulesChange={setModules}
        />
      </div>
    </div>
  );
}

