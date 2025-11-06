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
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* العنوان والوصف */}
        <motion.div
          className="text-center mb-10 sm:mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-5 leading-tight">
            <span className="text-blue-600">دوراتنا المتخصصة</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            اكتشف دوراتنا المتخصصة في المجالات التالية:
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-5">
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
                className="bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 transition-colors duration-200"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {courseName}
              </motion.span>
            ))}
          </div>
          <p className="text-sm text-gray-500">
            وفقاً للمعايير الدولية مع نخبة من أفضل الخبراء والمختصين
          </p>
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          className="bg-gray-50 rounded-xl p-5 sm:p-6 border border-gray-200 mb-8 sm:mb-10"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
            {/* شريط البحث */}
            <div className="relative w-full lg:w-96">
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن دورة محاسبية متخصصة..."
                  className="w-full pl-11 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base placeholder-gray-400"
                />
                <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-2">
              <motion.button
                onClick={() =>
                  setState((prev) => ({ ...prev, viewMode: 'grid' }))
                }
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  state.viewMode === 'grid'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
                aria-label="عرض شبكة"
              >
                <Grid className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() =>
                  setState((prev) => ({ ...prev, viewMode: 'list' }))
                }
                className={`p-2.5 rounded-lg transition-all duration-200 ${
                  state.viewMode === 'list'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
                aria-label="عرض قائمة"
              >
                <List className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() =>
                  setState((prev) => ({
                    ...prev,
                    showFilters: !prev.showFilters,
                  }))
                }
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 ${
                  state.showFilters
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                <span>فلاتر</span>
              </motion.button>
            </div>
          </div>

          {/* لوحة الفلاتر */}
          {state.showFilters && (
            <motion.div
              className="mt-5 p-5 bg-white rounded-lg border border-gray-200"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-base">
                    نوع المحاسبة
                  </h3>
                  <div className="space-y-2.5">
                    {['مالية', 'إدارية', 'حكومية', 'ضريبية'].map((type) => (
                      <label
                        key={type}
                        className="flex items-center group cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={state.localFilters.accountingTypes.includes(type)}
                          onChange={() => handleCheckboxChange('accountingTypes', type)}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                        />
                        <span className="ml-2.5 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-base">
                    المعيار المحاسبي
                  </h3>
                  <div className="space-y-2.5">
                    {['IFRS', 'GAAP', 'المحلية', 'الدولية'].map((standard) => (
                      <label
                        key={standard}
                        className="flex items-center group cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={state.localFilters.standards.includes(standard)}
                          onChange={() => handleCheckboxChange('standards', standard)}
                          className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                        />
                        <span className="ml-2.5 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                          {standard}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3 text-base">
                    مجال المراجعة
                  </h3>
                  <div className="space-y-2.5">
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
                            className="w-4 h-4 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-1"
                          />
                          <span className="ml-2.5 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                            {auditType}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <motion.button
                  onClick={handleResetFilters}
                  className="px-5 py-2 text-sm text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
                  whileTap={{ scale: 0.95 }}
                >
                  إعادة تعيين
                </motion.button>
                <motion.button
                  onClick={handleApplyFilters}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium text-sm transition-all duration-200 hover:shadow-sm"
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
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-blue-200 border-t-blue-600 mb-4"></div>
            <p className="text-base text-gray-600">جاري تحميل الدورات...</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div
              className={`${state.viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6' : 'space-y-5 sm:space-y-6'}`}
            >
              {filteredAndSortedCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{
                    delay: index * 0.02,
                    duration: 0.15,
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
                className="mt-12 sm:mt-14 flex flex-col items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-1.5 bg-white rounded-lg p-1.5 border border-gray-200 shadow-sm">
                  <motion.button
                    onClick={prevPage}
                    disabled={pagination.page === 1}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      pagination.page > 1
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    whileTap={pagination.page > 1 ? { scale: 0.95 } : undefined}
                    aria-label="الصفحة السابقة"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>

                  <div className="flex items-center gap-1 px-3">
                    {pagination.totalPages > 5 ? (
                      <>
                        {pagination.page > 2 && (
                          <motion.button
                            onClick={() => goToPage(1)}
                            className={`w-9 h-9 rounded-md text-sm font-medium transition-all duration-200 ${
                              pagination.page === 1
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                            }`}
                            whileTap={{ scale: 0.95 }}
                          >
                            1
                          </motion.button>
                        )}
                        {pagination.page > 3 && (
                          <span className="w-9 h-9 flex items-center justify-center text-sm text-gray-400">
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
                              className={`w-9 h-9 rounded-md text-sm font-medium transition-all duration-200 ${
                                pagination.page === page
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                              }`}
                              whileTap={{ scale: 0.95 }}
                            >
                              {page}
                            </motion.button>
                          ))}

                        {pagination.page < pagination.totalPages - 2 && (
                          <span className="w-9 h-9 flex items-center justify-center text-sm text-gray-400">
                            ...
                          </span>
                        )}
                        {pagination.page < pagination.totalPages - 1 && (
                          <motion.button
                            onClick={() => goToPage(pagination.totalPages)}
                            className={`w-9 h-9 rounded-md text-sm font-medium transition-all duration-200 ${
                              pagination.page === pagination.totalPages
                                ? 'bg-blue-600 text-white'
                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
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
                          className={`w-9 h-9 rounded-md text-sm font-medium transition-all duration-200 ${
                            pagination.page === page
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
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
                    className={`p-2 rounded-md transition-all duration-200 ${
                      pagination.page < pagination.totalPages
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-gray-50 text-gray-400 cursor-not-allowed'
                    }`}
                    whileTap={
                      pagination.page < pagination.totalPages
                        ? { scale: 0.95 }
                        : undefined
                    }
                    aria-label="الصفحة التالية"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="text-sm text-gray-600 font-medium">
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
