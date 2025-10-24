'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Target,
  TrendingUp,
  Calculator,
  PieChart,
  BarChart3,
  DollarSign,
  FileText,
  Play,
  Download,
  CheckCircle,
  Clock,
  Users,
  Award,
  ChevronDown,
  ChevronRight,
  Star,
  ArrowRight,
} from 'lucide-react';

const FinanceBasicsPage = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const modules = [
    {
      id: 1,
      title: 'مدخل إلى المالية (Intro to Finance)',
      icon: DollarSign,
      color: 'from-blue-500 to-blue-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'أساسيات الإدارة المالية وأهميتها في المنظمات',
      content: [
        {
          title: 'ما هي الإدارة المالية ولماذا هي مهمة؟',
          type: 'video',
          duration: '45 دقيقة',
          description: 'فهم دور الإدارة المالية في نجاح المنظمات',
          objectives: [
            'تعريف الإدارة المالية',
            'أهمية الإدارة المالية للشركات',
            'الفرق بين الإدارة المالية والمحاسبة'
          ],
          resources: ['شرائح PDF', 'أمثلة عملية', 'اختبار قصير']
        },
        {
          title: 'الفرق الواضح بين المحاسبة والمالية',
          type: 'interactive',
          duration: '30 دقيقة',
          description: 'مقارنة بين المهنتين ونطاق عمل كل منهما',
          objectives: [
            'الاختلافات الأساسية بين المحاسبة والمالية',
            'دور كل تخصص في المنظمة',
            'متطلبات كل مجال مهنياً'
          ],
          resources: ['جدول مقارن', 'دراسات حالة', 'تمرين تفاعلي']
        },
        {
          title: 'الأهداف الأساسية للإدارة المالية',
          type: 'presentation',
          duration: '35 دقيقة',
          description: 'الأهداف الرئيسية والاستراتيجية للإدارة المالية',
          objectives: [
            'تعظيم قيمة الشركة',
            'إدارة المخاطر المالية',
            'ضمان الاستدامة المالية',
            'تحقيق التوازن المالي'
          ],
          resources: ['مخططات توضيحية', 'أمثلة واقعية', 'قالب تحليل']
        },
        {
          title: 'أساسيات المصطلحات المالية الضرورية',
          type: 'glossary',
          duration: '40 دقيقة',
          description: 'المصطلحات الأساسية في عالم المالية',
          objectives: [
            'المصطلحات المالية الأساسية',
            'فهم المفاهيم المالية',
            'تطبيق المصطلحات عملياً'
          ],
          resources: ['قاموس مصطلحات', 'أمثلة توضيحية', 'اختبار مصطلحات']
        }
      ]
    },
    {
      id: 2,
      title: 'القوائم المالية الأساسية (Financial Statements)',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      duration: '6 ساعات',
      lessons: 12,
      description: 'فهم وتحليل القوائم المالية الثلاث الأساسية',
      content: [
        {
          title: 'قائمة الدخل (Income Statement): الإيرادات - المصروفات - صافي الربح',
          type: 'analysis',
          duration: '50 دقيقة',
          description: 'تحليل مكونات قائمة الدخل وأهميتها',
          objectives: [
            'مكونات قائمة الدخل',
            'حساب صافي الربح',
            'تحليل الربحية',
            'المؤشرات المالية المستمدة'
          ],
          resources: ['قالب قائمة دخل', 'دراسة حالة', 'تمرين حسابي']
        },
        {
          title: 'الميزانية العمومية (Balance Sheet): الأصول - الخصوم - حقوق الملكية',
          type: 'analysis',
          duration: '55 دقيقة',
          description: 'فهم هيكل الميزانية العمومية وتحليلها',
          objectives: [
            'تصنيف الأصول والخصوم',
            'حساب حقوق الملكية',
            'تحليل السيولة',
            'قراءة الميزانية العمومية'
          ],
          resources: ['قالب ميزانية', 'أمثلة محللة', 'تمرين عملي']
        },
        {
          title: 'قائمة التدفقات النقدية (Flow Statement): التشغيل - الاستثمار - التمويل',
          type: 'analysis',
          duration: '45 دقيقة',
          description: 'تحليل حركة النقد في المنظمة',
          objectives: [
            'أنواع التدفقات النقدية',
            'تحليل التدفق التشغيلي',
            'تقييم الاستثمارات والتمويل',
            'أهمية التدفقات النقدية'
          ],
          resources: ['قالب تدفقات', 'تحليل حالة', 'سيناريوهات عملية']
        },
        {
          title: 'العلاقة التكاملية بين القوائم المالية الثلاثة',
          type: 'integration',
          duration: '60 دقيقة',
          description: 'كيف تتكامل القوائم المالية مع بعضها',
          objectives: [
            'الربط بين القوائم الثلاث',
            'التحليل المتكامل',
            'التناسق المالي',
            'قراءة شاملة للوضع المالي'
          ],
          resources: ['مخطط تكاملي', 'دراسة حالة شاملة', 'تمرين تحليل متكامل']
        }
      ]
    },
    {
      id: 3,
      title: 'النسب والمؤشرات المالية (Financial Ratios)',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      duration: '5 ساعات',
      lessons: 10,
      description: 'حساب وتحليل النسب المالية المختلفة',
      content: [
        {
          title: 'نسب الربحية (Profitability Ratios)',
          type: 'calculation',
          duration: '40 دقيقة',
          description: 'قياس كفاءة الشركة في تحقيق الأرباح',
          objectives: [
            'هامش الربح الصافي',
            'العائد على الأصول',
            'العائد على حقوق الملكية',
            'تفسير نتائج النسب'
          ],
          resources: ['أمثلة محسوبة', 'قالب حساب', 'تمارين عملية']
        },
        {
          title: 'نسب السيولة (Liquidity Ratios)',
          type: 'calculation',
          duration: '35 دقيقة',
          description: 'قياس قدرة الشركة على الوفاء بالتزاماتها القصيرة الأجل',
          objectives: [
            'نسبة السيولة الجارية',
            'نسبة السيولة السريعة',
            'تفسير مؤشرات السيولة',
            'تحليل المخاطر المالية'
          ],
          resources: ['حالات دراسية', 'أدوات حساب', 'سيناريوهات تحليل']
        },
        {
          title: 'نسب المديونية (Leverage Ratios)',
          type: 'calculation',
          duration: '30 دقيقة',
          description: 'قياس حجم المديونية وتأثيرها على المخاطر',
          objectives: [
            'نسبة المديونية الكلية',
            'نسبة المديونية طويلة الأجل',
            'تحليل هيكل رأس المال',
            'تقييم المخاطر المالية'
          ],
          resources: ['نماذج حسابية', 'تحليل مقارن', 'دراسات حالة']
        },
        {
          title: 'كيف يستخدم المستثمرون والمدراء هذه المؤشرات؟',
          type: 'application',
          duration: '45 دقيقة',
          description: 'تطبيق النسب المالية في اتخاذ القرارات',
          objectives: [
            'استخدام المستثمرين للنسب',
            'دور الإدارة في التحليل',
            'اتخاذ القرارات المالية',
            'تحسين الأداء المالي'
          ],
          resources: ['دراسات حالة', 'أدوات تحليل', 'توصيات عملية']
        }
      ]
    },
    {
      id: 4,
      title: 'أساسيات التخطيط والميزانية (Budgeting & Planning)',
      icon: Calculator,
      color: 'from-orange-500 to-orange-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'إعداد وإدارة الميزانيات المالية',
      content: [
        {
          title: 'ما هي الميزانية ولماذا تعد؟',
          type: 'planning',
          duration: '35 دقيقة',
          description: 'فهم مفهوم الميزانية وأهميتها في التخطيط',
          objectives: [
            'تعريف الميزانية',
            'أنواع الميزانيات',
            'دور الميزانية في التخطيط',
            'فوائد إعداد الميزانيات'
          ],
          resources: ['أمثلة متنوعة', 'قوالب جاهزة', 'دراسات حالة']
        },
        {
          title: 'خطوات إعداد الموازنة التفصيلية',
          type: 'planning',
          duration: '50 دقيقة',
          description: 'الخطوات العملية لإعداد ميزانية شاملة',
          objectives: [
            'جمع البيانات التاريخية',
            'تحديد الأهداف والافتراضات',
            'إعداد التوقعات المالية',
            'مراجعة واعتماد الميزانية'
          ],
          resources: ['خطة عملية', 'قوالب تفصيلية', 'أدوات مساعدة']
        },
        {
          title: 'الفرق بين الموازنة والتوقعات (Forecast)',
          type: 'comparison',
          duration: '25 دقيقة',
          description: 'مقارنة بين الميزانية والتوقعات المالية',
          objectives: [
            'خصائص كل منهما',
            'الاختلافات الأساسية',
            'متى نستخدم كلاً منهما',
            'العلاقة بينهما'
          ],
          resources: ['جدول مقارن', 'أمثلة توضيحية', 'سيناريوهات عملية']
        },
        {
          title: 'كيفية متابعة الانحرافات واتخاذ القرارات التصحيحية',
          type: 'monitoring',
          duration: '40 دقيقة',
          description: 'مراقبة تنفيذ الميزانية ومعالجة الانحرافات',
          objectives: [
            'مقارنة الفعلي بالمخطط',
            'تحليل أسباب الانحرافات',
            'اتخاذ الإجراءات التصحيحية',
            'تحسين عملية التخطيط'
          ],
          resources: ['تقارير انحراف', 'خطط تصحيح', 'أدوات مراقبة']
        }
      ]
    },
    {
      id: 5,
      title: 'مبادئ الاستثمار والتمويل (Investing & Financing Basics)',
      icon: TrendingUp,
      color: 'from-red-500 to-red-600',
      duration: '3 ساعات',
      lessons: 6,
      description: 'أساسيات الاستثمار والتمويل للأفراد والشركات',
      content: [
        {
          title: 'مفهوم القيمة الزمنية للنقود (Time Value of Money)',
          type: 'concept',
          duration: '30 دقيقة',
          description: 'فهم أهمية توقيت النقد في القرارات المالية',
          objectives: [
            'مفهوم القيمة الزمنية',
            'حساب القيمة الحالية والمستقبلية',
            'تطبيق في القرارات الاستثمارية',
            'العوامل المؤثرة'
          ],
          resources: ['أمثلة حسابية', 'حاسبات مالية', 'تمارين عملية']
        },
        {
          title: 'أساسيات العائد والمخاطر في الاستثمار',
          type: 'investment',
          duration: '35 دقيقة',
          description: 'فهم علاقة العائد بالمخاطر في الاستثمار',
          objectives: [
            'مفهوم العائد المتوقع',
            'قياس المخاطر المالية',
            'التوازن بين العائد والمخاطر',
            'إدارة المحفظة الاستثمارية'
          ],
          resources: ['نماذج حسابية', 'تحليل مخاطر', 'استراتيجيات استثمار']
        },
        {
          title: 'أدوات التمويل : القروض - الأسهم - السندات',
          type: 'financing',
          duration: '40 دقيقة',
          description: 'أنواع أدوات التمويل المتاحة للشركات',
          objectives: [
            'خصائص القروض المصرفية',
            'مزايا وعيوب الأسهم',
            'فهم السندات والصكوك',
            'اختيار أداة التمويل المناسبة'
          ],
          resources: ['مقارنة الأدوات', 'دراسات حالة', 'نماذج تمويل']
        },
        {
          title: 'مبادئ الاستثمار الذكي للأفراد والشركات',
          type: 'strategy',
          duration: '35 دقيقة',
          description: 'استراتيجيات الاستثمار الفعالة والمربحة',
          objectives: [
            'تنويع المحفظة الاستثمارية',
            'اختيار الفرص الاستثمارية',
            'إدارة المخاطر الاستثمارية',
            'متابعة وتقييم الاستثمارات'
          ],
          resources: ['خطط استثمار', 'أدوات تحليل', 'دراسات نجاح']
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
            <Calculator className="w-6 h-6 text-green-600" />
            <span className="text-green-700 font-bold">أساسيات المالية والمحاسبة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            كورس شامل في أساسيات المالية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تعلم أساسيات المالية والمحاسبة من الصفر مع أمثلة عملية وحالات دراسية شاملة
          </p>

          {/* معلومات الكورس */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">22 ساعة</div>
              <div className="text-gray-600">مدة التدريب</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">44 درس</div>
              <div className="text-gray-600">محتوى تعليمي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">2,800 طالب</div>
              <div className="text-gray-600">عدد المتعلمين</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
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
              <div className={`w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur`}>
                {React.createElement(modules[activeModule].icon, { className: "w-8 h-8" })}
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
                <div className="text-2xl font-bold">{Math.round(modules[activeModule].lessons * 0.5)}</div>
                <div className="text-sm opacity-90">ساعة تدريبية</div>
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
                      lesson.type === 'video' ? 'bg-red-100 text-red-600' :
                      lesson.type === 'interactive' ? 'bg-blue-100 text-blue-600' :
                      lesson.type === 'presentation' ? 'bg-purple-100 text-purple-600' :
                      lesson.type === 'analysis' ? 'bg-green-100 text-green-600' :
                      lesson.type === 'calculation' ? 'bg-orange-100 text-orange-600' :
                      lesson.type === 'glossary' ? 'bg-indigo-100 text-indigo-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {lesson.type === 'video' ? <Play className="w-6 h-6" /> :
                       lesson.type === 'interactive' ? <Target className="w-6 h-6" /> :
                       lesson.type === 'presentation' ? <FileText className="w-6 h-6" /> :
                       lesson.type === 'analysis' ? <BarChart3 className="w-6 h-6" /> :
                       lesson.type === 'calculation' ? <Calculator className="w-6 h-6" /> :
                       <BookOpen className="w-6 h-6" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{lesson.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {lesson.duration}
                        </span>
                        <span className="capitalize bg-gray-100 px-2 py-1 rounded text-xs">
                          {lesson.type === 'video' ? 'فيديو تعليمي' :
                           lesson.type === 'interactive' ? 'تفاعلي' :
                           lesson.type === 'presentation' ? 'عرض تقديمي' :
                           lesson.type === 'analysis' ? 'تحليل' :
                           lesson.type === 'calculation' ? 'حسابي' :
                           lesson.type === 'glossary' ? 'مصطلحات' :
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
                            <span className="text-gray-600">1,250 متعلم</span>
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
              لغة بسيطة بعيدة عن التعقيد المحاسبي مع تمارين عملية وقوالب Excel قابلة للاستخدام المباشر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">لغة بسيطة</h3>
              <p className="text-gray-600">شرح مبسط بعيد عن التعقيد المحاسبي</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تمارين عملية</h3>
              <p className="text-gray-600">تطبيقات عملية وقوالب Excel جاهزة</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ربط بالواقع</h3>
              <p className="text-gray-600">ربط النظريات بالمواقف الواقعية داخل الشركات</p>
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

export default FinanceBasicsPage;
