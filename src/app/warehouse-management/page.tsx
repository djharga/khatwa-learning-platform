'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Warehouse,
  Package,
  Shield,
  BarChart3,
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
  Target,
  TrendingUp,
  Users,
  FileText,
  AlertTriangle,
  Truck,
  Zap,
} from 'lucide-react';

const WarehouseManagementPage = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const modules = [
    {
      id: 1,
      title: 'مفهوم وأهمية إدارة المخازن والمستودعات',
      icon: Warehouse,
      color: 'from-blue-500 to-blue-600',
      duration: '2 ساعات',
      lessons: 4,
      description: 'فهم الدور الحيوي للمخازن في سلسلة الإمداد والعمليات التشغيلية',
      content: [
        {
          title: 'الدور الحيوي للمخازن في سلسلة الإمداد والتوريد',
          type: 'concept',
          duration: '30 دقيقة',
          description: 'كيف تساهم المخازن في تحسين كفاءة سلسلة الإمداد',
          objectives: [
            'فهم سلسلة الإمداد المتكاملة',
            'دور المخازن في التدفق التشغيلي',
            'التأثير على رضا العملاء',
            'تحسين الكفاءة التشغيلية'
          ],
          resources: ['مخطط سلسلة الإمداد', 'دراسات حالة', 'أمثلة عملية']
        },
        {
          title: 'أهداف إدارة المخازن (ضبط التكلفة - ضمان الجودة - تلبية احتياجات التشغيل)',
          type: 'objectives',
          duration: '35 دقيقة',
          description: 'الأهداف الرئيسية لإدارة المخازن الفعالة',
          objectives: [
            'ضبط التكاليف التشغيلية',
            'ضمان جودة المخزون',
            'تلبية احتياجات الإنتاج',
            'تحسين مستوى الخدمة'
          ],
          resources: ['مؤشرات الأداء', 'أهداف كمية', 'خطط تحسين']
        }
      ]
    },
    {
      id: 2,
      title: 'أساسيات إدارة المخازن',
      icon: Package,
      color: 'from-green-500 to-green-600',
      duration: '4 ساعات',
      lessons: 6,
      description: 'المفاهيم الأساسية والعمليات الرئيسية في إدارة المخازن',
      content: [
        {
          title: 'أنواع المخازن (مواد خام - تحت التشغيل - منتجات تامة - مستودعات توزيع)',
          type: 'classification',
          duration: '45 دقيقة',
          description: 'تصنيف أنواع المخازن المختلفة حسب الغرض والوظيفة',
          objectives: [
            'تصنيف المخازن حسب النوع',
            'خصائص كل نوع من المخازن',
            'متطلبات كل نوع',
            'استراتيجيات الإدارة المناسبة'
          ],
          resources: ['مخطط تصنيفي', 'أمثلة متنوعة', 'نماذج تصميم']
        },
        {
          title: 'طرق التخزين المختلفة (حسب طبيعة المواد - حسب حجم ووزن المنتج - تخزين مخصص أو عشوائي)',
          type: 'methods',
          duration: '50 دقيقة',
          description: 'طرق التخزين المتنوعة وكيفية اختيار الطريقة المناسبة',
          objectives: [
            'طرق التخزين الأساسية',
            'عوامل اختيار طريقة التخزين',
            'التخزين حسب خصائص المواد',
            'تحسين استخدام المساحة'
          ],
          resources: ['أنظمة تخزين', 'أدوات تصميم', 'حلول عملية']
        },
        {
          title: 'تصنيف المواد وأنظمة تكويد الأصناف',
          type: 'coding',
          duration: '40 دقيقة',
          description: 'أنظمة تصنيف المواد وتكويد الأصناف بكفاءة',
          objectives: [
            'معايير تصنيف المواد',
            'أنظمة التكويد المختلفة',
            'إدارة المعلومات',
            'تسهيل عمليات البحث والتتبع'
          ],
          resources: ['أنظمة تكويد', 'نماذج تصنيف', 'أدوات تطبيق']
        },
        {
          title: 'المستندات المخزنية الأساسية (إذن استلام - إذن صرف - بطاقة صنف - سجلات الجرد)',
          type: 'documentation',
          duration: '45 دقيقة',
          description: 'المستندات الأساسية المطلوبة في إدارة المخازن',
          objectives: [
            'إذن الاستلام والصرف',
            'بطاقات الأصناف',
            'سجلات الجرد',
            'التوثيق الإلكتروني'
          ],
          resources: ['قوالب مستندات', 'نماذج سجلات', 'أنظمة إلكترونية']
        }
      ]
    },
    {
      id: 3,
      title: 'العمليات المخزنية الأساسية',
      icon: Truck,
      color: 'from-purple-500 to-purple-600',
      duration: '6 ساعات',
      lessons: 8,
      description: 'العمليات اليومية الأساسية في إدارة المخازن والمستودعات',
      content: [
        {
          title: 'استلام المواد (إجراءات الفحص والاستلام)',
          type: 'receiving',
          duration: '45 دقيقة',
          description: 'عملية استلام المواد وفحصها بدقة واحترافية',
          objectives: [
            'إجراءات الاستلام الأساسية',
            'فحص الجودة والكمية',
            'توثيق عملية الاستلام',
            'معالجة المخالفات'
          ],
          resources: ['إجراءات استلام', 'نماذج فحص', 'تقارير جودة']
        },
        {
          title: 'التخزين الصحيح (طرق الترتيب - اشتراطات السلامة)',
          type: 'storage',
          duration: '50 دقيقة',
          description: 'طرق التخزين الآمن والمنظم للمواد المختلفة',
          objectives: [
            'مبادئ التخزين الآمن',
            'طرق الترتيب الفعالة',
            'اشتراطات السلامة',
            'منع التلف والضياع'
          ],
          resources: ['دليل تخزين', 'إرشادات سلامة', 'أدوات تنظيم']
        },
        {
          title: 'عمليات الصرف (إلى الإنتاج أو البيع)',
          type: 'issuance',
          duration: '40 دقيقة',
          description: 'عمليات صرف المواد بكفاءة ودقة',
          objectives: [
            'إجراءات الصرف الأساسية',
            'التحقق من الصلاحية',
            'توثيق عمليات الصرف',
            'إدارة المخزون الدورية'
          ],
          resources: ['إجراءات صرف', 'أنظمة تتبع', 'تقارير صرف']
        },
        {
          title: 'التعامل مع المواد المرتجعة',
          type: 'returns',
          duration: '35 دقيقة',
          description: 'إدارة المواد المرتجعة والمعاد تصنيعها',
          objectives: [
            'تصنيف المواد المرتجعة',
            'عمليات الفحص والتقييم',
            'إجراءات إعادة التخزين',
            'التوثيق والتتبع'
          ],
          resources: ['إجراءات إرجاع', 'نماذج تقييم', 'أنظمة تتبع']
        },
        {
          title: 'معالجة المواد التالفة أو المفقودة',
          type: 'damaged',
          duration: '45 دقيقة',
          description: 'التعامل مع المواد التالفة والمفقودة بكفاءة',
          objectives: [
            'تحديد أسباب التلف',
            'إجراءات التقييم',
            'معالجة المخزون المتضرر',
            'منع التكرار'
          ],
          resources: ['إجراءات تلف', 'تقارير تحقيق', 'خطط وقائية']
        }
      ]
    },
    {
      id: 4,
      title: 'الرقابة على المخزون',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      duration: '4 ساعات',
      lessons: 6,
      description: 'أنظمة الرقابة الداخلية والتدقيق على المخزون والمخازن',
      content: [
        {
          title: 'أنظمة الرقابة الداخلية الفعالة على المخازن',
          type: 'control',
          duration: '45 دقيقة',
          description: 'تطبيق أنظمة الرقابة الداخلية في المخازن',
          objectives: [
            'مبادئ الرقابة الداخلية',
            'فصل المهام والمسؤوليات',
            'أنظمة الموافقات',
            'الرقابة على الأداء'
          ],
          resources: ['أدلة رقابة', 'نماذج إجراءات', 'أدوات تدقيق']
        },
        {
          title: 'دور إدارة المراجعة الداخلية في الرقابة على المخزون',
          type: 'audit',
          duration: '40 دقيقة',
          description: 'دور المراجعة الداخلية في ضمان سلامة المخزون',
          objectives: [
            'أهداف المراجعة على المخازن',
            'أدوات وطرق المراجعة',
            'تقييم الضوابط الداخلية',
            'تقارير المراجعة'
          ],
          resources: ['أدوات مراجعة', 'قوائم فحص', 'نماذج تقارير']
        },
        {
          title: 'مؤشرات الرقابة الرئيسية: (معدل دوران المخزون - نسب الفاقد - معدلات التالف)',
          type: 'metrics',
          duration: '35 دقيقة',
          description: 'المؤشرات الرئيسية لقياس أداء المخازن',
          objectives: [
            'مؤشر دوران المخزون',
            'نسب الفاقد والتالف',
            'معدلات الدقة في العمليات',
            'مؤشرات الكفاءة'
          ],
          resources: ['حاسبات مؤشرات', 'تقارير أداء', 'أدوات قياس']
        },
        {
          title: 'الأخطاء الشائعة في إدارة المخزون وطرق الحد منها',
          type: 'errors',
          duration: '40 دقيقة',
          description: 'تحديد الأخطاء الشائعة وطرق تجنبها',
          objectives: [
            'تحديد الأخطاء الشائعة',
            'أسباب حدوث الأخطاء',
            'طرق الوقاية والتصحيح',
            'تحسين العمليات'
          ],
          resources: ['قوائم أخطاء', 'خطط تحسين', 'أفضل الممارسات']
        }
      ]
    },
    {
      id: 5,
      title: 'الجرد والتسويات المخزنية',
      icon: BarChart3,
      color: 'from-red-500 to-red-600',
      duration: '4 ساعات',
      lessons: 6,
      description: 'عمليات الجرد المخزني والتسويات المحاسبية المطلوبة',
      content: [
        {
          title: 'أنواع الجرد المختلفة (دوري - مستمر - مفاجئ)',
          type: 'inventory-types',
          duration: '40 دقيقة',
          description: 'أنواع عمليات الجرد المختلفة وتوقيتها',
          objectives: [
            'الجرد الدوري والمستمر',
            'الجرد المفاجئ',
            'مزايا وعيوب كل نوع',
            'اختيار النوع المناسب'
          ],
          resources: ['أنواع الجرد', 'جدولة زمنية', 'نماذج تطبيق']
        },
        {
          title: 'الإجراءات العملية لتنفيذ الجرد الدقيق',
          type: 'procedures',
          duration: '50 دقيقة',
          description: 'الخطوات العملية لإجراء الجرد بدقة عالية',
          objectives: [
            'التحضير للجرد',
            'تنفيذ عملية الجرد',
            'توثيق النتائج',
            'التحقق من الدقة'
          ],
          resources: ['خطة جرد', 'أوراق عمل', 'أدوات عد']
        },
        {
          title: 'معالجة الفروق الجردية (العجز - الزيادة)',
          type: 'discrepancies',
          duration: '45 دقيقة',
          description: 'التعامل مع الفروق في الجرد ومعالجتها',
          objectives: [
            'تحليل أسباب الفروق',
            'إجراءات التصحيح',
            'التوثيق المحاسبي',
            'منع التكرار'
          ],
          resources: ['نماذج فروق', 'إجراءات تصحيح', 'تقارير تحقيق']
        },
        {
          title: 'التسجيل المحاسبي الصحيح للتسويات المخزنية',
          type: 'accounting',
          duration: '45 دقيقة',
          description: 'المعالجات المحاسبية للتسويات المخزنية',
          objectives: [
            'قيود التسويات الجردية',
            'معالجة العجز والزيادة',
            'التأثير على القوائم المالية',
            'الإفصاح المحاسبي'
          ],
          resources: ['أمثلة محاسبية', 'قيود يومية', 'نماذج تقارير']
        }
      ]
    },
    {
      id: 6,
      title: 'أساليب إدارة المخزون المتطورة',
      icon: TrendingUp,
      color: 'from-indigo-500 to-indigo-600',
      duration: '5 ساعات',
      lessons: 8,
      description: 'الطرق المتقدمة والحديثة في إدارة المخزون والمخازن',
      content: [
        {
          title: 'نظام الحد الأدنى والحد الأقصى للمخزون',
          type: 'min-max',
          duration: '35 دقيقة',
          description: 'تحديد مستويات المخزون المثالية',
          objectives: [
            'مفهوم الحدود الدنيا والعليا',
            'طرق حساب المستويات',
            'فوائد النظام',
            'التطبيق العملي'
          ],
          resources: ['حاسبات حدود', 'نماذج تطبيق', 'أمثلة عملية']
        },
        {
          title: 'نموذج الكمية الاقتصادية للطلب (EOQ)',
          type: 'eoq',
          duration: '45 دقيقة',
          description: 'حساب الكمية المثالية للطلب لتقليل التكاليف',
          objectives: [
            'مكونات نموذج EOQ',
            'حساب الكمية الاقتصادية',
            'عوامل التأثير',
            'التطبيق في الممارسة'
          ],
          resources: ['حاسبات EOQ', 'أمثلة محسوبة', 'نماذج تطبيق']
        },
        {
          title: 'التخطيط الاستراتيجي للاحتياجات من المخزون',
          type: 'planning',
          duration: '40 دقيقة',
          description: 'التخطيط طويل الأمد لاحتياجات المخزون',
          objectives: [
            'تحليل الاحتياجات المستقبلية',
            'التخطيط الاستراتيجي',
            'إدارة المخاطر',
            'تحسين الكفاءة'
          ],
          resources: ['خطط استراتيجية', 'أدوات تحليل', 'نماذج توقع']
        },
        {
          title: 'التنسيق الفعال مع أقسام المشتريات والإنتاج والمبيعات',
          type: 'coordination',
          duration: '50 دقيقة',
          description: 'تنسيق المخازن مع الإدارات الأخرى',
          objectives: [
            'التكامل مع المشتريات',
            'التنسيق مع الإنتاج',
            'التعاون مع المبيعات',
            'تحسين التدفق العام'
          ],
          resources: ['نماذج تنسيق', 'خطط تعاون', 'أنظمة متكاملة']
        },
        {
          title: 'إدارة وتحليل تكلفة التخزين',
          type: 'cost-analysis',
          duration: '45 دقيقة',
          description: 'تحليل وإدارة تكاليف المخازن والتخزين',
          objectives: [
            'تصنيف تكاليف المخازن',
            'طرق تحليل التكلفة',
            'تحسين الكفاءة',
            'اتخاذ القرارات المالية'
          ],
          resources: ['تحليل تكلفة', 'نماذج حساب', 'تقارير مالية']
        },
        {
          title: 'دور المستودعات في تحسين مستوى خدمة العملاء',
          type: 'service',
          duration: '40 دقيقة',
          description: 'كيف تساهم المخازن في تحسين خدمة العملاء',
          objectives: [
            'فهم متطلبات العملاء',
            'تحسين توافر المنتجات',
            'تسريع عمليات التسليم',
            'تعزيز الرضا العام'
          ],
          resources: ['مؤشرات خدمة', 'استطلاعات رضا', 'خطط تحسين']
        }
      ]
    },
    {
      id: 7,
      title: 'الصحة والسلامة المهنية في المستودعات',
      icon: AlertTriangle,
      color: 'from-teal-500 to-teal-600',
      duration: '3 ساعات',
      lessons: 5,
      description: 'معايير السلامة والصحة المهنية في بيئة المستودعات',
      content: [
        {
          title: 'معايير الأمن الصناعي في بيئة العمل',
          type: 'safety',
          duration: '40 دقيقة',
          description: 'معايير السلامة الأساسية في المستودعات',
          objectives: [
            'معايير الأمن الأساسية',
            'معدات الوقاية الشخصية',
            'إجراءات الطوارئ',
            'التدريب على السلامة'
          ],
          resources: ['دليل سلامة', 'معدات وقاية', 'خطط طوارئ']
        },
        {
          title: 'التعامل الآمن مع المواد الخطرة والقابلة للاشتعال',
          type: 'hazmat',
          duration: '45 دقيقة',
          description: 'التعامل الآمن مع المواد الخطرة والمتفجرة',
          objectives: [
            'تصنيف المواد الخطرة',
            'إجراءات التخزين الآمن',
            'معدات الوقاية الخاصة',
            'خطط الاستجابة للحوادث'
          ],
          resources: ['إرشادات خطر', 'معدات متخصصة', 'خطط استجابة']
        },
        {
          title: 'اشتراطات التخزين الخاصة للمواد الغذائية والدوائية',
          type: 'special-storage',
          duration: '35 دقيقة',
          description: 'متطلبات تخزين المواد الحساسة',
          objectives: [
            'اشتراطات المواد الغذائية',
            'متطلبات المواد الدوائية',
            'ضوابط درجة الحرارة',
            'معايير النظافة والتعقيم'
          ],
          resources: ['معايير غذائية', 'متطلبات دوائية', 'أنظمة رقابة']
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
            <Warehouse className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-bold">إدارة المخازن والمستودعات</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            كورس شامل في إدارة المخازن
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تعلم إدارة المخازن والمستودعات بكفاءة عالية مع أحدث التقنيات والممارسات العالمية
          </p>

          {/* معلومات الكورس */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">28 ساعة</div>
              <div className="text-gray-600">مدة التدريب</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">33 درس</div>
              <div className="text-gray-600">محتوى تعليمي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">1,700 طالب</div>
              <div className="text-gray-600">عدد المتعلمين</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.6/5</div>
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
                    <Icon className="w-5 h-5" />
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
                  const Icon = modules[activeModule].icon;
                  return <Icon className="w-8 h-8" />;
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
                      lesson.type === 'concept' ? 'bg-blue-100 text-blue-600' :
                      lesson.type === 'objectives' ? 'bg-green-100 text-green-600' :
                      lesson.type === 'classification' ? 'bg-purple-100 text-purple-600' :
                      lesson.type === 'methods' ? 'bg-orange-100 text-orange-600' :
                      lesson.type === 'coding' ? 'bg-red-100 text-red-600' :
                      lesson.type === 'documentation' ? 'bg-indigo-100 text-indigo-600' :
                      lesson.type === 'receiving' ? 'bg-teal-100 text-teal-600' :
                      lesson.type === 'storage' ? 'bg-cyan-100 text-cyan-600' :
                      lesson.type === 'issuance' ? 'bg-pink-100 text-pink-600' :
                      lesson.type === 'returns' ? 'bg-lime-100 text-lime-600' :
                      lesson.type === 'damaged' ? 'bg-emerald-100 text-emerald-600' :
                      lesson.type === 'control' ? 'bg-violet-100 text-violet-600' :
                      lesson.type === 'audit' ? 'bg-rose-100 text-rose-600' :
                      lesson.type === 'metrics' ? 'bg-amber-100 text-amber-600' :
                      lesson.type === 'errors' ? 'bg-stone-100 text-stone-600' :
                      lesson.type === 'inventory-types' ? 'bg-neutral-100 text-neutral-600' :
                      lesson.type === 'procedures' ? 'bg-gray-100 text-gray-600' :
                      lesson.type === 'discrepancies' ? 'bg-slate-100 text-slate-600' :
                      lesson.type === 'accounting' ? 'bg-zinc-100 text-zinc-600' :
                      lesson.type === 'min-max' ? 'bg-blue-100 text-blue-600' :
                      lesson.type === 'eoq' ? 'bg-green-100 text-green-600' :
                      lesson.type === 'planning' ? 'bg-purple-100 text-purple-600' :
                      lesson.type === 'coordination' ? 'bg-orange-100 text-orange-600' :
                      lesson.type === 'cost-analysis' ? 'bg-red-100 text-red-600' :
                      lesson.type === 'service' ? 'bg-indigo-100 text-indigo-600' :
                      lesson.type === 'safety' ? 'bg-teal-100 text-teal-600' :
                      lesson.type === 'hazmat' ? 'bg-cyan-100 text-cyan-600' :
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
                          {lesson.type === 'concept' ? 'مفاهيم أساسية' :
                           lesson.type === 'objectives' ? 'أهداف' :
                           lesson.type === 'classification' ? 'تصنيف' :
                           lesson.type === 'methods' ? 'طرق' :
                           lesson.type === 'coding' ? 'تكويد' :
                           lesson.type === 'documentation' ? 'توثيق' :
                           lesson.type === 'receiving' ? 'استلام' :
                           lesson.type === 'storage' ? 'تخزين' :
                           lesson.type === 'issuance' ? 'صرف' :
                           lesson.type === 'returns' ? 'إرجاع' :
                           lesson.type === 'damaged' ? 'تالف' :
                           lesson.type === 'control' ? 'رقابة' :
                           lesson.type === 'audit' ? 'مراجعة' :
                           lesson.type === 'metrics' ? 'مؤشرات' :
                           lesson.type === 'errors' ? 'أخطاء' :
                           lesson.type === 'inventory-types' ? 'أنواع جرد' :
                           lesson.type === 'procedures' ? 'إجراءات' :
                           lesson.type === 'discrepancies' ? 'فروق' :
                           lesson.type === 'accounting' ? 'محاسبي' :
                           lesson.type === 'min-max' ? 'حدود مخزون' :
                           lesson.type === 'eoq' ? 'كمية اقتصادية' :
                           lesson.type === 'planning' ? 'تخطيط' :
                           lesson.type === 'coordination' ? 'تنسيق' :
                           lesson.type === 'cost-analysis' ? 'تحليل تكلفة' :
                           lesson.type === 'service' ? 'خدمة' :
                           lesson.type === 'safety' ? 'سلامة' :
                           lesson.type === 'hazmat' ? 'مواد خطرة' :
                           lesson.type === 'special-storage' ? 'تخزين خاص' :
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
                            <span className="text-gray-600">تقييم الدرس: 4.6/5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">850 متعلم</span>
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
              تدريب عملي شامل مع أمثلة حقيقية ونماذج جاهزة للتطبيق الفوري في المستودعات
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تقنيات حديثة</h3>
              <p className="text-gray-600">أحدث التقنيات والممارسات العالمية في إدارة المخازن</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">سلامة وأمان</h3>
              <p className="text-gray-600">معايير السلامة والأمان في بيئة المستودعات</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تحسين الأداء</h3>
              <p className="text-gray-600">أدوات ومؤشرات قياس وتحسين أداء المخازن</p>
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

export default WarehouseManagementPage;
