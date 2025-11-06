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
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'not_started':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700';
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري تحميل الدورات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            دوراتي
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تابع تقدمك واستكمل تعلمك في جميع الدورات المسجلة
          </p>
        </motion.div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">إجمالي الدورات</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600 dark:text-green-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProgress}%</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">متوسط التقدم</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalHours}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">ساعة مكتملة</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-orange-600 dark:text-orange-400" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.certificates}</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">شهادات مكتملة</p>
          </motion.div>
        </div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* البحث */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-3 bg-gray-50 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-base"
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
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    statusFilter === filter.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 dark:bg-neutral-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-600'
                  }`}
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
                className="px-4 py-2 bg-gray-50 dark:bg-neutral-700 border border-gray-300 dark:border-neutral-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">الأحدث</option>
                <option value="progress">حسب التقدم</option>
                <option value="title">حسب العنوان</option>
              </select>

              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-neutral-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-neutral-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* قائمة الكورسات */}
        {filteredAndSortedCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white dark:bg-neutral-800 rounded-xl p-12 text-center shadow-lg border border-gray-200 dark:border-neutral-700"
          >
            <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              لا توجد دورات
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchQuery || statusFilter !== 'all'
                ? 'لم يتم العثور على دورات تطابق البحث'
                : 'لم يتم تسجيلك في أي دورة بعد'}
            </p>
            {!searchQuery && statusFilter === 'all' && (
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                تصفح الدورات
                <ArrowRight className="w-5 h-5" />
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
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-neutral-800 rounded-xl shadow-lg border border-gray-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-all ${
                  viewMode === 'list' ? 'flex gap-4' : ''
                }`}
              >
                {/* صورة الكورس */}
                <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : 'w-full h-48'}`}>
                  <img
                    src={course.image}
                    alt={course.title}
                    className={`${viewMode === 'list' ? 'h-full' : 'w-full h-full'} object-cover`}
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(course.status)}`}>
                      {getStatusLabel(course.status)}
                    </span>
                  </div>
                  {course.certificate?.earned && (
                    <div className="absolute top-4 left-4">
                      <Award className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                    </div>
                  )}
                </div>

                {/* محتوى الكورس */}
                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="mb-3">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                      {course.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-1 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {course.description}
                    </p>
                  </div>

                  {/* معلومات المدرب */}
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {course.instructor.name}
                      </p>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* شريط التقدم */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        التقدم
                      </span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                      <span>{course.completedLessons}/{course.totalLessons} درس</span>
                      <span>{course.completedHours}/{course.totalHours} ساعة</span>
                    </div>
                  </div>

                  {/* معلومات إضافية */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(course.enrolledDate).toLocaleDateString('ar-EG')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.lastActivity}</span>
                    </div>
                  </div>

                  {/* أزرار الإجراءات */}
                  <div className="flex gap-2">
                    {course.nextLesson ? (
                      <Link
                        href={`/student/courses/${course.id}/lesson/${course.nextLesson.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all text-sm"
                      >
                        <Play className="w-4 h-4" />
                        استكمل التعلم
                      </Link>
                    ) : course.status === 'completed' ? (
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all text-sm"
                      >
                        <Award className="w-4 h-4" />
                        عرض الشهادة
                      </Link>
                    ) : (
                      <Link
                        href={`/student/courses/${course.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all text-sm"
                      >
                        <Play className="w-4 h-4" />
                        ابدأ الدورة
                      </Link>
                    )}
                    <Link
                      href={`/student/courses/${course.id}`}
                      className="px-4 py-2 bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-all text-sm"
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
