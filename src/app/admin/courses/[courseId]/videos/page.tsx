'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import VideoUploadManager from '@/components/admin/VideoUploadManager';
import type { ExplanationVideo } from '@/types/course-management';
import { ArrowLeft, Video, Loader2 } from 'lucide-react';

export default function CourseVideosPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [videos, setVideos] = useState<ExplanationVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'module' | 'word' | 'excel'>('module');

  useEffect(() => {
    loadVideos();
  }, [courseId, activeTab]);

  const loadVideos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/courses/${courseId}/videos?type=${activeTab}`);
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos || []);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
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
            فيديوهات الشرح
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
              <div className="flex items-center gap-2 mb-4">
                {(['module', 'word', 'excel'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tab === 'module' && 'محور'}
                    {tab === 'word' && 'Word'}
                    {tab === 'excel' && 'Excel'}
                  </button>
                ))}
              </div>
            </div>
            <VideoUploadManager
              courseId={courseId}
              type={activeTab}
              onUploadComplete={(video) => {
                setVideos((prev) => [video, ...prev]);
              }}
            />
          </motion.div>

          {/* Videos List */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              الفيديوهات المرفوعة
            </h3>
            {videos.length === 0 ? (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                <Video className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد فيديوهات</p>
              </div>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                  >
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                      {video.title}
                    </h4>
                    {video.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {video.description}
                      </p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>{Math.floor(video.duration / 60)} دقيقة</span>
                      <span>{video.viewCount} مشاهدة</span>
                      <span>{new Date(video.uploadedAt).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

