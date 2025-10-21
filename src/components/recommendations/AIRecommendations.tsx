import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  Filter,
  TrendingUp,
  Clock,
  Star,
  BookOpen,
  Target,
  Sparkles,
  X,
} from 'lucide-react';
import { Course, CourseCategory, CourseLevel } from '../../types/course';
import { sampleCourses } from '../../types/course';
import CourseCard from '../CourseCard';

// Types for recommendations
/** AI-generated course recommendation with match percentage and reasoning */
interface Recommendation {
  course: Course;
  matchPercentage: number;
  reasons: string[];
  basedOn: string[];
}

/** Filter options for refining AI recommendations */
interface RecommendationFilters {
  category?: CourseCategory | 'الكل';
  level?: CourseLevel | 'الكل';
  duration?: string;
}

// Mock algorithm to generate recommendations
/** Generates AI-powered course recommendations based on user history. Currently uses mock algorithm - replace with actual AI/ML service in production. */
const generateRecommendations = (userHistory: string[] = []): Recommendation[] => {
  // TODO: Replace mock algorithm with actual AI/ML recommendation service
  // In a real app, this would call an API
  // For now, we'll simulate based on sample data
  
  const recommendations: Recommendation[] = sampleCourses.map(course => {
    // Simulate match score based on random factors
    const matchScore = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    const reasons = [
      'بناءً على دوراتك المكتملة',
      'مطابق لاهتماماتك',
      'شائع بين الطلاب المماثلين',
      'مستوى مناسب لتقدمك',
    ].slice(0, Math.floor(Math.random() * 3) + 1);
    
    const basedOn = [
      'تاريخ التصفح',
      'الدورات المكتملة',
      'التقييمات',
      'الاهتمامات',
    ].slice(0, Math.floor(Math.random() * 3) + 1);
    
    // TODO: Integrate with user behavior tracking and collaborative filtering
    return {
      course,
      matchPercentage: matchScore,
      reasons,
      basedOn,
    };
  });
  
  // Sort by match percentage
  return recommendations.sort((a, b) => b.matchPercentage - a.matchPercentage);
};

