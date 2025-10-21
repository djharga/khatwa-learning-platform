'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  Archive,
  Star,
  CheckCircle,
  Clock,
  Calendar,
  BookOpen,
  Award,
  Users,
  AlertCircle,
  Info,
  Check,
  X,
  Settings,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  RefreshCw,
  Download,
  Share,
  Pin,
  PinOff,
  Tag,
  MessageSquare,
  FileText,
  Video,
  Image,
  Link,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
} from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'course' | 'exam' | 'achievement' | 'system' | 'reminder' | 'community' | 'update';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  read: boolean;
  starred: boolean;
  archived: boolean;
  timestamp: Date;
  actionUrl?: string;
  actionText?: string;
  avatar?: string;
  image?: string;
  metadata?: {
    courseName?: string;
    instructorName?: string;
    dueDate?: string;
    score?: number;
    totalPoints?: number;
  };
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<NotificationItem[]>([]);
  const [selectedNotifications, setSelectedNotifications] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>('newest');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showArchived, setShowArchived] = useState(false);

  // Mock data - in real app, this would come from API
  const mockNotifications: NotificationItem[] = [
    {
      id: '1',
      title: 'نتيجة امتحان جديدة متاحة',
      message: 'لقد تم تصحيح امتحان المحاسبة المالية المتقدمة. يمكنك الآن مراجعة نتيجتك والحصول على الشهادة.',
      type: 'exam',
      priority: 'high',
      read: false,
      starred: false,
      archived: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      actionUrl: '/student/courses/exam-results',
      actionText: 'عرض النتيجة',
      metadata: {
        courseName: 'المحاسبة المالية المتقدمة',
        instructorName: 'د. سارة أحمد',
        score: 92,
        totalPoints: 100,
      },
    },
    {
      id: '2',
      title: 'دورة جديدة متاحة',
      message: 'دورة "التحليل المالي باستخدام Excel" الآن متاحة للتسجيل. سجل قبل نفاذ الأماكن!',
      type: 'course',
      priority: 'medium',
      read: false,
      starred: true,
      archived: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      actionUrl: '/courses/financial-analysis-excel',
      actionText: 'سجل الآن',
      image: '/api/placeholder/300/200',
      metadata: {
        courseName: 'التحليل المالي باستخدام Excel',
        instructorName: 'د. محمد علي',
      },
    },
    {
      id: '3',
      title: 'تذكير: موعد تسليم المشروع',
      message: 'تذكير بموعد تسليم مشروع التدقيق الداخلي خلال 3 أيام. تأكد من إكمال جميع المتطلبات.',
      type: 'reminder',
      priority: 'high',
      read: false,
      starred: false,
      archived: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      actionUrl: '/student/course-files/audit-project',
      actionText: 'عرض المشروع',
      metadata: {
        courseName: 'التدقيق الداخلي',
        dueDate: '2024-02-15',
      },
    },
    {
      id: '4',
      title: 'لقد حصلت على إنجاز جديد!',
      message: 'تهانينا! لقد حصلت على إنجاز "المتفوق في المحاسبة" لتفوقك في 5 دورات متتالية.',
      type: 'achievement',
      priority: 'medium',
      read: true,
      starred: false,
      archived: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      actionUrl: '/student/achievements',
      actionText: 'عرض الإنجازات',
      metadata: {
        courseName: 'المحاسبة المالية المتقدمة',
      },
    },
    {
      id: '5',
      title: 'تحديث في نظام المنصة',
      message: 'تم إضافة ميزات جديدة في لوحة التحكم تشمل تحسينات في التتبع والتقارير.',
      type: 'system',
      priority: 'low',
      read: true,
      starred: false,
      archived: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
      actionUrl: '/updates',
      actionText: 'تعرف على المزيد',
    },
    {
      id: '6',
      title: 'مناقشة جديدة في المجتمع',
      message: 'د. فاطمة خالد بدأت مناقشة حول "أحدث اتجاهات المراجعة الداخلية" في قسم المجتمع.',
      type: 'community',
      priority: 'medium',
      read: false,
      starred: false,
      archived: false,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      actionUrl: '/community/discussion/internal-audit-trends',
      actionText: 'انضم للمناقشة',
      avatar: '/api/placeholder/40/40',
      metadata: {
        instructorName: 'د. فاطمة خالد',
      },
    },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setNotifications(mockNotifications);
      setFilteredNotifications(mockNotifications);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = notifications.filter((n) => !n.archived || showArchived);

    // Apply type filter
    if (filter !== 'all') {
      filtered = filtered.filter((n) => n.type === filter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.timestamp.getTime() - a.timestamp.getTime();
        case 'oldest':
          return a.timestamp.getTime() - b.timestamp.getTime();
        case 'priority':
          const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default:
          return 0;
      }
    });

    setFilteredNotifications(filtered);
  }, [notifications, filter, searchQuery, sortBy, showArchived]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAsUnread = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: false } : n)
    );
  };

  const toggleStar = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, starred: !n.starred } : n)
    );
  };

  const archiveNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, archived: true } : n)
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const bulkAction = (action: 'read' | 'unread' | 'archive' | 'delete') => {
    setNotifications(prev =>
      prev.map(n => {
        if (selectedNotifications.has(n.id)) {
          switch (action) {
            case 'read':
              return { ...n, read: true };
            case 'unread':
              return { ...n, read: false };
            case 'archive':
              return { ...n, archived: true };
            case 'delete':
              return null;
          }
        }
        return n;
      }).filter(Boolean) as NotificationItem[]
    );
    setSelectedNotifications(new Set());
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'course':
        return <BookOpen className="w-5 h-5" />;
      case 'exam':
        return <FileText className="w-5 h-5" />;
      case 'achievement':
        return <Award className="w-5 h-5" />;
      case 'system':
        return <Settings className="w-5 h-5" />;
      case 'reminder':
        return <Clock className="w-5 h-5" />;
      case 'community':
        return <Users className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string, priority: string) => {
    const colors = {
      course: 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
      exam: 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400',
      achievement: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
      system: 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400',
      reminder: 'bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400',
      community: 'bg-purple-100 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
    };

    const priorityColors = {
      urgent: 'border-l-red-500',
      high: 'border-l-orange-500',
      medium: 'border-l-blue-500',
      low: 'border-l-gray-500',
    };

    return {
      icon: colors[type as keyof typeof colors] || colors.system,
      border: priorityColors[priority as keyof typeof priorityColors] || priorityColors.medium,
    };
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'الآن';
    if (diffInSeconds < 3600) return `منذ ${Math.floor(diffInSeconds / 60)} دقيقة`;
    if (diffInSeconds < 86400) return `منذ ${Math.floor(diffInSeconds / 3600)} ساعة`;
    return `منذ ${Math.floor(diffInSeconds / 86400)} يوم`;
  };

  const unreadCount = notifications.filter(n => !n.read && !n.archived).length;
  const starredCount = notifications.filter(n => n.starred && !n.archived).length;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-text-secondary">جاري تحميل الإشعارات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-40 glass-card border-b border-glass-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="relative">
                <Bell className="w-6 h-6 text-text-primary" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount > 99 ? '99+' : unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h1 className="text-xl font-semibold text-text-primary">
                  الإشعارات
                </h1>
                <p className="text-sm text-text-secondary">
                  {unreadCount} إشعار غير مقروء
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 space-x-reverse">
              {/* Sound Toggle */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`p-2 rounded-lg transition-colors ${
                  soundEnabled
                    ? 'bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Mark All as Read */}
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="btn-modern-secondary text-sm"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  تحديد الكل كمقروء
                </button>
              )}

              {/* Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-colors ${
                  showFilters
                    ? 'bg-primary text-white'
                    : 'bg-surface-alt text-text-secondary hover:text-text-primary'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-6 overflow-hidden"
            >
              <div className="glass-card p-6 rounded-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="البحث في الإشعارات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-4 pr-10 py-2 glass-card rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  {/* Type Filter */}
                  <div className="relative">
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                      className="w-full px-4 py-2 glass-card rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      <option value="all">جميع الأنواع</option>
                      <option value="course">الدورات</option>
                      <option value="exam">الامتحانات</option>
                      <option value="achievement">الإنجازات</option>
                      <option value="system">النظام</option>
                      <option value="reminder">التذكيرات</option>
                      <option value="community">المجتمع</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  </div>

                  {/* Sort By */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="w-full px-4 py-2 glass-card rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none"
                    >
                      <option value="newest">الأحدث أولاً</option>
                      <option value="oldest">الأقدم أولاً</option>
                      <option value="priority">حسب الأولوية</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted pointer-events-none" />
                  </div>

                  {/* View Mode */}
                  <div className="flex space-x-2 space-x-reverse">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list'
                          ? 'bg-primary text-white'
                          : 'bg-surface-alt text-text-secondary'
                      }`}
                    >
                      <div className="flex flex-col space-y-1">
                        <div className="w-4 h-0.5 bg-current"></div>
                        <div className="w-4 h-0.5 bg-current"></div>
                        <div className="w-4 h-0.5 bg-current"></div>
                      </div>
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid'
                          ? 'bg-primary text-white'
                          : 'bg-surface-alt text-text-secondary'
                      }`}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                        <div className="w-2 h-2 bg-current rounded-sm"></div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Additional Filters */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-glass-border">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <label className="flex items-center space-x-2 space-x-reverse">
                      <input
                        type="checkbox"
                        checked={showArchived}
                        onChange={(e) => setShowArchived(e.target.checked)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-text-secondary">عرض المؤرشفة</span>
                    </label>
                    <div className="flex items-center space-x-2 space-x-reverse text-sm text-text-secondary">
                      <Star className="w-4 h-4" />
                      <span>{starredCount} مميزة</span>
                    </div>
                  </div>

                  {selectedNotifications.size > 0 && (
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <span className="text-sm text-text-secondary">
                        تم تحديد {selectedNotifications.size}
                      </span>
                      <button
                        onClick={() => bulkAction('read')}
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
                      >
                        قراءة
                      </button>
                      <button
                        onClick={() => bulkAction('archive')}
                        className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                      >
                        أرشفة
                      </button>
                      <button
                        onClick={() => bulkAction('delete')}
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                      >
                        حذف
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <Bell className="w-16 h-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text-primary mb-2">
              لا توجد إشعارات
            </h3>
            <p className="text-text-secondary">
              {searchQuery || filter !== 'all'
                ? 'لا توجد إشعارات تطابق معايير البحث'
                : 'ستظهر إشعاراتك الجديدة هنا'}
            </p>
          </motion.div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-2'}>
            <AnimatePresence>
              {filteredNotifications.map((notification, index) => {
                const colors = getNotificationColor(notification.type, notification.priority);
                const isSelected = selectedNotifications.has(notification.id);

                return (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={`group relative glass-card rounded-xl border-l-4 ${colors.border} hover-lift-smooth cursor-pointer transition-all duration-200 ${
                      !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                    } ${isSelected ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => {
                      if (!notification.read) {
                        markAsRead(notification.id);
                      }
                    }}
                  >
                    {/* Selection Checkbox */}
                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          const newSelected = new Set(selectedNotifications);
                          if (isSelected) {
                            newSelected.delete(notification.id);
                          } else {
                            newSelected.add(notification.id);
                          }
                          setSelectedNotifications(newSelected);
                        }}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    </div>

                    <div className="p-4">
                      <div className="flex items-start space-x-3 space-x-reverse">
                        {/* Notification Icon */}
                        <div className={`p-2 rounded-lg flex-shrink-0 ${colors.icon}`}>
                          {getNotificationIcon(notification.type)}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h3 className={`font-medium mb-1 ${
                                !notification.read ? 'text-text-primary' : 'text-text-secondary'
                              }`}>
                                {notification.title}
                              </h3>
                              {notification.metadata?.courseName && (
                                <p className="text-xs text-text-muted mb-1">
                                  {notification.metadata.courseName}
                                  {notification.metadata?.instructorName && (
                                    <> • {notification.metadata.instructorName}</>
                                  )}
                                </p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-1 space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                              {!notification.read ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsRead(notification.id);
                                  }}
                                  className="p-1 text-green-600 hover:bg-green-100 rounded"
                                  title="تحديد كمقروء"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    markAsUnread(notification.id);
                                  }}
                                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                  title="تحديد كغير مقروء"
                                >
                                  <Eye className="w-4 h-4" />
                                </button>
                              )}

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(notification.id);
                                }}
                                className={`p-1 rounded ${
                                  notification.starred
                                    ? 'text-yellow-600 hover:bg-yellow-100'
                                    : 'text-gray-600 hover:bg-gray-100'
                                }`}
                                title={notification.starred ? 'إلغاء التمييز' : 'تمييز'}
                              >
                                <Star className={`w-4 h-4 ${notification.starred ? 'fill-current' : ''}`} />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  archiveNotification(notification.id);
                                }}
                                className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                title="أرشفة"
                              >
                                <Archive className="w-4 h-4" />
                              </button>

                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                title="حذف"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <p className="text-sm text-text-secondary mb-3 leading-relaxed">
                            {notification.message}
                          </p>

                          {/* Metadata */}
                          {notification.metadata && (
                            <div className="flex items-center space-x-4 space-x-reverse text-xs text-text-muted mb-3">
                              {notification.metadata.score && (
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <Award className="w-3 h-3" />
                                  <span>درجة: {notification.metadata.score}/{notification.metadata.totalPoints}</span>
                                </div>
                              )}
                              {notification.metadata.dueDate && (
                                <div className="flex items-center space-x-1 space-x-reverse">
                                  <Calendar className="w-3 h-3" />
                                  <span>موعد التسليم: {notification.metadata.dueDate}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Action Button */}
                          {notification.actionUrl && notification.actionText && (
                            <button className="btn-modern-primary text-sm px-4 py-2 mb-3">
                              {notification.actionText}
                              <ExternalLink className="w-3 h-3 mr-1" />
                            </button>
                          )}

                          {/* Timestamp */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 space-x-reverse text-xs text-text-muted">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimeAgo(notification.timestamp)}</span>
                              {notification.priority === 'urgent' && (
                                <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                                  عاجل
                                </span>
                              )}
                            </div>

                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
