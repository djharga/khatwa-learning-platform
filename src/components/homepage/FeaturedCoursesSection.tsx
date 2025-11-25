'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Clock, ChevronRight, BookOpen, ChevronLeft, Play, ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { GlassCard, Button } from '@/components/ui';
import { ScrollAnimation } from '@/components/ui';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getAllCourses, type Course } from '@/data/courses/all-courses';

/**
 * Featured Courses Section - قسم الدورات المميزة
 * يعرض أهم الدورات في سلايدر أفقي احترافي
 */

const FeaturedCoursesSection = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const allCourses = getAllCourses();

  // الحصول على دورات محددة: المراجعة الداخلية (مميزة) وإدارة المطاعم
  const featuredCourses = useMemo(() => {
    const reviewCourse = allCourses.find(course =>
      course.slug === 'internal-audit' ||
      course.title.includes('المراجعة الداخلية') ||
      course.title.includes('مراجعة داخلية')
    );

    const internalAuditCourse: Course = reviewCourse || {
      id: 998,
      title: 'احترف مهنة المراجعة الداخلية',
      slug: 'internal-audit-basics',
      pageUrl: '/courses/internal-audit-basics',
      description:
        'برنامج شامل في المراجعة الداخلية يغطي جميع المحاور الأساسية والمتقدمة. يتضمن محتوى تفاعلي، حالات عملية، وبنك أسئلة متقدم مع أدوات ذكاء اصطناعي لتحسين الأداء.',
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
      modules: [],
    };

    const restaurantCourse = allCourses.find(course =>
      course.slug === 'restaurant-management' ||
      course.title.includes('المطاعم') ||
      course.title.includes('مطاعم')
    );

    const courses: Course[] = [];
    courses.push(internalAuditCourse);

    if (restaurantCourse) {
      courses.push(restaurantCourse);
    }

    return courses;
  }, [allCourses]);

  useEffect(() => {
    if (!isAutoPlaying || prefersReducedMotion || featuredCourses.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredCourses.length);
    }, 12000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredCourses.length, prefersReducedMotion]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + featuredCourses.length) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const currentCourse = featuredCourses[currentIndex];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden" aria-labelledby="featured-courses-heading">
      <Container size="xl" className="relative z-10">
        {/* Header */}
        <ScrollAnimation direction="up" delay={0.1}>
          <div className="text-center mb-12 mt-4" dir="rtl">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/40 border border-primary-100 dark:border-primary-800 text-primary-700 dark:text-primary-200 text-sm font-semibold">
              <span className="inline-block h-2 w-2 rounded-full bg-primary-500" aria-hidden />
              مختارات المنصة
            </div>
            <h2
              id="featured-courses-heading"
              className="mt-4 text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-neutral-900 dark:text-white"
              style={{ fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif" }}
            >
              الدورات الأكثر طلباً
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mt-3">
              اكتشف أحدث الدورات والخدمات التدريبية المميزة مع ملخص سريع عن المدة والمستوى والتقييم.
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative" role="region" aria-live="polite" aria-roledescription="شريط الدورات المميزة">
          <div className="relative overflow-hidden rounded-3xl min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, scale: 0.96, filter: 'blur(8px)' }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -30, scale: 0.96, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-4 lg:p-6"
              >
                {currentCourse && (
                  <GlassCard
                    variant="elevated"
                    size="lg"
                    className="grid lg:grid-cols-2 gap-10 items-center justify-center p-8 lg:p-14 backdrop-blur-xl"
                    aria-label={`دورة ${currentCourse.title}`}
                  >
                    <div className="relative group focus-within:ring-4 focus-within:ring-primary-200 focus-within:ring-offset-2 focus-within:ring-offset-transparent rounded-3xl">
                      <div className="relative h-[320px] lg:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shadow-xl">
                        <Image
                          src={currentCourse.image}
                          alt={currentCourse.title}
                          fill
                          sizes="(min-width: 1024px) 540px, 100vw"
                          className="object-cover brightness-105 contrast-110 transition-transform duration-500 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" aria-hidden />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={prefersReducedMotion ? { opacity: 1 } : { scale: 0.8, opacity: 0 }}
                            whileHover={prefersReducedMotion ? undefined : { scale: 1.08 }}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
                          >
                            <Play className="w-10 h-10 text-primary-600 fill-primary-600" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6 text-center lg:text-right" dir="rtl">
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                          {currentCourse.title}
                        </h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">{currentCourse.description}</p>
                      </div>

                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                        <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-200 dark:border-primary-800">
                          {currentCourse.category}
                        </span>
                        <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-semibold border border-accent-200 dark:border-accent-800">
                          {currentCourse.duration}
                        </span>
                        <span className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-200 rounded-lg text-sm font-semibold border border-emerald-100 dark:border-emerald-800 inline-flex items-center gap-2">
                          <Star className="h-4 w-4 fill-current" />
                          {currentCourse.rating.toFixed(1)} / 5
                        </span>
                      </div>

                      <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 flex-col lg:flex-row">
                        <div className="text-center lg:text-right">
                          <div className="text-sm text-neutral-500 mb-1">السعر</div>
                          <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">{currentCourse.price}</div>
                          <div className="mt-1 text-sm text-neutral-500">يشمل التمارين والمواد المساندة</div>
                        </div>
                        <Button
                          onClick={() => router.push(`/courses/${currentCourse.slug}`)}
                          size="lg"
                          className="min-w-[220px] shadow-lg hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                        >
                          <span>ابدأ التعلم الآن</span>
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2" role="list">
                        {[
                          { icon: <BookOpen className="w-4 h-4" />, label: 'الوحدات', value: `${currentCourse.lessons} درس` },
                          { icon: <Clock className="w-4 h-4" />, label: 'المدة', value: currentCourse.duration },
                          {
                            icon: <Users className="w-4 h-4" />,
                            label: 'المتعلمون',
                            value: `${currentCourse.students.toLocaleString()} متدرب`,
                          },
                        ].map((stat, index) => (
                          <div
                            key={`${stat.label}-${index}`}
                            className="flex items-center gap-3 rounded-xl border border-neutral-200/80 dark:border-neutral-700/80 bg-neutral-50/70 dark:bg-neutral-900/40 px-4 py-3"
                            role="listitem"
                          >
                            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-200">
                              {stat.icon}
                            </span>
                            <div className="text-right">
                              <p className="text-xs text-neutral-500">{stat.label}</p>
                              <p className="text-sm font-semibold text-neutral-900 dark:text-white">{stat.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
              aria-label="السابق"
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:border-primary-300 dark:group-hover:border-primary-600 group-hover:shadow-xl transition-all duration-300">
                  <ChevronRight className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500"
              aria-label="التالي"
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 group-hover:border-accent-300 dark:group-hover:border-accent-600 group-hover:shadow-xl transition-all duration-300">
                  <ChevronLeft className="w-6 h-6 text-accent-600 dark:text-accent-400 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {featuredCourses.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                aria-pressed={index === currentIndex}
                className={`transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-indigo-600 rounded-full shadow-sm'
                    : 'w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600'
                }`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </div>

          <div className="flex justify-center mt-6" dir="rtl">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-700 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-100 transition-colors"
            >
              استعرض جميع الدورات
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCoursesSection;
