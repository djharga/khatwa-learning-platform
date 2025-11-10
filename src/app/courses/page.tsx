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
    let courses = allCourses;
    
    // حذف الزمالة (CIA) من قائمة الدورات
    courses = courses.filter(course => 
      !course.slug.includes('cia') && 
      !course.title.includes('زمالة') &&
      !course.title.includes('CIA') &&
      course.pageUrl !== '/cia'
    );
    
    // فلترة حسب التصنيف
    if (selectedCategory !== 'all') {
      courses = courses.filter(course => course.category === selectedCategory);
    }
    
    // البحث
    if (searchQuery.trim()) {
      courses = searchCourses(searchQuery).filter(course => 
        (selectedCategory === 'all' || course.category === selectedCategory) &&
        !course.slug.includes('cia') && 
        !course.title.includes('زمالة') &&
        !course.title.includes('CIA') &&
        course.pageUrl !== '/cia'
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
        
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 dark:from-primary-800 dark:via-primary-900 dark:to-primary-950 text-white overflow-hidden rounded-2xl mx-4 lg:mx-8 shadow-xl">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/course-hero.jpg"
              alt="الدورات التدريبية"
              fill
              priority
              quality={90}
              className="object-cover"
              style={{ objectPosition: 'center' }}
            />
            {/* Simple Overlay with reduced opacity */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/40 via-indigo-900/35 to-primary-900/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto max-w-7xl px-8 py-24">
            <div className="text-center">
              {/* Badge */}
              <motion.div 
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-2 mb-6 border border-white/20"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <BookOpen className="w-5 h-5 text-white" />
                <span className="font-semibold text-sm tracking-wide drop-shadow-lg">برامج تعليمية متخصصة</span>
              </motion.div>

              {/* Title */}
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-2xl"
                style={{ 
                  textShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                الدورات التدريبية
              </motion.h1>

              {/* Description */}
              <motion.p 
                className="text-lg md:text-xl text-blue-50 dark:text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-lg"
                style={{ 
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.25)'
                }}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                اكتشف دوراتنا المتخصصة في المحاسبة والمراجعة الداخلية والإدارة المالية مع محتوى تعليمي احترافي ومعتمد
              </motion.p>

              {/* Statistics Grid */}
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-blue-600/30 rounded-lg">
                      <Users className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white drop-shadow-md">15,420+</div>
                  <div className="text-sm text-blue-50 dark:text-blue-100 font-medium drop-shadow-sm">طالب نشط</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-blue-600/30 rounded-lg">
                      <BookOpen className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white drop-shadow-md">15+</div>
                  <div className="text-sm text-blue-50 dark:text-blue-100 font-medium drop-shadow-sm">دورة متخصصة</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-blue-600/30 rounded-lg">
                      <Star className="w-6 h-6 text-yellow-300 dark:text-yellow-400 fill-yellow-300 dark:fill-yellow-400 drop-shadow-md" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white drop-shadow-md">4.8</div>
                  <div className="text-sm text-blue-50 dark:text-blue-100 font-medium drop-shadow-sm">متوسط التقييم</div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 shadow-lg">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-blue-600/30 rounded-lg">
                      <Award className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1 text-white drop-shadow-md">95%</div>
                  <div className="text-sm text-blue-50 dark:text-blue-100 font-medium drop-shadow-sm">معدل الرضا</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom Gradient Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-50 dark:from-blue-950 to-transparent"></div>
        </section>

        {/* Courses Content Section */}
        <section id="courses-section" className="container mx-auto max-w-7xl px-8 py-24">
          {/* Search and Filters Grid */}
          <div className="grid grid-cols-1 gap-y-8 mb-12">
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

            {/* Categories Filter - Simple & Light Design */}
            <div className="bg-white/60 dark:bg-neutral-800/60 backdrop-blur-sm rounded-lg border border-neutral-200/50 dark:border-neutral-700/50 p-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((cat, index) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <motion.button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={prefersReducedMotion ? { duration: 0 } : { delay: index * 0.03, duration: 0.15 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      className={`
                        inline-flex items-center gap-2 px-4 py-2 rounded-lg
                        text-sm font-medium
                        transition-all duration-150 ease-out
                        focus:outline-none focus:ring-2 focus:ring-primary-500/30
                        ${
                          isActive
                            ? 'bg-primary-600 text-white shadow-sm'
                            : 'bg-neutral-100 dark:bg-neutral-700/50 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                        }
                      `}
                      aria-label={`${cat.label} - ${cat.count} دورة`}
                      aria-pressed={isActive}
                    >
                      <span>{cat.label}</span>
                      <span className={`
                        px-2 py-0.5 rounded-full text-xs font-semibold
                        ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-white/60 dark:bg-neutral-600/60 text-neutral-600 dark:text-neutral-300'
                        }
                      `}>
                        {cat.count}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* View Controls & Sort */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm rounded-xl shadow-sm border border-neutral-200/50 dark:border-neutral-700/50">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`
                    px-4 py-2 rounded-md transition-all
                    ${viewMode === 'grid' 
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                      : 'text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }
                  `}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  aria-label="عرض الشبكة"
                  aria-pressed={viewMode === 'grid'}
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`
                    px-4 py-2 rounded-md transition-all
                    ${viewMode === 'list' 
                      ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                      : 'text-neutral-600 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100'
                    }
                  `}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  aria-label="عرض القائمة"
                  aria-pressed={viewMode === 'list'}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
              
              {/* Sort & Results */}
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-neutral-600 dark:text-neutral-500">
                  عرض <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredCourses.length}</span> دورة
                </div>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
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
            {/* Unified Grid View - All Courses in One Grid */}
            <div className={`grid gap-6 ${
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
                    className={`h-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 overflow-hidden flex ${
                      viewMode === 'list' ? 'flex-row' : 'flex-col'
                    } group/card`}
                  >
                    {/* Course Image */}
                    <div className={`relative overflow-hidden bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 ${
                      viewMode === 'list' ? 'w-64 h-48 flex-shrink-0' : 'h-48 w-full'
                    }`}>
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                      {course.level === 'مبتدئ' && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-block px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm bg-success-500/90 text-white">
                            {course.level}
                          </span>
                        </div>
                      )}
                    </div>

                    <CardContent className={`flex-1 flex flex-col ${viewMode === 'list' ? 'p-6' : 'p-4'}`}>
                      {/* Title */}
                      <h3 className={`font-bold text-neutral-900 dark:text-neutral-100 mb-2 group-hover/card:text-primary-600 dark:group-hover/card:text-primary-400 transition-colors ${
                        viewMode === 'list' ? 'text-xl mb-3' : 'text-base line-clamp-2'
                      }`}>
                        {course.title}
                      </h3>

                      {/* Description - List View Only */}
                      {viewMode === 'list' && (
                        <p className="text-neutral-600 dark:text-neutral-500 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                      )}

                      {/* Stats Row */}
                      <div className={`flex items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-500 ${
                        viewMode === 'list' ? 'mb-4' : 'mb-3'
                      }`}>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-warning-400 fill-current" />
                          <span className="font-semibold">{course.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{safeFormatNumber(course.students)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
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

                      {/* Price and StyledButtons */}
                      <div className={`space-y-3 mt-auto ${viewMode === 'list' ? 'flex flex-row items-center justify-between' : ''}`}>
                        <div className={`font-bold text-primary-600 dark:text-primary-400 ${viewMode === 'list' ? 'text-2xl' : 'text-lg text-center'}`}>
                          {course.price}
                        </div>
                        <Button
                          onClick={() => router.push(`/courses/${course.slug}`)}
                          className={`${viewMode === 'list' ? '' : 'w-full'}`}
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

