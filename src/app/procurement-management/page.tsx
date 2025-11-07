'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Truck,
  Target,
  FileText,
  Users,
  DollarSign,
  Calculator,
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
  ShoppingCart,
  ClipboardList,
  Handshake,
  Shield,
  TrendingUp,
  Settings,
} from 'lucide-react';

const ProcurementManagementPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  const getIconComponent = (iconName: string) => {
    const iconMap: Record<string, any> = {
      'Target': Target,
      'ShoppingCart': ShoppingCart,
      'ClipboardList': ClipboardList,
      'Handshake': Handshake,
      'Truck': Truck,
      'BarChart3': BarChart3,
      'Shield': Shield,
      'TrendingUp': TrendingUp,
      'Users': Users,
      'Settings': Settings,
    };
    const IconComponent = iconMap[iconName] || FileText;
    return IconComponent;
  };

  const sections = [
    {
      id: 1,
      title: 'تعريف وأهمية إدارة المشتريات والتوريدات',
      icon: 'Target',
      color: 'from-blue-500 to-blue-600',
      duration: '2 ساعات',
      topics: 4,
      description: 'فهم أساسيات إدارة المشتريات ودورها في سلسلة الإمداد',
      content: [
        {
          title: 'دورها الحيوي في سلسلة الإمداد (Supply Chain)',
          type: 'concept',
          duration: '30 دقيقة',
          description: 'كيف تساهم المشتريات في تحسين سلسلة الإمداد',
          objectives: [
            'فهم سلسلة الإمداد المتكاملة',
            'دور المشتريات في الكفاءة التشغيلية',
            'التأثير على رضا العملاء',
            'تحسين الأداء المالي'
          ],
          resources: ['مخطط سلسلة الإمداد', 'دراسات حالة', 'أمثلة عملية']
        },
        {
          title: 'أهداف المشتريات الاستراتيجية',
          type: 'strategy',
          duration: '35 دقيقة',
          description: 'الأهداف الرئيسية لإدارة المشتريات الفعالة',
          objectives: [
            'تقليل التكلفة الإجمالية',
            'ضمان جودة المواد والخدمات',
            'استمرارية التوريد',
            'بناء علاقات قوية مع الموردين'
          ],
          resources: ['استراتيجيات المشتريات', 'مؤشرات الأداء', 'خطط عمل']
        }
      ]
    },
    {
      id: 2,
      title: 'أساسيات المشتريات',
      icon: ShoppingCart,
      color: 'from-green-500 to-green-600',
      duration: '4 ساعات',
      topics: 6,
      description: 'المفاهيم الأساسية والعمليات الرئيسية في المشتريات',
      content: [
        {
          title: 'مفهوم دورة المشتريات المتكاملة',
          type: 'process',
          duration: '45 دقيقة',
          description: 'فهم الخطوات المتتالية في عملية المشتريات',
          objectives: [
            'تحديد الاحتياجات',
            'البحث عن الموردين',
            'المفاوضات والعقود',
            'التنفيذ والمتابعة'
          ],
          resources: ['مخطط دورة المشتريات', 'قوالب عمليات', 'أمثلة تطبيقية']
        },
        {
          title: 'الفرق بين المشتريات المحلية والمستوردة',
          type: 'comparison',
          duration: '40 دقيقة',
          description: 'مقارنة بين أنواع المشتريات المختلفة',
          objectives: [
            'خصائص المشتريات المحلية',
            'تحديات المشتريات المستوردة',
            'العوامل المؤثرة في الاختيار',
            'استراتيجيات كل نوع'
          ],
          resources: ['جدول مقارن', 'دراسات حالة', 'تحليل تكلفة']
        },
        {
          title: 'أنواع المشتريات (مواد خام - خدمات - مستلزمات تشغيل - أصول ثابتة)',
          type: 'classification',
          duration: '50 دقيقة',
          description: 'تصنيف أنواع المشتريات المختلفة',
          objectives: [
            'تصنيف المواد والخدمات',
            'خصائص كل نوع',
            'عمليات الشراء المناسبة',
            'إدارة المخاطر لكل نوع'
          ],
          resources: ['مخطط تصنيفي', 'أمثلة عملية', 'إرشادات تطبيقية']
        },
        {
          title: 'السياسات والإجراءات المرتبطة بعمليات الشراء',
          type: 'policy',
          duration: '35 دقيقة',
          description: 'السياسات والإجراءات المطلوبة للمشتريات الفعالة',
          objectives: [
            'سياسات الشراء الموحدة',
            'إجراءات الموافقة',
            'معايير التقييم',
            'ضوابط الرقابة الداخلية'
          ],
          resources: ['قوالب سياسات', 'نماذج إجراءات', 'أدلة عمل']
        }
      ]
    },
    {
      id: 3,
      title: 'دورة وإجراءات المشتريات',
      icon: ClipboardList,
      color: 'from-purple-500 to-purple-600',
      duration: '6 ساعات',
      topics: 8,
      description: 'الخطوات العملية والإجراءات التفصيلية للمشتريات',
      content: [
        {
          title: 'تحديد الاحتياجات الفعلية وإعداد طلبات الشراء',
          type: 'planning',
          duration: '40 دقيقة',
          description: 'كيفية تحديد وتوثيق الاحتياجات بدقة',
          objectives: [
            'تحليل الاحتياجات التشغيلية',
            'إعداد مواصفات فنية',
            'تحديد الكميات والتوقيتات',
            'إعداد طلبات الشراء الرسمية'
          ],
          resources: ['قوالب طلبات شراء', 'نماذج مواصفات', 'أدوات تحليل']
        },
        {
          title: 'دراسة وتحليل عروض الأسعار (RFQ)',
          type: 'analysis',
          duration: '45 دقيقة',
          description: 'طرق تقييم وتحليل عروض الأسعار المختلفة',
          objectives: [
            'معايير تقييم العروض',
            'تحليل التكلفة الإجمالية',
            'مقارنة الجودة والمواصفات',
            'اختيار العرض الأمثل'
          ],
          resources: ['نماذج RFQ', 'أدوات تقييم', 'دراسات مقارنة']
        },
        {
          title: 'تقييم واختيار الموردين المناسبين',
          type: 'evaluation',
          duration: '50 دقيقة',
          description: 'معايير وطرق تقييم واختيار الموردين',
          objectives: [
            'معايير اختيار الموردين',
            'نظام التقييم المرجح',
            'فحص السمعة والأداء',
            'إعداد قائمة الموردين المعتمدين'
          ],
          resources: ['استمارات تقييم', 'معايير تقييم', 'نماذج قرار']
        },
        {
          title: 'فن التفاوض الفعال مع الموردين',
          type: 'negotiation',
          duration: '55 دقيقة',
          description: 'مهارات وتقنيات التفاوض الناجح',
          objectives: [
            'استراتيجيات التفاوض',
            'تقنيات التواصل الفعال',
            'إدارة الخلافات',
            'إبرام الصفقات المربحة'
          ],
          resources: ['سيناريوهات تفاوض', 'أدوات مساومة', 'دراسات حالة']
        },
        {
          title: 'إصدار أوامر الشراء (Purchase Orders)',
          type: 'documentation',
          duration: '35 دقيقة',
          description: 'إعداد وإصدار أوامر الشراء الرسمية',
          objectives: [
            'مكونات أمر الشراء',
            'المعلومات المطلوبة',
            'الشروط والأحكام',
            'متابعة التنفيذ'
          ],
          resources: ['قوالب أوامر شراء', 'نماذج رسمية', 'أمثلة تطبيقية']
        },
        {
          title: 'إجراءات استلام المواد وفحص الجودة',
          type: 'quality',
          duration: '40 دقيقة',
          description: 'عمليات الاستلام والفحص النوعي',
          objectives: [
            'إجراءات الاستلام',
            'فحص الجودة والكمية',
            'توثيق المطابقة',
            'معالجة المخالفات'
          ],
          resources: ['قوائم فحص', 'تقارير جودة', 'إجراءات تصحيح']
        },
        {
          title: 'التسوية المالية وإدارة سداد الفواتير',
          type: 'financial',
          duration: '45 دقيقة',
          description: 'إدارة الجوانب المالية للمشتريات',
          objectives: [
            'التحقق من الفواتير',
            'إجراءات الدفع',
            'إدارة الخصومات',
            'حل النزاعات المالية'
          ],
          resources: ['إجراءات دفع', 'نماذج تسوية', 'تقارير مالية']
        }
      ]
    },
    {
      id: 4,
      title: 'إدارة الموردين والعقود',
      icon: Handshake,
      color: 'from-orange-500 to-orange-600',
      duration: '4 ساعات',
      topics: 6,
      description: 'بناء وإدارة علاقات مستدامة مع الموردين',
      content: [
        {
          title: 'معايير اختيار الموردين (الجودة - السعر - الالتزام بالوقت - القدرة الإنتاجية)',
          type: 'criteria',
          duration: '45 دقيقة',
          description: 'المعايير الشاملة لاختيار الموردين المثاليين',
          objectives: [
            'معايير الجودة والمواصفات',
            'تحليل التكلفة والسعر',
            'تقييم الالتزام بالمواعيد',
            'قياس القدرة الإنتاجية'
          ],
          resources: ['نماذج تقييم', 'معايير مرجحة', 'أدوات قياس']
        },
        {
          title: 'تقييم أداء الموردين بشكل دوري ومنتظم',
          type: 'performance',
          duration: '40 دقيقة',
          description: 'أنظمة تقييم أداء الموردين المستمر',
          objectives: [
            'مؤشرات الأداء الرئيسية',
            'أدوات التقييم الدوري',
            'تحليل الاتجاهات',
            'خطط التحسين'
          ],
          resources: ['استمارات تقييم', 'تقارير أداء', 'خطط تطوير']
        },
        {
          title: 'إدارة العلاقة مع الموردين (Supplier Relationship Management)',
          type: 'relationship',
          duration: '35 دقيقة',
          description: 'بناء شراكات طويلة الأمد مع الموردين',
          objectives: [
            'استراتيجيات بناء الثقة',
            'التواصل الفعال',
            'مشاركة المعلومات',
            'التعاون في التطوير'
          ],
          resources: ['خطط علاقات', 'أدوات تواصل', 'برامج شراكة']
        },
        {
          title: 'إعداد العقود والاتفاقيات القانونية مع الموردين',
          type: 'legal',
          duration: '50 دقيقة',
          description: 'صياغة وإدارة العقود التجارية',
          objectives: [
            'مكونات العقد القانونية',
            'الشروط والأحكام الرئيسية',
            'حماية المصالح',
            'إدارة التعديلات والتجديد'
          ],
          resources: ['نماذج عقود', 'شروط قياسية', 'أدلة قانونية']
        },
        {
          title: 'إدارة المخاطر في سلسلة التوريد',
          type: 'risk',
          duration: '45 دقيقة',
          description: 'تحديد وإدارة المخاطر في سلسلة التوريد',
          objectives: [
            'تحديد المخاطر المحتملة',
            'تقييم تأثير المخاطر',
            'خطط الطوارئ',
            'استراتيجيات التخفيف'
          ],
          resources: ['خرائط مخاطر', 'خطط طوارئ', 'أدوات تقييم']
        }
      ]
    },
    {
      id: 5,
      title: 'المشتريات الدولية والتوريدات',
      icon: Truck,
      color: 'from-red-500 to-red-600',
      duration: '3 ساعات',
      topics: 4,
      description: 'التوريدات الدولية والشحن والإجراءات الجمركية',
      content: [
        {
          title: 'الفرق الواضح بين الشراء (Purchasing) والتوريد (Procurement)',
          type: 'distinction',
          duration: '30 دقيقة',
          description: 'فهم الاختلاف بين المفهومين',
          objectives: [
            'تعريف كل مصطلح',
            'الاختلافات الأساسية',
            'النطاق والمسؤوليات',
            'التطبيقات العملية'
          ],
          resources: ['مقارنة مفاهيم', 'أمثلة توضيحية', 'دراسات حالة']
        },
        {
          title: 'التوريدات الدولية - الشحن - التخليص الجمركي - الاعتمادات المستندية (L C)',
          type: 'international',
          duration: '60 دقيقة',
          description: 'عمليات التوريد الدولي الشاملة',
          objectives: [
            'إجراءات الشحن الدولي',
            'التخليص الجمركي',
            'الاعتمادات المستندية',
            'إدارة المخاطر الدولية'
          ],
          resources: ['إرشادات شحن', 'نماذج جمركية', 'عقود اعتماد']
        },
        {
          title: 'إدارة التوريدات الطارئة والحرجة',
          type: 'emergency',
          duration: '40 دقيقة',
          description: 'استراتيجيات التعامل مع التوريدات الطارئة',
          objectives: [
            'تحديد التوريدات الحرجة',
            'خطط الطوارئ',
            'مصادر بديلة',
            'إدارة الأولويات'
          ],
          resources: ['خطط طوارئ', 'قوائم موردين', 'أدوات اتخاذ قرار']
        }
      ]
    },
    {
      id: 6,
      title: 'التخطيط والرقابة في المشتريات',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      duration: '4 ساعات',
      topics: 6,
      description: 'التخطيط الاستراتيجي والرقابة الفعالة للمشتريات',
      content: [
        {
          title: 'وضع خطط المشتريات السنوية والاستراتيجية',
          type: 'planning',
          duration: '45 دقيقة',
          description: 'إعداد الخطط الاستراتيجية للمشتريات',
          objectives: [
            'تحليل الاحتياجات المستقبلية',
            'وضع الأهداف الاستراتيجية',
            'تطوير الخطط التنفيذية',
            'متابعة التنفيذ'
          ],
          resources: ['قوالب خطط', 'أدوات تحليل', 'مؤشرات أداء']
        },
        {
          title: 'إدارة الميزانية المخصصة للمشتريات',
          type: 'budget',
          duration: '35 دقيقة',
          description: 'إدارة ومراقبة ميزانية المشتريات',
          objectives: [
            'تحديد الميزانية السنوية',
            'توزيع الميزانية',
            'مراقبة الإنفاق',
            'إدارة الانحرافات'
          ],
          resources: ['نماذج ميزانيات', 'تقارير إنفاق', 'أدوات مراقبة']
        },
        {
          title: 'الرقابة الداخلية الفعالة على عمليات الشراء',
          type: 'control',
          duration: '40 دقيقة',
          description: 'أنظمة الرقابة الداخلية في المشتريات',
          objectives: [
            'مبادئ الرقابة الداخلية',
            'فصل المهام والمسؤوليات',
            'أنظمة الموافقات',
            'الرقابة على الأداء'
          ],
          resources: ['إجراءات رقابة', 'نماذج موافقات', 'أدوات تدقيق']
        },
        {
          title: 'تحليل التكاليف وإدارة المناقصات',
          type: 'analysis',
          duration: '50 دقيقة',
          description: 'تحليل التكاليف وإدارة عمليات المناقصات',
          objectives: [
            'تحليل التكلفة الإجمالية',
            'إعداد المناقصات',
            'تقييم العروض',
            'اختيار الفائز'
          ],
          resources: ['نماذج مناقصات', 'أدوات تحليل', 'قرارات منح']
        },
        {
          title: 'مؤشرات الأداء الرئيسية (KPI\'s) في المشتريات',
          type: 'metrics',
          duration: '45 دقيقة',
          description: 'قياس وتحليل أداء إدارة المشتريات',
          objectives: [
            'مؤشرات التكلفة',
            'مؤشرات الجودة',
            'مؤشرات التوقيت',
            'مؤشرات العلاقات'
          ],
          resources: ['لوحات مؤشرات', 'تقارير أداء', 'أدوات قياس']
        }
      ]
    },
    {
      id: 7,
      title: 'التكنولوجيا في المشتريات',
      icon: Settings,
      color: 'from-teal-500 to-teal-600',
      duration: '2 ساعات',
      topics: 3,
      description: 'الأدوات التكنولوجية الحديثة في إدارة المشتريات',
      content: [
        {
          title: 'قواعد بيانات الموردين الإلكترونية',
          type: 'database',
          duration: '35 دقيقة',
          description: 'إدارة قواعد البيانات الإلكترونية للموردين',
          objectives: [
            'تصميم قواعد البيانات',
            'إدخال وتحديث البيانات',
            'البحث والاستعلام',
            'إدارة المعلومات'
          ],
          resources: ['نماذج قواعد', 'أدوات إدارة', 'تطبيقات عملية']
        },
        {
          title: 'استخدام التحليلات والذكاء الاصطناعي في التنبؤ بالاحتياجات',
          type: 'ai',
          duration: '45 دقيقة',
          description: 'تطبيق الذكاء الاصطناعي في التنبؤ والتحليل',
          objectives: [
            'تحليل البيانات التاريخية',
            'التنبؤ بالاحتياجات',
            'تحسين عمليات الشراء',
            'اتخاذ القرارات الذكية'
          ],
          resources: ['أدوات تحليل', 'نماذج تنبؤ', 'تقارير ذكية']
        }
      ]
    },
    {
      id: 8,
      title: 'الجوانب اللوجستية للمشتريات والتوريدات',
      icon: TrendingUp,
      color: 'from-pink-500 to-pink-600',
      duration: '3 ساعات',
      topics: 5,
      description: 'الربط اللوجستي والتنسيق مع الإدارات الأخرى',
      content: [
        {
          title: 'الربط الاستراتيجي بين المشتريات والمخازن والإنتاج',
          type: 'integration',
          duration: '40 دقيقة',
          description: 'تنسيق المشتريات مع الإدارات الأخرى',
          objectives: [
            'تكامل مع المخازن',
            'التنسيق مع الإنتاج',
            'تحسين التدفق التشغيلي',
            'تقليل التكاليف'
          ],
          resources: ['مخططات تكامل', 'إجراءات تنسيق', 'نماذج تعاون']
        },
        {
          title: 'إدارة عمليات النقل والتوزيع بكفاءة',
          type: 'logistics',
          duration: '35 دقيقة',
          description: 'إدارة النقل والتوزيع الفعال',
          objectives: [
            'اختيار طرق النقل',
            'تحسين التكاليف',
            'ضمان التوقيت',
            'إدارة المخاطر'
          ],
          resources: ['خطط نقل', 'تحليل تكلفة', 'أدوات تتبع']
        },
        {
          title: 'استراتيجيات تخفيض تكلفة النقل والتخزين',
          type: 'optimization',
          duration: '30 دقيقة',
          description: 'استراتيجيات تحسين التكاليف اللوجستية',
          objectives: [
            'تحليل التكاليف الحالية',
            'استراتيجيات التوفير',
            'تحسين الكفاءة',
            'قياس النتائج'
          ],
          resources: ['دراسات تكلفة', 'خطط تحسين', 'مؤشرات قياس']
        },
        {
          title: 'تأثير إدارة المشتريات على مستوى خدمة العملاء',
          type: 'impact',
          duration: '35 دقيقة',
          description: 'قياس تأثير المشتريات على رضا العملاء',
          objectives: [
            'فهم احتياجات العملاء',
            'تحسين جودة المنتجات',
            'تسريع التسليم',
            'تعزيز الولاء'
          ],
          resources: ['استطلاعات عملاء', 'مؤشرات خدمة', 'دراسات رضا']
        }
      ]
    }
  ];

  const toggleTopic = (topicTitle: string) => {
    setExpandedTopic(expandedTopic === topicTitle ? null : topicTitle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="container mx-auto max-w-7xl px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-green-100 px-6 py-3 rounded-full mb-6">
            <Truck className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-bold">إدارة المشتريات والتوريدات</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            كورس شامل في إدارة المشتريات
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تعلم إدارة المشتريات والتوريدات بكفاءة مع استراتيجيات التفاوض وعقود الشراء المتقدمة
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
              <div className="text-2xl font-bold text-gray-900">36 درس</div>
              <div className="text-gray-600">محتوى تعليمي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">1,900 طالب</div>
              <div className="text-gray-600">عدد المتعلمين</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.7/5</div>
              <div className="text-gray-600">تقييم الكورس</div>
            </div>
          </div>
        </motion.div>

        {/* اختيار القسم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => setActiveSection(index)}
                    className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 whitespace-nowrap ${
                      activeSection === index
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{section.title.split('(')[0].trim()}</span>
                    <span className="sm:hidden">القسم {section.id}</span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* محتوى القسم النشط */}
        {sections[activeSection] && (
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className={`bg-gradient-to-r ${sections[activeSection].color} rounded-3xl p-8 mb-8 text-white`}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-2">{sections[activeSection].title}</h2>
                <p className="text-lg opacity-90">{sections[activeSection].description}</p>
              </div>
              <div className={"w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur"}>
                {(() => {
                  const Icon = sections[activeSection].icon;
                  return <Icon className="w-8 h-8" />;
                })()}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">{sections[activeSection].topics}</div>
                <div className="text-sm opacity-90">عدد المواضيع</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">{sections[activeSection].duration}</div>
                <div className="text-sm opacity-90">مدة القسم</div>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <div className="text-2xl font-bold">
                  {Math.round(parseInt(sections[activeSection].duration.split(' ')[0]) / sections[activeSection].topics * 10) / 10}
                </div>
                <div className="text-sm opacity-90">ساعة للموضوع</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* قائمة المواضيع */}
        <div className="space-y-4">
          {sections[activeSection]?.content.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleTopic(topic.title)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      topic.type === 'concept' ? 'bg-blue-100 text-blue-600' :
                      topic.type === 'strategy' ? 'bg-purple-100 text-purple-600' :
                      topic.type === 'process' ? 'bg-green-100 text-green-600' :
                      topic.type === 'comparison' ? 'bg-orange-100 text-orange-600' :
                      topic.type === 'classification' ? 'bg-red-100 text-red-600' :
                      topic.type === 'policy' ? 'bg-indigo-100 text-indigo-600' :
                      topic.type === 'planning' ? 'bg-teal-100 text-teal-600' :
                      topic.type === 'analysis' ? 'bg-pink-100 text-pink-600' :
                      topic.type === 'evaluation' ? 'bg-cyan-100 text-cyan-600' :
                      topic.type === 'negotiation' ? 'bg-yellow-100 text-yellow-600' :
                      topic.type === 'documentation' ? 'bg-gray-100 text-gray-600' :
                      topic.type === 'quality' ? 'bg-lime-100 text-lime-600' :
                      topic.type === 'financial' ? 'bg-emerald-100 text-emerald-600' :
                      topic.type === 'criteria' ? 'bg-violet-100 text-violet-600' :
                      topic.type === 'performance' ? 'bg-rose-100 text-rose-600' :
                      topic.type === 'relationship' ? 'bg-amber-100 text-amber-600' :
                      topic.type === 'legal' ? 'bg-stone-100 text-stone-600' :
                      topic.type === 'risk' ? 'bg-slate-100 text-slate-600' :
                      topic.type === 'distinction' ? 'bg-zinc-100 text-zinc-600' :
                      topic.type === 'international' ? 'bg-neutral-100 text-neutral-600' :
                      topic.type === 'emergency' ? 'bg-sky-100 text-sky-600' :
                      topic.type === 'budget' ? 'bg-indigo-100 text-indigo-600' :
                      topic.type === 'control' ? 'bg-purple-100 text-purple-600' :
                      topic.type === 'metrics' ? 'bg-fuchsia-100 text-fuchsia-600' :
                      topic.type === 'database' ? 'bg-blue-100 text-blue-600' :
                      topic.type === 'ai' ? 'bg-purple-100 text-purple-600' :
                      topic.type === 'integration' ? 'bg-green-100 text-green-600' :
                      topic.type === 'logistics' ? 'bg-orange-100 text-orange-600' :
                      topic.type === 'optimization' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{topic.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {topic.duration}
                        </span>
                        <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                          {topic.type === 'concept' ? 'مفاهيم أساسية' :
                           topic.type === 'strategy' ? 'استراتيجيات' :
                           topic.type === 'process' ? 'عمليات' :
                           topic.type === 'comparison' ? 'مقارنة' :
                           topic.type === 'classification' ? 'تصنيف' :
                           topic.type === 'policy' ? 'سياسات' :
                           topic.type === 'planning' ? 'تخطيط' :
                           topic.type === 'analysis' ? 'تحليل' :
                           topic.type === 'evaluation' ? 'تقييم' :
                           topic.type === 'negotiation' ? 'تفاوض' :
                           topic.type === 'documentation' ? 'توثيق' :
                           topic.type === 'quality' ? 'جودة' :
                           topic.type === 'financial' ? 'مالي' :
                           topic.type === 'criteria' ? 'معايير' :
                           topic.type === 'performance' ? 'أداء' :
                           topic.type === 'relationship' ? 'علاقات' :
                           topic.type === 'legal' ? 'قانوني' :
                           topic.type === 'risk' ? 'مخاطر' :
                           topic.type === 'distinction' ? 'تمييز' :
                           topic.type === 'international' ? 'دولي' :
                           topic.type === 'emergency' ? 'طوارئ' :
                           topic.type === 'budget' ? 'ميزانية' :
                           topic.type === 'control' ? 'رقابة' :
                           topic.type === 'metrics' ? 'مؤشرات' :
                           topic.type === 'database' ? 'قواعد بيانات' :
                           topic.type === 'ai' ? 'ذكاء اصطناعي' :
                           topic.type === 'integration' ? 'تكامل' :
                           topic.type === 'logistics' ? 'لوجستيات' :
                           topic.type === 'optimization' ? 'تحسين' :
                           topic.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <motion.button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-colors flex items-center gap-2 border border-blue-400/50 dark:border-blue-300/50 hover:border-blue-300 dark:hover:border-blue-200 ring-1 ring-blue-500/20 hover:ring-blue-400/40"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Play className="w-4 h-4" />
                      ابدأ
                    </motion.button>
                    {expandedTopic === topic.title ? (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedTopic === topic.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100 bg-gray-50"
                  >
                    <div className="p-6">
                      <p className="text-gray-700 mb-6 text-lg">{topic.description}</p>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-600" />
                            أهداف الدرس:
                          </h4>
                          <ul className="space-y-2">
                            {topic.objectives.map((objective, objIndex) => (
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
                            {topic.resources.map((resource, resIndex) => (
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
                            <span className="text-gray-600">تقييم الدرس: 4.7/5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">950 متعلم</span>
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
              تدريب عملي شامل مع أمثلة حقيقية ونماذج جاهزة للتطبيق الفوري
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">خبرة عملية</h3>
              <p className="text-gray-600">تطبيقات عملية وحالات دراسية حقيقية</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">نماذج جاهزة</h3>
              <p className="text-gray-600">قوالب وعقود ونماذج جاهزة للاستخدام</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">مهارات متقدمة</h3>
              <p className="text-gray-600">تطوير مهارات التفاوض والإدارة الاستراتيجية</p>
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

export default ProcurementManagementPage;
