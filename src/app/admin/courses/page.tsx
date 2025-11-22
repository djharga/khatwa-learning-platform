'use client';

/**
 * صفحة إدارة الدورات - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة جميع الدورات في المنصة
 */

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Upload,
  Download,
  FileText,
  Video,
  Image,
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  Pause,
  Lock,
  Unlock,
  Copy,
  Move,
  Settings,
  BookOpen,
  FolderOpen,
  FileVideo,
  FileSpreadsheet,
  MoreVertical,
  Save,
  X,
} from 'lucide-react';
import NextImage from 'next/image';
import { useAdminStore, type AdminCourse } from '@/lib/store/admin-store';

interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  files: CourseFile[];
  videos: VideoContent[];
  isLocked: boolean;
}

interface CourseFile {
  id: string;
  name: string;
  type: 'word' | 'excel' | 'pdf' | 'powerpoint' | 'other';
  size: number;
  uploadedAt: string;
  version: number;
  explanationVideo?: string;
  downloads: number;
  lastModified: string;
}

interface VideoContent {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: number; // بالدقائق
  uploadedAt: string;
  views: number;
}

const AdminCoursesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [showEditCourseModal, setShowEditCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<AdminCourse | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [loading, setLoading] = useState(false);

  // استخدام الـ store مباشرة
  const { courses, stats, addCourse, updateCourse, deleteCourse, initializeData } = useAdminStore();

  // تهيئة البيانات عند تحميل الصفحة
  useEffect(() => {
    initializeData();
  }, [initializeData]);


  // تحديث الفلاتر عند تغيير activeTab
  useEffect(() => {
    if (activeTab === 'all') {
      setStatusFilter('all');
      setTypeFilter('all');
    } else if (activeTab === 'active') {
      setStatusFilter('active');
      setTypeFilter('all');
    } else if (activeTab === 'review') {
      setStatusFilter('review');
      setTypeFilter('all');
    } else if (activeTab === 'short') {
      setStatusFilter('all');
      setTypeFilter('short');
    } else if (activeTab === 'long') {
      setStatusFilter('all');
      setTypeFilter('long');
    }
  }, [activeTab]);

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

      // استخدام activeTab للفلترة
      let matchesTab = true;
      if (activeTab === 'all') {
        matchesTab = true;
      } else if (activeTab === 'active') {
        matchesTab = course.status === 'active';
      } else if (activeTab === 'review') {
        matchesTab = course.status === 'review';
      } else if (activeTab === 'short') {
        matchesTab = course.type === 'short';
      } else if (activeTab === 'long') {
        matchesTab = course.type === 'long';
      }

      const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
      const matchesType = typeFilter === 'all' || course.type === typeFilter;

      return matchesSearch && matchesTab && matchesStatus && matchesType;
    });
  }, [courses, searchTerm, statusFilter, typeFilter, activeTab]);

  // استخدام الإحصائيات من الـ store
  const courseStats = useMemo(() => stats.courses, [stats]);

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'inactive': return 'غير نشطة';
      case 'review': return 'قيد المراجعة';
      case 'suspended': return 'معلقة';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'review': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    return type === 'short' ? 'قصيرة' : 'طويلة المدى';
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'word': return <FileText className="w-4 h-4 text-blue-500" />;
      case 'excel': return <FileSpreadsheet className="w-4 h-4 text-green-500" />;
      case 'pdf': return <FileText className="w-4 h-4 text-red-500" />;
      case 'powerpoint': return <FileText className="w-4 h-4 text-orange-500" />;
      default: return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  // قفل/فتح دورة - استخدام الـ store مباشرة
  const handleLockCourse = async (courseId: string, lock: boolean) => {
    try {
      updateCourse(courseId, { isLocked: lock });
      alert(lock ? 'تم قفل الدورة بنجاح' : 'تم فتح الدورة بنجاح');
    } catch (error) {
      console.error('Error updating course lock:', error);
      alert('حدث خطأ أثناء تحديث حالة الدورة');
    }
  };

  // حذف دورة - استخدام الـ store مباشرة
  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('هل أنت متأكد من حذف هذه الدورة؟ سيتم حذف جميع الملفات والمحتوى المرتبط بها.')) {
      return;
    }

    try {
      deleteCourse(courseId);
      if (selectedCourse?.id === courseId) {
        setSelectedCourse(null);
        setShowCourseDetails(false);
      }
      alert('تم حذف الدورة بنجاح');
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('حدث خطأ أثناء حذف الدورة');
    }
  };

  // إضافة دورة جديدة - استخدام الـ store مباشرة
  const handleAddCourse = async (courseData: Partial<AdminCourse> & { imageFile?: File }) => {
    try {
      // التحقق من البيانات المطلوبة
      if (!courseData.title || !courseData.description || !courseData.instructor || !courseData.type) {
        alert('العنوان والوصف والمعلم ونوع الدورة مطلوبون');
        return;
      }

      const newCourse: AdminCourse = {
        id: Date.now().toString(),
        title: courseData.title,
        description: courseData.description,
        instructor: courseData.instructor,
        type: courseData.type as 'short' | 'long',
        image: courseData.image || '/courses/default.jpg',
        status: 'review',
        enrolledStudents: 0,
        completedStudents: 0,
        startDate: courseData.startDate || new Date().toISOString().split('T')[0],
        endDate: courseData.endDate,
        createdAt: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0],
        storageUsed: 0,
        totalFiles: 0,
        isLocked: false,
        tags: courseData.tags || [],
        modules: []
      };

      addCourse(newCourse);
      setShowAddCourseModal(false);
      alert('تم إضافة الدورة بنجاح');
    } catch (error) {
      console.error('Error adding course:', error);
      alert('حدث خطأ أثناء إضافة الدورة');
    }
  };

  // تعديل دورة - استخدام الـ store مباشرة
  const handleEditCourse = async (courseId: string, courseData: Partial<AdminCourse> & { imageFile?: File }) => {
    try {
      updateCourse(courseId, {
        title: courseData.title,
        description: courseData.description,
        instructor: courseData.instructor,
        type: courseData.type as 'short' | 'long' | undefined,
        image: courseData.image,
        startDate: courseData.startDate,
        endDate: courseData.endDate,
        tags: courseData.tags
      });
      if (selectedCourse?.id === courseId) {
        setSelectedCourse({ ...selectedCourse, ...courseData } as AdminCourse);
      }
      setShowEditCourseModal(false);
      alert('تم تحديث الدورة بنجاح');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('حدث خطأ أثناء تحديث الدورة');
    }
  };

  const handleDuplicateCourse = async (course: AdminCourse) => {
    const courseData: Partial<AdminCourse> = {
      title: `${course.title} (نسخة)`,
      description: course.description,
      instructor: course.instructor,
      type: course.type,
      image: course.image,
      startDate: course.startDate,
      endDate: course.endDate,
      tags: course.tags
    };
    await handleAddCourse(courseData);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 px-6 py-3 rounded-full mb-6 shadow-lg border border-purple-200/50 dark:border-purple-700/50"
          >
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            <span className="text-purple-700 dark:text-purple-300 font-bold">إدارة الدورات والمحتوى</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900 dark:from-white dark:via-purple-100 dark:to-indigo-100 bg-clip-text text-transparent mb-4"
          >
            نظام إدارة الدورات الشامل
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            إدارة شاملة للدورات والمحتوى والملفات مع جميع أدوات التحكم
          </motion.p>
        </motion.div>

        {/* الإحصائيات */}
        <div className="space-y-6 mb-8">
          {/* البطاقات القصيرة - صف واحد */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-gradient-to-br from-white to-primary-50/50 dark:from-neutral-800 dark:to-primary-900/10 rounded-2xl shadow-elevation-2 hover:shadow-elevation-4 p-5 border border-primary-100/50 dark:border-primary-800/30 transition-all duration-200 ease-out"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">إجمالي الدورات</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-elevation-2">
                  <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{courseStats.total}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-green-50/50 dark:from-neutral-800 dark:to-green-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-green-100/50 dark:border-green-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">دورات نشطة</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                  <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-green-600 dark:text-green-400">{courseStats.active}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-yellow-50/50 dark:from-neutral-800 dark:to-yellow-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-yellow-100/50 dark:border-yellow-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">قيد المراجعة</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-yellow-600 dark:text-yellow-400">{courseStats.review}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-red-50/50 dark:from-neutral-800 dark:to-red-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-red-100/50 dark:border-red-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">معلقة</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-red-600 dark:text-red-400">{courseStats.suspended}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-purple-50/50 dark:from-neutral-800 dark:to-purple-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-purple-100/50 dark:border-purple-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">دورات قصيرة</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">{courseStats.shortCourses}</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-neutral-800 dark:to-indigo-900/10 rounded-2xl shadow-lg hover:shadow-xl p-5 border border-indigo-100/50 dark:border-indigo-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium">دورات طويلة</p>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">{courseStats.longCourses}</p>
            </motion.div>
          </motion.div>

          {/* البطاقات الطويلة - أفقية */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-gradient-to-br from-white to-teal-50/50 dark:from-neutral-800 dark:to-teal-900/10 rounded-2xl shadow-elevation-2 hover:shadow-elevation-4 p-6 border border-teal-100/50 dark:border-teal-800/30 transition-all duration-200 ease-out"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">إجمالي الطلاب</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-teal-600 dark:text-teal-400">{courseStats.totalStudents}</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Users className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-gradient-to-br from-white to-orange-50/50 dark:from-neutral-800 dark:to-orange-900/10 rounded-2xl shadow-lg hover:shadow-xl p-6 border border-orange-100/50 dark:border-orange-800/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">إجمالي التخزين</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-orange-600 dark:text-orange-400">{(courseStats.totalStorage / 1024).toFixed(1)} GB</p>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Upload className="w-8 h-8 text-white" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 bg-gray-100/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-sm border border-gray-200/60 dark:border-neutral-700/60 overflow-x-auto scrollbar-hide">
            {[
              { id: 'all', label: 'جميع الدورات', count: courses.length },
              { id: 'active', label: 'الدورات النشطة', count: courseStats.active },
              { id: 'review', label: 'قيد المراجعة', count: courseStats.review },
              { id: 'short', label: 'دورات قصيرة', count: courseStats.shortCourses },
              { id: 'long', label: 'دورات طويلة', count: courseStats.longCourses }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative flex items-center gap-2.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl
                  font-medium text-sm whitespace-nowrap
                  transition-all duration-200 ease-out
                  ${activeTab === tab.id
                    ? 'bg-white dark:bg-neutral-700 text-gray-900 dark:text-white shadow-sm scale-[1.02]'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-neutral-700/50'
                  }
                `}
                whileHover={{ scale: activeTab === tab.id ? 1.02 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background with gradient */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeCourseTab"
                    className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/30 to-indigo-50/50 dark:from-purple-950/30 dark:via-blue-950/20 dark:to-indigo-950/30 rounded-xl"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    style={{ borderRadius: '0.75rem' }}
                  />
                )}

                {/* Label */}
                <span className="relative z-10 transition-colors duration-200">{tab.label}</span>

                {/* Count badge */}
                <span className={`
                  relative z-10 px-2 py-0.5 rounded-full text-xs font-bold transition-all duration-200
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-700 dark:text-purple-300'
                    : 'bg-gray-200 dark:bg-neutral-700 text-gray-600 dark:text-gray-400'
                  }
                `}>
                  {tab.count}
                </span>

                {/* Active indicator line */}
                {activeTab === tab.id && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '60%' }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
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
                placeholder="البحث في الدورات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 min-h-[44px] bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* الفلاتر */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 min-h-[44px] bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشطة</option>
                <option value="inactive">غير نشطة</option>
                <option value="review">قيد المراجعة</option>
                <option value="suspended">معلقة</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-3 min-h-[44px] bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400"
              >
                <option value="all">جميع الأنواع</option>
                <option value="short">قصيرة</option>
                <option value="long">طويلة المدى</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white px-6 py-3 min-h-[44px] rounded-xl font-semibold transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowAddCourseModal(true)}
              >
                <Plus className="w-5 h-5" />
                دورة جديدة
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-3 min-h-[44px] rounded-xl font-semibold transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5" />
                تصدير البيانات
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* قائمة الدورات - عرض بطاقات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-elevation-4 transition-all duration-200 ease-out"
            >
              {/* صورة الدورة */}
              <div className="relative h-48 bg-gradient-to-br from-purple-500 to-blue-600">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                      course.status === 'review' ? <Clock className="w-3 h-3" /> :
                        course.status === 'suspended' ? <XCircle className="w-3 h-3" /> :
                          <XCircle className="w-3 h-3" />}
                    {getStatusLabel(course.status)}
                  </span>
                </div>
                <div className="absolute bottom-4 right-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.type === 'short' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                    }`}>
                    {getTypeLabel(course.type)}
                  </span>
                </div>
                {course.isLocked && (
                  <div className="absolute top-4 left-4">
                    <Lock className="w-6 h-6 text-red-500 bg-white/90 rounded-full p-1" />
                  </div>
                )}
              </div>

              {/* محتوى البطاقة */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* معلومات الدورة */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المدرس:</span>
                    <span className="font-medium text-gray-900">{course.instructor}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المشاركون:</span>
                    <span className="font-medium text-gray-900">
                      {course.completedStudents}/{course.enrolledStudents}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">التخزين:</span>
                    <span className="font-medium text-gray-900">
                      {(course.storageUsed / 1024).toFixed(1)} GB
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">المدة:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(course.startDate).toLocaleDateString('ar-SA')} - {course.endDate ? new Date(course.endDate).toLocaleDateString('ar-SA') : 'مستمرة'}
                    </span>
                  </div>
                </div>

                {/* العلامات */}
                {course.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                    {course.tags.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        +{course.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* أزرار التحكم */}
                <div className="grid grid-cols-2 gap-2">
                  <motion.button
                    className="bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 min-h-[44px] rounded-lg font-semibold text-sm transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowCourseDetails(true);
                    }}
                  >
                    <Eye className="w-4 h-4" />
                    عرض
                  </motion.button>

                  <motion.button
                    className="bg-success-600 hover:bg-success-700 text-white py-2 px-4 min-h-[44px] rounded-lg font-semibold text-sm transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowFileManager(true)}
                  >
                    <FolderOpen className="w-4 h-4" />
                    ملفات
                  </motion.button>

                  <motion.button
                    className="bg-secondary-innovate-600 hover:bg-secondary-innovate-700 text-white py-2 px-4 min-h-[44px] rounded-lg font-semibold text-sm transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-innovate-500 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDuplicateCourse(course)}
                  >
                    <Copy className="w-4 h-4" />
                    نسخ
                  </motion.button>

                  <motion.button
                    className="bg-warning-600 hover:bg-warning-700 text-white py-2 px-4 min-h-[44px] rounded-lg font-semibold text-sm transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 flex items-center justify-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning-500 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowEditCourseModal(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                    تعديل
                  </motion.button>
                </div>

                {/* أزرار إضافية */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <motion.button
                    className="text-danger-600 dark:text-danger-400 hover:text-danger-700 dark:hover:text-danger-500 text-sm font-medium transition-all duration-200 ease-out flex items-center gap-1 min-h-[44px] px-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLockCourse(course.id, !course.isLocked)}
                  >
                    {course.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    {course.isLocked ? 'فتح' : 'قفل'}
                  </motion.button>

                  <motion.button
                    className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors flex items-center gap-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                    حذف
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* رسالة عدم وجود نتائج */}
        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد دورات</h3>
            <p className="text-gray-600 max-w-md mx-auto">لم نتمكن من العثور على أي دورات تطابق معايير البحث الخاصة بك. جرب تغيير الفلاتر أو البحث عن مصطلح مختلف.</p>
            <motion.button
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchTerm('')}
            >
              مسح البحث
            </motion.button>
          </motion.div>
        )}

        {/* نافذة تفاصيل الدورة */}
        <AnimatePresence>
          {showCourseDetails && selectedCourse && (
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
                className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-gray-900">تفاصيل الدورة</h3>
                    <button
                      onClick={() => setShowCourseDetails(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <div className="relative w-full h-48">
                        <NextImage
                          src={selectedCourse.image}
                          alt={selectedCourse.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h4>
                      <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
                      <div className="space-y-2">
                        <p><strong>المدرس:</strong> {selectedCourse.instructor}</p>
                        <p><strong>النوع:</strong> {getTypeLabel(selectedCourse.type)}</p>
                        <p><strong>التاريخ:</strong> {selectedCourse.startDate} - {selectedCourse.endDate}</p>
                        <p><strong>الحالة:</strong> {getStatusLabel(selectedCourse.status)}</p>
                      </div>
                    </div>
                  </div>

                  {/* المحاور */}
                  <div className="mb-6">
                    <h5 className="text-lg font-semibold text-gray-900 mb-4">المحاور ({selectedCourse.modules.length})</h5>
                    <div className="space-y-4">
                      {selectedCourse.modules.map((module, index) => (
                        <div key={module.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h6 className="font-semibold">{module.title}</h6>
                            {module.isLocked && <Lock className="w-4 h-4 text-red-500" />}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{module.description}</p>

                          {/* الملفات */}
                          <div className="space-y-2">
                            <h6 className="text-sm font-medium text-gray-700">الملفات ({module.files?.length || 0})</h6>
                            {module.files?.map((file: any) => (
                              <div key={file.id} className="flex items-center gap-3 bg-white p-2 rounded border">
                                {getFileIcon(file.type)}
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{file.name}</p>
                                  <p className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB • التحميلات: {file.downloads}
                                  </p>
                                </div>
                                <div className="flex gap-1">
                                  {file.explanationVideo && <Video className="w-4 h-4 text-blue-500" />}
                                  <Download className="w-4 h-4 text-green-500" />
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* الفيديوهات */}
                          {module.videos && module.videos.length > 0 && (
                            <div className="space-y-2 mt-3">
                              <h6 className="text-sm font-medium text-gray-700">الفيديوهات ({module.videos.length})</h6>
                              {module.videos?.map((video: any) => (
                                <div key={video.id} className="flex items-center gap-3 bg-white p-2 rounded border">
                                  <Play className="w-4 h-4 text-red-500" />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium">{video.title}</p>
                                    <p className="text-xs text-gray-500">
                                      {video.duration} دقيقة • المشاهدات: {video.views}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setShowEditCourseModal(true);
                      }}
                    >
                      تعديل الدورة
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowFileManager(true)}
                    >
                      إدارة الملفات
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCourseDetails(false)}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* نافذة إضافة/تعديل دورة */}
          <AnimatePresence>
            {showAddCourseModal && (
              <AddCourseModal
                onClose={() => setShowAddCourseModal(false)}
                onSave={handleAddCourse}
              />
            )}
            {showEditCourseModal && selectedCourse && (
              <EditCourseModal
                course={selectedCourse}
                onClose={() => {
                  setShowEditCourseModal(false);
                  setSelectedCourse(null);
                }}
                onSave={handleEditCourse}
              />
            )}
          </AnimatePresence>
        </AnimatePresence>
      </div>
    </div>
  );
};

// نموذج إضافة دورة جديدة
function AddCourseModal({
  onClose,
  onSave
}: {
  onClose: () => void;
  onSave: (data: Partial<AdminCourse> & { imageFile?: File }) => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    type: 'short' as 'short' | 'long',
    startDate: '',
    endDate: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان الدورة مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف الدورة مطلوب';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'الوصف يجب أن يكون 50 حرفاً على الأقل';
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'اسم المعلم مطلوب';
    }

    if (formData.type === 'long' && !formData.endDate) {
      newErrors.endDate = 'تاريخ الانتهاء مطلوب للدورات الطويلة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors({ ...errors, image: 'حجم الصورة يجب أن يكون أقل من 5MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'يجب أن يكون الملف صورة' });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.image) setErrors({ ...errors, image: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSave({
        ...formData,
        imageFile: imageFile || undefined,
        image: imagePreview || formData.image,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">إضافة دورة جديدة</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدورة *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="مثال: دورة المراجعة الداخلية المستوى الأول"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الدورة *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="وصف شامل للدورة..."
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المعلم *</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => {
                  setFormData({ ...formData, instructor: e.target.value });
                  if (errors.instructor) setErrors({ ...errors, instructor: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.instructor ? 'border-red-500' : 'border-gray-300'
                  }`}
                placeholder="مثال: د. أحمد محمد"
              />
              {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدورة *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'short' | 'long' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="short">قصيرة المدى</option>
                <option value="long">طويلة المدى</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء {formData.type === 'long' && '*'}</label>
              <input
                type="date"
                required={formData.type === 'long'}
                value={formData.endDate}
                onChange={(e) => {
                  setFormData({ ...formData, endDate: e.target.value });
                  if (errors.endDate) setErrors({ ...errors, endDate: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.endDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                min={formData.startDate}
              />
              {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الدورة</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="course-image-upload"
              />
              <label
                htmlFor="course-image-upload"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center"
              >
                {imageFile ? 'تغيير الصورة' : 'اختر صورة'}
              </label>
              {imagePreview && (
                <NextImage
                  src={imagePreview}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري الإضافة...' : 'إضافة الدورة'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// نموذج تعديل دورة
function EditCourseModal({
  course,
  onClose,
  onSave
}: {
  course: AdminCourse;
  onClose: () => void;
  onSave: (courseId: string, data: Partial<AdminCourse> & { imageFile?: File }) => void;
}) {
  const [formData, setFormData] = useState({
    title: course.title,
    description: course.description,
    instructor: course.instructor,
    type: course.type,
    startDate: course.startDate,
    endDate: course.endDate,
    image: course.image,
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(course.image);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'عنوان الدورة مطلوب';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'وصف الدورة مطلوب';
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'الوصف يجب أن يكون 50 حرفاً على الأقل';
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'اسم المعلم مطلوب';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'حجم الصورة يجب أن يكون أقل من 5MB' });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'يجب أن يكون الملف صورة' });
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      if (errors.image) setErrors({ ...errors, image: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await onSave(course.id, {
        ...formData,
        imageFile: imageFile || undefined,
        image: imagePreview,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-gray-900">تعديل دورة</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <XCircle className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">عنوان الدورة *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => {
                setFormData({ ...formData, title: e.target.value });
                if (errors.title) setErrors({ ...errors, title: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">وصف الدورة *</label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => {
                setFormData({ ...formData, description: e.target.value });
                if (errors.description) setErrors({ ...errors, description: '' });
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.description ? 'border-red-500' : 'border-gray-300'
                }`}
            />
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">اسم المعلم *</label>
              <input
                type="text"
                required
                value={formData.instructor}
                onChange={(e) => {
                  setFormData({ ...formData, instructor: e.target.value });
                  if (errors.instructor) setErrors({ ...errors, instructor: '' });
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.instructor ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.instructor && <p className="text-red-500 text-sm mt-1">{errors.instructor}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">نوع الدورة *</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'short' | 'long' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="short">قصيرة المدى</option>
                <option value="long">طويلة المدى</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ البداية</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانتهاء</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min={formData.startDate}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">صورة الدورة</label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="edit-course-image-upload"
              />
              <label
                htmlFor="edit-course-image-upload"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 text-center"
              >
                {imageFile ? 'تغيير الصورة' : 'اختر صورة جديدة'}
              </label>
              {imagePreview && (
                <NextImage
                  src={imagePreview}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AdminCoursesPage;
