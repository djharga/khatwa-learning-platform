'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, Award, TrendingUp, Clock, CheckCircle, Target,
  BarChart3, LineChart, PieChart, Activity, Calendar, Trophy,
  Bell, Eye, Users, Zap, Flame, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ProgressRing } from '@/components/ui/ProgressRing';
import { AcademicBadge } from '@/components/ui/AcademicBadge';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

interface DashboardStats {
  activeCourses: number;
  completedCourses: number;
  certificates: number;
  overallProgress: number;
  studyHours: number;
  streak: number;
  weeklyProgress?: number[];
  monthlyHours?: number[];
  achievements?: Array<{
    id: string;
    title: string;
    icon: any;
    variant: 'primary' | 'accent' | 'gold' | 'mint' | 'success';
    unlockedAt: string;
  }>;
  recentActivity?: Array<{
    id: string;
    type: string;
    message: string;
    time: string;
    icon: any;
  }>;
}

interface AcademicDashboardEnhancedProps {
  userName: string;
  stats: DashboardStats;
}

// Simple Chart Component (you can replace with recharts later)
const SimpleLineChart = ({ data, color = 'primary' }: { data: number[]; color?: string }) => {
  const maxValue = Math.max(...data, 1);
  const colorClasses = {
    primary: 'from-primary-500 to-academic-accent-500',
    accent: 'from-accent-500 to-accent-600',
    gold: 'from-gold-500 to-gold-600',
    mint: 'from-mint-500 to-mint-600',
  };

  return (
    <div className="h-32 flex items-end gap-2">
      {data.map((value, index) => (
        <motion.div
          key={index}
          initial={{ height: 0 }}
          animate={{ height: `${(value / maxValue) * 100}%` }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className={`flex-1 bg-gradient-to-t ${colorClasses[color as keyof typeof colorClasses]} rounded-t-lg min-h-[4px]`}
        />
      ))}
    </div>
  );
};

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color = 'primary',
  trend = 'up' 
}: {
  title: string;
  value: string | number;
  change?: number;
  icon: any;
  color?: 'primary' | 'accent' | 'gold' | 'mint' | 'success';
  trend?: 'up' | 'down';
}) => {
  const colorClasses = {
    primary: {
      bg: 'from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30',
      icon: 'text-primary-600',
      value: 'text-primary-600',
    },
    accent: {
      bg: 'from-accent-50 to-accent-100 dark:from-accent-900/30 dark:to-accent-800/30',
      icon: 'text-accent-600',
      value: 'text-accent-600',
    },
    gold: {
      bg: 'from-gold-50 to-gold-100 dark:from-gold-900/30 dark:to-gold-800/30',
      icon: 'text-gold-600',
      value: 'text-gold-600',
    },
    mint: {
      bg: 'from-mint-50 to-mint-100 dark:from-mint-900/30 dark:to-mint-800/30',
      icon: 'text-mint-600',
      value: 'text-mint-600',
    },
    success: {
      bg: 'from-success-50 to-success-100 dark:from-success-900/30 dark:to-success-800/30',
      icon: 'text-success-600',
      value: 'text-success-600',
    },
  };

  const classes = colorClasses[color];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <GlassCard variant="elevated" hover glow={color === 'primary' ? 'primary' : color === 'gold' ? 'gold' : color === 'mint' ? 'mint' : 'accent'}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">
              {title}
            </p>
            <p className={`text-3xl font-bold ${classes.value}`}>
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' ? (
                  <ArrowUpRight className={`w-4 h-4 ${classes.icon}`} />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-danger-600" />
                )}
                <span className={`text-xs font-semibold ${trend === 'up' ? classes.icon : 'text-danger-600'}`}>
                  {change > 0 ? '+' : ''}{change}%
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 bg-gradient-to-br ${classes.bg} rounded-xl`}>
            <Icon className={`w-8 h-8 ${classes.icon}`} />
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
};

export default function AcademicDashboardEnhanced({ userName, stats }: AcademicDashboardEnhancedProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'achievements'>('overview');

  const weeklyProgressData = stats.weeklyProgress || [65, 78, 72, 85, 90, 88, 92];
  const monthlyHoursData = stats.monthlyHours || [12, 15, 18, 20, 16, 22, 19, 21, 17, 20, 23, 18];

  const achievements = stats.achievements || [
    { id: '1', title: 'أكملت 5 دورات', icon: Award, variant: 'gold' as const, unlockedAt: '2024-01-15' },
    { id: '2', title: '7 أيام متتالية', icon: Target, variant: 'primary' as const, unlockedAt: '2024-01-20' },
    { id: '3', title: '100% في الاختبار', icon: CheckCircle, variant: 'mint' as const, unlockedAt: '2024-01-22' },
    { id: '4', title: '50 ساعة دراسة', icon: BookOpen, variant: 'accent' as const, unlockedAt: '2024-01-25' },
  ];

  const recentActivity = stats.recentActivity || [
    { id: '1', type: 'course', message: 'أكملت دورة المحاسبة المالية', time: 'منذ ساعتين', icon: CheckCircle },
    { id: '2', type: 'achievement', message: 'حصلت على إنجاز جديد', time: 'منذ يوم', icon: Trophy },
    { id: '3', type: 'progress', message: 'وصلت إلى 75% من التقدم', time: 'منذ يومين', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <AnimatedSection direction="up">
        <div className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-black mb-2 bg-gradient-to-r from-primary-600 to-academic-accent-600 bg-clip-text text-transparent"
            style={{
              fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
            }}
          >
            مرحباً {userName} 👋
          </motion.h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-lg">
            استمر في رحلتك التعليمية وحقق أهدافك الأكاديمية
          </p>
        </div>
      </AnimatedSection>

      {/* Stats Grid */}
      <AnimatedSection stagger staggerDelay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="الدورات الحالية"
            value={stats.activeCourses}
            change={12.5}
            icon={BookOpen}
            color="primary"
            trend="up"
          />
          <StatCard
            title="الشهادات"
            value={stats.certificates}
            change={20}
            icon={Award}
            color="gold"
            trend="up"
          />
          <StatCard
            title="التقدم الإجمالي"
            value={`${stats.overallProgress}%`}
            change={5.2}
            icon={TrendingUp}
            color="mint"
            trend="up"
          />
          <StatCard
            title="ساعات الدراسة"
            value={stats.studyHours}
            change={8.3}
            icon={Clock}
            color="accent"
            trend="up"
          />
        </div>
      </AnimatedSection>

      {/* Progress Overview with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Overall Progress Card */}
        <AnimatedSection direction="up" delay={0.2}>
          <GlassCard variant="gradient" size="lg">
            <h2
              className="text-xl font-bold mb-6 text-neutral-900 dark:text-white"
              style={{
                fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
              }}
            >
              📊 التقدم الكلي
            </h2>
            <div className="flex flex-col items-center">
              <ProgressRing
                progress={stats.overallProgress}
                size={80}
              />
              <div className="mt-6 grid grid-cols-3 gap-4 w-full">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary-600">{stats.activeCourses}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">حالية</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-mint-600">{stats.completedCourses}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">مكتملة</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gold-600">{stats.certificates}</p>
                  <p className="text-xs text-neutral-600 dark:text-neutral-400">شهادات</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Weekly Progress Chart */}
        <AnimatedSection direction="up" delay={0.3}>
          <GlassCard variant="elevated" size="lg">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold text-neutral-900 dark:text-white"
                style={{
                  fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
                }}
              >
                📈 التقدم الأسبوعي
              </h2>
              <LineChart className="w-5 h-5 text-primary-600" />
            </div>
            <SimpleLineChart data={weeklyProgressData} color="primary" />
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">متوسط التقدم</span>
              <span className="font-bold text-primary-600">82%</span>
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Study Hours Chart */}
        <AnimatedSection direction="up" delay={0.4}>
          <GlassCard variant="elevated" size="lg">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold text-neutral-900 dark:text-white"
                style={{
                  fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
                }}
              >
                ⏱️ ساعات الدراسة
              </h2>
              <BarChart3 className="w-5 h-5 text-accent-600" />
            </div>
            <SimpleLineChart data={monthlyHoursData} color="accent" />
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-neutral-600 dark:text-neutral-400">إجمالي هذا الشهر</span>
              <span className="font-bold text-accent-600">{stats.studyHours} ساعة</span>
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>

      {/* Achievements and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Achievements */}
        <AnimatedSection direction="up" delay={0.5}>
          <GlassCard variant="elevated" size="lg">
            <h2
              className="text-xl font-bold mb-6 text-neutral-900 dark:text-white"
              style={{
                fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
              }}
            >
              🏆 الإنجازات
            </h2>
            <div className="flex flex-wrap gap-3">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <AcademicBadge
                    variant={achievement.variant}
                    size="lg"
                    icon={achievement.icon}
                  >
                    {achievement.title}
                  </AcademicBadge>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>

        {/* Recent Activity */}
        <AnimatedSection direction="up" delay={0.6}>
          <GlassCard variant="elevated" size="lg">
            <div className="flex items-center justify-between mb-6">
              <h2
                className="text-xl font-bold text-neutral-900 dark:text-white"
                style={{
                  fontFamily: "var(--font-noto-kufi-arabic), 'Noto Kufi Arabic', 'Cairo', sans-serif",
                }}
              >
                🔔 النشاط الأخير
              </h2>
              <Bell className="w-5 h-5 text-neutral-400" />
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-neutral-50/50 dark:bg-neutral-800/50 hover:bg-neutral-100/50 dark:hover:bg-neutral-800 transition-colors"
                >
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                    <activity.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </AnimatedSection>
      </div>
    </div>
  );
}

