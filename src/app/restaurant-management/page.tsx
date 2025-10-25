'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChefHat,
  Users,
  DollarSign,
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
  ShoppingCart,
  FileText,
  Calculator,
  Utensils,
} from 'lucide-react';

const RestaurantManagementPage = () => {
  const [activeModule, setActiveModule] = useState(0);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

  const modules = [
    {
      id: 1,
      title: 'أساسيات إدارة المطاعم',
      icon: ChefHat,
      color: 'from-red-500 to-red-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'المفاهيم الأساسية لإدارة المطاعم والمنشآت الغذائية',
      content: [
        {
          title: 'تخطيط المطعم والموقع المناسب',
          type: 'planning',
          duration: '35 دقيقة',
          description: 'اختيار الموقع المناسب وتخطيط المطعم',
          objectives: [
            'دراسة السوق والمنافسة',
            'اختيار الموقع الاستراتيجي',
            'تحديد نوع المطعم وجمهوره',
            'تصميم المساحة والتخطيط الداخلي'
          ],
          resources: ['نماذج دراسات سوق', 'خرائط مواقع', 'قوالب تخطيط']
        },
        {
          title: 'إدارة القائمة وتسعير الأطباق',
          type: 'menu-management',
          duration: '40 دقيقة',
          description: 'تصميم وإدارة قائمة الطعام وتحديد الأسعار',
          objectives: [
            'تصميم قائمة متوازنة',
            'حساب تكلفة الطبخ',
            'تحديد هامش الربح',
            'تسعير تنافسي وجذاب'
          ],
          resources: ['قوالب قوائم', 'حاسبات تكلفة', 'نماذج تسعير']
        }
      ]
    },
    {
      id: 2,
      title: 'العمليات التشغيلية',
      icon: Utensils,
      color: 'from-orange-500 to-orange-600',
      duration: '6 ساعات',
      lessons: 12,
      description: 'إدارة العمليات اليومية في المطعم من المطبخ إلى خدمة العملاء',
      content: [
        {
          title: 'إدارة المطبخ والعمليات الطبخية',
          type: 'kitchen-management',
          duration: '45 دقيقة',
          description: 'تنظيم عمليات المطبخ بكفاءة عالية',
          objectives: [
            'تنظيم خطوط الإنتاج',
            'إدارة المخزون الغذائي',
            'ضمان الجودة والسلامة',
            'تحسين الكفاءة التشغيلية'
          ],
          resources: ['مخططات مطبخ', 'قوائم جرد', 'إجراءات سلامة']
        },
        {
          title: 'خدمة العملاء والإدارة الأمامية',
          type: 'customer-service',
          duration: '40 دقيقة',
          description: 'إدارة خدمة العملاء وتحسين الرضا',
          objectives: [
            'تدريب موظفي الخدمة',
            'إدارة الطلبات والشكاوى',
            'تحسين تجربة العميل',
            'قياس رضا العملاء'
          ],
          resources: ['نماذج تدريب', 'استطلاعات رضا', 'خطط خدمة']
        },
        {
          title: 'إدارة المخزون والمشتريات',
          type: 'inventory-management',
          duration: '50 دقيقة',
          description: 'إدارة المخزون الغذائي والمشتريات بفعالية',
          objectives: [
            'حساب الاحتياجات اليومية',
            'إدارة تاريخ الصلاحية',
            'تقليل الفاقد والإهدار',
            'تحسين تكلفة المشتريات'
          ],
          resources: ['أنظمة جرد', 'حاسبات احتياجات', 'تقارير مشتريات']
        }
      ]
    },
    {
      id: 3,
      title: 'التسويق والمبيعات',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'استراتيجيات التسويق والترويج للمطعم وزيادة المبيعات',
      content: [
        {
          title: 'استراتيجيات التسويق للمطاعم',
          type: 'marketing-strategy',
          duration: '40 دقيقة',
          description: 'تطوير استراتيجيات تسويقية فعالة للمطاعم',
          objectives: [
            'تحديد الجمهور المستهدف',
            'تطوير هوية المطعم',
            'استراتيجيات التسعير',
            'خطط التسويق المتكاملة'
          ],
          resources: ['خطط تسويقية', 'دراسات جمهور', 'نماذج هوية']
        },
        {
          title: 'برامج الولاء وإدارة العلاقات مع العملاء',
          type: 'loyalty-programs',
          duration: '35 دقيقة',
          description: 'بناء برامج ولاء فعالة للعملاء الدائمين',
          objectives: [
            'تصميم برامج الولاء',
            'إدارة بيانات العملاء',
            'تحليل سلوك العملاء',
            'قياس فعالية البرامج'
          ],
          resources: ['نماذج برامج ولاء', 'أنظمة إدارة عملاء', 'تقارير تحليل']
        },
        {
          title: 'التسويق الرقمي والتواصل الاجتماعي',
          type: 'digital-marketing',
          duration: '45 دقيقة',
          description: 'استخدام وسائل التواصل الاجتماعي والتسويق الرقمي',
          objectives: [
            'إدارة حسابات التواصل',
            'إنشاء محتوى جذاب',
            'حملات إعلانية مستهدفة',
            'قياس عائد الاستثمار'
          ],
          resources: ['خطط محتوى', 'أدوات تحليل', 'نماذج حملات']
        }
      ]
    },
    {
      id: 4,
      title: 'الإدارة المالية للمطاعم',
      icon: Calculator,
      color: 'from-green-500 to-green-600',
      duration: '5 ساعات',
      lessons: 10,
      description: 'إدارة الجوانب المالية والمحاسبية في المطاعم',
      content: [
        {
          title: 'حساب التكاليف والأرباح في المطاعم',
          type: 'cost-analysis',
          duration: '45 دقيقة',
          description: 'تحليل التكاليف وحساب هامش الربح',
          objectives: [
            'حساب تكلفة الطعام',
            'تحليل تكلفة العمالة',
            'حساب هامش الربح',
            'تحسين الكفاءة المالية'
          ],
          resources: ['حاسبات تكلفة', 'نماذج تحليل', 'تقارير ربحية']
        },
        {
          title: 'إدارة الميزانية والتدفق النقدي',
          type: 'budget-management',
          duration: '40 دقيقة',
          description: 'إعداد وإدارة الميزانيات المالية للمطعم',
          objectives: [
            'إعداد الميزانية الشهرية',
            'مراقبة التدفق النقدي',
            'إدارة النفقات اليومية',
            'التخطيط المالي طويل الأمد'
          ],
          resources: ['قوالب ميزانيات', 'أدوات تدفق نقدي', 'نماذج تخطيط']
        }
      ]
    },
    {
      id: 5,
      title: 'إدارة الموارد البشرية',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      duration: '4 ساعات',
      lessons: 8,
      description: 'إدارة الموظفين والكوادر البشرية في المطاعم',
      content: [
        {
          title: 'التخطيط والتوظيف للمطاعم',
          type: 'hr-planning',
          duration: '35 دقيقة',
          description: 'تخطيط الاحتياجات البشرية وإجراءات التوظيف',
          objectives: [
            'تحديد الاحتياجات البشرية',
            'وصف الوظائف والمهام',
            'عمليات التوظيف والاختيار',
            'التدريب والتأهيل'
          ],
          resources: ['وصف وظائف', 'نماذج مقابلات', 'خطط تدريب']
        },
        {
          title: 'التدريب والتطوير المهني',
          type: 'training-development',
          duration: '40 دقيقة',
          description: 'برامج التدريب والتطوير للموظفين',
          objectives: [
            'تقييم الاحتياجات التدريبية',
            'تصميم برامج التدريب',
            'تنفيذ البرامج التدريبية',
            'قياس فعالية التدريب'
          ],
          resources: ['نماذج تقييم', 'خطط تدريب', 'أدوات قياس']
        }
      ]
    },
    {
      id: 6,
      title: 'الجودة والسلامة الغذائية',
      icon: Target,
      color: 'from-yellow-500 to-yellow-600',
      duration: '3 ساعات',
      lessons: 6,
      description: 'معايير الجودة والسلامة الغذائية في المطاعم',
      content: [
        {
          title: 'معايير السلامة الغذائية (HACCP)',
          type: 'food-safety',
          duration: '40 دقيقة',
          description: 'تطبيق نظام HACCP للسلامة الغذائية',
          objectives: [
            'فهم نظام HACCP',
            'تحديد نقاط التحكم الحرجة',
            'تطبيق الإجراءات الوقائية',
            'التوثيق والتسجيل'
          ],
          resources: ['دليل HACCP', 'نماذج تطبيق', 'سجلات سلامة']
        },
        {
          title: 'إدارة الجودة وضمان الاتساق',
          type: 'quality-management',
          duration: '35 دقيقة',
          description: 'أنظمة إدارة الجودة في المطاعم',
          objectives: [
            'معايير الجودة المطبخية',
            'ضمان اتساق المنتجات',
            'مراقبة الجودة المستمرة',
            'تحسين العمليات'
          ],
          resources: ['معايير جودة', 'نماذج مراقبة', 'تقارير تحسين']
        }
      ]
    },
    {
      id: 7,
      title: 'التخطيط الاستراتيجي والنمو',
      icon: BarChart3,
      color: 'from-indigo-500 to-indigo-600',
      duration: '3 ساعات',
      lessons: 6,
      description: 'التخطيط الاستراتيجي وخطط النمو للمطاعم',
      content: [
        {
          title: 'تحليل السوق ووضع الاستراتيجيات',
          type: 'market-analysis',
          duration: '35 دقيقة',
          description: 'تحليل السوق وتطوير الاستراتيجيات',
          objectives: [
            'تحليل السوق والمنافسة',
            'تحديد المزايا التنافسية',
            'تطوير الاستراتيجيات',
            'خطط النمو والتوسع'
          ],
          resources: ['دراسات سوق', 'تحليل منافسة', 'خطط استراتيجية']
        },
        {
          title: 'قياس الأداء واتخاذ القرارات',
          type: 'performance-measurement',
          duration: '40 دقيقة',
          description: 'قياس أداء المطعم واتخاذ القرارات الاستراتيجية',
          objectives: [
            'مؤشرات الأداء الرئيسية',
            'تحليل البيانات المالية',
            'اتخاذ القرارات المبنية على البيانات',
            'تحسين الأداء المستمر'
          ],
          resources: ['لوحات مؤشرات', 'تقارير أداء', 'أدوات تحليل']
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
            <ChefHat className="w-6 h-6 text-orange-600" />
            <span className="text-orange-700 font-bold">إدارة وتشغيل المطاعم</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            كورس شامل في إدارة المطاعم والمنشآت الغذائية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            تعلم إدارة المطاعم بكفاءة عالية من التخطيط إلى التشغيل مع أحدث التقنيات والممارسات العالمية
          </p>

          {/* معلومات الكورس */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">29 ساعة</div>
              <div className="text-gray-600">مدة التدريب</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <BookOpen className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">48 درس</div>
              <div className="text-gray-600">محتوى تعليمي</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <Users className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">1,600 طالب</div>
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
                      lesson.type === 'planning' ? 'bg-blue-100 text-blue-600' :
                      lesson.type === 'menu-management' ? 'bg-green-100 text-green-600' :
                      lesson.type === 'kitchen-management' ? 'bg-purple-100 text-purple-600' :
                      lesson.type === 'customer-service' ? 'bg-orange-100 text-orange-600' :
                      lesson.type === 'inventory-management' ? 'bg-red-100 text-red-600' :
                      lesson.type === 'marketing-strategy' ? 'bg-indigo-100 text-indigo-600' :
                      lesson.type === 'loyalty-programs' ? 'bg-teal-100 text-teal-600' :
                      lesson.type === 'digital-marketing' ? 'bg-cyan-100 text-cyan-600' :
                      lesson.type === 'cost-analysis' ? 'bg-pink-100 text-pink-600' :
                      lesson.type === 'budget-management' ? 'bg-lime-100 text-lime-600' :
                      lesson.type === 'hr-planning' ? 'bg-emerald-100 text-emerald-600' :
                      lesson.type === 'training-development' ? 'bg-violet-100 text-violet-600' :
                      lesson.type === 'food-safety' ? 'bg-rose-100 text-rose-600' :
                      lesson.type === 'quality-management' ? 'bg-amber-100 text-amber-600' :
                      lesson.type === 'market-analysis' ? 'bg-stone-100 text-stone-600' :
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
                          {lesson.type === 'planning' ? 'تخطيط' :
                           lesson.type === 'menu-management' ? 'إدارة قائمة' :
                           lesson.type === 'kitchen-management' ? 'إدارة مطبخ' :
                           lesson.type === 'customer-service' ? 'خدمة عملاء' :
                           lesson.type === 'inventory-management' ? 'إدارة مخزون' :
                           lesson.type === 'marketing-strategy' ? 'استراتيجية تسويق' :
                           lesson.type === 'loyalty-programs' ? 'برامج ولاء' :
                           lesson.type === 'digital-marketing' ? 'تسويق رقمي' :
                           lesson.type === 'cost-analysis' ? 'تحليل تكلفة' :
                           lesson.type === 'budget-management' ? 'إدارة ميزانية' :
                           lesson.type === 'hr-planning' ? 'تخطيط موارد بشرية' :
                           lesson.type === 'training-development' ? 'تدريب وتطوير' :
                           lesson.type === 'food-safety' ? 'سلامة غذائية' :
                           lesson.type === 'quality-management' ? 'إدارة جودة' :
                           lesson.type === 'market-analysis' ? 'تحليل سوق' :
                           lesson.type === 'performance-measurement' ? 'قياس أداء' :
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
                            <span className="text-gray-600">780 متعلم</span>
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
              تدريب عملي شامل مع أمثلة حقيقية من عالم المطاعم ونماذج جاهزة للتطبيق الفوري
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">خبرة عملية</h3>
              <p className="text-gray-600">تطبيقات عملية في إدارة المطاعم الحقيقية</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ChefHat className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ممارسات عالمية</h3>
              <p className="text-gray-600">أحدث الممارسات العالمية في صناعة المطاعم</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">إدارة مالية</h3>
              <p className="text-gray-600">إدارة التكاليف والأرباح في المطاعم بكفاءة</p>
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

export default RestaurantManagementPage;
