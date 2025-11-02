'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernTabs, ModernTabContent } from '@/components/ui/ModernTabs';
import {
  Home,
  BookOpen,
  Users,
  Clock,
  Star,
  Award,
  TrendingUp,
  Calendar,
  MessageSquare,
  Plus,
  Search,
  Filter,
  Grid3x3,
  List,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Play,
  CheckCircle,
  Target,
  Zap,
  BarChart3,
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
  GraduationCap,
  Briefcase,
  HelpCircle,
  Settings,
  Bell,
  User,
  Heart,
  Share,
  Download,
  Eye,
  ThumbsUp,
  MessageCircle,
  MoreHorizontal,
  LogOut,
  ArrowRight,
  ArrowLeft,
  X,
  Phone,
  Mail,
  MapPin as LocationIcon,
  DollarSign,
  CreditCard,
  Receipt,
  TrendingDown,
  AlertCircle,
  Info,
  Check,
  ExternalLink,
  Link,
  Bookmark,
  BookmarkCheck,
  ShoppingCart,
  Star as StarIcon,
  StarHalf,
  StarOff,
  Headphones,
} from 'lucide-react';

// Import existing components
import CoursesComponent from '@/components/CoursesComponent';
import ConsultingComponent from '@/components/ConsultingComponent';
import CourseTreeView from '@/components/CourseTreeView';
import CourseCard from '@/components/CourseCard';

// Mock data for the learning hub
const mockStats = {
  totalCourses: 24,
  enrolledCourses: 8,
  completedCourses: 5,
  totalHours: 156,
  completedHours: 89,
  averageRating: 4.8,
  totalStudents: 15420,
  certificatesEarned: 12,
  achievementsUnlocked: 18,
  streakDays: 7,
  xpPoints: 2840,
  level: 12,
};

