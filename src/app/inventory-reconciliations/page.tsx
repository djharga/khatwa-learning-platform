'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Calculator,
  Shield,
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
  BarChart3,
  TrendingUp,
  Users,
  Eye,
  AlertTriangle,
} from 'lucide-react';

const InventoryReconciliationsPage = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const modules = [
    {
      id: 1,
      title: 'أساسيات التسويات الجردية',
      icon: Calculator,
      color: 'from-blue-500 to-blue-600',
      duration: '3 ساعات',
      lessons: 7,
      description: 'المفاهيم الأساسية للتسويات الجردية وأهميتها في القوائم المالية',
      content: [
        {
          title: 'تعريف التسويات الجردية وأهميتها في القوائم المالية',
          type: 'concept',
          duration: '25 دقيقة',
          description: 'فهم مفهوم التسويات الجردية ودورها في دقة القوائم المالية',
          objectives: [
            'تعريف التسويات الجردية',
            'أهمية التسويات في المحاسبة',
            'التأثير على القوائم المالية',
            'مبادئ الاستحقاق والتطابق'
          ],
          resources: ['أمثلة توضيحية', 'نماذج قيود', 'دراسات حالة']
        },
        {
          title: 'الفرق بين الجرد الفعلي والجرد المحاسبي',
          type: 'comparison',
          duration: '30 دقيقة',
          description: 'مقارنة بين الجرد الفعلي والمحاسبي وأسباب الفروق',
          objectives: [
            'فهم مفهوم الجرد الفعلي',
            'فهم الجرد المحاسبي',
            'أسباب وجود فروق',
            'أهمية المقارنة بينهما'
          ],
          resources: ['أمثلة مقارنة', 'حالات عملية', 'نماذج حسابية']
        },
        {
          title: 'أنواع التسويات الجردية (مبيعات - مشتريات - مردودات)',
          type: 'types',
          duration: '35 دقيقة',
          description: 'تصنيف التسويات الجردية حسب نوع المعاملة',
          objectives: [
            'تسويات المبيعات',
            'تسويات المشتريات',
            'تسويات المردودات',
            'تسويات خاصة أخرى'
          ],
          resources: ['نماذج تصنيف', 'أمثلة حسابية', 'قوالب تسويات']
        }
      ]
    },
    {
      id: 2,
      title: 'أنواع التسويات',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'تصنيف شامل للتسويات المحاسبية المختلفة',
      content: [
        {
          title: 'تسويات الإيرادات والمصروفات (مصروفات مستحقة - إيرادات محققة)',
          type: 'revenue-expenses',
          duration: '40 دقيقة',
          description: 'تسويات الإيرادات والمصروفات الدورية',
          objectives: [
            'تسويات المصروفات المستحقة',
            'تسويات الإيرادات المحققة',
            'تسويات الإهلاك والاستهلاك',
            'تسويات الفوائد والأقساط'
          ],
          resources: ['أمثلة محسوبة', 'قيود يومية', 'نماذج شهرية']
        },
        {
          title: 'تسويات الأصول والخصوم (مخصصات الديون المشكوك في تحصيلها - مخصصات الزيادة في الأسعار)',
          type: 'assets-liabilities',
          duration: '35 دقيقة',
          description: 'تسويات الأصول والخصوم ومخصصاتها',
          objectives: [
            'مخصصات الديون المشكوك فيها',
            'مخصصات الزيادة في الأسعار',
            'تسويات الأصول الثابتة',
            'تسويات الخصوم طويلة الأجل'
          ],
          resources: ['حسابات مخصصات', 'أمثلة تطبيقية', 'نماذج محاسبية']
        },
        {
          title: 'تسويات خاصة (تسويات ضريبية - تسويات استثمارية)',
          type: 'special-adjustments',
          duration: '30 دقيقة',
          description: 'تسويات خاصة في حالات محددة',
          objectives: [
            'التسويات الضريبية',
            'تسويات الاستثمارات',
            'تسويات العملات الأجنبية',
            'تسويات خاصة أخرى'
          ],
          resources: ['نماذج ضريبية', 'حسابات استثمارية', 'أمثلة عملية']
        }
      ]
    },
    {
      id: 3,
      title: 'المعالجات المحاسبية للتسويات',
      icon: BarChart3,
      color: 'from-purple-500 to-purple-600',
      duration: '5 ساعات',
      lessons: 10,
      description: 'القيود اليومية والمعالجات المحاسبية للتسويات',
      content: [
        {
          title: 'تسجيل القيود المحاسبية للتسويات الجردية',
          type: 'journal-entries',
          duration: '45 دقيقة',
          description: 'كيفية تسجيل القيود اليومية للتسويات',
          objectives: [
            'أساسيات القيود اليومية',
            'قيود التسويات المختلفة',
            'التوثيق الصحيح',
            'المراجعة والتصحيح'
          ],
          resources: ['قوالب قيود', 'أمثلة عملية', 'نماذج توثيق']
        },
        {
          title: 'إعداد ورقة العمل المحاسبية',
          type: 'worksheet',
          duration: '50 دقيقة',
          description: 'إعداد ورقة العمل للتسويات والإقفال',
          objectives: [
            'هيكل ورقة العمل',
            'تسجيل التسويات',
            'إعداد القوائم المعدلة',
            'حساب صافي الربح'
          ],
          resources: ['قالب ورقة عمل', 'أمثلة مكتملة', 'تمارين تطبيقية']
        },
        {
          title: 'إعداد القوائم المالية المعدلة',
          type: 'adjusted-statements',
          duration: '40 دقيقة',
          description: 'إعداد القوائم المالية بعد التسويات',
          objectives: [
            'قائمة الدخل المعدلة',
            'الميزانية العمومية المعدلة',
            'قائمة التدفقات النقدية',
            'الإفصاحات المطلوبة'
          ],
          resources: ['قوالب قوائم', 'أمثلة معدلة', 'نماذج إفصاح']
        }
      ]
    },
    {
      id: 4,
      title: 'الرقابة والتدقيق',
      icon: Shield,
      color: 'from-orange-500 to-orange-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'نظم الرقابة الداخلية والتدقيق على التسويات الجردية',
      content: [
        {
          title: 'نظم الرقابة الداخلية الفعالة على التسويات',
          type: 'internal-controls',
          duration: '40 دقيقة',
          description: 'أنظمة الرقابة الداخلية على عمليات التسويات',
          objectives: [
            'مبادئ الرقابة الداخلية',
            'فصل المهام والمسؤوليات',
            'أنظمة الموافقات',
            'الرقابة على الأداء'
          ],
          resources: ['إجراءات رقابة', 'نماذج موافقات', 'أدوات تدقيق']
        },
        {
          title: 'دور المراجعة الداخلية في التحقق من صحة التسويات',
          type: 'internal-audit',
          duration: '35 دقيقة',
          description: 'دور المراجعة الداخلية في فحص التسويات',
          objectives: [
            'أهداف المراجعة على التسويات',
            'طرق فحص التسويات الجردية',
            'تقييم الضوابط الداخلية',
            'التوصيات التحسينية'
          ],
          resources: ['أدوات مراجعة', 'قوائم فحص', 'نماذج تقارير']
        },
        {
          title: 'إدارة المخاطر المرتبطة بالتسويات المحاسبية',
          type: 'risk-management',
          duration: '45 دقيقة',
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
      id: 5,
      title: 'الحالات العملية والتطبيقات',
      icon: Target,
      color: 'from-red-500 to-red-600',
      duration: '3 ساعات',
      lessons: 6,
      description: 'تطبيق عملي للتسويات الجردية في حالات مختلفة',
      content: [
        {
          title: 'دراسة حالة: تسويات نهاية العام المالي',
          type: 'case-study',
          duration: '40 دقيقة',
          description: 'تطبيق شامل للتسويات في حالة عملية',
          objectives: [
            'تحليل الحالة المالية',
            'تحديد التسويات المطلوبة',
            'تسجيل القيود المناسبة',
            'إعداد القوائم المعدلة'
          ],
          resources: ['دراسة حالة مفصلة', 'حلول خطوة بخطوة', 'نماذج تطبيق']
        },
        {
          title: 'أمثلة عملية متنوعة من القطاعات المختلفة',
          type: 'examples',
          duration: '35 دقيقة',
          description: 'أمثلة تطبيقية من قطاعات مختلفة',
          objectives: [
            'قطاع التجزئة',
            'قطاع التصنيع',
            'قطاع الخدمات',
            'القطاع المالي'
          ],
          resources: ['أمثلة قطاعية', 'حالات متنوعة', 'تحليل مقارن']
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
          <div className="inline-flex items-center gap-3 bg-orange-100 px-6 py-3 rounded-full mb-6">
            <Calculator className="w-6 h-6 text-orange-600" />
            <span className="text-orange-700 font-bold">التسويات الجردية والرقابة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            كورس التسويات المحاسبية والرقابة الداخلية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تعلم إعداد التسويات الجردية بدقة واحترافية مع أنظمة الرقابة الداخلية والتدقيق المحاسبي
          </p>

          {/* معلومات الكورس */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">19 ساعة</div>
              <div className="text-gray-600">مدة التدريب</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">39 درس</div>
              <div className="text-gray-600">محتوى تعليمي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">950 طالب</div>
              <div className="text-gray-600">عدد المتعلمين</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">4.7/5</div>
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
                {(() => {
                  const IconComponent = modules[activeModule].icon;
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
                      lesson.type === 'concept' ? 'bg-blue-100 text-blue-600' :
                      lesson.type === 'comparison' ? 'bg-green-100 text-green-600' :
                      lesson.type === 'types' ? 'bg-purple-100 text-purple-600' :
                      lesson.type === 'revenue-expenses' ? 'bg-orange-100 text-orange-600' :
                      lesson.type === 'assets-liabilities' ? 'bg-red-100 text-red-600' :
                      lesson.type === 'special-adjustments' ? 'bg-indigo-100 text-indigo-600' :
                      lesson.type === 'journal-entries' ? 'bg-teal-100 text-teal-600' :
                      lesson.type === 'worksheet' ? 'bg-cyan-100 text-cyan-600' :
                      lesson.type === 'adjusted-statements' ? 'bg-pink-100 text-pink-600' :
                      lesson.type === 'internal-controls' ? 'bg-lime-100 text-lime-600' :
                      lesson.type === 'internal-audit' ? 'bg-emerald-100 text-emerald-600' :
                      lesson.type === 'risk-management' ? 'bg-violet-100 text-violet-600' :
                      lesson.type === 'case-study' ? 'bg-rose-100 text-rose-600' :
                      lesson.type === 'examples' ? 'bg-amber-100 text-amber-600' :
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
                          {lesson.type === 'concept' ? 'مفاهيم' :
                           lesson.type === 'comparison' ? 'مقارنة' :
                           lesson.type === 'types' ? 'أنواع' :
                           lesson.type === 'revenue-expenses' ? 'إيرادات ومصروفات' :
                           lesson.type === 'assets-liabilities' ? 'أصول وخصوم' :
                           lesson.type === 'special-adjustments' ? 'تسويات خاصة' :
                           lesson.type === 'journal-entries' ? 'قيود يومية' :
                           lesson.type === 'worksheet' ? 'ورقة عمل' :
                           lesson.type === 'adjusted-statements' ? 'قوائم معدلة' :
                           lesson.type === 'internal-controls' ? 'رقابة داخلية' :
                           lesson.type === 'internal-audit' ? 'مراجعة داخلية' :
                           lesson.type === 'risk-management' ? 'إدارة مخاطر' :
                           lesson.type === 'case-study' ? 'دراسة حالة' :
                           lesson.type === 'examples' ? 'أمثلة' :
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
                            <span className="text-gray-600">تقييم الدرس: 4.7/5</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-500" />
                            <span className="text-gray-600">480 متعلم</span>
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
              تدريب عملي شامل مع أمثلة حسابية مفصلة ونماذج محاسبية جاهزة للتطبيق
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">دقة محاسبية</h3>
              <p className="text-gray-600">إعداد التسويات بدقة واحترافية مع المعالجات الصحيحة</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">رقابة داخلية</h3>
              <p className="text-gray-600">أنظمة رقابة داخلية فعالة وتدقيق شامل للتسويات</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تحليل مالي</h3>
              <p className="text-gray-600">تحليل تأثير التسويات على القوائم المالية والمؤشرات</p>
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

export default InventoryReconciliationsPage;
