'use client';
import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, SlidersHorizontal, Loader2, History, Zap, Eye,
  BookOpen, TrendingUp, Users, Star
} from 'lucide-react';
import { safeFormatNumber } from '@/lib/numberUtils';
import { Course, CourseFilters, CourseCategory, CourseSortOptions } from '@/types/course';
import { sortCourses, filterCourses } from '@/utils/courseUtils';

const SUGGESTIONS = {
  trending: ['المراجعة الداخلية الأساسية', 'زمالة المراجعين الداخليين', 'إدارة المخاطر', 'المعايير الدولية', 'تحليل البيانات'],
  popular: ['المراجعة التشغيلية', 'الحوكمة والامتثال', 'أدوات المراجعة الحديثة', 'التقارير المالية', 'إدارة المشتريات'],
};
const QUICK_FILTERS = [
  { key: 'courses', label: 'الكورسات', icon: BookOpen },
  { key: 'instructors', label: 'المدربين', icon: Users },
  { key: 'topics', label: 'المواضيع', icon: TrendingUp },
];

const SearchBar = ({
  onSearch,
  placeholder = 'ابحث عن الكورسات...',
  showFilters = true,
  className = '',
  courses = [],
}: {
  onSearch?: (q: string, f: any) => void;
  placeholder?: string;
  showFilters?: boolean;
  className?: string;
  courses?: Course[];
}) => {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({ category: '', level: '', rating: 0, sortBy: 'relevance' });
  const [quick, setQuick] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [debounced, setDebounced] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => (setDebounced(query), setLoading(false)), 300);
    return () => clearTimeout(t);
  }, [query]);

  // Ctrl+K shortcut
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') e.preventDefault(), inputRef.current?.focus();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  // Load recent from storage
  useEffect(() => setRecent(JSON.parse(localStorage.getItem('recentSearches') || '[]')), []);

  const saveRecent = (s: string) => {
    if (!s.trim()) return;
    const updated = [s, ...recent.filter(r => r !== s)].slice(0, 5);
    setRecent(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  // Suggestions
  const suggestions = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    if (!q)
      return [
        ...recent.map(t => ({ text: t, type: 'recent', icon: History })),
        ...SUGGESTIONS.trending.map(t => ({ text: t, type: 'trending', icon: TrendingUp })),
        ...SUGGESTIONS.popular.map(t => ({ text: t, type: 'popular', icon: Zap })),
      ];
    const all = [...recent, ...SUGGESTIONS.trending, ...SUGGESTIONS.popular, ...courses.flatMap(c => [c.title, c.instructor?.name, ...(c.tags || [])])];
    return all
      .filter(s => s?.toLowerCase().includes(q))
      .map(s => ({ text: s!, type: 'match', icon: Search, index: s!.toLowerCase().indexOf(q) }))
      .slice(0, 8);
  }, [debounced, recent, courses]);

  const filtered = useMemo(() => {
    if (!courses.length) return [];
    const f: CourseFilters = { search: debounced, category: filters.category as CourseCategory, level: filters.level as any, rating: filters.rating };
    const s: CourseSortOptions = {
      field: filters.sortBy === 'rating' ? 'rating' : filters.sortBy === 'popular' ? 'students' : filters.sortBy === 'newest' ? 'createdAt' : 'title',
      direction: 'desc',
    };
    return sortCourses(filterCourses(courses, f), s).slice(0, 6);
  }, [debounced, filters, courses]);

  const search = (val?: string) => {
    const q = val ?? debounced;
    setQuery(q);
    setShow(false);
    if (q) saveRecent(q);
    onSearch?.(q, filters);
  };

  const clear = () => (setQuery(''), setDebounced(''), setShow(false), setSelected(-1));

  const highlight = (text: string, i: number) =>
    i < 0 ? text : (
      <>
        {text.slice(0, i)}
        <b className="bg-yellow-200">{text.slice(i, i + debounced.length)}</b>
        {text.slice(i + debounced.length)}
      </>
    );

  return (
    <div className={`relative ${className}`}>
      {/* Input */}
      <div className="relative">
        <input
          ref={inputRef}
          value={query}
          onChange={e => (setQuery(e.target.value), setShow(true))}
          onFocus={() => setShow(true)}
          onBlur={() => setTimeout(() => setShow(false), 100)}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') setSelected(s => Math.min(s + 1, suggestions.length - 1));
            if (e.key === 'ArrowUp') setSelected(s => Math.max(s - 1, -1));
            if (e.key === 'Enter') search(selected >= 0 ? suggestions[selected].text : query);
            if (e.key === 'Escape') clear();
          }}
          placeholder={placeholder}
          className="block w-full pr-12 pl-12 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">{loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5 text-gray-400" />}</div>
        {query && <button onClick={clear} className="absolute left-12 top-1/2 -translate-y-1/2"><X className="h-4 w-4 text-gray-400" /></button>}
        {showFilters && (
          <button onClick={() => setIsOpen(!isOpen)} className={`absolute left-2 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl ${isOpen ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            <SlidersHorizontal className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      <AnimatePresence>
        {show && suggestions.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute mt-2 bg-white border rounded-2xl shadow-lg w-full z-50 max-h-80 overflow-y-auto">
            {suggestions.map((s, i) => {
              const Icon = s.icon;
              return (
                <button
                  key={i}
                  onClick={() => search(s.text)}
                  className={`flex items-center gap-3 w-full text-right p-3 ${i === selected ? 'bg-blue-50' : ''}`}
                >
                  <Icon
                    className={`h-4 w-4 ${i === selected ? 'text-blue-500' : 'text-gray-400'}`}
                  />
                  <span className="flex-1 text-gray-700">
                    {highlight(s.text, (s as any).index ?? -1)}
                  </span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      {debounced && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
          {filtered.length ? (
            <>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold">نتائج ({filtered.length})</h3>
                <button onClick={() => search()} className="text-blue-600 flex items-center gap-2 text-sm">
                  <Eye className="w-4 h-4" /> عرض الكل
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {filtered.map((c, i) => (
                  <motion.div key={c.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="p-4 border rounded-xl hover:shadow-md cursor-pointer" onClick={() => search(c.title)}>
                    <div className="flex gap-3">
                      <img src={c.image} alt={c.title} className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1">
                        <div className="flex gap-2 text-xs mb-1">
                          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded">{c.category}</span>
                          <span className={`px-2 py-0.5 rounded ${c.level === 'مبتدئ' ? 'bg-green-100 text-green-800' : c.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{c.level}</span>
                        </div>
                        <div className="font-semibold text-sm mb-1 line-clamp-2">{c.title}</div>
                        <div className="flex gap-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1"><Star className="w-3 h-3 text-yellow-500" />{c.rating}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{safeFormatNumber(c.students)}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-14 h-14 text-gray-300 mx-auto mb-3" />
              <p>لا توجد نتائج</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
