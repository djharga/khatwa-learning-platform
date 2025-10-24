/**
 * صفحة إدارة المحتوى والملفات - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير رفع وإدارة الملفات والفيديوهات والمحتوى التعليمي
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload,
  Download,
  FileText,
  Video,
  Image,
  FileSpreadsheet,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Play,
  Pause,
  Copy,
  Move,
  Folder,
  FolderOpen,
  Plus,
  X,
  Save,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Calendar,
  User,
  Tag,
  Link,
} from 'lucide-react';

interface ContentFile {
  id: string;
  name: string;
  type: 'word' | 'excel' | 'pdf' | 'powerpoint' | 'video' | 'image' | 'other';
  size: number; // KB
  uploadedAt: string;
  uploadedBy: string;
  courseId?: string;
  moduleId?: string;
  tags: string[];
  description?: string;
  downloads: number;
  views: number;
  isPublic: boolean;
  version: number;
  lastModified: string;
  thumbnail?: string;
  duration?: number; // للفيديوهات (بالدقائق)
  explanationVideo?: string;
}

interface ContentFolder {
  id: string;
  name: string;
  parentId?: string;
  courseId?: string;
  createdAt: string;
  fileCount: number;
  totalSize: number;
}

const AdminContentPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showFileDetails, setShowFileDetails] = useState(false);
  const [selectedFile, setSelectedFile] = useState<ContentFile | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);

  // بيانات تجريبية للملفات
  const [files, setFiles] = useState<ContentFile[]>([
    {
      id: '1',
      name: 'مقدمة_المراجعة_الداخلية.docx',
      type: 'word',
      size: 2048,
      uploadedAt: '2024-01-15',
      uploadedBy: 'د. أحمد محمد',
      courseId: '1',
      moduleId: 'm1',
      tags: ['مراجعة داخلية', 'مقدمة', 'أساسيات'],
      description: 'ملف مقدمة شامل لأساسيات المراجعة الداخلية',
      downloads: 89,
      views: 156,
      isPublic: true,
      version: 2,
      lastModified: '2024-01-18',
      explanationVideo: 'video1'
    },
    {
      id: '2',
      name: 'جدول_المراجعة.xlsx',
      type: 'excel',
      size: 512,
      uploadedAt: '2024-01-15',
      uploadedBy: 'د. أحمد محمد',
      courseId: '1',
      moduleId: 'm1',
      tags: ['جدول', 'مراجعة', 'قالب'],
      description: 'قالب Excel لجدول المراجعة الداخلية',
      downloads: 67,
      views: 89,
      isPublic: true,
      version: 1,
      lastModified: '2024-01-15'
    },
    {
      id: '3',
      name: 'شرح_المقدمة.mp4',
      type: 'video',
      size: 15360, // 15MB
      uploadedAt: '2024-01-16',
      uploadedBy: 'د. أحمد محمد',
      courseId: '1',
      moduleId: 'm1',
      tags: ['فيديو', 'شرح', 'مقدمة'],
      description: 'فيديو شرح تفصيلي للمقدمة',
      downloads: 45,
      views: 156,
      isPublic: true,
      version: 1,
      lastModified: '2024-01-16',
      duration: 25
    },
    {
      id: '4',
      name: 'دليل_المحاسبة_المالية.pdf',
      type: 'pdf',
      size: 3584, // 3.5MB
      uploadedAt: '2024-01-10',
      uploadedBy: 'د. فاطمة علي',
      courseId: '2',
      tags: ['دليل', 'محاسبة', 'مالية'],
      description: 'دليل شامل للمحاسبة المالية',
      downloads: 234,
      views: 567,
      isPublic: true,
      version: 3,
      lastModified: '2024-01-19'
    }
  ]);

  const filteredFiles = useMemo(() => {
    return files.filter(file => {
      const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           file.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = typeFilter === 'all' || file.type === typeFilter;
      const matchesCourse = courseFilter === 'all' || file.courseId === courseFilter;

      return matchesSearch && matchesType && matchesCourse;
    });
  }, [files, searchTerm, typeFilter, courseFilter]);

  const stats = useMemo(() => {
    const totalFiles = files.length;
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const videos = files.filter(f => f.type === 'video').length;
    const documents = files.filter(f => ['word', 'excel', 'pdf', 'powerpoint'].includes(f.type)).length;
    const images = files.filter(f => f.type === 'image').length;
    const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);
    const totalViews = files.reduce((sum, file) => sum + file.views, 0);

    return { totalFiles, totalSize, videos, documents, images, totalDownloads, totalViews };
  }, [files]);

  const getFileIcon = (type: string, size: string = 'w-8 h-8') => {
    const iconClass = `${size} rounded-lg flex items-center justify-center`;
    switch (type) {
      case 'word':
        return <div className={`${iconClass} bg-blue-100 text-blue-600`}><FileText className="w-4 h-4" /></div>;
      case 'excel':
        return <div className={`${iconClass} bg-green-100 text-green-600`}><FileSpreadsheet className="w-4 h-4" /></div>;
      case 'pdf':
        return <div className={`${iconClass} bg-red-100 text-red-600`}><FileText className="w-4 h-4" /></div>;
      case 'powerpoint':
        return <div className={`${iconClass} bg-orange-100 text-orange-600`}><FileText className="w-4 h-4" /></div>;
      case 'video':
        return <div className={`${iconClass} bg-purple-100 text-purple-600`}><Video className="w-4 h-4" /></div>;
      case 'image':
        return <div className={`${iconClass} bg-pink-100 text-pink-600`}><Image className="w-4 h-4" /></div>;
      default:
        return <div className={`${iconClass} bg-gray-100 text-gray-600`}><FileText className="w-4 h-4" /></div>;
    }
  };

  const getFileTypeLabel = (type: string) => {
    switch (type) {
      case 'word': return 'Word';
      case 'excel': return 'Excel';
      case 'pdf': return 'PDF';
      case 'powerpoint': return 'PowerPoint';
      case 'video': return 'فيديو';
      case 'image': return 'صورة';
      default: return 'ملف آخر';
    }
  };

  const handleSelectFile = (fileId: string) => {
    setSelectedFiles(prev =>
      prev.includes(fileId)
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteFile = (fileId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الملف؟')) {
      setFiles(files.filter(f => f.id !== fileId));
    }
  };

  const handleBulkDelete = () => {
    if (confirm(`هل أنت متأكد من حذف ${selectedFiles.length} ملف؟`)) {
      setFiles(files.filter(f => !selectedFiles.includes(f.id)));
      setSelectedFiles([]);
    }
  };

  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} KB`;
    return `${(size / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-6">
            <Upload className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-bold">إدارة المحتوى والملفات</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            نظام إدارة المحتوى الشامل
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            رفع وإدارة الملفات والفيديوهات والمحتوى التعليمي
          </p>
        </motion.div>

        {/* الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الملفات</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalFiles}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الحجم</p>
                <p className="text-3xl font-bold text-green-600">{(stats.totalSize / 1024).toFixed(1)} MB</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الفيديوهات</p>
                <p className="text-3xl font-bold text-purple-600">{stats.videos}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المستندات</p>
                <p className="text-3xl font-bold text-blue-600">{stats.documents}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الصور</p>
                <p className="text-3xl font-bold text-pink-600">{stats.images}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Image className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي التحميلات</p>
                <p className="text-3xl font-bold text-orange-600">{stats.totalDownloads}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المشاهدات</p>
                <p className="text-3xl font-bold text-teal-600">{stats.totalViews}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          {[
            { id: 'all', label: 'جميع الملفات', count: files.length },
            { id: 'documents', label: 'المستندات', count: stats.documents },
            { id: 'videos', label: 'الفيديوهات', count: stats.videos },
            { id: 'images', label: 'الصور', count: stats.images },
            { id: 'recent', label: 'المحدثة حديثاً', count: files.filter(f => new Date(f.lastModified) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab.label}
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* شريط البحث */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="البحث في الملفات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* الفلاتر */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              >
                <option value="all">جميع الأنواع</option>
                <option value="word">Word</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
                <option value="powerpoint">PowerPoint</option>
                <option value="video">فيديو</option>
                <option value="image">صورة</option>
              </select>

              <select
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300"
              >
                <option value="all">جميع الدورات</option>
                <option value="1">دورة المراجعة الداخلية الأولى</option>
                <option value="2">برنامج زمالة المراجعين</option>
                <option value="3">دورة الإدارة المالية</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              {selectedFiles.length > 0 && (
                <motion.button
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleBulkDelete}
                >
                  <Trash2 className="w-5 h-5" />
                  حذف المحدد ({selectedFiles.length})
                </motion.button>
              )}

              <motion.button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUploadModal(true)}
              >
                <Upload className="w-5 h-5" />
                رفع ملف جديد
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                تصدير البيانات
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* عرض الملفات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredFiles.map((file, index) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 ${
                selectedFiles.includes(file.id) ? 'ring-2 ring-green-500' : ''
              }`}
            >
              {/* رأس الملف */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  {getFileIcon(file.type)}
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => handleSelectFile(file.id)}
                      className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <div className="relative">
                      <motion.button
                        className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>

              {/* محتوى الملف */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 truncate" title={file.name}>
                  {file.name}
                </h3>

                {file.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {file.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <User className="w-4 h-4" />
                    <span>{file.uploadedBy}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(file.uploadedAt).toLocaleDateString('ar-SA')}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatFileSize(file.size)}</span>
                    {file.duration && <span>{file.duration} دقيقة</span>}
                  </div>
                </div>

                {/* الإحصائيات */}
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <Download className="w-4 h-4" />
                    <span>{file.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{file.views}</span>
                  </div>
                  {file.version > 1 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      v{file.version}
                    </span>
                  )}
                </div>

                {/* العلامات */}
                {file.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {file.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {file.tags.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{file.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* أزرار التحكم */}
                <div className="flex items-center gap-2">
                  <motion.button
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg font-semibold text-sm transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedFile(file);
                      setShowFileDetails(true);
                    }}
                  >
                    عرض
                  </motion.button>
                  <motion.button
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDeleteFile(file.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* رسالة عدم وجود نتائج */}
        {filteredFiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد ملفات</h3>
            <p className="text-gray-600">لم نتمكن من العثور على أي ملفات تطابق معايير البحث الخاصة بك</p>
          </motion.div>
        )}

        {/* نافذة تفاصيل الملف */}
        <AnimatePresence>
          {showFileDetails && selectedFile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">تفاصيل الملف</h3>
                    <button
                      onClick={() => setShowFileDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    {getFileIcon(selectedFile.type, 'w-16 h-16')}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">{selectedFile.name}</h4>
                      <p className="text-gray-600">{getFileTypeLabel(selectedFile.type)} • {formatFileSize(selectedFile.size)}</p>
                      {selectedFile.duration && (
                        <p className="text-sm text-gray-500">{selectedFile.duration} دقيقة</p>
                      )}
                    </div>
                  </div>

                  {selectedFile.description && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-2">الوصف</h5>
                      <p className="text-gray-600">{selectedFile.description}</p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">معلومات الملف</h5>
                      <div className="space-y-2 text-sm">
                        <p><strong>النوع:</strong> {getFileTypeLabel(selectedFile.type)}</p>
                        <p><strong>الحجم:</strong> {formatFileSize(selectedFile.size)}</p>
                        <p><strong>الإصدار:</strong> {selectedFile.version}</p>
                        <p><strong>الحالة:</strong> {selectedFile.isPublic ? 'عام' : 'خاص'}</p>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">الإحصائيات</h5>
                      <div className="space-y-2 text-sm">
                        <p><strong>التحميلات:</strong> {selectedFile.downloads}</p>
                        <p><strong>المشاهدات:</strong> {selectedFile.views}</p>
                        <p><strong>تاريخ الرفع:</strong> {new Date(selectedFile.uploadedAt).toLocaleDateString('ar-SA')}</p>
                        <p><strong>آخر تعديل:</strong> {new Date(selectedFile.lastModified).toLocaleDateString('ar-SA')}</p>
                      </div>
                    </div>
                  </div>

                  {/* العلامات */}
                  {selectedFile.tags.length > 0 && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-2">العلامات</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedFile.tags.map((tag, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* فيديو الشرح */}
                  {selectedFile.explanationVideo && (
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-900 mb-2">فيديو الشرح</h5>
                      <div className="bg-gray-100 p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Play className="w-8 h-8 text-red-500" />
                          <div>
                            <p className="font-medium">فيديو شرح {selectedFile.name}</p>
                            <p className="text-sm text-gray-600">متاح للمشاهدة</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-5 h-5 mr-2" />
                      تحميل الملف
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Edit className="w-5 h-5 mr-2" />
                      تعديل البيانات
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFileDetails(false)}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminContentPage;
