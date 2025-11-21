'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  Video,
  FileText,
  FileSpreadsheet,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import type { UploadExplanationVideoRequest, ExplanationVideo } from '@/types/course-management';
import toast from 'react-hot-toast';

interface VideoUploadManagerProps {
  courseId: string;
  moduleId?: string;
  fileId?: string;
  type: 'module' | 'word' | 'excel';
  onUploadComplete?: (video: ExplanationVideo) => void;
  className?: string;
}

const VideoUploadManager: FC<VideoUploadManagerProps> = ({
  courseId,
  moduleId,
  fileId,
  type,
  onUploadComplete,
  className = '',
}) => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        toast.error('الرجاء اختيار ملف فيديو');
        return;
      }
      setSelectedFile(file);
      if (!title) {
        setTitle(file.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim()) {
      toast.error('الرجاء اختيار ملف فيديو وإدخال العنوان');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);

      const formData = new FormData();
      formData.append('video', selectedFile);
      formData.append('courseId', courseId);
      if (moduleId) formData.append('moduleId', moduleId);
      if (fileId) formData.append('fileId', fileId);
      formData.append('type', type);
      formData.append('title', title);
      if (description) formData.append('description', description);

      const response = await fetch(`/api/admin/courses/${courseId}/videos`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل رفع الفيديو');
      }

      const data = await response.json();
      toast.success('تم رفع الفيديو بنجاح');
      setSelectedFile(null);
      setTitle('');
      setDescription('');
      setProgress(0);
      onUploadComplete?.(data.video);
    } catch (error: any) {
      console.error('Error uploading video:', error);
      toast.error(error.message || 'فشل رفع الفيديو');
    } finally {
      setUploading(false);
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case 'module':
        return <Video className="w-6 h-6 text-blue-600" />;
      case 'word':
        return <FileText className="w-6 h-6 text-blue-600" />;
      case 'excel':
        return <FileSpreadsheet className="w-6 h-6 text-green-600" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'module':
        return 'فيديو شرح المحور';
      case 'word':
        return 'فيديو شرح ملف Word';
      case 'excel':
        return 'فيديو شرح ملف Excel';
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
      <div className="flex items-center gap-3 mb-4">
        {getTypeIcon()}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {getTypeLabel()}
        </h3>
      </div>

      <div className="space-y-4">
        {/* File Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ملف الفيديو *
          </label>
          <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
            {selectedFile ? (
              <div className="text-center">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm text-gray-900 dark:text-gray-100">{selectedFile.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  اضغط لاختيار ملف فيديو
                </p>
              </div>
            )}
            <input
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            عنوان الفيديو *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="عنوان فيديو الشرح"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={uploading}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            وصف الفيديو (اختياري)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            placeholder="وصف مختصر للفيديو"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            disabled={uploading}
          />
        </div>

        {/* Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>جاري الرفع...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="bg-blue-600 h-2 rounded-full"
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !selectedFile || !title.trim()}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>جاري الرفع...</span>
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              <span>رفع الفيديو</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoUploadManager;

