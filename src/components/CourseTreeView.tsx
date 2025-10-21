'use client';

import { FC, useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronRight,
  Folder,
  FolderOpen,
  FileText,
  Play,
  Image,
  File,
  Download,
  Eye,
  Lock,
  CheckCircle,
  Calendar,
  User,
  Upload,
  Edit,
  Star,
  Award,
  TrendingUp,
  FileType,
  FileSpreadsheet,
  FileImage,
  Presentation,
  Video,
  Clock,
  Sparkles,
  BookOpen,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import { Course, CourseFile, FileType as CourseFileType } from '@/types/course';
import {
  getFileIcon,
  getFileTypeColor,
  formatFileSize,
  formatDuration,
  calculateProgress,
} from '@/utils/courseUtils';
import { courseService } from '@/services/courseService';
import toast from 'react-hot-toast';

interface CourseTreeState {
  loading: boolean;
  error: string | null;
  searchTerm: string;
  selectedFile: CourseFile | null;
  expandedCourses: Set<string>;
  expandedFolders: Set<string>;
  filterType: CourseFileType | 'all';
}

interface CourseTreeViewProps {
  mode?: 'courses' | 'files';
  showDownloadButtons?: boolean;
  showCourseFilter?: boolean;
}

const CourseTreeView: FC<CourseTreeViewProps> = ({
  mode = 'courses',
  showDownloadButtons = true,
  showCourseFilter = true,
}) => {
  const [state, setState] = useState<CourseTreeState>({
    loading: false,
    error: null,
    searchTerm: '',
    selectedFile: null,
    expandedCourses: new Set(),
    expandedFolders: new Set(),
    filterType: 'all',
  });

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Load courses data from service
  const courses: Course[] = useMemo(() => {
    try {
      return courseService.getAllCourses();
    } catch (error) {
      console.error('خطأ في تحميل الكورسات:', error);
      return [];
    }
  }, []);

  // Event handlers
  const toggleCourse = useCallback((courseId: string) => {
    setState((prev) => {
      const newSet = new Set(prev.expandedCourses);
      if (newSet.has(courseId)) {
        newSet.delete(courseId);
      } else {
        newSet.add(courseId);
      }
      return { ...prev, expandedCourses: newSet };
    });
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    setState((prev) => {
      const newSet = new Set(prev.expandedFolders);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return { ...prev, expandedFolders: newSet };
    });
  }, []);

  const selectFile = useCallback((file: CourseFile) => {
    setState((prev) => ({ ...prev, selectedFile: file }));
  }, []);

  const handleSearch = useCallback((searchTerm: string) => {
    setState((prev) => ({ ...prev, searchTerm }));
  }, []);

  const handleFilterChange = useCallback(
    (filterType: CourseFileType | 'all') => {
      setState((prev) => ({ ...prev, filterType }));
    },
    []
  );

  const handleRefresh = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true }));
    // Simulate refresh
    setTimeout(() => {
      setState((prev) => ({ ...prev, loading: false }));
      toast.success('تم تحديث البيانات');
    }, 1000);
  }, []);

  // إضافة اختصارات لوحة المفاتيح
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // منع التداخل مع حقول الإدخال
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case 'f':
          if (event.ctrlKey) {
            event.preventDefault();
            searchInputRef.current?.focus();
          }
          break;
        case 'r':
          if (event.ctrlKey) {
            event.preventDefault();
            handleRefresh();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleRefresh]);

  // Memoized filtered files
  const filteredFiles = useMemo(() => {
    if (!courses) return [];

    const allFiles: CourseFile[] = [];
    const traverse = (fileList: CourseFile[]) => {
      fileList.forEach((file) => {
        if (state.filterType === 'all' || file.type === state.filterType) {
          if (
            !state.searchTerm ||
            file.name.toLowerCase().includes(state.searchTerm.toLowerCase())
          ) {
            allFiles.push(file);
          }
        }
        if (file.children) {
          traverse(file.children);
        }
      });
    };

    courses.forEach((course) => {
      if (course.files) {
        traverse(course.files);
      }
    });

    return allFiles;
  }, [courses, state.filterType, state.searchTerm]);

  const getFileIcon = useCallback(
    (
      type: CourseFileType,
      isCompleted?: boolean,
      isLocked?: boolean,
      isNew?: boolean,
      isModified?: boolean
    ) => {
      if (isLocked) return <Lock className="w-4 h-4 text-gray-400" />;
      if (isCompleted)
        return <CheckCircle className="w-4 h-4 text-green-500" />;

      const iconProps = { className: `w-4 h-4 ${getFileTypeColor(type)}` };

      let icon;
      switch (type) {
        case 'folder':
          icon = <Folder {...iconProps} />;
          break;
        case 'video':
          icon = <Video {...iconProps} />;
          break;
        case 'document':
        case 'pdf':
          icon = <FileText {...iconProps} />;
          break;
        case 'word':
          icon = <FileType {...iconProps} />;
          break;
        case 'excel':
          icon = <FileSpreadsheet {...iconProps} />;
          break;
        case 'powerpoint':
        case 'presentation':
          icon = <Presentation {...iconProps} />;
          break;
        case 'image':
          icon = <FileImage {...iconProps} />;
          break;
        default:
          icon = <File {...iconProps} />;
      }

      return (
        <div className="relative">
          {icon}
          {(isNew || isModified) && (
            <div className="absolute -top-1 -right-1">
              <Sparkles
                className={`w-2 h-2 ${isNew ? 'text-yellow-500' : 'text-blue-500'}`}
              />
            </div>
          )}
        </div>
      );
    },
    []
  );

  const renderFileTree = useCallback(
    (files: CourseFile[], level = 0) => {
      return files.map((file) => (
        <div key={file.id} className={`${level > 0 ? 'ml-6' : ''}`}>
          <motion.div
            className={`flex items-center py-2 px-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors ${
              file.type === 'folder'
                ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800'
            } ${state.selectedFile?.id === file.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''}`}
            onClick={() => {
              if (file.type === 'folder') {
                toggleFolder(file.id);
              } else {
                selectFile(file);
              }
            }}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {file.type === 'folder' && (
              <motion.div
                animate={{
                  rotate: state.expandedFolders.has(file.id) ? 90 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="mr-2"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            )}
            {file.type !== 'folder' && <div className="w-6" />}

            {getFileIcon(
              file.type,
              file.isCompleted,
              file.isLocked,
              file.isNew,
              file.isModified
            )}

            <span
              className={`mr-3 text-sm flex-1 ${file.isLocked ? 'text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {file.name}
            </span>

            {file.duration && (
              <span className="mr-2 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {file.duration}
              </span>
            )}

            {file.size && (
              <span className="mr-2 text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {file.size}
              </span>
            )}

            <div className="mr-auto flex space-x-2 space-x-reverse">
              {file.type !== 'folder' && !file.isLocked && (
                <>
                  <motion.button
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    title="معاينة"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Eye className="w-3 h-3" />
                  </motion.button>
                  {showDownloadButtons && (
                    <motion.button
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="تحميل"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Download className="w-3 h-3" />
                    </motion.button>
                  )}
                  {file.canEdit && (
                    <motion.button
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                      title="رفع ملف جديد"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Upload className="w-3 h-3" />
                    </motion.button>
                  )}
                </>
              )}
            </div>
          </motion.div>

          {file.type === 'folder' && file.children && (
            <AnimatePresence>
              {state.expandedFolders.has(file.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {renderFileTree(file.children, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ));
    },
    [
      state.expandedFolders,
      state.selectedFile,
      toggleFolder,
      selectFile,
      getFileIcon,
      showDownloadButtons,
    ]
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
          {mode === 'files' ? 'مكتبة ملفات الكورسات' : 'إدارة الدورات والملفات'}
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
          {mode === 'files'
            ? 'استكشف جميع الملفات والمواد التعليمية المتاحة لكل كورس بطريقة منظمة وسهلة.'
            : 'تتبع تقدمك في الدورات، استكشف الملفات التدريبية، وإدارة محتوى التعلم بكفاءة.'}
        </p>
      </motion.div>

      {/* Search and Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8"
      >
        {/* Keyboard Shortcuts Info */}
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs font-mono">Ctrl+F</kbd>
              <span>البحث السريع</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-blue-100 dark:bg-blue-800 rounded text-xs font-mono">Ctrl+R</kbd>
              <span>تحديث البيانات</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="ابحث عن ملف... (Ctrl+F للتركيز السريع)"
              value={state.searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pr-12 pl-6 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Filter */}
          {showCourseFilter && (
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={state.filterType}
                onChange={(e) =>
                  handleFilterChange(e.target.value as CourseFileType | 'all')
                }
                className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="all">جميع الملفات</option>
                <option value="video">فيديوهات</option>
                <option value="document">مستندات</option>
                <option value="pdf">PDF</option>
                <option value="word">Word</option>
                <option value="excel">Excel</option>
                <option value="presentation">عروض تقديمية</option>
                <option value="image">صور</option>
                <option value="audio">صوتيات</option>
              </select>
            </div>
          )}

          {/* Refresh */}
          <motion.button
            onClick={handleRefresh}
            disabled={state.loading}
            className="flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <RefreshCw
              className={`w-4 h-4 ${state.loading ? 'animate-spin' : ''}`}
            />
            تحديث
          </motion.button>
        </div>
      </motion.div>

      {/* Courses List */}
      <div className="space-y-4">
        {state.loading ? (
          // Loading skeletons
          Array.from({ length: 3 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden animate-pulse"
            >
              <div className="p-6 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
              </div>
            </motion.div>
          ))
        ) : mode === 'courses' ? (
          courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Course Header */}
              <div
                className="p-6 bg-gradient-to-r from-primary to-primary-dark text-white cursor-pointer hover:bg-primary-dark transition-colors"
                onClick={() => toggleCourse(course.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <motion.div
                      animate={{
                        rotate: state.expandedCourses.has(course.id) ? 180 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                      <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                        {course.description}
                      </p>
                      <p className="text-primary-100 text-sm">
                        {course.instructor.name} • {course.category} •{' '}
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="text-left">
                    <div
                      className="text-sm text-primary-100"
                      title="الملفات المكتملة من إجمالي الملفات"
                    >
                      {course.completedFiles} من {course.totalFiles} ملف
                    </div>
                    <div className="w-24 bg-white bg-opacity-20 rounded-full h-2 mt-1">
                      <div
                        className="bg-white h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${((course.completedFiles || 0) / (course.totalFiles || 1)) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <AnimatePresence>
                {state.expandedCourses.has(course.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                      {course.files && renderFileTree(course.files)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              لا توجد دورات متاحة
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              لم يتم العثور على أي دورات في النظام
            </p>
          </motion.div>
        )}
      </div>

      {/* Progress and Certificates Cards */}
      {mode === 'courses' && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* Overall Progress Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                التقدم العام
              </span>
            </div>
            <div className="text-3xl font-bold text-primary mb-2">
              {Math.round(
                (courses.reduce(
                  (sum, course) => sum + (course.completedFiles || 0),
                  0
                ) /
                  courses.reduce(
                    (sum, course) => sum + (course.totalFiles || 1),
                    0
                  )) *
                  100
              )}
              %
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(courses.reduce((sum, course) => sum + (course.completedFiles || 0), 0) / courses.reduce((sum, course) => sum + (course.totalFiles || 1), 0)) * 100}%`,
                }}
              ></div>
            </div>
          </motion.div>

          {/* Certificates Earned Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                الشهادات
              </span>
            </div>
            <div className="text-3xl font-bold text-yellow-500 mb-2">
              {courses.filter((course) => course.certificate?.earned).length}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              شهادة مكتملة
            </div>
          </motion.div>

          {/* Hours Completed Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Clock className="w-8 h-8 text-green-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                الساعات
              </span>
            </div>
            <div className="text-3xl font-bold text-green-500 mb-2">24</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              ساعة مكتملة
            </div>
          </motion.div>

          {/* Recent Achievements Card */}
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-purple-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                الإنجازات
              </span>
            </div>
            <div className="text-3xl font-bold text-purple-500 mb-2">3</div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              إنجاز جديد
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Summary Stats */}
      {mode === 'courses' && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <h3 className="text-xl font-bold text-primary mb-4">ملخص التقدم</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">
                {courses.length}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                إجمالي الدورات
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">
                {courses.reduce(
                  (sum, course) => sum + (course.completedFiles || 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                ملفات مكتملة
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">
                {courses.reduce(
                  (sum, course) => sum + (course.totalFiles || 0),
                  0
                )}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                إجمالي الملفات
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

CourseTreeView.displayName = 'CourseTreeView';

export default CourseTreeView;
