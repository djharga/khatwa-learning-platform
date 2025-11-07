'use client';

import { useState, useEffect } from 'react';
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

  // Load course file tree
  useEffect(() => {
    loadFileTree();
  }, [courseId]);

  const loadFileTree = async () => {
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
  };

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل ملفات الدورة...</p>
        </div>
      </div>
    );
  }

  if (!fileTree) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">لا توجد ملفات متاحة</p>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-700"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => router.back()}
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              ملفات الدورة
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            استعرض وادير ملفات الدورة التعليمية
          </p>
        </motion.div>

        {/* File Tree */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
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
            className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4"
          >
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
              معلومات الملف
            </h3>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium">الاسم:</span> {selectedFile.name}
              </p>
              {selectedFile.size && (
                <p>
                  <span className="font-medium">الحجم:</span>{' '}
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              )}
              <p>
                <span className="font-medium">النوع:</span> {selectedFile.fileType || 'غير محدد'}
              </p>
              <p>
                <span className="font-medium">المسار:</span> {selectedFile.path}
              </p>
              {selectedFile.explanationVideo && (
                <p>
                  <span className="font-medium">فيديو شرح:</span>{' '}
                  {selectedFile.explanationVideo.title}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

