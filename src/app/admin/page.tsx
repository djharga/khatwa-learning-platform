'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  BarChart3,
  Settings,
  TrendingUp,
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
} from 'lucide-react';

const AdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // بيانات تجريبية شاملة للنظام
  const systemStats = useMemo(() => ({
    users: {
      total: 2847,
      active: 2156,
      newThisMonth: 127,
      premium: 234
    },
    programs: {
      total: 47,
      active: 38,
      completed: 9,
      upcoming: 12,
      totalParticipants: 1856,
      totalRevenue: 2850000
    },
    content: {
      totalFiles: 1250,
      totalSize: 1847, // GB
      videos: 89,
      documents: 894,
      images: 267
    },
    system: {
      uptime: 99.8,
      responseTime: 245,
      activeSessions: 156,
      serverLoad: 34
    }
  }), []);

  const recentActivities = [
    {
      id: 1,
      type: 'user_registration',
      title: 'مستخدم جديد مسجل',
      description: 'أحمد محمد انضم للمنصة',
      time: 'منذ 5 دقائق',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      id: 2,
      type: 'program_completed',
      title: 'برنامج مكتمل',
      description: 'انتهى برنامج زمالة المراجعين بنجاح',
      time: 'منذ 1 ساعة',
      icon: Award,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      id: 3,
      type: 'content_uploaded',
      title: 'محتوى جديد',
      description: 'تم رفع 5 ملفات جديدة',
      time: 'منذ 2 ساعات',
      icon: Upload,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      id: 4,
      type: 'payment_received',
      title: 'دفعة جديدة',
      description: 'تم استلام دفعة بقيمة 1500 ريال',
      time: 'منذ 3 ساعات',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100'
    }
  ];

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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-blue-100 px-6 py-3 rounded-full mb-6">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <span className="text-blue-700 font-bold">لوحة التحكم الرئيسية</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            مرحباً بك في لوحة إدارة منصة خطى
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            نظرة شاملة على النظام مع جميع الأدوات والإحصائيات
          </p>
        </motion.div>

        {/* الإحصائيات الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-gray-900">{systemStats.users.total.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+{systemStats.users.newThisMonth} هذا الشهر</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">البرامج النشطة</p>
                <p className="text-3xl font-bold text-purple-600">{systemStats.programs.active}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-blue-600">من {systemStats.programs.total} إجمالي</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي الإيرادات</p>
                <p className="text-3xl font-bold text-green-600">{formatCurrency(systemStats.programs.totalRevenue)}</p>
                <div className="flex items-center gap-2 mt-2">
                  <DollarSign className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600">+12.5% من الشهر الماضي</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">أداء النظام</p>
                <p className="text-3xl font-bold text-orange-600">{systemStats.system.uptime}%</p>
                <div className="flex items-center gap-2 mt-2">
                  <Activity className="w-4 h-4 text-orange-500" />
                  <span className="text-sm text-orange-600">{systemStats.system.responseTime}ms استجابة</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* الإحصائيات التفصيلية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              إحصائيات البرامج
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">إجمالي المشاركين</span>
                <span className="font-semibold text-purple-600">{systemStats.programs.totalParticipants.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">البرامج المكتملة</span>
                <span className="font-semibold text-green-600">{systemStats.programs.completed}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">البرامج القادمة</span>
                <span className="font-semibold text-blue-600">{systemStats.programs.upcoming}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link href="/admin/programs" className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                إدارة البرامج →
              </Link>
            </div>
          </div>

          {/* إحصائيات المحتوى */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-600" />
              إحصائيات المحتوى
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">إجمالي الملفات</span>
                <span className="font-semibold text-green-600">{systemStats.content.totalFiles.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">مساحة التخزين</span>
                <span className="font-semibold text-blue-600">{systemStats.content.totalSize} GB</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">الفيديوهات</span>
                <span className="font-semibold text-red-600">{systemStats.content.videos}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link href="/admin/content" className="text-green-600 hover:text-green-800 text-sm font-medium">
                إدارة المحتوى →
              </Link>
            </div>
          </div>
        </motion.div>

        {/* الإجراءات السريعة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">الإجراءات السريعة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Link key={action.title} href={action.href}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative ${action.bgColor} rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">{action.title}</h4>
                    <p className="text-sm text-gray-600">{action.description}</p>
                    <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-2 h-2 bg-current rounded-full"></div>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* الأنشطة الأخيرة والتقارير */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* الأنشطة الأخيرة */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              الأنشطة الأخيرة
            </h3>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-10 h-10 ${activity.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link href="/admin/reports" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                عرض جميع الأنشطة →
              </Link>
            </div>
          </motion.div>

          {/* ملخص سريع للنظام */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              ملخص النظام
            </h3>
            <div className="space-y-6">
              {/* حالة الخادم */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">حالة الخادم</span>
                  <span className="text-sm text-green-600 font-medium">ممتاز ✓</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                </div>
              </div>

              {/* حمل الخادم */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">حمل الخادم</span>
                  <span className="text-sm text-orange-600 font-medium">{systemStats.system.serverLoad}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${
                    systemStats.system.serverLoad < 50 ? 'bg-green-500' :
                    systemStats.system.serverLoad < 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} style={{ width: `${systemStats.system.serverLoad}%` }}></div>
                </div>
              </div>

              {/* النسخ الاحتياطي الأخير */}
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">آخر نسخة احتياطية</p>
                    <p className="text-xs text-gray-600">منذ 2 ساعات</p>
                  </div>
                </div>
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>

              {/* التحديثات */}
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">آخر تحديث للنظام</p>
                    <p className="text-xs text-gray-600">الإصدار 2.1.0</p>
                  </div>
                </div>
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* روابط سريعة للأقسام الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">الوصول السريع للأقسام الرئيسية</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
                    className="text-center p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                  >
                    <Icon className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">{section.name}</p>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
