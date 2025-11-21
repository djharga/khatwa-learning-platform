'use client';

import { FC, useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Edit,
  Copy,
  Move,
  Trash2,
  File,
  FileText,
  FileSpreadsheet,
  Folder,
  Filter,
  Calendar,
  User,
  Search,
  RefreshCw,
  ChevronRight,
  Clock,
  Info,
} from 'lucide-react';
import type {
  FileModificationHistory,
  FileModification,
  FileModificationTree,
} from '@/types/storage';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface FileModificationHistoryProps {
  userId?: string;
  courseId?: string;
  fileId?: string;
  onFileSelect?: (fileId: string) => void;
  className?: string;
}

const FileModificationHistory: FC<FileModificationHistoryProps> = ({
  userId,
  courseId,
  fileId,
  onFileSelect,
  className = '',
}) => {
  const { user } = useAuth();
  const currentUserId = userId || user?.id || '';

  const [modificationHistory, setModificationHistory] = useState<FileModificationHistory | null>(null);
  const [modificationTree, setModificationTree] = useState<FileModificationTree | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');

  useEffect(() => {
    loadModificationHistory();
  }, [currentUserId, courseId, fileId]);

  const loadModificationHistory = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (currentUserId) params.append('userId', currentUserId);
      if (courseId) params.append('courseId', courseId);
      if (fileId) params.append('fileId', fileId);

      const response = await fetch(`/api/storage/files/${fileId || 'all'}/modifications?${params.toString()}`);
      if (!response.ok) {
        throw new Error('فشل تحميل سجل التعديلات');
      }

      const data = await response.json();
      if (fileId) {
        setModificationHistory(data.history);
      } else {
        setModificationTree(data.tree);
      }
    } catch (error) {
      console.error('Error loading modification history:', error);
      toast.error('فشل تحميل سجل التعديلات');
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (action: FileModification['action']) => {
    switch (action) {
      case 'rename':
        return <Edit className="w-4 h-4 text-blue-600" />;
      case 'copy':
        return <Copy className="w-4 h-4 text-green-600" />;
      case 'move':
        return <Move className="w-4 h-4 text-purple-600" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-600" />;
      case 'create':
        return <File className="w-4 h-4 text-green-600" />;
      case 'update':
        return <FileText className="w-4 h-4 text-orange-600" />;
      default:
        return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  const getActionLabel = (action: FileModification['action']) => {
    switch (action) {
      case 'rename':
        return 'تعديل الاسم';
      case 'copy':
        return 'نسخ';
      case 'move':
        return 'نقل';
      case 'delete':
        return 'حذف';
      case 'create':
        return 'إنشاء';
      case 'update':
        return 'تحديث';
      default:
        return action;
    }
  };

  const getActionColor = (action: FileModification['action']) => {
    switch (action) {
      case 'rename':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'copy':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'move':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'delete':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'create':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'update':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  const filteredModifications = useMemo(() => {
    if (!modificationHistory) return [];

    let modifications = modificationHistory.modifications;

    // Filter by action
    if (selectedAction !== 'all') {
      modifications = modifications.filter((m) => m.action === selectedAction);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      modifications = modifications.filter(
        (m) =>
          m.oldName?.toLowerCase().includes(term) ||
          m.newName?.toLowerCase().includes(term) ||
          m.oldPath?.toLowerCase().includes(term) ||
          m.newPath?.toLowerCase().includes(term)
      );
    }

    return modifications;
  }, [modificationHistory, selectedAction, searchTerm]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
          <div className="flex items-center gap-3">
            <History className="w-6 h-6 text-blue-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                شجرة التعديلات
              </h3>
              {modificationHistory && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {modificationHistory.totalModifications} تعديل
                </p>
              )}
            </div>
          </div>
          <button
            onClick={loadModificationHistory}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="تحديث"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في التعديلات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>
          <select
            value={selectedAction}
            onChange={(e) => setSelectedAction(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="all">جميع الإجراءات</option>
            <option value="rename">تعديل الاسم</option>
            <option value="copy">نسخ</option>
            <option value="move">نقل</option>
            <option value="delete">حذف</option>
            <option value="create">إنشاء</option>
            <option value="update">تحديث</option>
          </select>
        </div>
      </div>

      {/* Modification List */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {!modificationHistory || filteredModifications.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <History className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد تعديلات</p>
          </div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence>
              {filteredModifications.map((modification, index) => (
                <motion.div
                  key={modification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">{getActionIcon(modification.action)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(modification.action)}`}
                        >
                          {getActionLabel(modification.action)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatDate(modification.createdAt)}
                        </span>
                      </div>

                      {/* Modification Details */}
                      <div className="space-y-1 text-sm">
                        {modification.action === 'rename' && (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600 dark:text-gray-400">من:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {modification.oldName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">إلى:</span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {modification.newName}
                              </span>
                            </div>
                          </>
                        )}

                        {modification.action === 'move' && (
                          <>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600 dark:text-gray-400">من:</span>
                              <span className="font-medium text-gray-900 dark:text-gray-100">
                                {modification.oldPath}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-600 dark:text-gray-400">إلى:</span>
                              <span className="font-medium text-blue-600 dark:text-blue-400">
                                {modification.newPath}
                              </span>
                            </div>
                          </>
                        )}

                        {(modification.action === 'copy' || modification.action === 'create') && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-600 dark:text-gray-400">الملف:</span>
                            <span className="font-medium text-gray-900 dark:text-gray-100">
                              {modification.newName || modification.oldName}
                            </span>
                          </div>
                        )}

                        {modification.metadata?.reason && (
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            <span className="font-medium">السبب:</span> {modification.metadata.reason}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Footer */}
      {modificationHistory && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            آخر تعديل: {formatDate(modificationHistory.lastModified)}
          </p>
        </div>
      )}
    </div>
  );
};

export default FileModificationHistory;

