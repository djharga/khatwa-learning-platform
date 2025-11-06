'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Grid3x3, List, ChevronDown, ChevronRight, BookOpen, Clock, Users, Star, Link, GraduationCap, Shield, Building, Award, Calculator, Warehouse, TrendingUp, Download, Play, FileText, Video, Headphones, CheckCircle, ArrowLeft, Share2, Heart, Sparkles, Target, Grid, Crown } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import StyledButton from '@/components/ui/StyledButton';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';
import { 
  getAllCourses, 
  getCategoriesWithCount, 
  searchCourses, 
  sortCourses,
  type Course 
} from '@/data/courses/all-courses';

export default function CoursesPage() {
  const router = useRouter();

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
    
    // فلترة حسب التصنيف
    if (selectedCategory !== 'all') {
      courses = courses.filter(course => course.category === selectedCategory);
    }
    
    // البحث
    if (searchQuery.trim()) {
      courses = searchCourses(searchQuery).filter(course => 
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative">
      {/* Page-specific background removed since it's now in layout */}
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-800 via-indigo-900 to-blue-950 text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/Professional educational platform hero banner.png"
            alt="الدورات التدريبية"
            fill
            priority
            quality={90}
            className="object-cover"
            style={{ objectPosition: 'center' }}
          />
          {/* Simple Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-indigo-900/80 to-blue-900/85"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-5 py-2 mb-6 border border-white/20">
              <BookOpen className="w-5 h-5 text-white" />
              <span className="font-semibold text-sm tracking-wide">برامج تعليمية متخصصة</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              الدورات التدريبية
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto mb-12 leading-relaxed">
              اكتشف دوراتنا المتخصصة في المحاسبة والمراجعة الداخلية والإدارة المالية مع محتوى تعليمي احترافي ومعتمد
            </p>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-10">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-blue-600/30 rounded-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">15,420+</div>
                <div className="text-sm text-blue-100 font-medium">طالب نشط</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-blue-600/30 rounded-lg">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">15+</div>
                <div className="text-sm text-blue-100 font-medium">دورة متخصصة</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-blue-600/30 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">4.8</div>
                <div className="text-sm text-blue-100 font-medium">متوسط التقييم</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <div className="p-2 bg-blue-600/30 rounded-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">95%</div>
                <div className="text-sm text-blue-100 font-medium">معدل الرضا</div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex items-center justify-center gap-2 text-blue-200 text-sm">
              <span>استكشف الدورات</span>
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Bottom Gradient Transition */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>


      <div id="courses-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* CIA Fellowship Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden border border-white/20">
            <div className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                    <Crown className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-right">
                  <h2 className="text-3xl font-bold text-white mb-2">زمالة المدقق الداخلي (CIA)</h2>
                  <p className="text-blue-100 text-lg mb-4">
                    برنامج متخصص شامل للمراجعة الداخلية عبر ثلاثة مستويات مع محاور تعليمية مفصلة
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-blue-100">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      <span>3 مستويات تعليمية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      <span>ملفات متعددة (Word, Excel, Video, Podcast)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      <span>بنك أسئلة شامل</span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <motion.button
                    onClick={() => router.push('/cia')}
                    className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-3 group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>ابدأ رحلة الزمالة</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters Bar */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-700 delay-200">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative w-full group">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 dark:text-neutral-500 group-focus-within:text-primary-500 transition-colors duration-300" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-12 pl-6 py-4 border border-neutral-200/60 dark:border-neutral-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500/40 bg-neutral-50/50 dark:bg-neutral-800/50 backdrop-blur-sm transition-all duration-300 text-neutral-700 dark:text-neutral-300 placeholder-neutral-400 dark:placeholder-neutral-500"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>

          </div>
        </div>

        {/* Modern Tabs Navigation */}
        <div className="mb-8">
          <div className="max-w-7xl mx-auto px-4">
            <ModernTabs
              tabs={categories.map((cat) => ({
                id: cat.id,
                label: cat.label,
                count: cat.count > 0 ? cat.count : undefined,
              }))}
              activeTab={selectedCategory}
              onChange={setSelectedCategory}
              variant="underline"
              size="lg"
              fullWidth={false}
              className="bg-transparent border-0 shadow-none p-0"
            />
          </div>
        </div>

        {/* View Controls & Sort - NEW */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 p-4 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg p-1">
            <motion.button
              onClick={() => setViewMode('grid')}
              className={`
                px-4 py-2 rounded-md transition-all
                ${viewMode === 'grid' 
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Grid className="w-5 h-5" />
            </motion.button>
            <motion.button
              onClick={() => setViewMode('list')}
              className={`
                px-4 py-2 rounded-md transition-all
                ${viewMode === 'list' 
                  ? 'bg-white dark:bg-neutral-700 text-primary-600 dark:text-primary-400 shadow-sm' 
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
          
          {/* Sort & Results */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              عرض <span className="font-bold text-neutral-900 dark:text-neutral-100">{filteredCourses.length}</span> دورة
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              <option value="popular">الأكثر شعبية</option>
              <option value="rating">الأعلى تقييماً</option>
              <option value="newest">الأحدث</option>
              <option value="price-low">الأقل سعراً</option>
              <option value="price-high">الأعلى سعراً</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <main>
            {/* Grid View - Horizontal Cards */}
            <div className="space-y-12">
              {/* Group courses by category */}
              {categories.filter(cat => cat.id !== 'all').map((category) => {
                const categoryCourses = filteredCourses.filter(course => course.category === category.id);
                if (categoryCourses.length === 0) return null;
                
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-8 flex items-center gap-3">
                      <div className="w-1 h-8 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>
                      {category.label}
                    </h2>
                    
                    <div className={`grid gap-6 ${
                      viewMode === 'grid' 
                        ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                        : 'grid-cols-1'
                    }`}>
                      {categoryCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08, duration: 0.4 }}
                          viewport={{ once: true }}
                          className="group"
                        >
                          <Card className={`h-full hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-neutral-200/80 dark:border-neutral-700/80 bg-white dark:bg-neutral-900 overflow-hidden flex ${
                            viewMode === 'list' ? 'flex-row' : 'flex-col'
                          } group/card rounded-xl`}>
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
                              <div className="absolute top-3 right-3">
                                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full shadow-lg backdrop-blur-sm ${
                                  course.level === 'مبتدئ' ? 'bg-success-500/90 text-white' :
                                  course.level === 'متوسط' ? 'bg-primary-500/90 text-white' :
                                  'bg-secondary-innovate-500/90 text-white'
                                }`}>
                                  {course.level}
                                </span>
                              </div>
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
                                <p className="text-neutral-600 dark:text-neutral-400 mb-4 line-clamp-2">
                                  {course.description}
                                </p>
                              )}

                              {/* Stats Row */}
                              <div className={`flex items-center gap-4 mb-4 text-sm text-neutral-600 dark:text-neutral-400 ${
                                viewMode === 'list' ? 'mb-4' : 'mb-3'
                              }`}>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-warning-400 fill-current" />
                                  <span className="font-semibold">{course.rating}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="w-4 h-4" />
                                  <span>{course.students.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-4 h-4" />
                                  <span>{course.duration}</span>
                                </div>
                              </div>

                              {/* Content Files Info */}
                              <div className={`flex items-center gap-4 mb-4 text-xs text-neutral-500 dark:text-neutral-500 ${
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
                                <div className={`font-bold text-primary ${viewMode === 'list' ? 'text-2xl' : 'text-lg text-center'}`}>
                                  {course.price}
                                </div>
                                <motion.button
                                  onClick={() => router.push(course.pageUrl)}
                                  className={`group/btn relative inline-flex items-center justify-center bg-gradient-to-r from-primary-600 to-secondary-innovate-600 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 ${
                                    viewMode === 'list' ? 'px-6 py-3 text-base' : 'w-full px-4 py-2.5 text-sm'
                                  }`}
                                  whileHover={{ scale: 1.02 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  <span className="relative flex items-center gap-2">
                                    <span>ابدأ الآن</span>
                                    <ChevronRight className={`${viewMode === 'list' ? 'w-5 h-5' : 'w-4 h-4'}`} />
                                  </span>
                                </motion.button>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-neutral-600 dark:text-neutral-400 text-lg">لم يتم العثور على دورات مطابقة</p>
                <StyledButton
                  variant="secondary"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                  }}
                >
                  إعادة تعيين الفلاتر
                </StyledButton>
              </div>
            )}
          </main>
      </div>
    </div>
  );
}
