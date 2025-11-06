'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, Lock as LockIcon } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  BookOpen,
  FileText,
  FileVideo,
  Download,
  Calendar,
  Clock,
  User,
  Award,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Lock,
  BarChart3,
  MessageSquare,
  Star,
  Target,
  Zap,
  TrendingUp,
  Video,
  Image as ImageIcon,
  BookMarked,
} from 'lucide-react';
import Link from 'next/link';

// تعريف واجهة لتفاصيل الكورس
interface CourseDetail {
  id: string;
  title: string;
  description: string;
  instructor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
  };
  progress: number;
  totalLessons: number;
  completedLessons: number;
  totalHours: number;
  completedHours: number;
  status: 'not_started' | 'in_progress' | 'completed';
  enrolledDate: string;
  lastActivity: string;
  rating: number;
  modules: {
    id: string;
    title: string;
    description: string;
    lessons: {
      id: string;
      title: string;
      duration: string;
      type: 'video' | 'reading' | 'quiz' | 'assignment';
      completed: boolean;
      locked: boolean;
      progress?: number;
    }[];
  }[];
  resources: {
    id: string;
    title: string;
    type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'zip';
    size: string;
    downloadUrl: string;
  }[];
  exams: {
    id: string;
    title: string;
    duration: string;
    attempts: number;
    maxAttempts: number;
    status: 'available' | 'completed' | 'locked';
    score?: number;
  }[];
  certificate?: {
    available: boolean;
    earned: boolean;
    issueDate?: string;
  };
}

// بيانات محاكاة للكورسات
const coursesData: Record<string, CourseDetail> = {
  '1': {
    id: '1',
    title: 'أساسيات المراجعة الداخلية وفق المعايير الدولية',
    description: 'دورة شاملة تغطي مبادئ المراجعة الداخلية وأفضل الممارسات وفقاً للمعايير الدولية',
    instructor: {
      id: '1',
      name: 'د. أحمد محمد',
      title: 'خبير مراجعة داخلية معتمد',
      avatar: '/api/placeholder/64/64',
      bio: 'خبير في مجال المراجعة الداخلية مع أكثر من 15 عاماً من الخبرة العملية',
    },
    progress: 75,
    totalLessons: 24,
    completedLessons: 18,
    totalHours: 40,
    completedHours: 30,
    status: 'in_progress',
    enrolledDate: '2024-01-15',
    lastActivity: 'منذ يومين',
    rating: 4.8,
    modules: [
      {
        id: '1',
        title: 'المقدمة وأساسيات المراجعة',
        description: 'فهم أساسيات المراجعة الداخلية',
        lessons: [
          { id: '1', title: 'مقدمة في المراجعة الداخلية', duration: '15 دقيقة', type: 'video', completed: true, locked: false },
          { id: '2', title: 'أنواع المخاطر في الشركات', duration: '20 دقيقة', type: 'video', completed: true, locked: false },
          { id: '3', title: 'إطار عمل المراجعة الداخلية', duration: '25 دقيقة', type: 'reading', completed: true, locked: false },
          { id: '4', title: 'اختبار قصير - الوحدة الأولى', duration: '30 دقيقة', type: 'quiz', completed: false, locked: false, progress: 60 },
        ],
      },
      {
        id: '2',
        title: 'التخطيط والتنفيذ',
        description: 'تعلم كيفية تخطيط وتنفيذ عمليات المراجعة',
        lessons: [
          { id: '5', title: 'تخطيط عملية المراجعة', duration: '30 دقيقة', type: 'video', completed: false, locked: false, progress: 75 },
          { id: '6', title: 'تنفيذ الإجراءات', duration: '35 دقيقة', type: 'video', completed: false, locked: false },
          { id: '7', title: 'وظيفة نهائية - دراسة حالة', duration: '60 دقيقة', type: 'assignment', completed: false, locked: true },
        ],
      },
    ],
    resources: [
      { id: '1', title: 'دليل المراجعة الداخلية.pdf', type: 'pdf', size: '2.5 MB', downloadUrl: '#' },
      { id: '2', title: 'قوالب التقارير.xlsx', type: 'xlsx', size: '850 KB', downloadUrl: '#' },
      { id: '3', title: 'ملخص المحاضرات.pptx', type: 'pptx', size: '1.2 MB', downloadUrl: '#' },
    ],
    exams: [
      { id: '1', title: 'اختبار منتصف الفصل', duration: '60 دقيقة', attempts: 1, maxAttempts: 2, status: 'completed', score: 92 },
      { id: '2', title: 'الاختبار النهائي', duration: '120 دقيقة', attempts: 0, maxAttempts: 1, status: 'available' },
    ],
    certificate: {
      available: true,
      earned: false,
    },
  },
  '2': {
    id: '2',
    title: 'تطبيق معايير IFRS في القوائم المالية',
    description: 'شرح عملي لتطبيق المعايير الدولية لإعداد التقارير المالية',
    instructor: {
      id: '2',
      name: 'د. فاطمة علي',
      title: 'خبيرة معايير محاسبية',
      avatar: '/api/placeholder/64/64',
      bio: 'خبيرة في المعايير المحاسبية الدولية مع خبرة في القطاع المصرفي',
    },
    progress: 45,
    totalLessons: 32,
    completedLessons: 14,
    totalHours: 50,
    completedHours: 22.5,
    status: 'in_progress',
    enrolledDate: '2024-02-01',
    lastActivity: 'منذ أسبوع',
    rating: 4.9,
    modules: [
      {
        id: '1',
        title: 'مقدمة في IFRS',
        description: 'فهم أساسيات المعايير الدولية',
        lessons: [
          { id: '1', title: 'نظرة عامة على IFRS', duration: '20 دقيقة', type: 'video', completed: true, locked: false },
          { id: '2', title: 'الإطار المفاهيمي', duration: '25 دقيقة', type: 'video', completed: true, locked: false },
        ],
      },
    ],
    resources: [],
    exams: [],
    certificate: {
      available: true,
      earned: false,
    },
  },
};

