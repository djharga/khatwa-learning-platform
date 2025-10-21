'use client';
import { useState, useEffect, useCallback, useMemo } from 'react';
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
  Presentation,
  Video,
  Clock,
  Sparkles,
  BookOpen,
  PlayCircle,
  DownloadIcon,
  FileAudio,
  FileText as FilePdf,
  FileSpreadsheet as FileExcel,
  FileType as FileWord,
  AlertCircle,
  RefreshCw,
  Share2,
  Bookmark,
  BookmarkCheck,
} from 'lucide-react';
import {
  CourseDetailProps,
  Course,
  CourseFile,
  FileType as CourseFileType,
} from '@/types/course';
import {
  getFileIcon,
  getFileTypeColor,
  formatFileSize,
  formatDuration,
  calculateProgress,
} from '@/utils/courseUtils';
import { Button } from './ui';
import toast from 'react-hot-toast';

interface CourseDetailState {
  loading: boolean;
  error: string | null;
  isBookmarked: boolean;
  isEnrolled: boolean;
  activeTab: 'video' | 'audio' | 'pdf' | 'excel' | 'word';
  expandedFolders: Set<string>;
  selectedFile: CourseFile | null;
}

const CourseDetailComponent = ({
  courseId,
  course: initialCourse,
  loading: initialLoading = false,
  error: initialError,
  onEnroll,
  onBookmark,
  onShare,
}: CourseDetailProps) => {
  // State management
  const [state, setState] = useState<CourseDetailState>({
    loading: initialLoading,
    error: initialError || null,
    isBookmarked: false,
    isEnrolled: false,
    activeTab: 'video',
    expandedFolders: new Set(),
    selectedFile: null,
  });

  // Memoized course data
  const course = useMemo(() => {
    if (initialCourse) return initialCourse;

    // Fallback mock data - in real app this would come from API
    return {
      id: courseId,
      title: '🚀 مقدمة في البرمجة',
      description:
        'تعلم أساسيات البرمجة من الصفر مع أمثلة عملية ومشاريع تفاعلية. ستتعلم كيفية التفكير المنطقي وكتابة الكود بطريقة احترافية، وستبني تطبيقات صغيرة تساعدك على فهم المفاهيم الأساسية.',
      instructor: {
        id: '1',
        name: 'أحمد محمد',
        title: 'مطور برمجيات',
        avatar: '/avatars/instructor1.jpg',
        rating: 4.8,
        students: 1250,
        courses: 5,
        bio: 'خبير في البرمجة مع أكثر من 10 سنوات من الخبرة',
      },
      level: 'مبتدئ',
      category: 'برمجة',
      image: '/banar-cours.webp',
      totalFiles: 15,
      completedFiles: 8,
      progress: 53,
      duration: '4 أسابيع',
      students: 1250,
      rating: 4.8,
      reviewCount: 89,
      price: 299,
      filesCount: 15,
      isOngoing: true,
      certificate: {
        earned: true,
        earnedDate: '2023-10-15',
        type: 'إتمام',
      },
      files: [
        {
          id: '1-1',
          name: 'الأسبوع الأول',
          type: 'folder',
          children: [
            {
              id: '1-1-1',
              name: 'مقدمة عن البرمجة',
              type: 'video',
              duration: '15:30',
              isCompleted: true,
            },
            {
              id: '1-1-2',
              name: 'أساسيات Python',
              type: 'document',
              size: '2.3 MB',
              isCompleted: true,
            },
            {
              id: '1-1-3',
              name: 'تمرين 1 - Hello World',
              type: 'word',
              size: '1.8 MB',
              isNew: true,
              canEdit: true,
            },
            {
              id: '1-1-4',
              name: 'شرح صوتي للمفاهيم',
              type: 'audio',
              duration: '10:15',
              isCompleted: true,
            },
          ],
        },
        {
          id: '1-2',
          name: 'الأسبوع الثاني',
          type: 'folder',
          children: [
            {
              id: '1-2-1',
              name: 'المتغيرات والأنواع',
              type: 'video',
              duration: '22:45',
              isCompleted: true,
            },
            {
              id: '1-2-2',
              name: 'العمليات الحسابية',
              type: 'video',
              duration: '18:20',
              isCompleted: true,
            },
            {
              id: '1-2-3',
              name: 'دليل المتغيرات',
              type: 'pdf',
              size: '3.5 MB',
              isCompleted: true,
            },
            {
              id: '1-2-4',
              name: 'تمرين 2 - الحاسبة البسيطة',
              type: 'excel',
              size: '2.1 MB',
              isModified: true,
              canEdit: true,
            },
          ],
        },
        {
          id: '1-3',
          name: 'الأسبوع الثالث',
          type: 'folder',
          children: [
            {
              id: '1-3-1',
              name: 'الحلقات التكرارية',
              type: 'video',
              duration: '25:10',
            },
            {
              id: '1-3-2',
              name: 'الدوال والإجراءات',
              type: 'video',
              duration: '30:15',
              isLocked: true,
            },
            {
              id: '1-3-3',
              name: 'ملخص الحلقات',
              type: 'pdf',
              size: '1.2 MB',
            },
            {
              id: '1-3-4',
              name: 'تمارين إضافية',
              type: 'word',
              size: '2.8 MB',
              canEdit: true,
            },
          ],
        },
      ],
    } as Course;
  }, [courseId, initialCourse]);

  // Load course data
  useEffect(() => {
    const loadCourseData = async () => {
      if (initialCourse) return;

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setState((prev) => ({ ...prev, loading: false }));
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: 'فشل في تحميل بيانات الدورة',
        }));
        toast.error('فشل في تحميل بيانات الدورة');
      }
    };

    loadCourseData();
  }, [courseId, initialCourse]);

  // Event handlers
  const handleBookmark = useCallback(async () => {
    try {
      await onBookmark?.(course.id);
      setState((prev) => ({ ...prev, isBookmarked: !prev.isBookmarked }));
      toast.success(
        state.isBookmarked
          ? 'تم إزالة الدورة من المفضلة'
          : 'تم إضافة الدورة إلى المفضلة'
      );
    } catch (error) {
      toast.error('فشل في تحديث المفضلة');
    }
  }, [course.id, onBookmark]);

  const handleEnroll = useCallback(async () => {
    try {
      await onEnroll?.(course.id);
      setState((prev) => ({ ...prev, isEnrolled: true }));
      toast.success('تم التسجيل في الدورة بنجاح');
    } catch (error) {
      toast.error('فشل في التسجيل في الدورة');
    }
  }, [course.id, onEnroll]);

  const handleShare = useCallback(async () => {
    try {
      await onShare?.(course.id);
      toast.success('تم نسخ رابط الدورة');
    } catch (error) {
      toast.error('فشل في مشاركة الدورة');
    }
  }, [course.id, onShare]);

  const handleRetry = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    // Retry logic would go here
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

  const setActiveTab = useCallback(
    (tab: 'video' | 'audio' | 'pdf' | 'excel' | 'word') => {
      setState((prev) => ({ ...prev, activeTab: tab }));
    },
    []
  );

  const selectFile = useCallback((file: CourseFile) => {
    setState((prev) => ({ ...prev, selectedFile: file }));
  }, []);

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
        case 'audio':
          icon = <FileAudio {...iconProps} />;
          break;
        case 'document':
        case 'pdf':
          icon = <FilePdf {...iconProps} />;
          break;
        case 'word':
          icon = <FileWord {...iconProps} />;
          break;
        case 'excel':
          icon = <FileExcel {...iconProps} />;
          break;
        case 'presentation':
          icon = <Presentation {...iconProps} />;
          break;
        case 'image':
          icon = <Image {...iconProps} />;
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

  // Memoized filtered files
  const filteredFiles = useMemo(() => {
    if (!course.files) return [];

    const filtered: CourseFile[] = [];
    const traverse = (fileList: CourseFile[]) => {
      fileList.forEach((file) => {
        if (file.type === state.activeTab) {
          filtered.push(file);
        }
        if (file.children) {
          traverse(file.children);
        }
      });
    };

    traverse(course.files);
    return filtered;
  }, [course.files, state.activeTab]);

  // Memoized file counts
  const fileCounts = useMemo(() => {
    if (!course.files) return {};

    const counts: Record<string, number> = {};
    const types = ['video', 'audio', 'pdf', 'excel', 'word'];

    types.forEach((type) => {
      const filtered: CourseFile[] = [];
      const traverse = (fileList: CourseFile[]) => {
        fileList.forEach((file) => {
          if (file.type === type) {
            filtered.push(file);
          }
          if (file.children) {
            traverse(file.children);
          }
        });
      };
      traverse(course.files || []);
      counts[type] = filtered.length;
    });

    return counts;
  }, [course.files]);

  // Memoized tabs
  const tabs = useMemo(
    () => [
      {
        id: 'video' as const,
        label: 'فيديوهات',
        icon: Video,
        count: fileCounts.video || 0,
      },
      {
        id: 'audio' as const,
        label: 'صوتيات',
        icon: FileAudio,
        count: fileCounts.audio || 0,
      },
      {
        id: 'pdf' as const,
        label: 'ملفات PDF',
        icon: FilePdf,
        count: fileCounts.pdf || 0,
      },
      {
        id: 'excel' as const,
        label: 'ملفات Excel',
        icon: FileExcel,
        count: fileCounts.excel || 0,
      },
      {
        id: 'word' as const,
        label: 'ملفات Word',
        icon: FileWord,
        count: fileCounts.word || 0,
      },
    ],
    [fileCounts]
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
                  <motion.button
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded transition-colors"
                    title="تحميل"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Download className="w-3 h-3" />
                  </motion.button>
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
                  transition={{ duration: 0.2 }}
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
    ]
  );

  // Loading state
  if (state.loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="animate-pulse">
            <div className="h-64 md:h-80 bg-gray-300 dark:bg-gray-600"></div>
            <div className="p-6 md:p-8">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-6"></div>
              <div className="flex gap-4">
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (state.error) {
    return (
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            خطأ في تحميل الدورة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{state.error}</p>
          <Button onClick={handleRetry} className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            إعادة المحاولة
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Course Header */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
      >
        {/* Course Image */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={course.image}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

          {/* File Count Badge */}
          <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="text-sm font-medium text-gray-800">
              {course.totalFiles} ملف
            </div>
          </div>

          {/* Progress Badge */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-800">
                {course.progress}% مكتمل
              </span>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {course.title}
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {course.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{course.instructor.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>{course.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>{course.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>مدة الدورة</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <motion.button
                onClick={handleEnroll}
                disabled={state.isEnrolled}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                  state.isEnrolled
                    ? 'bg-green-600 text-white cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                }`}
              >
                <PlayCircle className="w-5 h-5" />
                {state.isEnrolled ? 'مسجل في الدورة' : 'ابدأ الدورة'}
              </motion.button>

              <div className="flex gap-2">
                <motion.button
                  onClick={handleBookmark}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-1 px-4 py-3 rounded-lg transition-all duration-200 font-medium flex items-center justify-center gap-2 ${
                    state.isBookmarked
                      ? 'bg-yellow-100 text-yellow-800 border-2 border-yellow-300'
                      : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {state.isBookmarked ? (
                    <BookmarkCheck className="w-5 h-5" />
                  ) : (
                    <Bookmark className="w-5 h-5" />
                  )}
                  {state.isBookmarked ? 'مُحفظ' : 'حفظ'}
                </motion.button>

                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium flex items-center justify-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <Share2 className="w-5 h-5" />
                  مشاركة
                </motion.button>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium flex items-center justify-center gap-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <DownloadIcon className="w-5 h-5" />
                تحميل جميع الملفات
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* File Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <h2 className="text-2xl font-bold text-primary mb-6">ملفات الدورة</h2>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                state.activeTab === tab.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  state.activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                }`}
              >
                {tab.count}
              </span>
            </motion.button>
          ))}
        </div>

        {/* File Tree */}
        <div className="space-y-2">
          {filteredFiles.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={state.activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                {filteredFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div
                      className="flex items-center py-3 px-4 bg-gray-50 dark:bg-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      onClick={() => toggleFolder(file.id)}
                    >
                      <motion.div
                        animate={{
                          rotate: state.expandedFolders.has(file.id) ? 90 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                        className="mr-2"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </motion.div>

                      {getFileIcon(
                        file.type,
                        file.isCompleted,
                        file.isLocked,
                        file.isNew,
                        file.isModified
                      )}

                      <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        {file.name}
                      </span>

                      {file.duration && (
                        <span className="mr-2 text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          {file.duration}
                        </span>
                      )}

                      {file.size && (
                        <span className="mr-2 text-xs text-gray-500 bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                          {file.size}
                        </span>
                      )}

                      <div className="mr-auto flex space-x-2 space-x-reverse">
                        {!file.isLocked && (
                          <>
                            <motion.button
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                              title="معاينة"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Eye className="w-3 h-3" />
                            </motion.button>
                            <motion.button
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
                              title="تحميل"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Download className="w-3 h-3" />
                            </motion.button>
                            {file.canEdit && (
                              <motion.button
                                className="p-1 hover:bg-gray-200 dark:hover:bg-gray-500 rounded transition-colors"
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
                    </div>

                    <AnimatePresence>
                      {state.expandedFolders.has(file.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden border-t border-gray-200 dark:border-gray-700"
                        >
                          <div className="p-4 bg-gray-50 dark:bg-gray-800">
                            {file.type === 'video' && (
                              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                                <Play className="w-16 h-16 text-white opacity-75 drop-shadow-lg" />
                              </div>
                            )}
                            {file.type === 'audio' && (
                              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                <FileAudio className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                              </div>
                            )}
                            {(file.type === 'pdf' ||
                              file.type === 'word' ||
                              file.type === 'excel') && (
                              <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                {file.type === 'pdf' && (
                                  <FilePdf className="w-8 h-8 text-red-600" />
                                )}
                                {file.type === 'word' && (
                                  <FileWord className="w-8 h-8 text-blue-600" />
                                )}
                                {file.type === 'excel' && (
                                  <FileExcel className="w-8 h-8 text-green-600" />
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8 text-gray-500 dark:text-gray-400"
            >
              <File className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>لا توجد ملفات من هذا النوع في الدورة</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

CourseDetailComponent.displayName = 'CourseDetailComponent';

export default CourseDetailComponent;
