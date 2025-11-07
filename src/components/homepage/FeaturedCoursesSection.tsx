'use client';

import { useMemo, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Users, Clock, ChevronRight, BookOpen, ChevronLeft, Play } from 'lucide-react';
import { Container } from '@/components/ui/primitives';
import { Card, CardContent } from '@/components/ui/Card';
// Removed unused import
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
      title: 'المراجعة الداخلية',
      slug: 'internal-audit',
      pageUrl: '/review',
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

  // Auto-play slider with very slow movement for better reading
  useEffect(() => {
    if (!isAutoPlaying || featuredCourses.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredCourses.length);
    }, 25000); // Change slide every 25 seconds - very slow for comfortable reading

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
      {/* Background Effects - Very Subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-gradient-to-br from-indigo-100/12 via-transparent to-transparent dark:from-indigo-900/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-[800px] h-[800px] bg-gradient-to-tl from-purple-100/12 via-transparent to-transparent dark:from-purple-900/8 rounded-full blur-3xl" />
      </div>

      <Container size="xl" className="relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
            الدورات المميزة
            <span className="block bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 bg-clip-text text-transparent mt-3">
              أهم الدورات التعليمية
            </span>
          </h2>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            اكتشف أهم الدورات التدريبية المميزة
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Main Slider with Smooth Animation */}
          <div className="relative overflow-hidden rounded-3xl min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="w-full"
              >
                {featuredCourses[currentIndex] && (
                    <div className="grid lg:grid-cols-2 gap-8 items-center justify-center bg-gradient-to-br from-white via-indigo-50/30 to-white dark:from-neutral-900 dark:via-indigo-900/20 dark:to-neutral-900 rounded-3xl p-6 lg:p-12 shadow-2xl border border-indigo-100 dark:border-indigo-900/50">
                      {/* Image Section */}
                      <motion.div 
                        className="relative group"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                      >
                        <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 shadow-xl">
                          <img
                            src={featuredCourses[currentIndex].image}
                            alt={featuredCourses[currentIndex].title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                          
                          {/* Level Badge - Only show for beginner level */}
                          {featuredCourses[currentIndex].level === 'مبتدئ' && (
                            <div className="absolute top-6 right-6">
                              <span className="inline-block px-5 py-2.5 text-sm font-bold rounded-full shadow-xl backdrop-blur-md border-2 border-white/30 bg-success-500/95 text-white">
                                {featuredCourses[currentIndex].level}
                              </span>
                            </div>
                          )}

                          {/* Play Icon Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="w-20 h-20 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-2xl">
                              <Play className="w-10 h-10 text-indigo-600 fill-indigo-600" />
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Content Section */}
                      <motion.div 
                        className="space-y-6 text-center"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                      >
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
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-semibold">
                            {featuredCourses[currentIndex].category}
                          </span>
                          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-semibold">
                            {featuredCourses[currentIndex].duration}
                          </span>
                        </div>

                        {/* Price and CTA */}
                        <div className="flex items-center justify-center gap-6 pt-4 flex-col">
                          <div>
                            <div className="text-sm text-neutral-500 mb-1">السعر</div>
                            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
                              {featuredCourses[currentIndex].price}
                            </div>
                          </div>
                          <button
                            onClick={() => router.push(featuredCourses[currentIndex].pageUrl)}
                            className="flex-1 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-600 text-white font-bold rounded-xl px-8 py-4 shadow-xl shadow-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/60 transition-all duration-200 flex items-center justify-center gap-3 text-lg hover:scale-105"
                          >
                            <span>ابدأ التعلم الآن</span>
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full shadow-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-200"
              aria-label="السابق"
            >
              <ChevronRight className="w-6 h-6 text-neutral-900 dark:text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-full shadow-xl border border-neutral-200 dark:border-neutral-700 flex items-center justify-center hover:bg-white dark:hover:bg-neutral-800 transition-colors duration-200"
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
                className={`transition-all duration-200 ${
                  index === currentIndex
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
