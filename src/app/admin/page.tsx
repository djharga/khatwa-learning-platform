'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  GraduationCap,
  Upload,
  MessageSquare,
  Shield,
  Calendar,
  Target,
  Award,
  PieChart,
  UserCheck,
  FileSpreadsheet,
  Video,
  Image,
  Plus,
  Search,
  Bell,
  X,
  Filter,
  RefreshCw,
  Zap,
  Eye,
  Download,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { adminService, AdminStats, Activity as ActivityType } from '@/lib/admin/admin-service';
import { RevenueChart, UsersGrowthChart, ProgramsDistributionChart, ContentTypeChart } from '@/components/admin/AdminCharts';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState<ActivityType[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null); // State to hold search results

  // جلب البيانات الحقيقية
  useEffect(() => {
    loadData();
    // تحديث البيانات كل 30 ثانية
    const interval = setInterval(() => {
      loadData(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const loadData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      else setRefreshing(true);

      const [statsData, activitiesData] = await Promise.all([
        adminService.getStats(selectedPeriod),
        adminService.getActivities(20)
      ]);

      setStats(statsData);
      setActivities(activitiesData);
      
      // تصنيف الإشعارات
      const importantNotifications = activitiesData.filter(
        a => a.severity === 'error' || a.severity === 'warning' || a.type === 'payment_received'
      );
      setNotifications(importantNotifications.slice(0, 5));
    } catch (error) {
      console.error('Error loading data:', error);
      // إضافة بيانات افتراضية في حالة فشل التحميل
      if (!stats) {
        setStats(getDefaultStats());
      }
      if (activities.length === 0) {
        setActivities([]);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now.getTime() - time.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'الآن';
    if (minutes < 60) return `منذ ${minutes} دقيقة`;
    if (hours < 24) return `منذ ${hours} ساعة`;
    return `منذ ${days} يوم`;
  };

  const getActivityIcon = (type: ActivityType['type']) => {
    switch (type) {
      case 'user_registration':
        return Users;
      case 'program_completed':
        return Award;
      case 'content_uploaded':
        return Upload;
      case 'payment_received':
        return DollarSign;
      case 'course_enrollment':
        return BookOpen;
      case 'user_login':
        return UserCheck;
      case 'system_backup':
        return Shield;
      case 'error_occurred':
        return AlertTriangle;
      default:
        return Activity;
    }
  };

  const getActivityColor = (severity?: string) => {
    switch (severity) {
      case 'error':
        return { text: 'text-red-600', bg: 'bg-red-100' };
      case 'warning':
        return { text: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'success':
        return { text: 'text-green-600', bg: 'bg-green-100' };
      default:
        return { text: 'text-blue-600', bg: 'bg-blue-100' };
    }
  };

  // بيانات افتراضية
  const getDefaultStats = (): AdminStats => ({
    users: {
      total: 2547,
      active: 1892,
      newThisMonth: 156,
      newLastMonth: 142,
      premium: 234,
      growth: '12.5',
      trend: 'up' as const
    },
    programs: {
      total: 12,
      active: 8,
      completed: 3,
      upcoming: 1,
      totalParticipants: 3456,
      newParticipants: 234,
      completionRate: 78
    },
    courses: {
      total: 45,
      published: 38,
      draft: 7,
      totalEnrollments: 5678,
      activeEnrollments: 3456,
      completionRate: 75
    },
    revenue: {
      total: 245000,
      thisMonth: 45000,
      lastMonth: 42000,
      growth: '7.1',
      trend: 'up' as const,
      transactions: 156,
      averageTransaction: 288
    },
    content: {
      totalFiles: 2340,
      totalSize: 125.5,
      videos: 456,
      documents: 1234,
      images: 650,
      storageUsed: 62,
      storageLimit: 200
    },
    system: {
      uptime: 99.8,
      responseTime: 120,
      activeSessions: 234,
      serverLoad: 45,
      cpuUsage: 42,
      memoryUsage: 58,
      diskUsage: 62
    },
    engagement: {
      dailyActiveUsers: 892,
      weeklyActiveUsers: 2156,
      monthlyActiveUsers: 2547,
      averageSessionDuration: 45,
      pageViews: 45678,
      bounceRate: 12.5
    },
    period: selectedPeriod,
    lastUpdated: new Date().toISOString()
  });

  // بيانات المخططات البيانية
  const chartData = useMemo(() => {
    const currentStats = stats || getDefaultStats();
    if (!currentStats) return null;

    // بيانات الإيرادات (آخر 6 أشهر)
    const revenueData = [
      { name: 'يوليو', value: 380000 },
      { name: 'أغسطس', value: 420000 },
      { name: 'سبتمبر', value: 395000 },
      { name: 'أكتوبر', value: 450000 },
      { name: 'نوفمبر', value: 378000 },
      { name: 'ديسمبر', value: currentStats.revenue.thisMonth },
    ];

    // بيانات نمو المستخدمين
    const usersData = [
      { name: 'يوليو', new: 98, active: 2100, value: 98 },
      { name: 'أغسطس', new: 105, active: 2150, value: 105 },
      { name: 'سبتمبر', new: 112, active: 2180, value: 112 },
      { name: 'أكتوبر', new: 120, active: 2200, value: 120 },
      { name: 'نوفمبر', new: 115, active: 2130, value: 115 },
      { name: 'ديسمبر', new: currentStats.users.newThisMonth, active: currentStats.users.active, value: currentStats.users.newThisMonth },
    ];

    // توزيع البرامج
    const programsData = [
      { name: 'نشط', value: currentStats.programs.active },
      { name: 'مكتمل', value: currentStats.programs.completed },
      { name: 'قادم', value: currentStats.programs.upcoming },
    ];

    // أنواع المحتوى
    const contentData = [
      { name: 'فيديوهات', value: currentStats.content.videos },
      { name: 'مستندات', value: currentStats.content.documents },
      { name: 'صور', value: currentStats.content.images },
    ];

    return { revenueData, usersData, programsData, contentData };
  }, [stats, selectedPeriod]);

  const quickActions = [
    {
      title: 'إضافة برنامج جديد',
      description: 'إنشاء برنامج تدريبي جديد',
      icon: Plus,
      href: '/admin/programs',
      color: 'from-purple-600 to-blue-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'إدارة المستخدمين',
      description: 'مراجعة وعرض المستخدمين',
      icon: Users,
      href: '/admin/users',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'رفع محتوى جديد',
      description: 'إضافة ملفات وفيديوهات',
      icon: Upload,
      href: '/admin/content',
      color: 'from-blue-600 to-indigo-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'عرض التقارير',
      description: 'تحليل الأداء والإحصائيات',
      icon: BarChart3,
      href: '/admin/reports',
      color: 'from-orange-600 to-red-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    try {
      const results = await adminService.search(searchQuery);
      setSearchResults(results);
      // يمكن فتح صفحة نتائج البحث أو عرضها في modal
      console.log('Search results:', results);
      // إظهار نتائج البحث
      if (results && (results.users?.length > 0 || results.courses?.length > 0 || results.programs?.length > 0)) {
        // يمكن إضافة modal لعرض النتائج أو التنقل إليها
        alert(`تم العثور على ${(results.users?.length || 0) + (results.courses?.length || 0) + (results.programs?.length || 0)} نتيجة`);
      } else {
        alert('لم يتم العثور على نتائج');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('حدث خطأ أثناء البحث');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  // استخدام بيانات افتراضية إذا لم يتم تحميل البيانات
  const displayStats = stats || getDefaultStats();

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Hero Section محسّن */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative mb-8"
        >
          {/* Simplified Background - No animation for better performance */}
          <div className="absolute inset-0 bg-blue-600/5 rounded-3xl blur-3xl opacity-60" style={{ transform: 'translateZ(0)' }}></div>
          
          <div className="relative bg-white/95 dark:bg-neutral-800/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-12 border border-gray-200/50 dark:border-neutral-700/50 overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
              <div>
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 px-5 py-2.5 rounded-full mb-4 shadow-lg border border-blue-200/50 dark:border-blue-700/50"
                >
                  <LayoutDashboard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-blue-700 dark:text-blue-300 font-bold text-sm">لوحة التحكم الرئيسية</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent mb-3"
                >
                  مرحباً بك في لوحة إدارة منصة خطى
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed"
                >
                  نظرة شاملة على النظام مع جميع الأدوات والإحصائيات في مكان واحد
                </motion.p>
              </div>

              {/* Actions Bar - Enhanced */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-10 flex items-center gap-3 flex-wrap"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-700 dark:to-neutral-800 hover:from-neutral-200 hover:to-neutral-100 dark:hover:from-neutral-600 dark:hover:to-neutral-700 rounded-xl transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 border border-neutral-200/50 dark:border-neutral-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <Search className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  <span className="hidden sm:inline text-sm font-medium text-neutral-700 dark:text-neutral-300">بحث</span>
                </motion.button>

                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative flex items-center gap-2 px-4 py-2.5 min-h-[44px] min-w-[44px] bg-gradient-to-r from-neutral-100 to-neutral-50 dark:from-neutral-700 dark:to-neutral-800 hover:from-neutral-200 hover:to-neutral-100 dark:hover:from-neutral-600 dark:hover:to-neutral-700 rounded-xl transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 border border-neutral-200/50 dark:border-neutral-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                  >
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    {notifications.length > 0 && (
                      <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white dark:ring-neutral-800"
                      >
                        {notifications.length}
                      </motion.span>
                    )}
                  </motion.button>

                  {/* Notifications Dropdown */}
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 top-full mt-2 w-80 bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700 z-50 max-h-96 overflow-y-auto"
                      >
                        <div className="p-4 border-b border-gray-200 dark:border-neutral-700 flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 dark:text-white">الإشعارات</h3>
                          <button
                            onClick={() => setShowNotifications(false)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-neutral-700 rounded-lg"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="p-2">
                          {notifications.length === 0 ? (
                            <p className="text-center text-gray-500 dark:text-gray-400 py-8">لا توجد إشعارات</p>
                          ) : (
                            notifications.map((notif) => {
                              const Icon = getActivityIcon(notif.type);
                              const colors = getActivityColor(notif.severity);
                              return (
                                <div
                                  key={notif.id}
                                  className="p-3 hover:bg-gray-50 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                      <Icon className={`w-4 h-4 ${colors.text}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{notif.title}</p>
                                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{notif.description}</p>
                                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{formatTimeAgo(notif.timestamp)}</p>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => loadData(true)}
                  disabled={refreshing}
                  className="flex items-center gap-2 px-4 py-2.5 min-h-[44px] bg-gradient-to-r from-primary-600 via-primary-600 to-primary-700 hover:from-primary-700 hover:via-primary-700 hover:to-primary-800 text-white rounded-xl transition-all duration-200 ease-out shadow-elevation-2 hover:shadow-elevation-4 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                >
                  <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline text-sm font-medium">تحديث</span>
                </motion.button>
              </motion.div>
            </div>

            {/* Search Bar */}
            <AnimatePresence>
              {showSearch && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="relative">
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="ابحث في النظام (مستخدمين، برامج، دورات، محتوى)..."
                      className="w-full pr-12 pl-4 py-3 min-h-[44px] rounded-xl border-2 border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:border-primary-500 dark:focus-visible:border-primary-400"
                                            
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          handleSearch();
                        }
                      }}
                      />
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults(null);
                          }}
                          className="w-6 h-6 bg-gray-100 dark:bg-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-600 rounded-full flex items-center justify-center transition-colors"                
                        >
                          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />                                                                              
                        </button>
                      )}
                      {searchQuery && (
                        <button
                          onClick={handleSearch}
                          className="px-3 py-1.5 min-h-[44px] bg-primary-600 hover:bg-primary-700 text-white text-xs rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                          title="ابحث (Enter)"
                        >
                          بحث
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Period Selector */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-sm text-gray-600 dark:text-gray-400">الفترة:</span>
              <div className="flex gap-2">
                {['day', 'week', 'month', 'year'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setSelectedPeriod(period)}
                    className={`px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 ${
                      selectedPeriod === period
                        ? 'bg-primary-600 text-white shadow-elevation-2'
                        : 'bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600'
                    }`}
                  >
                    {period === 'day' && 'يوم'}
                    {period === 'week' && 'أسبوع'}
                    {period === 'month' && 'شهر'}
                    {period === 'year' && 'سنة'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* الإحصائيات الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* المستخدمين */}
          <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            className="group relative bg-gradient-to-br from-white to-primary-50/50 dark:from-neutral-800 dark:to-primary-900/10 rounded-3xl shadow-elevation-2 hover:shadow-elevation-4 p-6 border border-primary-100/50 dark:border-primary-800/30 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 ease-out cursor-pointer overflow-hidden"
            onClick={() => window.location.href = '/admin/users'}
          >
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 via-primary-500/0 to-primary-500/5 group-hover:from-primary-500/5 group-hover:via-primary-500/5 group-hover:to-primary-500/10 transition-all duration-200 ease-out"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">إجمالي المستخدمين</p>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">{displayStats.users.total.toLocaleString()}</p>
                <div className="flex items-center gap-2">
                  {displayStats.users.trend === 'up' ? (
                  <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </motion.div>
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${displayStats.users.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    +{displayStats.users.newThisMonth} هذا الشهر ({displayStats.users.growth}%)
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">نشط: {displayStats.users.active.toLocaleString()}</span>
                    <span className="font-medium">مميز: {displayStats.users.premium}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 rounded-2xl flex items-center justify-center shadow-elevation-2 group-hover:shadow-elevation-4 group-hover:scale-105 transition-transform duration-200 ease-out">
                <Users className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* البرامج */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-white to-purple-50/50 dark:from-neutral-800 dark:to-purple-900/10 rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-purple-100/50 dark:border-purple-800/30 hover:border-purple-300 dark:hover:border-purple-700 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => window.location.href = '/admin/programs'}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-purple-500/0 to-purple-500/5 group-hover:from-purple-500/5 group-hover:via-purple-500/5 group-hover:to-purple-500/10 transition-all duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">البرامج النشطة</p>
                <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-2">{displayStats.programs.active}</p>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-semibold text-blue-600">من {displayStats.programs.total} إجمالي</span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">مكتمل: {displayStats.programs.completed}</span>
                    <span className="font-medium">قادم: {displayStats.programs.upcoming}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* الإيرادات */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-white to-green-50/50 dark:from-neutral-800 dark:to-green-900/10 rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-green-100/50 dark:border-green-800/30 hover:border-green-300 dark:hover:border-green-700 transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => window.location.href = '/admin/reports'}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-green-500/0 to-green-500/5 group-hover:from-green-500/5 group-hover:via-green-500/5 group-hover:to-green-500/10 transition-all duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">إجمالي الإيرادات</p>
                <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 mb-2">{formatCurrency(displayStats.revenue.total)}</p>
                <div className="flex items-center gap-2">
                  {displayStats.revenue.trend === 'up' ? (
                    <motion.div animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    </motion.div>
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm font-semibold ${displayStats.revenue.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {displayStats.revenue.growth}% من الشهر الماضي
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-neutral-700/50">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium">هذا الشهر: {formatCurrency(displayStats.revenue.thisMonth)}</span>
                    <span className="font-medium">معاملات: {displayStats.revenue.transactions}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>

          {/* أداء النظام */}
          <motion.div
            whileHover={{ y: -6, scale: 1.02 }}
            className="group relative bg-gradient-to-br from-white to-orange-50/50 dark:from-neutral-800 dark:to-orange-900/10 rounded-3xl shadow-lg hover:shadow-2xl p-6 border border-orange-100/50 dark:border-orange-800/30 hover:border-orange-300 dark:hover:border-orange-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 via-orange-500/0 to-orange-500/5 group-hover:from-orange-500/5 group-hover:via-orange-500/5 group-hover:to-orange-500/10 transition-all duration-300"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex-1">
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 font-medium">أداء النظام</p>
                <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 mb-2">{displayStats.system.uptime}%</p>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-semibold text-orange-600">{displayStats.system.responseTime}ms استجابة</span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">الحمل: {displayStats.system.serverLoad}%</span>
                    <div className="w-20 h-1.5 bg-gray-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${
                          displayStats.system.serverLoad < 50 ? 'bg-green-500' :
                          displayStats.system.serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${displayStats.system.serverLoad}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 dark:text-gray-400 font-medium">الجلسات: {displayStats.system.activeSessions}</span>
                  </div>
                </div>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* الإحصائيات التفصيلية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              إحصائيات البرامج والدورات
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">إجمالي المشاركين</span>
                <span className="font-semibold text-purple-600 dark:text-purple-400">{displayStats.programs.totalParticipants.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">معدل الإكمال</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{displayStats.programs.completionRate}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">الدورات المنشورة</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{displayStats.courses.published}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">التسجيلات النشطة</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{displayStats.courses.activeEnrollments.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
              <Link href="/admin/programs" className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 text-sm font-medium flex items-center gap-2">
                إدارة البرامج والدورات <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600 dark:text-green-400" />
              إحصائيات المحتوى والتخزين
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">إجمالي الملفات</span>
                <span className="font-semibold text-green-600 dark:text-green-400">{displayStats.content.totalFiles.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                <span className="text-gray-600 dark:text-gray-400">مساحة التخزين</span>
                <span className="font-semibold text-blue-600 dark:text-blue-400">{displayStats.content.totalSize} GB</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">استخدام التخزين</span>
                  <span className="font-semibold">{displayStats.content.storageUsed}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      displayStats.content.storageUsed < 70 ? 'bg-green-500' :
                      displayStats.content.storageUsed < 90 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${displayStats.content.storageUsed}%` }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-4">
                <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <Video className="w-5 h-5 text-red-600 dark:text-red-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-red-600 dark:text-red-400">{displayStats.content.videos}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">فيديو</div>
                </div>
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{displayStats.content.documents}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">مستند</div>
                </div>
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Image className="w-5 h-5 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                  <div className="text-sm font-bold text-purple-600 dark:text-purple-400">{displayStats.content.images}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">صورة</div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
              <Link href="/admin/content" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 text-sm font-medium flex items-center gap-2">
                إدارة المحتوى <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* الإجراءات السريعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100 dark:border-neutral-700"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">الإجراءات السريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`relative ${action.bgColor} dark:bg-neutral-700/50 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-700 hover:shadow-elevation-4 transition-all duration-200 ease-out cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-200 ease-out shadow-elevation-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 dark:text-white mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{action.description}</p>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Sparkles className="w-4 h-4 text-current" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* الأنشطة الأخيرة والتقارير */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* الأنشطة الأخيرة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              الأنشطة الأخيرة
            </h3>
              <button
                onClick={() => loadData(true)}
                className="p-2 min-h-[44px] min-w-[44px] hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                title="تحديث"
              >
                <RefreshCw className={`w-4 h-4 text-neutral-600 dark:text-neutral-400 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {activities.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">لا توجد أنشطة</p>
              ) : (
                activities.map((activity, index) => {
                  const Icon = getActivityIcon(activity.type);
                  const colors = getActivityColor(activity.severity);
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-4 p-3 min-h-[44px] rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        // يمكن إضافة تفاصيل أكثر
                        console.log('Activity clicked:', activity);
                      }}
                  >
                      <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${colors.text}`} />
                    </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{activity.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{formatTimeAgo(activity.timestamp)}</p>
                    </div>
                  </motion.div>
                );
                })
              )}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-neutral-700">
              <Link href="/admin/reports" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium flex items-center gap-2">
                عرض جميع الأنشطة <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

          {/* ملخص النظام */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600 dark:text-green-400" />
              ملخص النظام
            </h3>
            <div className="space-y-6">
              {/* حالة الخادم */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">حالة الخادم</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">ممتاز ✓</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: `${displayStats.system.uptime}%` }}></div>
                </div>
              </div>

              {/* حمل الخادم */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">حمل الخادم</span>
                  <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">{displayStats.system.serverLoad}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2">
                  <div className={`h-2 rounded-full ${
                    displayStats.system.serverLoad < 50 ? 'bg-green-500' :
                    displayStats.system.serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} style={{ width: `${displayStats.system.serverLoad}%` }}></div>
                </div>
              </div>

              {/* استخدام الموارد */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                  <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{displayStats.system.cpuUsage}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">CPU</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{displayStats.system.memoryUsage}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">ذاكرة</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-neutral-700/50 rounded-lg">
                  <div className="text-lg font-bold text-orange-600 dark:text-orange-400">{displayStats.system.diskUsage}%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">قرص</div>
                </div>
              </div>

              {/* النسخ الاحتياطي الأخير */}
              <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">آخر نسخة احتياطية</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">منذ 2 ساعات</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>

              {/* التحديثات */}
              <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">آخر تحديث للنظام</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">الإصدار 2.1.0</p>
                  </div>
                </div>
                <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* نظام المهام */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              المهام المعلقة
            </h3>
            <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-800 dark:hover:text-primary-300 font-medium flex items-center gap-2 min-h-[44px] px-3 rounded-lg transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2">
              عرض الكل <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'مراجعة محتوى دورة المراجعة الداخلية', priority: 'high', due: 'بعد يومين', color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' },
              { title: 'إنشاء نسخة احتياطية للنظام', priority: 'urgent', due: 'غداً', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400' },
              { title: 'مراجعة طلبات التسجيل الجديدة', priority: 'medium', due: 'بعد 3 أيام', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400' },
            ].map((task, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center justify-between p-3 min-h-[44px] bg-neutral-50 dark:bg-neutral-700/50 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-all duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${task.color}`}>
                      {task.priority === 'urgent' ? 'عاجل' : task.priority === 'high' ? 'مهم' : 'عادي'}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{task.due}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{task.title}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* المخططات البيانية */}
        {chartData && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          >
            {/* مخطط الإيرادات */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
                  إيرادات الأشهر الستة الأخيرة
                </h3>
              </div>
              {chartData?.revenueData && <RevenueChart data={chartData.revenueData} />}
            </div>

            {/* مخطط نمو المستخدمين */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  نمو المستخدمين
                </h3>
              </div>
              {chartData?.usersData && <UsersGrowthChart data={chartData.usersData} />}
            </div>

            {/* توزيع البرامج */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  توزيع البرامج
                </h3>
              </div>
              {chartData?.programsData && <ProgramsDistributionChart data={chartData.programsData} />}
            </div>

            {/* أنواع المحتوى */}
            <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  أنواع المحتوى
                </h3>
              </div>
              {chartData?.contentData && <ContentTypeChart data={chartData.contentData} />}
            </div>
          </motion.div>
        )}

        {/* إحصائيات التفاعل */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-neutral-700 mb-8"
        >
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            إحصائيات التفاعل
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{displayStats.engagement.dailyActiveUsers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">مستخدم نشط يومياً</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-900/10 rounded-xl">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{displayStats.engagement.weeklyActiveUsers}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">مستخدم نشط أسبوعياً</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 rounded-xl">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{displayStats.engagement.averageSessionDuration} د</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">متوسط مدة الجلسة</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/10 rounded-xl">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{displayStats.engagement.pageViews.toLocaleString()}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">عدد المشاهدات</div>
            </div>
          </div>
        </motion.div>

        {/* روابط سريعة للأقسام الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/20 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">الوصول السريع للأقسام الرئيسية</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'إدارة البرامج', href: '/admin/programs', icon: GraduationCap },
              { name: 'إدارة المستخدمين', href: '/admin/users', icon: Users },
              { name: 'إدارة الدورات', href: '/admin/courses', icon: BookOpen },
              { name: 'إدارة المحتوى', href: '/admin/content', icon: FileText },
              { name: 'التقارير', href: '/admin/reports', icon: BarChart3 },
              { name: 'التحكم العام', href: '/admin/controls', icon: Settings }
            ].map((section, index) => {
              const Icon = section.icon;
              return (
                <Link key={section.name} href={section.href}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="text-center p-4 min-h-[44px] bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all duration-200 ease-out cursor-pointer group border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 text-white group-hover:scale-105 transition-transform duration-200 ease-out" />
                    <p className="text-sm font-medium text-white">{section.name}</p>
                  </motion.div>
                </Link>
              );
            })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
