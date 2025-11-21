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
import MetricCard from '@/components/ui/MetricCard';
import AcademicDashboardEnhanced from '@/components/dashboard/AcademicDashboardEnhanced';
import { ScrollAnimation, GlassCard } from '@/components/ui';
import { ShimmerSkeletonScreen } from '@/components/ui/Skeleton';

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
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 p-4">
        <div className="w-full max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Welcome Header Skeleton */}
          <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-primary-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-32 sm:h-40">
            <div className="animate-pulse bg-white/20 rounded-lg h-6 w-48 mb-2" />
            <div className="animate-pulse bg-white/20 rounded-lg h-4 w-32" />
          </div>

          {/* Stats Skeleton - استخدام ShimmerSkeletonScreen */}
          <ShimmerSkeletonScreen variant="cards" count={4} />

          {/* Content Skeleton */}
          <div className="bg-white dark:bg-neutral-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 h-64">
            <div className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-lg h-6 w-40 mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse bg-neutral-200 dark:bg-neutral-700 rounded-lg h-4" style={{ width: `${85 - i * 10}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // استخدام Dashboard المحسّن
  return (
    <div className="w-full">
      <ScrollAnimation direction="up" delay={0.1}>
        <AcademicDashboardEnhanced
          userName={user.name}
          stats={{
            activeCourses: accountSummary.activeCourses,
            completedCourses: accountSummary.completedCourses,
            certificates: accountSummary.totalCertificates,
            overallProgress: accountSummary.totalProgress,
            studyHours: accountSummary.studyHours,
            streak: user.streak,
            weeklyProgress: [65, 78, 72, 85, 90, 88, 92],
            monthlyHours: [12, 15, 18, 20, 16, 22, 19, 21, 17, 20, 23, 18],
          }}
        />
      </ScrollAnimation>
      {/* محتوى إضافي من Dashboard القديم */}
      <div className="space-y-6 sm:space-y-8 mt-8">
        {/* Welcome Header - Enhanced with GlassCard */}
        <ScrollAnimation direction="up" delay={0.2}>
          <GlassCard variant="gradient" size="lg" className="bg-gradient-to-r from-primary-600 to-academic-accent-600 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
              <div className="flex items-center gap-4 sm:gap-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-2xl sm:text-3xl font-bold border-4 border-white/30 flex-shrink-0"
                >
                  {user.name.charAt(0)}
                </motion.div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl md:text-4xl leading-tight font-bold mb-2 break-words">
                    مرحباً، {user.name}
                  </h1>
                  <p className="text-base leading-6 text-white/90 mb-4">
                    استمر في رحلتك التعليمية - لديك {user.streak} أيام متتالية
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollAnimation>

        {/* Quick Stats - Enhanced with GlassCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <ScrollAnimation
              key={stat.id}
              direction="up"
              delay={0.15 + index * 0.05}
            >
              <Link href={stat.href}>
                <GlassCard
                  variant="elevated"
                  hover
                  glow={index === 0 ? 'primary' : index === 1 ? 'mint' : index === 2 ? 'gold' : 'accent'}
                  className="h-full"
                >
                  <MetricCard
                    label={stat.title}
                    value={stat.value}
                    secondary={`${stat.change > 0 ? '+' : ''}${stat.change}%`}
                    icon={stat.icon}
                    iconColor={stat.color}
                    iconBgColor={stat.bgColor}
                  />
                </GlassCard>
              </Link>
            </ScrollAnimation>
          ))}
        </div>

        {/* Account Summary */}
        <ScrollAnimation direction="up" delay={0.3}>
          <GlassCard variant="elevated" size="lg">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-2">
                  ملخص حالة الحساب
                </h2>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                  نظرة شاملة على تقدمك وإنجازاتك
                </p>
              </div>
              <div className="hidden lg:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-300">
                    {accountSummary.totalProgress}%
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">إجمالي التقدم</div>
                </div>
                <div className="h-12 w-px bg-neutral-300 dark:bg-neutral-700"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
                    {accountSummary.averageScore}%
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">متوسط الدرجات</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ease-out hover:shadow-md">
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الدورات النشطة</div>
                <div className="text-xl sm:text-2xl font-bold text-primary-600 dark:text-primary-300">
                  {accountSummary.activeCourses}
                </div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ease-out hover:shadow-md">
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الدورات المكتملة</div>
                <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                  {accountSummary.completedCourses}
                </div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ease-out hover:shadow-md">
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">الشهادات</div>
                <div className="text-xl sm:text-2xl font-bold text-violet-600">
                  {accountSummary.totalCertificates}
                </div>
              </div>
              <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-neutral-200 dark:border-neutral-700 transition-all duration-200 ease-out hover:shadow-md">
                <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mb-1">ساعات الدراسة</div>
                <div className="text-xl sm:text-2xl font-bold text-amber-600">
                  {accountSummary.studyHours}
                </div>
              </div>
            </div>
          </GlassCard>
        </ScrollAnimation>

        {/* Current Courses - Enhanced with GlassCard */}
        <ScrollAnimation direction="up" delay={0.4}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
              دوراتي الحالية
            </h2>
            <Link
              href="/courses"
              className="text-sm sm:text-base text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium flex items-center gap-2 transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              عرض الكل
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {currentCourses.map((course, index) => (
              <ScrollAnimation
                key={course.id}
                direction="up"
                delay={index * 0.1}
                duration={0.5}
                threshold={0.1}
                triggerOnce={true}
              >
                <GlassCard variant="elevated" hover className="h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white text-2xl font-bold shadow-md">
                      {course.title.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-lg text-neutral-900 dark:text-white mb-1">
                        {course.title}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-2">
                        {course.instructor}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-neutral-500">
                        <Clock className="w-3 h-3" aria-hidden="true" />
                        <span>ينتهي في {course.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-medium text-neutral-700 dark:text-neutral-300">التقدم</span>
                      <span className="font-bold text-neutral-900 dark:text-white" aria-label={`${course.progress}% مكتمل`}>
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-3 overflow-hidden" role="progressbar" aria-valuenow={course.progress} aria-valuemin={0} aria-valuemax={100} aria-label={`تقدم الدورة: ${course.progress}%`}>
                      <motion.div
                        className={`h-3 rounded-full ${
                          course.progress >= 75
                            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600'
                            : course.progress >= 50
                              ? 'bg-gradient-to-r from-primary-500 to-primary-600'
                              : 'bg-gradient-to-r from-amber-500 to-amber-600'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 + index * 0.1 }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-neutral-500 mt-1">
                      <span>{course.completedLessons}/{course.totalLessons} درس مكتمل</span>
                      <span>متبقي {course.totalLessons - course.completedLessons} درس</span>
                    </div>
                  </div>

                  <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 mb-4 border border-primary-200/50 dark:border-primary-800/50">
                    <div className="flex items-center gap-2 mb-1">
                      <Play className="w-4 h-4 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                      <span className="text-sm font-medium text-primary-900 dark:text-primary-100">
                        الدرس التالي:
                      </span>
                    </div>
                    <p className="text-sm text-primary-700 dark:text-primary-300">{course.nextLesson}</p>
                  </div>

                  <Link
                    href={`/student/courses/${course.id}`}
                    className="block w-full text-center px-4 py-2.5 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white rounded-xl font-medium transition-all duration-200 ease-out flex items-center justify-center gap-2 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 min-h-[44px]"
                    aria-label={`متابعة تعلم دورة ${course.title}`}
                  >
                    <Play className="w-4 h-4" aria-hidden="true" />
                    <span>متابعة التعلم</span>
                  </Link>
                </GlassCard>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Quick Links - FlyonUI Menu */}
        <ScrollAnimation direction="up" delay={0.5}>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white mb-4 sm:mb-6">
              روابط سريعة
            </h2>
          
            {/* FlyonUI Quick Menu */}
            <div className="mb-6">
              <GlassCard variant="elevated">
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
              </GlassCard>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {quickLinks.map((link, index) => {
                const Icon = link.icon;
                const colorClasses = {
                  blue: 'from-primary-500 to-primary-600',
                  green: 'from-emerald-500 to-emerald-600',
                  orange: 'from-amber-500 to-amber-600',
                  purple: 'from-violet-500 to-violet-600',
                  indigo: 'from-primary-600 to-primary-700',
                  pink: 'from-sky-500 to-sky-600',
                }[link.color];

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: 'easeOut', delay: 0.05 * index }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={link.href}
                      className={`block p-4 sm:p-6 rounded-xl bg-gradient-to-r ${colorClasses} text-white shadow-md hover:shadow-lg transition-all duration-200 ease-out text-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary-600 min-h-[120px] flex flex-col items-center justify-center`}
                      aria-label={link.label}
                    >
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 mb-2 sm:mb-3 group-hover:scale-110 transition-transform duration-200 ease-out" aria-hidden="true" />
                      <span className="font-medium text-xs sm:text-sm">{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
