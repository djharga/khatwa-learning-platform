'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CourseFileTree from '@/components/trainee/CourseFileTree';
import type { CourseFileTree as CourseFileTreeType, CourseFileNode } from '@/types/course-management';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import { ArrowRight, Loader2 } from 'lucide-react';

export default function CourseFilesPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = params.courseId as string;

  const [fileTree, setFileTree] = useState<CourseFileTreeType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<CourseFileNode | null>(null);

  const loadFileTree = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/trainees/courses/${courseId}/files`);
      if (!response.ok) {
        throw new Error('فشل تحميل ملفات الدورة');
      }
      const data = await response.json();
      setFileTree(data.fileTree);
    } catch (error) {
      console.error('Error loading file tree:', error);
      toast.error('فشل تحميل ملفات الدورة');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  // Load course file tree
  useEffect(() => {
    loadFileTree();
  }, [loadFileTree]);

  const handleFileSelect = (file: CourseFileNode) => {
    setSelectedFile(file);
  };

  const handleFileDownload = async (file: CourseFileNode) => {
    try {
      const response = await fetch(`/api/trainees/files/${file.id}/download`);
      if (!response.ok) {
        throw new Error('فشل تحميل الملف');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success('تم تحميل الملف بنجاح');
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('فشل تحميل الملف');
    }
  };

  const handleFileRename = async (fileId: string, newName: string) => {
    try {
      const response = await fetch(`/api/trainees/files/${fileId}/rename`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName }),
      });
      if (!response.ok) {
        throw new Error('فشل تعديل اسم الملف');
      }
      // Reload file tree
      await loadFileTree();
    } catch (error) {
      console.error('Error renaming file:', error);
      throw error;
    }
  };

  const handleFileCopy = async (fileId: string) => {
    try {
      const response = await fetch(`/api/trainees/files/${fileId}/copy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ createPersonalCopy: true }),
      });
      if (!response.ok) {
        throw new Error('فشل نسخ الملف');
      }
    } catch (error) {
      console.error('Error copying file:', error);
      throw error;
    }
  };

  const handleVideoPlay = (video: { url: string; title: string }) => {
    // Open video in modal or new page
    window.open(video.url, '_blank');
    toast(`جاري فتح فيديو: ${video.title}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary-600 dark:text-primary-400 mx-auto mb-4" aria-hidden="true" />
          <p className="text-neutral-600 dark:text-neutral-400">جاري تحميل ملفات الدورة...</p>
        </div>
      </div>
    );
  }

  if (!fileTree) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-neutral-600 dark:text-neutral-400 mb-4">لا توجد ملفات متاحة</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 min-h-[44px] bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="العودة للخلف"
            type="button"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    );
  }

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
            <button
              onClick={() => router.back()}
              className="p-2 text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              aria-label="العودة للخلف"
              type="button"
            >
              <ArrowRight className="w-5 h-5 rotate-180" aria-hidden="true" />
            </button>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white">
              ملفات الدورة
            </h1>
          </div>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            استعرض وادير ملفات الدورة التعليمية
          </p>
        </motion.div>

        {/* File Tree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
        >
          <CourseFileTree
            courseId={courseId}
            fileTree={fileTree}
            onFileSelect={handleFileSelect}
            onFileDownload={handleFileDownload}
            onFileRename={handleFileRename}
            onFileCopy={handleFileCopy}
            onVideoPlay={handleVideoPlay}
            showActions={true}
          />
        </motion.div>

        {/* Selected File Info */}
        {selectedFile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            className="mt-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6"
          >
            <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">
              معلومات الملف
            </h3>
            <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
              <div className="p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                <p className="text-neutral-900 dark:text-white">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">الاسم:</span> {selectedFile.name}
                </p>
              </div>
              {selectedFile.size && (
                <div className="p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                  <p className="text-neutral-900 dark:text-white">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">الحجم:</span>{' '}
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              )}
              <div className="p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                <p className="text-neutral-900 dark:text-white">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">النوع:</span> {selectedFile.fileType || 'غير محدد'}
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                <p className="text-neutral-900 dark:text-white">
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">المسار:</span> {selectedFile.path}
                </p>
              </div>
              {selectedFile.explanationVideo && (
                <div className="p-2 sm:p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <p className="text-neutral-900 dark:text-white">
                    <span className="font-medium text-neutral-700 dark:text-neutral-300">فيديو شرح:</span>{' '}
                    {selectedFile.explanationVideo.title}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

