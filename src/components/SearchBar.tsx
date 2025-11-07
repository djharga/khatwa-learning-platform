'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  SlidersHorizontal,
  Loader2,
  History,
  Zap,
  Eye,
  BookOpen,
  TrendingUp,
  Users,
  Star
} from 'lucide-react';
import { Course, CourseFilters, CourseSortOptions, CourseCategory } from '@/types/course';
import { filterCourses, sortCourses } from '@/utils/courseUtils';
import { safeFormatNumber } from '@/lib/numberUtils';

interface SearchFilters {
  category: string;
  level: string;
  duration: string;
  rating: number;
  price: string;
  sortBy: 'relevance' | 'rating' | 'popular' | 'newest';
}

interface SearchBarProps {
  onSearch?: (query: string, filters: SearchFilters) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
  courses?: Course[];
}

const defaultFilters: SearchFilters = {
  category: '',
  level: '',
  duration: '',
  rating: 0,
  price: '',
  sortBy: 'relevance',
};

const trendingSuggestions = [
  'المراجعة الداخلية الأساسية',
  'زمالة المراجعين الداخليين',
  'إدارة المخاطر',
  'المعايير الدولية',
  'تحليل البيانات',
];

const popularSuggestions = [
  'المراجعة التشغيلية',
  'الحوكمة والامتثال',
  'أدوات المراجعة الحديثة',
  'التقارير المالية',
  'إدارة المشتريات',
];

const quickFilterOptions = [
  { key: 'courses', label: 'الكورسات', icon: BookOpen },
  { key: 'instructors', label: 'المدربين', icon: Users },
  { key: 'topics', label: 'المواضيع', icon: TrendingUp },
];

