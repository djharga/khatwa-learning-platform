/**
 * صفحة تقارير الأدمن - منصة خطى التعليمية
 * تعرض تقارير شاملة عن النظام والمستخدمين والدورات
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  LineChart,
  Activity,
  Target,
  Award,
  Clock,
  Eye,
  Video,
  Image,
  GraduationCap,
  UserCheck,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  FileText,
} from 'lucide-react';

const AdminReportsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [showFilters, setShowFilters] = useState(false);

  // بيانات تجريبية للتقارير
  const reportsData = useMemo(() => ({
    userGrowth: [
      { month: 'يناير', users: 1200, active: 980, premium: 120 },
      { month: 'فبراير', users: 1350, active: 1100, premium: 145 },
      { month: 'مارس', users: 1580, active: 1280, premium: 180 },
      { month: 'أبريل', users: 1720, active: 1420, premium: 210 },
      { month: 'مايو', users: 1890, active: 1560, premium: 235 },
      { month: 'يونيو', users: 2100, active: 1750, premium: 280 },
    ],
    revenue: [
      { month: 'يناير', amount: 45000, programs: 12, avgOrder: 3750 },
      { month: 'فبراير', amount: 52000, programs: 15, avgOrder: 3467 },
      { month: 'مارس', amount: 61000, programs: 18, avgOrder: 3389 },
      { month: 'أبريل', amount: 58000, programs: 16, avgOrder: 3625 },
      { month: 'مايو', amount: 67000, programs: 20, avgOrder: 3350 },
      { month: 'يونيو', amount: 75000, programs: 22, avgOrder: 3409 },
    ],
    programStats: [
      { name: 'زمالة المراجعين', participants: 35, completion: 85, rating: 4.8 },
      { name: 'دورة الإدارة المالية', participants: 28, completion: 92, rating: 4.6 },
      { name: 'دورة المخاطر المالية', participants: 22, completion: 78, rating: 4.4 },
      { name: 'برنامج الجودة', participants: 18, completion: 95, rating: 4.9 },
      { name: 'دورة التسويات البنكية', participants: 15, completion: 88, rating: 4.7 },
    ],
    contentStats: {
      totalFiles: 1250,
      totalViews: 45600,
      totalDownloads: 8900,
      popularTypes: [
        { type: 'PDF', count: 450, percentage: 36 },
        { type: 'فيديو', count: 320, percentage: 26 },
        { type: 'Word', count: 280, percentage: 22 },
        { type: 'Excel', count: 150, percentage: 12 },
        { type: 'أخرى', count: 50, percentage: 4 },
      ]
    }
  }), []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('ar-SA').format(num);
  };

  const getGrowthPercentage = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const exportReport = (type: string) => {
    alert(`تم تصدير تقرير ${type} بنجاح!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 py-12">
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 px-6 py-3 rounded-full mb-6 shadow-lg border border-red-200/50 dark:border-red-700/50"
          >
            <BarChart3 className="w-6 h-6 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300 font-bold">التقارير والإحصائيات</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-red-900 to-orange-900 dark:from-white dark:via-red-100 dark:to-orange-100 bg-clip-text text-transparent mb-4"
          >
            نظام التقارير المتقدم
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            تحليل شامل لأداء النظام والاتجاهات والإحصائيات التفصيلية
          </motion.p>
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* اختيار الفترة الزمنية */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">الفترة الزمنية:</span>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all"
              >
                <option value="week">آخر أسبوع</option>
                <option value="month">آخر شهر</option>
                <option value="quarter">آخر 3 أشهر</option>
                <option value="year">آخر سنة</option>
              </select>
            </div>

            {/* أزرار التصدير */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exportReport('PDF')}
              >
                <Download className="w-4 h-4" />
                تصدير PDF
              </motion.button>
              <motion.button
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => exportReport('Excel')}
              >
                <Download className="w-4 h-4" />
                تصدير Excel
              </motion.button>
              <motion.button
                className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* فلاتر متقدمة */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-gray-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      نوع التقرير
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500">
                      <option>المستخدمين</option>
                      <option>البرامج</option>
                      <option>الإيرادات</option>
                      <option>المحتوى</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ البداية
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      تاريخ النهاية
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* التبويبات الرئيسية */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
            {[
              { id: 'overview', label: 'نظرة عامة', icon: BarChart3 },
              { id: 'users', label: 'تقارير المستخدمين', icon: Users },
              { id: 'programs', label: 'تقارير البرامج', icon: GraduationCap },
              { id: 'revenue', label: 'تقارير الإيرادات', icon: DollarSign },
              { id: 'content', label: 'تقارير المحتوى', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setSelectedReport(tab.id)}
                  className={`px-6 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-2 ${
                    selectedReport === tab.id
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* محتوى التقارير */}
        <AnimatePresence mode="wait">
          {selectedReport === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* مؤشرات الأداء الرئيسية */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">نمو المستخدمين</p>
                      <p className="text-3xl font-bold text-green-600">+24.5%</p>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">مقارنة بالشهر الماضي</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">نمو الإيرادات</p>
                      <p className="text-3xl font-bold text-blue-600">+18.2%</p>
                      <div className="flex items-center gap-2 mt-2">
                        <TrendingUp className="w-4 h-4 text-blue-500" />
                        <span className="text-sm text-blue-600">مقارنة بالشهر الماضي</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">معدل الإنجاز</p>
                      <p className="text-3xl font-bold text-purple-600">87.3%</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Target className="w-4 h-4 text-purple-500" />
                        <span className="text-sm text-purple-600">متوسط البرامج</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">نشاط المحتوى</p>
                      <p className="text-3xl font-bold text-orange-600">12.8K</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Activity className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-orange-600">مشاهدة شهرية</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                      <Eye className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                </div>
              </div>

              {/* الرسوم البيانية */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* نمو المستخدمين */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-600" />
                    نمو المستخدمين
                  </h3>
                  <div className="space-y-4">
                    {reportsData.userGrowth.map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-gray-600">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{formatNumber(data.users)} مستخدم</span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(data.users / 2200) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* الإيرادات الشهرية */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-600" />
                    الإيرادات الشهرية
                  </h3>
                  <div className="space-y-4">
                    {reportsData.revenue.map((data, index) => (
                      <div key={data.month} className="flex items-center justify-between">
                        <span className="text-gray-600">{data.month}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-semibold text-green-600">{formatCurrency(data.amount)}</span>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${(data.amount / 80000) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* إحصائيات البرامج */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">إحصائيات البرامج</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {reportsData.programStats.map((program, index) => (
                    <div key={program.name} className="text-center">
                      <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="w-8 h-8 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">{program.name}</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>{program.participants} مشارك</p>
                        <p>{program.completion}% إنجاز</p>
                        <p>⭐ {program.rating}/5</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedReport === 'users' && (
            <motion.div
              key="users"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* إحصائيات المستخدمين */}
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">تحليل نمو المستخدمين</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">الشهر</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">إجمالي المستخدمين</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">المستخدمون النشطون</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">المشتركون المميزون</th>
                            <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">معدل النمو</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {reportsData.userGrowth.map((data, index) => {
                            const prevData = index > 0 ? reportsData.userGrowth[index - 1] : null;
                            const growth = prevData ? getGrowthPercentage(data.users, prevData.users) : '0';

                            return (
                              <tr key={data.month} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{data.month}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{formatNumber(data.users)}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{formatNumber(data.active)}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{data.premium}</td>
                                <td className="px-4 py-3 text-sm">
                                  <span className={`flex items-center gap-1 ${
                                    parseFloat(String(growth)) > 0 ? 'text-green-600' : 'text-red-600'
                                  }`}>
                                    {parseFloat(String(growth)) > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {growth}%
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* ملخص المستخدمين */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">ملخص المستخدمين</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">إجمالي المستخدمين</span>
                        <span className="font-bold text-2xl text-blue-600">2,847</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">المستخدمون النشطون</span>
                        <span className="font-bold text-xl text-green-600">2,156</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">المشتركون المميزون</span>
                        <span className="font-bold text-xl text-purple-600">234</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">معدل الاحتفاظ</span>
                        <span className="font-bold text-xl text-orange-600">89.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-900 mb-6">أنشط المناطق</h3>
                    <div className="space-y-3">
                      {[
                        { region: 'الرياض', users: 1250, percentage: 44 },
                        { region: 'جدة', users: 890, percentage: 31 },
                        { region: 'الدمام', users: 456, percentage: 16 },
                        { region: 'أخرى', users: 251, percentage: 9 }
                      ].map((region) => (
                        <div key={region.region} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{region.region}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">{region.users}</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${region.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedReport === 'programs' && (
            <motion.div
              key="programs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">تقرير أداء البرامج</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">اسم البرنامج</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">المشاركون</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">معدل الإنجاز</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">التقييم</th>
                        <th className="px-4 py-3 text-right text-sm font-semibold text-gray-900">الإيرادات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reportsData.programStats.map((program) => (
                        <tr key={program.name} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="font-medium text-gray-900">{program.name}</div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{program.participants}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{program.completion}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-green-600 h-2 rounded-full"
                                  style={{ width: `${program.completion}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-1">
                              <span className="text-sm font-medium">{program.rating}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-sm ${i < Math.floor(program.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                  >
                                    ⭐
                                  </span>
                                ))}
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-green-600">
                            {formatCurrency(program.participants * 5000)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {selectedReport === 'revenue' && (
            <motion.div
              key="revenue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* تحليل الإيرادات */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">تحليل الإيرادات الشهرية</h3>
                  <div className="space-y-4">
                    {reportsData.revenue.map((data, index) => {
                      const prevData = index > 0 ? reportsData.revenue[index - 1] : null;
                      const growth = prevData ? getGrowthPercentage(data.amount, prevData.amount) : '0';

                      return (
                        <div key={data.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{data.month}</p>
                            <p className="text-sm text-gray-600">{data.programs} برنامج</p>
                          </div>
                          <div className="text-left">
                            <p className="font-bold text-green-600">{formatCurrency(data.amount)}</p>
                            <p className="text-xs text-gray-500">متوسط: {formatCurrency(data.avgOrder)}</p>
                            <p className={`text-xs flex items-center gap-1 ${
                              parseFloat(String(growth)) > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {parseFloat(String(growth)) > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                              {growth}%
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* مصادر الإيرادات */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">مصادر الإيرادات</h3>
                  <div className="space-y-4">
                    {[
                      { source: 'برامج زمالة', amount: 125000, percentage: 42 },
                      { source: 'دورات قصيرة', amount: 95000, percentage: 32 },
                      { source: 'دبلومات', amount: 60000, percentage: 20 },
                      { source: 'ورش عمل', amount: 20000, percentage: 6 }
                    ].map((source) => (
                      <div key={source.source} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-700">{source.source}</span>
                          <span className="text-sm font-bold text-green-600">{formatCurrency(source.amount)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${source.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 text-right">{source.percentage}% من الإجمالي</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {selectedReport === 'content' && (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* إحصائيات المحتوى */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">إحصائيات المحتوى</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-blue-600">{formatNumber(reportsData.contentStats.totalFiles)}</p>
                      <p className="text-sm text-blue-700">إجمالي الملفات</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Eye className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-green-600">{formatNumber(reportsData.contentStats.totalViews)}</p>
                      <p className="text-sm text-green-700">إجمالي المشاهدات</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Download className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-purple-600">{formatNumber(reportsData.contentStats.totalDownloads)}</p>
                      <p className="text-sm text-purple-700">إجمالي التحميلات</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <Activity className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-2xl font-bold text-orange-600">89</p>
                      <p className="text-sm text-orange-700">الفيديوهات</p>
                    </div>
                  </div>
                </div>

                {/* أنواع المحتوى */}
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">توزيع أنواع المحتوى</h3>
                  <div className="space-y-4">
                    {reportsData.contentStats.popularTypes.map((type) => (
                      <div key={type.type} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {type.type === 'PDF' && <FileText className="w-5 h-5 text-red-500" />}
                          {type.type === 'فيديو' && <Video className="w-5 h-5 text-purple-500" />}
                          {type.type === 'Word' && <FileText className="w-5 h-5 text-blue-500" />}
                          {type.type === 'Excel' && <FileSpreadsheet className="w-5 h-5 text-green-500" />}
                          <span className="text-sm font-medium text-gray-700">{type.type}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">{type.count} ملف</span>
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${type.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-blue-600">{type.percentage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* المحتوى الأكثر مشاهدة */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">المحتوى الأكثر مشاهدة</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { title: 'مقدمة في المراجعة الداخلية', views: 1250, type: 'فيديو' },
                    { title: 'دليل المحاسبة المالية', views: 890, type: 'PDF' },
                    { title: 'جدول المخاطر المالية', views: 756, type: 'Excel' },
                    { title: 'شرح التقارير المالية', views: 634, type: 'فيديو' },
                    { title: 'قالب الميزانية العمومية', views: 523, type: 'Word' },
                    { title: 'ورشة التسويات البنكية', views: 445, type: 'فيديو' }
                  ].map((content, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {content.type === 'فيديو' && <Video className="w-5 h-5 text-blue-600" />}
                        {content.type === 'PDF' && <FileText className="w-5 h-5 text-red-600" />}
                        {content.type === 'Excel' && <FileSpreadsheet className="w-5 h-5 text-green-600" />}
                        {content.type === 'Word' && <FileText className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{content.title}</h4>
                        <p className="text-xs text-gray-600">{formatNumber(content.views)} مشاهدة</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdminReportsPage;
