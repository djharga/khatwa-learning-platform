'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Clock, ChevronRight, BookOpen, ChevronLeft, Play } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { GlassCard, Button } from '@/components/ui';
import { ScrollAnimation } from '@/components/ui';
import { getAllCourses, type Course } from '@/data/courses/all-courses';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * Featured Courses Section - قسم الدورات المميزة
 * يعرض أهم 3 دورات في سلايدر أفقي احترافي
 */

const FeaturedCoursesSection = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const allCourses = getAllCourses();

  // الحصول على دورات محددة: المراجعة الداخلية (مميزة) وإدارة المطاعم
  const featuredCourses = useMemo(() => {
    // البحث عن دورة المراجعة الداخلية
    const reviewCourse = allCourses.find(course =>
      course.slug === 'internal-audit' ||
      course.title.includes('المراجعة الداخلية') ||
      course.title.includes('مراجعة داخلية')
    );

    // إنشاء دورة المراجعة الداخلية إذا لم توجد
    const internalAuditCourse: Course = reviewCourse || {
      id: 998,
      title: 'احترف مهنة المراجعة الداخلية',
      slug: 'internal-audit-basics',
      pageUrl: '/courses/internal-audit-basics',
      description: 'برنامج شامل في المراجعة الداخلية يغطي جميع المحاور الأساسية والمتقدمة. يتضمن محتوى تفاعلي، حالات عملية، وبنك أسئلة متقدم مع أدوات ذكاء اصطناعي لتحسين الأداء.',
      category: 'المراجعة الداخلية',
      level: 'متقدم',
      duration: '10 أسابيع',
      lessons: 12,
      price: '$1,800',
      rating: 4.8,
      students: 2800,
      image: '/assets/Professional educational platform hero banner.png',
      files: 40,
      videos: 50,
      audios: 15,
      modules: []
    };

    // البحث عن دورة إدارة المطاعم
    const restaurantCourse = allCourses.find(course =>
      course.slug === 'restaurant-management' ||
      course.title.includes('المطاعم') ||
      course.title.includes('مطاعم')
    );

    const courses: Course[] = [];

    // إضافة دورة المراجعة الداخلية كدورة مميزة أولاً
    courses.push(internalAuditCourse);

    // إضافة دورة إدارة المطاعم إذا وجدت
    if (restaurantCourse) {
      courses.push(restaurantCourse);
    }

    return courses;
  }, [allCourses]);

  const clearTimers = () => {
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
      autoplayIntervalRef.current = null;
    }
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  };

  // Auto-play slider with motion preferences respected
  useEffect(() => {
    clearTimers();

    if (prefersReducedMotion || !isAutoPlaying || featuredCourses.length <= 1) return;

    autoplayIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 12000);

    return clearTimers;
  }, [isAutoPlaying, featuredCourses.length, prefersReducedMotion]);

  // Disable auto-play when user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAutoPlaying(false);
      clearTimers();
    }
  }, [prefersReducedMotion]);

  const scheduleResume = () => {
    if (prefersReducedMotion) return;
    clearTimers();
    resumeTimeoutRef.current = setTimeout(() => setIsAutoPlaying(true), 16000);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    scheduleResume();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    setIsAutoPlaying(false);
    scheduleResume();
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
    setIsAutoPlaying(false);
    scheduleResume();
  };

  if (featuredCourses.length === 0) {
    return null;
  }

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
        {/* Header - Enhanced Academic Typography with Scroll Animation */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-12 mt-4" dir="rtl">
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary-600 via-primary-500 to-primary-600 bg-clip-text text-transparent py-2 leading-normal"
              style={{
                fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
              }}
            >
              الدورات الأكثر طلباً
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
              اكتشف أحدث الدورات والخدمات التدريبية المميزة
            </p>
          </div>
        </ScrollAnimation>

        {/* Slider Container */}
        <div
          className="relative"
          role="region"
          aria-roledescription="carousel"
          aria-label="الدورات المميزة"
          aria-live="polite"
        >
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-3xl min-h-[520px] bg-gradient-to-b from-white to-slate-50/60 dark:from-slate-900 dark:to-slate-900/70">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 0.96, filter: 'blur(10px)' }}
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.7,
                  ease: [0.22, 1, 0.36, 1], // Custom easeOut
                }}
                className="w-full p-4 lg:p-6"
              >
                {featuredCourses[currentIndex] && (
                  <GlassCard
                    variant="elevated"
                    size="lg"
                    className="grid lg:grid-cols-[1.05fr_1fr] gap-10 items-center justify-center p-6 sm:p-8 lg:p-12"
                  >
                    {/* Image Section */}
                    <div className="relative group">
                      <div className="relative h-[320px] lg:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shadow-xl">
                        <Image
                          src={featuredCourses[currentIndex].image}
                          alt={featuredCourses[currentIndex].title}
                          fill
                          sizes="(min-width: 1024px) 520px, 100vw"
                          priority={currentIndex === 0}
                          className="object-cover brightness-105 contrast-110 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" aria-hidden />

                        {/* Play Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            whileHover={{ scale: 1.08 }}
                            className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl border border-white/70"
                            aria-hidden
                          >
                            <Play className="w-10 h-10 text-primary-600 fill-primary-600" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6 text-center lg:text-right" dir="rtl">
                      {/* Title */}
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                          {featuredCourses[currentIndex].title}
                        </h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {featuredCourses[currentIndex].description}
                        </p>
                      </div>

                      {/* Meta Badges */}
                      <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                        <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-200 dark:border-primary-800">
                          {featuredCourses[currentIndex].category}
                        </span>
                        <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-semibold border border-accent-200 dark:border-accent-800">
                          {featuredCourses[currentIndex].duration}
                        </span>
                        <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-semibold border border-emerald-200 dark:border-emerald-800 flex items-center gap-2">
                          <Clock className="w-4 h-4" aria-hidden />
                          تعلم ذاتي بإيقاع مرن
                        </span>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-right">
                        <div className="p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/70 bg-white/70 dark:bg-neutral-900/40 shadow-sm flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-primary-50 dark:bg-primary-900/40 flex items-center justify-center text-primary-700 dark:text-primary-300">
                            <Star className="w-5 h-5" aria-hidden />
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">التقييم</p>
                            <p className="text-lg font-semibold text-neutral-900 dark:text-white">{featuredCourses[currentIndex].rating ?? '4.8'} / 5</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/70 bg-white/70 dark:bg-neutral-900/40 shadow-sm flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-700 dark:text-blue-300">
                            <Users className="w-5 h-5" aria-hidden />
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">المتعلمون</p>
                            <p className="text-lg font-semibold text-neutral-900 dark:text-white">{featuredCourses[currentIndex].students?.toLocaleString() ?? '2,800'}</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/70 bg-white/70 dark:bg-neutral-900/40 shadow-sm flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-700 dark:text-amber-300">
                            <BookOpen className="w-5 h-5" aria-hidden />
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">الوحدات</p>
                            <p className="text-lg font-semibold text-neutral-900 dark:text-white">{featuredCourses[currentIndex].lessons ?? featuredCourses[currentIndex].modules?.length ?? 12} درس</p>
                          </div>
                        </div>
                        <div className="p-3 rounded-2xl border border-neutral-200/80 dark:border-neutral-700/70 bg-white/70 dark:bg-neutral-900/40 shadow-sm flex items-center gap-3">
                          <div className="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
                            <Clock className="w-5 h-5" aria-hidden />
                          </div>
                          <div>
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">مدة البرنامج</p>
                            <p className="text-lg font-semibold text-neutral-900 dark:text-white">{featuredCourses[currentIndex].duration}</p>
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 flex-col lg:flex-row">
                        <div>
                          <div className="text-sm text-neutral-500 mb-1">السعر</div>
                          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                            {featuredCourses[currentIndex].price}
                          </div>
                        </div>
                        <Button
                          onClick={() => router.push(`/courses/${featuredCourses[currentIndex].slug}`)}
                          size="lg"
                          className="min-w-[220px] shadow-lg hover:shadow-xl focus-visible:ring-4 focus-visible:ring-primary-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900"
                        >
                          <span>ابدأ التعلم الآن</span>
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Enhanced: 10% larger, clearer background, softer edges, lighter shadows */}
            <motion.button
              type="button"
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 group focus-visible:outline-none"
              aria-label="السابق"
              aria-controls="featured-courses-slider"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:border-primary-300 dark:group-hover:border-primary-600 group-hover:shadow-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900">
                  <ChevronRight className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </motion.button>
            <motion.button
              type="button"
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 group focus-visible:outline-none"
              aria-label="التالي"
              aria-controls="featured-courses-slider"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 group-hover:border-accent-300 dark:group-hover:border-accent-600 group-hover:shadow-xl transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900">
                  <ChevronLeft className="w-6 h-6 text-accent-600 dark:text-accent-400 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8" id="featured-courses-slider">
            {featuredCourses.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-900 ${index === currentIndex
                  ? 'w-12 h-3 bg-indigo-600 rounded-full'
                  : 'w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600'
                  }`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
                aria-pressed={index === currentIndex}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCoursesSection;
