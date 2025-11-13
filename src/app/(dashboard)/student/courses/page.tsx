'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  Grid,
  List,
  Play,
  Clock,
  CheckCircle2,
  TrendingUp,
  Award,
  Calendar,
  ChevronLeft,
  Star,
  BarChart3,
  Target,
  Zap,
  AlertCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { Skeleton, StatCardSkeleton, CourseCardSkeleton } from '@/components/ui/Skeleton';

// واجهة بيانات الكورس المسجل
interface EnrolledCourse {
  id: string;
  title: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
  };
  image: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  totalHours: number;
  completedHours: number;
  status: 'not_started' | 'in_progress' | 'completed';
  enrolledDate: string;
  lastActivity: string;
  rating: number;
  nextLesson?: {
    id: string;
    title: string;
  };
  category: string;
  certificate?: {
    available: boolean;
    earned: boolean;
  };
}

// بيانات محاكاة للكورسات المسجلة
const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: '1',
    title: 'أساسيات المراجعة الداخلية وفق المعايير الدولية',
    description: 'دورة شاملة تغطي مبادئ المراجعة الداخلية وأفضل الممارسات وفقاً للمعايير الدولية',
    instructor: {
      name: 'د. أحمد محمد',
      avatar: '/api/placeholder/64/64',
    },
    image: '/banar-cours.png',
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    totalHours: 40,
    completedHours: 30,
    status: 'in_progress',
    enrolledDate: '2024-01-15',
    lastActivity: 'منذ يومين',
    rating: 4.8,
    nextLesson: {
      id: '4',
      title: 'اختبار قصير - الوحدة الأولى',
    },
    category: 'المراجعة الداخلية',
    certificate: {
      available: true,
      earned: false,
    },
  },
  {
    id: '2',
    title: 'تطبيق معايير IFRS في القوائم المالية',
    description: 'شرح عملي لتطبيق المعايير الدولية لإعداد التقارير المالية',
    instructor: {
      name: 'د. فاطمة علي',
      avatar: '/api/placeholder/64/64',
    },
    image: '/banar-cours.png',
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    totalHours: 50,
    completedHours: 22.5,
    status: 'in_progress',
    enrolledDate: '2024-02-01',
    lastActivity: 'منذ أسبوع',
    rating: 4.9,
    nextLesson: {
      id: '3',
      title: 'الإطار المفاهيمي',
    },
    category: 'المعايير المحاسبية',
    certificate: {
      available: true,
      earned: false,
    },
  },
  {
    id: '3',
    title: 'إدارة المخاطر المالية',
    description: 'تعلم كيفية تحديد وإدارة المخاطر المالية في المؤسسات',
    instructor: {
      name: 'د. خالد سعيد',
      avatar: '/api/placeholder/64/64',
    },
    image: '/banar-cours.png',
    progress: 100,
    totalLessons: 20,
    completedLessons: 20,
    totalHours: 35,
    completedHours: 35,
    status: 'completed',
    enrolledDate: '2023-12-10',
    lastActivity: 'منذ شهر',
    rating: 4.7,
    category: 'إدارة المخاطر',
    certificate: {
      available: true,
      earned: true,
    },
  },
  {
    id: '4',
    title: 'المحاسبة الإدارية المتقدمة',
    description: 'دورة متقدمة في المحاسبة الإدارية واتخاذ القرارات',
    instructor: {
      name: 'د. نورا حسن',
      avatar: '/api/placeholder/64/64',
    },
    image: '/banar-cours.png',
    progress: 0,
    totalLessons: 28,
    completedLessons: 0,
    totalHours: 45,
    completedHours: 0,
    status: 'not_started',
    enrolledDate: '2024-02-20',
    lastActivity: 'لم يبدأ بعد',
    rating: 4.6,
    category: 'المحاسبة الإدارية',
    certificate: {
      available: true,
      earned: false,
    },
  },
];