const SearchBar = ({
  onSearch,
  placeholder = "ابحث عن الكورسات، المراجعة الداخلية، الزمالة...",
  showFilters = true,
  className = "",
  courses = []
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [quickFilters, setQuickFilters] = useState<string[]>([]);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce Query
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard Shortcut (Ctrl+K)
  useEffect(() => {
    const cb = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', cb);
    return () => window.removeEventListener('keydown', cb);
  }, []);

  // Recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('recentSearches');
    if (stored) setRecentSearches(JSON.parse(stored));
  }, []);

  const saveRecentSearch = useCallback((search: string) => {
    if (!search.trim()) return;
    const updated = [search, ...recentSearches.filter(s => s !== search)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  }, [recentSearches]);

  // Suggestions
  const rawSuggestions = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return [
        ...recentSearches.map(text => ({ text, type: 'recent', icon: History })),
        ...trendingSuggestions.map(text => ({ text, type: 'trending', icon: TrendingUp })),
        ...popularSuggestions.map(text => ({ text, type: 'popular', icon: Zap }))
      ].slice(0, 8);
    }
    const searchTerm = debouncedQuery.trim().toLowerCase();
    const extra = courses.flatMap(c => [
      c.title,
      c.instructor?.name,
      ...(c.tags || [])
    ]).filter(Boolean) as string[];
    const all = [
      ...recentSearches,
      ...trendingSuggestions,
      ...popularSuggestions,
      ...extra
    ];
    return all
      .filter(s => s && s.toLowerCase().includes(searchTerm))
      .map(s => ({
        text: s,
        type: 'autocomplete' as const,
        icon: Search,
        highlight: s.toLowerCase().indexOf(searchTerm)
      }))
      .slice(0, 8);
  }, [debouncedQuery, recentSearches, courses]);

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!courses.length) return [];
    const courseFilters: CourseFilters = {
      search: debouncedQuery,
      category: filters.category as CourseCategory || undefined,
      level: filters.level as any || undefined,
      rating: filters.rating || undefined,
    };
    const sortOptions: CourseSortOptions = {
      field:
        filters.sortBy === 'rating' ? 'rating' :
        filters.sortBy === 'popular' ? 'students' :
        filters.sortBy === 'newest' ? 'createdAt' : 'title',
      direction: 'desc'
    };
    let results = filterCourses(courses, courseFilters);
    results = sortCourses(results, sortOptions);

    return results.slice(0, 6);
  }, [courses, debouncedQuery, filters]);

  // Helpers
  const updateFilter = (key: keyof SearchFilters, value: string|number) =>
    setFilters(prev => ({ ...prev, [key]: value }));

  const clearFilters = () => {
    setFilters(defaultFilters);
    setQuickFilters([]);
  };

  const clearSearch = () => {
    setQuery('');
    setDebouncedQuery('');
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
  };

  const toggleQuickFilter = (filter: string) => {
    setQuickFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    );
  };

  const activeFiltersCount =
    Object.values(filters).filter(
      v => v !== '' && v !== 'relevance' && v !== 0
    ).length + quickFilters.length;

  const highlightText = (text: string, highlight: number) => {
    if (highlight < 0) return text;
    const before = text.slice(0, highlight);
    const match = text.slice(highlight, highlight + debouncedQuery.length);
    const after = text.slice(highlight + debouncedQuery.length);
    return (
      <span>
        {before}
        <span className="bg-yellow-200 font-semibold">{match}</span>
        {after}
      </span>
    );
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || rawSuggestions.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedSuggestion(s =>
        s < rawSuggestions.length - 1 ? s + 1 : s
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedSuggestion(s => s > 0 ? s - 1 : -1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedSuggestion >= 0)
        handleSearch(rawSuggestions[selectedSuggestion].text);
      else
        handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedSuggestion(-1);
    }
  };

  // Main search
  const handleSearch = (searchQ?: string) => {
    const useQuery = searchQ !== undefined ? searchQ : debouncedQuery;
    setQuery(useQuery);
    setShowSuggestions(false);
    setSelectedSuggestion(-1);
    if (useQuery) saveRecentSearch(useQuery);
    if (onSearch) onSearch(useQuery, filters);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search bar */}
      <div className="relative">
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {isLoading
              ? <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
              : <Search className="h-5 w-5 text-gray-400" />
            }
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setShowSuggestions(true);
              setSelectedSuggestion(-1);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            placeholder={placeholder}
            className="block w-full pr-12 pl-12 py-4 text-right border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg bg-white shadow-sm hover:shadow-md focus:shadow-lg hover:border-blue-300"
            dir="rtl"
            aria-label="ابحث"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
          />
          {query && (
            <motion.button
              onClick={clearSearch}
              className="absolute left-12 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-4 w-4 text-gray-400" />
            </motion.button>
          )}
          {showFilters && (
            <motion.button
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className={`absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl transition-all duration-300 ${
                isFiltersOpen ? 'bg-blue-600 text-white shadow-lg'
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
            {quickFilters.map((f) => {
              const Icon = quickFilterOptions.find(q => q.key === f)?.icon;
              return (
                <motion.span key={f} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {Icon && <Icon className="h-4 w-4" />}
                  {quickFilterOptions.find(q => q.key === f)?.label}
                  <button onClick={() => toggleQuickFilter(f)} className="hover:bg-blue-200 rounded-full p-0.5">
                    <X className="h-3 w-3" />
                  </button>
                </motion.span>
              );
            })}
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

      {/* Suggestions */}
      <AnimatePresence>
        {showSuggestions && rawSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-80 overflow-y-auto"
          >
            <div className="p-3 border-b border-gray-100 flex gap-2">
              {quickFilterOptions.map(({ key, label, icon: Icon }) => (
                <motion.button
                  key={key}
                  onClick={() => toggleQuickFilter(key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${quickFilters.includes(key) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </motion.button>
              ))}
            </div>
            {rawSuggestions.map((suggestion, idx) => {
              const Icon = suggestion.icon;
              const isSelected = idx === selectedSuggestion;
              return (
                <motion.button
                  key={idx}
                  onClick={() => handleSearch(suggestion.text)}
                  className={`w-full text-right px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center gap-3 ${isSelected ? 'bg-blue-50' : ''}`}
                  whileHover={{ scale: 1.02 }}
                >
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-500' : 'text-gray-400'}`} />
                  <span className="text-gray-700 flex-1">
                    {'highlight' in suggestion
                      ? highlightText(suggestion.text, suggestion.highlight as number)
                      : suggestion.text}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    suggestion.type === 'recent' ? 'bg-gray-100 text-gray-600' :
                    suggestion.type === 'trending' ? 'bg-orange-100 text-orange-600' :
                    suggestion.type === 'popular' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {suggestion.type === 'recent' ? 'حديث'
                    : suggestion.type === 'trending' ? 'رائج'
                    : suggestion.type === 'popular' ? 'شائع'
                    : 'اقتراح'}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <AnimatePresence>
        {isFiltersOpen && showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-white border border-gray-200 rounded-2xl shadow-lg p-6"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* الفئة */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الفئة</label>
                <select
                  value={filters.category}
                  onChange={e => updateFilter('category', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع الفئات</option>
                  <option value="المراجعة الداخلية">المراجعة الداخلية</option>
                  <option value="الزمالة">الزمالة</option>
                  <option value="إدارة المخاطر">إدارة المخاطر</option>
                  <option value="المعايير الدولية">المعايير الدولية</option>
                </select>
              </div>
              {/* المستوى */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">المستوى</label>
                <select
                  value={filters.level}
                  onChange={e => updateFilter('level', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">جميع المستويات</option>
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>
              </div>
              {/* التقييم */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الحد الأدنى للتقييم</label>
                <select
                  value={filters.rating}
                  onChange={e => updateFilter('rating', Number(e.target.value))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>جميع التقييمات</option>
                  <option value={4}>4 نجوم فما فوق</option>
                  <option value={4.5}>4.5 نجمة فما فوق</option>
                  <option value={4.8}>4.8 نجمة فما فوق</option>
                </select>
              </div>
              {/* الترتيب */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">الترتيب حسب</label>
                <select
                  value={filters.sortBy}
                  onChange={e => updateFilter('sortBy', e.target.value as SearchFilters['sortBy'])}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="relevance">الأكثر صلة</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="popular">الأكثر شعبية</option>
                  <option value="newest">الأحدث</option>
                </select>
              </div>
            </div>
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

      {/* Results */}
      {debouncedQuery && filteredResults.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
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
            {filteredResults.map((course, idx) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
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
                        course.level === 'مبتدئ'
                          ? 'bg-green-100 text-green-800'
                          : course.level === 'متوسط'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{course.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {course.rating}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {safeFormatNumber(course.students)}
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد نتائج بحث</h3>
          <p className="text-gray-600">جرب كلمات بحث مختلفة أو عدل الفلاتر</p>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
