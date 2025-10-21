'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Eye,
  MessageSquare,
  Upload,
  Download,
  Calendar,
  Clock,
  User,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  X,
  Sparkles,
} from 'lucide-react';
import { initialReports, fileCategories, fileStatuses } from './reports-data';

/**
 * Report document with metadata, status, and engagement metrics
 */
interface Report {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  isNew?: boolean;
  category: string;
  fileSize?: string;
  comments: number;
  views: number;
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
 * Comment on a report with author and timestamp
 */
interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

/**
 * Reports management component with search, filtering, upload, and commenting. Features report cards with metadata, upload progress tracking, and modal forms for file upload and comments. Supports draft, published, and archived statuses.
 */
const ReportsComponent = () => {
  const [reports, setReports] = useState<Report[]>(initialReports);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('الكل');
  const [selectedStatus, setSelectedStatus] = useState('الكل');
  const [uploadingFiles, setUploadingFiles] = useState<UploadItem[]>([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = fileCategories;
  const statuses = fileStatuses;

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'الكل' || report.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'الكل' || report.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  /**
   * Handles file upload with simulated progress tracking. Adds completed uploads to reports list as draft status.
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
              const newProgress = u.progress + Math.random() * 20;
              if (newProgress >= 100) {
                clearInterval(interval);
                // Add to reports list
                const newReport: Report = {
                  id: Date.now().toString(),
                  title: upload.name.replace(/\.[^/.]+$/, ''), // Remove extension
                  description: 'تقرير جديد تم رفعه',
                  author: 'المستخدم الحالي',
                  createdAt: new Date().toISOString().split('T')[0],
                  updatedAt: new Date().toISOString().split('T')[0],
                  status: 'draft',
                  isNew: true,
                  category: 'عام',
                  fileSize: upload.size,
                  comments: 0,
                  views: 0,
                };
                setReports((prev) => [newReport, ...prev]);
                return { ...u, progress: 100, status: 'completed' };
              }
              return { ...u, progress: newProgress };
            }
            return u;
          })
        );
      }, 300);
    });

    // Clean up completed uploads
    setTimeout(() => {
      setUploadingFiles((prev) => prev.filter((u) => u.status !== 'completed'));
    }, 5000);
  };

  /**
   * Adds a comment to a specific report and increments comment count
   */
  const addComment = (reportId: string) => {
    if (newComment.trim()) {
      // In a real app, this would be sent to the backend
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId
            ? { ...report, comments: report.comments + 1 }
            : report
        )
      );
      setNewComment('');
      setShowComments(null);
    }
  };

  /**
   * Returns Tailwind color classes based on report status
   */
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'archived':
        return 'bg-gray-100 text-gray-800';
    }
  };

  /**
   * Returns Arabic label for report status
   */
  const getStatusLabel = (status: Report['status']) => {
    switch (status) {
      case 'published':
        return 'منشور';
      case 'draft':
        return 'مسودة';
      case 'archived':
        return 'مؤرشف';
    }
  };

  /**
   * Report card displaying report metadata, status, author, dates, file size, engagement stats, and action buttons. Features gradient overlays and new badge for recent reports.
   */
  const ReportCard = ({
    report,
    index,
    onViewDetails,
    onComment,
    getStatusColor,
    getStatusLabel,
  }: {
    report: Report;
    index: number;
    onViewDetails: () => void;
    onComment: () => void;
    getStatusColor: (status: Report['status']) => string;
    getStatusLabel: (status: Report['status']) => string;
  }) => (
    <motion.div
      key={report.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
        report.isNew ? 'ring-2 ring-yellow-400' : ''
      }`}
    >
      {/* Background Gradient Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${report.isNew ? 'from-yellow-50/30 via-transparent to-orange-50/30' : 'from-blue-50/30 via-transparent to-purple-50/30'} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      ></div>

      {/* Header */}
      <div
        className={`relative p-6 lg:p-8 ${report.isNew ? 'bg-gradient-to-r from-yellow-50 to-orange-50' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div
              className={`p-4 rounded-xl ${report.isNew ? 'bg-yellow-100' : 'bg-white'} shadow-md transition-all duration-300`}
            >
              🗒️
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg lg:text-xl mb-2 group-hover:text-blue-600 transition-all duration-300 leading-tight">
                {report.title}
              </h3>
              <p className="text-sm text-gray-700 font-medium">
                {report.category}
              </p>
            </div>
          </div>
          {report.isNew && (
            <div className="flex items-center text-yellow-600 text-sm font-medium bg-yellow-100 px-2 py-1 rounded-full">
              <Sparkles className="w-4 h-4 mr-1" />
              جديد
            </div>
          )}
        </div>

        <div
          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}
        >
          {getStatusLabel(report.status)}
        </div>
      </div>

      {/* Content */}
      <div className="relative p-6 lg:p-8">
        {/* Description */}
        <p className="text-gray-700 text-sm leading-relaxed tracking-normal line-clamp-3 mb-6">
          {report.description}
        </p>

        {/* Author */}
        <div className="flex items-center text-sm text-gray-700 mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center ml-3">
            <span className="text-white text-xs font-bold">
              {report.author.charAt(0)}
            </span>
          </div>
          <span className="font-medium">{report.author}</span>
        </div>

        {/* Metadata */}
        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-blue-500" />
              <span>تم الإنشاء</span>
            </div>
            <span className="text-slate-900 font-medium">
              {report.createdAt}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-green-500" />
              <span>آخر تعديل</span>
            </div>
            <span className="text-slate-900 font-medium">
              {report.updatedAt}
            </span>
          </div>
          {report.fileSize && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-4 h-4 mr-2 text-purple-500" />
                <span>حجم الملف</span>
              </div>
              <span className="text-slate-900 font-medium">
                {report.fileSize}
              </span>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-500 mb-1">
              <Eye className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium text-slate-900">
              {report.views}
            </div>
            <div className="text-xs text-gray-500">مشاهدة</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center text-gray-500 mb-1">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div className="text-sm font-medium text-slate-900">
              {report.comments}
            </div>
            <div className="text-xs text-gray-500">تعليق</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onViewDetails}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            <span>عرض التفاصيل</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onComment}
            className="bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            <span>تعليق</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  /**
   * Modal for uploading new reports. Features drag-and-drop area and file type restrictions.
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
    fileInputRef: React.RefObject<HTMLInputElement | null>;
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
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                رفع تقرير جديد
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">انقر لاختيار ملف التقرير</p>
                <p className="text-sm text-gray-500">
                  يدعم PDF, Word, Excel حتى 50MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.xls,.xlsx"
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
   * Modal for adding comments to reports. Features textarea input and submit/cancel actions.
   */
  const CommentsModal = ({
    isOpen,
    onClose,
    newComment,
    setNewComment,
    onSubmit,
  }: {
    isOpen: boolean;
    onClose: () => void;
    newComment: string;
    setNewComment: (value: string) => void;
    onSubmit: () => void;
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
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                إضافة تعليق
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="اكتب تعليقك هنا..."
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
              <div className="flex gap-3">
                <button
                  onClick={onSubmit}
                  disabled={!newComment.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  إضافة التعليق
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 pt-20 transition-all duration-300">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
              التقارير
            </h1>
            <p className="text-gray-600 mt-2 text-lg leading-relaxed">
              إدارة ومراجعة التقارير التفاعلية
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUpload(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold flex items-center justify-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            رفع تقرير جديد
          </motion.button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في التقارير..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 transition-all duration-300 text-lg"
            />
          </div>

          <div className="flex gap-6">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium transition-all duration-300"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white font-medium transition-all duration-300"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status === 'الكل'
                    ? 'جميع الحالات'
                    : status === 'draft'
                      ? 'مسودات'
                      : status === 'published'
                        ? 'منشورة'
                        : 'مؤرشفة'}
                </option>
              ))}
            </select>
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
            className="bg-white rounded-2xl shadow-lg p-6 mb-6"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Upload className="w-5 h-5 mr-2 text-blue-600" />
              رفع التقارير ({uploadingFiles.length})
            </h3>
            <div className="space-y-4">
              {uploadingFiles.map((upload) => (
                <div
                  key={upload.id}
                  className="flex items-center space-x-4 space-x-reverse"
                >
                  {upload.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  ) : upload.status === 'error' ? (
                    <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin flex-shrink-0"></div>
                  )}
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {upload.name}
                    </div>
                    <div className="text-xs text-gray-500">{upload.size}</div>
                    {upload.status === 'uploading' && (
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <motion.div
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${upload.progress}%` }}
                          transition={{ duration: 0.3 }}
                        ></motion.div>
                      </div>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {upload.status === 'completed'
                      ? 'مكتمل'
                      : upload.status === 'error'
                        ? 'خطأ'
                        : `${Math.round(upload.progress)}%`}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-8">
        {filteredReports.map((report, index) => (
          <ReportCard
            key={report.id}
            report={report}
            index={index}
            onViewDetails={() => {}}
            onComment={() => setShowComments(report.id)}
            getStatusColor={getStatusColor}
            getStatusLabel={getStatusLabel}
          />
        ))}
      </div>

      <UploadModal
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        onFileSelect={handleFileUpload}
        fileInputRef={fileInputRef}
      />

      <CommentsModal
        isOpen={!!showComments}
        onClose={() => setShowComments(null)}
        newComment={newComment}
        setNewComment={setNewComment}
        onSubmit={() => addComment(showComments!)}
      />

      {/* Empty State */}
      {filteredReports.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="relative mb-8">
            {/* Illustration SVG */}
            <svg
              className="w-32 h-32 mx-auto text-gray-300"
              fill="none"
              viewBox="0 0 120 120"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Document stack */}
              <rect
                x="35"
                y="50"
                width="25"
                height="30"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.3"
              />
              <rect
                x="32"
                y="47"
                width="25"
                height="30"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.2"
              />
              <rect
                x="38"
                y="53"
                width="25"
                height="30"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
              />

              {/* Document lines */}
              <line
                x1="42"
                y1="58"
                x2="55"
                y2="58"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.4"
              />
              <line
                x1="42"
                y1="63"
                x2="50"
                y2="63"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              />
              <line
                x1="42"
                y1="68"
                x2="52"
                y2="68"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.2"
              />

              {/* Search icon */}
              <circle
                cx="85"
                cy="35"
                r="15"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                opacity="0.6"
              />
              <circle
                cx="85"
                cy="35"
                r="8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                opacity="0.8"
              />
              <rect
                x="90"
                y="38"
                width="8"
                height="2"
                rx="1"
                fill="currentColor"
                opacity="0.8"
                transform="rotate(45 94 39)"
              />

              {/* Floating elements */}
              <circle cx="25" cy="30" r="3" fill="currentColor" opacity="0.3" />
              <circle cx="95" cy="80" r="2" fill="currentColor" opacity="0.2" />
            </svg>

            {/* Floating icons */}
            <div className="absolute -top-3 -right-3 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600 opacity-60" />
            </div>
            <div className="absolute -bottom-2 -left-2 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Search className="w-4 h-4 text-purple-600 opacity-60" />
            </div>
            <div className="absolute top-1/2 -right-6 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
              <Plus className="w-3 h-3 text-green-600 opacity-60" />
            </div>
          </div>

          <h3 className="text-2xl font-bold text-slate-900 mb-3">
            لا توجد تقارير متاحة حالياً
          </h3>
          <p className="text-gray-700 text-lg max-w-md mx-auto mb-8 leading-relaxed">
            ابدأ برفع تقريرك الأول أو غيّر معايير البحث للعثور على التقارير
            المطلوبة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUpload(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              رفع تقرير جديد
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('الكل');
                setSelectedStatus('الكل');
              }}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center justify-center"
            >
              <Search className="w-5 h-5 mr-2 opacity-60" />
              مسح البحث
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ReportsComponent;