interface PageProps {
  params: {
    id: string;
  };
}

const CoursePage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'lessons' | 'resources' | 'exams' | 'discussions'>('overview');
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(['1']));
  const [enrollmentStatus, setEnrollmentStatus] = useState<{ hasAccess: boolean; hasSubscription: boolean; hasEnrollment: boolean | null } | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(true);

  // تحويل id إلى string إذا كانت مصفوفة
  const courseId = Array.isArray(id) ? id[0] : id;

  // محاكاة بيانات الكورس
  const courseData = coursesData[courseId];

  // التحقق من حالة الاشتراك/الالتحاق
  useEffect(() => {
    const checkStatus = async () => {
      if (!courseId) {
        setCheckingStatus(false);
        return;
      }

      try {
        const response = await fetch(`/api/enrollment-status?courseId=${courseId}`);
        const status = await response.json();
        setEnrollmentStatus(status);
      } catch (error) {
        console.error('Error checking enrollment status:', error);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkStatus();
  }, [courseId]);

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleId)) {
        newSet.delete(moduleId);
      } else {
        newSet.add(moduleId);
      }
      return newSet;
    });
  };

  const getNextLesson = () => {
    for (const module of courseData.modules) {
      for (const lesson of module.lessons) {
        if (!lesson.completed && !lesson.locked) {
          return { moduleId: module.id, lessonId: lesson.id };
        }
      }
    }
    return null;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'مكتملة';
      case 'in_progress':
        return 'قيد التنفيذ';
      default:
        return 'لم تبدأ';
    }
  };

  if (!courseData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">الدورة غير موجودة</h2>
          <Link href="/student/courses" className="text-blue-600 hover:text-blue-700">
            العودة إلى قائمة الدورات
          </Link>
        </div>
      </div>
    );
  }

  // التحقق من الوصول
  const hasAccess = enrollmentStatus?.hasAccess ?? true; // Default to true if status not loaded yet
  const showAccessWarning = !checkingStatus && !hasAccess;

  const nextLesson = getNextLesson();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* تحذير الوصول */}
        {showAccessWarning && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6"
          >
            <div className="flex items-start gap-4">
              <LockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                  الوصول غير متاح
                </h3>
                <p className="text-yellow-800 dark:text-yellow-300 mb-4">
                  {!enrollmentStatus?.hasSubscription && !enrollmentStatus?.hasEnrollment
                    ? 'يجب عليك الاشتراك أو شراء هذه الدورة للوصول إلى المحتوى.'
                    : 'ليس لديك وصول إلى هذه الدورة حالياً.'}
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/packages-and-consulting?tab=packages"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    اشترك الآن
                  </Link>
                  <Link
                    href="/courses"
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-medium transition-colors"
                  >
                    تصفح الدورات
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200 dark:border-neutral-700">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* معلومات الدورة */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                      {courseData.title}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">
                      {courseData.description}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(courseData.status)}`}>
                    {getStatusLabel(courseData.status)}
                  </span>
                </div>

                {/* معلومات المدرب */}
                <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl">
                  <img
                    src={courseData.instructor.avatar}
                    alt={courseData.instructor.name}
                    className="w-16 h-16 rounded-full border-2 border-blue-200"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {courseData.instructor.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {courseData.instructor.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      {courseData.instructor.bio}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="font-semibold">{courseData.rating}</span>
                  </div>
                </div>

                {/* شريط التقدم */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      التقدم في الدورة
                    </span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {courseData.progress}%
                    </span>
                  </div>
                  <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${courseData.progress}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{courseData.completedLessons}/{courseData.totalLessons} درس مكتمل</span>
                    <span>{courseData.completedHours}/{courseData.totalHours} ساعة</span>
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex flex-wrap gap-3">
                  {nextLesson ? (
                    <Link
                      href={`/student/courses/${courseData.id}/lesson/${nextLesson.lessonId}`}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <Play className="w-5 h-5" />
                      <span>استكمل التعلم</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  ) : courseData.certificate?.earned ? (
                    <Link
                      href="/certificates"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <Award className="w-5 h-5" />
                      <span>عرض الشهادة</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/student/courses/${courseData.id}/lesson/${courseData.modules[0]?.lessons[0]?.id}`}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105"
                    >
                      <Play className="w-5 h-5" />
                      <span>ابدأ الدورة</span>
                      <ChevronLeft className="w-4 h-4" />
                    </Link>
                  )}
                  <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-700 border-2 border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-neutral-600">
                    <MessageSquare className="w-5 h-5" />
                    <span>المناقشة</span>
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-neutral-700 border-2 border-gray-300 dark:border-neutral-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-50 dark:hover:bg-neutral-600">
                    <BookMarked className="w-5 h-5" />
                    <span>حفظ</span>
                  </button>
                </div>
              </div>

              {/* إحصائيات سريعة */}
              <div className="lg:w-64 space-y-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">الدروس</span>
                    <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {courseData.totalLessons}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">مكتمل</span>
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {courseData.completedLessons}
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">الساعات</span>
                    <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {courseData.totalHours}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* التبويبات */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-white dark:bg-neutral-800 rounded-xl p-2 shadow-lg border border-gray-200 dark:border-neutral-700">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
              { id: 'lessons', label: 'الدروس', icon: BookOpen },
              { id: 'resources', label: 'الموارد', icon: FileText },
              { id: 'exams', label: 'الاختبارات', icon: Target },
              { id: 'discussions', label: 'المناقشات', icon: MessageSquare },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(tab.id as 'overview' | 'lessons' | 'resources' | 'exams' | 'discussions');
                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-neutral-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* محتوى التبويبات */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">نظرة عامة على الدورة</h2>
              
              {/* معلومات الدورة */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">معلومات التسجيل</h3>
                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>تاريخ التسجيل: {new Date(courseData.enrolledDate).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>آخر نشاط: {courseData.lastActivity}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">الإنجازات</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600 dark:text-gray-400">متوسط الدرجات: 92%</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600 dark:text-gray-400">سلسلة دراسة: 7 أيام</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ملخص الوحدات */}
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">الوحدات الدراسية</h3>
                <div className="space-y-3">
                  {courseData.modules.map((module, index) => (
                    <div
                      key={module.id}
                      className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-lg border border-gray-200 dark:border-neutral-600"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">
                            الوحدة {index + 1}: {module.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {module.description}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                            {module.lessons.length} دروس
                          </p>
                        </div>
                        <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                          {Math.round((module.lessons.filter(l => l.completed).length / module.lessons.length) * 100)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'lessons' && (
            <motion.div
              key="lessons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">قائمة الدروس</h2>
              
              <div className="space-y-4">
                {courseData.modules.map((module, moduleIndex) => (
                  <div
                    key={module.id}
                    className="border border-gray-200 dark:border-neutral-600 rounded-xl overflow-hidden"
                  >
                    <button
                      onClick={() => toggleModule(module.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-700/50 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center font-semibold">
                          {moduleIndex + 1}
                        </div>
                        <div className="text-right">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{module.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {module.lessons.filter(l => l.completed).length} من {module.lessons.length} دروس مكتملة
                          </p>
                        </div>
                      </div>
                      {expandedModules.has(module.id) ? (
                        <ChevronRight className="w-5 h-5 text-gray-400 transform rotate-180" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>

                    <AnimatePresence>
                      {expandedModules.has(module.id) && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 space-y-2 bg-white dark:bg-neutral-800">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <Link
                                key={lesson.id}
                                href={lesson.locked ? '#' : `/student/courses/${courseData.id}/lesson/${lesson.id}`}
                                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                                  lesson.locked
                                    ? 'bg-gray-50 dark:bg-neutral-700/30 opacity-60 cursor-not-allowed'
                                    : lesson.completed
                                      ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 cursor-pointer'
                                      : 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 cursor-pointer'
                                }`}
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  {lesson.completed ? (
                                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                  ) : lesson.locked ? (
                                    <Lock className="w-5 h-5 text-gray-400" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-blue-600 dark:border-blue-400" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      {lesson.type === 'video' && <Video className="w-4 h-4 text-blue-600" />}
                                      {lesson.type === 'reading' && <FileText className="w-4 h-4 text-green-600" />}
                                      {lesson.type === 'quiz' && <Target className="w-4 h-4 text-orange-600" />}
                                      {lesson.type === 'assignment' && <FileText className="w-4 h-4 text-purple-600" />}
                                      <h4 className="font-medium text-gray-900 dark:text-white">{lesson.title}</h4>
                                    </div>
                                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-600 dark:text-gray-400">
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {lesson.duration}
                                      </span>
                                      {lesson.progress !== undefined && (
                                        <span>التقدم: {lesson.progress}%</span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <ChevronLeft className="w-5 h-5 text-gray-400" />
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">الموارد والملفات</h2>
              
              {courseData.resources.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {courseData.resources.map((resource) => (
                    <div
                      key={resource.id}
                      className="p-4 bg-gray-50 dark:bg-neutral-700/50 rounded-xl border border-gray-200 dark:border-neutral-600 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded-lg transition-colors">
                          <Download className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">{resource.title}</h4>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span className="uppercase">{resource.type}</span>
                        <span>{resource.size}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">لا توجد موارد متاحة حالياً</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'exams' && (
            <motion.div
              key="exams"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">الاختبارات</h2>
              
              {courseData.exams.length > 0 ? (
                <div className="space-y-4">
                  {courseData.exams.map((exam) => (
                    <div
                      key={exam.id}
                      className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {exam.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {exam.duration}
                            </span>
                            <span>
                              المحاولات: {exam.attempts}/{exam.maxAttempts}
                            </span>
                          </div>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          exam.status === 'completed'
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                            : exam.status === 'available'
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                              : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                          {exam.status === 'completed' ? 'مكتمل' : exam.status === 'available' ? 'متاح' : 'مغلق'}
                        </span>
                      </div>
                      {exam.score !== undefined && (
                        <div className="mb-4">
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                            {exam.score}%
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">النتيجة</p>
                        </div>
                      )}
                      <Link
                        href={exam.status === 'available' ? `/student/exam` : '#'}
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                          exam.status === 'available'
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white hover:shadow-lg'
                            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        }`}
                      >
                        {exam.status === 'available' ? (
                          <>
                            <Play className="w-5 h-5" />
                            <span>بدء الاختبار</span>
                          </>
                        ) : exam.status === 'completed' ? (
                          <>
                            <BarChart3 className="w-5 h-5" />
                            <span>عرض النتيجة</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-5 h-5" />
                            <span>غير متاح</span>
                          </>
                        )}
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Target className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">لا توجد اختبارات متاحة حالياً</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'discussions' && (
            <motion.div
              key="discussions"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200 dark:border-neutral-700"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">المناقشات</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                  <MessageSquare className="w-5 h-5" />
                  <span>مناقشة جديدة</span>
                </button>
              </div>
              
              <div className="text-center py-12">
                <MessageSquare className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">لا توجد مناقشات بعد</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  ابدأ مناقشة جديدة لطرح أسئلتك ومشاركة أفكارك
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CoursePage;
