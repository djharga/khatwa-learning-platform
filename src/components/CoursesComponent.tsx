'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
} from 'lucide-react';
import CourseCard from './CourseCard';
import { Course, CourseCategory } from '@/types/course';
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { useCourseSort } from '@/hooks/useCourseSort';
import { useCoursePagination } from '@/hooks/useCoursePagination';
import { filterCourses, sortCourses, paginateCourses } from '@/utils/courseUtils';
import toast from 'react-hot-toast';

interface CoursesComponentState {
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  showFilters: boolean;
  localFilters: {
    accountingTypes: string[];
    standards: string[];
    auditTypes: string[];
  };
}

const CoursesComponent = () => {
  const [state, setState] = useState<CoursesComponentState>({
    isLoading: true,
    viewMode: 'grid',
    showFilters: false,
    localFilters: { accountingTypes: [], standards: [], auditTypes: [] },
  });

  const courses: Course[] = useMemo(
    () => [
      {
        id: '1',
        title: 'أساسيات المراجعة الداخلية وفق المعايير الدولية',
        description: 'دورة شاملة تغطي مبادئ المراجعة الداخلية وأفضل الممارسات',
        instructor: {
          id: '1',
          name: 'د. أحمد محمد',
          title: 'خبير مراجعة داخلية معتمد',
          avatar: '/avatars/instructor1.jpg',
          rating: 4.8,
          students: 1250,
          courses: 5,
          bio: 'خبير في مجال المراجعة الداخلية مع أكثر من 15 عاماً من الخبرة العملية',
        },
        level: 'متوسط',
        category: 'المراجعة الداخلية' as CourseCategory,
        duration: '6 أسابيع',
        students: 1250,
        rating: 4.8,
        reviewCount: 89,
        price: 499,
        originalPrice: 799,
        image: '/banar-cours.png',
        filesCount: 25,
        isOngoing: true,
        progress: 75,
        lastActivity: 'منذ يومين',
        createdAt: '2023-10-01',
        isFeatured: true,
        tags: ['مراجعة داخلية', 'معايير دولية', 'ضوابط رقابية'],
      },
      {
        id: '2',
        title: 'تطبيق معايير IFRS في القوائم المالية',
        description: 'شرح عملي لتطبيق المعايير الدولية لإعداد التقارير المالية',
        instructor: {
          id: '2',
          name: 'د. فاطمة علي',
          title: 'خبيرة معايير محاسبية',
          avatar: '/avatars/instructor2.jpg',
          rating: 4.9,
          students: 890,
          courses: 3,
          bio: 'خبيرة في المعايير المحاسبية الدولية مع خبرة في القطاع المصرفي',
        },
        level: 'متقدم',
        category: 'المعايير المحاسبية' as CourseCategory,
        duration: '8 أسابيع',
        students: 890,
        rating: 4.9,
        reviewCount: 67,
        price: 599,
        image: '/banar-cours.png',
        filesCount: 30,
        isOngoing: false,
        progress: 45,
        lastActivity: 'منذ أسبوع',
        createdAt: '2023-09-15',
        isPopular: true,
        tags: ['IFRS', 'تقارير مالية', 'معايير محاسبية'],
      },
    ],
    []
  );

  const { filters, updateFilters, resetFilters } = useCourseFilters();
  const { sort } = useCourseSort();
  const { pagination, goToPage, nextPage, prevPage } = useCoursePagination(courses.length, 6);

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = filterCourses(courses, filters);
    const sorted = sortCourses(filtered, sort);
    return paginateCourses(sorted, pagination.page, pagination.limit);
  }, [courses, filters, sort, pagination.page, pagination.limit]);

  const handleBookmark = useCallback(async (id: string) => {
    toast.success('تمت إضافة الدورة إلى المفضلة');
  }, []);

  const toggleViewMode = useCallback(() => {
    setState((p) => ({ ...p, viewMode: p.viewMode === 'grid' ? 'list' : 'grid' }));
  }, []);

  const toggleFilters = useCallback(() => {
    setState((p) => ({ ...p, showFilters: !p.showFilters }));
  }, []);

  const handleCheckboxChange = useCallback(
    (filterType: 'accountingTypes' | 'standards' | 'auditTypes', value: string) => {
      setState((prev) => {
        const values = prev.localFilters[filterType];
        const newValues = values.includes(value)
          ? values.filter((v) => v !== value)
          : [...values, value];
        return { ...prev, localFilters: { ...prev.localFilters, [filterType]: newValues } };
      });
    },
    []
  );

  const handleApplyFilters = useCallback(() => {
    updateFilters({
      tags: [
        ...state.localFilters.accountingTypes,
        ...state.localFilters.standards,
        ...state.localFilters.auditTypes,
      ],
    });
  }, [state.localFilters, updateFilters]);

  const handleResetFilters = useCallback(() => {
    setState((p) => ({ ...p, localFilters: { accountingTypes: [], standards: [], auditTypes: [] } }));
    resetFilters();
  }, [resetFilters]);

  useEffect(() => {
    const t = setTimeout(() => setState((p) => ({ ...p, isLoading: false })), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-gray-900 dark:text-gray-100">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              الدورات المحاسبية المتخصصة
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            اكتشف أفضل البرامج التدريبية التي تساعدك في تطوير مهاراتك المهنية في مجالات المحاسبة والمراجعة.
          </p>
        </motion.div>

        {/* شريط الأدوات */}
        <div className="bg-white/70 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm mb-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث عن دورة..."
                className="w-full py-3 pl-11 pr-4 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div className="flex items-center gap-2">
              {[{ mode: 'grid', icon: Grid }, { mode: 'list', icon: List }].map(({ mode, icon: Icon }) => (
                <motion.button
                  key={mode}
                  onClick={() => setState((p) => ({ ...p, viewMode: mode as 'grid' | 'list' }))}
                  className={`p-2.5 rounded-lg border transition-all duration-200 ${
                    state.viewMode === mode
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-neutral-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700'
                  }`}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}

              <motion.button
                onClick={toggleFilters}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all duration-200 ${
                  state.showFilters
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:bg-gray-100 dark:hover:bg-neutral-700'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                فلاتر
              </motion.button>
            </div>
          </div>

          {/* لوحة الفلاتر */}
          <AnimatePresence>
            {state.showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mt-5 p-5 bg-white dark:bg-neutral-900 rounded-xl border border-gray-200 dark:border-neutral-800 shadow-inner"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { title: 'نوع المحاسبة', key: 'accountingTypes', values: ['مالية', 'إدارية', 'حكومية', 'ضريبية'] },
                    { title: 'المعيار المحاسبي', key: 'standards', values: ['IFRS', 'GAAP', 'المحلية', 'الدولية'] },
                    { title: 'مجال المراجعة', key: 'auditTypes', values: ['داخلية', 'خارجية', 'حكومية', 'بنكية'] },
                  ].map(({ title, key, values }) => (
                    <div key={key}>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">{title}</h3>
                      <div className="space-y-2.5">
                        {values.map((v) => (
                          <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
                            <input
                              type="checkbox"
                              checked={state.localFilters[key as keyof typeof state.localFilters].includes(v)}
                              onChange={() => handleCheckboxChange(key as any, v)}
                              className="accent-blue-600 w-4 h-4 rounded focus:ring-1 focus:ring-blue-500"
                            />
                            <span className="text-gray-700 dark:text-gray-300">{v}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-3 pt-5 mt-4 border-t border-gray-200 dark:border-neutral-800">
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  >
                    إعادة تعيين
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="px-5 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    تطبيق
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* عرض الدورات */}
        <AnimatePresence mode="wait">
          {state.isLoading ? (
            <motion.div
              key="loader"
              className="flex flex-col items-center justify-center py-20 text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin mb-4" />
              جاري تحميل الدورات...
            </motion.div>
          ) : (
            <div className="relative">
              {/* Global Background Effect Layer */}
              <div className="course-page-bg-effect fixed inset-0 w-full h-full -z-0 pointer-events-none" />
              
              <motion.div
                key="courses"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={`relative z-10 ${state.viewMode === 'grid' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3 items-stretch' : 'space-y-5'}`}
              >
              {filteredAndSortedCourses.map((course, i) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={state.viewMode === 'grid' ? 'h-full' : ''}
                >
                  <CourseCard
                    course={course}
                    variant={state.viewMode === 'grid' ? 'default' : 'compact'}
                    onBookmark={() => handleBookmark(course.id)}
                  />
                </motion.div>
              ))}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CoursesComponent;
