'use client';
import Link from 'next/link';
import { useMemo, useState, useEffect, useRef } from 'react';
import { useLazyLoad } from '@/hooks/performance';

/**
 * Animated counter component that counts up from 0 to target value when scrolled into view.
 */
const AnimatedCounter = ({
  target,
  duration = 2000,
  suffix = '',
}: {
  target: number;
  duration?: number;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  // Custom in-view effect without framer-motion
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Use IntersectionObserver for simple in-view detection
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-100px', threshold: 0.05 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };
    requestAnimationFrame(animate);
  }, [target, duration, isInView]);

  // Replace motion.div with a normal div, use css transitions if needed
  return (
    <div
      ref={ref}
      style={{
        transition: 'opacity 0.65s cubic-bezier(.4,0,.2,1), transform 0.65s cubic-bezier(.4,0,.2,1)',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'scale(1)' : 'scale(0.85)',
      }}
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-xl"
      aria-live="polite"
    >
      {count.toLocaleString('ar-SA')}
      {suffix}
    </div>
  );
};

/**
 * Typewriter effect component that cycles through an array of texts with typing and deleting animations.
 */
const TypewriterText = ({
  texts,
  speed = 100,
}: {
  texts: string[];
  speed?: number;
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setCurrentText(text.substring(0, currentText.length + 1));
        if (currentText === text) setTimeout(() => setIsDeleting(true), 1700);
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

  // Replace motion.span with span, just keep | blinking with CSS animation
  return (
    <span className="inline-block min-w-[190px] md:min-w-[230px] text-left font-semibold">
      <span className="sr-only">يكتب النص: </span>
      {currentText}
      <span
        aria-hidden="true"
        className="text-sky-400 font-extrabold inline-block w-2 animate-blink"
      >
        |
      </span>
    </span>
  );
};

/**
 * Hero section with enhanced polish, modern visual touches, improved spacing, accessibility, and responsive layout.
 */
const HeroComponent = () => {
  const { elementRef, isIntersecting } = useLazyLoad({ threshold: 0.2 });

  const stats = useMemo(
    () => [
      { number: 150, suffix: '+', label: 'دورة تعليمية' },
      { number: 50000, suffix: '+', label: 'طالب نشط' },
      { number: 95, suffix: '%', label: 'معدل النجاح' },
      { number: 24, suffix: '/7', label: 'دعم فني' },
    ],
    []
  );

  const typewriterTexts = [
    'المحاسبة والمراجعة',
    'التدريب المهني',
    'الاستشارات المالية',
    'التطوير المهني',
  ];

  return (
    <section
      ref={elementRef as React.RefObject<HTMLElement>}
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900/95 via-slate-900/95 to-slate-950/95 rounded-b-[2.3rem] shadow-2xl"
      style={{
        backgroundImage: isIntersecting
          ? 'linear-gradient(135deg, rgba(18, 27, 53, 0.96),rgba(20, 22, 30, 0.93)), url(/banar-cours.webp)'
          : 'linear-gradient(135deg, rgba(18, 27, 53, 0.96),rgba(20, 22, 30, 0.93))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
      aria-labelledby="hero-heading"
    >
      {/* Floating background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {/* مجرد دوائر ثابتة بدون motion/floating */}
        <div
          className="absolute top-28 right-24 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
          style={{}}
        />
        <div
          className="absolute bottom-40 left-20 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl"
          style={{}}
        />
        <div
          className="absolute top-2/3 left-1/4 w-24 h-24 bg-indigo-400/20 rounded-full blur-lg"
          style={{}}
        />
        {/* subtle light glow */}
        <div
          className="absolute inset-0 m-auto w-[85vw] h-[55vh] rounded-full bg-gradient-radial from-sky-400/10 via-indigo-400/10 to-white/0 blur-3xl z-0"
        />
      </div>
      {/* HERO CONTENT */}
      <div
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-16 md:py-20 text-center space-y-7 sm:space-y-10 bg-black/40 rounded-3xl shadow-xl border border-white/10 animate-fadeIn ring-1 ring-slate-200/10 ring-inset"
        tabIndex={-1}
      >
        {/* Badge */}
        <div
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-sky-400/10 to-indigo-400/10 text-white px-5 py-2.5 sm:py-3 rounded-full text-sm font-semibold shadow-sm border border-white/20 mx-auto w-fit"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true"></span>
          <span>مرحباً بك في أفضل منصة تعليمية في المحاسبة</span>
        </div>
        {/* Headline */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-2xl"
        >
          <span className="block mb-2 sm:mb-3 text-white drop-shadow-none">خطى للتدريب والاستشارات</span>
          <span className="block text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-sky-200 mt-1 sm:mt-2 min-h-[2.5em]">
            تعليم احترافي في&nbsp;
            <span className="inline-block align-middle">
              <TypewriterText texts={typewriterTexts} speed={140} />
            </span>
          </span>
        </h1>
        {/* Description */}
        <p
          className="text-base sm:text-xl md:text-2xl text-white/80 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed font-light animate-fadeIn px-2 sm:px-0 drop-shadow"
        >
          اكتشف عالم المحاسبة والمراجعة الداخلية مع أفضل الخبراء والمحتوى التعليمي المتطور
        </p>
        {/* CTA BUTTONS */}
        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center pt-1 sm:pt-3 animate-fadeIn px-3 sm:px-0"
        >
          <Link
            href="/courses"
            className="group relative inline-flex items-center bg-gradient-to-r from-sky-600 to-indigo-700 hover:from-sky-700 hover:to-indigo-800 focus:outline-none text-white px-7 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-sky-400/25 focus:ring-4 focus:ring-sky-500/40 w-full sm:w-auto max-w-xs sm:max-w-none border border-sky-500/30"
            aria-label="ابدأ رحلتك التعليمية الآن - انتقل إلى صفحة الدورات"
          >
            {/* حذف motion.div */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-300 rounded-2xl group-hover:translate-x-0 -translate-x-full"
            />
            <span className="relative z-10 flex items-center gap-3 whitespace-nowrap">
              ابدأ رحلتك التعليمية الآن
              {/* حذف motion.svg، arrow remains static */}
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>
          <Link
            href="/contact"
            className="group relative inline-flex items-center bg-white/10 hover:bg-white/20 focus:outline-none text-white border-2 border-white/30 hover:border-white/60 backdrop-blur-lg px-7 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-base sm:text-lg shadow-md transition-all duration-300 ease-in-out focus:ring-4 focus:ring-white/30 w-full sm:w-auto max-w-xs sm:max-w-none"
            aria-label="تواصل معنا - انتقل إلى صفحة التواصل"
          >
            <span className="relative z-10">تواصل معنا</span>
          </Link>
        </div>
        {/* Stats with minimal animation (fade in grid only on load) */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-8 sm:gap-x-10 pt-9 sm:pt-12 animate-fadeIn"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              tabIndex={0}
              aria-label={`${stat.number}${stat.suffix} ${stat.label}`}
              role="region"
              className="flex flex-col items-center group focus-within:ring-2 focus-within:ring-sky-400/70 rounded-2xl transition-shadow hover:shadow-xl hover:shadow-sky-400/10 bg-white/5 px-3 py-5 sm:px-0"
            >
              <div className="relative flex items-center justify-center">
                <AnimatedCounter
                  target={stat.number}
                  duration={2100 + index * 180}
                  suffix={stat.suffix}
                />
                {/* حذف motion.div للدوائر، يمكن إبقاؤها ثابتة أو حذفها إذا لم تكن ضرورية */}
                <div
                  className="absolute top-2 right-1 w-4 h-4 bg-blue-400/70 rounded-full opacity-0 group-hover:opacity-80 transition-all duration-300 scale-75"
                  aria-hidden="true"
                />
              </div>
              <div className="text-sm sm:text-base text-gray-200 font-semibold mt-2 group-hover:text-sky-400 focus:text-sky-400 transition-colors duration-300 select-none">
                {stat.label}
              </div>
              {/* حذف motion.div للخط */}
              <div
                className="mt-3 h-1 w-4 bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 rounded-full opacity-50 group-hover:w-12 group-focus:w-12 group-hover:opacity-90 transition-all duration-500"
                style={{ width: 16 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Cue */}
      <div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/80 z-20"
        aria-hidden="true"
      >
        {/* حذف motion.div: سهم النزول يظهر دائم دون حركة */}
        <div>
          <svg
            className="w-7 h-7 drop-shadow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>تابع للأسفل</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
        <span className="sr-only">تابع للأسفل</span>
      </div>
    </section>
  );
};

export default HeroComponent;
