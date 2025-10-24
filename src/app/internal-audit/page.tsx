'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
} from 'lucide-react';

const InternalAuditPage = () => {
  const [activeLevel, setActiveLevel] = useState<1 | 2 | 3>(1);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const auditLevels = [
    {
      id: 1,
      title: 'المستوى الأول - التأسيس (Foundation)',
      description: 'أساسيات المراجعة الداخلية والمفاهيم الأولية',
      color: 'from-blue-500 to-blue-600',
      modules: [
        {
          title: 'تأسيس إدارة المراجعة الداخلية',
          topics: [
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
          title: 'إعداد خطة المراجعة السنوية',
          topics: [
            'مفهوم المراجعة المبنية على المخاطر',
            'خطوات إعداد الخطة خطوة بخطوة',
            'مصفوفة المخاطر (Risk Matrix)',
            'مراجعة الخطة وتحديثها'
          ],
          duration: '3 أسابيع',
          lessons: 8
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
      description: 'الأدوات المتقدمة والمعايير الدولية',
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
          title: 'مراجعة نظم وأمن المعلومات (IT Audit)',
          topics: [
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
      description: 'المهارات المتقدمة والتطوير المهني الشامل',
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
          title: 'مهارات الحاسب واللغة الإنجليزية للمراجع',
          topics: [
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

  const toggleModule = (moduleTitle: string) => {
    setExpandedModule(expandedModule === moduleTitle ? null : moduleTitle);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-6">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-blue-700 font-bold">المراجعة الداخلية المتكاملة</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            برنامج زمالة المراجعين الداخليين
            <br />
            <span className="text-2xl md:text-3xl text-gray-600">3 مستويات متكاملة</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            رحلة شاملة لتطوير الكفاءات المهنية في المراجعة الداخلية من المبتدئ إلى الخبير المتخصص
          </p>

          {/* المحتوى التعريفي الإلزامي */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 mb-8 text-right max-w-5xl mx-auto">
            <div className="space-y-6 text-gray-800 leading-relaxed">

              {/* المقطع الافتتاحي - كسر الحواجز */}
              <div className="border-r-4 border-blue-500 pr-6">
                <p className="text-lg font-semibold text-blue-700 mb-2">كسر الحواجز التقليدية</p>
                <p className="text-base">
                  مهنة المراجعة الداخلية لم تعد حكراً على متخصصين محددين – إنها فرصة حقيقية لأي شخص يسعى لتطوير مساره المهني، حتى لو كنت تفكر في تغيير تخصصك الحالي او تطوير تخصصك واكتساب مهارات مطلوبة لسوق العمل.
                </p>
              </div>

              {/* المقطع الثاني - التعريف الاستراتيجي */}
              <div className="border-r-4 border-green-500 pr-6">
                <p className="text-lg font-semibold text-green-700 mb-2">عين الإدارة اليقظة</p>
                <p className="text-base">
                  المراجعة الداخلية اليوم هي عين الإدارة اليقظة، التي ترى ما وراء الأرقام والبيانات، وتكشف المخاطر قبل أن تتحول إلى أزمات، وتحوّلها إلى فرص للتحسين والابتكار. إنها الشريك الصامت الذي يحمي مسيرة المؤسسة، ويقودها نحو التميز.
                </p>
              </div>

              {/* المقطع الثالث - شرح الشراكة */}
              <div className="border-r-4 border-purple-500 pr-6">
                <p className="text-lg font-semibold text-purple-700 mb-2">الشراكة التكاملية</p>
                <p className="text-base mb-3">
                  المراجعة الداخلية والمراجع الداخلي… شراكة تصنع التفوق المؤسسي. معًا يشكلان قوة استراتيجية تدعم استقرار مؤسستك وتدفعها نحو الريادة. فالمراجعة الداخلية تمنحك الحماية والشفافية، بينما يحوّل المراجع الداخلي المحترف هذه الحماية إلى قيمة مستدامة تضمن التميز وتبقي مؤسستك دائمًا في موقع المبادرة، مستبقة للمخاطر، وسبّاقة لاغتنام الفرص.
                </p>
                <p className="text-sm font-medium text-purple-600 bg-purple-50 p-3 rounded-lg">
                  إن الاستثمار في بناء منظومة مراجعة داخلية قوية، وتطوير كفاءات المراجع الداخلي، ليس رفاهية أو خيارًا تكميليًا… بل قرار استراتيجي يحمي أعمالك اليوم ويصنع نجاحك المستقبلي.
                </p>
              </div>

              {/* المقطع الرابع - تعريف المراجع الحديث */}
              <div className="border-r-4 border-orange-500 pr-6">
                <p className="text-lg font-semibold text-orange-700 mb-3">المراجع الداخلي: قيمة مضافة لا تُقدّر بثمن</p>
                <p className="text-base mb-4">
                  المراجع الداخلي هو قيمة مضافة لا تُقدّر بثمن، وشريك استراتيجي للإدارة في رسم ملامح المستقبل. ليس مجرد مدقق يركز على الأخطاء، بل رائد يساهم بفعالية في:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>الكشف المبكر وتحليل المخاطر قبل أن تتحول إلى أزمات.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>تقييم كفاءة وفعالية الضوابط الداخلية لضمان حماية المؤسسة.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>تقديم توصيات عملية ومبتكرة تعزز الأداء وتحقق التحسين المستمر.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                    <span>دعم الإدارة في تحقيق أهدافها الاستراتيجية بكفاءة وثقة.</span>
                  </li>
                </ul>
              </div>

              {/* المقطع الخامس - عامل الاستعجال */}
              <div className="border-r-4 border-red-500 pr-6">
                <p className="text-lg font-semibold text-red-700 mb-2">التأمين المستدام لمستقبل أعمالك</p>
                <p className="text-base">
                  الاستثمار في تطوير قدرات المراجعة الداخلية يعني أكثر من حماية الأصول… إنه تأمين مستدام لمستقبل أعمالك. فالمراجع الداخلي المحترف يحول كل تقرير إلى خطة إنقاذ وتحسين فعّالة، تجعلك دائمًا على أتم الاستعداد لمواجهة التحديات. المستقبل لا ينتظر أحدًا، ومن يتأخر في بناء منظومة مراجعة قوية سيواجه تكاليف مضاعفة.
                </p>
              </div>

              {/* المقطع الختامي - CTA */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl text-center">
                <p className="text-xl font-bold mb-2">احترف مهنة المراجعة الداخلية بالتدريب العملى</p>
                <p className="text-base opacity-90">ابدأ رحلتك نحو التميز المهني اليوم</p>
              </div>

            </div>
          </div>
        </motion.div>

        {/* اختيار المستوى */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-12"
        >
                  </motion.div>

        {/* وصف المستوى النشط */}
        {currentLevel && (
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={`bg-gradient-to-r ${currentLevel.color} rounded-3xl p-8 mb-12 text-white`}
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{currentLevel.title}</h2>
              <p className="text-xl opacity-90 mb-6">{currentLevel.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold">{currentLevel.modules.length}</div>
                  <div className="text-sm opacity-90">محور رئيسي</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold">
                    {currentLevel.modules.reduce((sum, module) => sum + module.lessons, 0)}
                  </div>
                  <div className="text-sm opacity-90">درس تدريبي</div>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                  <div className="text-2xl font-bold">
                    {currentLevel.modules.reduce((sum, module) => {
                      const weeks = parseInt(module.duration.split(' ')[0]);
                      return sum + weeks;
                    }, 0)}
                  </div>
                  <div className="text-sm opacity-90">أسبوع تدريبي</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* المحتوى التعليمي */}
        <div className="space-y-6">
          {currentLevel?.modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleModule(module.title)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {module.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          {module.lessons} درس
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
                      ابدأ التعلم
                    </motion.button>
                    {expandedModule === module.title ? (
                      <ChevronDown className="w-6 h-6 text-gray-600" />
                    ) : (
                      <ChevronRight className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {expandedModule === module.title && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-gray-100 bg-gray-50"
                  >
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">المحتوى التدريبي:</h4>
                      <div className="grid gap-3">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            </div>
                            <span className="text-gray-700">{topic}</span>
                            <div className="mr-auto flex items-center gap-2">
                              <motion.button
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Eye className="w-4 h-4" />
                              </motion.button>
                              <motion.button
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Download className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                            <span className="text-gray-600">تقييم المحتوى: 4.8/5</span>
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
                          احصل على الشهادة
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">ما ستحصل عليه</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              شهادات معتمدة وخبرة عملية في المراجعة الداخلية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">شهادة معتمدة</h3>
              <p className="text-gray-600">شهادة زمالة معترف بها دولياً</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">تطوير مهني</h3>
              <p className="text-gray-600">مهارات متقدمة في المراجعة والتحليل</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">خبرة عملية</h3>
              <p className="text-gray-600">تطبيقات عملية وحالات دراسية حقيقية</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <motion.button
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ابدأ رحلتك التعليمية الآن
              <ArrowRight className="w-5 h-5 mr-3 inline" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InternalAuditPage;
