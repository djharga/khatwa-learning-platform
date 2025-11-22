'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, HelpCircle, Star, TrendingUp, User, Users, BookOpen, Brain, Shield, CheckCircle, CreditCard, Warehouse, FileText, Calculator, Award, Lock, EyeOff, FileX, HardDrive, Smartphone, Target, Heart, Zap, Globe, Calendar, Clock, MapPin, Play, Download, ArrowRight, Briefcase, BarChart3, DollarSign } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

export default function FinancialProjectsCoursePage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // التحقق من أننا في المتصفح (client-side)
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-100/40 to-pink-100/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-orange-100/30 to-red-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
                  <div className="w-2 h-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium text-sm">دورة متقدمة - إدارية</span>
                </motion.div>

                <motion.h1
                  className="text-4xl lg:text-6xl xl:text-7xl font-bold text-red-600 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  إدارة المشاريع المالية المتكاملة
                </motion.h1>

                <motion.p
                  className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  تعلم إدارة المشاريع المالية من التخطيط إلى التنفيذ والتقييم باستخدام منهجيات PMI وأدوات إدارة حديثة
                </motion.p>

                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 rounded-xl">
                    <Clock className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">16 أسبوع</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-pink-50 border border-pink-200 rounded-xl">
                    <Users className="w-5 h-5 text-pink-600" />
                    <span className="text-pink-700 font-medium">1,234 طالب</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200 rounded-xl">
                    <Star className="w-5 h-5 text-orange-600" />
                    <span className="text-orange-700 font-medium">4.7 تقييم</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center justify-center px-8 py-5 bg-red-600 text-white text-lg font-semibold rounded-xl hover:bg-red-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  >
                    اشترك في الدورة
                    <ArrowRight className="w-5 h-5 mr-3" />
                  </Link>
                  <Link
                    href="#curriculum"
                    className="inline-flex items-center justify-center px-8 py-5 border-2 border-red-600 text-red-600 text-lg font-semibold rounded-xl hover:bg-red-50 transition-all duration-200 hover:shadow-md"
                  >
                    عرض المنهج
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-200">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">349 ريال</div>
                      <div className="text-slate-600">للدورة كاملة</div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">منهجيات PMI معتمدة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">أدوات إدارة حديثة</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">تخطيط مالي شامل</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                        <span className="text-slate-700">تقييم أداء متقدم</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="text-center text-sm text-slate-600">
                        المدرب: د. عبدالله الشمري - PMP معتمد
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
                المنهج الإداري المتكامل
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                منهج شامل يغطي جميع مراحل إدارة المشاريع المالية باستخدام أفضل الممارسات العالمية
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  week: "الأسبوع 1-2",
                  title: "أساسيات إدارة المشاريع المالية",
                  topics: ["تعريف المشاريع المالية", "أنواع المشاريع المالية", "دور مدير المشاريع", "تحديات الإدارة المالية"],
                  duration: "12 ساعات",
                  color: "from-red-500 to-red-600"
                },
                {
                  week: "الأسبوع 3-4",
                  title: "مرحلة التخطيط المالي",
                  topics: ["تحليل الجدوى المالية", "تقدير التكاليف والإيرادات", "تحليل التدفقات النقدية", "مخاطر المشروع المالية"],
                  duration: "14 ساعات",
                  color: "from-pink-500 to-pink-600"
                },
                {
                  week: "الأسبوع 5-6",
                  title: "إدارة الموارد والميزانية",
                  topics: ["تخطيط الموارد المالية", "إعداد الميزانيات التفصيلية", "مراقبة الإنفاق", "إدارة التغييرات المالية"],
                  duration: "16 ساعات",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  week: "الأسبوع 7-8",
                  title: "منهجيات PMI في المشاريع المالية",
                  topics: ["إطار عمل PMBOK", "إدارة النطاق المالي", "إدارة الجدول الزمني", "إدارة الجودة المالية"],
                  duration: "14 ساعات",
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  week: "الأسبوع 9-10",
                  title: "إدارة المخاطر والامتثال",
                  topics: ["تحديد المخاطر المالية", "تقييم وتحليل المخاطر", "خطط الاستجابة للمخاطر", "الامتثال التنظيمي"],
                  duration: "12 ساعات",
                  color: "from-green-500 to-green-600"
                },
                {
                  week: "الأسبوع 11-12",
                  title: "التنفيذ والمراقبة",
                  topics: ["تنفيذ خطة المشروع", "مراقبة الأداء المالي", "إدارة التغييرات", "التواصل مع أصحاب المصلحة"],
                  duration: "14 ساعات",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  week: "الأسبوع 13-14",
                  title: "التقييم والإغلاق",
                  topics: ["تقييم أداء المشروع", "تحليل الفرق بين المخطط والفعلي", "إعداد تقارير الإغلاق", "دروس مستفادة"],
                  duration: "12 ساعات",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  week: "الأسبوع 15-16",
                  title: "أدوات إدارة المشاريع الحديثة",
                  topics: ["Microsoft Project", "أدوات Agile للمشاريع المالية", "أنظمة إدارة المشاريع السحابية", "تحليلات الأداء"],
                  duration: "10 ساعات",
                  color: "from-indigo-500 to-indigo-600"
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
                        <Briefcase className="w-8 h-8 text-white" />
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
                خبير معتمد في إدارة المشاريع المالية والتخطيط الاستراتيجي
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl border border-slate-200">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-2">د. عبدالله الشمري</h3>
                      <p className="text-red-600 font-medium mb-4">خبير إدارة مشاريع مالية - PMP معتمد</p>
                      <p className="text-slate-700 leading-relaxed">
                        خبير في إدارة المشاريع المالية مع أكثر من 16 عاماً من الخبرة في أكبر الشركات المالية السعودية.
                        حاصل على شهادة PMP وخبرة عملية في إدارة مشاريع مالية معقدة بمليارات الريالات.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">16+</div>
                        <div className="text-sm text-slate-600">سنوات خبرة</div>
                      </div>
                      <div className="text-center p-4 bg-slate-50 rounded-2xl">
                        <div className="text-2xl font-bold text-slate-900">PMP</div>
                        <div className="text-sm text-slate-600">معتمد</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-red-600" />
                        <span className="text-slate-700">مدير مشاريع في البنوك الكبرى</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Building className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-700">مستشار في شركات الاستثمار</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-purple-600" />
                        <span className="text-slate-700">مدرب لأكثر من 500 مدير مشاريع</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="w-80 h-80 bg-gradient-to-br from-red-100 to-pink-100 rounded-full mx-auto flex items-center justify-center">
                      <User className="w-32 h-32 text-slate-600" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      4.7 ★ تقييم
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم المهارات الإدارية */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                المهارات الإدارية المكتسبة
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                ستتقن مهارات إدارة المشاريع المالية المتقدمة والتخطيط الاستراتيجي
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "التخطيط المالي الاستراتيجي",
                  description: "وضع خطط مالية شاملة وواقعية للمشاريع",
                  color: "from-red-500 to-red-600"
                },
                {
                  icon: <DollarSign className="w-8 h-8" />,
                  title: "إدارة الميزانيات والتكاليف",
                  description: "مراقبة وإدارة التكاليف بكفاءة عالية",
                  color: "from-pink-500 to-pink-600"
                },
                {
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: "تحليل الأداء المالي",
                  description: "قياس وتحليل أداء المشاريع المالية",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "إدارة المخاطر المالية",
                  description: "تحديد وإدارة المخاطر في المشاريع المالية",
                  color: "from-yellow-500 to-yellow-600"
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "التقارير المالية التنفيذية",
                  description: "إعداد تقارير مالية شاملة للإدارة العليا",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "إدارة أصحاب المصلحة",
                  description: "التواصل الفعال مع جميع الأطراف المعنية",
                  color: "from-blue-500 to-blue-600"
                }
              ].map((skill, index) => (
                <motion.div
                  key={skill.title}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <div className="text-white">
                        {skill.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{skill.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{skill.description}</p>
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
                انضم إلى قادة إدارة المشاريع المالية
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                كن جزءاً من نخبة مديري المشاريع المالية المؤهلين في المنطقة
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-8 lg:p-12 border border-red-100">
                <div className="text-center space-y-8">
                  <div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      دورة إدارة المشاريع المالية المتكاملة
                    </h3>
                    <p className="text-lg text-slate-700">
                      دورة شاملة مع منهجيات PMI وأدوات إدارة حديثة
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">16</div>
                      <div className="text-slate-600">أسبوع تدريبي</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">80</div>
                      <div className="text-slate-600">ساعة تعليمية</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-900 mb-2">PMP</div>
                      <div className="text-slate-600">معتمدة</div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/subscribe"
                      className="inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-red-600 to-pink-600 text-white text-lg font-semibold rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
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

      <ScrollToTopButton 
        threshold={300}
        position="right"
        offset="bottom-8 right-8"
        size="md"
      />
    </div>
  );
}
