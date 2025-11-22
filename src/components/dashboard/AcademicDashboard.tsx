'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { AcademicBadge } from '@/components/ui/AcademicBadge';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BookOpen, Award, TrendingUp, Clock, CheckCircle, Target } from 'lucide-react';

/**
 * AcademicDashboard - لوحة تحكم أكاديمية عصرية
 * 
 * Features:
 * - Glass cards with modern design
 * - Progress rings for visual feedback
 * - Academic badges for achievements
 * - Animated sections
 */

interface DashboardStats {
  activeCourses: number;
  completedCourses: number;
  certificates: number;
  overallProgress: number;
  studyHours: number;
  streak: number;
}

interface AcademicDashboardProps {
  userName: string;
  stats: DashboardStats;
}

export default function AcademicDashboard({ userName, stats }: AcademicDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <AnimatedSection direction="up">
        <div className="mb-8">
          <h1 
            className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-primary-600 to-academic-accent-600 bg-clip-text text-transparent"
            style={{
              fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
            }}
          >
            مرحباً {userName} 👋
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            استمر في رحلتك التعليمية وحقق أهدافك الأكاديمية
          </p>
        </div>
      </AnimatedSection>

      {/* Stats Grid */}
      <AnimatedSection stagger staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Active Courses */}
          <GlassCard variant="elevated" hover glow="primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  الدورات الحالية
                </p>
                <p className="text-3xl font-bold text-primary-600">
                  {stats.activeCourses}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-xl">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
            </div>
          </GlassCard>

          {/* Certificates */}
          <GlassCard variant="elevated" hover glow="gold">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  الشهادات
                </p>
                <p className="text-3xl font-bold text-gold-600">
                  {stats.certificates}
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/30 dark:to-gold-800/30 rounded-xl">
                <Award className="w-8 h-8 text-gold-600" />
              </div>
            </div>
          </GlassCard>

          {/* Overall Progress */}
          <GlassCard variant="elevated" hover glow="mint">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
                  التقدم الإجمالي
                </p>
                <p className="text-3xl font-bold text-mint-600">
                  {stats.overallProgress}%
                </p>
              </div>
              <div className="p-3 bg-gradient-to-br from-mint-50 to-mint-100 dark:from-mint-900/30 dark:to-mint-800/30 rounded-xl">
                <TrendingUp className="w-8 h-8 text-mint-600" />
              </div>
            </div>
          </GlassCard>
        </div>
      </AnimatedSection>

      {/* Progress Overview */}
      <AnimatedSection direction="up" delay={0.2}>
        <GlassCard variant="gradient" size="lg">
          <h2 
            className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white"
            style={{
              fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
            }}
          >
            📊 نظرة عامة على التقدم
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Progress Ring */}
            <div className="flex flex-col items-center">
              <ProgressRing 
                progress={stats.overallProgress} 
                size={64}
              />
              <p className="mt-4 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                التقدم الكلي
              </p>
            </div>

            {/* Study Hours */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-gradient-to-br from-accent-50 to-accent-100 dark:from-accent-900/30 dark:to-accent-800/30 rounded-2xl mb-3">
                <Clock className="w-12 h-12 text-accent-600" />
              </div>
              <p className="text-3xl font-bold text-accent-600">{stats.studyHours}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">ساعة دراسة</p>
            </div>

            {/* Completed Courses */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-gradient-to-br from-mint-50 to-mint-100 dark:from-mint-900/30 dark:to-mint-800/30 rounded-2xl mb-3">
                <CheckCircle className="w-12 h-12 text-mint-600" />
              </div>
              <p className="text-3xl font-bold text-mint-600">{stats.completedCourses}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">دورة مكتملة</p>
            </div>

            {/* Streak */}
            <div className="flex flex-col items-center justify-center">
              <div className="p-4 bg-gradient-to-br from-gold-50 to-gold-100 dark:from-gold-900/30 dark:to-gold-800/30 rounded-2xl mb-3">
                <Target className="w-12 h-12 text-gold-600" />
              </div>
              <p className="text-3xl font-bold text-gold-600">{stats.streak}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">يوم متتالي</p>
            </div>
          </div>
        </GlassCard>
      </AnimatedSection>

      {/* Achievements */}
      <AnimatedSection direction="up" delay={0.3}>
        <GlassCard variant="elevated" size="lg">
          <h2 
            className="text-2xl font-bold mb-6 text-neutral-900 dark:text-white"
            style={{
              fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
            }}
          >
            🏆 الإنجازات الأخيرة
          </h2>
          
          <div className="flex flex-wrap gap-3">
            <AcademicBadge variant="gold" size="lg" icon={Award}>
              أكملت 5 دورات
            </AcademicBadge>
            <AcademicBadge variant="primary" size="lg" icon={Target}>
              7 أيام متتالية
            </AcademicBadge>
            <AcademicBadge variant="mint" size="lg" icon={CheckCircle}>
              100% في الاختبار
            </AcademicBadge>
            <AcademicBadge variant="accent" size="lg" icon={BookOpen}>
              50 ساعة دراسة
            </AcademicBadge>
          </div>
        </GlassCard>
      </AnimatedSection>
    </div>
  );
}