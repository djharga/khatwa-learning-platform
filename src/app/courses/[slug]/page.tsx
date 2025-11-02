'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Clock, Users, Star, FileText, Video, Headphones, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';

// نسخ بيانات الدورات من صفحة courses/page.tsx
const courses = [
  {
    id: 1,
    title: "دورة التأسيس المالي",
    slug: "financial-foundation",
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

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courses.find(c => c.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>العودة إلى الدورات</span>
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                  {course.category}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  {course.title}
                </h1>
                <p className="text-xl text-white/90 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Star className="w-5 h-5 text-yellow-300 fill-current" />
                    <span className="text-white font-semibold">{course.rating}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Users className="w-5 h-5 text-white" />
                    <span className="text-white">{course.students.toLocaleString()} طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <Clock className="w-5 h-5 text-white" />
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg">
                    <span className="text-white font-bold">{course.price}</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{course.files}</div>
                    <div className="text-sm text-gray-600">ملف</div>
                  </div>
                  <div className="text-center">
                    <Video className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{course.videos}</div>
                    <div className="text-sm text-gray-600">فيديو</div>
                  </div>
                  <div className="text-center">
                    <Headphones className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{course.audios}</div>
                    <div className="text-sm text-gray-600">صوتي</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">محاور الدورة</h2>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: moduleIndex * 0.1 }}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 font-bold">{moduleIndex + 1}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-3">{module.title}</h3>
                          <ul className="space-y-2">
                            {module.lessons.map((lesson, lessonIndex) => (
                              <li key={lessonIndex} className="flex items-center gap-2 text-gray-600">
                                <ChevronRight className="w-4 h-4 text-blue-500" />
                                <span>{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">المستوى</h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      course.level === 'مبتدئ' ? 'bg-green-100 text-green-700' :
                      course.level === 'متوسط' ? 'bg-blue-100 text-blue-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">عدد الدروس</h3>
                    <p className="text-gray-600">{course.lessons} درس</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">المدة</h3>
                    <p className="text-gray-600">{course.duration}</p>
                  </div>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all">
                    سجل في الدورة الآن
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

