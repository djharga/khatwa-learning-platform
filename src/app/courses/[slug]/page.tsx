'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { getCourseBySlug, type Course } from '@/data/courses/all-courses';
import {
  CourseHero,
  LearningOutcomes,
  Curriculum,
} from '@/components/course-details';
import CourseAxesSystem from '@/components/course-details/CourseAxesSystem';
import { generateStructuredData } from '@/lib/seo';
import Link from 'next/link';
import { useSubscription } from '@/hooks/useSubscription';
import { useCourseBySlug } from '@/hooks/useCourses';

interface EnrollmentStatus {
  hasSubscription: boolean;
  subscriptionPlan: string | null;
  hasEnrollment: boolean | null;
  hasAccess: boolean;
}

// Type definitions for lessons
type LessonObj = { 
  title: string; 
  duration?: string; 
};

type Lesson = string | LessonObj;

export default function CourseLandingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  // استخدام React Query hooks
  const { data: courseData, isLoading: courseLoading } = useCourseBySlug(slug);
  const courseId = courseData?.id || getCourseBySlug(slug || '')?.id?.toString();
  const { data: subscriptionData, isLoading: subscriptionLoading } = useSubscription(courseId);
  
  // Fallback للبيانات المحلية
  const [course, setCourse] = useState<Course | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      // استخدام البيانات من API إذا كانت متاحة، وإلا استخدام البيانات المحلية
      if (courseData) {
        // تحويل courseData إلى Course format إذا لزم الأمر
        setCourse(getCourseBySlug(slug));
      } else {
        const foundCourse = getCourseBySlug(slug);
        setCourse(foundCourse);
      }
    }
  }, [slug, courseData]);

  const enrollmentStatus = subscriptionData ? {
    hasSubscription: subscriptionData.hasSubscription,
    subscriptionPlan: subscriptionData.subscriptionPlan,
    hasAccess: subscriptionData.hasAccess,
  } : null;

  const loading = courseLoading || subscriptionLoading;


  const handleStartLearning = () => {
    if (course) {
      router.push(`/student/courses/${course.id}`);
    }
  };

  const handleTryFreeLesson = () => {
    // Find first preview lesson
    const firstModule = course?.modules[0];
    const firstLesson = firstModule?.lessons[0] as Lesson | undefined;
    if (firstLesson && course) {
      const lessonId = typeof firstLesson === 'string' ? firstLesson : firstLesson.title;
      router.push(`/student/courses/${course.id}/lesson/${lessonId}`);
    }
  };

  const handlePreviewLesson = (lessonId: string) => {
    if (course) {
      router.push(`/student/courses/${course.id}/lesson/${lessonId}`);
    }
  };

  // Prepare course data for components
  const learningOutcomes = [
    'فهم أساسيات ومبادئ الموضوع بشكل شامل',
    'تطبيق المعرفة في مواقف عملية حقيقية',
    'اكتساب المهارات اللازمة للنجاح في المجال',
    'الحصول على شهادة معتمدة عند إكمال الدورة',
  ];


  // Convert course modules to mainAxes format for CourseAxesSystem
  const mainAxesData = useMemo(() => {
    const hasAccess = enrollmentStatus?.hasAccess || false;
    
    if (!course?.modules) return [];
    
    return course.modules.map((module, moduleIndex) => {
      // Type assertion for lessons array to handle both string and object types
      const lessonsArray: Lesson[] = module.lessons as unknown as Lesson[];
      
      // Convert lessons to files
      const files = lessonsArray.map((lesson: Lesson, lessonIndex) => {
        const lessonTitle = typeof lesson === 'string' ? lesson : lesson.title;
        const lessonId = `${module.id}-${lessonIndex}`;
        const lessonDuration = typeof lesson === 'string' ? '15 دقيقة' : (lesson.duration || '15 دقيقة');
        
        return {
          id: lessonId, // This will be used as lessonId for navigation
          name: lessonTitle,
          type: 'video' as const,
          duration: lessonDuration,
          isProtected: !hasAccess && lessonIndex > 0,
        };
      });
      
      return {
        id: module.id.toString(),
        title: module.title,
        description: `الوحدة ${moduleIndex + 1}: ${module.title}`,
        subAxes: [
          {
            id: `${module.id}-sub`,
            title: module.title,
            description: `جميع دروس ${module.title}`,
            files: files,
          },
        ],
      };
    });
  }, [course?.modules, enrollmentStatus?.hasAccess]);



  if (loading) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/background-cours-page.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
            }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200/50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen relative">
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: 'url(/background-cours-page.jpeg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed',
          }}
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
            }}
          />
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200/50">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">الدورة غير موجودة</h2>
            <Link href="/courses" className="text-blue-600 hover:text-blue-700">
              العودة إلى قائمة الدورات
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Get hasAccess after loading check
  const hasAccess = enrollmentStatus?.hasAccess || false;

  // Generate structured data for SEO
  const courseStructuredData = generateStructuredData('course', {
    name: course.title,
    description: course.description,
    provider: {
      '@type': 'Organization',
      name: 'خطى للتدريب والاستشارات',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: course.rating.toString(),
      reviewCount: course.students.toString(),
    },
    courseCode: course.id.toString(),
    educationalLevel: course.level,
  });


  const breadcrumbData = generateStructuredData('breadcrumb', {
    items: [
      { name: 'الرئيسية', url: '/' },
      { name: 'الكورسات', url: '/courses' },
      { name: course.title, url: `/courses/${course.slug}` },
    ],
  });

  return (
    <>
      {/* SEO Structured Data */}
      <Script
        id="course-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseStructuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen">
        {/* Content wrapper with background - only for main content, not footer */}
        <div className="relative min-h-[calc(100vh-200px)]">
          {/* Background Image with overlay - only for content area */}
          <div 
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: 'url(/background-cours-page.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            {/* Overlay for transparency and better readability */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
              }}
            />
            {/* Additional gradient overlay for better card visibility */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.5) 50%, rgba(255, 255, 255, 0.7) 100%)',
              }}
            />
          </div>
        
          {/* Content wrapper with relative positioning */}
          <div className="relative z-10">
            {/* Hero Section */}
            <CourseHero
              title={course.title}
              description={course.description}
              rating={course.rating}
              students={course.students}
              duration={course.duration}
              lessons={course.lessons}
              level={course.level}
              category={course.category}
              image={course.image}
              onTryFreeLesson={handleTryFreeLesson}
            />

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* تعريف الكورس */}
              <div className="mb-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-neutral-200/50 dark:border-neutral-700/50">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                  تعريف الكورس
                </h2>
                <p className="text-lg text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="space-y-8">
                {/* Main Content */}
                <div className="space-y-8">
                  {/* نظام المحاور التعليمية */}
                  <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-neutral-700">
                    <CourseAxesSystem
                      mainAxes={mainAxesData}
                      hasAccess={hasAccess}
                      courseId={course.id.toString()}
                      courseSlug={course.slug}
                      onFileClick={(file) => {
                        // File click is handled inside CourseAxesSystem with router navigation
                        console.log('File clicked:', file);
                      }}
                    />
                  </div>

                  {/* Learning Outcomes */}
                  <LearningOutcomes outcomes={learningOutcomes} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}