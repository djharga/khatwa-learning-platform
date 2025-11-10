'use client';

/**
 * صفحة تقارير الأداء - لوحة الإدارة | منصة خطى التعليمية
 * تعرض تقارير شاملة عن أداء المنصة والمستخدمين
 */

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  Clock,
  Activity,
  Target,
  Award,
  Download,
  Filter,
  RefreshCw,
  PieChart,
  LineChart,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function PerformanceReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  const performanceData = useMemo(() => ({
    overview: {
      totalStudents: 2547,
      activeStudents: 1980,
      completionRate: 78,
      averageScore: 4.8,
      totalCourses: 45,
      activeCourses: 42,
    },
    trends: [
      { month: 'يناير', students: 1200, completions: 850, score: 4.6 },
      { month: 'فبراير', students: 1350, completions: 980, score: 4.7 },
      { month: 'مارس', students: 1520, completions: 1120, score: 4.8 },
      { month: 'أبريل', students: 1680, completions: 1250, score: 4.8 },
      { month: 'مايو', students: 1850, completions: 1400, score: 4.9 },
      { month: 'يونيو', students: 1980, completions: 1540, score: 4.8 },
    ],
    topCourses: [
      { id: '1', title: 'المحاسبة الأساسية', students: 450, completion: 89, score: 4.9 },
      { id: '2', title: 'المراجعة الداخلية', students: 380, completion: 85, score: 4.8 },
      { id: '3', title: 'التحليل المالي', students: 320, completion: 82, score: 4.7 },
      { id: '4', title: 'إدارة المخاطر', students: 280, completion: 78, score: 4.6 },
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
                <Activity className="w-8 h-8" />
                تقارير الأداء
              </h1>
              <p className="text-gray-600 mt-1">تقارير شاملة عن أداء المنصة والمستخدمين</p>
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

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">إجمالي الطلاب</h3>
            <p className="text-2xl font-bold text-gray-900">{performanceData.overview.totalStudents.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-2">+15% من الشهر الماضي</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">معدل الإكمال</h3>
            <p className="text-2xl font-bold text-gray-900">{performanceData.overview.completionRate}%</p>
            <p className="text-sm text-green-600 mt-2">+3% من الشهر الماضي</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-gray-600 text-sm mb-1">متوسط التقييم</h3>
            <p className="text-2xl font-bold text-gray-900">{performanceData.overview.averageScore}</p>
            <p className="text-sm text-green-600 mt-2">+0.2 من الشهر الماضي</p>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Trends Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              اتجاهات الأداء
            </h2>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 mx-auto mb-2" />
                <p>رسم بياني للاتجاهات</p>
                <p className="text-sm">(يتطلب تكامل مكتبة الرسوم البيانية)</p>
              </div>
            </div>
          </motion.div>

          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm p-6"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              أفضل الدورات
            </h2>
            <div className="space-y-4">
              {performanceData.topCourses.map((course, index) => (
                <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{course.title}</p>
                      <p className="text-sm text-gray-500">{course.students} طالب</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{course.completion}% إكمال</p>
                    <p className="text-sm text-gray-500">⭐ {course.score}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Detailed Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5" />
            مؤشرات الأداء التفصيلية
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">الطلاب النشطون</p>
              <p className="text-2xl font-bold text-blue-600">{performanceData.overview.activeStudents}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">الدورات النشطة</p>
              <p className="text-2xl font-bold text-green-600">{performanceData.overview.activeCourses}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">إجمالي الدورات</p>
              <p className="text-2xl font-bold text-purple-600">{performanceData.overview.totalCourses}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