const mockAchievements = [
  {
    id: '1',
    title: 'أول خطوة',
    description: 'إكمال أول دورة تدريبية',
    icon: <Medal className="w-6 h-6" />,
    progress: 1,
    total: 1,
    earned: true,
    rarity: 'common',
    earnedDate: '2024-01-15',
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
    earnedDate: '2024-02-20',
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

const mockLearningPath = [
  {
    id: '1',
    title: 'أساسيات المحاسبة',
    description: 'تعلم أساسيات المحاسبة المالية والقوائم المالية',
    courses: ['أساسيات المحاسبة', 'القوائم المالية الأساسية'],
    progress: 100,
    completed: true,
    level: 'مبتدئ',
  },
  {
    id: '2',
    title: 'المحاسبة المتقدمة',
    description: 'دراسة المعايير الدولية والتقارير المالية المتقدمة',
    courses: ['المحاسبة المتقدمة', 'معايير IFRS', 'التحليل المالي'],
    progress: 65,
    completed: false,
    level: 'متوسط',
    current: true,
  },
  {
    id: '3',
    title: 'المراجعة والتدقيق',
    description: 'تعلم أساسيات المراجعة الداخلية والخارجية',
    courses: ['أساسيات المراجعة', 'التدقيق الداخلي', 'إدارة المخاطر'],
    progress: 0,
    completed: false,
    level: 'متقدم',
  },
];

const mockRecommendations = [
  {
    id: '1',
    title: 'دورة إدارة المشاريع المالية',
    description: 'تعلم إدارة المشاريع المالية باستخدام أحدث الأدوات',
    instructor: 'د. سارة أحمد',
    rating: 4.9,
    students: 1250,
    duration: '8 أسابيع',
    price: '$299',
    image: '/courses/project-management.jpg',
    category: 'إدارة المشاريع',
    level: 'متوسط',
    reason: 'بناءً على اهتمامك بإدارة المخازن',
  },
  {
    id: '2',
    title: 'التحليل المالي المتقدم',
    description: 'أدوات وتقنيات التحليل المالي لاتخاذ القرارات الاستراتيجية',
    instructor: 'د. محمد علي',
    rating: 4.8,
    students: 980,
    duration: '10 أسابيع',
    price: '$349',
    image: '/courses/advanced-analysis.jpg',
    category: 'التحليل المالي',
    level: 'متقدم',
    reason: 'تكملة لدوراتك الحالية',
  },
];

const mockActivityLog = [
  {
    id: '1',
    type: 'course_completed',
    title: 'إكمال دورة "أساسيات المحاسبة"',
    description: 'حصلت على شهادة إتمام الدورة',
    time: 'منذ يومين',
    icon: <CheckCircle className="w-5 h-5 text-green-600" />,
    color: 'bg-green-50 border-green-200',
  },
  {
    id: '2',
    type: 'achievement_unlocked',
    title: 'إنجاز جديد: المتفوق',
    description: 'إكمال 5 دورات متتالية',
    time: 'منذ 3 أيام',
    icon: <Trophy className="w-5 h-5 text-yellow-600" />,
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    id: '3',
    type: 'consultation_booked',
    title: 'حجز جلسة استشارية',
    description: 'مع د. فاطمة خالد - غداً الساعة 2:00 مساءً',
    time: 'منذ أسبوع',
    icon: <Calendar className="w-5 h-5 text-blue-600" />,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    id: '4',
    type: 'course_started',
    title: 'بدء دورة "التحليل المالي"',
    description: 'دورة جديدة من د. أحمد حسن',
    time: 'منذ أسبوعين',
    icon: <Play className="w-5 h-5 text-purple-600" />,
    color: 'bg-purple-50 border-purple-200',
  },
];

export default function LearningHubPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'overview', label: 'نظرة عامة', icon: Home },
    { id: 'courses', label: 'الدورات', icon: BookOpen },
    { id: 'learning-path', label: 'المسار التعليمي', icon: Layers },
    { id: 'consulting', label: 'الاستشارات', icon: MessageSquare },
    { id: 'achievements', label: 'الإنجازات', icon: Award },
    { id: 'activity', label: 'النشاط', icon: Activity },
  ];

  const categories = [
    { id: 'all', label: 'جميع الدورات', count: mockStats.totalCourses },
    { id: 'accounting', label: 'المحاسبة المالية', count: 8 },
    { id: 'audit', label: 'المراجعة والتدقيق', count: 6 },
    { id: 'finance', label: 'الإدارة المالية', count: 5 },
    { id: 'warehouse', label: 'إدارة المخازن', count: 3 },
    { id: 'projects', label: 'إدارة المشاريع', count: 2 },
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

  const StatCard = ({ title, value, change, changeType, icon, color, bgColor }: any) => (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
        <div className="flex items-center gap-1">
          {changeType === 'increase' ? (
            <TrendingUp className="w-4 h-4 text-green-500" />
          ) : changeType === 'decrease' ? (
            <TrendingDown className="w-4 h-4 text-red-500" />
          ) : null}
          <span className={`text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' :
            changeType === 'decrease' ? 'text-red-600' : 'text-gray-600'
          }`}>
            {changeType !== 'neutral' ? `${Math.abs(change)}%` : ''}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </motion.div>
  );

  const renderOverviewTab = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">مرحباً بك في مركز التعلم! 👋</h1>
              <p className="text-lg opacity-90 mb-4">
                استمر في رحلتك التعليمية - لديك {mockStats.streakDays} أيام متتالية 🔥
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>المستوى {mockStats.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>{mockStats.xpPoints} نقطة خبرة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  <span>{mockStats.streakDays} يوم</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-2">{Math.round((mockStats.completedHours / mockStats.totalHours) * 100)}%</div>
              <div className="text-sm opacity-90">تقدم عام</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <StatCard
          title="الدورات المسجلة"
          value={mockStats.enrolledCourses}
          change={12.5}
          changeType="increase"
          icon={<BookOpen className="w-6 h-6" />}
          color="text-blue-600"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title="نسبة الإكمال"
          value={`${Math.round((mockStats.completedCourses / mockStats.enrolledCourses) * 100)}%`}
          change={5.2}
          changeType="increase"
          icon={<Target className="w-6 h-6" />}
          color="text-green-600"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          title="الساعات المكتملة"
          value={mockStats.completedHours}
          change={8.1}
          changeType="increase"
          icon={<Clock className="w-6 h-6" />}
          color="text-purple-600"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatCard
          title="الإنجازات"
          value={mockStats.achievementsUnlocked}
          change={20}
          changeType="increase"
          icon={<Award className="w-6 h-6" />}
          color="text-yellow-600"
          bgColor="bg-yellow-50 dark:bg-yellow-900/20"
        />
      </motion.div>

      {/* Current Courses & Learning Path */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Courses */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">الدورات الحالية</h2>
            <button className="text-primary hover:text-primary/80 font-medium text-sm">
              عرض الكل →
            </button>
          </div>
          <div className="space-y-4">
            {/* Mock current courses - you can replace with actual data */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">المحاسبة المتقدمة</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">75% مكتمل • 18/24 درس</p>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                استمر
              </button>
            </div>
          </div>
        </motion.div>

        {/* Learning Path Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">المسار التعليمي</h2>
            <button className="text-primary hover:text-primary/80 font-medium text-sm">
              عرض التفاصيل →
            </button>
          </div>
          <div className="space-y-4">
            {mockLearningPath.map((path, index) => (
              <div key={path.id} className="flex items-center gap-4">
                <div className={`w-4 h-4 rounded-full ${
                  path.completed ? 'bg-green-500' :
                  path.current ? 'bg-primary animate-pulse' : 'bg-gray-300'
                }`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">{path.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{path.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      path.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                      path.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {path.level}
                    </span>
                    <span className="text-xs text-gray-500">{path.progress}% مكتمل</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recommendations & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">التوصيات لك</h2>
            <button className="text-primary hover:text-primary/80 font-medium text-sm">
              عرض المزيد →
            </button>
          </div>
          <div className="space-y-4">
            {mockRecommendations.map((rec) => (
              <div key={rec.id} className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg flex-shrink-0"></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{rec.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{rec.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{rec.instructor}</span>
                    <span>{rec.duration}</span>
                    <span>{rec.price}</span>
                  </div>
                  <p className="text-xs text-primary mt-1">{rec.reason}</p>
                </div>
                <button className="px-3 py-1 bg-primary text-white rounded-lg text-sm hover:bg-primary/90">
                  التسجيل
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">النشاط الأخير</h2>
            <button className="text-primary hover:text-primary/80 font-medium text-sm">
              عرض الكل →
            </button>
          </div>
          <div className="space-y-4">
            {mockActivityLog.slice(0, 4).map((activity) => (
              <div key={activity.id} className={`flex items-start gap-3 p-3 rounded-lg border ${activity.color}`}>
                <div className="mt-1">{activity.icon}</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{activity.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const renderCoursesTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن دورة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-6 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label} ({cat.count})</option>
            ))}
          </select>

          {/* View Mode */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Courses Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <CoursesComponent />
      </motion.div>
    </div>
  );

  const renderLearningPathTab = () => {
    // Import courses data
    const { getAllCourses } = require('@/data/courses/all-courses');
    const allCoursesData = getAllCourses() || [];
    
    return (
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">رحلة المسارات التعليمية</h1>
          </div>

          {/* الدورات والمسارات مجمعة */}
          <div className="space-y-8">
            {/* عرض الدورات بشكل أفقي مع أيقونات */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">الدورات المتاحة</h2>
              <div className="overflow-x-auto pb-4">
                <div className="flex gap-6 min-w-max">
                  {allCoursesData.slice(0, 10).map((course: any, index: number) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="min-w-[280px] bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg">{course.title}</h3>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center gap-1">
                              <FileText className="w-4 h-4" />
                              <span>{course.files}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Video className="w-4 h-4" />
                              <span>{course.videos}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Headphones className="w-4 h-4" />
                              <span>{course.audios}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-semibold">{course.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{course.price}</span>
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            ابدأ الآن
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              {/* أسهم التنقل */}
              <div className="flex justify-center gap-4 mt-4">
                <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* المسارات */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">المسارات التعليمية</h2>
              {mockLearningPath.map((path, index) => (
                <motion.div
                  key={path.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl border-2 ${
                    path.completed ? 'border-green-200 bg-green-50 dark:bg-green-900/20' :
                    path.current ? 'border-primary bg-primary/5' :
                    'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        path.completed ? 'bg-green-500 text-white' :
                        path.current ? 'bg-primary text-white' :
                        'bg-gray-300 dark:bg-gray-600 text-gray-600'
                      }`}>
                        {path.completed ? <CheckCircle className="w-6 h-6" /> :
                         path.current ? <Play className="w-6 h-6" /> :
                         <Clock className="w-6 h-6" />}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{path.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{path.description}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      path.level === 'مبتدئ' ? 'bg-green-100 text-green-800' :
                      path.level === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {path.level}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-400">التقدم</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full ${
                          path.completed ? 'bg-green-500' :
                          path.current ? 'bg-primary' : 'bg-gray-400'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${path.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {path.courses.map((course, courseIndex) => (
                      <span
                        key={courseIndex}
                        className="px-3 py-1 bg-white dark:bg-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const renderConsultingTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <ConsultingComponent />
    </motion.div>
  );

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">الإنجازات والشارات</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            تتبع إنجازاتك وشاراتك المكتسبة في رحلتك التعليمية
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-2xl border-2 ${getRarityColor(achievement.rarity)} ${
                achievement.earned ? 'shadow-lg' : 'opacity-75'
              }`}
            >
              <div className="text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  achievement.earned ? getRarityColor(achievement.rarity).replace('border-', 'bg-').replace(' text-', ' text-') : 'bg-gray-100 text-gray-400'
                }`}>
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{achievement.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{achievement.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>التقدم</span>
                    <span>{achievement.progress}/{achievement.total}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${
                        achievement.earned ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-gray-400'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${(achievement.progress / achievement.total) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>

                {achievement.earned && (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">مكتسب في {achievement.earnedDate}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderActivityTab = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">سجل النشاط</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            تتبع جميع أنشطتك وإنجازاتك في المنصة
          </p>
        </div>

        <div className="space-y-4">
          {mockActivityLog.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start gap-4 p-4 rounded-xl border ${activity.color}`}
            >
              <div className="mt-1">{activity.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 dark:text-white">{activity.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                <p className="text-sm text-gray-500 mt-2">{activity.time}</p>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Share className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-80 glass-card border-l border-glass-border"
          >
            <div className="flex flex-col h-full">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-glass-border">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">أحمد محمد</h3>
                    <p className="text-sm text-text-secondary">المستوى {mockStats.level}</p>
                  </div>
                </div>
                {/* XP Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-text-secondary mb-1">
                    <span>XP</span>
                    <span>{mockStats.xpPoints}/3000</span>
                  </div>
                  <div className="w-full bg-background-subtle rounded-full h-2">
                    <motion.div
                      className="bg-gradient-primary-smooth h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${(mockStats.xpPoints / 3000) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <li key={tab.id}>
                        <button
                          onClick={() => {
                            setActiveTab(tab.id);
                            setSidebarOpen(false);
                          }}
                          className={`w-full flex items-center space-x-3 space-x-reverse p-3 rounded-xl transition-all duration-200 ${
                            activeTab === tab.id
                              ? 'bg-primary text-white shadow-glow-primary'
                              : 'hover:bg-surface-alt text-text-secondary hover:text-text-primary'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium">{tab.label}</span>
                        </button>
                      </li>
                    );
                  })}
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
          {sidebarOpen ? <ArrowLeft className="w-5 h-5" /> : <ArrowRight className="w-5 h-5" />}
        </button>

        {/* Main Content Area */}
        <div className="flex-1 lg:mr-0">
          <div className="p-6 lg:p-8">
            {/* Modern Tabs Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <ModernTabs
                tabs={tabs.map((tab) => ({
                  id: tab.id,
                  label: tab.label,
                  icon: tab.icon,
                }))}
                activeTab={activeTab}
                onChange={setActiveTab}
                variant="pills"
                size="lg"
                fullWidth={false}
              />
            </motion.div>

            {/* Tab Content */}
            <ModernTabContent value="overview" activeValue={activeTab}>
              {renderOverviewTab()}
            </ModernTabContent>
            <ModernTabContent value="courses" activeValue={activeTab}>
              {renderCoursesTab()}
            </ModernTabContent>
            <ModernTabContent value="learning-path" activeValue={activeTab}>
              {renderLearningPathTab()}
            </ModernTabContent>
            <ModernTabContent value="consulting" activeValue={activeTab}>
              {renderConsultingTab()}
            </ModernTabContent>
            <ModernTabContent value="achievements" activeValue={activeTab}>
              {renderAchievementsTab()}
            </ModernTabContent>
            <ModernTabContent value="activity" activeValue={activeTab}>
              {renderActivityTab()}
            </ModernTabContent>
          </div>
        </div>
      </div>
    </div>
  );
}
