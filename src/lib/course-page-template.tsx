/**
 * Course Page Template Helper
 * Template for creating course landing pages
 */

'use client';

import { useRouter } from 'next/navigation';
import Script from 'next/script';
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
import { courseAnalytics } from '@/lib/analytics';

export interface CoursePageData {
  id: string;
  title: string;
  description: string;
  slug: string;
  rating: number;
  students: number;
  duration: string;
  lessons: number;
  level: string;
  category: string;
  image: string;
  price: number;
  originalPrice?: number;
  videoPreviewUrl?: string;
  instructor: {
    id: string;
    name: string;
    title: string;
    avatar: string;
    bio: string;
    rating?: number;
    students?: number;
    courses?: number;
    socialLinks?: {
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
  learningOutcomes: string[];
  audience: string[];
  prerequisites?: string[];
  modules: Array<{
    id: string;
    title: string;
    description?: string;
    lessons: Array<{
      id: string;
      title: string;
      duration: string;
      type: 'video' | 'reading' | 'quiz' | 'assignment';
      isPreview?: boolean;
    }>;
  }>;
  testimonials?: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
    rating: number;
    comment: string;
    verified?: boolean;
  }>;
  faqItems: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
  stats?: {
    graduates?: number;
    satisfaction?: number;
    companies?: number;
  };
}

export function CoursePageTemplate({ courseData, hasAccess = false }: { courseData: CoursePageData; hasAccess?: boolean }) {
  const router = useRouter();

  const handleStartLearning = () => {
    courseAnalytics.ctaClick('hero', courseData.id);
    router.push(`/student/courses/${courseData.id}`);
  };

  const handleEnroll = async () => {
    courseAnalytics.enrollmentStart(courseData.id);
    router.push(`/student/courses/${courseData.id}`);
  };

  const handlePurchase = async () => {
    courseAnalytics.purchaseStart(courseData.id, courseData.price);
    // TODO: Implement purchase logic
  };

  const handlePreviewLesson = (lessonId: string) => {
    courseAnalytics.freeLessonTry(courseData.id, lessonId);
    router.push(`/student/courses/${courseData.id}/lesson/${lessonId}`);
  };

  // Generate structured data for SEO
  const courseStructuredData = generateStructuredData('course', {
    name: courseData.title,
    description: courseData.description,
    provider: {
      '@type': 'Organization',
      name: 'خطى للتدريب والاستشارات',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: courseData.rating.toString(),
      reviewCount: courseData.students.toString(),
    },
    courseCode: courseData.id,
    educationalLevel: courseData.level,
  });

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: courseData.faqItems.map(item => ({
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
      { name: courseData.title, url: `/courses/${courseData.slug}` },
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
          title={courseData.title}
          description={courseData.description}
          rating={courseData.rating}
          students={courseData.students}
          duration={courseData.duration}
          lessons={courseData.lessons}
          level={courseData.level}
          category={courseData.category}
          image={courseData.image}
          videoPreviewUrl={courseData.videoPreviewUrl}
          instructor={{
            name: courseData.instructor.name,
            avatar: courseData.instructor.avatar,
          }}
          onTryFreeLesson={() => {
            const firstLesson = courseData.modules[0]?.lessons.find(l => l.isPreview || true);
            if (firstLesson) {
              handlePreviewLesson(firstLesson.id);
            }
          }}
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Learning Outcomes */}
              <LearningOutcomes outcomes={courseData.learningOutcomes} />

              {/* Audience & Prerequisites */}
              <AudiencePrereqs
                audience={courseData.audience}
                prerequisites={courseData.prerequisites}
              />

              {/* Curriculum */}
              <Curriculum
                modules={courseData.modules}
                courseId={courseData.id}
                hasAccess={hasAccess}
                onPreviewLesson={handlePreviewLesson}
              />

              {/* Social Proof */}
              <SocialProof
                stats={courseData.stats || {
                  graduates: courseData.students,
                  satisfaction: 98,
                  companies: 150,
                }}
                testimonials={courseData.testimonials || []}
              />

              {/* Instructor */}
              <InstructorCard instructor={courseData.instructor} />

              {/* FAQ */}
              <FAQ items={courseData.faqItems} />
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <StickyCheckout
                price={courseData.price}
                originalPrice={courseData.originalPrice}
                hasAccess={hasAccess}
                onEnroll={handleEnroll}
                onPurchase={handlePurchase}
                onStartLearning={handleStartLearning}
                duration={courseData.duration}
                lessons={courseData.lessons}
                students={courseData.students}
                courseId={courseData.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

