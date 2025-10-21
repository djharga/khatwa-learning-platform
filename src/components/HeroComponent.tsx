'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useMemo, useState, useEffect, useRef } from 'react';

/**
 * Animated counter component that counts up from 0 to target value when scrolled into view. Uses requestAnimationFrame for smooth animation.
 * @param {number} target - The target number to count up to
 * @param {number} [duration=2000] - Animation duration in milliseconds
 * @param {string} [suffix=''] - Optional suffix like '+' or '%'
 */
const AnimatedCounter = ({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration, isInView]);

  return (
    <div ref={ref} className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
      {count.toLocaleString('ar-SA')}{suffix}
    </div>
  );
};

/**
 * Typewriter effect component that cycles through an array of texts with typing and deleting animations.
 * @param {string[]} texts - Array of strings to cycle through
 * @param {number} [speed=100] - Typing speed in milliseconds per character
 */
const TypewriterText = ({ texts, speed = 100 }: { texts: string[]; speed?: number }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText === text) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setCurrentText(text.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, speed]);

  return (
    <span className="inline-block min-w-[200px] text-left">
      {currentText}
      <span className="animate-pulse text-blue-400">|</span>
    </span>
  );
};

/**
 * Hero section component with animated statistics, typewriter effect, and call-to-action buttons. Features gradient background with image overlay, animated counters, and responsive design.
 */
const HeroComponent = () => {
  // Platform statistics displayed with animated counters
  const stats = useMemo(
    () => [
      { number: 150, suffix: '+', label: 'دورة تعليمية' },
      { number: 50000, suffix: '+', label: 'طالب نشط' },
      { number: 95, suffix: '%', label: 'معدل النجاح' },
      { number: 24, suffix: '/7', label: 'دعم فني' },
    ],
    []
  );

  // Rotating text for typewriter effect showcasing platform focus areas
  const typewriterTexts = [
    'المحاسبة والمراجعة',
    'التدريب المهني',
    'الاستشارات المالية',
    'التطوير المهني'
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 rounded-b-3xl shadow-xl"
      style={{
        backgroundImage:
          'linear-gradient(135deg, rgba(15, 23, 42, 0.92), rgba(30, 41, 59, 0.9)), url(/banar-cours.png)',
      }}
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-14 sm:py-18 text-center space-y-8 sm:space-y-10 bg-black/30 rounded-3xl shadow-lg border border-white/10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          مرحباً بك في أفضل منصة تعليمية في المحاسبة
        </motion.div>

        {/* العنوان الرئيسي */}
        <motion.h1
          id="hero-heading"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <span className="block mb-2">خطى للتدريب والاستشارات</span>
          <span className="block text-3xl sm:text-4xl lg:text-5xl font-medium text-blue-200 mt-2">
            تعليم احترافي في{' '}
            <TypewriterText texts={typewriterTexts} speed={150} />
          </span>
        </motion.h1>

        {/* الوصف */}
        <motion.p
          className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          اكتشف عالم المحاسبة والمراجعة الداخلية مع أفضل الخبراء والمحتوى
          التعليمي المتطور
        </motion.p>

        {/* أزرار العمل */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link href="/courses" className="group bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-lg transition-all duration-300 ease-out hover:shadow-lg focus:ring-4 focus:ring-blue-500/50 no-underline">
            <motion.button
              className="bg-transparent border-none text-white font-semibold text-lg cursor-pointer w-full h-full"
              whileTap={{ scale: 0.97 }}
            >
              <span className="flex items-center gap-3">
                ابدأ رحلتك التعليمية الآن
                <svg
                  className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </motion.button>
          </Link>

          <Link href="/contact" className="group bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border-2 border-white/30 px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-semibold text-lg transition-all duration-300 ease-out hover:shadow-lg focus:ring-4 focus:ring-white/30 no-underline">
            <motion.button
              className="bg-transparent border-none text-white font-semibold text-lg cursor-pointer w-full h-full"
              whileTap={{ scale: 0.97 }}
            >
              تواصل معنا
            </motion.button>
          </Link>
        </motion.div>

        {/* إحصائيات سريعة متحركة */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-8 sm:pt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center space-y-2 group cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.7 + index * 0.08 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="relative"
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              >
                <AnimatedCounter
                  target={stat.number}
                  duration={2000 + index * 200}
                  suffix={stat.suffix}
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
              <div className="text-sm sm:text-base text-gray-300 font-medium group-hover:text-blue-300 transition-colors duration-300">
                {stat.label}
              </div>
              <motion.div
                className="w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-500 mx-auto mt-2"
                initial={false}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* تأثير التمرير */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroComponent;