// Sub-components
/** Individual recommendation card displaying course with match percentage badge and recommendation reasons. Features CourseCard integration with additional AI reasoning display. */
const RecommendationCard: React.FC<{ recommendation: Recommendation; onEnroll: (courseId: string) => void }> = ({
  recommendation,
  onEnroll,
}) => {
  const { course, matchPercentage, reasons, basedOn } = recommendation;
  
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Match Percentage Badge */}
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          {matchPercentage}% مطابقة
        </div>
        <CourseCard
          course={course}
          variant="compact"
          onEnroll={onEnroll}
          className="border-0 shadow-none"
        />
      </div>
      
      {/* Recommendation Reasons */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">لماذا هذه التوصية؟</h4>
        </div>
        
        <div className="space-y-2">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 text-sm text-gray-700"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Target className="w-4 h-4 text-green-500 flex-shrink-0" />
              {reason}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2">بناءً على:</p>
          <div className="flex flex-wrap gap-1">
            {basedOn.map((item, index) => (
              <span
                key={index}
                className="bg-white px-2 py-1 rounded-full text-xs text-gray-700 border border-gray-200"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/** Filter controls for AI recommendations allowing filtering by category, level, and duration. Features dropdown panel with animated open/close. */
const RecommendationFilters: React.FC<{
  filters: RecommendationFilters;
  onFiltersChange: (filters: RecommendationFilters) => void;
}> = ({ filters, onFiltersChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const categories: (CourseCategory | 'الكل')[] = [
    'الكل',
    'المراجعة الداخلية',
    'المعايير المحاسبية',
    'برمجة',
    'تطوير الويب',
  ];
  
  const levels: (CourseLevel | 'الكل')[] = ['الكل', 'مبتدئ', 'متوسط', 'متقدم'];
  
  const durations = ['الكل', 'أقل من 4 أسابيع', '4-8 أسابيع', 'أكثر من 8 أسابيع'];
  
  return (
    <div className="relative">
      <motion.button
        className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
      >
        <Filter className="w-4 h-4" />
        <span className="text-sm font-medium">فلترة التوصيات</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.div>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 min-w-64"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">الفلاتر</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة
                </label>
                <select
                  value={filters.category || 'الكل'}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    category: e.target.value as CourseCategory | 'الكل'
                  })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              {/* Level Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المستوى
                </label>
                <select
                  value={filters.level || 'الكل'}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    level: e.target.value as CourseLevel | 'الكل'
                  })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              {/* Duration Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المدة
                </label>
                <select
                  value={filters.duration || 'الكل'}
                  onChange={(e) => onFiltersChange({
                    ...filters,
                    duration: e.target.value
                  })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {durations.map(duration => (
                    <option key={duration} value={duration}>{duration}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Carousel component for displaying recommendations with navigation arrows, auto-play, and indicators. Shows 3 items at a time on desktop. */
const RecommendationCarousel: React.FC<{
  recommendations: Recommendation[];
  onEnroll: (courseId: string) => void;
}> = ({ recommendations, onEnroll }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const visibleItems = 3; // Show 3 items at a time on desktop
  
  useEffect(() => {
    if (!isAutoPlaying) return;

    // Auto-advance carousel every 5 seconds when enabled
    const interval = setInterval(() => {
      setCurrentIndex(prev =>
        prev >= recommendations.length - visibleItems ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, recommendations.length, visibleItems]);
  
  const nextSlide = () => {
    setCurrentIndex(prev => 
      prev >= recommendations.length - visibleItems ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    setCurrentIndex(prev => prev <= 0 ? recommendations.length - visibleItems : prev - 1);
  };
  
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">لا توجد توصيات متاحة حالياً</p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
        disabled={currentIndex === 0}
      >
        <ChevronLeft className="w-5 h-5 text-gray-700" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-200"
        disabled={currentIndex >= recommendations.length - visibleItems}
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
      
      {/* Carousel Container */}
      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: -currentIndex * (100 / visibleItems) + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {recommendations.map((rec, index) => (
            <div key={rec.course.id} className="flex-shrink-0 w-1/3">
              <RecommendationCard
                recommendation={rec}
                onEnroll={onEnroll}
              />
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: Math.ceil(recommendations.length / visibleItems) }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i * visibleItems)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              Math.floor(currentIndex / visibleItems) === i
                ? 'bg-blue-600 w-6'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      
      {/* Auto-play Toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            isAutoPlaying
              ? 'bg-blue-100 text-blue-700'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {isAutoPlaying ? 'إيقاف التشغيل التلقائي' : 'تشغيل تلقائي'}
        </button>
      </div>
    </div>
  );
};

/** Main AI recommendations component displaying personalized course suggestions based on user history. Features filtering, carousel navigation, and enrollment integration. */
const AIRecommendations: React.FC<{
  userHistory?: string[];
  onEnroll?: (courseId: string) => void;
}> = ({ userHistory = [], onEnroll }) => {
  const [filters, setFilters] = useState<RecommendationFilters>({});

  // Generate AI recommendations based on user history (mock algorithm)
  const allRecommendations = useMemo(() => generateRecommendations(userHistory), [userHistory]);

  // Apply user-selected filters to recommendations
  const filteredRecommendations = useMemo(() => {
    return allRecommendations.filter(rec => {
      const { course } = rec;
      
      if (filters.category && filters.category !== 'الكل' && course.category !== filters.category) {
        return false;
      }
      
      if (filters.level && filters.level !== 'الكل' && course.level !== filters.level) {
        return false;
      }
      
      if (filters.duration && filters.duration !== 'الكل') {
        const durationWeeks = parseInt(course.duration.split(' ')[0]);
        switch (filters.duration) {
          case 'أقل من 4 أسابيع':
            if (durationWeeks >= 4) return false;
            break;
          case '4-8 أسابيع':
            if (durationWeeks < 4 || durationWeeks > 8) return false;
            break;
          case 'أكثر من 8 أسابيع':
            if (durationWeeks <= 8) return false;
            break;
        }
      }
      
      return true;
    });
  }, [allRecommendations, filters]);
  
  const handleEnroll = (courseId: string) => {
    onEnroll?.(courseId);
  };
  
  return (
    <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              توصيات ذكية لك
            </h2>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            بناءً على نشاطك واهتماماتك، إليك أفضل الدورات الموصى بها لتطوير مهاراتك
          </p>
        </motion.div>
        
        {/* Filters */}
        <div className="flex justify-center mb-8">
          <RecommendationFilters
            filters={filters}
            onFiltersChange={setFilters}
          />
        </div>
        
        {/* Carousel */}
        <RecommendationCarousel
          recommendations={filteredRecommendations}
          onEnroll={handleEnroll}
        />
        
        {/* Stats */}
        <motion.div
          className="text-center mt-8 text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          عرض {filteredRecommendations.length} من {allRecommendations.length} توصية
        </motion.div>
      </div>
    </div>
  );
};

export default AIRecommendations;
