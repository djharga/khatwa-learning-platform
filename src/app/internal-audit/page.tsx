'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Script from 'next/script';
import {
  BookOpen,
  Shield,
  TrendingUp,
  Users,
  FileText,
  CheckCircle,
  ArrowRight,
  Award,
  Eye,
  Zap,
} from 'lucide-react';
import { generateStructuredData } from '@/lib/seo';
import PageBackground from '@/components/ui/PageBackground';
import { useRouter } from 'next/navigation';

const InternalAuditPage = () => {
  const router = useRouter();
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);

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

  // Generate structured data for SEO
  const structuredData = generateStructuredData('course', {
    name: 'برنامج المراجعين الداخليين',
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
          {/* Modern & Simple Hero Section - Enhanced: clearer background, smoother purple gradient */}
          <div className="relative rounded-3xl overflow-hidden mb-16">
            {/* Background Image - Enhanced clarity, reduced blur */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-105 contrast-105"
              style={{
                backgroundImage: 'url(/assets/internal-audit-hero.jpg)',
              }}
            >
              {/* Enhanced Overlay - smoother purple gradient, less dark */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800/50 via-indigo-800/45 to-purple-800/50" />

              {/* Additional gradient overlay for depth - reduced opacity */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>

            {/* Reduced Background Glow Effects */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 text-center max-w-5xl mx-auto py-20 lg:py-28 px-6"
            >
              {/* Badge - Enhanced: higher contrast, larger icon, softer edges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/25 backdrop-blur-sm rounded-2xl mb-10 border-2 border-white/40 shadow-xl"
              >
                <Shield className="w-6 h-6 text-white" strokeWidth={2.5} />
                <span className="text-white font-bold text-sm md:text-base">
                  المراجعة الداخلية
                </span>
              </motion.div>

              {/* Main Title - Enhanced: 3% larger, stronger contrast, increased spacing */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.7rem] font-bold text-white mb-8 leading-tight tracking-tight drop-shadow-2xl"
                style={{
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.6), 0 2px 10px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.15)'
                }}
              >
                <span className="block">برنامج المراجعين الداخليين</span>
              </motion.h1>

              {/* Subtitle - Enhanced: better badge styling */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mb-10"
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg">
                  <span className="bg-gradient-to-r from-blue-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                    3 مستويات متكاملة
                  </span>
                </h2>
              </motion.div>

              {/* Description - Enhanced: increased spacing */}
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-lg md:text-xl lg:text-2xl text-blue-50 max-w-3xl mx-auto leading-loose font-medium mb-12 drop-shadow-lg"
              >
                رحلة شاملة لتطوير الكفاءات المهنية في المراجعة الداخلية من المبتدئ إلى الخبير المتخصص
              </motion.p>
            </motion.div>
          </div>

          {/* المحتوى التعريفي الإلزامي - Enhanced Design: increased padding, softer edges, soft shadow, improved spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-[2rem] p-10 md:p-14 mb-12 text-right max-w-5xl mx-auto border border-blue-100"
            style={{
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)'
            }}
          >
            <div className="space-y-8 text-gray-800 leading-relaxed">
              {/* المقطع الافتتاحي - كسر الحواجز - Enhanced: larger title, better spacing, improved icon, unified height */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="border-r-4 border-blue-400 pr-8 bg-white/60 rounded-2xl p-8 h-full flex flex-col hover:shadow-md transition-all duration-300 group"
                style={{
                  borderRightColor: 'rgba(59, 130, 246, 0.6)',
                  borderRightWidth: '4px'
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                  borderRightColor: 'rgba(59, 130, 246, 0.9)'
                }}
              >
                <p className="text-xl md:text-2xl font-bold text-blue-700 mb-4 flex items-center gap-3">
                  <Zap className="w-7 h-7" strokeWidth={2.5} />
                  كسر الحواجز التقليدية
                </p>
                <p className="text-base md:text-lg leading-loose text-gray-700 max-w-2xl" style={{ lineHeight: '1.7' }}>
                  مهنة المراجعة الداخلية لم تعد حكراً على متخصصين محددين – إنها فرصة حقيقية لأي شخص يسعى لتطوير مساره المهني، حتى لو كنت تفكر في تغيير تخصصك الحالي او تطوير تخصصك واكتساب مهارات مطلوبة لسوق العمل.
                </p>
              </motion.div>

              {/* المقطع الثاني - التعريف الاستراتيجي - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="border-r-4 border-green-400 pr-8 bg-white/60 rounded-2xl p-8 h-full flex flex-col hover:shadow-md transition-all duration-300 group"
                style={{
                  borderRightColor: 'rgba(34, 197, 94, 0.6)',
                  borderRightWidth: '4px'
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                  borderRightColor: 'rgba(34, 197, 94, 0.9)'
                }}
              >
                <p className="text-xl md:text-2xl font-bold text-green-700 mb-4 flex items-center gap-3">
                  <Eye className="w-7 h-7" strokeWidth={2.5} />
                  عين الإدارة اليقظة
                </p>
                <p className="text-base md:text-lg leading-loose text-gray-700 max-w-2xl" style={{ lineHeight: '1.7' }}>
                  المراجعة الداخلية اليوم هي عين الإدارة اليقظة، التي ترى ما وراء الأرقام والبيانات، وتكشف المخاطر قبل أن تتحول إلى أزمات، وتحوّلها إلى فرص للتحسين والابتكار. إنها الشريك الصامت الذي يحمي مسيرة المؤسسة، ويقودها نحو التميز.
                </p>
              </motion.div>

              {/* المقطع الثالث - شرح الشراكة - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="border-r-4 border-purple-400 pr-8 bg-white/60 rounded-2xl p-8 h-full flex flex-col hover:shadow-md transition-all duration-300 group"
                style={{
                  borderRightColor: 'rgba(168, 85, 247, 0.6)',
                  borderRightWidth: '4px'
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                  borderRightColor: 'rgba(168, 85, 247, 0.9)'
                }}
              >
                <p className="text-xl md:text-2xl font-bold text-purple-700 mb-4 flex items-center gap-3">
                  <TrendingUp className="w-7 h-7" strokeWidth={2.5} />
                  الشراكة التكاملية
                </p>
                <p className="text-base md:text-lg mb-4 leading-loose text-gray-700 max-w-2xl" style={{ lineHeight: '1.7' }}>
                  المراجعة الداخلية والمراجع الداخلي… شراكة تصنع التفوق المؤسسي. معًا يشكلان قوة استراتيجية تدعم استقرار مؤسستك وتدفعها نحو الريادة. فالمراجعة الداخلية تمنحك الحماية والشفافية، بينما يحوّل المراجع الداخلي المحترف هذه الحماية إلى قيمة مستدامة تضمن التميز وتبقي مؤسستك دائمًا في موقع المبادرة، مستبقة للمخاطر، وسبّاقة لاغتنام الفرص.
                </p>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-base font-semibold text-purple-700 bg-purple-50 p-5 rounded-xl border-r-4 border-purple-500 mt-auto"
                  style={{ lineHeight: '1.7' }}
                >
                  إن الاستثمار في بناء منظومة مراجعة داخلية قوية، وتطوير كفاءات المراجع الداخلي، ليس رفاهية أو خيارًا تكميليًا… بل قرار استراتيجي يحمي أعمالك اليوم ويصنع نجاحك المستقبلي.
                </motion.div>
              </motion.div>

              {/* المقطع الرابع - تعريف المراجع الحديث - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="border-r-4 border-orange-400 pr-8 bg-white/60 rounded-2xl p-8 h-full flex flex-col hover:shadow-md transition-all duration-300 group"
                style={{
                  borderRightColor: 'rgba(249, 115, 22, 0.6)',
                  borderRightWidth: '4px'
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                  borderRightColor: 'rgba(249, 115, 22, 0.9)'
                }}
              >
                <p className="text-xl md:text-2xl font-bold text-orange-700 mb-4 flex items-center gap-3">
                  <Award className="w-7 h-7" strokeWidth={2.5} />
                  المراجع الداخلي: قيمة مضافة لا تُقدّر بثمن
                </p>
                <p className="text-base md:text-lg mb-5 leading-loose text-gray-700 max-w-2xl" style={{ lineHeight: '1.7' }}>
                  المراجع الداخلي هو قيمة مضافة لا تُقدّر بثمن، وشريك استراتيجي للإدارة في رسم ملامح المستقبل. ليس مجرد مدقق يركز على الأخطاء، بل رائد يساهم بفعالية في:
                </p>
                <ul className="space-y-3 text-base flex-1" style={{ lineHeight: '1.7' }}>
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
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-[22px] h-[22px] text-orange-500 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
                      <span className="text-gray-700">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* المقطع الخامس - عامل الاستعجال - Enhanced */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
                className="border-r-4 border-red-400 pr-8 bg-white/60 rounded-2xl p-8 h-full flex flex-col hover:shadow-md transition-all duration-300 group"
                style={{
                  borderRightColor: 'rgba(239, 68, 68, 0.6)',
                  borderRightWidth: '4px'
                }}
                whileHover={{
                  y: -2,
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
                  borderRightColor: 'rgba(239, 68, 68, 0.9)'
                }}
              >
                <p className="text-xl md:text-2xl font-bold text-red-700 mb-4 flex items-center gap-3">
                  <Shield className="w-7 h-7" strokeWidth={2.5} />
                  التأمين المستدام لمستقبل أعمالك
                </p>
                <p className="text-base md:text-lg leading-loose text-gray-700 max-w-2xl" style={{ lineHeight: '1.7' }}>
                  الاستثمار في تطوير قدرات المراجعة الداخلية يعني أكثر من حماية الأصول… إنه تأمين مستدام لمستقبل أعمالك. فالمراجع الداخلي المحترف يحول كل تقرير إلى خطة إنقاذ وتحسين فعّالة، تجعلك دائمًا على أتم الاستعداد لمواجهة التحديات. المستقبل لا ينتظر أحدًا، ومن يتأخر في بناء منظومة مراجعة قوية سيواجه تكاليف مضاعفة.
                </p>
              </motion.div>

              {/* المقطع الختامي - CTA - Enhanced: golden professional touch, larger text, better spacing, deeper shadow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.7, duration: 0.5 }}
                className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white p-10 rounded-2xl text-center relative overflow-hidden group"
                style={{
                  boxShadow: '0 12px 32px rgba(99, 102, 241, 0.25), 0 6px 16px rgba(0, 0, 0, 0.15)'
                }}
                whileHover={{
                  y: -3,
                  boxShadow: '0 16px 40px rgba(99, 102, 241, 0.3), 0 8px 20px rgba(0, 0, 0, 0.2)',
                  transition: { duration: 0.25 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

                <motion.p
                  className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 text-white relative z-10"
                  style={{
                    fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                    lineHeight: '1.3'
                  }}
                >
                  احترف مهنة المراجعة الداخلية بالتدريب العملى
                </motion.p>
                <motion.p
                  className="text-lg md:text-xl text-white/95 relative z-10"
                  style={{ lineHeight: '1.6' }}
                >
                  ابدأ رحلتك نحو التميز المهني اليوم
                </motion.p>
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Level Selection - Professional touch, visual depth, smooth motion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {auditLevels.map((level) => (
                <motion.button
                  key={level.id}
                  onClick={() => setActiveLevel(level.id as 1 | 2 | 3)}
                  className={`p-8 rounded-[2rem] border-2 transition-all duration-300 text-right relative overflow-hidden cursor-pointer ${activeLevel === level.id
                    ? `border-transparent bg-gradient-to-br ${level.color} text-white scale-105`
                    : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  style={{
                    boxShadow: activeLevel === level.id
                      ? '0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 16px rgba(0, 0, 0, 0.1)'
                      : '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)'
                  }}
                  whileHover={{
                    y: -2,
                    scale: activeLevel === level.id ? 1.05 : 1.02,
                    boxShadow: activeLevel === level.id
                      ? '0 16px 40px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(0, 0, 0, 0.15)'
                      : '0 8px 20px rgba(0, 0, 0, 0.12), 0 4px 8px rgba(0, 0, 0, 0.08)'
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={activeLevel === level.id ? {
                    boxShadow: [
                      '0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 16px rgba(0, 0, 0, 0.1)',
                      '0 14px 36px rgba(0, 0, 0, 0.18), 0 7px 18px rgba(0, 0, 0, 0.12)',
                      '0 12px 32px rgba(0, 0, 0, 0.15), 0 6px 16px rgba(0, 0, 0, 0.1)'
                    ]
                  } : {}}
                  transition={{
                    boxShadow: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    duration: 0.3
                  }}
                  type="button"
                >
                  {/* Background Pattern */}
                  {activeLevel === level.id && (
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0" style={{
                        backgroundImage: "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)",
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                  )}

                  {/* Hover Border Effect */}
                  {activeLevel === level.id && (
                    <motion.div
                      className="absolute inset-0 rounded-[2rem] border-2 border-white/30 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-extrabold text-xl shadow-xl ${activeLevel === level.id
                        ? 'bg-white/25 backdrop-blur-md text-white border border-white/30'
                        : `bg-gradient-to-br ${level.color} text-white`
                        }`}>
                        {level.id}
                      </div>
                      <div className="flex-1 mr-4">
                        <h3 className={`text-2xl md:text-3xl font-extrabold mb-2 ${activeLevel === level.id ? 'text-white' : 'text-gray-900'}`} style={{
                          letterSpacing: '-0.02em',
                          lineHeight: '1.3'
                        }}>{level.title}</h3>
                        <p className={`text-base md:text-lg ${activeLevel === level.id ? 'text-white/90' : 'text-gray-600'}`} style={{ lineHeight: '1.6' }}>
                          {level.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();

                          // استخدام معرف الكورس للمراجعة الداخلية (14)
                          const courseId = '14';

                          // الانتقال إلى صفحة الدروس مع تمرير معرف المستوى
                          const lessonPath = `/student/courses/${courseId}/lesson?level=${level.id}`;
                          router.push(lessonPath);
                        }}
                        className={`w-full mt-5 px-6 py-3.5 rounded-xl font-bold text-base transition-all duration-300 ${activeLevel === level.id
                          ? 'bg-white text-indigo-600 hover:bg-white/90 shadow-lg'
                          : `bg-gradient-to-r ${level.color} text-white hover:shadow-lg`
                          }`}
                      >
                        ابدأ التعلم
                      </button>
                    </motion.div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>


          {/* Placeholder for future content */}
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              اختر مستوى من الأعلى لعرض التفاصيل
            </p>
          </div>
        </div>
      </PageBackground>
    </>
  );
};

export default InternalAuditPage;
