'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import {
  CheckCircle,
  Circle,
  ArrowRight,
  BookOpen,
  Users,
  Award,
} from 'lucide-react';
import LiquidGlass from '@/components/common/LiquidGlass';

const learningPaths = [
  {
    id: 1,
    title: 'مسار المراجعة الداخلية',
    description: 'من أساسيات المراجعة إلى الخبرة المتقدمة',
    steps: [
      {
        id: 1,
        title: 'أساسيات المراجعة الداخلية',
        completed: true,
        courses: 3,
      },
      { id: 2, title: 'تقنيات المراجعة العملية', completed: true, courses: 4 },
      {
        id: 3,
        title: 'المراجعة في البيئة الرقمية',
        completed: false,
        courses: 2,
      },
      { id: 4, title: 'إدارة مخاطر المراجعة', completed: false, courses: 3 },
      {
        id: 5,
        title: 'المراجعة المتقدمة والامتثال',
        completed: false,
        courses: 5,
      },
    ],
  },
  {
    id: 2,
    title: 'مسار المحاسبة المالية',
    description: 'رحلة شاملة في عالم المحاسبة',
    steps: [
      { id: 1, title: 'مبادئ المحاسبة الأساسية', completed: true, courses: 4 },
      { id: 2, title: 'التقارير المالية', completed: false, courses: 3 },
      { id: 3, title: 'المحاسبة الإدارية', completed: false, courses: 3 },
      { id: 4, title: 'المحاسبة الضريبية', completed: false, courses: 2 },
      { id: 5, title: 'التدقيق المالي المتقدم', completed: false, courses: 4 },
    ],
  },
  {
    id: 3,
    title: 'مسار الضرائب والامتثال',
    description: 'فهم شامل للضرائب واللوائح المالية',
    steps: [
      { id: 1, title: 'أساسيات الضرائب', completed: false, courses: 3 },
      { id: 2, title: 'الامتثال الضريبي', completed: false, courses: 4 },
      { id: 3, title: 'التخطيط الضريبي المتقدم', completed: false, courses: 3 },
      { id: 4, title: 'الضرائب الدولية', completed: false, courses: 2 },
      { id: 5, title: 'التحقيقات الضريبية', completed: false, courses: 4 },
    ],
  },
  {
    id: 4,
    title: 'مسار الإدارة المالية',
    description: 'بناء مهارات الإدارة المالية الفعالة',
    steps: [
      { id: 1, title: 'أساسيات الإدارة المالية', completed: false, courses: 4 },
      { id: 2, title: 'التحليل المالي', completed: false, courses: 3 },
      { id: 3, title: 'إدارة التدفق النقدي', completed: false, courses: 3 },
      { id: 4, title: 'الاستثمار والتمويل', completed: false, courses: 2 },
      { id: 5, title: 'التخطيط المالي الاستراتيجي', completed: false, courses: 4 },
    ],
  },
  {
    id: 5,
    title: 'مسار التدقيق الخارجي',
    description: 'تطوير مهارات التدقيق المستقل',
    steps: [
      { id: 1, title: 'مبادئ التدقيق', completed: false, courses: 3 },
      { id: 2, title: 'التدقيق المالي', completed: false, courses: 4 },
      { id: 3, title: 'التدقيق التشغيلي', completed: false, courses: 3 },
      { id: 4, title: 'التدقيق البيئي', completed: false, courses: 2 },
      { id: 5, title: 'التدقيق المتقدم والتقارير', completed: false, courses: 5 },
    ],
  },
  {
    id: 6,
    title: 'مسار التحليل المالي',
    description: 'مهارات التحليل والتوقعات المالية',
    steps: [
      { id: 1, title: 'أدوات التحليل الأساسية', completed: false, courses: 3 },
      { id: 2, title: 'تحليل النسب المالية', completed: false, courses: 4 },
      { id: 3, title: 'التحليل الإحصائي', completed: false, courses: 3 },
      { id: 4, title: 'التوقعات المالية', completed: false, courses: 2 },
      { id: 5, title: 'تحليل المخاطر والعائد', completed: false, courses: 4 },
    ],
  },
];

