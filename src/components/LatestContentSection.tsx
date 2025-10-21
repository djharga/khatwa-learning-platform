'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Star,
  ArrowRight,
  FileText,
  BookOpen,
  Users,
  Trash2,
  Undo,
} from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  date: string;
  image: string;
  category: string;
}

const LatestContentSection = () => {
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [latestCourses, setLatestCourses] = useState<Course[]>([]);
  const [deletedCourse, setDeletedCourse] = useState<Course | null>(null);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // محاكاة تحميل البيانات
    const timer = setTimeout(() => {
      setLatestCourses([
        {
          id: '1',
          title: 'أساسيات المراجعة الداخلية',
          instructor: 'د. أحمد محمد',
          rating: 4.8,
          students: 1250,
          duration: '20 ساعة',
          date: '2024-10-01',
          image: '/banar-cours.webp',
          category: 'مراجعة داخلية',
        },
        {
          id: '2',
          title: 'المحاسبة المالية المتقدمة',
          instructor: 'د. فاطمة علي',
          rating: 4.9,
          students: 890,
          duration: '25 ساعة',
          date: '2024-09-28',
          image: '/banar-cours.webp',
          category: 'محاسبة',
        },
        {
          id: '3',
          title: 'إدارة المخاطر في الشركات',
          instructor: 'د. محمد حسن',
          rating: 4.7,
          students: 650,
          duration: '18 ساعة',
          date: '2024-09-25',
          image: '/banar-cours.webp',
          category: 'إدارة مخاطر',
        },
      ]);
      setLoadingCourses(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDeleteCourse = (courseId: string) => {
    const courseToDelete = latestCourses.find(
      (course) => course.id === courseId
    );
    if (!courseToDelete) return;

    // إزالة الكورس من القائمة
    setLatestCourses((prev) => prev.filter((course) => course.id !== courseId));

    // حفظ الكورس المحذوف
    setDeletedCourse(courseToDelete);
    setShowUndoToast(true);

    // إعداد timeout للتراجع
    if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    undoTimeoutRef.current = setTimeout(() => {
      setShowUndoToast(false);
      setDeletedCourse(null);
    }, 5000); // 5 ثواني للتراجع
  };

  const handleUndo = () => {
    if (deletedCourse) {
      setLatestCourses((prev) => [...prev, deletedCourse]);
      setDeletedCourse(null);
      setShowUndoToast(false);
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
    };
  }, []);

  const latestBlogPosts = [
    {
      id: '1',
      title: 'تطور معايير المراجعة في 2024',
      excerpt: 'اكتشف أحدث التغييرات في معايير المراجعة الدولية...',
      date: '2024-10-05',
      readTime: '5 دقائق',
    },
    {
      id: '2',
      title: 'كيف تطبق IFRS 17 في شركات التأمين',
      excerpt: 'دليل عملي لتطبيق معيار IFRS 17...',
      date: '2024-10-03',
      readTime: '8 دقائق',
    },
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-slate-50/50 to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.03),transparent_50%)] pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/5 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200/5 rounded-full blur-2xl animate-pulse delay-700"></div>

      <div className="grid-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
          style={{ marginBottom: 'var(--spacing-16)' }}
        >
          <h2
            className="heading-2 text-primary text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent leading-tight"
            style={{ marginBottom: '1rem' }}
          >
            أحدث المحتوى
          </h2>
          <p className="body-text text-slate-700 max-w-3xl mx-auto text-lg sm:text-xl text-slate-700 leading-relaxed mb-16">
            كن على اطلاع دائم بأحدث الدورات والمقالات التعليمية
          </p>
        </motion.div>

        {/* Latest Courses */}
        <div style={{ marginBottom: 'var(--spacing-16)' }}>
          <h3
            className="heading-3 text-primary-900 flex items-center"
            style={{ marginBottom: 'var(--spacing-8)' }}
          >
            <BookOpen
              className="w-6 h-6"
              style={{ marginRight: 'var(--spacing-3)' }}
            />
            أحدث الدورات
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16"
            style={{ gap: 'var(--spacing-6)' }}
          >
            {loadingCourses
              ? // Loading skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    className="card-modern bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-700 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 group"
                    style={{ padding: '0' }}
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-neutral-300 dark:bg-neutral-700 animate-pulse"></div>
                      <div className="absolute top-4 right-4 bg-neutral-400 dark:bg-neutral-600 px-3 py-1 rounded-full text-sm font-medium animate-pulse w-20 h-6"></div>
                    </div>
                    <div style={{ padding: 'var(--spacing-6)' }}>
                      <div
                        className="bg-neutral-300 dark:bg-neutral-700 animate-pulse"
                        style={{
                          height: 'var(--spacing-6)',
                          borderRadius: 'var(--radius-md)',
                          marginBottom: 'var(--spacing-2)',
                        }}
                      ></div>
                      <div
                        className="bg-neutral-300 dark:bg-neutral-700 animate-pulse w-3/4"
                        style={{
                          height: 'var(--spacing-4)',
                          borderRadius: 'var(--radius-md)',
                          marginBottom: 'var(--spacing-3)',
                        }}
                      ></div>
                      <div
                        className="flex items-center justify-between text-sm"
                        style={{ marginBottom: 'var(--spacing-4)' }}
                      >
                        <div
                          className="bg-neutral-300 dark:bg-neutral-700 animate-pulse w-12"
                          style={{
                            height: 'var(--spacing-4)',
                            borderRadius: 'var(--radius-md)',
                          }}
                        ></div>
                        <div
                          className="bg-neutral-300 dark:bg-neutral-700 animate-pulse w-16"
                          style={{
                            height: 'var(--spacing-4)',
                            borderRadius: 'var(--radius-md)',
                          }}
                        ></div>
                        <div
                          className="bg-neutral-300 dark:bg-neutral-700 animate-pulse w-14"
                          style={{
                            height: 'var(--spacing-4)',
                            borderRadius: 'var(--radius-md)',
                          }}
                        ></div>
                      </div>
                      <div
                        className="w-full bg-neutral-300 dark:bg-neutral-700 animate-pulse"
                        style={{
                          height: 'var(--spacing-12)',
                          borderRadius: 'var(--radius-xl)',
                        }}
                      ></div>
                    </div>
                  </motion.div>
                ))
              : latestCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="card-modern bg-surface border border-neutral-100 dark:border-neutral-700 overflow-hidden group hover-lift-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
                    style={{ padding: '0' }}
                  >
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        loading="lazy"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className="absolute"
                        style={{
                          top: 'var(--spacing-4)',
                          right: 'var(--spacing-4)',
                        }}
                      >
                        <span
                          className={`text-xs font-medium ${
                            course.category === 'مراجعة داخلية'
                              ? 'bg-secondary-green text-white'
                              : course.category === 'محاسبة'
                                ? 'bg-secondary-teal text-white'
                                : 'bg-secondary-purple text-white'
                          }`}
                          style={{
                            padding: 'var(--spacing-1) var(--spacing-3)',
                            borderRadius: 'var(--radius-full)',
                          }}
                        >
                          {course.category}
                        </span>
                      </div>
                      <div
                        className="absolute"
                        style={{
                          top: 'var(--spacing-4)',
                          left: 'var(--spacing-4)',
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleDeleteCourse(course.id);
                          }}
                          className="bg-red-500/90 hover:bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:scale-110"
                          style={{
                            padding: 'var(--spacing-2)',
                            borderRadius: 'var(--radius-full)',
                            minWidth: 'var(--spacing-8)',
                            minHeight: 'var(--spacing-8)',
                          }}
                          title="حذف الكورس"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="p-8">
                      <h4
                        className="heading-4 text-primary-900 line-clamp-2"
                        style={{ marginBottom: 'var(--spacing-2)' }}
                      >
                        {course.title}
                      </h4>
                      <p
                        className="body-text-sm text-[var(--color-text-secondary)]"
                        style={{ marginBottom: 'var(--spacing-3)' }}
                      >
                        بواسطة {course.instructor}
                      </p>

                      <div
                        className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]"
                        style={{ marginBottom: 'var(--spacing-4)' }}
                      >
                        <div className="flex items-center">
                          <Star
                            className="w-4 h-4 text-yellow-500"
                            style={{ marginRight: 'var(--spacing-1)' }}
                          />
                          {course.rating}
                        </div>
                        <div className="flex items-center">
                          <Users
                            className="w-4 h-4"
                            style={{ marginRight: 'var(--spacing-1)' }}
                          />
                          {course.students}
                        </div>
                        <div className="flex items-center">
                          <Clock
                            className="w-4 h-4"
                            style={{ marginRight: 'var(--spacing-1)' }}
                          />
                          {course.duration}
                        </div>
                      </div>

                      <Link href={`/courses/${course.id}`}>
                        <button className="btn-primary-modern w-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center group-hover:shadow-lg">
                          عرض الدورة
                          <ArrowRight
                            className="w-4 h-4"
                            style={{ marginRight: 'var(--spacing-2)' }}
                          />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
          </div>
        </div>

        {/* Latest Blog Posts */}
        <div>
          <h3
            className="heading-3 text-primary-900 flex items-center"
            style={{ marginBottom: 'var(--spacing-8)' }}
          >
            <FileText
              className="w-6 h-6"
              style={{ marginRight: 'var(--spacing-3)' }}
            />
            أحدث المقالات
          </h3>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8"
            style={{ gap: 'var(--spacing-6)' }}
          >
            {latestBlogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="card-compact bg-surface-alt border border-neutral-200 dark:border-neutral-700 hover-lift-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8"
              >
                <h4
                  className="heading-4 text-primary-900"
                  style={{ marginBottom: 'var(--spacing-3)' }}
                >
                  {post.title}
                </h4>
                <p
                  className="body-text text-[var(--color-text-secondary)] line-clamp-2"
                  style={{ marginBottom: 'var(--spacing-4)' }}
                >
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)]">
                  <div className="flex items-center">
                    <Calendar
                      className="w-4 h-4"
                      style={{ marginRight: 'var(--spacing-1)' }}
                    />
                    {post.date}
                  </div>
                  <div className="flex items-center">
                    <Clock
                      className="w-4 h-4"
                      style={{ marginRight: 'var(--spacing-1)' }}
                    />
                    {post.readTime}
                  </div>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <button
                    className="text-primary-600 hover:text-accent font-semibold flex items-center transition-all duration-300"
                    style={{
                      marginTop: 'var(--spacing-4)',
                      minHeight: 'var(--spacing-10)',
                    }}
                  >
                    اقرأ المزيد
                    <ArrowRight
                      className="w-4 h-4"
                      style={{ marginRight: 'var(--spacing-1)' }}
                    />
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Undo Toast */}
      <AnimatePresence>
        {showUndoToast && deletedCourse && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-neutral-200 dark:border-neutral-700 p-4 min-w-80 max-w-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center shadow-sm">
                    <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900 dark:text-neutral-100">
                      تم حذف الكورس
                    </p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {deletedCourse.title}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleUndo}
                  className="flex items-center space-x-2 space-x-reverse bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-[1.02] min-h-10"
                >
                  <Undo className="w-4 h-4" />
                  <span>تراجع</span>
                </button>
              </div>
              <div className="mt-3 w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-1">
                <motion.div
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                  className="bg-primary-600 h-1 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LatestContentSection;
