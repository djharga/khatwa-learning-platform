'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Users, Clock, ChevronRight, BookOpen, ChevronLeft, Play } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
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

  // الحصول على أهم 3 دورات فقط مرتبة حسب الشعبية
  const featuredCourses = useMemo(() => {
    const courses = sortCourses(allCourses, 'popular').slice(0, 3);
    return courses;
  }, [allCourses]);

  // Auto-play slider with slow movement
  useEffect(() => {
    if (!isAutoPlaying || featuredCourses.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 15000); // Change slide every 15 seconds - very slow for reading

    return () => clearInterval(interval);
  }, [isAutoPlaying, featuredCourses.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 30000); // Resume auto-play after 30 seconds
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredCourses.length) % featuredCourses.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 30000);
  };

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-white via-neutral-50 to-white dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-200/30 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-200/30 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            الدورات المميزة
            <span className="block bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent mt-3">
              أهم الدورات التعليمية
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            اكتشف أهم 3 دورات تم اختيارها بعناية من أفضل الدورات التدريبية
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider */}
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="w-full"
              >
                {featuredCourses[currentIndex] && (
                  <div className="grid lg:grid-cols-2 gap-8 items-center bg-gradient-to-br from-white via-indigo-50/30 to-white dark:from-neutral-900 dark:via-indigo-900/20 dark:to-neutral-900 rounded-3xl p-6 lg:p-12 shadow-2xl border border-indigo-100 dark:border-indigo-900/50">
                    {/* Image Section */}
                    <div className="relative group">
                      <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shadow-xl">
                        <img
                          src={featuredCourses[currentIndex].image}
                          alt={featuredCourses[currentIndex].title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                        
                        {/* Level Badge */}
                        <div className="absolute top-6 right-6">
                          <span
                            className={`inline-block px-5 py-2.5 text-sm font-bold rounded-full shadow-xl backdrop-blur-md border-2 border-white/30 ${
                              featuredCourses[currentIndex].level === 'مبتدئ'
                                ? 'bg-success-500/95 text-white'
                                : featuredCourses[currentIndex].level === 'متوسط'
                                ? 'bg-primary-500/95 text-white'
                                : 'bg-secondary-innovate-500/95 text-white'
                            }`}
                          >
                            {featuredCourses[currentIndex].level}
                          </span>
                        </div>

                        {/* Play Icon Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <Play className="w-10 h-10 text-indigo-600 fill-indigo-600" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight">
                          {featuredCourses[currentIndex].title}
                        </h3>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
                          {featuredCourses[currentIndex].description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-6 py-4 border-y border-neutral-200 dark:border-neutral-700">
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-warning-100 dark:bg-warning-900/30 rounded-lg">
                            <Star className="w-5 h-5 text-warning-500 fill-warning-500" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                              {featuredCourses[currentIndex].rating}
                            </div>
                            <div className="text-xs text-neutral-500">التقييم</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                            <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                              {featuredCourses[currentIndex].students.toLocaleString()}
                            </div>
                            <div className="text-xs text-neutral-500">طالب</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                            <Clock className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-neutral-900 dark:text-white">
                              {featuredCourses[currentIndex].duration}
                            </div>
                            <div className="text-xs text-neutral-500">المدة</div>
                          </div>
                        </div>
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between gap-6 pt-4">
                        <div>
                          <div className="text-sm text-neutral-500 mb-1">السعر</div>
                          <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                            {featuredCourses[currentIndex].price}
                          </div>
                        </div>
                        <motion.button
                          onClick={() => router.push(featuredCourses[currentIndex].pageUrl)}
                          className="flex-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white font-bold rounded-xl px-8 py-4 shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <span>ابدأ التعلم الآن</span>
                          <ChevronRight className="w-6 h-6" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full shadow-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
              aria-label="السابق"
            >
              <ChevronRight className="w-6 h-6 text-neutral-900 dark:text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full shadow-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300 hover:scale-110"
              aria-label="التالي"
            >
              <ChevronLeft className="w-6 h-6 text-neutral-900 dark:text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {featuredCourses.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-12 h-3 bg-indigo-600 rounded-full'
                    : 'w-3 h-3 bg-neutral-300 dark:bg-neutral-700 rounded-full hover:bg-neutral-400 dark:hover:bg-neutral-600'
                }`}
                aria-label={`انتقل إلى الشريحة ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-indigo-600 rounded-full"
                    layoutId="activeDot"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* View All Courses Button */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Link href="/courses">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
            >
              <BookOpen className="w-5 h-5 ml-2" />
              عرض جميع الدورات
              <ChevronRight className="w-5 h-5 mr-2" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default FeaturedCoursesSection;
