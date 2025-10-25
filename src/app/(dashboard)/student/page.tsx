'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  BookOpen,
  Calendar,
  Award,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Play,
  BarChart3,
  Target,
  Zap,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Download,
  Share,
  Heart,
  MessageCircle,
  ThumbsUp,
  Eye,
  Users,
  Trophy,
  Medal,
  Crown,
  Sparkles,
  Flame,
  Timer,
  MapPin,
  Video,
  FileText,
  Calculator,
  PieChart,
  Activity,
  Layers,
  Grid3X3,
  List,
  Home,
  GraduationCap,
  Briefcase,
  MessageSquare,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import DashboardWidgets from '../../../components/DashboardWidgets';
import LoadingStates from '../../../components/ui/LoadingStates';
import { LearningPathVisual, PathProgressTracker } from '@/components/ui/learning-paths';

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  sparkline?: number[];
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

interface Activity {
  id: string;
  type: 'completed' | 'started' | 'achievement' | 'exam' | 'discussion';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

interface Event {
  id: string;
  title: string;
  type: 'exam' | 'deadline' | 'meeting' | 'webinar';
  date: string;
  time: string;
  location?: string;
  priority: 'low' | 'medium' | 'high';
  countdown: string;
}

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const user = {
    name: 'أحمد محمد',
    avatar: '/api/placeholder/64/64',
    level: 12,
    xp: 2840,
    nextLevelXP: 3000,
    streak: 7,
    role: 'طالب',
  };

