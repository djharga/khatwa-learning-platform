'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Award,
  Target,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  Calendar,
  Trophy,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Download,
  Activity,
  PieChart,
  Sparkles,
  Flame,
  Play,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import Link from 'next/link';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // بيانات التقدم
  const overallProgress = {
    totalCourses: 16,
    completedCourses: 12,
    inProgressCourses: 4,
    totalHours: 156,
    certificates: 8,
    averageScore: 92,
    currentStreak: 7,
    totalPoints: 2840,
  };

  // بيانات الدورات مع التقدم
  const coursesProgress = [
    {
      id: 1,
      title: 'أساسيات المراجعة الداخلية',
      category: 'مراجعة',
      progress: 100,
      completedLessons: 24,
      totalLessons: 24,
      score: 95,
      timeSpent: 32,
      lastAccessed: '2025-10-23',
      status: 'completed',
    },
    {
      id: 2,
      title: 'تحليل المخاطر في المحاسبة',
      category: 'محاسبة',
      progress: 75,
      completedLessons: 18,
      totalLessons: 24,
      score: 88,
      timeSpent: 28,
      lastAccessed: '2025-10-22',
      status: 'in-progress',
    },
    {
      id: 3,
      title: 'الامتثال والحوكمة',
      category: 'حوكمة',
      progress: 45,
      completedLessons: 11,
      totalLessons: 24,
      score: 82,
      timeSpent: 15,
      lastAccessed: '2025-10-20',
      status: 'in-progress',
    },
  ];

  // نقاط القوة والتحسين
  const strengths = [
    { skill: 'معايير المراجعة', score: 95, trend: 'up' },
    { skill: 'تحليل المخاطر', score: 92, trend: 'up' },
    { skill: 'إعداد التقارير', score: 90, trend: 'stable' },
  ];

  const improvements = [
    { skill: 'المحاسبة الضريبية', score: 68, trend: 'down' },
    { skill: 'التدقيق الرقمي', score: 72, trend: 'up' },
    { skill: 'الامتثال التنظيمي', score: 75, trend: 'stable' },
  ];

  // التوصيات
  const recommendations = [
    {
      id: 1,
      type: 'course',
      title: 'دورة المحاسبة الضريبية المتقدمة',
      reason: 'لتحسين أدائك في المحاسبة الضريبية',
      priority: 'high',
    },
    {
      id: 2,
      type: 'practice',
      title: 'تمارين عملية في التدقيق الرقمي',
      reason: 'لتطوير مهارات التدقيق الرقمي',
      priority: 'medium',
    },
    {
      id: 3,
      type: 'resource',
      title: 'دليل معايير الامتثال الدولية',
      reason: 'لتعزيز معرفتك بالامتثال',
      priority: 'medium',
    },
  ];

  // الإنجازات الحديثة
  const recentAchievements = [
    {
      id: 1,
      title: 'متعلم سريع',
      description: 'أكملت 5 دورات في أقل من شهر',
      icon: Zap,
      date: '2025-10-15',
      points: 500,
    },
    {
      id: 2,
      title: 'خبير المراجعة',
      description: 'حصلت على شهادة CIA Part 1',
      icon: Award,
      date: '2025-10-10',
      points: 1000,
    },
  ];

  const completionPercentage = (overallProgress.completedCourses / overallProgress.totalCourses) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="max-w-7xl mx-auto"
        >
          {/* Hero Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="mb-8 relative overflow-hidden rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white p-6 sm:p-8 lg:p-12 shadow-lg"
          >
            <div className="absolute top-0 end-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
                  className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2"
                >
                  تقدمك التعليمي
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
                  className="text-lg md:text-xl text-blue-100"
                >
                  تتبع تقدمك وحقق أهدافك التعليمية
                </motion.p>
              </div>
              <button
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-white text-primary-600 hover:bg-primary-50 rounded-lg font-medium transition-all duration-200 ease-out shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600"
                aria-label="تصدير التقرير"
                type="button"
              >
                <Download className="w-5 h-5" aria-hidden="true" />
                <span className="hidden md:inline">تصدير التقرير</span>
              </button>
            </div>
          </motion.div>

          {/* نظرة سريعة على التقدم العام */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700">
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-blue-100 text-sm font-medium mb-1">
                        الدورات المكتملة
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {overallProgress.completedCourses}/{overallProgress.totalCourses}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <BookOpen className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-sm text-blue-100 mb-2">
                      <span>التقدم</span>
                      <span className="font-bold">{Math.round(completionPercentage)}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5" role="progressbar" aria-valuenow={Math.round(completionPercentage)} aria-valuemin={0} aria-valuemax={100} aria-label={`التقدم: ${Math.round(completionPercentage)}%`}>
                      <motion.div
                        className="bg-white h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${completionPercentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group bg-gradient-to-br from-secondary-innovate-600 via-secondary-innovate-500 to-secondary-innovate-700">
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-purple-100 text-sm font-medium mb-1">
                        ساعات التعلم
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {overallProgress.totalHours}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Clock className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-sm text-purple-100 mt-2">ساعة مكتملة</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group bg-gradient-to-br from-success-600 via-success-500 to-success-700">
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-green-100 text-sm font-medium mb-1">
                        متوسط الدرجات
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {overallProgress.averageScore}%
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-sm text-green-100 mt-2">في جميع الاختبارات</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ y: -2, scale: 1.01 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative group bg-gradient-to-br from-warning-600 via-warning-500 to-warning-700">
                <CardContent className="p-4 sm:p-6 relative z-10 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-orange-100 text-sm font-medium mb-1">
                        الشهادات
                      </p>
                      <p className="text-3xl sm:text-4xl font-extrabold">
                        {overallProgress.certificates}
                      </p>
                    </div>
                    <div className="p-2 sm:p-3 bg-white/20 backdrop-blur-md rounded-xl">
                      <Award className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                    </div>
                  </div>
                  <p className="text-sm text-orange-100 mt-2">شهادات معتمدة</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* شريط إنجاز لكل دورة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.2, ease: 'easeOut' }}
          >
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                      <BarChart3 className="w-6 h-6" aria-hidden="true" />
                    </div>
                    تقدمك في الدورات
                  </CardTitle>
                  <CardDescription className="text-blue-100">
                    تفاصيل التقدم في كل دورة
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {coursesProgress.map((course, idx) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + idx * 0.05, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className="p-4 sm:p-5 border-2 border-neutral-200 dark:border-neutral-700 rounded-xl sm:rounded-2xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-200 ease-out cursor-pointer group bg-white dark:bg-neutral-800"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
                      <div className="flex-1">
                        <h4 className="font-bold text-lg sm:text-xl text-neutral-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ease-out">
                          {course.title}
                        </h4>
                        <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                          <span className="font-semibold">{course.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" aria-hidden="true" />
                            {course.timeSpent} ساعة
                          </span>
                          <span>•</span>
                          <span>آخر دخول: {course.lastAccessed}</span>
                        </div>
                        {course.status === 'completed' && (
                          <div className="inline-flex items-center gap-2 px-3 py-1 bg-success-50 dark:bg-success-900/20 text-success-700 dark:text-success-400 rounded-full text-xs font-bold border border-success-200 dark:border-success-800">
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                            مكتملة
                          </div>
                        )}
                      </div>
                      <div className="text-end">
                        <div className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
                          {course.progress}%
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2.5 mb-3" role="progressbar" aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`تقدم الدورة: ${course.progress}%`}>
                      <motion.div
                        className={`h-2.5 rounded-full ${
                          course.status === 'completed' 
                            ? 'bg-gradient-to-r from-success-600 to-success-700' 
                            : 'bg-gradient-to-r from-primary-600 to-primary-700'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.8, delay: idx * 0.05, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between text-sm items-start sm:items-center gap-2">
                      <span className="text-neutral-600 dark:text-neutral-400 font-semibold">
                        {course.completedLessons} من {course.totalLessons} درس مكتمل
                      </span>
                      <span className="font-bold text-primary-600 dark:text-primary-400 text-lg">
                        الدرجة: {course.score}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
            {/* نقاط القوة */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="bg-gradient-to-r from-success-600 via-success-700 to-success-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                        <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
                      </div>
                      نقاط القوة
                    </CardTitle>
                    <CardDescription className="text-green-100">
                      المهارات التي تتقنها
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  {strengths.map((strength, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="p-4 sm:p-5 bg-gradient-to-r from-success-50 to-success-100/50 dark:from-success-900/20 dark:to-success-800/20 border-2 border-success-200 dark:border-success-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ease-out"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                        <span className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                          {strength.skill}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xl sm:text-2xl text-success-600 dark:text-success-400">{strength.score}%</span>
                          {strength.trend === 'up' && (
                            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" aria-label="تحسن" />
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-success-200 dark:bg-success-900/30 rounded-full h-2.5" role="progressbar" aria-valuenow={strength.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${strength.skill}: ${strength.score}%`}>
                        <motion.div
                          className="bg-gradient-to-r from-success-600 to-success-700 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${strength.score}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* نقاط تحتاج تحسين */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.2, ease: 'easeOut' }}
            >
              <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                <div className="bg-gradient-to-r from-warning-600 via-warning-700 to-warning-600 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                        <AlertCircle className="w-6 h-6" aria-hidden="true" />
                      </div>
                      نقاط تحتاج تحسين
                    </CardTitle>
                    <CardDescription className="text-orange-100">
                      مجالات للتطوير
                    </CardDescription>
                  </CardHeader>
                </div>
                <CardContent className="p-4 sm:p-6 space-y-4">
                  {improvements.map((improvement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05, duration: 0.2, ease: 'easeOut' }}
                      whileHover={{ y: -2, scale: 1.01 }}
                      className="p-4 sm:p-5 bg-gradient-to-r from-warning-50 to-warning-100/50 dark:from-warning-900/20 dark:to-warning-800/20 border-2 border-warning-200 dark:border-warning-800 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 ease-out"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
                        <span className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white">
                          {improvement.skill}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xl sm:text-2xl text-warning-600 dark:text-warning-400">{improvement.score}%</span>
                          {improvement.trend === 'down' && (
                            <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-danger-600 dark:text-danger-400" aria-label="انخفاض" />
                          )}
                          {improvement.trend === 'up' && (
                            <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" aria-label="تحسن" />
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-warning-200 dark:bg-warning-900/30 rounded-full h-2.5" role="progressbar" aria-valuenow={improvement.score} aria-valuemin={0} aria-valuemax={100} aria-label={`${improvement.skill}: ${improvement.score}%`}>
                        <motion.div
                          className="bg-gradient-to-r from-warning-600 to-warning-700 h-2.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${improvement.score}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + index * 0.05, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* التوصيات القادمة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.2, ease: 'easeOut' }}
          >
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden mb-8">
              <div className="bg-gradient-to-r from-secondary-innovate-600 via-secondary-innovate-700 to-secondary-innovate-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
                      <Target className="w-6 h-6" aria-hidden="true" />
                    </div>
                    التوصيات المخصصة لك
                  </CardTitle>
                  <CardDescription className="text-purple-100">
                    بناءً على تقدمك، ننصحك بالتالي
                  </CardDescription>
                </CardHeader>
              </div>
              <CardContent className="p-4 sm:p-6 space-y-4">
                {recommendations.map((rec, idx) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + idx * 0.05, duration: 0.2, ease: 'easeOut' }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`p-4 sm:p-5 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 ease-out cursor-pointer bg-white dark:bg-neutral-800 ${
                      rec.priority === 'high'
                        ? 'border-danger-300 dark:border-danger-700 bg-gradient-to-r from-danger-50 to-warning-50 dark:from-danger-900/20 dark:to-warning-900/20 shadow-md hover:shadow-lg'
                        : 'border-primary-300 dark:border-primary-700 bg-gradient-to-r from-primary-50 to-secondary-innovate-50 dark:from-primary-900/20 dark:to-secondary-innovate-900/20 shadow-md hover:shadow-lg'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start mb-3 gap-3">
                      <div className="flex-1">
                        <h4 className="font-bold text-base sm:text-lg text-neutral-900 dark:text-white mb-2">
                          {rec.title}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          {rec.reason}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs font-bold whitespace-nowrap ${
                          rec.priority === 'high'
                            ? 'bg-danger-600 text-white'
                            : 'bg-primary-600 text-white'
                        }`}
                      >
                        {rec.priority === 'high' ? 'أولوية عالية' : 'مستحسن'}
                      </span>
                    </div>
                    <button
                      className="inline-flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-lg font-medium transition-all duration-200 ease-out text-sm shadow-md shadow-primary-500/20 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      aria-label={`ابدأ: ${rec.title}`}
                      type="button"
                    >
                      <Play className="w-4 h-4" aria-hidden="true" />
                      ابدأ الآن
                    </button>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* الإنجازات الحديثة */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.2, ease: 'easeOut' }}
          >
            <Card className="shadow-md border border-neutral-200 dark:border-neutral-700 overflow-hidden relative bg-gradient-to-br from-warning-50 via-warning-50/50 to-warning-100/30 dark:from-warning-900/20 dark:via-warning-800/20 dark:to-warning-900/10">
              <div className="absolute top-0 end-0 w-96 h-96 bg-gradient-to-br from-warning-300/20 to-warning-400/20 rounded-full blur-3xl"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3 sm:gap-4 text-2xl sm:text-3xl">
                  <div className="p-3 sm:p-4 bg-gradient-to-br from-warning-500 to-warning-600 rounded-xl sm:rounded-2xl shadow-lg">
                    <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-white" aria-hidden="true" />
                  </div>
                  <div className="font-extrabold text-neutral-900 dark:text-white">الإنجازات الحديثة</div>
                </CardTitle>
                <CardDescription className="text-neutral-600 dark:text-neutral-400">أحدث إنجازاتك</CardDescription>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {recentAchievements.map((achievement, idx) => {
                    const Icon = achievement.icon;
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 + idx * 0.1, duration: 0.2, ease: 'easeOut' }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        className="p-4 sm:p-6 border-2 border-warning-300 dark:border-warning-700 bg-gradient-to-br from-warning-100 to-warning-50 dark:from-warning-900/30 dark:to-warning-800/20 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg relative overflow-hidden group transition-all duration-200 ease-out"
                      >
                        <div className="mb-4 flex justify-center">
                          <Icon className="w-12 h-12 sm:w-16 sm:h-16 text-warning-600 dark:text-warning-400" aria-hidden="true" />
                        </div>
                        <h4 className="font-extrabold text-lg sm:text-xl mb-2 text-neutral-900 dark:text-white">
                          {achievement.title}
                        </h4>
                        <p className="text-sm font-semibold mb-4 text-neutral-700 dark:text-neutral-300">
                          {achievement.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3 text-xs text-neutral-600 dark:text-neutral-400">
                            <span>{achievement.date}</span>
                            <span>•</span>
                            <span className="font-bold text-warning-600 dark:text-warning-400 text-base sm:text-lg">
                              +{achievement.points} نقطة
                            </span>
                          </div>
                          <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-success-600 dark:text-success-400" aria-label="مكتمل" />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
