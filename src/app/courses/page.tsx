'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, Grid3x3, List, ChevronRight, Clock, Users, Star, Link, GraduationCap, Shield, Building, Award, Calculator, Warehouse, TrendingUp, Download, Play, FileText, Video, Headphones, CheckCircle, ArrowLeft, Share2, Heart, Sparkles, Grid } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';
import { AdvancedCourseFilters, ScrollAnimation, ScrollAnimationContainer, GlassCard } from '@/components/ui';
import { ShimmerSkeletonScreen } from '@/components/ui/Skeleton';
import { 
  getAllCourses, 
  getCategoriesWithCount, 
  searchCourses, 
  sortCourses,
  filterValidCourses,
  type Course 
} from '@/data/courses/all-courses';
import { safeFormatNumber } from '@/lib/numberUtils';
import PageBackground from '@/components/ui/PageBackground';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import CourseCard from '@/components/CourseCard';
import { adaptCourse } from '@/lib/courseAdapter';
import HeroSection from '@/components/ui/HeroSection';
import { heroPresets, heroSectionSpacing } from '@/data/hero-presets';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';

// Lazy load heavy components
const ModernTabsLazy = dynamic(() => import('@/components/ui/ModernTabs').then(mod => ({ default: mod.ModernTabs })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 rounded" />,
});

const courseHeroPreset = heroPresets.courses;

