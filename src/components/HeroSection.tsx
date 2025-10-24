'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, memo, useCallback } from 'react';
import Link from 'next/link';
import Icon from './ui/icons/IconSystem';
import { useNotifications } from './NotificationProvider';
import { usePerformanceOptimization } from './MemoizedComponents';
import { heroFeatures, heroStats } from './hero-section-data';

/**
 * Enhanced hero section with improved layout, spacing, visual polish, and accessibility.
 * Features animated statistics, feature highlights, and call-to-action buttons.
 * Includes performance monitoring and notification integration.
 */
const HeroSection = memo(() => {
  const { addNotification } = useNotifications();
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Performance monitoring
  usePerformanceOptimization();
  // Track scroll progress for parallax effects on hero section
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.96]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  /**
   * Displays welcome notification when user clicks the get started button
   */
  const handleGetStarted = useCallback(() => {
    addNotification({
      type: 'success',
      title: 'مرحباً بك في منصة خطى!',
      message: 'ابدأ رحلتك التعليمية الآن واكتشف عالم المعرفة',
    });
  }, [addNotification]);

  return (
    <motion.div
      ref={heroRef}
      style={{ y, opacity, scale }}
      aria-labelledby="hero-title"
      className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-clip bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20"
    >
      {/* Decorative grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_23%,rgba(120,119,198,0.085)_25%,rgba(120,119,198,0.09)_50%,transparent_52%,transparent_74%,rgba(120,119,198,0.08)_75%)] bg-[length:64px_64px]"></div>
        </div>
        {/* Subtle vignette effect */}
        <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-gradient-to-tr from-purple-100/50 via-transparent to-blue-100/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-24 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-12 gap-y-16 gap-x-8 lg:gap-x-14 xl:gap-x-20 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6 text-center lg:text-right flex flex-col space-y-10 animate-fadeIn">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-blue-100/90 to-purple-100/80 backdrop-blur-md rounded-full text-blue-800 text-base font-semibold shadow-md border border-blue-200/30 focus:outline-blue-700 focus:ring-2 ring-offset-2 ring-blue-400 transition-all outline-none"
              tabIndex={0}
              aria-label="منصة التعلم المهني الرائدة"
            >
              <span className="text-xl" aria-hidden="true">🎓</span>
              <span>منصة التعلم المهني الرائدة</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
              <h1
                id="hero-title"
                className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900 drop-shadow-md tracking-tight"
              >
                <span className="block mb-1.5">طور مهاراتك في</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  المراجعة الداخلية والمحاسبة
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal drop-shadow-sm mb-2">
              انضم إلى آلاف المتعلمين واحصل على تدريب عالي الجودة من خبراء المجال. مسارات تعليمية متكاملة، شهادات معتمدة، ومجتمع نشط يدعم رحلتك المهنية مع تقنيات الذكاء الاصطناعي المتقدمة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-3" role="group" aria-label="دعوات اتخاذ إجراء">
              <motion.div
                whileHover={{ scale: 1.04, y: -1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/courses" legacyBehavior>
                  <motion.button
                    type="button"
                    onClick={handleGetStarted}
                    className="group relative focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 focus:outline-none overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-purple-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-blue-200/40 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 min-h-14 outline-none"
                    aria-label="ابدأ رحلتك التعليمية"
                    whileHover={{
                      scale: 1.035,
                      y: -1.5,
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                    />
                    <Icon name="learning" size="md" className="relative z-10" />
                    <span className="relative z-10">ابدأ رحلتك التعليمية</span>
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.04, y: -1.5 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link href="/register" legacyBehavior>
                  <motion.button
                    type="button"
                    className="group border-blue-700 border-2 bg-white/95 font-bold px-8 sm:px-10 py-4 sm:py-5 rounded-2xl text-lg sm:text-xl flex items-center gap-3 min-h-14 shadow-lg hover:shadow-xl text-blue-700 hover:text-white hover:bg-blue-600 hover:border-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors duration-250 backdrop-blur-sm outline-none"
                    aria-label="إنشاء حساب مجاني"
                  >
                    <Icon name="user" size="md" />
                    إنشاء حساب مجاني
                  </motion.button>
                </Link>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 gap-y-4 sm:gap-x-6 sm:gap-y-6 pt-8 max-w-2xl mx-auto lg:mx-0">
              {heroStats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center flex flex-col items-center p-4 sm:p-6 bg-white/75 backdrop-blur-xl rounded-2xl border border-white/60 shadow group transition-all hover:-translate-y-1 hover:shadow-blue-200/60 focus-within:shadow-blue-200/80 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 duration-300"
                  tabIndex={0}
                  aria-label={`${stat.label} ${stat.number}`}
                >
                  <div className="text-2xl sm:text-3xl mb-1.5 flex items-center justify-center" aria-hidden="true">
                    <stat.icon />
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-700 font-semibold mb-0.5">{stat.label}</div>
                  <div className="text-xs sm:text-sm text-green-600 font-bold">{stat.trend}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Features */}
          <div className="lg:col-span-6 relative flex flex-col space-y-8 animate-fadeIn">
            <div className="space-y-5 sm:space-y-8 max-w-xl mx-auto lg:max-w-full">
              {heroFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group relative flex items-start gap-4 sm:gap-7 px-5 py-6 sm:px-8 sm:py-8 bg-white/90 backdrop-blur-md rounded-3xl border-2 border-white/60 shadow-lg hover:shadow-2xl hover:border-blue-400 transition-all duration-400 overflow-hidden hover:-translate-y-1 focus-within:shadow-blue-200/80 outline-none"
                  tabIndex={0}
                  aria-labelledby={`feature-title-${index}`}
                >
                  <div
                    className={`flex-shrink-0 flex h-16 w-16 items-center justify-center p-3 bg-gradient-to-br ${feature.color} rounded-2xl shadow-md transition-all duration-300`}
                    aria-hidden="true"
                  >
                    <Icon name={feature.icon} size="md" color="white" />
                  </div>
                  <div className="flex-1 relative z-10 space-y-1.5">
                    <h3
                      id={`feature-title-${index}`}
                      className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300"
                    >
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 self-center ml-2"
                  >
                    <Icon name="arrowRight" size="sm" color="blue" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;
