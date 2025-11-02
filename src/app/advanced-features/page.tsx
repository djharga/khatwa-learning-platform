'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  FileText,
  TrendingUp,
  Users,
  Shield,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Upload,
  Download,
  Share,
  Clock,
  Target,
  Award,
  BookOpen,
  MessageSquare,
  Zap,
  Sparkles,
  Lightbulb,
  ArrowRight,
  Smartphone,
} from 'lucide-react';

const AdvancedFeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'ai-auditor',
      title: 'المراجع الآلي (AI Co-Auditor)',
      description: 'مساعد ذكي يصحح الأخطاء ويقترح تحسينات فورية أثناء العمل',
      icon: Brain,
      color: 'from-purple-500 to-indigo-500',
      details: [
        'تصحيح أخطاء المحاسبة تلقائياً',
        'اقتراحات لتحسين العمليات',
        'تحليل المخاطر في الوقت الفعلي',
        'تقارير ذكية قابلة للتخصيص'
      ],
      demo: 'جرب المراجع الآلي الآن'
    },
    {
      id: 'risk-analyzer',
      title: 'تحليل المخاطر الذكي (AI Risk Analyzer)',
      description: 'رفع ملفات Excel أو تقارير وتحليلها مع توصيات شاملة',
      icon: TrendingUp,
      color: 'from-red-500 to-orange-500',
      details: [
        'تحليل بيانات مالية متقدم',
        'تحديد المخاطر المحتملة',
        'توصيات للحد من المخاطر',
        'تقارير تفاعلية مع رسوم بيانية'
      ],
      demo: 'ابدأ تحليل المخاطر'
    },
    {
      id: 'predictive-dashboard',
      title: 'لوحة القيادة التنبؤية (Predictive Dashboard)',
      description: 'توقع المخاطر والفرص المستقبلية باستخدام خوارزميات متقدمة',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'تنبؤات مالية دقيقة',
        'تحليل اتجاهات السوق',
        'تخطيط استراتيجي ذكي',
        'تنبيهات مبكرة للمخاطر'
      ],
      demo: 'استكشف لوحة القيادة'
    },
    {
      id: 'personal-assistant',
      title: 'مساعد أعمال ذكي شخصي',
      description: 'يعرف ملفات العميل ويجيب عن الأسئلة بذكاء ودقة',
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      details: [
        'إجابات فورية عن الأسئلة المالية',
        'فهم السياق من الملفات',
        'اقتراحات مخصصة للعملاء',
        'دعم متعدد اللغات'
      ],
      demo: 'تحدث مع المساعد الذكي'
    },
    {
      id: 'executive-summary',
      title: 'الملخص التنفيذي الفوري',
      description: 'تحويل التقارير الطويلة إلى ملخص تنفيذي في نصف صفحة',
      icon: FileText,
      color: 'from-indigo-500 to-purple-500',
      details: [
        'تلخيص تلقائي للتقارير',
        'استخراج النقاط الرئيسية',
        'تنسيق احترافي للقراءة',
        'توفير الوقت والجهد'
      ],
      demo: 'جرب التلخيص الذكي'
    },
    {
      id: 'smart-comparator',
      title: 'المقارن الذكي (Smart Comparator)',
      description: 'مقارنة الملفات واستخراج الفروقات بسرعة ودقة',
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-500',
      details: [
        'مقارنة البيانات المالية',
        'تحديد التغييرات المهمة',
        'تقارير مقارنة تفصيلية',
        'تصور بصري للفروقات'
      ],
      demo: 'ابدأ المقارنة الذكية'
    },
    {
      id: 'ai-presentations',
      title: 'إنشاء عروض تقديمية ذكية',
      description: 'توليد عروض PowerPoint احترافية من البيانات والتقارير',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-500',
      details: [
        'تصميم عروض احترافية',
        'إضافة رسوم بيانية تلقائياً',
        'تخصيص الألوان والخطوط',
        'تصدير بصيغ متعددة'
      ],
      demo: 'أنشئ عرض تقديمي'
    },
    {
      id: 'content-generator',
      title: 'توليد محتوى تسويقي تلقائي',
      description: 'إنشاء منشورات وسوشيال ميديا وإيميلات جاهزة',
      icon: Sparkles,
      color: 'from-teal-500 to-cyan-500',
      details: [
        'محتوى مخصص للمنصات',
        'حملات تسويقية ذكية',
        'تحسين محركات البحث',
        'جدولة النشر التلقائي'
      ],
      demo: 'ابدأ التوليد التلقائي'
    }
  ];

  const fileManagementFeatures = [
    {
      id: 'file-conversion',
      title: 'رفع وتحويل الملفات',
      description: 'تحويل ملفات Word/Excel/PDF إلى نسخ تفاعلية مع رسوم بيانية',
      icon: Upload,
      benefits: ['تحويل تلقائي', 'رسوم بيانية تفاعلية', 'مشاركة سهلة', 'أمان متقدم']
    },
    {
      id: 'file-sharing',
      title: 'مشاركة الملفات كرابط',
      description: 'مشاركة الملفات بروابط آمنة مع إمكانيات القراءة والتعليق',
      icon: Share,
      benefits: ['روابط آمنة', 'صلاحيات مرنة', 'تتبع القراءات', 'تعليقات تعاونية']
    },
    {
      id: 'executive-view',
      title: 'نسخة المدير (Executive View)',
      description: 'تلخيص التقرير في صفحة واحدة للقراءة السريعة',
      icon: Eye,
      benefits: ['تلخيص ذكي', 'نقاط رئيسية', 'قراءة سريعة', 'تصميم احترافي']
    },
    {
      id: 'report-hub',
      title: 'Report Hub',
      description: 'تحويل أي تقرير إلى صفحة تفاعلية قابلة للتعليق والمشاركة',
      icon: BarChart3,
      benefits: ['تفاعلية كاملة', 'تعليقات مدمجة', 'مشاركة سهلة', 'تتبع التغييرات']
    },
    {
      id: 'periodic-reports',
      title: 'Periodic Reporter',
      description: 'إنشاء تقارير دورية آلية بناءً على البيانات المتاحة',
      icon: Clock,
      benefits: ['أتمتة كاملة', 'تقارير دورية', 'تنبيهات تلقائية', 'تخصيص كامل']
    },
    {
      id: 'project-archive',
      title: 'أرشيف ذكي للمشاريع',
      description: 'ربط الملفات بالمشاريع وحفظها كسجل كامل مع البحث الذكي',
      icon: BookOpen,
      benefits: ['تنظيم متقدم', 'بحث ذكي', 'سجل كامل', 'مشاركة آمنة']
    },
    {
      id: 'voice-notes',
      title: 'ملاحظات صوتية',
      description: 'إضافة ملاحظات صوتية بجانب كل ملف للتوضيح والشرح',
      icon: MessageSquare,
      benefits: ['تسجيل صوتي', 'ربط بالملفات', 'مشاركة سهلة', 'أرشفة ذكية']
    },
    {
      id: 'reading-tracker',
      title: 'أداة تتبع القراءات',
      description: 'تتبع من فتح الملف ومتى والمدة التي قضاها في القراءة',
      icon: Activity,
      benefits: ['تتبع مفصل', 'إحصائيات دقيقة', 'تقارير الأداء', 'تحسين المحتوى']
    }
  ];

  const securityFeatures = [
    {
      id: 'file-protection',
      title: 'حماية الملفات المتقدمة',
      description: 'منع نسخ أو تحويل الملفات المحمية إلى أي صيغة أخرى',
      icon: Shield,
      features: ['حماية من النسخ', 'تشفير متقدم', 'علامات مائية', 'حماية PDF']
    },
    {
      id: 'screen-protection',
      title: 'حماية الشاشة',
      description: 'منع التقاط شاشة أو تسجيل الفيديو أثناء عرض المحتوى',
      icon: Eye,
      features: ['منع التقاط الشاشة', 'حماية من التسجيل', 'كشف المخاطر', 'تنبيهات أمنية']
    },
    {
      id: 'device-binding',
      title: 'ربط بالجهاز',
      description: 'ربط المحتوى بالجهاز المصرح به مع حماية إضافية',
      icon: Smartphone,
      features: ['ربط بالجهاز', 'مصادقة ثنائية', 'تتبع الدخول', 'حماية متقدمة']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-100 to-indigo-100 px-6 py-3 rounded-full mb-6">
            <Brain className="w-6 h-6 text-purple-600" />
            <span className="text-purple-700 font-bold">الميزات المتقدمة والذكاء الاصطناعي</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            مستقبل التعليم والمراجعة الداخلية
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            استكشف أحدث التقنيات والذكاء الاصطناعي في مجال المراجعة الداخلية والإدارة المالية
          </p>
        </motion.div>

        {/* الميزات الرئيسية بالذكاء الاصطناعي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            أدوات الذكاء الاصطناعي المتطورة
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-xl border-2 hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    activeFeature === feature.id ? 'border-purple-500 scale-105' : 'border-gray-100'
                  }`}
                  onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                >
                  <div className="p-8">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>

                    <motion.button
                      className={`w-full bg-gradient-to-r ${feature.color} hover:opacity-90 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {feature.demo}
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* التفاصيل الموسعة */}
                  {activeFeature === feature.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-100 bg-gray-50 px-8 pb-8"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-4 pt-6">المميزات الرئيسية:</h4>
                      <ul className="space-y-3">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <div className={`w-2 h-2 bg-gradient-to-r ${feature.color} rounded-full`}></div>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* إدارة الملفات والتقارير */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              إدارة الملفات والتقارير المتطورة
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              أدوات متقدمة لإدارة الملفات وإنشاء التقارير بكفاءة وأمان
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fileManagementFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-xs text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* الحساب الشخصي والملف المهني */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-8">
            <div className="text-center mb-12">
              <Users className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                الحساب الشخصي والملف المهني
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                موقع فرعي شخصي لكل مستخدم مع ملف تعليمي شامل وسيرة ذاتية تفاعلية
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-indigo-600" />
                    الموقع الفرعي الشخصي
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>مثال: ahmed.audit.sa</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>نسخة كاملة من البيانات (5 جيجا)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                      <span>ملف تعليمي تدريبي تفاعلي</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    السيرة الذاتية التفاعلية
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>مدمجة بالشهادات والإنجازات</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>قابلة للمشاركة كرابط</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>تصميم احترافي قابل للتخصيص</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Target className="w-6 h-6 text-green-600" />
                    صفحة الإنجازات
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>الشهادات والتقييمات</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>المشاريع والإنجازات</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>شارات التميز والجوائز</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-orange-600" />
                    البطاقة المهنية الرقمية
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>بطاقة أعمال رقمية احترافية</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>بديل عن الملفات المتفرقة</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>سهولة المشاركة والطباعة</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* التعاون الجماعي */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              التعاون الجماعي والعمل الفريقي
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              أدوات تعاون متقدمة للعمل الجماعي والمشاركة الفعالة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">سحابة الفريق</h3>
              <p className="text-gray-600 mb-6">
                مساحة عمل مشتركة مع صلاحيات متنوعة لإدارة الملفات والمشاريع
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">صلاحيات مرنة</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sm">مشاركة فورية</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                <MessageSquare className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">غرفة الاجتماعات الرقمية</h3>
              <p className="text-gray-600 mb-6">
                رفع ملفات ومشاركة شاشة وتعليقات مباشرة في اجتماعات تفاعلية
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">مشاركة شاشة</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">تعليقات مباشرة</span>
                </li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">نظام التقييمات والتعليقات</h3>
              <p className="text-gray-600 mb-6">
                تقييم وتعليق على التقارير مع تتبع شامل للتعديلات (Audit Trail)
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">تتبع التعديلات</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sm">تقارير شاملة</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* الحماية والأمان */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-3xl p-8">
            <div className="text-center mb-12">
              <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                الحماية والأمان المتقدم
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                حماية شاملة للمحتوى والملفات من النسخ والتوزيع غير المصرح به
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{feature.description}</p>

                    <div className="space-y-2">
                      {feature.features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* تجربة المستخدم والأداء */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <Activity className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              تجربة مستخدم متميزة وأداء عالي
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              واجهة بسيطة وسريعة مع أداء فائق على جميع الأجهزة
            </p>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">3 ثوان</div>
                <p className="text-gray-600">سرعة التحميل</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <p className="text-gray-600">متجاوب مع الأجهزة</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                <p className="text-gray-600">دعم فني متواصل</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
                <p className="text-gray-600">معدل التوفر</p>
              </div>
            </div>

            <div className="mt-8">
              <motion.button
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                جرب الميزات المتقدمة مجاناً
                <ArrowRight className="w-5 h-5 mr-2 inline" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvancedFeaturesPage;
