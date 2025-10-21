'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef, memo, useCallback, useMemo } from 'react';
import Link from 'next/link';
import Icon from './ui/icons/IconSystem';
import { useNotifications } from './NotificationProvider';
import { usePerformanceOptimization } from './MemoizedComponents';
import { heroFeatures, heroStats } from './hero-section-data';

/**
 * Enhanced hero section with parallax effects, interactive background animations, and mouse-tracking.
 * Features animated statistics, feature highlights, and call-to-action buttons.
 * Includes performance monitoring and notification integration.
 */
const HeroSection = memo(() => {
  const { addNotification } = useNotifications();
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const x = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);

  /**
   * Tracks mouse position relative to hero section center for parallax effects on background elements
   */
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePosition({
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2),
      });
    }
  }, []);

  useEffect(() => {
    setIsVisible(true);
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    x.set(mousePosition.x * 20);
    rotateX.set(mousePosition.y * 10);
  }, [mousePosition, x, rotateX]);

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Interactive background shapes with mouse-tracking parallax */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl"
          style={{ x, rotateX }}
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-full blur-lg"
        />

        {/* Enhanced Grid Pattern with Animation */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.1)_25%,rgba(120,119,198,0.1)_50%,transparent_50%,transparent_75%,rgba(120,119,198,0.1)_75%)] bg-[length:60px_60px]"></div>
        </motion.div>

        {/* Animated floating particles for visual depth */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Enhanced Left Content */}
          <motion.div
            className="lg:col-span-6 text-center lg:text-right space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-100/80 to-purple-100/80 backdrop-blur-sm rounded-full text-blue-700 text-sm font-bold shadow-lg border border-white/20"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
              }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <span className="text-lg">🎓</span>
              منصة التعلم المهني الرائدة
            </motion.div>

            {/* Main Heading */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-lg">
                <motion.span
                  className="block text-gray-900 mb-2"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    background:
                      'linear-gradient(90deg, #1f2937, #3b82f6, #1f2937)',
                    backgroundSize: '200% 100%',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  طور مهاراتك في
                </motion.span>
                <motion.span
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent block"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                >
                  المراجعة الداخلية والمحاسبة
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              انضم إلى آلاف المتعلمين واحصل على تدريب عالي الجودة من خبراء
              المجال. مسارات تعليمية متكاملة، شهادات معتمدة، ومجتمع نشط يدعم
              رحلتك المهنية مع تقنيات الذكاء الاصطناعي المتقدمة.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/courses">
                  <motion.button
                    onClick={handleGetStarted}
                    className="group relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 min-h-14"
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <Icon name="learning" size="md" className="relative z-10" />
                    <span className="relative z-10">ابدأ رحلتك التعليمية</span>
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register">
                  <motion.button className="group bg-white/95 backdrop-blur-sm hover:bg-white border-2 border-blue-600 text-blue-600 hover:text-white hover:bg-blue-600 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all duration-300 flex items-center gap-3 min-h-14 shadow-lg hover:shadow-xl">
                    <Icon name="user" size="md" />
                    إنشاء حساب مجاني
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {heroStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center p-4 sm:p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 hover:border-white/60 transition-all duration-300 hover:shadow-lg group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    scale: isVisible ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                >
                  <motion.div
                    className="text-2xl sm:text-3xl mb-2"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium mb-1">
                    {stat.label}
                  </div>
                  <motion.div
                    className="text-xs sm:text-sm text-green-600 font-bold"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{
                      opacity: isVisible ? 1 : 0,
                      y: isVisible ? 0 : 10,
                    }}
                    transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                  >
                    {stat.trend}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Right Content - Features */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="space-y-6 sm:space-y-8">
              {heroFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="group relative flex items-start gap-4 sm:gap-6 p-6 sm:p-8 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-white/40 hover:border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden"
                  initial={{ opacity: 0, x: 30, scale: 0.9 }}
                  animate={{
                    opacity: isVisible ? 1 : 0,
                    x: isVisible ? 0 : 30,
                    scale: isVisible ? 1 : 0.9,
                  }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + feature.delay,
                    type: 'spring',
                    stiffness: 100,
                  }}
                  whileHover={{
                    scale: 1.02,
                    x: 8,
                    y: -5,
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Animated Background Gradient */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />

                  <motion.div
                    className={`flex-shrink-0 p-4 bg-gradient-to-br ${feature.color} rounded-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon name={feature.icon} size="md" color="white" />
                  </motion.div>

                  <div className="flex-1 relative z-10 space-y-2">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + feature.delay }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p
                      className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isVisible ? 1 : 0 }}
                      transition={{ duration: 0.6, delay: 0.8 + feature.delay }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>

                  {/* Hover Arrow */}
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 self-center"
                    initial={{ x: 10 }}
                    whileHover={{ x: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Icon name="arrowRight" size="sm" color="blue" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Floating Elements */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [0, 5, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-2xl opacity-80 backdrop-blur-sm"
            />
            <motion.div
              animate={{
                y: [10, -10, 10],
                rotate: [0, -5, 0],
                scale: [1, 0.9, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl shadow-xl opacity-60 backdrop-blur-sm"
            />

            {/* Additional Floating Elements */}
            <motion.div
              animate={{
                x: [-5, 5, -5],
                y: [-5, 5, -5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/4 -left-4 w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full shadow-lg opacity-70"
            />
            <motion.div
              animate={{
                x: [5, -5, 5],
                y: [5, -5, 5],
                rotate: [360, 180, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute bottom-1/4 -right-4 w-6 h-6 bg-gradient-to-br from-orange-500 to-red-500 rounded-full shadow-lg opacity-60"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;