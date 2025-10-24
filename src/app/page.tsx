'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { Building, ChevronUp, Crown, GraduationCap, Star, User, Users, BookOpen, Shield, CheckCircle, Award, Brain, FileText, CalculatorIcon } from 'lucide-react';
import ChatAssistantWidget from '@/components/ChatAssistantWidget';
import ContactComponent from '@/components/ContactComponent';
import Calculator from '@/components/exam/Calculator';
import ProtectionToggle from '@/components/ProtectionToggle';

// Courses Banner Section with Background Image
const CoursesBannerSection = () => (
  <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-20 lg:py-32 overflow-hidden">
    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/herobanar.jpg')`,
        filter: 'brightness(0.4) contrast(0.8)'
      }}
    ></div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-900/70 to-slate-900/60"></div>

    {/* Floating Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-slate-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-blue-400/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="space-y-6">
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <span className="text-white font-semibold text-sm">منصة التعليم المهني الرائدة</span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              خطى
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl font-bold text-blue-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              من التعلم إلى التميز المهني
            </motion.p>
          </div>

          <motion.p
            className="text-lg text-gray-200 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            منصة شاملة تجمع التعليم المتقدم، الأدوات الذكية، والخبرة العملية لمتخصصي المحاسبة والمراجعة الداخلية.
          </motion.p>

          <motion.div
            className="grid grid-cols-3 gap-6 py-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            {[
              { value: "5000+", label: "متخصص معتمد" },
              { value: "CIA", label: "شهادات معتمدة" },
              { value: "24/7", label: "دعم فني" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <Link
              href="/auditors-fellowship"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg"
            >
              ابدأ مسار المراجعة الداخلية
            </Link>
            <Link
              href="/courses"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
            >
              استكشف جميع البرامج
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center gap-6 pt-8 border-t border-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">معتمد من IIA</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">شهادات عالمية</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">أمان متقدم</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="lg:pl-12"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/30 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-semibold text-sm">البرنامج المميز</span>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">
              مسار المراجع الداخلي المتكامل
            </h3>
            <p className="text-gray-200 mb-6">
              رحلة تعليمية شاملة من المبتدئ إلى الخبير مع شهادات معتمدة وخبرة عملية حقيقية.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-white">3</div>
                <div className="text-sm text-gray-300">مستويات تعليمية</div>
              </div>
              <div className="text-center p-4 bg-white/10 rounded-xl border border-white/20">
                <div className="text-2xl font-bold text-white">CIA</div>
                <div className="text-sm text-gray-300">شهادة مهنية</div>
              </div>
            </div>

            <Link
              href="/auditors-fellowship"
              className="w-full px-6 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors block text-center shadow-lg"
            >
              ابدأ رحلتك المهنية الآن
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);



export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);

      // Show scroll to top button after scrolling past 300px
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
      {/* شريط تقدم الصفحة البسيط */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-slate-600 z-50"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.2s' }}
      />

      {/* محتوى الصفحة */}
      <div className="relative z-10">
        {/* 1. قسم الهيرو - أهم شيء أولاً */}
        <CoursesBannerSection />

        {/* 2. قسم الهوية النصية المعتمدة - Brand Identity Section */}
        <section className="relative py-32 lg:py-40 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-purple-100/30 to-slate-100/30 rounded-full blur-2xl"
              animate={{
                x: [-50, 50, -50],
                y: [-30, 30, -30],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Brand Name & Primary Definition */}
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full mb-10 shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <div className="w-3 h-3 bg-gradient-to-r from-slate-600 to-slate-700 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-semibold text-sm">منصة خطى للتعليم والتدريب والاستشارات</span>
                </motion.div>

                <motion.h2
                  className="text-5xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-12 leading-tight tracking-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  منصة عربية رائدة في تعليم وتطوير مهارات الأعمال
                </motion.h2>

                <motion.p
                  className="text-xl lg:text-3xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  تجمع بين المحتوى الأكاديمي والتطبيق العملي الواقعي، وتقدّم تجربة تعليمية ذكية تعتمد على الأدوات التقنية الحديثة والذكاء الاصطناعي.
                </motion.p>
              </motion.div>

              {/* Core Philosophy */}
              <motion.div
                className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-slate-200 mb-12"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <div className="text-center mb-8">
                  <motion.h3
                    className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    فلسفتنا الجوهرية
                  </motion.h3>
                  <motion.div
                    className="w-16 h-1 bg-gradient-to-r from-slate-900 to-slate-700 mx-auto rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>

                <motion.p
                  className="text-lg lg:text-xl text-slate-700 leading-relaxed text-center font-medium"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  في "خطى"، نؤمن بأن التعلم الحقيقي يبدأ عندما تُطبّق المعرفة على أرض الواقع. تأسست منصتنا بهدف توفير محتوى تدريبي عملي 100%، مستند إلى خبرات وتجارب شركات رائدة، لتسهل عليك طريق التميز المهني.
                </motion.p>
              </motion.div>

              {/* Strategic Framework */}
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {/* Vision */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">الرؤية</h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    أن نصبح المنصة العربية الرائدة في تعليم وتطوير مهارات الشباب لمواكبة سوق العمل، وأن نكون الشريك الاستراتيجي الأول للشركات والمؤسسات في بناء جيل قادة للشركات ويلبي احتياجات السوق السعودي.
                  </p>
                </div>

                {/* Mission */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">الرسالة</h4>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    نسعى لتمكين الخريجيين ورواد الأعمال من امتلاك المهارات والأدوات اللازمة لرفع جودة أعمال الشركات عبر برامج تدريبية متكاملة، ودروس تطبيقية، وحالات عملية مستمدة من الواقع.
                  </p>
                </div>
              </div>

              {/* Value Proposition */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-8 lg:p-12 text-white text-center">
                <h3 className="text-2xl lg:text-3xl font-bold mb-6">
                  قيمتنا الحقيقية
                </h3>
                <p className="text-lg lg:text-xl leading-relaxed mb-8 font-medium">
                  نحن لا نكتفي بإعطائك المعلومة… بل نمنحك القدرة على التطبيق فورًا عبر تدريب عملي قائم على حالات واقعية وأدوات عملية.
                </p>
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  <span className="font-semibold">تجهيزك بالخبرة العملية والأدوات اللازمة لتكون قيمة مضافة لأي مؤسسة منذ يومك الأول</span>
                </div>
              </div>

              {/* Primary CTA */}
              <div className="text-center mt-12">
                <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-slate-200">
                  <h4 className="text-2xl font-bold text-slate-900 mb-4">
                    ابدأ رحلتك نحو الاحتراف والتميز المهني
                  </h4>
                  <p className="text-lg text-slate-700 mb-8 leading-relaxed">
                    الفرصة الآن متاحة للجميع، دون قيود على خلفيتك الأكاديمية أو خبرتك السابقة. اكتشف قدراتك، استثمر مهاراتك، واصنع مستقبلك المهني المشرق مع منصة خطى.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/courses"
                      className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      ابدأ الآن رحلتك نحو الاحتراف
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-900 text-slate-900 font-semibold rounded-xl hover:bg-slate-50 transition-all duration-200"
                    >
                      تعرف أكثر على خطى
                    </Link>
                  </div>
                  <p className="text-slate-600 mt-6 font-medium">
                    فالمعرفة النظرية وحدها لا تكفي، والقيمة الحقيقية تكمن في التطبيق العملي
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. قسم الخدمات الرئيسية مع البنارت - World-Class Service Showcase */}
        <section className="relative py-24 lg:py-36 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-8">
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                <span className="text-slate-700 font-medium text-sm">البرامج المتخصصة</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 leading-none tracking-tight">
                اختر مسارك المهني
              </h2>

              <p className="text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-medium">
                برامج مصممة بدقة لتطوير المهارات المهنية في المراجعة الداخلية والإدارة المالية مع ضمانات الجودة العالمية
              </p>
            </div>

            {/* بنارت الخدمات الرئيسية */}
            <div className="space-y-16 mb-20">
              {/* بنر المراجع الداخلي المتقدم */}
              <div className="relative bg-gradient-to-r from-blue-50 via-blue-25 to-blue-50 rounded-3xl p-8 lg:p-12 border border-blue-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center border border-blue-200">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
                        CIA معتمد
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                      المراجع الداخلي المتقدم
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      برنامج شامل من 3 مستويات معتمد من IIA يغطي جميع جوانب المراجعة الداخلية الحديثة مع تطبيقات عملية وحالات دراسية حقيقية.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        3 مستويات تعليمية
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        500+ ساعة تدريبية
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        شهادة CIA معتمدة
                      </span>
                    </div>
                    <Link
                      href="/auditors-fellowship"
                      className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      ابدأ مسار المراجعة الداخلية
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">المستوى الأول</span>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">مكتمل</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
                        </div>
                        <div className="text-sm text-slate-600">75% مكتمل</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* بنر المسار التنفيذي */}
              <div className="relative bg-gradient-to-r from-green-50 via-green-25 to-green-50 rounded-3xl p-8 lg:p-12 border border-green-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/50 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center border border-green-200">
                        <GraduationCap className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-sm font-semibold bg-green-100 text-green-700 px-4 py-2 rounded-full">
                        للقيادات
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                      المسار التنفيذي للمراجعة
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      مسار متخصص للمديرين والقادة مع تركيز على الاستراتيجية والحوكمة الرشيدة والقيادة في مجال المراجعة الداخلية.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        للمديرين والقادة
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        الاستراتيجية والحوكمة
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        شهادات متقدمة
                      </span>
                    </div>
                    <Link
                      href="/auditors-fellowship"
                      className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      ابدأ المسار التنفيذي
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">مهارات القيادة</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">قيد الدراسة</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-1/2"></div>
                        </div>
                        <div className="text-sm text-slate-600">50% مكتمل</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* بنر المكتبة الرقمية */}
              <div className="relative bg-gradient-to-r from-purple-50 via-purple-25 to-purple-50 rounded-3xl p-8 lg:p-12 border border-purple-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100/50 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center border border-purple-200">
                        <BookOpen className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-sm font-semibold bg-purple-100 text-purple-700 px-4 py-2 rounded-full">
                        1000+ مورد
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                      المكتبة الرقمية المتخصصة
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      أكبر مجموعة من المراجع والدراسات والأبحاث في المجال المالي والمراجعي مع تحديثات مستمرة ومحتوى متخصص.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        مراجع محدثة
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        دراسات وبحوث
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        محتوى شامل
                      </span>
                    </div>
                    <Link
                      href="/resources"
                      className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      استكشف المكتبة
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">الكتب المتاحة</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">1200+</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="h-8 bg-purple-100 rounded"></div>
                          <div className="h-8 bg-purple-200 rounded"></div>
                          <div className="h-8 bg-purple-100 rounded"></div>
                        </div>
                        <div className="text-sm text-slate-600">آخر تحديث: أكتوبر 2025</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* بنر حلول الإدارة المالية */}
              <div className="relative bg-gradient-to-r from-orange-50 via-orange-25 to-orange-50 rounded-3xl p-8 lg:p-12 border border-orange-100 overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-200/30 rounded-full blur-xl"></div>
                <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center border border-orange-200">
                        <CalculatorIcon className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-sm font-semibold bg-orange-100 text-orange-700 px-4 py-2 rounded-full">
                        حلول متكاملة
                      </span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
                      حلول الإدارة المالية
                    </h3>
                    <p className="text-lg text-slate-700 leading-relaxed">
                      أدوات متقدمة للإدارة المالية والرقابة التشغيلية مع دعم فني متخصص وأمان متقدم لحماية بياناتك.
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        أدوات متقدمة
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        24/7 دعم فني
                      </span>
                      <span className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        أمان متقدم
                      </span>
                    </div>
                    <Link
                      href="/financial-management"
                      className="inline-flex items-center justify-center px-8 py-4 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                      استكشف الحلول
                      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                  <div className="relative">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600">الأدوات النشطة</span>
                          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">15 أداة</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded text-center">محلل المخاطر</div>
                          <div className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded text-center">تقارير مالية</div>
                        </div>
                        <div className="text-sm text-slate-600">99.9% وقت تشغيل</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* كروت الخدمات المصغرة - تحسين جذري */}
            <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                {
                  title: "دورات متخصصة",
                  description: "دورات قصيرة في مواضيع محددة",
                  icon: <BookOpen className="w-6 h-6" />,
                  href: "/courses",
                  gradient: "from-blue-500 to-blue-600",
                  bgGradient: "from-blue-50 to-blue-100",
                  badge: "جديد",
                  badgeColor: "bg-blue-500"
                },
                {
                  title: "استشارات مهنية",
                  description: "استشارات مخصصة لمشاريعك",
                  icon: <Users className="w-6 h-6" />,
                  href: "/consulting",
                  gradient: "from-purple-500 to-purple-600",
                  bgGradient: "from-purple-50 to-purple-100",
                  badge: "مخصص",
                  badgeColor: "bg-purple-500"
                },
                {
                  title: "بنك الأسئلة",
                  description: "أسئلة امتحانات CIA وشهادات أخرى",
                  icon: <FileText className="w-6 h-6" />,
                  href: "/question-bank",
                  gradient: "from-green-500 to-green-600",
                  bgGradient: "from-green-50 to-green-100",
                  badge: "محدث",
                  badgeColor: "bg-green-500"
                },
                {
                  title: "ورش عمل",
                  description: "ورش عمل تفاعلية مباشرة",
                  icon: <Brain className="w-6 h-6" />,
                  href: "/workshops",
                  gradient: "from-orange-500 to-orange-600",
                  bgGradient: "from-orange-50 to-orange-100",
                  badge: "مباشر",
                  badgeColor: "bg-orange-500"
                }
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                  <div className="relative bg-white border border-slate-200/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center justify-between">
                        <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <div className="text-white drop-shadow-sm">
                            {service.icon}
                          </div>
                        </div>
                        <motion.span
                          className={`text-xs font-bold text-white px-4 py-2 rounded-full shadow-lg ${service.badgeColor} group-hover:scale-110 transition-transform duration-300`}
                          whileHover={{ rotate: [0, -5, 5, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {service.badge}
                        </motion.span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-slate-800 transition-colors">
                          {service.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                          {service.description}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link
                          href={service.href}
                          className="group/btn relative inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative flex items-center gap-3">
                            استكشف الآن
                            <motion.svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-8 px-8 py-4 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">معتمد من IIA</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700 font-medium">شهادات عالمية</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700 font-medium">خبراء معتمدون</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. قسم الباقات الرئيسية - World-Class Pricing */}
        <section className="relative py-24 lg:py-36 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-200 rounded-full mb-8">
                <div className="w-2 h-2 bg-slate-900 rounded-full"></div>
                <span className="text-slate-700 font-medium text-sm">خطط مرنة لكل احتياجاتك</span>
              </div>

              <h3 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 leading-none tracking-tight">
                ابدأ رحلتك المهنية اليوم
              </h3>

              <p className="text-xl lg:text-2xl text-slate-700 max-w-4xl mx-auto leading-relaxed font-medium">
                اختر الخطة المثالية لتطوير مهاراتك المهنية مع ضمانات الجودة والدعم الكامل
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* باقة الاكتشاف - تحسين جذري */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-slate-200/60">
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-green-600 group-hover:h-2 transition-all duration-500"></div>

                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/20 via-transparent to-green-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <User className="w-10 h-10 text-white drop-shadow-sm" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-3xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">باقة الاكتشاف</h4>
                      <p className="text-lg text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">ابدأ مجاناً واكتشف عالم الاحتراف في المراجعة الداخلية</p>
                    </div>

                    <div className="py-4">
                      <div className="text-6xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">0</div>
                      <div className="text-slate-500 font-medium">ريال / شهر</div>
                    </div>

                    <Link href="/subscription" className="group/btn relative inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-green-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center gap-3">
                        ابدأ مجاناً
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </motion.svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* باقة الاحتراف - تحسين جذري */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group h-full"
              >
                {/* Popular badge - خارج البطاقة لتجنب overflow-hidden */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-30">
                  <motion.span
                    className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-full text-sm font-bold shadow-2xl border-2 border-white"
                    whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    الأكثر طلباً
                  </motion.span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] overflow-hidden border-2 border-purple-500/60 h-full flex flex-col mt-6">

                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 to-purple-600 group-hover:h-2 transition-all duration-500"></div>

                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Crown className="w-10 h-10 text-white drop-shadow-sm" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-3xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">باقة الاحتراف</h4>
                      <p className="text-lg text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">الحل الشامل للمتخصصين مع جميع الأدوات والدعم</p>
                    </div>

                    <div className="py-4">
                      <div className="text-6xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform duration-300">99</div>
                      <div className="text-slate-500 font-medium">دولار / شهر</div>
                    </div>

                    <Link href="/subscription" className="group/btn relative inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center gap-3">
                        اشترك الآن
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </motion.svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* الحلول المؤسسية - تحسين جذري */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                <div className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden border border-slate-200/60">
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:h-2 transition-all duration-500"></div>

                  {/* Background gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                  <div className="relative z-10 text-center space-y-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Building className="w-10 h-10 text-white drop-shadow-sm" />
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-3xl font-bold text-slate-900 group-hover:text-slate-800 transition-colors">الحلول المؤسسية</h4>
                      <p className="text-lg text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">حلول مخصصة للشركات والمؤسسات الكبرى</p>
                    </div>

                    <div className="py-4">
                      <div className="text-3xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">تواصل معنا</div>
                      <div className="text-slate-500 font-medium">للحصول على عرض مخصص</div>
                    </div>

                    <Link href="/contact" className="group/btn relative inline-flex items-center justify-center w-full px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="absolute inset-0 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center gap-3">
                        احصل على عرض
                        <motion.svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: [0, 10, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </motion.svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-8 px-8 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-slate-700 font-medium">ضمان استرداد 30 يوم</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                  <span className="text-slate-700 font-medium">دعم فني 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-slate-700 font-medium">شهادات معتمدة</span>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* 3. قسم الشراكات - تحسين جذري */}
        <section className="relative py-24 lg:py-36 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full mb-10 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-700 font-semibold text-sm">شراكات معتمدة</span>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                شراكاتنا الاستراتيجية
              </motion.h2>

              <motion.p
                className="text-xl lg:text-3xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                نفخر بالتعاون مع أرقى المؤسسات التعليمية والمهنية لضمان أعلى معايير الجودة
              </motion.p>
            </div>

            {/* Enhanced Partners Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              {[
                {
                  name: 'جامعة الملك سعود',
                  icon: GraduationCap,
                  gradient: "from-red-500 to-red-600",
                  bgGradient: "from-red-50 to-red-100",
                  description: 'جامعة سعودية رائدة',
                  delay: 0
                },
                {
                  name: 'معهد المدققين الداخليين',
                  icon: Shield,
                  gradient: "from-blue-500 to-blue-600",
                  bgGradient: "from-blue-50 to-blue-100",
                  description: 'معهد مهني معتمد',
                  delay: 0.1
                },
                {
                  name: 'غرفة التجارة',
                  icon: Building,
                  gradient: "from-green-500 to-green-600",
                  bgGradient: "from-green-50 to-green-100",
                  description: 'مؤسسة تجارية رائدة',
                  delay: 0.2
                },
                {
                  name: 'وزارة التجارة',
                  icon: Award,
                  gradient: "from-purple-500 to-purple-600",
                  bgGradient: "from-purple-50 to-purple-100",
                  description: 'جهة حكومية رسمية',
                  delay: 0.3
                },
              ].map((partner, index) => (
                <motion.div
                  key={partner.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: partner.delay, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                  <div className="relative bg-white border border-slate-200/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${partner.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${partner.gradient} rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <partner.icon className="w-8 h-8 text-white drop-shadow-sm" />
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-slate-800 transition-colors">
                          {partner.name}
                        </h4>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                          {partner.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Strategic Cooperation Section */}
            <motion.div
              className="bg-white rounded-3xl p-12 lg:p-16 shadow-lg border border-slate-200 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-12">
                <motion.h3
                  className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.0, duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  نطاق التعاون الاستراتيجي
                </motion.h3>
                <motion.div
                  className="w-16 h-1 bg-gradient-to-r from-slate-900 to-slate-700 mx-auto rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                ></motion.div>
              </div>

              <motion.p
                className="text-xl text-slate-700 leading-relaxed text-center font-medium mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                شراكاتنا تغطي التعليم، التدريب، وفرص التوظيف في المجالات المالية والإدارية
              </motion.p>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { text: "تطوير المناهج", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
                  { text: "تدريب عملي", icon: Users, color: "from-green-500 to-emerald-500" },
                  { text: "دورات وشهادات", icon: Award, color: "from-purple-500 to-pink-500" }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    className="relative text-center p-8 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-100 overflow-hidden group/stat"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    viewport={{ once: true }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover/stat:opacity-10 transition-opacity duration-300`}></div>
                    <div className="relative">
                      <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                        <item.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-lg font-bold text-slate-900">{item.text}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. Enhanced CIA Fellowship Banner */}
        <section className="relative py-20 sm:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-10 left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/15 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
            <motion.div
              className="absolute top-1/2 left-1/2 w-24 h-24 bg-indigo-400/25 rounded-full blur-xl"
              animate={{
                x: [-20, 20, -20],
                y: [-15, 15, -15],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              {/* Enhanced Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-6">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <span className="text-white font-semibold text-sm">شهادة CIA معتمدة دولياً</span>
                </div>

                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                  هل تستعد لزمالة المراجعين الداخليين
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    (CIA)؟
                  </span>
                </h2>
              </motion.div>

              {/* Enhanced Description */}
              <motion.p
                className="text-xl lg:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                اطلع على مكتبتنا الحصرية{' '}
                <span className="font-bold text-white bg-white/10 px-3 py-1 rounded-lg">Part 1, 2, 3</span>{' '}
                شاملة بنوك الأسئلة، الشروحات، والملفات الصوتية المحدثة لعام 2025
              </motion.p>

              {/* Enhanced Features Grid */}
              <motion.div
                className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                {[
                  {
                    icon: '📚',
                    title: 'مكتبة شاملة',
                    description: 'أكثر من 5000 سؤال محاكي للامتحانات الرسمية'
                  },
                  {
                    icon: '🎧',
                    title: 'محتوى صوتي',
                    description: 'شروحات مفصلة بصوت مدربين معتمدين'
                  },
                  {
                    icon: '📊',
                    title: 'تحليلات متقدمة',
                    description: 'تقارير أداء مفصلة ونقاط القوة والضعف'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                    whileHover={{ scale: 1.05, y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-200 text-sm leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Link
                  href="/auditors-fellowship"
                  className="group relative inline-flex items-center justify-center px-10 py-5 bg-white text-blue-600 font-bold text-xl rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                  <span className="relative flex items-center gap-3">
                    🚀 اذهب إلى صفحة الزمالة
                    <motion.svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </motion.svg>
                  </span>
                </Link>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/80"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">محدث لعام 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">معتمد من IIA</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">5000+ طالب نجحوا</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 6. Enhanced AI Tools Demo Section */}
        <section className="relative py-20 sm:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-200/25 to-blue-200/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full mb-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-700 font-semibold text-sm">الذكاء الاصطناعي في خدمة التعلم</span>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                شاهد كيف تعمل أدواتنا الذكية
              </motion.h2>

              <motion.p
                className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                استكشف أحدث تقنيات الذكاء الاصطناعي المصممة خصيصاً لتعزيز تجربتك التعليمية وتطوير مهاراتك المهنية
              </motion.p>
            </div>

            {/* Enhanced Interactive Tabs */}
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="flex flex-wrap justify-center gap-2 mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {[
                  { id: 'auto-audit', label: 'المراجع الآلي', icon: '🤖', color: 'from-blue-500 to-blue-600' },
                  { id: 'risk-analyzer', label: 'محلل المخاطر', icon: '📊', color: 'from-purple-500 to-purple-600' },
                  { id: 'exec-summary', label: 'الملخص التنفيذي', icon: '📋', color: 'from-green-500 to-green-600' },
                  { id: 'digital-card', label: 'بطاقتك الرقمية', icon: '💳', color: 'from-orange-500 to-orange-600' }
                ].map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    className={`group relative px-6 py-4 bg-white border-2 border-slate-200 rounded-2xl font-semibold text-slate-700 hover:border-slate-300 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                      index === 0 ? 'border-blue-500 bg-blue-50 text-blue-700' : ''
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></span>
                    <span className="relative flex items-center gap-3">
                      <span className="text-2xl">{tab.icon}</span>
                      <span className="font-bold">{tab.label}</span>
                    </span>
                  </motion.button>
                ))}
              </motion.div>

              {/* Enhanced Demo Content */}
              <motion.div
                className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 lg:p-12 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Demo Header */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/60 rounded-full mb-4">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    <span className="text-blue-700 font-semibold text-sm">تجريبي - المراجع الآلي</span>
                  </div>
                  <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                    تحليل تلقائي للتقارير المالية
                  </h3>
                  <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    شاهد كيف يقوم نظامنا الذكي بتحليل التقارير المالية واكتشاف المخاطر والانحرافات في ثوانٍ معدودة
                  </p>
                </div>

                {/* Interactive Demo Area */}
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Demo Visualization */}
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-bold text-slate-900">نتائج التحليل</h4>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                          <span className="text-sm text-green-700 font-medium">مكتمل</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-green-200">
                          <span className="text-slate-700">التوافق مع IFRS</span>
                          <span className="text-green-600 font-bold">98%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-yellow-200">
                          <span className="text-slate-700">مخاطر محتملة</span>
                          <span className="text-yellow-600 font-bold">2 نقاط</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-blue-200">
                          <span className="text-slate-700">كفاءة العمليات</span>
                          <span className="text-blue-600 font-bold">94%</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-200">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎯</span>
                        التوصيات الذكية
                      </h4>
                      <ul className="space-y-3 text-sm text-slate-700">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>تحسين نظام الرقابة الداخلية في قسم المشتريات</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>مراجعة سياسة إدارة المخاطر المالية</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>تطبيق معايير IFRS 16 للعقود الإيجارية</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Demo Stats */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-lg">
                        <div className="text-3xl font-bold text-blue-600 mb-2">0.3s</div>
                        <div className="text-sm text-slate-600">وقت التحليل</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-lg">
                        <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                        <div className="text-sm text-slate-600">نقاط فحص</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-lg">
                        <div className="text-3xl font-bold text-green-600 mb-2">99.7%</div>
                        <div className="text-sm text-slate-600">دقة النتائج</div>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center border border-slate-200 shadow-lg">
                        <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                        <div className="text-sm text-slate-600">متاح دائماً</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
                      <h4 className="font-bold mb-4 flex items-center gap-2">
                        <span className="text-2xl">⚡</span>
                        المزايا الرئيسية
                      </h4>
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span>تحليل فوري للتقارير المالية</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span>اكتشاف تلقائي للمخاطر والانحرافات</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span>توصيات ذكية قابلة للتطبيق</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span>تقارير تفصيلية مع الرسوم البيانية</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-12">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href="/ai-tools"
                      className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-slate-900/50 hover:-translate-y-1"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative flex items-center gap-3">
                        جرب الأدوات الذكية الآن
                        <motion.svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </motion.svg>
                      </span>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. أبرز الكورسات - Interactive Slider - تحسين جذري */}
        <section className="relative py-24 lg:py-36 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
          {/* Enhanced Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <motion.div
              className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-100/50 to-purple-100/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-100/50 to-blue-100/50 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-full mb-10 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-700 font-semibold text-sm">الكورسات الأكثر طلباً</span>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                اختر كورسك التالي
              </motion.h2>

              <motion.p
                className="text-xl lg:text-3xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                استكشف أبرز الدورات التدريبية المعتمدة من IIA والمصممة خصيصاً لتطوير مهاراتك المهنية
              </motion.p>
            </div>

            {/* Enhanced Interactive Course Slider */}
            <div className="relative">
              <div
                className="flex gap-8 overflow-x-auto pb-8 scrollbar-hide scroll-smooth"
                style={{
                  scrollBehavior: 'smooth',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                }}
              >
                {[
                  {
                    title: "أساسيات المراجعة الداخلية",
                    description: "دورة شاملة تغطي المفاهيم الأساسية للمراجعة الداخلية مع تطبيقات عملية وحالات دراسية حقيقية من السوق السعودي",
                    instructor: "د. أحمد العتيبي - خبير معتمد من IIA",
                    duration: "8 أسابيع - 40 ساعة تدريبية",
                    students: "2,450 طالب",
                    rating: 4.9,
                    price: "مجاني",
                    badge: "مبتدئ",
                    color: "from-blue-500 to-blue-600",
                    bgGradient: "from-blue-50 to-blue-100",
                    href: "/courses/basics",
                    features: ["مفاهيم أساسية شاملة", "تطبيقات عملية", "حالات دراسية سعودية", "شهادة إتمام"],
                    level: "مبتدئ - لا يتطلب خبرة سابقة",
                    certificate: "شهادة إتمام من منصة خطى",
                    delay: 0
                  },
                  {
                    title: "تحليل المخاطر المتقدم",
                    description: "تعلم كيفية تحديد وتقييم المخاطر في البيئة المالية والتشغيلية باستخدام أحدث المنهجيات والأدوات العالمية",
                    instructor: "د. سارة المحمد - مستشارة مخاطر معتمدة",
                    duration: "12 أسبوع - 60 ساعة تدريبية",
                    students: "1,890 طالب",
                    rating: 4.8,
                    price: "299 ريال",
                    badge: "متقدم",
                    color: "from-purple-500 to-purple-600",
                    bgGradient: "from-purple-50 to-purple-100",
                    href: "/courses/risk-analysis",
                    features: ["تحليل مخاطر متقدم", "أدوات حديثة", "دراسات حالة", "تمارين عملية"],
                    level: "متوسط - يتطلب أساسيات المراجعة",
                    certificate: "شهادة متخصصة معتمدة",
                    delay: 0.1
                  },
                  {
                    title: "الامتثال والحوكمة الرشيدة",
                    description: "دورة متخصصة في متطلبات الامتثال والحوكمة الرشيدة للشركات مع التركيز على المعايير السعودية والدولية",
                    instructor: "د. محمد السالم - خبير حوكمة شركات",
                    duration: "10 أسابيع - 50 ساعة تدريبية",
                    students: "1,650 طالب",
                    rating: 4.9,
                    price: "399 ريال",
                    badge: "متخصص",
                    color: "from-green-500 to-green-600",
                    bgGradient: "from-green-50 to-green-100",
                    href: "/courses/compliance",
                    features: ["معايير دولية", "قوانين سعودية", "حالات عملية", "أدوات تطبيقية"],
                    level: "متقدم - للمتخصصين والمديرين",
                    certificate: "شهادة امتثال معتمدة",
                    delay: 0.2
                  },
                  {
                    title: "التدقيق الرقمي والأتمتة",
                    description: "استكشف أحدث تقنيات التدقيق الرقمي وأدوات الأتمتة الحديثة مع تطبيق عملي على أنظمة ERP وأدوات BI",
                    instructor: "د. فاطمة الزهراني - خبيرة تقنية مالية",
                    duration: "14 أسبوع - 70 ساعة تدريبية",
                    students: "980 طالب",
                    rating: 5.0,
                    price: "499 ريال",
                    badge: "جديد",
                    color: "from-orange-500 to-orange-600",
                    bgGradient: "from-orange-50 to-orange-100",
                    href: "/courses/digital-audit",
                    features: ["تقنيات حديثة", "أتمتة عمليات", "أنظمة ERP", "أدوات BI"],
                    level: "متقدم - يتطلب معرفة تقنية",
                    certificate: "شهادة تدقيق رقمي متخصصة",
                    delay: 0.3
                  },
                  {
                    title: "إدارة المشاريع المالية المتكاملة",
                    description: "تعلم إدارة المشاريع المالية من التخطيط إلى التنفيذ والتقييم باستخدام منهجيات PMI وأدوات إدارة حديثة",
                    instructor: "د. عبدالله الشمري - PMP معتمد",
                    duration: "16 أسبوع - 80 ساعة تدريبية",
                    students: "1,234 طالب",
                    rating: 4.7,
                    price: "349 ريال",
                    badge: "شامل",
                    color: "from-red-500 to-red-600",
                    bgGradient: "from-red-50 to-red-100",
                    href: "/courses/financial-projects",
                    features: ["منهجيات PMI", "أدوات إدارة", "تخطيط مالي", "تقييم أداء"],
                    level: "متقدم - لمديري المشاريع",
                    certificate: "شهادة إدارة مشاريع مالية",
                    delay: 0.4
                  },
                  {
                    title: "المراجعة الداخلية المتقدمة - CIA",
                    description: "تحضير شامل لامتحانات CIA مع تدريب عملي ومحاكاة امتحانات حقيقية من خبراء معتمدين دولياً",
                    instructor: "فريق خبراء IIA معتمدين",
                    duration: "20 أسبوع - 100 ساعة تدريبية",
                    students: "756 طالب",
                    rating: 4.9,
                    price: "899 ريال",
                    badge: "CIA",
                    color: "from-indigo-500 to-indigo-600",
                    bgGradient: "from-indigo-50 to-indigo-100",
                    href: "/courses/cia-preparation",
                    features: ["تحضير CIA كامل", "محاكاة امتحانات", "خبراء دوليين", "مواد محدثة"],
                    level: "متقدم - للمحترفين",
                    certificate: "تحضير لشهادة CIA الدولية",
                    delay: 0.5
                  },
                  {
                    title: "الذكاء الاصطناعي في المراجعة",
                    description: "تعلم استخدام الذكاء الاصطناعي وتعلم الآلة في عمليات المراجعة والكشف عن الاحتيال والمخاطر",
                    instructor: "د. نورة العتيبي - خبيرة AI مالية",
                    duration: "18 أسبوع - 90 ساعة تدريبية",
                    students: "543 طالب",
                    rating: 4.8,
                    price: "699 ريال",
                    badge: "AI",
                    color: "from-cyan-500 to-cyan-600",
                    bgGradient: "from-cyan-50 to-cyan-100",
                    href: "/courses/ai-audit",
                    features: ["تعلم الآلة", "كشف احتيال", "تحليل بيانات", "أدوات AI"],
                    level: "متقدم - تقني",
                    certificate: "شهادة AI في المراجعة",
                    delay: 0.6
                  }
                ].map((course, index) => (
                  <motion.div
                    key={course.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: course.delay, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="group relative flex-shrink-0 w-80"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                    <div className="relative bg-white border border-slate-200/60 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden">
                      {/* Animated background gradient */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${course.bgGradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>

                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                      <div className="relative overflow-hidden">
                        {/* Enhanced Course Badge */}
                        <div className="absolute top-4 right-4 z-20">
                          <motion.span
                            className={`px-4 py-2 text-xs font-bold text-white rounded-full bg-gradient-to-r ${course.color} shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {course.badge}
                          </motion.span>
                        </div>

                        {/* Enhanced Course Image Placeholder */}
                        <div className={`h-48 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
                          <div className="absolute bottom-4 left-4">
                            <div className="flex items-center gap-2 text-white/90 text-sm bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full">
                              <Users className="w-4 h-4" />
                              <span>{course.students}</span>
                            </div>
                          </div>
                          {/* Animated overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            initial={{ y: 20 }}
                            whileHover={{ y: 0 }}
                          />
                        </div>
                      </div>

                      <div className="relative z-10 p-6 space-y-4">
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-slate-900 leading-tight line-clamp-2 group-hover:text-slate-800 transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-700 transition-colors">
                            {course.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between text-sm text-slate-500">
                          <span className="font-medium">{course.instructor}</span>
                          <span>{course.duration}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-slate-700">{course.rating}</span>
                          </div>
                          <div className="text-lg font-bold text-slate-900">{course.price}</div>
                        </div>

                        <Link
                          href={course.href}
                          className="group/btn relative inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                        >
                          <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                          <span className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative flex items-center gap-3">
                            ابدأ الدورة الآن
                            <motion.svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              animate={{ x: [0, 3, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </motion.svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Enhanced Scroll Indicators */}
              <div className="flex justify-center gap-4 mt-8">
                <motion.button
                  className="group p-4 rounded-full bg-white border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  onClick={() => {
                    const slider = document.querySelector('.scroll-smooth');
                    if (slider) {
                      slider.scrollBy({ left: -320, behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-slate-600 group-hover:text-slate-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
                <motion.button
                  className="group p-4 rounded-full bg-white border border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                  onClick={() => {
                    const slider = document.querySelector('.scroll-smooth');
                    if (slider) {
                      slider.scrollBy({ left: 320, behavior: 'smooth' });
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg className="w-6 h-6 text-slate-600 group-hover:text-slate-800 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Pricing Comparison */}
        <section className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 overflow-hidden">
          {/* Subtle Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-100/15 to-blue-100/15 rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full mb-8 shadow-lg">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <span className="text-slate-700 font-semibold text-sm">خطط مرنة لكل احتياجاتك</span>
              </div>

              <h2 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
                مقارنة الباقات
              </h2>

              <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto">
                اختر الخطة المثالية لتطوير مهاراتك المهنية مع ضمانات الجودة والدعم الكامل
              </p>
            </div>

            {/* Enhanced Comparison Table */}
            <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 lg:p-12 shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="px-6 py-4 text-right font-bold text-slate-900 text-lg">الميزة</th>
                      <th className="px-6 py-4 text-center font-bold text-slate-900 text-lg">
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>الباقة الأساسية</div>
                          <div className="text-2xl font-bold text-green-600">$49</div>
                          <div className="text-sm text-slate-500">/شهر</div>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center font-bold text-slate-900 text-lg border-x-2 border-purple-200 bg-purple-50/50">
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <Crown className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-purple-700">الباقة المهنية</div>
                          <div className="text-3xl font-bold text-purple-600">$129</div>
                          <div className="text-sm text-slate-500">/شهر</div>
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                            الأكثر طلباً
                          </div>
                        </div>
                      </th>
                      <th className="px-6 py-4 text-center font-bold text-slate-900 text-lg">
                        <div className="space-y-2">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                            <Building className="w-6 h-6 text-white" />
                          </div>
                          <div>الباقة المؤسسية</div>
                          <div className="text-2xl font-bold text-blue-600">$299</div>
                          <div className="text-sm text-slate-500">/شهر</div>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "الوصول إلى الدورات", basic: "20 دورة أساسية", pro: "150+ دورة", enterprise: "جميع الدورات + محتوى مخصص" },
                      { feature: "شهادات معتمدة", basic: "نعم", pro: "IIA + أخرى", enterprise: "IIA + شهادات مخصصة" },
                      { feature: "دعم فني", basic: "بريد إلكتروني", pro: "24/7 مخصص", enterprise: "VIP على مدار الساعة" },
                      { feature: "تدريب شخصي", basic: "—", pro: "جلسات فردية", enterprise: "تدريب مخصص للموظفين" },
                      { feature: "أدوات الذكاء الاصطناعي", basic: "أساسية", pro: "متقدمة", enterprise: "كاملة + مخصصة" },
                      { feature: "تحليلات الأداء", basic: "أساسية", pro: "متقدمة", enterprise: "شاملة + تقارير شهرية" }
                    ].map((row, index) => (
                      <tr key={index} className={`border-b border-slate-100 ${index % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="px-6 py-4 font-semibold text-slate-900 text-right">{row.feature}</td>
                        <td className="px-6 py-4 text-center text-slate-700">{row.basic}</td>
                        <td className="px-6 py-4 text-center text-slate-700 bg-purple-50/30 border-x-2 border-purple-200">{row.pro}</td>
                        <td className="px-6 py-4 text-center text-slate-700">{row.enterprise}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                <Link
                  href="/subscription"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-purple-900/50 hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-purple-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative flex items-center gap-3">
                    ابدأ الباقة المهنية الآن
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold text-lg rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative">تواصل للحصول على عرض مخصص</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Security Trust-Builder */}
        <section className="relative py-20 sm:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-green-100/30 to-blue-100/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-100/25 to-purple-100/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full mb-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-green-600 to-blue-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-700 font-semibold text-sm">أمان متقدم وحماية شاملة</span>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                بياناتك ومحتواك في أمان تام
              </motion.h2>

              <motion.p
                className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                نوفر أعلى مستويات الأمان والحماية لضمان خصوصية بياناتك وأمان محتواك التعليمي
              </motion.p>
            </div>

            {/* Enhanced Security Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: '🛡️',
                  title: 'حماية ضد لقطة الشاشة',
                  description: 'منع التقاط صور الشاشة والنسخ غير المصرح به',
                  color: 'from-red-500 to-pink-500',
                  delay: 0
                },
                {
                  icon: '📄',
                  title: 'منع تحويل PDF إلى Word',
                  description: 'حماية المحتوى من التحويل والتعديل غير المصرح به',
                  color: 'from-blue-500 to-cyan-500',
                  delay: 0.1
                },
                {
                  icon: '💾',
                  title: 'مساحة 5 جيجا خاصة',
                  description: 'مساحة تخزين آمنة ومخصصة لكل متدرب',
                  color: 'from-green-500 to-emerald-500',
                  delay: 0.2
                },
                {
                  icon: '📱',
                  title: 'تأمين كامل عند الربط بالهاتف',
                  description: 'تشفير متقدم وأمان شامل لجميع الأجهزة',
                  color: 'from-purple-500 to-indigo-500',
                  delay: 0.3
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                  <div className="relative bg-white border border-slate-200/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl">{feature.icon}</span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-slate-800 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors text-sm">
                          {feature.description}
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Trust Indicators */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-8 px-8 py-4 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium">SSL 256-bit</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium">GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-slate-700 font-medium">ISO 27001</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Enhanced FAQ Section */}
        <section className="relative py-20 sm:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-blue-50/50 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-indigo-200/30 to-purple-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-blue-200/25 to-indigo-200/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full mb-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-700 font-semibold text-sm">الأسئلة الشائعة</span>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                كل ما تريد معرفته
              </motion.h2>

              <motion.p
                className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                إجابات مباشرة وشاملة لأكثر الأسئلة شيوعاً حول منصة خطى وخدماتنا التعليمية
              </motion.p>
            </div>

            {/* Enhanced FAQ Grid */}
            <div className="grid lg:grid-cols-2 gap-6">
              {[
                {
                  question: 'ما هي خطى للتدريب والاستشارات؟',
                  answer: 'خطى للتدريب والاستشارات منصة تعليمية متخصصة في المحاسبة والمالية، تقدم دورات وبرامج تدريبية مع خبراء معتمدين من IIA وجهات دولية أخرى.',
                  icon: '🏢',
                  color: 'from-blue-500 to-cyan-500',
                  delay: 0
                },
                {
                  question: 'هل الشهادات معتمدة؟',
                  answer: 'جميع شهاداتنا معتمدة من جهات دولية (مثل IIA) وتدعم تقدمك المهني في مجال المراجعة الداخلية والمحاسبة.',
                  icon: '🏆',
                  color: 'from-green-500 to-emerald-500',
                  delay: 0.1
                },
                {
                  question: 'ما هي طرق الدفع؟',
                  answer: 'نوفر الدفع بالبطاقات الائتمانية، التحويل البنكي، والمحافظ الإلكترونية، مع خيارات تقسيط مرنة للدورات المطولة.',
                  icon: '💳',
                  color: 'from-purple-500 to-indigo-500',
                  delay: 0.2
                },
                {
                  question: 'هل يمكنني الوصول للدورات من أي جهاز؟',
                  answer: 'نعم، المنصة متجاوبة بالكامل وتعمل بسلاسة على جميع الأجهزة (كمبيوتر، موبايل، لوحي) مع حفظ التقدم تلقائياً.',
                  icon: '📱',
                  color: 'from-orange-500 to-red-500',
                  delay: 0.3
                },
                {
                  question: 'ما هي مدة صلاحية الدورات؟',
                  answer: 'تمنح جميع الدورات صلاحية مدى الحياة مع تحديثات مجانية عند توفر المحتوى الجديد أو التغييرات في المعايير.',
                  icon: '⏰',
                  color: 'from-teal-500 to-cyan-500',
                  delay: 0.4
                },
                {
                  question: 'هل يوجد دعم فني؟',
                  answer: 'يوجد فريق دعم فني متخصص متاح 24/7 لمساعدتك في أي مشكلة تقنية أو استفسار تعليمي.',
                  icon: '🛠️',
                  color: 'from-indigo-500 to-purple-500',
                  delay: 0.5
                },
              ].map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: faq.delay, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                  <div className="relative bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${faq.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                    <div className="relative z-10 space-y-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 bg-gradient-to-br ${faq.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl">{faq.icon}</span>
                        </div>
                        <h4 className="font-bold text-slate-900 leading-tight group-hover:text-slate-800 transition-colors flex-1">
                          {faq.question}
                        </h4>
                      </div>

                      <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors text-sm">
                        {faq.answer}
                      </p>

                      <div className="pt-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full group-hover:w-16 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 lg:p-12 shadow-2xl">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  لم تجد إجابة سؤالك؟
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  فريق الدعم متاح دائماً لمساعدتك في أي استفسار أو مساعدة تحتاجها
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-3">
                      تواصل معنا
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </motion.svg>
                    </span>
                  </Link>
                  <Link
                    href="/courses"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">استكشف الدورات</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* Enhanced Enterprise Solutions Section */}
        <section className="relative py-20 sm:py-24 lg:py-28 xl:py-32 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0">
            <motion.div
              className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-green-200/25 to-blue-200/25 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-full mb-8 shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                <span className="text-slate-700 font-semibold text-sm">حلول مؤسسية متقدمة</span>
              </motion.div>

              <motion.h2
                className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-8 leading-tight tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                للمؤسسات والشركات
              </motion.h2>

              <motion.p
                className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                استفد من ميزة الـ White‑label لإضافة شعارك وصلاحيات مدى الحياة مع حلول مخصصة لتطوير موظفيك
              </motion.p>
            </div>

            {/* Enhanced Enterprise Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: '🏷️',
                  title: 'White-label مخصص',
                  description: 'أضف شعار شركتك وهويتك البصرية للمنصة مع تخصيص كامل للتصميم والمحتوى',
                  color: 'from-blue-500 to-cyan-500',
                  delay: 0
                },
                {
                  icon: '🔐',
                  title: 'صلاحيات مدى الحياة',
                  description: 'وصول غير محدود لجميع الموظفين مع إمكانية إضافة أعضاء جدد في أي وقت',
                  color: 'from-purple-500 to-indigo-500',
                  delay: 0.1
                },
                {
                  icon: '📊',
                  title: 'تقارير أداء شاملة',
                  description: 'تحليلات مفصلة لأداء الموظفين والدورات مع تقارير شهرية وربع سنوية',
                  color: 'from-green-500 to-emerald-500',
                  delay: 0.2
                },
                {
                  icon: '👥',
                  title: 'إدارة المجموعات',
                  description: 'أدوات متقدمة لإدارة الموظفين والمجموعات مع تخصيص الصلاحيات والوصول',
                  color: 'from-orange-500 to-red-500',
                  delay: 0.3
                },
                {
                  icon: '🎯',
                  title: 'تدريب مخصص',
                  description: 'برامج تدريبية مصممة خصيصاً لاحتياجات شركتك ومجال عملك',
                  color: 'from-teal-500 to-cyan-500',
                  delay: 0.4
                },
                {
                  icon: '💼',
                  title: 'دعم VIP مخصص',
                  description: 'فريق دعم متخصص متاح على مدار الساعة مع مدير حساب مخصص',
                  color: 'from-indigo-500 to-purple-500',
                  delay: 0.5
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: feature.delay, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-xl scale-110"></div>
                  <div className="relative bg-white border border-slate-200/60 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] overflow-hidden">
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-pulse"></div>

                    <div className="relative z-10 text-center space-y-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-3xl flex items-center justify-center mx-auto shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <span className="text-3xl">{feature.icon}</span>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-slate-800 transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors text-sm">
                          {feature.description}
                        </p>
                      </div>

                      <div className="pt-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-slate-300 to-slate-400 rounded-full mx-auto group-hover:w-16 transition-all duration-300"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Section */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-8 lg:p-12 shadow-2xl mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-4">
                  ابدأ "خطوتك" الأولى نحو الاحتراف اليوم
                </h3>
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  احصل على عرض مخصص لشركتك مع حلول متكاملة لتطوير موظفيك وتحسين أداء مؤسستك
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-800 to-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative flex items-center gap-3">
                      تواصل مع مبيعات الشركات
                      <motion.svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </motion.svg>
                    </span>
                  </Link>
                  <Link
                    href="/subscription"
                    className="group relative inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-slate-900 text-slate-900 font-semibold rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-slate-50 to-slate-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    <span className="relative">ابدأ تجربتك المجانية الآن</span>
                  </Link>
                </div>
              </div>



            </motion.div>
          </div>
        </section>

        {/* 7. قسم التواصل - في النهاية للمهتمين */}
        <section className="relative py-10 sm:py-14 lg:py-18 xl:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactComponent />
          </div>
        </section>

        <ChatAssistantWidget />
        <ProtectionToggle />

        {/* زر العودة للأعلى محسّن */}
        <AnimatePresence>
          {showScrollToTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 border-2 border-white/20 backdrop-blur-sm"
              onClick={scrollToTop}
              aria-label="العودة إلى الأعلى"
            >
              <motion.div
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ChevronUp className="w-6 h-6" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
