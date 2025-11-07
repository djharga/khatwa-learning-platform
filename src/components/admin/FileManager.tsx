'use client';

import { FC, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  File,
  Folder,
  Trash2,
  Copy,
  Move,
  Download,
  Edit,
  Search,
  Filter,
  MoreVertical,
  FileText,
  FileSpreadsheet,
  FileImage,
  Video,
  AlertCircle,
  CheckCircle,
  RefreshCw,
} from 'lucide-react';
import type { CourseFileNode, CopyFileRequest, MoveFileRequest } from '@/types/course-management';
import toast from 'react-hot-toast';

interface FileManagerProps {
  courseId: string;
  moduleId?: string;
  onFilesChange?: (files: CourseFileNode[]) => void;
  className?: string;
}

const FileManager: FC<FileManagerProps> = ({
  courseId,
  moduleId,
  onFilesChange,
  className = '',
}) => {
  const [files, setFiles] = useState<CourseFileNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCopyModal, setShowCopyModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [selectedFileForAction, setSelectedFileForAction] = useState<string | null>(null);

  useEffect(() => {
    loadFiles();
  }, [courseId, moduleId]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (moduleId) params.append('moduleId', moduleId);
      
      const response = await fetch(`/api/admin/courses/${courseId}/files?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setFiles(data.files || []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
      toast.error('فشل تحميل الملفات');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    try {
      setLoading(true);
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append('files', file);
      });
      if (moduleId) formData.append('moduleId', moduleId);

      const response = await fetch(`/api/admin/courses/${courseId}/files`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('فشل رفع الملفات');
      }

      toast.success('تم رفع الملفات بنجاح');
      await loadFiles();
    } catch (error: any) {
      console.error('Error uploading files:', error);
      toast.error(error.message || 'فشل رفع الملفات');
    } finally {
      setLoading(false);
      if (event.target) event.target.value = '';
    }
  };

  const handleFileDelete = async (fileId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذا الملف؟')) return;

    try {
      const response = await fetch(`/api/admin/courses/${courseId}/files/${fileId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('فشل حذف الملف');
      }

      toast.success('تم حذف الملف بنجاح');
      await loadFiles();
    } catch (error: any) {
      console.error('Error deleting file:', error);
      toast.error(error.message || 'فشل حذف الملف');
    }
  };

  const handleFileCopy = async (fileId: string, targetCourseId?: string, targetModuleId?: string, targetTraineeId?: string) => {
    try {
      const request: CopyFileRequest = {
        sourceFileId: fileId,
        targetCourseId,
        targetModuleId,
        targetTraineeId,
        createPersonalCopy: !!targetTraineeId,
      };

      const response = await fetch(`/api/admin/courses/${courseId}/files/${fileId}/copy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('فشل نسخ الملف');
      }

      toast.success('تم نسخ الملف بنجاح');
      setShowCopyModal(false);
      setSelectedFileForAction(null);
    } catch (error: any) {
      console.error('Error copying file:', error);
      toast.error(error.message || 'فشل نسخ الملف');
    }
  };

  const handleFileMove = async (fileId: string, targetCourseId?: string, targetModuleId?: string) => {
    try {
      const request: MoveFileRequest = {
        fileId,
        targetCourseId,
        targetModuleId,
      };

      const response = await fetch(`/api/admin/courses/${courseId}/files/${fileId}/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('فشل نقل الملف');
      }

      toast.success('تم نقل الملف بنجاح');
      await loadFiles();
      setShowMoveModal(false);
      setSelectedFileForAction(null);
    } catch (error: any) {
      console.error('Error moving file:', error);
      toast.error(error.message || 'فشل نقل الملف');
    }
  };

  const handleFileRename = async (fileId: string, newName: string) => {
    try {
      const response = await fetch(`/api/admin/courses/${courseId}/files/${fileId}/rename`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName }),
      });

      if (!response.ok) {
        throw new Error('فشل تعديل اسم الملف');
      }

      toast.success('تم تعديل اسم الملف بنجاح');
      await loadFiles();
    } catch (error: any) {
      console.error('Error renaming file:', error);
      toast.error(error.message || 'فشل تعديل اسم الملف');
    }
  };

  const getFileIcon = (fileType?: string) => {
    switch (fileType) {
      case 'word':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'powerpoint':
        return <FileImage className="w-5 h-5 text-orange-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-yellow-600" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  };

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || file.fileType === filterType;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className={`flex items-center justify-center py-12 ${className}`}>
        <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              إدارة الملفات
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {files.length} ملف
            </p>
          </div>
          <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
            <Upload className="w-5 h-5" />
            <span>رفع ملفات</span>
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center gap-3">
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
            <option value="powerpoint">PowerPoint</option>
            <option value="video">فيديو</option>
            <option value="image">صورة</option>
          </select>
        </div>
      </div>

      {/* Files List */}
      <div className="p-4">
        {filteredFiles.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <File className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد ملفات</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex-shrink-0">{getFileIcon(file.fileType)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)} • {file.path}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedFileForAction(file.id);
                      setShowCopyModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="نسخ"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedFileForAction(file.id);
                      setShowMoveModal(true);
                    }}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="نقل"
                  >
                    <Move className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleFileDelete(file.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Copy Modal */}
      <AnimatePresence>
        {showCopyModal && selectedFileForAction && (
          <CopyMoveModal
            type="copy"
            fileId={selectedFileForAction}
            onConfirm={(targetCourseId, targetModuleId, targetTraineeId) =>
              handleFileCopy(selectedFileForAction, targetCourseId, targetModuleId, targetTraineeId)
            }
            onCancel={() => {
              setShowCopyModal(false);
              setSelectedFileForAction(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Move Modal */}
      <AnimatePresence>
        {showMoveModal && selectedFileForAction && (
          <CopyMoveModal
            type="move"
            fileId={selectedFileForAction}
            onConfirm={(targetCourseId, targetModuleId) =>
              handleFileMove(selectedFileForAction, targetCourseId, targetModuleId)
            }
            onCancel={() => {
              setShowMoveModal(false);
              setSelectedFileForAction(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Copy/Move Modal Component
const CopyMoveModal: FC<{
  type: 'copy' | 'move';
  fileId: string;
  onConfirm: (targetCourseId?: string, targetModuleId?: string, targetTraineeId?: string) => void;
  onCancel: () => void;
}> = ({ type, fileId, onConfirm, onCancel }) => {
  const [targetCourseId, setTargetCourseId] = useState('');
  const [targetModuleId, setTargetModuleId] = useState('');
  const [targetTraineeId, setTargetTraineeId] = useState('');
  const [courses, setCourses] = useState<Array<{ id: string; title: string }>>([]);

  useEffect(() => {
    // Load courses for selection
    fetch('/api/admin/courses')
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .catch(console.error);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {type === 'copy' ? 'نسخ الملف' : 'نقل الملف'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              الدورة الهدف
            </label>
            <select
              value={targetCourseId}
              onChange={(e) => setTargetCourseId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">اختر الدورة</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          {type === 'copy' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                نسخ إلى متدرب (اختياري)
              </label>
              <input
                type="text"
                value={targetTraineeId}
                onChange={(e) => setTargetTraineeId(e.target.value)}
                placeholder="معرف المتدرب"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => onConfirm(targetCourseId || undefined, targetModuleId || undefined, targetTraineeId || undefined)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {type === 'copy' ? 'نسخ' : 'نقل'}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            إلغاء
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FileManager;

