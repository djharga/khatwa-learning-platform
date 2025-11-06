'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Calendar,
  BarChart3,
  Target,
  Zap,
  Bell,
  ArrowRight,
  Play,
  CheckCircle2,
  FileText,
  Users,
  Trophy,
  Flame,
} from 'lucide-react';
import LoadingStates from '../../../components/ui/LoadingStates';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import FlyonMenu from '@/components/ui/FlyonMenu';
import { Mail, Info, CheckCircle } from 'lucide-react';

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  href: string;
}

interface Course {
  id: string;
  title: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
  instructor: string;
  image: string;
  dueDate: string;
}

/**
 * Student Dashboard - Simplified Overview
 * لوحة تحكم الطالب - نظرة عامة مبسطة
 * 
 * This page provides a quick overview with:
 * - Quick stats (4 cards)
 * - Account summary
 * - Current courses progress
 * - Quick links to important pages
 */
export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const user = {
    name: 'أحمد محمد',
    avatar: '/api/placeholder/64/64',
    level: 12,
    xp: 2840,
    nextLevelXP: 3000,
    streak: 7,
    role: 'طالب',
  };

  const unreadNotifications = 5;

  // Quick Stats Cards
  const stats: StatCard[] = [
    {
      id: 'courses',
      title: 'الدورات المسجلة',
      value: 8,
      change: 12.5,
      changeType: 'increase',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-primary-600 dark:text-primary-400',
      bgColor: 'bg-primary-50 dark:bg-primary-900/20',
      href: '/student/courses',
    },
    {
      id: 'completion',
      title: 'نسبة الإكمال',
      value: '73%',
      change: 5.2,
      changeType: 'increase',
      icon: <Target className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      href: '/student/progress',
    },
    {
      id: 'exams',
      title: 'الاختبارات القادمة',
      value: 3,
      change: -25,
      changeType: 'decrease',
      icon: <Calendar className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      href: '/student/exam',
    },
    {
      id: 'achievements',
      title: 'الإنجازات',
      value: 15,
      change: 20,
      changeType: 'increase',
      icon: <Award className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      href: '/student/certificates',
    },
  ];

  const accountSummary = {
    totalProgress: 73,
    activeCourses: 5,
    completedCourses: 3,
    totalCertificates: 8,
    studyHours: 156,
    upcomingDeadlines: 3,
    averageScore: 92,
  };

  const currentCourses: Course[] = [
    {
      id: '1',
      title: 'المحاسبة المالية المتقدمة',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      nextLesson: 'تحليل التدفقات النقدية',
      instructor: 'د. سارة أحمد',
      image: '/api/placeholder/300/200',
      dueDate: '2024-02-15',
    },
    {
      id: '2',
      title: 'التدقيق والمراجعة',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextLesson: 'تقييم المخاطر',
      instructor: 'د. محمد علي',
      image: '/api/placeholder/300/200',
      dueDate: '2024-02-20',
    },
  ];

  // Quick Links
  const quickLinks = [
    { href: '/student/courses', label: 'دوراتي', icon: BookOpen, color: 'blue' },
    { href: '/student/progress', label: 'تقدمي', icon: TrendingUp, color: 'green' },
    { href: '/student/exam', label: 'الامتحانات', icon: FileText, color: 'orange' },
    { href: '/student/certificates', label: 'شهاداتي', icon: Award, color: 'purple' },
    { href: '/student/profile', label: 'الملف الشخصي', icon: Users, color: 'indigo' },
    { href: '/student/reports', label: 'التقارير', icon: BarChart3, color: 'pink' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingStates.CustomLoader
          showLogo
          message="جاري تحميل لوحة التحكم..."
          size="lg"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Welcome Header */}
          <motion.div
          initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-white shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold border-4 border-white/30 flex-shrink-0">
                {user.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 break-words">
                        مرحباً، {user.name}! 👋
                      </h1>
                <p className="text-base sm:text-lg text-blue-100 mb-3">
                  استمر في رحلتك التعليمية - لديك {user.streak} أيام متتالية 🔥
                      </p>
                <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">المستوى {user.level}</span>
                        </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-orange-300 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">{user.streak} يوم متتالي</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300 flex-shrink-0" />
                    <span className="text-sm sm:text-base font-medium">{accountSummary.totalCertificates} شهادة</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
                    {unreadNotifications > 0 && (
                      <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                        onClick={() => router.push('/notifications')}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold border-2 border-white/30 hover:border-white/50 transition-all flex items-center gap-2"
                >
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  <span>الإشعارات</span>
                  <span className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs font-bold animate-pulse">
                            {unreadNotifications}
                          </span>
                      </motion.button>
                    )}
                    <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/courses')}
                className="px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 hover:bg-blue-50 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-colors flex items-center gap-2"
                    >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span>استكشف الكورسات</span>
                    </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            إحصائيات سريعة
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Link
                  href={stat.href}
                  className={`block p-4 sm:p-6 rounded-xl sm:rounded-2xl ${stat.bgColor} border-2 border-transparent hover:border-current transition-all duration-300 shadow-lg hover:shadow-xl group`}
                    >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                  </div>
                    {stat.changeType !== 'neutral' && (
                      <div className={`text-sm font-medium ${
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.changeType === 'increase' ? '↑' : '↓'} {Math.abs(stat.change)}%
                </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                    {stat.title}
                  </h3>
                  <p className={`text-3xl font-bold ${stat.color} mb-2`}>
                    {stat.value}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 group-hover:text-current transition-colors">
                    <span>عرض التفاصيل</span>
                    <ArrowRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
              </div>
            </motion.div>

        {/* Account Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg border border-gray-200 dark:border-neutral-700"
            >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
                  <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      ملخص حالة الحساب
                    </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                نظرة شاملة على تقدمك وإنجازاتك
                    </p>
                  </div>
            <div className="hidden lg:flex items-center gap-6">
                    <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                        {accountSummary.totalProgress}%
                      </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">إجمالي التقدم</div>
                    </div>
              <div className="h-12 w-px bg-gray-300 dark:bg-gray-700"></div>
                    <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">
                        {accountSummary.averageScore}%
                      </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">متوسط الدرجات</div>
                    </div>
                  </div>
                </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-neutral-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">الدورات النشطة</div>
              <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {accountSummary.activeCourses}
                    </div>
                  </div>
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-neutral-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">الدورات المكتملة</div>
              <div className="text-xl sm:text-2xl font-bold text-green-600">
                      {accountSummary.completedCourses}
                    </div>
                  </div>
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-neutral-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">الشهادات</div>
              <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {accountSummary.totalCertificates}
                    </div>
                  </div>
            <div className="bg-gray-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-neutral-700">
              <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-1">ساعات الدراسة</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-600">
                      {accountSummary.studyHours}
                  </div>
                </div>
              </div>
            </motion.div>

        {/* Current Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
            >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              دوراتي الحالية
                </h2>
                  <Link
              href="/student/courses"
              className="text-sm sm:text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-2 transition-colors"
                  >
              عرض الكل
              <ArrowRight className="w-4 h-4" />
                  </Link>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-neutral-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-neutral-700 hover:shadow-xl transition-all"
                  >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">
                    {course.title.charAt(0)}
                  </div>
                      <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">
                          {course.title}
                        </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {course.instructor}
                        </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>ينتهي في {course.dueDate}</span>
                        </div>
                      </div>
                    </div>

                {/* Progress Bar */}
                    <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">التقدم</span>
                    <span className="font-bold text-gray-900 dark:text-white">
                            {course.progress}%
                          </span>
                        </div>
                  <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                      className={`h-3 rounded-full ${
                            course.progress >= 75
                              ? 'bg-gradient-to-r from-green-500 to-green-600'
                              : course.progress >= 50
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600'
                            : 'bg-gradient-to-r from-yellow-500 to-orange-500'
                      }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                    />
                      </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>{course.completedLessons}/{course.totalLessons} درس مكتمل</span>
                    <span>متبقي {course.totalLessons - course.completedLessons} درس</span>
                      </div>
                    </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Play className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                          الدرس التالي:
                        </span>
                      </div>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{course.nextLesson}</p>
                    </div>

                <Link
                  href={`/student/courses/${course.id}`}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  <span>متابعة التعلم</span>
                </Link>
                      </motion.div>
                    ))}
                </div>
              </motion.div>

        {/* Quick Links - FlyonUI Menu */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
              >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            روابط سريعة
                  </h2>
          
          {/* FlyonUI Quick Menu */}
          <div className="mb-6 bg-white dark:bg-neutral-800 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-neutral-700">
            <FlyonMenu
              items={[
                {
                  href: '/student/inbox',
                  label: 'صندوق الوارد',
                  icon: Mail,
                  badge: '1K+',
                  badgeVariant: 'primary',
                },
                {
                  href: '/student/support',
                  label: 'التحديثات',
                  icon: Info,
                  badge: 'NEW',
                  badgeVariant: 'warning',
                },
                {
                  href: '/student',
                  label: 'الحالة',
                  icon: CheckCircle,
                  status: 'active',
                },
              ]}
              orientation="horizontal"
              className="bg-base-200 rounded-xl p-2"
              autoActive={true}
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => {
              const Icon = link.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                orange: 'from-orange-500 to-orange-600',
                purple: 'from-purple-500 to-purple-600',
                indigo: 'from-indigo-500 to-indigo-600',
                pink: 'from-pink-500 to-pink-600',
              }[link.color];

              return (
                    <motion.div
                  key={link.href}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                    >
                  <Link
                    href={link.href}
                    className={`block p-6 rounded-xl bg-gradient-to-r ${colorClasses} text-white shadow-lg hover:shadow-xl transition-all text-center group`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </Link>
                    </motion.div>
                        );
                      })}
                </div>
              </motion.div>
      </div>
    </div>
  );
}
