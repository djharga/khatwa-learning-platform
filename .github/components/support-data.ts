/** Support center data including FAQs, help articles, and sample support tickets. Provides content for the support component's three tabs: FAQ, articles, and tickets. */

export interface SupportFAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SupportArticle {
  id: string;
  title: string;
  summary: string;
  link: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}

export const supportFaqs: SupportFAQ[] = [
  {
    id: '1',
    question: 'كيف أقوم بإنشاء حساب جديد؟',
    answer:
      'لإنشاء حساب جديد، انقر على زر "التسجيل" في الصفحة الرئيسية واملأ النموذج بالمعلومات المطلوبة. ستحتاج إلى تقديم اسمك الكامل، البريد الإلكتروني، ورقم الهاتف.',
    category: 'حساب',
  },
  {
    id: '2',
    question: 'كيف أقوم بإعادة تعيين كلمة المرور؟',
    answer:
      'انقر على "نسيت كلمة المرور" في صفحة تسجيل الدخول واتبع التعليمات المرسلة إلى بريدك الإلكتروني. تأكد من التحقق من مجلد السبام.',
    category: 'حساب',
  },
  {
    id: '3',
    question: 'ما هي طرق الدفع المتاحة؟',
    answer:
      'نقبل الدفع عبر بطاقات الائتمان (فيزا، ماستركارد)، PayPal، والتحويل البنكي. جميع المعاملات محمية وآمنة.',
    category: 'دفع',
  },
  {
    id: '4',
    question: 'كيف أتابع تقدمي في الدورات؟',
    answer:
      'يمكنك متابعة تقدمك من خلال لوحة التحكم الشخصية. ستجد نسبة الإنجاز لكل دورة وآخر نشاط قمت به.',
    category: 'دورات',
  },
  {
    id: '5',
    question: 'هل يمكنني تنزيل الملفات التدريبية؟',
    answer:
      'نعم، جميع الملفات التدريبية متاحة للتنزيل بعد التسجيل في الدورة. يمكنك الوصول إليها من قسم ملفات الدورة.',
    category: 'دورات',
  },
  {
    id: '6',
    question: 'كيف أحصل على شهادة إتمام؟',
    answer:
      'ستحصل على شهادة إتمام تلقائياً بعد إكمال جميع المتطلبات والأنشطة في الدورة بنسبة 100%.',
    category: 'شهادات',
  },
  {
    id: '7',
    question: 'ما هي سياسة الاسترداد؟',
    answer:
      'يمكنك طلب استرداد المبلغ خلال 30 يوماً من تاريخ الشراء بشرط عدم إكمال أكثر من 20% من الدورة.',
    category: 'دفع',
  },
  {
    id: '8',
    question: 'كيف أتواصل مع المدرب؟',
    answer:
      'يمكنك مراسلة المدرب من خلال نظام الرسائل الداخلي أو عبر البريد الإلكتروني الموجود في صفحة الدورة.',
    category: 'دعم',
  },
  {
    id: '9',
    question: 'هل الدورات متوفرة على الهاتف المحمول؟',
    answer:
      'نعم، جميع دوراتنا متجاوبة وتعمل بشكل مثالي على الهواتف الذكية والأجهزة اللوحية.',
    category: 'منصة',
  },
  {
    id: '10',
    question: 'كيف أقوم بتحديث معلوماتي الشخصية؟',
    answer: 'يمكنك تحديث معلوماتك من خلال قسم الملف الشخصي في لوحة التحكم.',
    category: 'حساب',
  },
];

export const supportArticles: SupportArticle[] = [
  {
    id: '1',
    title: 'البدء في رحلتك التعليمية',
    summary: 'تعلم كيفية التنقل في المنصة واستخدام الميزات الأساسية.',
    link: '#',
  },
  {
    id: '2',
    title: 'نصائح للدراسة الفعالة',
    summary: 'استراتيجيات لتحسين التعلم والاحتفاظ بالمعلومات.',
    link: '#',
  },
  {
    id: '3',
    title: 'كيفية استخدام أدوات المنصة',
    summary: 'دليل شامل لجميع الأدوات المتاحة في المنصة.',
    link: '#',
  },
];

export const supportTickets: SupportTicket[] = [
  {
    id: '1',
    title: 'مشكلة في تحميل الفيديوهات',
    status: 'closed',
    createdAt: '2023-10-01',
  },
  {
    id: '2',
    title: 'استفسار حول الشهادة',
    status: 'in_progress',
    createdAt: '2023-10-05',
  },
];