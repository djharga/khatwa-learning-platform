'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  File,
  Upload,
  Download,
  Search,
  Filter,
  Grid,
  List,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Share,
  Copy,
  Move,
  Archive,
  Star,
  Clock,
  HardDrive,
  AlertCircle,
  CheckCircle,
  Mic,
  History,
  Eye,
  CloudUpload,
  RotateCcw,
  X,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';
import SmartArchiveComponent from '../../../../components/projects/SmartArchiveComponent';

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: string;
  modifiedDate: string;
  courseName?: string;
  isProtected?: boolean;
  isFavorite?: boolean;
}

interface CourseFolder {
  id: string;
  name: string;
  color: string;
  files: FileItem[];
  totalSize: string;
  fileCount: number;
}

interface VoiceNote {
  id: string;
  duration: string;
  date: string;
  url: string; // Mock URL
}

interface EditHistory {
  id: string;
  action: string;
  user: string;
  date: string;
}

interface Reader {
  id: string;
  name: string;
  readDate: string;
  duration: string;
}

export default function FileManagerPage() {
  const [activeTab, setActiveTab] = useState<'files' | 'projects'>('files');
  const [isProjectsTab, setIsProjectsTab] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState('الرئيسية');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [storageUsed, setStorageUsed] = useState(2.3); // جيجا
  const [storageLimit] = useState(5); // جيجا
  const [lastBackup, setLastBackup] = useState<string | null>('2024-02-10');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data for sidebar
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([
    { id: '1', duration: '2:30', date: '2024-02-15', url: 'mock-audio-1.mp3' },
    { id: '2', duration: '1:45', date: '2024-02-14', url: 'mock-audio-2.mp3' },
  ]);
  const [editHistory, setEditHistory] = useState<EditHistory[]>([
    { id: '1', action: 'تم تعديل المحتوى', user: 'أحمد محمد', date: '2024-02-15' },
    { id: '2', action: 'تم رفع الملف', user: 'فاطمة علي', date: '2024-02-14' },
  ]);
  const [readers, setReaders] = useState<Reader[]>([
    { id: '1', name: 'سارة أحمد', readDate: '2024-02-15', duration: '15 دقيقة' },
    { id: '2', name: 'محمد حسن', readDate: '2024-02-14', duration: '30 دقيقة' },
  ]);

  // بيانات تجريبية للمجلدات والملفات
  const [courses, setCourses] = useState<CourseFolder[]>([
    {
      id: '1',
      name: 'المحاسبة المالية المتقدمة',
      color: 'blue',
      totalSize: '450 MB',
      fileCount: 12,
      files: [
        {
          id: '1',
          name: 'القوائم المالية.pdf',
          type: 'file',
          size: '2.5 MB',
          modifiedDate: '2024-02-15',
          courseName: 'المحاسبة المالية المتقدمة',
          isProtected: true,
        },
        {
          id: '2',
          name: 'تمارين عملية.xlsx',
          type: 'file',
          size: '1.8 MB',
          modifiedDate: '2024-02-14',
          courseName: 'المحاسبة المالية المتقدمة',
        },
        {
          id: '3',
          name: 'ملخص الدرس الأول',
          type: 'folder',
          size: '15 MB',
          modifiedDate: '2024-02-13',
          courseName: 'المحاسبة المالية المتقدمة',
        },
      ],
    },
    {
      id: '2',
      name: 'التدقيق والمراجعة الداخلية',
      color: 'green',
      totalSize: '320 MB',
      fileCount: 8,
      files: [
        {
          id: '4',
          name: 'دليل المراجعة.pdf',
          type: 'file',
          size: '3.2 MB',
          modifiedDate: '2024-02-12',
          courseName: 'التدقيق والمراجعة الداخلية',
          isProtected: true,
        },
        {
          id: '5',
          name: 'نماذج التقارير.docx',
          type: 'file',
          size: '1.5 MB',
          modifiedDate: '2024-02-11',
          courseName: 'التدقيق والمراجعة الداخلية',
        },
      ],
    },
  ]);

  const [recentFiles, setRecentFiles] = useState<FileItem[]>([
    {
      id: '6',
      name: 'مشروع التخرج.pdf',
      type: 'file',
      size: '5.2 MB',
      modifiedDate: '2024-02-16',
      isProtected: false,
    },
    {
      id: '7',
      name: 'ملاحظات الدرس.docx',
      type: 'file',
      size: '856 KB',
      modifiedDate: '2024-02-15',
      isProtected: false,
    },
  ]);

  // حساب إجمالي الملفات والحجم
  const totalFiles = courses.reduce((acc, course) => acc + course.fileCount, 0) + recentFiles.length;
  const storagePercentage = (storageUsed / storageLimit) * 100;

  // فلترة الملفات حسب البحث
  const filteredCourses = courses.map(course => ({
    ...course,
    files: course.files.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(course => course.files.length > 0 || course.name.toLowerCase().includes(searchTerm.toLowerCase()));

  // معالجة رفع الملفات
  const handleFileUpload = async (files: FileList) => {
    setIsUploading(true);

    // محاكاة رفع الملفات
    for (const file of Array.from(files)) {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newFile: FileItem = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        type: 'file',
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        modifiedDate: new Date().toISOString().split('T')[0],
        isProtected: false,
      };

      setRecentFiles(prev => [newFile, ...prev]);
    }

    setIsUploading(false);
  };

  // حذف الملفات المحددة
  const handleDeleteSelected = () => {
    if (selectedFiles.length === 0) return;

    setCourses(prev => prev.map(course => ({
      ...course,
      files: course.files.filter(file => !selectedFiles.includes(file.id)),
      fileCount: course.files.length - course.files.filter(file => selectedFiles.includes(file.id)).length,
    })));

    setRecentFiles(prev => prev.filter(file => !selectedFiles.includes(file.id)));
    setSelectedFiles([]);
    setSelectedFile(null);
  };

  // إنشاء نسخة احتياطية
  const handleCreateBackup = () => {
    // محاكاة إنشاء النسخة الاحتياطية
    setLastBackup(new Date().toISOString().split('T')[0]);
    alert('تم إنشاء نسخة احتياطية بنجاح');
  };

  // استعادة النسخة الاحتياطية
  const handleRestoreBackup = () => {
    alert('تم استعادة النسخة الاحتياطية بنجاح');
  };

  // معالجة السحب والإفلات
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  // اختيار ملف
  const handleFileSelect = (file: FileItem) => {
    setSelectedFile(file);
  };

  if (activeTab === 'projects') {
    return <SmartArchiveComponent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
          {/* اللوحة الجانبية */}
          <AnimatePresence>
            {selectedFile && (
              <motion.aside
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="w-full lg:w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 lg:me-6 h-fit"
                role="complementary"
                aria-label="تفاصيل الملف"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white">تفاصيل الملف</h3>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    aria-label="إغلاق"
                    type="button"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                    <h4 className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white mb-2">{selectedFile.name}</h4>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">الحجم: {selectedFile.size}</p>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">تاريخ التعديل: {selectedFile.modifiedDate}</p>
                  </div>

                  {/* الملاحظات الصوتية */}
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                      <Mic className="w-4 h-4" aria-hidden="true" />
                      الملاحظات الصوتية
                    </h5>
                    <div className="space-y-2">
                      {voiceNotes.map(note => (
                        <div key={note.id} className="flex items-center justify-between p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                          <div>
                            <p className="text-xs sm:text-sm text-neutral-900 dark:text-white">{note.duration}</p>
                            <p className="text-xs text-neutral-500 dark:text-neutral-500">{note.date}</p>
                          </div>
                          <button className="p-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2" aria-label={`تشغيل ${note.duration}`} type="button">
                            <Play className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* سجل التعديلات */}
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                      <History className="w-4 h-4" aria-hidden="true" />
                      سجل التعديلات
                    </h5>
                    <div className="space-y-2">
                      {editHistory.map(edit => (
                        <div key={edit.id} className="p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                          <p className="text-xs sm:text-sm text-neutral-900 dark:text-white">{edit.action}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">{edit.user} - {edit.date}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* من قرأ الملف */}
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-neutral-900 dark:text-white mb-2 flex items-center gap-2">
                      <Eye className="w-4 h-4" aria-hidden="true" />
                      من قرأ الملف
                    </h5>
                    <div className="space-y-2">
                      {readers.map(reader => (
                        <div key={reader.id} className="p-2 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
                          <p className="text-xs sm:text-sm text-neutral-900 dark:text-white">{reader.name}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">{reader.readDate} - {reader.duration}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* المحتوى الرئيسي */}
          <div className="flex-1 min-w-0">
            {/* رأس الصفحة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mb-6 sm:mb-8"
            >
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">إدارة الملفات الشخصية</h1>
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">مساحة تخزين خاصة بك بحد أقصى 5 جيجابايت</p>
            </motion.div>

            {/* التبويبات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
              className="mb-4 sm:mb-6"
            >
              <div className="flex border-b border-neutral-200 dark:border-neutral-700" role="tablist">
                <button
                  onClick={() => setActiveTab('files')}
                  className={`px-4 sm:px-6 py-2 sm:py-3 min-h-[44px] font-medium text-sm sm:text-base transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${activeTab === 'files'
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                    }`}
                  aria-label="الملفات"
                  aria-selected={activeTab === 'files'}
                  role="tab"
                  type="button"
                >
                  الملفات
                </button>
                <button
                  onClick={() => {
                    setActiveTab('projects');
                    setIsProjectsTab(true);
                  }}
                  className={`px-4 sm:px-6 py-2 sm:py-3 min-h-[44px] font-medium text-sm sm:text-base transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${(activeTab as 'files' | 'projects') === 'projects'
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
                    }`}
                  aria-label="المشاريع"
                  aria-selected={(activeTab as 'files' | 'projects') === 'projects'}
                  role="tab"
                  type="button"
                >
                  المشاريع
                </button>
              </div>
            </motion.div>

            {/* معلومات التخزين */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
              className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 mb-4 sm:mb-6"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <HardDrive className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">مساحة التخزين</h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                      {storageUsed} جيجا من أصل {storageLimit} جيجا مستخدمة
                    </p>
                  </div>
                </div>
                <div className="text-start sm:text-end">
                  <div className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                    {Math.round(storagePercentage)}%
                  </div>
                  <div className="w-32 bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mt-2">
                    <motion.div
                      className={`h-2 rounded-full transition-colors duration-200 ease-out ${storagePercentage > 80
                          ? 'bg-danger-500'
                          : storagePercentage > 60
                            ? 'bg-warning-500'
                            : 'bg-success-500'
                        }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${storagePercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      role="progressbar"
                      aria-valuenow={storagePercentage}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${storagePercentage}% من المساحة مستخدمة`}
                    />
                  </div>
                </div>
              </div>

              {storagePercentage > 80 && (
                <div className="flex items-start gap-2 p-3 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-danger-600 dark:text-danger-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-xs sm:text-sm text-danger-800 dark:text-danger-300">
                    مساحة التخزين تقترب من الحد الأقصى. يرجى حذف بعض الملفات أو ترقية المساحة.
                  </span>
                </div>
              )}

              {/* ميزة النسخ الاحتياطي */}
              <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <div>
                  <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                    آخر نسخة احتياطية: <span className="font-medium text-neutral-900 dark:text-white">{lastBackup || 'لا توجد'}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button
                    onClick={handleCreateBackup}
                    className="px-3 sm:px-4 py-2 min-h-[44px] bg-success-600 hover:bg-success-700 text-white rounded-lg font-medium text-xs sm:text-sm shadow-md shadow-success-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                    aria-label="إنشاء نسخة احتياطية"
                    type="button"
                  >
                    <CloudUpload className="w-4 h-4" aria-hidden="true" />
                    إنشاء نسخة احتياطية
                  </button>
                  {lastBackup && (
                    <button
                      onClick={handleRestoreBackup}
                      className="px-3 sm:px-4 py-2 min-h-[44px] bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium text-xs sm:text-sm shadow-md shadow-primary-500/20 hover:shadow-lg transition-all duration-200 ease-out flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="استعادة النسخة الاحتياطية"
                      type="button"
                    >
                      <RotateCcw className="w-4 h-4" aria-hidden="true" />
                      استعادة
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* منطقة السحب والإفلات */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
              className={`mb-4 sm:mb-6 border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-all duration-200 ease-out ${isDragOver
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/50'
                }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              aria-label="منطقة رفع الملفات"
            >
              <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-neutral-400 dark:text-neutral-500 mx-auto mb-3 sm:mb-4" aria-hidden="true" />
              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                اسحب وأفلت الملفات هنا للرفع، أو{' '}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 underline font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded"
                  aria-label="اختر الملفات"
                  type="button"
                >
                  اختر الملفات
                </button>
              </p>
            </motion.div>

            {/* المسار الحالي */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
              className="mb-4"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                <span>الملفات</span>
                <span>/</span>
                <span className="text-primary-600 dark:text-primary-400 font-medium">{currentPath}</span>
              </div>
            </motion.div>

            {/* محتوى الملفات */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.2, ease: 'easeOut' }}
            >
              {/* مجلدات الدورات */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">مجلدات الدورات</h2>
                <div className={`grid gap-3 sm:gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className={`bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer ${viewMode === 'list' ? 'flex items-center justify-between' : ''
                        }`}
                      role="button"
                      tabIndex={0}
                      aria-label={`فتح مجلد ${course.name}`}
                    >
                      <div className={`flex items-center gap-3 sm:gap-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${course.color === 'blue' ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400' :
                            course.color === 'green' ? 'bg-success-100 dark:bg-success-900/20 text-success-600 dark:text-success-400' :
                              'bg-secondary-innovate-100 dark:bg-secondary-innovate-900/20 text-secondary-innovate-600 dark:text-secondary-innovate-400'
                          }`}>
                          <Folder className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm sm:text-base text-neutral-900 dark:text-white truncate">{course.name}</h3>
                          <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                            <span>{course.fileCount} ملف</span>
                            <span>•</span>
                            <span>{course.totalSize}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                          aria-label={`خيارات ${course.name}`}
                          type="button"
                        >
                          <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* الملفات الحديثة */}
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-3 sm:mb-4">الملفات الحديثة</h2>
                <div className={`grid gap-3 sm:gap-4 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
                  {recentFiles
                    .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((file, index) => (
                      <motion.div
                        key={file.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.05, duration: 0.2, ease: 'easeOut' }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className={`bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-3 sm:p-4 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer ${selectedFiles.includes(file.id) ? 'ring-2 ring-primary-500 dark:ring-primary-400' : ''
                          } ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}
                        onClick={() => {
                          if (selectedFiles.includes(file.id)) {
                            setSelectedFiles(prev => prev.filter(id => id !== file.id));
                          } else {
                            setSelectedFiles(prev => [...prev, file.id]);
                          }
                          handleFileSelect(file);
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`اختيار ${file.name}`}
                        aria-selected={selectedFiles.includes(file.id)}
                      >
                        <div className={`flex items-center gap-2 sm:gap-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                          <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${file.isProtected
                              ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400'
                              : 'bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                            }`}>
                            {file.isProtected ? (
                              <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                            ) : (
                              <File className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-xs sm:text-sm text-neutral-900 dark:text-white truncate">{file.name}</h4>
                            <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 mt-1">
                              <span>{file.size}</span>
                              <span>•</span>
                              <span>{file.modifiedDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {file.isFavorite && (
                            <Star className="w-4 h-4 text-warning-500 dark:text-warning-400 fill-current" aria-hidden="true" />
                          )}
                          <button
                            className="p-1 text-neutral-400 dark:text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                            aria-label={`خيارات ${file.name}`}
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* رسالة عدم وجود ملفات */}
              {filteredCourses.length === 0 && recentFiles.filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.2, ease: 'easeOut' }}
                  className="text-center py-12 sm:py-16"
                >
                  <File className="w-12 h-12 sm:w-16 sm:h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-lg sm:text-xl font-medium text-neutral-900 dark:text-white mb-2">
                    {searchTerm ? 'لا توجد ملفات تطابق البحث' : 'لا توجد ملفات بعد'}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-4 sm:mb-6">
                    {searchTerm ? 'جرب مصطلحات بحث مختلفة' : 'ابدأ برفع ملفاتك الأولى'}
                  </p>
                  {!searchTerm && (
                    <label className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium text-sm sm:text-base shadow-md shadow-primary-500/20 hover:shadow-lg cursor-pointer transition-all duration-200 ease-out focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2">
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                      رفع الملفات الأولى
                      <input
                        type="file"
                        multiple
                        onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                        className="hidden"
                        aria-label="رفع الملفات"
                      />
                    </label>
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* مؤشر الرفع */}
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="fixed bottom-4 end-4 sm:bottom-6 sm:end-6 bg-primary-600 text-white p-3 sm:p-4 rounded-lg shadow-lg z-50"
                role="status"
                aria-live="polite"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white" aria-hidden="true"></div>
                  <span className="text-sm sm:text-base">جاري رفع الملفات...</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
