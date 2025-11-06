# صفحات الكورسات الفرعية

## نظرة عامة

تم تحسين صفحات الكورسات الفرعية باستخدام مكونات قابلة لإعادة الاستخدام و template موحد.

## الملفات المحدثة

- ✅ `basics/page.tsx` - مثال على استخدام Template الجديد
- 📝 `ai-audit/page.tsx` - يحتاج تحديث
- 📝 `digital-audit/page.tsx` - يحتاج تحديث
- 📝 `cia-preparation/page.tsx` - يحتاج تحديث
- 📝 `compliance/page.tsx` - يحتاج تحديث
- 📝 `risk-analysis/page.tsx` - يحتاج تحديث
- 📝 `financial-projects/page.tsx` - يحتاج تحديث

## كيفية استخدام Template

### مثال بسيط:

```tsx
'use client';

import { CoursePageTemplate, type CoursePageData } from '@/lib/course-page-template';

export default function MyCoursePage() {
  const courseData: CoursePageData = {
    id: 'my-course',
    title: 'عنوان الكورس',
    description: 'وصف الكورس',
    slug: 'my-course',
    rating: 4.8,
    students: 1500,
    duration: '8 أسابيع',
    lessons: 24,
    level: 'مبتدئ',
    category: 'الفئة',
    image: '/path/to/image.jpg',
    price: 0,
    instructor: {
      id: '1',
      name: 'اسم المدرب',
      title: 'لقب المدرب',
      avatar: '/path/to/avatar.jpg',
      bio: 'سيرة المدرب',
    },
    learningOutcomes: [
      'نتيجة تعلم 1',
      'نتيجة تعلم 2',
    ],
    audience: [
      'الجمهور المستهدف 1',
      'الجمهور المستهدف 2',
    ],
    prerequisites: [
      'متطلب 1',
      'متطلب 2',
    ],
    modules: [
      {
        id: '1',
        title: 'عنوان الوحدة',
        lessons: [
          {
            id: '1',
            title: 'عنوان الدرس',
            duration: '15 دقيقة',
            type: 'video',
            isPreview: true, // للدروس المجانية
          },
        ],
      },
    ],
    faqItems: [
      {
        id: '1',
        question: 'السؤال',
        answer: 'الجواب',
      },
    ],
  };

  return <CoursePageTemplate courseData={courseData} hasAccess={false} />;
}
```

## المكونات المستخدمة

- **CourseHero**: Hero section مع فيديو/صورة
- **StickyCheckout**: شريط شراء لاصق
- **LearningOutcomes**: قسم "ماذا ستتعلم"
- **AudiencePrereqs**: قسم "لمن هذا الكورس" والمتطلبات
- **Curriculum**: المنهج الدراسي مع بحث
- **SocialProof**: إثباتات اجتماعية وشهادات
- **InstructorCard**: بطاقة المدرس
- **FAQ**: أسئلة متكررة مع SEO

## الميزات

✅ SEO محسّن (Schema.org, JSON-LD)  
✅ تصميم متجاوب RTL  
✅ تحليلات مدمجة  
✅ مكونات قابلة لإعادة الاستخدام  
✅ أداء محسّن  

## الخطوات التالية

لتحسين باقي الصفحات:

1. افتح الصفحة المراد تحسينها (مثل `ai-audit/page.tsx`)
2. استبدل الكود القديم بـ Template الجديد
3. املأ بيانات `courseData` بالبيانات الصحيحة
4. اختبر الصفحة

