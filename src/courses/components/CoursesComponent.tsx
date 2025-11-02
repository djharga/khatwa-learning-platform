'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Grid,
  List,
  Star,
} from 'lucide-react';
import CourseCard from './CourseCard';
import { Course, CourseCategory } from '@/types/course';
import { useCourseFilters } from '@/hooks/useCourseFilters';
import { useCourseSort } from '@/hooks/useCourseSort';
import { useCoursePagination } from '@/hooks/useCoursePagination';
import {
  filterCourses,
  sortCourses,
  paginateCourses,
} from '@/utils/courseUtils';
import toast from 'react-hot-toast';

interface CoursesComponentState {
  isLoading: boolean;
  error: string | null;
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
    error: null,
    viewMode: 'grid',
    showFilters: false,
    localFilters: {
      accountingTypes: [],
      standards: [],
      auditTypes: []
    }
  });

  // بيانات الكورسات المتخصصة
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

  // Hooks for filters, sort, and pagination
  const { filters, updateFilters, resetFilters } = useCourseFilters();
  const { sort, updateSort } = useCourseSort();
  const { pagination, goToPage, nextPage, prevPage } = useCoursePagination(
    courses.length,
    6
  );

  // Memoized filtered and sorted courses
  const filteredAndSortedCourses = useMemo(() => {
    const filtered = filterCourses(courses, filters);
    const sorted = sortCourses(filtered, sort);
    return paginateCourses(sorted, pagination.page, pagination.limit);
  }, [courses, filters, sort, pagination.page, pagination.limit]);

  // Event handlers
  const handleBookmark = useCallback(async (courseId: string) => {
    toast.success('تم إضافة الدورة إلى المفضلة');
  }, []);

  const toggleViewMode = useCallback(() => {
    setState((prev) => ({
      ...prev,
      viewMode: prev.viewMode === 'grid' ? 'list' : 'grid',
    }));
  }, []);

  const toggleFilters = useCallback(() => {
    setState((prev) => ({
      ...prev,
      showFilters: !prev.showFilters,
    }));
  }, []);

  const handleCheckboxChange = useCallback((filterType: 'accountingTypes' | 'standards' | 'auditTypes', value: string) => {
    setState(prev => {
      const currentValues = prev.localFilters[filterType];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      return { ...prev, localFilters: { ...prev.localFilters, [filterType]: newValues } };
    });
  }, []);

  const handleApplyFilters = useCallback(() => {
    updateFilters({
      tags: [...state.localFilters.accountingTypes, ...state.localFilters.standards, ...state.localFilters.auditTypes]
    });
  }, [state.localFilters, updateFilters]);

  const handleResetFilters = useCallback(() => {
    setState(prev => ({ ...prev, localFilters: { accountingTypes: [], standards: [], auditTypes: [] } }));
    resetFilters();
  }, [resetFilters]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => ({ ...prev, isLoading: false }));
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان والوصف */}
        <motion.div
          className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100 mb-8 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              دوراتنا المتخصصة
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-6">
            اكتشف دوراتنا المتخصصة في المجالات التالية:
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            {[
              'دورة التحليل المالى واعداد الميزانيات',
              'كورس ادارة تشغيل المطاعم',
              'كورس التسويات البنكية',
              'كورس التسويات الجردية',
              'كورس التقارير المالية والمحاسبية',
              'كورس المخازن',
              'كورس المشتريات',
              'كورس تاسيس المالية'
            ].map((courseName, index) => (
              <motion.span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                {courseName}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-gray-500 text-center">
            وفقاً للمعايير الدولية مع نخبة من أفضل الخبراء والمختصين
          </p>
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg border border-gray-100 mb-8 sm:mb-12 lg:mb-16"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* شريط البحث */}
            <div className="relative w-full lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن دورة محاسبية متخصصة..."
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-lg placeholder-gray-500"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={() =>
                  setState((prev) => ({ ...prev, viewMode: 'grid' }))
                }
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  state.viewMode === 'grid'
                    ? 'bg-blue-100 text-blue-600 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
                aria-label="عرض شبكة"
              >
                <Grid className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() =>
                  setState((prev) => ({ ...prev, viewMode: 'list' }))
                }
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  state.viewMode === 'list'
                    ? 'bg-blue-100 text-blue-600 shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
                aria-label="عرض قائمة"
              >
                <List className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    showFilters: !prev.showFilters,
                  }))
                }
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                  state.showFilters
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-5 h-5" />
                <span>فلاتر البحث</span>
              </motion.button>
            </div>
          </div>

          {/* لوحة الفلاتر */}
          {state.showFilters && (
            <motion.div
              className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    نوع المحاسبة
                  </h3>
                  <div className="space-y-3">
                    {['مالية', 'إدارية', 'حكومية', 'ضريبية'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center group cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={state.localFilters.accountingTypes.includes(type)}
                          onChange={() => handleCheckboxChange('accountingTypes', type)}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    المعيار المحاسبي
                  </h3>
                  <div className="space-y-3">
                    {['IFRS', 'GAAP', 'المحلية', 'الدولية'].map((standard) => (
                      <label
                        key={standard}
                        className="flex items-center group cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={state.localFilters.standards.includes(standard)}
                          onChange={() => handleCheckboxChange('standards', standard)}
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                          {standard}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 mb-3 text-lg">
                    مجال المراجعة
                  </h3>
                  <div className="space-y-3">
                    {['داخلية', 'خارجية', 'حكومية', 'بنكية'].map(
                      (auditType) => (
                        <label
                          key={auditType}
                          className="flex items-center group cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={state.localFilters.auditTypes.includes(auditType)}
                            onChange={() => handleCheckboxChange('auditTypes', auditType)}
                            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                          />
                          <span className="ml-3 text-gray-700 group-hover:text-gray-900 transition-colors">
                            {auditType}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t border-gray-200">
                <motion.button
                  onClick={handleResetFilters}
                  className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold transition-colors duration-300"
                  whileTap={{ scale: 0.95 }}
                >
                  إعادة تعيين
                </motion.button>
                <motion.button
                  onClick={handleApplyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 hover:shadow-lg"
                  whileTap={{ scale: 0.95 }}
                >
                  تطبيق الفلاتر
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* الدورات */}
        {state.isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mb-6"></div>
            <p className="text-xl text-gray-600">جاري تحميل الدورات...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div
              className={`${state.viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 lg:gap-10' : 'space-y-6 sm:space-y-8'}`}
            >
              {filteredAndSortedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: 'easeOut',
                  }}
                  viewport={{ once: true, margin: '-50px' }}
                  className="group"
                >
                  <CourseCard
                    course={course}
                    variant={state.viewMode === 'grid' ? 'default' : 'compact'}
                    onBookmark={() => handleBookmark(course.id)}
                  />
                </motion.div>
              ))}
            </div>

            {/* التصفح */}
            {pagination.totalPages > 1 && (
              <motion.div
                className="mt-16 sm:mt-20 lg:mt-24 flex flex-col items-center gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                  <motion.button
                    onClick={prevPage}
                    disabled={pagination.page === 1}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      pagination.page > 1
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-md'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    whileTap={pagination.page > 1 ? { scale: 0.95 } : undefined}
                    aria-label="الصفحة السابقة"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>

                  <div className="flex items-center gap-1 px-4">
                    {pagination.totalPages > 5 ? (
                      <>
                        {pagination.page > 2 && (
                          <motion.button
                            onClick={() => goToPage(1)}
                            className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                              pagination.page === 1
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            1
                          </motion.button>
                        )}
                        {pagination.page > 3 && (
                          <span className="w-12 h-12 flex items-center justify-center text-gray-500">
                            ...
                          </span>
                        )}

                        {[
                          pagination.page - 1,
                          pagination.page,
                          pagination.page + 1,
                        ]
                          .filter(
                            (page) => page > 0 && page <= pagination.totalPages
                          )
                          .map((page) => (
                            <motion.button
                              key={page}
                              onClick={() => goToPage(page)}
                              className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                                pagination.page === page
                                  ? 'bg-blue-600 text-white shadow-lg'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              {page}
                            </motion.button>
                          ))}

                        {pagination.page < pagination.totalPages - 2 && (
                          <span className="w-12 h-12 flex items-center justify-center text-gray-500">
                            ...
                          </span>
                        )}
                        {pagination.page < pagination.totalPages - 1 && (
                          <motion.button
                            onClick={() => goToPage(pagination.totalPages)}
                            className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                              pagination.page === pagination.totalPages
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            {pagination.totalPages}
                          </motion.button>
                        )}
                      </>
                    ) : (
                      Array.from(
                        { length: pagination.totalPages },
                        (_, i) => i + 1
                      ).map((page) => (
                        <motion.button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-12 h-12 rounded-xl font-semibold transition-all duration-300 ${
                            pagination.page === page
                              ? 'bg-blue-600 text-white shadow-lg'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                          whileTap={{ scale: 0.95 }}
                        >
                          {page}
                        </motion.button>
                      ))
                    )}
                  </div>

                  <motion.button
                    onClick={nextPage}
                    disabled={pagination.page === pagination.totalPages}
                    className={`p-3 rounded-xl transition-all duration-300 ${
                      pagination.page < pagination.totalPages
                        ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 shadow-md'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                    whileTap={
                      pagination.page < pagination.totalPages
                        ? { scale: 0.95 }
                        : undefined
                    }
                    aria-label="الصفحة التالية"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>
                </div>

                <div className="text-lg text-gray-600 font-medium">
                  الصفحة {pagination.page} من {pagination.totalPages}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CoursesComponent;
