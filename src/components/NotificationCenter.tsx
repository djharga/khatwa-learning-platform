'use client';

import React, { useState, useMemo, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Check,
  X,
  BookOpen,
  FileText,
  Users,
  Award,
  Clock,
  Search,
  Filter,
  Archive,
  Trash2,
  Settings,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Star,
  MessageSquare,
  Calendar,
  TrendingUp,
  Zap,
  Shield,
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Button } from './ui';

interface NotificationItem {
  id: string;
  type:
    | 'course'
    | 'exam'
    | 'community'
    | 'achievement'
    | 'system'
    | 'reminder'
    | 'announcement';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  starred: boolean;
  archived: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  category?: string;
  metadata?: {
    courseId?: string;
    examId?: string;
    userId?: string;
    [key: string]: any;
  };
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = memo(
  ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'priority'>(
      'newest'
    );
    const [showArchived, setShowArchived] = useState(false);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [autoMarkAsRead, setAutoMarkAsRead] = useState(false);
    const [selectedNotifications, setSelectedNotifications] = useState<
      string[]
    >([]);
    const [isSelectMode, setIsSelectMode] = useState(false);

    // ESC key handler
    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          if (isSelectMode) {
            setIsSelectMode(false);
            setSelectedNotifications([]);
          } else {
            onClose();
          }
        }
      };

      if (isOpen) {
        document.addEventListener('keydown', handleEscape);
        document.body.style.overflow = 'hidden'; // Prevent background scroll
      }

      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
      };
    }, [isOpen, onClose, isSelectMode]);

    // Focus trap
    useEffect(() => {
      if (!isOpen) return;

      const focusableElements =
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = document.getElementById('notification-center-modal');
      const focusableContent = modal?.querySelectorAll(focusableElements);
      const firstFocusableElement = focusableContent?.[0] as HTMLElement;
      const lastFocusableElement = focusableContent?.[
        focusableContent.length - 1
      ] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement?.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement?.focus();
            e.preventDefault();
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstFocusableElement?.focus();

      return () => {
        document.removeEventListener('keydown', handleTabKey);
      };
    }, [isOpen]);
    // Enhanced Mock notifications data - in real app, this would come from API
    const [notifications, setNotifications] = useState<NotificationItem[]>([
      {
        id: '1',
        type: 'course',
        title: 'دورة جديدة متاحة',
        message: 'تم إضافة دورة "إدارة المخاطر المالية" إلى مكتبتنا',
        timestamp: Date.now() - 1000 * 60 * 30, // 30 minutes ago
        read: false,
        starred: false,
        archived: false,
        priority: 'high',
        actionUrl: '/courses/risk-management',
        category: 'تعليمي',
        metadata: { courseId: 'risk-management' },
      },
      {
        id: '2',
        type: 'exam',
        title: 'امتحان جاهز للمراجعة',
        message: 'نتائج امتحان "المحاسبة المالية" متاحة الآن',
        timestamp: Date.now() - 1000 * 60 * 60 * 2, // 2 hours ago
        read: false,
        starred: true,
        archived: false,
        priority: 'urgent',
        actionUrl: '/exams/financial-accounting/results',
        category: 'امتحان',
        metadata: { examId: 'financial-accounting' },
      },
      {
        id: '3',
        type: 'achievement',
        title: 'تهانينا!',
        message: 'لقد أكملت 5 دورات بنجاح. حصلت على شارة "المحترف"',
        timestamp: Date.now() - 1000 * 60 * 60 * 24, // 1 day ago
        read: true,
        starred: true,
        archived: false,
        priority: 'medium',
        actionUrl: '/profile/badges',
        category: 'إنجاز',
        metadata: { badgeId: 'professional' },
      },
      {
        id: '4',
        type: 'community',
        title: 'منشور جديد في المجتمع',
        message: 'شارك أحمد سؤالاً حول "التدقيق الداخلي"',
        timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2, // 2 days ago
        read: true,
        starred: false,
        archived: false,
        priority: 'low',
        actionUrl: '/community/questions/internal-audit',
        category: 'مجتمع',
        metadata: { userId: 'ahmed', questionId: 'internal-audit' },
      },
      {
        id: '5',
        type: 'reminder',
        title: 'تذكير: امتحان غداً',
        message:
          'امتحان "المراجعة الداخلية المتقدمة" غداً في الساعة 10:00 صباحاً',
        timestamp: Date.now() - 1000 * 60 * 60 * 6, // 6 hours ago
        read: false,
        starred: false,
        archived: false,
        priority: 'high',
        actionUrl: '/exams/advanced-internal-audit',
        category: 'تذكير',
        metadata: { examId: 'advanced-internal-audit', scheduledTime: '10:00' },
      },
      {
        id: '6',
        type: 'system',
        title: 'تحديث النظام',
        message: 'تم تحديث النظام بنجاح. تم إضافة ميزات جديدة للدردشة',
        timestamp: Date.now() - 1000 * 60 * 60 * 12, // 12 hours ago
        read: true,
        starred: false,
        archived: false,
        priority: 'medium',
        actionUrl: '/changelog',
        category: 'نظام',
        metadata: { version: '2.1.0' },
      },
    ]);

    const [filter, setFilter] = useState<
      | 'all'
      | 'course'
      | 'exam'
      | 'community'
      | 'achievement'
      | 'system'
      | 'reminder'
      | 'announcement'
    >('all');

    const filteredNotifications = useMemo(() => {
      let filtered = notifications.filter((n) => !n.archived || showArchived);

      if (filter !== 'all') {
        filtered = filtered.filter((n) => n.type === filter);
      }

      if (searchQuery) {
        filtered = filtered.filter(
          (n) =>
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
            n.category?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sorting
      filtered.sort((a, b) => {
        switch (sortBy) {
          case 'newest':
            return b.timestamp - a.timestamp;
          case 'oldest':
            return a.timestamp - b.timestamp;
          case 'priority':
            const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          default:
            return 0;
        }
      });

      return filtered;
    }, [notifications, filter, searchQuery, sortBy, showArchived]);

    const unreadCount = notifications.filter(
      (n) => !n.read && !n.archived
    ).length;
    const starredCount = notifications.filter(
      (n) => n.starred && !n.archived
    ).length;

    const markAsRead = useCallback((id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }, []);

    const markAllAsRead = useCallback(() => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }, []);

    const clearAll = useCallback(() => {
      setNotifications([]);
    }, []);

    const toggleStar = useCallback((id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, starred: !n.starred } : n))
      );
    }, []);

    const archiveNotification = useCallback((id: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, archived: true } : n))
      );
    }, []);

    const deleteNotification = useCallback((id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    const toggleSelectMode = useCallback(() => {
      setIsSelectMode(!isSelectMode);
      setSelectedNotifications([]);
    }, [isSelectMode]);

    const toggleNotificationSelection = useCallback((id: string) => {
      setSelectedNotifications((prev) =>
        prev.includes(id) ? prev.filter((nId) => nId !== id) : [...prev, id]
      );
    }, []);

    const selectAll = useCallback(() => {
      setSelectedNotifications(filteredNotifications.map((n) => n.id));
    }, [filteredNotifications]);

    const deselectAll = useCallback(() => {
      setSelectedNotifications([]);
    }, []);

    const bulkAction = useCallback(
      (action: 'read' | 'archive' | 'delete' | 'star') => {
        setNotifications((prev) =>
          prev
            .map((n) =>
              selectedNotifications.includes(n.id)
                ? {
                    ...n,
                    read: action === 'read' ? true : n.read,
                    archived: action === 'archive' ? true : n.archived,
                    starred: action === 'star' ? true : n.starred,
                  }
                : n
            )
            .filter(
              (n) =>
                !selectedNotifications.includes(n.id) || action !== 'delete'
            )
        );
        setSelectedNotifications([]);
        setIsSelectMode(false);
      },
      [selectedNotifications]
    );

    const getNotificationIcon = (type: NotificationItem['type']) => {
      switch (type) {
        case 'course':
          return <BookOpen className="w-5 h-5 text-blue-500" />;
        case 'exam':
          return <FileText className="w-5 h-5 text-green-500" />;
        case 'community':
          return <Users className="w-5 h-5 text-purple-500" />;
        case 'achievement':
          return <Award className="w-5 h-5 text-yellow-500" />;
        case 'system':
          return <Settings className="w-5 h-5 text-gray-500" />;
        case 'reminder':
          return <Clock className="w-5 h-5 text-orange-500" />;
        case 'announcement':
          return <MessageSquare className="w-5 h-5 text-indigo-500" />;
        default:
          return <Bell className="w-5 h-5 text-gray-500" />;
      }
    };

    const getPriorityColor = (priority: NotificationItem['priority']) => {
      switch (priority) {
        case 'urgent':
          return 'border-l-red-500 bg-red-50';
        case 'high':
          return 'border-l-orange-500 bg-orange-50';
        case 'medium':
          return 'border-l-yellow-500 bg-yellow-50';
        case 'low':
          return 'border-l-gray-500 bg-gray-50';
        default:
          return 'border-l-gray-500 bg-gray-50';
      }
    };

    const getPriorityIcon = (priority: NotificationItem['priority']) => {
      switch (priority) {
        case 'urgent':
          return <AlertTriangle className="w-4 h-4 text-red-500" />;
        case 'high':
          return <TrendingUp className="w-4 h-4 text-orange-500" />;
        case 'medium':
          return <Info className="w-4 h-4 text-yellow-500" />;
        case 'low':
          return <CheckCircle className="w-4 h-4 text-gray-500" />;
        default:
          return <Info className="w-4 h-4 text-gray-500" />;
      }
    };

    const formatTimeAgo = (timestamp: number) => {
      const now = Date.now();
      const diff = now - timestamp;
      const minutes = Math.floor(diff / (1000 * 60));
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      if (minutes < 60) {
        return `منذ ${minutes} دقيقة`;
      } else if (hours < 24) {
        return `منذ ${hours} ساعة`;
      } else {
        return `منذ ${days} يوم`;
      }
    };

    if (!isOpen) return null;

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          className="bg-white dark:bg-gray-800 rounded-t-3xl shadow-2xl w-full max-w-md max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Enhanced Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  <Bell className="w-5 h-5 mr-2" />
                </motion.div>
                الإشعارات
                {unreadCount > 0 && (
                  <motion.span
                    className="bg-red-500 text-white text-xs rounded-full px-2 py-1 mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </h2>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleSelectMode}
                  className={`p-2 rounded-lg transition-colors ${
                    isSelectMode
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={isSelectMode ? 'إلغاء وضع التحديد' : 'تحديد متعدد'}
                >
                  <Check className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="إغلاق مركز الإشعارات"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Enhanced Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="البحث في الإشعارات..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-1 space-x-reverse overflow-x-auto">
                  {[
                    {
                      value: 'all' as const,
                      label: 'الكل',
                      count: notifications.length,
                    },
                    {
                      value: 'course' as const,
                      label: 'دورات',
                      count: notifications.filter((n) => n.type === 'course')
                        .length,
                    },
                    {
                      value: 'exam' as const,
                      label: 'امتحانات',
                      count: notifications.filter((n) => n.type === 'exam')
                        .length,
                    },
                    {
                      value: 'community' as const,
                      label: 'مجتمع',
                      count: notifications.filter((n) => n.type === 'community')
                        .length,
                    },
                    {
                      value: 'achievement' as const,
                      label: 'إنجازات',
                      count: notifications.filter(
                        (n) => n.type === 'achievement'
                      ).length,
                    },
                    {
                      value: 'reminder' as const,
                      label: 'تذكيرات',
                      count: notifications.filter((n) => n.type === 'reminder')
                        .length,
                    },
                    {
                      value: 'system' as const,
                      label: 'نظام',
                      count: notifications.filter((n) => n.type === 'system')
                        .length,
                    },
                  ].map(({ value, label, count }) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter(value)}
                      className={`px-3 py-1 text-sm rounded-full whitespace-nowrap transition-colors relative ${
                        filter === value
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {label}
                      {count > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                          {count}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowArchived(!showArchived)}
                    className={`p-2 rounded-lg transition-colors ${
                      showArchived
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title="عرض المؤرشف"
                  >
                    <Archive className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`p-2 rounded-lg transition-colors ${
                      soundEnabled
                        ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    title={soundEnabled ? 'إيقاف الصوت' : 'تشغيل الصوت'}
                  >
                    {soundEnabled ? (
                      <Volume2 className="w-4 h-4" />
                    ) : (
                      <VolumeX className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Actions */}
          <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
            {isSelectMode ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedNotifications.length} محدد
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={
                      selectedNotifications.length ===
                      filteredNotifications.length
                        ? deselectAll
                        : selectAll
                    }
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    {selectedNotifications.length ===
                    filteredNotifications.length
                      ? 'إلغاء تحديد الكل'
                      : 'تحديد الكل'}
                  </motion.button>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => bulkAction('read')}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-colors"
                    title="تحديد كمقروء"
                  >
                    <Check className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => bulkAction('star')}
                    className="p-2 text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900 rounded-lg transition-colors"
                    title="تمييز"
                  >
                    <Star className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => bulkAction('archive')}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
                    title="أرشفة"
                  >
                    <Archive className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => bulkAction('delete')}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                    title="حذف"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button
                    onClick={markAllAsRead}
                    size="sm"
                    variant="ghost"
                    disabled={unreadCount === 0}
                  >
                    تحديد الكل كمقروء
                  </Button>
                  <Button
                    onClick={clearAll}
                    size="sm"
                    variant="ghost"
                  >
                    مسح الكل
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700"
                  >
                    <option value="newest">الأحدث</option>
                    <option value="oldest">الأقدم</option>
                    <option value="priority">الأولوية</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Enhanced Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors relative ${
                      !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    } ${getPriorityColor(notification.priority)}`}
                  >
                    <div className="flex items-start space-x-3 space-x-reverse">
                      {/* Selection Checkbox */}
                      {isSelectMode && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="flex-shrink-0 mt-1"
                        >
                          <input
                            type="checkbox"
                            checked={selectedNotifications.includes(
                              notification.id
                            )}
                            onChange={() =>
                              toggleNotificationSelection(notification.id)
                            }
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </motion.div>
                      )}

                      <div className="flex-shrink-0 mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                              {notification.title}
                            </h4>
                            {notification.category && (
                              <span className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full mb-2">
                                {notification.category}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            {getPriorityIcon(notification.priority)}
                            {!notification.read && (
                              <motion.div
                                className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            )}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatTimeAgo(notification.timestamp)}
                          </span>

                          <div className="flex items-center gap-2">
                            {!isSelectMode && (
                              <>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => toggleStar(notification.id)}
                                  className={`p-1 rounded transition-colors ${
                                    notification.starred
                                      ? 'text-yellow-500 hover:text-yellow-600'
                                      : 'text-gray-400 hover:text-yellow-500'
                                  }`}
                                  title={
                                    notification.starred
                                      ? 'إلغاء التمييز'
                                      : 'تمييز'
                                  }
                                >
                                  <Star
                                    className={`w-4 h-4 ${notification.starred ? 'fill-current' : ''}`}
                                  />
                                </motion.button>

                                {!notification.read && (
                                  <Button
                                    onClick={() => markAsRead(notification.id)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-xs px-2 py-1"
                                  >
                                    تحديد كمقروء
                                  </Button>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 text-center"
                >
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">
                    لا توجد إشعارات {filter !== 'all' ? `في فئة ${filter}` : ''}
                  </p>
                  {searchQuery && (
                    <p className="text-sm text-gray-400 mt-2">
                      جرب البحث بكلمات مختلفة
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }
);

NotificationCenter.displayName = 'NotificationCenter';

export default NotificationCenter;
