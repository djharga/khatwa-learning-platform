// ═══════════════════════════════════════════════════
// ملف بيانات موحد لجميع الكورسات
// جميع الكورسات والمحتويات التعليمية في مكان واحد
// ═══════════════════════════════════════════════════

export interface CourseModule {
  id: number;
  title: string;
  lessons: string[];
}

export interface Course {
  id: number;
  title: string;
  slug: string;
  pageUrl: string;
  description: string;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  lessons: number;
  price: string;
  rating: number;
  students: number;
  image: string;
  files: number;
  videos: number;
  audios: number;
  modules: CourseModule[];
}

// ═══════════════════════════════════════════════════
// جميع الكورسات
// ═══════════════════════════════════════════════════

export const allCourses: Course[] = [
  {
    id: 1,
    title: "دورة التأسيس المالي",
    slug: "financial-foundation",
    pageUrl: "/courses/financial-foundation",
    description: "تعلم أساسيات المحاسبة المالية والتأسيس المالي للشركات من البداية حتى الاحتراف",
    category: "المحاسبة المالية",
    level: "مبتدئ",
    duration: "8 أسابيع",
    lessons: 10,
    price: "$1,200",
    rating: 4.8,
    students: 1500,
    image: "/assets/financial accounting.png",
    files: 15,
    videos: 24,
    audios: 8,
    modules: [
      {
        id: 1,
        title: "مقدمة في المحاسبة المالية",
        lessons: ["مفهوم المحاسبة", "أنواع المحاسبة", "المبادئ المحاسبية"]
      },
      {
        id: 2,
        title: "القوائم المالية",
        lessons: ["قائمة الدخل", "الميزانية العمومية", "قائمة التدفقات النقدية"]
      },
      {
        id: 3,
        title: "الدورة المحاسبية",
        lessons: ["تسجيل القيود", "الترحيل", "إعداد ميزان المراجعة"]
      }
    ]
  },
  {
    id: 2,
    title: "دورة التحليل المالي وإعداد الميزانيات",
    slug: "financial-analysis-budgeting",
    pageUrl: "/courses/financial-analysis-budgeting",
    description: "تعلم تحليل القوائم المالية وإعداد الميزانيات التشغيلية والرأسمالية باحترافية",
    category: "التحليل والتخطيط المالي",
    level: "متوسط",
    duration: "10 أسابيع",
    lessons: 12,
    price: "$1,800",
    rating: 4.9,
    students: 2100,
    image: "/assets/Financial analysis and budgeting course.png",
    files: 18,
    videos: 28,
    audios: 10,
    modules: [
      {
        id: 1,
        title: "مقدمة في التحليل المالي",
        lessons: ["أهداف التحليل المالي", "أدوات التحليل", "النسب المالية"]
      },
      {
        id: 2,
        title: "تحليل القوائم المالية",
        lessons: ["تحليل قائمة الدخل", "تحليل الميزانية", "التحليل الأفقي والرأسي"]
      },
      {
        id: 3,
        title: "إعداد الميزانيات",
        lessons: ["الميزانية التشغيلية", "الميزانية الرأسمالية", "الميزانية النقدية"]
      }
    ]
  },
  {
    id: 3,
    title: "دورة التقارير المالية والمحاسبية",
    slug: "financial-accounting-reports",
    pageUrl: "/courses/financial-accounting-reports",
    description: "إعداد التقارير المالية وفقاً للمعايير الدولية IFRS مع أمثلة عملية",
    category: "المحاسبة المالية",
    level: "متقدم",
    duration: "6 أسابيع",
    lessons: 8,
    price: "$1,500",
    rating: 4.7,
    students: 1800,
    image: "/assets/Advanced financial reporting course cover.png",
    files: 20,
    videos: 32,
    audios: 12,
    modules: [
      {
        id: 1,
        title: "معايير IFRS",
        lessons: ["مقدمة في IFRS", "المعايير الأساسية", "التطبيقات العملية"]
      },
      {
        id: 2,
        title: "إعداد التقارير",
        lessons: ["التقارير السنوية", "التقارير الدورية", "الإفصاحات"]
      }
    ]
  },
  {
    id: 4,
    title: "دورة التسويات البنكية",
    slug: "bank-reconciliation",
    pageUrl: "/courses/bank-reconciliation",
    description: "فهم وتطبيق التسويات البنكية وإدارة الحسابات البنكية بفعالية",
    category: "المحاسبة المالية",
    level: "متوسط",
    duration: "4 أسابيع",
    lessons: 6,
    price: "$900",
    rating: 4.6,
    students: 1200,
    image: "/assets/Bank reconciliation course cover.png",
    files: 12,
    videos: 18,
    audios: 6,
    modules: [
      {
        id: 1,
        title: "أساسيات التسويات البنكية",
        lessons: ["مفهوم التسوية", "أهمية التسوية", "خطوات التسوية"]
      },
      {
        id: 2,
        title: "التطبيق العملي",
        lessons: ["حالات عملية", "معالجة الفروقات", "إعداد كشف التسوية"]
      }
    ]
  },
  {
    id: 5,
    title: "دورة التسويات الجردية",
    slug: "inventory-reconciliation",
    pageUrl: "/courses/inventory-reconciliation",
    description: "إجراء الجرد والتسويات الجردية وإدارة المخزون بطريقة احترافية",
    category: "سلاسل الإمداد",
    level: "متوسط",
    duration: "4 أسابيع",
    lessons: 6,
    price: "$900",
    rating: 4.5,
    students: 1000,
    image: "/assets/Inventory reconciliation course cover.png",
    files: 14,
    videos: 20,
    audios: 7,
    modules: [
      {
        id: 1,
        title: "الجرد المخزني",
        lessons: ["أنواع الجرد", "طرق الجرد", "توثيق الجرد"]
      },
      {
        id: 2,
        title: "المعالجة المحاسبية",
        lessons: ["قيود الجرد", "معالجة الفروقات", "التقارير"]
      }
    ]
  },
  {
    id: 6,
    title: "دورة المشتريات",
    slug: "procurement",
    pageUrl: "/courses/procurement",
    description: "إدارة المشتريات والموردين وعمليات الشراء بطريقة احترافية ومنظمة",
    category: "سلاسل الإمداد",
    level: "متوسط",
    duration: "6 أسابيع",
    lessons: 9,
    price: "$1,200",
    rating: 4.7,
    students: 1400,
    image: "/assets/Procurement and purchasing course cover.png",
    files: 16,
    videos: 25,
    audios: 9,
    modules: [
      {
        id: 1,
        title: "أساسيات المشتريات",
        lessons: ["دورة المشتريات", "إدارة الموردين", "طلبات الشراء"]
      },
      {
        id: 2,
        title: "التفاوض والعقود",
        lessons: ["مهارات التفاوض", "إعداد العقود", "إدارة العلاقات"]
      },
      {
        id: 3,
        title: "التحليل والتقييم",
        lessons: ["تحليل التكاليف", "تقييم الموردين", "مؤشرات الأداء"]
      }
    ]
  },
  {
    id: 7,
    title: "دورة إدارة المخازن",
    slug: "warehouse-management-basics",
    pageUrl: "/courses/warehouse-management-basics",
    description: "نظام متكامل لإدارة المخازن والمستودعات والتحكم في المخزون",
    category: "سلاسل الإمداد",
    level: "متوسط",
    duration: "5 أسابيع",
    lessons: 8,
    price: "$1,100",
    rating: 4.6,
    students: 1300,
    image: "/assets/Warehouse management course cover.png",
    files: 13,
    videos: 22,
    audios: 8,
    modules: [
      {
        id: 1,
        title: "أساسيات إدارة المخازن",
        lessons: ["تنظيم المخازن", "أنظمة التخزين", "السلامة المهنية"]
      },
      {
        id: 2,
        title: "إدارة المخزون",
        lessons: ["طرق حساب المخزون", "نقطة إعادة الطلب", "المخزون الأمثل"]
      }
    ]
  },
  {
    id: 8,
    title: "دورة إدارة وتشغيل المطاعم",
    slug: "restaurant-management",
    pageUrl: "/courses/restaurant-management",
    description: "إدارة شاملة لعمليات المطاعم والمنشآت الغذائية من جميع النواحي",
    category: "إدارة وتشغيل المطاعم",
    level: "متوسط",
    duration: "7 أسابيع",
    lessons: 10,
    price: "$1,400",
    rating: 4.8,
    students: 1600,
    image: "/assets/Restaurant management course cover.png",
    files: 17,
    videos: 26,
    audios: 11,
    modules: [
      {
        id: 1,
        title: "أساسيات إدارة المطاعم",
        lessons: ["تخطيط المطعم", "إدارة القائمة", "تسعير الأطباق"]
      },
      {
        id: 2,
        title: "العمليات التشغيلية",
        lessons: ["إدارة المطبخ", "خدمة العملاء", "إدارة المخزون"]
      },
      {
        id: 3,
        title: "التسويق والمبيعات",
        lessons: ["استراتيجيات التسويق", "برامج الولاء", "التسويق الرقمي"]
      }
    ]
  },
  {
    id: 9,
    title: "أساسيات المالية والمحاسبة",
    slug: "finance-basics",
    pageUrl: "/courses/finance-basics",
    description: "تعلم أساسيات المالية والمحاسبة من الصفر مع أمثلة عملية وحالات دراسية شاملة",
    category: "المحاسبة المالية",
    level: "مبتدئ",
    duration: "20 أسبوع",
    lessons: 24,
    price: "$2,400",
    rating: 4.9,
    students: 2800,
    image: "/assets/Finance and accounting basics course cover.png",
    files: 25,
    videos: 40,
    audios: 15,
    modules: [
      {
        id: 1,
        title: "مدخل إلى المالية",
        lessons: ["ما هي المالية؟", "الفرق بين المحاسبة والمالية", "أهداف الإدارة المالية"]
      },
      {
        id: 2,
        title: "القوائم المالية الأساسية",
        lessons: ["قائمة الدخل", "الميزانية العمومية", "قائمة التدفقات النقدية"]
      },
      {
        id: 3,
        title: "النسب والمؤشرات المالية",
        lessons: ["نسب الربحية", "نسب السيولة", "نسب المديونية"]
      },
      {
        id: 4,
        title: "التخطيط والميزانية",
        lessons: ["إعداد الموازنات", "التوقعات المالية", "إدارة التكاليف"]
      },
      {
        id: 5,
        title: "أساسيات الاستثمار والتمويل",
        lessons: ["قيمة النقود الزمنية", "أدوات التمويل", "مبادئ الاستثمار"]
      }
    ]
  },
  {
    id: 10,
    title: "إدارة المشتريات والتوريدات",
    slug: "procurement-management",
    pageUrl: "/courses/procurement-management",
    description: "تعلم إدارة المشتريات والتوريدات بكفاءة مع استراتيجيات التفاوض وعقود الشراء",
    category: "سلاسل الإمداد",
    level: "متوسط",
    duration: "16 أسبوع",
    lessons: 20,
    price: "$2,000",
    rating: 4.8,
    students: 1900,
    image: "/assets/Procurement and supply management course cover.png",
    files: 22,
    videos: 35,
    audios: 13,
    modules: [
      {
        id: 1,
        title: "تعريف وأهمية المشتريات",
        lessons: ["دور المشتريات في سلسلة الإمداد", "أهداف المشتريات الاستراتيجية", "أنواع المشتريات"]
      },
      {
        id: 2,
        title: "دورة المشتريات",
        lessons: ["تحديد الاحتياجات", "دراسة العروض", "اختيار الموردين"]
      },
      {
        id: 3,
        title: "التفاوض وعقود الشراء",
        lessons: ["فن التفاوض الفعال", "إعداد العقود القانونية", "إدارة الموردين"]
      },
      {
        id: 4,
        title: "المشتريات الدولية",
        lessons: ["التوريدات الدولية", "الشحن والتخليص الجمركي", "الاعتمادات المستندية"]
      }
    ]
  },
  {
    id: 11,
    title: "إدارة المخازن والمستودعات",
    slug: "warehouse-management",
    pageUrl: "/courses/warehouse-management",
    description: "نظام شامل لإدارة المخازن والمخزون مع أحدث التقنيات والممارسات العالمية",
    category: "سلاسل الإمداد",
    level: "متوسط",
    duration: "16 أسبوع",
    lessons: 20,
    price: "$1,800",
    rating: 4.7,
    students: 1700,
    image: "/assets/Advanced warehouse and storage management course cover.png",
    files: 21,
    videos: 33,
    audios: 12,
    modules: [
      {
        id: 1,
        title: "أساسيات إدارة المخازن",
        lessons: ["أنواع المخازن", "طرق التخزين", "تصنيف المواد"]
      },
      {
        id: 2,
        title: "العمليات المخزنية",
        lessons: ["استلام المواد", "التخزين الصحيح", "عمليات الصرف"]
      },
      {
        id: 3,
        title: "الرقابة على المخزون",
        lessons: ["نظم الرقابة الداخلية", "الجرد والتسويات", "مؤشرات الأداء"]
      },
      {
        id: 4,
        title: "الصحة والسلامة",
        lessons: ["معايير الأمن الصناعي", "التعامل مع المواد الخطرة", "إدارة المخاطر"]
      }
    ]
  },
  {
    id: 12,
    title: "التقارير المالية والمحاسبية",
    slug: "financial-reporting",
    pageUrl: "/courses/financial-reporting",
    description: "إعداد التقارير المالية وفقاً للمعايير الدولية IFRS مع التطبيقات العملية",
    category: "المحاسبة المالية",
    level: "متقدم",
    duration: "16 أسبوع",
    lessons: 18,
    price: "$2,200",
    rating: 4.9,
    students: 2200,
    image: "/assets/Financial reporting course cover image.png",
    files: 23,
    videos: 36,
    audios: 14,
    modules: [
      {
        id: 1,
        title: "أهمية التقارير المالية",
        lessons: ["دور التقارير في اتخاذ القرارات", "المعايير الدولية IFRS", "مستخدمو التقارير"]
      },
      {
        id: 2,
        title: "أنواع التقارير المالية",
        lessons: ["القوائم المالية الأساسية", "التقارير المحاسبية الداخلية", "التقارير الإدارية"]
      },
      {
        id: 3,
        title: "إعداد التقارير",
        lessons: ["جمع البيانات والمعالجة", "التبويب والتصنيف", "المراجعة والتحقق"]
      },
      {
        id: 4,
        title: "أدوات التحليل",
        lessons: ["التحليل الأفقي والرأسي", "النسب المالية", "التحليل المالي المتقدم"]
      }
    ]
  },
  {
    id: 13,
    title: "التسويات الجردية والرقابة",
    slug: "inventory-reconciliations",
    pageUrl: "/courses/inventory-reconciliations",
    description: "إجراء التسويات الجردية وإدارة الرقابة الداخلية بكفاءة واحترافية عالية",
    category: "المحاسبة المالية",
    level: "متقدم",
    duration: "12 أسبوع",
    lessons: 15,
    price: "$1,600",
    rating: 4.6,
    students: 1500,
    image: "/assets/Inventory adjustments and internal control course cover.png",
    files: 19,
    videos: 30,
    audios: 11,
    modules: [
      {
        id: 1,
        title: "أساسيات التسويات الجردية",
        lessons: ["تعريف التسويات الجردية", "أهميتها في القوائم المالية", "مبدأ الاستحقاق"]
      },
      {
        id: 2,
        title: "أنواع التسويات",
        lessons: ["تسويات الإيرادات والمصروفات", "تسويات الأصول والخصوم", "تسويات خاصة"]
      },
      {
        id: 3,
        title: "المعالجات المحاسبية",
        lessons: ["تسجيل القيود المحاسبية", "إعداد ورقة العمل", "إعداد القوائم المعدلة"]
      },
      {
        id: 4,
        title: "الرقابة والتدقيق",
        lessons: ["نظم الرقابة الداخلية", "دور المراجعة الداخلية", "إدارة المخاطر"]
      }
    ]
  }
];

