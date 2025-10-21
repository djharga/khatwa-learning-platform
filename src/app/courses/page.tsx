'use client';

import { useState } from 'react';
import { Search, Grid3x3, List, ChevronDown, ChevronRight, BookOpen, Clock, Users, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CoursesPage() {
  // ═══════════════════════════════════════════════════
  // States
  // ═══════════════════════════════════════════════════

  const [viewMode, setViewMode] = useState<'grid' | 'tree'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCourses, setExpandedCourses] = useState<Set<number>>(new Set());

  // ═══════════════════════════════════════════════════
  // البيانات
  // ═══════════════════════════════════════════════════

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
      price: "1,200 ريال",
      rating: 4.8,
      students: 1500,
      image: "/courses/financial-foundation.jpg",
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
      category: "التحليل المالي",
      level: "متوسط",
      duration: "10 أسابيع",
      lessons: 12,
      price: "1,800 ريال",
      rating: 4.9,
      students: 2100,
      image: "/courses/financial-analysis.jpg",
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
      price: "1,500 ريال",
      rating: 4.7,
      students: 1800,
      image: "/courses/financial-reports.jpg",
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
      category: "المحاسبة",
      level: "متوسط",
      duration: "4 أسابيع",
      lessons: 6,
      price: "900 ريال",
      rating: 4.6,
      students: 1200,
      image: "/courses/bank-reconciliation.jpg",
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
      category: "إدارة المخازن",
      level: "متوسط",
      duration: "4 أسابيع",
      lessons: 6,
      price: "900 ريال",
      rating: 4.5,
      students: 1000,
      image: "/courses/inventory-reconciliation.jpg",
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
      category: "إدارة العمليات",
      level: "متوسط",
      duration: "6 أسابيع",
      lessons: 9,
      price: "1,200 ريال",
      rating: 4.7,
      students: 1400,
      image: "/courses/procurement.jpg",
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
      slug: "warehouse-management",
      description: "نظام متكامل لإدارة المخازن والمستودعات والتحكم في المخزون",
      category: "إدارة العمليات",
      level: "متوسط",
      duration: "5 أسابيع",
      lessons: 8,
      price: "1,100 ريال",
      rating: 4.6,
      students: 1300,
      image: "/courses/warehouse.jpg",
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
      category: "إدارة المطاعم",
      level: "متوسط",
      duration: "7 أسابيع",
      lessons: 10,
      price: "1,400 ريال",
      rating: 4.8,
      students: 1600,
      image: "/courses/restaurant.jpg",
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
    }
  ];

  const categories = [
    { id: 'all', label: 'جميع الدورات', count: courses.length },
    { id: 'المحاسبة المالية', label: 'المحاسبة المالية', count: 2 },
    { id: 'التحليل المالي', label: 'التحليل المالي', count: 1 },
    { id: 'المحاسبة', label: 'المحاسبة', count: 1 },
    { id: 'إدارة المخازن', label: 'إدارة المخازن', count: 1 },
    { id: 'إدارة العمليات', label: 'إدارة العمليات', count: 2 },
    { id: 'إدارة المطاعم', label: 'إدارة المطاعم', count: 1 }
  ];

  // ═══════════════════════════════════════════════════
  // Functions
  // ═══════════════════════════════════════════════════

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleCourseExpansion = (courseId: number) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  // ═══════════════════════════════════════════════════
  // JSX
  // ═══════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">الدورات التدريبية</h1>
          <p className="text-slate-600">اكتشف دوراتنا المتخصصة في المحاسبة والمراجعة الداخلية</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                aria-label="عرض شبكة"
              >
                <Grid3x3 className="w-4 h-4 ml-2" />
                شبكة
              </Button>
              <Button
                variant={viewMode === 'tree' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setViewMode('tree')}
                aria-label="عرض شجرة"
              >
                <List className="w-4 h-4 ml-2" />
                شجرة
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-slate-900 mb-4">التصنيفات</h3>
                <div className="space-y-2">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-right px-4 py-2 rounded-lg transition ${
                        selectedCategory === cat.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{cat.label}</span>
                        <span className={`text-sm ${selectedCategory === cat.id ? 'text-white' : 'text-slate-500'}`}>
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {viewMode === 'grid' ? (
              /* Grid View */
              <div className="grid md:grid-cols-2 gap-6">
                {filteredCourses.map(course => (
                  <Card key={course.id} className="hover:shadow-lg transition overflow-hidden">
                    <div className="relative h-48 bg-gradient-to-br from-primary to-secondary">
                      <div className="absolute top-3 right-3">
                        <span className="bg-white text-primary text-xs px-3 py-1 rounded-full font-medium">
                          {course.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{course.title}</h3>
                      <p className="text-slate-600 text-sm mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} درس</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{course.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">{course.price}</span>
                        <Button>التسجيل الآن</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Tree View */
              <div className="space-y-4">
                {filteredCourses.map(course => (
                  <Card key={course.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <button
                          onClick={() => toggleCourseExpansion(course.id)}
                          className="mt-1 text-slate-600 hover:text-primary transition"
                          aria-label={expandedCourses.has(course.id) ? "طي" : "توسيع"}
                        >
                          {expandedCourses.has(course.id) ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1">{course.title}</h3>
                              <span className="inline-block bg-primary-50 text-primary text-xs px-2 py-1 rounded">
                                {course.category}
                              </span>
                            </div>
                            <Button size="sm">التسجيل</Button>
                          </div>

                          <p className="text-slate-600 mb-3">{course.description}</p>

                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {course.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <BookOpen className="w-4 h-4" />
                              {course.lessons} درس
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {course.students} طالب
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {course.rating}
                            </span>
                          </div>

                          {/* Expanded Modules */}
                          {expandedCourses.has(course.id) && (
                            <div className="mt-6 pr-4 border-r-2 border-primary-200">
                              {course.modules.map(module => (
                                <div key={module.id} className="mb-4">
                                  <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-primary" />
                                    {module.title}
                                  </h4>
                                  <ul className="space-y-1 pr-6">
                                    {module.lessons.map((lesson, idx) => (
                                      <li key={idx} className="text-sm text-slate-600 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                        {lesson}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-600 text-lg">لم يتم العثور على دورات مطابقة</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