const recommendedCourses = [
  {
    id: 1,
    title: 'إدارة المخاطر في المؤسسات',
    category: 'إدارة المخاطر',
    rating: 4.8,
    students: 1250,
    duration: '6 ساعات',
  },
  {
    id: 2,
    title: 'تحليل البيانات المالية',
    category: 'التحليل المالي',
    rating: 4.7,
    students: 890,
    duration: '8 ساعات',
  },
  {
    id: 3,
    title: 'الامتثال والرقابة الداخلية',
    category: 'الامتثال',
    rating: 4.9,
    students: 650,
    duration: '10 ساعات',
  },
];

const LearningPathsPage = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftStart, setScrollLeftStart] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - el.offsetLeft);
      setScrollLeftStart(el.scrollLeft);
    };

    const handleMouseLeave = () => {
      setIsDragging(false);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 3; // سرعة التمرير
      el.scrollLeft = scrollLeftStart - walk;
    };

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mouseleave', handleMouseLeave);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mousemove', handleMouseMove);

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mouseleave', handleMouseLeave);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isDragging, startX, scrollLeftStart]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 pt-20 relative">
      <LiquidGlass />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="heading-1 text-primary mb-4">خريطة المسارات التعليمية</h1>
          <p className="body-text text-text-secondary max-w-3xl mx-auto text-lg">
            استكشف خريطة المسارات التعليمية الشاملة لمنصة الخطوة. اسحب بالماوس للتنقل بين المسارات المختلفة وابدأ رحلتك التعليمية
          </p>
        </motion.div>

        {/* Learning Paths */}
        <div
          ref={scrollRef}
          className="relative overflow-x-auto scrollbar-hide"
          style={{
            scrollBehavior: 'smooth',
            scrollSnapType: 'x mandatory',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none',
          }}
        >
          <div className="flex space-x-8 pb-8" style={{ width: 'max-content' }}>
            {/* Progress Bar */}
            <div className="absolute top-0 left-0 w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
            {learningPaths.map((path, pathIndex) => {
              const completedSteps = path.steps.filter(step => step.completed).length;
              const progressPercentage = (completedSteps / path.steps.length) * 100;
              return (
                <div key={path.id}>
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: pathIndex * 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 min-w-[400px] flex-shrink-0"
                    style={{ scrollSnapAlign: 'start' }}
                  >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h2 className="heading-2 text-primary">{path.title}</h2>
                      <span className="text-sm text-text-secondary">{progressPercentage.toFixed(0)}% مكتمل</span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 mb-2">
                      <motion.div
                        className="bg-success h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-text-secondary">{path.description}</p>
                  </div>

                  {/* Path Visualization */}
                  <div className="relative overflow-x-auto scrollbar-hide" style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}>
                    <div className="flex space-x-4 pb-4" style={{ width: 'max-content' }}>
                      {path.steps.map((step, index) => (
                        <motion.div
                          key={step.id}
                          initial={{ scale: 0, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          transition={{
                            delay: index * 0.1 + 0.3,
                            type: 'spring',
                            stiffness: 200,
                          }}
                          viewport={{ once: true }}
                          className="flex flex-col items-center min-w-[200px] flex-shrink-0"
                          style={{ scrollSnapAlign: 'start' }}
                        >
                          {/* Step Circle */}
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                              step.completed
                                ? 'bg-success text-white'
                                : 'bg-neutral-200 dark:bg-neutral-700 text-text-secondary'
                            }`}
                          >
                            {step.completed ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : (
                              <Circle className="w-6 h-6" />
                            )}
                          </div>

                          {/* Step Content */}
                          <div className="text-center max-w-xs">
                            <h3
                              className={`text-base font-semibold mb-1 ${
                                step.completed
                                  ? 'text-primary'
                                  : 'text-text-secondary'
                              }`}
                            >
                              {step.title}
                            </h3>
                            <p className="text-xs text-text-secondary">
                              {step.courses} دورات
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                {pathIndex < learningPaths.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="flex-shrink-0 self-center mx-4"
                  >
                    <ArrowRight className="w-8 h-8 text-primary" />
                  </motion.div>
                )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="heading-2 text-primary mb-8 text-center">
            دورات مقترحة لك
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recommendedCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary mr-2" />
                  <span className="text-sm text-text-secondary">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">
                  {course.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-text-secondary mb-4">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />
                    {course.students}
                  </div>
                  <div>{course.duration}</div>
                </div>
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 text-warning mr-1" />
                  <span className="text-sm text-text-secondary">
                    {course.rating} ★
                  </span>
                </div>
                <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all duration-300 min-h-11">
                  سجل الآن
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LearningPathsPage;