// ═══════════════════════════════════════════════════
// وظائف مساعدة للحصول على الكورسات
// ═══════════════════════════════════════════════════

/**
 * الحصول على جميع الكورسات
 */
export function getAllCourses(): Course[] {
  return allCourses;
}

/**
 * الحصول على كورس حسب المعرف
 */
export function getCourseById(id: number): Course | undefined {
  return allCourses.find(course => course.id === id);
}

/**
 * الحصول على كورس حسب الـ slug
 */
export function getCourseBySlug(slug: string): Course | undefined {
  return allCourses.find(course => course.slug === slug);
}

/**
 * الحصول على الكورسات حسب التصنيف
 */
export function getCoursesByCategory(category: string): Course[] {
  if (category === 'all') {
    return allCourses;
  }
  return allCourses.filter(course => course.category === category);
}

/**
 * الحصول على جميع التصنيفات مع عدد الكورسات في كل تصنيف
 */
export function getCategoriesWithCount(): Array<{ id: string; label: string; count: number }> {
  const categoryMap = new Map<string, number>();
  
  allCourses.forEach(course => {
    const count = categoryMap.get(course.category) || 0;
    categoryMap.set(course.category, count + 1);
  });
  
  const categories = Array.from(categoryMap.entries()).map(([category, count]) => ({
    id: category,
    label: category,
    count
  }));
  
  return [
    { id: 'all', label: 'جميع الدورات', count: allCourses.length },
    ...categories
  ];
}

/**
 * البحث في الكورسات
 */
export function searchCourses(query: string): Course[] {
  const lowerQuery = query.toLowerCase();
  return allCourses.filter(course =>
    course.title.toLowerCase().includes(lowerQuery) ||
    course.description.toLowerCase().includes(lowerQuery) ||
    course.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * ترتيب الكورسات
 */
export function sortCourses(
  courses: Course[],
  sortBy: 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high'
): Course[] {
  const sorted = [...courses];
  
  switch (sortBy) {
    case 'popular':
      return sorted.sort((a, b) => b.students - a.students);
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return sorted.sort((a, b) => b.id - a.id);
    case 'price-low':
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceA - priceB;
      });
    case 'price-high':
      return sorted.sort((a, b) => {
        const priceA = parseInt(a.price.replace(/[^0-9]/g, ''));
        const priceB = parseInt(b.price.replace(/[^0-9]/g, ''));
        return priceB - priceA;
      });
    default:
      return sorted;
  }
}

