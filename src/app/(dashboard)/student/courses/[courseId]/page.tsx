import Link from 'next/link';
import {
  Play,
  FileText,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { notFound } from 'next/navigation';

interface Course {
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
}

async function getCourse(courseId: string): Promise<Course | null> {
  try {
    // TODO: Replace with actual API call to database
    // For now, using mock data but in a server component
    // In production, you would fetch from your database here
    
    // Example of how to fetch from API route:
    // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    // const response = await fetch(`${baseUrl}/api/courses/${courseId}`, {
    //   cache: 'no-store', // or 'force-cache' for static data
    // });
    // if (!response.ok) return null;
    // const data = await response.json();
    // return data.course;

    // Mock data for now
    return {
      id: courseId,
      title: 'دورة المراجعة الداخلية',
      description: 'دورة شاملة في المراجعة الداخلية',
      instructor: {
        name: 'د. أحمد محمد',
        avatar: '/api/placeholder/64/64',
      },
      image: '/banar-cours.png',
      progress: 0,
      totalLessons: 0,
      completedLessons: 0,
      totalHours: 0,
      completedHours: 0,
      status: 'not_started' as const,
      enrolledDate: new Date().toISOString(),
      lastActivity: 'الآن',
      rating: 0,
      category: 'المراجعة الداخلية',
    };
  } catch (error) {
    console.error('Error loading course:', error);
    return null;
  }
}

interface CoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { courseId } = await params;
  const course = await getCourse(courseId);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-6 sm:py-8">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 mb-4 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 rounded-lg px-2 py-1"
            aria-label="العودة إلى الدورات"
          >
            <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
            العودة إلى الدورات
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-2">
            {course.title}
          </h1>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">{course.description}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Link
            href={`/student/courses/${courseId}/lesson`}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="الانتقال إلى الدروس"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200 ease-out">
                <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">الدروس</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">ابدأ التعلم</p>
              </div>
            </div>
          </Link>

          <Link
            href={`/student/courses/${courseId}/files`}
            className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 ease-out group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            aria-label="الانتقال إلى ملفات الدورة"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 bg-success-50 dark:bg-success-900/20 rounded-lg group-hover:scale-110 transition-transform duration-200 ease-out">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">الملفات</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">المواد التعليمية</p>
              </div>
            </div>
          </Link>

          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="p-3 bg-secondary-innovate-50 dark:bg-secondary-innovate-900/20 rounded-lg">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-secondary-innovate-600 dark:text-secondary-innovate-400" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-semibold text-base sm:text-lg text-neutral-900 dark:text-white">التقدم</h3>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">
                  {course.progress}% مكتمل
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700 p-4 sm:p-6 lg:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6">
            معلومات الدورة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 sm:mb-2">الحالة</p>
              <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
                {course.status === 'in_progress' ? 'قيد التقدم' : 
                 course.status === 'completed' ? 'مكتملة' : 'لم تبدأ'}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 sm:mb-2">الدروس</p>
              <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
                {course.completedLessons} / {course.totalLessons}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 sm:mb-2">الساعات</p>
              <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
                {course.completedHours} / {course.totalHours}
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1 sm:mb-2">التقييم</p>
              <p className="font-semibold text-sm sm:text-base text-neutral-900 dark:text-white">
                {course.rating > 0 ? `${course.rating} ⭐` : 'غير متاح'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