export default function StudentCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'in_progress' | 'completed' | 'not_started'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'recent' | 'progress' | 'title'>('recent');

  // جلب البيانات
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // TODO: استبدال ب API حقيقي
        // const response = await fetch('/api/student/courses');
        // const data = await response.json();
        
        // محاكاة
        await new Promise(resolve => setTimeout(resolve, 800));
        setCourses(mockEnrolledCourses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // حساب الإحصائيات
  const stats = useMemo(() => {
    const total = courses.length;
    const inProgress = courses.filter(c => c.status === 'in_progress').length;
    const completed = courses.filter(c => c.status === 'completed').length;
    const notStarted = courses.filter(c => c.status === 'not_started').length;
    const totalProgress = total > 0 
      ? Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / total)
      : 0;
    const totalHours = courses.reduce((sum, c) => sum + c.completedHours, 0);
    const certificates = courses.filter(c => c.certificate?.earned).length;

    return {
      total,
      inProgress,
      completed,
      notStarted,
      totalProgress,
      totalHours,
      certificates,
    };
  }, [courses]);

  // فلترة وترتيب الكورسات
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = courses;

    // فلترة حسب البحث
    if (searchQuery) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // فلترة حسب الحالة
    if (statusFilter !== 'all') {
      filtered = filtered.filter(course => course.status === statusFilter);
    }

    // الترتيب
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'progress':
          return b.progress - a.progress;
        case 'title':
          return a.title.localeCompare(b.title, 'ar');
        case 'recent':
        default:
          return new Date(b.enrolledDate).getTime() - new Date(a.enrolledDate).getTime();
      }
    });

    return filtered;
  }, [courses, searchQuery, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-50 text-success-700 dark:bg-success-900/30 dark:text-success-400 border border-success-200 dark:border-success-800';
      case 'in_progress':
        return 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 border border-primary-200 dark:border-primary-800';
      case 'not_started':
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700';
      default:
        return 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتملة';
      case 'in_progress':
        return 'قيد التنفيذ';
      case 'not_started':
        return 'لم تبدأ';
      default:
        return 'غير معروف';
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="w-full">
          {/* Header Skeleton */}
          <div className="mb-8 space-y-3">
            <Skeleton height="2.5rem" width="200px" />
            <Skeleton height="1.25rem" width="400px" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <StatCardSkeleton key={index} />
            ))}
          </div>

          {/* Controls Skeleton */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-md border border-neutral-200 dark:border-neutral-700 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              <Skeleton height="3rem" width="100%" className="lg:flex-1" />
              <div className="flex gap-2">
                <Skeleton height="2.5rem" width="80px" />
                <Skeleton height="2.5rem" width="100px" />
                <Skeleton height="2.5rem" width="80px" />
                <Skeleton height="2.5rem" width="90px" />
              </div>
            </div>
          </div>

          {/* Courses Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            دوراتي
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            تابع تقدمك واستكمل تعلمك في جميع الدورات المسجلة
          </p>
        </motion.div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">{stats.total}</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">إجمالي الدورات</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-success-50 dark:bg-success-900/20">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-success-600 dark:text-success-400" aria-hidden="true" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">{stats.totalProgress}%</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">متوسط التقدم</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-secondary-innovate-50 dark:bg-secondary-innovate-900/20">
                <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-secondary-innovate-600 dark:text-secondary-innovate-400" aria-hidden="true" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">{stats.totalHours}</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">ساعة مكتملة</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
            whileHover={{ y: -2, scale: 1.01 }}
            className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-lg bg-warning-50 dark:bg-warning-900/20">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-warning-600 dark:text-warning-400" aria-hidden="true" />
              </div>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white">{stats.certificates}</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">شهادات مكتملة</p>
          </motion.div>
        </div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
          className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-neutral-200 dark:border-neutral-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* البحث */}
            <div className="flex-1 relative">
              <Search className="absolute start-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400 pointer-events-none" aria-hidden="true" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full ps-10 pe-4 py-3 bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out text-base text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                aria-label="البحث عن دورة"
              />
            </div>

            {/* فلاتر الحالة */}
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'all', label: 'الكل', count: stats.total },
                { value: 'in_progress', label: 'قيد التنفيذ', count: stats.inProgress },
                { value: 'completed', label: 'مكتملة', count: stats.completed },
                { value: 'not_started', label: 'لم تبدأ', count: stats.notStarted },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={(e) => {
                    e.preventDefault();
                    setStatusFilter(filter.value as 'all' | 'in_progress' | 'completed' | 'not_started');
                  }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm min-h-[44px] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                    statusFilter === filter.value
                      ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                      : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                  }`}
                  aria-label={`فلتر: ${filter.label}`}
                  aria-pressed={statusFilter === filter.value}
                  type="button"
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* أزرار العرض */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 min-h-[44px] bg-neutral-50 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded-lg text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 ease-out"
                aria-label="ترتيب الدورات"
              >
                <option value="recent">الأحدث</option>
                <option value="progress">حسب التقدم</option>
                <option value="title">حسب العنوان</option>
              </select>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 min-w-[44px] min-h-[44px] rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
                aria-label="عرض شبكي"
                aria-pressed={viewMode === 'grid'}
                type="button"
              >
                <Grid className="w-5 h-5" aria-hidden="true" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 min-w-[44px] min-h-[44px] rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-500/20'
                    : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                }`}
                aria-label="عرض قائمة"
                aria-pressed={viewMode === 'list'}
                type="button"
              >
                <List className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* قائمة الكورسات */}
        {filteredAndSortedCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-8 sm:p-12 text-center shadow-md border border-neutral-200 dark:border-neutral-700"
          >
            <BookOpen className="w-16 h-16 text-neutral-300 dark:text-neutral-600 mx-auto mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              لا توجد دورات
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'لم يتم العثور على دورات تطابق البحث'
                : 'لم يتم تسجيلك في أي دورة بعد'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 ease-out shadow-md shadow-primary-500/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                aria-label="تصفح الدورات المتاحة"
              >
                تصفح الدورات
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            )}
          </motion.div>
        ) : (
          <div
            className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
          >
            {filteredAndSortedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2, ease: 'easeOut' }}
                whileHover={{ y: -2, scale: 1.01 }}
                className={`bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl shadow-elevation-2 border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-elevation-4 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200 ease-out ${
                  viewMode === 'list' ? 'flex flex-col sm:flex-row gap-4' : ''
                }`}
              >
                {/* صورة الكورس */}
                <div className={`relative ${viewMode === 'list' ? 'w-full sm:w-48 flex-shrink-0 h-48 sm:h-full' : 'w-full h-48'} overflow-hidden`}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className={`${viewMode === 'list' ? 'h-full' : 'w-full h-full'} object-cover transition-transform duration-200 ease-out hover:scale-[1.02]`}
                  />
                  <div className="absolute top-4 start-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                      {getStatusLabel(course.status)}
                    </span>
                  </div>
                  {course.certificate?.earned && (
                    <div className="absolute top-4 end-4">
                      <Award className="w-6 h-6 text-warning-500 fill-warning-500" aria-label="شهادة مكتملة" />
                    </div>
                  )}
                </div>

                {/* محتوى الكورس */}
                <div className={`p-4 sm:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-3">
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-medium px-2 py-1 bg-primary-50 dark:bg-primary-900/20 rounded-md">
                      {course.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mt-2 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* معلومات المدرب */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-8 h-8 rounded-full border-2 border-neutral-200 dark:border-neutral-700"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {course.instructor.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning-500 fill-warning-500" aria-hidden="true" />
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* شريط التقدم */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                        التقدم
                      </span>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="relative w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 overflow-hidden" role="progressbar" aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`تقدم الدورة: ${course.progress}%`}>
                      <motion.div
                        className={`h-2.5 rounded-full ${
                          course.progress === 100
                            ? 'bg-gradient-to-r from-success-500 to-success-600'
                            : course.progress >= 50
                            ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                            : 'bg-gradient-to-r from-warning-500 to-warning-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <span>{course.completedLessons}/{course.totalLessons} درس</span>
                      <span>{course.completedHours}/{course.totalHours} ساعة</span>
                    </div>
                  </div>

                  {/* معلومات إضافية */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-neutral-600 dark:text-neutral-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      <span>{new Date(course.enrolledDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" aria-hidden="true" />
                      <span>{course.lastActivity}</span>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-2 flex-col sm:flex-row">
                    {course.nextLesson ? (
                      <Link
                        href={`/student/courses/${course.id}/lesson/${course.nextLesson.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 ease-out text-sm shadow-md shadow-primary-500/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label={`استكمل التعلم: ${course.nextLesson.title}`}
                      >
                        <Play className="w-4 h-4" aria-hidden="true" />
                        استكمل التعلم
                      </Link>
                    ) : course.status === 'completed' ? (
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-success-600 to-success-700 hover:from-success-700 hover:to-success-800 text-white rounded-lg font-medium transition-all duration-200 ease-out text-sm shadow-md shadow-success-500/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2"
                        aria-label="عرض الشهادة"
                      >
                        <Award className="w-4 h-4" aria-hidden="true" />
                        عرض الشهادة
                      </Link>
                    ) : (
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 ease-out text-sm shadow-md shadow-primary-500/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                        aria-label="ابدأ الدورة"
                      >
                        <Play className="w-4 h-4" aria-hidden="true" />
                        ابدأ الدورة
                      </Link>
                    )}
                    <Link
                      href={`/student/courses/${course.id}`}
                      className="flex items-center justify-center px-4 py-2.5 min-h-[44px] bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium transition-all duration-200 ease-out text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label="عرض تفاصيل الدورة"
                    >
                      التفاصيل
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
