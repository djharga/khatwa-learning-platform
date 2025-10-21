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
  BookMarked,
  Clock4,
  CheckSquare,
  AlertTriangle,

  Users2,
  CalendarDays,
  FileCheck,
  Target as TargetIcon,
  Zap as ZapIcon,
  Award as AwardIcon,
  BookOpen as BookOpenIcon,
  Bell as BellIcon,
  Settings as SettingsIcon,
  ChevronDown,
  ChevronUp,
  Eye as EyeIcon,
  EyeOff,
  RefreshCw,
  PlusCircle,
  MinusCircle,
  X,
  Check,
  AlertCircle as AlertCircleIcon,
} from 'lucide-react';

interface QuickStat {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: number[];
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
  difficulty: 'مبتدئ' | 'متوسط' | 'متقدم';
  category: string;
  rating: number;
  duration: string;
  status: 'مستمر' | 'مكتمل' | 'متوقف';
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  type: 'مشروع' | 'واجب' | 'اختبار' | 'مناقشة';
  dueDate: string;
  status: 'غير مكتمل' | 'قيد المراجعة' | 'مكتمل' | 'متأخر';
  priority: 'منخفض' | 'متوسط' | 'عالي' | 'عاجل';
  progress: number;
  description: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  total: number;
  earned: boolean;
  rarity: 'عادي' | 'نادر' | 'ملحمي' | 'أسطوري';
  earnedDate?: string;
}

interface Activity {
  id: string;
  type: 'درس' | 'اختبار' | 'مشروع' | 'مناقشة' | 'إنجاز';
  title: string;
  description: string;
  time: string;
  icon: React.ReactNode;
  color: string;
  metadata?: {
    score?: number;
    duration?: string;
    course?: string;
  };
}

