'use client';

import { CoursePageTemplate, type CoursePageData } from '@/lib/course-page-template';

export default function BasicsCoursePage() {
  // Course Data
  const courseData: CoursePageData = {
    id: 'basics',
    title: 'أساسيات المراجعة الداخلية',
    description: 'دورة شاملة تغطي المفاهيم الأساسية للمراجعة الداخلية مع تطبيقات عملية وحالات دراسية حقيقية من السوق السعودي',
    slug: 'basics',
    rating: 4.9,
    students: 2450,
    duration: '8 أسابيع',
    lessons: 24,
    level: 'مبتدئ',
    category: 'المراجعة الداخلية',
    image: '/assets/financial accounting.png',
    price: 0,
    originalPrice: 0,
    videoPreviewUrl: undefined,
    instructor: {
      id: '1',
      name: 'د. أحمد العتيبي',
      title: 'خبير معتمد من IIA',
      avatar: '/api/placeholder/96/96',
      bio: 'خبير في مجال المراجعة الداخلية مع أكثر من 15 عاماً من الخبرة العملية في الشركات الكبرى. حاصل على شهادات معتمدة من IIA وCIA.',
      rating: 4.9,
      students: 5000,
      courses: 8,
    },
    learningOutcomes: [
      'فهم المفاهيم الأساسية للمراجعة الداخلية وأهميتها في الشركات',
      'تعلم إطار عمل المراجعة الداخلية وفق المعايير الدولية',
      'اكتساب مهارات تحديد وتقييم المخاطر في بيئة العمل',
      'تطبيق مبادئ المراجعة الداخلية في حالات عملية حقيقية',
      'إعداد تقارير المراجعة الداخلية بشكل احترافي',
      'الحصول على شهادة معتمدة عند إكمال الدورة',
    ],
    audience: [
      'المهنيون الجدد في مجال المراجعة الداخلية',
      'الطلاب والخريجون في تخصص المحاسبة والمالية',
      'أصحاب الشركات الذين يريدون فهم المراجعة الداخلية',
      'المحاسبون والمدققون الراغبون في تطوير مهاراتهم',
    ],
    prerequisites: [
      'لا توجد متطلبات مسبقة',
      'الرغبة في التعلم والتحسين',
      'معرفة أساسية باللغة العربية',
    ],
    modules: [
      {
        id: '1',
        title: 'المقدمة وأساسيات المراجعة',
        description: 'فهم أساسيات المراجعة الداخلية',
        lessons: [
          { id: '1', title: 'مقدمة في المراجعة الداخلية', duration: '15 دقيقة', type: 'video' as const, isPreview: true },
          { id: '2', title: 'أنواع المخاطر في الشركات', duration: '20 دقيقة', type: 'video' as const },
          { id: '3', title: 'إطار عمل المراجعة الداخلية', duration: '25 دقيقة', type: 'reading' as const },
          { id: '4', title: 'اختبار قصير - الوحدة الأولى', duration: '30 دقيقة', type: 'quiz' as const },
        ],
      },
      {
        id: '2',
        title: 'التخطيط والتنفيذ',
        description: 'تعلم كيفية تخطيط وتنفيذ عمليات المراجعة',
        lessons: [
          { id: '5', title: 'تخطيط عملية المراجعة', duration: '30 دقيقة', type: 'video' as const },
          { id: '6', title: 'تنفيذ الإجراءات', duration: '35 دقيقة', type: 'video' as const },
          { id: '7', title: 'وظيفة نهائية - دراسة حالة', duration: '60 دقيقة', type: 'assignment' as const },
        ],
      },
      {
        id: '3',
        title: 'التقارير والمتابعة',
        description: 'إعداد تقارير المراجعة الداخلية',
        lessons: [
          { id: '8', title: 'كتابة تقارير المراجعة', duration: '40 دقيقة', type: 'video' as const },
          { id: '9', title: 'متابعة التوصيات', duration: '25 دقيقة', type: 'video' as const },
        ],
      },
    ],
    testimonials: [
      {
        id: '1',
        name: 'محمد الأحمد',
        avatar: '/api/placeholder/48/48',
        role: 'مدقق داخلي',
        rating: 5,
        comment: 'دورة رائعة ومفيدة جداً، ساعدتني في فهم أساسيات المراجعة الداخلية بشكل عملي. المدرب شرح واضح ومفصل.',
        verified: true,
      },
      {
        id: '2',
        name: 'فاطمة السالم',
        avatar: '/api/placeholder/48/48',
        role: 'محاسبة',
        rating: 5,
        comment: 'المحتوى شامل ومفصل، والشرح واضح جداً. أنصح بها بشدة لكل من يريد تعلم المراجعة الداخلية.',
        verified: true,
      },
      {
        id: '3',
        name: 'خالد النعيم',
        avatar: '/api/placeholder/48/48',
        role: 'طالب جامعي',
        rating: 5,
        comment: 'دورة ممتازة للمبتدئين. الحالات الدراسية من السوق السعودي كانت مفيدة جداً.',
        verified: true,
      },
    ],
    faqItems: [
      {
        id: '1',
        question: 'هل هذه الدورة مناسبة للمبتدئين؟',
        answer: 'نعم، هذه الدورة مصممة خصيصاً للمبتدئين في مجال المراجعة الداخلية. لا توجد متطلبات مسبقة.',
      },
      {
        id: '2',
        question: 'كم مدة الدورة؟',
        answer: 'مدة الدورة 8 أسابيع وتتضمن 24 درساً. يمكنك التعلم بوتيرتك الخاصة.',
      },
      {
        id: '3',
        question: 'هل سأحصل على شهادة؟',
        answer: 'نعم، ستحصل على شهادة إتمام معتمدة عند إكمال جميع الدروس والاختبارات.',
      },
      {
        id: '4',
        question: 'هل الدورة مجانية؟',
        answer: 'نعم، هذه الدورة مجانية للمتدربين الجدد. يمكنك الاشتراك والبدء في التعلم فوراً.',
      },
      {
        id: '5',
        question: 'ما هي المواد المتوفرة في الدورة؟',
        answer: 'الدورة تتضمن فيديوهات تعليمية، ملفات PDF، تمارين عملية، حالات دراسية، واختبارات.',
      },
    ],
  };

  return <CoursePageTemplate courseData={courseData} hasAccess={false} />;
}
