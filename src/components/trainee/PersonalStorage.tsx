'use client';

import { FC, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  Upload,
  File,
  Folder,
  Trash2,
  Download,
  Eye,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Cloud,
  Database,
  FileText,
  FileSpreadsheet,
  FileImage,
  Video,
  Music,
  MoreVertical,
  Copy,
  Move,
  Edit,
} from 'lucide-react';
import type { StorageQuota, PersonalFile } from '@/types/storage';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface PersonalStorageProps {
  userId?: string;
  onFileSelect?: (file: PersonalFile) => void;
  className?: string;
}

const PersonalStorage: FC<PersonalStorageProps> = ({
  userId,
  onFileSelect,
  className = '',
}) => {
  const { user } = useAuth();
  const currentUserId = userId || user?.id || '';

  const [quota, setQuota] = useState<StorageQuota | null>(null);
  const [files, setFiles] = useState<PersonalFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  useEffect(() => {
    loadStorageData();
  }, [currentUserId]);

  const loadStorageData = async () => {
    try {
      setLoading(true);
      const [quotaResponse, filesResponse] = await Promise.all([
        fetch(`/api/storage/quota/${currentUserId}`),
        fetch(`/api/storage/files?userId=${currentUserId}&folderId=${currentFolder || ''}`),
      ]);

      if (quotaResponse.ok) {
        const quotaData = await quotaResponse.json();
        setQuota(quotaData.quota);
      }

      if (filesResponse.ok) {
        const filesData = await filesResponse.json();
        setFiles(filesData.files || []);
      }
    } catch (error) {
      console.error('Error loading storage data:', error);
      toast.error('فشل تحميل بيانات التخزين');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(selectedFiles).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', currentUserId);
        if (currentFolder) formData.append('folderId', currentFolder);

        const response = await fetch('/api/storage/files', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`فشل رفع ${file.name}`);
        }

        return await response.json();
      });

      await Promise.all(uploadPromises);
      toast.success('تم رفع الملفات بنجاح');
      await loadStorageData();
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast.error(error.message || 'فشل رفع الملفات');
    } finally {
      setUploading(false);
      // Reset file input
      if (event.target) event.target.value = '';
    }
  };

  const handleFileDelete = async (fileId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

    try {
      const response = await fetch(`/api/storage/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('فشل حذف الملف');
      }

      toast.success('تم حذف الملف بنجاح');
      await loadStorageData();
    } catch (error) {
      console.error('Error deleting file:', error);
      toast.error('فشل حذف الملف');
    }
  };

  const handleFileDownload = async (file: PersonalFile) => {
    try {
      const response = await fetch(`/api/storage/files/${file.id}/download`);
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

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const formatBytes = (bytes: number) => {
    return formatFileSize(bytes);
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'word':
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'excel':
      case 'xls':
      case 'xlsx':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'image':
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <FileImage className="w-5 h-5 text-yellow-600" />;
      case 'video':
      case 'mp4':
      case 'avi':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'audio':
      case 'mp3':
      case 'wav':
        return <Music className="w-5 h-5 text-pink-600" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const filteredFiles = useMemo(() => {
    let filtered = files;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by type
    if (filterType !== 'all') {
      filtered = filtered.filter((file) => file.type.toLowerCase() === filterType.toLowerCase());
    }

    return filtered;
  }, [files, searchTerm, filterType]);

  const storagePercentage = quota ? quota.percentageUsed : 0;
  const isStorageFull = storagePercentage >= 90;
  const isStorageWarning = storagePercentage >= 75;

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header with Storage Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <HardDrive className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                المساحة الشخصية
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {quota ? `${formatBytes(quota.usedStorage)} من ${formatBytes(quota.totalQuota)} مستخدم` : 'جاري التحميل...'}
              </p>
            </div>
          </div>
          <button
            onClick={loadStorageData}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="تحديث"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Storage Progress Bar */}
        {quota && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                استخدام التخزين
              </span>
              <span
                className={`text-sm font-semibold ${
                  isStorageFull
                    ? 'text-red-600'
                    : isStorageWarning
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}
              >
                {storagePercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${storagePercentage}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full ${
                  isStorageFull
                    ? 'bg-red-600'
                    : isStorageWarning
                    ? 'bg-yellow-600'
                    : 'bg-green-600'
                }`}
              />
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
              <span>متاح: {formatBytes(quota.availableStorage)}</span>
              <span>مستخدم: {formatBytes(quota.usedStorage)}</span>
            </div>
            {isStorageWarning && (
              <div
                className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
                  isStorageFull
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
                }`}
              >
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">
                  {isStorageFull
                    ? 'المساحة ممتلئة! يرجى حذف بعض الملفات'
                    : 'المساحة قريبة من الامتلاء'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Upload Button */}
        <div className="flex items-center gap-3">
          <label
            className={`
              flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
              cursor-pointer hover:bg-blue-700 transition-colors
              ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <Upload className="w-5 h-5" />
            <span>{uploading ? 'جاري الرفع...' : 'رفع ملفات'}</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <div className="flex-1" />
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3 mt-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الملفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">جميع الأنواع</option>
            <option value="word">Word</option>
            <option value="excel">Excel</option>
            <option value="pdf">PDF</option>
            <option value="image">صور</option>
            <option value="video">فيديو</option>
            <option value="audio">صوت</option>
          </select>
        </div>
      </div>

      {/* Files List */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <Cloud className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد ملفات</p>
            <p className="text-sm mt-2">ابدأ برفع ملفاتك الشخصية</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => onFileSelect?.(file)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatFileSize(file.size)}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(file.createdAt).toLocaleDateString('ar-SA')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileDownload(file);
                    }}
                    className="flex-1 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                  >
                    <Download className="w-3 h-3 inline mr-1" />
                    تحميل
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileDelete(file.id);
                    }}
                    className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalStorage;

