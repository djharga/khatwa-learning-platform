'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Clock, ChevronRight, BookOpen, ChevronLeft, Play } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { GlassCard, Button } from '@/components/ui';
import { ScrollAnimation } from '@/components/ui';
import { getAllCourses, sortCourses, type Course } from '@/data/courses/all-courses';

/**
 * Featured Courses Section - قسم الدورات المميزة
 * يعرض أهم 3 دورات في سلايدر أفقي احترافي
 */

const FeaturedCoursesSection = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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

  // Auto-play slider with slow movement for better reading
  useEffect(() => {
    if (!isAutoPlaying || featuredCourses.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 12000); // Change slide every 12 seconds - slow enough for comfortable reading

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredCourses.length, currentIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000); // Resume auto-play after 18 seconds
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 18000);
  };

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
        <div className="relative">
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-3xl min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full p-4 lg:p-6"
              >
                {featuredCourses[currentIndex] && (
                  <GlassCard variant="elevated" size="lg" className="grid lg:grid-cols-2 gap-10 items-center justify-center p-8 lg:p-16">
                    {/* Image Section */}
                    <div className="relative group">
                      <div className="relative h-[320px] lg:h-[420px] rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shadow-xl">
                        <img
                          src={featuredCourses[currentIndex].image}
                          alt={featuredCourses[currentIndex].title}
                          className="w-full h-full object-cover brightness-105 contrast-110 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Play Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl"
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

                      {/* Category Badge */}
                      <div className="flex items-center justify-center lg:justify-start gap-3">
                        <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg text-sm font-semibold border border-primary-200 dark:border-primary-800">
                          {featuredCourses[currentIndex].category}
                        </span>
                        <span className="px-4 py-2 bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 rounded-lg text-sm font-semibold border border-accent-200 dark:border-accent-800">
                          {featuredCourses[currentIndex].duration}
                        </span>
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
                          className="min-w-[200px] shadow-lg hover:shadow-xl"
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
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-20 group"
              aria-label="السابق"
            >
              <div className="relative">
                <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-primary-50 dark:group-hover:bg-primary-900/30 group-hover:border-primary-300 dark:group-hover:border-primary-600 group-hover:shadow-xl transition-all duration-300">
                  <ChevronRight className="w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-20 group"
              aria-label="التالي"
            >
              <div className="relative">
                <div className="relative w-14 h-14 bg-white dark:bg-neutral-800 rounded-2xl shadow-lg border-2 border-neutral-200 dark:border-neutral-700 flex items-center justify-center group-hover:bg-accent-50 dark:group-hover:bg-accent-900/30 group-hover:border-accent-300 dark:group-hover:border-accent-600 group-hover:shadow-xl transition-all duration-300">
                  <ChevronLeft className="w-6 h-6 text-accent-600 dark:text-accent-400 group-hover:text-accent-700 dark:group-hover:text-accent-300 transition-colors duration-300" strokeWidth={2.5} />
                </div>
              </div>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {featuredCourses.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-colors duration-200 ${index === currentIndex
                  ? 'w-12 h-3 bg-indigo-600 rounded-full'
                  : 'w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600'
                  }`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturedCoursesSection;