export default function StudentDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [showDetails, setShowDetails] = useState(false);

  // Mock data - in real app, this would come from API
  const user = {
    name: 'أحمد محمد علي',
    avatar: '/api/placeholder/64/64',
    level: 15,
    xp: 3420,
    nextLevelXP: 4000,
    streak: 12,
    role: 'طالب متميز',
    joinDate: 'يناير 2024',
    totalStudyTime: '156 ساعة',
    completedCourses: 8,
    currentGPA: 3.8,
  };

  const quickStats: QuickStat[] = [
    {
      id: 'courses',
      title: 'الدورات النشطة',
      value: 5,
      change: 25,
      changeType: 'increase',
      icon: <BookOpenIcon className="w-6 h-6" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      trend: [3, 4, 3, 5, 4, 5, 5],
    },
    {
      id: 'assignments',
      title: 'المهام المعلقة',
      value: 7,
      change: -12.5,
      changeType: 'decrease',
      icon: <FileCheck className="w-6 h-6" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      trend: [8, 9, 7, 8, 6, 7, 7],
    },
    {
      id: 'achievements',
      title: 'الإنجازات',
      value: 23,
      change: 15,
      changeType: 'increase',
      icon: <AwardIcon className="w-6 h-6" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      trend: [18, 19, 20, 21, 22, 23, 23],
    },
    {
      id: 'study-time',
      title: 'ساعات الدراسة',
      value: '47h',
      change: 8.3,
      changeType: 'increase',
      icon: <Clock4 className="w-6 h-6" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      trend: [35, 38, 42, 40, 45, 46, 47],
    },
  ];

  const currentCourses: Course[] = [
    {
      id: '1',
      title: 'المحاسبة المالية المتقدمة',
      progress: 78,
      totalLessons: 24,
      completedLessons: 19,
      nextLesson: 'تحليل التدفقات النقدية - الجزء 2',
      instructor: 'د. سارة أحمد',
      image: '/api/placeholder/300/200',
      dueDate: '2024-02-20',
      difficulty: 'متقدم',
      category: 'المحاسبة المالية',
      rating: 4.8,
      duration: '8 أسابيع',
      status: 'مستمر',
    },
    {
      id: '2',
      title: 'التدقيق والمراجعة الداخلية',
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      nextLesson: 'أساسيات المراجعة الداخلية',
      instructor: 'د. محمد علي حسن',
      image: '/api/placeholder/300/200',
      dueDate: '2024-03-01',
      difficulty: 'متوسط',
      category: 'المراجعة الداخلية',
      rating: 4.6,
      duration: '6 أسابيع',
      status: 'مستمر',
    },
    {
      id: '3',
      title: 'المحاسبة الإدارية',
      progress: 92,
      totalLessons: 18,
      completedLessons: 17,
      nextLesson: 'الاختبار النهائي',
      instructor: 'د. فاطمة خالد',
      image: '/api/placeholder/300/200',
      dueDate: '2024-02-25',
      difficulty: 'متوسط',
      category: 'المحاسبة الإدارية',
      rating: 4.7,
      duration: '5 أسابيع',
      status: 'مستمر',
    },
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'تحليل القوائم المالية لشركة مصنعية',
      course: 'المحاسبة المالية المتقدمة',
      type: 'مشروع',
      dueDate: '2024-02-18',
      status: 'غير مكتمل',
      priority: 'عالي',
      progress: 65,
      description: 'تحليل شامل للقوائم المالية مع التوصيات',
    },
    {
      id: '2',
      title: 'اختبار المراجعة الداخلية - الفصل 3',
      course: 'التدقيق والمراجعة الداخلية',
      type: 'اختبار',
      dueDate: '2024-02-16',
      status: 'متأخر',
      priority: 'عاجل',
      progress: 0,
      description: 'اختبار شامل في أساسيات المراجعة الداخلية',
    },
    {
      id: '3',
      title: 'مناقشة حالة دراسية في المحاسبة الإدارية',
      course: 'المحاسبة الإدارية',
      type: 'مناقشة',
      dueDate: '2024-02-22',
      status: 'قيد المراجعة',
      priority: 'متوسط',
      progress: 100,
      description: 'مناقشة حالة دراسية عملية في اتخاذ القرارات الإدارية',
    },
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'المتفوق في المحاسبة',
      description: 'الحصول على درجة امتياز في 5 دورات محاسبة متتالية',
      icon: <Crown className="w-6 h-6" />,
      progress: 5,
      total: 5,
      earned: true,
      rarity: 'نادر',
      earnedDate: '2024-02-10',
    },
    {
      id: '2',
      title: 'مشارك نشط',
      description: 'المشاركة في 20 مناقشة في المجتمع',
      icon: <Users2 className="w-6 h-6" />,
      progress: 18,
      total: 20,
      earned: false,
      rarity: 'عادي',
    },
    {
      id: '3',
      title: 'السلسلة الذهبية',
      description: 'الحفاظ على سلسلة دراسية لمدة 30 يوم متتالي',
      icon: <Flame className="w-6 h-6" />,
      progress: 25,
      total: 30,
      earned: false,
      rarity: 'ملحمي',
    },
    {
      id: '4',
      title: 'خبير المشاريع',
      description: 'إكمال 10 مشاريع بنجاح مع تقييم ممتاز',
      icon: <TargetIcon className="w-6 h-6" />,
      progress: 7,
      total: 10,
      earned: false,
      rarity: 'أسطوري',
    },
  ];

  const recentActivities: Activity[] = [
    {
      id: '1',
      type: 'درس',
      title: 'إكمال درس "تحليل التكاليف"',
      description: 'في دورة المحاسبة الإدارية',
      time: 'منذ ساعتين',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'text-green-600',
      metadata: {
        duration: '45 دقيقة',
        course: 'المحاسبة الإدارية',
      },
    },
    {
      id: '2',
      type: 'إنجاز',
      title: 'حصول على إنجاز "المتفوق في المحاسبة"',
      description: 'تهانينا على تفوقك المستمر!',
      time: 'أمس',
      icon: <Trophy className="w-5 h-5" />,
      color: 'text-yellow-600',
    },
    {
      id: '3',
      type: 'مشروع',
      title: 'تسليم مشروع "دراسة حالة في التدقيق"',
      description: 'تم تسليم المشروع وهو الآن قيد المراجعة',
      time: 'منذ 3 أيام',
      icon: <FileCheck className="w-5 h-5" />,
      color: 'text-blue-600',
      metadata: {
        course: 'التدقيق والمراجعة الداخلية',
      },
    },
    {
      id: '4',
      type: 'اختبار',
      title: 'نتيجة اختبار "أساسيات المحاسبة"',
      description: 'درجة 94/100 - ممتاز جداً!',
      time: 'منذ أسبوع',
      icon: <AwardIcon className="w-5 h-5" />,
      color: 'text-purple-600',
      metadata: {
        score: 94,
        course: 'أساسيات المحاسبة',
      },
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-10 h-10 border-3 border-primary border-t-transparent rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-text-secondary mb-2">جاري تحميل لوحة التحكم...</p>
          <p className="text-sm text-text-muted">قد يستغرق هذا بضع ثوانٍ</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'نظرة عامة', icon: <Home className="w-5 h-5" />, badge: null },
    { id: 'courses', label: 'دوراتي', icon: <BookOpen className="w-5 h-5" />, badge: '5' },
    { id: 'assignments', label: 'المهام', icon: <FileCheck className="w-5 h-5" />, badge: '7' },
    { id: 'calendar', label: 'الجدول الزمني', icon: <Calendar className="w-5 h-5" />, badge: '3' },
    { id: 'grades', label: 'الدرجات', icon: <BarChart3 className="w-5 h-5" />, badge: null },
    { id: 'achievements', label: 'الإنجازات', icon: <Award className="w-5 h-5" />, badge: '2' },
    { id: 'messages', label: 'الرسائل', icon: <MessageSquare className="w-5 h-5" />, badge: '5' },
    { id: 'notifications', label: 'الإشعارات', icon: <Bell className="w-5 h-5" />, badge: '3' },
    { id: 'settings', label: 'الإعدادات', icon: <Settings className="w-5 h-5" />, badge: null },
    { id: 'help', label: 'المساعدة', icon: <HelpCircle className="w-5 h-5" />, badge: null },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'عادي':
        return 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300';
      case 'نادر':
        return 'border-blue-300 bg-blue-50 text-blue-700 dark:border-blue-600 dark:bg-blue-900/20 dark:text-blue-300';
      case 'ملحمي':
        return 'border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-600 dark:bg-purple-900/20 dark:text-purple-300';
      case 'أسطوري':
        return 'border-yellow-300 bg-yellow-50 text-yellow-700 dark:border-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-300';
      default:
        return 'border-gray-300 bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل':
        return 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300';
      case 'قيد المراجعة':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300';
      case 'متأخر':
        return 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300';
      case 'غير مكتمل':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عاجل':
        return 'border-l-red-500 bg-red-50/50 dark:bg-red-900/10';
      case 'عالي':
        return 'border-l-orange-500 bg-orange-50/50 dark:bg-orange-900/10';
      case 'متوسط':
        return 'border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10';
      case 'منخفض':
        return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/10';
      default:
        return 'border-l-gray-500 bg-gray-50/50 dark:bg-gray-900/10';
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
            className="fixed inset-y-0 right-0 z-50 w-72 glass-card border-l border-glass-border"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-glass-border">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-lg"
                      width={48}
                      height={48}
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary text-sm">
                      {user.name}
                    </h3>
                    <p className="text-xs text-text-secondary">
                      {user.role}
                    </p>
                    <div className="flex items-center space-x-2 space-x-reverse mt-2">
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <ZapIcon className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs font-medium">
                          المستوى {user.level}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse">
                        <Flame className="w-3 h-3 text-orange-500" />
                        <span className="text-xs font-medium">
                          {user.streak} يوم
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* XP Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-text-secondary mb-2">
                    <span>تقدم المستوى</span>
                    <span>
                      {user.xp}/{user.nextLevelXP} XP
                    </span>
                  </div>
                  <div className="w-full bg-background-subtle rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${(user.xp / user.nextLevelXP) * 100}%`,
                      }}
                      transition={{ duration: 1.2, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4 overflow-y-auto">
                <ul className="space-y-1">
                  {sidebarItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => {
                          setActiveSection(item.id);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 text-sm ${
                          activeSection === item.id
                            ? 'bg-primary text-white shadow-glow-primary'
                            : 'hover:bg-surface-alt text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        <div className="flex items-center space-x-3 space-x-reverse">
                          {item.icon}
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            activeSection === item.id
                              ? 'bg-white/20 text-white'
                              : 'bg-primary/10 text-primary'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-glass-border">
                <button className="w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl hover:bg-surface-alt transition-colors text-text-secondary hover:text-text-primary">
                  <LogOut className="w-5 h-5" />
                  <span className="text-sm">تسجيل الخروج</span>
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
          className="fixed top-4 right-4 z-40 lg:hidden glass-card p-3 rounded-xl shadow-lg hover-glow-primary"
        >
          {sidebarOpen ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>

        {/* Main Content Area */}
        <div className="flex-1 lg:mr-0">
          <div className="p-4 lg:p-8">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="glass-card p-6 lg:p-8 rounded-2xl">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-center space-x-6 space-x-reverse mb-6 lg:mb-0">
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-20 h-20 rounded-full border-4 border-white shadow-xl"
                        width={80}
                        height={80}
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-primary to-primary-light border-4 border-white rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">{user.level}</span>
                      </div>
                    </div>
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
                        مرحباً بعودتك، {user.name.split(' ')[0]}! 👋
                      </h1>
                      <p className="text-text-secondary mb-3 text-lg">
                        استمر في رحلتك التعليمية - أنت تقوم بعمل رائع!
                      </p>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Flame className="w-5 h-5 text-orange-500" />
                          <span className="text-sm font-medium">
                            سلسلة دراسية: {user.streak} يوم متتالي
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <GraduationCap className="w-5 h-5 text-blue-500" />
                          <span className="text-sm font-medium">
                            المعدل التراكمي: {user.currentGPA}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Clock4 className="w-5 h-5 text-green-500" />
                          <span className="text-sm font-medium">
                            إجمالي وقت الدراسة: {user.totalStudyTime}
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
                      <PlusCircle className="w-5 h-5" />
                      <span>دورة جديدة</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card px-4 py-3 rounded-xl hover-glow-accent flex items-center space-x-2 space-x-reverse"
                    >
                      <CalendarDays className="w-5 h-5" />
                      <span>عرض الجدول</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card px-4 py-3 rounded-xl hover-glow-primary flex items-center space-x-2 space-x-reverse"
                    >
                      <BarChart3 className="w-5 h-5" />
                      <span>التحليلات</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">
                  نظرة سريعة على تقدمك
                </h2>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <select
                    value={selectedPeriod}
                    onChange={(e) => setSelectedPeriod(e.target.value)}
                    className="px-3 py-1 glass-card rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="week">هذا الأسبوع</option>
                    <option value="month">هذا الشهر</option>
                    <option value="semester">هذا الفصل</option>
                  </select>
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="p-2 glass-card rounded-lg hover-glow-primary"
                  >
                    {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat, index) => (
                  <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="glass-card p-6 rounded-2xl hover-lift-smooth cursor-pointer group relative overflow-hidden"
                  >
                    <div className="relative z-10">
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

                      {/* Mini Trend Chart */}
                      {stat.trend && showDetails && (
                        <div className="flex items-end space-x-1 space-x-reverse h-8 mb-2">
                          {stat.trend.map((value, i) => (
                            <motion.div
                              key={i}
                              className="bg-primary/20 rounded-sm flex-1"
                              initial={{ height: 0 }}
                              animate={{ height: `${(value / Math.max(...stat.trend!)) * 100}%` }}
                              transition={{ duration: 0.8, delay: i * 0.1 }}
                              style={{ minHeight: '2px' }}
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/5 to-transparent rounded-full -translate-y-4 translate-x-4"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Current Courses & Assignments Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Current Courses */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    الدورات الحالية
                  </h2>
                  <button className="text-primary hover:text-primary-light transition-colors font-medium">
                    عرض الكل →
                  </button>
                </div>
                <div className="space-y-4">
                  {currentCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className="glass-card p-6 rounded-2xl hover-lift-smooth cursor-pointer"
                    >
                      <div className="flex items-start space-x-4 space-x-reverse mb-4">
                        <div className="relative">
                          <img
                            src={course.image}
                            alt={course.title}
                            className="w-16 h-16 rounded-xl object-cover"
                            width={64}
                            height={64}
                          />
                          <div className={`absolute -top-1 -right-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                            course.status === 'مكتمل' ? 'bg-green-100 text-green-700' :
                            course.status === 'متوقف' ? 'bg-red-100 text-red-700' :
                            'bg-blue-100 text-blue-700'
                          }`}>
                            {course.status}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-text-primary mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-text-secondary mb-2">
                            {course.instructor}
                          </p>
                          <div className="flex items-center space-x-4 space-x-reverse text-xs text-text-muted mb-3">
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Clock className="w-3 h-3" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <Star className="w-3 h-3" />
                              <span>{course.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1 space-x-reverse">
                              <TargetIcon className="w-3 h-3" />
                              <span>{course.difficulty}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-text-secondary">التقدم العام</span>
                          <span className="font-medium text-text-primary">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-background-subtle rounded-full h-2">
                          <motion.div
                            className="bg-gradient-to-r from-primary to-primary-light h-2 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-text-muted mt-1">
                          <span>{course.completedLessons}/{course.totalLessons} درس مكتمل</span>
                          <span>ينتهي في {course.dueDate}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2 space-x-reverse">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card px-3 py-2 rounded-lg text-sm font-medium hover-glow-primary"
                          >
                            <Play className="w-4 h-4 mr-1" />
                            استمرار
                          </motion.button>
                        </div>
                        <div className="text-sm text-text-secondary">
                          الدرس التالي: {course.nextLesson}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Assignments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    المهام والاختبارات
                  </h2>
                  <button className="text-primary hover:text-primary-light transition-colors font-medium">
                    عرض الكل →
                  </button>
                </div>
                <div className="space-y-4">
                  {assignments.map((assignment, index) => (
                    <motion.div
                      key={assignment.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 * index }}
                      className={`glass-card p-4 rounded-xl border-r-4 ${getPriorityColor(assignment.priority)} hover-lift-smooth cursor-pointer`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 space-x-reverse mb-1">
                            <h4 className="font-medium text-text-primary">
                              {assignment.title}
                            </h4>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </div>
                          <p className="text-sm text-text-secondary mb-2">
                            {assignment.course}
                          </p>
                          <p className="text-xs text-text-muted">
                            {assignment.description}
                          </p>
                        </div>
                      </div>

                      {assignment.progress > 0 && (
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-text-secondary">التقدم</span>
                            <span className="font-medium text-text-primary">
                              {assignment.progress}%
                            </span>
                          </div>
                          <div className="w-full bg-background-subtle rounded-full h-1.5">
                            <motion.div
                              className="bg-gradient-to-r from-primary to-primary-light h-1.5 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${assignment.progress}%` }}
                              transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 space-x-reverse text-xs text-text-muted">
                          <Calendar className="w-3 h-3" />
                          <span>موعد التسليم: {assignment.dueDate}</span>
                        </div>
                        <div className="flex space-x-2 space-x-reverse">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass-card px-3 py-1 rounded-lg text-xs font-medium hover-glow-primary"
                          >
                            {assignment.status === 'غير مكتمل' ? 'بدء العمل' : 'عرض التفاصيل'}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Recent Activity & Achievements Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
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
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Clock className="w-3 h-3 text-text-muted" />
                              <span className="text-xs text-text-muted">
                                {activity.time}
                              </span>
                              {activity.metadata?.course && (
                                <span className="text-xs text-text-muted">
                                  • {activity.metadata.course}
                                </span>
                              )}
                            </div>
                            {activity.metadata?.score && (
                              <div className="flex items-center space-x-1 space-x-reverse">
                                <AwardIcon className="w-3 h-3 text-green-500" />
                                <span className="text-xs font-medium text-green-600">
                                  {activity.metadata.score}%
                                </span>
                              </div>
                            )}
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
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    الإنجازات الأخيرة
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
                          : 'border-gray-200 bg-gray-50 opacity-60 dark:border-gray-700 dark:bg-gray-800 dark:opacity-60'
                      } hover-lift-smooth cursor-pointer relative overflow-hidden`}
                    >
                      {achievement.earned && (
                        <div className="absolute top-2 left-2">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div
                          className={`p-2 rounded-lg flex-shrink-0 ${
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
                                    ? 'bg-gradient-to-r from-primary to-primary-light'
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
                          {achievement.earned && achievement.earnedDate && (
                            <div className="flex items-center space-x-1 space-x-reverse mt-2">
                              <Calendar className="w-3 h-3 text-green-500" />
                              <span className="text-xs text-green-600">
                                تم الحصول عليه في {achievement.earnedDate}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Study Progress Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="mb-8"
            >
              <div className="glass-card p-6 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-text-primary">
                    تقدم الدراسة الأسبوعي
                  </h2>
                  <div className="flex items-center space-x-2 space-x-reverse">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Study Time Chart */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-4">
                      ساعات الدراسة اليومية
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
                        const height = [4, 6, 8, 5, 7, 9, 3][index];
                        return (
                          <div
                            key={day}
                            className="flex flex-col items-center flex-1"
                          >
                            <motion.div
                              className="bg-gradient-to-t from-primary to-primary-light rounded-t-lg w-full max-w-12 hover-glow-primary cursor-pointer"
                              initial={{ height: 0 }}
                              animate={{ height: `${height * 10}%` }}
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
                        متوسط: 6.2 ساعات/يوم
                      </span>
                      <span className="text-green-600 font-medium">
                        +18% من الأسبوع الماضي
                      </span>
                    </div>
                  </div>

                  {/* Performance Overview */}
                  <div>
                    <h3 className="font-semibold text-text-primary mb-4">
                      نظرة على الأداء العام
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
                          92%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-text-secondary">
                            متوسط الدرجات
                          </span>
                        </div>
                        <span className="font-semibold text-blue-600">94%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm text-text-secondary">
                            الدورات المكتملة
                          </span>
                        </div>
                        <span className="font-semibold text-purple-600">
                          {user.completedCourses}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 space-x-reverse">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-text-secondary">
                            وقت الدراسة الإجمالي
                          </span>
                        </div>
                        <span className="font-semibold text-orange-600">
                          {user.totalStudyTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Quick Actions Footer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="glass-card p-6 rounded-2xl"
            >
              <h2 className="text-xl font-bold text-text-primary mb-6">
                إجراءات سريعة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 glass-card rounded-xl hover-glow-primary transition-all duration-200"
                >
                  <BookOpenIcon className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">دوراتي</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 glass-card rounded-xl hover-glow-accent transition-all duration-200"
                >
                  <FileCheck className="w-6 h-6 text-accent" />
                  <span className="text-sm font-medium">المهام</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 glass-card rounded-xl hover-glow-primary transition-all duration-200"
                >
                  <Calendar className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">الجدول</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 glass-card rounded-xl hover-glow-accent transition-all duration-200"
                >
                  <AwardIcon className="w-6 h-6 text-accent" />
                  <span className="text-sm font-medium">الإنجازات</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 glass-card rounded-xl hover-glow-primary transition-all duration-200"
                >
                  <BarChart3 className="w-6 h-6 text-primary" />
                  <span className="text-sm font-medium">التحليلات</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center space-y-2 p-4 glass-card rounded-xl hover-glow-accent transition-all duration-200"
                >
                  <BellIcon className="w-6 h-6 text-accent" />
                  <span className="text-sm font-medium">الإشعارات</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
