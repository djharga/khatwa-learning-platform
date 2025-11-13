'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3x3, List, ChevronRight, BookOpen, Clock, Users, Star, Link, GraduationCap, Shield, Building, Award, Calculator, Warehouse, TrendingUp, Download, Play, FileText, Video, Headphones, CheckCircle, ArrowLeft, Share2, Heart, Sparkles, Grid } from 'lucide-react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';
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

// Lazy load heavy components
const ModernTabsLazy = dynamic(() => import('@/components/ui/ModernTabs').then(mod => ({ default: mod.ModernTabs })), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 rounded" />,
});

export default function CoursesPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  // ═══════════════════════════════════════════════════
  // States
  // ═══════════════════════════════════════════════════

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedCourses, setExpandedCourses] = useState<Set<number>>(new Set());
  const [sortBy, setSortBy] = useState<string>('popular');

  // ═══════════════════════════════════════════════════
  // البيانات الموحدة
  // ═══════════════════════════════════════════════════

  const allCourses = getAllCourses();
  const categories = getCategoriesWithCount();

  // فلترة وترتيب الكورسات
  const filteredCourses = useMemo(() => {
    // استخدام دالة الفلترة الموحدة (حذف كورسات CIA)
    let courses = filterValidCourses(allCourses);
    
    // فلترة حسب التصنيف
    if (selectedCategory !== 'all') {
      courses = courses.filter(course => course.category === selectedCategory);
    }
    
    // البحث
    if (searchQuery.trim()) {
      const searchResults = searchCourses(searchQuery);
      courses = filterValidCourses(searchResults).filter(course => 
        selectedCategory === 'all' || course.category === selectedCategory
      );
    }
    
    // الترتيب
    courses = sortCourses(courses, sortBy as 'popular' | 'rating' | 'newest' | 'price-low' | 'price-high');
    
    return courses;
  }, [selectedCategory, searchQuery, sortBy]);

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
    <PageBackground variant="courses">
      {/* Grid-based layout with consistent spacing */}
      <div className="grid grid-cols-1 gap-y-12 py-12 lg:py-16">
        
        {/* Hero Section - Enhanced: smoother gradients, clearer background, lighter text area */}
        <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-primary-950 text-white overflow-hidden rounded-[2rem] mx-4 lg:mx-8 shadow-xl">
          {/* Background Image - Enhanced clarity and brightness */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/course-hero.jpg"
              alt="الدورات التدريبية"
              fill
              priority
              quality={95}
              className="object-cover brightness-105 contrast-105"
              style={{ objectPosition: 'center' }}
            />
            {/* Improved gradient overlay - smoother purple gradient, lighter bottom area */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/45 via-purple-900/40 to-primary-900/45"></div>
            {/* Lighten bottom area for better text contrast */}
            <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-primary-800/30 via-transparent to-transparent"></div>
          </div>

          {/* Content - Enhanced spacing for better visual separation */}
          <div className="relative z-10 container mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-28">
            <div className="text-center">
              {/* Badge - Enhanced border contrast, lighter gradient, adjusted icon size */}
              <motion.div 
                className="inline-flex items-center gap-2.5 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border-2 border-white/50 shadow-lg"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <BookOpen className="w-[18px] h-[18px] text-white drop-shadow-md" strokeWidth={2.5} />
                <span className="font-bold text-sm sm:text-base tracking-normal text-white drop-shadow-md">برامج تعليمية متخصصة</span>
              </motion.div>

              {/* Title - Enhanced: 1-2% larger, stronger contrast, adjusted letter-spacing */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.7rem] xl:text-[4rem] font-bold mb-7 leading-tight text-white"
                style={{ 
                  textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.4)',
                  letterSpacing: '-0.02em'
                }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                مسارك المهني يبدأ من هنا
              </motion.h1>

              {/* Description - Enhanced: increased line-height, brighter color */}
              <motion.p
                className="text-base sm:text-lg md:text-xl text-neutral-50 font-medium leading-loose mb-10 max-w-3xl mx-auto"
                style={{ 
                  textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)'
                }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              >
                محتوى تدريبي يقدم لك خبرة واقعية ونماذج تطبيقية تساعدك على التميز مهنياً.
              </motion.p>

              {/* Stats Cards - Enhanced: increased contrast, softer shadows, unified icons, improved padding, simple hover, no glare */}
              <motion.div
                className="flex flex-wrap items-center justify-center gap-5 max-w-4xl mx-auto"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              >
                {/* برنامج مهني +15 */}
                <motion.div
                  className="flex items-center gap-2.5 bg-white/25 backdrop-blur-sm rounded-full px-6 py-[14px] border-2 border-white/50 shadow-md hover:bg-white/35 transition-all duration-200"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">برنامج مهني +15</span>
                </motion.div>

                {/* تقييم المتعلمين */}
                <motion.div
                  className="flex items-center gap-2.5 bg-white/25 backdrop-blur-sm rounded-full px-6 py-[14px] border-2 border-white/50 shadow-md hover:bg-white/35 transition-all duration-200"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">تقييم المتعلمين</span>
                </motion.div>

                {/* %80 نسبة الثقة */}
                <motion.div
                  className="flex items-center gap-2.5 bg-white/25 backdrop-blur-sm rounded-full px-6 py-[14px] border-2 border-white/50 shadow-md hover:bg-white/35 transition-all duration-200"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">%80 نسبة الثقة</span>
                </motion.div>

                {/* %75 رضا المستخدمين */}
                <motion.div
                  className="flex items-center gap-2.5 bg-white/25 backdrop-blur-sm rounded-full px-6 py-[14px] border-2 border-white/50 shadow-md hover:bg-white/35 transition-all duration-200"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                >
                  <span className="text-white font-bold text-sm sm:text-base drop-shadow-md">%75 رضا المستخدمين</span>
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Gradient Transition - Reduced blur for cleaner look */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-neutral-900 via-white/60 dark:via-neutral-900/60 to-transparent"></div>
        </section>

        {/* Courses Content Section - Enhanced spacing */}
        <section id="courses-section" className="container mx-auto max-w-7xl px-8 py-28">
          {/* Search and Filters Grid - Enhanced vertical spacing */}
          <div className="grid grid-cols-1 gap-y-10 mb-16">
            {/* Search Bar */}
            <div className="bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm rounded-xl shadow-md border border-neutral-200/50 dark:border-neutral-700/50 p-6">
              <Input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                leftIcon={Search}
                size="lg"
                className="w-full"
              />
            </div>

            {/* Categories Filter - Enhanced: higher contrast, softer edges, improved "all courses" button */}
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
                            ? 'bg-indigo-600 text-white shadow-md border border-indigo-700'
                            : 'bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-600 hover:border-neutral-300 dark:hover:border-neutral-500'
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

            {/* View Controls & Sort - Enhanced: larger icons, borders, better contrast */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 bg-white dark:bg-neutral-900 rounded-xl shadow-md border border-neutral-200 dark:border-neutral-700">
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
          </div>

          {/* Main Content */}
          <main>
            {/* Unified Grid View - Enhanced gap and alignment */}
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.08, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <Card 
                    variant="default"
                    hover
                    className={`h-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden flex rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ${
                      viewMode === 'list' ? 'flex-row' : 'flex-col'
                    } group/card text-sm`}
                    style={{
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.05)',
                      minHeight: viewMode === 'list' ? 'auto' : '480px'
                    }}
                  >
                    {/* Course Image - Enhanced: clarity, contrast, subtle hover zoom, no blur */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 ${
                      viewMode === 'list' ? 'w-48 h-40 flex-shrink-0' : 'h-40 w-full'
                    }`}>
                      <Image 
                        src={course.image || '/assets/default-course.jpg'} 
                        alt={course.title}
                        fill
                        sizes={viewMode === 'list' ? '192px' : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw'}
                        className="object-cover brightness-105 contrast-110 group-hover/card:scale-105 transition-transform duration-300"
                        priority={index < 4}
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    <CardContent className={`flex-1 flex flex-col ${viewMode === 'list' ? 'p-5' : 'p-4'}`}>
                      {/* Title - Enhanced: 1-2px larger, higher contrast, adjusted spacing */}
                      <h3 className={`font-bold text-neutral-900 dark:text-neutral-100 mb-3 group-hover/card:text-indigo-600 dark:group-hover/card:text-indigo-400 transition-colors ${
                        viewMode === 'list' ? 'text-xl mb-3' : 'text-base line-clamp-2'
                      }`} style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)' }}>
                        {course.title}
                      </h3>

                      {/* Description - List View Only */}
                      {viewMode === 'list' && (
                        <p className="text-neutral-600 dark:text-neutral-500 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                      )}

                      {/* Stats Row - Enhanced: icon sizes, unified weight, increased line-height, better spacing */}
                      <div className={`flex items-center gap-5 mb-4 text-sm text-neutral-700 dark:text-neutral-400 ${
                        viewMode === 'list' ? 'mb-5' : 'mb-4'
                      }`} style={{ lineHeight: '1.6' }}>
                        <div className="flex items-center gap-1.5">
                          <Star className="w-[18px] h-[18px] text-warning-400 fill-current" strokeWidth={2} />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-[18px] h-[18px]" strokeWidth={2} />
                          <span className="font-medium">{safeFormatNumber(course.students)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-[18px] h-[18px]" strokeWidth={2} />
                          <span className="font-medium">{course.duration}</span>
                        </div>
                      </div>

                      {/* Content Files Info */}
                      <div className={`flex items-center gap-4 mb-4 text-xs text-neutral-600 dark:text-neutral-500 ${
                        viewMode === 'list' ? 'mb-4' : 'mb-3'
                      }`}>
                        <div className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          <span>{course.files} ملف</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          <span>{course.videos} فيديو</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Headphones className="w-3 h-3" />
                          <span>{course.audios} صوتي</span>
                        </div>
                      </div>

                      {/* Price and Button - Enhanced: clearer price, improved button */}
                      <div className={`space-y-3 mt-auto ${viewMode === 'list' ? 'flex flex-row items-center justify-between' : ''}`}>
                        <div className={`font-bold text-indigo-600 dark:text-indigo-400 ${viewMode === 'list' ? 'text-2xl' : 'text-xl text-center'}`} style={{ fontSize: viewMode === 'list' ? '1.5rem' : '1.25rem' }}>
                          {course.price}
                        </div>
                        <Button
                          onClick={() => router.push(`/courses/${course.slug}`)}
                          className={`rounded-xl ${viewMode === 'list' ? 'px-6 py-2.5' : 'w-full py-3'} bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-700 text-white font-bold shadow-md hover:shadow-lg transition-all duration-200`}
                          size={viewMode === 'list' ? 'default' : 'default'}
                          animate={!prefersReducedMotion}
                          aria-label={`ابدأ دورة ${course.title}`}
                        >
                          <span>ابدأ الآن</span>
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-500 text-lg">لم يتم العثور على دورات مطابقة</p>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                  animate={!prefersReducedMotion}
                  aria-label="إعادة تعيين فلاتر البحث"
                >
                  إعادة تعيين الفلاتر
                </Button>
              </div>
            )}
          </main>
        </section>
      </div>
    </PageBackground>
  );
}

