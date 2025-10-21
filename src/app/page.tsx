'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import HeroComponent from '../components/HeroComponent';
import { ProgressTracker } from '../components/ui/progress/ProgressTracker';
import FeaturesComponent from '../components/FeaturesComponent';
import HowItWorksSection from '../components/HowItWorksSection';
import CoursesComponent from '../components/CoursesComponent';
import LatestContentSection from '../components/LatestContentSection';
import TestimonialsComponent from '../components/TestimonialsComponent';
import FAQComponent from '../components/FAQComponent';
import ContactComponent from '../components/ContactComponent';
import ChatAssistantWidget from '../components/ChatAssistantWidget';
import StatisticsComponent from '../components/StatisticsComponent';
import CtaSection from '../components/CtaSection';
import ProtectionToggle from '../components/ProtectionToggle';
import SubscriptionCardsComponent from '../components/SubscriptionCardsComponent';

// Placeholder for Learning Paths component (to be implemented separately)
const LearningPathsSection = () => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-gray-900 mb-4">مسارات التعلم</h2>
    <div className="max-w-md mx-auto mb-6">
      <ProgressTracker 
        type="linear"
        value={65}
        showStats
      />
    </div>
    <p className="text-gray-600">قريباً - مسارات تعليمية تفاعلية</p>
  </div>
);

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
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
      {/* Enhanced Scroll Progress Bar with Gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 rounded-b-lg shadow-sm"
        style={{ scaleX: scrollProgress / 100 }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />

      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
        style={{ y: 0 }}
        animate={{ y: [-20, 20, -20] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* محتوى الصفحة */}
      <div className="relative z-10">
        {/* 1. الهيدر الرئيسي المحسن - أكبر عنصر بصري مع تأثيرات متقدمة */}
        <motion.section
          className="relative px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* خلفية متحركة متقدمة */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 70%)",
              backgroundSize: "400% 400%",
            }}
          />

          {/* عناصر عائمة تفاعلية */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/15 rounded-full blur-3xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.4, 0.7, 0.4],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyan-400/10 rounded-full blur-2xl"
            animate={{
              scale: [1, 2, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          <div className="relative max-w-7xl mx-auto">
            {/* عنصر تفاعلي عائم - مؤشر الجودة */}
            <motion.div
              className="absolute top-8 right-8 z-10"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.div
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                animate={{ boxShadow: ["0 0 20px rgba(34, 197, 94, 0.3)", "0 0 40px rgba(34, 197, 94, 0.6)", "0 0 20px rgba(34, 197, 94, 0.3)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  ✓
                </motion.span>
                معتمد دولياً
              </motion.div>
            </motion.div>

            <HeroComponent />

            {/* عناصر تفاعلية إضافية تحت الهيدر */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {[
                { icon: "🎓", text: "محتوى معتمد", color: "from-blue-500 to-blue-600" },
                { icon: "👨‍🏫", text: "خبراء متخصصون", color: "from-purple-500 to-purple-600" },
                { icon: "📈", text: "تطوير مهني", color: "from-green-500 to-green-600" },
                { icon: "🌟", text: "جودة مضمونة", color: "from-orange-500 to-orange-600" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-white/50"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.6 + index * 0.1 }}
                >
                  <motion.div
                    className={`w-8 h-8 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center shadow-md`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-sm">{item.icon}</span>
                  </motion.div>
                  <span className="text-gray-800 font-semibold">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* 3. قسم الشراكات الاستراتيجية المحسن - يعطي مصداقية فورية */}
        <section
          className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/30 overflow-hidden"
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* العنوان الرئيسي */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-blue-200/50 mb-8">
                <span className="text-2xl">🤝</span>
                <span className="text-blue-700 font-semibold">شراكات معتمدة</span>
              </div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                شراكاتنا الاستراتيجية
                <br />
                <span className="text-2xl sm:text-3xl font-medium text-gray-700">مع أفضل المؤسسات التعليمية</span>
              </h2>

              <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                نفخر بالتعاون مع أرقى المؤسسات التعليمية والمهنية في المنطقة العربية،
                مما يضمن أعلى معايير الجودة والاعتمادية في برامجنا التعليمية
              </p>

              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-12"></div>
            </div>

            {/* الشعار الرئيسي للشراكات */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl mb-8">
                <span className="text-6xl">🏛️</span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                شركاء النجاح والتميز
              </h3>

              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                نتعاون مع أكبر المؤسسات لضمان أعلى مستويات الجودة والاعتمادية
              </p>
            </div>

            {/* الشراكات الرئيسية - عرض أكبر وأكثر جدية */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-16">
              {[
                {
                  name: 'جامعة الملك سعود',
                  logo: '🏛️',
                  color: 'from-red-500 to-red-700',
                  description: 'جامعة سعودية رائدة'
                },
                {
                  name: 'معهد المدققين الداخليين',
                  logo: '📊',
                  color: 'from-blue-500 to-blue-700',
                  description: 'معهد مهني معتمد'
                },
                {
                  name: 'غرفة التجارة',
                  logo: '🏢',
                  color: 'from-green-500 to-green-700',
                  description: 'مؤسسة تجارية رائدة'
                },
                {
                  name: 'وزارة التجارة',
                  logo: '⚖️',
                  color: 'from-purple-500 to-purple-700',
                  description: 'جهة حكومية رسمية'
                }
              ].map((partner, index) => (
                <div
                  key={partner.name}
                  className="group cursor-pointer"
                >
                  <div className={`relative bg-gradient-to-br ${partner.color} rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden`}>
                    <div className="relative z-10 text-center">
                      <div className="text-4xl mb-4">
                        {partner.logo}
                      </div>

                      <h4 className="text-white font-bold text-lg mb-2 leading-tight">
                        {partner.name}
                      </h4>

                      <p className="text-white/90 text-sm font-medium">
                        {partner.description}
                      </p>

                      {/* مؤشر الاعتماد */}
                      <div className="mt-4 flex justify-center">
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                          <span className="text-xs text-white font-bold">✓</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* قسم تفاصيل الشراكات */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-gray-200/50 shadow-xl">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">نطاق التعاون الاستراتيجي</h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  نمتلك شراكات شاملة تغطي جميع جوانب التعليم والتطوير المهني
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                {[
                  {
                    icon: "🎓",
                    title: "شراكات المؤسسات التعليمية",
                    description: "تعاون وثيق مع الجامعات والمعاهد المتخصصة لتطوير المناهج التعليمية والبحث العلمي في مجال المحاسبة والمراجعة",
                    color: "from-blue-500 to-blue-600",
                    features: ["تطوير المناهج", "البحث المشترك", "برامج الدراسات العليا"]
                  },
                  {
                    icon: "🏢",
                    title: "شراكات الشركات والمؤسسات",
                    description: "تعاون مع أكبر الشركات والمؤسسات لتوفير فرص تدريب عملي وحقيقي للطلاب مع ضمان التوظيف",
                    color: "from-green-500 to-green-600",
                    features: ["تدريب عملي", "فرص توظيف", "خبرة حقيقية"]
                  },
                  {
                    icon: "🚀",
                    title: "مبادرات التطوير المهني",
                    description: "برامج مشتركة لتطوير المهارات المهنية وتعزيز فرص التوظيف من خلال دورات متخصصة وورش عمل",
                    color: "from-purple-500 to-purple-600",
                    features: ["دورات تخصصية", "ورش عمل", "تطوير مهني"]
                  }
                ].map((partnership, index) => (
                  <div
                    key={partnership.title}
                    className="group relative bg-gradient-to-br from-white to-gray-50/50 rounded-2xl p-8 border border-gray-200/50 hover:border-gray-300/70 transition-all duration-300"
                  >
                    <div className="relative z-10 text-center">
                      <div className={`w-16 h-16 bg-gradient-to-br ${partnership.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                        <span className="text-2xl">{partnership.icon}</span>
                      </div>

                      <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
                        {partnership.title}
                      </h4>

                      <p className="text-gray-600 text-base leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                        {partnership.description}
                      </p>

                      {/* الميزات */}
                      <div className="space-y-2">
                        {partnership.features.map((feature, featureIndex) => (
                          <div
                            key={feature}
                            className="flex items-center gap-2 text-sm text-gray-600 group-hover:text-gray-700"
                          >
                            <span className={`w-2 h-2 bg-gradient-to-r ${partnership.color} rounded-full`}></span>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 flex justify-center">
                        <div className={`w-12 h-1 bg-gradient-to-r ${partnership.color} rounded-full group-hover:w-16 transition-all duration-300`}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* شهادة الاعتماد */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 rounded-2xl border border-blue-200/50 shadow-lg">
                <span className="text-3xl">🏆</span>
                <div className="text-left">
                  <p className="text-gray-800 font-bold text-lg">معتمد ومصدق</p>
                  <p className="text-gray-600">جميع شراكاتنا معتمدة من الجهات الرسمية</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Interactive Demo Section المحسنة */}
        <motion.section
          className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          {/* خلفية متحركة */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 20% 80%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #8b5cf6 0%, transparent 50%)",
              backgroundSize: "100% 100%",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                جرب المنصة التفاعلية
              </motion.h2>
              <motion.p
                className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                استكشف ميزاتنا من خلال جولة تفاعلية سريعة واستمتع بتجربة تعليمية فريدة
              </motion.p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {/* فيديو تعريفي */}
              <motion.div
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 hover:border-blue-200/50"
                whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-blue-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                <motion.div
                  className="relative z-10 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    فيديو تعريفي
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    شاهد كيفية عمل المنصة من خلال فيديو تفاعلي شامل
                  </motion.p>

                  <motion.div
                    className="mt-6 flex justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-12 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full group-hover:w-16 transition-all duration-500"
                      initial={false}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* جولة تفاعلية */}
              <motion.div
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 hover:border-purple-200/50"
                whileHover={{ scale: 1.05, y: -10, rotateY: -5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-purple-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                <motion.div
                  className="relative z-10 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    جولة تفاعلية
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    استكشف الميزات خطوة بخطوة مع دليل تفاعلي شامل
                  </motion.p>

                  <motion.div
                    className="mt-6 flex justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-12 h-1 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full group-hover:w-16 transition-all duration-500"
                      initial={false}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* إحصائيات حية */}
              <motion.div
                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 hover:border-green-200/50"
                whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-green-600/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />

                <motion.div
                  className="relative z-10 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.svg
                      className="w-10 h-10 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </motion.svg>
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    إحصائيات حية
                  </motion.h3>

                  <motion.p
                    className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    رؤية الأرقام والإحصائيات في الوقت الفعلي مع تحديث مستمر
                  </motion.p>

                  <motion.div
                    className="mt-6 flex justify-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className="w-12 h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full group-hover:w-16 transition-all duration-500"
                      initial={false}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* زر استكشاف إضافي */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] overflow-hidden"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  ابدأ الجولة التفاعلية
                  <motion.svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 1.5 }}
                  initial={false}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* 4. الميزات الرئيسية المحسنة - تعريف المنصة وقيمتها */}
        <motion.section
          className="relative py-12 sm:py-16 lg:py-20 xl:py-22 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* خلفية متحركة */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 30% 70%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 30%, #6366f1 0%, transparent 50%)",
              backgroundSize: "120% 120%",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                ميزاتنا المتقدمة
              </motion.h2>
              <motion.p
                className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                منصة تعليمية متطورة تجمع بين التقنية الحديثة والمحتوى التعليمي المتميز لتقديم تجربة تعلم فريدة
              </motion.p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mt-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* الميزات المحسنة */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {[
                {
                  icon: "🎓",
                  title: "محتوى تعليمي متميز",
                  description: "دورات مصممة بعناية من خبراء المجال مع محتوى تفاعلي وشامل",
                  color: "from-blue-500 to-blue-600",
                  bgColor: "from-blue-50 to-blue-100",
                  delay: 0.3
                },
                {
                  icon: "📊",
                  title: "إحصائيات وتتبع الأداء",
                  description: "متابعة تقدمك مع تحليلات مفصلة وتقارير شاملة للأداء",
                  color: "from-green-500 to-green-600",
                  bgColor: "from-green-50 to-green-100",
                  delay: 0.4
                },
                {
                  icon: "🎯",
                  title: "مسارات تعلم مخصصة",
                  description: "خطط تعليمية مخصصة تناسب احتياجاتك وأهدافك المهنية",
                  color: "from-purple-500 to-purple-600",
                  bgColor: "from-purple-50 to-purple-100",
                  delay: 0.5
                },
                {
                  icon: "💬",
                  title: "دعم فني على مدار الساعة",
                  description: "فريق دعم متخصص جاهز لمساعدتك في أي وقت تحتاجه",
                  color: "from-indigo-500 to-indigo-600",
                  bgColor: "from-indigo-50 to-indigo-100",
                  delay: 0.6
                },
                {
                  icon: "📱",
                  title: "تجربة متنقلة متكاملة",
                  description: "تعلم من أي مكان مع تطبيقاتنا المحسنة لجميع الأجهزة",
                  color: "from-pink-500 to-pink-600",
                  bgColor: "from-pink-50 to-pink-100",
                  delay: 0.7
                },
                {
                  icon: "🏆",
                  title: "شهادات معتمدة",
                  description: "شهادات مهنية معترف بها عالمياً لتعزيز فرصك المهنية",
                  color: "from-orange-500 to-orange-600",
                  bgColor: "from-orange-50 to-orange-100",
                  delay: 0.8
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 hover:border-white/70"
                  whileHover={{ scale: 1.05, y: -10, rotateY: index % 2 === 0 ? 5 : -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={false}
                  />

                  <motion.div
                    className="relative z-10 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </motion.div>

                    <motion.h3
                      className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {feature.description}
                    </motion.p>

                    <motion.div
                      className="mt-6 flex justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`w-12 h-1 bg-gradient-to-r ${feature.color.replace('500', '400').replace('600', '500')} rounded-full group-hover:w-16 transition-all duration-500`}
                        initial={false}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* زر استكشاف المزيد */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] overflow-hidden"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  استكشف جميع الميزات
                  <motion.svg
                    className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 1.5 }}
                  initial={false}
                />
              </motion.button>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. إحصائيات المنصة المحسنة - إثبات المصداقية والحجم */}
        <motion.section
          className="relative py-10 sm:py-14 lg:py-18 xl:py-20 bg-gradient-to-br from-white via-gray-50/50 to-blue-50/30 shadow-lg border-y border-gray-200/50 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* خلفية متحركة */}
          <motion.div
            className="absolute inset-0 opacity-3"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 25% 75%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 75% 25%, #a78bfa 0%, transparent 50%)",
              backgroundSize: "150% 150%",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                إحصائياتنا الرقمية
              </motion.h2>
              <motion.p
                className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                أرقام تتحدث عن نفسها - نجاحنا المستمر في تقديم تعليم متميز للآلاف من الطلاب
              </motion.p>
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-gray-600 to-blue-600 mx-auto rounded-full mt-8"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* إحصائيات محسنة */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {[
                {
                  number: 50000,
                  suffix: '+',
                  label: 'طالب مسجل',
                  description: 'من مختلف الدول العربية',
                  icon: '👥',
                  color: 'from-blue-500 to-blue-600',
                  bgColor: 'from-blue-50 to-blue-100',
                  delay: 0.3
                },
                {
                  number: 150,
                  suffix: '+',
                  label: 'دورة تدريبية',
                  description: 'محتوى متميز ومعتمد',
                  icon: '📚',
                  color: 'from-green-500 to-green-600',
                  bgColor: 'from-green-50 to-green-100',
                  delay: 0.4
                },
                {
                  number: 95,
                  suffix: '%',
                  label: 'رضا العملاء',
                  description: 'تقييمات ممتازة من الطلاب',
                  icon: '⭐',
                  color: 'from-purple-500 to-purple-600',
                  bgColor: 'from-purple-50 to-purple-100',
                  delay: 0.5
                },
                {
                  number: 24,
                  suffix: '/7',
                  label: 'دعم فني',
                  description: 'متاح دائماً للمساعدة',
                  icon: '🛠️',
                  color: 'from-orange-500 to-orange-600',
                  bgColor: 'from-orange-50 to-orange-100',
                  delay: 0.6
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer border border-white/50 hover:border-white/70"
                  whileHover={{ scale: 1.05, y: -10, rotateY: index % 2 === 0 ? 3 : -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${stat.bgColor} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    initial={false}
                  />

                  <motion.div
                    className="relative z-10 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-2xl">{stat.icon}</span>
                    </motion.div>

                    <motion.div
                      className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number.toLocaleString('ar-SA')}{stat.suffix}
                    </motion.div>

                    <motion.h3
                      className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {stat.label}
                    </motion.h3>

                    <motion.p
                      className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {stat.description}
                    </motion.p>

                    <motion.div
                      className="mt-6 flex justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`w-12 h-1 bg-gradient-to-r ${stat.color.replace('500', '400').replace('600', '500')} rounded-full group-hover:w-16 transition-all duration-500`}
                        initial={false}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* رسالة إضافية */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-4 rounded-2xl border border-blue-200/50"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">📈</span>
                </motion.div>
                <div className="text-left">
                  <p className="text-gray-800 font-semibold">نمو مستمر</p>
                  <p className="text-gray-600 text-sm">نضيف المزيد من الطلاب والمحتوى يومياً</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* 6. باقات الاشتراك - اختر الباقة المناسبة لك */}
        <SubscriptionCardsComponent />



        {/* 9. زمالة المراجعين الداخليين المحسنة */}
        <motion.section
          className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-slate-900 via-blue-900/90 to-indigo-900/80 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* خلفية متحركة متقدمة */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 30% 70%, #60a5fa 0%, transparent 50%), radial-gradient(circle at 70% 30%, #a78bfa 0%, transparent 50%), radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 70%)",
              backgroundSize: "200% 200%",
            }}
          />

          {/* عناصر عائمة */}
          <motion.div
            className="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/8 rounded-full blur-3xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">🎓</span>
                </motion.div>
                <span className="text-white font-semibold">برنامج زمالة معتمد</span>
              </motion.div>

              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                زمالة المراجعين
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  الداخليين
                </span>
              </motion.h2>

              <motion.p
                className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                برنامج متخصص ومتكامل للحصول على شهادة زمالة معتمدة في المراجعة الداخلية
                مع محتوى تعليمي متطور وتدريب عملي شامل
              </motion.p>

              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto rounded-full mb-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* الميزات الرئيسية */}
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {[
                {
                  icon: "📚",
                  title: "منهج شامل ومتكامل",
                  description: "محتوى تعليمي متطور يغطي جميع جوانب المراجعة الداخلية من الأساسيات إلى المتقدم",
                  color: "from-blue-400 to-blue-600",
                  delay: 0.3
                },
                {
                  icon: "🎯",
                  title: "تدريب عملي متخصص",
                  description: "تطبيق عملي للمفاهيم النظرية مع دراسات حالة حقيقية وتمارين تفاعلية",
                  color: "from-purple-400 to-purple-600",
                  delay: 0.4
                },
                {
                  icon: "🏆",
                  title: "شهادة معتمدة",
                  description: "شهادة زمالة معترف بها عالمياً تفتح أبواب الفرص المهنية في مجال المراجعة",
                  color: "from-green-400 to-green-600",
                  delay: 0.5
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500"
                  whileHover={{ scale: 1.05, y: -10, rotateY: index % 2 === 0 ? 5 : -5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: feature.delay }}
                  viewport={{ once: true }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  <motion.div
                    className="relative z-10 text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span className="text-3xl">{feature.icon}</span>
                    </motion.div>

                    <motion.h3
                      className="text-2xl font-bold text-white mb-4 group-hover:text-blue-200 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      className="text-gray-200 text-base leading-relaxed group-hover:text-white transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                    >
                      {feature.description}
                    </motion.p>

                    <motion.div
                      className="mt-6 flex justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`w-12 h-1 bg-gradient-to-r ${feature.color} rounded-full group-hover:w-16 transition-all duration-500`}
                        initial={false}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* بنك الأسئلة */}
            <motion.div
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-12"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-2xl">🧠</span>
                  </motion.div>
                  <span className="text-white font-bold">بنك أسئلة شامل</span>
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4">أكثر من 2000 سؤال متنوع</h3>
                <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed">
                  بنك أسئلة شامل ومتنوع يغطي جميع المواضيع والمستويات، مع شرح مفصل للإجابات
                  وتحليل الأداء لمساعدتك على التحضير الأمثل للاختبارات والشهادات
                </p>

                <motion.div
                  className="flex flex-wrap justify-center gap-4 mt-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  {[
                    { icon: "📝", text: "أسئلة متعددة الخيارات" },
                    { icon: "✍️", text: "أسئلة مقالية" },
                    { icon: "🎯", text: "اختبارات عملية" },
                    { icon: "📊", text: "تحليل الأداء" }
                  ].map((item, index) => (
                    <motion.div
                      key={item.text}
                      className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-white"
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* زر الانضمام */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Link href="/auditors-fellowship">
                <motion.button
                  className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(59,130,246,0.6)] overflow-hidden"
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-4">
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚀
                    </motion.span>
                    انضم إلى الزمالة الآن
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                    transition={{ duration: 1.5 }}
                    initial={false}
                  />
                </motion.button>
              </Link>

              <motion.p
                className="text-gray-300 mt-6 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                viewport={{ once: true }}
              >
                ابدأ رحلتك نحو التميز المهني في مجال المراجعة الداخلية
              </motion.p>
            </motion.div>
          </div>
        </motion.section>

        {/* 10. دعوة للعمل المحسنة - قبل الأسئلة الشائعة */}
        <motion.section
          className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* خلفية متحركة متقدمة */}
          <motion.div
            className="absolute inset-0 opacity-20"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 50,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 30% 70%, #ffffff 0%, transparent 50%), radial-gradient(circle at 70% 30%, #ffffff 0%, transparent 50%), radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 70%)",
              backgroundSize: "300% 300%",
            }}
          />

          {/* عناصر عائمة */}
          <motion.div
            className="absolute top-20 left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-32 h-32 bg-white/15 rounded-full blur-3xl"
            animate={{
              scale: [1.5, 1, 1.5],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                ابدأ رحلتك التعليمية
                <br />
                <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                  اليوم
                </span>
              </motion.h2>

              <motion.p
                className="text-xl sm:text-2xl text-gray-200 max-w-4xl mx-auto leading-relaxed mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                انضم إلى آلاف المتعلمين وطور مهاراتك في المراجعة الداخلية والمحاسبة
                مع منصة خطى التعليمية المتطورة
              </motion.p>

              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-400 mx-auto rounded-full mb-16"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* الإحصائيات البارزة */}
            <motion.div
              className="grid md:grid-cols-4 gap-8 lg:gap-12 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              {[
                {
                  number: "50,000+",
                  label: "طالب نشط",
                  icon: "👥",
                  color: "from-blue-400 to-blue-500",
                  delay: 1.1
                },
                {
                  number: "150+",
                  label: "دورة تعليمية",
                  icon: "📚",
                  color: "from-green-400 to-green-500",
                  delay: 1.2
                },
                {
                  number: "24/7",
                  label: "دعم فني",
                  icon: "🛠️",
                  color: "from-purple-400 to-purple-500",
                  delay: 1.3
                },
                {
                  number: "95%",
                  label: "رضا العملاء",
                  icon: "⭐",
                  color: "from-pink-400 to-pink-500",
                  delay: 1.4
                }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: stat.delay }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-xl group-hover:shadow-2xl transition-all duration-500`}
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-3xl">{stat.icon}</span>
                  </motion.div>

                  <motion.div
                    className="text-4xl sm:text-5xl font-bold text-white mb-3 group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                  </motion.div>

                  <motion.h3
                    className="text-xl font-semibold text-gray-200 group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    {stat.label}
                  </motion.h3>
                </motion.div>
              ))}
            </motion.div>

            {/* الأزرار الرئيسية */}
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              viewport={{ once: true }}
            >
              <motion.button
                className="group relative bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 hover:from-yellow-500 hover:via-orange-500 hover:to-red-500 text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] overflow-hidden"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-4">
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    🚀
                  </motion.span>
                  سجل الآن مجاناً
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 1.5 }}
                  initial={false}
                />
              </motion.button>

              <motion.button
                className="group relative bg-white/10 backdrop-blur-md border-2 border-white/30 hover:border-white/60 text-white px-12 py-6 rounded-2xl font-bold text-2xl transition-all duration-500 hover:bg-white/20"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-4">
                  <motion.span
                    animate={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    📚
                  </motion.span>
                  تصفح الدورات
                  <motion.span
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.button>
            </motion.div>

            {/* العرض الخاص */}
            <motion.div
              className="bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/30"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 rounded-full mb-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <span className="text-2xl">⚡</span>
                  </motion.div>
                  <span className="text-white font-bold">عرض خاص محدود الوقت</span>
                </motion.div>

                <h3 className="text-3xl font-bold text-white mb-4">لا تفوت الفرصة!</h3>
                <p className="text-gray-200 text-lg max-w-3xl mx-auto leading-relaxed mb-8">
                  انضم إلينا اليوم واحصل على إمكانية الوصول الكامل لمدة 30 يوم مجاناً
                  مع جميع الدورات والمحتويات التعليمية المتطورة
                </p>

                <motion.div
                  className="inline-flex items-center gap-4 bg-gradient-to-r from-white/20 to-white/10 px-8 py-4 rounded-2xl border border-white/30"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-3xl">🎁</span>
                  </motion.div>
                  <div className="text-left">
                    <p className="text-white font-bold">فترة تجريبية مجانية</p>
                    <p className="text-gray-300 text-sm">30 يوم كامل بدون التزام</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* 11. الأسئلة الشائعة - محسن وعصري */}
        <motion.section
          className="relative py-16 sm:py-20 lg:py-24 xl:py-28 bg-gradient-to-br from-indigo-50 via-purple-50/30 to-pink-50/50 overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* خلفية متحركة */}
          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: "radial-gradient(circle at 40% 60%, #a855f7 0%, transparent 50%), radial-gradient(circle at 60% 40%, #ec4899 0%, transparent 50%)",
              backgroundSize: "150% 150%",
            }}
          />

          {/* عناصر عائمة */}
          <motion.div
            className="absolute top-16 right-16 w-24 h-24 bg-purple-300/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-16 left-16 w-32 h-32 bg-pink-300/15 rounded-full blur-2xl"
            animate={{
              scale: [1.4, 1, 1.4],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200/50 mb-8"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">❓</span>
                </motion.div>
                <span className="text-purple-700 font-semibold">الأسئلة الشائعة</span>
              </motion.div>

              <motion.h2
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                كل ما تريد معرفته
              </motion.h2>

              <motion.p
                className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                إجابات واضحة ومباشرة على أكثر الأسئلة شيوعاً حول منصة خطى وخدماتنا التعليمية
              </motion.p>

              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-12"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              />
            </motion.div>

            {/* الأسئلة التفاعلية */}
            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "ما هي منصة خطى؟",
                  answer: "منصة خطى هي منصة تعليمية متخصصة في المجال المحاسبي والمالي، تقدم دورات معتمدة وبرامج تدريبية متطورة مع نخبة من أفضل الخبراء والمختصين في المنطقة العربية.",
                  icon: "🎓",
                  color: "from-purple-500 to-purple-600",
                  delay: 0.3
                },
                {
                  question: "هل الشهادات معتمدة؟",
                  answer: "نعم، جميع شهاداتنا معتمدة من جهات دولية مرموقة مثل معهد المدققين الداخليين (IIA) وغيرها من المؤسسات المعترف بها عالمياً، مما يضمن قيمة مهنية عالية لخريجينا.",
                  icon: "🏆",
                  color: "from-pink-500 to-pink-600",
                  delay: 0.4
                },
                {
                  question: "ما هي طرق الدفع المتاحة؟",
                  answer: "نوفر طرق دفع متنوعة وآمنة تشمل البطاقات الائتمانية، التحويل البنكي، والمحافظ الإلكترونية. كما نقدم خيارات تقسيط مريحة للدورات طويلة المدى.",
                  icon: "💳",
                  color: "from-indigo-500 to-indigo-600",
                  delay: 0.5
                },
                {
                  question: "هل يمكنني الوصول للدورات من أي جهاز؟",
                  answer: "بالتأكيد! منصتنا متجاوبة بالكامل وتعمل بسلاسة على جميع الأجهزة - الحواسيب، الهواتف الذكية، والأجهزة اللوحية - مع تجربة مستخدم محسنة على كل منصة.",
                  icon: "📱",
                  color: "from-blue-500 to-blue-600",
                  delay: 0.6
                },
                {
                  question: "ما هي مدة صلاحية الدورات؟",
                  answer: "جميع دوراتنا تمنح صلاحية مدى الحياة للوصول إلى المحتوى، مع إمكانية تحديث المحتوى مجاناً عند توفر تحديثات جديدة أو تغييرات في المعايير المهنية.",
                  icon: "⏰",
                  color: "from-green-500 to-green-600",
                  delay: 0.7
                },
                {
                  question: "هل توجد دعم فني؟",
                  answer: "نعم، فريق الدعم الفني متاح 24/7 للمساعدة في أي استفسار أو مشكلة تقنية. كما نوفر مجموعات دراسية تفاعلية ومنتديات للتواصل مع المتعلمين الآخرين.",
                  icon: "🛠️",
                  color: "from-orange-500 to-orange-600",
                  delay: 0.8
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  className="group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-white/50 hover:border-white/70 transition-all duration-500 overflow-hidden"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: faq.delay }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                  />

                  <motion.div
                    className="relative p-8"
                    whileHover={{ scale: 1.01 }}
                  >
                    {/* رأس السؤال */}
                    <motion.div
                      className="flex items-center gap-4 mb-6 cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                    >
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${faq.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}
                        whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <span className="text-xl">{faq.icon}</span>
                      </motion.div>

                      <motion.h3
                        className="text-xl font-bold text-gray-900 group-hover:text-gray-800 transition-colors duration-300 flex-1"
                        whileHover={{ scale: 1.02 }}
                      >
                        {faq.question}
                      </motion.h3>

                      <motion.div
                        className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300"
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{ rotate: 0 }}
                          whileHover={{ rotate: 180 }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </motion.svg>
                      </motion.div>
                    </motion.div>

                    {/* الإجابة */}
                    <motion.div
                      className="pl-16"
                      initial={{ opacity: 0, height: 0 }}
                      whileInView={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.4, delay: faq.delay + 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.p
                        className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                        whileHover={{ scale: 1.01 }}
                      >
                        {faq.answer}
                      </motion.p>
                    </motion.div>

                    {/* خط زخرفي */}
                    <motion.div
                      className="mt-6 flex justify-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className={`w-16 h-1 bg-gradient-to-r ${faq.color} rounded-full group-hover:w-24 transition-all duration-500`}
                        initial={false}
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* رسالة إضافية */}
            <motion.div
              className="text-center mt-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-flex items-center gap-4 bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-4 rounded-2xl border border-purple-200/50"
                whileHover={{ scale: 1.02 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <span className="text-2xl">💬</span>
                </motion.div>
                <div className="text-left">
                  <p className="text-gray-800 font-semibold">لم تجد إجابة سؤالك؟</p>
                  <p className="text-gray-600 text-sm">تواصل معنا مباشرة وسنكون سعيدين بمساعدتك</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* 12. قسم الاتصال */}
        <motion.section
          className="relative py-10 sm:py-14 lg:py-18 xl:py-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ContactComponent />
          </div>
        </motion.section>

        {/* 13. شات المساعدة */}
        <ChatAssistantWidget />

        {/* 14. مفتاح تعطيل الحماية المؤقت */}
        <ProtectionToggle />

        {/* شريط التقدم العلوي المحسن */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
          style={{ scaleX: scrollProgress / 100 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress / 100 }}
          transition={{ duration: 0.1 }}
        />

        {/* زر العودة للأعلى المحسن */}
        <AnimatePresence>
          {showScrollToTop && (
            <motion.button
              className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 focus:ring-4 focus:ring-blue-500/50 group"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              onClick={scrollToTop}
              aria-label="العودة إلى الأعلى"
            >
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronUp className="w-6 h-6" />
              </motion.div>
              <motion.div
                className="absolute inset-0 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={false}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
