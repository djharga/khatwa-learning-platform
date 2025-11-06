/**
 * صفحة التحكم العام والإعدادات - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير التحكم العام في المنصة وإعداداتها
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Lock,
  Unlock,
  Calendar,
  Clock,
  Globe,
  Mail,
  Phone,
  MessageSquare,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Save,
  RefreshCw,
  ToggleLeft,
  ToggleRight,
  Bell,
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  BarChart3,
  Target,
} from 'lucide-react';

interface SystemSettings {
  platformName: string;
  platformDescription: string;
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  telegramChannel: string;
  maintenanceMode: boolean;
  registrationEnabled: boolean;
  publicAccessEnabled: boolean;
  fileUploadEnabled: boolean;
  videoUploadEnabled: boolean;
  notificationsEnabled: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  maxFileSize: number; // MB
  allowedFileTypes: string[];
  defaultStorageLimit: number; // GB
}

interface CourseSchedule {
  courseId: string;
  courseName: string;
  startDate: string;
  endDate: string;
  autoLock: boolean;
  autoUnlock: boolean;
  status: 'active' | 'scheduled' | 'completed' | 'cancelled';
  enrolledCount: number;
}

interface ChannelSettings {
  whatsappEnabled: boolean;
  telegramEnabled: boolean;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushNotificationsEnabled: boolean;
  whatsappNumber: string;
  telegramChannel: string;
  emailAddress: string;
  smsProvider: string;
}

const AdminGeneralControlPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [settings, setSettings] = useState<SystemSettings>({
    platformName: 'منصة خطى التعليمية',
    platformDescription: 'بيئة تعليمية متكاملة للمراجعة الداخلية والمحاسبة',
    contactEmail: 'info@khata-platform.com',
    contactPhone: '+966501234567',
    whatsappNumber: '+966501234567',
    telegramChannel: '@khata_platform',
    maintenanceMode: false,
    registrationEnabled: true,
    publicAccessEnabled: true,
    fileUploadEnabled: true,
    videoUploadEnabled: true,
    notificationsEnabled: true,
    backupFrequency: 'daily',
    maxFileSize: 100,
    allowedFileTypes: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'mp4', 'avi', 'mov'],
    defaultStorageLimit: 5
  });

  const [courseSchedules, setCourseSchedules] = useState<CourseSchedule[]>([
    {
      courseId: '1',
      courseName: 'دورة المراجعة الداخلية المستوى الأول',
      startDate: '2024-02-01',
      endDate: '2024-02-15',
      autoLock: true,
      autoUnlock: false,
      status: 'active',
      enrolledCount: 127
    },
    {
      courseId: '2',
      courseName: 'برنامج زمالة المراجعين الداخليين',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      autoLock: false,
      autoUnlock: false,
      status: 'active',
      enrolledCount: 89
    },
    {
      courseId: '3',
      courseName: 'دورة الإدارة المالية المتقدمة',
      startDate: '2024-02-15',
      endDate: '2024-03-01',
      autoLock: true,
      autoUnlock: true,
      status: 'scheduled',
      enrolledCount: 0
    }
  ]);

  const [channelSettings, setChannelSettings] = useState<ChannelSettings>({
    whatsappEnabled: true,
    telegramEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    pushNotificationsEnabled: true,
    whatsappNumber: '+966501234567',
    telegramChannel: '@khata_platform',
    emailAddress: 'info@khata-platform.com',
    smsProvider: ''
  });

  const [systemStats, setSystemStats] = useState({
    totalUsers: 2847,
    activeUsers: 2156,
    totalCourses: 47,
    activeCourses: 38,
    totalStorage: 2560, // GB
    usedStorage: 1847, // GB
    serverUptime: 99.8,
    responseTime: 245 // ms
  });

  const handleSaveSettings = () => {
    // Save settings logic
    alert('تم حفظ الإعدادات بنجاح!');
  };

  const handleToggleCourseLock = (courseId: string, lock: boolean) => {
    setCourseSchedules(schedules =>
      schedules.map(schedule =>
        schedule.courseId === courseId
          ? { ...schedule, autoLock: lock }
          : schedule
      )
    );
  };

  const handleUpdateChannelSettings = (updates: Partial<ChannelSettings>) => {
    setChannelSettings(prev => ({ ...prev, ...updates }));
  };

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScheduleStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'نشط';
      case 'scheduled': return 'مجدول';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 px-6 py-3 rounded-full mb-6 shadow-lg border border-indigo-200/50 dark:border-indigo-700/50"
          >
            <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-700 dark:text-indigo-300 font-bold">التحكم العام والإعدادات</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 dark:from-white dark:via-indigo-100 dark:to-purple-100 bg-clip-text text-transparent mb-4"
          >
            نظام التحكم العام للمنصة
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            إدارة شاملة لإعدادات المنصة والتحكم في العمليات
          </motion.p>
        </motion.div>

        {/* التبويبات */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
              { id: 'platform', label: 'إعدادات المنصة', icon: Settings },
              { id: 'courses', label: 'إدارة الدورات', icon: BookOpen },
              { id: 'channels', label: 'قنوات الاتصال', icon: MessageSquare },
              { id: 'security', label: 'الأمان والحماية', icon: Shield }
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* محتوى التبويبات */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* إحصائيات النظام */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
                      <p className="text-3xl font-bold text-blue-600">{systemStats.totalUsers.toLocaleString()}</p>
                      <p className="text-sm text-green-600">نشط: {systemStats.activeUsers.toLocaleString()}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">إجمالي الدورات</p>
                      <p className="text-3xl font-bold text-purple-600">{systemStats.totalCourses}</p>
                      <p className="text-sm text-green-600">نشطة: {systemStats.activeCourses}</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">استخدام التخزين</p>
                      <p className="text-3xl font-bold text-green-600">{((systemStats.usedStorage / systemStats.totalStorage) * 100).toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">{systemStats.usedStorage}GB من {systemStats.totalStorage}GB</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">أداء النظام</p>
                      <p className="text-3xl font-bold text-orange-600">{systemStats.serverUptime}%</p>
                      <p className="text-sm text-gray-600">وقت الاستجابة: {systemStats.responseTime}ms</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* حالة النظام */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Activity className="w-6 h-6 text-green-600" />
                    حالة النظام الحالية
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">وضع الصيانة</span>
                      <div className="flex items-center gap-2">
                        {settings.maintenanceMode ? (
                          <XCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                        <span className={settings.maintenanceMode ? 'text-red-600' : 'text-green-600'}>
                          {settings.maintenanceMode ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">التسجيل مفتوح</span>
                      <div className="flex items-center gap-2">
                        {settings.registrationEnabled ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className={settings.registrationEnabled ? 'text-green-600' : 'text-red-600'}>
                          {settings.registrationEnabled ? 'نعم' : 'لا'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">رفع الملفات</span>
                      <div className="flex items-center gap-2">
                        {settings.fileUploadEnabled ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className={settings.fileUploadEnabled ? 'text-green-600' : 'text-red-600'}>
                          {settings.fileUploadEnabled ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">الإشعارات</span>
                      <div className="flex items-center gap-2">
                        {settings.notificationsEnabled ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className={settings.notificationsEnabled ? 'text-green-600' : 'text-red-600'}>
                          {settings.notificationsEnabled ? 'مفعلة' : 'معطلة'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6 text-blue-600" />
                    إجراءات سريعة
                  </h3>
                  <div className="space-y-3">
                    <motion.button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                    >
                      {settings.maintenanceMode ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                      {settings.maintenanceMode ? 'إلغاء وضع الصيانة' : 'تفعيل وضع الصيانة'}
                    </motion.button>

                    <motion.button
                      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <RefreshCw className="w-5 h-5" />
                      تحديث النظام
                    </motion.button>

                    <motion.button
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Save className="w-5 h-5" />
                      حفظ نسخة احتياطية
                    </motion.button>

                    <motion.button
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Bell className="w-5 h-5" />
                      إرسال إشعار عام
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'platform' && (
            <motion.div
              key="platform"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8">إعدادات المنصة الأساسية</h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم المنصة
                    </label>
                    <input
                      type="text"
                      value={settings.platformName}
                      onChange={(e) => setSettings({...settings, platformName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      وصف المنصة
                    </label>
                    <textarea
                      value={settings.platformDescription}
                      onChange={(e) => setSettings({...settings, platformDescription: e.target.value})}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      البريد الإلكتروني
                    </label>
                    <input
                      type="email"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الهاتف
                    </label>
                    <input
                      type="tel"
                      value={settings.contactPhone}
                      onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم الواتساب
                    </label>
                    <input
                      type="tel"
                      value={settings.whatsappNumber}
                      onChange={(e) => setSettings({...settings, whatsappNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      قناة التليجرام
                    </label>
                    <input
                      type="text"
                      value={settings.telegramChannel}
                      onChange={(e) => setSettings({...settings, telegramChannel: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الحد الأقصى لحجم الملف (MB)
                    </label>
                    <input
                      type="number"
                      value={settings.maxFileSize}
                      onChange={(e) => setSettings({...settings, maxFileSize: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الحد الافتراضي للتخزين (GB)
                    </label>
                    <input
                      type="number"
                      value={settings.defaultStorageLimit}
                      onChange={(e) => setSettings({...settings, defaultStorageLimit: Number(e.target.value)})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveSettings}
                >
                  <Save className="w-5 h-5" />
                  حفظ الإعدادات
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div
              key="courses"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  إدارة جدولة الدورات
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الدورة</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">تاريخ البداية</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">تاريخ النهاية</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المسجلون</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">التحكم التلقائي</th>
                        <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {courseSchedules.map((schedule) => (
                        <tr key={schedule.courseId} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-semibold text-gray-900">{schedule.courseName}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(schedule.startDate).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {new Date(schedule.endDate).toLocaleDateString('ar-SA')}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScheduleStatusColor(schedule.status)}`}>
                              {getScheduleStatusLabel(schedule.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {schedule.enrolledCount}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1">
                                <Lock className="w-4 h-4" />
                                <button
                                  onClick={() => handleToggleCourseLock(schedule.courseId, !schedule.autoLock)}
                                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    schedule.autoLock ? 'bg-red-600' : 'bg-gray-200'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                      schedule.autoLock ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <motion.button
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <Settings className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'channels' && (
            <motion.div
              key="channels"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-green-600" />
                إعدادات قنوات الاتصال
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">الواتساب</span>
                      <button
                        onClick={() => handleUpdateChannelSettings({ whatsappEnabled: !channelSettings.whatsappEnabled })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channelSettings.whatsappEnabled ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channelSettings.whatsappEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    {channelSettings.whatsappEnabled && (
                      <input
                        type="tel"
                        value={channelSettings.whatsappNumber}
                        onChange={(e) => handleUpdateChannelSettings({ whatsappNumber: e.target.value })}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                        placeholder="+966501234567"
                      />
                    )}
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">التليجرام</span>
                      <button
                        onClick={() => handleUpdateChannelSettings({ telegramEnabled: !channelSettings.telegramEnabled })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channelSettings.telegramEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channelSettings.telegramEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    {channelSettings.telegramEnabled && (
                      <input
                        type="text"
                        value={channelSettings.telegramChannel}
                        onChange={(e) => handleUpdateChannelSettings({ telegramChannel: e.target.value })}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="@channel_name"
                      />
                    )}
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">البريد الإلكتروني</span>
                      <button
                        onClick={() => handleUpdateChannelSettings({ emailEnabled: !channelSettings.emailEnabled })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channelSettings.emailEnabled ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channelSettings.emailEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    {channelSettings.emailEnabled && (
                      <input
                        type="email"
                        value={channelSettings.emailAddress}
                        onChange={(e) => handleUpdateChannelSettings({ emailAddress: e.target.value })}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        placeholder="info@example.com"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">الرسائل النصية (SMS)</span>
                      <button
                        onClick={() => handleUpdateChannelSettings({ smsEnabled: !channelSettings.smsEnabled })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channelSettings.smsEnabled ? 'bg-orange-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channelSettings.smsEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    {channelSettings.smsEnabled && (
                      <select
                        value={channelSettings.smsProvider}
                        onChange={(e) => handleUpdateChannelSettings({ smsProvider: e.target.value })}
                        className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                      >
                        <option value="">اختر مزود الخدمة</option>
                        <option value="twilio">Twilio</option>
                        <option value="aws">AWS SNS</option>
                        <option value="local">مزود محلي</option>
                      </select>
                    )}
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">إشعارات الدفع</span>
                      <button
                        onClick={() => handleUpdateChannelSettings({ pushNotificationsEnabled: !channelSettings.pushNotificationsEnabled })}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          channelSettings.pushNotificationsEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            channelSettings.pushNotificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      إرسال إشعارات فورية للمستخدمين
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">حالة القنوات</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>الواتساب:</span>
                        <span className={channelSettings.whatsappEnabled ? 'text-green-600' : 'text-red-600'}>
                          {channelSettings.whatsappEnabled ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>التليجرام:</span>
                        <span className={channelSettings.telegramEnabled ? 'text-green-600' : 'text-red-600'}>
                          {channelSettings.telegramEnabled ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>البريد الإلكتروني:</span>
                        <span className={channelSettings.emailEnabled ? 'text-green-600' : 'text-red-600'}>
                          {channelSettings.emailEnabled ? 'مفعل' : 'معطل'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <motion.button
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert('تم حفظ إعدادات القنوات بنجاح!')}
                >
                  <Save className="w-5 h-5" />
                  حفظ الإعدادات
                </motion.button>
              </div>
            </motion.div>
          )}

          {activeTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                <Shield className="w-6 h-6 text-red-600" />
                إعدادات الأمان والحماية
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">وضع الصيانة</span>
                      <button
                        onClick={() => setSettings({...settings, maintenanceMode: !settings.maintenanceMode})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.maintenanceMode ? 'bg-red-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      منع الوصول للمنصة أثناء الصيانة
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">التسجيل مفتوح</span>
                      <button
                        onClick={() => setSettings({...settings, registrationEnabled: !settings.registrationEnabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.registrationEnabled ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.registrationEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      السماح بتسجيل مستخدمين جدد
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">رفع الملفات</span>
                      <button
                        onClick={() => setSettings({...settings, fileUploadEnabled: !settings.fileUploadEnabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.fileUploadEnabled ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.fileUploadEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      السماح برفع الملفات للمستخدمين
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">رفع الفيديوهات</span>
                      <button
                        onClick={() => setSettings({...settings, videoUploadEnabled: !settings.videoUploadEnabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.videoUploadEnabled ? 'bg-purple-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.videoUploadEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      السماح برفع الفيديوهات للمستخدمين
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">الإشعارات</span>
                      <button
                        onClick={() => setSettings({...settings, notificationsEnabled: !settings.notificationsEnabled})}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          settings.notificationsEnabled ? 'bg-orange-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </label>
                    <p className="mt-2 text-sm text-gray-600">
                      تفعيل نظام الإشعارات
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تردد النسخ الاحتياطي
                    </label>
                    <select
                      value={settings.backupFrequency}
                      onChange={(e) => setSettings({...settings, backupFrequency: e.target.value as any})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
                    >
                      <option value="daily">يومي</option>
                      <option value="weekly">أسبوعي</option>
                      <option value="monthly">شهري</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <motion.button
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertTriangle className="w-5 h-5" />
                  مسح البيانات
                </motion.button>
                <motion.button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveSettings}
                >
                  <Save className="w-5 h-5" />
                  حفظ الإعدادات
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminGeneralControlPage;
