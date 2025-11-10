'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, HelpCircle, Star, TrendingUp, User, Users, BookOpen, Brain, Shield, CheckCircle, CreditCard, Warehouse, FileText, Calculator, Award, Lock, EyeOff, FileX, HardDrive, Smartphone, Target, Heart, Zap, Globe, Calendar, Clock, MapPin, Play, Download, ArrowRight, Cpu, Database, BarChart3, Code, Monitor, Server, Sparkles } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';

export default function AIAuditCoursePage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    // التحقق من أننا في المتصفح (client-side)
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      setShowScrollToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* شريط تقدم الصفحة */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-600 z-50"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.2s' }}
      />

      <div className="relative z-10">
        {/* قسم الهيرو */}
        <section className="relative bg-gradient-to-br from-white via-slate-50/30 to-slate-100/50 py-24 lg:py-36 xl:py-48 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-cyan-100/40 to-blue-100/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-cyan-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <motion.div
                  className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium text-sm">دورة متقدمة - AI</span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl xl:text-7xl font-bold text-cyan-600 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  الذكاء الاصطناعي في المراجعة
                </motion.h1>

                <motion.p
                  className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  تعلم استخدام الذكاء الاصطناعي وتعلم الآلة في عمليات المراجعة والكشف عن الاحتيال والمخاطر
                </motion.p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-cyan-50 border border-cyan-200 rounded-xl">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    <span className="text-cyan-700 font-medium">18 أسبوع</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">543 طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-700 font-medium">4.8 تقييم</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center justify-center px-8 py-5 bg-cyan-600 text-white text-lg font-semibold rounded-xl hover:bg-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    اشترك في الدورة
                    <ArrowRight className="w-5 h-5 mr-3" />
                  </Link>
                  <Link
                    href="#curriculum"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-cyan-600 text-cyan-600 text-lg font-semibold rounded-xl hover:bg-cyan-50 transition-all duration-200 hover:shadow-md"
                  >
                    عرض المنهج
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">699 ريال</div>
                      <div className="text-slate-600">للدورة كاملة</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">تعلم الآلة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">كشف احتيال</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">تحليل بيانات</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">أدوات AI</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-center text-sm text-slate-600">
                        المدرب: د. نورة العتيبي - خبيرة AI مالية
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم المنهج التعليمي */}
        <section id="curriculum" className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                المنهج التقني المتقدم
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                منهج شامل يجمع بين المعرفة التقنية والتطبيق العملي في الذكاء الاصطناعي للمراجعة
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  week: "الأسبوع 1-3",
                  title: "أساسيات الذكاء الاصطناعي والتعلم الآلي",
                  topics: ["مقدمة في الذكاء الاصطناعي", "خوارزميات التعلم الآلي", "أنواع البيانات في المراجعة", "أدوات Python للتحليل"],
                  duration: "15 ساعات",
                  color: "from-cyan-500 to-cyan-600"
                },
                {
                  week: "الأسبوع 4-6",
                  title: "كشف الاحتيال باستخدام الذكاء الاصطناعي",
                  topics: ["نماذج كشف الاحتيال", "تحليل السلوكيات المشبوهة", "Machine Learning للكشف", "دراسات حالة عملية"],
                  duration: "18 ساعات",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  week: "الأسبوع 7-9",
                  title: "تحليل المخاطر بالذكاء الاصطناعي",
                  topics: ["نماذج تقييم المخاطر", "تحليل البيانات الكبيرة", "التنبؤ بالمخاطر", "أتمتة تقييم المخاطر"],
                  duration: "16 ساعات",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  week: "الأسبوع 10-12",
                  title: "التدقيق الآلي والروبوتي",
                  topics: ["Robotic Process Automation", "أتمتة عمليات التدقيق", "أدوات RPA في المراجعة", "تطبيقات عملية"],
                  duration: "14 ساعات",
                  color: "from-green-500 to-green-600"
                },
                {
                  week: "الأسبوع 13-15",
                  title: "تحليل البيانات المتقدم",
                  topics: ["Data Mining للمراجعة", "تحليل النصوص والصور", "معالجة اللغات الطبيعية", "تطبيقات عملية"],
                  duration: "16 ساعات",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  week: "الأسبوع 16-18",
                  title: "المشاريع العملية والمستقبل",
                  topics: ["مشروع تطبيق AI شامل", "أدوات AI الحديثة", "المستقبل الرقمي للمراجعة", "أخلاقيات الذكاء الاصطناعي"],
                  duration: "15 ساعات",
                  color: "from-red-500 to-red-600"
                }
              ].map((module, index) => (
                <motion.div
                  key={module.title}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-shrink-0">
                      <div className={`w-16 h-16 bg-gradient-to-r ${module.color} rounded-2xl flex items-center justify-center`}>
                        <Sparkles className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <div className="text-sm font-semibold text-slate-500 mb-1">{module.week}</div>
                          <h3 className="text-2xl font-bold text-slate-900">{module.title}</h3>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-xl">
                          <Clock className="w-4 h-4 text-slate-600" />
                          <span className="text-slate-700 font-medium">{module.duration}</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        {module.topics.map((topic, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-slate-700">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم المدرب */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                المدرب
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                خبيرة متخصصة في الذكاء الاصطناعي والتطبيقات المالية
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">د. نورة العتيبي</h3>
                      <p className="text-cyan-600 font-medium mb-4">خبيرة AI مالية وتدقيق رقمي</p>
                      <p className="text-slate-700 leading-relaxed">
                        رائدة في مجال الذكاء الاصطناعي المالي مع خبرة عملية في تطوير نماذج AI للكشف عن الاحتيال والمخاطر.
                        حاصلة على شهادات متخصصة في التعلم الآلي والذكاء الاصطناعي.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">12+</div>
                        <div className="text-sm text-slate-600">سنوات خبرة</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">PhD AI</div>
                        <div className="text-sm text-slate-600">معتمدة</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-cyan-600" />
                        <span className="text-slate-700">باحثة في جامعة الملك عبدالعزيز</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Code className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-700">مطورة أنظمة AI للبنوك</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Brain className="w-5 h-5 text-purple-600" />
                        <span className="text-slate-700">خبيرة في تعلم الآلة المالي</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-32 h-32 text-slate-600" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      4.8 ★ تقييم
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم التطبيقات العملية */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                التطبيقات العملية للذكاء الاصطناعي
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                ستتعلم كيفية تطبيق الذكاء الاصطناعي في مختلف مجالات المراجعة والتدقيق
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "كشف الاحتيال الآلي",
                  description: "نماذج AI للكشف عن المعاملات المشبوهة والاحتيال المالي",
                  color: "from-cyan-500 to-cyan-600"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "تحليل المخاطر التنبؤي",
                  description: "التنبؤ بالمخاطر المستقبلية باستخدام خوارزميات التعلم الآلي",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <Database className="w-8 h-8" />,
                  title: "معالجة البيانات الكبيرة",
                  description: "تحليل كميات هائلة من البيانات المالية والمراجعية",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: <FileText className="w-8 h-8" />,
                  title: "أتمتة التقارير",
                  description: "إنشاء تقارير المراجعة تلقائياً باستخدام الذكاء الاصطناعي",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: <Monitor className="w-8 h-8" />,
                  title: "التدقيق المستمر",
                  description: "مراقبة مستمرة للعمليات المالية والكشف عن المخاطر",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "اتخاذ القرارات الذكية",
                  description: "دعم اتخاذ القرارات المراجعية باستخدام البيانات والتحليلات",
                  color: "from-red-500 to-red-600"
                }
              ].map((application, index) => (
                <motion.div
                  key={application.title}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${application.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <div className="text-white">
                        {application.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{application.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{application.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم التسجيل */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                انضم إلى ثورة الذكاء الاصطناعي في المراجعة
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                كن جزءاً من مستقبل المراجعة الرقمية وتعلم أحدث التقنيات في السوق
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-3xl p-8 lg:p-12 border border-cyan-100">
                <div className="text-center space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      دورة الذكاء الاصطناعي في المراجعة
                    </h3>
                    <p className="text-lg text-slate-700">
                      دورة تقنية متقدمة في تطبيقات الذكاء الاصطناعي للمراجعة والتدقيق
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">18</div>
                      <div className="text-slate-600">أسبوع تدريبي</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">90</div>
                      <div className="text-slate-600">ساعة تعليمية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">AI</div>
                      <div className="text-slate-600">متخصصة</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/subscribe"
                      className="inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-lg font-semibold rounded-xl hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      اشترك في الدورة
                      <Play className="w-5 h-5 mr-3" />
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center px-8 py-5 border-2 border-slate-900 text-slate-900 text-lg font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                      استفسر عن التفاصيل
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <ChatAssistantWidget />

      {/* زر العودة للأعلى */}
      <AnimatePresence>
        {showScrollToTop && (
          <button
            className="fixed bottom-8 right-8 z-40 bg-cyan-600 text-white p-4 rounded-full shadow transition hover:scale-105"
            onClick={scrollToTop}
            aria-label="العودة إلى الأعلى"
            style={{ transition: 'all 0.2s' }}
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