  const stats: StatCard[] = [
    {
      id: 'courses',
      title: 'الدورات المسجلة',
      value: 8,
      change: 12.5,
      changeType: 'increase',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      sparkline: [65, 70, 75, 72, 78, 82, 85],
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
      sparkline: [60, 65, 68, 70, 72, 75, 73],
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
      sparkline: [5, 4, 4, 3, 3, 3, 3],
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
      sparkline: [8, 9, 11, 12, 13, 14, 15],
    },
  ];

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

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'completed',
      title: 'إكمال درس "القوائم المالية"',
      description: 'في دورة المحاسبة المالية المتقدمة',
      time: 'منذ ساعتين',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
    },
    {
      id: '2',
      type: 'achievement',
      title: 'حصلت على إنجاز "المتفوق"',
      description: 'لإكمال 5 دورات متتالية',
      time: 'أمس',
      icon: <Trophy className="w-5 h-5" />,
      color: 'text-yellow-600',
    },
    {
      id: '3',
      type: 'started',
      title: 'بدء دورة "التحليل المالي"',
      description: 'دورة جديدة من د. فاطمة خالد',
      time: 'منذ 3 أيام',
      icon: <Play className="w-5 h-5" />,
      color: 'text-blue-600',
    },
    {
      id: '4',
      type: 'exam',
      title: 'نتيجة امتحان "أساسيات المحاسبة"',
      description: 'درجة 92/100 - ممتاز!',
      time: 'منذ أسبوع',
      icon: <Award className="w-5 h-5" />,
      color: 'text-purple-600',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'أول خطوة',
      description: 'إكمال أول دورة تدريبية',
      icon: <Medal className="w-6 h-6" />,
      progress: 1,
      total: 1,
      earned: true,
      rarity: 'common',
    },
    {
      id: '2',
      title: 'المتفوق',
      description: 'إكمال 5 دورات متتالية',
      icon: <Crown className="w-6 h-6" />,
      progress: 5,
      total: 5,
      earned: true,
      rarity: 'rare',
    },
    {
      id: '3',
      title: 'خبير المحاسبة',
      description: 'إكمال 10 دورات في المحاسبة',
      icon: <Trophy className="w-6 h-6" />,
      progress: 7,
      total: 10,
      earned: false,
      rarity: 'epic',
    },
    {
      id: '4',
      title: 'الأسطورة',
      description: 'الحصول على تقييم مثالي في 20 اختبار',
      icon: <Sparkles className="w-6 h-6" />,
      progress: 15,
      total: 20,
      earned: false,
      rarity: 'legendary',
    },
  ];

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'امتحان المحاسبة المالية النهائي',
      type: 'exam',
      date: '2024-02-10',
      time: '10:00 ص',
      priority: 'high',
      countdown: '3 أيام',
    },
    {
      id: '2',
      title: 'موعد تسليم مشروع التدقيق',
      type: 'deadline',
      date: '2024-02-12',
      time: '11:59 م',
      priority: 'high',
      countdown: '5 أيام',
    },
    {
      id: '3',
      title: 'ورشة عمل الذكاء الاصطناعي في المحاسبة',
      type: 'webinar',
      date: '2024-02-15',
      time: '7:00 م',
      location: 'عبر الإنترنت',
      priority: 'medium',
      countdown: 'أسبوع',
    },
  ];

  const learningSteps = [
    { id: '1', title: 'أساسيات المراجعة', completed: true, current: false },
    { id: '2', title: 'المراجعة المالية', completed: false, current: true },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
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

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: <Home className="w-5 h-5" /> },
    { id: 'courses', label: 'دوراتي', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'calendar', label: 'الجدول', icon: <Calendar className="w-5 h-5" /> },
    {
      id: 'achievements',
      label: 'الإنجازات',
      icon: <Award className="w-5 h-5" />,
    },
    {
      id: 'analytics',
      label: 'التحليلات',
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      id: 'messages',
      label: 'الرسائل',
      icon: <MessageSquare className="w-5 h-5" />,
    },
    { id: 'help', label: 'المساعدة', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'border-gray-300 bg-gray-50 text-gray-700';
      case 'rare':
        return 'border-blue-300 bg-blue-50 text-blue-700';
      case 'epic':
        return 'border-purple-300 bg-purple-50 text-purple-700';
      case 'legendary':
        return 'border-yellow-300 bg-yellow-50 text-yellow-700';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-200 bg-red-50 text-red-700';
      case 'medium':
        return 'border-yellow-200 bg-yellow-50 text-yellow-700';
      case 'low':
        return 'border-green-200 bg-green-50 text-green-700';
      default:
        return 'border-gray-200 bg-gray-50 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-64 glass-card border-l border-glass-border"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-glass-border">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                    width={40}
                    height={40}
                  />
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {user.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      المستوى {user.level}
                    </p>
                  </div>
                </div>
                {/* XP Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-text-secondary mb-1">
                    <span>XP</span>
                    <span>
                      {user.xp}/{user.nextLevelXP}
                    </span>
                  </div>
                  <div className="w-full bg-background-subtle rounded-full h-2">
                    <motion.div
                      className="bg-gradient-primary-smooth h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(user.xp / user.nextLevelXP) * 100}%`,
                      }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {sidebarItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl transition-all duration-200 ${
                          activeSection === item.id
                            ? 'bg-primary text-white shadow-glow-primary'
                            : 'hover:bg-surface-alt text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {item.icon}
                        <span className="font-medium">{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-glass-border">
                <button className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl hover:bg-surface-alt transition-colors text-text-secondary hover:text-text-primary">
                  <LogOut className="w-5 h-5" />
                  <span>تسجيل الخروج</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex">
        {/* Mobile Sidebar Toggle */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 right-4 z-40 lg:hidden glass-card p-3 rounded-xl shadow-lg"
        >
          {sidebarOpen ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Main Content Area */}
        <div className="flex-1 lg:mr-0">
          <div className="p-6 lg:p-8">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="glass-card p-6 lg:p-8 rounded-2xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse mb-4 lg:mb-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-4 border-white shadow-xl"
                      width={64}
                      height={64}
                    />
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-1">
                        مرحباً، {user.name}! 👋
                      </h1>
                      <p className="text-text-secondary mb-2">
                        استمر في رحلتك التعليمية - لديك {user.streak} أيام
                        متتالية 🔥
                      </p>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium">
                            المستوى {user.level}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Flame className="w-4 h-4 text-orange-500" />
                          <span className="text-sm font-medium">
                            {user.streak} يوم
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="btn-modern-primary flex items-center space-x-2 space-x-reverse"
                    >
                      <Plus className="w-4 h-4" />
                      <span>دورة جديدة</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card px-4 py-2 rounded-xl hover-glow-primary flex items-center space-x-2 space-x-reverse"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>الجدول</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card px-4 py-2 rounded-xl hover-glow-accent flex items-center space-x-2 space-x-reverse"
                    >
                      <BarChart3 className="w-4 h-4" />
                      <span>التحليلات</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-xl font-bold text-text-primary mb-6">
                إحصائيات سريعة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="glass-card p-6 rounded-2xl hover-lift-smooth cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl ${stat.bgColor} group-hover:scale-110 transition-transform duration-200`}
                      >
                        {stat.icon}
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        {stat.changeType === 'increase' ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : stat.changeType === 'decrease' ? (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        ) : null}
                        <span
                          className={`text-sm font-medium ${
                            stat.changeType === 'increase'
                              ? 'text-green-600'
                              : stat.changeType === 'decrease'
                                ? 'text-red-600'
                                : 'text-gray-600'
                          }`}
                        >
                          {stat.changeType === 'neutral'
                            ? ''
                            : `${Math.abs(stat.change)}%`}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-text-secondary mb-1">
                        {stat.title}
                      </h3>
                      <p className={`text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                    {/* Mini Sparkline */}
                    {stat.sparkline && (
                      <div className="flex items-end space-x-1 space-x-reverse h-8">
                        {stat.sparkline.map((value, i) => (
                          <motion.div
                            key={i}
                            className="bg-primary/20 rounded-sm flex-1"
                            initial={{ height: 0 }}
                            animate={{ height: `${value}%` }}
                            transition={{ duration: 0.8, delay: i * 0.1 }}
                            style={{ minHeight: '2px' }}
                          />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Progress Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">
                  تقدم الدورات
                </h2>
                <button className="text-primary hover:text-primary-light transition-colors font-medium">
                  عرض الكل →
                </button>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {currentCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 * index }}
                    className="glass-card p-6 rounded-2xl hover-lift-smooth cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 space-x-reverse mb-4">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-16 h-16 rounded-xl object-cover"
                        width={64}
                        height={64}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-text-secondary mb-2">
                          {course.instructor}
                        </p>
                        <div className="flex items-center space-x-2 space-x-reverse text-xs text-text-muted">
                          <Clock className="w-3 h-3" />
                          <span>ينتهي في {course.dueDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-text-secondary">التقدم</span>
                        <span className="font-medium text-text-primary">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-background-subtle rounded-full h-2">
                        <motion.div
                          className="bg-gradient-primary-smooth h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${course.progress}%` }}
                          transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-text-secondary">
                        {course.completedLessons}/{course.totalLessons} درس
                        مكتمل
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="glass-card px-3 py-1 rounded-lg text-xs font-medium hover-glow-primary"
                        >
                          استمر
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-text-secondary hover:text-text-primary p-1"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Play className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium text-primary">
                          الدرس التالي:
                        </span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">
                        {course.nextLesson}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity & Achievements Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    النشاط الأخير
                  </h2>
                  <button className="text-primary hover:text-primary-light transition-colors font-medium">
                    عرض الكل →
                  </button>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="flex items-start space-x-3 space-x-reverse p-3 rounded-xl hover:bg-surface-alt transition-colors cursor-pointer"
                      >
                        <div
                          className={`p-2 rounded-lg ${activity.color.replace('text-', 'bg-').replace('-600', '-100')} mt-1`}
                        >
                          {activity.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary mb-1">
                            {activity.title}
                          </h4>
                          <p className="text-sm text-text-secondary mb-1">
                            {activity.description}
                          </p>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Clock className="w-3 h-3 text-text-muted" />
                            <span className="text-xs text-text-muted">
                              {activity.time}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    الإنجازات
                  </h2>
                  <button className="text-primary hover:text-primary-light transition-colors font-medium">
                    عرض الكل →
                  </button>
                </div>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className={`glass-card p-4 rounded-xl border-2 ${
                        achievement.earned
                          ? getRarityColor(achievement.rarity)
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      } hover-lift-smooth cursor-pointer`}
                    >
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div
                          className={`p-2 rounded-lg ${
                            achievement.earned
                              ? getRarityColor(achievement.rarity)
                                  .replace('border-', 'bg-')
                                  .replace(' text-', ' text-')
                              : 'bg-gray-100 text-gray-400'
                          }`}
                        >
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-text-primary mb-1">
                            {achievement.title}
                          </h4>
                          <p className="text-sm text-text-secondary mb-2">
                            {achievement.description}
                          </p>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <div className="flex-1 bg-background-subtle rounded-full h-2">
                              <motion.div
                                className={`h-2 rounded-full ${
                                  achievement.earned
                                    ? 'bg-gradient-primary-smooth'
                                    : 'bg-gray-300'
                                }`}
                                initial={{ width: 0 }}
                                animate={{
                                  width: `${(achievement.progress / achievement.total) * 100}%`,
                                }}
                                transition={{
                                  duration: 1,
                                  delay: 0.5 + index * 0.1,
                                }}
                              />
                            </div>
                            <span className="text-xs text-text-muted">
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                        </div>
                        {achievement.earned && (
                          <div className="animate-bounce-subtle">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Upcoming Events & Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    الأحداث القادمة
                  </h2>
                  <button className="text-primary hover:text-primary-light transition-colors font-medium">
                    عرض الكل →
                  </button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 * index }}
                      className={`glass-card p-4 rounded-xl border-r-4 ${
                        event.priority === 'high'
                          ? 'border-red-500'
                          : event.priority === 'medium'
                            ? 'border-yellow-500'
                            : 'border-green-500'
                      } hover-lift-smooth cursor-pointer`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 space-x-reverse">
                          <div
                            className={`p-2 rounded-lg ${
                              event.type === 'exam'
                                ? 'bg-red-100 text-red-600'
                                : event.type === 'deadline'
                                  ? 'bg-orange-100 text-orange-600'
                                  : event.type === 'meeting'
                                    ? 'bg-blue-100 text-blue-600'
                                    : 'bg-purple-100 text-purple-600'
                            }`}
                          >
                            {event.type === 'exam' && (
                              <FileText className="w-4 h-4" />
                            )}
                            {event.type === 'deadline' && (
                              <Clock className="w-4 h-4" />
                            )}
                            {event.type === 'meeting' && (
                              <Users className="w-4 h-4" />
                            )}
                            {event.type === 'webinar' && (
                              <Video className="w-4 h-4" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium text-text-primary mb-1">
                              {event.title}
                            </h4>
                            <div className="flex items-center space-x-4 space-x-reverse text-sm text-text-secondary mb-2">
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Calendar className="w-3 h-3" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <Clock className="w-3 h-3" />
                                <span>{event.time}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <MapPin className="w-3 h-3" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-left">
                          <div
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              event.priority
                            )}`}
                          >
                            <Timer className="w-3 h-3 mr-1" />
                            {event.countdown}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Stats Charts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    تحليلات سريعة
                  </h2>
                  <div className="flex space-x-2 space-x-reverse">
                    <button className="p-2 glass-card rounded-lg hover-glow-primary">
                      <BarChart3 className="w-4 h-4" />
                    </button>
                    <button className="p-2 glass-card rounded-lg hover-glow-accent">
                      <PieChart className="w-4 h-4" />
                    </button>
                    <button className="p-2 glass-card rounded-lg hover-glow-primary">
                      <Activity className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Study Time Chart */}
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-semibold text-text-primary mb-4">
                      وقت الدراسة الأسبوعي
                    </h3>
                    <div className="flex items-end justify-between h-32 mb-4">
                      {[
                        'السبت',
                        'الأحد',
                        'الاثنين',
                        'الثلاثاء',
                        'الأربعاء',
                        'الخميس',
                        'الجمعة',
                      ].map((day, index) => {
                        const height = [60, 45, 80, 70, 90, 55, 75][index];
                        return (
                          <div
                            key={day}
                            className="flex flex-col items-center flex-1"
                          >
                            <motion.div
                              className="bg-gradient-primary-smooth rounded-t-lg w-full max-w-8 hover-glow-primary cursor-pointer"
                              initial={{ height: 0 }}
                              animate={{ height: `${height}%` }}
                              transition={{ duration: 0.8, delay: index * 0.1 }}
                              style={{ minHeight: '4px' }}
                            />
                            <span className="text-xs text-text-secondary mt-2">
                              {day}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">
                        متوسط: 7.2 ساعات/يوم
                      </span>
                      <span className="text-green-600 font-medium">
                        +12% من الأسبوع الماضي
                      </span>
                    </div>
                  </div>

                  {/* Performance Overview */}
                  <div className="glass-card p-6 rounded-2xl">
                    <h3 className="font-semibold text-text-primary mb-4">
                      نظرة على الأداء
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-text-secondary">
                            الاختبارات المجتازة
                          </span>
                        </div>
                        <span className="font-semibold text-green-600">
                          85%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-text-secondary">
                            متوسط الدرجات
                          </span>
                        </div>
                        <span className="font-semibold text-blue-600">92%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-text-secondary">
                            الدورات المكتملة
                          </span>
                        </div>
                        <span className="font-semibold text-purple-600">
                          12
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Learning Path */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LearningPathVisual steps={learningSteps} />
              <PathProgressTracker 
                progress={65} 
                completedSteps={5} 
                totalSteps={8} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
