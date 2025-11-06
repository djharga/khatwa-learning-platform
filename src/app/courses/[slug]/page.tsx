'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Script from 'next/script';
import { getCourseBySlug, type Course } from '@/data/courses/all-courses';
import {
  CourseHero,
  StickyCheckout,
  LearningOutcomes,
  AudiencePrereqs,
  Curriculum,
  SocialProof,
  InstructorCard,
  FAQ,
} from '@/components/course-details';
import { generateStructuredData } from '@/lib/seo';
import Link from 'next/link';

interface EnrollmentStatus {
  hasSubscription: boolean;
  subscriptionPlan: string | null;
  hasEnrollment: boolean | null;
  hasAccess: boolean;
}

export default function CourseLandingPage() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [course, setCourse] = useState<Course | undefined>(undefined);
  const [enrollmentStatus, setEnrollmentStatus] = useState<EnrollmentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (slug) {
      const foundCourse = getCourseBySlug(slug);
      setCourse(foundCourse);
      checkEnrollmentStatus(foundCourse?.id.toString());
    }
  }, [slug]);

  const checkEnrollmentStatus = async (courseId?: string) => {
    if (!courseId) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`/api/enrollment-status?courseId=${courseId}`);
      const status = await response.json();
      setEnrollmentStatus(status);
    } catch (error) {
      console.error('Error checking enrollment status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!course || enrolling) return;

    setEnrolling(true);
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id.toString() }),
      });

      if (response.ok) {
        router.push(`/student/courses/${course.id}`);
      } else {
        alert('فشل في التسجيل. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('حدث خطأ في التسجيل');
    } finally {
      setEnrolling(false);
    }
  };

  const handlePurchase = async () => {
    if (!course || purchasing) return;

    setPurchasing(true);
    try {
      const price = parseInt(course.price.replace(/[^0-9]/g, ''));
      const response = await fetch('/api/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          courseId: course.id.toString(),
          amount: price,
        }),
      });

      if (response.ok) {
        router.push(`/student/courses/${course.id}`);
      } else {
        alert('فشل في الشراء. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error purchasing:', error);
      alert('حدث خطأ في الشراء');
    } finally {
      setPurchasing(false);
    }
  };

  const handleStartLearning = () => {
    if (course) {
      router.push(`/student/courses/${course.id}`);
    }
  };

  const handleTryFreeLesson = () => {
    // Find first preview lesson
    const firstModule = course?.modules[0];
    const firstLesson = firstModule?.lessons[0];
    if (firstLesson && course) {
      router.push(`/student/courses/${course.id}/lesson/${firstLesson}`);
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

  const audience = [
    'المهنيون الراغبون في تطوير مهاراتهم',
    'الطلاب والخريجون الجدد',
    'أصحاب المشاريع والشركات الناشئة',
    'أي شخص يريد تعلم مجال جديد',
  ];

  const prerequisites = [
    'لا توجد متطلبات مسبقة',
    'الرغبة في التعلم والتحسين',
  ];

  // Prepare curriculum data with useMemo to avoid reference issues
  // Calculate hasAccess inside useMemo to ensure proper initialization
  const curriculumModules = useMemo(() => {
    const hasAccess = enrollmentStatus?.hasAccess || false;
    
    if (!course?.modules) return [];
    
    return course.modules.map((module, index) => ({
      id: module.id.toString(),
      title: module.title,
      description: `الوحدة ${index + 1}: ${module.title}`,
      lessons: module.lessons.map((lesson, lessonIndex) => ({
        id: `${module.id}-${lessonIndex}`,
        title: typeof lesson === 'string' ? lesson : lesson.title,
        duration: typeof lesson === 'string' ? '15 دقيقة' : lesson.duration || '15 دقيقة',
        type: 'video' as const,
        isPreview: lessonIndex === 0, // First lesson is preview
        isLocked: !hasAccess && lessonIndex > 0,
      })),
    }));
  }, [course?.modules, enrollmentStatus?.hasAccess]);

  // Prepare FAQ data
  const faqItems = [
    {
      id: '1',
      question: 'هل يمكنني الوصول للمحتوى بعد انتهاء الدورة؟',
      answer: 'نعم، ستحصل على وصول مدى الحياة لجميع مواد الدورة بعد التسجيل.',
    },
    {
      id: '2',
      question: 'هل توجد شهادة معتمدة عند إكمال الدورة؟',
      answer: 'نعم، ستحصل على شهادة إتمام معتمدة يمكنك مشاركتها على LinkedIn وملفك الشخصي.',
    },
    {
      id: '3',
      question: 'ماذا لو لم أكن راضياً عن الدورة؟',
      answer: 'نوفر ضمان استرجاع الأموال خلال 30 يوم من تاريخ الشراء.',
    },
    {
      id: '4',
      question: 'كم مدة الدورة؟',
      answer: `مدة الدورة ${course?.duration || '8 أسابيع'} وتتضمن ${course?.lessons || 10} دروس.`,
    },
  ];

  // Prepare testimonials
  const testimonials = [
    {
      id: '1',
      name: 'أحمد محمد',
      avatar: '/api/placeholder/48/48',
      role: 'محاسب',
      rating: 5,
      comment: 'دورة رائعة ومفيدة جداً، ساعدتني في تطوير مهاراتي بشكل كبير.',
      verified: true,
    },
    {
      id: '2',
      name: 'فاطمة علي',
      avatar: '/api/placeholder/48/48',
      role: 'مديرة مالية',
      rating: 5,
      comment: 'المحتوى شامل ومفصل، والشرح واضح جداً. أنصح بها بشدة.',
      verified: true,
    },
  ];

  // Prepare instructor data
  const instructorData = {
    id: '1',
    name: 'د. محمود أحمد',
    title: 'خبير في المحاسبة المالية',
    avatar: '/api/placeholder/96/96',
    bio: 'خبير في مجال المحاسبة المالية مع أكثر من 15 عاماً من الخبرة العملية في الشركات الكبرى.',
    rating: course?.rating || 4.8,
    students: course?.students || 1500,
    courses: 5,
  };

  // Extract price
  const price = course?.price ? parseInt(course.price.replace(/[^0-9]/g, '')) || 0 : 0;
  const originalPrice = price > 0 ? Math.round(price * 1.3) : undefined;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">الدورة غير موجودة</h2>
          <Link href="/courses" className="text-blue-600 hover:text-blue-700">
            العودة إلى قائمة الدورات
          </Link>
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

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

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
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <Script
        id="breadcrumb-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
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
          instructor={{
            name: instructorData.name,
            avatar: instructorData.avatar,
          }}
          onTryFreeLesson={handleTryFreeLesson}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Learning Outcomes */}
              <LearningOutcomes outcomes={learningOutcomes} />

              {/* Audience & Prerequisites */}
              <AudiencePrereqs audience={audience} prerequisites={prerequisites} />

              {/* Curriculum */}
              <Curriculum
                modules={curriculumModules}
                courseId={course.id.toString()}
                hasAccess={hasAccess}
                onPreviewLesson={handlePreviewLesson}
              />

              {/* Social Proof */}
              <SocialProof
                stats={{
                  graduates: course.students,
                  satisfaction: 98,
                  companies: 150,
                }}
                testimonials={testimonials}
              />

              {/* Instructor */}
              <InstructorCard instructor={instructorData} />

              {/* FAQ */}
              <FAQ items={faqItems} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <StickyCheckout
                price={price}
                originalPrice={originalPrice}
                hasAccess={hasAccess}
                onEnroll={handleEnroll}
                onPurchase={handlePurchase}
                onStartLearning={handleStartLearning}
                duration={course.duration}
                lessons={course.lessons}
                students={course.students}
                courseId={course.id.toString()}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}