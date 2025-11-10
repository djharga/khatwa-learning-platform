'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, HelpCircle, Star, TrendingUp, User, Users, BookOpen, Brain, Shield, CheckCircle, CreditCard, Warehouse, FileText, Calculator, Award, Lock, EyeOff, FileX, HardDrive, Smartphone, Target, Heart, Zap, Globe, Calendar, Clock, MapPin, Play, Download, ArrowRight, Scale, Gavel, FileCheck } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';

export default function ComplianceCoursePage() {
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-green-100/40 to-teal-100/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-green-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium text-sm">دورة متخصصة - متقدم</span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl xl:text-7xl font-bold text-green-600 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  الامتثال والحوكمة الرشيدة
                </motion.h1>

                <motion.p
                  className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  دورة متخصصة في متطلبات الامتثال والحوكمة الرشيدة للشركات مع التركيز على المعايير السعودية والدولية
                </motion.p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-xl">
                    <Clock className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">10 أسابيع</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl">
                    <Users className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">1,650 طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-xl">
                    <Star className="w-5 h-5 text-purple-600" />
                    <span className="text-purple-700 font-medium">4.9 تقييم</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center justify-center px-8 py-5 bg-green-600 text-white text-lg font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    اشترك في الدورة
                    <ArrowRight className="w-5 h-5 mr-3" />
                  </Link>
                  <Link
                    href="#curriculum"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-green-600 text-green-600 text-lg font-semibold rounded-xl hover:bg-green-50 transition-all duration-200 hover:shadow-md"
                  >
                    عرض المنهج
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">399 ريال</div>
                      <div className="text-slate-600">للدورة كاملة</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">معايير دولية وسعودية</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">حالات عملية متقدمة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">شهادة امتثال معتمدة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">أدوات تطبيقية</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-center text-sm text-slate-600">
                        المدرب: د. محمد السالم - خبير حوكمة شركات
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
                المنهج المتخصص في الامتثال
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                منهج شامل يغطي جميع جوانب الامتثال والحوكمة الرشيدة للشركات
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  week: "الأسبوع 1-2",
                  title: "أساسيات الحوكمة الرشيدة",
                  topics: ["مبادئ الحوكمة الرشيدة", "دور مجلس الإدارة", "مسؤوليات الإدارة العليا", "معايير OECD"],
                  duration: "10 ساعات",
                  color: "from-green-500 to-green-600"
                },
                {
                  week: "الأسبوع 3-4",
                  title: "الإطار القانوني السعودي",
                  topics: ["قانون الشركات السعودي", "نظام السوق المالية", "اللائحة التنفيذية", "القرارات والتعليمات"],
                  duration: "12 ساعات",
                  color: "from-teal-500 to-teal-600"
                },
                {
                  week: "الأسبوع 5-6",
                  title: "إدارة المخاطر والرقابة الداخلية",
                  topics: ["نظام الرقابة الداخلية", "تقييم فعالية الرقابة", "إدارة المخاطر المؤسسية", "الامتثال التشغيلي"],
                  duration: "14 ساعات",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  week: "الأسبوع 7-8",
                  title: "الإفصاح والشفافية",
                  topics: ["متطلبات الإفصاح المالي", "الحوكمة البيئية والاجتماعية", "إدارة النزاعات", "الإبلاغ عن المخالفات"],
                  duration: "12 ساعات",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  week: "الأسبوع 9-10",
                  title: "التطبيقات العملية والتقييم",
                  topics: ["دراسات حالة سعودية", "تطبيق المعايير العملية", "تقييم الامتثال", "خطة التحسين"],
                  duration: "12 ساعات",
                  color: "from-orange-500 to-orange-600"
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
                        <Scale className="w-8 h-8 text-white" />
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
                خبير متخصص في الحوكمة الرشيدة والامتثال المؤسسي
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">د. محمد السالم</h3>
                      <p className="text-green-600 font-medium mb-4">خبير حوكمة شركات وامتثال</p>
                      <p className="text-slate-700 leading-relaxed">
                        خبير في مجال الحوكمة الرشيدة والامتثال المؤسسي مع أكثر من 18 عاماً من الخبرة في أكبر الشركات السعودية المدرجة.
                        مستشار معتمد في حوكمة الشركات ومتطلبات الإفصاح المالي.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">18+</div>
                        <div className="text-sm text-slate-600">سنوات خبرة</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">CMA</div>
                        <div className="text-sm text-slate-600">معتمد</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-green-600" />
                        <span className="text-slate-700">عضو مجلس إدارة في شركات مدرجة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-700">مدير الامتثال في مجموعة البركة المصرفية</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-slate-700">مستشار لأكثر من 40 شركة سعودية</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-green-100 to-teal-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-32 h-32 text-slate-600" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      4.9 ★ تقييم
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم المعايير والشهادات */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                المعايير والشهادات المعتمدة
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                تغطي الدورة أهم المعايير الدولية والمحلية في مجال الامتثال
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Scale className="w-8 h-8" />,
                  title: "معايير OECD",
                  description: "مبادئ الحوكمة الرشيدة للشركات المدرجة",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: <Gavel className="w-8 h-8" />,
                  title: "قانون الشركات السعودي",
                  description: "المتطلبات القانونية للشركات في السعودية",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <FileCheck className="w-8 h-8" />,
                  title: "نظام السوق المالية",
                  description: "الإفصاح والشفافية للشركات المدرجة",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "معايير IFRS",
                  description: "المعايير الدولية للتقارير المالية",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  icon: <Building className="w-8 h-8" />,
                  title: "معايير COSO",
                  description: "إطار الرقابة الداخلية والمخاطر",
                  color: "from-red-500 to-red-600"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "شهادة CMA",
                  description: "شهادة إدارة الامتثال المعتمدة",
                  color: "from-teal-500 to-teal-600"
                }
              ].map((standard, index) => (
                <motion.div
                  key={standard.title}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${standard.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <div className="text-white">
                        {standard.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{standard.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{standard.description}</p>
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
                انضم إلى قادة الامتثال
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                كن جزءاً من نخبة المتخصصين في الحوكمة الرشيدة والامتثال المؤسسي
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl p-8 lg:p-12 border border-green-100">
                <div className="text-center space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      دورة الامتثال والحوكمة الرشيدة
                    </h3>
                    <p className="text-lg text-slate-700">
                      دورة متخصصة مع شهادة امتثال معتمدة وأدوات تطبيقية متقدمة
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">10</div>
                      <div className="text-slate-600">أسبوع تدريبي</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">50</div>
                      <div className="text-slate-600">ساعة تعليمية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">CMA</div>
                      <div className="text-slate-600">معتمدة</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/subscribe"
                      className="inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-green-600 to-teal-600 text-white text-lg font-semibold rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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
            className="fixed bottom-8 right-8 z-40 bg-green-600 text-white p-4 rounded-full shadow transition hover:scale-105"
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
