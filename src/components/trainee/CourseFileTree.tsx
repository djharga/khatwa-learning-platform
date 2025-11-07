'use client';

import { FC, useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  FileText,
  FileSpreadsheet,
  FileImage,
  Presentation,
  Video,
  Music,
  File,
  Download,
  Eye,
  Edit,
  Copy,
  Play,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  Info,
} from 'lucide-react';
import type { CourseFileNode, CourseFileTree } from '@/types/course-management';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';

interface CourseFileTreeProps {
  courseId: string;
  fileTree: CourseFileTree;
  onFileSelect?: (file: CourseFileNode) => void;
  onFileDownload?: (file: CourseFileNode) => void;
  onFileRename?: (fileId: string, newName: string) => Promise<void>;
  onFileCopy?: (fileId: string) => Promise<void>;
  onVideoPlay?: (video: { url: string; title: string }) => void;
  showActions?: boolean;
  className?: string;
}

const CourseFileTree: FC<CourseFileTreeProps> = ({
  courseId,
  fileTree,
  onFileSelect,
  onFileDownload,
  onFileRename,
  onFileCopy,
  onVideoPlay,
  showActions = true,
  className = '',
}) => {
  const { user } = useAuth();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  // Toggle folder expansion
  const toggleFolder = useCallback((folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback(
    (file: CourseFileNode) => {
      setSelectedFile(file.id);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  // Handle file download
  const handleDownload = useCallback(
    async (file: CourseFileNode, e: React.MouseEvent) => {
      e.stopPropagation();
      if (onFileDownload) {
        await onFileDownload(file);
      } else {
        toast.info('جاري تحميل الملف...');
      }
    },
    [onFileDownload]
  );

  // Handle file rename
  const handleRenameStart = useCallback(
    (file: CourseFileNode, e: React.MouseEvent) => {
      e.stopPropagation();
      if (!file.canEdit) {
        toast.error('لا يمكن تعديل اسم هذا الملف');
        return;
      }
      setEditingFileId(file.id);
      setEditingName(file.name);
    },
    []
  );

  const handleRenameSave = useCallback(async () => {
    if (!editingFileId || !editingName.trim()) {
      toast.error('الاسم مطلوب');
      return;
    }

    if (onFileRename) {
      try {
        await onFileRename(editingFileId, editingName.trim());
        setEditingFileId(null);
        setEditingName('');
        toast.success('تم تعديل اسم الملف بنجاح');
      } catch (error) {
        toast.error('فشل تعديل اسم الملف');
      }
    } else {
      setEditingFileId(null);
      setEditingName('');
    }
  }, [editingFileId, editingName, onFileRename]);

  const handleRenameCancel = useCallback(() => {
    setEditingFileId(null);
    setEditingName('');
  }, []);

  // Handle file copy to personal storage
  const handleCopy = useCallback(
    async (file: CourseFileNode, e: React.MouseEvent) => {
      e.stopPropagation();
      if (onFileCopy) {
        try {
          await onFileCopy(file.id);
          toast.success('تم نسخ الملف إلى مساحتك الشخصية');
        } catch (error) {
          toast.error('فشل نسخ الملف');
        }
      }
    },
    [onFileCopy]
  );

  // Handle video play
  const handleVideoPlay = useCallback(
    (video: { url: string; title: string }, e: React.MouseEvent) => {
      e.stopPropagation();
      if (onVideoPlay) {
        onVideoPlay(video);
      }
    },
    [onVideoPlay]
  );

  // Get file icon
  const getFileIcon = useCallback((file: CourseFileNode) => {
    if (file.type === 'folder') {
      return expandedFolders.has(file.id) ? (
        <FolderOpen className="w-5 h-5 text-blue-500" />
      ) : (
        <Folder className="w-5 h-5 text-blue-400" />
      );
    }

    switch (file.fileType) {
      case 'word':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'excel':
        return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-600" />;
      case 'powerpoint':
        return <Presentation className="w-5 h-5 text-orange-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'audio':
        return <Music className="w-5 h-5 text-pink-600" />;
      case 'image':
        return <FileImage className="w-5 h-5 text-yellow-600" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  }, [expandedFolders]);

  // Format file size
  const formatFileSize = useCallback((bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }, []);

  // Filter files
  const filteredNodes = useMemo(() => {
    let nodes = fileTree.rootNodes;

    // Filter by search term
    if (searchTerm) {
      const filterRecursive = (nodeList: CourseFileNode[]): CourseFileNode[] => {
        return nodeList
          .map((node) => {
            const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase());
            const filteredChildren = node.children ? filterRecursive(node.children) : [];

            if (matchesSearch || filteredChildren.length > 0) {
              return {
                ...node,
                children: filteredChildren.length > 0 ? filteredChildren : node.children,
              };
            }
            return null;
          })
          .filter((node): node is CourseFileNode => node !== null);
      };
      nodes = filterRecursive(nodes);
    }

    // Filter by type
    if (filterType !== 'all') {
      const filterByType = (nodeList: CourseFileNode[]): CourseFileNode[] => {
        return nodeList
          .map((node) => {
            if (node.type === 'folder') {
              const filteredChildren = node.children ? filterByType(node.children) : [];
              return filteredChildren.length > 0
                ? { ...node, children: filteredChildren }
                : null;
            }
            if (node.fileType === filterType) {
              return node;
            }
            return null;
          })
          .filter((node): node is CourseFileNode => node !== null);
      };
      nodes = filterByType(nodes);
    }

    return nodes;
  }, [fileTree.rootNodes, searchTerm, filterType]);

  // Render file node
  const renderNode = useCallback(
    (node: CourseFileNode, level: number = 0) => {
      const isExpanded = expandedFolders.has(node.id);
      const isSelected = selectedFile === node.id;
      const isEditing = editingFileId === node.id;

      return (
        <div key={node.id} className={`${level > 0 ? 'mr-6' : ''}`}>
          <motion.div
            className={`
              flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer
              transition-colors duration-200
              ${isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}
              ${node.type === 'folder' ? 'font-medium' : ''}
            `}
            onClick={() => {
              if (node.type === 'folder') {
                toggleFolder(node.id);
              } else {
                handleFileSelect(node);
              }
            }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Expand/Collapse Icon */}
            {node.type === 'folder' ? (
              <motion.div
                animate={{ rotate: isExpanded ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            ) : (
              <div className="w-4" />
            )}

            {/* File Icon */}
            <div className="flex-shrink-0">{getFileIcon(node)}</div>

            {/* File Name */}
            {isEditing ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={handleRenameSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleRenameSave();
                  } else if (e.key === 'Escape') {
                    handleRenameCancel();
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <span
                className={`
                  flex-1 text-sm
                  ${node.type === 'folder' ? 'font-semibold text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'}
                  ${!node.canEdit && node.type === 'file' ? 'text-gray-500' : ''}
                `}
              >
                {node.name}
              </span>
            )}

            {/* File Size */}
            {node.type === 'file' && node.size && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(node.size)}
              </span>
            )}

            {/* Explanation Video Icon */}
            {node.explanationVideo && (
              <button
                onClick={(e) =>
                  handleVideoPlay(
                    {
                      url: node.explanationVideo!.url,
                      title: node.explanationVideo!.title,
                    },
                    e
                  )
                }
                className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                title={`فيديو شرح: ${node.explanationVideo.title}`}
              >
                <Play className="w-4 h-4" />
              </button>
            )}

            {/* Actions */}
            {showActions && node.type === 'file' && !isEditing && (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                {onFileDownload && (
                  <button
                    onClick={(e) => handleDownload(node, e)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="تحميل"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                )}

                {node.canEdit && onFileRename && (
                  <button
                    onClick={(e) => handleRenameStart(node, e)}
                    className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="تعديل الاسم"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}

                {onFileCopy && (
                  <button
                    onClick={(e) => handleCopy(node, e)}
                    className="p-1 text-purple-600 hover:bg-purple-50 rounded transition-colors"
                    title="نسخ إلى مساحتي الشخصية"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </motion.div>

          {/* Render Children */}
          {node.type === 'folder' && isExpanded && node.children && node.children.length > 0 && (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                {node.children.map((child) => renderNode(child, level + 1))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      );
    },
    [
      expandedFolders,
      selectedFile,
      editingFileId,
      editingName,
      getFileIcon,
      formatFileSize,
      showActions,
      toggleFolder,
      handleFileSelect,
      handleDownload,
      handleRenameStart,
      handleRenameSave,
      handleRenameCancel,
      handleCopy,
      handleVideoPlay,
      onFileDownload,
      onFileRename,
      onFileCopy,
    ]
  );

  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 ${className}`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              ملفات الدورة
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {fileTree.totalFiles} ملف • {formatFileSize(fileTree.totalSize)}
            </p>
          </div>
          <button
            onClick={() => setLoading(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="تحديث"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
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
            <option value="audio">صوت</option>
            <option value="image">صورة</option>
          </select>
        </div>
      </div>

      {/* File Tree */}
      <div className="p-4 max-h-[600px] overflow-y-auto">
        {filteredNodes.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>لا توجد ملفات</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredNodes.map((node) => renderNode(node))}
          </div>
        )}
      </div>

      {/* Info */}
      {fileTree.lastUpdated && (
        <div className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            آخر تحديث: {new Date(fileTree.lastUpdated).toLocaleDateString('ar-SA')}
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseFileTree;

