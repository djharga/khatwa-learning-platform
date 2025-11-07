'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';
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

  // Filter modules based on search
  const filteredModules = currentLevel?.modules.filter(module => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      module.title.toLowerCase().includes(query) ||
      module.description?.toLowerCase().includes(query) ||
      module.topics.some(topic => topic.toLowerCase().includes(query))
    );
  }) || [];

  const toggleModule = (moduleTitle: string) => {
    setExpandedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleTitle)) {
        newSet.delete(moduleTitle);
      } else {
        newSet.add(moduleTitle);
      }
      return newSet;
    });
  };

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

      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 px-6 py-3 rounded-full mb-6 shadow-lg border border-blue-200"
            >
              <Shield className="w-6 h-6 text-blue-600" />
              <span className="text-blue-700 font-bold">المراجعة الداخلية</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              برنامج زمالة المراجعين الداخليين
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-gradient-to-r from-blue-600 to-purple-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                3 مستويات متكاملة
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              رحلة شاملة لتطوير الكفاءات المهنية في المراجعة الداخلية من المبتدئ إلى الخبير المتخصص
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
            >
              {[
                { icon: Users, label: 'طالب نشط', value: '15,420', color: 'blue' },
                { icon: Star, label: 'تقييم', value: '4.9', color: 'yellow' },
                { icon: Award, label: 'شهادة معتمدة', value: '100%', color: 'green' },
                { icon: Target, label: 'معدل النجاح', value: '95%', color: 'purple' },
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
                  >
                    <Icon className={`w-8 h-8 text-${stat.color}-600 mx-auto mb-2`} />
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-base text-gray-600">{stat.label}</div>
                  </motion.div>
                );
              })}
            </motion.div>

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
                  <p className="text-2xl md:text-3xl font-bold mb-2">احترف مهنة المراجعة الداخلية بالتدريب العملى</p>
                  <p className="text-lg opacity-90">ابدأ رحلتك نحو التميز المهني اليوم</p>
                </motion.div>
              </div>
            </motion.div>
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
                        <h3 className="text-2xl font-bold mb-1">{level.title}</h3>
                        <p className={`text-base ${activeLevel === level.id ? 'opacity-90' : 'text-gray-600'}`}>
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

          {/* Enhanced Help Tooltip */}
          {showHelpTooltip && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 border-r-4 border-blue-500 rounded-lg p-6 mb-6 shadow-lg"
            >
              <div className="flex items-start gap-3">
                <FileText className="w-6 h-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    نصيحة: كيفية استخدام الصفحة
                  </h4>
                  <p className="text-base text-blue-800 mb-4 leading-relaxed">
                    انقر على <span className="font-bold">المحاور الرئيسية</span> و <span className="font-bold">المحاور الفرعية</span> لفتحها وعرض المحتوى. يمكنك أيضاً استخدام الأزرار أدناه لفتح أو إغلاق جميع المحاور دفعة واحدة.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <motion.button
                      onClick={() => {
                        if (currentLevel) {
                          setExpandedModules(new Set(currentLevel.modules.map(m => m.title)));
                        }
                      }}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl text-base font-bold hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center gap-2 shadow-lg"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                      فتح الكل
                    </motion.button>
                    <motion.button
                      onClick={() => setExpandedModules(new Set())}
                      className="px-5 py-2.5 bg-blue-100 text-blue-700 rounded-xl text-base font-bold hover:bg-blue-200 transition-all flex items-center gap-2 border-2 border-blue-200"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ChevronRight className="w-4 h-4" />
                      إغلاق الكل
                    </motion.button>
                    <motion.button
                      onClick={() => setShowHelpTooltip(false)}
                      className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-base font-bold hover:bg-gray-200 transition-all border-2 border-gray-200"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      إخفاء
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في المحاور والمواضيع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-12 py-4 bg-white border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 shadow-lg text-lg"
              />
            </div>
          </motion.div>

          {/* Enhanced Level Description */}
          {currentLevel && (
            <motion.div
              key={activeLevel}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`bg-gradient-to-r ${currentLevel.color} rounded-3xl p-8 mb-12 text-white shadow-2xl relative overflow-hidden`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)`,
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">{currentLevel.title}</h2>
                <p className="text-2xl opacity-90 mb-8">{currentLevel.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'محور رئيسي', value: currentLevel.modules.length, icon: BookOpen },
                    { label: 'درس تدريبي', value: currentLevel.modules.reduce((sum, module) => sum + module.lessons, 0), icon: FileText },
                    { label: 'أسبوع تدريبي', value: currentLevel.modules.reduce((sum, module) => {
                      const weeks = parseInt(module.duration.split(' ')[0]);
                      return sum + weeks;
                    }, 0), icon: Clock },
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
                      >
                        <Icon className="w-8 h-8 mx-auto mb-3" />
                        <div className="text-4xl font-bold mb-1">{stat.value}</div>
                        <div className="text-base opacity-90">{stat.label}</div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Module Title with Search Results */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h3 className="text-3xl font-bold text-gray-900">
              المحاور التعليمية - {currentLevel?.title}
            </h3>
            {searchQuery && (
              <div className="text-base text-gray-600">
                تم العثور على {filteredModules.length} محور
              </div>
            )}
            <div className="flex gap-2">
              <motion.button
                onClick={() => {
                  if (currentLevel) {
                    setExpandedModules(new Set(currentLevel.modules.map(m => m.title)));
                  }
                }}
                className="px-7 py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 transition-all flex items-center gap-2 shadow-xl"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronDown className="w-5 h-5" />
                فتح الكل
              </motion.button>
              <motion.button
                onClick={() => setExpandedModules(new Set())}
                className="px-7 py-3.5 bg-white text-gray-700 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-2 border-2 border-gray-300 shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ChevronRight className="w-5 h-5" />
                إغلاق الكل
              </motion.button>
            </div>
          </div>

          {/* Enhanced Modules List */}
          <div className="space-y-6">
            {filteredModules.length === 0 && searchQuery ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 bg-white rounded-2xl shadow-lg"
              >
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-xl">لم يتم العثور على محاور مطابقة</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium text-lg"
                >
                  إعادة تعيين البحث
                </button>
              </motion.div>
            ) : (
              filteredModules.map((module, index) => (
                <motion.div
                  key={module.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div
                    className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => toggleModule(module.title)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleModule(module.title);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-7 h-7 text-blue-600" />
                        </div>
                        <div className="flex-1 text-right min-w-0">
                          <h3 className="text-2xl font-bold text-gray-900 mb-1">{module.title}</h3>
                          {module.description && (
                            <p className="text-base text-gray-600 mb-3 line-clamp-2">{module.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-base text-gray-600 flex-wrap">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {module.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              {module.lessons} درس
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {module.topics.length} موضوع
                            </span>
                          </div>
                          {module.progress !== undefined && (
                            <div className="mt-3 space-y-2">
                              <div className="flex items-center justify-between text-base">
                                <span className="text-gray-600">إنجاز المحور</span>
                                <span className="font-bold text-blue-600 text-lg">{module.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2.5">
                                <motion.div
                                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2.5 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${module.progress}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <motion.button
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold text-base transition-all flex items-center gap-2 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // TODO: Navigate to course
                          }}
                          type="button"
                        >
                          <Play className="w-5 h-5" />
                          ابدأ التعلم
                        </motion.button>
                        <div className="cursor-pointer">
                          {expandedModules.has(module.title) ? (
                            <ChevronDown className="w-7 h-7 text-gray-600" />
                          ) : (
                            <ChevronRight className="w-7 h-7 text-gray-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedModules.has(module.title) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-100 bg-gray-50"
                      >
                        <div className="p-6">
                          <h4 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-blue-600" />
                            المحتوى التدريبي:
                          </h4>
                          <div className="grid gap-3">
                            {module.topics.map((topic, topicIndex) => (
                              <motion.div
                                key={topicIndex}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: topicIndex * 0.05 }}
                                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                              >
                                <div className="w-9 h-9 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                                <span className="text-gray-700 flex-1 text-right text-base">{topic}</span>
                                <div className="mr-auto flex items-center gap-2">
                                  <motion.button
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="معاينة"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </motion.button>
                                  <motion.button
                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    title="تحميل"
                                  >
                                    <Download className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-6 flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-6 flex-wrap">
                              <div className="flex items-center gap-2">
                                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                                <span className="text-gray-600 font-medium text-lg">تقييم المحتوى: 4.8/5</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-6 h-6 text-blue-500" />
                                <span className="text-gray-600 font-medium text-lg">1,250 متعلم</span>
                              </div>
                            </div>
                            <motion.button
                              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-7 py-3.5 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 shadow-lg"
                              whileHover={{ scale: 1.05, y: -2 }}
                              whileTap={{ scale: 0.95 }}
                              type="button"
                            >
                              <Award className="w-6 h-6" />
                              احصل على الشهادة
                              <ArrowRight className="w-6 h-6" />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>

          {/* Enhanced Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-16 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-indigo-100"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">ما ستحصل عليه</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                شهادات معتمدة وخبرة عملية في المراجعة الداخلية
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { icon: Award, title: 'شهادة معتمدة', description: 'شهادة زمالة معترف بها دولياً', color: 'blue' },
                { icon: TrendingUp, title: 'تطوير مهني', description: 'مهارات متقدمة في المراجعة والتحليل', color: 'green' },
                { icon: Star, title: 'خبرة عملية', description: 'تطبيقات عملية وحالات دراسية حقيقية', color: 'purple' },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-100 to-${item.color}-200 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <Icon className={`w-8 h-8 text-${item.color}-600`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-base">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="text-center">
              <motion.button
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 shadow-xl hover:shadow-2xl inline-flex items-center gap-3"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="button"
              >
                ابدأ رحلتك التعليمية الآن
                <ArrowRight className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InternalAuditPage;
