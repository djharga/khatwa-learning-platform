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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-7xl px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/student/courses"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-4"
          >
            <ArrowRight className="w-4 h-4 ml-2 rotate-180" />
            العودة إلى الدورات
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {course.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{course.description}</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link
            href={`/student/courses/${courseId}/lesson`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">الدروس</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">ابدأ التعلم</p>
              </div>
            </div>
          </Link>

          <Link
            href={`/student/courses/${courseId}/files`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FileText className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">الملفات</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">المواد التعليمية</p>
              </div>
            </div>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">التقدم</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {course.progress}% مكتمل
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            معلومات الدورة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الحالة</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.status === 'in_progress' ? 'قيد التقدم' : 
                 course.status === 'completed' ? 'مكتملة' : 'لم تبدأ'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الدروس</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.completedLessons} / {course.totalLessons}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">الساعات</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.completedHours} / {course.totalHours}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">التقييم</p>
              <p className="font-semibold text-gray-900 dark:text-gray-100">
                {course.rating > 0 ? `${course.rating} ⭐` : 'غير متاح'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

