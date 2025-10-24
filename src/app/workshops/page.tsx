'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, HelpCircle, Star, TrendingUp, User, Users, BookOpen, Brain, Shield, CheckCircle, CreditCard, Warehouse, FileText, Calculator, Award, Lock, EyeOff, FileX, HardDrive, Smartphone, Target, Heart, Zap, Globe, Calendar, Clock, MapPin } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';
import ContactComponent from '@/components/ContactComponent';
import ProtectionToggle from '@/components/ProtectionToggle';

export default function WorkshopsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center space-y-8">
              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
                <span className="text-slate-700 font-medium text-sm">ورش عمل تفاعلية</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-7xl xl:text-8xl font-bold text-blue-600 leading-none tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                ورش العمل
              </motion.h1>

              <motion.p
                className="text-xl lg:text-2xl text-slate-700 leading-relaxed max-w-4xl mx-auto font-medium"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                ورش عمل تفاعلية مباشرة مع خبراء معتمدين لتطوير المهارات العملية والحلول المباشرة للتحديات المهنية
              </motion.p>
            </div>
          </div>
        </section>

        {/* قسم الورش القادمة */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                الورش القادمة
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                انضم إلى ورش عملنا التفاعلية وتعلم من خبراء معتمدين في بيئة عملية مباشرة
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {[
                {
                  title: "ورشة تحليل المخاطر التشغيلية",
                  instructor: "د. سارة المحمد",
                  date: "15 نوفمبر 2025",
                  time: "10:00 ص - 4:00 م",
                  location: "عبر الإنترنت",
                  price: "299 ريال",
                  capacity: "50 مشارك",
                  description: "ورشة عملية شاملة في تحليل وتقييم المخاطر التشغيلية مع تطبيقات عملية على حالات حقيقية",
                  features: ["تحليل مخاطر متقدم", "أدوات عملية", "دراسات حالة", "شهادة مشاركة"],
                  color: "from-blue-500 to-blue-600"
                },
                {
                  title: "ورشة الامتثال والحوكمة الرشيدة",
                  instructor: "د. محمد السالم",
                  date: "22 نوفمبر 2025",
                  time: "9:00 ص - 3:00 م",
                  location: "عبر الإنترنت",
                  price: "349 ريال",
                  capacity: "40 مشارك",
                  description: "ورشة متخصصة في متطلبات الامتثال والحوكمة مع التركيز على المعايير السعودية والدولية",
                  features: ["معايير دولية", "قوانين سعودية", "حالات عملية", "أدوات تطبيقية"],
                  color: "from-green-500 to-green-600"
                },
                {
                  title: "ورشة التدقيق الرقمي والأتمتة",
                  instructor: "د. فاطمة الزهراني",
                  date: "29 نوفمبر 2025",
                  time: "10:00 ص - 5:00 م",
                  location: "عبر الإنترنت",
                  price: "399 ريال",
                  capacity: "35 مشارك",
                  description: "استكشف أحدث تقنيات التدقيق الرقمي وأدوات الأتمتة مع تطبيق عملي على أنظمة ERP",
                  features: ["تقنيات حديثة", "أتمتة عمليات", "أنظمة ERP", "أدوات BI"],
                  color: "from-purple-500 to-purple-600"
                },
                {
                  title: "ورشة إدارة المشاريع المالية",
                  instructor: "د. عبدالله الشمري",
                  date: "6 ديسمبر 2025",
                  time: "9:00 ص - 4:00 م",
                  location: "عبر الإنترنت",
                  price: "329 ريال",
                  capacity: "45 مشارك",
                  description: "تعلم إدارة المشاريع المالية من التخطيط إلى التنفيذ باستخدام منهجيات PMI",
                  features: ["منهجيات PMI", "أدوات إدارة", "تخطيط مالي", "تقييم أداء"],
                  color: "from-orange-500 to-orange-600"
                }
              ].map((workshop, index) => (
                <motion.div
                  key={workshop.title}
                  className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 space-y-6">
                    {/* Header */}
                    <div className="space-y-3">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r ${workshop.color}`}>
                        <Calendar className="w-3 h-3" />
                        {workshop.date}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                        {workshop.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {workshop.description}
                      </p>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-slate-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-900">{workshop.instructor}</div>
                        <div className="text-xs text-slate-500">المدرب المعتمد</div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{workshop.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{workshop.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{workshop.capacity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-600">{workshop.price}</span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-slate-900">ما ستتعلمه:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {workshop.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA */}
                    <button className="group/btn relative w-full inline-flex items-center justify-center bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold py-3 rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative">سجل الآن</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="relative bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-slate-200 max-w-4xl mx-auto hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  لم تجد الورشة المناسبة؟
                </h3>
                <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                  نحن نقدم ورش عمل مخصصة حسب احتياجات شركتك أو فريقك. تواصل معنا لترتيب ورشة عمل خاصة.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group/link relative inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-slate-800 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-3">
                      اطلب ورشة مخصصة
                      <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </Link>
                  <Link
                    href="/consulting"
                    className="group/link relative inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 text-slate-900 font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-slate-900 transform scale-x-0 group-hover/link:scale-x-100 transition-transform duration-300 origin-right group-hover/link:origin-left"></span>
                    <span className="relative group-hover/link:text-white transition-colors duration-300">
                      تعرف على الاستشارات
                    </span>
                  </Link>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* قسم فوائد الورش */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                لماذا تشارك في ورشنا؟
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                تجربة تعليمية فريدة تجمع بين النظرية والتطبيق العملي
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "تعليم تفاعلي",
                  description: "جلسات مباشرة مع الخبراء مع إمكانية التفاعل والأسئلة الفورية",
                  color: "from-blue-500 to-blue-600"
                },
                {
                  icon: <Target className="w-8 h-8" />,
                  title: "تركيز على التطبيق",
                  description: "تمارين عملية وحالات دراسية حقيقية من السوق السعودي",
                  color: "from-green-500 to-green-600"
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "شهادات معتمدة",
                  description: "شهادات مشاركة معتمدة من منصة خطى وشركائنا",
                  color: "from-purple-500 to-purple-600"
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "شبكة مهنية",
                  description: "تواصل مع متخصصين آخرين وتبادل الخبرات",
                  color: "from-orange-500 to-orange-600"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "حلول فورية",
                  description: "إجابات مباشرة على تحدياتك المهنية اليومية",
                  color: "from-red-500 to-red-600"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "ضمان الجودة",
                  description: "محتوى معتمد ومدربون ذوي خبرة عملية موثقة",
                  color: "from-indigo-500 to-indigo-600"
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div className="space-y-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto`}>
                      <div className="text-white">
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* قسم التواصل */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                ابدأ رحلتك التدريبية
              </h2>
              <p className="text-xl text-slate-700 max-w-3xl mx-auto">
                انضم إلى مجتمع المتخصصين وطور مهاراتك مع أفضل الخبراء
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <ContactComponent />
            </div>
          </div>
        </section>
      </div>

      <ChatAssistantWidget />
      <ProtectionToggle />

      {/* زر العودة للأعلى */}
      <AnimatePresence>
        {showScrollToTop && (
          <button
            className="group fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:scale-105"
            onClick={scrollToTop}
            aria-label="العودة إلى الأعلى"
          >
            <ChevronUp className="w-6 h-6 transition-transform group-hover:-translate-y-0.5" />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
}