export default function CoursesPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // ═══════════════════════════════════════════════════
  // States
  // ═══════════════════════════════════════════════════

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [selectedDuration, setSelectedDuration] = useState('all');
  const [expandedCourses, setExpandedCourses] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<string>('popular');

  // ═══════════════════════════════════════════════════
  // البيانات الموحدة
  // ═══════════════════════════════════════════════════

  const allCourses = getAllCourses();
  const categories = getCategoriesWithCount();

  const courseHeroProps = useMemo(() => {
    const dynamicStats = [
      { label: 'الدورات المتاحة', value: `${allCourses.length}+` },
      { label: 'مجالات تخصصية', value: '15+' },
      { label: 'مشاريع عملية', value: '80+' },
    ];

    return {
      ...courseHeroPreset,
      stats: dynamicStats,
      visual: courseHeroPreset.visual
        ? {
            ...courseHeroPreset.visual,
            stats: [
              { label: 'معدل الإكمال', value: '74%', helper: 'آخر 30 يوماً' },
              { label: 'جلسات مباشرة قادمة', value: '12' },
            ],
          }
        : undefined,
    };
  }, [allCourses.length]);

  // فلترة وترتيب الكورسات - محسّنة مع فلاتر متعددة
  const filteredCourses = useMemo(() => {
    // استخدام دالة الفلترة الموحدة (حذف كورسات CIA)
    let courses = filterValidCourses(allCourses);
    
    // فلترة حسب التصنيف
    if (selectedCategory !== 'all') {
      courses = courses.filter(course => course.category === selectedCategory);
    }
    
    // فلترة حسب المستوى
    if (selectedLevel !== 'all') {
      courses = courses.filter(course => course.level === selectedLevel);
    }
    
    // فلترة حسب السعر
    if (selectedPrice !== 'all') {
      // يمكن إضافة منطق الفلترة حسب السعر هنا
      // courses = courses.filter(course => ...);
    }
    
    // فلترة حسب المدة
    if (selectedDuration !== 'all') {
      // يمكن إضافة منطق الفلترة حسب المدة هنا
      // courses = courses.filter(course => ...);
    }
    
    // البحث
    if (searchQuery.trim()) {
      const searchResults = searchCourses(searchQuery);
      courses = filterValidCourses(searchResults).filter(course => 
        (selectedCategory === 'all' || course.category === selectedCategory) &&
        (selectedLevel === 'all' || course.level === selectedLevel)
      );
    }
    
    // الترتيب
    courses = sortCourses(courses, sortBy as 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high');
    
    return courses;
  }, [selectedCategory, selectedLevel, selectedPrice, selectedDuration, searchQuery, sortBy, allCourses]);

  // تحويل الكورسات إلى التنسيق المطلوب لـ CourseCard
  const adaptedCourses = useMemo(() => {
    return filteredCourses.map(course => adaptCourse(course));
  }, [filteredCourses]);

  // Handlers للـ actions
  const handleBookmark = (courseId: string) => {
    // TODO: Implement bookmark functionality
    console.log('Bookmark course:', courseId);
  };

  const handleShare = (courseId: string) => {
    // TODO: Implement share functionality
    console.log('Share course:', courseId);
  };

  const handleEnroll = (courseId: string) => {
    // TODO: Implement enroll functionality
    console.log('Enroll in course:', courseId);
    router.push(`/courses/${adaptedCourses.find(c => c.id === courseId)?.slug || courseId}`);
  };

  // ═══════════════════════════════════════════════════
  // Functions
  // ═══════════════════════════════════════════════════

  const toggleCourseExpansion = (courseId: number) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  // ═══════════════════════════════════════════════════
  // JSX
  // ═══════════════════════════════════════════════════

  return (
    <PageBackground variant="courses" pattern>
      {/* Grid-based layout with consistent spacing */}
      <div className="grid grid-cols-1 gap-y-12 py-12 lg:py-16">
        
      {/* Hero Section */}
        <section className="container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <HeroSection {...courseHeroProps} />
        </section>

        {/* Courses Content Section - Enhanced spacing */}
        <section
          id="courses-section"
          className={`container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-28 ${heroSectionSpacing}`}
        >
          {/* Advanced Filters System */}
          <ScrollAnimation direction="up" delay={0.1}>
            <AdvancedCourseFilters
              categories={[
                { id: 'all', label: 'الكل', value: 'all', count: allCourses.length },
                ...categories.map(cat => ({ id: cat.id, label: cat.label, value: cat.id, count: cat.count }))
              ]}
              levels={[
                { id: 'all', label: 'الكل', value: 'all' },
                { id: 'beginner', label: 'مبتدئ', value: 'مبتدئ' },
                { id: 'intermediate', label: 'متوسط', value: 'متوسط' },
                { id: 'advanced', label: 'متقدم', value: 'متقدم' },
              ]}
              prices={[
                { id: 'all', label: 'الكل', value: 'all' },
                { id: 'free', label: 'مجاني', value: 'free' },
                { id: 'low', label: 'أقل من $500', value: 'low' },
                { id: 'medium', label: '$500 - $1000', value: 'medium' },
                { id: 'high', label: 'أكثر من $1000', value: 'high' },
              ]}
              durations={[
                { id: 'all', label: 'الكل', value: 'all' },
                { id: 'short', label: 'قصيرة (أقل من 4 أسابيع)', value: 'short' },
                { id: 'medium', label: 'متوسطة (4-8 أسابيع)', value: 'medium' },
                { id: 'long', label: 'طويلة (أكثر من 8 أسابيع)', value: 'long' },
              ]}
              selectedCategory={selectedCategory}
              selectedLevel={selectedLevel}
              selectedPrice={selectedPrice}
              selectedDuration={selectedDuration}
              onCategoryChange={setSelectedCategory}
              onLevelChange={setSelectedLevel}
              onPriceChange={setSelectedPrice}
              onDurationChange={setSelectedDuration}
              onReset={() => {
                setSelectedCategory('all');
                setSelectedLevel('all');
                setSelectedPrice('all');
                setSelectedDuration('all');
                setSearchQuery('');
              }}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </ScrollAnimation>

          {/* Quick Categories Filter - Enhanced with Scroll Animation */}
          <ScrollAnimation direction="up" delay={0.2} className="mb-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-5">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat, index) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.03, duration: 0.15 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      className={`
                        inline-flex items-center gap-2 px-5 py-2.5 rounded-xl
                        text-sm font-semibold
                        transition-all duration-200 ease-out
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30
                        ${
                          isActive
                            ? 'bg-gradient-to-r from-primary-600 to-academic-accent-600 text-white shadow-lg border border-primary-700'
                            : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-300 dark:hover:border-primary-600'
                        }
                      `}
                      aria-label={`${cat.label} - ${cat.count} دورة`}
                      aria-pressed={isActive}
                    >
                      <span>{cat.label}</span>
                      <span className={`
                        px-2.5 py-1 rounded-lg text-xs font-bold
                        ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : 'bg-neutral-100 dark:bg-neutral-600 text-neutral-600 dark:text-neutral-300'
                        }
                      `}>
                        {cat.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </ScrollAnimation>

          {/* View Controls & Sort - Enhanced: larger icons, borders, better contrast */}
          <ScrollAnimation direction="up" delay={0.3}>
            <GlassCard variant="elevated" className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
                {/* View Mode Toggle - Enhanced: 8-10% larger icons, borders, clear hover */}
                <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1.5 border border-neutral-200 dark:border-neutral-700">
                  <motion.button
                    onClick={() => setViewMode('grid')}
                    className={`
                      px-4 py-2.5 rounded-lg transition-all duration-200 border
                      ${viewMode === 'grid' 
                        ? 'bg-white dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400 shadow-sm border-indigo-200 dark:border-indigo-700' 
                        : 'text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
                      }
                    `}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, backgroundColor: viewMode === 'grid' ? undefined : 'rgba(99, 102, 241, 0.1)' }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    aria-label="عرض الشبكة"
                    aria-pressed={viewMode === 'grid'}
                  >
                    <Grid className="w-[22px] h-[22px]" strokeWidth={2} />
                  </motion.button>
                  <motion.button
                    onClick={() => setViewMode('list')}
                    className={`
                      px-4 py-2.5 rounded-lg transition-all duration-200 border
                      ${viewMode === 'list' 
                        ? 'bg-white dark:bg-neutral-700 text-indigo-600 dark:text-indigo-400 shadow-sm border-indigo-200 dark:border-indigo-700' 
                        : 'text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 border-transparent hover:border-neutral-300 dark:hover:border-neutral-600'
                      }
                    `}
                    whileHover={prefersReducedMotion ? {} : { scale: 1.05, backgroundColor: viewMode === 'list' ? undefined : 'rgba(99, 102, 241, 0.1)' }}
                    whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                    aria-label="عرض القائمة"
                    aria-pressed={viewMode === 'list'}
                  >
                    <List className="w-[22px] h-[22px]" strokeWidth={2} />
                  </motion.button>
                </div>
                
                {/* Sort & Results - Enhanced: clean background, better contrast, clearer borders */}
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    عرض <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredCourses.length}</span> دورة
                  </div>
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2.5 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-200"
                    aria-label="ترتيب الدورات"
                  >
                    <option value="popular">الأكثر شعبية</option>
                    <option value="rating">الأعلى تقييماً</option>
                    <option value="newest">الأحدث</option>
                    <option value="price-low">الأقل سعراً</option>
                    <option value="price-high">الأعلى سعراً</option>
                  </select>
                </div>
              </div>
            </GlassCard>
          </ScrollAnimation>

          {/* Main Content */}
          <main className="relative">
            {/* Global Background Effect Layer */}
            <div className="course-page-bg-effect fixed inset-0 w-full h-full -z-0 pointer-events-none" />
            
            {/* Unified Grid View - Enhanced with ScrollAnimation */}
            <div className={`relative z-10 grid gap-8 items-stretch ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1'
            }`}>
              {adaptedCourses.map((course, index) => {
                // تنويع التأثيرات حسب موقع الكارت
                const getDirection = (idx: number) => {
                  const directions: Array<'up' | 'down' | 'left' | 'right' | 'fade' | 'scale'> = ['up', 'right', 'left', 'fade', 'scale'];
                  return directions[idx % directions.length] || 'up';
                };

                return (
                  <ScrollAnimation
                    key={course.id}
                    direction={getDirection(index)}
                    delay={index * 0.08}
                    duration={0.6}
                    className="group h-full"
                    threshold={0.1}
                    triggerOnce={true}
                  >
                    <CourseCard
                      course={course}
                      variant={viewMode === 'list' ? 'compact' : 'default'}
                      onBookmark={handleBookmark}
                      onShare={handleShare}
                      onEnroll={handleEnroll}
                      isLoading={false}
                    />
                  </ScrollAnimation>
                );
              })}
            </div>

            {/* No Results with Animation */}
            {adaptedCourses.length === 0 && (
              <ScrollAnimation direction="up" delay={0.2}>
                <div className="text-center py-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="mb-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center">
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          🔍
                        </motion.div>
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-500 text-lg mb-2">لم يتم العثور على دورات مطابقة</p>
                      <p className="text-neutral-500 dark:text-neutral-400 text-sm">جرب تغيير معايير البحث أو إعادة تعيين الفلاتر</p>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="secondary"
                        className="mt-4"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                        }}
                        aria-label="إعادة تعيين فلاتر البحث"
                      >
                        🔄 إعادة تعيين الفلاتر
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </ScrollAnimation>
            )}
          </main>
        </section>
      </div>

      <ScrollToTopButton 
        threshold={300}
        position="left"
        offset="bottom-20 left-6"
        size="md"
      />
    </PageBackground>
  );
}

