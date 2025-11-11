'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
import Link from 'next/link';
import {
  BookOpen,
  Shield,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronRight,
  Award,
  Clock,
  Star,
  Play,
  Download,
  Eye,
  Lock,
  Search,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { generateStructuredData } from '@/lib/seo';
import PageBackground from '@/components/ui/PageBackground';
import CourseAxesSystem from '@/components/course-details/CourseAxesSystem';

const InternalAuditPage = () => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());
  const [showHelpTooltip, setShowHelpTooltip] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      // Could track analytics here
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const auditLevels = [
    {
      id: 1,
      title: 'المستوى الأول - التأسيس (Foundation)',
      description: 'أساسيات المراجعة الداخلية والمفاهيم الأولية',
      progress: 65,
      color: 'from-blue-500 to-blue-600',
      modules: [
        {
          title: 'المحور الأول: أساسيات المراجعة الداخلية',
          description: 'مقدمة شاملة لفهم المراجعة الداخلية ومبادئها',
          progress: 70,
          topics: [
            'تعريف وأهداف المراجعة الداخلية',
            'المفهوم والدور الاستراتيجي للمراجعة الداخلية',
            'المعايير والكفاءات المطلوبة',
            'منهجية التدقيق',
            'أخلاقيات المهنة',
            'أدلة إدارة المراجعة الداخلية',
            'ميثاق المراجعة الداخلية',
            'هيكل الإدارة - الصلاحيات - المسؤوليات'
          ],
          duration: '4 أسابيع',
          lessons: 12
        },
        {
          title: 'الإطار التنظيمي والأنظمة',
          topics: [
            'الأنظمة واللوائح المنظمة للمراجعة الداخلية',
            'الإطار التنظيمي للمراجعة',
            'القوانين واللوائح المتعلقة',
            'الهيئات التنظيمية'
          ],
          duration: '3 أسابيع',
          lessons: 8
        },
        {
          title: 'المحور الثاني: إدارة المخاطر',
          description: 'فهم وتقييم وإدارة المخاطر',
          progress: 60,
          topics: [
            'تحديد المخاطر',
            'طرق تحديد وتصنيف المخاطر',
            'تقييم المخاطر',
            'مفهوم المراجعة المبنية على المخاطر',
            'مصفوفة المخاطر (Risk Matrix)',
            'إعداد خطة المراجعة السنوية',
            'خطوات إعداد الخطة خطوة بخطوة',
            'مراجعة الخطة وتحديثها'
          ],
          duration: '4 أسابيع',
          lessons: 10
        },
        {
          title: 'إعداد برنامج المراجعة',
          topics: [
            'خطوات إعداد البرنامج',
            'النطاق والعمل التنفيذي',
            'أوراق العمل (Workpapers)',
            'التوثيق والاعتماد'
          ],
          duration: '2 أسابيع',
          lessons: 6
        },
        {
          title: 'تنفيذ إجراءات المراجعة',
          topics: [
            'جمع الأدلة والمستندات',
            'أساليب وأدوات المراجعة',
            'توثيق النتائج',
            'التحقق من الضوابط الداخلية'
          ],
          duration: '3 أسابيع',
          lessons: 9
        },
        {
          title: 'تحليل النتائج وتقييم المخاطر',
          topics: [
            'التمييز بين الملاحظة، النتيجة، والاستنتاج',
            'تقييم فعالية الرقابة الداخلية',
            'ربط النتائج بالأهداف الاستراتيجية'
          ],
          duration: '2 أسابيع',
          lessons: 7
        },
        {
          title: 'إعداد التقارير',
          topics: [
            'مكونات تقرير المراجعة',
            'الصياغة الموضوعية والحيادية',
            'التقارير التفصيلية مقابل المختصرة'
          ],
          duration: '2 أسابيع',
          lessons: 6
        },
        {
          title: 'متابعة تنفيذ التوصيات',
          topics: [
            'آلية خطة العمل لتنفيذ التوصيات',
            'تحديد المسؤوليات والجدول الزمني',
            'رفع تقارير المتابعة الدورية'
          ],
          duration: '2 أسابيع',
          lessons: 5
        },
        {
          title: 'التحضير لمقابلات العمل للمراجعين الداخليين',
          topics: [
            'المهارات المطلوبة في مقابلات المراجعة الداخلية',
            'إعداد السيرة الذاتية المهنية',
            'الأسئلة الشائعة في مقابلات المراجعين',
            'نماذج المقابلات العملية',
            'نصائح للنجاح في مقابلات المراجعة الداخلية'
          ],
          duration: '2 أسابيع',
          lessons: 6
        }
      ]
    },
    {
      id: 2,
      title: 'المستوى الثاني - الريادة (Leadership)',
      description: 'التطبيق العملي والأدوات المتقدمة',
      progress: 40,
      color: 'from-purple-500 to-purple-600',
      modules: [
        {
          title: 'إطار COSO العالمي',
          topics: [
            'تصميم وتقييم أنظمة الرقابة الداخلية',
            'حماية الأصول',
            'دقة التقارير المالية',
            'ضمان الالتزام بالقوانين'
          ],
          duration: '6 أسابيع',
          lessons: 16
        },
        {
          title: 'التقييم المستمر وتحسين الأداء',
          topics: [
            'مراقبة الجودة (أدوات التقييم الذاتي - مراجعة خارجية)',
            'تحديد الفجوات في الأداء',
            'خطط تطوير الكفاءات المهنية'
          ],
          duration: '4 أسابيع',
          lessons: 10
        },
        {
          title: 'أدوات المراجعة المتقدمة',
          topics: [
            'استخدام التقنيات والأدوات الحديثة في المراجعة',
            'تحليل البيانات في المراجعة',
            'كيفية استخدام تحليل البيانات',
            'أدوات تحليل البيانات',
            'مراجعة نظم وأمن المعلومات (IT Audit)',
            'تقييم ضوابط الوصول للأنظمة',
            'مراجعة التطبيقات والبرامج',
            'تحليل البيانات باستخدام (ACL, IDEA, Power BI)',
            'الحوكمة الرقمية والامتثال التقني'
          ],
          duration: '8 أسابيع',
          lessons: 20
        },
        {
          title: 'منهجية COBIT لحوكمة تكنولوجيا المعلومات',
          topics: [
            'ربط الأهداف التقنية بالأهداف التشغيلية',
            'علاقة COBIT و COSO في الرقابة الداخلية'
          ],
          duration: '5 أسابيع',
          lessons: 12
        },
        {
          title: 'الاحتيال (Fraud Management)',
          topics: [
            'أنواع الاحتيال (المالي، التشغيلي، الإلكتروني)',
            'تحليل مخاطر الاحتيال',
            'تقييم ضوابط الوقاية والكشف',
            'سياسات مكافحة الاحتيال',
            'آليات الإبلاغ والحماية',
            'إعداد تقارير التحقيقات الداخلية'
          ],
          duration: '6 أسابيع',
          lessons: 15
        },
        {
          title: 'الحوكمة المخاطر الامتثال (GRC)',
          topics: [
            'تصميم وتنفيذ برامج الحوكمة المتكاملة',
            'دمج الحوكمة مع إدارة الرقابة والمخاطر',
            'الحوكمة الرقمية والالتزام بالقوانين واللوائح'
          ],
          duration: '7 أسابيع',
          lessons: 18
        },
        {
          title: 'حالات عملية متقدمة',
          topics: [
            'أمثلة واقعية من الصناعات المختلفة',
            'تدريب جماعي وتحليل مواقف',
            'محاكاة جلسات مراجعة حقيقية'
          ],
          duration: '5 أسابيع',
          lessons: 13
        },
        {
          title: 'الدليل العملي للنماذج التشغيلية',
          topics: [
            'أدلة وسياسات وإجراءات شاملة',
            'نماذج إدارات ومصفوفة صلاحيات',
            'خطط مراجعة سنوية وربعية',
            'مؤشرات الأداء الرئيسية (KPIS)',
            'نماذج التقييم والمتابعة'
          ],
          duration: '6 أسابيع',
          lessons: 15
        }
      ]
    },
    {
      id: 3,
      title: 'المستوى الثالث - تطوير الكفاءات المتكاملة',
      description: 'المعايير الدولية والقيادة الإستراتيجية',
      progress: 15,
      color: 'from-green-500 to-green-600',
      modules: [
        {
          title: 'المهارات المالية لغير الماليين',
          topics: [
            'فهم القوائم المالية الأساسية (الدخل، الميزانية، التدفقات)',
            'مؤشرات الأداء المالي والتشغيلي',
            'التحليل المبسط وربط النتائج بالمخاطر التشغيلية',
            'النسب المالية الأساسية وتفسيرها'
          ],
          duration: '8 أسابيع',
          lessons: 20
        },
        {
          title: 'المعايير الدولية للمراجعة الداخلية',
          topics: [
            'معايير IIA',
            'المعايير الدولية للمراجعين الداخليين',
            'تطبيق المعايير الدولية',
            'كيفية تطبيق المعايير في الواقع',
            'المصطلحات المالية والإدارية والمحاسبية الأساسية',
            'إعداد عروض PowerPoint احترافية للمراجعة',
            'استخدام Excel المتقدم لتحليل البيانات',
            'استخدام Power BI للإعداد التقارير التفاعلية',
            'اللغة الإنجليزية في سياق المراجعة الداخلية'
          ],
          duration: '10 أسابيع',
          lessons: 25
        },
        {
          title: 'مهارات الإقناع والتفاوض وكتابة التقارير',
          topics: [
            'فن إقناع الإدارة بجدوى التوصيات',
            'استخدام البيانات والأدلة لصياغة الآراء المهنية',
            'التواصل الفعال مع الأنماط المختلفة من الشخصيات',
            'التفاوض البناء وإدارة الاعتراضات باحترافية',
            'التأثير في عملية اتخاذ القرارات',
            'دعم سياسات الشركة وتوصيل رسائل الإدارة',
            'كتابة التقارير المؤثرة والواضحة',
            'تقنيات العرض والتقديم المؤثر'
          ],
          duration: '12 أسابيع',
          lessons: 30
        }
      ]
    }
  ];

  const currentLevel = auditLevels.find(level => level.id === activeLevel);

  // تحويل البيانات إلى تنسيق نظام المحاور
  const convertModulesToAxes = () => {
    if (!currentLevel?.modules) return [];
    
    // تجميع المحاور الرئيسية (التي تبدأ بـ "المحور")
    const mainAxesMap = new Map<string, any>();
    
    currentLevel.modules.forEach((module) => {
      // التحقق إذا كان المحور يبدأ بـ "المحور"
      const isMainAxis = module.title.includes('المحور') && module.title.includes(':');
      
      if (isMainAxis) {
        // استخراج اسم المحور الرئيسي
        const mainAxisTitle = module.title.split(':')[0].trim();
        const subAxisTitle = module.title.split(':')[1]?.trim() || module.title;
        
        if (!mainAxesMap.has(mainAxisTitle)) {
          mainAxesMap.set(mainAxisTitle, {
            id: `main-${mainAxisTitle}`,
            title: mainAxisTitle,
            description: module.description,
            subAxes: [],
          });
        }
        
        // إضافة المحور الفرعي
        const mainAxis = mainAxesMap.get(mainAxisTitle);
        mainAxis.subAxes.push({
          id: `sub-${module.title}`,
          title: subAxisTitle,
          description: module.description,
          files: module.topics.map((topic, index) => ({
            id: `file-${module.title}-${index}`,
            name: topic,
            type: 'pdf' as const,
            size: '2 MB',
            isProtected: false,
          })),
        });
      } else {
        // إذا لم يكن محور رئيسي، نضعه كمحور رئيسي منفصل
        const mainAxisId = `main-${module.title}`;
        if (!mainAxesMap.has(mainAxisId)) {
          mainAxesMap.set(mainAxisId, {
            id: mainAxisId,
            title: module.title,
            description: module.description,
            subAxes: [{
              id: `sub-${module.title}`,
              title: module.title,
              description: module.description,
              files: module.topics.map((topic, index) => ({
                id: `file-${module.title}-${index}`,
                name: topic,
                type: 'pdf' as const,
                size: '2 MB',
                isProtected: false,
              })),
            }],
          });
        }
      }
    });
    
    return Array.from(mainAxesMap.values());
  };

  const mainAxes = convertModulesToAxes();

  // Generate structured data for SEO
  const structuredData = generateStructuredData('course', {
    name: 'برنامج زمالة المراجعين الداخليين',
    description: 'رحلة شاملة لتطوير الكفاءات المهنية في المراجعة الداخلية من المبتدئ إلى الخبير المتخصص',
    provider: {
      '@type': 'Organization',
      name: 'خطى للتدريب والاستشارات',
    },
    courseCode: 'internal-audit-fellowship',
    educationalLevel: 'متقدم',
  });

  return (
    <>
      {/* SEO Structured Data */}
      <Script
        id="internal-audit-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageBackground variant="courses">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          {/* Modern & Simple Hero Section */}
          <div className="relative rounded-3xl overflow-hidden mb-12">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/assets/internal-audit-hero.jpg)',
              }}
            >
              {/* Dark Overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/70 to-indigo-900/80" />
              
              {/* Additional gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
            
            {/* Background Glow Effects */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 text-center max-w-5xl mx-auto py-16 lg:py-24 px-6"
            >
              {/* Badge - Simple & Elegant */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full mb-8 border border-white/30 shadow-lg"
              >
                <Shield className="w-5 h-5 text-white" />
                <span className="text-white font-semibold text-sm md:text-base">
                  المراجعة الداخلية
                </span>
              </motion.div>

              {/* Main Title - Clean & Bold */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-2xl"
              >
                <span className="block">برنامج زمالة المراجعين الداخليين</span>
              </motion.h1>

              {/* Subtitle - Gradient */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-8"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white drop-shadow-lg">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    3 مستويات متكاملة
                  </span>
                </h2>
              </motion.div>

              {/* Description - Simple & Clear */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-medium mb-12 drop-shadow-lg"
              >
                رحلة شاملة لتطوير الكفاءات المهنية في المراجعة الداخلية من المبتدئ إلى الخبير المتخصص
              </motion.p>
            </motion.div>
          </div>

          {/* المحتوى التعريفي الإلزامي - Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12 mb-8 text-right max-w-5xl mx-auto shadow-xl border border-blue-100"
            >
              <div className="space-y-6 text-gray-800 leading-relaxed">
                {/* المقطع الافتتاحي - كسر الحواجز */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="border-r-4 border-blue-500 pr-6 bg-white/50 rounded-lg p-6"
                >
                  <p className="text-xl font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <Zap className="w-6 h-6" />
                    كسر الحواجز التقليدية
                  </p>
                  <p className="text-lg leading-relaxed">
                    مهنة المراجعة الداخلية لم تعد حكراً على متخصصين محددين – إنها فرصة حقيقية لأي شخص يسعى لتطوير مساره المهني، حتى لو كنت تفكر في تغيير تخصصك الحالي او تطوير تخصصك واكتساب مهارات مطلوبة لسوق العمل.
                  </p>
                </motion.div>

                {/* المقطع الثاني - التعريف الاستراتيجي */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="border-r-4 border-green-500 pr-6 bg-white/50 rounded-lg p-6"
                >
                  <p className="text-xl font-semibold text-green-700 mb-2 flex items-center gap-2">
                    <Eye className="w-6 h-6" />
                    عين الإدارة اليقظة
                  </p>
                  <p className="text-lg leading-relaxed">
                    المراجعة الداخلية اليوم هي عين الإدارة اليقظة، التي ترى ما وراء الأرقام والبيانات، وتكشف المخاطر قبل أن تتحول إلى أزمات، وتحوّلها إلى فرص للتحسين والابتكار. إنها الشريك الصامت الذي يحمي مسيرة المؤسسة، ويقودها نحو التميز.
                  </p>
                </motion.div>

                {/* المقطع الثالث - شرح الشراكة */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="border-r-4 border-purple-500 pr-6 bg-white/50 rounded-lg p-6"
                >
                  <p className="text-xl font-semibold text-purple-700 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-6 h-6" />
                    الشراكة التكاملية
                  </p>
                  <p className="text-lg mb-3 leading-relaxed">
                    المراجعة الداخلية والمراجع الداخلي… شراكة تصنع التفوق المؤسسي. معًا يشكلان قوة استراتيجية تدعم استقرار مؤسستك وتدفعها نحو الريادة. فالمراجعة الداخلية تمنحك الحماية والشفافية، بينما يحوّل المراجع الداخلي المحترف هذه الحماية إلى قيمة مستدامة تضمن التميز وتبقي مؤسستك دائمًا في موقع المبادرة، مستبقة للمخاطر، وسبّاقة لاغتنام الفرص.
                  </p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1 }}
                    className="text-base font-medium text-purple-700 bg-purple-50 p-4 rounded-lg border-r-4 border-purple-600"
                  >
                    إن الاستثمار في بناء منظومة مراجعة داخلية قوية، وتطوير كفاءات المراجع الداخلي، ليس رفاهية أو خيارًا تكميليًا… بل قرار استراتيجي يحمي أعمالك اليوم ويصنع نجاحك المستقبلي.
                  </motion.div>
                </motion.div>

                {/* المقطع الرابع - تعريف المراجع الحديث */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="border-r-4 border-orange-500 pr-6 bg-white/50 rounded-lg p-6"
                >
                  <p className="text-xl font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    المراجع الداخلي: قيمة مضافة لا تُقدّر بثمن
                  </p>
                  <p className="text-lg mb-4 leading-relaxed">
                    المراجع الداخلي هو قيمة مضافة لا تُقدّر بثمن، وشريك استراتيجي للإدارة في رسم ملامح المستقبل. ليس مجرد مدقق يركز على الأخطاء، بل رائد يساهم بفعالية في:
                  </p>
                  <ul className="space-y-2 text-base">
                    {[
                      'الكشف المبكر وتحليل المخاطر قبل أن تتحول إلى أزمات.',
                      'تقييم كفاءة وفعالية الضوابط الداخلية لضمان حماية المؤسسة.',
                      'تقديم توصيات عملية ومبتكرة تعزز الأداء وتحقق التحسين المستمر.',
                      'دعم الإدارة في تحقيق أهدافها الاستراتيجية بكفاءة وثقة.',
                    ].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + index * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* المقطع الخامس - عامل الاستعجال */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 }}
                  className="border-r-4 border-red-500 pr-6 bg-white/50 rounded-lg p-6"
                >
                  <p className="text-xl font-semibold text-red-700 mb-2 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    التأمين المستدام لمستقبل أعمالك
                  </p>
                  <p className="text-lg leading-relaxed">
                    الاستثمار في تطوير قدرات المراجعة الداخلية يعني أكثر من حماية الأصول… إنه تأمين مستدام لمستقبل أعمالك. فالمراجع الداخلي المحترف يحول كل تقرير إلى خطة إنقاذ وتحسين فعّالة، تجعلك دائمًا على أتم الاستعداد لمواجهة التحديات. المستقبل لا ينتظر أحدًا، ومن يتأخر في بناء منظومة مراجعة قوية سيواجه تكاليف مضاعفة.
                  </p>
                </motion.div>

                {/* المقطع الختامي - CTA */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.7 }}
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white p-8 rounded-2xl text-center shadow-2xl"
                >
                  <p className="text-2xl md:text-3xl font-bold mb-2 text-white">احترف مهنة المراجعة الداخلية بالتدريب العملى</p>
                  <p className="text-lg text-white">ابدأ رحلتك نحو التميز المهني اليوم</p>
                </motion.div>
              </div>
            </motion.div>

          {/* Enhanced Level Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {auditLevels.map((level) => (
                <motion.button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id as 1 | 2 | 3)}
                  className={`p-6 rounded-3xl border-2 transition-all text-right relative overflow-hidden cursor-pointer ${
                    activeLevel === level.id
                      ? `border-transparent bg-gradient-to-br ${level.color} text-white shadow-2xl scale-105`
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-xl'
                  }`}
                  whileHover={{ scale: activeLevel === level.id ? 1.05 : 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                >
                  {/* Background Pattern */}
                  {activeLevel === level.id && (
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                  )}

                  <div className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shadow-lg ${
                        activeLevel === level.id
                          ? 'bg-white/20 backdrop-blur-sm text-white'
                          : `bg-gradient-to-br ${level.color} text-white`
                      }`}>
                        {level.id}
                      </div>
                      <div className="flex-1 mr-3">
                        <h3 className={`text-2xl font-bold mb-1 ${activeLevel === level.id ? 'text-white' : ''}`}>{level.title}</h3>
                        <p className={`text-base ${activeLevel === level.id ? 'text-white' : 'text-gray-600'}`}>
                          {level.description}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-base font-semibold">
                        <span>التقدم</span>
                        <span className="font-extrabold text-xl">{level.progress}%</span>
                      </div>
                      <div className={`w-full rounded-full h-2.5 ${
                        activeLevel === level.id ? 'bg-white/20' : 'bg-gray-200'
                      }`}>
                        <motion.div
                          className={`h-2.5 rounded-full ${
                            activeLevel === level.id ? 'bg-white' : `bg-gradient-to-r ${level.color}`
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${level.progress}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>


          {/* نظام المحاور التعليمية */}
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-neutral-200 dark:border-neutral-700">
            <CourseAxesSystem
              mainAxes={mainAxes}
              hasAccess={false}
              courseId="internal-audit" // يمكن تغييره إلى courseId الفعلي إذا كان متاحاً
              onFileClick={(file) => {
                console.log('File clicked:', file);
                // Handle file click
              }}
            />
          </div>
        </div>
      </PageBackground>
    </>
  );
};

export default InternalAuditPage;
