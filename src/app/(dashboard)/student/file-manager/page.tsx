'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
} from 'lucide-react';

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

export default function FileManagerPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPath, setCurrentPath] = useState('الرئيسية');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [storageUsed, setStorageUsed] = useState(2.3); // جيجا
  const [storageLimit] = useState(5); // جيجا

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
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

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
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إدارة الملفات الشخصية</h1>
          <p className="text-gray-600">مساحة تخزين خاصة بك بحد أقصى 5 جيجابايت</p>
        </motion.div>

        {/* معلومات التخزين */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <HardDrive className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-gray-900">مساحة التخزين</h3>
                <p className="text-sm text-gray-600">
                  {storageUsed} جيجا من أصل {storageLimit} جيجا مستخدمة
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(storagePercentage)}%
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-2">
                <motion.div
                  className={`h-2 rounded-full ${storagePercentage > 80 ? 'bg-red-500' : 'bg-blue-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${storagePercentage}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>

          {storagePercentage > 80 && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <span className="text-sm text-red-800">
                مساحة التخزين تقترب من الحد الأقصى. يرجى حذف بعض الملفات أو ترقية المساحة.
              </span>
            </div>
          )}
        </motion.div>

        {/* شريط الأدوات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* البحث والفلترة */}
            <div className="flex items-center gap-3 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="البحث في الملفات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                فلترة
              </button>
            </div>

            {/* أدوات العرض والإجراءات */}
            <div className="flex items-center gap-3">
              {/* تبديل طريقة العرض */}
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* رفع الملفات */}
              <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                <Upload className="w-4 h-4" />
                رفع الملفات
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.jpg,.png"
                />
              </label>

              {/* إجراءات الملفات المحددة */}
              {selectedFiles.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDeleteSelected}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* المسار الحالي */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4"
        >
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>الملفات</span>
            <span>/</span>
            <span className="text-blue-600">{currentPath}</span>
          </div>
        </motion.div>

        {/* محتوى الملفات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* مجلدات الدورات */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">مجلدات الدورات</h2>
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer ${
                    viewMode === 'list' ? 'flex items-center justify-between' : ''
                  }`}
                >
                  <div className={`flex items-center gap-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      course.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      course.color === 'green' ? 'bg-green-100 text-green-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <Folder className="w-6 h-6" />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{course.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span>{course.fileCount} ملف</span>
                        <span>{course.totalSize}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-50">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* الملفات الحديثة */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">الملفات الحديثة</h2>
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
              {recentFiles
                .filter(file => file.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((file, index) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow cursor-pointer ${
                    selectedFiles.includes(file.id) ? 'ring-2 ring-blue-500' : ''
                  } ${viewMode === 'list' ? 'flex items-center justify-between' : ''}`}
                  onClick={() => {
                    if (selectedFiles.includes(file.id)) {
                      setSelectedFiles(prev => prev.filter(id => id !== file.id));
                    } else {
                      setSelectedFiles(prev => [...prev, file.id]);
                    }
                  }}
                >
                  <div className={`flex items-center gap-3 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      file.isProtected ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {file.isProtected ? <AlertCircle className="w-5 h-5" /> : <File className="w-5 h-5" />}
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{file.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <span>{file.size}</span>
                        <span>•</span>
                        <span>{file.modifiedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {file.isFavorite && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* رسالة عدم وجود ملفات */}
          {filteredCourses.length === 0 && recentFiles.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <File className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm ? 'لا توجد ملفات تطابق البحث' : 'لا توجد ملفات بعد'}
              </h3>
              <p className="text-gray-600 mb-6">
                {searchTerm ? 'جرب مصطلحات بحث مختلفة' : 'ابدأ برفع ملفاتك الأولى'}
              </p>
              {!searchTerm && (
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer">
                  <Upload className="w-5 h-5" />
                  رفع الملفات الأولى
                  <input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
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
            className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>جاري رفع الملفات...</span>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
