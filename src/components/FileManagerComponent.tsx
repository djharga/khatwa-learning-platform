'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Download,
  Trash2,
  Share2,
  Search,
  Grid3X3,
  List,
  Filter,
  FileText,
  Image,
  Video,
  File,
  Folder,
  MoreVertical,
  Eye,
  Edit,
  Star,
  StarOff,
  Calendar,
  User,
  HardDrive,
  Cloud,
  X,
  CheckCircle,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { initialFiles, fileTypes } from './file-manager-data';

/**
 * File item with metadata, type classification, and sharing status
 */
interface FileItem {
  id: string;
  name: string;
  type:
    | 'document'
    | 'image'
    | 'video'
    | 'pdf'
    | 'word'
    | 'excel'
    | 'powerpoint'
    | 'other';
  size: string;
  modified: string;
  owner: string;
  starred: boolean;
  shared: boolean;
  thumbnail?: string;
}

/**
 * File upload progress tracking item
 */
interface UploadItem {
  id: string;
  name: string;
  size: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

/**
 * Grid view of files with thumbnails, icons, and quick actions. Features hover effects and selection checkboxes.
 */
const FileCardGrid = ({
  files,
  selectedFiles,
  onToggleSelection,
  onToggleStar,
  getFileIcon,
  getFileColor,
}: {
  files: FileItem[];
  selectedFiles: Set<string>;
  onToggleSelection: (id: string) => void;
  onToggleStar: (id: string) => void;
  getFileIcon: (type: FileItem['type']) => React.ReactNode;
  getFileColor: (type: FileItem['type']) => string;
}) => (
  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
    {files.map((file, index) => (
      <motion.div
        key={file.id}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.05 }}
        className={`relative group cursor-pointer border-2 rounded-lg p-4 hover:shadow-lg transition-all duration-200 ${getFileColor(file.type)} ${
          selectedFiles.has(file.id) ? 'ring-2 ring-primary' : ''
        }`}
        onClick={() => onToggleSelection(file.id)}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 relative">
            {file.thumbnail ? (
              <img
                src={file.thumbnail}
                alt={file.name}
                className="w-12 h-12 object-cover rounded"
              />
            ) : (
              getFileIcon(file.type)
            )}
            {file.starred && (
              <Star className="absolute -top-1 -right-1 w-4 h-4 text-yellow-500 fill-current" />
            )}
          </div>

          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate w-full mb-1">
            {file.name}
          </h3>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            {file.size}
          </p>

          <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <input
              type="checkbox"
              checked={selectedFiles.has(file.id)}
              onChange={() => {}}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
          </div>

          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1 space-x-reverse">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleStar(file.id);
              }}
              className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
            >
              {file.starred ? (
                <StarOff className="w-3 h-3 text-yellow-500" />
              ) : (
                <Star className="w-3 h-3 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

/**
 * List view of files with detailed metadata and action menu. Features row hover effects and selection checkboxes.
 */
const FileListView = ({
  files,
  selectedFiles,
  onToggleSelection,
  getFileIcon,
}: {
  files: FileItem[];
  selectedFiles: Set<string>;
  onToggleSelection: (id: string) => void;
  getFileIcon: (type: FileItem['type']) => React.ReactNode;
}) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {files.map((file, index) => (
        <motion.div
          key={file.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${
            selectedFiles.has(file.id)
              ? 'bg-blue-50 dark:bg-blue-900/20'
              : ''
          }`}
          onClick={() => onToggleSelection(file.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <input
                type="checkbox"
                checked={selectedFiles.has(file.id)}
                onChange={() => {}}
                className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
              />

              {file.thumbnail ? (
                <img
                  src={file.thumbnail}
                  alt={file.name}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center">
                  {getFileIcon(file.type)}
                </div>
              )}

              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  {file.name}
                </h3>
                <div className="flex items-center space-x-4 space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                  <span>{file.size}</span>
                  <span>تم التعديل: {file.modified}</span>
                  <span>{file.owner}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              {file.starred && (
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
              )}
              {file.shared && (
                <Share2 className="w-4 h-4 text-blue-500" />
              )}

              <div className="relative">
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

/**
 * Modal for uploading files with drag-and-drop area and file type information.
 */
const UploadModal = ({
  isOpen,
  onClose,
  onFileSelect,
  fileInputRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              رفع ملفات
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
            >
              <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                انقر لاختيار الملفات أو اسحب وأفلت هنا
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                يدعم جميع أنواع الملفات حتى 100MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={onFileSelect}
              className="hidden"
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * File manager component with grid/list view modes, search, filtering, upload, and file actions. Features file type icons, star/unstar functionality, upload progress tracking, and selection management.
 */
const FileManagerComponent = () => {
  const [files, setFiles] = useState<FileItem[]>(initialFiles);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('الكل');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [uploadingFiles, setUploadingFiles] = useState<UploadItem[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesSearch = file.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'الكل' || file.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [files, searchTerm, selectedType]);

  /**
   * Returns appropriate Lucide icon component based on file type with color coding
   */
  const getFileIcon = (type: FileItem['type']) => {
    const iconProps = { className: 'w-8 h-8' };

    switch (type) {
      case 'pdf':
        return <FileText {...iconProps} className="w-8 h-8 text-red-500" />;
      case 'word':
        return <FileText {...iconProps} className="w-8 h-8 text-blue-600" />;
      case 'excel':
        return <FileText {...iconProps} className="w-8 h-8 text-green-600" />;
      case 'powerpoint':
        return <FileText {...iconProps} className="w-8 h-8 text-orange-500" />;
      case 'image':
        return <Image {...iconProps} className="w-8 h-8 text-purple-500" />;
      case 'video':
        return <Video {...iconProps} className="w-8 h-8 text-red-600" />;
      default:
        return <File {...iconProps} className="w-8 h-8 text-gray-500" />;
    }
  };

  /**
   * Returns Tailwind color classes for file card background based on file type
   */
  const getFileColor = (type: FileItem['type']) => {
    switch (type) {
      case 'pdf':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'word':
        return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      case 'excel':
        return 'border-green-200 bg-green-50 dark:bg-green-900/20';
      case 'powerpoint':
        return 'border-orange-200 bg-orange-50 dark:bg-orange-900/20';
      case 'image':
        return 'border-purple-200 bg-purple-50 dark:bg-purple-900/20';
      case 'video':
        return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      default:
        return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  /**
   * Handles file upload with simulated progress tracking. Adds completed uploads to files list.
   */
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    const newUploads: UploadItem[] = selectedFiles.map((file, index) => ({
      id: `upload-${Date.now()}-${index}`,
      name: file.name,
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      progress: 0,
      status: 'uploading',
    }));

    setUploadingFiles((prev) => [...prev, ...newUploads]);
    setShowUpload(false);

    // Simulate upload progress
    newUploads.forEach((upload) => {
      const interval = setInterval(() => {
        setUploadingFiles((prev) =>
          prev.map((u) => {
            if (u.id === upload.id) {
              const newProgress = u.progress + Math.random() * 15;
              if (newProgress >= 100) {
                clearInterval(interval);
                return { ...u, progress: 100, status: 'completed' };
              }
              return { ...u, progress: newProgress };
            }
            return u;
          })
        );
      }, 200);
    });

    // Add completed files to main list after upload
    setTimeout(() => {
      setUploadingFiles((prev) => prev.filter((u) => u.status !== 'completed'));
    }, 3000);
  };

  /**
   * Toggles file selection state for batch operations
   */
  const toggleFileSelection = (fileId: string) => {
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(fileId)) {
        newSet.delete(fileId);
      } else {
        newSet.add(fileId);
      }
      return newSet;
    });
  };

  /**
   * Toggles starred status for a file
   */
  const toggleStar = (fileId: string) => {
    setFiles((prev) =>
      prev.map((file) =>
        file.id === fileId ? { ...file, starred: !file.starred } : file
      )
    );
  };

  /**
   * Removes a file from the list and clears its selection
   */
  const deleteFile = (fileId: string) => {
    setFiles((prev) => prev.filter((file) => file.id !== fileId));
    setSelectedFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fileId);
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              مدير الملفات
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              {filteredFiles.length} ملف من أصل {files.length}
            </p>
          </div>
          <div className="flex items-center space-x-4 space-x-reverse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUpload(true)}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              رفع ملف
            </motion.button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الملفات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex gap-4">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {fileTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'} rounded-l-lg transition-colors`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'} rounded-r-lg transition-colors`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700"
          >
            <div className="p-4">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                جاري رفع الملفات ({uploadingFiles.length})
              </h3>
              <div className="space-y-3">
                {uploadingFiles.map((upload) => (
                  <div
                    key={upload.id}
                    className="flex items-center space-x-4 space-x-reverse"
                  >
                    {upload.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    ) : upload.status === 'error' ? (
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                    )}
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {upload.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {upload.size}
                      </div>
                      {upload.status === 'uploading' && (
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
                          <div
                            className="bg-primary h-1 rounded-full transition-all duration-300"
                            style={{ width: `${upload.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {upload.status === 'completed'
                        ? 'مكتمل'
                        : upload.status === 'error'
                          ? 'خطأ'
                          : `${Math.round(upload.progress)}%`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onFileSelect={handleFileUpload}
        fileInputRef={fileInputRef}
      />

      {/* Files Content */}
      <div className="p-6">
        {viewMode === 'grid' ? (
          <FileCardGrid
            files={filteredFiles}
            selectedFiles={selectedFiles}
            onToggleSelection={toggleFileSelection}
            onToggleStar={toggleStar}
            getFileIcon={getFileIcon}
            getFileColor={getFileColor}
          />
        ) : (
          <FileListView
            files={filteredFiles}
            selectedFiles={selectedFiles}
            onToggleSelection={toggleFileSelection}
            getFileIcon={getFileIcon}
          />
        )}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <HardDrive className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد ملفات
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            ابدأ برفع ملفاتك الأولى
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FileManagerComponent;
