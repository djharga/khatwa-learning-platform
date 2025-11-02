'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3x3, List, ChevronDown, ChevronRight, BookOpen, Clock, Users, Star, Link, GraduationCap, Shield, Building, Award, Calculator, Warehouse, TrendingUp, Download, Play, FileText, Video, Headphones, CheckCircle, ArrowLeft, Share2, Heart, Sparkles, Target, Grid } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';

export default function CoursesPage() {
  const router = useRouter();

  // ═══════════════════════════════════════════════════
  // States
  // ═══════════════════════════════════════════════════

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCourses, setExpandedCourses] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<string>('popular');

  // ═══════════════════════════════════════════════════
  // البيانات
  // ═══════════════════════════════════════════════════

  const courses = [
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

  const categories = [
    { id: 'all', label: 'جميع الدورات', count: courses.length },
    { id: 'المحاسبة المالية', label: 'المحاسبة المالية', count: courses.filter(c => c.category === 'المحاسبة المالية').length },
    { id: 'التحليل والتخطيط المالي', label: 'التحليل والتخطيط المالي', count: courses.filter(c => c.category === 'التحليل والتخطيط المالي').length },
    { id: 'سلاسل الإمداد', label: 'سلاسل الإمداد', count: courses.filter(c => c.category === 'سلاسل الإمداد').length },
    { id: 'إدارة وتشغيل المطاعم', label: 'إدارة وتشغيل المطاعم', count: courses.filter(c => c.category === 'إدارة وتشغيل المطاعم').length }
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
            backgroundImage: "url('/assets/Professional educational platform hero banner.png')",
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
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow-lg font-light">
              اكتشف دوراتنا المتخصصة في المحاسبة والمراجعة الداخلية مع أحدث الطرق التعليمية والمحتوى التفاعلي
            </p>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/20 hover:bg-white/15 transition-all"
              >
                <Users className="w-8 h-8 text-primary-300 mb-1" />
                <div className="text-3xl font-bold text-white">15,420</div>
                <div className="text-sm text-white/80 font-medium">طالب نشط</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/20 hover:bg-white/15 transition-all"
              >
                <Star className="w-8 h-8 text-warning-300 fill-current mb-1" />
                <div className="text-3xl font-bold text-white">4.8</div>
                <div className="text-sm text-white/80 font-medium">متوسط التقييم</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/20 hover:bg-white/15 transition-all"
              >
                <BookOpen className="w-8 h-8 text-success-300 mb-1" />
                <div className="text-3xl font-bold text-white">15+</div>
                <div className="text-sm text-white/80 font-medium">دورة متخصصة</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 shadow-xl border border-white/20 hover:bg-white/15 transition-all"
              >
                <Award className="w-8 h-8 text-secondary-innovate-300 mb-1" />
                <div className="text-3xl font-bold text-white">95%</div>
                <div className="text-sm text-white/80 font-medium">معدل الرضا</div>
              </motion.div>
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
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-primary-400/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      </div>


      <div id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative w-full group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500 group-focus-within:text-primary-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/40 bg-neutral-50/50 dark:bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

          </div>
        </div>

        {/* Modern Tabs Navigation */}
        <div className="mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <ModernTabs
              tabs={categories.map((cat) => ({
                id: cat.id,
                label: cat.label,
                count: cat.count > 0 ? cat.count : undefined,
              }))}
              activeTab={selectedCategory}
              onChange={setSelectedCategory}
              variant="underline"
              size="lg"
              fullWidth={false}
              className="bg-transparent border-0 shadow-none p-0"
            />
          </div>
        </div>

        {/* View Controls & Sort - NEW */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`
                px-4 py-2 rounded-md transition-all
                ${viewMode === 'grid' 
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              className={`
                px-4 py-2 rounded-md transition-all
                ${viewMode === 'list' 
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Sort & Results */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              عرض <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredCourses.length}</span> دورة
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value="popular">الأكثر شعبية</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="newest">الأحدث</option>
              <option value="price-low">الأقل سعراً</option>
              <option value="price-high">الأعلى سعراً</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <main>
            {/* Grid View - Horizontal Cards */}
            <div className="space-y-12">
              {/* Group courses by category */}
              {categories.filter(cat => cat.id !== 'all').map((category) => {
                const categoryCourses = filteredCourses.filter(course => course.category === category.id);
                if (categoryCourses.length === 0) return null;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                      {category.label}
                    </h2>
                    
                    <div className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1'
                    }`}>
                      {categoryCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <Card className={`h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-neutral-200/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-900 overflow-hidden flex ${
                            viewMode === 'list' ? 'flex-row' : 'flex-col'
                          } group/card rounded-xl`}>
                            {/* Course Image */}
                            <div className={`relative overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 ${
                              viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'h-48 w-full'
                            }`}>
                              <img 
                                src={course.image} 
                                alt={course.title}
                                className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                              <div className="absolute top-3 right-3">
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${
                                  course.level === 'مبتدئ' ? 'bg-success-500/90 text-white' :
                                  course.level === 'متوسط' ? 'bg-primary-500/90 text-white' :
                                  'bg-secondary-innovate-500/90 text-white'
                                }`}>
                                  {course.level}
                                </span>
                              </div>
                            </div>

                            <CardContent className={`flex-1 flex flex-col ${viewMode === 'list' ? 'p-6' : 'p-4'}`}>
                              {/* Title */}
                              <h3 className={`font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors ${
                                viewMode === 'list' ? 'text-xl mb-3' : 'text-base line-clamp-2'
                              }`}>
                                {course.title}
                              </h3>

                              {/* Description - List View Only */}
                              {viewMode === 'list' && (
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                                  {course.description}
                                </p>
                              )}

                              {/* Stats Row */}
                              <div className={`flex items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400 ${
                                viewMode === 'list' ? 'mb-4' : 'mb-3'
                              }`}>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-warning-400 fill-current" />
                                  <span className="font-semibold">{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{course.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.duration}</span>
                                </div>
                              </div>

                              {/* Content Files Info */}
                              <div className={`flex items-center gap-4 mb-4 text-xs text-neutral-500 dark:text-neutral-500 ${
                                viewMode === 'list' ? 'mb-4' : 'mb-3'
                              }`}>
                                <div className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  <span>{course.files} ملف</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Video className="w-3 h-3" />
                                  <span>{course.videos} فيديو</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Headphones className="w-3 h-3" />
                                  <span>{course.audios} صوتي</span>
                                </div>
                              </div>

                              {/* Price and Buttons */}
                              <div className={`space-y-3 mt-auto ${viewMode === 'list' ? 'flex flex-row items-center justify-between' : ''}`}>
                                <div className={`font-bold text-primary ${viewMode === 'list' ? 'text-2xl' : 'text-lg text-center'}`}>
                                  {course.price}
                                </div>
                                <motion.button
                                  onClick={() => router.push(course.pageUrl)}
                                  className={`group/btn relative inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-innovate-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                                    viewMode === 'list' ? 'px-6 py-3 text-base' : 'w-full px-4 py-2.5 text-sm'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="relative flex items-center gap-2">
                                    <span>ابدأ الآن</span>
                                    <ChevronRight className={`${viewMode === 'list' ? 'w-5 h-5' : 'w-4 h-4'}`} />
                                  </span>
                                </motion.button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">لم يتم العثور على دورات مطابقة</p>
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
  );
}
