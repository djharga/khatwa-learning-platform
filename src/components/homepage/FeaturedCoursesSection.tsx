'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, ChevronLeft, ChevronRight, Clock, Play, Star, Users } from 'lucide-react';

import { Container } from '@/components/ui/primitives';
import { Button, GlassCard, ScrollAnimation } from '@/components/ui';
import { getAllCourses, type Course } from '@/data/courses/all-courses';

/**
 * Featured Courses Section - قسم الدورات المميزة
 * يعرض أهم الدورات بسلايدر عصري مع تجربة عرض وقراءة محسّنة
 */
const FeaturedCoursesSection = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const allCourses = getAllCourses();

  const featuredCourses = useMemo(() => {
    const reviewCourse = allCourses.find(
      (course) =>
        course.slug === 'internal-audit' ||
        course.title.includes('المراجعة الداخلية') ||
        course.title.includes('مراجعة داخلية')
    );

    const internalAuditCourse: Course =
      reviewCourse ||
      ({
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
      } as Course);

    const restaurantCourse = allCourses.find(
      (course) =>
        course.slug === 'restaurant-management' ||
        course.title.includes('المطاعم') ||
        course.title.includes('مطاعم')
    );

    const courses: Course[] = [internalAuditCourse];
    if (restaurantCourse) {
      courses.push(restaurantCourse);
    }

    return courses;
  }, [allCourses]);

  const sliderLength = featuredCourses.length || 1;

  useEffect(() => {
    if (!isAutoPlaying || sliderLength <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sliderLength);
    }, 12000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, sliderLength]);

  const goToSlide = (index: number) => {
    if (sliderLength <= 1) return;
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const nextSlide = () => {
    if (sliderLength <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % sliderLength);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const prevSlide = () => {
    if (sliderLength <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + sliderLength) % sliderLength);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const displayedCourse = featuredCourses[currentIndex % sliderLength];

  return (
    <section className="relative py-12 lg:py-16 overflow-hidden">
      <Container size="xl" className="relative z-10">
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

        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl min-h-[520px] border border-white/70 dark:border-white/10 shadow-2xl bg-gradient-to-br from-white via-primary-50 to-accent-50 dark:from-neutral-900 dark:via-neutral-900/70 dark:to-primary-950/40">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 30, scale: 0.96, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, scale: 0.96, filter: 'blur(8px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full p-4 lg:p-6"
              >
                {displayedCourse && (
                  <GlassCard
                    variant="elevated"
                    size="lg"
                    className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center justify-center p-8 lg:p-14 xl:p-16 backdrop-blur-xl bg-white/80 dark:bg-neutral-900/70"
                  >
                    <div className="relative group h-full">
                      <div className="relative h-[320px] lg:h-[440px] rounded-[28px] overflow-hidden bg-gradient-to-br from-primary-50/80 via-white to-accent-50 dark:from-neutral-800 dark:via-neutral-900 dark:to-primary-950 shadow-xl border border-white/60 dark:border-white/10">
                        <Image
                          src={displayedCourse.image || '/assets/Professional educational platform hero banner.png'}
                          alt={displayedCourse.title}
                          fill
                          sizes="(min-width: 1024px) 560px, 100vw"
                          className="object-cover brightness-[1.05] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                          priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.05 }}
                            className="w-16 h-16 lg:w-20 lg:h-20 bg-white/95 text-primary-700 rounded-full flex items-center justify-center shadow-2xl"
                          >
                            <Play className="w-8 h-8 lg:w-10 lg:h-10" />
                          </motion.div>
                        </div>
                      </div>
                      <div className="absolute -left-6 -bottom-6 hidden lg:flex w-28 h-28 bg-primary-500/15 blur-2xl rounded-full" aria-hidden />
                    </div>

                    <div className="space-y-6 text-center lg:text-right" dir="rtl" aria-live="polite">
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                          {displayedCourse.title}
                        </h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                          {displayedCourse.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-200 dark:border-primary-800">
                          {displayedCourse.category}
                        </span>
                        <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-semibold border border-accent-200 dark:border-accent-800">
                          {displayedCourse.duration}
                        </span>
                      </div>

                      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 text-start">
                        {[
                          { label: 'المدة', icon: Clock, value: displayedCourse.duration },
                          { label: 'عدد المتعلمين', icon: Users, value: `${displayedCourse.students?.toLocaleString() || '2000+'}` },
                          { label: 'التقييم', icon: Star, value: `${displayedCourse.rating ?? 4.8} / 5` },
                          { label: 'الوحدات', icon: BookOpen, value: `${displayedCourse.lessons ?? 12} درساً` },
                        ].map(({ label, icon: Icon, value }) => (
                          <div
                            key={label}
                            className="flex items-center gap-3 rounded-2xl border border-neutral-200/70 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 px-4 py-3 shadow-[0_10px_40px_-24px_rgba(15,23,42,0.45)]"
                          >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-200">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                              <dt className="text-sm text-neutral-500 dark:text-neutral-400">{label}</dt>
                              <dd className="text-lg font-semibold text-neutral-900 dark:text-white">{value}</dd>
                            </div>
                          </div>
                        ))}
                      </dl>

                      <div className="flex items-center justify-center lg:justify-between gap-6 pt-4 flex-col lg:flex-row">
                        <div className="w-full lg:w-auto text-center lg:text-left">
                          <div className="text-sm text-neutral-500 mb-1">السعر</div>
                          <div className="text-4xl font-bold text-primary-600 dark:text-primary-300 tracking-tight">
                            {displayedCourse.price}
                          </div>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">يشمل مواد تطبيقية وبنك أسئلة محدث</p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                          <Button
                            onClick={() => router.push(`/courses/${displayedCourse.slug}`)}
                            size="lg"
                            className="min-w-[200px] shadow-lg hover:shadow-xl"
                            aria-label={`ابدأ التعلم الآن في ${displayedCourse.title}`}
                          >
                            <span>ابدأ التعلم الآن</span>
                            <ChevronRight className="w-5 h-5" />
                          </Button>
                          <Button
                            asChild
                            variant="secondary"
                            size="lg"
                            className="min-w-[200px] border border-neutral-200/70 dark:border-white/10 backdrop-blur"
                          >
                            <Link href="/courses">عرض جميع الدورات</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                )}
              </motion.div>
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={prevSlide}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 group"
              aria-label="السابق"
              disabled={sliderLength <= 1}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200/80 dark:border-white/10 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:border-primary-300 dark:group-hover:border-primary-600 group-hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </motion.button>
            <motion.button
              type="button"
              onClick={nextSlide}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 group"
              aria-label="التالي"
              disabled={sliderLength <= 1}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border border-neutral-200/80 dark:border-white/10 flex items-center justify-center group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 group-hover:border-accent-300 dark:group-hover:border-accent-600 group-hover:shadow-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-accent-600 dark:text-accent-400 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </motion.button>
          </div>

          <div className="flex items-center justify-center gap-3 mt-8">
            {featuredCourses.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                type="button"
                className={`transition-all duration-200 ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-primary-600 dark:bg-primary-400 rounded-full shadow-md'
                    : 'w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600'
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-neutral-900`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                disabled={sliderLength <= 1}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCoursesSection;
