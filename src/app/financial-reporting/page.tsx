'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  BarChart3,
  TrendingUp,
  Target,
  CheckCircle,
  Clock,
  BookOpen,
  Play,
  Download,
  Award,
  ChevronDown,
  ChevronRight,
  Star,
  ArrowRight,
  Calculator,
  PieChart,
  Users,
  Eye,
} from 'lucide-react';

const FinancialReportingPage = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'Target': Target,
      'FileText': FileText,
      'BarChart3': BarChart3,
      'Calculator': Calculator,
      'Eye': Eye,
      'TrendingUp': TrendingUp,
    };
    const IconComponent = iconMap[iconName] || FileText;
    return IconComponent;
  };

  const modules = [
    {
      id: 1,
      title: 'أهمية التقارير المالية والمحاسبية',
      icon: 'Target',
      color: 'from-blue-500 to-blue-600',
      duration: '2 ساعات',
      lessons: 5,
      description: 'فهم دور التقارير المالية في اتخاذ القرارات ومستخدميها المختلفين',
      content: [
        {
          title: 'الدور الحيوي للتقارير المالية والمحاسبية في دعم اتخاذ القرارات',
          type: 'importance',
          duration: '25 دقيقة',
          description: 'كيف تساعد التقارير المالية في اتخاذ القرارات الاستراتيجية',
          objectives: [
            'فهم أهمية المعلومات المالية',
            'دور التقارير في التخطيط',
            'اتخاذ القرارات المبنية على البيانات',
            'تحسين الأداء المالي'
          ],
          resources: ['دراسات حالة', 'أمثلة تطبيقية', 'نماذج قرارات']
        },
        {
          title: 'الفرق الأساسي بين التقارير المالية والتقارير المحاسبية',
          type: 'difference',
          duration: '20 دقيقة',
          description: 'تمييز بين أنواع التقارير المختلفة وأغراضها',
          objectives: [
            'تعريف التقارير المالية',
            'خصائص التقارير المحاسبية',
            'الاختلافات الأساسية',
            'الاستخدام المناسب لكل نوع'
          ],
          resources: ['مقارنة مفصلة', 'أمثلة توضيحية', 'نماذج تقارير']
        },
        {
          title: 'مستخدمو التقارير المتنوعون (الإدارة - المساهمون - الدائنون - الجهات الرقابية)',
          type: 'users',
          duration: '30 دقيقة',
          description: 'احتياجات المستخدمين المختلفين للتقارير المالية',
          objectives: [
            'احتياجات الإدارة',
            'متطلبات المساهمين',
            'اهتمامات الدائنين',
            'متطلبات الجهات الرقابية'
          ],
          resources: ['تحليل احتياجات', 'نماذج تقارير', 'أمثلة واقعية']
        },
        {
          title: 'القوانين والمعايير الدولية المرتبطة بإعداد التقارير (IFRS - GAAP)',
          type: 'standards',
          duration: '35 دقيقة',
          description: 'المعايير الدولية للتقارير المالية',
          objectives: [
            'فهم معايير IFRS',
            'مقارنة مع GAAP الأمريكي',
            'تطبيق المعايير العالمية',
            'الامتثال الدولي'
          ],
          resources: ['دليل معايير', 'أمثلة تطبيق', 'نماذج امتثال']
        },
        {
          title: 'مبادئ العرض والإفصاح والشفافية في التقارير',
          type: 'principles',
          duration: '30 دقيقة',
          description: 'المبادئ الأساسية لإعداد التقارير المالية الشفافة',
          objectives: [
            'مبدأ الشفافية',
            'الإفصاح الكامل',
            'العرض الواضح والمفهوم',
            'الموضوعية والحيادية'
          ],
          resources: ['مبادئ إعداد', 'أمثلة تطبيق', 'نماذج تقارير']
        }
      ]
    },
    {
      id: 2,
      title: 'أنواع التقارير المحاسبية والمالية',
      icon: 'FileText',
      color: 'from-green-500 to-green-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'تصنيف وفهم أنواع التقارير المالية والمحاسبية المختلفة',
      content: [
        {
          title: 'القوائم المالية الأساسية (الميزانية العمومية - قائمة الدخل - التدفقات النقدية - التغيرات في حقوق الملكية)',
          type: 'financial-statements',
          duration: '45 دقيقة',
          description: 'القوائم المالية الأساسية ومكوناتها',
          objectives: [
            'فهم الميزانية العمومية',
            'تحليل قائمة الدخل',
            'قراءة التدفقات النقدية',
            'تغيرات حقوق الملكية'
          ],
          resources: ['قوالب قوائم', 'أمثلة محللة', 'نماذج تفسير']
        },
        {
          title: 'التقارير المحاسبية الداخلية (تقارير الرقابة على التكاليف والنفقات - تقارير الأداء المالي والتشغيلي - تقارير الموازنات وتحليل الانحرافات)',
          type: 'internal-reports',
          duration: '40 دقيقة',
          description: 'التقارير المحاسبية الداخلية للإدارة',
          objectives: [
            'تقارير الرقابة على التكاليف',
            'تقارير الأداء المالي',
            'تحليل الانحرافات عن الموازنة',
            'التقارير التشغيلية'
          ],
          resources: ['نماذج تقارير داخلية', 'أدوات تحليل', 'قوالب انحرافات']
        },
        {
          title: 'التقارير الإدارية والتحليلية (تقارير التنبؤ والتوقعات المستقبلية - تقارير تحليل الربحية حسب المنتجات والعملاء)',
          type: 'management-reports',
          duration: '35 دقيقة',
          description: 'التقارير التحليلية لدعم اتخاذ القرارات',
          objectives: [
            'تقارير التنبؤ المالي',
            'تحليل الربحية حسب المنتجات',
            'تحليل العملاء المربحين',
            'التقارير الاستراتيجية'
          ],
          resources: ['نماذج تنبؤ', 'تحليل ربحية', 'تقارير إدارية']
        }
      ]
    },
    {
      id: 3,
      title: 'خطوات إعداد التقارير المالية والمحاسبية',
      icon: 'BarChart3',
      color: 'from-purple-500 to-purple-600',
      duration: '3 ساعات',
      lessons: 6,
      description: 'العملية التدريجية لإعداد التقارير المالية بدقة واحترافية',
      content: [
        {
          title: 'جمع البيانات والمعالجة المحاسبية الصحيحة',
          type: 'data-collection',
          duration: '30 دقيقة',
          description: 'جمع ومعالجة البيانات المحاسبية الأساسية',
          objectives: [
            'تحديد مصادر البيانات',
            'عمليات المعالجة المحاسبية',
            'التحقق من دقة البيانات',
            'توثيق العمليات'
          ],
          resources: ['إجراءات جمع', 'نماذج معالجة', 'أدوات تحقق']
        },
        {
          title: 'تبويب وتصنيف الحسابات وفق المعايير المحاسبية',
          type: 'classification',
          duration: '35 دقيقة',
          description: 'تصنيف الحسابات وفقاً للمعايير الدولية',
          objectives: [
            'معايير التصنيف المحاسبي',
            'تجميع الحسابات المتشابهة',
            'التأكد من الدقة',
            'الامتثال للمعايير'
          ],
          resources: ['دليل تصنيف', 'أمثلة تطبيق', 'نماذج حسابات']
        },
        {
          title: 'إعداد التسويات الجردية والتسويات البنكية',
          type: 'adjustments',
          duration: '40 دقيقة',
          description: 'إعداد التسويات المحاسبية المطلوبة',
          objectives: [
            'التسويات الجردية',
            'تسويات الحسابات البنكية',
            'التسويات الشهرية',
            'التأثير على القوائم المالية'
          ],
          resources: ['نماذج تسويات', 'أمثلة محسوبة', 'قيود يومية']
        },
        {
          title: 'مراجعة البيانات والتحقق من دقتها قبل الإصدار',
          type: 'review',
          duration: '25 دقيقة',
          description: 'عمليات المراجعة والتحقق النهائية',
          objectives: [
            'فحص دقة البيانات',
            'التحقق من الاتساق',
            'مراجعة الإفصاحات',
            'الموافقة النهائية'
          ],
          resources: ['قوائم مراجعة', 'أدوات تحقق', 'نماذج موافقة']
        }
      ]
    },
    {
      id: 4,
      title: 'أدوات التحليل المالي داخل التقارير',
      icon: 'Calculator',
      color: 'from-orange-500 to-orange-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'أدوات وطرق التحليل المالي المتقدم في التقارير',
      content: [
        {
          title: 'التحليل الأفقي والرأسي للبيانات المالية',
          type: 'analysis-horizontal',
          duration: '35 دقيقة',
          description: 'طرق التحليل الأساسية للبيانات المالية',
          objectives: [
            'التحليل الأفقي المقارن',
            'التحليل الرأسي النسبي',
            'تحديد الاتجاهات',
            'استخراج الرؤى المالية'
          ],
          resources: ['أدوات تحليل', 'أمثلة محسوبة', 'نماذج تقارير']
        },
        {
          title: 'النسب المالية الأساسية (السيولة - الربحية - المديونية - الكفاءة التشغيلية)',
          type: 'ratios-basic',
          duration: '50 دقيقة',
          description: 'حساب وتحليل النسب المالية الأساسية',
          objectives: [
            'نسب السيولة والتدفق النقدي',
            'نسب الربحية والعائد',
            'نسب المديونية والرافعة المالية',
            'نسب الكفاءة التشغيلية'
          ],
          resources: ['حاسبات نسب', 'أمثلة تحليل', 'نماذج تفسير']
        },
        {
          title: 'تحليل الانحرافات بين الموازنة والأداء الفعلي',
          type: 'variance-analysis',
          duration: '40 دقيقة',
          description: 'تحليل الفروق بين المخطط والفعلي',
          objectives: [
            'حساب الانحرافات',
            'تحليل أسباب الفروق',
            'اتخاذ الإجراءات التصحيحية',
            'تحسين التخطيط المستقبلي'
          ],
          resources: ['نماذج انحرافات', 'أدوات حساب', 'تقارير تحليل']
        },
        {
          title: 'ربط التقارير بمؤشرات الأداء الرئيسية (KPI\'s)',
          type: 'kpi-integration',
          duration: '35 دقيقة',
          description: 'ربط التقارير المالية بمؤشرات الأداء',
          objectives: [
            'تحديد مؤشرات الأداء الرئيسية',
            'ربط المؤشرات بالتقارير المالية',
            'قياس الأداء المالي',
            'اتخاذ القرارات المبنية على المؤشرات'
          ],
          resources: ['مؤشرات مالية', 'نماذج ربط', 'تقارير مؤشرات']
        }
      ]
    },
    {
      id: 5,
      title: 'الجوانب الرقابية في إعداد التقارير',
      icon: 'Eye',
      color: 'from-red-500 to-red-600',
      duration: '2 ساعات',
      lessons: 4,
      description: 'الجوانب الرقابية والتدقيقية في إعداد ومراجعة التقارير المالية',
      content: [
        {
          title: 'مسؤوليات الإدارة المالية في إعداد التقارير',
          type: 'responsibilities',
          duration: '30 دقيقة',
          description: 'دور الإدارة المالية في ضمان دقة التقارير',
          objectives: [
            'مسؤوليات الإدارة المالية',
            'ضوابط الجودة الداخلية',
            'التأكد من الدقة والموضوعية',
            'إدارة المخاطر المالية'
          ],
          resources: ['دليل مسؤوليات', 'نماذج ضوابط', 'إجراءات رقابة']
        },
        {
          title: 'دور المراجعة الداخلية في التحقق من صحة ودقة التقارير',
          type: 'internal-audit',
          duration: '35 دقيقة',
          description: 'دور المراجعة الداخلية في ضمان جودة التقارير',
          objectives: [
            'أهداف المراجعة الداخلية',
            'طرق فحص التقارير المالية',
            'تقييم الضوابط الداخلية',
            'التوصيات التحسينية'
          ],
          resources: ['أدوات مراجعة', 'قوائم فحص', 'نماذج تقارير']
        },
        {
          title: 'دور المراجعة الخارجية والجهات الرقابية في المراجعة',
          type: 'external-audit',
          duration: '30 دقيقة',
          description: 'دور المراجعين الخارجيين والجهات الرقابية',
          objectives: [
            'أهداف المراجعة الخارجية',
            'معايير المراجعة الدولية',
            'دور الهيئات الرقابية',
            'الامتثال التنظيمي'
          ],
          resources: ['معايير مراجعة', 'نماذج امتثال', 'تقارير رقابية']
        },
        {
          title: 'إدارة المخاطر المرتبطة بالتسويات المحاسبية',
          type: 'risk-management',
          duration: '35 دقيقة',
          description: 'تحديد وإدارة المخاطر في عمليات التسويات',
          objectives: [
            'تحديد مخاطر التسويات',
            'تقييم تأثير المخاطر',
            'ضوابط إدارة المخاطر',
            'خطط الاستجابة للمخاطر'
          ],
          resources: ['خرائط مخاطر', 'نماذج تقييم', 'خطط استجابة']
        }
      ]
    },
    {
      id: 6,
      title: 'التكنولوجيا في إعداد التقارير',
      icon: 'TrendingUp',
      color: 'from-indigo-500 to-indigo-600',
      duration: '2 ساعات',
      lessons: 4,
      description: 'الأدوات التكنولوجية الحديثة في إعداد وتحليل التقارير المالية',
      content: [
        {
          title: 'استخدام البرامج المحاسبية المتقدمة',
          type: 'software',
          duration: '30 دقيقة',
          description: 'البرامج المحاسبية الحديثة وكيفية استخدامها',
          objectives: [
            'أنواع البرامج المحاسبية',
            'ميزات البرامج المتقدمة',
            'تكامل البرامج مع بعضها',
            'أتمتة العمليات المحاسبية'
          ],
          resources: ['دليل برامج', 'أمثلة تطبيق', 'نماذج تكامل']
        },
        {
          title: 'أتمتة عملية إعداد التقارير',
          type: 'automation',
          duration: '35 دقيقة',
          description: 'أتمتة عمليات إعداد التقارير المالية',
          objectives: [
            'أدوات الأتمتة المالية',
            'تقليل الأخطاء البشرية',
            'تسريع عملية الإعداد',
            'تحسين دقة التقارير'
          ],
          resources: ['أدوات أتمتة', 'نماذج عمليات', 'أمثلة تطبيق']
        },
        {
          title: 'أدوات التحليل والعرض التفاعلي (Power BI, Tableau)',
          type: 'analytics-tools',
          duration: '40 دقيقة',
          description: 'أدوات التحليل البياني والعرض التفاعلي',
          objectives: [
            'استخدام Power BI',
            'أدوات Tableau',
            'إنشاء التقارير التفاعلية',
            'تحليل البيانات البصري'
          ],
          resources: ['دليل Power BI', 'أمثلة Tableau', 'نماذج تفاعلية']
        }
      ]
    }
  ];

  const toggleLesson = (lessonTitle: string) => {
    setExpandedLesson(expandedLesson === lessonTitle ? null : lessonTitle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-6">
            <FileText className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-bold">التقارير المالية والمحاسبية</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            كورس إعداد التقارير المالية وفق IFRS
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تعلم إعداد التقارير المالية المهنية وفقاً للمعايير الدولية مع التحليل المتقدم والأدوات التكنولوجية الحديثة
          </p>

          {/* معلومات الكورس */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">17 ساعة</div>
              <div className="text-gray-600">مدة التدريب</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">35 درس</div>
              <div className="text-gray-600">محتوى تعليمي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">1,200 طالب</div>
              <div className="text-gray-600">عدد المتعلمين</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.8/5</div>
              <div className="text-gray-600">تقييم الكورس</div>
            </div>
          </div>
        </motion.div>

        {/* اختيار المحور */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <motion.button
                    key={module.id}
                    onClick={() => setActiveModule(index)}
                    className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${
                      activeModule === index
                        ? `bg-gradient-to-r ${module.color} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {(() => {
                      const IconComponent = getIconComponent(module.icon);
                      return <IconComponent className="w-5 h-5" />;
                    })()}
                    <span className="hidden sm:inline">{module.title.split('(')[0].trim()}</span>
                    <span className="sm:hidden">المحور {module.id}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* محتوى المحور النشط */}
        {modules[activeModule] && (
          <motion.div
            key={activeModule}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-r ${modules[activeModule].color} rounded-3xl p-8 mb-8 text-white`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{modules[activeModule].title}</h2>
                <p className="text-lg opacity-90">{modules[activeModule].description}</p>
              </div>
              <div className={"w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur"}>
                {(() => {
                  const IconComponent = getIconComponent(modules[activeModule].icon);
                  return <IconComponent className="w-8 h-8" />;
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">{modules[activeModule].lessons}</div>
                <div className="text-sm opacity-90">عدد الدروس</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">{modules[activeModule].duration}</div>
                <div className="text-sm opacity-90">مدة المحور</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">
                  {Math.round(parseInt(modules[activeModule].duration.split(' ')[0]) / modules[activeModule].lessons * 10) / 10}
                </div>
                <div className="text-sm opacity-90">ساعة للدرس</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* قائمة الدروس */}
        <div className="space-y-4">
          {modules[activeModule]?.content.map((lesson, index) => (
            <motion.div
              key={lesson.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleLesson(lesson.title)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      lesson.type === 'importance' ? 'bg-blue-100 text-blue-600' :
                      lesson.type === 'difference' ? 'bg-green-100 text-green-600' :
                      lesson.type === 'users' ? 'bg-purple-100 text-purple-600' :
                      lesson.type === 'standards' ? 'bg-orange-100 text-orange-600' :
                      lesson.type === 'principles' ? 'bg-red-100 text-red-600' :
                      lesson.type === 'financial-statements' ? 'bg-indigo-100 text-indigo-600' :
                      lesson.type === 'internal-reports' ? 'bg-teal-100 text-teal-600' :
                      lesson.type === 'management-reports' ? 'bg-cyan-100 text-cyan-600' :
                      lesson.type === 'data-collection' ? 'bg-pink-100 text-pink-600' :
                      lesson.type === 'classification' ? 'bg-lime-100 text-lime-600' :
                      lesson.type === 'adjustments' ? 'bg-emerald-100 text-emerald-600' :
                      lesson.type === 'review' ? 'bg-violet-100 text-violet-600' :
                      lesson.type === 'analysis-horizontal' ? 'bg-rose-100 text-rose-600' :
                      lesson.type === 'ratios-basic' ? 'bg-amber-100 text-amber-600' :
                      lesson.type === 'variance-analysis' ? 'bg-stone-100 text-stone-600' :
                      lesson.type === 'kpi-integration' ? 'bg-neutral-100 text-neutral-600' :
                      lesson.type === 'responsibilities' ? 'bg-gray-100 text-gray-600' :
                      lesson.type === 'internal-audit' ? 'bg-slate-100 text-slate-600' :
                      lesson.type === 'external-audit' ? 'bg-zinc-100 text-zinc-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{lesson.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </span>
                        <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                          {lesson.type === 'importance' ? 'أهمية' :
                           lesson.type === 'difference' ? 'فرق' :
                           lesson.type === 'users' ? 'مستخدمون' :
                           lesson.type === 'standards' ? 'معايير' :
                           lesson.type === 'principles' ? 'مبادئ' :
                           lesson.type === 'financial-statements' ? 'قوائم مالية' :
                           lesson.type === 'internal-reports' ? 'تقارير داخلية' :
                           lesson.type === 'management-reports' ? 'تقارير إدارية' :
                           lesson.type === 'data-collection' ? 'جمع بيانات' :
                           lesson.type === 'classification' ? 'تصنيف' :
                           lesson.type === 'adjustments' ? 'تسويات' :
                           lesson.type === 'review' ? 'مراجعة' :
                           lesson.type === 'analysis-horizontal' ? 'تحليل أفقي' :
                           lesson.type === 'ratios-basic' ? 'نسب أساسية' :
                           lesson.type === 'variance-analysis' ? 'تحليل انحرافات' :
                           lesson.type === 'kpi-integration' ? 'ربط مؤشرات' :
                           lesson.type === 'responsibilities' ? 'مسؤوليات' :
                           lesson.type === 'internal-audit' ? 'مراجعة داخلية' :
                           lesson.type === 'external-audit' ? 'مراجعة خارجية' :
                           lesson.type === 'software' ? 'برامج' :
                           lesson.type === 'automation' ? 'أتمتة' :
                           lesson.type === 'analytics-tools' ? 'أدوات تحليل' :
                           lesson.type === 'risk-management' ? 'إدارة مخاطر' :
                           lesson.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                      ابدأ
                    </motion.button>
                    {expandedLesson === lesson.title ? (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedLesson === lesson.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100 bg-gray-50"
                  >
                    <div className="p-6">
                      <p className="text-gray-700 mb-6 text-lg">{lesson.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            أهداف الدرس:
                          </h4>
                          <ul className="space-y-2">
                            {lesson.objectives.map((objective, objIndex) => (
                              <li key={objIndex} className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <BookOpen className="w-5 h-5 text-purple-600" />
                            الموارد المتاحة:
                          </h4>
                          <div className="space-y-3">
                            {lesson.resources.map((resource, resIndex) => (
                              <div key={resIndex} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
                                <FileText className="w-5 h-5 text-purple-600" />
                                <span className="text-gray-700">{resource}</span>
                                <div className="mr-auto">
                                  <motion.button
                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                  >
                                    <Download className="w-4 h-4" />
                                  </motion.button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-between pt-6 border-t border-gray-200">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-gray-600">تقييم الدرس: 4.8/5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">650 متعلم</span>
                          </div>
                        </div>
                        <motion.button
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Award className="w-5 h-5" />
                          احصل على شهادة الدرس
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* معلومات إضافية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">قيمة الكورس المضافة</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              تدريب شامل مع أمثلة عملية ونماذج IFRS جاهزة للتطبيق في الشركات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">معايير IFRS</h3>
              <p className="text-gray-600">إعداد التقارير وفقاً للمعايير الدولية المعتمدة</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">أدوات تحليل</h3>
              <p className="text-gray-600">أدوات متقدمة لتحليل البيانات المالية والنسب</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تكنولوجيا حديثة</h3>
              <p className="text-gray-600">استخدام أحدث التقنيات في إعداد وتحليل التقارير</p>
            </div>
          </div>

          <div className="text-center">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              سجل في الكورس الآن
              <ArrowRight className="w-5 h-5 mr-3 inline" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FinancialReportingPage;
