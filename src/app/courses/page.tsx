'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3x3, List, ChevronDown, ChevronRight, BookOpen, Clock, Users, Star, Link, GraduationCap, Shield, Building, Award, Calculator, Warehouse, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function CoursesPage() {
  // ═══════════════════════════════════════════════════
  // States
  // ═══════════════════════════════════════════════════

  const [viewMode, setViewMode] = useState<'tree'>('tree');
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
      price: "$1,200",
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
      price: "$1,800",
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
      price: "$1,500",
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
      price: "$900",
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
      price: "$900",
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
      price: "$1,200",
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
      price: "$1,100",
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
      price: "$1,400",
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
    },
    {
      id: 9,
      title: "أساسيات المالية والمحاسبة",
      slug: "finance-basics",
      description: "تعلم أساسيات المالية والمحاسبة من الصفر مع أمثلة عملية وحالات دراسية شاملة",
      category: "المالية والمحاسبة",
      level: "مبتدئ",
      duration: "20 أسبوع",
      lessons: 24,
      price: "$2,400",
      rating: 4.9,
      students: 2800,
      image: "/courses/finance-basics.jpg",
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
      category: "إدارة العمليات",
      level: "متوسط",
      duration: "16 أسبوع",
      lessons: 20,
      price: "$2,000",
      rating: 4.8,
      students: 1900,
      image: "/courses/procurement.jpg",
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
      category: "إدارة العمليات",
      level: "متوسط",
      duration: "16 أسبوع",
      lessons: 20,
      price: "$1,800",
      rating: 4.7,
      students: 1700,
      image: "/courses/warehouse.jpg",
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
      image: "/courses/financial-reporting.jpg",
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
      category: "المحاسبة",
      level: "متقدم",
      duration: "12 أسبوع",
      lessons: 15,
      price: "$1,600",
      rating: 4.6,
      students: 1500,
      image: "/courses/inventory-reconciliations.jpg",
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

  const categories = [
    { id: 'all', label: 'جميع الدورات', count: courses.length },
    { id: 'المحاسبة المالية', label: 'المحاسبة المالية', count: 3 },
    { id: 'التحليل المالي', label: 'التحليل المالي', count: 1 },
    { id: 'المحاسبة', label: 'المحاسبة', count: 2 },
    { id: 'إدارة المخازن', label: 'إدارة المخازن', count: 1 },
    { id: 'إدارة العمليات', label: 'إدارة العمليات', count: 3 },
    { id: 'إدارة المطاعم', label: 'إدارة المطاعم', count: 1 },
    { id: 'المالية والمحاسبة', label: 'المالية والمحاسبة', count: 1 }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative">
      {/* Page-specific background removed since it's now in layout */}
      {/* Page Header with Banner */}
      <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Banner Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/cours-banar.jpg')`,
          }}
        >
          {/* Overlay for better text readability - More transparent at bottom */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/70 via-slate-900/40 to-slate-900/20 backdrop-blur-[1px]"></div>
          {/* Additional gradient overlay for mobile - Less opaque at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-slate-900/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-in fade-in slide-in-from-top-4 duration-1000">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
              الدورات التدريبية
            </h1>
            <p className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg font-light">
              اكتشف دوراتنا المتخصصة في المحاسبة والمراجعة الداخلية مع أحدث الطرق التعليمية والمحتوى التفاعلي
            </p>

            {/* Stats with enhanced styling */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-white/20">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg"></div>
                <span className="font-semibold text-lg">محتوى محدث</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-white/20">
                <Users className="w-5 h-5 text-blue-300" />
                <span className="font-semibold text-lg">+15,000 طالب</span>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-xl border border-white/20">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span className="font-semibold text-lg">4.8 متوسط التقييم</span>
              </div>
            </div>

            {/* Call to Action Button */}
            <div className="mt-12">
              <motion.button
                onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md text-white font-bold rounded-2xl border border-white/30 shadow-2xl hover:shadow-white/20 transition-all duration-300 text-lg overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                <span className="relative flex items-center gap-3">
                  <GraduationCap className="w-6 h-6" />
                  استكشف الدورات
                  <ChevronDown className="w-5 h-5 group-hover/btn:translate-y-1 transition-transform duration-300" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>

      <div id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary transition-colors duration-300" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border border-slate-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 bg-slate-50/50 backdrop-blur-sm transition-all duration-300 text-slate-700 placeholder-slate-400"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>


          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <Card className="bg-white/90 backdrop-blur-md border border-white/20 shadow-xl animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-6 text-lg flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                  التصنيفات
                </h3>
                <div className="space-y-3">
                  {categories.map((cat, index) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full text-right px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        selectedCategory === cat.id
                          ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg transform scale-105'
                          : 'hover:bg-slate-50 hover:shadow-md hover:scale-102 text-slate-700'
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        selectedCategory === cat.id ? 'opacity-100' : ''
                      }`}></div>
                      <div className="relative flex items-center justify-between">
                        <span className="font-medium">{cat.label}</span>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          selectedCategory === cat.id
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {cat.count}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Stats Section */}
                <div className="mt-8 pt-6 border-t border-slate-200/60">
                  <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">إحصائيات سريعة</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">إجمالي الدورات</span>
                      <span className="font-bold text-slate-900">{courses.length}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">إجمالي الطلاب</span>
                      <span className="font-bold text-slate-900">
                        {courses.reduce((sum, course) => sum + course.students, 0).toLocaleString('ar-SA')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">متوسط التقييم</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="font-bold text-slate-900">
                          {(courses.reduce((sum, course) => sum + course.rating, 0) / courses.length).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Tree View Only - Enhanced */}
            <div className="space-y-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card className="hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-200/60 bg-white/90 backdrop-blur-sm overflow-hidden">
                    <CardContent className="p-8">
                      <div className="flex items-start gap-6">
                        <motion.button
                          onClick={() => toggleCourseExpansion(course.id)}
                          className="mt-2 text-slate-600 hover:text-primary transition-colors duration-300 p-2 rounded-lg hover:bg-slate-100 shadow-sm"
                          aria-label={expandedCourses.has(course.id) ? "طي" : "توسيع"}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <AnimatePresence mode="wait">
                            {expandedCourses.has(course.id) ? (
                              <motion.div
                                key="down"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-6 h-6" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="right"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronRight className="w-6 h-6" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-6">
                            <div className="space-y-3">
                              <h3 className="text-2xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors leading-tight">{course.title}</h3>
                              <div className="flex items-center gap-3">
                                <span className={`inline-block px-4 py-2 text-sm font-bold rounded-full shadow-md ${
                                  course.level === 'مبتدئ' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' :
                                  course.level === 'متوسط' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' :
                                  'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                }`}>
                                  {course.level}
                                </span>
                                <span className="inline-block bg-slate-100 text-slate-700 text-sm px-4 py-2 rounded-full font-medium shadow-sm">
                                  {course.category}
                                </span>
                              </div>
                            </div>
                            <motion.button
                              onClick={() => window.location.href = `/courses/${course.slug}`}
                              className="group/btn relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 text-lg"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                              <span className="relative">التسجيل الآن</span>
                            </motion.button>
                          </div>

                          <p className="text-slate-600 mb-6 leading-relaxed text-lg">{course.description}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                            <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Clock className="w-5 h-5 text-slate-500" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{course.duration}</div>
                                <div className="text-sm text-slate-500">المدة</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <BookOpen className="w-5 h-5 text-slate-500" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{course.lessons} درس</div>
                                <div className="text-sm text-slate-500">المحتوى</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Users className="w-5 h-5 text-slate-500" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{course.students.toLocaleString('ar-SA')}</div>
                                <div className="text-sm text-slate-500">الطلاب</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-600">
                              <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{course.rating}</div>
                                <div className="text-sm text-slate-500">التقييم</div>
                              </div>
                            </div>
                          </div>

                          {/* Price Display */}
                          <div className="flex items-center justify-between mb-6 p-4 bg-slate-50 rounded-xl">
                            <div>
                              <div className="text-3xl font-bold text-slate-900 mb-1">{course.price}</div>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>شهادة إتمام معتمدة</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-slate-500 mb-1">شامل الضريبة</div>
                              <div className="text-sm text-slate-500">✓ مدى الحياة ✓ دعم فني ✓ تحديثات مجانية</div>
                            </div>
                          </div>

                          {/* Expanded Modules - Enhanced Tree Structure */}
                          <AnimatePresence>
                            {expandedCourses.has(course.id) && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="mt-8 overflow-hidden"
                              >
                                <div className="border-r-4 border-primary-300 pr-8 ml-8 bg-slate-50/50 rounded-l-2xl p-6">
                                  {course.modules.map((module, moduleIndex) => (
                                    <motion.div
                                      key={module.id}
                                      initial={{ opacity: 0, x: -30 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: moduleIndex * 0.15, duration: 0.4 }}
                                      className="mb-8 relative"
                                    >
                                      {/* Module connector line */}
                                      <div className="absolute -left-8 top-4 w-6 h-1 bg-primary-400 rounded-full"></div>

                                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-4 text-xl">
                                        <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                                          <BookOpen className="w-6 h-6 text-white" />
                                        </div>
                                        {module.title}
                                      </h4>

                                      <ul className="space-y-3 pr-8">
                                        {module.lessons.map((lesson, lessonIndex) => (
                                          <motion.li
                                            key={lessonIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (moduleIndex * 0.15) + (lessonIndex * 0.08), duration: 0.3 }}
                                            className="text-slate-700 flex items-center gap-4 relative text-base leading-relaxed"
                                          >
                                            {/* Lesson connector dot */}
                                            <div className="absolute -left-10 top-3 w-3 h-3 bg-primary-500 rounded-full shadow-sm"></div>
                                            <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 shadow-sm"></div>
                                            <span>{lesson}</span>
                                          </motion.li>
                                        ))}
                                      </ul>
                                    </motion.div>
                                  ))}
                                </div>

                                {/* Course Actions in Tree View */}
                                <motion.div
                                  initial={{ opacity: 0, y: 30 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.6, duration: 0.4 }}
                                  className="mt-8 pt-8 border-t-2 border-slate-200"
                                >
                                  <div className="flex flex-wrap gap-4">
                                    <button
                                      onClick={() => window.location.href = `/courses/${course.slug}/preview`}
                                      className="group/btn relative inline-flex items-center justify-center px-6 py-3 border-2 border-slate-200/60 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-primary/50 transition-all duration-300 text-base overflow-hidden shadow-md hover:shadow-lg"
                                    >
                                      <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                                      <span className="relative">معاينة مجانية</span>
                                    </button>
                                    <button
                                      onClick={() => window.location.href = `/courses/${course.slug}/curriculum`}
                                      className="group/btn relative inline-flex items-center justify-center px-6 py-3 border-2 border-slate-200/60 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-primary/50 transition-all duration-300 text-base overflow-hidden shadow-md hover:shadow-lg"
                                    >
                                      <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                                      <span className="relative">المنهج التعليمي</span>
                                    </button>
                                    <button
                                      onClick={() => window.location.href = `/courses/${course.slug}/reviews`}
                                      className="group/btn relative inline-flex items-center justify-center px-6 py-3 border-2 border-slate-200/60 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 hover:border-primary/50 transition-all duration-300 text-base overflow-hidden shadow-md hover:shadow-lg"
                                    >
                                      <span className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                                      <span className="relative">التقييمات</span>
                                    </button>
                                  </div>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

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
