'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  Clock,
  Star,
  BookOpen,
  Users,
  TrendingUp,
  ChevronDown,
  SlidersHorizontal,
  Loader2,
  History,
  Zap,
  Eye,
} from 'lucide-react';
import { Course, CourseFilters, CourseSortOptions } from '@/types/course';
import { fuzzySearchCourses, filterCourses, sortCourses } from '@/utils/courseUtils';

interface SearchFilters {
  category: string;
  level: string;
  duration: string;
  rating: number;
  price: string;
  sortBy: 'relevance' | 'rating' | 'popular' | 'newest';
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  rating: number;
  students: number;
  price: number;
  image: string;
  tags: string[];
}

interface SearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
  courses?: Course[];
}

const SearchBar = ({
  onSearch,
  placeholder = "ابحث عن الكورسات، المراجعة الداخلية، الزمالة...",
  showFilters = true,
  className = "",
  courses = []
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    category: '',
    level: '',
    duration: '',
    rating: 0,
    price: '',
    sortBy: 'relevance',
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, 300);
    setIsLoading(true);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) {
      setRecentSearches(JSON.parse(stored));
    }
  }, []);

  // Save recent search
  const saveRecentSearch = useCallback((search: string) => {
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  // Trending suggestions
  const trendingSuggestions = [
    'المراجعة الداخلية الأساسية',
    'زمالة المراجعين الداخليين',
    'إدارة المخاطر',
    'المعايير الدولية',
    'تحليل البيانات',
  ];

  // Popular suggestions
  const popularSuggestions = [
    'المراجعة التشغيلية',
    'الحوكمة والامتثال',
    'أدوات المراجعة الحديثة',
    'التقارير المالية',
    'إدارة المشتريات',
  ];

  // Quick filter options
  const quickFilterOptions = [
    { key: 'courses', label: 'الكورسات', icon: BookOpen },
    { key: 'instructors', label: 'المدربين', icon: Users },
    { key: 'topics', label: 'المواضيع', icon: TrendingUp },
  ];

  // Auto-complete suggestions
  const autoCompleteSuggestions = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [
        ...recentSearches.map(s => ({ text: s, type: 'recent', icon: History })),
        ...trendingSuggestions.map(s => ({ text: s, type: 'trending', icon: TrendingUp })),
        ...popularSuggestions.map(s => ({ text: s, type: 'popular', icon: Zap })),
      ].slice(0, 8);
    }

    const searchTerm = debouncedQuery.toLowerCase();
    const allSuggestions = [
      ...recentSearches,
      ...trendingSuggestions,
      ...popularSuggestions,
      ...courses.flatMap(course => [
        course.title,
        course.instructor.name,
        ...(course.tags || []),
      ]),
    ];

    return allSuggestions
      .filter(suggestion => suggestion.toLowerCase().includes(searchTerm))
      .map(suggestion => ({
        text: suggestion,
        type: 'autocomplete',
        icon: Search,
        highlight: suggestion.toLowerCase().indexOf(searchTerm),
      }))
      .slice(0, 8);
  }, [debouncedQuery, recentSearches, courses]);

  // Filtered results using course utilities
  const filteredResults = useMemo(() => {
    if (!courses.length) return [];

    let courseFilters: CourseFilters = {
      search: debouncedQuery,
      category: filters.category || undefined,
      level: filters.level as any || undefined,
      rating: filters.rating || undefined,
    };

    let sortOptions: CourseSortOptions = {
      field: filters.sortBy === 'rating' ? 'rating' :
             filters.sortBy === 'popular' ? 'students' :
             filters.sortBy === 'newest' ? 'createdAt' : 'title',
      direction: 'desc',
    };

    let results = filterCourses(courses, courseFilters);
    results = sortCourses(results, sortOptions);

    return results.slice(0, 6); // Preview first 6 results
  }, [courses, debouncedQuery, filters]);

  // Handle search
  const handleSearch = useCallback((searchQuery: string = debouncedQuery) => {
    setQuery(searchQuery);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
    saveRecentSearch(searchQuery);
    if (onSearch) {
      onSearch(searchQuery, filters);
    }
  }, [debouncedQuery, filters, onSearch, saveRecentSearch]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || autoCompleteSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>
          prev < autoCompleteSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSearch(autoCompleteSuggestions[selectedSuggestionIndex].text);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Update filters
  const updateFilter = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Clear filters
  const clearFilters = () => {
    setFilters({
      category: '',
      level: '',
      duration: '',
      rating: 0,
      price: '',
      sortBy: 'relevance',
    });
    setQuickFilters([]);
  };

  // Toggle quick filter
  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev =>
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Active filters count
  const activeFiltersCount = Object.values(filters).filter(value =>
    value !== '' && value !== 'relevance' && value !== 0
  ).length + quickFilters.length;

  // Highlight text
  const highlightText = (text: string, highlight: number) => {
    if (highlight < 0) return text;
    const before = text.slice(0, highlight);
    const match = text.slice(highlight, highlight + debouncedQuery.length);
    const after = text.slice(highlight + debouncedQuery.length);
    return (
      <>
        {before}
        <span className="bg-yellow-200 font-semibold">{match}</span>
        {after}
      </>
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search bar */}
      <div className="relative">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isLoading ? (
              <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
            ) : (
              <Search className="h-5 w-5 text-gray-400" />
            )}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setSelectedSuggestionIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            className="block w-full pr-12 pl-12 py-4 text-right border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-sm hover:shadow-md focus:shadow-lg"
            dir="rtl"
          />

          {/* Clear button */}
          {query && (
            <motion.button
              onClick={clearSearch}
              className="absolute left-12 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4 text-gray-400" />
            </motion.button>
          )}

          {/* Filters button */}
          {showFilters && (
            <motion.button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`absolute left-2 top-1/2 transform -translate-y-1/2 px-3 py-2 rounded-xl transition-all duration-300 ${
                isFiltersOpen
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <SlidersHorizontal className="h-5 w-5" />
              {activeFiltersCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          )}
        </motion.div>

        {/* Keyboard shortcut hint */}
        <div className="absolute -bottom-6 left-0 text-xs text-gray-400">
          اضغط Ctrl+K للبحث السريع
        </div>
      </div>

      {/* Quick filters */}
      <AnimatePresence>
        {quickFilters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {quickFilters.map((filter) => (
              <motion.span
                key={filter}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {quickFilterOptions.find(opt => opt.key === filter)?.label}
                <button
                  onClick={() => toggleQuickFilter(filter)}
                  className="hover:bg-blue-200 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
            <motion.button
              onClick={() => setQuickFilters([])}
              className="text-sm text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.05 }}
            >
              مسح الكل
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Suggestions dropdown */}
      <AnimatePresence>
        {showSuggestions && autoCompleteSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            {/* Quick filter buttons */}
            <div className="p-3 border-b border-gray-100">
              <div className="flex gap-2">
                {quickFilterOptions.map(({ key, label, icon: Icon }) => (
                  <motion.button
                    key={key}
                    onClick={() => toggleQuickFilter(key)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      quickFilters.includes(key)
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Suggestions */}
            <div>
              {autoCompleteSuggestions.map((suggestion, index) => {
                const Icon = suggestion.icon;
                const isSelected = index === selectedSuggestionIndex;
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSearch(suggestion.text)}
                    className={`w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${
                      isSelected ? 'bg-blue-50' : ''
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
                    <span className="text-gray-700 flex-1">
                      {'highlight' in suggestion
                        ? highlightText(suggestion.text, suggestion.highlight)
                        : suggestion.text
                      }
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      suggestion.type === 'recent' ? 'bg-gray-100 text-gray-600' :
                      suggestion.type === 'trending' ? 'bg-orange-100 text-orange-600' :
                      suggestion.type === 'popular' ? 'bg-green-100 text-green-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {suggestion.type === 'recent' ? 'حديث' :
                       suggestion.type === 'trending' ? 'رائج' :
                       suggestion.type === 'popular' ? 'شائع' : 'اقتراح'}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters panel */}
      <AnimatePresence>
        {isFiltersOpen && showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الفئة
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع الفئات</option>
                  <option value="المراجعة الداخلية">المراجعة الداخلية</option>
                  <option value="الزمالة">الزمالة</option>
                  <option value="إدارة المخاطر">إدارة المخاطر</option>
                  <option value="المعايير الدولية">المعايير الدولية</option>
                </select>
              </div>

              {/* Level */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  المستوى
                </label>
                <select
                  value={filters.level}
                  onChange={(e) => updateFilter('level', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع المستويات</option>
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الحد الأدنى للتقييم
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => updateFilter('rating', Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>جميع التقييمات</option>
                  <option value={4}>4 نجوم فما فوق</option>
                  <option value={4.5}>4.5 نجمة فما فوق</option>
                  <option value={4.8}>4.8 نجمة فما فوق</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الترتيب حسب
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => updateFilter('sortBy', e.target.value as SearchFilters['sortBy'])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="relevance">الأكثر صلة</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="popular">الأكثر شعبية</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>
            </div>

            {/* Filter controls */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={clearFilters}
                className="text-gray-600 hover:text-gray-800 text-sm font-medium flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                مسح الفلاتر
              </button>

              <div className="flex gap-3">
                <motion.button
                  onClick={() => setIsFiltersOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  إلغاء
                </motion.button>
                <motion.button
                  onClick={() => {
                    handleSearch();
                    setIsFiltersOpen(false);
                  }}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                  whileHover={{ scale: 1.05 }}
                >
                  تطبيق الفلاتر
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search results preview */}
      {debouncedQuery && filteredResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">
              نتائج البحث ({filteredResults.length})
            </h3>
            <motion.button
              onClick={() => handleSearch()}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Eye className="h-4 w-4" />
              عرض الكل
            </motion.button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {filteredResults.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.02, y: -2 }}
                onClick={() => handleSearch(course.title)}
              >
                <div className="flex gap-4">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium">
                        {course.category}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        course.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                        course.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">
                      {course.title}
                    </h4>

                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {course.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.students.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* No results */}
      {debouncedQuery && filteredResults.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center py-12"
        >
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد نتائج بحث
          </h3>
          <p className="text-gray-600">
            جرب كلمات بحث مختلفة أو قم بتعديل الفلاتر
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
