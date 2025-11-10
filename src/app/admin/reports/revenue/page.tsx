'use client';

/**
 * صفحة التقارير المالية - لوحة الإدارة | منصة خطى التعليمية
 * تعرض تقارير شاملة عن الإيرادات والمدفوعات
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  Wallet,
  Download,
  Filter,
  RefreshCw,
  BarChart3,
  PieChart,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function RevenueReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedView, setSelectedView] = useState('overview');

  const revenueData = useMemo(() => ({
    overview: {
      totalRevenue: 125000,
      monthlyRevenue: 25000,
      subscriptionRevenue: 85000,
      courseRevenue: 40000,
      growthRate: 12.5,
      transactions: 1450,
    },
    monthlyTrends: [
      { month: 'يناير', revenue: 18000, subscriptions: 120, courses: 85 },
      { month: 'فبراير', revenue: 21000, subscriptions: 135, courses: 95 },
      { month: 'مارس', revenue: 23000, subscriptions: 145, courses: 105 },
      { month: 'أبريل', revenue: 24000, subscriptions: 150, courses: 110 },
      { month: 'مايو', revenue: 25000, subscriptions: 155, courses: 115 },
      { month: 'يونيو', revenue: 25000, subscriptions: 160, courses: 120 },
    ],
    topRevenueSources: [
      { source: 'الاشتراكات الشهرية', amount: 85000, percentage: 68, growth: 15 },
      { source: 'مبيعات الدورات', amount: 40000, percentage: 32, growth: 8 },
    ],
    recentTransactions: [
      { id: '1', type: 'subscription', amount: 299, user: 'أحمد محمد', date: '2025-11-10', status: 'completed' },
      { id: '2', type: 'course', amount: 499, user: 'سارة أحمد', date: '2025-11-10', status: 'completed' },
      { id: '3', type: 'subscription', amount: 299, user: 'خالد عمر', date: '2025-11-09', status: 'completed' },
      { id: '4', type: 'course', amount: 399, user: 'فاطمة علي', date: '2025-11-09', status: 'pending' },
    ],
  }), []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/reports"
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <DollarSign className="w-8 h-8" />
                التقارير المالية
              </h1>
              <p className="text-gray-600 mt-1">تقارير شاملة عن الإيرادات والمدفوعات</p>
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="week">أسبوع</option>
              <option value="month">شهر</option>
              <option value="quarter">ربع سنوي</option>
              <option value="year">سنوي</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Download className="w-5 h-5" />
              تصدير
            </button>
          </div>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">إجمالي الإيرادات</h3>
            <p className="text-2xl font-bold text-gray-900">{revenueData.overview.totalRevenue.toLocaleString()} ر.س</p>
            <p className="text-sm text-green-600 mt-2">+{revenueData.overview.growthRate}% من الشهر الماضي</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">إيرادات الشهر</h3>
            <p className="text-2xl font-bold text-gray-900">{revenueData.overview.monthlyRevenue.toLocaleString()} ر.س</p>
            <p className="text-sm text-green-600 mt-2">+8% من الشهر الماضي</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <CreditCard className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">إيرادات الاشتراكات</h3>
            <p className="text-2xl font-bold text-gray-900">{revenueData.overview.subscriptionRevenue.toLocaleString()} ر.س</p>
            <p className="text-sm text-green-600 mt-2">+15% من الشهر الماضي</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">إيرادات الدورات</h3>
            <p className="text-2xl font-bold text-gray-900">{revenueData.overview.courseRevenue.toLocaleString()} ر.س</p>
            <p className="text-sm text-green-600 mt-2">+8% من الشهر الماضي</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              اتجاهات الإيرادات
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                <p>رسم بياني للإيرادات</p>
                <p className="text-sm">(يتطلب تكامل مكتبة الرسوم البيانية)</p>
              </div>
            </div>
          </motion.div>

          {/* Revenue Sources */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              مصادر الإيرادات
            </h2>
            <div className="space-y-4">
              {revenueData.topRevenueSources.map((source, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{source.source}</span>
                    <span className="text-sm font-bold text-gray-900">{source.amount.toLocaleString()} ر.س</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{source.percentage}%</span>
                    <span className="text-xs text-green-600 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      +{source.growth}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            المعاملات الأخيرة
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">المستخدم</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">النوع</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">المبلغ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">التاريخ</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600">الحالة</th>
                </tr>
              </thead>
              <tbody>
                {revenueData.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{transaction.user}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {transaction.type === 'subscription' ? 'اشتراك' : 'دورة'}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{transaction.amount} ر.س</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${
                        transaction.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

